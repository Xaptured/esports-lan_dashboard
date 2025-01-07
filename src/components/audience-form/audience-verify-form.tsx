'use client';
import React from 'react';
import { Label } from '../ui/label';
import { CustomInput } from '../ui/custom-input';
import { cn } from '../../utilities/utils';
import {
  Alert,
  Box,
  Slide,
  Snackbar,
  SnackbarCloseReason,
  Typography,
  useTheme,
} from '@mui/material';
import { LandingFormProps } from '@/types/LandingFormProps';
import { useForm, SubmitHandler } from 'react-hook-form';
import { credentialSchema, CredentialsType } from '@/schemas/credentials';
import { zodResolver } from '@hookform/resolvers/zod';
import CenterButton from '../button/center-button';
import {
  loginUser,
  registerUser,
  verifyAudienceTicket,
  verifySubUser,
} from '@/services/postInternalAPI';
import { useSetAtom } from 'jotai/react';
import { snackBarAtom, snackBarMessageAtom } from '@/atoms/primitive';
import { useRouter } from 'next/navigation';
import { ROLE } from '@/enums/Roles';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import {
  subUserLoginKeys,
  subUserLoginSchema,
  SubUserLoginType,
} from '@/schemas/sub-user';
import {
  audienceVerifyKeys,
  audienceVerifySchema,
  AudienceVerifyType,
} from '@/schemas/audience';
import Cookies from 'universal-cookie';

const cookies = new Cookies(null, { path: '/' });

export function AudienceVerifyForm() {
  const theme = useTheme();
  const router = useRouter();
  const eventName = cookies.get('sub-user-event');
  const [loading, setLoading] = React.useState<boolean>(false);
  const [successSnackBar, setSuccessSnackBar] = React.useState<
    string | undefined
  >(undefined);
  const [failureSnackBar, setFailureSnackBar] = React.useState<
    string | undefined
  >(undefined);
  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm<AudienceVerifyType>({
    resolver: zodResolver(audienceVerifySchema),
  });

  const handler: SubmitHandler<AudienceVerifyType> = async (audienceData) => {
    setLoading(true);
    const { data, errorMessage } = await verifyAudienceTicket(
      audienceData,
      eventName
    );
    setLoading(false);
    if (errorMessage) {
      setFailureSnackBar(errorMessage);
    } else if (data) {
      setSuccessSnackBar('Details are correct');
    } else {
      setFailureSnackBar('Details are incorrect');
    }
  };

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: SnackbarCloseReason
  ) => {
    if (reason === 'clickaway') {
      return;
    }
    if (successSnackBar) {
      setSuccessSnackBar(undefined);
    }
    if (failureSnackBar) {
      setFailureSnackBar(undefined);
    }
  };

  return (
    <Box className="max-w-md w-full mx-auto  p-4 md:p-8 ">
      <form className="my-2" onSubmit={handleSubmit(handler)}>
        <LabelInputContainer className="mb-8">
          <Label htmlFor={audienceVerifyKeys.email}>
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
              Email
            </Typography>
          </Label>
          <CustomInput
            id={audienceVerifyKeys.email}
            placeholder="abc@abc.com"
            type="email"
            name={audienceVerifyKeys.email}
            control={control}
            error={errors.email?.message ? true : false}
            helperText={errors.email?.message}
          />
        </LabelInputContainer>
        <LabelInputContainer className="mb-12">
          <Label htmlFor={audienceVerifyKeys.ticketNumber}>
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
              Ticket number
            </Typography>
          </Label>
          <CustomInput
            id={audienceVerifyKeys.ticketNumber}
            placeholder="ticket number"
            type="text"
            name={audienceVerifyKeys.ticketNumber}
            control={control}
            error={errors.ticketNumber?.message ? true : false}
            helperText={errors.ticketNumber?.message}
          />
        </LabelInputContainer>
        <CenterButton
          buttonType="submit"
          buttonText="Verify"
          size="large"
          styleString="w-full"
          icon={false}
          padding={{ left: 0, top: 3, right: 0, bottom: 3 }}
          fontSize="16"
          isLoading={loading}
        />
      </form>
      <Snackbar
        open={successSnackBar ? true : false}
        autoHideDuration={6000}
        TransitionComponent={Slide}
        anchorOrigin={{ horizontal: 'center', vertical: 'bottom' }}
        onClose={handleClose}
      >
        <Alert
          severity="success"
          variant="filled"
          sx={{ width: '100%' }}
          onClose={handleClose}
        >
          {successSnackBar}
        </Alert>
      </Snackbar>
      <Snackbar
        open={failureSnackBar ? true : false}
        autoHideDuration={6000}
        TransitionComponent={Slide}
        onClose={handleClose}
        anchorOrigin={{ horizontal: 'center', vertical: 'bottom' }}
      >
        <Alert
          severity="error"
          variant="filled"
          sx={{ width: '100%' }}
          onClose={handleClose}
        >
          {failureSnackBar}
        </Alert>
      </Snackbar>
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
