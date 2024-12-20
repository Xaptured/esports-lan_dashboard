'use client';

import { snackBarAtom, snackBarMessageAtom } from '@/atoms/primitive';
import AboutUs from '@/components/about-us/about-us';
import Footer from '@/components/footer/footer';
import Hero from '@/components/hero/hero';
import LandingForms from '@/components/landing-forms/landing-forms';
import NavigationBar from '@/components/navigation-bar/navigation-bar';
import Partners from '@/components/partners/partners';
import Users from '@/components/users/users';
import { Box, Snackbar, Slide } from '@mui/material';
import { useAtom, useAtomValue } from 'jotai/react';
import { useRef } from 'react';

import Cookies from 'universal-cookie';

const cookies = new Cookies(null, { path: '/' });

export default function Home() {
  const heroRef = useRef(null);
  const aboutUsRef = useRef(null);
  const usersRef = useRef(null);
  const partnersRef = useRef(null);
  const formsRef = useRef(null);
  const connectRef = useRef(null);
  const [snackBar, setSnackBar] = useAtom(snackBarAtom);
  const snackBarMessage = useAtomValue(snackBarMessageAtom);

  // TODO: remove
  cookies.set('email', 'jk19011999@gmail.com');

  const handleClose = () => setSnackBar(false);

  return (
    <>
      <NavigationBar
        heroRef={heroRef}
        aboutUsRef={aboutUsRef}
        usersRef={usersRef}
        partnersRef={partnersRef}
        formsRef={formsRef}
        connectRef={connectRef}
      />
      <section ref={heroRef}>
        <Hero
          navigationRef={formsRef}
          headingContent="Single stop for LAN Event Management"
          bodyOne="Welcome to ESports-LAN—where passion meets performance."
          bodyTwo="Join us as we redefine the world of LAN gaming, one event at a time."
          styledObject={{ mt: 22, mb: 2 }}
        />
      </section>
      <section ref={aboutUsRef}>
        <AboutUs />
      </section>
      <section ref={usersRef}>
        <Users />
      </section>
      <section ref={partnersRef}>
        <Partners />
      </section>
      <section ref={formsRef}>
        <LandingForms />
        <Box>
          <Snackbar
            open={snackBar}
            autoHideDuration={5000}
            onClose={handleClose}
            message={snackBarMessage}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            TransitionComponent={Slide}
          />
        </Box>
      </section>
      <section ref={connectRef}>
        <Footer />
      </section>
    </>
  );
}
