import { z } from 'zod';
import { parseZodSchema } from 'zod-key-parser';

export const helpSchema = z.object({
  email: z
    .string({
      required_error: 'Email is required.',
    })
    .email({ message: 'Invalid email address' }),
  query: z
    .string({
      required_error: 'Query is required.',
    })
    .min(5, { message: 'Query length must be greater than 4' }),
});

export type HelpType = z.infer<typeof helpSchema>;
export const helpKeys = parseZodSchema(helpSchema).keys;
