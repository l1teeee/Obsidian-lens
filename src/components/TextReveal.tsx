import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { useGSAP } from '../hooks/useGSAP';

gsap.registerPlugin(ScrollTrigger);

interface TextRevealProps {
  text: string;
}

export default function TextReveal({ text }: TextRevealProps) {
  const words = text.split(' ');

  const containerRef = useGSAP<HTMLDivElement>(() => {
    // Char-level reveal: each letter lights up sequentially, scrub-driven.
    // stagger distributes all chars across the scroll range for a smooth
    // "typewriter from darkness" feel that matches the noir aesthetic.
    gsap.fromTo(
      '.reveal-char',
      { opacity: 0.05 },
      {
        opacity: 1,
        ease: 'power2.inOut',
        stagger: {
          each: 0.035,
          from: 'start',
        },
        scrollTrigger: {
          trigger: '.reveal-container',
          start: 'top 80%',
          end: 'bottom 25%',
          scrub: 1.4,
        },
      },
    );
  });

  return (
    <div ref={containerRef} className="reveal-container py-[16vh] px-8 md:px-14">
      <p className="flex flex-wrap text-[clamp(1.6rem,3.8vw,3.2rem)] font-bold tracking-[-0.03em] leading-[1.25] max-w-[900px]">
        {words.map((word, wi) => (
          /* word wrapper preserves natural word-break behaviour */
          <span key={wi} className="inline-block mx-[0.14em] my-[0.04em]">
            {word.split('').map((char, ci) => (
              <span key={ci} className="reveal-char inline-block">
                {char}
              </span>
            ))}
          </span>
        ))}
      </p>
    </div>
  );
}
