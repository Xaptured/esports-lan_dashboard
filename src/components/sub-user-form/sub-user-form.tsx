import { Box, Typography, useTheme } from '@mui/material';
import { Label } from '@radix-ui/react-label';
import React from 'react';
import { CustomInput } from '../ui/custom-input';
import { SubmitHandler, useForm } from 'react-hook-form';
import { subUserKeys, subUserSchema, SubUserType } from '@/schemas/sub-user';
import { zodResolver } from '@hookform/resolvers/zod';
import { cn } from '@/utilities/utils';
import { registerSubUser } from '@/services/postInternalAPI';
import NavigationButtons from '../button/navigation-buttons';

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

export default function SubUserForm({
  eventName,
  dialogClose,
}: {
  eventName: string;
  dialogClose: () => void;
}) {
  const theme = useTheme();
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<SubUserType>({
    resolver: zodResolver(subUserSchema),
  });
  const [loading, setLoading] = React.useState<boolean>(false);
  const handler: SubmitHandler<SubUserType> = async (data) => {
    await registerSubUser(data, eventName);
    dialogClose();
  };
  return (
    <Box className="max-w-md w-full mx-auto  p-4 md:p-8 ">
      <form className="my-2" onSubmit={handleSubmit(handler)}>
        <LabelInputContainer className="mb-8">
          <Label htmlFor={subUserKeys.name}>
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
            id={subUserKeys.name}
            placeholder="name"
            type="text"
            name={subUserKeys.name}
            control={control}
            error={errors.name?.message ? true : false}
            helperText={errors.name?.message}
          />
        </LabelInputContainer>
        <LabelInputContainer className="mb-12">
          <Label htmlFor={subUserKeys.email}>
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
            id={subUserKeys.email}
            placeholder="Email"
            type="email"
            name={subUserKeys.email}
            control={control}
            error={errors.email?.message ? true : false}
            helperText={errors.email?.message}
          />
        </LabelInputContainer>
        {/* <CenterButton
          buttonType="submit"
          buttonText="Create user"
          size="large"
          styleString="w-full"
          icon={false}
          padding={{ left: 0, top: 3, right: 0, bottom: 3 }}
          fontSize="16"
          isLoading={loading}
        /> */}
        <NavigationButtons
          nextButtonType="submit"
          prevButtonType="button"
          nextButtonText="Create user"
          prevButtonText="cancel"
          size="small"
          styleString="w-full"
          padding={{ left: 0, top: 3, right: 0, bottom: 3 }}
          fontSize="16"
          handlePrevClick={dialogClose}
          gridContainerMarginTop="mt-1"
        />
      </form>
    </Box>
  );
}
