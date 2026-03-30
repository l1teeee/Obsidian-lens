import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { useGSAP } from '../hooks/useGSAP';

gsap.registerPlugin(ScrollTrigger);

export default function ShowreelSection() {
  const buttonRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  // ── Magnetic + ambient: plain useEffect (no Lenis dependency) ─
  useEffect(() => {
    const section = sectionRef.current;
    const button = buttonRef.current;
    const ring = ringRef.current;
    if (!section || !button || !ring) return;

    // Ambient pulse loop
    const pulse = gsap.to(ring, {
      scale: 1.18,
      opacity: 0.18,
      duration: 2.2,
      ease: 'power1.inOut',
      yoyo: true,
      repeat: -1,
    });

    // Magnetic effect
    const onMove = (e: MouseEvent) => {
      const rect = button.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const radius = 160;

      if (dist < radius) {
        const strength = (radius - dist) / radius;
        gsap.to(button, {
          x: dx * strength * 0.45,
          y: dy * strength * 0.45,
          duration: 0.55,
          ease: 'power3.out',
        });
      } else {
        gsap.to(button, { x: 0, y: 0, duration: 0.7, ease: 'elastic.out(1, 0.5)' });
      }
    };

    const onLeave = () => {
      gsap.to(button, { x: 0, y: 0, duration: 0.8, ease: 'elastic.out(1, 0.4)' });
    };

    section.addEventListener('mousemove', onMove);
    section.addEventListener('mouseleave', onLeave);

    return () => {
      pulse.kill();
      section.removeEventListener('mousemove', onMove);
      section.removeEventListener('mouseleave', onLeave);
    };
  }, []);

  // ── Scroll-linked entrance (waits for Lenis) ─────────────────
  const scrollRef = useGSAP<HTMLElement>(() => {
    // Background clip-path iris reveals from center
    gsap.fromTo(
      '.reel-bg',
      { clipPath: 'circle(0% at 50% 50%)' },
      {
        clipPath: 'circle(80% at 50% 50%)',
        duration: 1.4,
        ease: 'expo.out',
        scrollTrigger: {
          trigger: '#reel',
          start: 'top 75%',
          toggleActions: 'play none none reverse',
        },
      },
    );

    // "REEL 2024" background text fades in
    gsap.from('.reel-bg-text', {
      opacity: 0,
      y: 30,
      duration: 1.4,
      delay: 0.4,
      ease: 'expo.out',
      scrollTrigger: {
        trigger: '#reel',
        start: 'top 75%',
        toggleActions: 'play none none reverse',
      },
    });

    // Button + ring scale in from zero
    gsap.from('.reel-button-wrap', {
      scale: 0,
      opacity: 0,
      duration: 1.1,
      delay: 0.55,
      ease: 'back.out(1.4)',
      scrollTrigger: {
        trigger: '#reel',
        start: 'top 75%',
        toggleActions: 'play none none reverse',
      },
    });

    // Label fades up
    gsap.from('.reel-label', {
      opacity: 0,
      y: 20,
      duration: 0.9,
      delay: 0.75,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: '#reel',
        start: 'top 75%',
        toggleActions: 'play none none reverse',
      },
    });

    // Horizontal lines extend from center
    gsap.fromTo(
      '.reel-line',
      { scaleX: 0 },
      {
        scaleX: 1,
        stagger: 0.12,
        duration: 1.2,
        delay: 0.6,
        ease: 'expo.out',
        scrollTrigger: {
          trigger: '#reel',
          start: 'top 75%',
          toggleActions: 'play none none reverse',
        },
      },
    );
  }, []);

  // Merge refs — scrollRef drives scroll anims, sectionRef drives mouse
  const setRefs = (el: HTMLElement | null) => {
    (sectionRef as React.MutableRefObject<HTMLElement | null>).current = el;
    (scrollRef as React.MutableRefObject<HTMLElement | null>).current = el;
  };

  const handleButtonEnter = () => {
    gsap.to(buttonRef.current, { scale: 1.08, duration: 0.4, ease: 'power2.out' });
    gsap.to('.reel-play-text', { opacity: 0, duration: 0.2 });
    gsap.to('.reel-play-icon', { scale: 1.3, duration: 0.4, ease: 'back.out(2)' });
  };

  const handleButtonLeave = () => {
    gsap.to(buttonRef.current, { scale: 1, duration: 0.5, ease: 'elastic.out(1, 0.5)' });
    gsap.to('.reel-play-text', { opacity: 1, duration: 0.3 });
    gsap.to('.reel-play-icon', { scale: 1, duration: 0.4, ease: 'back.out(2)' });
  };

  return (
    <section
      id="reel"
      ref={setRefs}
      className="relative flex items-center justify-center bg-black overflow-hidden"
      style={{ height: '88vh' }}
    >
      {/* Background fill (clip-path iris) */}
      <div
        className="reel-bg absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 70% 60% at 50% 50%, rgba(255,255,255,0.022) 0%, rgba(0,0,0,0) 100%)',
          clipPath: 'circle(0% at 50% 50%)',
        }}
      />

      {/* Giant background text */}
      <div
        className="reel-bg-text absolute select-none pointer-events-none font-black tracking-[-0.06em] text-center leading-none"
        style={{
          fontSize: 'clamp(8rem, 22vw, 20rem)',
          WebkitTextStroke: '1px rgba(255,255,255,0.04)',
          color: 'transparent',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          whiteSpace: 'nowrap',
        }}
        aria-hidden
      >
        REEL<br />2024
      </div>

      {/* Horizontal lines */}
      <div
        className="reel-line absolute left-0 h-px bg-white/[0.06]"
        style={{ top: '38%', right: '0', transformOrigin: 'center' }}
      />
      <div
        className="reel-line absolute left-0 h-px bg-white/[0.04]"
        style={{ top: '62%', right: '0', transformOrigin: 'center' }}
      />

      {/* Button group */}
      <div className="reel-button-wrap relative flex flex-col items-center gap-10">
        {/* Ambient ring */}
        <div
          ref={ringRef}
          className="absolute rounded-full border border-white/10"
          style={{ width: 220, height: 220, top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}
        />

        {/* Magnetic play button */}
        <div
          ref={buttonRef}
          className="relative flex items-center justify-center rounded-full border border-white/15 cursor-pointer select-none"
          style={{ width: 140, height: 140 }}
          onMouseEnter={handleButtonEnter}
          onMouseLeave={handleButtonLeave}
          role="button"
          aria-label="Watch showreel"
          data-cursor-hover
        >
          {/* Inner glow */}
          <div
            className="absolute inset-0 rounded-full pointer-events-none"
            style={{ background: 'radial-gradient(circle, rgba(255,255,255,0.04) 0%, transparent 70%)' }}
          />

          {/* Play icon */}
          <svg
            className="reel-play-icon relative z-10"
            width="28"
            height="28"
            viewBox="0 0 28 28"
            fill="none"
            style={{ marginLeft: 4 }}
          >
            <path d="M8 4l16 10L8 24V4z" fill="rgba(255,255,255,0.7)" />
          </svg>
        </div>

        {/* Label */}
        <p className="reel-label text-[0.6rem] tracking-[0.38em] uppercase text-white/25 font-medium">
          Watch showreel
        </p>
      </div>

      {/* Corner timestamps */}
      <span
        className="reel-label absolute top-8 left-8 md:left-14 text-[0.52rem] tracking-[0.22em] uppercase text-white/15 font-mono"
      >
        NM / 2024
      </span>
      <span
        className="reel-label absolute top-8 right-8 md:right-14 text-[0.52rem] tracking-[0.22em] uppercase text-white/15 font-mono"
      >
        Duration 02:47
      </span>
      <span
        className="reel-label absolute bottom-8 left-8 md:left-14 text-[0.52rem] tracking-[0.22em] uppercase text-white/10 font-mono"
      >
        4K · Color Graded
      </span>
    </section>
  );
}
