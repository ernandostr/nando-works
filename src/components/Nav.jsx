import styles from './Nav.module.css';

export default function Nav({ path = '/' }) {
  return (
    <nav className={styles.nav}>
      <div className={styles.inner}>
      <a href="/" className={styles.logo}>nando.works</a>
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
      </div>
    </nav>
  );
}
