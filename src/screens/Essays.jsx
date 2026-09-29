import { essays } from '../data/essays.js';
import ContributionGraph from '../components/ContributionGraph.jsx';
import { formatEssayDate } from './EssayDetail.jsx';
import styles from './Essays.module.css';

export default function Essays() {
  const sorted = [...essays].sort((a, b) => b.date.localeCompare(a.date));

  return (
    <section className={styles.essays}>
      <div className={styles.header}>
        <h1 className={styles.title}>Essays</h1>
        <p className={styles.sub}>Thoughts on design, craft, and the work behind the work.</p>
      </div>

      <div className={styles.graph}>
        <ContributionGraph dates={essays.map((e) => e.date)} />
      </div>

      <ul className={styles.list}>
        {sorted.map((essay) => (
          <li key={essay.slug} className={styles.item}>
            <a href={`/essays/${essay.slug}`} className={styles.itemLink}>
              <span className={styles.itemMeta}>
                {formatEssayDate(essay.date)} · {essay.readTime} read
              </span>
              <span className={styles.itemTitle}>{essay.title}</span>
              <span className={styles.itemSub}>{essay.subtitle}</span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
