import { CredentialsType } from "@/schemas/credentials";
import { Control } from "react-hook-form";

export interface CustomInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
  helperText?: React.ReactNode;
  label?: React.ReactNode;
  placeholder: string;
  name: keyof CredentialsType;
  control: Control<CredentialsType>;
}