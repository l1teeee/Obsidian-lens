'use client';
import { useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { useGSAP } from '../hooks/useGSAP';

gsap.registerPlugin(ScrollTrigger);

const WORKS = [
  {
    num: '01',
    title: 'Brand Cosmos',
    category: 'Identity',
    year: '2024',
    img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=700&q=80',
  },
  {
    num: '02',
    title: 'Kinetic Type',
    category: 'Motion',
    year: '2024',
    img: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=700&q=80',
  },
  {
    num: '03',
    title: 'Void Interface',
    category: 'Digital',
    year: '2023',
    img: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=700&q=80',
  },
  {
    num: '04',
    title: 'Parallax Forms',
    category: '3D',
    year: '2023',
    img: 'https://images.unsplash.com/photo-1551269901-5c5e14c25df7?w=700&q=80',
  },
  {
    num: '05',
    title: 'Dark Signals',
    category: 'Experience',
    year: '2022',
    img: 'https://images.unsplash.com/photo-1558244661-d248897f7bc4?w=700&q=80',
  },
];

export default function WorksList() {
  const previewRef = useRef<HTMLDivElement>(null);
  const previewImgRef = useRef<HTMLImageElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const isShowingRef = useRef(false);

  const sectionRef = useGSAP<HTMLElement>(() => {
    // ── Header entrance ─────────────────────────────────────
    gsap.from('.works-header', {
      opacity: 0,
      y: 16,
      duration: 0.9,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: '#work',
        start: 'top 82%',
        toggleActions: 'play none none reverse',
      },
    });

    // ── Rows stagger up ──────────────────────────────────────
    gsap.from('.work-row', {
      opacity: 0,
      y: 40,
      duration: 1.1,
      stagger: 0.09,
      ease: 'expo.out',
      scrollTrigger: {
        trigger: '#work',
        start: 'top 74%',
        toggleActions: 'play none none reverse',
      },
    });
  }, []);

  // ── Mouse tracking ─────────────────────────────────────────
  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = sectionRef.current?.getBoundingClientRect();
    if (!rect) return;

    mouseRef.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };

    if (isShowingRef.current && previewRef.current) {
      gsap.set(previewRef.current, {
        x: mouseRef.current.x + 32,
        y: mouseRef.current.y - 100,
      });
    }
  };

  // ── Row hover — enter ──────────────────────────────────────
  const handleRowEnter = (index: number) => {
    const preview = previewRef.current;
    const previewImg = previewImgRef.current;
    if (!preview || !previewImg) return;

    isShowingRef.current = true;
    previewImg.src = WORKS[index].img;
    previewImg.alt = WORKS[index].title;

    // Snap preview to current mouse position immediately
    gsap.set(preview, {
      x: mouseRef.current.x + 32,
      y: mouseRef.current.y - 100,
    });

    // Animate preview in
    gsap.killTweensOf(preview);
    gsap.fromTo(
      preview,
      { opacity: 0, scale: 0.88, y: 12 },
      { opacity: 1, scale: 1, y: 0, duration: 0.42, ease: 'expo.out' },
    );

    // Dim all rows
    gsap.to('.work-row', { opacity: 0.22, duration: 0.3, ease: 'power2.out' });

    // Restore + shift hovered row
    const rows = sectionRef.current?.querySelectorAll('.work-row');
    if (!rows) return;
    gsap.to(rows[index], { opacity: 1, duration: 0.3, ease: 'power2.out' });
    gsap.to(rows[index].querySelector('.work-row-inner'), {
      x: 10,
      duration: 0.5,
      ease: 'expo.out',
    });
    gsap.to(rows[index].querySelector('.work-arrow'), {
      opacity: 0.8,
      x: 4,
      duration: 0.4,
      ease: 'power2.out',
    });
  };

  // ── Row hover — leave ──────────────────────────────────────
  const handleRowLeave = (index: number) => {
    const preview = previewRef.current;
    if (!preview) return;

    isShowingRef.current = false;

    gsap.killTweensOf(preview);
    gsap.to(preview, {
      opacity: 0,
      scale: 0.93,
      y: 8,
      duration: 0.3,
      ease: 'power2.inOut',
    });

    // Restore all rows
    gsap.to('.work-row', { opacity: 1, duration: 0.45, ease: 'power2.out' });

    const rows = sectionRef.current?.querySelectorAll('.work-row');
    if (!rows) return;
    gsap.to(rows[index].querySelector('.work-row-inner'), {
      x: 0,
      duration: 0.45,
      ease: 'expo.out',
    });
    gsap.to(rows[index].querySelector('.work-arrow'), {
      opacity: 0.15,
      x: 0,
      duration: 0.4,
      ease: 'power2.out',
    });
  };

  return (
    <section
      id="work"
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      className="relative py-24 px-8 md:px-14"
    >
      {/* Section header */}
      <div className="works-header flex items-center justify-between mb-14">
        <span className="text-[0.62rem] tracking-[0.32em] uppercase text-white/20">
          Selected Work
        </span>
        <span className="text-[0.62rem] tracking-[0.2em] uppercase text-white/10 font-mono">
          {String(WORKS.length).padStart(2, '0')}
        </span>
      </div>

      {/* List rows */}
      <div>
        {WORKS.map((work, i) => (
          <div
            key={work.num}
            className="work-row border-t border-white/[0.08] last:border-b last:border-white/[0.08] cursor-pointer"
            onMouseEnter={() => handleRowEnter(i)}
            onMouseLeave={() => handleRowLeave(i)}
          >
            <div className="work-row-inner flex items-center gap-5 py-7 md:py-9">
              {/* Number */}
              <span className="shrink-0 text-white/15 text-[0.62rem] tracking-widest font-mono w-7">
                {work.num}
              </span>

              {/* Title */}
              <span className="flex-1 text-white text-[clamp(1.5rem,3.8vw,3rem)] font-bold tracking-[-0.03em] leading-none">
                {work.title}
              </span>

              {/* Category */}
              <span className="hidden md:block shrink-0 text-white/20 text-[0.62rem] tracking-[0.2em] uppercase w-28 text-right">
                {work.category}
              </span>

              {/* Year */}
              <span className="shrink-0 text-white/15 text-[0.62rem] font-mono w-10 text-right">
                {work.year}
              </span>

              {/* Arrow */}
              <span className="work-arrow shrink-0 text-white/15 ml-2">→</span>
            </div>
          </div>
        ))}
      </div>

      {/* Floating preview image — GSAP-controlled, always in DOM */}
      <div
        ref={previewRef}
        className="pointer-events-none absolute z-30 top-0 left-0 opacity-0"
      >
        <div className="w-[260px] h-[180px] overflow-hidden">
          <img
            ref={previewImgRef}
            src={WORKS[0].img}
            alt=""
            className="w-full h-full object-cover grayscale"
          />
        </div>
      </div>
    </section>
  );
}
