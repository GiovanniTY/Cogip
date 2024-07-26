import React from "react";
import footerImage from "../assets/Footer.png";
import LatestInvoices from "../components/home/LastInvoices";
import LatestContacts from "../components/home/LastContacts";
import LatestCompanies from "../components/home/LastCompanies";

function Home() {
  return (
    <div className="p-6">
      <LatestInvoices />
      <LatestContacts />
      <LatestCompanies />
      
      <div className="flex flex-col md:flex-row items-center justify-between my-16">
        <p className="text-left font-Inter font-black text-4xl md:text-5xl lg:text-6xl xl:text-7xl mx-4 md:mx-8 lg:mx-16">
          WORK BETTER <br /> IN YOUR <br /> COMPANY
        </p>
        <img 
          src={footerImage} 
          alt="yellow polygon and phone" 
          className="w-full md:w-1/2 lg:w-1/3 xl:w-1/4 mt-8 md:mt-0"
        />
      </div>
    </div>
  );
}

export default Home;
