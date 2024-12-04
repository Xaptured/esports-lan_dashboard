import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';
import logger from '@/utilities/logger';
import { domainProvider } from '@/utilities/utils';

export async function POST(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;

    const eventName = searchParams.get('eventName');
    const status = searchParams.get('status');

    const url = domainProvider(
      'admin/update-event-status?eventName=' + eventName + '&status=' + status
    );
    const response = await axios.post(url);
    return NextResponse.json(
      { responseBody: 'Success' },
      { status: response.status }
    );
  } catch (error) {
    if (axios.isAxiosError(error)) {
      logger.error(`Error occurred while updating event status.`);
      const statusCode = error.response?.status;
      const responseBody = error.response?.data;
      return NextResponse.json(
        { errorBody: responseBody },
        { status: statusCode }
      );
    } else {
      const err = error as Error;
      logger.error(
        `Internal server error occurred while updating event status.`
      );
      return NextResponse.json({ errorBody: err.message }, { status: 500 });
    }
  }
}
