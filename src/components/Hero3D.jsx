import React, { Suspense, lazy, useRef, useEffect } from 'react';
import {
  FaUser,
  FaDownload,
  FaGamepad,
  FaPalette,
} from 'react-icons/fa';
import '../styles/Hero3D.css';
import { heroSocials } from '../data/socialLinks';

const MinecraftAvatar = lazy(() => import('./MinecraftAvatar'));

function Hero3D() {
  const heroRef = useRef(null);
  const layer1Ref = useRef(null); // avatar — movimiento pronunciado
  const layer2Ref = useRef(null); // doodles — movimiento moderado
  const layer3Ref = useRef(null); // texto — movimiento sutil

  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;

    let rafId;
    let scrollTimer;
    const layers = [layer1Ref, layer2Ref, layer3Ref];

    const disableTransitions = () =>
      layers.forEach((ref) => { if (ref.current) ref.current.style.transition = 'none'; });

    const restoreTransitions = () =>
      layers.forEach((ref) => { if (ref.current) ref.current.style.transition = ''; });

    // Durante scroll solo desactivamos la transición; el transform queda donde estaba
    const handleScroll = () => {
      disableTransitions();
      clearTimeout(scrollTimer);
      scrollTimer = setTimeout(restoreTransitions, 150);
    };

    const handleMouseMove = (e) => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
      if (window.innerWidth < 900) return;

      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        const { clientX, clientY } = e;
        const x = (clientX / window.innerWidth - 0.5) * 2;
        const y = (clientY / window.innerHeight - 0.5) * 2;

        if (layer1Ref.current) {
          layer1Ref.current.style.transform = `translate3d(${x * 14}px, ${y * 10}px, 0)`;
        }
        if (layer2Ref.current) {
          layer2Ref.current.style.transform = `translate3d(${x * 7}px, ${y * 5}px, 0)`;
        }
        if (layer3Ref.current) {
          layer3Ref.current.style.transform = `translate3d(${x * 3}px, ${y * 2}px, 0)`;
        }
      });
    };

    const handleMouseLeave = () => {
      cancelAnimationFrame(rafId);
      // Reset instantáneo (sin transición) para evitar el efecto deslizamiento
      disableTransitions();
      layers.forEach((ref) => {
        if (ref.current) ref.current.style.transform = 'translate3d(0,0,0)';
      });
      // Dos frames de margen para que el reset se pinte antes de restaurar la transición
      requestAnimationFrame(() => requestAnimationFrame(restoreTransitions));
    };

    hero.addEventListener('mousemove', handleMouseMove);
    hero.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      hero.removeEventListener('mousemove', handleMouseMove);
      hero.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(rafId);
      clearTimeout(scrollTimer);
    };
  }, []);

  return (
    <section id="hero" className="hero3d" ref={heroRef}>
      {/* Orbes de fondo */}
      <div className="hero-orb hero-orb-1" aria-hidden="true" />
      <div className="hero-orb hero-orb-2" aria-hidden="true" />

      {/* Capa de doodles decorativos — parallax moderado */}
      <div className="hero-doodles" ref={layer2Ref} aria-hidden="true">
        <svg className="doodle doodle-arrow-1" viewBox="0 0 80 60" fill="none">
          <path
            d="M5 50 C 20 20, 50 10, 70 15"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M62 8 L70 15 L60 20"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>

        <svg className="doodle doodle-circle-1" viewBox="0 0 60 60" fill="none">
          <circle cx="30" cy="30" r="25" stroke="currentColor" strokeWidth="2" strokeDasharray="6 4" />
        </svg>

        <svg className="doodle doodle-wave-1" viewBox="0 0 100 30" fill="none">
          <path
            d="M0 15 C 15 5, 30 25, 45 15 S 75 5, 100 15"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>

        <svg className="doodle doodle-arrow-2" viewBox="0 0 60 80" fill="none">
          <path
            d="M30 5 C 10 30, 50 50, 30 75"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M22 68 L30 75 L38 68"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>

        <div className="sketch-note note-1">audífonos siempre 🎧</div>
        <div className="sketch-note note-4">
          pensar primero,<br />codear después
        </div>
      </div>

      <div className="container">
        <div className="hero3d-inner">
          {/* ── TEXTO SUPERIOR: tag + título ── */}
          <div className="hero3d-text-top">
            <div className="hero-tag">
              <span className="hero-tag-dot" />
              Estudiante de Ingeniería de Software
            </div>

            <h1 className="hero3d-title">
              Hola, soy
              <span className="hero-name">David Sevan</span>
            </h1>
          </div>

          {/* ── LADO VISUAL ── */}
          <div className="hero3d-visual">
            <div className="hero-avatar-area" ref={layer1Ref}>
              {/* Cards flotantes */}
              <div className="hero-avatar-card card-top-left" aria-hidden="true">
                {/* PLACEHOLDER OPENAI: avatar-chibi.png */}
                <FaUser className="avatar-card-icon" />
                <span>Modo chibi</span>
              </div>

              <div className="hero-avatar-card card-top-right" aria-hidden="true">
                {/* PLACEHOLDER OPENAI: avatar-gamer-dev.png */}
                <FaGamepad className="avatar-card-icon" />
                <span>Dev gamer</span>
              </div>

              <div className="hero-avatar-container">
                <div className="hero-avatar-placeholder">
                  <Suspense fallback={null}>
                    <MinecraftAvatar />
                  </Suspense>
                </div>
              </div>

              <div className="hero-avatar-card card-bottom-left" aria-hidden="true">
                {/* PLACEHOLDER OPENAI: avatar-voxel.png */}
                <span className="avatar-card-emoji">🎮</span>
                <span>Voxel</span>
              </div>

              <div className="hero-avatar-card card-bottom-right" aria-hidden="true">
                {/* PLACEHOLDER OPENAI: avatar-lowpoly.png */}
                <FaPalette className="avatar-card-icon" />
                <span>Low poly</span>
              </div>
            </div>
          </div>

          {/* ── TEXTO INFERIOR: subtítulo + descripción + acciones ── */}
          <div className="hero3d-text-bottom" ref={layer3Ref}>
            <h2 className="hero3d-subtitle">Desarrollador Fullstack en formación</h2>

            <p className="hero3d-description">
              Construyo interfaces, sistemas y experiencias digitales
              con enfoque técnico, creatividad y mejora continua.
            </p>

            <div className="hero3d-actions">
              <a
                href="/CV_David_Sevan.pdf"
                download="CV_David_Sevan.pdf"
                className="hero-btn hero-btn-primary"
                aria-label="Descargar CV de David Sevan"
              >
                <FaDownload /> Descargar CV
              </a>

              <div className="hero3d-socials" aria-label="Redes sociales de David Sevan">
                {heroSocials.map(({ href, label, Icon }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                  >
                    <Icon />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero3D;
