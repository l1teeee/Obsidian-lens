'use client';

import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const brands = ['Vogue', 'Hypebeast', 'Highsnobiety', 'Dazed', 'i-D', 'AnOther'];

export default function SocialProof() {
  const rootRef = useRef<HTMLElement | null>(null);

  useLayoutEffect(() => {
    if (!rootRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: rootRef.current,
          start: 'top 82%',
          toggleActions: 'play none none none',
        },
      });

      tl.fromTo(
          '[data-sp="label"]',
          {
            opacity: 0,
            y: 16,
            filter: 'blur(10px)',
          },
          {
            opacity: 1,
            y: 0,
            filter: 'blur(0px)',
            duration: 0.55,
            ease: 'power2.out',
          }
      ).fromTo(
          '[data-sp="brand"]',
          {
            opacity: 0,
            y: 18,
            scale: 0.985,
            filter: 'blur(10px)',
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            filter: 'blur(0px)',
            duration: 0.55,
            stagger: 0.07,
            ease: 'power2.out',
          },
          '-=0.2'
      );
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
      <section
          ref={rootRef}
          className="social-proof-section relative overflow-hidden border-y border-[#494847]/15 bg-[#0e0e0e] py-24"
      >
        <div className="mx-auto max-w-[1440px] px-6 md:px-12">
          <p
              data-sp="label"
              style={{
                opacity: 0,
                transform: 'translateY(16px)',
                filter: 'blur(10px)',
              }}
              className="mb-10 text-center text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-[#b7b1b1]/55"
          >
            Empowering the World&apos;s Most Creative Networks
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 md:gap-5">
            {brands.map((brand) => (
                <span
                    key={brand}
                    data-sp="brand"
                    style={{
                      opacity: 0,
                      transform: 'translateY(18px) scale(0.985)',
                      filter: 'blur(10px)',
                    }}
                    className="select-none rounded-full border border-[#d394ff]/10 bg-[#161616] px-6 py-3 text-[0.8rem] font-semibold uppercase tracking-[0.2em] text-[#ebe5e5] transition-all duration-300 hover:border-[#d394ff]/25 hover:bg-[#1b1b1b] hover:text-white hover:shadow-[0_0_24px_rgba(211,148,255,0.08)] md:text-[0.88rem]"
                >
              {brand}
            </span>
            ))}
          </div>
        </div>
      </section>
  );
}