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

export const subUserLoginSchema = z.object({
  userName: z.string({
    required_error: 'Username is required.',
  }),
  userPassword: z.string({ required_error: 'Password is required.' }),
});

export type SubUserLoginType = z.infer<typeof subUserLoginSchema>;

export const subUserLoginKeys = parseZodSchema(subUserLoginSchema).keys;
