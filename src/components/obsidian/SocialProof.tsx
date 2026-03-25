'use client';
import gsap from 'gsap';
import { useGSAP } from '../../hooks/useGSAP';

const brands = ['Vogue', 'Hypebeast', 'Highsnobiety', 'Dazed', 'i-D', 'AnOther'];

export default function SocialProof() {
  const scope = useGSAP(() => {
    gsap.from('.brand-item', {
      opacity: 0,
      duration: 0.5,
      stagger: 0.07,
      scrollTrigger: {
        trigger: '.social-proof-section',
        start: 'top 85%',
        toggleActions: 'play none none none',
      },
    });
  }, []);

  return (
    <section ref={scope} className="social-proof-section py-24 border-y border-[#494847]/15">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12">
        <p className="text-center text-[0.6875rem] font-bold tracking-[0.2em] text-[#adaaaa]/35 uppercase mb-10">
          Empowering the World's Most Creative Networks
        </p>
        <div className="flex flex-wrap justify-center items-center gap-10 md:gap-16">
          {brands.map((brand) => (
            <span
              key={brand}
              className="brand-item text-base md:text-lg font-bold tracking-widest text-[#adaaaa]/20 uppercase hover:text-[#adaaaa]/40 transition-colors duration-300 select-none"
            >
              {brand}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
