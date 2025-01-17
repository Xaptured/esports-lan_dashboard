export interface CustomInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
  helperText?: React.ReactNode;
  label?: React.ReactNode;
  placeholder: string;
  name: any;
  control: any;
}
