import { EVENT_TYPE } from '@/enums/Event';

export interface CustomRadioInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
  helperText?: React.ReactNode;
  radioTypes: typeof EVENT_TYPE;
  name: any;
  control: any;
}
