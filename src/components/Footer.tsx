export default function Footer() {
  const year = new Date().getFullYear();

  const footerLinks = {
    Shop: ['Wild Cedar Honey', 'Mountain Wildflower', 'Raw Comb Honey', 'Wild Thyme Honey', 'Gift Sets'],
    Discover: ['Our Story', 'The Farm', 'The Process', 'Sustainability', 'Lab Certifications'],
    Company: ['About Us', 'Wholesale', 'Farm Visits', 'Press', 'Contact'],
  };

  return (
    <footer className="bg-[#080503] border-t border-[#C8860A15]">
      {/* Top section */}
      <div className="max-w-7xl mx-auto container-px py-16 md:py-20">
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-5 gap-y-12 gap-x-6 lg:gap-12">
          {/* Brand */}
          <div className="col-span-2 lg:col-span-2">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 overflow-hidden rounded-full border border-[#C8860A20]">
                <img
                  src="/tick.jpeg"
                  alt="RIF HONEY Logo"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <div className="serif font-bold text-lg tracking-[0.15em] text-[#F5A623]">RIF HONEY</div>
                <div className="text-[9px] tracking-[0.35em] text-[#C8860A60] uppercase">Chakrane Mountains</div>
              </div>
            </div>

            <p className="text-[#FDF6E3] text-sm leading-relaxed mb-6 max-w-xs">
              Ultra-premium raw honey, harvested by hand from the pristine wilderness of Morocco's Chakrane Mountains. Pure, living, extraordinary.
            </p>

            {/* Trust badges - horizontal scroll on mobile */}
            <div className="flex flex-wrap gap-2.5">
              {['100% Raw', 'Lab Tested', 'No Additives', 'Traceable'].map((badge) => (
                <span key={badge} className="text-[8px] sm:text-[9px] tracking-widest uppercase text-[#C8860A] border border-[#C8860A30] px-3 py-1 bg-[#1A120850]">
                  {badge}
                </span>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="text-[9px] tracking-[0.35em] uppercase text-[#C8860A80] mb-5 font-semibold">{category}</h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-[#FDF6E3] text-sm hover:text-[#F5A623] transition-colors duration-300"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Divider */}
      <hr className="section-divider mx-4 sm:mx-8" />

      {/* Bottom bar */}
      <div className="max-w-7xl mx-auto container-px py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 md:gap-4">
          <div className="flex flex-col gap-2 text-center md:text-left">
            <p className="text-[#FDF6E3] text-[10px] sm:text-xs tracking-wider leading-relaxed">
              &copy; {year} RIF HONEY. All rights reserved.<br className="sm:hidden" /> Chakrane Mountains, Morocco.
            </p>
            <p className="text-[#FDF6E3] text-xs sm:text-[14px] font-medium tracking-wide">
              Built by <a href="https://salim1-ai.vercel.app/" target="_blank" rel="noopener noreferrer" className="text-[#C8860A] hover:text-[#F5A623] transition-all border-b border-[#C8860A40] hover:border-[#F5A623] pb-0.5 ml-1">salim.dev</a>
            </p>
          </div>
          <div className="flex items-center gap-6">
            <a href="#" className="text-[#FDF6E3] text-xs hover:text-[#F5A623] transition-colors">Privacy Policy</a>
            <a href="#" className="text-[#FDF6E3] text-xs hover:text-[#F5A623] transition-colors">Terms of Use</a>
            <a href="#" className="text-[#FDF6E3] text-xs hover:text-[#F5A623] transition-colors">Shipping</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
