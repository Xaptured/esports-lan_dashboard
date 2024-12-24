import PaymentStatusWithLamp from '@/components/payment-status/payment-status';

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

export default function PaymentStatus({
  searchParams,
}: {
  searchParams: { [key: string]: string };
}) {
  const { status } = searchParams;
  const color = getColor(status);

  return <PaymentStatusWithLamp status={status} color={color} />;
}
