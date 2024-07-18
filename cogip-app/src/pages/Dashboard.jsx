import React from 'react';
import Sidebar from '../components/Sidebar';
import { Routes, Route } from 'react-router-dom';
import DashboardHome from '../components/DashboardHome';
import DashboardSettings from '../components/Dashboardinvoices';

const Dashboard = () => {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex flex-col flex-1">
        <header className="bg-gray-800 text-white py-4 text-center">
          <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        </header>
        <main className="flex-1 p-6 overflow-y-auto">
          <Routes>
            <Route path="/" element={<DashboardHome />} />
            <Route path="/settings" element={<DashboardSettings />} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
