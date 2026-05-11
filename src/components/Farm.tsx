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

const farmStats = [
  { value: '320', unit: 'Hives', desc: 'Active colonies across 4 mountain apiaries' },
  { value: '6M+', unit: 'Bees', desc: 'Working in harmony with mountain ecosystems' },
  { value: '2', unit: 'Harvests', desc: 'Spring and late summer per year' },
  { value: '1,800', unit: 'Meters', desc: 'Highest apiary elevation in the Rif' },
];

export default function Farm() {
  const { ref, inView } = useInView();

  return (
    <section id="farm" className="section-py bg-[#0F0A04] relative overflow-hidden">
      {/* Subtle hex bg pattern */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="hex-pattern" x="0" y="0" width="60" height="52" patternUnits="userSpaceOnUse">
              <polygon points="30,2 57,17 57,47 30,62 3,47 3,17" fill="none" stroke="#F5A623" strokeWidth="1"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#hex-pattern)"/>
        </svg>
      </div>

      <div className="max-w-7xl mx-auto container-px relative z-10">
        <div ref={ref} className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Text side */}
          <div className={`order-2 lg:order-1 transition-all duration-1000 ${inView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'}`}>
            <div className="flex items-center gap-3 mb-6">
              <span className="h-px w-8 bg-[#C8860A]" />
              <span className="text-[10px] tracking-[0.4em] uppercase text-[#C8860A]">The Apiaries</span>
            </div>

            <h2 className="serif text-4xl md:text-5xl lg:text-6xl font-light text-[#FDF6E3] leading-tight mb-6">
              Guardians of the <br />
              <em className="gold-text not-italic font-medium">Mountain</em>
            </h2>

            <p className="text-[#FDF6E370] text-sm md:text-base leading-relaxed mb-6">
              Our four apiaries are positioned at strategic altitudes across the Chakrane highlands — each chosen for its exceptional biodiversity, pristine water sources, and distance from any human pollution. Our Apis mellifera intermissa bees, a rare native Moroccan subspecies, are perfectly adapted to these harsh mountain conditions.
            </p>

            <p className="text-[#FDF6E370] text-sm md:text-base leading-relaxed mb-10">
              We practice traditional, low-intervention beekeeping: no antibiotics, no sugar feeding, no artificial insemination. Our bees live and forage as they have for thousands of years — free, wild, and sovereign.
            </p>

            {/* Stats grid */}
            <div className="grid grid-cols-2 gap-6">
              {farmStats.map((stat, i) => (
                <div
                  key={stat.unit}
                  className={`border-l-2 border-[#C8860A] pl-4 transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
                  style={{ transitionDelay: `${200 + i * 100}ms` }}
                >
                  <div className="flex items-baseline gap-1">
                    <span className="serif text-2xl md:text-3xl font-semibold gold-text">{stat.value}</span>
                    <span className="text-[10px] tracking-widest uppercase text-[#F5A62380] font-medium">{stat.unit}</span>
                  </div>
                  <p className="text-[#FDF6E340] text-xs mt-1 leading-relaxed">{stat.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Image side */}
          <div className={`order-1 lg:order-2 transition-all duration-1000 delay-200 ${inView ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'}`}>
            <div className="space-y-4">
              {/* Main farm image */}
              <div className="relative overflow-hidden">
                <img
                  src="https://images.pexels.com/photos/28124160/pexels-photo-28124160.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200"
                  alt="Chakrane Mountain farmland — RIF HONEY apiary location"
                  className="w-full h-56 md:h-80 object-cover"
                  loading="lazy"
                  width="1200"
                  height="627"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0F0A0480] to-transparent" />
                <div className="absolute bottom-4 left-4">
                  <span className="text-[9px] tracking-[0.3em] uppercase text-[#F5A62380]">Chakrane Mountains · Morocco</span>
                </div>
              </div>

              {/* Beekeeper image */}
              <div className="grid grid-cols-2 gap-4">
                <div className="relative overflow-hidden">
                  <img
                    src="https://images.pexels.com/photos/4247092/pexels-photo-4247092.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=400&w=400"
                    alt="RIF HONEY beekeeper inspecting hives"
                    className="w-full h-32 md:h-44 object-cover"
                    loading="lazy"
                    width="400"
                    height="400"
                  />
                  <div className="absolute inset-0 bg-[#C8860A10]" />
                </div>
                <div className="relative overflow-hidden">
                  <img
                    src="https://images.pexels.com/photos/5247989/pexels-photo-5247989.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=400&w=400"
                    alt="Honeycomb frame inspection at RIF HONEY farm"
                    className="w-full h-32 md:h-44 object-cover"
                    loading="lazy"
                    width="400"
                    height="400"
                  />
                  <div className="absolute inset-0 bg-[#C8860A10]" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
