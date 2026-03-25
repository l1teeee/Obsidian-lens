import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ITEMS = [
  {
    id: '01',
    title: 'Visual Systems',
    category: 'Design Systems',
    year: '2024',
    description: 'Coherent visual languages built from atomic principles.',
    image: 'https://picsum.photos/seed/noir-vs/600/900?grayscale',
    accent: '#6b6bcc',
  },
  {
    id: '02',
    title: 'Motion Design',
    category: 'Animation',
    year: '2024',
    description: 'Time-based craft that transforms still moments into narrative.',
    image: 'https://picsum.photos/seed/noir-md/600/900?grayscale',
    accent: '#cc4444',
  },
  {
    id: '03',
    title: 'Interface Craft',
    category: 'UI / UX',
    year: '2023',
    description: 'Interactions that feel inevitable — precise, invisible, alive.',
    image: 'https://picsum.photos/seed/noir-ic/600/900?grayscale',
    accent: '#c4a43a',
  },
  {
    id: '04',
    title: 'Brand Identity',
    category: 'Branding',
    year: '2023',
    description: 'Marks that carry meaning across every scale and surface.',
    image: 'https://picsum.photos/seed/noir-bi/600/900?grayscale',
    accent: '#aaaaaa',
  },
  {
    id: '05',
    title: 'Interactive 3D',
    category: 'WebGL / Three.js',
    year: '2024',
    description: 'Three-dimensional spaces that respond to human presence.',
    image: 'https://picsum.photos/seed/noir-3d/600/900?grayscale',
    accent: '#9955cc',
  },
] as const;

export default function GalleryScroll() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    const ctx = gsap.context(() => {
      const getScrollWidth = () => track.scrollWidth - section.offsetWidth;

      // Main horizontal scroll
      const tween = gsap.to(track, {
        x: () => -getScrollWidth(),
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: () => `+=${getScrollWidth()}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
          anticipatePin: 1,
        },
      });

      // Per-card entrance — scale + opacity only (no rotateY to avoid 3D conflicts)
      gsap.utils.toArray<HTMLElement>('.gallery-item', section).forEach((item) => {
        gsap.fromTo(
          item,
          { scale: 0.88, opacity: 0.25 },
          {
            scale: 1,
            opacity: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: item,
              containerAnimation: tween,
              start: 'left 92%',
              end: 'left 22%',
              scrub: true,
            },
          },
        );
      });

      // Hover interactions
      gsap.utils.toArray<HTMLElement>('.gallery-item', section).forEach((item) => {
        const img = item.querySelector<HTMLElement>('.card-img');
        const meta = item.querySelector<HTMLElement>('.card-meta');
        const cta = item.querySelector<HTMLElement>('.card-cta');

        const tl = gsap.timeline({ paused: true });
        tl.to(img, { scale: 1.07, duration: 0.7, ease: 'power3.out' }, 0)
          .to(meta, { y: -8, duration: 0.5, ease: 'power3.out' }, 0)
          .to(cta, { opacity: 1, y: 0, duration: 0.45, ease: 'power3.out' }, 0.06);

        item.addEventListener('mouseenter', () => tl.play());
        item.addEventListener('mouseleave', () => tl.reverse());
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="work"
      className="relative bg-black"
      style={{ overflow: 'hidden' }}
    >
      {/* Section label */}
      <div className="absolute top-10 left-[5vw] z-10 pointer-events-none">
        <p className="text-[0.6rem] tracking-[0.32em] uppercase text-white/25 font-medium">
          Selected Work
        </p>
      </div>

      {/* Card track */}
      <div
        ref={trackRef}
        className="flex items-center h-screen"
        style={{ paddingLeft: '12vw', paddingRight: '10vw', gap: '2vw' }}
      >
        {ITEMS.map((item) => (
          <div
            key={item.id}
            className="gallery-item flex-shrink-0"
            style={{ width: 'clamp(260px, 28vw, 420px)', height: '68vh' }}
            data-cursor-hover
          >
            {/* Card */}
            <div className="relative w-full h-full overflow-hidden bg-neutral-900">

              {/* Image */}
              <img
                src={item.image}
                alt={item.title}
                className="card-img absolute inset-0 w-full h-full object-cover"
                style={{ filter: 'brightness(0.55) contrast(1.1)' }}
                loading="lazy"
              />

              {/* Gradient overlay */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    'linear-gradient(to top, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.3) 50%, rgba(0,0,0,0.1) 100%)',
                }}
              />

              {/* Accent top line */}
              <div
                className="absolute top-0 left-0 right-0 h-px pointer-events-none"
                style={{ background: `linear-gradient(90deg, ${item.accent}90, transparent 55%)` }}
              />

              {/* Top row */}
              <div className="absolute top-6 left-6 right-6 flex items-center justify-between">
                <span
                  className="text-[0.55rem] tracking-[0.26em] uppercase font-medium px-2.5 py-1 border"
                  style={{
                    color: `${item.accent}dd`,
                    borderColor: `${item.accent}50`,
                    background: 'rgba(0,0,0,0.5)',
                  }}
                >
                  {item.category}
                </span>
                <span
                  className="font-mono text-[2.8rem] font-bold leading-none select-none"
                  style={{ color: 'rgba(255,255,255,0.06)', letterSpacing: '-0.04em' }}
                >
                  {item.id}
                </span>
              </div>

              {/* Bottom meta */}
              <div className="card-meta absolute bottom-0 left-0 right-0 p-6 flex flex-col gap-2.5">
                <div className="flex items-baseline justify-between">
                  <h3 className="text-[1.15rem] font-semibold tracking-[-0.02em] text-white leading-tight">
                    {item.title}
                  </h3>
                  <span className="text-[0.58rem] tracking-[0.18em] text-white/30 font-mono">
                    {item.year}
                  </span>
                </div>

                <p className="text-[0.7rem] text-white/40 leading-relaxed">
                  {item.description}
                </p>

                {/* CTA */}
                <div
                  className="card-cta flex items-center gap-2 pt-1 opacity-0"
                  style={{ transform: 'translateY(10px)' }}
                >
                  <span
                    className="text-[0.62rem] tracking-[0.24em] uppercase font-medium"
                    style={{ color: item.accent }}
                  >
                    View Case
                  </span>
                  <svg width="18" height="8" viewBox="0 0 18 8" fill="none" aria-hidden="true">
                    <path
                      d="M0 4h15M12 1l3 3-3 3"
                      stroke={item.accent}
                      strokeWidth="1"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </div>

              {/* Border */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{ border: `1px solid rgba(255,255,255,0.07)` }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Drag hint */}
      <div className="absolute bottom-9 right-[5vw] z-10 pointer-events-none flex items-center gap-2.5">
        <div className="w-6 h-px bg-white/10" />
        <span className="text-[0.52rem] tracking-[0.28em] uppercase text-white/15">Scroll</span>
        <div className="w-6 h-px bg-white/10" />
      </div>
    </section>
  );
}
