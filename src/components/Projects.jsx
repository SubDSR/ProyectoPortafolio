import React, { useEffect, useState } from 'react';
import '../styles/Projects.css';
import ImageModal from './ImageModal';
import VideoModal from './VideoModal';
import useScrollReveal from '../hooks/useScrollReveal';

import systemvetImg from '../assets/sistema_veterinario.png';
import portfolioImg from '../assets/portafolio-personal.png';
import educamovilImg from '../assets/educamovil.png';
import lapuntitaImg from '../assets/lapuntita.png';

import { FaReact, FaGithub, FaCss3Alt, FaPython } from 'react-icons/fa';
import { SiVite, SiFastapi, SiMysql, SiExpo } from 'react-icons/si';
import { IoMdGlobe, IoMdPlay } from 'react-icons/io';

const FILTERS = ['Todos', 'Frontend', 'Backend', 'Mobile'];

const projects = [
  {
    id: 1,
    category: 'Backend',
    image: systemvetImg,
    title: 'Sistema de Gestión Clínica Veterinaria',
    techs: [
      { Icon: FaPython,  name: 'Python'  },
      { Icon: SiFastapi, name: 'FastAPI' },
      { Icon: SiMysql,   name: 'MySQL'   },
    ],
    description:
      'Proyecto enfocado en la gestión integral de una clínica veterinaria. Me concentré principalmente en el desarrollo del backend con Python y FastAPI, además del diseño y administración de la base de datos en MySQL.',
    links: {
      web:    'https://veterinariabd.vercel.app/',
      github: 'https://github.com/KevinBohorquez/VeterinariaClinica_Backend',
    },
  },
  {
    id: 2,
    category: 'Frontend',
    image: portfolioImg,
    title: 'Portafolio Personal',
    techs: [
      { Icon: FaReact,   name: 'React' },
      { Icon: SiVite,    name: 'Vite'  },
      { Icon: FaCss3Alt, name: 'CSS'   },
    ],
    description:
      'Mi portafolio personal, diseñado y desarrollado para mostrar mis habilidades y proyectos. Creado desde cero con un enfoque en un diseño limpio, moderno e interactivo.',
    links: {
      web:    '#',
      github: 'https://github.com/SubDSR/ProyectoPortafolio.git',
    },
  },
  {
    id: 3,
    category: 'Mobile',
    image: educamovilImg,
    imageClass: 'img-top-focus',
    title: 'EducaMovil',
    techs: [
      { Icon: FaReact, name: 'React Native' },
      { Icon: SiExpo,  name: 'Expo'         },
    ],
    description:
      'Aplicación móvil educativa diseñada para mejorar el aprendizaje interactivo.',
    links: {
      video:  'https://drive.google.com/file/d/1mNoM-mDNSaqoxgwZHod_F0MmrttUZspz/view?usp=sharing',
      github: 'https://github.com/SubDSR/EducaMovil',
    },
  },
  {
    id: 4,
    category: 'Frontend',
    image: lapuntitaImg,
    title: 'La Puntita',
    techs: [
      { Icon: FaReact,   name: 'React' },
      { Icon: FaCss3Alt, name: 'CSS'   },
    ],
    description:
      'Página web dedicada a la venta de comida, enfocada en una interfaz de usuario atractiva y funcional.',
    links: {
      video:  'https://drive.google.com/file/d/1kiKX-rTdQ6A9EWuQ5JFfWFJB5x2u1_8p/view?usp=sharing',
      github: 'https://github.com/AngelaEstrella/La-Puntita-Front.git',
    },
  },
];

function Projects() {
  const [activeFilter, setActiveFilter]   = useState('Todos');
  const [showAll, setShowAll] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [selectedImage, setSelectedImage] = useState(null);
  const [activeVideoUrl, setActiveVideoUrl] = useState(null);
  const [sectionRef, isVisible] = useScrollReveal();

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const filtered =
    activeFilter === 'Todos'
      ? projects
      : projects.filter((p) => p.category === activeFilter);

  const initialVisibleCount = isMobile ? 1 : 3;

  const visibleProjects =
    activeFilter === 'Todos' && !showAll
      ? filtered.slice(0, initialVisibleCount)
      : filtered;

  const shouldShowViewMore = activeFilter === 'Todos' && filtered.length > initialVisibleCount;

  const handleFilterChange = (filter) => {
    setActiveFilter(filter);
    setShowAll(false);
  };

  const toggleProjects = () => {
    if (showAll) {
      setShowAll(false);
      requestAnimationFrame(() => {
        sectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
      return;
    }

    setShowAll(true);
  };

  return (
    <>
      <section
        id="projects"
        className={`projects-section reveal${isVisible ? ' visible' : ''}`}
        ref={sectionRef}
      >
        <div className="container">
          <h2 className="section-title">Proyectos</h2>

          {/* ── Filtros ── */}
          <div className="projects-filters" role="group" aria-label="Filtrar proyectos por categoría">
            {FILTERS.map((f) => (
              <button
                key={f}
                className={`filter-btn${activeFilter === f ? ' active' : ''}`}
                onClick={() => handleFilterChange(f)}
                aria-pressed={activeFilter === f}
              >
                {f}
              </button>
            ))}
          </div>

          {/* ── Grid de tarjetas ── */}
          {visibleProjects.length > 0 ? (
            <div className="projects-grid">
              {visibleProjects.map((project) => (
                <div
                  className={`project-card${project.id === 1 ? ' featured' : ''}`}
                  key={project.id}
                >
                  <div className="project-category">{project.category}</div>

                  <img
                    src={project.image}
                    alt={`Proyecto ${project.title}`}
                    className={project.imageClass || ''}
                    onClick={() => setSelectedImage(project.image)}
                    style={{ cursor: 'pointer' }}
                  />

                  <h3>{project.title}</h3>

                  <div className="project-tech">
                    {project.techs.map(({ Icon, name }) => (
                      <span className="tech-pill" key={name}>
                        <Icon /> {name}
                      </span>
                    ))}
                  </div>

                  <p>{project.description}</p>

                  <div className="buttons">
                    {project.links.web && (
                      <a
                        href={project.links.web}
                        target={project.links.web !== '#' ? '_blank' : undefined}
                        rel="noopener noreferrer"
                        className="btn-primary"
                      >
                        <IoMdGlobe /> Sitio Web
                      </a>
                    )}
                    {project.links.video && (
                      <button
                        className="btn-primary"
                        onClick={() => setActiveVideoUrl(project.links.video)}
                      >
                        <IoMdPlay /> Video Preliminar
                      </button>
                    )}
                    <a
                      href={project.links.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-secondary"
                    >
                      <FaGithub /> GitHub
                    </a>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="projects-empty">No hay proyectos en esta categoría aún.</p>
          )}

          {shouldShowViewMore && (
            <button className="view-more-btn" onClick={toggleProjects} type="button">
              {showAll ? 'Ver menos' : 'Ver más'}
            </button>
          )}
        </div>
      </section>

      <VideoModal
        isOpen={!!activeVideoUrl}
        videoUrl={activeVideoUrl || ''}
        onClose={() => setActiveVideoUrl(null)}
      />
      <ImageModal imageUrl={selectedImage} onClose={() => setSelectedImage(null)} />
    </>
  );
}

export default Projects;
