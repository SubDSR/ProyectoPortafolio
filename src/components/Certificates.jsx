import React from 'react';

// 1. Importa los componentes de Swiper y los módulos necesarios
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Pagination, Navigation } from 'swiper/modules';

// 2. Importa los estilos de Swiper
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// 3. Importa tus estilos y los íconos/imágenes
import '../styles/Certificates.css';
import { FaEye, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

// 4. Importa tus imágenes de vista previa
import certDiseGra from '../assets/Certificado_DiseñoGrafico.jpg';
import certCienDat from '../assets/Certificado_CienciaDeDatos.jpg';
import certCloudCompt from '../assets/Certificado_CloudComputing.jpg';
import certSQlBD from '../assets/Certificado_SQLBaseDeDatos.jpg';

function Certificates() {
  return (
    <section id="certificates" className="certificates-section">
      <div className="container">
        <h2 className="section-title">Certificados</h2>
        
        <Swiper
          effect={'coverflow'}
          grabCursor={true}
          centeredSlides={true}
          loop={true}
          slidesPerView={'auto'}
          coverflowEffect={{
            rotate: 0,
            stretch: 0,
            depth: 100,
            modifier: 1.5,
          }}
          pagination={{ el: '.swiper-pagination', clickable: true }}
          navigation={{
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
            clickable: true,
          }}
          modules={[EffectCoverflow, Pagination, Navigation]}
          className="swiper_container"
        >
          {/* --- SLIDE 1: CERTIFICADO DE DISEÑO GRÁFICO --- */}
          <SwiperSlide>
            <div className="certificate-card">
              <img src={certDiseGra} alt="Certificado de Diseño Gráfico" />
              <div className="card-overlay">
                <h3>Diseño Gráfico con IA</h3>
                <p>Certificado del Programa de Iniciación Tecnológica de la CTIC-UNI.</p>
                {/* 👇 ENLACE CORREGIDO 👇 */}
                <a href="/certificates/Certificado_DiseñoGrafico.pdf" target="_blank" rel="noopener noreferrer" className="overlay-button"><FaEye /> Ver Certificado</a>
              </div>
            </div>
          </SwiperSlide>

          {/* --- SLIDE 2: CERTIFICADO DE CIENCIA DE DATOS --- */}
          <SwiperSlide>
            <div className="certificate-card">
              <img src={certCienDat} alt="Certificado de Ciencia de Datos" />
              <div className="card-overlay">
                <h3>Ciencia de Datos</h3>
                <p>Certificado del Programa de Iniciación Tecnológica de la CTIC-UNI.</p>
                {/* 👇 ENLACE CORREGIDO 👇 */}
                <a href="/certificates/Certificado_CienciaDeDatos.pdf" target="_blank" rel="noopener noreferrer" className="overlay-button"><FaEye /> Ver Certificado</a>
              </div>
            </div>
          </SwiperSlide>
          
          {/* --- SLIDE 3: CLOUD COMPUTING --- */}
          <SwiperSlide>
            <div className="certificate-card">
              <img src={certCloudCompt} alt="Certificado de Cloud Computing" />
              <div className="card-overlay">
                <h3>Cloud Computing</h3>
                <p>Certificado del Programa de Iniciación Tecnológica de la CTIC-UNI.</p>
                {/* 👇 ENLACE CORREGIDO 👇 */}
                <a href="/certificates/Certificado_CloudComputing.pdf" target="_blank" rel="noopener noreferrer" className="overlay-button"><FaEye /> Ver Certificado</a>
              </div>
            </div>
          </SwiperSlide>

          {/* --- SLIDE 4: SQL BASE DE DATOS --- */}
          <SwiperSlide>
            <div className="certificate-card">
              <img src={certSQlBD} alt="Certificado de SQL Base de Datos" />
              <div className="card-overlay">
                <h3>SQL - Base de Datos 1</h3>
                <p>Certificado del Programa de Iniciación Tecnológica de la CTIC-UNI.</p>
                {/* 👇 ENLACE CORREGIDO 👇 */}
                <a href="/certificates/Certificado_SQLBaseDeDatos.pdf" target="_blank" rel="noopener noreferrer" className="overlay-button"><FaEye /> Ver Certificado</a>
              </div>
            </div>
          </SwiperSlide>

          {/* --- CONTROLES PERSONALIZADOS --- */}
          <div className="swiper-button-prev slider-arrow">
            <FaChevronLeft color="#00ffaa" size={20} />
          </div>
          <div className="swiper-button-next slider-arrow">
            <FaChevronRight color="#00ffaa" size={20} />
          </div>

          {/* --- PAGINACIÓN --- */}
          <div className="slider-controler">
            <div className="swiper-pagination"></div>
          </div>
        </Swiper>
      </div>
    </section>
  );
}

export default Certificates;