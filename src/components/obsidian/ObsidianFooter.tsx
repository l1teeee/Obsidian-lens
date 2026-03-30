'use client';

import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const footerLinks = {
  Platform: ['Automation', 'Analytics', 'Integrations'],
  Company: ['Journal', 'Careers', 'Contact'],
  Legal: ['Privacy', 'Terms', 'Security'],
};

export default function ObsidianFooter() {
  const footerRef = useRef<HTMLElement | null>(null);
  const brandRef = useRef<HTMLDivElement | null>(null);
  const brandTextRef = useRef<HTMLParagraphElement | null>(null);
  const colsWrapRef = useRef<HTMLDivElement | null>(null);
  const bottomRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    if (!footerRef.current) return;

    const ctx = gsap.context(() => {
      const cols = colsWrapRef.current
          ? Array.from(colsWrapRef.current.querySelectorAll<HTMLElement>('[data-footer-col]'))
          : [];

      const bottomLinks = bottomRef.current
          ? Array.from(
              bottomRef.current.querySelectorAll<HTMLElement>('[data-footer-bottom-link]')
          )
          : [];

      if (!brandRef.current || !brandTextRef.current || !bottomRef.current) return;

      gsap.set(
          [brandRef.current, brandTextRef.current, ...cols, bottomRef.current, ...bottomLinks],
          {
            opacity: 0,
            y: 24,
          }
      );

      gsap.set(brandRef.current, {
        filter: 'blur(10px)',
      });

      if (cols.length) {
        gsap.set(cols, {
          filter: 'blur(8px)',
        });
      }

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: footerRef.current,
          start: 'top 85%',
          toggleActions: 'play none none none',
          once: true,
          invalidateOnRefresh: true,
          // markers: true,
        },
        defaults: {
          ease: 'power3.out',
        },
      });

      tl.to(brandRef.current, {
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        duration: 0.75,
      }).to(
          brandTextRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
          },
          '-=0.4'
      );

      if (cols.length) {
        tl.to(
            cols,
            {
              opacity: 1,
              y: 0,
              filter: 'blur(0px)',
              duration: 0.65,
              stagger: 0.1,
            },
            '-=0.25'
        );
      }

      tl.to(
          bottomRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.55,
          },
          '-=0.2'
      );

      if (bottomLinks.length) {
        tl.to(
            bottomLinks,
            {
              opacity: 1,
              y: 0,
              duration: 0.35,
              stagger: 0.06,
            },
            '-=0.3'
        );
      }

      ScrollTrigger.refresh();
    }, footerRef);

    return () => ctx.revert();
  }, []);

  return (
      <footer
          ref={footerRef}
          className="border-t border-[#494847]/15 bg-[#030303]"
      >
        <div className="mx-auto max-w-[1440px] px-6 py-24 md:px-12">
          <div className="flex flex-col items-start justify-between gap-14 md:flex-row">
            <div ref={brandRef} className="max-w-xs space-y-6">
              <div className="flex items-center gap-2.5">
                <span className="font-headline text-lg font-bold tracking-tight text-[#e5e2e1]">
                Obsidian Lens
              </span>
              </div>

              <p
                  ref={brandTextRef}
                  className="text-sm leading-relaxed text-[#adaaaa]/60"
              >
                Defining the standard for creative CRM software. Building the
                bridge between data and artistry.
              </p>
            </div>

            <div
                ref={colsWrapRef}
                className="grid grid-cols-2 gap-10 md:grid-cols-3 md:gap-20"
            >
              {Object.entries(footerLinks).map(([section, links]) => (
                  <div key={section} data-footer-col className="space-y-5">
                    <h6 className="text-[0.6875rem] font-bold uppercase tracking-[0.2em] text-[#adaaaa]/50">
                      {section}
                    </h6>

                    <ul className="space-y-3.5">
                      {links.map((link) => (
                          <li key={link}>
                            <a
                                href="#"
                                className="text-sm text-[#adaaaa]/50 transition-colors duration-300 hover:text-[#d394ff]"
                            >
                              {link}
                            </a>
                          </li>
                      ))}
                    </ul>
                  </div>
              ))}
            </div>
          </div>
        </div>

        <div
            ref={bottomRef}
            className="mx-auto flex max-w-[1440px] flex-col items-center justify-between gap-4 border-t border-[#494847]/10 px-6 py-8 md:flex-row md:px-12"
        >
        <span className="text-[0.6875rem] uppercase tracking-[0.1em] text-[#e5e2e1]/25">
          © {new Date().getFullYear()} Obsidian Lens. All rights reserved.
        </span>

          <div className="flex gap-6">
            {['Privacy Policy', 'Terms of Service', 'API Status'].map((item) => (
                <a
                    key={item}
                    data-footer-bottom-link
                    href="#"
                    className="text-[0.6875rem] uppercase tracking-[0.1em] text-[#e5e2e1]/25 transition-colors duration-300 hover:text-[#d394ff]"
                >
                  {item}
                </a>
            ))}
          </div>
        </div>
      </footer>
  );
}