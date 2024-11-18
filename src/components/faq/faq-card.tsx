import { FAQCardProps } from '@/types/FAQCardProps';
import { Paper, Typography, useTheme } from '@mui/material';
import React from 'react';

export default function FAQCard(props: FAQCardProps) {
  const theme = useTheme();
  return (
    <Paper elevation={16} sx={{ padding: '3%' }}>
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
        {props.question}
      </Typography>
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
        {props.answer}
      </Typography>
    </Paper>
  );
}
