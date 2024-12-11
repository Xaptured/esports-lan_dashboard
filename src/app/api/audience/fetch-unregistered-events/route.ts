import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';
import logger from '@/utilities/logger';
import { domainProvider } from '@/utilities/utils';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const email = searchParams.get('email');
    const url = domainProvider(
      `audience/audience-unregistered-events/${email}`
    );
    const response = await axios.get(url);
    return NextResponse.json(
      { responseBody: response.data },
      { status: response.status }
    );
  } catch (error) {
    if (axios.isAxiosError(error)) {
      logger.error(
        `Error occurred while fetching unregistered future events for audience.`
      );
      const statusCode = error.response?.status;
      const responseBody = error.response?.data;
      return NextResponse.json(
        { errorBody: responseBody },
        { status: statusCode }
      );
    } else {
      const err = error as Error;
      logger.error(
        `Internal server error occurred while fetching unregistered future events for audience.`
      );
      return NextResponse.json({ errorBody: err.message }, { status: 500 });
    }
  }
}
