import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className='px-36'>
        <hr />
        <div className='my-8 flex justify-between items-center '>
          <h2 className='text-center'>COGIP</h2>
          <ul>
              <li><i className='' class="fa-solid fa-location-dot"></i>Square des Martyrs, 6000 Charleroi</li>
              <li><i class="fa-solid fa-phone"></i>(123) 456-7890 <i class="fa-solid fa-print"></i>(123) 456-7890</li>
          </ul>
        </div>
        <ul className='flex space-x-8'>
            <li>Social Media</li>
            <li><i class="fa-brands fa-square-facebook"></i></li>
            <li><i class="fa-brands fa-twitter"></i></li>
            <li><i class="fa-brands fa-linkedin-in"></i></li>
            <li><i class="fa-brands fa-youtube"></i></li>
            <li><i class="fa-brands fa-youtube"></i></li>
            <li><i class="fa-brands fa-instagram"></i></li>
            <li><i class="fa-brands fa-google-plus-g"></i></li>
            <li><i class="fa-brands fa-pinterest"></i></li>
            <li><i class="fa-solid fa-wifi fa-rotate-by"></i></li>
          </ul>
        <hr />
        <div className='flex items-center'>        
          <nav className='flex space-x-14 py-4'>
            <a href="">HOME</a>
            <a href="">INVOICES</a>
            <a href="">COMPANIES </a>
            <a href="">CONTACTS</a>
            <a href="">PRIVACY POLICY</a>
          </nav>
          <p>Copyright © 2022 • COGIP Inc.</p>
        </div>
        

    </footer>
  );
};

export default Footer;
  