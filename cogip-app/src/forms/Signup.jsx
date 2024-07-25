import React from 'react';

function Signup() {
  return (
    <div className="flex font-Roboto items-center justify-center p-8">
      <form className="p-6 rounded shadow-md w-96">
        <h2 className="text-2xl font-bold mb-4 flex items-center justify-center">Sign Up</h2>
        <div className="mb-4">
          <label className="block text-gray-700">Email</label>
          <input
            type="email"
            required
            className="mt-1 p-2 w-full border border-gray-300 rounded"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="username">First Name</label>
          <input className="mt-1 p-2 w-full border border-gray-300 rounded" type="text" id="username" name="username" />
        </div>
        <div className="mb-4">
          <label htmlFor="username">Last Name</label>
          <input className="mt-1 p-2 w-full border border-gray-300 rounded" type="text" id="username" name="username" />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Password</label>
          <input
            type="password"
            required
            className="mt-1 p-2 w-full border border-gray-300 rounded"
          />
        </div>
        <button type="submit" className="w-full bg-cogip-color font-black p-2 rounded hover:bg-[#ffe75e]">
          Login
        </button>
      </form>
    </div>
  );
}

export default Signup;
