import { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { totalItems, toggleCart } = useCart();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Collection', href: '#collection' },
    { label: 'Our Story', href: '#about' },
    { label: 'The Farm', href: '#farm' },
    { label: 'Process', href: '#process' },
    { label: 'Contact', href: '#contact' },
  ];

  const scrollTo = (href: string) => {
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) {
      const headerOffset = scrolled ? 80 : 100; // Account for fixed header height
      const elementPosition = el.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'glass border-b border-[#C8860A22] py-3'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <a
              href="#hero"
              onClick={(e) => { e.preventDefault(); scrollTo('#hero'); }}
              className="flex items-center gap-3 group"
              aria-label="RIF HONEY Home"
            >
              <div className="w-9 h-9 flex items-center justify-center">
                <svg viewBox="0 0 100 100" className="w-full h-full">
                  <polygon points="50,4 94,27 94,73 50,96 6,73 6,27" fill="none" stroke="#C8860A" strokeWidth="3"/>
                  <polygon points="50,18 80,35 80,65 50,82 20,65 20,35" fill="#C8860A" opacity="0.15"/>
                  <text x="50" y="55" fontFamily="serif" fontSize="28" fill="#F5A623" textAnchor="middle" dominantBaseline="middle" fontWeight="700">R</text>
                </svg>
              </div>
              <div className="flex flex-col leading-none">
                <span className="serif font-bold text-lg tracking-[0.15em] text-[#F5A623] group-hover:text-[#F0C060] transition-colors">
                  RIF HONEY
                </span>
                <span className="text-[9px] tracking-[0.25em] text-[#C8860A80] uppercase font-medium">
                  Chakrane Mountains · Pure · Artisanal
                </span>
              </div>
            </a>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => { e.preventDefault(); scrollTo(link.href); }}
                  className="text-xs tracking-[0.2em] uppercase text-[#FDF6E380] hover:text-[#F5A623] transition-colors duration-300 font-medium"
                >
                  {link.label}
                </a>
              ))}
            </div>

            {/* Right side */}
            <div className="flex items-center gap-4">
              {/* Cart Button — NOW FUNCTIONAL */}
              <button
                onClick={toggleCart}
                aria-label={`Shopping cart, ${totalItems} items`}
                className="relative p-2 text-[#FDF6E360] hover:text-[#F5A623] transition-colors group"
              >
                <svg className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"/>
                </svg>
                {totalItems > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] px-1 gold-gradient text-[#1A1208] text-[9px] font-bold rounded-full flex items-center justify-center cart-badge-pop">
                    {totalItems}
                  </span>
                )}
              </button>

              {/* CTA */}
              <a
                href="#collection"
                onClick={(e) => { e.preventDefault(); scrollTo('#collection'); }}
                className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 gold-gradient text-[#1A1208] text-xs font-semibold tracking-[0.15em] uppercase rounded-none hover:opacity-90 transition-opacity"
              >
                Shop Now
              </a>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden p-3 -mr-2 text-[#FDF6E380] hover:text-[#F5A623] transition-colors active-shrink"
              aria-label="Toggle menu"
              aria-expanded={menuOpen}
            >
              <div className="w-6 h-5 flex flex-col justify-between">
                <span className={`block h-0.5 w-full bg-current transition-all duration-300 origin-center ${menuOpen ? 'rotate-45 translate-y-[9px]' : ''}`}/>
                <span className={`block h-0.5 w-full bg-current transition-all duration-300 ${menuOpen ? 'opacity-0 scale-x-0' : ''}`}/>
                <span className={`block h-0.5 w-full bg-current transition-all duration-300 origin-center ${menuOpen ? '-rotate-45 -translate-y-[9px]' : ''}`}/>
              </div>
            </button>
          </div>
        </div>
      </div>
    </nav>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 z-40 glass transition-all duration-500 flex flex-col items-center justify-center ${
          menuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-full pointer-events-none'
        }`}
        style={{ height: 'calc(var(--vh, 1vh) * 100)' }}
      >
        <div className="flex flex-col items-center gap-10">
          {navLinks.map((link, i) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => { e.preventDefault(); scrollTo(link.href); }}
              className={`serif text-4xl font-light tracking-[0.2em] text-[#FDF6E3] hover:text-[#F5A623] transition-all duration-500 ${
                menuOpen ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
              }`}
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              {link.label}
            </a>
          ))}
          <a
            href="#collection"
            onClick={(e) => { e.preventDefault(); scrollTo('#collection'); }}
            className={`mt-6 px-12 py-5 gold-gradient text-[#1A1208] text-sm font-bold tracking-[0.25em] uppercase active-shrink transition-all duration-500 ${
              menuOpen ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}
            style={{ transitionDelay: `${navLinks.length * 100}ms` }}
          >
            Shop Now
          </a>
        </div>

        {/* Decorative element for mobile menu */}
        <div className="absolute bottom-12 opacity-5">
           <svg viewBox="0 0 100 100" className="w-32 h-32 animate-float">
             <polygon points="50,5 90,27.5 90,72.5 50,95 10,72.5 10,27.5" fill="none" stroke="#C8860A" strokeWidth="1" />
           </svg>
        </div>
      </div>
    </>
  );
}
