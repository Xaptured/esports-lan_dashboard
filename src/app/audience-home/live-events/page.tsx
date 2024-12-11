import RegisteredEventCardWrapper from '@/components/events/registered-event-card-wrapper';
import { fetchLiveEventsForAudience } from '@/services/getInternalAPI';
import { cookies } from 'next/headers';

export const dynamic = 'force-dynamic';

export default async function RegisteredEvents() {
  const cookie = cookies();
  const email = cookie.get('email');

  const { data } = await fetchLiveEventsForAudience(email?.value);
  return (
    <RegisteredEventCardWrapper
      data={data}
      showParticipants={true}
      addParticipants={false}
    />
  );
}
