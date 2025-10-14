import React from 'react';
import '../styles/Tecnologias.css'; // Asegúrate de que el nombre del archivo CSS sea correcto

// Importa los iconos de las tecnologías que vamos a usar
import { FaHtml5, FaCss3Alt, FaJs, FaReact, FaPython } from 'react-icons/fa';
import { SiMysql, SiFastapi } from 'react-icons/si';

// Reutilizamos la solución del icono SVG para SQL Server para evitar errores
import sqlserverLogo from '../assets/sqlserver-icon.png';
import pythonLogo from '../assets/python-icon.png'; // o .png si prefieres

function Technologies() {
  return (
    <section id="technologies" className="technologies-section">
      <div className="container">
        <h2 className="section-title">Tecnologías</h2>
        <div className="tech-cards-container">

          {/* --- Tarjeta de Frontend --- */}
          <div className="tech-card">
            <h3>FRONTEND</h3>
            <div className="tech-list">
              <div className="tech-item"><FaHtml5 className="tech-icon html" /><span>HTML</span></div>
              <div className="tech-item"><FaCss3Alt className="tech-icon css" /><span>CSS</span></div>
              <div className="tech-item"><FaJs className="tech-icon js" /><span>JavaScript</span></div>
              <div className="tech-item"><FaReact className="tech-icon react" /><span>React/JSX</span></div>
            </div>
          </div>

          {/* --- Tarjeta de Backend --- */}
          <div className="tech-card">
            <h3>BACKEND</h3>
            <div className="tech-list">
              <div className="tech-item">
                <img src={pythonLogo} alt="Python" className="tech-icon python-img" />
                <span>Python</span>
              </div>
              <div className="tech-item"><SiFastapi className="tech-icon fastapi" /><span>FastAPI</span></div>
            </div>
          </div>

          {/* --- Tarjeta de Base de Datos --- */}
          <div className="tech-card">
            <h3>BASE DE DATOS</h3>
            <div className="tech-list">
              <div className="tech-item"><SiMysql className="tech-icon mysql" /><span>MySQL</span></div>
              <div className="tech-item">
                <img src={sqlserverLogo} alt="SQL Server" className="tech-icon sqlserver-img" />
                <span>SQL Server</span>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

export default Technologies;