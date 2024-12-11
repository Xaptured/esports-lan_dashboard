import RegisteredEventCardWrapper from '@/components/events/registered-event-card-wrapper';
import { fetchFutureEventsForParticipant } from '@/services/getInternalAPI';
import { cookies } from 'next/headers';

export const dynamic = 'force-dynamic';

export default async function FutureEvents() {
  const cookie = cookies();
  const email = cookie.get('email');

  const { data } = await fetchFutureEventsForParticipant(email?.value);
  return (
    <RegisteredEventCardWrapper
      data={data}
      showParticipants={true}
      addParticipants={false}
    />
  );
}
