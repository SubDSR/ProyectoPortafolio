import React from 'react';
import { ThemeProvider } from './components/ThemeToggle';
import Navbar from './components/Navbar';
import Hero3D from './components/Hero3D';
import Projects from './components/Projects';
import About from './components/About';
import Certificates from './components/Certificates';
import Tecnologias from './components/Tecnologias';
import Contact from './components/Contact';
import ScrollToTop from './components/ScrollToTop';
import { FaGithub, FaLinkedinIn } from 'react-icons/fa';

function App() {
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
        </div>
      </footer>
      <ScrollToTop />
    </ThemeProvider>
  );
}

export default App;
