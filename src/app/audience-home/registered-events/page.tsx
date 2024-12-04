import RegisteredEventCardWrapper from '@/components/events/registered-event-card-wrapper';
import { fetchFutureEventsForAudience } from '@/services/getInternalAPI';
import { cookies } from 'next/headers';

export default async function RegisteredEvents() {
  const cookie = cookies();
  const email = cookie.get('email');

  const { data } = await fetchFutureEventsForAudience(email?.value);
  return <RegisteredEventCardWrapper data={data} />;
}
