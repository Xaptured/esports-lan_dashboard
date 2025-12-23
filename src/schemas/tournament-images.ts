import { z } from 'zod';

const MAX_FILE_SIZE = 5000000;
const ACCEPTED_IMAGE_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp',
];

export const tournamentImagesSchema = z.object({
  tournamentName: z.string().min(1, { message: 'Tournament Name is required' }),
  images: z
    .any()
    .refine((files) => files?.length > 0, 'Image is required.')
    .refine((files) => {
      if (!files) return false;
      for (let i = 0; i < files.length; i++) {
        if (files[i].size > MAX_FILE_SIZE) return false;
      }
      return true;
    }, `Max file size is 5MB.`)
    .refine((files) => {
      if (!files) return false;
      for (let i = 0; i < files.length; i++) {
        if (!ACCEPTED_IMAGE_TYPES.includes(files[i].type)) return false;
      }
      return true;
    }, 'Only .jpg, .jpeg, .png and .webp formats are supported.'),
});

export type TournamentImagesType = z.infer<typeof tournamentImagesSchema>;
