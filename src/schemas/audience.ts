import { z } from 'zod';
import { parseZodSchema } from 'zod-key-parser';

export const audienceSchema = z.object({
  name: z.string({ required_error: 'Name is required.' }),
  phoneNumber: z.string({ required_error: 'Phone number is required.' }),
});

export type AudienceType = z.infer<typeof audienceSchema>;

export const audienceKeys = parseZodSchema(audienceSchema).keys;
