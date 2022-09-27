import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Header from '../components/Header';

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
