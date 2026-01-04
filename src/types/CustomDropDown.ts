export interface CustomDropdownProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
  helperText?: string;
  label?: React.ReactNode;
  placeholder: string;
  name: any;
  control: any;
  options: { label: string; value: string | number }[];
}
