import { useEffect, useState } from 'react';
import Lenis from 'lenis';
import Nav from './components/Nav.jsx';
import Hero from './components/Hero.jsx';
import Portfolio from './components/Portfolio.jsx';
import About from './screens/About.jsx';
import Footer from './components/Footer.jsx';
import CursorSparkle from './components/CursorSparkle.jsx';
import RippleCanvas from './components/RippleCanvas.jsx';

function useLinkTransition(setPath) {
  useEffect(() => {
    const onClick = (e) => {
      const a = e.target.closest('a[href]');
      if (!a) return;

      const href = a.getAttribute('href');
      const isExternal =
        !href ||
        href.startsWith('http') ||
        href.startsWith('mailto') ||
        href.startsWith('tel') ||
        href.startsWith('#') ||
        a.getAttribute('target') === '_blank';

      if (isExternal) return;

      e.preventDefault();

      document.body.style.transition = 'opacity 0.45s ease';
      document.body.style.opacity = '0';
      setTimeout(() => {
        window.history.pushState(null, '', href);
        setPath(href);
        window.scrollTo(0, 0);
        document.body.style.opacity = '1';
      }, 460);
    };

    window.addEventListener('click', onClick);
    return () => window.removeEventListener('click', onClick);
  }, [setPath]);
}

function useLenis() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => lenis.destroy();
  }, []);
}

export default function App() {
  const [path, setPath] = useState(window.location.pathname);

  useLenis();
  useLinkTransition(setPath);

  // Handle browser back/forward
  useEffect(() => {
    const onPop = () => setPath(window.location.pathname);
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, []);

  const isAbout = path === '/about';

  return (
    <>
      <CursorSparkle />
      <RippleCanvas />
      <Nav path={path} />
      <main>
        {isAbout ? (
          <About />
        ) : (
          <>
            <Hero />
            <Portfolio />
          </>
        )}
      </main>
      <Footer />
    </>
  );
}
