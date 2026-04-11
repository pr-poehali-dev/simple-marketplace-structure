import Icon from '@/components/ui/icon';

interface HomePageProps {
  onNavigate: (page: string) => void;
}

const categories = [
  { icon: '💀', label: 'Кольца', count: 214 },
  { icon: '🖤', label: 'Ожерелья', count: 187 },
  { icon: '🩸', label: 'Серьги', count: 143 },
  { icon: '⛓️', label: 'Браслеты', count: 98 },
  { icon: '🦇', label: 'Броши', count: 67 },
  { icon: '🕯️', label: 'Декор', count: 52 },
];

const featured = [
  {
    id: 1,
    name: 'Кольцо "Череп Барона"',
    price: '4 290 ₽',
    oldPrice: '5 800 ₽',
    rating: 4.9,
    reviews: 87,
    badge: 'Хит',
    image: 'https://cdn.poehali.dev/projects/f68a84c0-111e-450c-bda7-29b9960e5c2f/files/6c40d878-7ddd-4d56-a03f-72cc4f6ff142.jpg',
    material: 'Серебро 925',
  },
  {
    id: 2,
    name: 'Колье "Кровавая Луна"',
    price: '6 890 ₽',
    oldPrice: '9 000 ₽',
    rating: 4.8,
    reviews: 64,
    badge: 'Новинка',
    image: 'https://cdn.poehali.dev/projects/f68a84c0-111e-450c-bda7-29b9960e5c2f/files/33fcaa4a-af0e-4ce0-8667-b49a12f6c4c1.jpg',
    material: 'Чёрное золото',
  },
  {
    id: 3,
    name: 'Серьги "Вороново крыло"',
    price: '3 490 ₽',
    oldPrice: '4 200 ₽',
    rating: 4.7,
    reviews: 41,
    badge: '-20%',
    image: 'https://cdn.poehali.dev/projects/f68a84c0-111e-450c-bda7-29b9960e5c2f/files/33fcaa4a-af0e-4ce0-8667-b49a12f6c4c1.jpg',
    material: 'Оксидированное серебро',
  },
];

const features = [
  { icon: 'Shield', title: 'Гарантия подлинности', desc: 'Только сертифицированные материалы' },
  { icon: 'Truck', title: 'Доставка по России', desc: 'Бережная упаковка каждого заказа' },
  { icon: 'RefreshCw', title: 'Возврат 30 дней', desc: 'Без вопросов, если не понравится' },
  { icon: 'Gem', title: 'Ручная работа', desc: 'Каждое украшение уникально' },
];

export default function HomePage({ onNavigate }: HomePageProps) {
  return (
    <div className="min-h-screen dark-bg font-body">

      {/* HERO */}
      <section className="relative pt-16 overflow-hidden" style={{ minHeight: '100vh' }}>
        <div className="absolute top-0 left-0 right-0 h-px"
          style={{ background: 'linear-gradient(90deg, transparent 0%, #8b0000 30%, #c0392b 50%, #8b0000 70%, transparent 100%)' }} />
        <div className="absolute top-32 left-16 w-64 h-64 rounded-full blur-3xl pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(139,0,0,0.18), transparent)' }} />
        <div className="absolute bottom-20 right-10 w-96 h-96 rounded-full blur-3xl pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(100,0,0,0.12), transparent)' }} />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center" style={{ minHeight: 'calc(100vh - 4rem)' }}>

            {/* Text */}
            <div className="py-16">
              <p className="text-xs uppercase tracking-widest mb-4 animate-fade-up font-body"
                style={{ color: '#c0392b', letterSpacing: '0.25em' }}>
                ✦ Готические украшения и аксессуары ✦
              </p>
              <h1 className="font-gothic mb-4 animate-fade-up-1 leading-none"
                style={{ fontSize: 'clamp(3rem, 7vw, 5.5rem)', color: '#e8e0d0' }}>
                Darkware
              </h1>
              <p className="font-serif italic mb-6 animate-fade-up-1"
                style={{ color: '#c0392b', fontSize: '1.25rem' }}>
                "Носи тьму с гордостью"
              </p>
              <p className="text-sm leading-relaxed mb-10 animate-fade-up-2 max-w-md font-body"
                style={{ color: 'rgba(235,235,235,0.5)', lineHeight: '1.8' }}>
                Авторские украшения в стиле тёмной романтики. Серебро, обсидиан, гранат.
                Каждая вещь — произведение мрачного искусства.
              </p>
              <div className="flex flex-wrap gap-4 animate-fade-up-3">
                <button onClick={() => onNavigate('catalog')}
                  className="btn-blood px-8 py-3.5 text-xs font-body font-semibold uppercase blood-glow-sm"
                  style={{ letterSpacing: '0.14em' }}>
                  <span>Каталог украшений</span>
                </button>
                <button onClick={() => onNavigate('contacts')}
                  className="btn-outline-blood px-8 py-3.5 text-xs font-body font-semibold uppercase"
                  style={{ letterSpacing: '0.14em' }}>
                  Связаться
                </button>
              </div>
              <div className="flex gap-10 mt-12 animate-fade-up-3">
                {[['760+', 'украшений'], ['4.9★', 'рейтинг'], ['12 лет', 'опыта']].map(([val, lbl]) => (
                  <div key={lbl}>
                    <div className="font-serif text-2xl font-semibold" style={{ color: '#e8e0d0' }}>{val}</div>
                    <div className="text-xs uppercase tracking-widest mt-0.5 font-body"
                      style={{ color: 'rgba(235,235,235,0.3)', letterSpacing: '0.15em' }}>{lbl}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Image */}
            <div className="relative flex justify-center items-center py-16">
              <div className="relative animate-float-slow">
                <div className="absolute inset-0 rounded-2xl blur-2xl scale-95"
                  style={{ background: 'radial-gradient(circle, rgba(139,0,0,0.35), transparent)' }} />
                <img
                  src="https://cdn.poehali.dev/projects/f68a84c0-111e-450c-bda7-29b9960e5c2f/files/c9a23429-b15e-48ae-9cb6-b48aefba63fa.jpg"
                  alt="Darkware"
                  className="relative rounded-2xl w-full max-w-md"
                  style={{ boxShadow: '0 30px 80px rgba(0,0,0,0.8), 0 0 40px rgba(139,0,0,0.25)', border: '1px solid rgba(139,0,0,0.25)' }}
                />
                <div className="absolute -bottom-5 -left-6 px-5 py-3 rounded-xl"
                  style={{ background: '#141414', border: '1px solid rgba(139,0,0,0.35)', boxShadow: '0 12px 32px rgba(0,0,0,0.6)' }}>
                  <div className="text-xs uppercase tracking-widest mb-0.5 font-body"
                    style={{ color: 'rgba(235,235,235,0.3)', letterSpacing: '0.15em' }}>Материал</div>
                  <div className="font-serif text-base font-semibold" style={{ color: '#c0c0c0' }}>Серебро 925°</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none"
          style={{ background: 'linear-gradient(to top, var(--obsidian), transparent)' }} />
      </section>

      <div className="blood-divider max-w-4xl mx-auto" />

      {/* CATEGORIES */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-xs uppercase tracking-widest mb-3 font-body ornament"
              style={{ color: '#c0392b', letterSpacing: '0.2em' }}>коллекции</p>
            <h2 className="font-gothic text-4xl lg:text-5xl" style={{ color: '#e8e0d0' }}>Категории</h2>
          </div>
          <div className="grid grid-cols-3 lg:grid-cols-6 gap-3">
            {categories.map(cat => (
              <button key={cat.label} onClick={() => onNavigate('catalog')}
                className="group card-dark p-5 rounded-xl text-center">
                <div className="text-3xl mb-3 transition-transform duration-300 group-hover:scale-110">{cat.icon}</div>
                <div className="text-sm font-body font-medium mb-1" style={{ color: '#e8e0d0' }}>{cat.label}</div>
                <div className="text-xs font-body" style={{ color: 'rgba(192,57,43,0.75)' }}>{cat.count} шт.</div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-end justify-between mb-12">
            <div>
              <p className="text-xs uppercase tracking-widest mb-3 font-body ornament"
                style={{ color: '#c0392b', letterSpacing: '0.2em' }}>избранное</p>
              <h2 className="font-gothic text-4xl lg:text-5xl" style={{ color: '#e8e0d0' }}>Популярные</h2>
            </div>
            <button onClick={() => onNavigate('catalog')}
              className="hidden md:flex items-center gap-2 text-xs uppercase tracking-widest font-body"
              style={{ color: 'rgba(235,235,235,0.3)', letterSpacing: '0.15em' }}
              onMouseEnter={e => (e.currentTarget.style.color = '#c0392b')}
              onMouseLeave={e => (e.currentTarget.style.color = 'rgba(235,235,235,0.3)')}>
              Все товары <Icon name="ArrowRight" size={14} />
            </button>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {featured.map(product => (
              <div key={product.id} className="group card-dark rounded-2xl overflow-hidden">
                <div className="relative h-56 overflow-hidden">
                  <img src={product.image} alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0"
                    style={{ background: 'linear-gradient(to top, rgba(10,10,10,0.85), transparent 55%)' }} />
                  <span className="absolute top-3 left-3 px-2.5 py-1 text-xs font-body font-semibold uppercase tracking-wider text-white"
                    style={{ background: '#8b0000', letterSpacing: '0.08em' }}>{product.badge}</span>
                  <button className="absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200"
                    style={{ background: 'rgba(10,10,10,0.75)', border: '1px solid rgba(139,0,0,0.35)' }}>
                    <Icon name="Heart" size={13} style={{ color: '#c0392b' }} />
                  </button>
                </div>
                <div className="p-5">
                  <p className="text-xs font-body uppercase tracking-wider mb-1.5"
                    style={{ color: 'rgba(192,192,192,0.4)', letterSpacing: '0.12em' }}>{product.material}</p>
                  <h3 className="font-serif font-semibold text-lg mb-1" style={{ color: '#e8e0d0' }}>{product.name}</h3>
                  <div className="flex items-center gap-1.5 mb-4">
                    <span className="text-xs" style={{ color: '#8b0000' }}>{'★'.repeat(Math.floor(product.rating))}</span>
                    <span className="text-xs font-body" style={{ color: 'rgba(235,235,235,0.3)' }}>({product.reviews})</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-serif text-xl font-semibold" style={{ color: '#e8e0d0' }}>{product.price}</div>
                      <div className="text-xs font-body line-through" style={{ color: 'rgba(235,235,235,0.25)' }}>{product.oldPrice}</div>
                    </div>
                    <button className="btn-blood px-4 py-2 text-xs font-body font-semibold uppercase"
                      style={{ letterSpacing: '0.08em' }}>
                      <span>В корзину</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="py-16 px-4"
        style={{ borderTop: '1px solid rgba(255,255,255,0.04)', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
          {features.map(f => (
            <div key={f.title} className="flex flex-col items-center text-center p-6">
              <div className="w-12 h-12 rounded-xl mb-4 flex items-center justify-center"
                style={{ background: 'rgba(139,0,0,0.12)', border: '1px solid rgba(139,0,0,0.25)' }}>
                <Icon name={f.icon} fallback="CircleAlert" size={20} style={{ color: '#c0392b' }} />
              </div>
              <div className="font-serif text-base font-semibold mb-1" style={{ color: '#e8e0d0' }}>{f.title}</div>
              <div className="text-xs font-body" style={{ color: 'rgba(235,235,235,0.35)', lineHeight: '1.6' }}>{f.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="relative rounded-2xl px-8 py-16 overflow-hidden"
            style={{ background: '#141414', border: '1px solid rgba(139,0,0,0.3)' }}>
            <div className="absolute inset-0 pointer-events-none"
              style={{ background: 'radial-gradient(ellipse at center, rgba(139,0,0,0.1), transparent 70%)' }} />
            <div className="relative z-10">
              <p className="text-xs uppercase tracking-widest mb-4 font-body ornament"
                style={{ color: '#c0392b', letterSpacing: '0.2em' }}>эксклюзив</p>
              <h2 className="font-gothic text-4xl lg:text-6xl mb-3" style={{ color: '#e8e0d0' }}>Скидка 15%</h2>
              <p className="font-serif italic text-xl mb-2" style={{ color: 'rgba(235,235,235,0.5)' }}>на первый заказ</p>
              <p className="text-sm font-body mb-8" style={{ color: 'rgba(235,235,235,0.35)' }}>
                Промокод: <span className="font-semibold" style={{ color: '#c0392b' }}>DARK15</span>
              </p>
              <button onClick={() => onNavigate('catalog')}
                className="btn-blood px-10 py-3.5 font-body font-semibold uppercase text-sm blood-glow"
                style={{ letterSpacing: '0.12em' }}>
                <span>Выбрать украшение</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-10 px-4" style={{ borderTop: '1px solid rgba(139,0,0,0.2)' }}>
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="text-2xl font-gothic" style={{ color: '#c0392b' }}>☩</span>
            <span className="font-gothic text-xl" style={{ color: '#e8e0d0', letterSpacing: '0.1em' }}>DARKWARE</span>
          </div>
          <p className="text-xs font-body uppercase tracking-wider"
            style={{ color: 'rgba(235,235,235,0.2)', letterSpacing: '0.12em' }}>© 2024 Darkware. Все права защищены.</p>
          <div className="flex gap-5">
            {[['Каталог', 'catalog'], ['Контакты', 'contacts']].map(([lbl, id]) => (
              <button key={id} onClick={() => onNavigate(id)}
                className="text-xs font-body uppercase tracking-wider transition-colors"
                style={{ color: 'rgba(235,235,235,0.25)', letterSpacing: '0.12em' }}
                onMouseEnter={e => (e.currentTarget.style.color = '#c0392b')}
                onMouseLeave={e => (e.currentTarget.style.color = 'rgba(235,235,235,0.25)')}>
                {lbl}
              </button>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
