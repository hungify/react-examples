import Header from 'layouts/components/Header';
import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';

interface MainLayoutProps {
  children?: React.ReactNode;
}
export default function MainLayout({ children }: MainLayoutProps) {
  const { pathname } = useLocation();
  return (
    <>
      {pathname.split('/').length < 3 && <Header />}
      <main>
        <Outlet />
      </main>
    </>
  );
}
