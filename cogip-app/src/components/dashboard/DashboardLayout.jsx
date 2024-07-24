import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import dashboardImage from '../../assets/Layer 2.png';

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
    <div className="flex h-screen relative">
      <Sidebar isSidebarOpen={isSidebarOpen} closeSidebar={closeSidebar} />
      <div className="flex-1 flex flex-col">
        <header className="p-4 md:p-6 bg-white shadow-md flex items-center justify-between z-40 relative">
          <button onClick={toggleSidebar} className="text-2xl md:hidden">
            <div className="w-8 h-8 flex flex-col justify-between items-center">
              <span className="block w-6 h-1 bg-gray-700"></span>
              <span className="block w-6 h-1 bg-gray-700"></span>
              <span className="block w-6 h-1 bg-gray-700"></span>
            </div>
          </button>
          <h1 className='text-2xl md:text-3xl font-bold'>Dashboard</h1>
        </header>
        <div className='relative flex flex-col md:flex-row items-center p-4 bg-indigo-400 text-white rounded md:space-x-4'>
          <p className='text-lg md:text-xl font-bold'>
            Welcome back Henry!<br />You can here add an invoice, a company, and some contacts
          </p>
          <img className='absolute top-0 right-0 md:relative md:top-auto md:right-auto md:w-1/3 lg:w-1/4' src={dashboardImage} alt="Dashboard"/>
        </div>
        <main className="flex-1 p-4 md:p-6 overflow-y-auto bg-gray-100">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
