'use client';

import EventCard from '@/components/events/event-card';
import Hero from '@/components/hero/hero';
import { PARTICIPANT_EVENT_CARD_CONTENT } from '@/constants/eventcardcontent';
import { getGreeting, startGreetingInterval } from '@/utilities/utils';
import {
  Box,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  IconButton,
  Paper,
  PaperProps,
  Slide,
  Typography,
  useTheme,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import { updateFeedback } from '@/services/postInternalAPI';
import { TransitionProps } from '@mui/material/transitions';
import HelpForm from '@/components/help-form/help-form';
import AdvertisementWrapper from '@/components/advertisement/advertisement-wrapper';
import { Advertisement } from '@/schemas/advertisement';
import { DottedGlowBackground } from '@/components/ui/dotted-glow-background';
import { CustomInfiniteMovingCard } from '../partners/custom-infinite-moving-card';

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

interface ParticipantHomeContentProps {
  email: string | undefined;
  feedbackData: { flag: boolean };
  ads: Advertisement[];
}

export default function ParticipantHomeContent({
  email,
  feedbackData,
  ads,
}: ParticipantHomeContentProps) {
  const theme = useTheme();
  const [greetMessage, setGreetMessage] = useState<string>('');
  const [isFeedback, setFeedback] = useState<boolean>(false);

  useEffect(() => {
    const message = getGreeting();
    setGreetMessage(message);
    if (feedbackData) {
      setFeedback(feedbackData.flag);
    }
  }, [feedbackData]);

  startGreetingInterval((message: string) => {
    setGreetMessage(message);
  });

  const handleSubmitOrClose = async () => {
    if (email) {
      await updateFeedback(email);
    }
  };

  const closeDialog = () => {
    handleSubmitOrClose();
    setFeedback(false);
  };

  return (
    <Box>
      <Hero
        headingContent={greetMessage}
        bodyOne="Welcome back to your personalized home page."
        bodyTwo="Are you ready to participate in brand new LAN events? If yes, then scroll down!"
      />
      {/* TODO: Add descriptions for nav bar items */}
      <Grid
        container
        spacing={6}
        justifyContent="center"
        alignItems="start"
        sx={{
          padding: '1%',
          marginTop: '0%',
        }}
      >
        {PARTICIPANT_EVENT_CARD_CONTENT.map((content) => (
          <Grid item xl={4} lg={4} md={4} key={content.heading}>
            <EventCard
              heading={content.heading}
              description={content.description}
              navigationURL={content.navigationURL}
            />
          </Grid>
        ))}
      </Grid>
      <Dialog
        open={isFeedback}
        TransitionComponent={Transition}
        keepMounted
        onClose={() => setFeedback(false)}
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
            Feedback!
          </Typography>
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={closeDialog}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
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
              Please give us your feedback to make your experience better.
            </Typography>
          </DialogContentText>
          <HelpForm
            isFeedback={true}
            handleSubmitOrClose={handleSubmitOrClose}
          />
        </DialogContent>
      </Dialog>
      <Box className="relative w-full flex items-center justify-center py-5 mt-10">
        <DottedGlowBackground
          className="absolute inset-0 pointer-events-none mask-radial-to-90% mask-radial-at-center"
          opacity={0.5}
          gap={20}
          radius={1}
          color="#9ca3af"
          glowColor="#9ca3af"
          colorLightVar="--color-gray-400"
          glowColorLightVar="--color-gray-400"
          colorDarkVar="--color-gray-400"
          glowColorDarkVar="--color-gray-400"
          backgroundOpacity={0}
          speedMin={0.3}
          speedMax={1.6}
          speedScale={1}
        />
        <Box className="relative z-10 w-full max-w-8xl">
          <Typography
            variant="h2"
            align="center"
            gutterBottom={false}
            noWrap={false}
            sx={{
              color: theme.palette.text.primary,
              textDecoration: 'none',
            }}
          >
            Advertisers and Sponsors
          </Typography>
          <AdvertisementWrapper ads={ads} />
          <CustomInfiniteMovingCard />
        </Box>
      </Box>
    </Box>
  );
}
