import { PARTICPANT, ORGANIZER, AUDIENCE } from '@/constants/users-content';
import { Box, Grid } from '@mui/material';
import React from 'react';
import { CustomCardSpotlight } from '../about-us/custom-card-spotlight';
import CustomUsersIcon from './custom-users-icon';

export default function UsersContent() {
  return (
    <Box>
      <Grid container spacing={6} sx={{ padding: '2%', marginTop: '2%' }}>
        <Grid item xl={3} lg={3} md={3} sm={12} xs={12}>
          <CustomUsersIcon flexPosition="end" tagLine="PARTICIPANT" />
        </Grid>
        <Grid item xl={8} lg={8} md={8} sm={12} xs={12}>
          <CustomCardSpotlight body={PARTICPANT} />
        </Grid>
        <Grid item xl={1} lg={1} md={1} sm={0} xs={0} />

        <Grid item xl={3} lg={3} md={3} sm={12} xs={12}>
          <CustomUsersIcon flexPosition="end" tagLine="ORGANIZER" />
        </Grid>
        <Grid item xl={8} lg={8} md={8} sm={12} xs={12}>
          <CustomCardSpotlight body={ORGANIZER} />
        </Grid>
        <Grid item xl={1} lg={1} md={1} sm={0} xs={0} />
        <Grid item xl={3} lg={3} md={3} sm={12} xs={12}>
          <CustomUsersIcon flexPosition="end" tagLine="AUDIENCE" />
        </Grid>
        <Grid item xl={8} lg={8} md={8} sm={12} xs={12}>
          <CustomCardSpotlight body={AUDIENCE} />
        </Grid>
        <Grid item xl={1} lg={1} md={1} sm={0} xs={0} />
      </Grid>
    </Box>
  );
}
