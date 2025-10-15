import React, { useState } from "react";
import "../styles/Projects.css";

// Importa el nuevo componente de modal
import ImageModal from "./ImageModal"; // <-- ¡NUEVA IMPORTACIÓN!

// Importa las imágenes de tus proyectos
import bienesRaicesImg from "../assets/1759034658267.jpeg";
import webtechImg from "../assets/1759034658505.jpeg";
import systemvetImg from "../assets/sistema_veterinario.png";
import portfolioImg from "../assets/portafolio-personal.png";

// ... (importaciones de iconos) ...
// La forma correcta (una sola línea para 'react-icons/fa')
import { FaReact, FaGithub, FaCss3Alt } from 'react-icons/fa';
import { SiVite, SiNextdotjs, SiTailwindcss } from 'react-icons/si';
import { IoMdGlobe } from 'react-icons/io';

function Projects() {
  const [showAll, setShowAll] = useState(false);
  
  // --- ¡NUEVO ESTADO PARA EL MODAL! ---
  // Guardará la URL de la imagen a mostrar. Si es `null`, el modal está cerrado.
  const [selectedImage, setSelectedImage] = useState(null);

  const toggleProjects = () => {
    setShowAll(!showAll);
  };
  
  // --- NUEVAS FUNCIONES PARA ABRIR/CERRAR ---
  const openModal = (imageUrl) => {
    setSelectedImage(imageUrl);
  };
  
  const closeModal = () => {
    setSelectedImage(null);
  };

  return (
    <> {/* Usamos un Fragment (<>) para poder tener la sección y el modal al mismo nivel */}
      <section id="projects" className="projects-section">
        <div className="container">
          <h2 className="projects-title">Proyectos</h2>
          <div className={`projects-grid ${showAll ? "show-all" : ""}`}>
            
            {/* --- Tarjeta del Portafolio Personal --- */}
            <div className="project-card">
                {/* Usamos la nueva imagen importada */}
                <img 
                    src={portfolioImg} 
                    alt="Proyecto de Portafolio Personal" 
                    onClick={() => openModal(portfolioImg)}
                    style={{ cursor: 'pointer' }} 
                />

                <h3>Portafolio Personal</h3>
                
                {/* Tecnologías actualizadas para este proyecto */}
                <div className="project-tech">
                    <span className="tech-pill"><FaReact /> React</span>
                    <span className="tech-pill"><SiVite /> Vite</span>
                    <span className="tech-pill"><FaCss3Alt /> CSS</span>
                </div>

                {/* Nueva descripción del proyecto */}
                <p>Mi portafolio personal, diseñado y desarrollado para mostrar mis habilidades y proyectos. Creado desde cero con un enfoque en un diseño limpio, moderno e interactivo.</p>
                
                <div className="buttons">
                    <a href="#" className="btn-primary"><IoMdGlobe /> Sitio Web</a>
                    <a 
                        href="https://github.com/SubDSR/ProyectoPortafolio.git" // <-- REEMPLAZA ESTO
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="btn-secondary"
                    >
                        <FaGithub /> GitHub
                    </a>
                </div>
            </div>

            <div className="project-card">
              {/* ↓↓ AÑADIMOS onClick a la imagen ↓↓ */}
              <img
                src={systemvetImg}
                alt="Proyecto Sistema Veterinario"
                onClick={() => openModal(systemvetImg)}
                style={{ cursor: 'pointer' }}
              />

              <h3>Sistema de Gestión Clínica Veterinaria</h3>

              {/* Tecnologías principales */}
              <div className="project-tech">
                <span className="tech-pill"><FaGithub /> Python</span>
                <span className="tech-pill"><SiTailwindcss /> FastAPI</span>
                <span className="tech-pill"><FaCss3Alt /> MySQL</span>
              </div>

              {/* Descripción */}
              <p>
                Proyecto enfocado en la gestión integral de una clínica veterinaria. 
                Me concentré principalmente en el desarrollo del backend con Python y FastAPI, 
                además del diseño y administración de la base de datos en MySQL.
              </p>

              <div className="buttons">
                <a href="#" className="btn-primary"><IoMdGlobe /> Sitio Web</a>
                <a 
                  href="https://github.com/KevinBohorquez/VeterinariaClinica_Backend" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="btn-secondary"
                >
                  <FaGithub /> GitHub
                </a>
              </div>
            </div>


            <div className="project-card">
              {/* ↓↓ AÑADIMOS onClick a la imagen ↓↓ */}
              <img 
                src={bienesRaicesImg} 
                alt="Proyecto Bienes Raíces" 
                onClick={() => openModal(bienesRaicesImg)}
                style={{ cursor: 'pointer' }} /* Cambia el cursor para indicar que es clickeable */
              />
              <h3>Bienes Raíces</h3>
              {/* ... resto del contenido de la tarjeta ... */}
              <div className="project-tech">
                <span className="tech-pill"><SiTailwindcss /> TailwindCSS</span>
                <span className="tech-pill"><SiNextdotjs /> Next.js</span>
                <span className="tech-pill"><FaReact /> React</span>
              </div>
              <p>Sitio web de venta y alquiler de propiedades con diversas funcionalidades del Framework NextJs.</p>
              <div className="buttons">
                <a href="#" className="btn-primary"><IoMdGlobe /> Sitio Web</a>
                <a href="#" className="btn-secondary"><FaGithub /> GitHub</a>
              </div>
            </div>

          </div>

          <button className="view-more-btn" onClick={toggleProjects}>
            {showAll ? "Ver menos" : "Ver más"}
          </button>
        </div>
      </section>

      {/* --- RENDERIZADO CONDICIONAL DEL MODAL --- */}
      {/* El modal solo se mostrará en el DOM si `selectedImage` no es `null` */}
      <ImageModal imageUrl={selectedImage} onClose={closeModal} />
    </>
  );
}

export default Projects;