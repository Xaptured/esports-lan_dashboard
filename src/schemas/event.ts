import { stateList } from '@/constants/stateList';
import { EVENT_TYPE } from '@/enums/Event';
import { parseZodSchema } from 'zod-key-parser';
import { z } from 'zod';

export const isDateNotPast = (dateStr: string) => {
  const [month, day, year] = dateStr.split('/').map(Number);

  const inputDate = new Date(year, month - 1, day);

  const now = new Date();
  now.setHours(0, 0, 0, 0);
  inputDate.setHours(0, 0, 0, 0);

  return inputDate >= now;
};

export const isTimeNotPast = (timeStr: string) => {
  const now = new Date();
  const [time, modifier] = timeStr.split(' ');
  let [hours, minutes] = time.split(':').map(Number);

  if (modifier === 'PM' && hours < 12) {
    hours += 12;
  } else if (modifier === 'AM' && hours === 12) {
    hours = 0;
  }

  const inputTime = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate(),
    hours,
    minutes,
    0
  );

  return inputTime >= now;
};

const addressSchema = z.object({
  addressLineOne: z.string({ required_error: 'Address is required.' }),
  addressLineTwo: z.string().optional(),
  city: z.string({ required_error: 'City is required.' }),
  state: z.enum(stateList, { required_error: 'State is required.' }),
  zipCode: z.string({ required_error: 'Zip code is required.' }),
});

const eventDetailsSchema = z.object({
  eventType: z.nativeEnum(EVENT_TYPE, {
    required_error: 'Event type is required.',
  }),
  prizePool: z.string({ required_error: 'Prizepool is required.' }),
  totalSlots: z
    .string({ required_error: 'Total slots is required.' })
    .refine((val) => !isNaN(Number(val)), {
      message: 'Invalid number',
    })
    .transform((val) => Number(val)),
  date: z.coerce
    .string({ required_error: 'Date is required.' })
    .refine((value) => /^\d{1,2}\/\d{1,2}\/\d{4}$/.test(value), {
      message: 'Date must be in the format "MM/DD/YYYY"',
    })
    .refine(
      (value) => {
        const [month, day, year] = value.split('/').map(Number);
        const date = new Date(year, month - 1, day);
        return (
          date.getFullYear() === year &&
          date.getMonth() === month - 1 &&
          date.getDate() === day
        );
      },
      {
        message: 'Invalid date',
      }
    )
    .refine(isDateNotPast, {
      message: 'Date cannot be in the past',
    }),
});

export const eventSchema = z.object({
  name: z.string({ required_error: 'Event name is required.' }),
  gameName: z.string({ required_error: 'Game name is required.' }),
  address: addressSchema,
  eventDetails: eventDetailsSchema,
});

export type EventType = z.infer<typeof eventSchema>;

export const eventKeys = parseZodSchema(eventSchema).keys;
