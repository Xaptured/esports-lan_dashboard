import RegisteredEventCardWrapper from '@/components/events/registered-event-card-wrapper';
import { fetchPastEventsForOrganizer } from '@/services/getInternalAPI';
import { cookies } from 'next/headers';

export default async function PastEvents() {
  const cookie = cookies();
  const email = cookie.get('email');

  const { data } = await fetchPastEventsForOrganizer(email?.value);
  return <RegisteredEventCardWrapper data={data} />;
}
