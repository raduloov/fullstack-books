import React from 'react';

import SearchBar from '../components/header/SearchBar';
import UserCard from '../components/header/UserCard';
import Navbar from './Navbar';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div>
      <Navbar />
      <main className="ml-[20%]">
        <div className="flex justify-between items-center px-10 py-5">
          <SearchBar />
          <UserCard />
        </div>
        {children}
      </main>
    </div>
  );
};

export default Layout;
