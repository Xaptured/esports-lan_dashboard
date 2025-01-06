import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Chip,
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
import { saveTeams, startCheckInProcess } from '@/services/postInternalAPI';
import { EventCardProps } from '@/types/Props';
import NavigationButtons from '../button/navigation-buttons';
import SubUserForm from '../sub-user-form/sub-user-form';

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

export default function CheckInCard(props: EventCardProps) {
  const theme = useTheme();
  const [checkInopen, setCheckInOpen] = React.useState(false);
  const [userOpen, setUserOpen] = React.useState(false);
  const [scroll, setScroll] = React.useState<DialogProps['scroll']>('paper');
  const [snackBar, setSnackBar] = useState<string | undefined>(undefined);
  const [isVisible, setIsVisible] = React.useState(true);

  const handleCheckInDialogOpen = () => {
    setCheckInOpen(true);
  };

  const handleCheckInDialogClose = () => {
    setCheckInOpen(false);
  };

  const handleUserDialogOpen = () => {
    setUserOpen(true);
  };

  const handleUserDialogClose = () => {
    setUserOpen(false);
  };

  const handleStartCheckInProcess = async () => {
    await startCheckInProcess(props.eventName);
    handleCheckInDialogClose();
    setIsVisible(false);
  };

  return (
    <Paper
      sx={{
        display: isVisible ? 'flex' : 'none',
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
        buttonText="Request a user"
        buttonType="button"
        size="medium"
        handleClick={handleUserDialogOpen}
      />
      <SingleButton
        buttonText="Start check-in process"
        buttonType="button"
        size="medium"
        handleClick={handleCheckInDialogOpen}
      />
      <Dialog
        open={checkInopen}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleCheckInDialogClose}
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
            Start check-in process
          </Typography>
        </DialogTitle>
        <Box className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent mt-2 h-[1px] w-full" />
        <DialogContent>
          <DialogContentText>
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
              Please make sure that you have requested sub user credentials
              before starting the check-in process. Once it is started you will
              not be able to request more sub user credentials.
            </Typography>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Container className="mb-6">
            <NavigationButtons
              nextButtonType="button"
              prevButtonType="button"
              nextButtonText="Start check-in process"
              prevButtonText="Back"
              size="small"
              styleString="w-full"
              padding={{ left: 0, top: 3, right: 0, bottom: 3 }}
              fontSize="16"
              handlePrevClick={handleCheckInDialogClose}
              handleNextClick={handleStartCheckInProcess}
            />
          </Container>
        </DialogActions>
      </Dialog>
      <Dialog
        open={userOpen}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleUserDialogClose}
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
            Request a sub user
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
            A sub user can help organizer on the day of LAN event in check-in
            process
          </Typography>
        </DialogTitle>
        <Box className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent mt-2 h-[1px] w-full" />
        <DialogContent>
          <SubUserForm
            eventName={props.eventName}
            dialogClose={handleUserDialogClose}
          />
        </DialogContent>
      </Dialog>
    </Paper>
  );
}
