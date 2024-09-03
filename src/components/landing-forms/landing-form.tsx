'use client';
import React from 'react';
import { Label } from '../ui/label';
import { CustomInput } from '../ui/input';
import { cn } from '../../utilities/utils';
import { Box, Typography, useTheme } from '@mui/material';
import { LandingFormProps } from '@/types/LandingFormProps';
import { useForm, SubmitHandler } from 'react-hook-form';
import { credentialSchema, CredentialsType } from '@/schemas/credentials';
import { zodResolver } from '@hookform/resolvers/zod';
import CenterButton from '../button/center-button';

export function LandingForm(props: LandingFormProps) {
  const theme = useTheme();
  const buttonTheme =
    theme.palette.mode === 'dark'
      ? 'from-zinc-900 to-zinc-900 bg-zinc-800 shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]'
      : ' bg-gradient-to-br from-black to-neutral-600 shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset]';
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<CredentialsType>({
    resolver: zodResolver(credentialSchema),
  });

  const handler: SubmitHandler<CredentialsType> = (data) => console.log(data);

  return (
    <Box className="max-w-md w-full mx-auto  p-4 md:p-8 ">
      <form className="my-2" onSubmit={handleSubmit(handler)}>
        <LabelInputContainer className="mb-8">
          <Label htmlFor="email">
            <Typography
              variant="body2"
              align="left"
              gutterBottom={false}
              noWrap={false}
              sx={{
                color: theme.palette.text.primary,
                textDecoration: 'none',
              }}
            >
              Email address
            </Typography>
          </Label>
          <CustomInput
            id="email"
            placeholder="email@email.com"
            type="email"
            name="email"
            control={control}
            error={errors.email?.message ? true : false}
            helperText={errors.email?.message}
          />
        </LabelInputContainer>
        <LabelInputContainer className="mb-12">
          <Label htmlFor="password">
            <Typography
              variant="body2"
              align="left"
              gutterBottom={false}
              noWrap={false}
              sx={{
                color: theme.palette.text.primary,
                textDecoration: 'none',
              }}
            >
              Password
            </Typography>
          </Label>
          <CustomInput
            id="password"
            placeholder="••••••••"
            type="password"
            name="password"
            control={control}
            error={errors.password?.message ? true : false}
            helperText={errors.password?.message}
          />
        </LabelInputContainer>
        <CenterButton
          buttonType="submit"
          buttonText={props.buttonText}
          size="large"
          styleString="w-full"
          icon={false}
          padding={{ left: 0, top: 3, right: 0, bottom: 3 }}
          fontSize="16"
        />
        {/* <button
          className={`relative group/btn block w-full text-white rounded-md h-12 font-medium ${buttonTheme}`}
          type="submit"
        >
          {props.buttonText}
          <BottomGradient />
        </button> */}
      </form>
    </Box>
  );
}

const BottomGradient = () => {
  return (
    <>
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
      <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
    </>
  );
};

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn('flex flex-col space-y-2 w-full', className)}>
      {children}
    </div>
  );
};
