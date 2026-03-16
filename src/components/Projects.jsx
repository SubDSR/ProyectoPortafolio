import React, { useState } from "react";
import "../styles/Projects.css";

// Importa el componente de modal
import ImageModal from "./ImageModal"; 
import VideoModal from "./VideoModal";

// Importa las imágenes de tus proyectos
import bienesRaicesImg from "../assets/1759034658267.jpeg";
import systemvetImg from "../assets/sistema_veterinario.png";
import portfolioImg from "../assets/portafolio-personal.png";
import educamovilImg from "../assets/educamovil.png";
import lapuntitaImg from "../assets/lapuntita.png"; // Asegúrate de tener esta imagen en tu carpeta de assets

// Importaciones de iconos
import { FaReact, FaGithub, FaCss3Alt, FaPython } from 'react-icons/fa';
import { SiVite, SiNextdotjs, SiTailwindcss, SiFastapi, SiMysql, SiExpo } from 'react-icons/si';
import { IoMdGlobe, IoMdPlay } from 'react-icons/io';

function Projects() {
  const [showAll, setShowAll] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  // Estados para EducaMovil
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const videoUrlEducaMovil = "https://drive.google.com/file/d/1mNoM-mDNSaqoxgwZHod_F0MmrttUZspz/view?usp=sharing"; 

  // NUEVO: Estados para La Puntita
  const [isLaPuntitaVideoOpen, setIsLaPuntitaVideoOpen] = useState(false);
  const videoUrlLaPuntita = "https://drive.google.com/file/d/1kiKX-rTdQ6A9EWuQ5JFfWFJB5x2u1_8p/view?usp=sharing"; 

  // --- FUNCIÓN ACTUALIZADA CON CONDICIONAL PARA MÓVIL ---
  const toggleProjects = () => {
    // Comprueba si se va a ocultar y si la pantalla es de móvil (menor a 900px)
    if (showAll && window.innerWidth < 900) {
      const projectsSection = document.getElementById('projects');
      if (projectsSection) {
        // Realiza el scroll solo si se cumplen las condiciones
        projectsSection.scrollIntoView({ behavior: 'smooth' });
      }
    }
    // El estado siempre se actualiza, independientemente del scroll
    setShowAll(!showAll);
  };
  
  const openModal = (imageUrl) => {
    setSelectedImage(imageUrl);
  };
  
  const closeModal = () => {
    setSelectedImage(null);
  };

  return (
    <>
      <section id="projects" className="projects-section">
        <div className="container">
          <h2 className="projects-title">Proyectos</h2>
          <div className={`projects-grid ${showAll ? "show-all" : ""}`}>
            
            {/* --- PROYECTO 1: SISTEMA VETERINARIO --- */}
            <div className="project-card">
              <div className="project-category">Backend</div>
              <img
                src={systemvetImg}
                alt="Proyecto Sistema Veterinario"
                onClick={() => openModal(systemvetImg)}
                style={{ cursor: 'pointer' }}
              />
              <h3>Sistema de Gestión Clínica Veterinaria</h3>
              <div className="project-tech">
                <span className="tech-pill"><FaPython /> Python</span>
                <span className="tech-pill"><SiFastapi /> FastAPI</span>
                <span className="tech-pill"><SiMysql /> MySQL</span>
              </div>
              <p>
                Proyecto enfocado en la gestión integral de una clínica veterinaria. 
                Me concentré principalmente en el desarrollo del backend con Python y FastAPI, 
                además del diseño y administración de la base de datos en MySQL.
              </p>
              <div className="buttons">
                <a href="https://veterinariabd.vercel.app/" className="btn-primary"><IoMdGlobe /> Sitio Web</a>
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

            {/* --- CONTENEDOR PARA LOS PROYECTOS SECUNDARIOS --- */}
            <div className="secondary-projects">

              {/* --- PROYECTO 2: PORTAFOLIO PERSONAL --- */}
              <div className="project-card">
                <div className="project-category">Frontend</div>
                <img 
                    src={portfolioImg} 
                    alt="Proyecto de Portafolio Personal" 
                    onClick={() => openModal(portfolioImg)}
                    style={{ cursor: 'pointer' }} 
                />
                <h3>Portafolio Personal</h3>
                <div className="project-tech">
                    <span className="tech-pill"><FaReact /> React</span>
                    <span className="tech-pill"><SiVite /> Vite</span>
                    <span className="tech-pill"><FaCss3Alt /> CSS</span>
                </div>
                <p>Mi portafolio personal, diseñado y desarrollado para mostrar mis habilidades y proyectos. Creado desde cero con un enfoque en un diseño limpio, moderno e interactivo.</p>
                <div className="buttons">
                    <a href="#" className="btn-primary"><IoMdGlobe /> Sitio Web</a>
                    <a 
                        href="https://github.com/SubDSR/ProyectoPortafolio.git" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="btn-secondary"
                    >
                        <FaGithub /> GitHub
                    </a>
                </div>
              </div>


              {/* NUEVO PROYECTO: EDUCAMOVIL */}
              <div className="project-card">
                <div className="project-category">Mobile</div>
                {/* AGREGAMOS LA CLASE img-top-focus AQUÍ */}
                <img 
                  src={educamovilImg} 
                  alt="EducaMovil" 
                  className="img-top-focus" 
                  onClick={() => openModal(educamovilImg)} 
                />
                <h3>EducaMovil</h3>
                <div className="project-tech">
                  <span className="tech-pill"><FaReact /> React Native</span>
                  <span className="tech-pill"><SiExpo /> Expo</span>
                </div>
                <p>Aplicación móvil educativa diseñada para mejorar el aprendizaje interactivo.</p>
                <div className="buttons">
                  {/* Se cambia el comportamiento para abrir el modal al hacer clic */}
                  <a 
                    href="#!" 
                    className="btn-primary" 
                    onClick={(e) => {
                      e.preventDefault(); // Evita que la página recargue o suba al inicio
                      setIsVideoOpen(true); // Cambia el estado para que el video aparezca
                    }}
                  >
                    <IoMdPlay /> Video Preliminar
                  </a>
                  <a href="https://github.com/SubDSR/EducaMovil" target="_blank" className="btn-secondary">
                    <FaGithub /> GitHub
                  </a>
                </div>
              </div>
              
              {/* --- NUEVO PROYECTO: LA PUNTITA --- */}
              <div className="project-card">
                <div className="project-category">Frontend</div>
                <img 
                  src={lapuntitaImg} // Recuerda importar la imagen arriba
                  alt="La Puntita" 
                  onClick={() => openModal(lapuntitaImg)}
                  style={{ cursor: 'pointer' }} 
                />
                <h3>La Puntita</h3>
                <div className="project-tech">
                  <span className="tech-pill"><FaReact /> React</span>
                  <span className="tech-pill"><FaCss3Alt /> CSS</span>
                </div>
                <p>Página web dedicada a la venta de comida, enfocada en una interfaz de usuario atractiva y funcional.</p>
                <div className="buttons">
                  <a 
                    href="#!" 
                    className="btn-primary" 
                    onClick={(e) => {
                      e.preventDefault();
                      setIsLaPuntitaVideoOpen(true);
                    }}
                  >
                    <IoMdPlay /> Video Preliminar
                  </a>
                  <a href="https://github.com/SubDSR" target="_blank" rel="noopener noreferrer" className="btn-secondary">
                    <FaGithub /> GitHub
                  </a>
                </div>
              </div>

              {/* --- PROYECTO 3: BIENES RAÍCES --- */}
              {/*}
              <div className="project-card">
                <div className="project-category">Fullstack</div>
                <img 
                  src={bienesRaicesImg} 
                  alt="Proyecto Bienes Raíces" 
                  onClick={() => openModal(bienesRaicesImg)}
                  style={{ cursor: 'pointer' }}
                />
                <h3>Bienes Raíces</h3>
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
              </div>*/}
            </div>
          </div>

          <button className="view-more-btn" onClick={toggleProjects}>
            {showAll ? "Ver menos" : "Ver más"}
          </button>
        </div>
      </section>

      <VideoModal 
        isOpen={isVideoOpen} 
        videoUrl="https://drive.google.com/file/d/1mNoM-mDNSaqoxgwZHod_F0MmrttUZspz/view?usp=sharing" 
        onClose={() => setIsVideoOpen(false)} 
      /> 
      <VideoModal 
        isOpen={isLaPuntitaVideoOpen} 
        videoUrl="https://drive.google.com/file/d/1kiKX-rTdQ6A9EWuQ5JFfWFJB5x2u1_8p/view?usp=sharing" 
        onClose={() => setIsLaPuntitaVideoOpen(false)} 
      />

      <ImageModal imageUrl={selectedImage} onClose={closeModal} />
    </>
  );
}

export default Projects;