import React from 'react';
import UserCard from '../components/UI/UserCard';
import Navbar from './Navbar';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div>
      <Navbar />
      <main className="ml-[20%]">
        <div className="flex justify-end items-center px-10 py-5">
          <UserCard />
        </div>
        {children}
      </main>
    </div>
  );
};

export default Layout;
