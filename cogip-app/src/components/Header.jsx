import React from 'react';

function Header() {
    return (
      <div className='border-[30px] border-yellow-300 flex justify-between bg-yellow-300 items-center'>
        <h1 className='text-4xl'>COGIP</h1>
        <nav className='flex space-x-14' >
            <a href="">Home</a>
            <a href="">Invoices</a>
            <a href="">Campanies</a>
            <a href="">Contacts</a>
            <a href=""></a>
        </nav>
        <div  className='flex space-x-14 mr-14'>
            <a href="">Sign up</a>
            <a href="">Login</a>
        </div>
        
      </div>
    )
  }
  export default Header
  