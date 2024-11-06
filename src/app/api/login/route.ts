import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';
import logger from '@/utilities/logger';
import { domainProvider } from '@/utilities/utils';

export async function POST(request: NextRequest) {
  try {
    const jsonRequest = await request.json();
    const url = domainProvider('identity/token');
    const loginResponse = await axios.post(url, jsonRequest);
    const response = NextResponse.json(
      { email: loginResponse.data.email },
      { status: 200 }
    );
    response.headers.set('access-token', loginResponse.data.message);
    response.headers.set('role', loginResponse.data.role);
    return response;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      logger.error(`Error occurred while login process.`);
      const statusCode = error.response?.status;
      const responseBody = error.response?.data;
      return NextResponse.json(
        {
          error: responseBody,
        },
        { status: statusCode }
      );
    } else {
      const err = error as Error;
      logger.error(`Error occurred while login process.`);
      return NextResponse.json({ error: err.message }, { status: 500 });
    }
  }
}
