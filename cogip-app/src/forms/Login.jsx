import React from 'react';

function Login() {
  return (
    <div className="flex font-Roboto items-center justify-center p-8">
      <form className="p-6 rounded shadow-md w-80">
        <h2 className="text-2xl font-bold mb-4 flex items-center justify-center">Login</h2>
        <div className="mb-4">
          <label className="block text-gray-700">Email</label>
          <input
            type="email"
            required
            className="mt-1 p-2 w-full border border-gray-300 rounded"
          />
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
};

export default Login;
