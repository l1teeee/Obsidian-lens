import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { useGSAP } from '../hooks/useGSAP';

gsap.registerPlugin(ScrollTrigger);

const FEATURES = [
  {
    number: '01',
    title: 'Design',
    description:
      'Every pixel carries intention. Visual systems engineered for maximum impact with zero noise.',
    tags: ['Systems', 'Typography', 'Visual Language'],
  },
  {
    number: '02',
    title: 'Motion',
    description:
      'Animations that amplify meaning — performance-first, choreographed for clarity and delight.',
    tags: ['GSAP', 'Three.js', 'Lenis'],
  },
  {
    number: '03',
    title: 'Experience',
    description:
      'Interactions designed around humans. Intuitive, immediate, and frictionless by default.',
    tags: ['UX', 'Interaction', 'Accessibility'],
  },
  {
    number: '04',
    title: 'Craft',
    description:
      'No shortcuts. Clean code, clean aesthetics — executed from concept through deployment.',
    tags: ['React', 'Astro', 'Performance'],
  },
] as const;

export default function FeaturesGrid() {
  const ref = useGSAP<HTMLElement>(() => {
    gsap.from('.features-heading', {
      y: 40,
      opacity: 0,
      duration: 1.1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.features-heading',
        start: 'top 82%',
        toggleActions: 'play none none reverse',
      },
    });

    gsap.from('.feature-card', {
      y: 56,
      opacity: 0,
      duration: 1,
      stagger: 0.1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.features-grid',
        start: 'top 78%',
        toggleActions: 'play none none reverse',
      },
    });
  });

  return (
    <section ref={ref} className="py-40 px-[5vw] bg-black">

      {/* Heading block */}
      <div className="features-heading mb-24">
        <span className="block text-[0.62rem] tracking-[0.34em] uppercase text-white/20 mb-6 font-medium">
          Capabilities
        </span>
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8">
          <h2 className="text-[clamp(3.5rem,8vw,7.5rem)] font-black tracking-[-0.045em] leading-[0.86] text-white">
            Built<br />different.
          </h2>
          <div className="md:pb-3 flex flex-col gap-4 md:max-w-[280px]">
            <p className="text-[0.85rem] text-white/30 leading-relaxed">
              A precise set of disciplines — each one executed to a standard the work demands.
            </p>
            <div className="flex items-center gap-3">
              <div className="w-6 h-px bg-white/15" />
              <span className="text-[0.6rem] tracking-[0.22em] uppercase text-white/20">
                4 Disciplines
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="w-full h-px bg-white/[0.07] mb-0" />

      {/* Grid */}
      <div className="features-grid grid grid-cols-1 md:grid-cols-2">
        {FEATURES.map((f, i) => (
          <div
            key={f.number}
            className="feature-card group relative overflow-hidden"
            style={{
              borderBottom: '1px solid rgba(255,255,255,0.07)',
              borderRight: i % 2 === 0 ? '1px solid rgba(255,255,255,0.07)' : 'none',
            }}
            data-cursor-hover
          >
            {/* Ghost number — large backdrop */}
            <div
              className="absolute bottom-0 right-6 font-black font-mono leading-none select-none pointer-events-none"
              style={{
                fontSize: 'clamp(7rem, 12vw, 11rem)',
                color: 'rgba(255,255,255,0.025)',
                letterSpacing: '-0.06em',
                lineHeight: '0.85',
              }}
              aria-hidden="true"
            >
              {f.number}
            </div>

            {/* Content */}
            <div
              className="relative z-10 flex flex-col gap-8 py-16"
              style={{
                paddingLeft: i % 2 === 0 ? '0' : 'clamp(1.5rem, 5vw, 4rem)',
                paddingRight: i % 2 === 0 ? 'clamp(1.5rem, 5vw, 4rem)' : '0',
              }}
            >
              {/* Number + line */}
              <div className="flex items-center gap-4">
                <span className="text-[0.58rem] tracking-[0.22em] text-white/20 font-mono">
                  {f.number}
                </span>
                <div className="h-px bg-white/[0.08] flex-1" />
              </div>

              {/* Title */}
              <h3 className="text-[clamp(2rem,3.5vw,3rem)] font-bold tracking-[-0.035em] text-white leading-tight">
                {f.title}
              </h3>

              {/* Description */}
              <p className="text-[0.9rem] text-white/35 leading-[1.75] max-w-[34ch]">
                {f.description}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 pt-2">
                {f.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[0.58rem] tracking-[0.18em] uppercase text-white/20 border border-white/[0.08] px-2.5 py-1"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Hover fill */}
            <div
              className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700"
              style={{ background: 'rgba(255,255,255,0.015)' }}
            />
          </div>
        ))}
      </div>

      {/* Bottom divider */}
      <div className="w-full h-px bg-white/[0.07]" />
    </section>
  );
}
