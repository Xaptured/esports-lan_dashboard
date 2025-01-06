import { z } from 'zod';
import { parseZodSchema } from 'zod-key-parser';

export const subUserSchema = z.object({
  email: z
    .string({
      required_error: 'Email is required.',
    })
    .email({ message: 'Invalid email address' }),
  name: z.string({ required_error: 'Name is required.' }),
});

export type SubUserType = z.infer<typeof subUserSchema>;

export const subUserKeys = parseZodSchema(subUserSchema).keys;
