'use client';
import { useState, useEffect } from 'react';
import gsap from 'gsap';
import { useGSAP } from '../../hooks/useGSAP';

const links = ['Platform', 'Analytics', 'Showcase', 'Pricing'];

export default function ObsidianNav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scope = useGSAP(() => {
    const tl = gsap.timeline({ delay: 0.2 });
    tl
      .from('[data-nav="bar"]',   { y: -12, opacity: 0, duration: 0.5, ease: 'power2.out' })
      .from('[data-nav="logo"]',  { opacity: 0, duration: 0.4, ease: 'power2.out' }, '-=0.2')
      .from('[data-nav="link"]',  { opacity: 0, y: -4, duration: 0.35, stagger: 0.06, ease: 'power2.out' }, '-=0.15')
      .from('[data-nav="cta"]',   { opacity: 0, duration: 0.35, ease: 'power2.out' }, '-=0.2');
  }, []);

  return (
    <nav
      ref={scope}
      data-nav="bar"
      className={`fixed top-0 w-full z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-[#0e0e0e]/80 backdrop-blur-2xl border-b border-[#494847]/20'
          : 'bg-transparent'
      }`}
    >
      <div className="flex justify-between items-center px-6 md:px-12 py-5 max-w-[1440px] mx-auto">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2.5 group">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-[#d394ff] to-[#aa30fa] flex items-center justify-center shadow-[0_0_16px_rgba(211,148,255,0.4)]">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <circle cx="7" cy="7" r="3" fill="#4a0076" />
              <circle cx="7" cy="7" r="6" stroke="#4a0076" strokeWidth="1.5" />
            </svg>
          </div>
          <span className="text-lg font-bold tracking-tight text-[#e5e2e1] font-headline">
            Obsidian Lens
          </span>
        </a>

        {/* Links */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <a
              key={link}
              data-nav="link"
              href={`#${link}`}
              className="text-sm font-medium text-[#adaaaa] hover:text-[#d394ff] transition-colors duration-300"
            >
              {link}
            </a>
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-5">
          <button className="hidden md:block text-sm font-medium text-[#adaaaa] hover:text-[#d394ff] transition-colors duration-300">
            Login
          </button>
          <button data-nav="cta" className="bg-[#d394ff] text-[#4a0076] text-sm font-bold px-5 py-2.5 rounded-xl hover:shadow-[0_0_28px_rgba(211,148,255,0.35)] hover:scale-[1.03] active:scale-[0.98] transition-all duration-300">
            Get Started
          </button>
        </div>
      </div>
    </nav>
  );
}
