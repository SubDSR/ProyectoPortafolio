import React, { useEffect } from 'react';
import { ThemeProvider } from './components/ThemeToggle';
import Navbar from './components/Navbar';
import Hero3D from './components/Hero3D';
import Projects from './components/Projects';
import About from './components/About';
import Certificates from './components/Certificates';
import Tecnologias from './components/Tecnologias';
import Contact from './components/Contact';
import ScrollToTop from './components/ScrollToTop';
import { FaEnvelope, FaGithub, FaLinkedinIn } from 'react-icons/fa';

function App() {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.documentElement.style.scrollBehavior = '';
  }, []);

  return (
    <ThemeProvider>
      <Navbar />
      <main>
        <Hero3D />
        <Projects />
        <About />
        <Certificates />
        <Tecnologias />
        <Contact />
      </main>
      <footer className="footer">
        <p>
          Diseñado y desarrollado por <span>David Sevan</span> ·{' '}
          {new Date().getFullYear()}
        </p>
        <div className="footer-links">
          <a
            href="https://github.com/SubDSR"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub de David Sevan"
          >
            <FaGithub />
          </a>
          <a
            href="https://www.linkedin.com/in/david-sevan/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn de David Sevan"
          >
            <FaLinkedinIn />
          </a>
          <a
            href="https://mail.google.com/mail/?view=cm&fs=1&to=davidsevanr%40gmail.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Enviar correo a David Sevan"
          >
            <FaEnvelope />
          </a>
        </div>
      </footer>
      <ScrollToTop />
    </ThemeProvider>
  );
}

export default App;
