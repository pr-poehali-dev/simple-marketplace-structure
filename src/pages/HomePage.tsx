import Icon from '@/components/ui/icon';

interface HomePageProps {
  onNavigate: (page: string) => void;
}

const categories = [
  { icon: '💻', label: 'Электроника', count: 1240, color: '#4361ee' },
  { icon: '👗', label: 'Одежда', count: 3850, color: '#f72585' },
  { icon: '🏠', label: 'Для дома', count: 2100, color: '#4cc9f0' },
  { icon: '⚽', label: 'Спорт', count: 890, color: '#ffbe0b' },
  { icon: '💄', label: 'Красота', count: 1560, color: '#fb5607' },
  { icon: '🎮', label: 'Игры', count: 670, color: '#7209b7' },
];

const featured = [
  {
    id: 1,
    name: 'Беспроводные наушники Pro',
    price: '12 990 ₽',
    oldPrice: '18 000 ₽',
    rating: 4.8,
    reviews: 234,
    badge: 'Хит',
    badgeColor: '#f72585',
    image: 'https://cdn.poehali.dev/projects/f68a84c0-111e-450c-bda7-29b9960e5c2f/files/0f4f33ac-a118-4378-8818-50dedf208024.jpg',
    category: 'Электроника',
  },
  {
    id: 2,
    name: 'Кроссовки Urban Edge',
    price: '8 490 ₽',
    oldPrice: '12 000 ₽',
    rating: 4.6,
    reviews: 189,
    badge: '-30%',
    badgeColor: '#4361ee',
    image: 'https://cdn.poehali.dev/projects/f68a84c0-111e-450c-bda7-29b9960e5c2f/files/fc58728b-ad71-4909-9dda-6e174caedda6.jpg',
    category: 'Одежда',
  },
  {
    id: 3,
    name: 'Смарт-часы Fusion X',
    price: '24 990 ₽',
    oldPrice: '31 000 ₽',
    rating: 4.9,
    reviews: 412,
    badge: 'Новинка',
    badgeColor: '#4cc9f0',
    image: 'https://cdn.poehali.dev/projects/f68a84c0-111e-450c-bda7-29b9960e5c2f/files/0f4f33ac-a118-4378-8818-50dedf208024.jpg',
    category: 'Электроника',
  },
];

const stats = [
  { value: '50К+', label: 'Товаров', icon: 'Package' },
  { value: '120К+', label: 'Покупателей', icon: 'Users' },
  { value: '4.9', label: 'Рейтинг', icon: 'Star' },
  { value: '24/7', label: 'Поддержка', icon: 'Headphones' },
];

export default function HomePage({ onNavigate }: HomePageProps) {
  return (
    <div className="min-h-screen mesh-bg font-golos">

      {/* Hero */}
      <section className="relative pt-28 pb-20 px-4 overflow-hidden">
        {/* Decorative orbs */}
        <div className="absolute top-20 left-10 w-72 h-72 rounded-full blur-3xl opacity-20 animate-pulse-glow"
          style={{ background: 'radial-gradient(circle, #f72585, transparent)' }} />
        <div className="absolute top-40 right-10 w-96 h-96 rounded-full blur-3xl opacity-15 animate-pulse-glow"
          style={{ background: 'radial-gradient(circle, #4361ee, transparent)', animationDelay: '1.5s' }} />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-40 blur-3xl opacity-10"
          style={{ background: 'radial-gradient(ellipse, #4cc9f0, transparent)' }} />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Text */}
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 animate-fade-up"
                style={{ background: 'rgba(247,37,133,0.12)', border: '1px solid rgba(247,37,133,0.25)' }}>
                <span className="w-2 h-2 rounded-full bg-neon-pink animate-pulse" />
                <span className="text-sm font-medium" style={{ color: '#f72585' }}>Лучшие цены сезона</span>
              </div>

              <h1 className="text-5xl lg:text-6xl xl:text-7xl font-display font-black text-white leading-tight mb-6 animate-fade-up-delay-1">
                Найди всё,<br />
                <span className="gradient-text">что нужно</span>
              </h1>

              <p className="text-lg text-white/60 mb-8 leading-relaxed max-w-md animate-fade-up-delay-2">
                Тысячи товаров от проверенных продавцов. Быстрая доставка, гарантия качества и лучшие цены.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 animate-fade-up-delay-3">
                <button
                  onClick={() => onNavigate('catalog')}
                  className="btn-gradient px-8 py-4 rounded-2xl font-semibold text-white text-base glow-pink"
                >
                  <span>Перейти в каталог</span>
                </button>
                <button
                  onClick={() => onNavigate('contacts')}
                  className="px-8 py-4 rounded-2xl font-semibold text-white/80 text-base transition-all duration-200 hover:text-white hover:bg-white/5"
                  style={{ border: '1px solid rgba(255,255,255,0.15)' }}
                >
                  Связаться с нами
                </button>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mt-8 animate-fade-up-delay-4">
                {['Бесплатная доставка', 'Возврат 30 дней', 'Гарантия качества'].map((tag) => (
                  <span key={tag} className="px-3 py-1.5 rounded-full text-xs font-medium text-white/50"
                    style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}>
                    ✓ {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Image */}
            <div className="relative animate-fade-up-delay-2">
              <div className="relative rounded-3xl overflow-hidden animate-float"
                style={{ boxShadow: '0 30px 80px rgba(247,37,133,0.25), 0 0 0 1px rgba(255,255,255,0.05)' }}>
                <img
                  src="https://cdn.poehali.dev/projects/f68a84c0-111e-450c-bda7-29b9960e5c2f/files/c7589a27-11a6-4ca3-b33f-6c5bbd583ab5.jpg"
                  alt="Маркетплейс"
                  className="w-full h-80 lg:h-96 object-cover"
                />
                <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(7,7,15,0.4), transparent)' }} />
              </div>

              {/* Floating card */}
              <div className="absolute -bottom-4 -left-6 p-4 rounded-2xl animate-float-delay"
                style={{
                  background: 'rgba(17,17,39,0.9)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  backdropFilter: 'blur(20px)',
                  boxShadow: '0 20px 40px rgba(0,0,0,0.4)'
                }}>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl"
                    style={{ background: 'rgba(247,37,133,0.2)' }}>🎯</div>
                  <div>
                    <div className="text-white font-bold text-sm">Заказ доставлен!</div>
                    <div className="text-white/40 text-xs">2 минуты назад</div>
                  </div>
                </div>
              </div>

              <div className="absolute -top-4 -right-4 p-3 rounded-2xl"
                style={{
                  background: 'rgba(17,17,39,0.9)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  backdropFilter: 'blur(20px)',
                  boxShadow: '0 20px 40px rgba(0,0,0,0.4)'
                }}>
                <div className="text-white font-bold text-lg">50К+</div>
                <div className="text-white/40 text-xs">товаров</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 px-4" style={{ borderTop: '1px solid rgba(255,255,255,0.04)', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center p-6 rounded-2xl transition-all duration-300 hover:bg-white/5"
              style={{ border: '1px solid rgba(255,255,255,0.04)' }}>
              <div className="text-3xl font-display font-black gradient-text mb-1">{stat.value}</div>
              <div className="text-white/50 text-sm">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Categories */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-end justify-between mb-10">
            <div>
              <p className="text-sm font-medium mb-2" style={{ color: '#f72585' }}>Разделы</p>
              <h2 className="text-3xl lg:text-4xl font-display font-bold text-white">
                Категории <span className="gradient-text">товаров</span>
              </h2>
            </div>
            <button onClick={() => onNavigate('catalog')} className="hidden md:flex items-center gap-2 text-sm text-white/50 hover:text-white transition-colors">
              Все категории <Icon name="ArrowRight" size={16} />
            </button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((cat) => (
              <button
                key={cat.label}
                onClick={() => onNavigate('catalog')}
                className="group p-5 rounded-2xl text-center transition-all duration-300 hover:scale-105 card-hover"
                style={{
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.07)'
                }}
              >
                <div className="text-3xl mb-3 group-hover:scale-110 transition-transform duration-300">{cat.icon}</div>
                <div className="text-white font-semibold text-sm mb-1">{cat.label}</div>
                <div className="text-xs" style={{ color: cat.color }}>{cat.count.toLocaleString()} товаров</div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured products */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-end justify-between mb-10">
            <div>
              <p className="text-sm font-medium mb-2" style={{ color: '#4cc9f0' }}>Подборка</p>
              <h2 className="text-3xl lg:text-4xl font-display font-bold text-white">
                Популярные <span className="gradient-text">товары</span>
              </h2>
            </div>
            <button onClick={() => onNavigate('catalog')} className="hidden md:flex items-center gap-2 text-sm text-white/50 hover:text-white transition-colors">
              Смотреть все <Icon name="ArrowRight" size={16} />
            </button>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {featured.map((product) => (
              <div key={product.id} className="group rounded-3xl overflow-hidden card-hover"
                style={{
                  background: 'rgba(17,17,39,0.8)',
                  border: '1px solid rgba(255,255,255,0.06)'
                }}>
                <div className="relative h-52 overflow-hidden">
                  <img src={product.image} alt={product.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                  <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(17,17,39,0.8), transparent 60%)' }} />
                  <span className="absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-bold text-white"
                    style={{ background: product.badgeColor }}>
                    {product.badge}
                  </span>
                  <button className="absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center transition-all opacity-0 group-hover:opacity-100"
                    style={{ background: 'rgba(7,7,15,0.7)', backdropFilter: 'blur(10px)' }}>
                    <Icon name="Heart" size={15} className="text-white/70" />
                  </button>
                </div>

                <div className="p-5">
                  <p className="text-xs text-white/40 mb-1">{product.category}</p>
                  <h3 className="font-semibold text-white mb-3 text-base">{product.name}</h3>
                  <div className="flex items-center gap-1 mb-4 star-rating">
                    {'★★★★★'.split('').slice(0, Math.floor(product.rating)).map((_, i) => (
                      <span key={i} className="text-sm">★</span>
                    ))}
                    <span className="text-white/50 text-xs ml-1">({product.reviews})</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-lg font-bold text-white">{product.price}</div>
                      <div className="text-sm line-through text-white/30">{product.oldPrice}</div>
                    </div>
                    <button className="btn-gradient px-4 py-2 rounded-xl text-sm font-semibold text-white">
                      <span>В корзину</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Banner */}
      <section className="py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="relative rounded-3xl overflow-hidden p-8 md:p-16 text-center"
            style={{ background: 'linear-gradient(135deg, rgba(247,37,133,0.15), rgba(67,97,238,0.15))', border: '1px solid rgba(255,255,255,0.08)' }}>
            <div className="absolute inset-0 opacity-30"
              style={{ backgroundImage: 'radial-gradient(circle at 30% 50%, rgba(247,37,133,0.3), transparent 50%), radial-gradient(circle at 70% 50%, rgba(67,97,238,0.3), transparent 50%)' }} />
            <div className="relative z-10">
              <h2 className="text-3xl md:text-5xl font-display font-black text-white mb-4">
                Скидки до <span className="gradient-text-warm">50%</span>
              </h2>
              <p className="text-white/60 text-lg mb-8">На тысячи товаров только сейчас</p>
              <button onClick={() => onNavigate('catalog')} className="btn-gradient px-10 py-4 rounded-2xl font-bold text-white text-lg glow-pink">
                <span>Смотреть акции</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 mt-8" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg btn-gradient flex items-center justify-center">
              <span className="relative z-10 text-white font-display font-bold text-xs">М</span>
            </div>
            <span className="font-display font-bold text-white">МАРКЕТ</span>
          </div>
          <p className="text-white/30 text-sm">© 2024 Маркет. Все права защищены.</p>
          <div className="flex gap-4 text-white/30 text-sm">
            <button onClick={() => onNavigate('catalog')} className="hover:text-white/60 transition-colors">Каталог</button>
            <button onClick={() => onNavigate('contacts')} className="hover:text-white/60 transition-colors">Контакты</button>
          </div>
        </div>
      </footer>
    </div>
  );
}
