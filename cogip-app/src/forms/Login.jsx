import React, { useState } from 'react';

function Login() {
  // Stato per email e password
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  // Funzione per gestire l'invio del modulo
  const handleSubmit = async (event) => {
    event.preventDefault(); // Evita il comportamento di invio predefinito

    try {
      const response = await fetch('http://localhost:8000/login/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: "email", 
          password: "password" }),
      });

      const data = await response.json();

      if (response.ok) {
        // Salva il token nel localStorage
        localStorage.setItem('token', data.key); // Assicurati che la chiave sia corretta
        setMessage('Login successful!');
        // Puoi anche reindirizzare l'utente a una pagina protetta
        // window.location.href = '/dashboard';
      } else {
        setMessage(data.message || 'Login failed.');
      }
    } catch (error) {
      setMessage('Error: ' + error.message);
    }
  };

  return (
    <div className="flex font-Roboto items-center justify-center p-8">
      <form method="POST" onSubmit={handleSubmit} className="p-6 rounded shadow-md w-80">
        <h2 className="text-2xl font-bold mb-4 flex items-center justify-center">Login</h2>
        <div className="mb-4">
          <label for="email" className="block text-gray-700">Email</label>
          <input id="email" name="email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 p-2 w-full border border-gray-300 rounded"
          />
        </div>
        <div className="mb-4">
          <label for="password" className="block text-gray-700">Password</label>
          <input id="password" name="password"
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 p-2 w-full border border-gray-300 rounded"
          />
        </div>
        <button type="submit" className="w-full bg-cogip-color font-black p-2 rounded hover:bg-[#ffe75e]">
          Login
        </button>
        {message && <div className="mt-4 text-center text-red-500">{message}</div>}
      </form>
    </div>
  );
}

export default Login;
