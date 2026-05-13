import { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

/**
 * Hero background cycles: Image (5s) → crossfade → Video → crossfade → Image → ...
 * The image loads instantly for fast first paint; the video is deferred.
 */

const VIDEO_DISPLAY_DURATION = 8000; // ms to show the video before swapping to image
const IMAGE_DISPLAY_DURATION = 2000; // ms to show the static image (reduced)
const CROSSFADE_DURATION = 1500;     // ms for the opacity transition

export default function Hero() {
  const parallaxRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const location = useLocation();
  const navigate = useNavigate();

  // 'video' = vid.mp4 is visible, 'image' = tick.jpeg is visible
  const [activeMedia, setActiveMedia] = useState<'image' | 'video'>('video');
  const [videoReady, setVideoReady] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Parallax scroll
  useEffect(() => {
    const handleScroll = () => {
      if (parallaxRef.current) {
        parallaxRef.current.style.transform = `translateY(${window.scrollY * 0.4}px)`;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Swap cycle logic: Cycle between video and image
  useEffect(() => {
    if (!videoReady) return;

    const duration = activeMedia === 'video' ? VIDEO_DISPLAY_DURATION : IMAGE_DISPLAY_DURATION;
    
    timerRef.current = setTimeout(() => {
      setActiveMedia(prev => prev === 'video' ? 'image' : 'video');
    }, duration);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [activeMedia, videoReady]);

  const scrollToCollection = () => {
    if (location.pathname !== '/') {
      navigate('/#collection');
      return;
    }
    const el = document.querySelector('#collection');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToAbout = () => {
    if (location.pathname !== '/') {
      navigate('/#about');
      return;
    }
    const el = document.querySelector('#about');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const showVideo = activeMedia === 'video' && videoReady;

  return (
    <section id="hero" className="relative h-screen-dynamic flex items-center justify-center overflow-hidden">
      {/* Background Container */}
      <div ref={parallaxRef} className="absolute inset-0 z-0">

        {/* Static Image — shown when video is not active or not ready */}
        <img
          src="/images/rif.png"
          alt="Premium RIF Honey from Chakrane Mountains"
          className="absolute inset-0 w-full h-full object-cover object-center"
          style={{
            opacity: showVideo ? 0 : 1,
            transition: `opacity ${CROSSFADE_DURATION}ms ease-in-out`,
          }}
          loading="eager"
          fetchPriority="high"
          width="1920"
          height="1080"
        />

        {/* Video — always in DOM for seamless replay */}
        <video
          ref={videoRef}
          muted
          playsInline
          loop
          autoPlay
          preload="auto"
          onCanPlay={() => setVideoReady(true)}
          className="absolute inset-0 w-full h-full object-cover object-center"
          style={{
            opacity: showVideo ? 1 : 0,
            transition: `opacity ${CROSSFADE_DURATION}ms ease-in-out`,
          }}
          aria-hidden="true"
        >
          <source src="/images/vid.webm" type="video/webm" />
          <source src="/images/vid.mp4" type="video/mp4" />
        </video>

        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0F0A04E6] via-[#0F0A04A0] to-[#0F0A04]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0F0A04CC] via-transparent to-[#0F0A0466]" />

        {/* Cinematic accent lines - hidden on mobile for cleaner look */}
        <div className="hidden sm:block absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#C8860A30] to-transparent" />
        <div className="hidden sm:block absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#C8860A30] to-transparent" />
      </div>

      {/* Hexagon decorations - scaled down on mobile */}
      <div className="absolute top-24 right-4 sm:right-12 md:right-24 w-16 h-16 sm:w-24 sm:h-24 md:w-32 md:h-32 opacity-10 animate-float" style={{ animationDelay: '0s' }}>
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <polygon points="50,5 90,27.5 90,72.5 50,95 10,72.5 10,27.5" fill="none" stroke="#F5A623" strokeWidth="1.5" />
        </svg>
      </div>
      <div className="absolute bottom-24 left-4 sm:left-12 md:left-20 w-12 h-12 sm:w-16 sm:h-16 md:w-24 md:h-24 opacity-10 animate-float" style={{ animationDelay: '1.5s' }}>
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <polygon points="50,5 90,27.5 90,72.5 50,95 10,72.5 10,27.5" fill="none" stroke="#F5A623" strokeWidth="1.5" />
        </svg>
      </div>

      {/* Content */}
      <div className="relative z-10 h-full w-full max-w-7xl mx-auto container-px flex flex-col items-center py-12">
        {/* Main content centered */}
        <div className="flex-1 flex flex-col items-center justify-center text-center">
          {/* Main Headline */}
          <h1 className="serif font-light text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl leading-none mb-4 sm:mb-6 animate-fadeUp opacity-0" style={{ animationFillMode: 'forwards', animationDelay: '0.1s' }}>
            <span className="gold-text font-bold">RIF</span>{' '}
            <span className="text-[#FDF6E3] font-light tracking-wider">HONEY</span>
          </h1>

          {/* Subtitle */}
          <p className="text-[#FDF6E3] text-xs sm:text-xs md:text-sm lg:text-base tracking-[0.25em] uppercase mb-4 sm:mb-6 animate-fadeUp opacity-0" style={{ animationFillMode: 'forwards', animationDelay: '0.25s' }}>
            Liquid Gold from the Heart of Morocco
          </p>

          <p className="text-[#FDF6E3] text-base sm:text-base md:text-lg lg:text-xl leading-relaxed max-w-md md:max-w-2xl mx-auto mb-6 tracking-wide animate-fadeUp opacity-0" style={{ animationFillMode: 'forwards', animationDelay: '0.4s' }}>
            Harvested by hand from wild mountain flora at altitudes above 1,500 meters — where pristine air and rare wildflowers create nature's finest nectar.
          </p>
        </div>

        {/* Bottom fixed elements */}
        <div className="w-full flex flex-col items-center gap-12 sm:gap-16">
          {/* CTA Buttons - Forced one line */}
          <div className="flex flex-row items-center justify-center gap-2 sm:gap-6 animate-fadeUp opacity-0 w-full" style={{ animationFillMode: 'forwards', animationDelay: '0.55s' }}>
            <button
              onClick={scrollToCollection}
              className="group active-shrink gold-gradient text-[#1A1208] px-3 sm:px-10 py-4 text-[9px] sm:text-xs tracking-[0.1em] sm:tracking-[0.3em] uppercase font-bold hover:opacity-90 transition-all duration-300 flex-1 max-w-[180px] sm:max-w-[240px] whitespace-nowrap"
            >
              Explore Collection
            </button>
            <button
              onClick={scrollToAbout}
              className="active-shrink border border-[#C8860A60] text-[#FDF6E3] px-3 sm:px-10 py-4 text-[9px] sm:text-xs tracking-[0.1em] sm:tracking-[0.3em] uppercase font-semibold hover:border-[#C8860A] hover:text-[#F5A623] transition-all duration-300 glass-light flex-1 max-w-[180px] sm:max-w-[240px] whitespace-nowrap"
            >
              Our Story
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 sm:gap-12 w-full max-w-2xl mx-auto animate-fadeUp opacity-0" style={{ animationFillMode: 'forwards', animationDelay: '0.7s' }}>
            {[
              { value: '1,500+', label: 'Meters Altitude' },
              { value: '100%', label: 'Raw & Natural' },
              { value: '12+', label: 'Varieties' },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="serif text-xl sm:text-2xl md:text-3xl font-semibold gold-text mb-1">{stat.value}</div>
                <div className="text-[8px] sm:text-[10px] tracking-[0.2em] uppercase text-[#FDF6E3]">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
