import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import '../styles/Certificates.css';
import { FaEye, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
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
  },
  {
    img: certCienDat,
    alt: 'Certificado de Ciencia de Datos',
    title: 'Ciencia de Datos',
    description: 'Programa de Iniciación Tecnológica — CTIC-UNI.',
    pdf: '/certificates/Certificado_CienciaDeDatos.pdf',
  },
  {
    img: certCloudCompt,
    alt: 'Certificado de Cloud Computing',
    title: 'Cloud Computing',
    description: 'Programa de Iniciación Tecnológica — CTIC-UNI.',
    pdf: '/certificates/Certificado_CloudComputing.pdf',
  },
  {
    img: certSQlBD,
    alt: 'Certificado de SQL Base de Datos',
    title: 'SQL — Base de Datos 1',
    description: 'Programa de Iniciación Tecnológica — CTIC-UNI.',
    pdf: '/certificates/Certificado_SQLBaseDeDatos.pdf',
  },
];

function Certificates() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [sectionRef, isVisible] = useScrollReveal();

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <section
      id="certificates"
      className={`certificates-section reveal${isVisible ? ' visible' : ''}`}
      ref={sectionRef}
    >
      <div className="container">
        <h2 className="section-title">Certificados</h2>

        <Swiper
          effect="coverflow"
          grabCursor
          centeredSlides
          loop={!isMobile}
          slidesPerView="auto"
          coverflowEffect={{ rotate: 0, stretch: 0, depth: 100, modifier: 1.5 }}
          pagination={{ el: '.swiper-pagination', clickable: true }}
          navigation={{
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
            clickable: true,
          }}
          modules={[EffectCoverflow, Pagination, Navigation]}
          className="swiper_container"
        >
          {certificates.map((cert) => (
            <SwiperSlide key={cert.title}>
              <div className="certificate-card">
                <img src={cert.img} alt={cert.alt} />
                <div className="card-overlay">
                  <h3>{cert.title}</h3>
                  <p>{cert.description}</p>
                  <a
                    href={cert.pdf}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="overlay-button"
                    aria-label={`Ver certificado de ${cert.title}`}
                  >
                    <FaEye /> Ver Certificado
                  </a>
                </div>
              </div>
            </SwiperSlide>
          ))}

          <div className="swiper-button-prev slider-arrow" aria-label="Anterior certificado">
            <FaChevronLeft className="swiper-arrow-icon" />
          </div>
          <div className="swiper-button-next slider-arrow" aria-label="Siguiente certificado">
            <FaChevronRight className="swiper-arrow-icon" />
          </div>

          <div className="slider-controler">
            <div className="swiper-pagination" />
          </div>
        </Swiper>
      </div>
    </section>
  );
}

export default Certificates;
