import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import "../styles/navbar.css";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="navbar">
      <div className="logo">
        <h2>Welcome</h2>
      </div>

      {/* Burger Menu Icon */}
      <div className="menu-icon" onClick={toggleMenu}>
        {menuOpen ? <FaTimes /> : <FaBars />}
      </div>

      {/* Nav Links */}
        <nav className={menuOpen ? "nav active" : "nav"}>
        <ul>
            <li>
            <a href="#about" onClick={closeMenu}>About</a>
            </li>
            <li>
            <a href="#projects" onClick={closeMenu}>Projects</a>
            </li>
            <li>
            <a href="#skills" onClick={closeMenu}>Skills</a>
            </li>
            <li>
            <a href="#contact" onClick={closeMenu}>Contact</a>
            </li>
        </ul>
        </nav>
    </header>
  );
}
