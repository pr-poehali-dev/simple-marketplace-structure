import { useEffect, useState } from 'react';
import Icon from '@/components/ui/icon';
import type { Product } from '@/data/products';
import { useCart } from '@/context/CartContext';

interface ProductModalProps {
  product: Product;
  onClose: () => void;
}

function Stars({ rating, size = 14 }: { rating: number; size?: number }) {
  return (
    <span style={{ fontSize: size, letterSpacing: '-1px', lineHeight: 1 }}>
      {[1,2,3,4,5].map(i => (
        <span key={i} style={{ color: i <= Math.round(rating) ? '#8b0000' : 'rgba(139,0,0,0.25)' }}>★</span>
      ))}
    </span>
  );
}

export default function ProductModal({ product, onClose }: ProductModalProps) {
  const { add, items } = useCart();
  const [added, setAdded] = useState(false);
  const [activeTab, setActiveTab] = useState<'info' | 'reviews'>('info');

  const inCart = items.some(i => i.product.id === product.id);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [onClose]);

  const handleAdd = () => {
    add(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const discount = product.oldPrice ? Math.round((1 - product.price / product.oldPrice) * 100) : 0;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: 'rgba(0,0,0,0.88)', backdropFilter: 'blur(8px)' }}
      onClick={e => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div
        className="relative w-full max-w-3xl max-h-[92vh] overflow-y-auto rounded-2xl animate-fade-up"
        style={{ background: '#141414', border: '1px solid rgba(139,0,0,0.35)', boxShadow: '0 40px 100px rgba(0,0,0,0.95), 0 0 60px rgba(139,0,0,0.12)' }}
      >
        {/* Close */}
        <button onClick={onClose}
          className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full flex items-center justify-center transition-all"
          style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}
          onMouseEnter={e => (e.currentTarget.style.borderColor = 'rgba(139,0,0,0.5)')}
          onMouseLeave={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)')}>
          <Icon name="X" size={16} style={{ color: 'rgba(235,235,235,0.6)' }} />
        </button>

        <div className="grid md:grid-cols-2">
          {/* Image */}
          <div className="relative flex items-center justify-center"
            style={{ background: '#0d0d0d', minHeight: '340px' }}>
            <img src={product.image} alt={product.name}
              className="w-full h-full object-cover"
              style={{ minHeight: '340px', maxHeight: '460px' }} />
            <div className="absolute top-4 left-4 flex flex-col gap-2">
              {product.badge && (
                <span className="px-2.5 py-1 text-xs font-body font-semibold uppercase text-white"
                  style={{ background: '#8b0000', letterSpacing: '0.08em' }}>{product.badge}</span>
              )}
              {discount > 0 && (
                <span className="px-2.5 py-1 text-xs font-body font-semibold text-white"
                  style={{ background: 'rgba(139,0,0,0.7)' }}>−{discount}%</span>
              )}
            </div>
            {!product.inStock && (
              <div className="absolute inset-0 flex items-center justify-center"
                style={{ background: 'rgba(0,0,0,0.65)' }}>
                <span className="px-4 py-2 text-sm font-body uppercase tracking-widest"
                  style={{ border: '1px solid rgba(255,255,255,0.2)', color: 'rgba(235,235,235,0.6)', letterSpacing: '0.15em' }}>
                  Нет в наличии
                </span>
              </div>
            )}
          </div>

          {/* Info panel */}
          <div className="p-6 flex flex-col">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-body uppercase tracking-widest"
                style={{ color: 'rgba(192,57,43,0.8)', letterSpacing: '0.15em' }}>{product.category}</span>
              <span style={{ color: 'rgba(255,255,255,0.15)' }}>·</span>
              <span className="text-xs font-body uppercase"
                style={{ color: 'rgba(192,192,192,0.4)', letterSpacing: '0.1em' }}>{product.material}</span>
            </div>

            <h2 className="font-serif font-semibold text-2xl mb-2 leading-snug" style={{ color: '#e8e0d0' }}>
              {product.name}
            </h2>

            <div className="flex items-center gap-2 mb-4">
              <Stars rating={product.rating} />
              <span className="font-body text-xs font-semibold" style={{ color: '#e8e0d0' }}>{product.rating}</span>
              <span className="font-body text-xs" style={{ color: 'rgba(235,235,235,0.3)' }}>({product.reviews})</span>
            </div>

            {/* Tabs */}
            <div className="flex gap-0 mb-4" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
              {(['info', 'reviews'] as const).map(tab => (
                <button key={tab} onClick={() => setActiveTab(tab)}
                  className="px-4 pb-3 text-xs font-body uppercase tracking-widest relative transition-colors"
                  style={{
                    color: activeTab === tab ? '#c0392b' : 'rgba(235,235,235,0.35)',
                    letterSpacing: '0.12em',
                  }}>
                  {tab === 'info' ? 'Описание' : `Отзывы (${product.reviewsList.length})`}
                  {activeTab === tab && (
                    <span className="absolute bottom-0 left-0 right-0 h-px" style={{ background: '#c0392b' }} />
                  )}
                </button>
              ))}
            </div>

            {/* Tab content */}
            <div className="flex-1 overflow-y-auto mb-5" style={{ maxHeight: '220px' }}>
              {activeTab === 'info' ? (
                <div>
                  <p className="font-body text-sm leading-relaxed mb-4"
                    style={{ color: 'rgba(235,235,235,0.5)', lineHeight: '1.75' }}>
                    {product.description}
                  </p>
                  <p className="text-xs uppercase tracking-widest font-body mb-2"
                    style={{ color: 'rgba(235,235,235,0.25)', letterSpacing: '0.15em' }}>Характеристики</p>
                  <div className="flex flex-wrap gap-2">
                    {product.details.map(d => (
                      <span key={d} className="px-2.5 py-1 text-xs font-body rounded"
                        style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)', color: 'rgba(235,235,235,0.55)' }}>
                        {d}
                      </span>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="space-y-3">
                  {product.reviewsList.length === 0 ? (
                    <p className="text-xs font-body" style={{ color: 'rgba(235,235,235,0.3)' }}>Пока нет отзывов</p>
                  ) : (
                    product.reviewsList.map(r => (
                      <div key={r.id} className="p-3 rounded-xl"
                        style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="font-body text-sm font-semibold" style={{ color: '#e8e0d0' }}>{r.author}</span>
                          <span className="font-body text-xs" style={{ color: 'rgba(235,235,235,0.25)' }}>{r.date}</span>
                        </div>
                        <Stars rating={r.rating} size={12} />
                        <p className="font-body text-xs mt-2 leading-relaxed"
                          style={{ color: 'rgba(235,235,235,0.5)', lineHeight: '1.65' }}>{r.text}</p>
                      </div>
                    ))
                  )}
                </div>
              )}
            </div>

            {/* Price + CTA */}
            <div>
              <div className="flex items-baseline gap-3 mb-4">
                <span className="font-serif text-3xl font-semibold" style={{ color: '#e8e0d0' }}>
                  {product.price.toLocaleString()} ₽
                </span>
                {product.oldPrice && (
                  <span className="font-body text-base line-through" style={{ color: 'rgba(235,235,235,0.25)' }}>
                    {product.oldPrice.toLocaleString()} ₽
                  </span>
                )}
              </div>
              <div className="flex gap-3">
                <button
                  onClick={handleAdd}
                  disabled={!product.inStock}
                  className="flex-1 py-3.5 text-xs font-body font-semibold uppercase transition-all"
                  style={{
                    letterSpacing: '0.12em',
                    opacity: product.inStock ? 1 : 0.4,
                    cursor: product.inStock ? 'pointer' : 'not-allowed',
                    background: added ? 'rgba(139,0,0,0.3)' : 'linear-gradient(135deg, #8b0000, #c0392b)',
                    border: added ? '1px solid rgba(139,0,0,0.6)' : 'none',
                    color: '#fff',
                    borderRadius: '4px',
                    boxShadow: added ? 'none' : '0 0 12px rgba(192,57,43,0.35)',
                  }}>
                  <span className="flex items-center justify-center gap-2">
                    <Icon name={added ? 'Check' : inCart ? 'ShoppingBag' : 'ShoppingBag'} size={14} />
                    {added ? 'Добавлено!' : inCart ? 'Ещё в корзину' : 'В корзину'}
                  </span>
                </button>
                <button
                  className="w-12 h-12 rounded flex items-center justify-center flex-shrink-0 transition-all"
                  style={{ border: '1px solid rgba(139,0,0,0.35)', background: 'transparent' }}
                  onMouseEnter={e => (e.currentTarget.style.background = 'rgba(139,0,0,0.1)')}
                  onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}>
                  <Icon name="Heart" size={16} style={{ color: '#c0392b' }} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
