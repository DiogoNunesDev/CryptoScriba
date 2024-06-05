import React from "react";
import logo from '../assets/CryptoScriba_.png';
import '../components/styles/header.css';

export default function Header() {
  return (
    <header className="header">
      <img src={logo} alt="Logo" />
      <button className="logout-button">Log out</button>
    </header>
  );
}

