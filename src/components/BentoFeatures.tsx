import { useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { useGSAP } from '../hooks/useGSAP';

gsap.registerPlugin(ScrollTrigger);

// ── Inline SVG icons ───────────────────────────────────────────
const IconPen = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 20h9M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z"/>
  </svg>
);
const IconZap = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
  </svg>
);
const IconEye = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>
  </svg>
);
const IconCode = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>
  </svg>
);
const IconLayers = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/>
  </svg>
);
const IconGlobe = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/>
    <path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/>
  </svg>
);

const CARDS = [
  {
    id: '01',
    title: 'Design',
    body: 'Every pixel carries intention. Visual systems engineered for maximum impact with zero noise.',
    tags: ['Systems', 'Typography', 'Visual Language'],
    icon: IconPen,
    span: 'md:col-span-2',
    status: 'Core',
    accent: 'rgba(255,255,255,0.06)',
  },
  {
    id: '02',
    title: 'Motion',
    body: 'Animations that amplify meaning — performance-first, choreographed for clarity and delight.',
    tags: ['GSAP', 'Three.js', 'Lenis'],
    icon: IconZap,
    span: 'md:col-span-1',
    status: 'Signature',
    accent: 'rgba(255,255,255,0.04)',
  },
  {
    id: '03',
    title: 'Experience',
    body: 'Interactions designed around humans. Intuitive, immediate, and frictionless by default.',
    tags: ['UX', 'Interaction', 'Accessibility'],
    icon: IconEye,
    span: 'md:col-span-1',
    status: 'Core',
    accent: 'rgba(255,255,255,0.04)',
  },
  {
    id: '04',
    title: 'Craft',
    body: 'No shortcuts. Clean code, clean aesthetics — executed from concept through deployment.',
    tags: ['React', 'Astro', 'Performance'],
    icon: IconCode,
    span: 'md:col-span-2',
    status: 'Core',
    accent: 'rgba(255,255,255,0.06)',
  },
  {
    id: '05',
    title: 'Systems',
    body: 'Scalable design systems built once, deployed everywhere. Tokens, components, documentation.',
    tags: ['Tokens', 'Storybook', 'Scale'],
    icon: IconLayers,
    span: 'md:col-span-1 md:row-span-2',
    status: 'New',
    accent: 'rgba(255,255,255,0.05)',
    tall: true,
  },
  {
    id: '06',
    title: 'Global',
    body: 'Work that crosses borders — i18n, RTL, accessibility, and cultural sensitivity built in from day one.',
    tags: ['i18n', 'a11y', 'RTL'],
    icon: IconGlobe,
    span: 'md:col-span-2',
    status: 'Core',
    accent: 'rgba(255,255,255,0.04)',
  },
] as const;

export default function BentoFeatures() {
  const cardRefs = useRef<(HTMLElement | null)[]>([]);

  const ref = useGSAP<HTMLElement>(() => {
    // ── Section heading ─────────────────────────────────────
    const headTl = gsap.timeline({
      scrollTrigger: {
        trigger: '#bento',
        start: 'top 80%',
        toggleActions: 'play none none reverse',
      },
    });

    headTl
      .from('.bento-eyebrow', { opacity: 0, y: 10, duration: 0.8, ease: 'power2.out' })
      .from('.bento-title span', {
        y: '110%',
        duration: 1.1,
        stagger: 0.05,
        ease: 'expo.out',
      }, '-=0.5')
      .from('.bento-sub', { opacity: 0, y: 16, duration: 0.9, ease: 'power2.out' }, '-=0.6');

    // ── Cards stagger in with autoAlpha + y + scale ─────────
    gsap.from('.bento-card', {
      autoAlpha: 0,
      y: 50,
      scale: 0.96,
      duration: 1.1,
      stagger: {
        amount: 0.55,
        from: 'start',
      },
      ease: 'expo.out',
      scrollTrigger: {
        trigger: '.bento-grid',
        start: 'top 78%',
        toggleActions: 'play none none reverse',
      },
    });

    // ── Floating icon loops per card ─────────────────────────
    gsap.utils.toArray<HTMLElement>('.bento-icon').forEach((icon, i) => {
      const animations = [
        { y: -6, duration: 3.2 },
        { y: -5, duration: 2.8, rotation: 5 },
        { scale: 1.12, duration: 2.5 },
        { y: -4, duration: 3.8 },
        { rotation: 8, duration: 4 },
        { y: -5, scale: 1.08, duration: 3.5 },
      ];
      const anim = animations[i % animations.length];
      gsap.to(icon, {
        ...anim,
        ease: 'power1.inOut',
        yoyo: true,
        repeat: -1,
        delay: i * 0.3,
      });
    });

    // ── Card border glow on hover ───────────────────────────
    gsap.utils.toArray<HTMLElement>('.bento-card').forEach((card) => {
      const glow = card.querySelector<HTMLElement>('.bento-glow');
      if (!glow) return;

      card.addEventListener('mouseenter', () => {
        gsap.to(glow, { opacity: 1, duration: 0.4, ease: 'power2.out' });
        gsap.to(card, { y: -4, duration: 0.4, ease: 'power2.out' });
      });
      card.addEventListener('mouseleave', () => {
        gsap.to(glow, { opacity: 0, duration: 0.5, ease: 'power2.inOut' });
        gsap.to(card, { y: 0, duration: 0.5, ease: 'power2.inOut' });
      });
    });
  }, []);

  return (
    <section id="bento" ref={ref} className="py-40 px-8 md:px-14 bg-black overflow-hidden">

      {/* ── Heading ─────────────────────────────────────────── */}
      <div className="mb-20 max-w-4xl">
        <span className="bento-eyebrow block text-[0.62rem] tracking-[0.38em] uppercase text-white/20 mb-8 font-medium">
          Capabilities
        </span>
        <h2
          className="bento-title overflow-hidden leading-[0.87] tracking-[-0.05em] font-black text-white mb-8"
          style={{ fontSize: 'clamp(3.5rem, 8vw, 7.5rem)' }}
        >
          {'Built\u00a0different.'.split('').map((ch, i) => (
            <span key={i} className="inline-block" style={{ whiteSpace: ch === '\u00a0' ? 'pre' : 'normal' }}>
              {ch}
            </span>
          ))}
        </h2>
        <p className="bento-sub text-[0.95rem] text-white/30 leading-relaxed max-w-[460px]">
          A precise set of disciplines — each executed to the standard the work demands.
        </p>
      </div>

      {/* ── Bento grid ──────────────────────────────────────── */}
      <div className="bento-grid grid grid-cols-1 md:grid-cols-3 gap-3 auto-rows-[minmax(220px,auto)]">
        {CARDS.map((card, i) => {
          const Icon = card.icon;
          return (
            <article
              key={card.id}
              className={`bento-card group relative overflow-hidden rounded-xl border border-white/[0.07] p-8 flex flex-col justify-between transition-colors duration-500 ${card.span}`}
              style={{ background: `radial-gradient(ellipse 80% 60% at 10% 0%, ${card.accent}, rgba(0,0,0,0.9))` }}
              data-cursor-hover
            >
              {/* Hover border glow */}
              <div
                className="bento-glow absolute inset-0 rounded-xl pointer-events-none opacity-0"
                style={{
                  background: 'radial-gradient(circle at 50% 0%, rgba(255,255,255,0.05) 0%, transparent 70%)',
                  border: '1px solid rgba(255,255,255,0.14)',
                }}
              />

              {/* Dot pattern overlay */}
              <div
                className="absolute inset-0 pointer-events-none rounded-xl opacity-[0.3]"
                style={{
                  backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.08) 1px, transparent 1px)',
                  backgroundSize: '20px 20px',
                  maskImage: 'radial-gradient(ellipse 60% 50% at 50% 0%, black 30%, transparent 100%)',
                }}
              />

              {/* Top row */}
              <div className="relative z-10 flex items-start justify-between mb-8">
                <div
                  className="bento-icon flex items-center justify-center w-10 h-10 rounded-full border border-white/10 text-white/50"
                >
                  <Icon />
                </div>

                <div className="flex items-center gap-2">
                  {card.status === 'New' && (
                    <span className="text-[0.52rem] tracking-[0.22em] uppercase px-2 py-0.5 rounded-full border border-white/15 text-white/40 font-medium">
                      New
                    </span>
                  )}
                  {card.status === 'Signature' && (
                    <span className="text-[0.52rem] tracking-[0.22em] uppercase px-2 py-0.5 rounded-full bg-white/[0.06] border border-white/10 text-white/35">
                      Signature
                    </span>
                  )}
                  <span className="text-[0.58rem] font-mono text-white/15 tracking-widest">{card.id}</span>
                </div>
              </div>

              {/* Content */}
              <div className="relative z-10 flex flex-col gap-4">
                <h3
                  className="font-bold tracking-[-0.03em] text-white leading-tight"
                  style={{ fontSize: 'clamp(1.5rem, 2.5vw, 2rem)' }}
                >
                  {card.title}
                </h3>
                <p className="text-[0.82rem] text-white/30 leading-[1.8]">
                  {card.body}
                </p>
                <div className="flex flex-wrap gap-2 pt-2">
                  {card.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[0.56rem] tracking-[0.18em] uppercase text-white/20 border border-white/[0.07] px-2.5 py-1 rounded-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
