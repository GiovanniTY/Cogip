import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Invoices from './pages/Invoices';
import Companies from './pages/Companies';
import Contacts from './pages/Contacts';
import Signup from './forms/Signup';
import Login from './forms/Login';
import DashboardHome from './components/dashboard/DashboardHome';
import DashboardInvoices from './components/dashboard/Dashboardinvoices';
import DashboardContacts from './components/dashboard/Dashboardcontacts';
import DashboardCompanies from './components/dashboard/Dashboardcompanies';
import DashboardLayout from './components/dashboard/DashboardLayout'; 

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/*"
          element={
            <>
              <Header />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/invoices" element={<Invoices />} />
                <Route path="/companies" element={<Companies />} />
                <Route path="/contacts" element={<Contacts />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/login" element={<Login />} />
              </Routes>
              <Footer />
            </>
          }
        />
        <Route
          path="/dashboard/*"
          element={
            <DashboardLayout>
              <Routes>
                <Route path="/" element={<DashboardHome />} />
                <Route path="invoices" element={<DashboardInvoices />} />
                <Route path="contacts" element={<DashboardContacts />} />
                <Route path="companies" element={<DashboardCompanies />} />
              </Routes>
            </DashboardLayout>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
