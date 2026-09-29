import { essays } from '../data/essays.js';
import styles from './EssayDetail.module.css';

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export function formatEssayDate(iso) {
  const [y, m, d] = iso.split('-').map(Number);
  return `${MONTHS[m - 1]} ${d}, ${y}`;
}

function Block({ block }) {
  switch (block.type) {
    case 'h2':
      return <h2 className={styles.h2}>{block.text}</h2>;
    case 'h3':
      return <h3 className={styles.h3}>{block.text}</h3>;
    case 'hr':
      return <hr className={styles.hr} />;
    case 'kv':
      return (
        <dl className={styles.kv}>
          {block.items.map((item) => (
            <div key={item.k} className={styles.kvRow}>
              <dt>{item.k}</dt>
              <dd>{item.v}</dd>
            </div>
          ))}
        </dl>
      );
    case 'list':
      return (
        <ul className={styles.list}>
          {block.items.map((text) => <li key={text}>{text}</li>)}
        </ul>
      );
    default:
      return <p className={styles.p}>{block.text}</p>;
  }
}

export default function EssayDetail({ slug }) {
  const essay = essays.find((e) => e.slug === slug);

  if (!essay) {
    return (
      <article className={styles.page}>
        <a href="/essays" className={styles.back}>← Essays</a>
        <h1 className={styles.title}>Essay not found</h1>
      </article>
    );
  }

  return (
    <article className={styles.page}>
      <a href="/essays" className={styles.back}>← Essays</a>

      <p className={styles.meta}>
        {formatEssayDate(essay.date)} · {essay.readTime} read
      </p>
      <h1 className={styles.title}>{essay.title}</h1>
      <p className={styles.subtitle}>{essay.subtitle}</p>

      <div className={styles.body}>
        {essay.content.map((block, i) => <Block key={i} block={block} />)}
      </div>

      {essay.substackUrl && (
        <a
          href={essay.substackUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.substack}
        >
          Also published on Substack
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
            <path d="M1 9L9 1M9 1H3M9 1V7" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </a>
      )}
    </article>
  );
}
