import { useMotionValueEvent, useReducedMotion, useScroll } from 'motion/react';
import { useCallback, useEffect, useRef, useState } from 'react';

const FRAMES = 150;

/**
 * An illustration of the Break Down technique, drawn on an HTML canvas:
 * a strip of 150 "frames" whose playhead follows page scroll (or the pointer).
 * Not a screenshot of the real site.
 */
export function FrameScrubber({ compact = false }: { compact?: boolean }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduce = useReducedMotion();
  const [frame, setFrame] = useState(reduce ? 96 : 1);
  const pointerActive = useRef(false);
  const heights = useRef<number[]>(
    Array.from({ length: FRAMES }, (_, i) => {
      const t = i / FRAMES;
      return 0.28 + 0.34 * Math.abs(Math.sin(t * Math.PI * 3.2)) + 0.22 * Math.abs(Math.sin(t * Math.PI * 11.7 + 1.3)) * (0.6 + 0.4 * Math.cos(t * 5));
    }),
  );

  const { scrollYProgress } = useScroll({ target: wrapRef, offset: ['start end', 'end start'] });
  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    if (reduce || pointerActive.current) return;
    const eased = Math.min(1, Math.max(0, (v - 0.15) / 0.7));
    setFrame(Math.max(1, Math.round(eased * (FRAMES - 1)) + 1));
  });

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const { width, height } = canvas.getBoundingClientRect();
    if (canvas.width !== Math.round(width * dpr) || canvas.height !== Math.round(height * dpr)) {
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
    }
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, width, height);

    const gap = width > 520 ? 2 : 1.4;
    const barW = (width - gap * (FRAMES - 1)) / FRAMES;
    const mid = height / 2;
    heights.current.forEach((h, i) => {
      const x = i * (barW + gap);
      const bh = h * height * 0.9;
      const played = i < frame;
      const isHead = i === frame - 1;
      ctx.fillStyle = isHead ? '#34d1b0' : played ? 'rgba(255,255,255,0.88)' : 'rgba(255,255,255,0.16)';
      ctx.beginPath();
      ctx.roundRect(x, mid - bh / 2, Math.max(barW, 1), bh, Math.min(barW / 2, 2));
      ctx.fill();
    });
    // playhead line
    const px = (frame - 1) * (barW + gap) + barW / 2;
    ctx.fillStyle = 'rgba(52,209,176,0.9)';
    ctx.fillRect(px - 0.75, 0, 1.5, height);
  }, [frame]);

  useEffect(() => {
    draw();
  }, [draw]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ro = new ResizeObserver(() => draw());
    ro.observe(canvas);
    return () => ro.disconnect();
  }, [draw]);

  const onPointer = (e: React.PointerEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    const t = Math.min(1, Math.max(0, (e.clientX - r.left) / r.width));
    pointerActive.current = true;
    setFrame(Math.max(1, Math.round(t * (FRAMES - 1)) + 1));
  };

  return (
    <div ref={wrapRef} className="relative flex h-full w-full flex-col justify-between gap-4 bg-console p-5 text-white sm:p-6" aria-hidden="true">
      <div className="flex items-center justify-between gap-3 font-mono text-[12px] text-white/55">
        <span>canvas · scroll-synced</span>
        <span className="tabular-nums text-white/85">
          frame <span className="text-signal">{String(frame).padStart(3, '0')}</span> / {FRAMES}
        </span>
      </div>
      <div
        className="relative cursor-ew-resize touch-pan-y"
        style={{ height: compact ? 96 : 132 }}
        onPointerMove={onPointer}
        onPointerDown={onPointer}
        onPointerLeave={() => {
          pointerActive.current = false;
        }}
      >
        <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
      </div>
      <div className="flex items-center justify-between gap-3 text-[12.5px] text-white/50">
        <span>In Break Down, GSAP ScrollTrigger picks the frame</span>
        <span className="hidden sm:inline">scroll or drag</span>
      </div>
    </div>
  );
}
