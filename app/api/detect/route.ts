import { NextRequest, NextResponse } from 'next/server';
import { getHiveApiService } from '@/lib/hive-api';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const apiKey = formData.get('apiKey') as string;

    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      );
    }

    if (!apiKey) {
      return NextResponse.json(
        { error: 'API key is required' },
        { status: 400 }
      );
    }

    // Validate file type
    const fileType = file.type;
    if (!fileType.startsWith('image/') && !fileType.startsWith('video/')) {
      return NextResponse.json(
        { error: 'Invalid file type. Only images and videos are supported.' },
        { status: 400 }
      );
    }

    // Validate file size (100MB limit)
    const maxSize = 100 * 1024 * 1024; // 100MB
    if (file.size > maxSize) {
      return NextResponse.json(
        { error: 'File size too large. Maximum size is 100MB.' },
        { status: 400 }
      );
    }

    // Initialize Hive API service
    const hiveService = getHiveApiService(apiKey);

    // Determine file type for detection
    const mediaType = fileType.startsWith('image/') ? 'image' : 'video';

    // Perform deepfake detection
    const result = await hiveService.detectDeepfake({
      media: file,
      type: mediaType,
    });

    if (result.status === 'error') {
      return NextResponse.json(
        { error: result.error || 'Detection failed' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      result: result.data,
      fileName: file.name,
      fileType: mediaType,
      fileSize: file.size,
    });

  } catch (error: any) {
    console.error('Deepfake detection error:', error);
    
    return NextResponse.json(
      { 
        error: error.message || 'Internal server error',
        details: process.env.NODE_ENV === 'development' ? error.stack : undefined
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json(
    { message: 'Deepfake detection API endpoint. Use POST method with file and API key.' },
    { status: 200 }
  );
}
