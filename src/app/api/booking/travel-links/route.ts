import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';
import logger from '@/utilities/logger';
import { domainProvider } from '@/utilities/utils';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const eventName = searchParams.get('eventName');

    if (!eventName) {
      return NextResponse.json(
        { errorBody: 'Event Name is required' },
        { status: 400 }
      );
    }

    const url = domainProvider(`booking/events/${eventName}/travel-links`);
    const response = await axios.get(url);
    return NextResponse.json(
      { responseBody: response.data },
      { status: response.status }
    );
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const statusCode = error.response?.status || 500;
      const responseBody = error.response?.data;
      return NextResponse.json(
        { errorBody: responseBody },
        { status: statusCode }
      );
    } else {
      const err = error as Error;
      logger.error(
        `Internal server error occurred while fetching travel links.`
      );
      return NextResponse.json({ errorBody: err.message }, { status: 500 });
    }
  }
}
