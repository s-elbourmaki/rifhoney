import { useEffect, useRef } from 'react';
import { useCart } from '../context/CartContext';

export default function CartDrawer() {
  const { items, isOpen, closeCart, totalItems, totalPrice, updateQuantity, removeItem, clearCart } = useCart();
  const drawerRef = useRef<HTMLDivElement>(null);

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
        className={`fixed top-0 right-0 z-[100] h-full w-full max-w-[460px] flex flex-col transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        style={{
          background: 'linear-gradient(180deg, #1A1208 0%, #0F0A04 100%)',
          borderLeft: '1px solid rgba(200, 134, 10, 0.15)',
        }}
      >
        {/* Header */}
        <div className="flex-shrink-0 flex items-center justify-between px-6 py-5 border-b border-[#C8860A20]">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 flex items-center justify-center" style={{ background: 'rgba(200, 134, 10, 0.1)', clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)' }}>
              <svg className="w-4 h-4 text-[#F5A623]" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
              </svg>
            </div>
            <div>
              <h2 className="serif text-lg font-medium text-[#FDF6E3]">Your Cart</h2>
              <span className="text-[10px] tracking-[0.25em] uppercase text-[#C8860A80]">
                {totalItems} {totalItems === 1 ? 'item' : 'items'}
              </span>
            </div>
          </div>
          <button
            onClick={closeCart}
            className="p-2 text-[#FDF6E340] hover:text-[#F5A623] transition-colors duration-300"
            aria-label="Close cart"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Items List */}
        <div className="flex-1 overflow-y-auto px-6 py-4 cart-scroll">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center gap-5 py-12">
              {/* Empty cart hexagon icon */}
              <div
                className="w-20 h-20 flex items-center justify-center animate-float"
                style={{
                  background: 'rgba(200, 134, 10, 0.06)',
                  clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
                }}
              >
                <svg className="w-8 h-8 text-[#C8860A40]" fill="none" stroke="currentColor" strokeWidth={1} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                </svg>
              </div>
              <div>
                <p className="serif text-xl text-[#FDF6E360] mb-2">Your cart is empty</p>
                <p className="text-[11px] text-[#FDF6E330] tracking-wide leading-relaxed max-w-[220px]">
                  Explore our collection and discover nature's finest golden treasures.
                </p>
              </div>
              <button
                onClick={closeCart}
                className="mt-2 px-8 py-3 border border-[#C8860A40] text-[#F5A623] text-[10px] tracking-[0.3em] uppercase hover:bg-[#C8860A10] transition-all duration-300"
              >
                Explore Collection
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              {items.map((item, index) => (
                <div
                  key={item.id}
                  className="group relative flex gap-4 p-4 bg-[#150E05] border border-[#C8860A10] hover:border-[#C8860A30] transition-all duration-300"
                  style={{ animationDelay: `${index * 60}ms` }}
                >
                  {/* Product Image */}
                  <div className="w-20 h-20 flex-shrink-0 overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>

                  {/* Product Info */}
                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div>
                      <h3 className="serif text-sm font-medium text-[#FDF6E3] truncate">{item.name}</h3>
                      <p className="text-[9px] tracking-[0.2em] uppercase text-[#C8860A60] mt-0.5">{item.subtitle}</p>
                    </div>

                    <div className="flex items-center justify-between mt-2">
                      {/* Quantity Controls */}
                      <div className="flex items-center gap-0 border border-[#C8860A25]">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-7 h-7 flex items-center justify-center text-[#C8860A] hover:bg-[#C8860A15] transition-colors text-xs"
                          aria-label={`Decrease quantity of ${item.name}`}
                        >
                          −
                        </button>
                        <span className="w-8 h-7 flex items-center justify-center text-[11px] text-[#FDF6E3] border-x border-[#C8860A25] font-medium">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-7 h-7 flex items-center justify-center text-[#C8860A] hover:bg-[#C8860A15] transition-colors text-xs"
                          aria-label={`Increase quantity of ${item.name}`}
                        >
                          +
                        </button>
                      </div>

                      {/* Price */}
                      <span className="serif text-base font-medium gold-text">${item.price * item.quantity}</span>
                    </div>
                  </div>

                  {/* Remove Button */}
                  <button
                    onClick={() => removeItem(item.id)}
                    className="absolute top-2 right-2 p-1.5 text-[#FDF6E315] hover:text-red-400 transition-colors duration-200"
                    aria-label={`Remove ${item.name} from cart`}
                  >
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              ))}

              {/* Clear Cart */}
              <button
                onClick={clearCart}
                className="self-start text-[10px] tracking-widest uppercase text-[#FDF6E325] hover:text-red-400 transition-colors mt-1"
              >
                Clear all items
              </button>
            </div>
          )}
        </div>

        {/* Footer with Total & Checkout */}
        {items.length > 0 && (
          <div className="flex-shrink-0 border-t border-[#C8860A20] px-6 py-5">
            {/* Subtotal rows */}
            <div className="flex flex-col gap-2 mb-5">
              <div className="flex items-center justify-between">
                <span className="text-[11px] tracking-wider uppercase text-[#FDF6E350]">Subtotal</span>
                <span className="serif text-base text-[#FDF6E3]">${totalPrice}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[11px] tracking-wider uppercase text-[#FDF6E350]">Shipping</span>
                <span className="text-[11px] tracking-wider uppercase text-[#C8860A80]">Free</span>
              </div>
              <hr className="border-0 h-px bg-[#C8860A15] my-1" />
              <div className="flex items-center justify-between">
                <span className="text-xs tracking-wider uppercase text-[#FDF6E3] font-medium">Total</span>
                <span className="serif text-xl font-medium gold-text">${totalPrice}</span>
              </div>
            </div>

            {/* Checkout Button */}
            <button
              className="w-full py-4 gold-gradient text-[#1A1208] text-[11px] font-semibold tracking-[0.3em] uppercase transition-all duration-300 hover:opacity-90 active:scale-[0.98] flex items-center justify-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
              </svg>
              Secure Checkout
            </button>

            {/* Trust Badges */}
            <div className="flex items-center justify-center gap-4 mt-4">
              <span className="text-[9px] tracking-wider uppercase text-[#FDF6E320] flex items-center gap-1">
                <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                </svg>
                Secure
              </span>
              <span className="text-[9px] tracking-wider uppercase text-[#FDF6E320] flex items-center gap-1">
                <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0H21M3.375 14.25h14.25m0 0V4.875c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v9.375m16.5 0h.375a1.125 1.125 0 011.125 1.125v2.25" />
                </svg>
                Free Shipping
              </span>
              <span className="text-[9px] tracking-wider uppercase text-[#FDF6E320] flex items-center gap-1">
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
