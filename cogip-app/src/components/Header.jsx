import React from "react";
import Header_solgan from "./Header_slogan";
import polygon from "../assets/rectangle-white.png";

function Header() {
  return (
    <header className="font-Roboto font-semibold bg-cogip-color">
      <div className="border-t-[70px] border-l-[100px] border-cogip-color">
        <div className="flex justify-between items-center">
          <h1 className="text-4xl font-black">COGIP</h1>
          <nav className="flex space-x-14">
            <a className="border border-black p-3 hover:border-white" href="/">
              Home
            </a>
            <a className="hover:border border-white p-3" href="/Invoices">
              Invoices
            </a>
            <a className="hover:border border-white p-3" href="/Companies">
              Companies
            </a>
            <a className="hover:border border-white p-3" href="/Contacts">
              Contacts
            </a>
          </nav>
          <div className="flex space-x-14 mr-14">
            <a className=" hover:bg-white rounded-lg p-2" href="">
              Sign up
            </a>
            <a className=" hover:bg-white rounded-lg p-2" href="">
              Login
            </a>
          </div>
        </div>
        <Header_solgan />
        <img src={polygon} alt="white polygon figure" />
      </div>
    </header>
  );
}
export default Header;
