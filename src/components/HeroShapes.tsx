import { useEffect, useRef } from 'react';
import gsap from 'gsap';

// ─────────────────────────────────────────────────────────────────────────────
// ElegantShape — thin frosted ellipse.
// Entrance: falls from above (y: -150) with expo ease, same feel as the
// original framer-motion component.  Float: gentle infinite yoyo via GSAP.
// ─────────────────────────────────────────────────────────────────────────────
interface ShapeProps {
  delay?: number;
  width?: number;
  height?: number;
  rotate?: number;
  gradient?: string;
  style?: React.CSSProperties;
}

function ElegantShape({
  delay = 0,
  width = 400,
  height = 100,
  rotate = 0,
  gradient = 'from-white/[0.05]',
  style = {},
}: ShapeProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // ── Entrance: drop from above ──────────────────────────
    gsap.fromTo(
      el,
      { autoAlpha: 0, y: -150, rotation: rotate - 15 },
      {
        autoAlpha: 1,
        y: 0,
        rotation: rotate,
        duration: 2.4,
        delay,
        ease: 'expo.out',
        clearProps: 'rotation', // keep final rotation via inline style
      },
    );

    // ── Infinite float (starts after entrance) ────────────
    gsap.to(el, {
      y: 15,
      duration: 6,
      ease: 'power1.inOut',
      yoyo: true,
      repeat: -1,
      delay: delay + 0.6,
    });

    return () => { gsap.killTweensOf(el); };
  }, [delay, rotate]);

  return (
    <div
      ref={ref}
      className="absolute pointer-events-none"
      style={{ width, height, rotate: `${rotate}deg`, ...style }}
    >
      <div
        className={[
          'absolute inset-0 rounded-full',
          'bg-gradient-to-r to-transparent',
          gradient,
          'backdrop-blur-[2px] border border-white/[0.08]',
          'shadow-[0_8px_32px_0_rgba(255,255,255,0.04)]',
          'after:absolute after:inset-0 after:rounded-full',
          'after:bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.06),transparent_70%)]',
        ].join(' ')}
      />
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// HeroShapes — six floating frosted ellipses layered at z-[2]
// Positioned to frame the NOIR / MOTION title without covering it
// ─────────────────────────────────────────────────────────────────────────────
export default function HeroShapes() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-[2]">

      {/* Large — top-left diagonal */}
      <ElegantShape
        delay={0.3}
        width={580}
        height={130}
        rotate={12}
        gradient="from-white/[0.05]"
        style={{ left: '-8%', top: '18%' }}
      />

      {/* Mid — bottom-right */}
      <ElegantShape
        delay={0.5}
        width={480}
        height={110}
        rotate={-15}
        gradient="from-white/[0.04]"
        style={{ right: '-4%', bottom: '18%' }}
      />

      {/* Small — bottom-left counter-rotated */}
      <ElegantShape
        delay={0.4}
        width={280}
        height={72}
        rotate={-8}
        gradient="from-white/[0.035]"
        style={{ left: '6%', bottom: '12%' }}
      />

      {/* Accent — top-right */}
      <ElegantShape
        delay={0.65}
        width={200}
        height={55}
        rotate={22}
        gradient="from-white/[0.04]"
        style={{ right: '18%', top: '12%' }}
      />

      {/* Tiny — near top-center */}
      <ElegantShape
        delay={0.75}
        width={140}
        height={38}
        rotate={-28}
        gradient="from-white/[0.03]"
        style={{ left: '28%', top: '8%' }}
      />

      {/* Extra — mid-right depth layer */}
      <ElegantShape
        delay={0.9}
        width={340}
        height={80}
        rotate={6}
        gradient="from-white/[0.025]"
        style={{ right: '5%', top: '38%' }}
      />
    </div>
  );
}
