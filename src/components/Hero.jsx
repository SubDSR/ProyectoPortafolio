import React from "react";
import { FaDownload, FaLinkedinIn, FaInstagram, FaGithub } from 'react-icons/fa'; 
import "../styles/Hero.css";
import robot from "../assets/robot_meme.png";

function Hero() {
  return (
    <section id="hero" className="hero">
      <div className="container">
        <div className="hero-content-wrapper">
          <div className="hero-text">
            <h1>Hola, soy <span>David Sevan</span></h1>
            <h2>Desarrollador Fullstack</h2>
            <p>Apasionado por crear interfaces modernas y funcionales.</p>
            
            <div className="hero-actions">
              <a href="/tu_cv.pdf" download className="btn primary-btn">
                <FaDownload /> Descargar CV
              </a>
              <div className="social-links">
                <a href="https://linkedin.com/in/tu_perfil" target="_blank" rel="noopener noreferrer">
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
          <img src={robot} alt="Robot animado" className="hero-image" />
        </div>
      </div>
    </section>
  );
}

export default Hero;