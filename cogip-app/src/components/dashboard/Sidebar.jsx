import React from 'react';
import { Link } from 'react-router-dom';
import adminImage from '../../assets/Avatar.png';

const Sidebar = ({ isSidebarOpen, closeSidebar }) => {
  return (
    <div className={`fixed top-0 left-0 h-full bg-gray-200 p-4 shadow-md transition-transform transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 md:relative md:w-64 z-50`}>
      <button onClick={closeSidebar} className="absolute top-4 right-4 md:hidden text-2xl">
        <div className="w-8 h-8 flex flex-col justify-between items-center">
          <span className="block w-6 h-1 bg-gray-700"></span>
          <span className="block w-6 h-1 bg-gray-700"></span>
          <span className="block w-6 h-1 bg-gray-700"></span>
        </div>
      </button>
      <header className="flex items-center mb-4">
        <img className="w-12 h-12 rounded-full mr-2" src={adminImage} alt="profile" />
        <h2 className="text-lg font-semibold">Henry George</h2>
      </header>
      <hr className="border-t-2 border-gray-300 my-4" />
      <main>
        <nav>
          <ul>
            <li className="mb-2">
              <Link to="/dashboard" className="text-gray-700 hover:text-gray-900 block p-2 rounded" onClick={closeSidebar}>Dashboard</Link>
            </li>
            <li className="mb-2">
              <Link to="/dashboard/invoices" className="text-gray-700 hover:text-gray-900 block p-2 rounded" onClick={closeSidebar}>Invoices</Link>
            </li>
            <li className="mb-2">
              <Link to="/dashboard/companies" className="text-gray-700 hover:text-gray-900 block p-2 rounded" onClick={closeSidebar}>Companies</Link>
            </li>
            <li className="mb-2">
              <Link to="/dashboard/contacts" className="text-gray-700 hover:text-gray-900 block p-2 rounded" onClick={closeSidebar}>Contacts</Link>
            </li>
          </ul>
        </nav>
      </main>
      <hr className="border-t-2 border-gray-300 my-4" />
      <footer className="absolute bottom-4 left-4 flex items-center space-x-2">
        <img className="w-12 h-12 rounded-full" src={adminImage} alt="profile" />
        <button>Logout</button>
      </footer>
    </div>
  );
};

export default Sidebar;
