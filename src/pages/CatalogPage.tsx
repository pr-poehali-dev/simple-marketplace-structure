import { useState, useMemo } from 'react';
import Icon from '@/components/ui/icon';

const allProducts = [
  { id: 1, name: 'Беспроводные наушники Pro X', price: 12990, category: 'Электроника', rating: 4.8, reviews: 234, badge: 'Хит', image: 'https://cdn.poehali.dev/projects/f68a84c0-111e-450c-bda7-29b9960e5c2f/files/0f4f33ac-a118-4378-8818-50dedf208024.jpg' },
  { id: 2, name: 'Смарт-часы Fusion X2', price: 24990, category: 'Электроника', rating: 4.9, reviews: 412, badge: 'Новинка', image: 'https://cdn.poehali.dev/projects/f68a84c0-111e-450c-bda7-29b9960e5c2f/files/0f4f33ac-a118-4378-8818-50dedf208024.jpg' },
  { id: 3, name: 'Ноутбук Ultra Slim', price: 89990, category: 'Электроника', rating: 4.7, reviews: 98, badge: '', image: 'https://cdn.poehali.dev/projects/f68a84c0-111e-450c-bda7-29b9960e5c2f/files/c7589a27-11a6-4ca3-b33f-6c5bbd583ab5.jpg' },
  { id: 4, name: 'Кроссовки Urban Edge', price: 8490, category: 'Одежда', rating: 4.6, reviews: 189, badge: '-30%', image: 'https://cdn.poehali.dev/projects/f68a84c0-111e-450c-bda7-29b9960e5c2f/files/fc58728b-ad71-4909-9dda-6e174caedda6.jpg' },
  { id: 5, name: 'Куртка Street Style', price: 6990, category: 'Одежда', rating: 4.4, reviews: 67, badge: '', image: 'https://cdn.poehali.dev/projects/f68a84c0-111e-450c-bda7-29b9960e5c2f/files/fc58728b-ad71-4909-9dda-6e174caedda6.jpg' },
  { id: 6, name: 'Сумка Premium leather', price: 4590, category: 'Одежда', rating: 4.5, reviews: 143, badge: 'Скидка', image: 'https://cdn.poehali.dev/projects/f68a84c0-111e-450c-bda7-29b9960e5c2f/files/fc58728b-ad71-4909-9dda-6e174caedda6.jpg' },
  { id: 7, name: 'Подушка Memory Foam', price: 3490, category: 'Для дома', rating: 4.3, reviews: 201, badge: '', image: 'https://cdn.poehali.dev/projects/f68a84c0-111e-450c-bda7-29b9960e5c2f/files/c7589a27-11a6-4ca3-b33f-6c5bbd583ab5.jpg' },
  { id: 8, name: 'Кофемашина Barista Pro', price: 18990, category: 'Для дома', rating: 4.8, reviews: 324, badge: 'Хит', image: 'https://cdn.poehali.dev/projects/f68a84c0-111e-450c-bda7-29b9960e5c2f/files/c7589a27-11a6-4ca3-b33f-6c5bbd583ab5.jpg' },
  { id: 9, name: 'Гантели Premium Set', price: 5990, category: 'Спорт', rating: 4.7, reviews: 88, badge: '', image: 'https://cdn.poehali.dev/projects/f68a84c0-111e-450c-bda7-29b9960e5c2f/files/c7589a27-11a6-4ca3-b33f-6c5bbd583ab5.jpg' },
  { id: 10, name: 'Крем SPF 50+', price: 1290, category: 'Красота', rating: 4.5, reviews: 567, badge: 'Топ', image: 'https://cdn.poehali.dev/projects/f68a84c0-111e-450c-bda7-29b9960e5c2f/files/fc58728b-ad71-4909-9dda-6e174caedda6.jpg' },
  { id: 11, name: 'Геймпад Pro Controller', price: 7490, category: 'Игры', rating: 4.9, reviews: 301, badge: 'Новинка', image: 'https://cdn.poehali.dev/projects/f68a84c0-111e-450c-bda7-29b9960e5c2f/files/0f4f33ac-a118-4378-8818-50dedf208024.jpg' },
  { id: 12, name: 'Планшет Tab S Ultra', price: 54990, category: 'Электроника', rating: 4.8, reviews: 156, badge: '', image: 'https://cdn.poehali.dev/projects/f68a84c0-111e-450c-bda7-29b9960e5c2f/files/0f4f33ac-a118-4378-8818-50dedf208024.jpg' },
];

const categories = ['Все', 'Электроника', 'Одежда', 'Для дома', 'Спорт', 'Красота', 'Игры'];
const sortOptions = [
  { value: 'popular', label: 'По популярности' },
  { value: 'price-asc', label: 'Сначала дешевле' },
  { value: 'price-desc', label: 'Сначала дороже' },
  { value: 'rating', label: 'По рейтингу' },
];

const badgeColors: Record<string, string> = {
  'Хит': '#f72585',
  'Новинка': '#4cc9f0',
  '-30%': '#4361ee',
  'Скидка': '#fb5607',
  'Топ': '#ffbe0b',
};

export default function CatalogPage() {
  const [selectedCategory, setSelectedCategory] = useState('Все');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('popular');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 100000]);
  const [minRating, setMinRating] = useState(0);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const filtered = useMemo(() => {
    let result = [...allProducts];

    if (selectedCategory !== 'Все') {
      result = result.filter(p => p.category === selectedCategory);
    }
    if (searchQuery.trim()) {
      result = result.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()));
    }
    result = result.filter(p => p.price >= priceRange[0] && p.price <= priceRange[1]);
    if (minRating > 0) {
      result = result.filter(p => p.rating >= minRating);
    }

    switch (sortBy) {
      case 'price-asc': result.sort((a, b) => a.price - b.price); break;
      case 'price-desc': result.sort((a, b) => b.price - a.price); break;
      case 'rating': result.sort((a, b) => b.rating - a.rating); break;
      default: result.sort((a, b) => b.reviews - a.reviews);
    }

    return result;
  }, [selectedCategory, searchQuery, sortBy, priceRange, minRating]);

  return (
    <div className="min-h-screen mesh-bg font-golos pt-20">
      <div className="max-w-7xl mx-auto px-4 py-8">

        {/* Header */}
        <div className="mb-8">
          <p className="text-sm font-medium mb-1" style={{ color: '#f72585' }}>Каталог</p>
          <h1 className="text-3xl lg:text-4xl font-display font-black text-white mb-2">
            Все <span className="gradient-text">товары</span>
          </h1>
          <p className="text-white/40">{filtered.length} товаров найдено</p>
        </div>

        {/* Search + controls */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <Icon name="Search" size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" />
            <input
              type="text"
              placeholder="Поиск по названию..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-3 rounded-2xl text-white placeholder-white/30 outline-none transition-all"
              style={{
                background: 'rgba(255,255,255,0.06)',
                border: '1px solid rgba(255,255,255,0.08)',
              }}
            />
            {searchQuery && (
              <button onClick={() => setSearchQuery('')} className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 hover:text-white">
                <Icon name="X" size={16} />
              </button>
            )}
          </div>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-4 py-3 rounded-2xl text-white outline-none cursor-pointer text-sm"
            style={{
              background: 'rgba(255,255,255,0.06)',
              border: '1px solid rgba(255,255,255,0.08)',
            }}
          >
            {sortOptions.map(o => (
              <option key={o.value} value={o.value} style={{ background: '#111127' }}>{o.label}</option>
            ))}
          </select>

          <div className="flex gap-2">
            <button
              onClick={() => setFiltersOpen(!filtersOpen)}
              className="flex items-center gap-2 px-4 py-3 rounded-2xl text-sm font-medium transition-all"
              style={{
                background: filtersOpen ? 'rgba(247,37,133,0.15)' : 'rgba(255,255,255,0.06)',
                border: `1px solid ${filtersOpen ? 'rgba(247,37,133,0.3)' : 'rgba(255,255,255,0.08)'}`,
                color: filtersOpen ? '#f72585' : 'rgba(255,255,255,0.7)'
              }}
            >
              <Icon name="SlidersHorizontal" size={16} />
              Фильтры
            </button>
            <button onClick={() => setViewMode('grid')} className="p-3 rounded-2xl transition-all"
              style={{ background: viewMode === 'grid' ? 'rgba(247,37,133,0.15)' : 'rgba(255,255,255,0.06)', border: `1px solid ${viewMode === 'grid' ? 'rgba(247,37,133,0.3)' : 'rgba(255,255,255,0.08)'}`, color: viewMode === 'grid' ? '#f72585' : 'rgba(255,255,255,0.5)' }}>
              <Icon name="LayoutGrid" size={16} />
            </button>
            <button onClick={() => setViewMode('list')} className="p-3 rounded-2xl transition-all"
              style={{ background: viewMode === 'list' ? 'rgba(247,37,133,0.15)' : 'rgba(255,255,255,0.06)', border: `1px solid ${viewMode === 'list' ? 'rgba(247,37,133,0.3)' : 'rgba(255,255,255,0.08)'}`, color: viewMode === 'list' ? '#f72585' : 'rgba(255,255,255,0.5)' }}>
              <Icon name="List" size={16} />
            </button>
          </div>
        </div>

        {/* Filters panel */}
        {filtersOpen && (
          <div className="mb-6 p-6 rounded-2xl animate-fade-up"
            style={{ background: 'rgba(17,17,39,0.8)', border: '1px solid rgba(255,255,255,0.08)' }}>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="text-white/60 text-sm font-medium mb-3 block">Диапазон цен</label>
                <div className="flex items-center gap-4 mb-3">
                  <span className="text-white font-semibold text-sm">{priceRange[0].toLocaleString()} ₽</span>
                  <span className="text-white/30 text-xs">—</span>
                  <span className="text-white font-semibold text-sm">{priceRange[1].toLocaleString()} ₽</span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={100000}
                  step={1000}
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                  className="w-full"
                />
              </div>
              <div>
                <label className="text-white/60 text-sm font-medium mb-3 block">Минимальный рейтинг</label>
                <div className="flex gap-2">
                  {[0, 3, 4, 4.5].map((r) => (
                    <button
                      key={r}
                      onClick={() => setMinRating(r)}
                      className="flex items-center gap-1 px-3 py-2 rounded-xl text-sm transition-all"
                      style={{
                        background: minRating === r ? 'rgba(255,190,11,0.2)' : 'rgba(255,255,255,0.06)',
                        border: `1px solid ${minRating === r ? 'rgba(255,190,11,0.4)' : 'rgba(255,255,255,0.08)'}`,
                        color: minRating === r ? '#ffbe0b' : 'rgba(255,255,255,0.5)'
                      }}
                    >
                      {r === 0 ? 'Любой' : `★ ${r}+`}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <button
              onClick={() => { setSelectedCategory('Все'); setSearchQuery(''); setPriceRange([0, 100000]); setMinRating(0); }}
              className="mt-4 text-sm text-white/40 hover:text-white/70 transition-colors flex items-center gap-1"
            >
              <Icon name="RotateCcw" size={13} /> Сбросить фильтры
            </button>
          </div>
        )}

        {/* Category tabs */}
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide mb-8">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className="whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 flex-shrink-0"
              style={{
                background: selectedCategory === cat
                  ? 'linear-gradient(135deg, #f72585, #4361ee)'
                  : 'rgba(255,255,255,0.06)',
                color: selectedCategory === cat ? '#fff' : 'rgba(255,255,255,0.55)',
                border: `1px solid ${selectedCategory === cat ? 'transparent' : 'rgba(255,255,255,0.08)'}`,
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Products grid */}
        {filtered.length === 0 ? (
          <div className="text-center py-24">
            <div className="text-5xl mb-4">🔍</div>
            <p className="text-white/50 text-lg">Товары не найдены</p>
            <p className="text-white/30 text-sm mt-2">Попробуйте изменить фильтры</p>
          </div>
        ) : (
          <div className={viewMode === 'grid'
            ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5'
            : 'flex flex-col gap-4'
          }>
            {filtered.map((product) => (
              viewMode === 'grid' ? (
                <div key={product.id} className="group rounded-2xl overflow-hidden card-hover"
                  style={{ background: 'rgba(17,17,39,0.8)', border: '1px solid rgba(255,255,255,0.06)' }}>
                  <div className="relative h-44 overflow-hidden">
                    <img src={product.image} alt={product.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                    <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(17,17,39,0.7), transparent 60%)' }} />
                    {product.badge && (
                      <span className="absolute top-2 left-2 px-2 py-0.5 rounded-full text-xs font-bold text-white"
                        style={{ background: badgeColors[product.badge] || '#f72585' }}>
                        {product.badge}
                      </span>
                    )}
                    <button className="absolute top-2 right-2 w-7 h-7 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                      style={{ background: 'rgba(7,7,15,0.7)' }}>
                      <Icon name="Heart" size={13} className="text-white/70" />
                    </button>
                  </div>
                  <div className="p-4">
                    <p className="text-xs text-white/30 mb-1">{product.category}</p>
                    <h3 className="text-sm font-semibold text-white mb-2 line-clamp-2">{product.name}</h3>
                    <div className="flex items-center gap-1 mb-3 star-rating">
                      <span className="text-xs">{'★'.repeat(Math.floor(product.rating))}</span>
                      <span className="text-white/40 text-xs">({product.reviews})</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-base font-bold text-white">{product.price.toLocaleString()} ₽</span>
                      <button className="btn-gradient px-3 py-1.5 rounded-xl text-xs font-semibold text-white">
                        <span>+ В корзину</span>
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div key={product.id} className="flex gap-4 p-4 rounded-2xl card-hover"
                  style={{ background: 'rgba(17,17,39,0.8)', border: '1px solid rgba(255,255,255,0.06)' }}>
                  <div className="relative w-24 h-24 rounded-xl overflow-hidden flex-shrink-0">
                    <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                    {product.badge && (
                      <span className="absolute top-1 left-1 px-1.5 py-0.5 rounded-full text-xs font-bold text-white"
                        style={{ background: badgeColors[product.badge] || '#f72585', fontSize: '9px' }}>
                        {product.badge}
                      </span>
                    )}
                  </div>
                  <div className="flex-1 flex items-center justify-between">
                    <div>
                      <p className="text-xs text-white/30 mb-0.5">{product.category}</p>
                      <h3 className="text-sm font-semibold text-white mb-1">{product.name}</h3>
                      <div className="flex items-center gap-1 star-rating">
                        <span className="text-xs">{'★'.repeat(Math.floor(product.rating))}</span>
                        <span className="text-white/40 text-xs">({product.reviews})</span>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <span className="text-base font-bold text-white">{product.price.toLocaleString()} ₽</span>
                      <button className="btn-gradient px-4 py-2 rounded-xl text-xs font-semibold text-white">
                        <span>В корзину</span>
                      </button>
                    </div>
                  </div>
                </div>
              )
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
