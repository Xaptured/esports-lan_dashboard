import OrganizerNavBar from '@/components/navigation-bar/organizer-nav-bar';
import React from 'react';

export default function layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <OrganizerNavBar />
      <div>{children}</div>
    </>
  );
}
