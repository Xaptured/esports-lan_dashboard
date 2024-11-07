import ParticipantNavBar from '@/components/navigation-bar/participanr-nav-bar';
import React from 'react';

export default function layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <ParticipantNavBar />
      <div>{children}</div>
    </>
  );
}
