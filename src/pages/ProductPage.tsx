import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { products, Weight } from '../data/products';
import { useCart } from '../context/CartContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import WhatsAppButton from '../components/WhatsAppButton';
import CartDrawer from '../components/CartDrawer';

export default function ProductPage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { addItem, items, openCart } = useCart();
  const [selectedWeight, setSelectedWeight] = useState<Weight>('500g');
  const [isAdding, setIsAdding] = useState(false);

  const product = products.find((p) => p.slug === slug);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (!product) {
      navigate('/');
    }
  }, [product, navigate]);

  if (!product) return null;

  const currentPrice = product.prices[selectedWeight];
  const itemInCart = items.find((item) => item.id === product.id && item.weight === selectedWeight);
  const quantity = itemInCart ? itemInCart.quantity : 0;

  const handleAddToCart = () => {
    setIsAdding(true);
    addItem({
      id: product.id,
      name: product.name,
      subtitle: product.subtitle,
      price: currentPrice,
      weight: selectedWeight,
      image: product.pexels,
    });

    if (!itemInCart) {
      setTimeout(() => openCart(), 600);
    }
    
    setTimeout(() => setIsAdding(false), 1500);
  };

  return (
    <div className="min-h-screen bg-[#0F0A04] text-[#FDF6E3] selection:bg-[#C8860A] selection:text-[#1A1208]">
      <Navbar />
      <CartDrawer />
      
      <main className="pt-32 pb-20">
        <div className="max-w-7xl mx-auto container-px">
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 mb-12 text-[10px] tracking-[0.2em] uppercase text-[#FDF6E340]">
            <Link to="/" className="hover:text-[#F5A623] transition-colors">Home</Link>
            <span>/</span>
            <Link to="/#collection" className="hover:text-[#F5A623] transition-colors">Collection</Link>
            <span>/</span>
            <span className="text-[#FDF6E380]">{product.name}</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            {/* Image Gallery */}
            <div className="relative group">
              <div className="aspect-[4/5] overflow-hidden bg-[#150E05] border border-[#C8860A15]">
                <img 
                  src={product.pexels} 
                  alt={product.name} 
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                  loading="eager"
                  fetchPriority="high"
                  width="800"
                  height="1000"
                />
              </div>
              {product.badge && (
                <div 
                  className="absolute top-6 left-6 z-10 px-4 py-1.5 text-[10px] tracking-[0.3em] uppercase font-bold text-[#FDF6E3]"
                  style={{ background: product.badgeColor }}
                >
                  {product.badge}
                </div>
              )}
            </div>

            {/* Product Details */}
            <div className="flex flex-col">
              <div className="mb-8">
                <span className="text-[11px] tracking-[0.4em] uppercase text-[#C8860A] mb-4 block">{product.subtitle}</span>
                <h1 className="serif text-5xl sm:text-6xl font-light text-[#FDF6E3] mb-6 leading-tight">{product.name}</h1>
                <div className="flex items-baseline gap-3 mb-8">
                  <span className="serif text-4xl font-medium gold-text">{currentPrice}</span>
                  <span className="text-xs tracking-widest uppercase text-[#FDF6E340]">DH</span>
                </div>
                <p className="text-[#FDF6E380] text-sm sm:text-base leading-relaxed mb-10 max-w-xl">
                  {product.description}
                </p>
              </div>

              {/* Weight Selector */}
              <div className="mb-10">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[10px] tracking-[0.3em] uppercase text-[#FDF6E360]">Select Weight</span>
                  <span className="text-[10px] tracking-[0.1em] text-[#C8860A80]">Free shipping across Morocco</span>
                </div>
                <div className="grid grid-cols-3 gap-3">
                  {(['250g', '500g', '1kg'] as Weight[]).map((w) => (
                    <button
                      key={w}
                      onClick={() => setSelectedWeight(w)}
                      className={`py-4 text-xs tracking-[0.2em] uppercase border transition-all duration-300 relative overflow-hidden ${
                        selectedWeight === w
                          ? 'border-[#C8860A] text-[#FDF6E3] bg-[#C8860A15]'
                          : 'border-[#C8860A15] text-[#FDF6E340] hover:border-[#C8860A40]'
                      }`}
                    >
                      {w}
                      {selectedWeight === w && (
                        <div className="absolute bottom-0 left-0 w-full h-0.5 gold-gradient" />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Add to Cart */}
              <div className="flex flex-col sm:flex-row gap-4 mb-12">
                <button
                  onClick={handleAddToCart}
                  disabled={isAdding}
                  className={`flex-1 relative py-5 text-xs font-bold tracking-[0.3em] uppercase transition-all duration-500 active-shrink overflow-hidden ${
                    isAdding 
                      ? 'bg-[#1B5E20] text-[#A5D6A7]' 
                      : 'gold-gradient text-[#1A1208] hover:opacity-90'
                  }`}
                >
                  <span className="relative z-10 flex items-center justify-center gap-3">
                    {isAdding ? (
                      <>
                        <svg className="w-4 h-4 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                        </svg>
                        Added to Cart
                      </>
                    ) : (
                      <>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                        </svg>
                        Add to Cart {quantity > 0 && `(${quantity})`}
                      </>
                    )}
                  </span>
                </button>
              </div>

              {/* Benefits Grid */}
              <div className="grid grid-cols-2 gap-6 pt-10 border-t border-[#C8860A15]">
                {product.benefits.map((benefit) => (
                  <div key={benefit} className="flex items-center gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#C8860A]" />
                    <span className="text-[11px] tracking-wide text-[#FDF6E380] uppercase">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Product Essence Section */}
          <section className="mt-32 pt-20 border-t border-[#C8860A15]">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
              <div className="lg:col-span-1">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-px bg-[#C8860A]" />
                  <span className="text-[11px] tracking-[0.4em] uppercase text-[#C8860A]">The Essence</span>
                </div>
                <h2 className="serif text-4xl font-light leading-tight">Crafted by Nature, <br /><span className="gold-text italic">Perfected</span> for You</h2>
              </div>
              <div className="lg:col-span-2">
                <div className="relative">
                  <svg className="absolute -top-10 -left-10 w-20 h-20 text-[#C8860A08]" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M14.017 21L14.017 18C14.017 16.8954 14.9124 16 16.017 16H19.017C19.5693 16 20.017 15.5523 20.017 15V9C20.017 8.44772 19.5693 8 19.017 8H15.017C14.4647 8 14.017 8.44772 14.017 9V11C14.017 11.5523 13.5693 12 13.017 12H12.017V21H14.017ZM6.017 21L6.017 18C6.017 16.8954 6.91243 16 8.017 16H11.017C11.5693 16 12.017 15.5523 12.017 15V9C12.017 8.44772 11.5693 8 11.017 8H7.017C6.46472 8 6.017 8.44772 6.017 9V11C6.017 11.5523 5.56929 12 5.017 12H4.017V21H6.017Z" />
                  </svg>
                  <p className="serif text-xl sm:text-2xl font-light text-[#FDF6E3CC] leading-relaxed italic">
                    {product.expertReview}
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Related Products Section */}
          <section className="mt-40 pt-20 border-t border-[#C8860A15]">
            <div className="text-center mb-16">
              <div className="flex items-center justify-center gap-3 mb-6">
                <span className="h-px w-8 bg-[#C8860A]" />
                <span className="text-[10px] tracking-[0.4em] uppercase text-[#C8860A]">The Journey Continues</span>
                <span className="h-px w-8 bg-[#C8860A]" />
              </div>
              <h2 className="serif text-4xl font-light text-[#FDF6E3] mb-6">Explore the <em className="gold-text not-italic font-medium">Unknown</em></h2>
              <p className="text-[#FDF6E360] text-sm max-w-2xl mx-auto leading-relaxed">
                Nature's palette is endless. Each jar in our collection tells a unique story of a different peak, a different flower, and a different soul. Which chapter will you open next?
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {products
                .filter((p) => p.slug !== slug)
                .slice(0, 3)
                .map((related) => (
                  <Link 
                    key={related.id} 
                    to={`/product/${related.slug}`}
                    className="group flex flex-col bg-[#150E05] border border-[#C8860A10] hover:border-[#C8860A40] transition-all duration-500 overflow-hidden"
                  >
                    <div className="aspect-[4/3] overflow-hidden">
                      <img 
                        src={related.pexels} 
                        alt={related.name} 
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        loading="lazy"
                        width="400"
                        height="300"
                      />
                    </div>
                    <div className="p-6">
                      <span className="text-[9px] tracking-[0.3em] uppercase text-[#C8860A80] mb-2 block">{related.subtitle}</span>
                      <h3 className="serif text-xl font-medium text-[#FDF6E3] group-hover:text-[#F5A623] transition-colors">{related.name}</h3>
                      <div className="mt-4 flex items-center justify-between">
                        <span className="text-xs gold-text font-medium">From {related.prices['250g']} DH</span>
                        <span className="text-[10px] tracking-widest uppercase text-[#FDF6E340] group-hover:text-[#FDF6E3] transition-colors">Discover →</span>
                      </div>
                    </div>
                  </Link>
                ))}
            </div>
          </section>

          {/* Usage Section */}
          <section className="mt-40 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center bg-[#150E05] p-10 sm:p-20 border border-[#C8860A10]">
             <div>
                <h3 className="text-[11px] tracking-[0.4em] uppercase text-[#C8860A] mb-6">How to enjoy</h3>
                <h2 className="serif text-4xl font-light mb-8">The Perfect Pairing</h2>
                <p className="text-[#FDF6E380] leading-relaxed mb-0">
                  {product.usage}
                </p>
             </div>
             <div className="grid grid-cols-2 gap-4">
                <div className="aspect-square bg-[#0F0A04] border border-[#C8860A10] flex flex-col items-center justify-center p-6 text-center">
                   <span className="serif text-2xl gold-text mb-2">100%</span>
                   <span className="text-[9px] tracking-[0.2em] uppercase text-[#FDF6E340]">Unprocessed Raw</span>
                </div>
                <div className="aspect-square bg-[#0F0A04] border border-[#C8860A10] flex flex-col items-center justify-center p-6 text-center">
                   <span className="serif text-2xl gold-text mb-2">High</span>
                   <span className="text-[9px] tracking-[0.2em] uppercase text-[#FDF6E340]">Altitude Pure</span>
                </div>
             </div>
          </section>
        </div>
      </main>

      <WhatsAppButton />
      <Footer />
    </div>
  );
}
