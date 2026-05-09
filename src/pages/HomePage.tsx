import { lazy, Suspense } from 'react';
import Hero from '../components/Hero';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import CartDrawer from '../components/CartDrawer';
import WhatsAppButton from '../components/WhatsAppButton';
import BackToTop from '../components/BackToTop';

// Lazy load sections
const About = lazy(() => import('../components/About'));
const Collection = lazy(() => import('../components/Collection'));
const Farm = lazy(() => import('../components/Farm'));
const Process = lazy(() => import('../components/Process'));
const Benefits = lazy(() => import('../components/Benefits'));
const HexBanner = lazy(() => import('../components/HexBanner'));
const Testimonials = lazy(() => import('../components/Testimonials'));
const Contact = lazy(() => import('../components/Contact'));

export default function HomePage() {
  return (
    <>
      <Navbar />
      <CartDrawer />
      <main>
        <Hero />
        <Suspense fallback={<div className="h-20" />}>
          <Collection />
          <About />
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
    </>
  );
}
