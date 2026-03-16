import React from "react";
import { FaDownload, FaLinkedinIn, FaInstagram, FaGithub } from 'react-icons/fa';
import "../styles/Hero.css";
import robot from "../assets/robot_meme2.png";

function Hero() {
  return (
    <section id="hero" className="hero">
      <div className="container">
        <div className="hero-content-wrapper">
          <div className="hero-text">
            <h1>Hola, soy <span>David Sevan</span></h1>
            <h2>Desarrollador Fullstack</h2>
            <p> Estudiante de Ingeniería de Software. Apasionado por el desarrollo de software de extremo a extremo, cuidando tanto el diseño de la interfaz como la lógica del servidor.</p>
            
            <div className="hero-actions">
              <a href="/CV_David_Sevan.pdf" download="CV_David_Sevan.pdf" className="btn primary-btn">
                <FaDownload /> Descargar CV
              </a>
              <div className="social-links">
                <a href="https://www.linkedin.com/in/david-sevan/" target="_blank" rel="noopener noreferrer">
                  <FaLinkedinIn />
                </a>
                <a href="https://www.instagram.com/david_sevan" target="_blank" rel="noopener noreferrer">
                  <FaInstagram />
                </a>
                <a href="https://github.com/SubDSR" target="_blank" rel="noopener noreferrer">
                  <FaGithub />
                </a>
              </div>
            </div>

          </div>
          {/* Contenedor para el fondo circular */}
          <div className="hero-image-container">
            <img src={robot} alt="Robot animado" className="hero-image" />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;