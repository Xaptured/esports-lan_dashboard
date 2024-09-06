import { ABOUT_US_CONTENT } from '@/constants/about-us-content';
import { Box, Grid } from '@mui/material';
import { CustomCardSpotlight } from './custom-card-spotlight';

import React from 'react';

export default function AboutUsContent() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid
        container
        spacing={12}
        justifyContent="center"
        alignItems="center"
        sx={{
          padding: '2%',
          marginTop: '0%',
        }}
      >
        <Grid item xl={2} lg={2}></Grid>
        <Grid item xl={8} lg={8}>
          <CustomCardSpotlight
            header={ABOUT_US_CONTENT[0].head}
            body={ABOUT_US_CONTENT[0].body}
          />
        </Grid>
        <Grid item xl={2} lg={2}></Grid>
        {ABOUT_US_CONTENT.slice(1).map((content, index) => (
          <Grid item xl={4} lg={4}>
            <CustomCardSpotlight
              header={content.head}
              body={content.body}
              key={index}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
