import { useEffect, useRef, useState, useCallback } from 'react';

/**
 * Hero background cycles: Image (5s) → crossfade → Video → crossfade → Image → ...
 * The image loads instantly for fast first paint; the video is deferred.
 */

const IMAGE_DISPLAY_DURATION = 5000; // ms to show the static image before swapping
const CROSSFADE_DURATION = 1500;     // ms for the opacity transition

export default function Hero() {
  const parallaxRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  // 'image' = rif.png is visible, 'video' = vid.mp4 is visible
  const [activeMedia, setActiveMedia] = useState<'image' | 'video'>('image');
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

  // Deferred video load — don't block first paint
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const loadVideo = () => {
      video.src = '/images/vid.mp4';
      video.load();
    };

    if ('requestIdleCallback' in window) {
      (window as any).requestIdleCallback(loadVideo, { timeout: 1500 });
    } else {
      setTimeout(loadVideo, 400);
    }
  }, []);

  // When video is loaded and ready
  const handleCanPlay = useCallback(() => {
    setVideoReady(true);
  }, []);

  // When video finishes playing → swap back to image
  const handleVideoEnded = useCallback(() => {
    setActiveMedia('image');
  }, []);

  // Swap cycle logic
  useEffect(() => {
    // When showing the image AND the video is ready, schedule a swap to video
    if (activeMedia === 'image' && videoReady) {
      timerRef.current = setTimeout(() => {
        const video = videoRef.current;
        if (video) {
          video.currentTime = 0;
          video.play().then(() => {
            setActiveMedia('video');
          }).catch(() => {
            // Autoplay blocked — stay on image, retry after another cycle
            timerRef.current = setTimeout(() => {
              setActiveMedia('image'); // re-trigger this effect
            }, IMAGE_DISPLAY_DURATION);
          });
        }
      }, IMAGE_DISPLAY_DURATION);
    }

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [activeMedia, videoReady]);

  const scrollToCollection = () => {
    const el = document.querySelector('#collection');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const showVideo = activeMedia === 'video';

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Container */}
      <div ref={parallaxRef} className="absolute inset-0 z-0">

        {/* Static Image — always in DOM */}
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
        />

        {/* Video — always in DOM for seamless replay */}
        <video
          ref={videoRef}
          muted
          playsInline
          preload="none"
          onCanPlay={handleCanPlay}
          onEnded={handleVideoEnded}
          className="absolute inset-0 w-full h-full object-cover object-center"
          style={{
            opacity: showVideo ? 1 : 0,
            transition: `opacity ${CROSSFADE_DURATION}ms ease-in-out`,
          }}
          aria-hidden="true"
        />

        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0F0A04CC] via-[#0F0A0480] to-[#0F0A04]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0F0A04CC] via-transparent to-[#0F0A0466]" />

        {/* Cinematic accent lines */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#C8860A30] to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#C8860A30] to-transparent" />
      </div>

      {/* Hexagon decorations */}
      <div className="absolute top-24 right-8 md:right-24 w-20 h-20 md:w-32 md:h-32 opacity-10 animate-float" style={{ animationDelay: '0s' }}>
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <polygon points="50,5 90,27.5 90,72.5 50,95 10,72.5 10,27.5" fill="none" stroke="#F5A623" strokeWidth="1.5" />
        </svg>
      </div>
      <div className="absolute bottom-32 left-6 md:left-20 w-14 h-14 md:w-24 md:h-24 opacity-10 animate-float" style={{ animationDelay: '1.5s' }}>
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <polygon points="50,5 90,27.5 90,72.5 50,95 10,72.5 10,27.5" fill="none" stroke="#F5A623" strokeWidth="1.5" />
        </svg>
      </div>
      <div className="absolute top-1/3 left-4 md:left-10 w-8 h-8 opacity-20 animate-float" style={{ animationDelay: '3s' }}>
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <polygon points="50,5 90,27.5 90,72.5 50,95 10,72.5 10,27.5" fill="#F5A623" />
        </svg>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 max-w-5xl mx-auto">
        {/* Tagline badge */}
        <div className="inline-flex items-center gap-3 mb-8 animate-fadeUp opacity-0" style={{ animationFillMode: 'forwards' }}>
          <span className="h-px w-8 bg-[#C8860A]" />
          <span className="text-[10px] md:text-xs tracking-[0.4em] uppercase text-[#C8860A] font-medium">
            Chakrane Mountains · Pure · Artisanal
          </span>
          <span className="h-px w-8 bg-[#C8860A]" />
        </div>

        {/* Main Headline */}
        <h1 className="serif font-light text-5xl sm:text-6xl md:text-8xl lg:text-9xl leading-none mb-6 animate-fadeUp opacity-0 delay-100" style={{ animationFillMode: 'forwards' }}>
          <span className="gold-text font-bold">RIF</span>{' '}
          <span className="text-[#FDF6E3] font-light tracking-wider">HONEY</span>
        </h1>

        {/* Subtitle */}
        <p className="text-[#FDF6E380] text-sm md:text-base lg:text-lg tracking-[0.2em] uppercase mb-4 animate-fadeUp opacity-0 delay-200" style={{ animationFillMode: 'forwards' }}>
          Liquid Gold from the Heart of Morocco
        </p>

        <p className="text-[#FDF6E360] text-xs md:text-sm leading-relaxed max-w-xl mx-auto mb-12 tracking-wide animate-fadeUp opacity-0 delay-300" style={{ animationFillMode: 'forwards' }}>
          Harvested by hand from wild mountain flora at altitudes above 1,500 meters — where pristine air, ancient cedar forests, and rare wildflowers create nature's finest nectar.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fadeUp opacity-0 delay-400" style={{ animationFillMode: 'forwards' }}>
          <button
            onClick={scrollToCollection}
            className="group gold-gradient text-[#1A1208] px-10 py-4 text-xs tracking-[0.3em] uppercase font-semibold hover:opacity-90 transition-all duration-300 w-full sm:w-auto"
          >
            <span>Explore Collection</span>
          </button>
          <button
            onClick={() => { const el = document.querySelector('#about'); if (el) el.scrollIntoView({ behavior: 'smooth' }); }}
            className="border border-[#C8860A40] text-[#FDF6E390] px-10 py-4 text-xs tracking-[0.3em] uppercase font-medium hover:border-[#C8860A] hover:text-[#F5A623] transition-all duration-300 w-full sm:w-auto"
          >
            Our Story
          </button>
        </div>

        {/* Stats */}
        <div className="mt-20 grid grid-cols-3 gap-6 md:gap-12 max-w-2xl mx-auto animate-fadeUp opacity-0 delay-500" style={{ animationFillMode: 'forwards' }}>
          {[
            { value: '1,500+', label: 'Meters Altitude' },
            { value: '100%', label: 'Raw & Natural' },
            { value: '12+', label: 'Floral Varieties' },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="serif text-2xl md:text-3xl font-semibold gold-text mb-1">{stat.value}</div>
              <div className="text-[10px] md:text-xs tracking-[0.2em] uppercase text-[#FDF6E350]">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-fadeIn opacity-0 delay-600" style={{ animationFillMode: 'forwards' }}>
        <span className="text-[9px] tracking-[0.3em] uppercase text-[#C8860A60]">Scroll</span>
        <div className="w-px h-12 bg-gradient-to-b from-[#C8860A] to-transparent animate-pulse" />
      </div>
    </section>
  );
}
