import React from "react";

function Header() {
  return (
    <header className="font-Roboto font-semibold">
      <div className="border-[30px] border-yellow-300 flex justify-between bg-yellow-300 items-center">
        <h1 className="text-4xl font-black">COGIP</h1>
        <nav className="flex space-x-14">
          <a className="border border-black p-3 hover:border-white" href="">
            Home
          </a>
          <a className="hover:border border-white p-3" href="">
            Invoices
          </a>
          <a className="hover:border border-white p-3" href="">
            Companies
          </a>
          <a className="hover:border border-white p-3" href="">
            Contacts
          </a>
          <a href=""></a>
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
    </header>
  );
}
export default Header;
