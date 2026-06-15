import React from 'react';
import '../styles/Tecnologias.css';
import useScrollReveal from '../hooks/useScrollReveal';
import { row1, row2 } from '../data/technologies';

function MarqueePill({ tech }) {
  return (
    <div className="mq-pill">
      <span className="mq-icon">
        {tech.Icon
          ? <tech.Icon />
          : <img src={tech.iconSrc} alt="" className="mq-img" />
        }
      </span>
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
