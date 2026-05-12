import { useState, useEffect, useRef } from 'react';
import { useCart } from '../context/CartContext';

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

const products = [
  {
    id: 1,
    name: 'Wild Cedar Honey',
    subtitle: 'Cedar Forest Reserve',
    price: 48,
    weight: '500g',
    image: '/images/product-1.jpg',
    pexels: 'https://images.pexels.com/photos/35310735/pexels-photo-35310735.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    description: 'Harvested from cedar and juniper forests above 1,600m. Deep amber, earthy, and complex with a lingering finish.',
    badge: 'Best Seller',
    badgeColor: '#C8860A',
    tags: ['Raw', 'Unfiltered', 'Dark Amber'],
  },
  {
    id: 2,
    name: 'Mountain Wildflower',
    subtitle: 'Multi-Flora Blend',
    price: 38,
    weight: '500g',
    image: '/images/product-2.jpg',
    pexels: 'https://images.pexels.com/photos/35282122/pexels-photo-35282122.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    description: 'A harmonious blend from over twelve wild alpine flowers. Golden, fragrant, and perfectly balanced in sweetness.',
    badge: 'Signature',
    badgeColor: '#8B5E0A',
    tags: ['Raw', 'Multi-Flora', 'Golden'],
  },
  {
    id: 3,
    name: 'Raw Comb Honey',
    subtitle: 'Pure Honeycomb',
    price: 65,
    weight: '400g',
    image: '/images/product-3.jpg',
    pexels: 'https://images.pexels.com/photos/4921856/pexels-photo-4921856.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    description: "The ultimate honey experience — wax comb intact, honey cells unbroken. Nature's purest, most primal form.",
    badge: 'Rare',
    badgeColor: '#6B4226',
    tags: ['Comb', 'Unprocessed', 'Limited'],
  },
  {
    id: 4,
    name: 'Wild Thyme Honey',
    subtitle: 'Chakrane Highland Thyme',
    price: 55,
    weight: '500g',
    image: '/images/product-1.jpg',
    pexels: 'https://images.pexels.com/photos/8500508/pexels-photo-8500508.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    description: 'Prized for centuries in Mediterranean tradition. Herbaceous, medicinal, and with powerful antibacterial properties.',
    badge: 'Premium',
    badgeColor: '#7A4E08',
    tags: ['Thyme', 'Medicinal', 'Amber'],
  },
  {
    id: 5,
    name: 'Luxury Gift Set',
    subtitle: 'Collection of 3 Jars',
    price: 130,
    weight: '3x 250g',
    image: '/images/product-2.jpg',
    pexels: 'https://images.pexels.com/photos/34944360/pexels-photo-34944360.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    description: 'Three of our finest varieties presented in a handcrafted cedar box — the perfect luxury gift for discerning palates.',
    badge: 'Gift',
    badgeColor: '#2C1F0A',
    tags: ['Gift', 'Set', 'Premium'],
  },
  {
    id: 6,
    name: 'Black Seed & Honey',
    subtitle: 'Healing Reserve',
    price: 72,
    weight: '500g',
    image: '/images/product-3.jpg',
    pexels: 'https://images.pexels.com/photos/7990484/pexels-photo-7990484.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    description: 'Ancient Moroccan tradition: wild Nigella sativa seeds blended with pure mountain honey. A powerful wellness remedy.',
    badge: 'Wellness',
    badgeColor: '#1A1208',
    tags: ['Black Seed', 'Healing', 'Dark'],
  },
];

export default function Collection() {
  const { ref, inView } = useInView();
  const { addItem, items, openCart } = useCart();
  const [addedIds, setAddedIds] = useState<number[]>([]);
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  const handleAdd = (product: typeof products[0]) => {
    // Actually add the product to the cart
    addItem({
      id: product.id,
      name: product.name,
      subtitle: product.subtitle,
      price: product.price,
      weight: product.weight,
      image: product.pexels,
    });

    // Show visual feedback
    setAddedIds((prev) => [...prev, product.id]);

    // Auto-open cart after a brief delay for the first item
    const itemInCart = items.find((item) => item.id === product.id);
    if (!itemInCart) {
      setTimeout(() => openCart(), 600);
    }

    // Reset the "Added" state after animation
    setTimeout(() => setAddedIds((prev) => prev.filter((i) => i !== product.id)), 1800);
  };

  const getItemQuantity = (id: number) => {
    const item = items.find((i) => i.id === id);
    return item ? item.quantity : 0;
  };

  return (
    <section id="collection" className="py-24 md:py-36 bg-[#0D0903]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div ref={ref} className={`text-center mb-16 md:mb-20 transition-all duration-1000 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="flex items-center justify-center gap-3 mb-6">
            <span className="h-px w-12 bg-[#C8860A]" />
            <span className="text-[10px] tracking-[0.4em] uppercase text-[#C8860A]">Artisan Selection</span>
            <span className="h-px w-12 bg-[#C8860A]" />
          </div>
          <h2 className="serif text-4xl md:text-5xl lg:text-6xl font-light text-[#FDF6E3] mb-4">
            The <em className="gold-text not-italic font-medium">Collection</em>
          </h2>
          <p className="text-[#FDF6E350] text-sm md:text-base max-w-xl mx-auto leading-relaxed">
            Each variety tells a story of altitude, season, and flora — crafted by nature, curated by our master beekeepers.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {products.map((product, i) => {
            const qty = getItemQuantity(product.id);
            const isAdding = addedIds.includes(product.id);

            return (
              <div
                key={product.id}
                onMouseEnter={() => setHoveredId(product.id)}
                onMouseLeave={() => setHoveredId(null)}
                className={`group relative bg-[#150E05] border border-[#C8860A15] hover:border-[#C8860A40] transition-all duration-700 hover-lift ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
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

                {/* Product Image */}
                <div className="relative overflow-hidden aspect-[4/3]">
                  <img
                    src={product.pexels}
                    alt={`${product.name} — RIF HONEY premium mountain honey`}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#150E05] via-transparent to-transparent opacity-80" />

                  {/* Hover overlay */}
                  <div className={`absolute inset-0 flex items-center justify-center bg-[#0F0A04CC] transition-opacity duration-500 ${hoveredId === product.id ? 'opacity-100' : 'opacity-0'}`}>
                    <p className="text-[#FDF6E390] text-xs leading-relaxed text-center px-6 max-w-[240px]">
                      {product.description}
                    </p>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-3">
                    {product.tags.map((tag) => (
                      <span key={tag} className="text-[9px] tracking-widest uppercase text-[#C8860A80] border border-[#C8860A30] px-2 py-0.5">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="mb-1">
                    <h3 className="serif text-xl font-medium text-[#FDF6E3] leading-tight">{product.name}</h3>
                    <p className="text-[10px] tracking-[0.2em] uppercase text-[#C8860A80] mt-0.5">{product.subtitle}</p>
                  </div>

                  <div className="flex items-end justify-between mt-4">
                    <div>
                      <div className="flex items-baseline gap-1.5">
                        <span className="serif text-2xl font-medium gold-text">${product.price}</span>
                        <span className="text-[10px] text-[#FDF6E340] tracking-wider">/ {product.weight}</span>
                      </div>
                    </div>
                    <button
                      onClick={() => handleAdd(product)}
                      className={`relative flex items-center gap-2 px-5 py-2.5 text-[10px] tracking-[0.2em] uppercase font-semibold transition-all duration-400 overflow-hidden ${
                        isAdding
                          ? 'bg-[#1B5E20] text-[#A5D6A7] scale-105'
                          : 'gold-gradient text-[#1A1208] hover:opacity-90 hover:scale-105 active:scale-95'
                      }`}
                    >
                      {isAdding ? (
                        <>
                          <svg className="w-3.5 h-3.5 animate-[scaleIn_0.3s_ease]" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5"/>
                          </svg>
                          Added!
                        </>
                      ) : (
                        <>
                          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                          </svg>
                          {qty > 0 ? `Add More` : `Add to Cart`}
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
        <div className={`text-center mt-14 transition-all duration-1000 delay-500 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <button className="border border-[#C8860A] text-[#F5A623] px-12 py-4 text-xs tracking-[0.3em] uppercase hover:bg-[#C8860A10] transition-all duration-300">
            View Full Catalogue
          </button>
        </div>
      </div>
    </section>
  );
}
