"use client";

import { useEffect, useRef } from "react";
import "@/styles/ParallaxSpaceBackground.css";

type Star = {
  x: number;
  y: number;
  r: number;
  a: number;
  depth: number;
  tw: number;
};

function clamp(value: number, min: number, max: number) {
  return Math.max(min, Math.min(max, value));
}

export default function ParallaxSpaceBackground({
  introMs = 2000,
  settleMs = 700,
  onIntroComplete,
}: {
  introMs?: number;
  settleMs?: number;
  onIntroComplete?: () => void;
}) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const nebulaRef = useRef<HTMLDivElement | null>(null);
  const starsRef = useRef<Star[] | null>(null);
  const introMsRef = useRef(introMs);
  const settleMsRef = useRef(settleMs);
  const onIntroCompleteRef = useRef(onIntroComplete);

  useEffect(() => {
    introMsRef.current = introMs;
    settleMsRef.current = settleMs;
    onIntroCompleteRef.current = onIntroComplete;
  }, [introMs, settleMs, onIntroComplete]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const nebula = nebulaRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Generate stars once on mount (keeps render pure)
    if (!starsRef.current) {
      const count = 800;
      const items: Star[] = [];

      for (let i = 0; i < count; i++) {
        const depth = Math.pow(Math.random(), 1.7); // bias toward far stars
        items.push({
          x: Math.random(),
          y: Math.random(),
          r: 0.6 + depth * 1.2,
          a: 0.10 + depth * 0.35,
          depth,
          tw: Math.random() * Math.PI * 2,
        });
      }

      starsRef.current = items;
    }

    const stars = starsRef.current;

    const state = {
      t: 0,
      mx: 0,
      my: 0,
      tx: 0,
      ty: 0,
      w: 0,
      h: 0,
      start: 0,
      introDone: false,
    };

    const resize = () => {
      const dpr = Math.max(1, Math.min(2, window.devicePixelRatio || 1));
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;

      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);

      state.w = width;
      state.h = height;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const onMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      const nx = (e.clientX - rect.left) / rect.width;
      const ny = (e.clientY - rect.top) / rect.height;
      state.tx = clamp((nx - 0.5) * 2, -1, 1);
      state.ty = clamp((ny - 0.5) * 2, -1, 1);
    };

    const draw = (now: number) => {
      if (state.start === 0) state.start = now;
      const elapsed = now - state.start;

      state.t += 0.016;

      // smooth mouse = premium feel
      state.mx += (state.tx - state.mx) * 0.06;
      state.my += (state.ty - state.my) * 0.06;

      // move nebula subtly; ramp in during intro/settle
      if (nebula) {
        const introMsValue = introMsRef.current;
        const settleMsValue = settleMsRef.current;
        const totalRamp = Math.max(1, introMsValue + settleMsValue);
        const introFactor = clamp(elapsed / totalRamp, 0, 1);
        const nX = state.mx * 14 * introFactor;
        const nY = state.my * 10 * introFactor;
        nebula.style.transform = `translate3d(${nX}px, ${nY}px, 0)`;
      }

      ctx.clearRect(0, 0, state.w, state.h);

      const introMsValue = Math.max(0, introMsRef.current);
      const settleMsValue = Math.max(0, settleMsRef.current);
      const inIntro = introMsValue > 0 && elapsed < introMsValue;
      const inSettle = settleMsValue > 0 && elapsed >= introMsValue && elapsed < introMsValue + settleMsValue;

      if (inIntro) {
        // Hyperdrive: streak stars to the right for introMs
        const p = clamp(elapsed / introMsValue, 0, 1);
        const easeOut = 1 - Math.pow(1 - p, 3);
        const speed = 1200 * (1 - easeOut) + 240; // px/sec, decelerates
        const streak = 10 + 70 * (1 - easeOut);

        for (const s of stars) {
          const baseX = s.x * state.w;
          const y = s.y * state.h;

          // Different depths streak differently
          const depthBoost = 0.35 + s.depth;
          const x = (baseX + (elapsed / 1000) * speed * depthBoost) % state.w;

          const alpha = (s.a + 0.08) * (0.55 + 0.45 * (1 - s.depth));
          const len = streak * depthBoost;

          ctx.beginPath();
          ctx.strokeStyle = `rgba(220, 232, 255, ${alpha.toFixed(4)})`;
          ctx.lineWidth = Math.max(1, s.r);
          ctx.lineCap = "round";
          ctx.moveTo(x - len, y);
          ctx.lineTo(x, y);
          ctx.stroke();
        }
      } else {
        const maxOffset = 18;

        if (inSettle) {
          // Crossfade: streaks -> dots, parallax ramps in
          const p = clamp((elapsed - introMsValue) / Math.max(1, settleMsValue), 0, 1);
          const ease = 1 - Math.pow(1 - p, 3);
          const streakAlphaMul = 1 - ease;
          const starAlphaMul = ease;
          const parallaxMul = ease;

          // fading streak remnants
          const speed = 240; // much slower now
          const streak = 20 * (1 - ease) + 6;

          for (const s of stars) {
            const baseX = s.x * state.w;
            const y = s.y * state.h;
            const depthBoost = 0.35 + s.depth;
            const x = (baseX + (elapsed / 1000) * speed * depthBoost) % state.w;

            const alpha = (s.a + 0.06) * 0.6 * streakAlphaMul;
            if (alpha <= 0.001) continue;

            const len = streak * depthBoost;
            ctx.beginPath();
            ctx.strokeStyle = `rgba(220, 232, 255, ${alpha.toFixed(4)})`;
            ctx.lineWidth = Math.max(1, s.r);
            ctx.lineCap = "round";
            ctx.moveTo(x - len, y);
            ctx.lineTo(x, y);
            ctx.stroke();
          }

          // fading-in dots
          for (const s of stars) {
            const ox = state.mx * maxOffset * s.depth * parallaxMul;
            const oy = state.my * maxOffset * s.depth * parallaxMul;

            const x = s.x * state.w + ox;
            const y = s.y * state.h + oy;

            const tw = 1 + Math.sin(state.t + s.tw) * 0.08 * (1 - s.depth);
            const alpha = s.a * tw * starAlphaMul;
            if (alpha <= 0.001) continue;

            ctx.beginPath();
            ctx.fillStyle = `rgba(220, 232, 255, ${alpha.toFixed(4)})`;
            ctx.arc(x, y, s.r, 0, Math.PI * 2);
            ctx.fill();
          }
        } else {
          // Normal parallax
          for (const s of stars) {
            const ox = state.mx * maxOffset * s.depth;
            const oy = state.my * maxOffset * s.depth;

            const x = s.x * state.w + ox;
            const y = s.y * state.h + oy;

            const tw = 1 + Math.sin(state.t + s.tw) * 0.08 * (1 - s.depth);
            const alpha = s.a * tw;

            ctx.beginPath();
            ctx.fillStyle = `rgba(220, 232, 255, ${alpha.toFixed(4)})`;
            ctx.arc(x, y, s.r, 0, Math.PI * 2);
            ctx.fill();
          }

          if (!state.introDone) {
            state.introDone = true;
            onIntroCompleteRef.current?.();
          }
        }
      }

      requestAnimationFrame(draw);
    };

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", onMove, { passive: true });

    const raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMove);
    };
  }, []);

  return (
    <div className="psb" aria-hidden>
      <canvas ref={canvasRef} className="psb__stars" />
      <div ref={nebulaRef} className="psb__nebula" />
      <div className="psb__vignette" />
      <div className="psb__grain" />
    </div>
  );
}
