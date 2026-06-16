import React, { useState, useRef } from 'react';
import '../styles/Certificates.css';
import { FaEye, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import useScrollReveal from '../hooks/useScrollReveal';
import useMediaQuery from '../hooks/useMediaQuery';
import { certificates } from '../data/certificates';

function Certificates() {
  const isMobile = useMediaQuery('(max-width: 767px)');
  const [activeIndex, setActiveIndex] = useState(0);
  const certificateButtonRefs = useRef([]);
  const [sectionRef, isVisible] = useScrollReveal();
  const activeCertificate = certificates[activeIndex];
  const ActiveCertificateIcon = activeCertificate.Icon;

  const scrollButtonIntoView = (index) => {
    if (!isMobile) return;
    certificateButtonRefs.current[index]?.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
      inline: 'center',
    });
  };

  const goToPreviousCertificate = () => {
    const next = activeIndex === 0 ? certificates.length - 1 : activeIndex - 1;
    setActiveIndex(next);
    scrollButtonIntoView(next);
  };

  const goToNextCertificate = () => {
    const next = activeIndex === certificates.length - 1 ? 0 : activeIndex + 1;
    setActiveIndex(next);
    scrollButtonIntoView(next);
  };

  const handleSelect = (index) => {
    setActiveIndex(index);
    scrollButtonIntoView(index);
  };

  return (
    <section
      id="certificates"
      className={`certificates-section reveal${isVisible ? ' visible' : ''}`}
      ref={sectionRef}
    >
      <div className="container">
        <div className="certificates-heading reveal-child">
          <h2 className="section-title">Certificados</h2>
        </div>

        <div className="certificates-console" data-mobile={isMobile}>
          <div
            className="terminal-panel reveal-child reveal-child-left"
            aria-label="Lista de certificados disponibles"
            style={{ '--reveal-delay': '90ms' }}
          >
            <div className="terminal-topbar">
              <span className="terminal-dot terminal-dot-red" />
              <span className="terminal-dot terminal-dot-yellow" />
              <span className="terminal-dot terminal-dot-green" />
              <span className="terminal-path">~/portfolio/certs</span>
            </div>

            <div className="terminal-body">
              <p className="terminal-line terminal-muted">
                <span className="prompt-arrow">➜</span>
                ls ./credentials --executables
              </p>

              <div className="terminal-list">
                {certificates.map((cert, index) => (
                  <button
                    type="button"
                    key={cert.title}
                    ref={(element) => {
                      certificateButtonRefs.current[index] = element;
                    }}
                    className={`terminal-command${index === activeIndex ? ' active' : ''}`}
                    onClick={() => handleSelect(index)}
                    aria-pressed={index === activeIndex}
                  >
                    <span className="command-prompt">›</span>
                    <span className="command-index">{String(index + 1).padStart(2, '0')}</span>
                    <span className="command-text">{isMobile ? cert.title : `./${cert.command}`}</span>
                    {index === activeIndex && <span className="command-status">RUN</span>}
                  </button>
                ))}
              </div>

              <p className="terminal-line terminal-current">
                <span className="prompt-arrow">➜</span>
                ./view_{activeCertificate.command}
                <span className="terminal-cursor" />
              </p>
            </div>
          </div>

          <div className="certificate-showcase reveal-child reveal-child-right" style={{ '--reveal-delay': '170ms' }}>
            <article className="certificate-card" key={activeCertificate.title}>
              <div className="certificate-media">
                <img
                  src={activeCertificate.img}
                  alt={activeCertificate.alt}
                  loading="lazy"
                  decoding="async"
                />
                <span className="tech-badge">{activeCertificate.tag}</span>
                <span className="certificate-orb" aria-hidden="true">
                  <ActiveCertificateIcon />
                </span>
              </div>

              <div className="certificate-content">
                <div className="certificate-meta">
                  <span>N°: {activeCertificate.id || '__________'}</span>
                  <span>{activeCertificate.year}</span>
                </div>

                <h3>{activeCertificate.title}</h3>
                <span className="certificate-issuer">CTIC-UNI</span>
                <p>{activeCertificate.description}</p>

                <a
                  href={activeCertificate.pdf}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="overlay-button"
                  aria-label={`Ver certificado de ${activeCertificate.title}`}
                >
                  Ver Certificado <FaEye />
                </a>
              </div>
            </article>

            <div className="certificate-navigation" aria-label="Navegación de certificados">
              <button type="button" onClick={goToPreviousCertificate} aria-label="Certificado anterior">
                <FaChevronLeft />
              </button>
              <span>{String(activeIndex + 1).padStart(2, '0')} / {String(certificates.length).padStart(2, '0')}</span>
              <button type="button" onClick={goToNextCertificate} aria-label="Siguiente certificado">
                <FaChevronRight />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Certificates;
