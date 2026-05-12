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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10">
                <svg viewBox="0 0 100 100" className="w-full h-full">
                  <polygon points="50,4 94,27 94,73 50,96 6,73 6,27" fill="none" stroke="#C8860A" strokeWidth="3"/>
                  <polygon points="50,18 80,35 80,65 50,82 20,65 20,35" fill="#C8860A" opacity="0.15"/>
                  <text x="50" y="55" fontFamily="serif" fontSize="28" fill="#F5A623" textAnchor="middle" dominantBaseline="middle" fontWeight="700">R</text>
                </svg>
              </div>
              <div>
                <div className="serif font-bold text-lg tracking-[0.15em] text-[#F5A623]">RIF HONEY</div>
                <div className="text-[9px] tracking-[0.35em] text-[#C8860A60] uppercase">Chakrane Mountains</div>
              </div>
            </div>

            <p className="text-[#FDF6E360] text-sm leading-relaxed mb-6 max-w-xs">
              Ultra-premium raw honey, harvested by hand from the pristine wilderness of Morocco's Chakrane Mountains. Pure, living, extraordinary.
            </p>

            {/* Trust badges */}
            <div className="flex flex-wrap gap-3">
              {['100% Raw', 'Lab Tested', 'No Additives', 'Traceable'].map((badge) => (
                <span key={badge} className="text-[9px] tracking-widest uppercase text-[#C8860A] border border-[#C8860A40] px-3 py-1">
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
                      className="text-[#FDF6E350] text-sm hover:text-[#F5A623] transition-colors duration-300"
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[#FDF6E330] text-xs tracking-wider">
            &copy; {year} RIF HONEY. All rights reserved. Chakrane Mountains, Morocco.
          </p>
          <div className="flex items-center gap-6">
            <a href="#" className="text-[#FDF6E330] text-xs hover:text-[#F5A623] transition-colors">Privacy Policy</a>
            <a href="#" className="text-[#FDF6E330] text-xs hover:text-[#F5A623] transition-colors">Terms of Use</a>
            <a href="#" className="text-[#FDF6E330] text-xs hover:text-[#F5A623] transition-colors">Shipping</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
