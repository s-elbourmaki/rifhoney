import { useEffect, useRef, useState } from 'react';

function useInView(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setInView(true);
    }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

const benefits = [
  {
    title: 'Rich in Antioxidants',
    desc: 'Mountain honey contains significantly higher flavonoid and phenolic acid concentrations than commercially produced honey.',
    detail: 'Protects cells from oxidative stress',
  },
  {
    title: 'Natural Antimicrobial',
    desc: 'High levels of hydrogen peroxide, defensin-1, and methylglyoxal create powerful antibacterial properties.',
    detail: 'Used in wound healing for millennia',
  },
  {
    title: 'Digestive Support',
    desc: 'Raw honey contains natural prebiotic oligosaccharides that nourish beneficial gut bacteria and support digestion.',
    detail: 'Supports microbiome health',
  },
  {
    title: 'Sleep & Recovery',
    desc: 'A slow-release glycogen precursor, honey taken before sleep fuels the liver and promotes deeper rest cycles.',
    detail: 'Trusted by athletes worldwide',
  },
  {
    title: 'Energy Without Crash',
    desc: 'The unique fructose-glucose ratio in raw honey provides sustained energy without the blood sugar spikes of refined sugars.',
    detail: 'Low glycemic index profile',
  },
  {
    title: 'Immune Fortification',
    desc: 'Pollen grains, propolis traces, and bee enzymes work synergistically to support and regulate immune function.',
    detail: 'Seasonal allergy support reported',
  },
];

export default function Benefits() {
  const { ref, inView } = useInView();

  return (
    <section className="section-py bg-[#0D0903]">
      <div className="max-w-7xl mx-auto container-px">
        {/* Header */}
        <div ref={ref} className={`text-center mb-16 md:mb-20 transition-all duration-1000 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="flex items-center justify-center gap-3 mb-6">
            <span className="h-px w-12 bg-[#C8860A]" />
            <span className="text-[10px] tracking-[0.4em] uppercase text-[#C8860A]">Nature's Medicine</span>
            <span className="h-px w-12 bg-[#C8860A]" />
          </div>
          <h2 className="serif text-4xl md:text-5xl lg:text-6xl font-light text-[#FDF6E3] mb-4">
            Why Raw Honey <em className="gold-text not-italic font-medium">Matters</em>
          </h2>
          <p className="text-[#FDF6E350] text-sm md:text-base max-w-2xl mx-auto">
            Unlike processed honey heated above 70°C, raw mountain honey retains its full biological complexity — a living food with genuine therapeutic properties.
          </p>
        </div>

        {/* Benefits grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.map((benefit, i) => (
            <div
              key={benefit.title}
              className={`group relative bg-[#150E05] border border-[#C8860A15] p-8 hover:border-[#C8860A30] transition-all duration-500 hover-lift ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              {/* Number */}
              <div className="serif text-5xl font-light text-[#C8860A10] group-hover:text-[#C8860A20] transition-colors duration-500 mb-4 leading-none">
                {String(i + 1).padStart(2, '0')}
              </div>

              {/* Gold line */}
              <div className="h-px w-8 bg-gradient-to-r from-[#C8860A] to-transparent mb-5 group-hover:w-16 transition-all duration-500" />

              <h3 className="serif text-xl font-medium text-[#FDF6E3] mb-3">{benefit.title}</h3>
              <p className="text-[#FDF6E360] text-sm leading-relaxed mb-4">{benefit.desc}</p>
              <span className="text-[9px] tracking-[0.2em] uppercase text-[#C8860A] border border-[#C8860A30] px-3 py-1">
                {benefit.detail}
              </span>
            </div>
          ))}
        </div>

        {/* Highlight band */}
        <div className={`mt-16 glass border border-[#C8860A20] p-8 md:p-10 text-center transition-all duration-1000 delay-500 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <p className="serif text-xl md:text-2xl text-[#FDF6E3] font-light leading-relaxed max-w-3xl mx-auto">
            "Raw honey is one of humanity's oldest medicines. At RIF HONEY, we protect that legacy — ensuring every jar you receive retains the full biological intelligence of the hive."
          </p>
          <div className="mt-4 flex items-center justify-center gap-2">
            <span className="h-px w-8 bg-[#C8860A60]" />
            <span className="text-[10px] tracking-widest text-[#C8860A80] uppercase">Bilal, Head Beekeeper</span>
            <span className="h-px w-8 bg-[#C8860A60]" />
          </div>
        </div>
      </div>
    </section>
  );
}
