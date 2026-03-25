import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function HeroSection() {
  const line1Ref = useRef<HTMLDivElement>(null);
  const line2Ref = useRef<HTMLDivElement>(null);
  const metaRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.2 });

    tl.from(line1Ref.current, {
      y: '110%',
      duration: 1.3,
      ease: 'power4.out',
    })
      .from(
        line2Ref.current,
        {
          y: '110%',
          duration: 1.3,
          ease: 'power4.out',
        },
        '-=1.05'
      )
      .from(
        metaRef.current,
        {
          opacity: 0,
          y: 16,
          duration: 1,
          ease: 'power3.out',
        },
        '-=0.6'
      )
      .from(
        scrollRef.current,
        {
          opacity: 0,
          duration: 1,
          ease: 'power2.out',
        },
        '-=0.5'
      );

    return () => { tl.kill(); };
  }, []);

  return (
    <div className="relative z-10 w-full h-full flex flex-col justify-end pb-[10vh] px-8 md:px-14 pointer-events-none">
      {/* Title */}
      <div className="flex flex-col">
        {/* Line 1 — left-aligned */}
        <div className="overflow-hidden">
          <div
            ref={line1Ref}
            className="text-[clamp(5.5rem,17vw,20rem)] font-black leading-[0.82] tracking-[-0.04em] text-white"
          >
            NOIR
          </div>
        </div>

        {/* Line 2 — right-aligned */}
        <div className="overflow-hidden">
          <div
            ref={line2Ref}
            className="text-[clamp(5.5rem,17vw,20rem)] font-black leading-[0.82] tracking-[-0.04em] text-white text-right"
          >
            MOTION
          </div>
        </div>
      </div>

      {/* Meta row */}
      <div ref={metaRef} className="flex items-end justify-between mt-10">
        <p className="text-white/20 text-[0.6rem] tracking-[0.28em] uppercase leading-[1.8] max-w-[200px]">
          Cinematic design<br />Digital experiences
        </p>
        <p className="hidden md:block text-white/15 text-[0.6rem] tracking-[0.22em] uppercase">
          Studio · Est. 2016
        </p>
      </div>

      {/* Scroll line */}
      <div
        ref={scrollRef}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-white/15 text-[0.55rem] tracking-[0.3em] uppercase">Scroll</span>
        <div className="w-px h-10 bg-gradient-to-b from-white/20 to-transparent" />
      </div>
    </div>
  );
}
