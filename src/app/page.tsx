'use client';

import AboutUs from '@/components/about-us/about-us';
import Footer from '@/components/footer/footer';
import Hero from '@/components/hero/hero';
import LandingForms from '@/components/landing-forms/landing-forms';
import NavigationBar from '@/components/navigation-bar/navigation-bar';
import Partners from '@/components/partners/partners';
import Users from '@/components/users/users';
import { useRef } from 'react';

export default function Home() {
  const heroRef = useRef(null);
  const aboutUsRef = useRef(null);
  const usersRef = useRef(null);
  const partnersRef = useRef(null);
  const formsRef = useRef(null);
  const connectRef = useRef(null);
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
        <Hero formsRef={formsRef} />
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
      </section>
      <section ref={connectRef}>
        <Footer />
      </section>
    </>
  );
}
