import { domainProvider } from '@/utilities/utils';
import axios from 'axios';
import logger from '@/utilities/logger';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const email = searchParams.get('email');
    const url = domainProvider(`feedback/fetch-feedback/${email}`);
    const response = await axios.get(url);
    return NextResponse.json(
      { responseBody: response.data },
      { status: response.status }
    );
  } catch (error) {
    if (axios.isAxiosError(error)) {
      logger.error(`Error occurred while fetching feedback details.`);
      const statusCode = error.response?.status;
      const responseBody = error.response?.data;
      return NextResponse.json(
        { errorBody: responseBody },
        { status: statusCode }
      );
    } else {
      const err = error as Error;
      logger.error(
        `Internal server error occurred while fetching feedback details.`
      );
      return NextResponse.json({ errorBody: err.message }, { status: 500 });
    }
  }
}
