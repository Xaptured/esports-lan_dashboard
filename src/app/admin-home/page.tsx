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
        bodyOne="Welcome back, Admin! Ready to level up the LAN experience?"
        bodyTwo=" This is where your expertise transform plans into action."
      />
      {/* TODO: Add descriptions for nav bar items */}
    </Box>
  );
}
