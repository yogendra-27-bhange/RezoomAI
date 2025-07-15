import { Handler } from '@netlify/functions';
import * as pdf from 'pdf-parse';
import * as mammoth from 'mammoth';

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
    // Parse multipart form data
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

    // For Netlify Functions, handle base64 encoding
    const isBase64Encoded = event.isBase64Encoded;
    const body = isBase64Encoded ? Buffer.from(event.body || '', 'base64').toString('utf-8') : event.body;
    if (!body) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'No file uploaded' }),
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
        },
      };
    }

    // Parse the multipart data manually (simplified)
    const boundary = contentType.split('boundary=')[1];
    const parts = body.split(`--${boundary}`);
    
    let fileBuffer: Buffer | null = null;
    let fileName = '';
    let fileType = '';

    for (const part of parts) {
      if (part.includes('Content-Disposition: form-data')) {
        const nameMatch = part.match(/name="([^"]+)"/);
        const filenameMatch = part.match(/filename="([^"]+)"/);
        const contentTypeMatch = part.match(/Content-Type: ([^\r\n]+)/);
        
        if (nameMatch && nameMatch[1] === 'resume' && filenameMatch) {
          fileName = filenameMatch[1];
          fileType = contentTypeMatch ? contentTypeMatch[1] : '';
          
          // Extract file content (simplified - in production use proper parsing)
          const contentStart = part.indexOf('\r\n\r\n') + 4;
          const contentEnd = part.lastIndexOf('\r\n');
          const content = part.substring(contentStart, contentEnd);

          // Treat content as raw binary, not base64
          fileBuffer = Buffer.from(content, 'binary'); // <-- FIXED: was 'base64', should be 'binary' for multipart
          break;
        }
      }
    }

    if (!fileBuffer || !fileName) {
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