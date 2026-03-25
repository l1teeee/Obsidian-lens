'use client';

import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import gsap from 'gsap';

const links = ['Platform', 'Analytics', 'Showcase', 'Pricing'];

export default function ObsidianNav() {
  const [scrolled, setScrolled] = useState(false);
  const navRef = useRef<HTMLElement | null>(null);
  const innerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useLayoutEffect(() => {
    if (!innerRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      tl.fromTo(
          innerRef.current,
          {
            opacity: 0,
            y: -10,
            filter: 'blur(10px)',
          },
          {
            opacity: 1,
            y: 0,
            filter: 'blur(0px)',
            duration: 0.5,
            ease: 'power2.out',
          }
      )
          .from(
              '[data-nav="logo"]',
              {
                opacity: 0,
                y: -8,
                filter: 'blur(8px)',
                duration: 0.35,
                ease: 'power2.out',
              },
              '-=0.28'
          )
          .from(
              '[data-nav="link"]',
              {
                opacity: 0,
                y: -8,
                filter: 'blur(6px)',
                duration: 0.28,
                stagger: 0.05,
                ease: 'power2.out',
              },
              '-=0.18'
          )
          .from(
              '[data-nav="actions"]',
              {
                opacity: 0,
                y: -6,
                filter: 'blur(6px)',
                duration: 0.3,
                ease: 'power2.out',
              },
              '-=0.16'
          );
    }, navRef);

    return () => ctx.revert();
  }, []);

  return (
      <nav ref={navRef} className="fixed top-0 left-0 w-full z-50">
        <div
            ref={innerRef}
            style={{
              opacity: 0,
              transform: 'translateY(-10px)',
              filter: 'blur(10px)',
              willChange: 'opacity, transform, filter',
            }}
            className={`relative transition-all duration-500 ${
                scrolled
                    ? 'bg-[#0e0e0e]/72 backdrop-blur-2xl border-b border-[#494847]/20 shadow-[0_10px_40px_rgba(0,0,0,0.22)]'
                    : 'bg-[#0e0e0e]/92 backdrop-blur-xl border-b border-transparent'
            }`}
        >
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.01),transparent_38%,transparent)]" />
          </div>

          <div className="relative z-10 mx-auto flex max-w-[1440px] items-center justify-between px-6 py-5 md:px-12">
            <a
                href="#"
                data-nav="logo"
                className="group relative flex items-center gap-3"
            >
              <div className="flex flex-col leading-none">
              <span className="font-headline text-[1.02rem] font-bold tracking-tight text-[#f3efef]">
                Obsidian Lens
              </span>
                <span className="mt-1 text-[0.6rem] uppercase tracking-[0.24em] text-[#8d8888]">
                Editorial OS
              </span>
              </div>
            </a>

            <div className="hidden items-center gap-8 md:flex">
              {links.map((link) => (
                  <a
                      key={link}
                      data-nav="link"
                      href={`#${link}`}
                      className="group relative text-sm font-medium text-[#adaaaa] transition-colors duration-300 hover:text-[#f3e6ff]"
                  >
                    <span>{link}</span>
                    <span className="absolute left-0 top-full mt-1 h-px w-0 bg-[#d394ff] transition-all duration-300 group-hover:w-full" />
                  </a>
              ))}
            </div>

            <div
                data-nav="actions"
                className="relative z-10 flex items-center gap-3 md:gap-5"
            >
              <button
                  className="hidden text-sm font-medium text-[#adaaaa] transition-colors duration-300 hover:text-[#f3e6ff] md:block"
              >
                Login
              </button>

              <button
                  style={{ opacity: 1, visibility: 'visible' }}
                  className="relative z-10 rounded-xl bg-[#d394ff] px-5 py-2.5 text-sm font-bold text-[#4a0076] shadow-[0_0_24px_rgba(211,148,255,0.18)] transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_0_34px_rgba(211,148,255,0.32)] active:scale-[0.98]"
              >
                Get Started
              </button>
            </div>
          </div>
        </div>
      </nav>
  );
}