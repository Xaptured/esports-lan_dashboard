'use client';

import { audienceKeys, audienceSchema, AudienceType } from '@/schemas/audience';
import { cn } from '@/utilities/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { Box, Typography, useTheme } from '@mui/material';
import { useRouter } from 'next/navigation';
import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import Cookies from 'universal-cookie';
import { Label } from '@radix-ui/react-label';
import { CustomInput } from '../ui/custom-input';
import CenterButton from '../button/center-button';
import { payAmount } from '@/services/postInternalAPI';

const cookies = new Cookies(null, { path: '/' });

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

export default function AudienceForm(props: {
  amount: number;
  eventName: string;
}) {
  const theme = useTheme();
  const email = cookies.get('email');
  const router = useRouter();
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<AudienceType>({
    resolver: zodResolver(audienceSchema),
  });
  const [loading, setLoading] = React.useState<boolean>(false);
  const handler: SubmitHandler<AudienceType> = async (data) => {
    const response = await payAmount(data, props.amount, props.eventName);
    window.location.href = response.data.redirectURL;
  };
  return (
    <Box className="max-w-md w-full mx-auto  p-4 md:p-8 ">
      <form className="my-2" onSubmit={handleSubmit(handler)}>
        <LabelInputContainer className="mb-8">
          <Label htmlFor={audienceKeys.name}>
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
              Name
            </Typography>
          </Label>
          <CustomInput
            id={audienceKeys.name}
            placeholder="name"
            type="text"
            name={audienceKeys.name}
            control={control}
            error={errors.name?.message ? true : false}
            helperText={errors.name?.message}
          />
        </LabelInputContainer>
        <LabelInputContainer className="mb-12">
          <Label htmlFor={audienceKeys.phoneNumber}>
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
              Phone number
            </Typography>
          </Label>
          <CustomInput
            id={audienceKeys.phoneNumber}
            placeholder="phone number"
            type="text"
            name={audienceKeys.phoneNumber}
            control={control}
            error={errors.phoneNumber?.message ? true : false}
            helperText={errors.phoneNumber?.message}
          />
        </LabelInputContainer>
        <CenterButton
          buttonType="submit"
          buttonText="Book ticket"
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
