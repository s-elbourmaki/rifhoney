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

const steps = [
  {
    number: '01',
    title: 'Wild Foraging',
    desc: 'Our native Moroccan bees roam up to 5km across pristine mountain flora — cedar, thyme, lavender, and over 40 rare alpine species — gathering the most complex nectar profiles on earth.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1} className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"/>
      </svg>
    ),
  },
  {
    number: '02',
    title: 'Hive Harmony',
    desc: "We monitor our hives with extreme care, never disturbing the colonies unnecessarily. Harvests only happen when surplus honey exists — ensuring our bees' long-term health and vitality.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1} className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"/>
      </svg>
    ),
  },
  {
    number: '03',
    title: 'Cold Extraction',
    desc: 'Honey is extracted using a traditional cold-press method at ambient temperature — never above 35°C. This preserves every enzyme, antioxidant, pollen grain, and volatile aromatic compound.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1} className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15M14.25 3.104c.251.023.501.05.75.082M19.8 15a2.25 2.25 0 01.45 1.344l.001.5A2.25 2.25 0 0118 19h-1.368M19.8 15H5M5 14.5l-.752.625A2.25 2.25 0 002 17v.5a2.25 2.25 0 002.25 2.25H6"/>
      </svg>
    ),
  },
  {
    number: '04',
    title: 'Micro-Filtration',
    desc: 'A gentle coarse filtration removes only wax particles and debris — keeping all pollen, propolis, and micronutrients that make raw honey genuinely different from commercial products.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1} className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 01-.659 1.591l-5.432 5.432a2.25 2.25 0 00-.659 1.591v2.927a2.25 2.25 0 01-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 00-.659-1.591L3.659 7.409A2.25 2.25 0 013 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0112 3z"/>
      </svg>
    ),
  },
  {
    number: '05',
    title: 'Quality Testing',
    desc: 'Every batch is lab-tested for purity, moisture content, HMF levels, and botanical origin. Only honey meeting our strict parameters earns the RIF HONEY seal.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1} className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
      </svg>
    ),
  },
  {
    number: '06',
    title: 'Artisan Bottling',
    desc: 'Jarred by hand in our mountain facility, sealed, and labelled with the precise harvest date, apiary location, and floral profile. Your jar is a product of complete traceability.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1} className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z"/>
      </svg>
    ),
  },
];

export default function Process() {
  const { ref, inView } = useInView();

  return (
    <section id="process" className="section-py bg-[#0B0703] relative overflow-hidden">
      {/* Large background image with heavy overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="/images/beekeeper.jpg"
          alt="RIF HONEY production process"
          className="w-full h-full object-cover object-center"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-[#0B0703EE]" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0B0703] via-transparent to-[#0B0703]" />
      </div>

      <div className="max-w-7xl mx-auto container-px relative z-10">
        {/* Header */}
        <div ref={ref} className={`text-center mb-16 md:mb-24 transition-all duration-1000 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="flex items-center justify-center gap-3 mb-6">
            <span className="h-px w-12 bg-[#C8860A]" />
            <span className="text-[10px] tracking-[0.4em] uppercase text-[#C8860A]">From Hive to Jar</span>
            <span className="h-px w-12 bg-[#C8860A]" />
          </div>
          <h2 className="serif text-4xl md:text-5xl lg:text-6xl font-light text-[#FDF6E3] mb-4">
            The <em className="gold-text not-italic font-medium">Process</em>
          </h2>
          <p className="text-[#FDF6E350] text-sm md:text-base max-w-xl mx-auto">
            Six meticulous steps that transform mountain nectar into liquid gold — with zero shortcuts.
          </p>
        </div>

        {/* Steps grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-[#C8860A15]">
          {steps.map((step, i) => (
            <div
              key={step.number}
              className={`glass-light p-8 md:p-10 group hover:bg-[#C8860A08] transition-all duration-500 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <div className="flex items-start gap-4 mb-5">
                <span className="serif text-4xl font-light text-[#C8860A20] leading-none">{step.number}</span>
                <div className="w-10 h-10 flex items-center justify-center border border-[#C8860A40] group-hover:border-[#C8860A] group-hover:text-[#F5A623] text-[#C8860A80] transition-all duration-300">
                  {step.icon}
                </div>
              </div>
              <h3 className="serif text-xl md:text-2xl font-medium text-[#FDF6E3] mb-3">{step.title}</h3>
              <p className="text-[#FDF6E350] text-sm leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
