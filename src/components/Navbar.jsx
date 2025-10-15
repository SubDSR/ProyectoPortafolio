import React from 'react';
// Se ha cambiado FaMicrochip por FaCode
import { FaHome, FaUser, FaCube, FaGraduationCap, FaCode, FaMoon } from 'react-icons/fa';
import '../styles/Navbar.css';

function Navbar() {
  return (
    <nav className="navbar-container">
      <ul className="nav-links">
        {/* 1. Inicio */}
        <li>
          <a href="#hero" className="nav-link active">
            <FaHome />
          </a>
        </li>
        {/* 2. Proyectos */}
        <li>
          <a href="#projects" className="nav-link">
            <FaCube />
            <span>Proyectos</span>
          </a>
        </li>
        {/* 3. Sobre Mí */}
        <li>
          <a href="#about" className="nav-link">
            <FaUser />
            <span>Sobre Mí</span>
          </a>
        </li>
        {/* 4. Certificados */}
        <li>
          <a href="#certificates" className="nav-link">
            <FaGraduationCap />
            <span>Certificados</span>
          </a>
        </li>
        {/* 5. Tecnologías */}
        <li>
          <a href="#technologies" className="nav-link">
            <FaCode /> {/* <-- ICONO ACTUALIZADO */}
            <span>Tecnologías</span>
          </a>
        </li>
        {/* Botón de Tema (Opcional) */}
        <li>
          <button className="nav-link theme-toggle">
            <FaMoon />
          </button>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;