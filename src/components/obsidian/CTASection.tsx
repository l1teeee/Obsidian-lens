'use client';

import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function CTASection() {
  const sectionRef = useRef<HTMLElement | null>(null);

  useLayoutEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.set(
          [
            '[data-cta="glow"]',
            '[data-cta="title"]',
            '[data-cta="actions"]',
            '[data-cta="note"]',
          ],
          { willChange: 'transform, opacity, filter' }
      );

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 85%',
          toggleActions: 'play none none none',
          once: true,
          // markers: true,
        },
        defaults: {
          ease: 'power4.out',
        },
      });

      tl.fromTo(
          '[data-cta="glow"]',
          {
            opacity: 0,
            scale: 0.92,
          },
          {
            opacity: 1,
            scale: 1,
            duration: 1.2,
            ease: 'power3.out',
          },
          0
      )
          .fromTo(
              '[data-cta="title"]',
              {
                opacity: 0,
                y: 40,
                filter: 'blur(12px)',
              },
              {
                opacity: 1,
                y: 0,
                filter: 'blur(0px)',
                duration: 0.9,
              },
              0.08
          )
          .fromTo(
              '[data-cta="actions"]',
              {
                opacity: 0,
                y: 24,
              },
              {
                opacity: 1,
                y: 0,
                duration: 0.7,
              },
              '-=0.45'
          )
          .fromTo(
              '[data-cta="note"]',
              {
                opacity: 0,
                y: 16,
              },
              {
                opacity: 1,
                y: 0,
                duration: 0.55,
              },
              '-=0.35'
          );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
      <section
          ref={sectionRef}
          id="CTA"
          className="relative overflow-hidden px-6 py-44"
      >
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div
              data-cta="glow"
              style={{ opacity: 0 }}
              className="h-[400px] w-[700px] rounded-full bg-[#d394ff]/6 blur-[100px]"
          />
        </div>

        <div className="relative z-10 mx-auto max-w-[860px] text-center">
          <h2
              data-cta="title"
              style={{ opacity: 0 }}
              className="font-headline text-5xl font-extrabold leading-[1] tracking-tight text-white md:text-7xl"
          >
            Ready to refine
            <br />
            <span className="bg-gradient-to-r from-[#d394ff] to-[#aa30fa] bg-clip-text text-transparent">
            your reach?
          </span>
          </h2>

          <div
              data-cta="actions"
              style={{ opacity: 0 }}
              className="mt-12 flex flex-col items-center justify-center gap-5 sm:flex-row"
          >
            <button className="w-full rounded-2xl bg-white px-12 py-5 text-lg font-bold text-[#0e0e0e] transition-all duration-300 hover:bg-[#d394ff] hover:text-[#4a0076] hover:shadow-[0_0_40px_rgba(211,148,255,0.3)] sm:w-auto">
              Start Free Trial
            </button>

            <button className="w-full rounded-2xl border border-[#494847]/25 bg-[#1a1919]/60 px-12 py-5 text-lg font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:border-[#d394ff]/40 sm:w-auto">
              Book Concierge Demo
            </button>
          </div>

          <p
              data-cta="note"
              style={{ opacity: 0 }}
              className="mt-8 text-sm text-[#777575]"
          >
            No credit card required · Cancel anytime · Seamless migration from
            HubSpot or Salesforce
          </p>
        </div>
      </section>
  );
}