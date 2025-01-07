import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';
import logger from '@/utilities/logger';
import { domainProvider } from '@/utilities/utils';

export async function POST(request: NextRequest) {
  try {
    const jsonRequest = await request.json();
    const url = domainProvider('organizer/verify-sub-user-credentials');
    const subUserResponse = await axios.post(url, jsonRequest);
    const response = NextResponse.json(
      { responseBody: subUserResponse.data },
      { status: 200 }
    );
    return response;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      logger.error(`Error occurred while verifying sub user.`);
      const statusCode = error.response?.status;
      const responseBody = error.response?.data;
      return NextResponse.json(
        { errorBody: responseBody },
        { status: statusCode }
      );
    } else {
      const err = error as Error;
      logger.error(`Internal server error occurred while verifying sub user.`);
      return NextResponse.json({ errorBody: err.message }, { status: 500 });
    }
  }
}
