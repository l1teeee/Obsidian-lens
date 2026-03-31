import gsap from 'gsap';
import { useGSAP } from '../hooks/useGSAP';

export default function HeroText() {
  const ref = useGSAP<HTMLDivElement>(() => {
    const tl = gsap.timeline({ delay: 0.3 });

    tl.from('.hero-eyebrow', {
      y: 20,
      opacity: 0,
      duration: 0.8,
      ease: 'power3.out',
    })
      .from(
        '.hero-title-word',
        {
          y: 80,
          opacity: 0,
          duration: 1,
          stagger: 0.20,
          ease: 'power3.out',
        },
        '-=0.5',
      )
      .from(
        '.hero-sub',
        { y: 20, opacity: 0, duration: 0.8, ease: 'power3.out' },
        '-=0.6',
      )
      .from(
        '.hero-cta',
        { y: 20, opacity: 0, duration: 0.8, ease: 'power3.out' },
        '-=0.5',
      );
  });

  return (
    <div
      ref={ref}
      className="relative z-10 flex flex-col items-center text-center px-8 pointer-events-none"
    >
      <p className="hero-eyebrow text-[0.68rem] tracking-[0.28em] uppercase text-white/30 mb-10 font-medium">
        Motion · Design · Experience
      </p>

      <h1 className="flex flex-col items-center leading-[0.88] tracking-[-0.04em] font-black mb-8 select-none">
        <span className="hero-title-word text-[clamp(4.5rem,13vw,11rem)] text-white">
          Noir
        </span>
        <span className="hero-title-word hero-title-outline text-[clamp(4.5rem,13vw,11rem)]">
          Motion
        </span>
      </h1>

      <p className="hero-sub text-[clamp(0.875rem,1.4vw,1rem)] text-white/35 max-w-[380px] leading-relaxed mb-12">
        Cinematic interfaces built with light, shadow,
        and&nbsp;intentional motion.
      </p>

      <a
        href="#work"
        data-cursor-hover
        className="hero-cta pointer-events-auto inline-flex items-center gap-3 px-8 py-3.5 border border-white/20 text-white/60 text-xs tracking-[0.18em] uppercase hover:bg-white hover:text-black transition-colors duration-500"
      >
        View Work
        <svg width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden="true">
          <path
            d="M2 6.5h9M7.5 3l3.5 3.5L7.5 10"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </a>
    </div>
  );
}
