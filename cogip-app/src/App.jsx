import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Invoices from './pages/Invoices';
import Companies from './pages/Companies';
import Contacts from './pages/Contacts';



function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Invoices" element={<Invoices/>} />
        <Route path="/Companies" element={<Companies />} />
        <Route path="/Contacts" element={<Contacts />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
