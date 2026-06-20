import styles from './KahfDecode.module.css';
import mitraThumbnail from '../assets/mitra bukalapak/mitra bukalapak thumbnail.jpg';
import coverDetailArticle from '../assets/mitra bukalapak/cover-detail-article.jpg';
import aligningTeam from '../assets/mitra bukalapak/aligning-team.jpg';

export default function MitraBukalapak() {
  return (
    <article className={styles.page}>

      {/* Back link */}
      <a href="/" className={styles.back}>
        ← Back
      </a>

      {/* ── Header ── */}
      <div className={styles.meta}>
        <span>UI/UX</span>
        <span className={styles.metaDot} />
        <span>2019</span>
        <span className={styles.metaDot} />
        <span>Mitra Bukalapak</span>
      </div>

      <h1 className={styles.title}>
        Designing a Voucher Game Product for Mitra Bukalapak
      </h1>

      {/* ── The Product ── */}
      <div className={styles.row}>
        <span className={styles.label}>The Product</span>
        <div className={styles.content}>
          <div className={styles.callout}>
            <p className={styles.calloutText}>
              Bridging the gap between non-tech-savvy warung sellers, gaming culture, and their customers.
            </p>
          </div>
          <p className={styles.body}>
            Mitra Bukalapak is an O2O (Online-to-Offline) platform from Bukalapak that enables warung
            owners to sell digital goods directly to their customers. This project focused on designing
            a Voucher Game feature within the platform, giving sellers the ability to offer popular game
            vouchers, such as Free Fire and Mobile Legends, to their own customers, including unbanked
            buyers who depend on neighborhood stores for everyday digital purchases.
          </p>
          <img
            src={coverDetailArticle}
            alt="Mitra Bukalapak voucher game product"
            className={styles.imageFull}
          />
          <p className={styles.body} style={{ fontSize: '13px', color: 'var(--grey-400)', fontStyle: 'italic' }}>
            This case study covers approach and collaboration process. ~3 min read.
          </p>
        </div>
      </div>

      {/* ── Background ── */}
      <div className={styles.row}>
        <span className={styles.label}>Background</span>
        <div className={styles.content}>
          <p className={styles.body}>
            I was part of the Virtual Product team, responsible for digital goods including mobile credits,
            data packages, electricity tokens, and train tickets for Bukalapak's marketplace users. A direct
            request came from the CEO to build a Voucher Game product for the O2O channel. The O2O team was
            occupied with other priorities at the time, so our team stepped in to take it on.
          </p>
        </div>
      </div>

      {/* ── The Challenge ── */}
      <div className={styles.row}>
        <span className={styles.label}>The Challenge</span>
        <div className={styles.content}>
          <p className={styles.body}>
            In the kick-off session, we identified a significant knowledge gap on two fronts: we had no
            prior experience with the O2O platform, and we were unfamiliar with the actual users, warung
            sellers and their customers. Adding to the pressure, the request came directly from the CEO
            with a tight timeline.
          </p>
          <div className={styles.callout}>
            <p className={styles.calloutText}>
              The core risk was designing a product that non-tech-savvy sellers couldn't confidently
              interact with, potentially blocking transactions entirely.
            </p>
          </div>
        </div>
      </div>

      {/* ── The Key Process ── */}
      <div className={styles.row}>
        <span className={styles.label}>Process</span>
        <div className={styles.content}>
          <div className={styles.steps}>

            <div className={styles.step}>
              <span className={styles.stepNumber}>01</span>
              <div className={styles.stepContent}>
                <p className={styles.stepTitle}>Building Knowledge Fast</p>
                <p className={styles.stepBody}>
                  We established a regular sync cadence with the O2O team and studied prior user research
                  to understand seller behavior, motivations, and pain points. This helped us get up to
                  speed on a platform and user base we had never worked with before.
                </p>
              </div>
            </div>

            <div className={styles.step}>
              <span className={styles.stepNumber}>02</span>
              <div className={styles.stepContent}>
                <p className={styles.stepTitle}>Aligning the Team</p>
                <p className={styles.stepBody}>
                  During knowledge transfer, team members were interpreting the project scope differently.
                  I facilitated a workshop using an as-is scenario framework, mapping the user journey,
                  feelings, and thoughts at each touchpoint. This aligned our understanding of the user
                  and clarified exactly which features to build, preventing misalignment before design began.
                </p>
                <img
                  src={aligningTeam}
                  alt="As-is scenario workshop for aligning the team"
                  className={styles.stepImage}
                />
              </div>
            </div>

            <div className={styles.step}>
              <span className={styles.stepNumber}>03</span>
              <div className={styles.stepContent}>
                <p className={styles.stepTitle}>Designing with Safety Nets</p>
                <p className={styles.stepBody}>
                  Armed with O2O principles and user knowledge, I designed the interface with two key
                  decisions in mind.
                </p>
                <div className={styles.approaches} style={{ marginTop: '24px' }}>
                  <div className={styles.approach}>
                    <span className={styles.approachTag}>First</span>
                    <p className={styles.approachText}>
                      We introduced an "interactive banner" pattern to guide non-tech-savvy sellers
                      through the product step by step. With no time budget for usability testing,
                      this pattern served as a proactive safeguard against usability failures before launch.
                    </p>
                  </div>
                  <div className={styles.approach}>
                    <span className={styles.approachTag}>Second</span>
                    <p className={styles.approachText}>
                      We conducted structured design reviews with stakeholders to iteratively refine
                      the interface and surface edge cases early.
                    </p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* ── Outcome ── */}
      <div className={styles.row}>
        <span className={styles.label}>Outcome</span>
        <div className={styles.content}>
          <div className={styles.bigStats}>
            <div className={styles.bigStat} style={{ gridColumn: '1 / -1' }}>
              <p className={styles.bigStatNumber} style={{ fontSize: '36px', lineHeight: '1.2' }}>
                Top 5 of 20 most-performing O2O products on the Mitra Bukalapak platform, only two quarters after release.
              </p>
            </div>
          </div>
          <p className={styles.body} style={{ marginTop: '24px' }}>
            The timing made sense: mobile gaming in Indonesia was surging in 2019, yet distribution
            touchpoints for unbanked buyers were limited to large convenience chains like Alfamart and
            Indomaret. Warung stores were far more accessible and trusted. Our product gave them the
            tools to capture that demand, and sellers quickly adopted it once they could navigate it
            confidently.
          </p>
        </div>
      </div>

    </article>
  );
}
