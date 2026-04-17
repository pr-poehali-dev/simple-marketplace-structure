import { useState } from 'react';
import Icon from '@/components/ui/icon';
import { allProducts, type Product } from '@/data/products';
import ProductModal from '@/components/ProductModal';
import { useCart } from '@/context/CartContext';

interface HomePageProps {
  onNavigate: (page: string) => void;
}

const categories = [
  { icon: '💀', label: 'Кольца', count: 214 },
  { icon: '🖤', label: 'Чокеры', count: 187 },
  { icon: '🩸', label: 'Серьги', count: 143 },
  { icon: '⛓️', label: 'Браслеты', count: 98 },
  { icon: '🦇', label: 'Броши', count: 67 },
  { icon: '🕯️', label: 'Декор', count: 52 },
];

const features = [
  { icon: 'Shield',    title: 'Гарантия подлинности', desc: 'Только сертифицированные материалы' },
  { icon: 'Truck',     title: 'Доставка по России',   desc: 'Бережная упаковка каждого заказа' },
  { icon: 'RefreshCw', title: 'Возврат 30 дней',      desc: 'Без вопросов, если не понравится' },
  { icon: 'Gem',       title: 'Ручная работа',        desc: 'Каждое украшение уникально' },
];

const featured = allProducts.filter(p => ['Хит', 'Новинка', '-20%'].includes(p.badge)).slice(0, 3);

export default function HomePage({ onNavigate }: HomePageProps) {
  const [selected, setSelected] = useState<Product | null>(null);
  const { add } = useCart();

  return (
    <div className="min-h-screen dark-bg font-body">
      {selected && <ProductModal product={selected} onClose={() => setSelected(null)} />}

      {/* HERO */}
      <section className="relative overflow-hidden" style={{ minHeight: '100vh' }}>
        {/* Фон — готическая пара */}
        <img
          src="https://cdn.poehali.dev/projects/f68a84c0-111e-450c-bda7-29b9960e5c2f/bucket/65baefdc-d74c-49ba-aeac-5be62e438f2b.jpg"
          alt="Darkware"
          className="absolute inset-0 w-full h-full object-cover object-center"
          style={{ filter: 'grayscale(100%) brightness(0.45)' }}
        />
        {/* Затемнение слоями */}
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: 'linear-gradient(to right, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.45) 55%, rgba(0,0,0,0.2) 100%)' }} />
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: 'linear-gradient(to top, rgba(10,10,10,1) 0%, transparent 40%)' }} />
        {/* Красный акцент */}
        <div className="absolute top-0 left-0 right-0 h-px"
          style={{ background: 'linear-gradient(90deg, transparent 0%, #8b0000 30%, #c0392b 50%, #8b0000 70%, transparent 100%)' }} />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-center" style={{ minHeight: '100vh', paddingTop: '5rem', paddingBottom: '6rem' }}>
          <div className="max-w-2xl">
            <p className="text-xs uppercase tracking-widest mb-5 animate-fade-up font-body"
              style={{ color: '#c0392b', letterSpacing: '0.28em' }}>
              ✦ Готические украшения и аксессуары ✦
            </p>
            <h1 className="font-gothic mb-5 animate-fade-up-1 leading-none"
              style={{ fontSize: 'clamp(3.5rem, 9vw, 7rem)', color: '#e8e0d0', textShadow: '0 4px 40px rgba(0,0,0,0.8)' }}>
              Darkware
            </h1>
            <p className="font-serif italic mb-6 animate-fade-up-1" style={{ color: '#c0392b', fontSize: '1.35rem' }}>
              "Носи тьму с гордостью"
            </p>
            <p className="text-sm leading-relaxed mb-10 animate-fade-up-2 font-body"
              style={{ color: 'rgba(235,235,235,0.6)', lineHeight: '1.9', maxWidth: '480px' }}>
              Авторские украшения в стиле тёмной романтики — для тех, кто чувствует красоту в ночи.
              Серебро 925°, натуральные камни, ручная работа.
            </p>
            <div className="flex flex-wrap gap-4 animate-fade-up-3">
              <button onClick={() => onNavigate('catalog')}
                className="btn-blood px-10 py-4 text-xs font-body font-semibold uppercase blood-glow-sm"
                style={{ letterSpacing: '0.16em' }}>
                <span>Каталог украшений</span>
              </button>
              <button onClick={() => onNavigate('contacts')}
                className="btn-outline-blood px-10 py-4 text-xs font-body font-semibold uppercase"
                style={{ letterSpacing: '0.16em', backdropFilter: 'blur(8px)', background: 'rgba(0,0,0,0.3)' }}>
                Связаться
              </button>
            </div>

            <div className="flex gap-12 mt-14 animate-fade-up-3">
              {[['760+', 'украшений'], ['4.9★', 'рейтинг'], ['12 лет', 'опыта']].map(([val, lbl]) => (
                <div key={lbl}>
                  <div className="font-serif text-3xl font-semibold" style={{ color: '#e8e0d0', textShadow: '0 2px 20px rgba(0,0,0,0.9)' }}>{val}</div>
                  <div className="text-xs uppercase tracking-widest mt-1 font-body"
                    style={{ color: 'rgba(235,235,235,0.35)', letterSpacing: '0.18em' }}>{lbl}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
          style={{ background: 'linear-gradient(to top, var(--obsidian), transparent)' }} />
      </section>

      <div className="blood-divider max-w-4xl mx-auto" />

      {/* MARQUEE STRIP */}
      <div className="py-4 overflow-hidden" style={{ borderTop: '1px solid rgba(139,0,0,0.2)', borderBottom: '1px solid rgba(139,0,0,0.2)', background: 'rgba(139,0,0,0.05)' }}>
        <div className="flex animate-marquee whitespace-nowrap">
          {Array(3).fill(['✦ Ручная работа', '☩ Серебро 925°', '🦇 Готика', '✦ Авторские украшения', '☩ Тёмная романтика', '💀 Ограниченные тиражи']).flat().map((item, i) => (
            <span key={i} className="mx-8 text-xs font-body uppercase tracking-widest" style={{ color: 'rgba(192,57,43,0.7)', letterSpacing: '0.2em' }}>{item}</span>
          ))}
        </div>
      </div>

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

      {/* PHILOSOPHY */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8 items-stretch">
            <div className="relative rounded-2xl overflow-hidden" style={{ minHeight: '420px' }}>
              <img
                src="https://cdn.poehali.dev/projects/f68a84c0-111e-450c-bda7-29b9960e5c2f/bucket/b1a8b7bd-fd94-4ec3-b1d7-ce816dc45b8a.jpg"
                alt="Мастерство"
                className="w-full h-full object-cover"
                style={{ position: 'absolute', inset: 0 }}
              />
              <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(0,0,0,0.7) 0%, rgba(139,0,0,0.25) 100%)' }} />
              <div className="relative z-10 p-10 flex flex-col justify-end h-full" style={{ minHeight: '420px' }}>
                <p className="text-xs uppercase tracking-widest mb-3 font-body" style={{ color: '#c0392b', letterSpacing: '0.2em' }}>✦ наш подход</p>
                <h3 className="font-gothic text-3xl lg:text-4xl mb-4" style={{ color: '#e8e0d0' }}>Мастерство<br/>в каждой детали</h3>
                <p className="text-sm font-body" style={{ color: 'rgba(235,235,235,0.6)', lineHeight: '1.8', maxWidth: '340px' }}>
                  Каждое украшение рождается вручную — от эскиза до полировки. Никаких компромиссов с качеством.
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              {[
                { num: '01', title: 'Тёмная эстетика', text: 'Черепа, оккультные символы, готические орнаменты — не просто декор, а язык для тех, кто думает иначе.' },
                { num: '02', title: 'Натуральные камни', text: 'Гранат, обсидиан, оникс, лунный камень. Только подлинные минералы с уникальным характером.' },
                { num: '03', title: 'Серебро с историей', text: 'Состаривание вручную, патинирование, чернение — каждая вещь выглядит как найденный артефакт.' },
              ].map(item => (
                <div key={item.num} className="group flex gap-6 p-6 rounded-xl transition-all duration-300"
                  style={{ background: '#141414', border: '1px solid rgba(139,0,0,0.18)' }}
                  onMouseEnter={e => (e.currentTarget.style.borderColor = 'rgba(139,0,0,0.5)')}
                  onMouseLeave={e => (e.currentTarget.style.borderColor = 'rgba(139,0,0,0.18)')}>
                  <div className="font-gothic text-3xl flex-shrink-0" style={{ color: 'rgba(139,0,0,0.3)' }}>{item.num}</div>
                  <div>
                    <h4 className="font-serif text-base font-semibold mb-2" style={{ color: '#e8e0d0' }}>{item.title}</h4>
                    <p className="text-xs font-body" style={{ color: 'rgba(235,235,235,0.4)', lineHeight: '1.7' }}>{item.text}</p>
                  </div>
                </div>
              ))}
            </div>
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
              <div key={product.id}
                className="group card-dark rounded-2xl overflow-hidden cursor-pointer"
                onClick={() => setSelected(product)}>
                <div className="relative overflow-hidden" style={{ background: '#0a0a0a', height: '220px' }}>
                  <img src={product.image} alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  {/* hover overlay */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center"
                    style={{ background: 'rgba(0,0,0,0.45)' }}>
                    <span className="text-xs font-body uppercase tracking-widest px-4 py-2"
                      style={{ border: '1px solid rgba(192,57,43,0.6)', color: '#c0392b', letterSpacing: '0.15em', background: 'rgba(0,0,0,0.5)' }}>
                      Открыть
                    </span>
                  </div>
                  <div className="absolute inset-0 pointer-events-none"
                    style={{ background: 'linear-gradient(to top, rgba(10,10,10,0.85), transparent 55%)' }} />
                  <span className="absolute top-3 left-3 px-2.5 py-1 text-xs font-body font-semibold uppercase text-white"
                    style={{ background: '#8b0000', letterSpacing: '0.08em' }}>{product.badge}</span>
                  <button
                    className="absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200"
                    style={{ background: 'rgba(10,10,10,0.75)', border: '1px solid rgba(139,0,0,0.35)' }}
                    onClick={e => e.stopPropagation()}>
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
                      <div className="font-serif text-xl font-semibold" style={{ color: '#e8e0d0' }}>{product.price.toLocaleString()} ₽</div>
                      {product.oldPrice && (
                        <div className="text-xs font-body line-through" style={{ color: 'rgba(235,235,235,0.25)' }}>
                          {product.oldPrice.toLocaleString()} ₽
                        </div>
                      )}
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={e => { e.stopPropagation(); add(product); }}
                        className="btn-blood p-2 text-xs font-body font-semibold"
                        title="В корзину">
                        <span><Icon name="ShoppingBag" size={14} /></span>
                      </button>
                      <button
                        className="px-4 py-2 text-xs font-body font-semibold uppercase rounded transition-all"
                        style={{ border: '1px solid rgba(139,0,0,0.4)', color: '#c0392b', letterSpacing: '0.08em', background: 'transparent' }}
                        onClick={e => { e.stopPropagation(); setSelected(product); }}
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
          <div className="flex flex-wrap justify-center gap-5">
            {[['Каталог', 'catalog'], ['Контакты', 'contacts'], ['Доставка', 'delivery'], ['Возврат', 'returns']].map(([lbl, id]) => (
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