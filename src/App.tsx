import { CartProvider } from './context/CartContext';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Collection from './components/Collection';
import Farm from './components/Farm';
import Process from './components/Process';
import Benefits from './components/Benefits';
import HexBanner from './components/HexBanner';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';
import Footer from './components/Footer';
import CartDrawer from './components/CartDrawer';

export default function App() {
  return (
    <CartProvider>
      <div className="min-h-screen bg-[#0F0A04] text-[#FDF6E3]">
        <Navbar />
        <CartDrawer />
        <main>
          <Hero />
          <About />
          <Collection />
          <HexBanner />
          <Farm />
          <Process />
          <Benefits />
          <Testimonials />
          <Contact />
        </main>
        <Footer />
      </div>
    </CartProvider>
  );
}
