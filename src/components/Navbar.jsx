import React, { useState, useEffect } from 'react';
import { FaHome, FaUser, FaCube, FaGraduationCap, FaCode, FaEnvelope } from 'react-icons/fa';
import ThemeToggle from './ThemeToggle';
import '../styles/Navbar.css';

function Navbar() {
  const [activeNav, setActiveNav] = useState('#hero');

  useEffect(() => {
    const sections = ['#hero', '#projects', '#about', '#certificates', '#technologies', '#contact'];

    const observerOptions = {
      root: null,
      rootMargin: '-40% 0px -40% 0px',
      threshold: 0,
    };

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveNav(`#${entry.target.id}`);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    sections.forEach((selector) => {
      const element = document.querySelector(selector);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <nav className="navbar-container" aria-label="Navegación principal">
      <ul className="nav-links">
        <li>
          <a
            href="#hero"
            onClick={() => setActiveNav('#hero')}
            className={`nav-link${activeNav === '#hero' ? ' active' : ''}`}
            aria-label="Inicio"
          >
            <FaHome />
          </a>
        </li>
        <li>
          <a
            href="#projects"
            onClick={() => setActiveNav('#projects')}
            className={`nav-link${activeNav === '#projects' ? ' active' : ''}`}
          >
            <FaCube />
            <span>Proyectos</span>
          </a>
        </li>
        <li>
          <a
            href="#about"
            onClick={() => setActiveNav('#about')}
            className={`nav-link${activeNav === '#about' ? ' active' : ''}`}
          >
            <FaUser />
            <span>Sobre Mí</span>
          </a>
        </li>
        <li>
          <a
            href="#certificates"
            onClick={() => setActiveNav('#certificates')}
            className={`nav-link${activeNav === '#certificates' ? ' active' : ''}`}
          >
            <FaGraduationCap />
            <span>Certificados</span>
          </a>
        </li>
        <li>
          <a
            href="#technologies"
            onClick={() => setActiveNav('#technologies')}
            className={`nav-link${activeNav === '#technologies' ? ' active' : ''}`}
          >
            <FaCode />
            <span>Tecnologías</span>
          </a>
        </li>
        <li>
          <a
            href="#contact"
            onClick={() => setActiveNav('#contact')}
            className={`nav-link${activeNav === '#contact' ? ' active' : ''}`}
            aria-label="Contacto"
          >
            <FaEnvelope />
          </a>
        </li>
        <li>
          <ThemeToggle />
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
