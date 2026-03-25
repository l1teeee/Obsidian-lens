'use client';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <motion.nav
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.2, delay: 0.8, ease: 'easeOut' }}
      className={`fixed top-0 inset-x-0 z-50 flex items-center justify-between px-8 md:px-14 py-7 transition-colors duration-700 ${
        scrolled ? 'bg-black/75 backdrop-blur-md' : ''
      }`}
    >
      <a
        href="/"
        className="text-white text-[0.68rem] tracking-[0.32em] uppercase font-medium"
      >
        NM
      </a>

      <ul className="hidden md:flex items-center gap-10">
        {[['#work', 'Work'], ['#studio', 'Studio'], ['#contact', 'Contact']].map(
          ([href, label]) => (
            <li key={label}>
              <a
                href={href}
                className="text-white/30 hover:text-white text-[0.62rem] tracking-[0.28em] uppercase transition-colors duration-400"
              >
                {label}
              </a>
            </li>
          )
        )}
      </ul>
    </motion.nav>
  );
}
