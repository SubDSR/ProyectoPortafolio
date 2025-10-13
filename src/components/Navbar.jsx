import React from 'react';
// Importa los iconos que necesitas de la librería
import { FaHome, FaUser, FaCube, FaFileAlt, FaFlask, FaImage, FaMoon } from 'react-icons/fa';
import '../styles/Navbar.css';

function Navbar() {
  return (
    <nav className="navbar-container">
      <ul className="nav-links">
        <li>
          {/* Añadimos la clase 'active' para el estilo del botón seleccionado */}
          <a href="#home" className="nav-link active">
            <FaHome />
          </a>
        </li>
        <li>
          <a href="#about" className="nav-link">
            <FaUser />
            <span>About</span>
          </a>
        </li>
        <li>
          <a href="#projects" className="nav-link">
            <FaCube />
            <span>Projects</span>
          </a>
        </li>
        <li>
          {/* Este puede ser un botón para cambiar el tema */}
          <button className="nav-link theme-toggle">
            <FaMoon />
          </button>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;