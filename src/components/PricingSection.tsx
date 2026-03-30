import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { useGSAP } from '../hooks/useGSAP';

gsap.registerPlugin(ScrollTrigger);

const TIERS = [
  {
    name: 'Per Project',
    price: '8,000',
    unit: 'starting at',
    description: 'Ideal for one-off campaigns, launches, and standalone digital experiences.',
    cta: 'Start a Project',
    featured: false,
    features: [
      'Brand identity or single campaign',
      'Motion design & animation',
      'Dedicated creative director',
      'Up to 3 revision rounds',
      'Source files included',
      '30-day post-launch support',
    ],
  },
  {
    name: 'Retainer',
    price: '5,400',
    unit: 'per month',
    description: 'For brands that demand consistent, high-calibre creative output month over month.',
    cta: 'Apply Now',
    featured: true,
    badge: 'Most Popular',
    features: [
      'Everything in Per Project',
      '40 dedicated studio hours/mo',
      'Priority turnaround (48h)',
      'Monthly strategy sessions',
      'Unlimited revision rounds',
      'Dedicated Slack channel',
      'Annual retrospective report',
    ],
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    unit: 'talk to us',
    description: 'White-glove creative partnerships for agencies, studios, and enterprise teams.',
    cta: 'Contact Sales',
    featured: false,
    features: [
      'Everything in Retainer',
      'Full embedded studio team',
      'NDA & custom contracts',
      'On-site workshops available',
      'White-label deliverables',
      'Custom SLA & support',
    ],
  },
] as const;

const CheckIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
    <circle cx="7" cy="7" r="6.5" stroke="rgba(255,255,255,0.15)" />
    <path d="M4 7l2 2 4-4" stroke="rgba(255,255,255,0.5)" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export default function PricingSection() {
  const ref = useGSAP<HTMLElement>(() => {
    // ── Heading ──────────────────────────────────────────────
    const headTl = gsap.timeline({
      scrollTrigger: {
        trigger: '#pricing',
        start: 'top 80%',
        toggleActions: 'play none none reverse',
      },
    });

    headTl
      .from('.pricing-eyebrow', { opacity: 0, y: 10, duration: 0.8, ease: 'power2.out' })
      .from('.pricing-title span', {
        y: '110%',
        duration: 1.1,
        stagger: 0.04,
        ease: 'expo.out',
      }, '-=0.5')
      .from('.pricing-sub', { opacity: 0, y: 14, duration: 0.9, ease: 'power2.out' }, '-=0.55');

    // ── Cards stagger in ─────────────────────────────────────
    gsap.from('.pricing-card', {
      autoAlpha: 0,
      y: 60,
      duration: 1.2,
      stagger: 0.15,
      ease: 'expo.out',
      scrollTrigger: {
        trigger: '.pricing-grid',
        start: 'top 78%',
        toggleActions: 'play none none reverse',
      },
    });

    // ── Featured card: glowing ring pulses ───────────────────
    gsap.to('.pricing-glow-ring', {
      opacity: 0.6,
      scale: 1.04,
      duration: 2.4,
      ease: 'power1.inOut',
      yoyo: true,
      repeat: -1,
    });

    // ── Feature list items stagger within each card ──────────
    gsap.utils.toArray<HTMLElement>('.pricing-card').forEach((card) => {
      gsap.from(card.querySelectorAll('.pricing-feature'), {
        opacity: 0,
        x: -12,
        duration: 0.7,
        stagger: 0.06,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: card,
          start: 'top 76%',
          toggleActions: 'play none none reverse',
        },
      });
    });

    // ── Divider lines draw in ────────────────────────────────
    gsap.fromTo(
      '.pricing-divider',
      { scaleX: 0 },
      {
        scaleX: 1,
        transformOrigin: 'left center',
        duration: 1.4,
        ease: 'expo.out',
        scrollTrigger: {
          trigger: '#pricing',
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      },
    );
  }, []);

  return (
    <section id="pricing" ref={ref} className="py-40 px-8 md:px-14 bg-black overflow-hidden">
      {/* Top divider */}
      <div className="pricing-divider w-full h-px bg-white/[0.07] mb-20" />

      {/* Heading */}
      <div className="mb-20 text-center max-w-2xl mx-auto">
        <span className="pricing-eyebrow block text-[0.62rem] tracking-[0.38em] uppercase text-white/20 mb-8 font-medium">
          Pricing
        </span>
        <h2
          className="pricing-title overflow-hidden leading-[0.9] tracking-[-0.04em] font-black text-white mb-6"
          style={{ fontSize: 'clamp(2.8rem, 6vw, 5.5rem)' }}
        >
          {'Simple pricing.'.split('').map((ch, i) => (
            <span key={i} className="inline-block" style={{ whiteSpace: ch === ' ' ? 'pre' : 'normal' }}>
              {ch}
            </span>
          ))}
        </h2>
        <p className="pricing-sub text-[0.92rem] text-white/30 leading-relaxed">
          Transparent rates. No hidden fees. Every tier includes source files and post-launch support.
        </p>
      </div>

      {/* Cards */}
      <div className="pricing-grid grid grid-cols-1 md:grid-cols-3 gap-4 items-end max-w-6xl mx-auto">
        {TIERS.map((tier) => (
          <div
            key={tier.name}
            className={`pricing-card relative rounded-2xl border p-8 flex flex-col gap-8 ${
              tier.featured
                ? 'border-white/20 bg-white/[0.04]'
                : 'border-white/[0.07] bg-white/[0.02]'
            }`}
          >
            {/* Featured glow ring */}
            {tier.featured && (
              <div
                className="pricing-glow-ring absolute -inset-px rounded-2xl pointer-events-none"
                style={{
                  background: 'radial-gradient(ellipse 80% 40% at 50% 0%, rgba(255,255,255,0.08) 0%, transparent 70%)',
                  border: '1px solid rgba(255,255,255,0.18)',
                }}
              />
            )}

            {/* Badge */}
            {tier.featured && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <span className="text-[0.55rem] tracking-[0.22em] uppercase px-4 py-1.5 rounded-full bg-white text-black font-bold">
                  Most Popular
                </span>
              </div>
            )}

            {/* Header */}
            <div>
              <div className="flex items-baseline justify-between mb-5">
                <span className="text-[0.65rem] tracking-[0.28em] uppercase text-white/30 font-medium">
                  {tier.name}
                </span>
              </div>

              <div className="mb-2">
                {tier.price === 'Custom' ? (
                  <span
                    className="font-black tracking-[-0.05em] text-white"
                    style={{ fontSize: 'clamp(2.2rem, 4vw, 3.2rem)' }}
                  >
                    Custom
                  </span>
                ) : (
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-white/30 text-[0.9rem] font-medium">$</span>
                    <span
                      className="font-black tracking-[-0.05em] text-white"
                      style={{ fontSize: 'clamp(2.2rem, 4vw, 3.2rem)' }}
                    >
                      {tier.price}
                    </span>
                  </div>
                )}
                <span className="text-[0.62rem] tracking-[0.18em] uppercase text-white/20">
                  {tier.unit}
                </span>
              </div>

              <p className="text-[0.82rem] text-white/30 leading-relaxed">
                {tier.description}
              </p>
            </div>

            {/* Divider */}
            <div className="w-full h-px bg-white/[0.07]" />

            {/* Features */}
            <ul className="flex flex-col gap-3.5">
              {tier.features.map((feature) => (
                <li key={feature} className="pricing-feature flex items-center gap-3">
                  <CheckIcon />
                  <span className="text-[0.82rem] text-white/40">{feature}</span>
                </li>
              ))}
            </ul>

            {/* CTA */}
            <button
              type="button"
              className={`mt-auto w-full py-3.5 rounded-xl text-[0.75rem] tracking-[0.14em] uppercase font-bold transition-all duration-300 ${
                tier.featured
                  ? 'bg-white text-black hover:bg-white/90'
                  : 'border border-white/15 text-white/50 hover:border-white/30 hover:text-white/80'
              }`}
              data-cursor-hover
            >
              {tier.cta}
            </button>
          </div>
        ))}
      </div>

      {/* Bottom note */}
      <p className="text-center text-[0.6rem] tracking-[0.2em] uppercase text-white/15 mt-14">
        All projects require 50% deposit · NDA available upon request · Remote & on-site engagements
      </p>
    </section>
  );
}
