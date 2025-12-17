import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';
import logger from '@/utilities/logger';
import { domainProvider } from '@/utilities/utils';

export async function POST(request: NextRequest) {
  try {
    const jsonRequest = await request.json();
    const url = domainProvider('organizer/live-updates');
    const response = await axios.post(url, jsonRequest);
    return NextResponse.json({ responseBody: 'Saved' }, { status: 200 });
  } catch (error) {
    if (axios.isAxiosError(error)) {
      logger.error(`Error occurred while saving live updates.`);
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
      logger.error(`Error occurred while saving live updates.`);
      return NextResponse.json({ error: err.message }, { status: 500 });
    }
  }
}
