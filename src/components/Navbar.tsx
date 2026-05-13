import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { totalItems, toggleCart } = useCart();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Collection', href: 'collection' },
    { label: 'Our Story', href: 'about' },
    { label: 'The Farm', href: 'farm' },
    { label: 'Process', href: 'process' },
    { label: 'Contact', href: 'contact' },
  ];

  const handleNavClick = (e: React.MouseEvent, href: string) => {
    e.preventDefault();
    setMenuOpen(false);

    if (location.pathname !== '/') {
      navigate(`/#${href}`);
      // The home page will handle scrolling via useEffect if needed, 
      // but standard browser hash behavior usually works if the element is in DOM.
      return;
    }

    const el = document.querySelector(`#${href}`);
    if (el) {
      const headerOffset = scrolled ? 90 : 120;
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
          scrolled || location.pathname !== '/'
            ? 'glass border-b border-[#C8860A22] py-4'
            : 'bg-transparent py-8'
        }`}
      >
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-12">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link
              to="/"
              className="flex items-center gap-4 group"
              aria-label="RIF HONEY Home"
            >
              <div className="w-10 h-10 sm:w-14 sm:h-14 overflow-hidden rounded-full border border-[#C8860A20] transition-transform duration-500 group-hover:scale-110">
                <img 
                  src="/tick.jpeg" 
                  alt="RIF HONEY Logo" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex flex-col leading-none">
                <span className="serif font-bold text-xl sm:text-2xl tracking-[0.15em] text-[#F5A623] group-hover:text-[#F0C060] transition-colors whitespace-nowrap">
                  RIF HONEY
                </span>
                <span className="hidden sm:block text-[11px] tracking-[0.25em] text-[#C8860A80] uppercase font-medium mt-1 whitespace-nowrap">
                  Chakrane Mountains · Pure · Artisanal
                </span>
              </div>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-14 whitespace-nowrap">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={`#${link.href}`}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="text-base tracking-[0.1em] uppercase text-[#FDF6E380] hover:text-[#F5A623] transition-colors duration-300 font-bold"
                >
                  {link.label}
                </a>
              ))}
            </div>

            {/* Right side */}
            <div className="flex items-center gap-4 sm:gap-12">
              <button
                onClick={toggleCart}
                aria-label={`Shopping cart, ${totalItems} items`}
                className="relative p-2 text-[#FDF6E360] hover:text-[#F5A623] transition-colors group"
              >
                <svg className="w-6 h-6 transition-transform duration-300 group-hover:scale-110" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"/>
                </svg>
                {totalItems > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 min-w-[20px] h-[20px] px-1 gold-gradient text-[#1A1208] text-[10px] font-bold rounded-full flex items-center justify-center cart-badge-pop">
                    {totalItems}
                  </span>
                )}
              </button>

              <button
                onClick={(e) => handleNavClick(e, 'collection')}
                className="hidden lg:inline-flex items-center gap-2 px-7 py-3 gold-gradient text-[#1A1208] text-sm font-bold tracking-[0.15em] uppercase rounded-none hover:opacity-90 transition-opacity whitespace-nowrap"
              >
                Shop Now
              </button>


            {/* Mobile hamburger */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden p-3 -mr-2 text-[#FDF6E3] hover:text-[#F5A623] transition-colors active-shrink z-50"
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
        style={{ height: '100dvh' }}
      >
        <div className="flex flex-col items-center gap-8">
          {navLinks.map((link, i) => (
            <a
              key={link.label}
              href={`#${link.href}`}
              onClick={(e) => handleNavClick(e, link.href)}
              className={`serif text-3xl sm:text-4xl font-light tracking-[0.2em] text-[#FDF6E3] hover:text-[#F5A623] transition-all duration-500 ${
                menuOpen ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
              }`}
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              {link.label}
            </a>
          ))}
          <button
            onClick={(e) => handleNavClick(e, 'collection')}
            className={`mt-6 px-12 py-5 gold-gradient text-[#1A1208] text-sm font-bold tracking-[0.25em] uppercase active-shrink transition-all duration-500 ${
              menuOpen ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}
            style={{ transitionDelay: `${navLinks.length * 100}ms` }}
          >
            Shop Now
          </button>
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
