import { Handler } from '@netlify/functions';
import * as pdf from 'pdf-parse';
import * as mammoth from 'mammoth';
import Busboy from 'busboy';

interface UploadResponse {
  success: boolean;
  text: string;
  fileName: string;
  fileSize: number;
  fileType: string;
}

const extractTextFromPDF = async (buffer: Buffer): Promise<string> => {
  try {
    const data = await pdf(buffer);
    return data.text;
  } catch (error) {
    console.error('Error extracting text from PDF:', error);
    throw new Error('Failed to extract text from PDF');
  }
};

const extractTextFromDOCX = async (buffer: Buffer): Promise<string> => {
  try {
    const result = await mammoth.extractRawText({ buffer });
    return result.value;
  } catch (error) {
    console.error('Error extracting text from DOCX:', error);
    throw new Error('Failed to extract text from DOCX');
  }
};

const extractTextFromText = (buffer: Buffer): string => {
  try {
    return buffer.toString('utf-8');
  } catch (error) {
    console.error('Error extracting text from text file:', error);
    throw new Error('Failed to extract text from text file');
  }
};

export const handler: Handler = async (event) => {
  // Handle CORS
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
      },
    };
  }

  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' }),
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
      },
    };
  }

  try {
    const contentType = event.headers['content-type'] || '';
    if (!contentType.includes('multipart/form-data')) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Content-Type must be multipart/form-data' }),
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
        },
      };
    }

    let fileBuffer: Buffer = Buffer.alloc(0);
    let fileName = '';
    let fileType = '';

    // Use Busboy to parse the multipart form data
    await new Promise<void>((resolve, reject) => {
      const busboy = Busboy({ headers: { 'content-type': contentType } });
      busboy.on('file', (fieldname, file, filename, encoding, mimetype) => {
        if (fieldname === 'resume') {
          fileName = filename;
          fileType = mimetype;
          const buffers: Buffer[] = [];
          file.on('data', (data) => buffers.push(data));
          file.on('end', () => {
            fileBuffer = Buffer.concat(buffers);
          });
        }
      });
      busboy.on('finish', resolve);
      busboy.on('error', reject);
      busboy.end(event.isBase64Encoded ? Buffer.from(event.body || '', 'base64') : event.body);
    });

    if (!fileBuffer.length || !fileName) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'No valid file found' }),
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
        },
      };
    }

    // Extract text based on file type
    let extractedText = '';
    const fileExtension = fileName.toLowerCase().split('.').pop();

    switch (fileExtension) {
      case 'pdf':
        extractedText = await extractTextFromPDF(fileBuffer);
        break;
      case 'docx':
        extractedText = await extractTextFromDOCX(fileBuffer);
        break;
      case 'txt':
        extractedText = extractTextFromText(fileBuffer);
        break;
      default:
        return {
          statusCode: 400,
          body: JSON.stringify({ error: 'Unsupported file type. Please upload PDF, DOCX, or TXT files.' }),
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
          },
        };
    }

    if (!extractedText.trim()) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Could not extract text from the uploaded file' }),
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
        },
      };
    }

    const response: UploadResponse = {
      success: true,
      text: extractedText.trim(),
      fileName,
      fileSize: fileBuffer.length,
      fileType,
    };

    return {
      statusCode: 200,
      body: JSON.stringify(response),
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
      },
    };
  } catch (error) {
    console.error('Error in uploadResume function:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ 
        error: 'Internal server error',
        message: error instanceof Error ? error.message : 'Unknown error'
      }),
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
      },
    };
  }
}; 