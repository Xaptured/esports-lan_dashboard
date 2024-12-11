import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogProps,
  DialogTitle,
  Grid,
  Paper,
  Slide,
  Snackbar,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
  useTheme,
} from '@mui/material';
import React, { useState } from 'react';
import SingleButton from '../button/single-button';
import { TransitionProps } from '@mui/material/transitions';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { RegisteredEventCardProps } from '@/types/RegisteredEventCardProps';
import TeamCard from '../team/team-card';
import { EventType } from '@/schemas/event';
import { fetchEventDetails, fetchTeamDetails } from '@/services/getInternalAPI';
import { CreateTeamForm } from '../team-form/team-form';
import { TeamType } from '@/schemas/team';
import { prepareTeams, validateTeamArray } from '@/utilities/utils';
import { saveTeams } from '@/services/postInternalAPI';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function RegisteredEventCard(props: RegisteredEventCardProps) {
  const theme = useTheme();
  const [teams, setTeams] = useState<TeamType[] | undefined>(undefined);
  const [open, setOpen] = React.useState(false);
  const [eventDetails, setEventDetails] = React.useState<EventType | undefined>(
    undefined
  );
  const [participants, setParticipants] = React.useState<
    TeamType[] | undefined
  >(undefined);
  const [participantOpen, setParticipantOpen] = React.useState(false);
  const [addParticipantOpen, setAddParticipantOpen] = React.useState(false);
  const [scroll, setScroll] = React.useState<DialogProps['scroll']>('paper');
  const [snackBar, setSnackBar] = useState<string | undefined>(undefined);

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

  const handleShowDetails = async () => {
    if (!eventDetails) {
      const { data } = await fetchEventDetails(props.eventName);
      setEventDetails(data);
    }
    handleDialogOpen();
  };

  const handleShowParticipants = async () => {
    const { data } = await fetchTeamDetails(props.eventName);
    const convertedData = prepareTeams(data);
    setParticipants(convertedData);
    handleParticipantDialogOpen();
  };

  const handleAddParticipantsDialogOpen = async () => {
    if (!eventDetails) {
      const { data } = await fetchEventDetails(props.eventName);
      setEventDetails(data);
    }
    setAddParticipantOpen(true);
  };

  const handleAddParticipantsDialogClose = () => {
    setAddParticipantOpen(false);
  };

  const handleAddParticipantSave = async () => {
    if (teams) {
      const result = validateTeamArray(teams);
      if (!result.isTeamNameUnique) {
        setSnackBar('Duplicate team names are not allowed');
      } else if (!result.isEmailUnique) {
        setSnackBar(
          'Duplicate emails found in different teams which are not allowed'
        );
      } else {
        await saveTeams(teams, props.eventName);
        handleAddParticipantsDialogClose();
      }
    } else {
      setSnackBar('Please add teams');
    }
  };

  const handleDelete = (index: number) => {
    setTeams((prevTeams) => prevTeams?.filter((_, i) => i !== index));
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
      <Snackbar
        open={snackBar ? true : false}
        autoHideDuration={5000}
        onClose={() => setSnackBar(undefined)}
        message={snackBar}
        anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
        TransitionComponent={Slide}
      />
      {props.showParticipants && (
        <SingleButton
          buttonText="show participants"
          buttonType="button"
          size="medium"
          handleClick={handleShowParticipants}
        />
      )}
      {props.addParticipants && (
        <SingleButton
          buttonText="add participants"
          buttonType="button"
          size="medium"
          handleClick={handleAddParticipantsDialogOpen}
        />
      )}
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
      {props.showParticipants && participants && (
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
      {props.addParticipants && eventDetails && (
        <Dialog
          open={addParticipantOpen}
          TransitionComponent={Transition}
          onClose={handleAddParticipantsDialogClose}
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
              Save the list after creatig teams!
            </Typography>
          </DialogTitle>
          <DialogContent
            dividers={scroll === 'paper'}
            sx={{ display: 'flex', justifyContent: 'center' }}
          >
            <Grid container spacing={2}>
              <Grid item xl={4} lg={4} md={6} sm={8} xs={12}>
                <CreateTeamForm
                  teams={teams}
                  setTeam={setTeams}
                  totalTeams={eventDetails.eventDetails.totalSlots}
                  teamSize={eventDetails.eventDetails.eventType}
                />
              </Grid>
              <Grid item xl={8} lg={8} md={6} sm={4} xs={12}>
                <Grid container spacing={2} className="scrollable-container">
                  {teams?.map((team, index) => (
                    <Grid item lg={6}>
                      <TeamCard
                        team={team}
                        index={index}
                        onDelete={handleDelete}
                      />
                    </Grid>
                  ))}
                </Grid>
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Container
              maxWidth="xs"
              sx={{ display: 'flex', justifyContent: 'center' }}
            >
              <SingleButton
                buttonText="Save"
                buttonType="button"
                size="medium"
                handleClick={handleAddParticipantSave}
                styleString="w-full"
                padding={{ left: 0, top: 3, right: 0, bottom: 3 }}
                fontSize="16"
              />
            </Container>
          </DialogActions>
        </Dialog>
      )}
    </Paper>
  );
}
