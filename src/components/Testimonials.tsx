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

const testimonials = [
  {
    quote: "The Cedar Forest honey from RIF HONEY is unlike anything I have tasted. The depth and complexity rivals a fine aged whisky. I keep a jar on my desk and take a spoonful every afternoon.",
    author: 'Karim B.',
    location: 'Amsterdam, Netherlands',
    stars: 5,
  },
  {
    quote: "We serve RIF HONEY in our Michelin-starred restaurant as a finishing condiment. Our guests are consistently astonished. The Wild Thyme variety is extraordinary.",
    author: 'Chef Isabelle M.',
    location: 'Paris, France',
    stars: 5,
  },
  {
    quote: "I have sourced honey from across the globe for 20 years. What comes out of the Chakrane, Rif Mountains is genuinely in a category of its own. Pure, alive, and deeply complex.",
    author: 'Bilal A.',
    location: 'Al Hoceima, Morocco',
    stars: 5,
  },
  {
    quote: "My grandmother used to say that real honey heals. RIF HONEY reminded me what she meant. The raw comb honey is transcendent — I will never buy anything else.",
    author: 'Layla H.',
    location: 'Casablanca, Morocco',
    stars: 5,
  },
];

export default function Testimonials() {
  const { ref, inView } = useInView();
  const [active, setActive] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActive((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="section-py bg-[#0F0A04] relative overflow-hidden">
      {/* Decorative background - smaller on mobile */}
      <div className="absolute inset-0 flex items-center justify-center opacity-[0.02] pointer-events-none">
        <svg viewBox="0 0 400 400" className="w-64 h-64 sm:w-96 sm:h-96 md:w-[600px] md:h-[600px]">
          <polygon points="200,10 380,110 380,310 200,410 20,310 20,110" fill="none" stroke="#F5A623" strokeWidth="2"/>
          <polygon points="200,40 355,127.5 355,292.5 200,380 45,292.5 45,127.5" fill="none" stroke="#F5A623" strokeWidth="1.5"/>
          <polygon points="200,70 330,145 330,275 200,350 70,275 70,145" fill="none" stroke="#F5A623" strokeWidth="1"/>
        </svg>
      </div>

      <div className="max-w-5xl mx-auto container-px relative z-10">
        {/* Header */}
        <div ref={ref} className={`text-center mb-12 sm:mb-16 transition-all duration-1000 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="flex items-center justify-center gap-3 mb-6">
            <span className="h-px w-8 sm:w-12 bg-[#C8860A]" />
            <span className="text-[10px] tracking-[0.4em] uppercase text-[#C8860A]">What They Say</span>
            <span className="h-px w-8 sm:w-12 bg-[#C8860A]" />
          </div>
          <h2 className="serif text-4xl sm:text-5xl font-light text-[#FDF6E3]">
            Voices of <em className="gold-text not-italic font-medium">Connoisseurs</em>
          </h2>
        </div>

        {/* Testimonial carousel */}
        <div className="relative min-h-[380px] sm:min-h-[420px]">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className={`transition-all duration-700 w-full ${i === active ? 'opacity-100 translate-y-0' : 'opacity-0 absolute inset-0 translate-y-4 pointer-events-none'}`}
            >
              <div className="glass border border-[#C8860A20] p-6 sm:p-12 text-center">
                {/* Stars */}
                <div className="flex items-center justify-center gap-1 mb-4 sm:mb-6">
                  {Array.from({ length: t.stars }).map((_, si) => (
                    <svg key={si} className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#F5A623]" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                    </svg>
                  ))}
                </div>

                {/* Large quote mark */}
                <div className="serif text-5xl sm:text-6xl text-[#C8860A25] leading-none mb-1 select-none">"</div>

                <blockquote className="serif text-lg sm:text-xl md:text-2xl font-light text-[#FDF6E3] leading-relaxed mb-6 sm:mb-8 italic">
                  {t.quote}
                </blockquote>

                <div>
                  <div className="text-[11px] sm:text-sm font-bold text-[#F5A623] tracking-widest uppercase">{t.author}</div>
                  <div className="text-[10px] sm:text-xs text-[#FDF6E340] tracking-widest mt-1.5">{t.location}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Dots - larger for touch */}
        <div className="flex items-center justify-center gap-4 mt-8">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`transition-all duration-300 rounded-none p-2 ${i === active ? 'w-10 h-0.5' : 'w-4 h-0.5'}`}
              aria-label={`Testimonial ${i + 1}`}
            >
              <div className={`h-full w-full transition-all ${i === active ? 'bg-[#F5A623]' : 'bg-[#C8860A30]'}`} />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
