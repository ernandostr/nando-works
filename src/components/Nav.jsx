import { useState, useEffect } from 'react';
import styles from './Nav.module.css';

export default function Nav({ path = '/' }) {
  const [open, setOpen] = useState(false);

  // Close menu on route change
  useEffect(() => { setOpen(false); }, [path]);

  // Lock body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  return (
    <nav className={styles.nav}>
      <div className={styles.inner}>
        <a href="/" className={styles.logo}>nando.works</a>

        {/* Desktop links */}
        <ul className={styles.links}>
          <li><a href="/" className={path === '/' ? styles.active : ''}>Home</a></li>
          <li><a href="/about" className={path === '/about' ? styles.active : ''}>About me</a></li>
          <li>
            <a
              href="https://drive.google.com/your-resume-link"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.resumeLink}
            >
              Resume.pdf
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
                <path d="M1 9L9 1M9 1H3M9 1V7" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
          </li>
          <li><a href="/writings">Writings</a></li>
        </ul>

        {/* Hamburger button — mobile only */}
        <button
          className={styles.hamburger}
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
        >
          <span className={`${styles.bar} ${open ? styles.barTop : ''}`} />
          <span className={`${styles.bar} ${open ? styles.barMid : ''}`} />
          <span className={`${styles.bar} ${open ? styles.barBot : ''}`} />
        </button>
      </div>

      {/* Mobile drawer */}
      <div className={`${styles.drawer} ${open ? styles.drawerOpen : ''}`}>
        <ul className={styles.drawerLinks}>
          <li><a href="/" className={path === '/' ? styles.active : ''} onClick={() => setOpen(false)}>Home</a></li>
          <li><a href="/about" className={path === '/about' ? styles.active : ''} onClick={() => setOpen(false)}>About me</a></li>
          <li>
            <a
              href="https://drive.google.com/your-resume-link"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.resumeLink}
              onClick={() => setOpen(false)}
            >
              Resume.pdf
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
                <path d="M1 9L9 1M9 1H3M9 1V7" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
          </li>
          <li><a href="/writings" onClick={() => setOpen(false)}>Writings</a></li>
        </ul>
      </div>
    </nav>
  );
}
