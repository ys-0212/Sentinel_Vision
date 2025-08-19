import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

export async function POST(request: NextRequest) {
  try {
    const { apiKey } = await request.json();

    if (!apiKey) {
      return NextResponse.json(
        { error: 'API key is required' },
        { status: 400 }
      );
    }

    // Test the API key with a simple request
    const response = await axios.get('https://api.deepai.org/api/user', {
      headers: {
        'api-key': apiKey,
      },
      timeout: 10000,
    });

    return NextResponse.json({
      success: true,
      user: response.data,
      message: 'DeepAI API key is valid and working'
    });

  } catch (error: any) {
    console.error('API test error:', error.response?.data || error.message);
    
    return NextResponse.json(
      { 
        error: 'API test failed',
        details: error.response?.data || error.message
      },
      { status: 500 }
    );
  }
}
