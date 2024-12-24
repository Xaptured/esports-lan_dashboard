'use client';

import PaymentStatusWithLamp from '@/components/payment-status/payment-status';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

function getColor(status: string | null) {
  if (status && status === 'SUCCESS') {
    return 'green';
  }
  if (status && status === 'PENDING') {
    return 'yellow';
  }
  if (status && status === 'FAILED') {
    return 'red';
  }
  return 'cyan';
}

export default function PaymentStatus() {
  const searchParams = useSearchParams();
  const status = searchParams.get('status');
  const color = getColor(status);

  return <PaymentStatusWithLamp status={status} color={color} />;
}
