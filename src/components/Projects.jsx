import React, { useState } from "react";
import "../styles/Projects.css";
import bienesRaices from "../assets/1759034658267.jpeg";
import webtech from "../assets/1759034658505.jpeg";

function Projects() {
  const [showAll, setShowAll] = useState(false);

  const toggleProjects = () => {
    setShowAll(!showAll);
  };

  return (
    <section id="projects" className="projects-section">
      <h2 className="projects-title">Proyectos</h2>
      <div className={`projects-grid ${showAll ? "show-all" : ""}`}>
        <div className="project-card">
          <img src={bienesRaices} alt="Proyecto Bienes Raíces" />
          <h3>Bienes Raíces</h3>
          <p>Sitio web de venta y alquiler de propiedades con funcionalidades en React.</p>
          <div className="buttons">
            <a href="#" className="btn-primary">Sitio Web</a>
            <a href="#" className="btn-secondary">GitHub</a>
          </div>
        </div>

        <div className="project-card">
          <img src={webtech} alt="Proyecto Webtech" />
          <h3>Landing Page Webtech</h3>
          <p>Sitio web de soluciones digitales impactantes creado con Vite + React.</p>
          <div className="buttons">
            <a href="#" className="btn-primary">Sitio Web</a>
            <a href="#" className="btn-secondary">GitHub</a>
          </div>
        </div>

        {/* Ejemplo de proyecto adicional */}
        <div className="project-card">
          <img src={bienesRaices} alt="Proyecto 3" />
          <h3>Dashboard Admin</h3>
          <p>Panel administrativo con gráficas dinámicas y autenticación.</p>
          <div className="buttons">
            <a href="#" className="btn-primary">Sitio Web</a>
            <a href="#" className="btn-secondary">GitHub</a>
          </div>
        </div>
      </div>

      <button className="view-more-btn" onClick={toggleProjects}>
        {showAll ? "Ver menos ↑" : "Ver más proyectos ↓"}
      </button>
    </section>
  );
}

export default Projects;
