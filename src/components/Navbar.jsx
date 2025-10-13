import React from "react";
import "../styles/Navbar.css";

function Navbar() {
  return (
    <nav className="navbar">
      <h1 className="logo">David Sevan</h1>
      <ul className="nav-links">
        <li><a href="#hero">Inicio</a></li>
        <li><a href="#projects">Proyectos</a></li>
      </ul>
    </nav>
  );
}

export default Navbar;
