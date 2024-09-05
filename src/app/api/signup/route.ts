import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';
import logger from '@/utilities/logger';

export async function POST(request: NextRequest) {
  try {
    const jsonRequest = await request.json();
    const payload = {
      ...jsonRequest,
      role: 'PARTICIPANT', // TODO: need to change it to AUDIENCE from backedn
    };
    const registerResponse = await axios.post(
      'http://localhost:8086/identity/register',
      payload
    );
    const emailResponse = await axios.post(
      'http://localhost:8086/email/send-verification-email',
      { clientEmail: registerResponse.data.email }
    );
    return NextResponse.json({ data: emailResponse.data }, { status: 200 });
  } catch (error) {
    if (axios.isAxiosError(error)) {
      logger.error(`Error occurred while signup process.`);
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
      logger.error(`Error occurred while signup process.`);
      return NextResponse.json({ error: err.message }, { status: 500 });
    }
  }
}
