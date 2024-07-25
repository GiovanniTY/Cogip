import React from "react";
import heroImage from "../assets/drawkit1.png";

function Header_slogan() {
  return (
    <div className="flex flex-col md:flex-row items-center text-center md:text-left p-4 md:p-8 space-y-4 md:space-y-0 md:space-x-8">
      <p className="text-4xl md:text-5xl lg:text-6xl font-Inter font-black">
        MANAGE YOUR CUSTOMERS AND INVOICES EASILY
      </p>
      <img 
        src={heroImage} 
        alt="DrawKit1" 
        className="w-full md:w-1/2 lg:w-1/3 max-w-sm"
      />
    </div>
  );
}

export default Header_slogan;
