'use client';

import EventCard from '@/components/events/event-card';
import HelpForm from '@/components/help-form/help-form';
import Hero from '@/components/hero/hero';
import { ORGANIZER_EVENT_CARD_CONTENT } from '@/constants/eventcardcontent';
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
import { TransitionProps } from '@mui/material/transitions';
import React, { useEffect, useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import { updateFeedback } from '@/services/postInternalAPI';
import AdvertisementWrapper from '@/components/advertisement/advertisement-wrapper';
import { Advertisement } from '@/schemas/advertisement';

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

interface OrganizerHomeContentProps {
  email: string | undefined;
  feedbackData: { flag: boolean };
  ads: Advertisement[];
}

export default function OrganizerHomeContent({
  email,
  feedbackData,
  ads,
}: OrganizerHomeContentProps) {
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
        bodyTwo="Are you ready to create brand new LAN events? If yes, then scroll down to start!"
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
        {ORGANIZER_EVENT_CARD_CONTENT.map((content) => (
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
      <AdvertisementWrapper ads={ads} />
    </Box>
  );
}
