'use client';

import React, { useState } from 'react';
import useLiveUpdates, {
  LiveUpdateDto,
} from '../../utilities/hooks/useLiveUpdates';
import {
  Drawer,
  Typography,
  Box,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Divider,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const PanelItem: React.FC<{ item: LiveUpdateDto }> = ({ item }) => {
  return (
    <ListItem alignItems="flex-start" sx={{ borderBottom: '1px solid #eee' }}>
      <ListItemText
        primary={
          <Typography variant="subtitle2" component="div">
            {item.title}
          </Typography>
        }
        secondary={
          <React.Fragment>
            {item.message && (
              <Typography
                component="span"
                variant="caption"
                color="text.primary"
                display="block"
              >
                {item.message}
              </Typography>
            )}
            <Typography variant="caption" color="text.secondary">
              {item.createdAt ? new Date(item.createdAt).toLocaleString() : ''}
            </Typography>
          </React.Fragment>
        }
      />
    </ListItem>
  );
};

const Section: React.FC<{
  title: string;
  items: LiveUpdateDto[];
  error?: string;
}> = ({ title, items, error }) => (
  <Box sx={{ mb: 2 }}>
    <Typography variant="subtitle1" sx={{ px: 2, py: 1, fontWeight: 'bold' }}>
      {title} ({items.length})
    </Typography>
    <List dense>
      {error && (
        <Typography color="error" variant="caption" sx={{ px: 2 }}>
          Something went wrong. Please try again later.
        </Typography>
      )}
      {items.length === 0 && !error && (
        <ListItem>
          <ListItemText secondary="No updates" />
        </ListItem>
      )}
      {items.map((item) => (
        <PanelItem key={item.id} item={item} />
      ))}
    </List>
    <Divider />
  </Box>
);

const LiveUpdatesPanel = ({
  open,
  setOpen,
  eventName,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
  eventName: string;
}) => {
  const {
    schedule,
    results,
    awards,
    isConnected,
    errorMessage,
    scheduleError,
    resultsError,
    awardsError,
  } = useLiveUpdates({ eventName, autoConnect: true });
  console.log('Schedule Error', scheduleError);
  console.log('Results Error', resultsError);
  console.log('Awards Error', awardsError);
  return (
    <React.Fragment>
      <Drawer
        anchor="right"
        open={open}
        onClose={() => setOpen(false)}
        sx={{ zIndex: 1400 }}
      >
        <Box sx={{ width: 360, p: 2 }} role="presentation">
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              mb: 2,
            }}
          >
            <Typography variant="body1">Live Updates</Typography>
            <Box display="flex" alignItems="center">
              <Typography
                variant="caption"
                sx={{
                  color: isConnected ? 'green' : 'red',
                  mr: 1,
                  fontWeight: 'bold',
                }}
              >
                {isConnected ? 'LIVE' : 'DISCONNECTED'}
              </Typography>
              <IconButton onClick={() => setOpen(false)}>
                <CloseIcon />
              </IconButton>
            </Box>
          </Box>

          <Section title="Results" items={results} error={resultsError} />

          <Section title="Schedule" items={schedule} error={scheduleError} />

          <Section title="Awards" items={awards} error={awardsError} />
        </Box>
      </Drawer>
    </React.Fragment>
  );
};

export default LiveUpdatesPanel;
