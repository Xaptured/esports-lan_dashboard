import AboutUs from '@/components/about-us/about-us';
import Hero from '@/components/hero/hero';
import NavigationBar from '@/components/navigation-bar/navigation-bar';

export default function Home() {
  return (
    <>
      <NavigationBar />
      <Hero />
      <AboutUs />
    </>
  );
}
