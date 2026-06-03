import { useState, useEffect, useCallback, useRef } from 'react';
import styles from './CursorSparkle.module.css';

let uid = 0;

const SHAPES = ['✦', '✧', '✶', '·'];
const COLORS = ['#ffffff', '#f0edcc', '#e8e4ff', '#cce8ff', '#ffffcc'];

export default function CursorSparkle() {
  const [sparkles, setSparkles] = useState([]);
  const lastTime = useRef(0);

  const spawn = useCallback((x, y) => {
    const count = Math.floor(Math.random() * 2) + 2; // 2–3 per event
    const batch = Array.from({ length: count }, () => {
      const angle = Math.random() * Math.PI * 2;
      const distance = Math.random() * 44 + 18;
      return {
        id: uid++,
        x: x + (Math.random() - 0.5) * 12,
        y: y + (Math.random() - 0.5) * 12,
        size: Math.random() * 9 + 6,
        dx: `${Math.cos(angle) * distance}px`,
        dy: `${Math.sin(angle) * distance - 14}px`, // slight upward bias
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        shape: SHAPES[Math.floor(Math.random() * SHAPES.length)],
        duration: Math.random() * 200 + 500, // 500–700 ms
      };
    });

    setSparkles((prev) => [...prev, ...batch]);

    const ids = batch.map((s) => s.id);
    setTimeout(() => {
      setSparkles((prev) => prev.filter((s) => !ids.includes(s.id)));
    }, 750);
  }, []);

  useEffect(() => {
    const onMove = (e) => {
      const now = Date.now();
      if (now - lastTime.current < 45) return;
      lastTime.current = now;
      spawn(e.clientX, e.clientY);
    };
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, [spawn]);

  return (
    <div className={styles.layer} aria-hidden="true">
      {sparkles.map((s) => (
        <span
          key={s.id}
          className={styles.sparkle}
          style={{
            left: s.x,
            top: s.y,
            fontSize: s.size,
            color: s.color,
            '--dx': s.dx,
            '--dy': s.dy,
            animationDuration: `${s.duration}ms`,
          }}
        >
          {s.shape}
        </span>
      ))}
    </div>
  );
}
