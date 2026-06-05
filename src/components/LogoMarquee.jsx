import { useEffect, useRef } from 'react';
import styles from './LogoMarquee.module.css';


import logoBukalapak     from '../assets/client and company logo/1. bukalapak.png';
import logoMRT           from '../assets/client and company logo/2. mrt jakarta.png';
import logoParagon       from '../assets/client and company logo/3. paragon.png';
import logoKahf          from '../assets/client and company logo/4. kahf.png';
import logoKemenparekraf from '../assets/client and company logo/5. kemenparekraf.png';
import logoEfishery      from '../assets/client and company logo/6. efishery.png';
import logoClarion       from '../assets/client and company logo/7. clarion events.png';
import logoIllume        from '../assets/client and company logo/8. illume.png';
import logoAceplace      from '../assets/client and company logo/9. aceplace.png';

const LOGOS = [
  { src: logoBukalapak,     alt: 'Bukalapak' },
  { src: logoMRT,           alt: 'MRT Jakarta' },
  { src: logoParagon,       alt: 'Paragon' },
  { src: logoKahf,          alt: 'Kahf' },
  { src: logoKemenparekraf, alt: 'Kemenparekraf' },
  { src: logoEfishery,      alt: 'eFishery' },
  { src: logoClarion,       alt: 'Clarion Events' },
  { src: logoIllume,        alt: 'Illume' },
  { src: logoAceplace,      alt: 'Aceplace' },
];

export default function LogoMarquee() {
  const stripRef = useRef(null);

  useEffect(() => {
    const strip = stripRef.current;
    if (!strip) return;

    // requestAnimationFrame is natively paused when the OS suspends the browser
    // and automatically resumes when the browser comes back to foreground.
    // This is more reliable than CSS animations + visibilitychange on iOS Safari,
    // which loses its GPU compositing layer on suspend/restore.
    let x = 0;
    let rafId;
    let lastTime;
    let halfWidth = 0;
    const DURATION_MS = 18000; // match the original 18s CSS animation speed

    const tick = (now) => {
      // Compute halfWidth on the first tick (after layout/images are ready)
      if (!lastTime) {
        lastTime = now;
        halfWidth = strip.scrollWidth / 2;
      }

      // Cap delta to 100ms so a long OS suspension doesn't cause a position jump
      const delta = Math.min(now - lastTime, 100);
      lastTime = now;

      if (halfWidth > 0) {
        x -= (halfWidth / DURATION_MS) * delta;
        if (x < -halfWidth) x += halfWidth;
        strip.style.transform = `translate3d(${x}px, 0, 0)`;
      }

      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, []);

  return (
    <div className={styles.logoTrack}>
      <div ref={stripRef} className={styles.logoStrip}>
        {[...LOGOS, ...LOGOS].map((logo, i) => (
          <img
            key={`${logo.alt}-${i}`}
            src={logo.src}
            alt={logo.alt}
            className={styles.logo}
          />
        ))}
      </div>
    </div>
  );
}
