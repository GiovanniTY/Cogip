import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className="w-64 bg-gray-200 p-4 shadow-md">
        <img src="" alt="profil-image" />
        <h2>Full Name</h2>
        <hr />
        <nav>
            <ul>
            <li className="mb-2">
                <Link to="/dashboard" className="text-gray-700 hover:text-gray-900">
                Dashboard Home
                </Link>
            </li>
            <li className="mb-2">
                <Link to="/dashboard/settings" className="text-gray-700 hover:text-gray-900">
                Settings
                </Link>
            </li>
            </ul>
        </nav>
    </div>
  );
};

export default Sidebar;
