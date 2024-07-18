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
import Sidebar from './components/Sidebar';
import DashboardHome from './components/DashboardHome';
import DashboardSettings from './components/DashboardSettings';

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
                <Route path="/settings" element={<DashboardSettings />} />
              </Routes>
            </DashboardLayout>
          }
        />
      </Routes>
    </Router>
  );
}

const DashboardLayout = ({ children }) => (
  <div className="flex h-screen">
    <Sidebar />
    <div className="flex flex-col flex-1">
      <main className="flex-1 p-6 overflow-y-auto">{children}</main>
    </div>
  </div>
);

export default App;
