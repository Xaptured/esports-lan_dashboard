import { z } from 'zod';
import { parseZodSchema } from 'zod-key-parser';

export function teamSchema(teammateCount: number) {
  return z.object({
    teamName: z
      .string()
      .min(1, 'Team name is required')
      .max(20, 'Team name must be 20 characters or less'),
    teammateEmails: z
      .array(z.string().email('Invalid email address'))
      .min(1, 'At least one teammate email is required')
      .max(
        teammateCount,
        `A team can have a maximum of ${teammateCount} teammates`
      ),
  });
}

export type TeamType = z.infer<ReturnType<typeof teamSchema>>;

export const teamKeys = parseZodSchema(
  z.object({ ...teamSchema(0).shape })
).keys;

export type TeamPayload = {
  teamName: string;
  eventName: string;
  status: string;
  teamMates: {
    email: string;
    isEmailRegistered: boolean;
  }[];
};
