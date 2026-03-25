'use client';
import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import type { MotionValue } from 'framer-motion';

// ─── Single word with scroll-driven opacity ───────────────────────────────────
const Word: React.FC<{
  children: string;
  progress: MotionValue<number>;
  range: [number, number];
}> = ({ children, progress, range }) => {
  const opacity = useTransform(progress, range, [0.08, 1]);
  return (
    <span className="relative mx-[0.15em] my-[0.05em] inline-block">
      <span className="absolute select-none text-white/8">{children}</span>
      <motion.span style={{ opacity }} className="text-white">
        {children}
      </motion.span>
    </span>
  );
};

// ─── Main component ────────────────────────────────────────────────────────────
interface TextRevealProps {
  text: string;
}

export default function TextReveal({ text }: TextRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 0.85', 'end 0.35'],
  });

  const words = text.split(' ');

  return (
    <div
      ref={containerRef}
      className="py-[16vh] px-8 md:px-14"
    >
      <p className="flex flex-wrap text-[clamp(1.6rem,3.8vw,3.2rem)] font-bold tracking-[-0.03em] leading-[1.25] max-w-[900px]">
        {words.map((word, i) => {
          const start = i / words.length;
          const end = start + 1 / words.length;
          return (
            <Word key={i} progress={scrollYProgress} range={[start, end]}>
              {word}
            </Word>
          );
        })}
      </p>
    </div>
  );
}
