import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();

    // Forward the request to the Spring Boot backend
    const response = await axios.post(
      'http://localhost:8092/organizer/save-images',
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
          // Add any auth headers if needed, e.g. from session or request headers
        },
      }
    );

    return NextResponse.json({ responseBody: response.data }, { status: 200 });
  } catch (error) {
    console.error('Error saving images:', error);
    if (axios.isAxiosError(error)) {
      const status = error.response?.status || 500;
      const data = error.response?.data || {
        message: 'Failed to save images',
      };
      return NextResponse.json({ errorBody: data }, { status });
    }
    return NextResponse.json(
      { errorBody: { message: 'Internal Server Error' } },
      { status: 500 }
    );
  }
}
