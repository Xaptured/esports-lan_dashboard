import { cookies } from 'next/headers';
import { fetchAdvertisementDetails, fetchFeedbackDetails } from '@/services/getInternalAPI';
import AudienceHomeContent from '@/components/audience-home/audience-home-content';

export const dynamic = 'force-dynamic';

export default async function AudienceHome() {
  const cookieStore = cookies();
  const email = cookieStore.get('email')?.value;

  const feedbackResponse = await fetchFeedbackDetails(email);
  const adsResponse = await fetchAdvertisementDetails();

  return (
    <AudienceHomeContent
      email={email}
      feedbackData={feedbackResponse.data}
      ads={adsResponse.data}
    />
  );
}
