import React, { useState, useEffect, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import '../styles/Certificates.css';
import { FaEye, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { FaBrain, FaChartLine, FaCloud, FaDatabase } from 'react-icons/fa6';
import useScrollReveal from '../hooks/useScrollReveal';

import certDiseGra from '../assets/Certificado_DiseñoGrafico.jpg';
import certCienDat from '../assets/Certificado_CienciaDeDatos.jpg';
import certCloudCompt from '../assets/Certificado_CloudComputing.jpg';
import certSQlBD from '../assets/Certificado_SQLBaseDeDatos.jpg';

const certificates = [
  {
    img: certDiseGra,
    alt: 'Certificado de Diseño Gráfico',
    title: 'Diseño Gráfico con IA',
    description: 'Programa de Iniciación Tecnológica — CTIC-UNI.',
    pdf: '/certificates/Certificado_DiseñoGrafico.pdf',
    tag: 'Diseño & IA',
    id: '017 - 0075683',
    year: '2025',
    command: 'run_diseno_grafico_ia.sh',
    Icon: FaBrain,
  },
  {
    img: certCienDat,
    alt: 'Certificado de Ciencia de Datos',
    title: 'Ciencia de Datos',
    description: 'Programa de Iniciación Tecnológica — CTIC-UNI.',
    pdf: '/certificates/Certificado_CienciaDeDatos.pdf',
    tag: 'Data',
    id: '017 - 0068761',
    year: '2025',
    command: 'run_ciencia_de_datos.sh',
    Icon: FaChartLine,
  },
  {
    img: certCloudCompt,
    alt: 'Certificado de Cloud Computing',
    title: 'Cloud Computing',
    description: 'Programa de Iniciación Tecnológica — CTIC-UNI.',
    pdf: '/certificates/Certificado_CloudComputing.pdf',
    tag: 'Cloud',
    id: '017 - 0078792',
    year: '2025',
    command: 'run_cloud_computing.sh',
    Icon: FaCloud,
  },
  {
    img: certSQlBD,
    alt: 'Certificado de SQL Base de Datos',
    title: 'SQL — Base de Datos 1',
    description: 'Programa de Iniciación Tecnológica — CTIC-UNI.',
    pdf: '/certificates/Certificado_SQLBaseDeDatos.pdf',
    tag: 'Backend',
    id: '017 - 0080527',
    year: '2025',
    command: 'run_sql_base_de_datos.sh',
    Icon: FaDatabase,
  },
];

function Certificates() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [activeIndex, setActiveIndex] = useState(0);
  const certificateButtonRefs = useRef([]);
  const [sectionRef, isVisible] = useScrollReveal();
  const activeCertificate = certificates[activeIndex];
  const ActiveCertificateIcon = activeCertificate.Icon;

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (!isMobile) return;

    certificateButtonRefs.current[activeIndex]?.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
      inline: 'center',
    });
  }, [activeIndex, isMobile]);

  const goToPreviousCertificate = () => {
    setActiveIndex((currentIndex) => (
      currentIndex === 0 ? certificates.length - 1 : currentIndex - 1
    ));
  };

  const goToNextCertificate = () => {
    setActiveIndex((currentIndex) => (
      currentIndex === certificates.length - 1 ? 0 : currentIndex + 1
    ));
  };

  return (
    <section
      id="certificates"
      className={`certificates-section reveal${isVisible ? ' visible' : ''}`}
      ref={sectionRef}
    >
      <div className="container">
        <div className="certificates-heading">
          <h2 className="section-title">Certificados</h2>
        </div>

        <div className="certificates-console" data-mobile={isMobile}>
          <div className="terminal-panel" aria-label="Lista de certificados disponibles">
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
                    onClick={() => setActiveIndex(index)}
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

          <div className="certificate-showcase">
            <article className="certificate-card" key={activeCertificate.title}>
              <div className="certificate-media">
                <img src={activeCertificate.img} alt={activeCertificate.alt} />
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
