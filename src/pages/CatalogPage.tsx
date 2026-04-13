import { useState, useMemo } from 'react';
import Icon from '@/components/ui/icon';
import { allProducts, type Product } from '@/data/products';
import ProductModal from '@/components/ProductModal';
import { useCart } from '@/context/CartContext';

const categories = ['Все', 'Кольца', 'Чокеры', 'Серьги', 'Браслеты', 'Броши', 'Декор'];
const sortOptions = [
  { value: 'popular',    label: 'По популярности' },
  { value: 'price-asc',  label: 'Сначала дешевле' },
  { value: 'price-desc', label: 'Сначала дороже' },
  { value: 'rating',     label: 'По рейтингу' },
];

export default function CatalogPage() {
  const [category, setCategory]       = useState('Все');
  const [search, setSearch]           = useState('');
  const [sort, setSort]               = useState('popular');
  const [maxPrice, setMaxPrice]       = useState(10000);
  const [minRating, setMinRating]     = useState(0);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [view, setView]               = useState<'grid' | 'list'>('grid');
  const [selected, setSelected]       = useState<Product | null>(null);
  const { add } = useCart();

  const filtered = useMemo(() => {
    let r = [...allProducts];
    if (category !== 'Все') r = r.filter(p => p.category === category);
    if (search.trim()) r = r.filter(p => p.name.toLowerCase().includes(search.toLowerCase()));
    r = r.filter(p => p.price <= maxPrice);
    if (minRating > 0) r = r.filter(p => p.rating >= minRating);
    switch (sort) {
      case 'price-asc':  r.sort((a, b) => a.price - b.price); break;
      case 'price-desc': r.sort((a, b) => b.price - a.price); break;
      case 'rating':     r.sort((a, b) => b.rating - a.rating); break;
      default:           r.sort((a, b) => b.reviews - a.reviews);
    }
    return r;
  }, [category, search, sort, maxPrice, minRating]);

  return (
    <div className="min-h-screen dark-bg font-body pt-20">
      {selected && <ProductModal product={selected} onClose={() => setSelected(null)} />}

      <div className="max-w-7xl mx-auto px-4 py-10">

        {/* Header */}
        <div className="mb-10">
          <p className="text-xs uppercase tracking-widest mb-2 ornament font-body"
            style={{ color: '#c0392b', letterSpacing: '0.2em' }}>каталог</p>
          <h1 className="font-gothic text-4xl lg:text-5xl mb-1" style={{ color: '#e8e0d0' }}>Украшения</h1>
          <p className="text-xs font-body" style={{ color: 'rgba(235,235,235,0.3)' }}>{filtered.length} товаров найдено</p>
        </div>

        {/* Search + controls */}
        <div className="flex flex-col md:flex-row gap-3 mb-5">
          <div className="flex-1 relative">
            <Icon name="Search" size={16} className="absolute left-4 top-1/2 -translate-y-1/2"
              style={{ color: 'rgba(235,235,235,0.25)' }} />
            <input type="text" value={search} onChange={e => setSearch(e.target.value)}
              placeholder="Поиск по названию..."
              className="w-full pl-10 pr-4 py-3 rounded text-sm outline-none font-body"
              style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', color: '#ebebeb' }} />
            {search && (
              <button onClick={() => setSearch('')} className="absolute right-4 top-1/2 -translate-y-1/2"
                style={{ color: 'rgba(255,255,255,0.3)' }}>
                <Icon name="X" size={14} />
              </button>
            )}
          </div>

          <select value={sort} onChange={e => setSort(e.target.value)}
            className="px-4 py-3 rounded text-xs outline-none cursor-pointer font-body uppercase"
            style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', color: 'rgba(235,235,235,0.6)', letterSpacing: '0.08em' }}>
            {sortOptions.map(o => (
              <option key={o.value} value={o.value} style={{ background: '#141414' }}>{o.label}</option>
            ))}
          </select>

          <div className="flex gap-2">
            <button onClick={() => setFiltersOpen(!filtersOpen)}
              className="flex items-center gap-2 px-4 py-3 rounded text-xs font-body uppercase transition-all"
              style={{
                background: filtersOpen ? 'rgba(139,0,0,0.15)' : 'rgba(255,255,255,0.04)',
                border: `1px solid ${filtersOpen ? 'rgba(139,0,0,0.45)' : 'rgba(255,255,255,0.08)'}`,
                color: filtersOpen ? '#c0392b' : 'rgba(235,235,235,0.5)',
                letterSpacing: '0.1em',
              }}>
              <Icon name="SlidersHorizontal" size={14} /> Фильтры
            </button>
            {(['grid', 'list'] as const).map(v => (
              <button key={v} onClick={() => setView(v)}
                className="p-3 rounded transition-all"
                style={{
                  background: view === v ? 'rgba(139,0,0,0.15)' : 'rgba(255,255,255,0.04)',
                  border: `1px solid ${view === v ? 'rgba(139,0,0,0.45)' : 'rgba(255,255,255,0.08)'}`,
                  color: view === v ? '#c0392b' : 'rgba(235,235,235,0.4)',
                }}>
                <Icon name={v === 'grid' ? 'LayoutGrid' : 'List'} size={14} />
              </button>
            ))}
          </div>
        </div>

        {/* Filters */}
        {filtersOpen && (
          <div className="mb-6 p-6 rounded-xl animate-fade-up"
            style={{ background: '#141414', border: '1px solid rgba(139,0,0,0.25)' }}>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <label className="text-xs uppercase tracking-widest font-body mb-3 block"
                  style={{ color: 'rgba(235,235,235,0.4)', letterSpacing: '0.15em' }}>
                  Макс. цена: <span style={{ color: '#c0392b' }}>{maxPrice.toLocaleString()} ₽</span>
                </label>
                <input type="range" min={500} max={10000} step={100} value={maxPrice}
                  onChange={e => setMaxPrice(Number(e.target.value))} className="w-full" />
              </div>
              <div>
                <label className="text-xs uppercase tracking-widest font-body mb-3 block"
                  style={{ color: 'rgba(235,235,235,0.4)', letterSpacing: '0.15em' }}>Минимальный рейтинг</label>
                <div className="flex gap-2">
                  {[0, 4, 4.5, 5].map(r => (
                    <button key={r} onClick={() => setMinRating(r)}
                      className="px-3 py-2 rounded text-xs font-body uppercase transition-all"
                      style={{
                        background: minRating === r ? 'rgba(139,0,0,0.2)' : 'rgba(255,255,255,0.04)',
                        border: `1px solid ${minRating === r ? 'rgba(139,0,0,0.5)' : 'rgba(255,255,255,0.08)'}`,
                        color: minRating === r ? '#c0392b' : 'rgba(235,235,235,0.45)',
                        letterSpacing: '0.08em',
                      }}>
                      {r === 0 ? 'Любой' : `★ ${r}+`}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <button onClick={() => { setCategory('Все'); setSearch(''); setMaxPrice(10000); setMinRating(0); }}
              className="mt-5 text-xs font-body uppercase tracking-widest flex items-center gap-1.5 transition-colors"
              style={{ color: 'rgba(235,235,235,0.3)', letterSpacing: '0.12em' }}
              onMouseEnter={e => (e.currentTarget.style.color = '#c0392b')}
              onMouseLeave={e => (e.currentTarget.style.color = 'rgba(235,235,235,0.3)')}>
              <Icon name="RotateCcw" size={12} /> Сбросить фильтры
            </button>
          </div>
        )}

        {/* Category tabs */}
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide mb-8">
          {categories.map(cat => (
            <button key={cat} onClick={() => setCategory(cat)}
              className="whitespace-nowrap px-5 py-2 rounded text-xs font-body uppercase tracking-wider flex-shrink-0 transition-all"
              style={{
                background: category === cat ? '#8b0000' : 'rgba(255,255,255,0.04)',
                color: category === cat ? '#fff' : 'rgba(235,235,235,0.45)',
                border: `1px solid ${category === cat ? '#8b0000' : 'rgba(255,255,255,0.07)'}`,
                letterSpacing: '0.12em',
                boxShadow: category === cat ? '0 0 12px rgba(139,0,0,0.35)' : 'none',
              }}>
              {cat}
            </button>
          ))}
        </div>

        {/* Products */}
        {filtered.length === 0 ? (
          <div className="text-center py-28">
            <div className="text-5xl mb-5">🕯️</div>
            <p className="font-serif text-2xl" style={{ color: 'rgba(235,235,235,0.4)' }}>Тьма поглотила результаты...</p>
            <p className="text-xs font-body uppercase tracking-widest mt-3"
              style={{ color: 'rgba(235,235,235,0.2)', letterSpacing: '0.15em' }}>Измените фильтры</p>
          </div>
        ) : view === 'grid' ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {filtered.map(p => (
              <div key={p.id}
                className="group card-dark rounded-xl overflow-hidden cursor-pointer"
                onClick={() => setSelected(p)}>
                {/* Image */}
                <div className="relative overflow-hidden" style={{ background: '#0a0a0a', height: '200px' }}>
                  <img src={p.image} alt={p.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-108"
                    style={{ objectFit: 'cover' }} />
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center"
                    style={{ background: 'rgba(0,0,0,0.45)' }}>
                    <span className="text-xs font-body uppercase tracking-widest px-4 py-2 rounded"
                      style={{ border: '1px solid rgba(192,57,43,0.6)', color: '#c0392b', letterSpacing: '0.15em', background: 'rgba(0,0,0,0.5)' }}>
                      Открыть
                    </span>
                  </div>
                  {p.badge && (
                    <span className="absolute top-2 left-2 px-2 py-0.5 text-white text-xs font-body font-semibold uppercase"
                      style={{ background: '#8b0000', letterSpacing: '0.06em' }}>{p.badge}</span>
                  )}
                  {!p.inStock && (
                    <div className="absolute inset-0 flex items-end pb-2 justify-center"
                      style={{ background: 'rgba(0,0,0,0.45)' }}>
                      <span className="text-xs font-body" style={{ color: 'rgba(235,235,235,0.4)' }}>Нет в наличии</span>
                    </div>
                  )}
                </div>
                {/* Info */}
                <div className="p-4">
                  <p className="text-xs font-body uppercase tracking-wider mb-1"
                    style={{ color: 'rgba(192,192,192,0.35)', letterSpacing: '0.1em' }}>{p.material}</p>
                  <h3 className="font-serif font-semibold text-sm mb-2 line-clamp-2" style={{ color: '#e8e0d0' }}>{p.name}</h3>
                  <div className="flex items-center gap-1 mb-3">
                    <span className="text-xs" style={{ color: '#8b0000' }}>{'★'.repeat(Math.floor(p.rating))}</span>
                    <span className="text-xs font-body" style={{ color: 'rgba(235,235,235,0.25)' }}>({p.reviews})</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="font-serif text-base font-semibold" style={{ color: '#e8e0d0' }}>{p.price.toLocaleString()} ₽</span>
                      {p.oldPrice && (
                        <span className="block text-xs font-body line-through" style={{ color: 'rgba(235,235,235,0.22)' }}>
                          {p.oldPrice.toLocaleString()} ₽
                        </span>
                      )}
                    </div>
                    <div className="flex gap-1.5">
                      <button
                        onClick={e => { e.stopPropagation(); if (p.inStock) add(p); }}
                        disabled={!p.inStock}
                        className="btn-blood p-1.5 text-xs font-body font-semibold"
                        style={{ opacity: p.inStock ? 1 : 0.4 }}
                        title="В корзину">
                        <span><Icon name="ShoppingBag" size={13} /></span>
                      </button>
                      <button
                        onClick={e => { e.stopPropagation(); setSelected(p); }}
                        className="px-3 py-1.5 text-xs font-body font-semibold uppercase rounded transition-all"
                        style={{ border: '1px solid rgba(139,0,0,0.4)', color: '#c0392b', letterSpacing: '0.06em', background: 'transparent' }}
                        onMouseEnter={e => (e.currentTarget.style.background = 'rgba(139,0,0,0.1)')}
                        onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}>
                        Открыть
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {filtered.map(p => (
              <div key={p.id}
                className="group card-dark rounded-xl flex gap-4 p-4 cursor-pointer"
                onClick={() => setSelected(p)}>
                <div className="relative w-24 h-24 rounded-lg overflow-hidden flex-shrink-0"
                  style={{ background: '#0a0a0a' }}>
                  <img src={p.image} alt={p.name} className="w-full h-full object-cover" />
                  {p.badge && (
                    <span className="absolute top-1 left-1 px-1.5 py-0.5 text-white font-body font-semibold uppercase"
                      style={{ background: '#8b0000', fontSize: '9px', letterSpacing: '0.06em' }}>{p.badge}</span>
                  )}
                </div>
                <div className="flex-1 flex items-center justify-between">
                  <div>
                    <p className="text-xs font-body uppercase tracking-wider mb-0.5"
                      style={{ color: 'rgba(192,192,192,0.35)', letterSpacing: '0.1em' }}>{p.material}</p>
                    <h3 className="font-serif font-semibold text-base mb-1" style={{ color: '#e8e0d0' }}>{p.name}</h3>
                    <div className="flex items-center gap-1">
                      <span className="text-xs" style={{ color: '#8b0000' }}>{'★'.repeat(Math.floor(p.rating))}</span>
                      <span className="text-xs font-body" style={{ color: 'rgba(235,235,235,0.25)' }}>({p.reviews})</span>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <span className="font-serif text-lg font-semibold" style={{ color: '#e8e0d0' }}>{p.price.toLocaleString()} ₽</span>
                    <div className="flex gap-2">
                      <button
                        onClick={e => { e.stopPropagation(); if (p.inStock) add(p); }}
                        disabled={!p.inStock}
                        className="btn-blood px-3 py-2 text-xs font-body font-semibold"
                        style={{ opacity: p.inStock ? 1 : 0.4 }}>
                        <span><Icon name="ShoppingBag" size={13} /></span>
                      </button>
                      <button
                        onClick={e => { e.stopPropagation(); setSelected(p); }}
                        className="px-3 py-2 text-xs font-body font-semibold uppercase rounded transition-all"
                        style={{ border: '1px solid rgba(139,0,0,0.4)', color: '#c0392b', letterSpacing: '0.06em', background: 'transparent' }}
                        onMouseEnter={e => (e.currentTarget.style.background = 'rgba(139,0,0,0.1)')}
                        onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}>
                        Открыть
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}