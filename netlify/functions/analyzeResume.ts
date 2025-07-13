import { Handler } from '@netlify/functions';
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_API_KEY!);

interface ResumeAnalysisRequest {
  resumeText: string;
  jobTitle?: string;
  company?: string;
}

interface ResumeAnalysisResponse {
  score: number;
  feedback: {
    strengths: string[];
    weaknesses: string[];
    suggestions: string[];
  };
  improvements: {
    content: string[];
    format: string[];
    keywords: string[];
  };
  matchRate: number;
  summary: string;
}

const analyzeResumeWithAI = async (resumeText: string, jobTitle?: string, company?: string): Promise<ResumeAnalysisResponse> => {
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });

  const prompt = `
You are an expert resume reviewer and career coach. Analyze the following resume and provide detailed feedback.

Resume Content:
${resumeText}

${jobTitle ? `Target Job Title: ${jobTitle}` : ''}
${company ? `Target Company: ${company}` : ''}

Please provide a comprehensive analysis in the following JSON format:

{
  "score": 85,
  "feedback": {
    "strengths": ["List 3-5 key strengths"],
    "weaknesses": ["List 3-5 areas for improvement"],
    "suggestions": ["List 3-5 actionable suggestions"]
  },
  "improvements": {
    "content": ["Specific content improvements"],
    "format": ["Formatting suggestions"],
    "keywords": ["Missing keywords to add"]
  },
  "matchRate": 78,
  "summary": "Brief 2-3 sentence summary of overall assessment"
}

Focus on:
- Relevance to target role
- Quantifiable achievements
- Action verbs and impact
- Skills alignment
- Professional presentation
- ATS optimization

Score should be 0-100 based on overall quality and relevance.
Match rate should be 0-100 based on alignment with target role.
`;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    // Extract JSON from response
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error('Invalid AI response format');
    }
    
    const analysis = JSON.parse(jsonMatch[0]) as ResumeAnalysisResponse;
    
    // Validate and normalize scores
    analysis.score = Math.max(0, Math.min(100, analysis.score || 0));
    analysis.matchRate = Math.max(0, Math.min(100, analysis.matchRate || 0));
    
    return analysis;
  } catch (error) {
    console.error('Error analyzing resume with AI:', error);
    throw new Error('Failed to analyze resume');
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
    const body: ResumeAnalysisRequest = JSON.parse(event.body || '{}');
    
    if (!body.resumeText) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Resume text is required' }),
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
        },
      };
    }

    const analysis = await analyzeResumeWithAI(
      body.resumeText,
      body.jobTitle,
      body.company
    );

    return {
      statusCode: 200,
      body: JSON.stringify({
        success: true,
        analysis,
        timestamp: new Date().toISOString(),
      }),
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
      },
    };
  } catch (error) {
    console.error('Error in analyzeResume function:', error);
    
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