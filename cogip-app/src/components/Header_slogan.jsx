import React from "react";
import heroImage from "../assets/drawkit1.png";

function Header_slogan() {
  return (
    <div className="flex items-center text-6xl font-Inter font-black">
      <p>MANAGE YOUR CUSTOMERS AND INVOICES EASILY</p>
      <img src={heroImage} alt="DrawKit1" />
    </div>
  );
}
export default Header_slogan;