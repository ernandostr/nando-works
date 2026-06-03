import { useState, useEffect } from 'react';
import styles from './WaterRipple.module.css';

let rid = 0;

export default function WaterRipple() {
  const [ripples, setRipples] = useState([]);

  useEffect(() => {
    const add = (x, y) => {
      const id = rid++;
      setRipples((prev) => [...prev, { id, x, y }]);
      setTimeout(() => {
        setRipples((prev) => prev.filter((r) => r.id !== id));
      }, 900);
    };

    const onClick = (e) => add(e.clientX, e.clientY);
    const onTouch = (e) => {
      const t = e.changedTouches[0];
      if (t) add(t.clientX, t.clientY);
    };

    window.addEventListener('click', onClick);
    window.addEventListener('touchend', onTouch, { passive: true });
    return () => {
      window.removeEventListener('click', onClick);
      window.removeEventListener('touchend', onTouch);
    };
  }, []);

  return (
    <div className={styles.layer} aria-hidden="true">
      {ripples.map((r) => (
        <div
          key={r.id}
          className={styles.ripple}
          style={{ left: r.x, top: r.y }}
        />
      ))}
    </div>
  );
}
