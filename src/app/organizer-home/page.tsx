import { cookies } from 'next/headers';
import { fetchAdvertisementDetails, fetchFeedbackDetails } from '@/services/getInternalAPI';
import OrganizerHomeContent from '@/components/organizer-home/organizer-home-content';

export const dynamic = 'force-dynamic';

export default async function OrganizerHome() {
  const cookieStore = cookies();
  const email = cookieStore.get('email')?.value;

  const feedbackResponse = await fetchFeedbackDetails(email);
  const adsResponse = await fetchAdvertisementDetails();

  return (
    <OrganizerHomeContent
      email={email}
      feedbackData={feedbackResponse.data}
      ads={adsResponse.data}
    />
  );
}
