import { useEffect, useRef, useState } from 'react';

function useInView(threshold = 0.2) {
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

export default function HexBanner() {
  const { ref, inView } = useInView();

  return (
    <section className="py-20 md:py-28 relative overflow-hidden bg-[#C8860A]">
      {/* Hex overlay texture */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="hex-banner-pattern" x="0" y="0" width="60" height="52" patternUnits="userSpaceOnUse">
              <polygon points="30,2 57,17 57,47 30,62 3,47 3,17" fill="none" stroke="#1A1208" strokeWidth="1.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#hex-banner-pattern)" />
        </svg>
      </div>

      <div ref={ref} className={`max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 transition-all duration-1000 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        <p className="text-[9px] tracking-[0.5em] uppercase text-[#1A120880] mb-4">Limited Seasonal Harvest</p>
        <h2 className="serif text-3xl md:text-5xl font-bold text-[#1A1208] leading-tight mb-4">
          Spring 2026 Collection <br className="hidden sm:block" />Now Available
        </h2>
        <p className="text-[#1A120870] text-sm md:text-base max-w-xl mx-auto mb-8 leading-relaxed">
          Our spring harvest is the most prized — wildflowers in peak bloom, bees at their most industrious. Quantities are strictly limited.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={() => document.querySelector('#collection')?.scrollIntoView({ behavior: 'smooth' })}
            className="bg-[#1A1208] text-[#F5A623] px-10 py-4 text-xs tracking-[0.3em] uppercase font-semibold hover:bg-[#2C1F0A] transition-colors w-full sm:w-auto"
          >
            Shop the Harvest
          </button>
          <button
            onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="border-2 border-[#1A1208] text-[#1A1208] px-10 py-4 text-xs tracking-[0.3em] uppercase font-semibold hover:bg-[#1A120815] transition-colors w-full sm:w-auto"
          >
            Reserve Your Order
          </button>
        </div>
      </div>
    </section>
  );
}
