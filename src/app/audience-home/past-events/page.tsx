import RegisteredEventCardWrapper from '@/components/events/registered-event-card-wrapper';
import { fetchPastEventsForAudience } from '@/services/getInternalAPI';
import { cookies } from 'next/headers';

export const dynamic = 'force-dynamic';

export default async function PastEvents() {
  const cookie = cookies();
  const email = cookie.get('email');

  const { data } = await fetchPastEventsForAudience(email?.value);
  return (
    <RegisteredEventCardWrapper
      data={data}
      showParticipants={true}
      addParticipants={false}
    />
  );
}
