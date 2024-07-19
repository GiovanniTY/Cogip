import React from 'react';
import Sidebar from '../components/Sidebar';
import { Routes, Route } from 'react-router-dom';
import DashboardHome from '../components/DashboardHome';
import Dashboardinvoices from '../components/Dashboardinvoices';
import dashboardImage from "../assets/Layer 2.png";

const Dashboard = () => {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex flex-col flex-1">
        <header className="bg-gray-800 text-white py-4 text-center">
          <img src={dashboardImage} alt="DrawKit1" />
        </header>
        <main className="flex-1 p-6 overflow-y-auto">
          <Routes>
            <Route path="/" element={<DashboardHome />} />
            <Route path="/invoices" element={<Dashboardinvoices />} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
