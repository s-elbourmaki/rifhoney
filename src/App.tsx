import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Analytics } from '@vercel/analytics/react';
import { CartProvider } from './context/CartContext';
import HomePage from './pages/HomePage';
import ProductPage from './pages/ProductPage';
import CataloguePage from './pages/CataloguePage';
import { useResponsive } from './utils/useResponsive';

export default function App() {
  // Initialize responsive logic
  useResponsive();

  return (
    <CartProvider>
      <Router>
        <div className="min-h-screen bg-[#0F0A04] text-[#FDF6E3] selection:bg-[#C8860A] selection:text-[#1A1208]">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/product/:slug" element={<ProductPage />} />
            <Route path="/catalogue" element={<CataloguePage />} />
          </Routes>
          <Analytics />
        </div>
      </Router>
    </CartProvider>
  );
}
