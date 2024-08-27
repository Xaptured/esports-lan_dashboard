import AboutUs from '@/components/about-us/about-us';
import Hero from '@/components/hero/hero';
import NavigationBar from '@/components/navigation-bar/navigation-bar';
import Partners from '@/components/partners/partners';
import Users from '@/components/users/users';

export default function Home() {
  return (
    <>
      <NavigationBar />
      <Hero />
      <AboutUs />
      <Users />
      <Partners />
    </>
  );
}
