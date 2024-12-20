'use client';

import {
  Box,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogProps,
  DialogTitle,
  Grid,
  Paper,
  PaperProps,
  Slide,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
  useTheme,
} from '@mui/material';
import React from 'react';
import SingleButton from '../button/single-button';
import { TransitionProps } from '@mui/material/transitions';
import { fetchEventDetails, fetchTeamDetails } from '@/services/getInternalAPI';
import { EventType } from '@/schemas/event';
import { EventCardProps } from '@/types/Props';
import { prepareTeams } from '@/utilities/utils';
import { TeamType } from '@/schemas/team';
import TeamCard from '../team/team-card';
import AudienceForm from '../audience-form/audience-form';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const PaperComponent: React.FC<PaperProps> = (props) => {
  return (
    <Paper
      {...props}
      sx={{
        background: 'transparent',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
      variant="outlined"
      className="backdrop-blur-md w-full h-full"
    >
      <Paper
        {...props}
        sx={{ width: '40%', height: 'auto' }}
        variant="outlined"
        className="backdrop-blur-xl"
      />
    </Paper>
  );
};

export default function BookTicketEventCard(props: EventCardProps) {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [eventDetails, setEventDetails] = React.useState<EventType | undefined>(
    undefined
  );
  const [participants, setParticipants] = React.useState<
    TeamType[] | undefined
  >(undefined);
  const [participantOpen, setParticipantOpen] = React.useState(false);
  const [scroll, setScroll] = React.useState<DialogProps['scroll']>('paper');
  const [bookOpen, setBookOpen] = React.useState(false);

  const handleDialogOpen = () => {
    setOpen(true);
  };

  const handleDialogClose = () => {
    setOpen(false);
  };

  const handleParticipantDialogOpen = () => {
    setParticipantOpen(true);
  };

  const handleParticipantDialogClose = () => {
    setParticipantOpen(false);
  };

  const handleBookTicketDialogOpen = () => {
    setBookOpen(true);
  };

  const handleBookTicketDialogClose = () => {
    setBookOpen(false);
  };

  const handleShowDetails = async () => {
    const { data } = await fetchEventDetails(props.eventName);
    setEventDetails(data);
    handleDialogOpen();
  };

  const handleShowParticipants = async () => {
    const { data } = await fetchTeamDetails(props.eventName);
    const convertedData = prepareTeams(data);
    setParticipants(convertedData);
    handleParticipantDialogOpen();
  };

  const handleBookTickets = async () => {
    if (!eventDetails) {
      const { data } = await fetchEventDetails(props.eventName);
      setEventDetails(data);
    }
    handleBookTicketDialogOpen();
  };

  return (
    <Paper
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around',
        padding: '4%',
      }}
      elevation={0}
    >
      <Typography
        variant="body1"
        align="center"
        gutterBottom={false}
        noWrap={false}
        sx={{
          color: 'inherit',
          textDecoration: 'none',
        }}
      >
        {props.eventName}
      </Typography>
      <SingleButton
        buttonText="show details"
        buttonType="button"
        size="medium"
        handleClick={handleShowDetails}
      />
      <SingleButton
        buttonText="show participants"
        buttonType="button"
        size="medium"
        handleClick={handleShowParticipants}
      />
      <SingleButton
        buttonText="book tickets"
        buttonType="button"
        size="medium"
        handleClick={handleBookTickets}
      />

      {eventDetails && (
        <Dialog
          open={open}
          TransitionComponent={Transition}
          onClose={handleDialogClose}
          scroll={scroll}
          fullScreen
          sx={{
            '& .MuiDialog-paper': {
              backgroundColor: theme.palette.background.default,
              color: theme.palette.text.primary,
            },
          }}
        >
          <DialogTitle>
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
              {eventDetails.name}
            </Typography>
          </DialogTitle>
          <DialogContent
            dividers={scroll === 'paper'}
            sx={{ display: 'flex', justifyContent: 'center' }}
          >
            <TableContainer sx={{ maxWidth: 'md' }}>
              <Table>
                <TableBody>
                  <TableRow key="game-name">
                    <TableCell component="th" scope="row">
                      Game name
                    </TableCell>
                    <TableCell align="right">{eventDetails.gameName}</TableCell>
                  </TableRow>
                  <TableRow key="address-line-one">
                    <TableCell component="th" scope="row">
                      Address Line One
                    </TableCell>
                    <TableCell align="right">
                      {eventDetails.address.addressLineOne}
                    </TableCell>
                  </TableRow>
                  <TableRow key="address-line-two">
                    <TableCell component="th" scope="row">
                      Address Line Two
                    </TableCell>
                    <TableCell align="right">
                      {eventDetails.address.addressLineTwo}
                    </TableCell>
                  </TableRow>
                  <TableRow key="city">
                    <TableCell component="th" scope="row">
                      City
                    </TableCell>
                    <TableCell align="right">
                      {eventDetails.address.city}
                    </TableCell>
                  </TableRow>
                  <TableRow key="state">
                    <TableCell component="th" scope="row">
                      State
                    </TableCell>
                    <TableCell align="right">
                      {eventDetails.address.state}
                    </TableCell>
                  </TableRow>
                  <TableRow key="zip">
                    <TableCell component="th" scope="row">
                      Zip code
                    </TableCell>
                    <TableCell align="right">
                      {eventDetails.address.zipCode}
                    </TableCell>
                  </TableRow>
                  <TableRow key="prize">
                    <TableCell component="th" scope="row">
                      Prize
                    </TableCell>
                    <TableCell align="right">
                      {eventDetails.eventDetails.prizePool}
                    </TableCell>
                  </TableRow>
                  <TableRow key="total-slots">
                    <TableCell component="th" scope="row">
                      Total slots
                    </TableCell>
                    <TableCell align="right">
                      {eventDetails.eventDetails.totalSlots}
                    </TableCell>
                  </TableRow>
                  <TableRow key="event-type">
                    <TableCell component="th" scope="row">
                      Event type
                    </TableCell>
                    <TableCell align="right">
                      {eventDetails.eventDetails.eventType}
                    </TableCell>
                  </TableRow>
                  <TableRow key="date">
                    <TableCell component="th" scope="row">
                      Date
                    </TableCell>
                    <TableCell align="right">
                      {eventDetails.eventDetails.date}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </DialogContent>
          <DialogActions>
            <Container
              maxWidth="xs"
              sx={{ display: 'flex', justifyContent: 'center' }}
            >
              <SingleButton
                buttonText="close"
                buttonType="button"
                size="medium"
                handleClick={handleDialogClose}
                styleString="w-full"
                padding={{ left: 0, top: 3, right: 0, bottom: 3 }}
                fontSize="16"
              />
            </Container>
          </DialogActions>
        </Dialog>
      )}
      {participants && (
        <Dialog
          open={participantOpen}
          TransitionComponent={Transition}
          onClose={handleParticipantDialogClose}
          scroll={scroll}
          fullScreen
          sx={{
            '& .MuiDialog-paper': {
              backgroundColor: theme.palette.background.default,
              color: theme.palette.text.primary,
            },
          }}
        >
          <DialogTitle>
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
              Participants list
            </Typography>
          </DialogTitle>
          <DialogContent dividers={scroll === 'paper'}>
            <Grid container spacing={4}>
              {participants.map((participant) => (
                <Grid item xl={4} lg={4} md={4} sm={4} xs={6}>
                  <TeamCard team={participant} />
                </Grid>
              ))}
            </Grid>
          </DialogContent>
          <DialogActions>
            <Container
              maxWidth="xs"
              sx={{ display: 'flex', justifyContent: 'center' }}
            >
              <SingleButton
                buttonText="close"
                buttonType="button"
                size="medium"
                handleClick={handleParticipantDialogClose}
                styleString="w-full"
                padding={{ left: 0, top: 3, right: 0, bottom: 3 }}
                fontSize="16"
              />
            </Container>
          </DialogActions>
        </Dialog>
      )}
      <Dialog
        open={bookOpen}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleBookTicketDialogClose}
        PaperComponent={PaperComponent}
      >
        <DialogTitle>
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
            Book your ticket!
          </Typography>
        </DialogTitle>
        <Box className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent mt-2 h-[1px] w-full" />
        <DialogContent>
          {/* TODO: add real ticket cost */}
          <AudienceForm amount={1000} eventName={props.eventName} />
        </DialogContent>
      </Dialog>
    </Paper>
  );
}
