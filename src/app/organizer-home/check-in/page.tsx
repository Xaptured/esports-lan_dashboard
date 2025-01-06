import CheckInCardWrapper from '@/components/events/check-in-card-wrapper';
import { fetchLiveEventsForOrganizer } from '@/services/getInternalAPI';
import { cookies } from 'next/headers';

export default async function CheckIn() {
  const cookie = cookies();
  const email = cookie.get('email');

  const { data } = await fetchLiveEventsForOrganizer(email?.value);

  return <CheckInCardWrapper data={data} />;
}
