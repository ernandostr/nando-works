import { useEffect, useRef } from 'react';
import styles from './AwardTrophy.module.css';

// Proportions measured off the reference photo (width = depth = 1)
const W = 1;
const D = 1;
const BASE_H = 1.2;
const SLAB_H = 0.27;
const SLOT_H = 0.12;
const TIERS = 3;
const SPINE_D = 0.3;
const H = BASE_H + TIERS * (SLAB_H + SLOT_H);

const BRONZE = '#B9774B';
const INK = '#3d2416';
const TEX_W = 1024;
const TEX_H = Math.round((TEX_W * BASE_H) / W);

const AUTO_SPEED = (Math.PI * 2) / 14; // one full turn every 14s
const DRAG_SPEED = 0.012;
const MAX_FLING = 6; // rad/s

function canvasPair() {
  const make = (bg) => {
    const c = document.createElement('canvas');
    c.width = TEX_W;
    c.height = TEX_H;
    const ctx = c.getContext('2d');
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, TEX_W, TEX_H);
    return [c, ctx];
  };
  // colour map is multiplied by the bronze material colour, so white = plain bronze
  const [color, c] = make('#fff');
  // bump map: white = raised
  const [bump, b] = make('#000');
  return { color, bump, c, b };
}

function fitFont(ctx, text, weight, size, maxWidth) {
  ctx.font = `${weight} ${size}px Inter, sans-serif`;
  const w = ctx.measureText(text).width;
  if (w > maxWidth) ctx.font = `${weight} ${Math.floor((size * maxWidth) / w)}px Inter, sans-serif`;
}

// Raised letters: soft relief in the bump map plus a faint edge line in the colour map
function emboss(c, b, text, x, y) {
  c.save();
  c.lineWidth = 3;
  c.strokeStyle = 'rgba(61, 36, 22, 0.45)';
  c.strokeText(text, x, y);
  c.restore();

  b.save();
  b.font = c.font;
  b.textBaseline = c.textBaseline;
  b.textAlign = c.textAlign;
  b.filter = 'blur(3px)';
  b.fillStyle = '#fff';
  b.fillText(text, x, y);
  b.restore();
}

function drawFront() {
  const p = canvasPair();
  const { c, b } = p;

  // Printed details, bottom-left block
  const x = 0.06 * TEX_W;
  const maxW = 0.68 * TEX_W;
  c.fillStyle = INK;
  let y = 0.62 * TEX_H;
  fitFont(c, 'BRONZE AWARD', 600, 64, maxW);
  c.fillText('BRONZE AWARD', x, y);
  y += 70;
  fitFont(c, 'DESIGN / CUSTOMER / USER EXPERIENCE', 600, 34, maxW);
  c.fillText('DESIGN / CUSTOMER / USER EXPERIENCE', x, y);
  y += 46;
  fitFont(c, 'KAHF DECODE', 400, 34, maxW);
  c.fillText('KAHF DECODE', x, y);

  // Vertical engraving along the right edge, reading top to bottom
  const vertical = (draw) => {
    for (const ctx of [c, b]) {
      ctx.save();
      ctx.textBaseline = 'alphabetic';
    }
    draw();
    c.restore();
    b.restore();
  };

  vertical(() => {
    const top = 0.07 * TEX_H;
    fitFont(c, 'SMARTIES', 600, 400, 0.86 * TEX_H);
    for (const ctx of [c, b]) {
      ctx.translate(0.795 * TEX_W, top);
      ctx.rotate(Math.PI / 2);
    }
    emboss(c, b, 'SMARTIES', 0, 0);
  });

  vertical(() => {
    const top = 0.07 * TEX_H;
    fitFont(c, '2026 INDONESIA', 600, 40, 0.36 * TEX_H);
    for (const ctx of [c, b]) {
      ctx.translate(0.715 * TEX_W, top);
      ctx.rotate(Math.PI / 2);
    }
    c.fillStyle = INK;
    c.fillText('2026 INDONESIA', 0, 0);
    emboss(c, b, '2026 INDONESIA', 0, 0);
  });

  return p;
}

function drawSide() {
  const p = canvasPair();
  const { c, b } = p;
  fitFont(c, 'MMA', 600, 360, 0.62 * TEX_W);
  c.textAlign = 'center';
  c.textBaseline = 'middle';
  emboss(c, b, 'MMA', TEX_W * 0.52, TEX_H * 0.48);
  return p;
}

export default function AwardTrophy({ label }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    let cancelled = false;
    let cleanup = () => {};

    (async () => {
      const [THREE, { RoomEnvironment }] = await Promise.all([
        import('three'),
        import('three/examples/jsm/environments/RoomEnvironment.js'),
        document.fonts.load('600 64px Inter').catch(() => {}),
        document.fonts.load('400 34px Inter').catch(() => {}),
      ]);
      if (cancelled) return;

      const canvas = canvasRef.current;
      let renderer;
      try {
        renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
      } catch {
        canvas.hidden = true;
        return;
      }
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
      renderer.setClearColor(0x000000, 0);
      renderer.toneMapping = THREE.NeutralToneMapping;
      renderer.shadowMap.enabled = true;
      renderer.shadowMap.type = THREE.PCFShadowMap;

      const scene = new THREE.Scene();
      const pmrem = new THREE.PMREMGenerator(renderer);
      const envTexture = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
      scene.environment = envTexture;
      scene.environmentIntensity = 0.9;

      const camera = new THREE.PerspectiveCamera(26, 1, 0.1, 50);
      camera.position.set(0, 1.5, 6.6);
      camera.lookAt(0, -0.05, 0);

      const key = new THREE.DirectionalLight(0xffffff, 1.8);
      key.position.set(1.2, 7, 2.4);
      key.castShadow = true;
      key.shadow.mapSize.set(1024, 1024);
      key.shadow.radius = 6;
      key.shadow.bias = -0.0004;
      key.shadow.normalBias = 0.02;
      Object.assign(key.shadow.camera, { left: -2.2, right: 2.2, top: 2.2, bottom: -2.2, near: 0.5, far: 15 });
      scene.add(key);

      const anisotropy = renderer.capabilities.getMaxAnisotropy();
      const textures = [];
      const toTexture = (canvasEl, srgb) => {
        const t = new THREE.CanvasTexture(canvasEl);
        if (srgb) t.colorSpace = THREE.SRGBColorSpace;
        t.anisotropy = anisotropy;
        textures.push(t);
        return t;
      };

      const surface = { metalness: 0.65, roughness: 0.55 };
      const plain = new THREE.MeshStandardMaterial({ color: BRONZE, ...surface });
      const face = ({ color, bump }) =>
        new THREE.MeshStandardMaterial({
          color: BRONZE,
          ...surface,
          map: toTexture(color, true),
          bumpMap: toTexture(bump, false),
          bumpScale: 2.5,
        });
      const front = face(drawFront());
      const side = face(drawSide());
      const materials = [plain, front, side];

      const geometries = [];
      const trophy = new THREE.Group();
      const add = (geometry, material, x, y, z) => {
        const mesh = new THREE.Mesh(geometry, material);
        mesh.position.set(x, y, z);
        mesh.castShadow = true;
        mesh.receiveShadow = true;
        geometries.push(geometry);
        trophy.add(mesh);
      };

      // BoxGeometry material order: +x, -x, +y, -y, +z, -z
      add(new THREE.BoxGeometry(W, BASE_H, D), [side, plain, plain, plain, front, plain], 0, BASE_H / 2, 0);
      let y = BASE_H;
      for (let i = 0; i < TIERS; i++) {
        add(new THREE.BoxGeometry(W, SLOT_H, SPINE_D), plain, 0, y + SLOT_H / 2, -D / 2 + SPINE_D / 2);
        add(new THREE.CylinderGeometry(0.17, 0.17, SLOT_H, 48), plain, 0.05, y + SLOT_H / 2, -0.05);
        y += SLOT_H;
        add(new THREE.BoxGeometry(W, SLAB_H, D), plain, 0, y + SLAB_H / 2, 0);
        y += SLAB_H;
      }
      trophy.position.y = -H / 2;
      trophy.rotation.y = -Math.PI / 5;
      scene.add(trophy);

      const groundGeometry = new THREE.PlaneGeometry(8, 8);
      const groundMaterial = new THREE.ShadowMaterial({ opacity: 0.12 });
      const ground = new THREE.Mesh(groundGeometry, groundMaterial);
      ground.rotation.x = -Math.PI / 2;
      ground.position.y = -H / 2;
      ground.receiveShadow = true;
      scene.add(ground);
      geometries.push(groundGeometry);
      materials.push(groundMaterial);

      const resize = () => {
        const { clientWidth: w, clientHeight: h } = canvas;
        if (!w || !h) return;
        renderer.setSize(w, h, false);
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
      };
      const ro = new ResizeObserver(resize);
      ro.observe(canvas);
      resize();

      // Horizontal drag spins it; vertical swipes still scroll the page (touch-action: pan-y)
      const autoSpeed = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : AUTO_SPEED;
      let dragging = false;
      let lastX = 0;
      let lastMoveAt = 0;
      let velocity = 0;
      const onDown = (e) => {
        dragging = true;
        lastX = e.clientX;
        lastMoveAt = performance.now();
        velocity = 0;
        canvas.setPointerCapture(e.pointerId);
        canvas.style.cursor = 'grabbing';
      };
      const onMove = (e) => {
        if (!dragging) return;
        const now = performance.now();
        const step = (e.clientX - lastX) * DRAG_SPEED;
        trophy.rotation.y += step;
        velocity = step / Math.max((now - lastMoveAt) / 1000, 1 / 120);
        lastX = e.clientX;
        lastMoveAt = now;
      };
      const onUp = () => {
        if (!dragging) return;
        dragging = false;
        // no fling if the pointer was held still before release
        if (performance.now() - lastMoveAt > 80) velocity = 0;
        velocity = Math.max(-MAX_FLING, Math.min(MAX_FLING, velocity));
        canvas.style.cursor = '';
      };
      canvas.addEventListener('pointerdown', onDown);
      canvas.addEventListener('pointermove', onMove);
      canvas.addEventListener('pointerup', onUp);
      canvas.addEventListener('pointercancel', onUp);

      let raf = 0;
      let last = 0;
      const tick = (t) => {
        const dt = last ? Math.min((t - last) / 1000, 0.05) : 0;
        last = t;
        if (!dragging) {
          trophy.rotation.y += (autoSpeed + velocity) * dt;
          velocity *= Math.pow(0.04, dt);
        }
        renderer.render(scene, camera);
        raf = requestAnimationFrame(tick);
      };
      const start = () => { if (!raf) { last = 0; raf = requestAnimationFrame(tick); } };
      const stop = () => { cancelAnimationFrame(raf); raf = 0; };

      const io = new IntersectionObserver(([entry]) => (entry.isIntersecting ? start() : stop()));
      io.observe(canvas);

      cleanup = () => {
        stop();
        io.disconnect();
        ro.disconnect();
        canvas.removeEventListener('pointerdown', onDown);
        canvas.removeEventListener('pointermove', onMove);
        canvas.removeEventListener('pointerup', onUp);
        canvas.removeEventListener('pointercancel', onUp);
        geometries.forEach((g) => g.dispose());
        materials.forEach((m) => m.dispose());
        textures.forEach((t) => t.dispose());
        envTexture.dispose();
        pmrem.dispose();
        renderer.dispose();
      };
    })();

    return () => {
      cancelled = true;
      cleanup();
    };
  }, []);

  return <canvas ref={canvasRef} className={styles.canvas} role="img" aria-label={label} />;
}
