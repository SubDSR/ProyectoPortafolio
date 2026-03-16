import React, { useState, useEffect } from 'react';
import { FaHome, FaUser, FaCube, FaGraduationCap, FaCode, FaMoon } from 'react-icons/fa';
import '../styles/Navbar.css';

function Navbar() {
  const [activeNav, setActiveNav] = useState('#hero');

  useEffect(() => {
    // Definimos las secciones que queremos observar
    const sections = ['#hero', '#projects', '#about', '#certificates', '#technologies'];
    
    const observerOptions = {
      root: null,
      // Se activa cuando la sección ocupa el 60% de la pantalla
      rootMargin: '-40% 0px -40% 0px', 
      threshold: 0
    };

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveNav(`#${entry.target.id}`);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    // Observar cada sección que tenga un ID correspondiente
    sections.forEach((selector) => {
      const element = document.querySelector(selector);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <nav className="navbar-container">
      <ul className="nav-links">
        <li>
          <a 
            href="#hero" 
            onClick={() => setActiveNav('#hero')}
            className={`nav-link ${activeNav === '#hero' ? 'active' : ''}`}
          >
            <FaHome />
          </a>
        </li>
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
        {/*<li>
          <button className="nav-link theme-toggle">
            <FaMoon />
            </button>
          </li>*/}
      </ul>
    </nav>
  );
}

export default Navbar;