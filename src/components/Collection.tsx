import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { products, Weight } from '../data/products';

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

export default function Collection() {
  const { ref, inView } = useInView();
  const { addItem, items, openCart } = useCart();
  const [addedIds, setAddedIds] = useState<string[]>([]);
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const [selectedWeights, setSelectedWeights] = useState<Record<number, Weight>>(
    products.reduce((acc, p) => ({ ...acc, [p.id]: '500g' }), {})
  );

  const handleAdd = (product: typeof products[0]) => {
    const weight = selectedWeights[product.id];
    const price = product.prices[weight];
    const cartItemId = `${product.id}-${weight}`;

    addItem({
      id: product.id,
      name: product.name,
      subtitle: product.subtitle,
      price: price,
      weight: weight,
      image: product.pexels,
    });

    setAddedIds((prev) => [...prev, cartItemId]);

    const itemInCart = items.find((item) => item.id === product.id && item.weight === weight);
    if (!itemInCart) {
      setTimeout(() => openCart(), 600);
    }

    setTimeout(() => setAddedIds((prev) => prev.filter((i) => i !== cartItemId)), 1800);
  };

  const getItemQuantity = (id: number, weight: string) => {
    const item = items.find((i) => i.id === id && i.weight === weight);
    return item ? item.quantity : 0;
  };

  return (
    <section id="collection" className="section-py bg-[#0D0903]">
      <div className="max-w-7xl mx-auto container-px">
        {/* Header */}
        <div ref={ref} className={`text-center mb-16 transition-all duration-1000 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="flex items-center justify-center gap-3 mb-6">
            <span className="h-px w-8 sm:w-12 bg-[#C8860A]" />
            <span className="text-[10px] tracking-[0.4em] uppercase text-[#C8860A]">Artisan Selection</span>
            <span className="h-px w-8 sm:w-12 bg-[#C8860A]" />
          </div>
          <h2 className="serif text-4xl sm:text-5xl lg:text-6xl font-light text-[#FDF6E3] mb-4">
            The <em className="gold-text not-italic font-medium">Collection</em>
          </h2>
          <p className="text-[#FDF6E350] text-base md:text-lg lg:text-xl max-w-2xl mx-auto leading-relaxed px-4">
            Experience the world's most exquisite honeys. Sourced from the untamed peaks of Morocco, our collection represents a commitment to purity, tradition, and the highest standards of quality.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10">
          {products.map((product, i) => {
            const currentWeight = selectedWeights[product.id];
            const currentPrice = product.prices[currentWeight];
            const qty = getItemQuantity(product.id, currentWeight);
            const isAdding = addedIds.includes(`${product.id}-${currentWeight}`);

            return (
              <div
                key={product.id}
                onMouseEnter={() => setHoveredId(product.id)}
                onMouseLeave={() => setHoveredId(null)}
                className={`group relative bg-[#150E05] border border-[#C8860A15] hover:border-[#C8860A40] transition-all duration-700 hover-lift flex flex-col ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                {/* Badge */}
                <div
                  className="absolute top-4 left-4 z-10 px-3 py-1 text-[9px] tracking-[0.25em] uppercase font-semibold text-[#FDF6E3]"
                  style={{ background: product.badgeColor }}
                >
                  {product.badge}
                </div>

                {/* Quantity indicator when in cart */}
                {qty > 0 && (
                  <div className="absolute top-4 right-4 z-10 w-7 h-7 gold-gradient text-[#1A1208] text-[10px] font-bold flex items-center justify-center rounded-full cart-badge-pop">
                    {qty}
                  </div>
                )}

                {/* Product Image & Link */}
                  <Link to={`/product/${product.slug}`} className="relative overflow-hidden aspect-[4/3] block">
                    <img
                      src={product.pexels}
                      alt={`${product.name} — RIF HONEY premium mountain honey`}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      loading="lazy"
                      width="600"
                      height="450"
                    />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#150E05] via-transparent to-transparent opacity-80" />

                  {/* Hover overlay */}
                  <div 
                    className={`absolute inset-0 flex flex-col items-center justify-center bg-[#0F0A04E6] transition-opacity duration-500 ${hoveredId === product.id ? 'opacity-100' : 'opacity-0'}`}
                  >
                    <p className="text-[#FDF6E3] text-[11px] tracking-[0.2em] uppercase font-bold mb-3 border-b border-[#C8860A] pb-1">
                      View Details
                    </p>
                    <p className="text-[#FDF6E3] text-xs leading-relaxed text-center px-8 font-medium">
                      Discover the product essence
                    </p>
                  </div>
                </Link>

                {/* Content */}
                <div className="p-6 flex flex-col flex-1">
                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-3">
                    {product.tags.map((tag) => (
                      <span key={tag} className="text-[9px] tracking-widest uppercase text-[#C8860A80] border border-[#C8860A30] px-2 py-0.5">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="mb-4">
                    <Link to={`/product/${product.slug}`} className="hover:text-[#F5A623] transition-colors">
                      <h3 className="serif text-2xl font-medium text-[#FDF6E3] leading-tight">{product.name}</h3>
                    </Link>
                    <p className="text-[10px] tracking-[0.2em] uppercase text-[#C8860A80] mt-1">{product.subtitle}</p>
                  </div>

                  {/* Weight Selection Chips */}
                  <div className="mb-6">
                    <p className="text-[9px] tracking-widest uppercase text-[#FDF6E340] mb-3">Select Weight</p>
                    <div className="flex gap-2">
                      {(['250g', '500g', '1kg'] as Weight[]).map((w) => (
                        <button
                          key={w}
                          onClick={() => setSelectedWeights(prev => ({ ...prev, [product.id]: w }))}
                          className={`flex-1 py-2 text-[10px] tracking-widest uppercase border transition-all duration-300 ${
                            currentWeight === w
                              ? 'border-[#C8860A] text-[#FDF6E3] bg-[#C8860A20]'
                              : 'border-[#C8860A15] text-[#FDF6E340] hover:border-[#C8860A40]'
                          }`}
                        >
                          {w}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="mt-auto flex items-end justify-between">
                    <div>
                      <div className="flex items-baseline gap-1.5">
                        <span className="serif text-3xl font-medium gold-text">{currentPrice}</span>
                        <span className="text-[10px] text-[#FDF6E340] tracking-wider uppercase">DH</span>
                      </div>
                    </div>
                    <button
                      onClick={() => handleAdd(product)}
                      className={`relative flex items-center gap-2 px-6 py-4 sm:px-5 sm:py-3 text-[10px] tracking-[0.2em] uppercase font-bold transition-all duration-400 overflow-hidden active-shrink ${
                        isAdding
                          ? 'bg-[#1B5E20] text-[#A5D6A7] scale-105'
                          : 'gold-gradient text-[#1A1208] hover:opacity-90'
                      }`}
                    >
                      {isAdding ? (
                        <>
                          <svg className="w-4 h-4 sm:w-3.5 sm:h-3.5" fill="none" stroke="currentColor" strokeWidth={3} viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5"/>
                          </svg>
                          Added
                        </>
                      ) : (
                        <>
                          <svg className="w-4 h-4 sm:w-3.5 sm:h-3.5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                          </svg>
                          Add to Cart
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* View all CTA */}
        <div className={`text-center mt-16 transition-all duration-1000 delay-500 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <button className="border border-[#C8860A] text-[#F5A623] px-12 py-4 text-xs tracking-[0.3em] uppercase hover:bg-[#C8860A10] transition-all duration-300">
            View Full Catalogue
          </button>
        </div>
      </div>
    </section>
  );
}
