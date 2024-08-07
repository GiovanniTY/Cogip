import React, { useState } from 'react';

function Signup() {
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    const userData = { 
      email, 
      first_name: firstName, 
      last_name: lastName, 
      password, 
      created_at: new Date().toISOString(), 
      updated_at: new Date().toISOString() 
    };
    
    console.log("Sending data:", userData);

    try {
      const response = await fetch('http://localhost:8000/users/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });
      const data = await response.json();
      console.log("Response data:", data);
      if (response.ok) {
        alert("User created successfully!");
      } else {
        alert("Failed to create user: " + data.message);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred: " + error.message);
    }
  };

  return (
    <div className="flex font-Roboto items-center justify-center p-8">
      <form onSubmit={handleSubmit} className="p-6 rounded shadow-md w-96">
        <h2 className="text-2xl font-bold mb-4 flex items-center justify-center">Sign Up</h2>
        <div className="mb-4">
          <label className="block text-gray-700">Email</label>
          <input
            type="email"
            required
            className="mt-1 p-2 w-full border border-gray-300 rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="firstName">First Name</label>
          <input
            type="text"
            id="firstName"
            required
            className="mt-1 p-2 w-full border border-gray-300 rounded"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="lastName">Last Name</label>
          <input
            type="text"
            id="lastName"
            required
            className="mt-1 p-2 w-full border border-gray-300 rounded"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Password</label>
          <input
            type="password"
            required
            className="mt-1 p-2 w-full border border-gray-300 rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit" className="w-full bg-cogip-color font-black p-2 text-white rounded hover:bg-blue-600 transition-colors">
          Sign Up
        </button>
      </form>
    </div>
  );
}

export default Signup;
