import { useState, useEffect, useRef } from 'react';
import Avatar from './Avatar.jsx';
import styles from './Hero.module.css';

const FULL_TEXT =
  "Hi, I'm Fernando, a product designer (UI/UX) with over 8 years of experience helping founders and product owners translate their vision into digital products.";
const SERIF_PHRASE = 'translate their vision into digital products';
const TYPING_SPEED = 32;

function renderText(text) {
  const idx = text.indexOf(SERIF_PHRASE);
  if (idx === -1) return <>{text}</>;
  return (
    <>
      {text.slice(0, idx)}
      <strong>{text.slice(idx, idx + SERIF_PHRASE.length)}</strong>
      {text.slice(idx + SERIF_PHRASE.length)}
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

    </section>
  );
}
