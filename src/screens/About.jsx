import styles from './About.module.css';

const sections = [
  {
    category: 'On Collaboration',
    items: [
      {
        title: 'Trust is the foundation',
        body: "What are your goals? What keeps you up at night? What does success look like? Through regular conversations, I focus on understanding your vision, business objectives, constraints, and target users. This clarity keeps us aligned and moving forward together.",
      },
      {
        title: 'Design is collective work',
        body: "The best solutions emerge when diverse perspectives challenge and refine ideas. I actively seek feedback from engineers, PMs, researchers, and stakeholders because each voice strengthens the outcome. All constructive feedback should come from the vision, business objectives, and serving customers. When feedback is grounded in these, it makes the work sharper and more purposeful.",
      },
      {
        title: 'I bring clarity to ambiguity',
        body: 'Projects don\'t always start with a polished PRD. Sometimes you have a vision, a market opportunity, or a problem that needs solving, but the "what" and "how" aren\'t clear yet. That\'s where I can help. Through discovery, planning, and scoping, I work with you to define the right problems, validate assumptions, and create a shared roadmap. The result is clear documentation, aligned priorities, and confidence in what we\'re building together.',
      },
    ],
  },
  {
    category: 'On Craft',
    items: [
      {
        title: 'Beauty is a Function',
        body: "To make something beautiful, we are forced to make it intuitive, purposeful, and clear. I see this as a pyramid. The foundation must solve user pain points and achieve business goals. On top of that solid base, we can intentionally build an aesthetic that reflects both our users and the company's vision.",
      },
      {
        title: 'Exploration Builds Confidence',
        body: "The best design solutions rarely come from the first idea. I believe in exploring a wide range of perspectives through multiple design solutions and deliberate iterations. This process is how we build the confidence that de-risks the product before it ever meets a user.",
      },
    ],
  },
];

export default function About() {
  return (
    <section className={styles.about}>
      <header className={styles.header}>
        <h1 className={styles.title}>About me</h1>
        <p className={styles.intro}>
          I'm Fernando — a product designer (UI/UX) with over 8 years of experience
          helping founders and product owners translate their vision into digital product.
        </p>
      </header>

      <div className={styles.sections}>
        {sections.map((section) => (
          <div key={section.category} className={styles.section}>
            <h2 className={styles.category}>{section.category}</h2>
            <div className={styles.items}>
              {section.items.map((item) => (
                <div key={item.title} className={styles.item}>
                  <h3 className={styles.itemTitle}>{item.title}</h3>
                  <p className={styles.itemBody}>{item.body}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
