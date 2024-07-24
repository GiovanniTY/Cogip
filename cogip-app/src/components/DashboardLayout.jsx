import React from 'react';
import Sidebar from './Sidebar';
import dashboardImage from '../assets/Layer 2.png';

const DashboardLayout = ({ children }) => (
  <div className="flex h-screen">
    <Sidebar />
    <div className="flex flex-col font-Inter flex-1">
      <header className="static p-4">
        <h1 className='pb-16 pt-11 text-4xl font-black'>Dashboard</h1>
        <div className='flex p-16 text-white bg-[#9698D6] rounded'>
            <p> <span className='text-3xl font-bold'>Welcome back Henry!</span><br />You can here add an invoice, a company
            and some contacts</p>
            <img className='absolute -top-2 right-24' src={dashboardImage} alt="DrawKit1"/>
        </div>
      </header>
      <main className="flex-1 p-6 overflow-y-auto">
        {children}
      </main>
    </div>
  </div>
);

export default DashboardLayout;
