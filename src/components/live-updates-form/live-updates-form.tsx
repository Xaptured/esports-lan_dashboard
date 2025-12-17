'use client';
import React from 'react';
import { Label } from '../ui/label';
import { CustomInput } from '../ui/custom-input';
import { cn } from '../../utilities/utils';
import {
  Box,
  Typography,
  useTheme,
  MenuItem,
  Select,
  FormControl,
  Alert,
  Slide,
  Snackbar,
  SnackbarCloseReason,
} from '@mui/material';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import CenterButton from '../button/center-button';
import { saveLiveUpdate } from '@/services/postInternalAPI';
import {
  liveUpdatesSchema,
  LiveUpdatesType,
  LIVE_UPDATE_CATEGORY,
} from '@/schemas/live-updates';
import { useMotionTemplate, useMotionValue, motion } from 'framer-motion';

export function LiveUpdatesForm() {
  const theme = useTheme();
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
    reset,
    formState: { errors },
  } = useForm<LiveUpdatesType>({
    resolver: zodResolver(liveUpdatesSchema),
    defaultValues: {
      category: LIVE_UPDATE_CATEGORY.SCHEDULE,
      tournamentId: '',
      title: '',
      message: '',
    },
  });

  const handler: SubmitHandler<LiveUpdatesType> = async (data) => {
    setLoading(true);
    const response = await saveLiveUpdate(data);
    setLoading(false);

    if (response.errorMessage) {
      setFailureSnackBar(response.errorMessage);
    } else {
      setSuccessSnackBar('Live update saved successfully!');
      reset();
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
    <Box className="max-w-md w-full mx-auto p-4 md:p-8">
      <form className="my-2" onSubmit={handleSubmit(handler)}>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="category">
            <Typography
              variant="body2"
              align="left"
              sx={{ color: theme.palette.text.primary }}
            >
              Category
            </Typography>
          </Label>
          <CustomSelect name="category" control={control} label="">
            {Object.values(LIVE_UPDATE_CATEGORY).map((category) => (
              <MenuItem key={category} value={category}>
                {category}
              </MenuItem>
            ))}
          </CustomSelect>
          {errors.category && (
            <Typography variant="caption" color="error">
              {errors.category.message}
            </Typography>
          )}
        </LabelInputContainer>

        <LabelInputContainer className="mb-4">
          <Label htmlFor="tournamentId">
            <Typography
              variant="body2"
              align="left"
              sx={{ color: theme.palette.text.primary }}
            >
              Tournament ID
            </Typography>
          </Label>
          <CustomInput
            id="tournamentId"
            placeholder="Enter Tournament ID"
            type="text"
            name="tournamentId"
            control={control}
            error={!!errors.tournamentId}
            helperText={errors.tournamentId?.message}
          />
        </LabelInputContainer>

        <LabelInputContainer className="mb-4">
          <Label htmlFor="title">
            <Typography
              variant="body2"
              align="left"
              sx={{ color: theme.palette.text.primary }}
            >
              Title
            </Typography>
          </Label>
          <CustomInput
            id="title"
            placeholder="Enter Title"
            type="text"
            name="title"
            control={control}
            error={!!errors.title}
            helperText={errors.title?.message}
          />
        </LabelInputContainer>

        <LabelInputContainer className="mb-8">
          <Label htmlFor="message">
            <Typography
              variant="body2"
              align="left"
              sx={{ color: theme.palette.text.primary }}
            >
              Message
            </Typography>
          </Label>
          <CustomInput
            id="message"
            placeholder="Enter Message"
            type="text"
            name="message"
            control={control}
            error={!!errors.message}
            helperText={errors.message?.message}
          />
        </LabelInputContainer>

        <CenterButton
          buttonType="submit"
          buttonText="Submit Update"
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

// Custom Select Component matching CustomInput styling
const CustomSelect = ({
  name,
  control,
  children,
  label,
}: {
  name: string;
  control: any;
  children: React.ReactNode;
  label: string;
}) => {
  const theme = useTheme();
  const inputTheme =
    theme.palette.mode === 'dark'
      ? 'bg-zinc-800 text-white placeholder-text-neutral-600 focus-visible:ring-neutral-600 shadow-[0px_0px_1px_1px_var(--neutral-700)]'
      : 'bg-gray-50 text-white placeholder:text-neutral-400 focus-visible:ring-neutral-400';
  const radius = 200;
  const [visible, setVisible] = React.useState(false);

  let mouseX = useMotionValue(0);
  let mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: any) {
    let { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <motion.div
      style={{
        background: useMotionTemplate`
            radial-gradient(
              ${
                visible ? radius + 'px' : '0px'
              } circle at ${mouseX}px ${mouseY}px,
              var(--blue-500),
              transparent 80%
            )
          `,
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
      className="p-[2px] rounded-lg transition duration-300 group/input"
    >
      <Controller
        name={name}
        control={control}
        rules={{ required: true }}
        render={({ field }) => (
          <Select
            {...field}
            variant="standard"
            displayEmpty
            fullWidth
            className={cn(
              `flex h-13 w-full border-none shadow-input rounded-md px-3 py-2 text-sm 
                focus-visible:outline-none focus-visible:ring-[2px]
                transition duration-400 ${inputTheme}`
            )}
            sx={{
              '& .MuiSelect-select': {
                padding: '0 !important',
                display: 'flex',
                alignItems: 'center',
              },
              '&:before': { borderBottom: 'none !important' },
              '&:after': { borderBottom: 'none !important' },
              '&:hover:not(.Mui-disabled, .Mui-error):before': {
                borderBottom: 'none !important',
              },
            }}
          >
            {children}
          </Select>
        )}
      />
    </motion.div>
  );
};
