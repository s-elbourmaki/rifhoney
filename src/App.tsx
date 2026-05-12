import { lazy, Suspense } from 'react';
import { CartProvider } from './context/CartContext';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import CartDrawer from './components/CartDrawer';
import WhatsAppButton from './components/WhatsAppButton';
import BackToTop from './components/BackToTop';
import { useResponsive } from './utils/useResponsive';

// Lazy load components that are not critical for initial paint
const About = lazy(() => import('./components/About'));
const Collection = lazy(() => import('./components/Collection'));
const Farm = lazy(() => import('./components/Farm'));
const Process = lazy(() => import('./components/Process'));
const Benefits = lazy(() => import('./components/Benefits'));
const HexBanner = lazy(() => import('./components/HexBanner'));
const Testimonials = lazy(() => import('./components/Testimonials'));
const Contact = lazy(() => import('./components/Contact'));
const Footer = lazy(() => import('./components/Footer'));

export default function App() {
  // Initialize responsive logic
  useResponsive();

  return (
    <CartProvider>
      <div className="min-h-screen bg-[#0F0A04] text-[#FDF6E3] selection:bg-[#C8860A] selection:text-[#1A1208]">
        <Navbar />
        <CartDrawer />
        <main>
          <Hero />
          <Suspense fallback={<div className="h-20" />}>
            <About />
            <Collection />
            <HexBanner />
            <Farm />
            <Process />
            <Benefits />
            <Testimonials />
            <Contact />
          </Suspense>
        </main>
        <WhatsAppButton />
        <BackToTop />
        <Suspense fallback={null}>
          <Footer />
        </Suspense>
      </div>
    </CartProvider>
  );
}
