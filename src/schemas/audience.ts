import { z } from 'zod';
import { parseZodSchema } from 'zod-key-parser';

export const audienceSchema = z.object({
  name: z.string({ required_error: 'Name is required.' }),
  phoneNumber: z.string({ required_error: 'Phone number is required.' }),
});

export type AudienceType = z.infer<typeof audienceSchema>;

export const audienceKeys = parseZodSchema(audienceSchema).keys;

export const audienceVerifySchema = z.object({
  email: z
    .string({
      required_error: 'Email is required.',
    })
    .email({ message: 'Invalid email address' }),
  ticketNumber: z.string({ required_error: 'Ticket number is required.' }),
});

export type AudienceVerifyType = z.infer<typeof audienceVerifySchema>;

export const audienceVerifyKeys = parseZodSchema(audienceVerifySchema).keys;
