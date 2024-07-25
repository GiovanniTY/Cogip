import React from 'react';
import { Link } from 'react-router-dom';
import adminImage from '../../assets/Avatar.png';
import companies from "../../assets/Icon_Companies.png";
import contacts from "../../assets/Icon_contact.png";
import dashboard from "../../assets/Icon_dashboard.png";
import invoices from "../../assets/Icon_Invoices.png";
import menu from "../../assets/hamburger_icon.png";

const Sidebar = ({ isSidebarOpen, closeSidebar }) => {
  return (
    <div className={`fixed top-0 left-0 bg-white h-full p-4 shadow-md transition-transform transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 md:relative md:w-64 z-50`}>
      <button onClick={closeSidebar} className="absolute top-4 right-4 md:hidden text-2xl">
        <img className="w-8 h-8 flex flex-col justify-between items-center" src={menu} alt="hamburger-icon" />
      </button>
      <header className="flex flex-col items-center mb-4">
        <img className="rounded-full mr-2" src={adminImage} alt="profile" />
        <h2 className="text-lg font-Roboto font-black">Henry <br />George</h2>
      </header>
      <hr className="border-t-2 border-gray-300 my-4" />
      <main>
        <nav>
          <ul className="ml-6">
            <li className="flex items-center my-2">
              <img className="mr-7" src={dashboard} alt="dashboard-icon" />
              <Link to="/dashboard" className="text-gray-700 hover:text-gray-900 block p-2 rounded" onClick={closeSidebar}>Dashboard</Link>
            </li>
            <li className="flex items-center my-2">
              <img className="mr-7" src={invoices} alt="invoices-icon" />
              <Link to="/dashboard/invoices" className="text-gray-700 hover:text-gray-900 block p-2 rounded" onClick={closeSidebar}>Invoices</Link>
            </li>
            <li className="flex items-center my-2">
              <img className="mr-7" src={companies} alt="companies-icon" />
              <Link to="/dashboard/companies" className="text-gray-700 hover:text-gray-900 block p-2 rounded" onClick={closeSidebar}>Companies</Link>
            </li>
            <li className="flex items-center my-2">
              <img className="mr-7" src={contacts} alt="contacts-icon" />
              <Link to="/dashboard/contacts" className="text-gray-700 hover:text-gray-900 block p-2 rounded" onClick={closeSidebar}>Contacts</Link>
            </li>
          </ul>
        </nav>
      </main>
      <hr className="border-t-2 border-gray-300 my-4" />
      <footer className="absolute bottom-4 left-4 flex justify-between items-center space-x-2">
        <img className="w-12 h-12 rounded-full" src={adminImage} alt="profile" />
        <button>Logout</button>
      </footer>
    </div>
  );
};

export default Sidebar;
