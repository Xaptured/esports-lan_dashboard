import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogProps,
  DialogTitle,
  Grid,
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
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { RegisteredEventCardProps } from '@/types/RegisteredEventCardProps';
import TeamCard from '../team/team-card';

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
  const [open, setOpen] = React.useState(false);
  const [participantOpen, setParticipantOpen] = React.useState(false);
  const [scroll, setScroll] = React.useState<DialogProps['scroll']>('paper');

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

  return (
    <Paper
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around',
        padding: '4%',
        zIndex: 100,
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
        Event Name
      </Typography>
      <SingleButton
        buttonText="show details"
        buttonType="button"
        size="medium"
        handleClick={handleDialogOpen}
      />
      {props.showParticipants && (
        <SingleButton
          buttonText="show participants"
          buttonType="button"
          size="medium"
          handleClick={handleParticipantDialogOpen}
        />
      )}

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
            Event name
          </Typography>
        </DialogTitle>
        <DialogContent
          dividers={scroll === 'paper'}
          sx={{ display: 'flex', justifyContent: 'center' }}
        >
          <TableContainer sx={{ maxWidth: 'md' }}>
            {/* TODO: use API data */}
            <Table>
              <TableBody>
                <TableRow key="game-name">
                  <TableCell component="th" scope="row">
                    Game name
                  </TableCell>
                  <TableCell align="right">PUBG</TableCell>
                </TableRow>
                <TableRow key="game-name">
                  <TableCell component="th" scope="row">
                    Address Line One
                  </TableCell>
                  <TableCell align="right">Address line one</TableCell>
                </TableRow>
                <TableRow key="game-name">
                  <TableCell component="th" scope="row">
                    Address Line Two
                  </TableCell>
                  <TableCell align="right">Address line two</TableCell>
                </TableRow>
                <TableRow key="game-name">
                  <TableCell component="th" scope="row">
                    City
                  </TableCell>
                  <TableCell align="right">Kolkata</TableCell>
                </TableRow>
                <TableRow key="game-name">
                  <TableCell component="th" scope="row">
                    State
                  </TableCell>
                  <TableCell align="right">West Bengal</TableCell>
                </TableRow>
                <TableRow key="game-name">
                  <TableCell component="th" scope="row">
                    Zip code
                  </TableCell>
                  <TableCell align="right">700135</TableCell>
                </TableRow>
                <TableRow key="game-name">
                  <TableCell component="th" scope="row">
                    Prize
                  </TableCell>
                  <TableCell align="right">100000</TableCell>
                </TableRow>
                <TableRow key="game-name">
                  <TableCell component="th" scope="row">
                    Total slots
                  </TableCell>
                  <TableCell align="right">16</TableCell>
                </TableRow>
                <TableRow key="game-name">
                  <TableCell component="th" scope="row">
                    Event type
                  </TableCell>
                  <TableCell align="right">Duo</TableCell>
                </TableRow>
                <TableRow key="game-name">
                  <TableCell component="th" scope="row">
                    Date
                  </TableCell>
                  <TableCell align="right">01/19/1999</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
          {/* TODO: add show participants accordian component */}
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
      {props.showParticipants && (
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
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(() => (
                <Grid item xl={4} lg={4} md={4} sm={4} xs={6}>
                  <TeamCard />
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
    </Paper>
  );
}
