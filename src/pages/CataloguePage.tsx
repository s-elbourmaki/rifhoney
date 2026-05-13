import { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function CataloguePage() {
  const [submitted, setSubmitted] = useState(false);
  return (
    <div className="min-h-screen bg-[#0F0A04] flex flex-col">
      <Navbar />
      
      <main className="flex-1 flex flex-col items-center justify-center text-center px-6 pt-32 pb-20">
        <div className="max-w-3xl mx-auto">
          {/* Decorative element */}
          <div className="flex items-center justify-center gap-3 mb-12 animate-fadeUp">
            <span className="h-px w-12 bg-[#C8860A]" />
            <span className="text-[10px] tracking-[0.4em] uppercase text-[#C8860A]">Future Harvests</span>
            <span className="h-px w-12 bg-[#C8860A]" />
          </div>

          <h1 className="serif text-5xl sm:text-6xl md:text-7xl font-light text-[#FDF6E3] mb-8 leading-tight animate-fadeUp" style={{ animationDelay: '0.1s' }}>
            New Treasures are <br />
            <em className="gold-text not-italic font-medium">Coming Soon</em>
          </h1>

          <p className="text-[#FDF6E3] text-base md:text-xl leading-relaxed mb-12 max-w-2xl mx-auto animate-fadeUp" style={{ animationDelay: '0.2s' }}>
            Our master beekeepers are currently deep in the Chakrane Mountains, hand-harvesting our next seasonal release. From rare Alpine Lavender to ancient Cedar forests, nature is still perfecting the next batch of liquid gold.
          </p>

          {!submitted ? (
            <div className="flex flex-col items-center gap-8 animate-fadeUp" style={{ animationDelay: '0.3s' }}>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-6 w-full max-w-xl">
                <Link 
                  to="/#collection" 
                  className="w-full sm:w-auto px-12 py-5 gold-gradient text-[#1A1208] text-xs font-bold tracking-[0.3em] uppercase hover:opacity-90 transition-all active-shrink whitespace-nowrap"
                >
                  Discover Actual Products
                </Link>
                
                <form 
                  onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }}
                  className="flex-1 w-full flex items-center bg-[#1A1208] border border-[#C8860A40] focus-within:border-[#C8860A] transition-colors"
                >
                  <input 
                    type="text" 
                    placeholder="Email or Phone"
                    required
                    className="flex-1 bg-transparent border-none text-[#FDF6E3] px-6 py-4 text-sm focus:outline-none placeholder:text-[#FDF6E360]"
                  />
                  <button 
                    type="submit"
                    className="px-6 py-4 text-[#C8860A] hover:text-[#F5A623] transition-colors font-bold text-[10px] tracking-widest uppercase border-l border-[#C8860A40]"
                  >
                    Notify Me
                  </button>
                </form>
              </div>
              <p className="text-[9px] tracking-[0.2em] uppercase text-[#FDF6E360]">
                We value your privacy. No spam, just golden updates.
              </p>
            </div>
          ) : (
            <div className="animate-fadeUp flex flex-col items-center gap-6">
              <div className="w-16 h-16 rounded-full border border-[#C8860A] flex items-center justify-center mb-2">
                <svg className="w-8 h-8 text-[#C8860A]" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
              </div>
              <h3 className="serif text-3xl text-[#FDF6E3]">You're on the list</h3>
              <p className="text-[#FDF6E3] text-sm">We'll reach out as soon as the new harvest is ready.</p>
              <Link to="/#collection" className="text-[#C8860A] text-xs tracking-widest uppercase border-b border-[#C8860A] pb-1 hover:text-[#F5A623] hover:border-[#F5A623] transition-all">
                Return to Collection
              </Link>
            </div>
          )}
        </div>

        {/* Animated Background Element */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden flex items-center justify-center opacity-5">
           <svg viewBox="0 0 100 100" className="w-[80vw] h-[80vw] animate-float">
             <polygon points="50,5 90,27.5 90,72.5 50,95 10,72.5 10,27.5" fill="none" stroke="#C8860A" strokeWidth="0.5" />
           </svg>
        </div>
      </main>

      <Footer />
    </div>
  );
}
