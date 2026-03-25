'use client';
import gsap from 'gsap';
import { useGSAP } from '../../hooks/useGSAP';

export default function ObsidianHero() {
  const scope = useGSAP(() => {
    const tl = gsap.timeline({ delay: 0.1 });
    tl
      .from('[data-h="badge"]',  { opacity: 0, y: 16, duration: 0.7, ease: 'power3.out' })
      .from('[data-h="title"]',  { opacity: 0, y: 24, duration: 0.9, ease: 'power4.out' }, '-=0.4')
      .from('[data-h="sub"]',    { opacity: 0, y: 16, duration: 0.8, ease: 'power3.out' }, '-=0.5')
      .from('[data-h="cta"]',    { opacity: 0, y: 16, duration: 0.7, ease: 'power3.out' }, '-=0.4')
      .from('[data-h="note"]',   { opacity: 0, duration: 0.6, ease: 'power2.out' },        '-=0.3')
      .from('[data-h="mockup"]', { opacity: 0, x: 40, duration: 1.1, ease: 'power4.out' }, '<-=0.8');
  }, []);

  return (
    <section ref={scope} className="relative min-h-screen flex items-center px-6 md:px-12 pt-36 pb-28 max-w-[1440px] mx-auto overflow-hidden">
      {/* Ambient glow */}
      <div
        className="pointer-events-none absolute top-[-10%] left-1/2 -translate-x-1/2 w-[900px] h-[700px] -z-10 opacity-60"
        style={{
          background:
            'radial-gradient(ellipse at center, rgba(211,148,255,0.12) 0%, rgba(138,43,226,0.05) 50%, transparent 75%)',
          filter: 'blur(40px)',
        }}
      />

      <div className="grid lg:grid-cols-[1.15fr_1fr] gap-14 items-center w-full">
        {/* Left — copy */}
        <div className="space-y-9">
          <div data-h="badge">
            <span className="inline-flex items-center gap-2 bg-[#262626]/60 border border-[#494847]/30 px-4 py-1.5 rounded-full text-[0.6875rem] font-bold tracking-[0.15em] text-[#d394ff] uppercase backdrop-blur-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-[#d394ff] animate-pulse" />
              Unified Intelligence
            </span>
          </div>

          <h1
            data-h="title"
            className="text-5xl md:text-6xl lg:text-7xl font-extrabold font-headline leading-[1.04] tracking-[-0.03em] text-white"
          >
            Your social universe,{' '}
            <span className="bg-gradient-to-r from-[#d394ff] to-[#aa30fa] bg-clip-text text-transparent">
              synchronized.
            </span>
          </h1>

          <p data-h="sub" className="text-lg text-[#adaaaa] max-w-xl font-light leading-relaxed">
            The world's first editorial CRM designed for high-impact creative brands.
            Manage Instagram, LinkedIn, and Facebook through a single, obsidian-dark lens.
          </p>

          <div data-h="cta" className="flex flex-col sm:flex-row gap-4 pt-2">
            <button className="bg-[#d394ff] text-[#4a0076] px-9 py-4 rounded-xl text-base font-bold hover:shadow-[0_0_40px_rgba(211,148,255,0.35)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-300">
              Claim Your Workspace
            </button>
            <button className="bg-[#262626]/40 backdrop-blur-sm border border-[#494847]/25 px-9 py-4 rounded-xl text-base font-semibold text-white hover:bg-[#262626]/70 transition-all duration-300">
              Watch the Demo
            </button>
          </div>

          <p data-h="note" className="text-xs text-[#777575]">
            No credit card required · Cancel anytime
          </p>
        </div>

        {/* Right — dashboard mockup */}
        <div data-h="mockup" className="relative group hidden lg:block">
          <div className="absolute -inset-3 bg-gradient-to-br from-[#d394ff]/20 to-[#aa30fa]/10 rounded-2xl blur-2xl opacity-30 group-hover:opacity-60 transition-opacity duration-1000" />
          <div className="relative bg-[#1a1919]/70 backdrop-blur-xl border border-[#494847]/20 rounded-2xl p-6 overflow-hidden">
            {/* Window chrome */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-[#d73357]/50" />
                <div className="w-3 h-3 rounded-full bg-[#f47788]/50" />
                <div className="w-3 h-3 rounded-full bg-[#d394ff]/50" />
              </div>
              <div className="h-5 w-28 bg-[#262626] rounded-full" />
            </div>

            {/* Mockup content grid */}
            <div className="grid grid-cols-2 gap-4 h-64">
              <div className="bg-[#131313] rounded-xl p-4 space-y-3">
                <div className="h-3 w-2/3 bg-[#d394ff]/20 rounded-full" />
                <div className="h-20 w-full bg-gradient-to-br from-[#d394ff]/10 to-transparent rounded-lg" />
                <div className="space-y-1.5">
                  <div className="h-2 w-full bg-[#262626] rounded-full" />
                  <div className="h-2 w-5/6 bg-[#262626] rounded-full" />
                  <div className="h-2 w-4/6 bg-[#262626] rounded-full" />
                </div>
              </div>
              <div className="flex flex-col gap-4">
                <div className="flex-1 bg-[#131313] rounded-xl p-4 flex flex-col justify-end">
                  <div className="text-3xl font-extrabold font-headline text-[#d394ff] leading-none">84%</div>
                  <div className="text-[0.6rem] text-[#adaaaa]/60 uppercase tracking-widest mt-1">Growth Velocity</div>
                </div>
                <div className="flex-1 bg-[#262626]/50 rounded-xl p-4 border border-[#d394ff]/10">
                  <div className="flex items-end gap-1.5 h-full pb-1">
                    {[40, 65, 50, 90, 70, 85].map((h, i) => (
                      <div
                        key={i}
                        className="flex-1 rounded-t bg-gradient-to-t from-[#d394ff] to-[#aa30fa]/40"
                        style={{ height: `${h}%` }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom stat row */}
            <div className="mt-4 flex items-center justify-between px-1">
              {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((d) => (
                <span key={d} className="text-[0.6rem] text-[#adaaaa]/30 uppercase tracking-widest">{d}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
