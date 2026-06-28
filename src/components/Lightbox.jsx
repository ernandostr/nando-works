import { useEffect, useRef, useState, useCallback } from 'react';
import styles from './Lightbox.module.css';

export default function Lightbox() {
  const [entry, setEntry] = useState(null);
  const [scale, setScale] = useState(1);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const overlayRef = useRef(null);
  const imgRef = useRef(null);
  const dragRef = useRef(null);
  const pinchRef = useRef(null);

  const open = useCallback((src, alt) => {
    setEntry({ src, alt });
    setScale(1);
    setOffset({ x: 0, y: 0 });
  }, []);

  const close = useCallback(() => {
    setEntry(null);
    setScale(1);
    setOffset({ x: 0, y: 0 });
  }, []);

  // Intercept image clicks globally (capture phase, before link transitions)
  useEffect(() => {
    const handle = (e) => {
      const img = e.target.closest('img');
      if (!img || img.closest('nav') || img.naturalWidth < 80) return;
      e.stopPropagation();
      open(img.src, img.alt);
    };
    document.addEventListener('click', handle, true);
    return () => document.removeEventListener('click', handle, true);
  }, [open]);

  // Escape to close
  useEffect(() => {
    if (!entry) return;
    const handle = (e) => { if (e.key === 'Escape') close(); };
    window.addEventListener('keydown', handle);
    return () => window.removeEventListener('keydown', handle);
  }, [entry, close]);

  // Lock body scroll while open
  useEffect(() => {
    document.body.style.overflow = entry ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [entry]);

  // Non-passive wheel on overlay for zoom
  useEffect(() => {
    const el = overlayRef.current;
    if (!el) return;
    const handle = (e) => {
      e.preventDefault();
      const factor = e.deltaY > 0 ? 0.92 : 1.08;
      setScale(s => Math.min(Math.max(s * factor, 0.5), 8));
    };
    el.addEventListener('wheel', handle, { passive: false });
    return () => el.removeEventListener('wheel', handle);
  }, [entry]);

  // Non-passive touchmove on image to allow pinch without browser zoom
  useEffect(() => {
    const el = imgRef.current;
    if (!el) return;
    const handle = (e) => e.preventDefault();
    el.addEventListener('touchmove', handle, { passive: false });
    return () => el.removeEventListener('touchmove', handle);
  }, [entry]);

  // Mouse drag
  const onMouseDown = (e) => {
    if (e.button !== 0) return;
    dragRef.current = { mx: e.clientX, my: e.clientY, ox: offset.x, oy: offset.y };
  };
  const onMouseMove = (e) => {
    if (!dragRef.current) return;
    setOffset({
      x: dragRef.current.ox + e.clientX - dragRef.current.mx,
      y: dragRef.current.oy + e.clientY - dragRef.current.my,
    });
  };
  const onMouseUp = () => { dragRef.current = null; };

  // Double-click to reset zoom
  const onDblClick = (e) => {
    e.stopPropagation();
    setScale(1);
    setOffset({ x: 0, y: 0 });
  };

  // Touch: pinch-to-zoom + single-finger pan
  const onTouchStart = (e) => {
    if (e.touches.length === 1) {
      dragRef.current = {
        mx: e.touches[0].clientX,
        my: e.touches[0].clientY,
        ox: offset.x,
        oy: offset.y,
      };
    }
  };
  const onTouchMove = (e) => {
    if (e.touches.length === 2) {
      dragRef.current = null;
      const dist = Math.hypot(
        e.touches[0].clientX - e.touches[1].clientX,
        e.touches[0].clientY - e.touches[1].clientY,
      );
      if (pinchRef.current !== null) {
        setScale(s => Math.min(Math.max(s * (dist / pinchRef.current), 0.5), 8));
      }
      pinchRef.current = dist;
    } else if (e.touches.length === 1 && dragRef.current) {
      setOffset({
        x: dragRef.current.ox + e.touches[0].clientX - dragRef.current.mx,
        y: dragRef.current.oy + e.touches[0].clientY - dragRef.current.my,
      });
    }
  };
  const onTouchEnd = (e) => {
    if (e.touches.length < 2) pinchRef.current = null;
    if (e.touches.length === 0) dragRef.current = null;
  };

  if (!entry) return null;

  return (
    <div
      ref={overlayRef}
      className={styles.overlay}
      onClick={close}
      onMouseMove={onMouseMove}
      onMouseUp={onMouseUp}
      onMouseLeave={onMouseUp}
    >
      <button
        className={styles.close}
        onClick={(e) => { e.stopPropagation(); close(); }}
        aria-label="Close"
      >
        ✕
      </button>
      <img
        ref={imgRef}
        className={styles.image}
        src={entry.src}
        alt={entry.alt}
        style={{ transform: `translate(${offset.x}px, ${offset.y}px) scale(${scale})` }}
        onClick={(e) => e.stopPropagation()}
        onDblClick={onDblClick}
        onMouseDown={onMouseDown}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
        draggable={false}
      />
    </div>
  );
}
