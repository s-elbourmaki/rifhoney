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

export default function Contact() {
  const { ref, inView } = useInView();
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      setForm({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setSubmitted(false), 5000);
    }, 1500);
  };

  return (
    <section id="contact" className="section-py bg-[#0F0A04] relative overflow-hidden">
      {/* BG accent */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#C8860A40] to-transparent" />

      <div className="max-w-7xl mx-auto container-px">
        <div ref={ref} className="grid lg:grid-cols-2 gap-16 lg:gap-20">
          {/* Info */}
          <div className={`transition-all duration-1000 ${inView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'}`}>
            <div className="flex items-center gap-3 mb-6">
              <span className="h-px w-8 bg-[#C8860A]" />
              <span className="text-[10px] tracking-[0.4em] uppercase text-[#C8860A]">Get in Touch</span>
            </div>

            <h2 className="serif text-4xl md:text-5xl font-light text-[#FDF6E3] leading-tight mb-6">
              Taste the <br />
              <em className="gold-text not-italic font-medium">Difference</em>
            </h2>

            <p className="text-[#FDF6E370] text-sm md:text-base leading-relaxed mb-12">
              Whether you want to place a wholesale order, visit our mountain farm, or simply learn more about our honey, we would love to hear from you.
            </p>

            {/* Contact details */}
            <div className="space-y-6">
              {[
                {
                  label: 'Location',
                  value: 'Chakrane Mountains, Rif Region, Morocco',
                  icon: (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"/>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"/>
                    </svg>
                  ),
                },
                {
                  label: 'Email',
                  value: 'hello@rifhoney.com',
                  icon: (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"/>
                    </svg>
                  ),
                },
                {
                  label: 'WhatsApp',
                  value: '+212 6XX XXX XXX',
                  icon: (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"/>
                    </svg>
                  ),
                },
              ].map((item) => (
                <div key={item.label} className="flex items-start gap-4">
                  <div className="w-9 h-9 flex-shrink-0 flex items-center justify-center border border-[#C8860A40] text-[#C8860A]">
                    {item.icon}
                  </div>
                  <div>
                    <div className="text-[10px] tracking-[0.25em] uppercase text-[#C8860A80] mb-1">{item.label}</div>
                    <div className="text-[#FDF6E390] text-sm">{item.value}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Newsletter teaser */}
            <div className="mt-12 border-t border-[#C8860A15] pt-8">
              <p className="text-[10px] tracking-[0.3em] uppercase text-[#C8860A80] mb-4">Farm to Your Inbox</p>
              <div className="flex gap-0">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="flex-1 bg-[#150E05] border border-[#C8860A30] border-r-0 px-4 py-3 text-[#FDF6E3] text-sm placeholder-[#FDF6E330] focus:outline-none focus:border-[#C8860A] transition-colors"
                />
                <button className="gold-gradient text-[#1A1208] px-6 py-3 text-[10px] tracking-[0.2em] uppercase font-bold hover:opacity-90 transition-opacity whitespace-nowrap">
                  Subscribe
                </button>
              </div>
              <p className="text-[10px] text-[#FDF6E330] mt-2">Harvest stories, seasonal offers, and beekeeper wisdom.</p>
            </div>
          </div>

          {/* Form */}
          <div className={`transition-all duration-1000 delay-200 ${inView ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'}`}>
            <div className="glass border border-[#C8860A15] p-8 md:p-10">
              <h3 className="serif text-2xl font-medium text-[#FDF6E3] mb-8">Send a Message</h3>

              {submitted ? (
                <div className="text-center py-12">
                  <div className="w-12 h-12 mx-auto mb-4">
                    <svg viewBox="0 0 100 100">
                      <polygon points="50,5 90,27.5 90,72.5 50,95 10,72.5 10,27.5" fill="#C8860A" />
                      <polyline points="32,50 45,63 68,37" fill="none" stroke="white" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <p className="serif text-xl text-[#F5A623]">Message Sent</p>
                  <p className="text-[#FDF6E360] text-sm mt-2">We will respond within 24 hours.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-[9px] tracking-[0.3em] uppercase text-[#C8860A80] mb-2">Name</label>
                      <input
                        type="text"
                        required
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        className="w-full bg-[#1A1208] border border-[#C8860A25] px-4 py-3 text-[#FDF6E3] text-sm placeholder-[#FDF6E330] focus:outline-none focus:border-[#C8860A] transition-colors"
                        placeholder="Your name"
                      />
                    </div>
                    <div>
                      <label className="block text-[9px] tracking-[0.3em] uppercase text-[#C8860A80] mb-2">Email</label>
                      <input
                        type="email"
                        required
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        className="w-full bg-[#1A1208] border border-[#C8860A25] px-4 py-3 text-[#FDF6E3] text-sm placeholder-[#FDF6E330] focus:outline-none focus:border-[#C8860A] transition-colors"
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[9px] tracking-[0.3em] uppercase text-[#C8860A80] mb-2">Subject</label>
                    <select
                      value={form.subject}
                      onChange={(e) => setForm({ ...form, subject: e.target.value })}
                      className="w-full bg-[#1A1208] border border-[#C8860A25] px-4 py-3 text-[#FDF6E390] text-sm focus:outline-none focus:border-[#C8860A] transition-colors appearance-none cursor-pointer"
                    >
                      <option value="">Select a topic</option>
                      <option value="order">Place an Order</option>
                      <option value="wholesale">Wholesale Enquiry</option>
                      <option value="farm">Farm Visit</option>
                      <option value="gift">Corporate Gift</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[9px] tracking-[0.3em] uppercase text-[#C8860A80] mb-2">Message</label>
                    <textarea
                      required
                      rows={4}
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      className="w-full bg-[#1A1208] border border-[#C8860A25] px-4 py-4 text-[#FDF6E3] text-sm placeholder-[#FDF6E330] focus:outline-none focus:border-[#C8860A] transition-colors resize-none"
                      placeholder="Tell us how we can help..."
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className={`w-full gold-gradient text-[#1A1208] py-4 text-xs tracking-[0.3em] uppercase font-bold transition-all duration-300 ${
                      loading ? 'opacity-70 cursor-not-allowed' : 'hover:opacity-90 active:scale-[0.98]'
                    }`}
                  >
                    {loading ? (
                      <span className="flex items-center justify-center gap-2">
                        <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        Processing...
                      </span>
                    ) : 'Send Message'}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
