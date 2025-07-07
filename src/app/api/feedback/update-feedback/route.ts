import logger from '@/utilities/logger';
import { domainProvider } from '@/utilities/utils';
import axios from 'axios';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const payload = {
      email: data.email,
      flag: data.flag,
      date: data.date,
    };
    const url = domainProvider('feedback/update-feedback');
    await axios.post(url, payload);
    return NextResponse.json({ status: 200 });
  } catch (error) {
    if (axios.isAxiosError(error)) {
      logger.error(`Error occurred while updating feedback.`);
      const statusCode = error.response?.status;
      const responseBody = error.response?.data;
      return NextResponse.json(
        { errorBody: responseBody },
        { status: statusCode }
      );
    } else {
      const err = error as Error;
      logger.error(
        `Internal server error occurred while updating feedback comments.`
      );
      return NextResponse.json({ errorBody: err.message }, { status: 500 });
    }
  }
}
