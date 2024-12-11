import BookTicketEventCardWrapper from '@/components/events/book-ticket-event-card-wrapper';
import { fetchUnregisteredEventsForAudience } from '@/services/getInternalAPI';
import { cookies } from 'next/headers';

export default async function FutureEvents() {
  const cookie = cookies();
  const email = cookie.get('email');

  const { data } = await fetchUnregisteredEventsForAudience(email?.value);
  return (
    <BookTicketEventCardWrapper
      data={data}
      showParticipants={true}
      addParticipants={false}
    />
  );
}
