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
import CenterButton from '../button/center-button';

const PanelItem: React.FC<{ item: LiveUpdateDto }> = ({ item }) => {
  return (
    <ListItem alignItems="flex-start" sx={{ borderBottom: '1px solid #eee' }}>
      <ListItemText
        primary={
          <Typography variant="body1" component="div">
            {item.title}
          </Typography>
        }
        secondary={
          <React.Fragment>
            {item.message && (
              <Typography
                component="span"
                variant="body2"
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

const Section: React.FC<{ title: string; items: LiveUpdateDto[] }> = ({
  title,
  items,
}) => (
  <Box sx={{ mb: 2 }}>
    <Typography variant="h6" sx={{ px: 2, py: 1, fontWeight: 'bold' }}>
      {title} ({items.length})
    </Typography>
    <List dense>
      {items.length === 0 && (
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

const LiveUpdatesPanel = () => {
  const {
    schedule,
    results,
    awards,
    isConnected,
    errorMessage,
    scheduleError,
    resultsError,
    awardsError,
  } = useLiveUpdates({
    autoConnect: true,
  });
  const [open, setOpen] = useState(false);

  const total = schedule.length + results.length + awards.length;

  return (
    <React.Fragment>
      <CenterButton
        buttonText="Live Updates"
        size="large"
        icon={false}
        buttonType="button"
        handleClick={() => setOpen(true)}
      />

      <Drawer anchor="right" open={open} onClose={() => setOpen(false)}>
        <Box sx={{ width: 360, p: 2 }} role="presentation">
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              mb: 2,
            }}
          >
            <Typography variant="h5">Live Updates</Typography>
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

          {errorMessage && (
            <Box
              sx={{
                p: 2,
                bgcolor: '#ffebee',
                color: '#c62828',
                borderRadius: 1,
                mb: 2,
              }}
            >
              <Typography variant="body2">{errorMessage}</Typography>
            </Box>
          )}

          <Section title="Results" items={results} />
          {resultsError && (
            <Typography color="error" variant="caption" sx={{ px: 2 }}>
              {resultsError}
            </Typography>
          )}

          <Section title="Schedule" items={schedule} />
          {scheduleError && (
            <Typography color="error" variant="caption" sx={{ px: 2 }}>
              {scheduleError}
            </Typography>
          )}

          <Section title="Awards" items={awards} />
          {awardsError && (
            <Typography color="error" variant="caption" sx={{ px: 2 }}>
              {awardsError}
            </Typography>
          )}
        </Box>
      </Drawer>
    </React.Fragment>
  );
};

export default LiveUpdatesPanel;
