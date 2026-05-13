import { useEffect, useRef, useCallback } from 'react';
import { useCart } from '../context/CartContext';
import { getWhatsAppUrl } from './WhatsAppButton';

const SHIPPING_THRESHOLD = 400;
const SHIPPING_COST = 40;

export default function CartDrawer() {
  const { items, isOpen, closeCart, totalItems, totalPrice, updateQuantity, removeItem, clearCart } = useCart();
  const drawerRef = useRef<HTMLDivElement>(null);

  // Build WhatsApp order message and open chat
  const handleCheckout = useCallback(() => {
    const isFreeShipping = totalPrice >= SHIPPING_THRESHOLD;
    const finalShipping = isFreeShipping ? 0 : SHIPPING_COST;
    const finalTotal = totalPrice + finalShipping;

    const itemLines = items
      .map(
        (item, i) =>
          `${i + 1}. ${item.name} (${item.weight}) × ${item.quantity} — ${item.price * item.quantity} DH`
      )
      .join('\n');

    const message = [
      `*NEW ORDER — RIF HONEY*`,
      `━━━━━━━━━━━━━━━━━━`,
      ``,
      itemLines,
      ``,
      `━━━━━━━━━━━━━━━━━━`,
      `Order Summary:`,
      `Items: ${totalItems}`,
      `Subtotal: ${totalPrice} DH`,
      `Shipping: ${isFreeShipping ? 'Free' : `${SHIPPING_COST} DH`}`,
      `Total: ${finalTotal} DH`,
      ``,
      `Please confirm my order. Thank you.`,
    ].join('\n');

    window.open(getWhatsAppUrl(message), '_blank', 'noopener,noreferrer');
  }, [items, totalItems, totalPrice]);

  // Close on Escape key
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeCart();
    };
    if (isOpen) {
      document.addEventListener('keydown', handleKey);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [isOpen, closeCart]);

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-[90] bg-[#0F0A04]/80 backdrop-blur-sm transition-opacity duration-500 ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={closeCart}
        aria-hidden="true"
      />

      {/* Drawer Panel */}
      <div
        ref={drawerRef}
        role="dialog"
        aria-modal="true"
        aria-label="Shopping Cart"
        className={`fixed top-0 right-0 z-[100] h-full-dynamic w-full sm:max-w-[460px] flex flex-col transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        style={{
          background: 'linear-gradient(180deg, #1A1208 0%, #0F0A04 100%)',
          borderLeft: '1px solid rgba(200, 134, 10, 0.15)',
          height: 'calc(var(--vh, 1vh) * 100)',
        }}
      >
        {/* Header */}
        <div className="flex-shrink-0 flex items-center justify-between px-6 py-5 border-b border-[#C8860A20]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 flex items-center justify-center" style={{ background: 'rgba(200, 134, 10, 0.1)', clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)' }}>
              <svg className="w-5 h-5 text-[#F5A623]" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
              </svg>
            </div>
            <div>
              <h2 className="serif text-xl font-medium text-[#FDF6E3]">Your Cart</h2>
              <span className="text-[10px] tracking-[0.25em] uppercase text-[#C8860A80]">
                {totalItems} {totalItems === 1 ? 'item' : 'items'}
              </span>
            </div>
          </div>
          <button
            onClick={closeCart}
            className="p-3 -mr-2 text-[#FDF6E380] hover:text-[#F5A623] transition-colors duration-300 active-shrink"
            aria-label="Close cart"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Items List */}
        <div className="flex-1 overflow-y-auto px-5 py-6 cart-scroll">
          {items.length > 0 && (
            <div className="mb-8 p-4 bg-[#C8860A08] border border-[#C8860A15]">
              <div className="flex justify-between items-end mb-2">
                <span className="text-[10px] tracking-widest uppercase text-[#FDF6E3]">
                  {totalPrice >= SHIPPING_THRESHOLD 
                    ? 'You have qualified for FREE shipping' 
                    : `Add ${SHIPPING_THRESHOLD - totalPrice} DH more for FREE shipping`}
                </span>
                <span className="text-[10px] font-bold text-[#C8860A]">
                  {Math.min(100, (totalPrice / SHIPPING_THRESHOLD) * 100).toFixed(0)}%
                </span>
              </div>
              <div className="h-1 bg-[#C8860A10] rounded-full overflow-hidden">
                <div 
                  className="h-full gold-gradient transition-all duration-700 ease-out"
                  style={{ width: `${Math.min(100, (totalPrice / SHIPPING_THRESHOLD) * 100)}%` }}
                />
              </div>
            </div>
          )}

          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center gap-6 py-12">
              <div
                className="w-24 h-24 flex items-center justify-center animate-float"
                style={{
                  background: 'rgba(200, 134, 10, 0.06)',
                  clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
                }}
              >
                <svg className="w-10 h-10 text-[#C8860A30]" fill="none" stroke="currentColor" strokeWidth={1} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                </svg>
              </div>
              <div className="px-4">
                <p className="serif text-2xl text-[#FDF6E3] mb-3">Your cart is empty</p>
                <p className="text-xs text-[#FDF6E370] tracking-wide leading-relaxed max-w-[260px] mx-auto">
                  Explore our collection and discover nature's finest golden treasures.
                </p>
              </div>
              <button
                onClick={closeCart}
                className="mt-4 px-10 py-4 border border-[#C8860A40] text-[#F5A623] text-[11px] tracking-[0.3em] uppercase hover:bg-[#C8860A10] transition-all duration-300 active-shrink"
              >
                Explore Collection
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-5">
              {items.map((item, index) => (
                <div
                  key={item.id}
                  className="group relative flex gap-5 p-5 bg-[#150E05] border border-[#C8860A10] hover:border-[#C8860A30] transition-all duration-300"
                  style={{ animationDelay: `${index * 60}ms` }}
                >
                  {/* Product Image */}
                  <div className="w-24 h-24 flex-shrink-0 overflow-hidden bg-[#0F0A04]">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      loading="lazy"
                    />
                  </div>

                  {/* Product Info */}
                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div>
                      <h3 className="serif text-base font-medium text-[#FDF6E3] truncate">{item.name}</h3>
                      <p className="text-[9px] tracking-[0.2em] uppercase text-[#C8860A60] mt-1">{item.subtitle}</p>
                    </div>

                    <div className="flex items-center justify-between mt-3">
                      {/* Quantity Controls - Larger for touch */}
                      <div className="flex items-center gap-0 border border-[#C8860A25] bg-[#0F0A04]">
                        <button
                          onClick={() => updateQuantity(item.id, item.weight, item.quantity - 1)}
                          className="w-10 h-10 flex items-center justify-center text-[#C8860A] hover:bg-[#C8860A15] transition-colors text-base active:bg-[#C8860A20]"
                          aria-label={`Decrease quantity of ${item.name}`}
                        >
                          −
                        </button>
                        <span className="w-10 h-10 flex items-center justify-center text-xs text-[#FDF6E3] border-x border-[#C8860A25] font-medium">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.weight, item.quantity + 1)}
                          className="w-10 h-10 flex items-center justify-center text-[#C8860A] hover:bg-[#C8860A15] transition-colors text-base active:bg-[#C8860A20]"
                          aria-label={`Increase quantity of ${item.name}`}
                        >
                          +
                        </button>
                      </div>

                      {/* Price */}
                      <span className="serif text-lg font-medium gold-text">{item.price * item.quantity} DH</span>
                    </div>
                  </div>

                  {/* Remove Button - Larger touch target */}
                  <button
                    onClick={() => removeItem(item.id, item.weight)}
                    className="absolute top-1 right-1 p-3 text-[#FDF6E315] hover:text-red-400 transition-colors duration-200 active-shrink"
                    aria-label={`Remove ${item.name} from cart`}
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              ))}

              {/* Clear Cart */}
              <button
                onClick={clearCart}
                className="self-start px-2 py-1 text-[10px] tracking-widest uppercase text-[#FDF6E325] hover:text-red-400 transition-colors mt-2"
              >
                Clear all items
              </button>
            </div>
          )}
        </div>

        {/* Footer with Total & Checkout */}
        {items.length > 0 && (
          <div className="flex-shrink-0 border-t border-[#C8860A20] px-6 py-6 bg-[#0F0A04]/80 backdrop-blur-md">
            {/* Subtotal rows */}
            <div className="flex flex-col gap-2.5 mb-6">
              <div className="flex items-center justify-between">
                <span className="text-xs tracking-wider uppercase text-[#FDF6E3]">Subtotal</span>
                <span className="serif text-lg text-[#FDF6E3]">{totalPrice} DH</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs tracking-wider uppercase text-[#FDF6E3]">Shipping</span>
                <span className={`text-xs tracking-wider uppercase ${totalPrice >= SHIPPING_THRESHOLD ? 'text-[#C8860A] font-bold' : 'text-[#FDF6E3]'}`}>
                  {totalPrice >= SHIPPING_THRESHOLD ? 'Free' : `${SHIPPING_COST} DH`}
                </span>
              </div>
              <hr className="border-0 h-px bg-[#C8860A15] my-1" />
              <div className="flex items-center justify-between">
                <span className="text-sm tracking-widest uppercase text-[#FDF6E3] font-bold">Total</span>
                <span className="serif text-2xl font-bold gold-text">
                  {totalPrice + (totalPrice >= SHIPPING_THRESHOLD ? 0 : SHIPPING_COST)} DH
                </span>
              </div>
            </div>

            {/* Checkout via WhatsApp */}
            <button
              onClick={handleCheckout}
              className="w-full py-5 text-xs font-bold tracking-[0.3em] uppercase transition-all duration-300 hover:opacity-95 active:scale-[0.97] flex items-center justify-center gap-3 rounded-none active-shrink"
              style={{
                background: 'linear-gradient(135deg, #25D366 0%, #128C7E 100%)',
                color: '#fff',
                boxShadow: '0 8px 32px rgba(37, 211, 102, 0.2)',
              }}
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              Confirm via WhatsApp
            </button>

            {/* Trust Badges */}
            <div className="flex items-center justify-center gap-4 mt-4">
              <span className="text-[9px] tracking-wider uppercase text-[#FDF6E360] flex items-center gap-1">
                <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                </svg>
                Secure
              </span>
              <span className="text-[9px] tracking-wider uppercase text-[#FDF6E360] flex items-center gap-1">
                <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0H21M3.375 14.25h14.25m0 0V4.875c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v9.375m16.5 0h.375a1.125 1.125 0 011.125 1.125v2.25" />
                </svg>
                Free Shipping
              </span>
              <span className="text-[9px] tracking-wider uppercase text-[#FDF6E360] flex items-center gap-1">
                <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                </svg>
                Premium
              </span>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
