import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { useGSAP } from '../hooks/useGSAP';

gsap.registerPlugin(ScrollTrigger);

const STEPS = [
  {
    num: '01',
    title: 'Discover',
    body: 'We immerse ourselves in your world — your audience, your competitors, your edge. No brief too ambiguous.',
  },
  {
    num: '02',
    title: 'Define',
    body: 'Strategy crystallizes into a sharp creative direction. What we make, why it matters, and who it moves.',
  },
  {
    num: '03',
    title: 'Design',
    body: 'Pixels in service of ideas. Every frame, interaction, and micro-moment earns its place.',
  },
  {
    num: '04',
    title: 'Deploy',
    body: 'Shipped clean, documented, and built to last. We hand off work that your team can own.',
  },
];

export default function ApproachSection() {
  const ref = useGSAP<HTMLElement>(() => {
    // ── Heading ──────────────────────────────────────────────
    const headTl = gsap.timeline({
      scrollTrigger: {
        trigger: '#approach',
        start: 'top 80%',
        toggleActions: 'play none none reverse',
      },
    });

    headTl
      .from('.approach-eyebrow', {
        opacity: 0, y: 10, duration: 0.8, ease: 'power2.out',
      })
      .from(
        '.approach-title-char',
        {
          y: '110%',
          duration: 1.1,
          stagger: 0.04,
          ease: 'expo.out',
        },
        '-=0.45',
      );

    // ── Central timeline line draws downward (scrub) ─────────
    gsap.fromTo(
      '.approach-spine',
      { scaleY: 0 },
      {
        scaleY: 1,
        transformOrigin: 'top center',
        ease: 'none',
        scrollTrigger: {
          trigger: '.approach-steps',
          start: 'top 60%',
          end: 'bottom 55%',
          scrub: 1.2,
        },
      },
    );

    // ── Each step animates when spine "reaches" it ───────────
    gsap.utils.toArray<HTMLElement>('.approach-step').forEach((step, i) => {
      // Horizontal connector draws from center
      gsap.fromTo(
        step.querySelector('.step-connector'),
        { scaleX: 0 },
        {
          scaleX: 1,
          transformOrigin: i % 2 === 0 ? 'right center' : 'left center',
          duration: 0.8,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: step,
            start: 'top 72%',
            toggleActions: 'play none none reverse',
          },
        },
      );

      // Content block slides in from the correct side
      gsap.from(step.querySelector('.step-content'), {
        opacity: 0,
        x: i % 2 === 0 ? -40 : 40,
        duration: 1.0,
        ease: 'expo.out',
        scrollTrigger: {
          trigger: step,
          start: 'top 72%',
          toggleActions: 'play none none reverse',
        },
      });

      // Big ghost number rises
      gsap.from(step.querySelector('.step-ghost'), {
        opacity: 0,
        y: 20,
        duration: 1.1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: step,
          start: 'top 72%',
          toggleActions: 'play none none reverse',
        },
      });

      // Node dot scales in
      gsap.from(step.querySelector('.step-node'), {
        scale: 0,
        duration: 0.5,
        ease: 'back.out(2)',
        scrollTrigger: {
          trigger: step,
          start: 'top 72%',
          toggleActions: 'play none none reverse',
        },
      });
    });
  }, []);

  const titleChars = 'How we work'.split('');

  return (
    <section id="approach" ref={ref} className="py-40 px-8 md:px-14 bg-black overflow-hidden">
      {/* Heading */}
      <div className="mb-28">
        <span className="approach-eyebrow block text-[0.62rem] tracking-[0.34em] uppercase text-white/20 mb-8 font-medium">
          Process
        </span>
        <h2
          className="overflow-hidden"
          style={{ fontSize: 'clamp(3.5rem, 8vw, 7.5rem)', fontWeight: 900, letterSpacing: '-0.045em', lineHeight: 0.88, color: 'white' }}
        >
          {titleChars.map((ch, i) => (
            <span key={i} className="approach-title-char inline-block" style={{ whiteSpace: ch === ' ' ? 'pre' : 'normal' }}>
              {ch === ' ' ? '\u00a0' : ch}
            </span>
          ))}
        </h2>
      </div>

      {/* Steps layout with central spine */}
      <div className="approach-steps relative max-w-5xl mx-auto">
        {/* Central vertical spine */}
        <div
          className="approach-spine absolute left-1/2 top-0 bottom-0 w-px bg-white/[0.10]"
          style={{ transformOrigin: 'top center' }}
        />

        {STEPS.map((step, i) => {
          const isLeft = i % 2 === 0;
          return (
            <div
              key={step.num}
              className="approach-step relative flex items-center py-16"
              style={{ justifyContent: isLeft ? 'flex-start' : 'flex-end' }}
            >
              {/* Content — left or right half */}
              <div
                className="step-content relative w-[44%]"
                style={{ textAlign: isLeft ? 'right' : 'left' }}
              >
                {/* Ghost number */}
                <div
                  className="step-ghost absolute pointer-events-none select-none font-black font-mono leading-none"
                  style={{
                    fontSize: 'clamp(6rem, 10vw, 9rem)',
                    color: 'rgba(255,255,255,0.03)',
                    letterSpacing: '-0.06em',
                    top: '50%',
                    [isLeft ? 'right' : 'left']: '-0.1em',
                    transform: 'translateY(-50%)',
                  }}
                  aria-hidden
                >
                  {step.num}
                </div>

                {/* Number label */}
                <span className="block text-[0.58rem] tracking-[0.22em] text-white/20 font-mono mb-4">
                  {step.num}
                </span>

                {/* Title */}
                <h3
                  className="text-white font-bold tracking-[-0.03em] leading-tight mb-4"
                  style={{ fontSize: 'clamp(1.6rem, 2.8vw, 2.4rem)' }}
                >
                  {step.title}
                </h3>

                {/* Body */}
                <p className="text-[0.82rem] text-white/30 leading-[1.8]">
                  {step.body}
                </p>
              </div>

              {/* Horizontal connector (from content edge to spine) */}
              <div
                className="step-connector absolute top-1/2 h-px bg-white/[0.10]"
                style={{
                  width: '7%',
                  [isLeft ? 'right' : 'left']: '50%',
                  transformOrigin: isLeft ? 'right center' : 'left center',
                  marginTop: '-0.5px',
                }}
              />

              {/* Center node dot */}
              <div
                className="step-node absolute left-1/2 top-1/2 w-2 h-2 rounded-full bg-white/30"
                style={{ transform: 'translate(-50%, -50%)' }}
              />

              {/* Inner dot */}
              <div
                className="absolute left-1/2 top-1/2 w-1 h-1 rounded-full bg-white/70"
                style={{ transform: 'translate(-50%, -50%)' }}
              />
            </div>
          );
        })}
      </div>
    </section>
  );
}
