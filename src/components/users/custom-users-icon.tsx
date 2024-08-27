import { Box, Typography } from '@mui/material';
import React from 'react';
import PersonIcon from '@mui/icons-material/Person';

export default function CustomUsersIcon(props: CustomUserIconProps) {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
      }}
    >
      <PersonIcon
        sx={{
          fontSize: 160,
          zIndex: 20,
        }}
      />
      <Typography
        variant="h3"
        align="center"
        gutterBottom={false}
        noWrap={false}
        sx={{
          zIndex: 20,
        }}
      >
        {props.tagLine}
      </Typography>
    </Box>
  );
}
