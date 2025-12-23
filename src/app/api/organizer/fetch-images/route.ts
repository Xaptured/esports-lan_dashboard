import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const tournamentName = searchParams.get('tournamentName');

  if (!tournamentName) {
    return NextResponse.json(
      { errorBody: { message: 'Tournament name is required' } },
      { status: 400 }
    );
  }

  try {
    const response = await axios.get(
      `http://localhost:8092/organizer/fetch-images?tournamentName=${tournamentName}`
    );

    return NextResponse.json({ responseBody: response.data }, { status: 200 });
  } catch (error) {
    console.error('Error fetching images:', error);
    if (axios.isAxiosError(error)) {
      const status = error.response?.status || 500;
      const data = error.response?.data || {
        message: 'Failed to fetch images',
      };
      return NextResponse.json({ errorBody: data }, { status });
    }
    return NextResponse.json(
      { errorBody: { message: 'Internal Server Error' } },
      { status: 500 }
    );
  }
}
