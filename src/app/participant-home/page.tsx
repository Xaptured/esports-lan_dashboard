import { cookies } from 'next/headers';
import { fetchAdvertisementDetails, fetchFeedbackDetails } from '@/services/getInternalAPI';
import ParticipantHomeContent from '@/components/participant-home/participant-home-content';

export const dynamic = 'force-dynamic';

export default async function ParticipantHome() {
  const cookieStore = cookies();
  const email = cookieStore.get('email')?.value;

  const feedbackResponse = await fetchFeedbackDetails(email);
  const adsResponse = await fetchAdvertisementDetails();

  return (
    <ParticipantHomeContent
      email={email}
      feedbackData={feedbackResponse.data}
      ads={adsResponse.data}
    />
  );
}
