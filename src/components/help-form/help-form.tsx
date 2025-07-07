'use client';

import { Box, Typography, useTheme } from '@mui/material';
import { Label } from '@radix-ui/react-label';
import React from 'react';
import CenterButton from '../button/center-button';
import { CustomInput } from '../ui/custom-input';
import { cn } from '@/utilities/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, SubmitHandler } from 'react-hook-form';
import { helpKeys, helpSchema, HelpType } from '@/schemas/help';
import { saveComments } from '@/services/postInternalAPI';

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

export type HelpFormProps = {
  isFeedback: boolean;
  handleSubmitOrClose?: () => void;
};

export default function HelpForm({
  isFeedback,
  handleSubmitOrClose,
}: HelpFormProps) {
  const theme = useTheme();
  const [loading, setLoading] = React.useState<boolean>(false);
  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm<HelpType>({
    resolver: zodResolver(helpSchema),
  });

  const handler: SubmitHandler<HelpType> = async (data) => {
    if (handleSubmitOrClose) {
      handleSubmitOrClose();
    }
    await saveComments(data);
  };

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
            name={helpKeys.email}
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
              {isFeedback ? 'Feedback' : 'Query'}
            </Typography>
          </Label>
          <CustomInput
            id="query"
            placeholder={isFeedback ? 'Your feedback' : 'Your query/concern'}
            type="text"
            name={helpKeys.query}
            control={control}
            error={errors.query?.message ? true : false}
            helperText={errors.query?.message}
          />
        </LabelInputContainer>
        <CenterButton
          buttonType="submit"
          buttonText="submit"
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
