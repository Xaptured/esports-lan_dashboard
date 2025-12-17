import { z } from 'zod';

export enum LIVE_UPDATE_CATEGORY {
  SCHEDULE = 'SCHEDULE',
  RESULT = 'RESULT',
  AWARD = 'AWARD',
}

export const liveUpdatesSchema = z.object({
  category: z.nativeEnum(LIVE_UPDATE_CATEGORY, {
    errorMap: () => ({ message: 'Please select a valid category' }),
  }),
  tournamentId: z.string().min(1, 'Tournament ID is required'),
  title: z.string().min(1, 'Title is required').max(100, 'Title is too long'),
  message: z.string().min(1, 'Message is required'),
});

export type LiveUpdatesType = z.infer<typeof liveUpdatesSchema>;
