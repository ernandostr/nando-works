import styles from './Essays.module.css';

export default function Essays() {
  return (
    <section className={styles.essays}>
      <div className={styles.header}>
        <h1 className={styles.title}>Essays</h1>
        <p className={styles.sub}>Thoughts on design, craft, and the work behind the work.</p>
      </div>
      <p className={styles.coming}>Coming soon.</p>
    </section>
  );
}
