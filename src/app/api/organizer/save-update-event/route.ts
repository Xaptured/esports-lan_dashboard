import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';
import logger from '@/utilities/logger';
import { domainProvider } from '@/utilities/utils';

export async function POST(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;

    const isUpdate = searchParams.get('isUpdate');
    const payload = await request.json();
    const url = domainProvider(
      'organizer/save-update-event?isUpdate=' + isUpdate
    );
    const response = await axios.post(url, payload);
    return NextResponse.json(
      { responseBody: response.data },
      { status: response.status }
    );
  } catch (error) {
    if (axios.isAxiosError(error)) {
      logger.error(`Error occurred while saving event.`);
      const statusCode = error.response?.status;
      const responseBody = error.response?.data;
      return NextResponse.json(
        { errorBody: responseBody },
        { status: statusCode }
      );
    } else {
      const err = error as Error;
      logger.error(`Internal server error occurred while saving event.`);
      return NextResponse.json({ errorBody: err.message }, { status: 500 });
    }
  }
}
