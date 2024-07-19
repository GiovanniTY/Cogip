import React from "react";
import footerImage from "../assets/Footer.png";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div>
      <div className="flex items-center justify-between my-16">
        <p className="ml-[100px] text-left font-Inter font-black text-6xl">WORK BETTER <br/> IN YOUR <br/> COMPANY</p>
        <img src={footerImage} alt="yellow polygon and phone" />
      </div>
    </div>
  );
}

export default Home;
