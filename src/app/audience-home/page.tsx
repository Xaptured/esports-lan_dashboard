'use client';

import EventCard from '@/components/events/event-card';
import Hero from '@/components/hero/hero';
import { AUDIENCE_EVENT_CARD_CONTENT } from '@/constants/eventcardcontent';
import { getGreeting, startGreetingInterval } from '@/utilities/utils';
import { Box, Grid } from '@mui/material';
import React, { useEffect, useState } from 'react';

export default function AudienceHome() {
  const [greetMessage, setGreetMessage] = useState<string>('');

  useEffect(() => {
    const message = getGreeting();
    setGreetMessage(message);
  }, []);

  startGreetingInterval((message: string) => {
    setGreetMessage(message);
  });
  return (
    <Box>
      <Hero
        headingContent={greetMessage}
        bodyOne="Welcome back to your personalized home page."
        bodyTwo="Are you ready to be a part of brand new LAN event? If yes, then scroll down to start!"
      />
      {/* TODO: Add descriptions for nav bar items */}
      <Grid
        container
        spacing={6}
        justifyContent="center"
        alignItems="start"
        sx={{
          padding: '2%',
          marginTop: '0%',
        }}
      >
        {AUDIENCE_EVENT_CARD_CONTENT.map((content) => (
          <Grid item xl={4} lg={4} md={4}>
            <EventCard
              heading={content.heading}
              description={content.description}
              navigationURL={content.navigationURL}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
