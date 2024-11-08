import AdminNavBar from '@/components/navigation-bar/admin-nav-bar';
import React from 'react';

export default function layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <AdminNavBar />
      <div>{children}</div>
    </>
  );
}
