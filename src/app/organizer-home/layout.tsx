'use client';

import OrganizerNavBar from '@/components/navigation-bar/organizer-nav-bar';
import { usePathname } from 'next/navigation';
import React from 'react';

export default function layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathName = usePathname();
  return (
    <>
      {pathName !== '/organizer-home/check-in/verify-user' && (
        <OrganizerNavBar />
      )}

      <div>{children}</div>
    </>
  );
}
