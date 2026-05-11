import { useEffect, useRef, useState } from 'react';

function useInView(threshold = 0.15) {
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

export default function About() {
  const { ref, inView } = useInView();

  return (
    <section className="section-py bg-[#0D0903]">
      <div className="max-w-7xl mx-auto container-px">
        <div ref={ref} className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Images column */}
          <div className={`relative transition-all duration-1000 ${inView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'}`}>
            <div className="relative">
              {/* Main image */}
              <div className="relative overflow-hidden rounded-none">
                <img
                  src="/images/honeycomb-pattern.jpg"
                  alt="Golden honeycomb with bees — RIF HONEY natural process"
                  className="w-full h-72 md:h-[480px] object-cover"
                  loading="lazy"
                  width="800"
                  height="600"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0F0A0480] to-transparent" />
              </div>

              {/* Floating image - hidden on small mobile to reduce clutter */}
              <div className="hidden xs:block absolute -bottom-10 -right-4 md:-right-10 w-36 md:w-52 h-36 md:h-52 overflow-hidden border-4 border-[#0F0A04] shadow-2xl animate-float" style={{ animationDelay: '1s' }}>
                <img
                  src="/images/about-bees.jpg"
                  alt="Honey bees on honeycomb — RIF HONEY"
                  className="w-full h-full object-cover"
                  loading="lazy"
                  width="400"
                  height="400"
                />
              </div>

              {/* Hexagon badge */}
              <div className="absolute top-6 left-6 w-20 h-20 flex items-center justify-center">
                <svg viewBox="0 0 100 100" className="w-full h-full absolute">
                  <polygon points="50,5 90,27.5 90,72.5 50,95 10,72.5 10,27.5" fill="#C8860A" />
                </svg>
                <div className="relative z-10 text-center">
                  <div className="text-[#1A1208] font-bold text-lg leading-none serif">15+</div>
                  <div className="text-[#1A120880] text-[8px] leading-tight tracking-widest uppercase">Years</div>
                </div>
              </div>
            </div>
          </div>

          {/* Text column */}
          <div className={`transition-all duration-1000 delay-200 ${inView ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'}`}>
            <div className="flex items-center gap-3 mb-6">
              <span className="h-px w-8 bg-[#C8860A]" />
              <span className="text-[10px] tracking-[0.4em] uppercase text-[#C8860A]">Our Heritage</span>
            </div>

            <h2 className="serif text-4xl md:text-5xl lg:text-6xl font-light text-[#FDF6E3] leading-tight mb-6">
              Where Nature <br />
              <em className="gold-text font-medium not-italic">Perfects</em> the Art
            </h2>

            <p className="text-[#FDF6E370] leading-relaxed mb-6 text-base md:text-lg lg:text-xl">
              Nestled deep within the Chakrane Mountains of Morocco's breathtaking Rif region, our family has cultivated a sacred relationship with the land for generations. At elevations exceeding 1,500 meters, our bees roam freely across some of North Africa's most pristine and biodiverse landscapes.
            </p>

            <p className="text-[#FDF6E370] leading-relaxed mb-10 text-base md:text-lg lg:text-xl">
              The unique combination of cedar forests, wild thyme, mountain lavender, and rare alpine flora imparts an extraordinary complexity to our honey — a terroir as distinctive and celebrated as the world's finest wines.
            </p>

            {/* Feature list */}
            <div className="space-y-4 mb-10">
              {[
                { title: 'Cold Extracted', desc: 'Never heated above 35°C, preserving all enzymes, pollen, and nutrients.' },
                { title: 'Zero Additives', desc: 'Pure, raw, and unfiltered — exactly as nature intended.' },
                { title: 'Traceable Origin', desc: 'Every jar comes with a harvest location and batch number.' },
              ].map((item) => (
                <div key={item.title} className="flex gap-4 items-start">
                  <div className="w-5 h-5 flex-shrink-0 mt-0.5">
                    <svg viewBox="0 0 100 100">
                      <polygon points="50,5 90,27.5 90,72.5 50,95 10,72.5 10,27.5" fill="#C8860A" />
                    </svg>
                  </div>
                  <div>
                    <span className="text-[#F5A623] text-xs tracking-widest uppercase font-semibold">{item.title}</span>
                    <p className="text-[#FDF6E360] text-sm mt-0.5">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <a
              href="#farm"
              onClick={(e) => { e.preventDefault(); document.querySelector('#farm')?.scrollIntoView({ behavior: 'smooth' }); }}
              className="inline-flex items-center gap-3 text-xs tracking-[0.25em] uppercase text-[#F5A623] hover:text-[#FDF6E3] transition-colors group"
            >
              <span>Discover the Farm</span>
              <svg className="w-4 h-4 transition-transform group-hover:translate-x-2" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
