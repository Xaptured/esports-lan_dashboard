import logger from '@/utilities/logger';
import axios from 'axios';
import crypto from 'crypto';
import { NextResponse, NextRequest } from 'next/server';
import { cookies } from 'next/headers';
import { domainProvider } from '@/utilities/utils';

export async function POST(req: NextRequest) {
  try {
    const reqData = await req.json();
    const cookie = cookies();
    const email = cookie.get('email')?.value;

    const payload = {
      name: reqData.name,
      amount: reqData.amount,
      email: email,
      eventName: reqData.eventName,
    };
    const url = domainProvider('payment-gateway/initiate');
    const response = await axios.post(url, payload);

    return NextResponse.json({
      redirectURL: response.data.redirectURL,
    });
  } catch (error) {
    if (axios.isAxiosError(error)) {
      logger.error(`Error occurred while payment initiation.`);
      const statusCode = error.response?.status;
      const responseBody = error.response?.data;
      return NextResponse.json(
        { errorBody: responseBody },
        { status: statusCode }
      );
    } else {
      const err = error as Error;
      logger.error(`Internal server error occurred while payment initiation.`);
      return NextResponse.json({ errorBody: err.message }, { status: 500 });
    }
  }
}
