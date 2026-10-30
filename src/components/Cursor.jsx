import { useEffect, useRef } from 'react';
import styles from './Cursor.module.css';

const DOT_SIZE = 12;
const TRAIL_MS = 450;
const LINE_WIDTH = 2;

export default function Cursor() {
  const dotRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;

    const dot = dotRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const showTrail = !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const color = getComputedStyle(canvas).color;

    let points = [];
    let raf = 0;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.strokeStyle = color;
      ctx.lineWidth = LINE_WIDTH;
      ctx.lineJoin = 'round';
    };

    const draw = (now) => {
      points = points.filter((p) => now - p.t < TRAIL_MS);
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
      if (points.length > 1) {
        ctx.beginPath();
        ctx.moveTo(points[0].x, points[0].y);
        for (let i = 1; i < points.length; i++) ctx.lineTo(points[i].x, points[i].y);
        ctx.stroke();
      }
      raf = points.length ? requestAnimationFrame(draw) : 0;
    };

    const onMove = (e) => {
      dot.style.opacity = '1';
      dot.style.transform = `translate3d(${e.clientX - DOT_SIZE / 2}px, ${e.clientY - DOT_SIZE / 2}px, 0)`;
      if (!showTrail) return;
      points.push({ x: e.clientX, y: e.clientY, t: performance.now() });
      if (!raf) raf = requestAnimationFrame(draw);
    };

    const onLeave = () => { dot.style.opacity = '0'; };

    resize();
    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', onMove);
    document.documentElement.addEventListener('mouseleave', onLeave);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMove);
      document.documentElement.removeEventListener('mouseleave', onLeave);
    };
  }, []);

  return (
    <>
      <canvas ref={canvasRef} className={styles.trail} aria-hidden="true" />
      <div ref={dotRef} className={styles.dot} aria-hidden="true" />
    </>
  );
}
