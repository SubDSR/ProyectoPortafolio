import React, { useState } from 'react';
import '../styles/Projects.css';
import ImageModal from './ImageModal';
import VideoModal from './VideoModal';
import useScrollReveal from '../hooks/useScrollReveal';
import useMediaQuery from '../hooks/useMediaQuery';
import { projects, FILTERS } from '../data/projects';
import { FaGithub } from 'react-icons/fa';
import { IoMdGlobe, IoMdPlay } from 'react-icons/io';

function Projects() {
  const [activeFilter, setActiveFilter]   = useState('Todos');
  const [showAll, setShowAll] = useState(false);
  const isMobile = useMediaQuery('(max-width: 767px)');
  const [selectedImage, setSelectedImage] = useState(null);
  const [activeVideoUrl, setActiveVideoUrl] = useState(null);
  const [sectionRef, isVisible] = useScrollReveal();

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
                    loading="lazy"
                    decoding="async"
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
