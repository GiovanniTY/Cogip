import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import dashboardImage from '../../assets/Layer 2.png';
import menu from '../../assets/hamburger_icon.png';

const DashboardLayout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      const sidebar = document.querySelector('.fixed');
      if (sidebar && !sidebar.contains(event.target)) {
        closeSidebar();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="flex h-screen bg-gray-200">
      <Sidebar isSidebarOpen={isSidebarOpen} closeSidebar={closeSidebar} />
      <div className="flex-1 flex flex-col overflow-y-auto">
        <header className="p-4 md:p-6 flex items-center justify-between">
          <button onClick={toggleSidebar} className="text-2xl md:hidden">
            <img className="w-8 h-8 flex flex-col justify-between items-center" src={menu} alt="hamburger-icon" />
          </button>
          <h1 className='text-2xl md:text-4xl font-black'>Dashboard</h1>
        </header>
        <div className='relative flex flex-col md:flex-row items-center p-8 bg-[#9698D6] text-white rounded md:space-x-4'>
          <p className='text-lg md:text-xl font-light'>
            <span className='text-3xl font-bold'>Welcome back Henry!</span><br />You can here add an invoice, a company and some contacts
          </p>
          <img
            className='mt-4 md:mt-0 md:absolute md:-top-24 md:right-24 md:w-2/5 lg:w-1/3 xl:w-1/4'
            style={{ maxWidth: 'none' }}
            src={dashboardImage}
            alt="Dashboard"
          />
        </div>
        <main className="flex-1 p-4 md:p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
