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

  const scrollTo = (id) => (e) => {
    e.preventDefault();
    document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav className="navbar-container" aria-label="Navegación principal">
      <ul className="nav-links">
        <li>
          <a
            href="#hero"
            onClick={scrollTo('#hero')}
            className={`nav-link${activeNav === '#hero' ? ' active' : ''}`}
            aria-label="Inicio"
          >
            <FaHome />
          </a>
        </li>
        <li>
          <a
            href="#projects"
            onClick={scrollTo('#projects')}
            className={`nav-link${activeNav === '#projects' ? ' active' : ''}`}
          >
            <FaCube />
            <span>Proyectos</span>
          </a>
        </li>
        <li>
          <a
            href="#about"
            onClick={scrollTo('#about')}
            className={`nav-link${activeNav === '#about' ? ' active' : ''}`}
          >
            <FaUser />
            <span>Sobre Mí</span>
          </a>
        </li>
        <li>
          <a
            href="#certificates"
            onClick={scrollTo('#certificates')}
            className={`nav-link${activeNav === '#certificates' ? ' active' : ''}`}
          >
            <FaGraduationCap />
            <span>Certificados</span>
          </a>
        </li>
        <li>
          <a
            href="#technologies"
            onClick={scrollTo('#technologies')}
            className={`nav-link${activeNav === '#technologies' ? ' active' : ''}`}
          >
            <FaCode />
            <span>Tecnologías</span>
          </a>
        </li>
        <li>
          <a
            href="#contact"
            onClick={scrollTo('#contact')}
            className={`nav-link${activeNav === '#contact' ? ' active' : ''}`}
          >
            <FaEnvelope />
            <span>Contacto</span>
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
