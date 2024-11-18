import {
  Box,
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
import NavigationButtons from '../button/navigation-buttons';
import SingleButton from '../button/single-button';
import { TransitionProps } from '@mui/material/transitions';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function ApproveEventCard() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [scroll, setScroll] = React.useState<DialogProps['scroll']>('paper');

  const handleDialogOpen = () => {
    setOpen(true);
  };

  const handleDialogClose = () => {
    setOpen(false);
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
        Event Name
      </Typography>
      <SingleButton
        buttonText="show details"
        buttonType="button"
        size="medium"
        handleClick={handleDialogOpen}
      />
      <Box
        sx={{ width: '30%', display: 'flex', justifyContent: 'space-around' }}
      >
        <SingleButton buttonText="approve" buttonType="button" size="medium" />
        <SingleButton buttonText="reject" buttonType="button" size="medium" />
      </Box>

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
              handleNextClick={handleDialogClose}
              handlePrevClick={handleDialogClose}
              gridContainerMarginTop="mt-1"
            />
          </Container>
        </DialogActions>
      </Dialog>
    </Paper>
  );
}
