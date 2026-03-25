'use client';
import gsap from 'gsap';
import { useGSAP } from '../../hooks/useGSAP';

export default function CTASection() {
  const scope = useGSAP(() => {
    gsap.from('.cta-content', {
      opacity: 0,
      y: 32,
      duration: 1,
      ease: 'power4.out',
      scrollTrigger: {
        trigger: '#CTA',
        start: 'top 85%',
        toggleActions: 'play none none none',
      },
    });
  }, []);

  return (
    <section ref={scope} id="CTA" className="py-44 px-6 relative overflow-hidden">
      {/* Background glow */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div className="w-[700px] h-[400px] bg-[#d394ff]/6 rounded-full blur-[100px]" />
      </div>

      <div className="cta-content relative z-10 max-w-[860px] mx-auto text-center space-y-12">
        <h2 className="text-5xl md:text-7xl font-extrabold font-headline tracking-tight leading-[1.0] text-white">
          Ready to refine<br />
          <span className="bg-gradient-to-r from-[#d394ff] to-[#aa30fa] bg-clip-text text-transparent">
            your reach?
          </span>
        </h2>

        <div className="flex flex-col sm:flex-row justify-center items-center gap-5">
          <button className="w-full sm:w-auto bg-white text-[#0e0e0e] px-12 py-5 rounded-2xl text-lg font-bold hover:bg-[#d394ff] hover:text-[#4a0076] transition-all duration-300 hover:shadow-[0_0_40px_rgba(211,148,255,0.3)]">
            Start Free Trial
          </button>
          <button className="w-full sm:w-auto bg-[#1a1919]/60 backdrop-blur-sm border border-[#494847]/25 px-12 py-5 rounded-2xl text-lg font-semibold text-white hover:border-[#d394ff]/40 transition-all duration-300">
            Book Concierge Demo
          </button>
        </div>

        <p className="text-sm text-[#777575]">
          No credit card required · Cancel anytime · Seamless migration from HubSpot or Salesforce
        </p>
      </div>
    </section>
  );
}
