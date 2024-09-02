import { z } from "zod";

export const credentialSchema = z.object({
    email: z
        .string({
            required_error: 'Email is required.'
        })
        .email({ message: "Invalid email address" }),
    password: z
        .string({
            required_error: 'Password is required.'
        })
        .min(5, { message: "Password length must be greater than 4" })
})

export type CredentialsType = z.infer<typeof credentialSchema>;