import { useState, useEffect, useRef } from 'react';
import Avatar from './Avatar.jsx';
import styles from './Hero.module.css';

import logoBukalapak    from '../assets/client and company logo/1. bukalapak.png';
import logoMRT          from '../assets/client and company logo/2. mrt jakarta.png';
import logoParagon      from '../assets/client and company logo/3. paragon.png';
import logoKahf         from '../assets/client and company logo/4. kahf.png';
import logoKemenparekraf from '../assets/client and company logo/5. kemenparekraf.png';
import logoEfishery     from '../assets/client and company logo/6. efishery.png';
import logoClarion      from '../assets/client and company logo/7. clarion events.png';
import logoIllume       from '../assets/client and company logo/8. illume.png';
import logoAceplace     from '../assets/client and company logo/9. aceplace.png';

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

const FULL_TEXT =
  "Hey, I'm Fernando, a product designer (UI/UX) with over 8 years of experience helping founders / product owners to translate their vision into product digital";
const BOLD_PHRASE = 'translate their vision';
const TYPING_SPEED = 32;

function renderText(text) {
  const idx = text.indexOf(BOLD_PHRASE);
  if (idx === -1) return <>{text}</>;
  return (
    <>
      {text.slice(0, idx)}
      <strong>{text.slice(idx, idx + BOLD_PHRASE.length)}</strong>
      {text.slice(idx + BOLD_PHRASE.length)}
    </>
  );
}

export default function Hero() {
  const [text, setText] = useState('');
  const [done, setDone] = useState(false);
  const timerRef = useRef(null);

  useEffect(() => {
    let i = 0;
    timerRef.current = setInterval(() => {
      i++;
      setText(FULL_TEXT.slice(0, i));
      if (i >= FULL_TEXT.length) {
        clearInterval(timerRef.current);
        setDone(true);
      }
    }, TYPING_SPEED);
    return () => clearInterval(timerRef.current);
  }, []);

  useEffect(() => {
    if (!done) return;
    const onKey = (e) => {
      if (e.key === 'Backspace' || e.key === 'Delete') {
        e.preventDefault();
        setText((prev) => prev.slice(0, -1));
      } else if (e.key.length === 1 && !e.metaKey && !e.ctrlKey) {
        e.preventDefault();
        setText((prev) => prev + e.key);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [done]);

  return (
    <section className={styles.hero}>
      <div className={styles.intro}>
        <Avatar />

        <div className={styles.body}>
          <p className={styles.headline}>
            {renderText(text)}
            <span className={styles.cursor} aria-hidden="true" />
          </p>

          <div className={styles.status}>
            <span className={styles.dot} />
            Available for work (1 slot)
          </div>

          <ul className={styles.links}>
            <li><a href="https://linkedin.com/in/fernandosianturi" target="_blank" rel="noopener noreferrer">LinkedIn</a></li>
            <li><a href="https://dribbble.com/fernandosianturi" target="_blank" rel="noopener noreferrer">Dribbble</a></li>
            <li>
              <a href="mailto:ernandostr@gmail.com" className={styles.email}>
                → ernandostr@gmail.com
              </a>
            </li>
          </ul>

        </div>
      </div>

      {/* Full-width logo marquee */}
      <div className={styles.logoTrack}>
        <div className={styles.logoStrip}>
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
    </section>
  );
}
