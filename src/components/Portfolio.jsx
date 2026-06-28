import { projects } from '../data/projects.js';
import styles from './Portfolio.module.css';

function ImageGrid({ images, title, comingSoon }) {
  if (images.length > 0) {
    return (
      <div className={styles.images}>
        {images.map((src, i) => (
          <img
            key={i}
            src={src}
            alt={`${title} ${i + 1}`}
            className={i === 0 ? styles.imageHero : styles.imageSquare}
            style={i > 0 && images.length === 3 ? { gridColumn: '1 / -1' } : undefined}
          />
        ))}
      </div>
    );
  }

  if (comingSoon) {
    return (
      <div className={styles.images}>
        <div className={styles.placeholderHero} />
      </div>
    );
  }

  return (
    <div className={styles.images}>
      {Array.from({ length: 5 }, (_, i) => (
        <div key={i} className={i === 0 ? styles.placeholderHero : styles.placeholderSquare} />
      ))}
    </div>
  );
}

function ProjectCard({ project }) {
  return (
    <article className={styles.card}>
      {/* Top metadata row */}
      <div className={styles.cardMeta}>
        <span className={styles.cardIndex}>{project.index}</span>
        <span>{project.category}</span>
        <span>·</span>
        <span>{project.year}</span>
      </div>

      {/* Two-column: title LEFT — description + cta RIGHT */}
      <div className={styles.cardBody}>
        <h3 className={styles.cardTitle}>{project.title}</h3>

        <div className={styles.cardRight}>
          <p className={styles.tldr}>{project.tldr}</p>
          {project.comingSoon ? (
            <span className={styles.comingSoon}>More detail design process coming soon</span>
          ) : (
            <a href={`/work/${project.slug}`} className={styles.readMore}>
              Read more
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                <path d="M2 10L10 2M10 2H4M10 2V8" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
          )}
        </div>
      </div>

      {/* Full-width image grid */}
      <ImageGrid images={project.images} title={project.title} comingSoon={project.comingSoon} />
    </article>
  );
}

export default function Portfolio() {
  return (
    <section className={styles.portfolio}>
      <div className={styles.sectionHeading}>
        <h2 className={styles.sectionTitle}>Selected<br />Work</h2>
        <p className={styles.sectionSub}>19' - Present</p>
      </div>

      <div className={styles.list}>
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </section>
  );
}
