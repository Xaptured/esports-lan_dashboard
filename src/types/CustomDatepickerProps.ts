import dayjs, { Dayjs } from 'dayjs';

export interface CustomDatepickerProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
  helperText?: React.ReactNode;
  name: any;
  control: any;
  handleOnChange: (value: dayjs.Dayjs | null) => void;
  getDateValue: () => Dayjs | undefined;
}
