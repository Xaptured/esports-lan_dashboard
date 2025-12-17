import { useState } from 'react';
import useLiveUpdatesFetcher from './useLiveUpdatesFetcher';
import useLiveUpdatesSocket from './useLiveUpdatesSocket';

export type LiveUpdateDto = {
  id: string;
  type: 'SCHEDULE' | 'RESULT' | 'AWARD';
  tournamentId?: string;
  matchId?: string;
  title?: string;
  message?: string;
  createdAt?: string;
};

export type UseLiveUpdatesResult = {
  schedule: LiveUpdateDto[];
  results: LiveUpdateDto[];
  awards: LiveUpdateDto[];
  isConnected: boolean;
  errorMessage?: string;
  scheduleError?: string;
  resultsError?: string;
  awardsError?: string;
  connect: () => void;
  disconnect: () => void;
  pushTest: (obj: Partial<LiveUpdateDto>) => void;
};

const MAX_ITEMS = 7;

type UseLiveUpdatesOptions = {
  eventName: string;
  autoConnect?: boolean;
};

export default function useLiveUpdates({
  autoConnect = true,
  eventName,
}: UseLiveUpdatesOptions): UseLiveUpdatesResult {
  const [schedule, setSchedule] = useState<LiveUpdateDto[]>([]);
  const [results, setResults] = useState<LiveUpdateDto[]>([]);
  const [awards, setAwards] = useState<LiveUpdateDto[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | undefined>(
    undefined
  );
  const [scheduleError, setScheduleError] = useState<string | undefined>(
    undefined
  );
  const [resultsError, setResultsError] = useState<string | undefined>(
    undefined
  );
  const [awardsError, setAwardsError] = useState<string | undefined>(undefined);

  const pushAndTrim =
    (setter: React.Dispatch<React.SetStateAction<LiveUpdateDto[]>>) =>
    (item: LiveUpdateDto) => {
      setter((prev) => {
        const exists = prev.find((p) => p.id === item.id);
        let arr: LiveUpdateDto[];
        if (exists) {
          arr = [item, ...prev.filter((p) => p.id !== item.id)];
        } else {
          arr = [item, ...prev];
        }
        return arr.slice(0, MAX_ITEMS);
      });
    };

  const pushSchedule = pushAndTrim(setSchedule);
  const pushResults = pushAndTrim(setResults);
  const pushAwards = pushAndTrim(setAwards);

  const normalize = (raw: any): LiveUpdateDto => {
    return {
      id:
        raw.id ??
        raw.eventId ??
        `${raw.type ?? raw.category ?? 'update'}-${Date.now()}`,
      type: (raw.type ?? raw.category ?? '').toString().toUpperCase(),
      tournamentId: raw.tournamentId,
      matchId: raw.matchId,
      title: raw.title,
      message: raw.message,
      createdAt: raw.createdAt ?? new Date().toISOString(),
    };
  };

  useLiveUpdatesFetcher({
    setSchedule,
    setResults,
    setAwards,
    setScheduleError,
    setResultsError,
    setAwardsError,
    normalize,
    eventName,
  });

  const { isConnected, connect, disconnect, pushTest } = useLiveUpdatesSocket({
    autoConnect,
    pushSchedule,
    pushResults,
    pushAwards,
    setErrorMessage,
    normalize,
  });

  return {
    schedule,
    results,
    awards,
    isConnected,
    errorMessage,
    scheduleError,
    resultsError,
    awardsError,
    connect,
    disconnect,
    pushTest,
  };
}
