import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="px-36 font-Inter text-[#737373]">
      <hr />
      <div className="my-8 flex justify-between items-center ">
        <h2 className="text-center text-5xl font-Roboto font-black border-cogip-color border-4 p-2 text-[#434138]">COGIP</h2>
        <div>
          <p className="mb-3">
            <span className="text-cogip-color"> <i class="fa-solid fa-location-dot"></i></span>Square des Martyrs, 6000
            Charleroi
          </p>
          <div className="flex space-x-24">
          <p>
            <span className="text-cogip-color"><i class="fa-solid fa-phone"></i></span>(123) 456-7890{" "}
          </p>
          <p>
            {" "}
            <span className="text-cogip-color"><i class="fa-solid fa-print"></i></span>(123) 456-7890
          </p>
          </div>
        </div>
      </div>
      <ul className="flex justify-end space-x-6">
        <li>Social Media</li>
        <li>
          <span className="text-cogip-color"><i class="fa-brands fa-square-facebook"></i></span>
        </li>
        <li>
          <span className="text-cogip-color"><i class="fa-brands fa-twitter"></i></span>
        </li>
        <li>
          <span className="text-cogip-color"><i class="fa-brands fa-linkedin-in"></i></span>
        </li>
        <li>
          <span className="text-cogip-color"><i class="fa-brands fa-youtube"></i></span>
        </li>
        <li>
          <span className="text-cogip-color"><i class="fa-brands fa-youtube"></i></span>
        </li>
        <li>
          <span className="text-cogip-color"><i class="fa-brands fa-instagram"></i></span>
        </li>
        <li>
          <span className="text-cogip-color"><i class="fa-brands fa-google-plus-g"></i></span>
        </li>
        <li>
          <span className="text-cogip-color"><i class="fa-brands fa-pinterest"></i></span>
        </li>
        <li>
          <span className="text-cogip-color"><i class="fa-solid fa-wifi fa-rotate-by"></i></span>
        </li>
      </ul>
      <hr />
      <div className="flex justify-between space-x-14 py-4">
        <nav className="space-x-16">
          <a href="/">HOME</a>
          <a href="Invoices">INVOICES</a>
          <a href="Companies">COMPANIES </a>
          <a href="/Contacts">CONTACTS</a>
          <a href="">PRIVACY POLICY</a>
        </nav>
        <p>Copyright © 2022 • COGIP Inc.</p>
      </div>
    </footer>
  );
}

export default Footer;
