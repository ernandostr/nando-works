import { useEffect, useState } from 'react';
import Lenis from 'lenis';
import Nav from './components/Nav.jsx';
import Hero from './components/Hero.jsx';
import LogoMarquee from './components/LogoMarquee.jsx';
import Portfolio from './components/Portfolio.jsx';
import About from './screens/About.jsx';
import KahfDecode from './screens/KahfDecode.jsx';
import MitraBukalapak from './screens/MitraBukalapak.jsx';
import Footer from './components/Footer.jsx';
import CursorSparkle from './components/CursorSparkle.jsx';
import RippleCanvas from './components/RippleCanvas.jsx';
import RulerLine from './components/RulerLine.jsx';
import Lightbox from './components/Lightbox.jsx';
import PasswordModal from './components/PasswordModal.jsx';
import { usePortfolioAccess } from './hooks/usePortfolioAccess.js';

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
  const [accessGranted, setAccessGranted] = useState(false);
  const { isUnlocked, unlock } = usePortfolioAccess();

  useLenis();
  useLinkTransition(setPath);

  // Handle browser back/forward
  useEffect(() => {
    const onPop = () => setPath(window.location.pathname);
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, []);

  const isAbout = path === '/about';
  const isKahfDecode = path === '/work/kahf-decode';
  const isMitraBukalapak = path === '/work/mitra-bukalapak';

  return (
    <>
      <Lightbox />
      <CursorSparkle />
      <RippleCanvas />
      <RulerLine />
      <Nav path={path} />
      <main>
        {isAbout ? (
          <About />
        ) : isKahfDecode ? (
          <KahfDecode />
        ) : isMitraBukalapak ? (
          <>
            {!isUnlocked && !accessGranted && (
              <PasswordModal
                onUnlock={(input) => {
                  const ok = unlock(input);
                  if (ok) setAccessGranted(true);
                  return ok;
                }}
                onDismiss={() => {
                  window.history.pushState(null, '', '/');
                  setPath('/');
                }}
              />
            )}
            {(isUnlocked || accessGranted) && <MitraBukalapak />}
          </>
        ) : (
          <>
            <Hero />
            <LogoMarquee />
            <Portfolio />
          </>
        )}
      </main>
      <Footer />
    </>
  );
}
