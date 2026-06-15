import React, { useState } from 'react';
import { FaCopy, FaCheck, FaPaperPlane } from 'react-icons/fa';
import { SiGmail } from 'react-icons/si';
import '../styles/Contact.css';
import useScrollReveal from '../hooks/useScrollReveal';
import useMediaQuery from '../hooks/useMediaQuery';

const email = 'davidsevanr@gmail.com';
const subject = 'Propuesta de colaboración — [Tu nombre]';
const body = 'Hola David,\n\nVi tu portafolio y me gustaría contactarte.\n\nNombre: \nEmpresa / organización: \nTipo de proyecto: \nDisponibilidad estimada: \n\nCuéntame más sobre lo que tienes en mente.';
const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(email)}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
const mailtoUrl = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

function Contact() {
  const [sectionRef, isVisible] = useScrollReveal();
  const [copied, setCopied] = useState(false);
  const isMobile = useMediaQuery('(max-width: 767px)');

  const emailHref = isMobile ? mailtoUrl : gmailUrl;

  function handleCopy() {
    navigator.clipboard.writeText(email).then(() => {
      if (!isMobile) {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    });
  }

  return (
    <section
      id="contact"
      className={`contact-section reveal${isVisible ? ' visible' : ''}`}
      ref={sectionRef}
    >
      <div className={`copy-toast${copied ? ' copy-toast-visible' : ''}`}>
        <FaCheck /> Copiado en el portapapeles
      </div>
      <div className="container">
        <div className="contact-shell">
          <div className="contact-copy">
            <span className="contact-kicker">Disponible<span className="kicker-extra"> para colaborar</span></span>
            <h2 className="section-title">Contacto</h2>
            <p>
              Si tienes una propuesta, proyecto o idea en mente, escríbeme y conversemos.
              Respondo consultas sobre desarrollo frontend, fullstack y soluciones web.
            </p>

            <div className="contact-actions">
              <a
                href={emailHref}
                target="_blank"
                rel="noopener noreferrer"
                className="contact-btn contact-btn-primary"
              >
                <SiGmail /> {isMobile ? 'Enviar correo' : 'Abrir Gmail'}
              </a>
              <button
                type="button"
                onClick={handleCopy}
                className="contact-btn contact-btn-secondary"
              >
                {copied ? <FaCheck /> : <FaCopy />} {email}
              </button>
            </div>
          </div>

          <div className="gmail-panel" aria-label="Vista previa de correo de contacto">
            <div className="gmail-panel-topbar">
              <span className="gmail-dot gmail-dot-red" />
              <span className="gmail-dot gmail-dot-yellow" />
              <span className="gmail-dot gmail-dot-green" />
              <span className="gmail-panel-title">Nuevo mensaje</span>
            </div>

            <div className="gmail-panel-body">
              <div className="gmail-field">
                <span>Para</span>
                <strong>{email}</strong>
              </div>
              <div className="gmail-field">
                <span>Asunto</span>
                <strong>Propuesta de colaboración — [Tu nombre]</strong>
              </div>
              <div className="gmail-message">
                <p className="gmail-greeting">Hola David,</p>
                <p className="gmail-intro">Vi tu portafolio y me gustaría contactarte.</p>
                <div className="gmail-template-fields">
                  <div className="gmail-template-row">
                    <span className="gmail-template-label">Nombre</span>
                    <span className="gmail-template-line" />
                  </div>
                  <div className="gmail-template-row">
                    <span className="gmail-template-label">Empresa</span>
                    <span className="gmail-template-line" />
                  </div>
                  <div className="gmail-template-row">
                    <span className="gmail-template-label">Tipo de proyecto</span>
                    <span className="gmail-template-line" />
                  </div>
                  <div className="gmail-template-row">
                    <span className="gmail-template-label">Disponibilidad</span>
                    <span className="gmail-template-line" />
                  </div>
                </div>
              </div>
            </div>

            <div className="gmail-panel-footer">
              <a href={emailHref} target="_blank" rel="noopener noreferrer" className="gmail-send-btn">
                <FaPaperPlane /> Redactar correo
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Contact;
