import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '../hooks/useGSAP';

const ROW_A = ['NOIR', 'MOTION', 'DESIGN', 'CRAFT', 'VISION', 'EXPERIENCE', 'NOIR', 'MOTION', 'DESIGN', 'CRAFT', 'VISION', 'EXPERIENCE'];
const ROW_B = ['IDENTITY', 'ANIMATION', 'SYSTEMS', '3D', 'INTERFACE', 'BRAND', 'IDENTITY', 'ANIMATION', 'SYSTEMS', '3D', 'INTERFACE', 'BRAND'];

export default function MarqueeTrack() {
  const trackARef = useRef<HTMLDivElement>(null);
  const trackBRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const a = trackARef.current;
    const b = trackBRef.current;
    if (!a || !b) return;

    gsap.to(a, { x: -(a.scrollWidth / 2), duration: 30, ease: 'none', repeat: -1 });
    gsap.to(b, { x: (b.scrollWidth / 2) * -1, duration: 38, ease: 'none', repeat: -1, startAt: { x: -(b.scrollWidth / 2) } });
  }, []);

  return (
    <div className="overflow-hidden py-0 border-t border-white/[0.06]">
      {/* Row A — left */}
      <div className="py-5 border-b border-white/[0.04]">
        <div ref={trackARef} className="marquee-track">
          {ROW_A.map((word, i) => (
            <span
              key={i}
              className="inline-flex items-center gap-10 pr-10 flex-shrink-0 select-none"
            >
              <span
                className={`text-[clamp(2.4rem,5.5vw,4.8rem)] font-black tracking-[-0.04em] uppercase leading-none ${
                  i % 3 === 1 ? 'text-transparent' : 'text-white/[0.09]'
                }`}
                style={
                  i % 3 === 1
                    ? { WebkitTextStroke: '1px rgba(255,255,255,0.12)' }
                    : undefined
                }
              >
                {word}
              </span>
              <span className="text-white/[0.06] text-xl" aria-hidden="true">◆</span>
            </span>
          ))}
        </div>
      </div>

      {/* Row B — right (reverse start) */}
      <div className="py-5 border-b border-white/[0.06]">
        <div ref={trackBRef} className="marquee-track">
          {ROW_B.map((word, i) => (
            <span
              key={i}
              className="inline-flex items-center gap-10 pr-10 flex-shrink-0 select-none"
            >
              <span
                className={`text-[clamp(2.4rem,5.5vw,4.8rem)] font-black tracking-[-0.04em] uppercase leading-none ${
                  i % 3 === 0 ? 'text-transparent' : 'text-white/[0.07]'
                }`}
                style={
                  i % 3 === 0
                    ? { WebkitTextStroke: '1px rgba(255,255,255,0.09)' }
                    : undefined
                }
              >
                {word}
              </span>
              <span className="text-white/[0.05] text-xl" aria-hidden="true">◆</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
