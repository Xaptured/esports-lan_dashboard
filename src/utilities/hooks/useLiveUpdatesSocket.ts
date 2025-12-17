import type { LiveUpdateDto } from './useLiveUpdates';
import { Client, IMessage, StompSubscription } from '@stomp/stompjs';
import { useEffect, useRef, useState } from 'react';

const WS_URL = 'http://localhost:8086/live-updates/ws';

type UseLiveUpdatesSocketProps = {
  autoConnect: boolean;
  pushSchedule: (item: LiveUpdateDto) => void;
  pushResults: (item: LiveUpdateDto) => void;
  pushAwards: (item: LiveUpdateDto) => void;
  setErrorMessage: React.Dispatch<React.SetStateAction<string | undefined>>;
  normalize: (raw: any) => LiveUpdateDto;
};

export type UseLiveUpdatesSocketResult = {
  isConnected: boolean;
  connect: () => void;
  disconnect: () => void;
  pushTest: (obj: Partial<LiveUpdateDto>) => void;
};

export default function useLiveUpdatesSocket({
  autoConnect,
  pushSchedule,
  pushResults,
  pushAwards,
  setErrorMessage,
  normalize,
}: UseLiveUpdatesSocketProps): UseLiveUpdatesSocketResult {
  const [connected, setConnected] = useState(false);
  const clientRef = useRef<Client | null>(null);
  const subsRef = useRef<StompSubscription[]>([]);

  const handleMessage = (body: string | object) => {
    try {
      const raw = typeof body === 'string' ? JSON.parse(body) : body;
      const normalized = normalize(raw);
      switch (normalized.type) {
        case 'SCHEDULE':
          pushSchedule(normalized);
          break;
        case 'RESULT':
          pushResults(normalized);
          break;
        case 'AWARD':
          pushAwards(normalized);
          break;
        default:
          console.warn('Unknown live update type:', normalized.type);
      }
    } catch (err) {
      setErrorMessage('Failed to handle live update message');
    }
  };

  useEffect(() => {
    if (!autoConnect) return;
    if (typeof window === 'undefined') return;
    if (!WS_URL) return;

    const client = new Client({
      brokerURL: 'ws://localhost:8086/live-updates/ws',
      reconnectDelay: 5000,
      debug: () => {},
      onConnect: () => {
        setConnected(true);
        try {
          const s1 = client.subscribe('/topic/results', (msg: IMessage) =>
            handleMessage(msg.body)
          );
          const s2 = client.subscribe('/topic/schedule', (msg: IMessage) =>
            handleMessage(msg.body)
          );
          const s3 = client.subscribe('/topic/awards', (msg: IMessage) =>
            handleMessage(msg.body)
          );
          subsRef.current = [s1, s2, s3];
        } catch (err) {
          setErrorMessage('Failed to subscribe to live updates');
        }
      },
      onStompError: (frame) => {
        setErrorMessage('Connection error: ' + frame.headers['message']);
      },
      onWebSocketClose: () => {
        setConnected(false);
      },
    });

    clientRef.current = client;
    client.activate();

    return () => {
      try {
        subsRef.current.forEach((s) => s && s.unsubscribe && s.unsubscribe());
        client.deactivate();
      } catch (err) {}
      clientRef.current = null;
      setConnected(false);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [WS_URL, autoConnect]);

  const connect = () => {
    if (clientRef.current && !clientRef.current.active)
      clientRef.current.activate();
  };
  const disconnect = () => {
    if (clientRef.current && clientRef.current.active)
      clientRef.current.deactivate();
  };

  const pushTest = (obj: Partial<LiveUpdateDto>) =>
    handleMessage(JSON.stringify(obj));

  return {
    isConnected: connected,
    connect,
    disconnect,
    pushTest,
  };
}
