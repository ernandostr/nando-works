import { useEffect, useRef } from 'react';

const SCALE   = 2;      // simulation runs at 1/2 screen resolution
const DAMPING = 0.993;  // wave persistence (< 1 = decay)
const SPREAD  = 0.5;    // Laplacian multiplier (≤ 0.5 keeps simulation stable)
const DROP_R  = 8;      // drop radius in simulation pixels
const DROP_S  = 280;    // drop strength

export default function RippleCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    // ── Simulation state ──────────────────────────────────
    let sim = null;    // { w, h, bufs:[Float32Array, Float32Array], cur:0 }
    let off = null;    // { el: OffscreenCanvas|canvas, ctx }
    let raf = null;
    let idle = 0;      // frames since last activity

    function buildSim() {
      const W = window.innerWidth;
      const H = window.innerHeight;
      canvas.width  = W;
      canvas.height = H;

      const w = Math.ceil(W / SCALE);
      const h = Math.ceil(H / SCALE);
      sim = {
        w, h,
        bufs: [new Float32Array(w * h), new Float32Array(w * h)],
        cur: 0,
      };

      const el = document.createElement('canvas');
      el.width  = w;
      el.height = h;
      off = { el, ctx: el.getContext('2d') };
      idle = 0;
    }

    // ── Drop ─────────────────────────────────────────────
    function addDrop(screenX, screenY) {
      if (!sim) return;
      idle = 0;
      const cx = Math.floor(screenX / SCALE);
      const cy = Math.floor(screenY / SCALE);
      const buf = sim.bufs[sim.cur];
      const { w, h } = sim;

      for (let dy = -DROP_R; dy <= DROP_R; dy++) {
        for (let dx = -DROP_R; dx <= DROP_R; dx++) {
          if (dx * dx + dy * dy <= DROP_R * DROP_R) {
            const x = cx + dx;
            const y = cy + dy;
            if (x > 0 && x < w - 1 && y > 0 && y < h - 1) {
              buf[y * w + x] = DROP_S;
            }
          }
        }
      }
    }

    // ── Wave physics (Laplacian wave equation on a grid) ──
    function step() {
      if (!sim) return;
      const { w, h, bufs, cur } = sim;
      const nxt = 1 - cur;
      const a = bufs[cur];   // current height
      const b = bufs[nxt];   // previous height (will become new)

      for (let y = 1; y < h - 1; y++) {
        for (let x = 1; x < w - 1; x++) {
          const i = y * w + x;
          // Discrete wave equation: new = spread*(neighbours) - old, then damp
          b[i] = (a[i - 1] + a[i + 1] + a[i - w] + a[i + w]) * SPREAD - b[i];
          b[i] *= DAMPING;
        }
      }
      sim.cur = nxt;
    }

    // ── Render wave as caustic light / shadow ─────────────
    function render() {
      if (!sim || !off) return;
      const { w, h, bufs, cur } = sim;
      const buf = bufs[cur];
      const img = off.ctx.createImageData(w, h);
      const d   = img.data;

      let maxAmp = 0;
      for (let y = 1; y < h - 1; y++) {
        for (let x = 1; x < w - 1; x++) {
          const i  = y * w + x;
          const v  = buf[i];
          if (Math.abs(v) > maxAmp) maxAmp = Math.abs(v);
          if (Math.abs(v) < 0.8) continue; // skip quiet pixels

          // Surface gradient → approximate refracted light direction
          const gx = buf[i + 1] - buf[i - 1];
          const gy = buf[i + w] - buf[i - w];

          // Light coming from top-left → project onto (1,−1) axis
          const light = (gx - gy) * 0.45;

          const px = i * 4;
          if (light > 0) {
            // Specular highlight — white, moderate alpha for overlay blend
            d[px]     = 255;
            d[px + 1] = 255;
            d[px + 2] = 255;
            d[px + 3] = Math.min(200, light * 1.2) | 0;
          } else {
            // Shadow trough
            d[px]     = 0;
            d[px + 1] = 0;
            d[px + 2] = 0;
            d[px + 3] = Math.min(140, -light * 0.9) | 0;
          }
        }
      }

      // Track idleness for battery savings
      if (maxAmp < 0.5) idle++; else idle = 0;

      off.ctx.putImageData(img, 0, 0);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      // Scale half-res simulation up to full canvas
      ctx.drawImage(off.el, 0, 0, canvas.width, canvas.height);
    }

    // ── Animation loop ────────────────────────────────────
    function loop() {
      if (idle < 180) { // run up to ~3 s after last activity
        step();
        render();
      } else {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
      raf = requestAnimationFrame(loop);
    }

    // ── Init ─────────────────────────────────────────────
    buildSim();
    raf = requestAnimationFrame(loop);

    const onResize = () => buildSim();
    const onClick  = (e) => addDrop(e.clientX, e.clientY);
    const onTouch  = (e) => {
      for (const t of e.changedTouches) addDrop(t.clientX, t.clientY);
    };

    window.addEventListener('resize', onResize);
    window.addEventListener('click',  onClick);
    window.addEventListener('touchstart', onTouch, { passive: true });

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', onResize);
      window.removeEventListener('click',  onClick);
      window.removeEventListener('touchstart', onTouch);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 9997,
        mixBlendMode: 'overlay',
      }}
    />
  );
}
