'use client';

import AudienceNavBar from '@/components/navigation-bar/audience-nav-bar';
import { usePathname } from 'next/navigation';
import React from 'react';

export default function layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathName = usePathname();
  console.log(pathName);

  return (
    <>
      {pathName !== '/audience-home/payment-status' && <AudienceNavBar />}

      <div>{children}</div>
    </>
  );
}
