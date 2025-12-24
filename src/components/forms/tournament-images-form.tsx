'use client';
import React from 'react';
import { Label } from '../ui/label';
import { CustomInput } from '../ui/custom-input';
import { cn } from '../../utilities/utils';
import {
  Box,
  Typography,
  useTheme,
  Alert,
  Slide,
  Snackbar,
  SnackbarCloseReason,
  Button,
} from '@mui/material';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import CenterButton from '../button/center-button';
import { saveTournamentImages } from '@/services/postInternalAPI';
import {
  tournamentImagesSchema,
  TournamentImagesType,
} from '@/schemas/tournament-images';
import { useMotionTemplate, useMotionValue, motion } from 'framer-motion';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

export function TournamentImagesForm() {
  const theme = useTheme();
  const [loading, setLoading] = React.useState<boolean>(false);
  const [successSnackBar, setSuccessSnackBar] = React.useState<
    string | undefined
  >(undefined);
  const [failureSnackBar, setFailureSnackBar] = React.useState<
    string | undefined
  >(undefined);
  const [selectedFileNames, setSelectedFileNames] = React.useState<string[]>(
    []
  );

  const {
    handleSubmit,
    control,
    reset,
    register,
    setValue,
    trigger,
    formState: { errors },
  } = useForm<TournamentImagesType>({
    resolver: zodResolver(tournamentImagesSchema),
    defaultValues: {
      tournamentName: '',
      images: undefined,
    },
  });

  // Register images field manually on mount
  React.useEffect(() => {
    register('images');
  }, [register]);

  const handler: SubmitHandler<TournamentImagesType> = async (data) => {
    setLoading(true);
    const formData = new FormData();
    formData.append('tournamentName', data.tournamentName);
    if (data.images && data.images.length > 0) {
      for (let i = 0; i < data.images.length; i++) {
        formData.append('images', data.images[i]);
      }
    }

    const response = await saveTournamentImages(formData);
    setLoading(false);

    if (response.errorMessage) {
      setFailureSnackBar(response.errorMessage);
    } else {
      setSuccessSnackBar('Images saved successfully!');
      reset();
      setSelectedFileNames([]);
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

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const files = e.target.files;
      const names = Array.from(files).map((f) => f.name);
      setSelectedFileNames(names);
      setValue('images', files);
      await trigger('images');
    }
  };

  return (
    <Box className="max-w-md w-full mx-auto p-4 md:p-8">
      <form className="my-2" onSubmit={handleSubmit(handler)}>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="tournamentName">
            <Typography
              variant="body2"
              align="left"
              sx={{ color: theme.palette.text.primary }}
            >
              Tournament Name
            </Typography>
          </Label>
          <CustomInput
            id="tournamentName"
            placeholder="Enter Tournament Name"
            type="text"
            name="tournamentName"
            control={control}
            error={!!errors.tournamentName}
            helperText={errors.tournamentName?.message}
          />
        </LabelInputContainer>

        <LabelInputContainer className="mb-8">
          <Label htmlFor="images">
            <Typography
              variant="body2"
              align="left"
              sx={{ color: theme.palette.text.primary }}
            >
              Images
            </Typography>
          </Label>

          <CustomFileUpload
            error={!!errors.images}
            errorMessage={errors.images?.message as string}
          >
            <input
              id="images"
              type="file"
              multiple={true}
              accept="image/*"
              className="hidden"
              onChange={handleFileChange}
              name="images"
            />
            <Box
              display="flex"
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
              gap={1}
            >
              <CloudUploadIcon
                sx={{ fontSize: 40, color: theme.palette.text.secondary }}
              />
              <Typography variant="body2" color="textSecondary">
                {selectedFileNames.length > 0
                  ? `${selectedFileNames.length} file(s) selected`
                  : 'Click to upload images'}
              </Typography>
              {selectedFileNames.length > 0 && (
                <Typography variant="caption" color="textSecondary">
                  {selectedFileNames.join(', ')}
                </Typography>
              )}
            </Box>
          </CustomFileUpload>
        </LabelInputContainer>

        <CenterButton
          buttonType="submit"
          buttonText="Submit Images"
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

// Custom File Upload Component matching CustomInput styling
const CustomFileUpload = ({
  children,
  error,
  errorMessage,
}: {
  children: React.ReactNode;
  error?: boolean;
  errorMessage?: string;
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
    <div className="w-full">
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
        <label
          className={cn(
            `flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer 
            ${
              error
                ? 'border-red-500'
                : 'border-gray-300 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600'
            }
             ${inputTheme}`
          )}
        >
          {children}
        </label>
      </motion.div>
      {error && (
        <Typography variant="caption" color="error" sx={{ mt: 1, ml: 1 }}>
          {errorMessage}
        </Typography>
      )}
    </div>
  );
};
