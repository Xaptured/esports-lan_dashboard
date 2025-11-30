import { z } from 'zod';

export const AdvertisementBaseSchema = z.object({
  advertiserName: z
    .string()
    .min(1, 'Advertiser name is required')
    .max(100, 'Advertiser name must be under 100 characters'),

  imagePath: z
    .string()
    .min(1, 'Image path is required')
    .regex(/^[^<>:"|?*]+$/, 'Invalid characters in image path'),

  altText: z
    .string()
    .max(255, 'Alt text must be under 255 characters')
    .optional()
    .or(z.literal('')),
});

export const AdvertisementFullSchema = AdvertisementBaseSchema.extend({
  targetUrl: z.string().url('Target URL must be a valid URL'),

  active: z.boolean().default(true),
});

export type AdvertisementBase = z.infer<typeof AdvertisementBaseSchema>;
export type Advertisement = z.infer<typeof AdvertisementFullSchema>;
