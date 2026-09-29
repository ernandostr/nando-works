import { useEffect, useMemo, useRef, useState } from 'react';
import styles from './ContributionGraph.module.css';

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const DAY_LABELS = ['', 'Mon', '', 'Wed', '', 'Fri', ''];

function toKey(d) {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

function formatDate(d) {
  return `${MONTHS[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`;
}

function levelFor(count) {
  return Math.min(count, 4);
}

export default function ContributionGraph({ dates }) {
  const scrollRef = useRef(null);
  const [active, setActive] = useState(null);

  const { year, weeks, monthLabels, total } = useMemo(() => {
    const counts = {};
    dates.forEach((key) => { counts[key] = (counts[key] || 0) + 1; });

    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const year = today.getFullYear();
    const yearStart = new Date(year, 0, 1);
    const yearEnd = new Date(year, 11, 31);
    const cursor = new Date(yearStart);
    cursor.setDate(cursor.getDate() - yearStart.getDay());

    const weeks = [];
    const monthLabels = [];
    let total = 0;

    while (cursor <= yearEnd) {
      const week = [];
      for (let i = 0; i < 7; i++) {
        if (cursor < yearStart || cursor > yearEnd) {
          week.push(null);
        } else {
          const date = new Date(cursor);
          const count = counts[toKey(date)] || 0;
          total += count;
          week.push({
            date,
            count,
            future: date > today,
            isToday: date.getTime() === today.getTime(),
          });
          if (date.getDate() === 1) {
            monthLabels.push({ col: weeks.length, label: MONTHS[date.getMonth()] });
          }
        }
        cursor.setDate(cursor.getDate() + 1);
      }
      weeks.push(week);
    }

    return { year, weeks, monthLabels, total };
  }, [dates]);

  useEffect(() => {
    const el = scrollRef.current;
    const todayCell = el?.querySelector('[data-today]');
    if (el && todayCell && todayCell.offsetLeft + todayCell.offsetWidth > el.clientWidth) {
      el.scrollLeft = todayCell.offsetLeft - el.clientWidth / 2;
    }
  }, []);

  const describe = (day) =>
    `${day.count === 0 ? 'No' : day.count} essay${day.count === 1 ? '' : 's'} on ${formatDate(day.date)}`;

  return (
    <div className={styles.wrap}>
      <p className={styles.summary}>
        {total} essay{total === 1 ? '' : 's'} in {year}
      </p>

      <div className={styles.card}>
        <div className={styles.body}>
          <div className={styles.days}>
            {DAY_LABELS.map((d, i) => <span key={i}>{d}</span>)}
          </div>

          <div className={styles.scroll} ref={scrollRef}>
            <div className={styles.graph} style={{ '--cols': weeks.length }}>
              <div className={styles.months}>
                {monthLabels.map((m) => (
                  <span key={`${m.col}-${m.label}`} style={{ gridColumn: m.col + 1 }}>{m.label}</span>
                ))}
              </div>

              <div className={styles.cells} onMouseLeave={() => setActive(null)}>
                {weeks.map((week, wi) =>
                  week.map((day, di) =>
                    !day ? (
                      <span key={`${wi}-${di}`} className={styles.empty} />
                    ) : day.future ? (
                      <span
                        key={`${wi}-${di}`}
                        className={`${styles.cell} ${styles.future}`}
                        data-level={0}
                      />
                    ) : (
                      <button
                        data-today={day.isToday || undefined}
                        key={`${wi}-${di}`}
                        type="button"
                        className={styles.cell}
                        data-level={levelFor(day.count)}
                        title={describe(day)}
                        aria-label={describe(day)}
                        onMouseEnter={() => setActive(day)}
                        onFocus={() => setActive(day)}
                        onClick={() => setActive(day)}
                      />
                    ),
                  ),
                )}
              </div>
            </div>
          </div>
        </div>

        <div className={styles.footer}>
          <span className={styles.status}>
            {active ? describe(active) : 'Hover or tap a square'}
          </span>
          <span className={styles.legend}>
            Less
            {[0, 1, 2, 3, 4].map((l) => <i key={l} className={styles.cell} data-level={l} />)}
            More
          </span>
        </div>
      </div>
    </div>
  );
}
