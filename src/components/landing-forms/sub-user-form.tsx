'use client';
import React from 'react';
import { Label } from '../ui/label';
import { CustomInput } from '../ui/custom-input';
import { cn } from '../../utilities/utils';
import { Box, Typography, useTheme } from '@mui/material';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import CenterButton from '../button/center-button';
import { verifySubUser } from '@/services/postInternalAPI';
import { useSetAtom } from 'jotai/react';
import { snackBarAtom, snackBarMessageAtom } from '@/atoms/primitive';
import { useRouter } from 'next/navigation';
import {
  subUserLoginKeys,
  subUserLoginSchema,
  SubUserLoginType,
} from '@/schemas/sub-user';
import Cookies from 'universal-cookie';

const cookies = new Cookies(null, { path: '/' });

export function LandingSubUserForm() {
  const theme = useTheme();
  const router = useRouter();
  const [loading, setLoading] = React.useState<boolean>(false);
  const setSnackBar = useSetAtom(snackBarAtom);
  const setSnackBarMessage = useSetAtom(snackBarMessageAtom);
  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm<SubUserLoginType>({
    resolver: zodResolver(subUserLoginSchema),
  });

  const handler: SubmitHandler<SubUserLoginType> = async (data) => {
    setLoading(true);
    const response = await verifySubUser(data);
    setLoading(false);

    if (response.errorMessage) {
      setSnackBar(true);
      setSnackBarMessage(response.errorMessage);
    } else if (response.data.result) {
      cookies.set('sub-user-event', response.data.eventName);
      router.push('/organizer-home/check-in/verify-user');
    } else {
      setSnackBar(true);
      setSnackBarMessage('Password is incorrect');
    }
  };

  return (
    <Box className="max-w-md w-full mx-auto  p-4 md:p-8 ">
      <form className="my-2" onSubmit={handleSubmit(handler)}>
        <LabelInputContainer className="mb-8">
          <Label htmlFor={subUserLoginKeys.userName}>
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
              Username
            </Typography>
          </Label>
          <CustomInput
            id={subUserLoginKeys.userName}
            placeholder="username"
            type="text"
            name={subUserLoginKeys.userName}
            control={control}
            error={errors.userName?.message ? true : false}
            helperText={errors.userName?.message}
          />
        </LabelInputContainer>
        <LabelInputContainer className="mb-12">
          <Label htmlFor={subUserLoginKeys.userPassword}>
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
            id={subUserLoginKeys.userPassword}
            placeholder="••••••••"
            type="password"
            name={subUserLoginKeys.userPassword}
            control={control}
            error={errors.userPassword?.message ? true : false}
            helperText={errors.userPassword?.message}
          />
        </LabelInputContainer>
        <CenterButton
          buttonType="submit"
          buttonText="Login"
          size="large"
          styleString="w-full"
          icon={false}
          padding={{ left: 0, top: 3, right: 0, bottom: 3 }}
          fontSize="16"
          isLoading={loading}
        />
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
