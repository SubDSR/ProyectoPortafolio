import React from 'react';
import '../styles/Tecnologias.css';
import useScrollReveal from '../hooks/useScrollReveal';

import {
  FaHtml5,
  FaCss3Alt,
  FaJs,
  FaReact,
  FaGitAlt,
  FaGithub,
  FaCode,
} from 'react-icons/fa';
import { SiFastapi, SiFigma, SiMysql, SiVite } from 'react-icons/si';

import sqlserverLogo from '../assets/sqlserver-icon.png';
import pythonLogo from '../assets/python-icon.png';

/* ── Fila superior: Frontend + Backend + DB ── */
const row1 = [
  { name: 'HTML',       iconEl: <FaHtml5 /> },
  { name: 'CSS',        iconEl: <FaCss3Alt /> },
  { name: 'JavaScript', iconEl: <FaJs /> },
  { name: 'React',      iconEl: <FaReact /> },
  { name: 'Python',     iconEl: <img src={pythonLogo} alt="" className="mq-img" /> },
  { name: 'FastAPI',    iconEl: <SiFastapi /> },
  { name: 'MySQL',      iconEl: <SiMysql /> },
];

/* ── Fila inferior: Tools ── */
const row2 = [
  { name: 'SQL Server', iconEl: <img src={sqlserverLogo} alt="" className="mq-img" /> },
  { name: 'Git',        iconEl: <FaGitAlt /> },
  { name: 'GitHub',     iconEl: <FaGithub /> },
  { name: 'Vite',       iconEl: <SiVite /> },
  { name: 'Figma',      iconEl: <SiFigma /> },
  { name: 'VS Code',    iconEl: <FaCode /> },
];

function MarqueePill({ tech }) {
  return (
    <div className="mq-pill">
      <span className="mq-icon">{tech.iconEl}</span>
      <span className="mq-name">{tech.name}</span>
    </div>
  );
}

function MarqueeRow({ items, reverse }) {
  const doubled = [...items, ...items];
  return (
    <div className="mq-wrapper">
      <div className={`mq-track${reverse ? ' mq-track--reverse' : ''}`}>
        {doubled.map((tech, i) => (
          <MarqueePill key={`${tech.name}-${i}`} tech={tech} />
        ))}
      </div>
    </div>
  );
}

function Tecnologias() {
  const [sectionRef, isVisible] = useScrollReveal();

  return (
    <section
      id="technologies"
      className={`technologies-section reveal${isVisible ? ' visible' : ''}`}
      ref={sectionRef}
    >
      <div className="container">
        <h2 className="section-title">Tecnologías</h2>
        <p className="tech-subtitle">Herramientas que uso en mis proyectos</p>
      </div>

      <div className="mq-rows">
        <MarqueeRow items={row1} reverse={false} />
        <MarqueeRow items={row2} reverse={true} />
      </div>
    </section>
  );
}

export default Tecnologias;
