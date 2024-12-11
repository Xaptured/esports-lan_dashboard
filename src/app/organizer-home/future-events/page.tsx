import RegisteredEventCardWrapper from '@/components/events/registered-event-card-wrapper';
import { fetchFutureEventsForOrganizer } from '@/services/getInternalAPI';
import { cookies } from 'next/headers';

export const dynamic = 'force-dynamic';

export default async function FutureEvents() {
  const cookie = cookies();
  const email = cookie.get('email');

  const { data } = await fetchFutureEventsForOrganizer(email?.value);
  return (
    <RegisteredEventCardWrapper
      data={data}
      showParticipants={true}
      addParticipants={true}
    />
  );
}
