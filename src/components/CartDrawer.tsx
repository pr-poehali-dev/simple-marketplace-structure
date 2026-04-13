import { useEffect, useState } from 'react';
import Icon from '@/components/ui/icon';
import { useCart } from '@/context/CartContext';
import CheckoutModal from '@/components/CheckoutModal';

interface CartDrawerProps {
  onClose: () => void;
}

export default function CartDrawer({ onClose }: CartDrawerProps) {
  const { items, remove, setQty, total, clear } = useCart();
  const [checkoutOpen, setCheckoutOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [onClose]);

  return (
    <>
    {checkoutOpen && <CheckoutModal onClose={() => setCheckoutOpen(false)} />}
    <div className="fixed inset-0 z-40 flex justify-end" onClick={e => { if (e.target === e.currentTarget) onClose(); }}>
      {/* Backdrop */}
      <div className="absolute inset-0" style={{ background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(4px)' }} onClick={onClose} />

      {/* Drawer */}
      <div className="relative w-full max-w-md h-full flex flex-col animate-slide-in"
        style={{ background: '#111', borderLeft: '1px solid rgba(139,0,0,0.3)' }}>

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5"
          style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
          <div>
            <h2 className="font-gothic text-2xl" style={{ color: '#e8e0d0' }}>Корзина</h2>
            <p className="text-xs font-body mt-0.5" style={{ color: 'rgba(235,235,235,0.3)' }}>
              {items.length === 0 ? 'пусто' : `${items.reduce((s, i) => s + i.qty, 0)} товар(а)`}
            </p>
          </div>
          <button onClick={onClose}
            className="w-9 h-9 rounded flex items-center justify-center transition-all"
            style={{ border: '1px solid rgba(255,255,255,0.1)' }}
            onMouseEnter={e => (e.currentTarget.style.borderColor = 'rgba(139,0,0,0.5)')}
            onMouseLeave={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)')}>
            <Icon name="X" size={16} style={{ color: 'rgba(235,235,235,0.6)' }} />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-3">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center py-20">
              <div className="text-5xl mb-4">🕯️</div>
              <p className="font-serif text-xl mb-1" style={{ color: 'rgba(235,235,235,0.4)' }}>Корзина пуста</p>
              <p className="text-xs font-body" style={{ color: 'rgba(235,235,235,0.2)' }}>Добавьте украшения из каталога</p>
            </div>
          ) : (
            items.map(({ product, qty }) => (
              <div key={product.id} className="flex gap-4 p-3 rounded-xl"
                style={{ background: '#1a1a1a', border: '1px solid rgba(255,255,255,0.05)' }}>
                {/* Image */}
                <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0"
                  style={{ background: '#0a0a0a' }}>
                  <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                </div>
                {/* Info */}
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-body uppercase tracking-wider mb-0.5"
                    style={{ color: 'rgba(192,192,192,0.35)', letterSpacing: '0.1em' }}>{product.material}</p>
                  <p className="font-serif text-sm font-semibold truncate mb-2" style={{ color: '#e8e0d0' }}>{product.name}</p>
                  {/* Qty controls */}
                  <div className="flex items-center gap-2">
                    <button onClick={() => setQty(product.id, qty - 1)}
                      className="w-6 h-6 rounded flex items-center justify-center transition-all text-sm font-bold"
                      style={{ background: 'rgba(139,0,0,0.15)', border: '1px solid rgba(139,0,0,0.3)', color: '#c0392b' }}>−</button>
                    <span className="font-body text-sm w-4 text-center" style={{ color: '#e8e0d0' }}>{qty}</span>
                    <button onClick={() => setQty(product.id, qty + 1)}
                      className="w-6 h-6 rounded flex items-center justify-center transition-all text-sm font-bold"
                      style={{ background: 'rgba(139,0,0,0.15)', border: '1px solid rgba(139,0,0,0.3)', color: '#c0392b' }}>+</button>
                  </div>
                </div>
                {/* Price + delete */}
                <div className="flex flex-col items-end justify-between">
                  <button onClick={() => remove(product.id)} className="transition-colors"
                    style={{ color: 'rgba(255,255,255,0.2)' }}
                    onMouseEnter={e => (e.currentTarget.style.color = '#c0392b')}
                    onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.2)')}>
                    <Icon name="Trash2" size={14} />
                  </button>
                  <span className="font-serif text-sm font-semibold" style={{ color: '#e8e0d0' }}>
                    {(product.price * qty).toLocaleString()} ₽
                  </span>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="px-6 py-5" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-body uppercase tracking-widest" style={{ color: 'rgba(235,235,235,0.4)', letterSpacing: '0.15em' }}>Итого</span>
              <span className="font-serif text-2xl font-semibold" style={{ color: '#e8e0d0' }}>{total.toLocaleString()} ₽</span>
            </div>
            <button onClick={() => setCheckoutOpen(true)}
              className="w-full btn-blood py-4 text-sm font-body font-semibold uppercase blood-glow-sm mb-3"
              style={{ letterSpacing: '0.12em' }}>
              <span className="flex items-center justify-center gap-2">
                <Icon name="CreditCard" size={15} /> Оформить заказ
              </span>
            </button>
            <button onClick={clear}
              className="w-full py-2 text-xs font-body uppercase tracking-widest transition-colors"
              style={{ color: 'rgba(235,235,235,0.25)', letterSpacing: '0.12em' }}
              onMouseEnter={e => (e.currentTarget.style.color = '#c0392b')}
              onMouseLeave={e => (e.currentTarget.style.color = 'rgba(235,235,235,0.25)')}>
              Очистить корзину
            </button>
          </div>
        )}
      </div>
    </div>
    </>
  );
}