'use client';

import {
  Box,
  Button,
  CircularProgress,
  Container,
  Paper,
  Typography,
  useTheme,
  Alert,
  Stack,
  Snackbar,
  Slide,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import {
  fetchFutureEventsForAudience,
  fetchFutureEventsForOrganizer,
  fetchFutureEventsForParticipant,
  fetchStayLinks,
  fetchTravelLinks,
} from '@/services/getInternalAPI';
import { IconMapPin, IconBuildingSkyscraper } from '@tabler/icons-react';
import { CustomDropdown } from '../ui/custom-dropdown';
import { useForm } from 'react-hook-form';
import Hero from '../hero/hero';
import { getGreeting, startGreetingInterval } from '@/utilities/utils';

interface EventData {
  name: string;
  // Add other properties if needed
}

export default function BookingFeature({
  email,
}: {
  email: string | undefined;
}) {
  const theme = useTheme();
  const pathname = usePathname();
  const [events, setEvents] = useState<EventData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [snackBar, setSnackBar] = useState<string | undefined>(undefined);
  const [greetMessage, setGreetMessage] = useState<string>('');

  useEffect(() => {
    const message = getGreeting();
    setGreetMessage(message);
  }, []);

  startGreetingInterval((message: string) => {
    setGreetMessage(message);
  });

  const { control, watch } = useForm({
    defaultValues: {
      selectedEvent: '',
    },
  });

  const selectedEvent = watch('selectedEvent');

  const gridTheme =
    theme.palette.mode === 'dark'
      ? 'bg-black bg-grid-white/[0.2]'
      : 'bg-white bg-grid-black/[0.2]';
  const radialTheme =
    theme.palette.mode === 'dark'
      ? 'bg-black [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]'
      : 'bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,white)]';

  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);
      setError(null);
      let response;

      try {
        if (pathname.includes('/audience-home')) {
          response = await fetchFutureEventsForAudience(email);
        } else if (pathname.includes('/organizer-home')) {
          response = await fetchFutureEventsForOrganizer(email);
        } else if (pathname.includes('/participant-home')) {
          response = await fetchFutureEventsForParticipant(email);
        }

        if (response && response.data) {
          setEvents(response.data);
        } else {
          setError('Failed to fetch events.');
        }
      } catch (err) {
        setError('An error occurred while fetching events.');
      } finally {
        setLoading(false);
      }
    };

    if (email) {
      fetchEvents();
    } else {
      setLoading(false);
    }
  }, [pathname, email]);

  const handleStayNearby = async () => {
    if (!selectedEvent) return;
    setActionLoading('stay');
    try {
      const response = await fetchStayLinks(selectedEvent);
      if (response.data && response.data.url) {
        window.open(response.data.url, '_blank', 'noopener,noreferrer');
      } else {
        setSnackBar('No stay link available.');
      }
    } catch (err) {
      setSnackBar('Failed to fetch stay link.');
    } finally {
      setActionLoading(null);
    }
  };

  const handleReachVenue = async () => {
    if (!selectedEvent) return;
    setActionLoading('travel');
    try {
      const response = await fetchTravelLinks(selectedEvent);
      if (response.data && response.data.url) {
        window.open(response.data.url, '_blank', 'noopener,noreferrer');
      } else {
        setSnackBar('No travel link available.');
      }
    } catch (err) {
      setSnackBar('Failed to fetch travel link.');
    } finally {
      setActionLoading(null);
    }
  };

  const eventOptions = events.map((event) => ({
    label: event.name,
    value: event.name,
  }));

  return (
    <Box style={{ marginTop: '4%' }}>
      <Hero
        headingContent={greetMessage}
        bodyOne="Planning your trip for a LAN event? We’ve got you covered."
        bodyTwo="Select the event you’re attending and choose how you’d like to plan your travel or stay. We’ll redirect you to trusted third-party platforms with the event location and dates already filled in, so you can complete your booking quickly and easily."
      />
      <Container maxWidth="md" sx={{ position: 'relative', zIndex: 10 }}>
        <Paper
          elevation={24}
          sx={{
            padding: 4,
            background: 'rgba(255, 255, 255, 0.05)',
            backdropFilter: 'blur(10px)',
            border: `1px solid ${theme.palette.divider}`,
          }}
          className="rounded-xl"
        >
          <Typography
            variant="h2"
            align="center"
            gutterBottom
            sx={{ fontWeight: 'bold', mb: 4 }}
          >
            Plan Your Visit
          </Typography>

          {loading ? (
            <Box display="flex" justifyContent="center" my={4}>
              <CircularProgress />
            </Box>
          ) : error ? (
            <Alert severity="error">{error}</Alert>
          ) : (
            <Stack spacing={4} alignItems="center">
              <CustomDropdown
                control={control}
                name="selectedEvent"
                placeholder="Select Event"
                options={eventOptions}
              />
              <Stack
                direction={{ xs: 'column', sm: 'row' }}
                spacing={3}
                width="100%"
                justifyContent="center"
              >
                <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  onClick={handleStayNearby}
                  disabled={!selectedEvent || !!actionLoading}
                  startIcon={
                    actionLoading === 'stay' ? (
                      <CircularProgress size={20} color="inherit" />
                    ) : (
                      <IconBuildingSkyscraper />
                    )
                  }
                  fullWidth
                  sx={{
                    py: 1.5,
                    borderRadius: 2,
                    textTransform: 'none',
                    fontSize: '1.1rem',
                  }}
                >
                  {actionLoading === 'stay' ? 'Fetching...' : 'Stay Nearby'}
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  onClick={handleReachVenue}
                  disabled={!selectedEvent || !!actionLoading}
                  startIcon={
                    actionLoading === 'travel' ? (
                      <CircularProgress size={20} color="inherit" />
                    ) : (
                      <IconMapPin />
                    )
                  }
                  fullWidth
                  sx={{
                    py: 1.5,
                    borderRadius: 2,
                    textTransform: 'none',
                    fontSize: '1.1rem',
                  }}
                >
                  {actionLoading === 'travel'
                    ? 'Fetching...'
                    : 'Reach the Venue'}
                </Button>
              </Stack>
            </Stack>
          )}
        </Paper>
        <Snackbar
          open={snackBar ? true : false}
          autoHideDuration={5000}
          onClose={() => setSnackBar(undefined)}
          message={snackBar}
          anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
          TransitionComponent={Slide}
        />
      </Container>
    </Box>
  );
}
