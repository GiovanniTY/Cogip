import React from 'react';
import { Link } from 'react-router-dom';
import adminImage from '../assets/Avatar.png';

const Sidebar = () => {
  return (
    <div className="w-64 bg-gray-200 p-4 shadow-md">
      <header className="center">
          <img src={adminImage} alt="profil-image" />
          <h2>Henry George</h2>
      </header>
      <hr className="border-t-2 border-gray-300 my-4"/>
      <main>
          <nav>
                <ul>
                <li className="mb-2">
                    <Link to="/dashboard" className="text-gray-700 hover:text-gray-900">
                    Dashboard
                    </Link>
                </li>
                <li className="mb-2">
                    <Link to="/dashboard/invoices" className="text-gray-700 hover:text-gray-900">
                    Invoices
                    </Link>
                </li>
                <li className="mb-2">
                    <Link to="/dashboard/companies" className="text-gray-700 hover:text-gray-900">
                    Companies
                    </Link>
                </li>
                <li className="mb-2">
                    <Link to="/dashboard/contacts" className="text-gray-700 hover:text-gray-900">
                    Contacts
                    </Link>
                </li>
                </ul>
            </nav>
      </main>
      <hr className="border-t-2 border-gray-300 my-4"/>
      <footer className='flex justify-between'>
        <img className='w-12 h-12' src={adminImage} alt="profil-image" />
        <button>Logout</button>
      </footer>
    </div>
  );
};

export default Sidebar;
