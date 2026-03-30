import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { useGSAP } from '../hooks/useGSAP';

gsap.registerPlugin(ScrollTrigger);

export default function CTASection() {
  const ref = useGSAP<HTMLElement>(() => {
    // ── Ambient orbs float ───────────────────────────────────
    gsap.to('.cta-orb-left', {
      y: -30, x: 15,
      duration: 6,
      ease: 'power1.inOut',
      yoyo: true,
      repeat: -1,
    });
    gsap.to('.cta-orb-right', {
      y: 25, x: -12,
      duration: 5.2,
      ease: 'power1.inOut',
      yoyo: true,
      repeat: -1,
      delay: 1.4,
    });

    // ── Border line draws around the card ────────────────────
    gsap.fromTo(
      '.cta-border-top',
      { scaleX: 0 },
      {
        scaleX: 1,
        transformOrigin: 'left center',
        duration: 1.2,
        ease: 'expo.out',
        scrollTrigger: {
          trigger: '#cta',
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      },
    );
    gsap.fromTo(
      '.cta-border-bottom',
      { scaleX: 0 },
      {
        scaleX: 1,
        transformOrigin: 'right center',
        duration: 1.2,
        delay: 0.15,
        ease: 'expo.out',
        scrollTrigger: {
          trigger: '#cta',
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      },
    );

    // ── Content stagger ──────────────────────────────────────
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: '#cta',
        start: 'top 78%',
        toggleActions: 'play none none reverse',
      },
    });

    tl.from('.cta-badge', { opacity: 0, y: 10, duration: 0.7, ease: 'power2.out' })
      .from('.cta-title span', {
        y: '110%',
        duration: 1.1,
        stagger: 0.04,
        ease: 'expo.out',
      }, '-=0.4')
      .from('.cta-body', { opacity: 0, y: 20, duration: 0.9, ease: 'power2.inOut' }, '-=0.65')
      .from('.cta-actions > *', {
        autoAlpha: 0,
        y: 20,
        duration: 0.8,
        stagger: 0.12,
        ease: 'power2.out',
      }, '-=0.6')
      .from('.cta-footnote', { opacity: 0, duration: 0.7, ease: 'power2.inOut' }, '-=0.4');

    // ── CTA button hover pulse ────────────────────────────────
    const primaryBtn = document.querySelector('.cta-btn-primary');
    if (primaryBtn) {
      const pulse = gsap.timeline({ paused: true });
      pulse.to(primaryBtn, { scale: 1.04, duration: 0.3, ease: 'power2.out' })
           .to(primaryBtn, { scale: 1,    duration: 0.4, ease: 'elastic.out(1, 0.5)' });

      primaryBtn.addEventListener('mouseenter', () => pulse.restart());
    }
  }, []);

  const titleText = 'Ready to\u00a0build something\u00a0remarkable?';

  return (
    <section id="cta" ref={ref} className="py-32 px-8 md:px-14 bg-black overflow-hidden">
      <div className="relative max-w-4xl mx-auto rounded-2xl border border-white/[0.07] overflow-hidden">
        {/* Ambient glow orbs */}
        <div
          className="cta-orb-left absolute -left-32 -top-32 w-[400px] h-[400px] rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(255,255,255,0.04) 0%, transparent 70%)' }}
        />
        <div
          className="cta-orb-right absolute -right-32 -bottom-32 w-[360px] h-[360px] rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(255,255,255,0.03) 0%, transparent 70%)' }}
        />

        {/* Top border line */}
        <div className="cta-border-top absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-white/20 via-white/10 to-transparent" />

        {/* Dot grid */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.4]"
          style={{
            backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.07) 1px, transparent 1px)',
            backgroundSize: '28px 28px',
            maskImage: 'radial-gradient(ellipse 70% 60% at 50% 50%, black 20%, transparent 100%)',
          }}
        />

        {/* Content */}
        <div className="relative z-10 py-24 px-8 md:px-20 flex flex-col items-center text-center gap-8">
          {/* Badge */}
          <div className="cta-badge flex items-center gap-2.5 border border-white/10 rounded-full px-4 py-2">
            <div className="w-1.5 h-1.5 rounded-full bg-white/40" />
            <span className="text-[0.58rem] tracking-[0.26em] uppercase text-white/30 font-medium">
              Available for new projects
            </span>
          </div>

          {/* Title */}
          <h2
            className="cta-title overflow-hidden font-black tracking-[-0.04em] leading-[0.9] text-white"
            style={{ fontSize: 'clamp(2.4rem, 6vw, 5rem)' }}
          >
            {titleText.split('').map((ch, i) => (
              <span key={i} className="inline-block" style={{ whiteSpace: ch === '\u00a0' ? 'pre' : 'normal' }}>
                {ch}
              </span>
            ))}
          </h2>

          {/* Body */}
          <p className="cta-body text-[0.92rem] text-white/30 leading-relaxed max-w-md">
            We take on a limited number of projects each quarter to maintain the quality our work demands. Spots fill quickly.
          </p>

          {/* Actions */}
          <div className="cta-actions flex flex-col sm:flex-row items-center gap-4">
            <button
              type="button"
              className="cta-btn-primary px-8 py-4 rounded-xl bg-white text-black text-[0.75rem] tracking-[0.18em] uppercase font-bold hover:bg-white/90 transition-colors duration-300"
              data-cursor-hover
            >
              Start a conversation →
            </button>
            <a
              href="#work"
              className="px-8 py-4 rounded-xl border border-white/10 text-white/40 text-[0.75rem] tracking-[0.18em] uppercase font-medium hover:border-white/20 hover:text-white/60 transition-all duration-300"
              data-cursor-hover
            >
              See our work
            </a>
          </div>

          {/* Footnote */}
          <p className="cta-footnote text-[0.58rem] tracking-[0.22em] uppercase text-white/15">
            No commitment required · First call is always free
          </p>
        </div>

        {/* Bottom border line */}
        <div className="cta-border-bottom absolute bottom-0 left-0 right-0 h-px bg-gradient-to-l from-white/20 via-white/10 to-transparent" />
      </div>
    </section>
  );
}
