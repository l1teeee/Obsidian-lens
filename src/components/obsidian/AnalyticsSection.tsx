'use client';
import gsap from 'gsap';
import { useGSAP } from '../../hooks/useGSAP';

const bars = [
  { day: 'Mon', h: 55 },
  { day: 'Tue', h: 38 },
  { day: 'Wed', h: 78 },
  { day: 'Thu', h: 48 },
  { day: 'Fri', h: 68 },
];

const features = [
  'Predictive Engagement Modeling',
  'Competitor Heatmap Overlays',
  'Cross-Platform Attribution Metrics',
];

export default function AnalyticsSection() {
  const scope = useGSAP(() => {
    const st = {
      trigger: '#Analytics',
      start: 'top 85%',
      toggleActions: 'play none none none',
    };

    gsap.from('[data-a="chart"]', {
      opacity: 0,
      x: -32,
      duration: 0.9,
      ease: 'power4.out',
      scrollTrigger: st,
    });

    gsap.from('[data-a="copy"]', {
      opacity: 0,
      x: 32,
      duration: 0.9,
      ease: 'power4.out',
      delay: 0.1,
      scrollTrigger: st,
    });

    gsap.from('[data-a="bar"]', {
      height: 0,
      duration: 0.7,
      stagger: 0.08,
      ease: 'power4.out',
      delay: 0.2,
      scrollTrigger: st,
    });

    gsap.from('[data-a="feature"]', {
      opacity: 0,
      x: 16,
      duration: 0.6,
      stagger: 0.08,
      delay: 0.3,
      scrollTrigger: st,
    });
  }, []);

  return (
    <section ref={scope} id="Analytics" className="py-36 bg-[#131313]/40 relative overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 grid lg:grid-cols-2 gap-20 items-center">

        {/* Chart card */}
        <div data-a="chart" className="relative order-2 lg:order-1">
          {/* Ambient blobs */}
          <div className="absolute -top-16 -left-16 w-56 h-56 bg-[#d394ff]/8 rounded-full blur-[80px] pointer-events-none" />
          <div className="absolute -bottom-16 -right-16 w-56 h-56 bg-[#aa30fa]/8 rounded-full blur-[80px] pointer-events-none" />

          <div className="relative z-10 bg-[#1a1919]/70 backdrop-blur-xl border border-[#494847]/15 rounded-3xl p-8">
            {/* Header */}
            <div className="flex items-start justify-between mb-10">
              <div>
                <p className="text-[0.6875rem] font-bold text-[#adaaaa]/60 uppercase tracking-widest mb-1">
                  Engagement Velocity
                </p>
                <p className="text-3xl font-extrabold font-headline text-white">
                  342,109{' '}
                  <span className="text-sm font-semibold text-[#d394ff]">+12.4%</span>
                </p>
              </div>
              <div className="flex gap-2">
                {['↓', '⋯'].map((icon, i) => (
                  <button key={i} className="w-8 h-8 rounded-full bg-[#262626] text-[#adaaaa] text-xs flex items-center justify-center hover:text-white transition-colors">
                    {icon}
                  </button>
                ))}
              </div>
            </div>

            {/* Bar chart */}
            <div className="flex items-end gap-3 h-40 mb-3">
              {bars.map((bar) => (
                <div
                  key={bar.day}
                  data-a="bar"
                  className="flex-1 rounded-t-lg relative overflow-hidden"
                  style={{ height: `${bar.h}%` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-[#d394ff]/50 to-[#d394ff]/10 border-t border-[#d394ff]/40" />
                </div>
              ))}
            </div>
            <div className="flex justify-between px-0.5">
              {bars.map((bar) => (
                <span key={bar.day} className="flex-1 text-center text-[0.6rem] font-bold text-[#adaaaa]/35 uppercase tracking-widest">
                  {bar.day}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Copy */}
        <div data-a="copy" className="space-y-8 order-1 lg:order-2">
          <span className="inline-block bg-[#d394ff]/10 border border-[#d394ff]/20 px-4 py-1.5 rounded-full text-[0.6875rem] font-bold tracking-[0.15em] text-[#d394ff] uppercase">
            Advanced Intelligence
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold font-headline leading-tight tracking-tight text-white">
            Data as beautiful<br />as your content.
          </h2>
          <p className="text-lg text-[#adaaaa] font-light leading-relaxed">
            Obsidian Lens translates complex social signals into editorial insights.
            Identify trend-breakouts before they peak and optimize your posting schedule
            with surgical precision.
          </p>
          <ul className="space-y-5 pt-3">
            {features.map((f) => (
              <li key={f} data-a="feature" className="flex items-center gap-4 group">
                <div className="w-6 h-6 rounded-full bg-[#d394ff]/15 flex items-center justify-center text-[#d394ff] group-hover:bg-[#d394ff] group-hover:text-[#4a0076] transition-all duration-300 shrink-0">
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-[#e5e2e1] font-medium text-sm">{f}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
