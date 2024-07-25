import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="font-Inter text-[#737373] p-6 md:p-14">
      <hr className="border-t-2 border-cogip-color" />
      <div className="my-8 flex flex-col md:flex-row justify-between items-center">
        <h2 className="text-center text-4xl md:text-5xl font-Roboto font-black border-cogip-color border-4 p-2 text-[#434138]">
          COGIP
        </h2>
        <div className="text-center md:text-left mt-6 md:mt-0">
          <p className="mb-3">
            <span className="text-cogip-color">
              <i className="fa-solid fa-location-dot"></i>
            </span>
            Square des Martyrs, 6000 Charleroi
          </p>
          <div className="flex flex-col md:flex-row md:space-x-6 space-y-4 md:space-y-0">
            <p>
              <span className="text-cogip-color">
                <i className="fa-solid fa-phone"></i>
              </span>
              (123) 456-7890
            </p>
            <p>
              <span className="text-cogip-color">
                <i className="fa-solid fa-print"></i>
              </span>
              (123) 456-7890
            </p>
          </div>
        </div>
      </div>
      <ul className="flex flex-wrap justify-center md:justify-end space-x-4 md:space-x-6 mb-6">
        <li>Social Media</li>
        <li>
          <span className="text-cogip-color">
            <i className="fa-brands fa-facebook-f"></i>
          </span>
        </li>
        <li>
          <span className="text-cogip-color">
            <i className="fa-brands fa-twitter"></i>
          </span>
        </li>
        <li>
          <span className="text-cogip-color">
            <i className="fa-brands fa-linkedin-in"></i>
          </span>
        </li>
        <li>
          <span className="text-cogip-color">
            <i className="fa-brands fa-youtube"></i>
          </span>
        </li>
        <li>
          <span className="text-cogip-color">
            <i className="fa-brands fa-instagram"></i>
          </span>
        </li>
        <li>
          <span className="text-cogip-color">
            <i className="fa-brands fa-google-plus-g"></i>
          </span>
        </li>
        <li>
          <span className="text-cogip-color">
            <i className="fa-brands fa-pinterest"></i>
          </span>
        </li>
        <li>
          <span className="text-cogip-color">
            <i className="fa-solid fa-wifi"></i>
          </span>
        </li>
      </ul>
      <hr className="border-t-2 border-cogip-color" />
      <div className="flex flex-col md:flex-row justify-between items-center py-4 space-y-4 md:space-y-0">
        <nav className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-6">
          <Link to="/" className="hover:text-cogip-color">HOME</Link>
          <Link to="/Invoices" className="hover:text-cogip-color">INVOICES</Link>
          <Link to="/Companies" className="hover:text-cogip-color">COMPANIES</Link>
          <Link to="/Contacts" className="hover:text-cogip-color">CONTACTS</Link>
          <Link to="/privacy-policy" className="hover:text-cogip-color">PRIVACY POLICY</Link>
        </nav>
        <p>Copyright © 2022 • COGIP Inc.</p>
      </div>
    </footer>
  );
}

export default Footer;
