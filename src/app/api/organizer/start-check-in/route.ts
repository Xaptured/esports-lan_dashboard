import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';
import logger from '@/utilities/logger';
import { domainProvider } from '@/utilities/utils';

export async function POST(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const eventName = searchParams.get('eventName');
    const url = domainProvider('organizer/update-sub-user-active/' + eventName);
    const response = await axios.post(url);
    return NextResponse.json(
      { responseBody: response.data },
      { status: response.status }
    );
  } catch (error) {
    if (axios.isAxiosError(error)) {
      logger.error(`Error occurred while updating sub user active.`);
      const statusCode = error.response?.status;
      const responseBody = error.response?.data;
      return NextResponse.json(
        { errorBody: responseBody },
        { status: statusCode }
      );
    } else {
      const err = error as Error;
      logger.error(
        `Internal server error occurred while updating sub user active.`
      );
      return NextResponse.json({ errorBody: err.message }, { status: 500 });
    }
  }
}
