import EventCard from '@/components/events/event-card';
import Hero from '@/components/hero/hero';
import { EVENT_CARD_CONTENT } from '@/constants/eventcardcontent';
import { Box, Grid } from '@mui/material';
import React from 'react';

export default function OrganizerHome() {
  return (
    <Box>
      <Hero
        headingContent="Good Morning"
        bodyOne="Welcome back to your personalized home page."
        bodyTwo="Are you ready to create brand new LAN events? If yes, then scroll down to start!"
      />
      {/* TODO: Add descriptions for nav bar items */}
      <Grid
        container
        spacing={12}
        justifyContent="center"
        alignItems="start"
        sx={{
          padding: '2%',
          marginTop: '0%',
        }}
      >
        {EVENT_CARD_CONTENT.map((content) => (
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
