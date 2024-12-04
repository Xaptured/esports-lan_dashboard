import ApproveEventCardWrapper from '@/components/events/approve-event-card-wrapper';
import { fetchPendingTeamsForParticipant } from '@/services/getInternalAPI';
import { cookies } from 'next/headers';

export default async function ApproveEvents() {
  const cookie = cookies();
  const email = cookie.get('email');

  const { data } = await fetchPendingTeamsForParticipant(email?.value);
  return <ApproveEventCardWrapper data={data} />;
}
