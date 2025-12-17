import type { LiveUpdateDto } from './useLiveUpdates';
import { fetchLiveUpdates } from '@/services/getInternalAPI';
import { useEffect } from 'react';

const MAX_ITEMS = 7;

type UseLiveUpdatesFetcherProps = {
  setSchedule: React.Dispatch<React.SetStateAction<LiveUpdateDto[]>>;
  setResults: React.Dispatch<React.SetStateAction<LiveUpdateDto[]>>;
  setAwards: React.Dispatch<React.SetStateAction<LiveUpdateDto[]>>;
  setScheduleError: React.Dispatch<React.SetStateAction<string | undefined>>;
  setResultsError: React.Dispatch<React.SetStateAction<string | undefined>>;
  setAwardsError: React.Dispatch<React.SetStateAction<string | undefined>>;
  normalize: (raw: any) => LiveUpdateDto;
};

export default function useLiveUpdatesFetcher({
  setSchedule,
  setResults,
  setAwards,
  setScheduleError,
  setResultsError,
  setAwardsError,
  normalize,
}: UseLiveUpdatesFetcherProps) {
  useEffect(() => {
    const fetchType = async (
      type: string,
      setter: React.Dispatch<React.SetStateAction<LiveUpdateDto[]>>,
      errorSetter: React.Dispatch<React.SetStateAction<string | undefined>>
    ) => {
      const response = await fetchLiveUpdates(type, MAX_ITEMS);
      if (response.errorMessage) {
        errorSetter(
          `Failed to fetch live updates for ${type}: ${response.errorMessage}`
        );
        return;
      }

      const data: LiveUpdateDto[] = response.data;
      if (data) {
        setter(data.map(normalize));
      }
    };
    fetchType('SCHEDULE', setSchedule, setScheduleError);
    fetchType('RESULT', setResults, setResultsError);
    fetchType('AWARD', setAwards, setAwardsError);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
}
