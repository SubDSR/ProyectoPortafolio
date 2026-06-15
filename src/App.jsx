import React, { lazy, Suspense, useEffect } from 'react';
import { ThemeProvider } from './components/ThemeToggle';
import Navbar from './components/Navbar';
import Hero3D from './components/Hero3D';
import ScrollToTop from './components/ScrollToTop';
import { footerSocials } from './data/socialLinks';

const Projects     = lazy(() => import('./components/Projects'));
const About        = lazy(() => import('./components/About'));
const Certificates = lazy(() => import('./components/Certificates'));
const Tecnologias  = lazy(() => import('./components/Tecnologias'));
const Contact      = lazy(() => import('./components/Contact'));

function App() {
  useEffect(() => {
    document.documentElement.style.scrollBehavior = '';
  }, []);

  return (
    <ThemeProvider>
      <Navbar />
      <main>
        <Hero3D />
        <Suspense fallback={null}><Projects /></Suspense>
        <Suspense fallback={null}><About /></Suspense>
        <Suspense fallback={null}><Certificates /></Suspense>
        <Suspense fallback={null}><Tecnologias /></Suspense>
        <Suspense fallback={null}><Contact /></Suspense>
      </main>
      <footer className="footer">
        <p>
          Diseñado y desarrollado por <span>David Sevan</span> ·{' '}
          {new Date().getFullYear()}
        </p>
        <div className="footer-links">
          {footerSocials.map(({ href, label, Icon }) => (
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
      </footer>
      <ScrollToTop />
    </ThemeProvider>
  );
}

export default App;
