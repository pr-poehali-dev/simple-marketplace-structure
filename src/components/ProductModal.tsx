import { useEffect } from 'react';
import Icon from '@/components/ui/icon';
import type { Product } from '@/data/products';

interface ProductModalProps {
  product: Product;
  onClose: () => void;
}

export default function ProductModal({ product, onClose }: ProductModalProps) {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [onClose]);

  const discount = product.oldPrice
    ? Math.round((1 - product.price / product.oldPrice) * 100)
    : 0;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(8px)' }}
      onClick={e => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div
        className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl animate-fade-up"
        style={{ background: '#141414', border: '1px solid rgba(139,0,0,0.35)', boxShadow: '0 40px 100px rgba(0,0,0,0.9), 0 0 60px rgba(139,0,0,0.15)' }}
      >
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full flex items-center justify-center transition-all"
          style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}
          onMouseEnter={e => (e.currentTarget.style.borderColor = 'rgba(139,0,0,0.5)')}
          onMouseLeave={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)')}
        >
          <Icon name="X" size={16} style={{ color: 'rgba(235,235,235,0.6)' }} />
        </button>

        <div className="grid md:grid-cols-2">
          {/* Image */}
          <div className="relative" style={{ background: '#0a0a0a', minHeight: '340px' }}>
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
              style={{ minHeight: '340px', maxHeight: '480px' }}
            />
            {/* Top-left overlays */}
            <div className="absolute top-4 left-4 flex flex-col gap-2">
              {product.badge && (
                <span className="px-2.5 py-1 text-xs font-body font-semibold uppercase text-white"
                  style={{ background: '#8b0000', letterSpacing: '0.08em' }}>
                  {product.badge}
                </span>
              )}
              {discount > 0 && (
                <span className="px-2.5 py-1 text-xs font-body font-semibold text-white"
                  style={{ background: 'rgba(139,0,0,0.7)', letterSpacing: '0.06em' }}>
                  −{discount}%
                </span>
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

          {/* Info */}
          <div className="p-6 flex flex-col">
            {/* Category + material */}
            <div className="flex items-center gap-3 mb-3">
              <span className="text-xs font-body uppercase tracking-widest"
                style={{ color: 'rgba(192,57,43,0.8)', letterSpacing: '0.15em' }}>{product.category}</span>
              <span style={{ color: 'rgba(255,255,255,0.15)' }}>·</span>
              <span className="text-xs font-body uppercase tracking-widest"
                style={{ color: 'rgba(192,192,192,0.4)', letterSpacing: '0.12em' }}>{product.material}</span>
            </div>

            {/* Name */}
            <h2 className="font-serif font-semibold text-2xl mb-3 leading-snug" style={{ color: '#e8e0d0' }}>
              {product.name}
            </h2>

            {/* Rating */}
            <div className="flex items-center gap-2 mb-4">
              <span style={{ color: '#8b0000', letterSpacing: '-1px' }}>{'★'.repeat(Math.floor(product.rating))}</span>
              <span className="font-body text-sm font-semibold" style={{ color: '#e8e0d0' }}>{product.rating}</span>
              <span className="font-body text-xs" style={{ color: 'rgba(235,235,235,0.3)' }}>({product.reviews} отзывов)</span>
            </div>

            {/* Description */}
            <p className="font-body text-sm leading-relaxed mb-5"
              style={{ color: 'rgba(235,235,235,0.5)', lineHeight: '1.75' }}>
              {product.description}
            </p>

            {/* Details */}
            <div className="mb-5">
              <p className="text-xs uppercase tracking-widest font-body mb-2"
                style={{ color: 'rgba(235,235,235,0.3)', letterSpacing: '0.15em' }}>Характеристики</p>
              <div className="flex flex-wrap gap-2">
                {product.details.map(d => (
                  <span key={d} className="px-2.5 py-1 text-xs font-body rounded"
                    style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', color: 'rgba(235,235,235,0.55)' }}>
                    {d}
                  </span>
                ))}
              </div>
            </div>

            {/* Price */}
            <div className="mt-auto">
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
                  disabled={!product.inStock}
                  className="flex-1 btn-blood py-3.5 text-xs font-body font-semibold uppercase"
                  style={{ letterSpacing: '0.12em', opacity: product.inStock ? 1 : 0.4, cursor: product.inStock ? 'pointer' : 'not-allowed' }}
                >
                  <span className="flex items-center justify-center gap-2">
                    <Icon name="ShoppingBag" size={14} />
                    {product.inStock ? 'Добавить в корзину' : 'Нет в наличии'}
                  </span>
                </button>
                <button
                  className="w-12 h-12 rounded flex items-center justify-center flex-shrink-0 transition-all"
                  style={{ border: '1px solid rgba(139,0,0,0.35)', background: 'transparent' }}
                  onMouseEnter={e => (e.currentTarget.style.background = 'rgba(139,0,0,0.1)')}
                  onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
                >
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
