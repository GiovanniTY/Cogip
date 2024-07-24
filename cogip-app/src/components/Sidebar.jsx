import React from "react";
import { Link } from "react-router-dom";
import adminImage from "../assets/Avatar.png";
import companies from "../assets/Icon_Companies.png";
import contacts from "../assets/Icon_contact.png";
import dashboard from "../assets/Icon_dashboard.png";
import invoices from "../assets/Icon_Invoices.png";

const Sidebar = () => {
  return (
    <div className="w-64 flex flex-col mr-6 bg-gray-200 p-4 shadow-md">
      <div className="flex flex-col items-center">
        <header className="flex flex-col items-center">
          <img src={adminImage} alt="profil-image" />
          <h2 className="font-Roboto font-black max-w-fit">
            Henry <br /> George
          </h2>
        </header>
        <hr className="border-t-2 border-gray-300 my-4 w-full" />
        <main>
          <nav>
            <ul>
              <li className="flex items-center mb-6">
                <img className="mr-7" src={dashboard} alt="dashboard-icon" />
                <Link
                  to="/dashboard"
                  className="text-gray-700 hover:text-gray-900"
                >
                  Dashboard
                </Link>
              </li>
              <li className="flex items-center mb-6">
                <img className="mr-7" src={invoices} alt="invoices-icon" />
                <Link
                  to="/dashboard/invoices"
                  className="text-gray-700 hover:text-gray-900"
                >
                  Invoices
                </Link>
              </li>
              <li className="flex items-center mb-6">
                <img className="mr-7" src={companies} alt="companies-icon" />
                <Link
                  to="/dashboard/companies"
                  className="text-gray-700 hover:text-gray-900"
                >
                  Companies
                </Link>
              </li>
              <li className="flex items-center mb-6">
                <img className="mr-7" src={contacts} alt="contacts-icon" />
                <Link
                  to="/dashboard/contacts"
                  className="text-gray-700 hover:text-gray-900"
                >
                  Contacts
                </Link>
              </li>
            </ul>
          </nav>
        </main>
      </div>
      <hr className="border-t-2 border-gray-300 my-4" />
      <footer className="flex justify-between ">
        <img className="w-12 h-12" src={adminImage} alt="profil-image" />
        <button>Logout</button>
      </footer>
    </div>
  );
};

export default Sidebar;
