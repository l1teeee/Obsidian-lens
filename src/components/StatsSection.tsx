import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { useGSAP } from '../hooks/useGSAP';

gsap.registerPlugin(ScrollTrigger);

const STATS = [
  { value: 120, suffix: '+', label: 'Projects delivered', sub: 'Since 2016' },
  { value: 8,   suffix: 'y', label: 'Years in the field',  sub: 'Est. 2016'  },
  { value: 40,  suffix: '+', label: 'Clients worldwide',   sub: 'Across 14 countries' },
  { value: 99,  suffix: '%', label: 'Client retention',    sub: 'They always return' },
];

export default function StatsSection() {
  const ref = useGSAP<HTMLElement>(() => {
    // ── Section eyebrow ─────────────────────────────────────
    gsap.from('.stats-eyebrow', {
      opacity: 0,
      y: 10,
      duration: 0.9,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: '#stats',
        start: 'top 82%',
        toggleActions: 'play none none reverse',
      },
    });

    // ── Top divider draws from left ──────────────────────────
    gsap.fromTo(
      '.stats-line-top',
      { scaleX: 0 },
      {
        scaleX: 1,
        transformOrigin: 'left center',
        duration: 1.4,
        ease: 'expo.out',
        scrollTrigger: {
          trigger: '#stats',
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      },
    );

    // ── Each stat: clip-path wipe + counter ──────────────────
    gsap.utils.toArray<HTMLElement>('.stat-item').forEach((item, i) => {
      // Clip-path wipe from left
      gsap.fromTo(
        item,
        { clipPath: 'inset(0 100% 0 0)' },
        {
          clipPath: 'inset(0 0% 0 0)',
          duration: 1.1,
          delay: i * 0.12,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: '#stats',
            start: 'top 74%',
            toggleActions: 'play none none reverse',
          },
        },
      );

      // Sub-label fades in after wipe
      gsap.from(item.querySelector('.stat-sub'), {
        opacity: 0,
        duration: 0.8,
        delay: 0.5 + i * 0.12,
        ease: 'power2.inOut',
        scrollTrigger: {
          trigger: '#stats',
          start: 'top 74%',
          toggleActions: 'play none none none',
        },
      });

      // Number count-up
      const numEl = item.querySelector<HTMLElement>('.stat-num');
      const target = STATS[i];
      if (numEl) {
        const obj = { val: 0 };
        gsap.to(obj, {
          val: target.value,
          duration: 1.9,
          delay: 0.35 + i * 0.12,
          ease: 'power3.out',
          onUpdate() {
            numEl.textContent = String(Math.round(obj.val)) + target.suffix;
          },
          scrollTrigger: {
            trigger: '#stats',
            start: 'top 74%',
            toggleActions: 'play none none none',
          },
        });
      }
    });

    // ── Vertical separators draw down ────────────────────────
    gsap.from('.stat-separator', {
      scaleY: 0,
      transformOrigin: 'top center',
      duration: 1.2,
      stagger: 0.15,
      ease: 'expo.out',
      scrollTrigger: {
        trigger: '#stats',
        start: 'top 74%',
        toggleActions: 'play none none reverse',
      },
    });

    // ── Bottom divider ───────────────────────────────────────
    gsap.fromTo(
      '.stats-line-bottom',
      { scaleX: 0 },
      {
        scaleX: 1,
        transformOrigin: 'left center',
        duration: 1.4,
        delay: 0.5,
        ease: 'expo.out',
        scrollTrigger: {
          trigger: '#stats',
          start: 'top 74%',
          toggleActions: 'play none none reverse',
        },
      },
    );
  }, []);

  return (
    <section id="stats" ref={ref} className="py-28 px-8 md:px-14 bg-black overflow-hidden">
      {/* Top divider */}
      <div className="stats-line-top w-full h-px bg-white/[0.07]" />

      {/* Eyebrow */}
      <div className="flex items-center justify-between py-10">
        <span className="stats-eyebrow text-[0.62rem] tracking-[0.34em] uppercase text-white/20 font-medium">
          By the numbers
        </span>
        <span className="text-[0.58rem] tracking-[0.18em] text-white/10 font-mono uppercase">
          2016 – Present
        </span>
      </div>

      {/* Stats grid */}
      <div className="relative grid grid-cols-2 md:grid-cols-4">
        {/* Vertical separators */}
        {[1, 2, 3].map((n) => (
          <div
            key={n}
            className="stat-separator hidden md:block absolute top-0 bottom-0 w-px bg-white/[0.07]"
            style={{ left: `${n * 25}%` }}
          />
        ))}

        {STATS.map((s, i) => (
          <div
            key={i}
            className="stat-item px-0 py-14 md:px-10 first:pl-0"
            style={{ clipPath: 'inset(0 0% 0 0)' }}
          >
            {/* Number */}
            <div
              className="stat-num font-black leading-none tracking-[-0.05em] text-white mb-5"
              style={{ fontSize: 'clamp(3.5rem, 6.5vw, 5.5rem)' }}
            >
              0{s.suffix}
            </div>

            {/* Label */}
            <p className="text-[0.7rem] text-white/35 tracking-[0.1em] uppercase mb-2">
              {s.label}
            </p>

            {/* Sub */}
            <p className="stat-sub text-[0.58rem] text-white/15 tracking-[0.14em]">
              {s.sub}
            </p>
          </div>
        ))}
      </div>

      {/* Bottom divider */}
      <div className="stats-line-bottom w-full h-px bg-white/[0.07]" />
    </section>
  );
}
