import { stateList } from '@/constants/stateList';
import { EVENT_TYPE } from '@/enums/Event';
import { parseZodSchema } from 'zod-key-parser';
import { z } from 'zod';

export const isDateNotPast = (dateStr: string) => {
  const [month, day, year] = dateStr.split('/').map(Number);

  // Create a Date object using the provided month, day, and year
  const inputDate = new Date(year, month - 1, day); // Month is 0-indexed in Date

  const now = new Date();
  now.setHours(0, 0, 0, 0); // Set time to the start of the day for comparison
  inputDate.setHours(0, 0, 0, 0); // Also set input date time to the start of the day

  return inputDate >= now; // Check if the input date is today or in the future
};

export const isTimeNotPast = (timeStr: string) => {
  const now = new Date();
  const [time, modifier] = timeStr.split(' '); // Split into time and AM/PM
  let [hours, minutes] = time.split(':').map(Number); // Split into hours and minutes

  // Adjust hours for AM/PM
  if (modifier === 'PM' && hours < 12) {
    hours += 12; // Convert PM hours to 24-hour format
  } else if (modifier === 'AM' && hours === 12) {
    hours = 0; // Convert 12 AM to 0 hours
  }

  const inputTime = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate(),
    hours,
    minutes,
    0
  ); // Create Date object

  // Compare input time with current time
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
  prizepool: z.string({ required_error: 'Prizepool is required.' }),
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
        // Validate the date
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
  eventName: z.string({ required_error: 'Event name is required.' }),
  gameName: z.string({ required_error: 'Game name is required.' }),
  address: addressSchema,
  eventDetails: eventDetailsSchema,
});

export type EventType = z.infer<typeof eventSchema>;

export const eventKeys = parseZodSchema(eventSchema).keys;
