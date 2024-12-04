import {
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogProps,
  DialogTitle,
  Paper,
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
import NavigationButtons from '../button/navigation-buttons';
import { EventCardProps } from '@/types/Props';
import { updateEventStatus } from '@/services/postInternalAPI';
import { EVENT_STATUS } from '@/enums/Event';
import { EventType } from '@/schemas/event';
import { fetchEventDetails } from '@/services/getInternalAPI';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AdminEventCard(props: EventCardProps) {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [eventDetails, setEventDetails] = React.useState<EventType | undefined>(
    undefined
  );
  const [scroll, setScroll] = React.useState<DialogProps['scroll']>('paper');

  const handleDialogOpen = () => {
    setOpen(true);
  };

  const handleDialogClose = () => {
    setOpen(false);
  };

  const handleApprove = async () => {
    await updateEventStatus(props.eventName, EVENT_STATUS.ACTIVE);
    handleDialogClose();
  };

  const handleReject = async () => {
    await updateEventStatus(props.eventName, EVENT_STATUS.REJECTED);
    handleDialogClose();
  };

  const handleShowDetails = async () => {
    const { data } = await fetchEventDetails(props.eventName);
    setEventDetails(data);
    handleDialogOpen();
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
            <Container maxWidth="md">
              <NavigationButtons
                nextButtonType="button"
                prevButtonType="button"
                nextButtonText="Approve"
                prevButtonText="Reject"
                size="small"
                styleString="w-full"
                padding={{ left: 0, top: 3, right: 0, bottom: 3 }}
                fontSize="16"
                handleNextClick={handleApprove}
                handlePrevClick={handleReject}
                gridContainerMarginTop="mt-1"
              />
            </Container>
          </DialogActions>
        </Dialog>
      )}
    </Paper>
  );
}
