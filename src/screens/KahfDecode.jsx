import styles from './KahfDecode.module.css';

import kahfVideo        from '../assets/kahf decode/the company - kahf/kahf video.mp4';
import kahfDecodeProducts from '../assets/kahf decode/the product digital - kahf decode/kahf decode products.avif';
import processStep1 from '../assets/kahf decode/the key process/1. The Key Process - Understand the product, the users, the company vision and run a UX audit.avif';
import processStep2 from '../assets/kahf decode/the key process/2. The Key Process - Explore visual directions.avif';
import designReview1 from '../assets/kahf decode/the key process/3. The Key Process - Designing Interface & Doing Design Review/1.avif';
import designReview2 from '../assets/kahf decode/the key process/3. The Key Process - Designing Interface & Doing Design Review/2.avif';
import designReview3 from '../assets/kahf decode/the key process/3. The Key Process - Designing Interface & Doing Design Review/3.avif';
import designReview4 from '../assets/kahf decode/the key process/3. The Key Process - Designing Interface & Doing Design Review/4.avif';
import designReview5 from '../assets/kahf decode/the key process/3. The Key Process - Designing Interface & Doing Design Review/5.avif';
import designReview6 from '../assets/kahf decode/the key process/3. The Key Process - Designing Interface & Doing Design Review/6.avif';

export default function KahfDecode() {
  return (
    <article className={styles.page}>

      {/* Back link */}
      <a href="/" className={styles.back}>
        ← Back
      </a>

      {/* ── Header ── */}
      <div className={styles.meta}>
        <span>Product Design</span>
        <span className={styles.metaDot} />
        <span>2025</span>
        <span className={styles.metaDot} />
        <span>Kahf</span>
      </div>

      <h1 className={styles.title}>
        Defining Key Visual and Designing Interface For Kahf Decode
      </h1>

      {/* ── The Company ── */}
      <div className={styles.row}>
        <span className={styles.label}>The Company</span>
        <div className={styles.content}>
          {/* Stat bar lives inside The Company */}
          <div className={styles.statBar}>
            <span className={styles.statBarNumber}>39%</span>
            <span className={styles.statBarText}>
              market share in Indonesia's men's skincare category
              <br />Kahf dominates Shopee as category leader (Q1 2025)
            </span>
          </div>

          <p className={styles.body}>
            Kahf leads Indonesia's men's skincare market. Their brand is built on consistency:
            from typography with their own custom typeface (Kahf Sans), to product packaging,
            to social content and influencer partnerships — every detail is intentionally crafted.
            For Kahf, beautiful design isn't just functional, it's a core brand differentiator.
          </p>

          <video
            src={kahfVideo}
            autoPlay
            muted
            loop
            playsInline
            className={styles.video}
          />
        </div>
      </div>

      {/* ── The Problem ── */}
      <div className={styles.row}>
        <span className={styles.label}>The Problem</span>
        <div className={styles.content}>
          <p className={styles.body}>
            Most Indonesian men are new to skincare. They're unsure of their skin type, which
            products suit them, or where to start. This uncertainty creates hesitation at the
            point of purchase.
          </p>
          <div className={styles.callout}>
            <p className={styles.calloutText}>
              Kahf Decode bridges that gap by providing personalized guidance,
              turning confusion into confidence.
            </p>
          </div>
        </div>
      </div>

      {/* ── The Product ── */}
      <div className={styles.row}>
        <span className={styles.label}>The Product</span>
        <div className={styles.content}>
          <p className={styles.body}>
            Kahf Decode is an AI-powered diagnostic experience that helps men discover their
            ideal skincare, hairstyle, and outfit recommendations. Launched as an offline event
            activation, it combines computer vision and personalized algorithms to simplify
            grooming decisions and build user confidence.
          </p>

          <img src={kahfDecodeProducts} alt="Kahf Decode product experience" className={styles.imageFull} />

          <div className={styles.features}>
            <div className={styles.featureCard}>
              <p className={styles.featureName}>Skintelligent Station</p>
              <p className={styles.featureDesc}>
                Analyzes skin type, identifies common problems, and recommends suitable Kahf products.
              </p>
            </div>
            <div className={styles.featureCard}>
              <p className={styles.featureName}>AI Hairstyle Code</p>
              <p className={styles.featureDesc}>
                Detects face shape and suggests complementary hairstyles.
              </p>
            </div>
            <div className={styles.featureCard}>
              <p className={styles.featureName}>Body Sync AI</p>
              <p className={styles.featureDesc}>
                Identifies body type and provides outfit recommendations.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ── The Challenge ── */}
      <div className={styles.row}>
        <span className={styles.label}>The Challenge</span>
        <div className={styles.content}>
          <p className={styles.body}>
            Kahf had invested heavily in Decode's launch — a flagship event at one of South
            Jakarta's most prestigious malls, targeting Indonesia's urban affluent consumers.
            The event was supported by high-profile KOL partnerships and integrated marketing
            across social, web, and offline channels.
          </p>
          <div className={styles.callout}>
            <p className={styles.calloutText}>
              But with just three weeks until launch, the initial designs from an external
              partner hadn't met expectations. The interface design felt disconnected from
              Kahf's premium visual identity.
            </p>
          </div>
          <p className={styles.body}>
            For a brand where every touchpoint is intentionally crafted, launching anything
            less would undermine the entire brand experience. I was brought in to redesign
            all three digital products in three weeks.
          </p>
        </div>
      </div>

      {/* ── Design Priorities ── */}
      <div className={styles.row}>
        <span className={styles.label}>Priorities</span>
        <div className={styles.content}>
          <div className={styles.priorities}>
            <div className={styles.priority}>
              <p className={styles.priorityNumber}>Priority 01</p>
              <p className={styles.priorityText}>
                Establish a key visual direction that feels expert-made and aligned
                with the lifestyle Kahf represents.
              </p>
            </div>
            <div className={styles.priority}>
              <p className={styles.priorityNumber}>Priority 02</p>
              <p className={styles.priorityText}>
                Ensure strong usability through seamless user flows and clear information
                architecture, so users can navigate the experience effortlessly.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ── Process ── */}
      <div className={styles.row}>
        <span className={styles.label}>Process</span>
        <div className={styles.content}>
          <div className={styles.steps}>
            <div className={styles.step}>
              <span className={styles.stepNumber}>01</span>
              <div className={styles.stepContent}>
                <p className={styles.stepTitle}>UX Audit & Discovery</p>
                <p className={styles.stepBody}>
                  Before any visual exploration, we focused on identifying usability problems,
                  information architecture gaps, and user flow issues. We unified the flow and
                  information architecture across all three products, allowing users to navigate
                  each experience with the same intuitive pattern.
                </p>
                <img
                  src={processStep1}
                  alt="The Key Process — Understand the product, the users, the company vision and run a UX audit"
                  className={styles.stepImage}
                />
              </div>
            </div>

            <div className={styles.step}>
              <span className={styles.stepNumber}>02</span>
              <div className={styles.stepContent}>
                <p className={styles.stepTitle}>Visual Direction Exploration</p>
                <p className={styles.stepBody}>
                  Like a writer with a blank page — defining a key visual direction is the most
                  challenging part because the possibilities are enormous. Since color is the
                  biggest element that evokes mood, we explored two extremes: vibrant vs. muted
                  tones. We used home screens as the primary exploration medium (the most
                  expressive canvas) and gathered stakeholder feedback to determine which
                  direction best aligned with Kahf's brand.
                </p>
                <img
                  src={processStep2}
                  alt="The Key Process — Explore visual directions"
                  className={styles.stepImage}
                />
              </div>
            </div>

            <div className={styles.step}>
              <span className={styles.stepNumber}>03</span>
              <div className={styles.stepContent}>
                <p className={styles.stepTitle}>Interface Design & Design Review</p>
                <p className={styles.stepBody}>
                  Four stakeholders held executive decision power, each with different knowledge
                  and taste — one referenced Digimon card designs, another wanted a futuristic
                  interface like Iron Man's HUD. Aligning these visions under a 3-week deadline
                  required a deliberate two-pronged approach.
                </p>
                <div className={styles.approaches}>
                  <div className={styles.approach}>
                    <span className={styles.approachTag}>First</span>
                    <p className={styles.approachText}>
                      We proposed our recommendation based on what we believed was relevant
                      to Kahf, grounded in their existing design system, key visual documentation,
                      and industry standards.
                    </p>
                  </div>
                  <div className={styles.approach}>
                    <span className={styles.approachTag}>Second</span>
                    <p className={styles.approachText}>
                      We designed options based on their direction — showing we listened and
                      genuinely tried their ideas — then explained why those directions conflicted
                      with their own key visual guidelines.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Stats ── */}
      <div className={styles.row}>
        <span className={styles.label} />
        <div className={styles.content}>
          <div className={styles.bigStats}>
            <div className={styles.bigStat}>
              <p className={styles.bigStatNumber}>80%</p>
              <p className={styles.bigStatLabel}>
                of the project timeline was spent exploring design ideas — both our own
                and stakeholder-requested directions — articulating design decisions,
                and conducting design reviews.
              </p>
            </div>
            <div className={styles.bigStat}>
              <p className={styles.bigStatNumber}>450+</p>
              <p className={styles.bigStatLabel}>
                design drafts created. We believe the best ideas come from exploring as
                many alternatives as possible. Heavy exploration is what builds the
                confidence to present with conviction.
              </p>
            </div>
          </div>

          <div className={styles.imageGrid3}>
            <img src={designReview1} alt="Interface design review 1" />
            <img src={designReview2} alt="Interface design review 2" />
            <img src={designReview3} alt="Interface design review 3" />
            <img src={designReview4} alt="Interface design review 4" />
            <img src={designReview5} alt="Interface design review 5" />
            <img src={designReview6} alt="Interface design review 6" />
          </div>
        </div>
      </div>

    </article>
  );
}
