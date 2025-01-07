import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';
import logger from '@/utilities/logger';
import { domainProvider } from '@/utilities/utils';

export async function POST(request: NextRequest) {
  try {
    const payload = await request.json();
    const url = domainProvider('organizer/verify-audience-ticket');
    const response = await axios.post(url, payload);
    return NextResponse.json(
      { result: response.data.result },
      { status: response.status }
    );
  } catch (error) {
    if (axios.isAxiosError(error)) {
      logger.error(`Error occurred while validating audience ticket.`);
      const statusCode = error.response?.status;
      const responseBody = error.response?.data;
      return NextResponse.json(
        { errorBody: responseBody },
        { status: statusCode }
      );
    } else {
      const err = error as Error;
      logger.error(
        `Internal server error occurred while validating audience ticket.`
      );
      return NextResponse.json({ errorBody: err.message }, { status: 500 });
    }
  }
}
