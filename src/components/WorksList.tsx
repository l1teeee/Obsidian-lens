'use client';
import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

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
  const [hovered, setHovered] = useState<number | null>(null);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  function handleMouseMove(e: React.MouseEvent) {
    const rect = containerRef.current?.getBoundingClientRect();
    if (rect) {
      setMouse({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    }
  }

  return (
    <section
      id="work"
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative py-24 px-8 md:px-14"
    >
      {/* Section label */}
      <div className="flex items-center justify-between mb-14">
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
          <motion.div
            key={work.num}
            className="group border-t border-white/[0.08] last:border-b last:border-white/[0.08] cursor-pointer"
            onHoverStart={() => setHovered(i)}
            onHoverEnd={() => setHovered(null)}
          >
            <motion.div
              className="flex items-center gap-5 py-7 md:py-9"
              animate={{ x: hovered === i ? 10 : 0 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* Number */}
              <span className="shrink-0 text-white/15 text-[0.62rem] tracking-widest font-mono w-7">
                {work.num}
              </span>

              {/* Title */}
              <motion.span
                className="flex-1 text-white text-[clamp(1.5rem,3.8vw,3rem)] font-bold tracking-[-0.03em] leading-none"
                animate={{ opacity: hovered !== null && hovered !== i ? 0.25 : 1 }}
                transition={{ duration: 0.3 }}
              >
                {work.title}
              </motion.span>

              {/* Category */}
              <span className="hidden md:block shrink-0 text-white/20 text-[0.62rem] tracking-[0.2em] uppercase w-28 text-right">
                {work.category}
              </span>

              {/* Year */}
              <span className="shrink-0 text-white/15 text-[0.62rem] font-mono w-10 text-right">
                {work.year}
              </span>

              {/* Arrow */}
              <motion.span
                className="shrink-0 text-white/20 ml-2"
                animate={{
                  x: hovered === i ? 5 : 0,
                  opacity: hovered === i ? 1 : 0.2,
                }}
                transition={{ duration: 0.3 }}
              >
                →
              </motion.span>
            </motion.div>
          </motion.div>
        ))}
      </div>

      {/* Floating preview image */}
      <AnimatePresence>
        {hovered !== null && (
          <motion.div
            key={hovered}
            className="pointer-events-none absolute z-30"
            style={{
              left: mouse.x + 28,
              top: mouse.y - 90,
            }}
            initial={{ opacity: 0, scale: 0.88, y: 14 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.93, y: 8 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="w-[260px] h-[180px] overflow-hidden">
              <img
                src={WORKS[hovered].img}
                alt={WORKS[hovered].title}
                className="w-full h-full object-cover grayscale"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
