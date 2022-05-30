import React from 'react';
import Footer from '../components/footer/Footer';

import SearchBar from '../components/header/SearchBar';
import UserCard from '../components/header/UserCard';
import Navbar from './Navbar';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="dark:text-white">
      <Navbar />
      <main className="ml-[20%]">
        <div className="flex justify-between items-center p-10">
          <SearchBar />
          <UserCard isLoggedIn={false} />
        </div>
        {children}
        <Footer />
      </main>
    </div>
  );
};

export default Layout;
