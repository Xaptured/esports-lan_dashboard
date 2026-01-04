import React from 'react';
import BookingFeature from '@/components/bookings/booking-feature';
import { cookies } from 'next/headers';

export default function Bookings() {
  const cookieStore = cookies();
  const email = cookieStore.get('email')?.value;
  return <BookingFeature email={email} />;
}
