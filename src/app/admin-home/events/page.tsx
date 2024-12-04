import AdminEventCardWrapper from '@/components/events/admin-event-card-wrapper';
import { fetchInactiveEventsForAdmin } from '@/services/getInternalAPI';

export default async function Events() {
  const { data } = await fetchInactiveEventsForAdmin();
  return <AdminEventCardWrapper data={data} />;
}
