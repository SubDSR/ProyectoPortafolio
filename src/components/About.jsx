import React from 'react';
import '../styles/About.css';
import aboutImage from '../assets/robot_meme.png'; // Reutilizamos la imagen del robot

function About() {
  return (
    <section id="about" className="about-section">
      <div className="container">
        <h2 className="section-title">Sobre Mí</h2>
        <div className="about-content">
          <div className="about-image-container">
            <img src={aboutImage} alt="Sobre Mí" className="about-image" />
          </div>
          <div className="about-text-container">
            {/* La línea del h3 ha sido eliminada */}
            <p>
              Soy David Sevan Reyes y actualmente me encuentro en el sexto ciclo de la carrera de Ingeniería de Software en la prestigiosa Universidad Nacional Mayor de San Marcos. 
              <br/><br/>
              Mi pasión por la tecnología, la programación y el diseño me impulsa cada día. Como desarrollador Fullstack, disfruto desafiando los límites y explorando nuevas tecnologías para ofrecer soluciones creativas, efectivas y completas, desde el backend hasta el frontend.
            </p>
            
            <div className="about-footer">
              <div className="about-stats">
                <div className="stat-item">
                  <h4>+5</h4>
                  <p>Proyectos Completados</p>
                </div>
                <div className="stat-item">
                  <h4>+10</h4>
                  <p>Tecnologías Manejadas</p>
                </div>
              </div>

              <div className="availability-indicator">
                Disponible para trabajar
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}

export default About;