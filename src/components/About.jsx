import React from 'react';
import { FaUser } from 'react-icons/fa';
import '../styles/About.css';
import useScrollReveal from '../hooks/useScrollReveal';

function About() {
  const [sectionRef, isVisible] = useScrollReveal();

  return (
    <section
      id="about"
      className={`about-section reveal${isVisible ? ' visible' : ''}`}
      ref={sectionRef}
    >
      <div className="container">
        <h2 className="section-title">¿Quién soy?</h2>

        <div className="about-inner">
          {/* ── COLUMNA IZQUIERDA: tarjeta de perfil inclinada ── */}
          <div className="about-card-visual">
            <div className="profile-card">
              {/* Decoraciones de fondo */}
              <div className="profile-glow" />
              <div className="profile-decor-circle" />

              {/* ============================================================
                  PLACEHOLDER: foto de perfil
                  Asset esperado: src/assets/avatar/avatar-professional.png
                  Reemplazar este bloque por:
                  <img src={avatarProfessional} alt="David Sevan" className="profile-avatar-img" />
                  ============================================================ */}
              <div className="profile-avatar-area">
                <div className="profile-avatar-placeholder" aria-hidden="true">
                  <FaUser />
                </div>
              </div>

              <div className="profile-card-info">
                <h3>David Sevan Reyes</h3>
                <p className="profile-role">Desarrollador Fullstack</p>
                <span className="profile-uni">UNMSM · Ing. de Software</span>
              </div>
            </div>
          </div>

          {/* ── COLUMNA DERECHA: contenido ── */}
          <div className="about-content">
            <div className="about-text">
              <p>
                Soy David Sevan Reyes, actualmente cursando el séptimo ciclo de
                Ingeniería de Software en la Universidad Nacional Mayor de San Marcos.
              </p>
              <p>
                Mi pasión por la tecnología, la programación y el diseño me impulsa
                cada día. Disfruto construir soluciones completas, desde el diseño
                de interfaces hasta la lógica del servidor, siempre con foco en
                calidad y mejora continua.
              </p>
            </div>

            <div className="about-stats-row">
              <div className="stat-block">
                <h4>+4</h4>
                <p>Proyectos</p>
              </div>
              <div className="stat-sep" />
              <div className="stat-block">
                <h4>+10</h4>
                <p>Tecnologías</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
