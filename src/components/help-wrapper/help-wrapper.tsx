'use client';

import SingleButton from '@/components/button/single-button';
import FAQCard from '@/components/faq/faq-card';
import HelpForm from '@/components/help-form/help-form';
import { BackgroundLines } from '@/components/ui/background-lines';
import { FAQ } from '@/constants/FAQ';
import {
  Paper,
  Typography,
  Box,
  Link,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Container,
  Grid,
  DialogProps,
  Slide,
  useTheme,
} from '@mui/material';
import { TransitionProps } from '@mui/material/transitions';
import React from 'react';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function HelpWrapper() {
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
    <BackgroundLines className="flex items-center justify-center ">
      <Paper
        elevation={24}
        sx={{
          background: 'transparent',
          padding: '3%',
          width: '40%',
          marginTop: '3%',
        }}
        variant="outlined"
        className="backdrop-blur-sm"
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
          Have a concern with our app?
        </Typography>

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
          Then send us an email!
        </Typography>
        <Box className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent mt-8 h-[1px] w-full" />
        <HelpForm />
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
          meanwhile you can have a look to our{' '}
          <Link onClick={handleDialogOpen} sx={{ cursor: 'pointer' }}>
            FAQs
          </Link>
          .
        </Typography>
        <Dialog
          open={open}
          TransitionComponent={Transition}
          onClose={handleDialogClose}
          scroll={scroll}
          fullScreen
          sx={{
            scrollBehavior: 'smooth',
            '& .MuiDialog-paper': {
              backgroundColor: theme.palette.background.default,
              color: theme.palette.text.primary,
            },
            '& .MuiDialogContent-root': {
              // Custom scrollbar styles
              scrollbarWidth: 'thin', // For Firefox
              scrollbarColor: `${theme.palette.primary.main} ${theme.palette.background.paper}`, // For Firefox
              '&::-webkit-scrollbar': {
                width: '12px',
              },
              '&::-webkit-scrollbar-track': {
                background: theme.palette.background.paper,
                borderRadius: '8px',
              },
              '&::-webkit-scrollbar-thumb': {
                backgroundColor: theme.palette.primary.main,
                borderRadius: '8px',
                border: `2px solid ${theme.palette.background.paper}`, // Adds a gap between the thumb and track
              },
              '&::-webkit-scrollbar-thumb:hover': {
                backgroundColor: theme.palette.primary.dark, // Changes color on hover
              },
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
              FAQs
            </Typography>
          </DialogTitle>
          <DialogContent dividers={scroll === 'paper'}>
            <Grid container spacing={4}>
              {FAQ.map((faq) => (
                <Grid item xl={6}>
                  <FAQCard question={faq.question} answer={faq.answer} />
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
                handleClick={handleDialogClose}
                styleString="w-full"
                padding={{ left: 0, top: 3, right: 0, bottom: 3 }}
                fontSize="16"
              />
            </Container>
          </DialogActions>
        </Dialog>
      </Paper>
    </BackgroundLines>
  );
}
