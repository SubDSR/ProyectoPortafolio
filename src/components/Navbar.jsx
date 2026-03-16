import React, { useState } from 'react';
import { FaHome, FaUser, FaCube, FaGraduationCap, FaCode, FaMoon } from 'react-icons/fa';
import '../styles/Navbar.css';

function Navbar() {
  // Estado para rastrear qué sección es la activa. Por defecto 'hero'.
  const [activeNav, setActiveNav] = useState('#hero');

  return (
    <nav className="navbar-container">
      <ul className="nav-links">
        {/* 1. Inicio */}
        <li>
          <a 
            href="#hero" 
            onClick={() => setActiveNav('#hero')}
            className={`nav-link ${activeNav === '#hero' ? 'active' : ''}`}
          >
            <FaHome />
          </a>
        </li>
        {/* 2. Proyectos */}
        <li>
          <a 
            href="#projects" 
            onClick={() => setActiveNav('#projects')}
            className={`nav-link ${activeNav === '#projects' ? 'active' : ''}`}
          >
            <FaCube />
            <span>Proyectos</span>
          </a>
        </li>
        {/* 3. Sobre Mí */}
        <li>
          <a 
            href="#about" 
            onClick={() => setActiveNav('#about')}
            className={`nav-link ${activeNav === '#about' ? 'active' : ''}`}
          >
            <FaUser />
            <span>Sobre Mí</span>
          </a>
        </li>
        {/* 4. Certificados */}
        <li>
          <a 
            href="#certificates" 
            onClick={() => setActiveNav('#certificates')}
            className={`nav-link ${activeNav === '#certificates' ? 'active' : ''}`}
          >
            <FaGraduationCap />
            <span>Certificados</span>
          </a>
        </li>
        {/* 5. Tecnologías */}
        <li>
          <a 
            href="#technologies" 
            onClick={() => setActiveNav('#technologies')}
            className={`nav-link ${activeNav === '#technologies' ? 'active' : ''}`}
          >
            <FaCode />
            <span>Tecnologías</span>
          </a>
        </li>
        {/* Botón de Tema */}
        {/*
        <li>
          <button className="nav-link theme-toggle">
            <FaMoon />
          </button>
        </li>
          */}
      </ul>
    </nav>
  );
}

export default Navbar;