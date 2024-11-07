import AudienceNavBar from '@/components/navigation-bar/audience-nav-bar';
import React from 'react';

export default function layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <AudienceNavBar />
      <div>{children}</div>
    </>
  );
}
