import React from "react";
import { useLocation } from "react-router-dom";
import Header_slogan from "./Header_slogan";
import polygon from "../assets/rectangle-white.png";

function Header() {
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  return (
    <header className="font-Roboto font-semibold bg-cogip-color">
      <div className="border-t-[70px] border-l-[100px] border-cogip-color relative">
        <div className="flex flex-col md:flex-row justify-between items-center px-4 py-6 md:px-8 md:py-8">
          <h1 className="text-4xl md:text-5xl font-black">COGIP</h1>
          <nav className="flex flex-col md:flex-row md:space-x-8 mt-4 md:mt-0">
            <a className="hover:border border-white p-2 md:p-3" href="/">
              Home
            </a>
            <a className="hover:border border-white p-2 md:p-3" href="/Invoices">
              Invoices
            </a>
            <a className="hover:border border-white p-2 md:p-3" href="/Companies">
              Companies
            </a>
            <a className="hover:border border-white p-2 md:p-3" href="/Contacts">
              Contacts
            </a>
          </nav>
          <div className="flex flex-col md:flex-row mt-4 md:mt-0 space-y-2 md:space-y-0 md:space-x-4">
            <a className="hover:bg-white rounded-lg p-2 md:p-3" href="./Signup">
              Sign up
            </a>
            <a className="hover:bg-white rounded-lg p-2 md:p-3" href="./Login">
              Login
            </a>
          </div>
        </div>
        {isHomePage && <Header_slogan />}
        <img 
          src={polygon} 
          alt="white polygon figure" 
          className="w-full md:w-1/2 lg:w-1/3 absolute bottom-0 right-0"
        />
      </div>
    </header>
  );
}

export default Header;
