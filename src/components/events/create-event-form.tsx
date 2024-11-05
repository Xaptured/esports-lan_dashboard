import {
  Box,
  Typography,
  useTheme,
  FormControl,
  MenuItem,
  Select,
  FormHelperText,
  Grid,
  Dialog,
  DialogTitle,
  Button,
  DialogActions,
  DialogContent,
  DialogContentText,
  Slide,
  Paper,
  PaperProps,
  Container,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Label } from '../ui/label';
import { CustomInput } from '../ui/custom-input';
import { cn } from '../../utilities/utils';
import { useForm, SubmitHandler } from 'react-hook-form';
import { eventKeys, eventSchema, EventType } from '@/schemas/event';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMotionTemplate, useMotionValue, motion } from 'framer-motion';
import { stateList } from '@/constants/stateList';
import { Controller } from 'react-hook-form';
import { EVENT_TYPE } from '@/enums/Event';
import { RadioInput } from '../ui/radio';
import NavigationButtons from '../button/navigation-buttons';
import { useRouter } from 'next/navigation';
import dayjs from 'dayjs';
import { CustomDatepicker } from '../ui/custom-datepicker';
import { TransitionProps } from '@mui/material/transitions';

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

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const PaperComponent: React.FC<PaperProps> = (props) => {
  return (
    <Paper
      {...props}
      sx={{
        background: 'transparent',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
      variant="outlined"
      className="backdrop-blur-md w-full h-full"
    >
      <Paper
        {...props}
        sx={{ width: '40%', height: 'auto' }}
        variant="outlined"
        className="backdrop-blur-xl"
      />
    </Paper>
  );
};

export default function CreateEventForm({ className }: { className: string }) {
  const theme = useTheme();
  const router = useRouter();
  const {
    handleSubmit,
    control,
    setValue,
    setError,
    getValues,
    watch,
    formState: { errors, submitCount },
  } = useForm<EventType>({
    resolver: zodResolver(eventSchema),
  });
  const inputTheme =
    theme.palette.mode === 'dark'
      ? 'bg-zinc-800 text-white placeholder-text-neutral-600 focus-visible:ring-neutral-600 shadow-[0px_0px_1px_1px_var(--neutral-700)]'
      : 'bg-gray-50 text-white placeholder:text-neutral-400 focus-visible:ring-neutral-400';
  const radius = 200;
  const [visible, setVisible] = useState(false);
  const [isDateTouched, setDateTouched] = useState(false);
  const [open, setOpen] = React.useState(false);

  const DATE_VALUE = watch(eventKeys.eventDetails.date);

  useEffect(() => {
    if (!DATE_VALUE && submitCount > 0) {
      setError(eventKeys.eventDetails.date, { message: 'Date is required.' });
    }
  }, [DATE_VALUE, submitCount]);

  let mouseX = useMotionValue(0);
  let mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: any) {
    let { left, top } = currentTarget.getBoundingClientRect();

    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  const dateOnChange = (value: dayjs.Dayjs | null) => {
    if (value) {
      setDateTouched(true);
      setValue(
        eventKeys.eventDetails.date,
        value.format('MM/DD/YYYY').toString()
      );
    }
  };

  const handleDialogOpen = () => {
    setOpen(true);
  };

  const handleDialogClose = () => {
    setOpen(false);
  };

  const getDate = () => {
    if (isDateTouched) {
      const date = dayjs(getValues(eventKeys.eventDetails.date));
      return date;
    }
    return undefined;
  };

  const handler: SubmitHandler<EventType> = async (data) => {
    console.log(data);
    handleDialogOpen();
  };

  return (
    <Box className="w-full mx-auto  p-4 md:p-8 ">
      <form className="my-2" onSubmit={handleSubmit(handler)}>
        <Grid container spacing={2}>
          <Grid item xl={6} lg={6} md={6} sm={12}>
            {/* EVENT NAME */}
            <LabelInputContainer className="mb-8">
              <Label htmlFor={eventKeys.eventName}>
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
                  Event name
                </Typography>
              </Label>
              <CustomInput
                id={eventKeys.eventName}
                placeholder="Xapture's Event"
                type="text"
                name={eventKeys.eventName}
                control={control}
                error={errors.eventName ? true : false}
                helperText={errors.eventName?.message}
              />
            </LabelInputContainer>
          </Grid>
          <Grid item xl={6} lg={6} md={6} sm={12}>
            {/* GAME NAME */}
            <LabelInputContainer className="mb-8">
              <Label htmlFor={eventKeys.gameName}>
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
                  Game name
                </Typography>
              </Label>
              <CustomInput
                id={eventKeys.gameName}
                placeholder="PUBG"
                type="text"
                name={eventKeys.gameName}
                control={control}
                error={errors.gameName ? true : false}
                helperText={errors.gameName?.message}
              />
            </LabelInputContainer>
          </Grid>
        </Grid>

        {/* Address Line One */}
        <LabelInputContainer className="mb-8">
          <Label htmlFor={eventKeys.address.addressLineOne}>
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
              Address Line One
            </Typography>
          </Label>
          <CustomInput
            id={eventKeys.address.addressLineOne}
            placeholder="Address Line One"
            type="text"
            name={eventKeys.address.addressLineOne}
            control={control}
            error={errors.address?.addressLineOne ? true : false}
            helperText={errors.address?.addressLineOne?.message}
          />
        </LabelInputContainer>
        {/* Address Line Two */}
        <LabelInputContainer className="mb-8">
          <Label htmlFor={eventKeys.address.addressLineTwo}>
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
              Address Line Two
            </Typography>
          </Label>
          <CustomInput
            id={eventKeys.address.addressLineTwo}
            placeholder="Address Line Two"
            type="text"
            name={eventKeys.address.addressLineTwo}
            control={control}
            error={errors.address?.addressLineTwo ? true : false}
            helperText={errors.address?.addressLineTwo?.message}
          />
        </LabelInputContainer>
        <Grid container spacing={2}>
          <Grid item xl={6} lg={6} md={6} sm={12}>
            {/* CITY */}
            <LabelInputContainer className="mb-8">
              <Label htmlFor={eventKeys.address.city}>
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
                  City
                </Typography>
              </Label>
              <CustomInput
                id={eventKeys.address.city}
                placeholder="Kolkata"
                type="text"
                name={eventKeys.address.city}
                control={control}
                error={errors.address?.city ? true : false}
                helperText={errors.address?.city?.message}
              />
            </LabelInputContainer>
          </Grid>
          <Grid item xl={6} lg={6} md={6} sm={12}>
            {/* STATE */}
            <LabelInputContainer className="mb-8">
              <Label htmlFor={eventKeys.address.addressLineTwo}>
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
                  State
                </Typography>
              </Label>
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
                  name="address.state"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <FormControl
                      variant="standard"
                      fullWidth
                      error={errors.address?.state ? true : false}
                      className={cn(
                        `flex h-15 w-full border-none shadow-input rounded-md px-3 py-2 text-sm file:border-0 file:bg-transparent
                file:text-sm file:font-medium
                focus-visible:outline-none focus-visible:ring-[2px]
                disabled:cursor-not-allowed disabled:opacity-50
                group-hover/input:shadow-none transition duration-400 ${inputTheme}`,
                        className
                      )}
                    >
                      <Select
                        label="state"
                        placeholder="West Bengal"
                        {...field}
                        size="medium"
                      >
                        {stateList.map((state) => (
                          <MenuItem value={state}> {state}</MenuItem>
                        ))}
                      </Select>
                      {errors.address?.state && (
                        <FormHelperText>
                          {errors.address?.state?.message}
                        </FormHelperText>
                      )}
                    </FormControl>
                  )}
                />
              </motion.div>
            </LabelInputContainer>
          </Grid>
        </Grid>

        {/* ZIP */}
        <LabelInputContainer className="mb-8">
          <Label htmlFor={eventKeys.address.zipCode}>
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
              Zip code
            </Typography>
          </Label>
          <CustomInput
            id={eventKeys.address.zipCode}
            placeholder="Zip Code"
            type="text"
            name={eventKeys.address.zipCode}
            control={control}
            error={errors.address?.zipCode ? true : false}
            helperText={errors.address?.zipCode?.message}
          />
        </LabelInputContainer>

        <Grid container spacing={2}>
          <Grid item xl={6} lg={6} md={6} sm={12}>
            {/* PRIZE */}
            <LabelInputContainer className="mb-8">
              <Label htmlFor={eventKeys.eventDetails.prizepool}>
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
                  Prize pool
                </Typography>
              </Label>
              <CustomInput
                id={eventKeys.eventDetails.prizepool}
                placeholder="Prize pool"
                type="text"
                name={eventKeys.eventDetails.prizepool}
                control={control}
                error={errors.eventDetails?.prizepool ? true : false}
                helperText={errors.eventDetails?.prizepool?.message}
              />
            </LabelInputContainer>
          </Grid>
          <Grid item xl={6} lg={6} md={6} sm={12}>
            {/* TOTAL SLOTS */}
            <LabelInputContainer className="mb-8">
              <Label htmlFor={eventKeys.eventDetails.totalSlots}>
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
                  Total slots
                </Typography>
              </Label>
              <CustomInput
                id={eventKeys.eventDetails.totalSlots}
                placeholder="Total slots"
                type="number"
                name={eventKeys.eventDetails.totalSlots}
                control={control}
                error={errors.eventDetails?.totalSlots ? true : false}
                helperText={errors.eventDetails?.totalSlots?.message}
              />
            </LabelInputContainer>
          </Grid>
        </Grid>
        {/* EVENT TYPE */}
        <LabelInputContainer className="mb-8">
          <Label htmlFor={eventKeys.eventDetails.eventType}>
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
              Event type
            </Typography>
          </Label>
          <RadioInput
            control={control}
            id={eventKeys.eventDetails.eventType}
            name={eventKeys.eventDetails.eventType}
            error={errors.eventDetails?.eventType ? true : false}
            helperText={errors.eventDetails?.eventType?.message}
            radioTypes={EVENT_TYPE}
          />
        </LabelInputContainer>
        {/* DATE */}
        <LabelInputContainer className="mb-8">
          <Label htmlFor={eventKeys.eventDetails.date}>
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
              Date
            </Typography>
          </Label>
          <CustomDatepicker
            control={control}
            name={eventKeys.eventDetails.date}
            handleOnChange={dateOnChange}
            getDateValue={getDate}
            error={errors.eventDetails?.date ? true : false}
            helperText={errors.eventDetails?.date?.message}
          />
        </LabelInputContainer>
        <NavigationButtons
          nextButtonType="submit"
          prevButtonType="button"
          nextButtonText="Submit"
          prevButtonText="Back"
          size="large"
          styleString="w-full"
          padding={{ left: 0, top: 3, right: 0, bottom: 3 }}
          fontSize="16"
          handlePrevClick={() => router.push('/organizer-home')}
        />
        <Dialog
          open={open}
          TransitionComponent={Transition}
          keepMounted
          onClose={handleDialogClose}
          PaperComponent={PaperComponent}
        >
          <DialogTitle>
            <Typography
              variant="body1"
              align="center"
              gutterBottom={false}
              noWrap={false}
              sx={{
                color: theme.palette.text.primary,
                textDecoration: 'none',
              }}
            >
              Event successfully created!
            </Typography>
          </DialogTitle>
          <Box className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent mt-2 h-[1px] w-full" />
          <DialogContent>
            <DialogContentText>
              <Typography
                variant="body2"
                align="center"
                gutterBottom={false}
                noWrap={false}
                sx={{
                  color: theme.palette.text.primary,
                  textDecoration: 'none',
                }}
              >
                Please wait for admin’s approval. Once it is done you can
                register your participant details. Meanwhile you can see current
                status of this event in future-events page.
              </Typography>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Container className="mb-6">
              <NavigationButtons
                nextButtonType="button"
                prevButtonType="button"
                nextButtonText="Go to Future Events"
                prevButtonText="Back to Home"
                size="small"
                styleString="w-full"
                padding={{ left: 0, top: 3, right: 0, bottom: 3 }}
                fontSize="16"
                handlePrevClick={() => router.push('/organizer-home')}
                handleNextClick={() =>
                  router.push('/organizer-home/future-events')
                }
              />
            </Container>
          </DialogActions>
        </Dialog>
      </form>
    </Box>
  );
}
