import React from 'react';
import heroImage from '../assets/drawkit1.png';
import footerImage from '../assets/drawkit2.png';
import { Link } from 'react-router-dom';


function Home() {

  return (
    <div>
        <div className='flex items-center text-3xl'>
            <p>MANAGE YOUR CUSTOMERS AND INVOICES EASLY</p>
            <img src={heroImage} alt="DrawKit1"/>
        </div>
        <div className='flex items-center text-3xl my-16'>
            <p>WORK BETTER IN YOUR COMPANY</p>
            <img src={footerImage} alt="DrawKit2"/>
        </div>
    </div>
    
  );
}

export default Home;
