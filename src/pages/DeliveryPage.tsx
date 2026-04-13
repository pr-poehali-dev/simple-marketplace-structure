import Icon from '@/components/ui/icon';

interface DeliveryPageProps {
  onNavigate: (page: string) => void;
}

const methods = [
  {
    icon: 'Truck',
    title: 'Курьерская доставка',
    price: '350 ₽',
    time: '1–3 рабочих дня',
    desc: 'Доставка до двери по Москве и МО. Курьер позвонит за 1 час до приезда. Возможна доставка в день заказа при оформлении до 12:00.',
  },
  {
    icon: 'MapPin',
    title: 'Самовывоз',
    price: 'Бесплатно',
    time: 'В день заказа',
    desc: 'Москва, Арбат, 13. Шоурум работает Пн–Пт: 11:00–21:00, Сб–Вс: 12:00–20:00. Заказ будет готов через 2 часа после оплаты.',
  },
  {
    icon: 'Package',
    title: 'Почта России',
    price: '200 ₽',
    time: '5–14 рабочих дней',
    desc: 'Доставка по всей России. Отправляем заказным письмом с трек-номером. СМС с трек-номером придёт после отправки.',
  },
];

const steps = [
  { n: '01', title: 'Оформите заказ', desc: 'Добавьте товары в корзину и заполните данные доставки' },
  { n: '02', title: 'Подтверждение', desc: 'Мы свяжемся с вами в течение 2 часов для подтверждения' },
  { n: '03', title: 'Упаковка', desc: 'Каждое украшение упаковывается в фирменную коробочку с бархатом' },
  { n: '04', title: 'Доставка', desc: 'Передаём заказ курьеру или в Почту России с трек-номером' },
];

const faq = [
  { q: 'Как отследить заказ?', a: 'После отправки вы получите СМС с трек-номером. Отследить можно на сайте pochta.ru или через курьерскую службу.' },
  { q: 'Что если меня нет дома?', a: 'Курьер позвонит заранее. Можно договориться о переносе на другое время или оставить заказ соседям/консьержу.' },
  { q: 'Доставляете за рубеж?', a: 'Пока доставка только по России. Работаем над международной доставкой — следите за новостями.' },
  { q: 'Можно ли изменить адрес?', a: 'Да, до момента передачи заказа в доставку. Напишите нам на dark@darkware.ru или позвоните.' },
];

export default function DeliveryPage({ onNavigate }: DeliveryPageProps) {
  return (
    <div className="min-h-screen pt-20" style={{ background: '#0a0a0a' }}>

      {/* Hero */}
      <section className="py-14 px-4" style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-xs uppercase tracking-widest font-body mb-3" style={{ color: '#c0392b', letterSpacing: '0.2em' }}>Доставка</p>
          <h1 className="font-gothic text-4xl md:text-5xl mb-4" style={{ color: '#e8e0d0' }}>Доставка по России</h1>
          <p className="font-body text-base" style={{ color: 'rgba(235,235,235,0.4)', lineHeight: '1.8' }}>
            Бережно упакуем каждое украшение и доставим любым удобным способом
          </p>
        </div>
      </section>

      {/* Methods */}
      <section className="py-14 px-4">
        <div className="max-w-4xl mx-auto">
          <p className="text-xs uppercase tracking-widest font-body mb-8 text-center" style={{ color: 'rgba(235,235,235,0.3)', letterSpacing: '0.15em' }}>Способы доставки</p>
          <div className="grid md:grid-cols-3 gap-5">
            {methods.map(m => (
              <div key={m.title} className="p-6 rounded-2xl flex flex-col gap-4"
                style={{ background: '#141414', border: '1px solid rgba(255,255,255,0.06)' }}>
                <div className="w-11 h-11 rounded-xl flex items-center justify-center"
                  style={{ background: 'rgba(139,0,0,0.12)', border: '1px solid rgba(139,0,0,0.25)' }}>
                  <Icon name={m.icon} fallback="Package" size={20} style={{ color: '#c0392b' }} />
                </div>
                <div>
                  <h3 className="font-serif text-lg font-semibold mb-1" style={{ color: '#e8e0d0' }}>{m.title}</h3>
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-sm font-body font-semibold" style={{ color: m.price === 'Бесплатно' ? '#4caf50' : '#e8e0d0' }}>{m.price}</span>
                    <span style={{ color: 'rgba(255,255,255,0.15)' }}>·</span>
                    <span className="text-xs font-body" style={{ color: 'rgba(235,235,235,0.4)' }}>{m.time}</span>
                  </div>
                  <p className="text-xs font-body leading-relaxed" style={{ color: 'rgba(235,235,235,0.45)', lineHeight: '1.7' }}>{m.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Steps */}
      <section className="py-14 px-4" style={{ borderTop: '1px solid rgba(255,255,255,0.04)' }}>
        <div className="max-w-4xl mx-auto">
          <p className="text-xs uppercase tracking-widest font-body mb-8 text-center" style={{ color: 'rgba(235,235,235,0.3)', letterSpacing: '0.15em' }}>Как это работает</p>
          <div className="grid md:grid-cols-4 gap-6">
            {steps.map((s, i) => (
              <div key={s.n} className="relative flex flex-col items-center text-center">
                {i < steps.length - 1 && (
                  <div className="hidden md:block absolute top-5 left-1/2 w-full h-px"
                    style={{ background: 'rgba(139,0,0,0.2)' }} />
                )}
                <div className="relative z-10 w-10 h-10 rounded-full flex items-center justify-center mb-4 font-body text-xs font-bold"
                  style={{ background: '#141414', border: '2px solid rgba(139,0,0,0.5)', color: '#c0392b' }}>
                  {s.n}
                </div>
                <h4 className="font-serif text-sm font-semibold mb-2" style={{ color: '#e8e0d0' }}>{s.title}</h4>
                <p className="text-xs font-body" style={{ color: 'rgba(235,235,235,0.4)', lineHeight: '1.65' }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-14 px-4" style={{ borderTop: '1px solid rgba(255,255,255,0.04)' }}>
        <div className="max-w-2xl mx-auto">
          <p className="text-xs uppercase tracking-widest font-body mb-8 text-center" style={{ color: 'rgba(235,235,235,0.3)', letterSpacing: '0.15em' }}>Частые вопросы</p>
          <div className="space-y-3">
            {faq.map(f => (
              <div key={f.q} className="p-5 rounded-xl" style={{ background: '#141414', border: '1px solid rgba(255,255,255,0.06)' }}>
                <p className="font-body text-sm font-semibold mb-2" style={{ color: '#e8e0d0' }}>{f.q}</p>
                <p className="font-body text-xs leading-relaxed" style={{ color: 'rgba(235,235,235,0.45)', lineHeight: '1.7' }}>{f.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="py-10 px-4" style={{ borderTop: '1px solid rgba(139,0,0,0.2)' }}>
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-body text-sm" style={{ color: 'rgba(235,235,235,0.4)' }}>Остались вопросы?</p>
          <div className="flex gap-3">
            <button onClick={() => onNavigate('contacts')}
              className="px-6 py-2.5 text-xs font-body uppercase tracking-wider rounded-lg transition-all"
              style={{ border: '1px solid rgba(139,0,0,0.4)', color: '#c0392b', letterSpacing: '0.1em' }}
              onMouseEnter={e => (e.currentTarget.style.background = 'rgba(139,0,0,0.1)')}
              onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}>
              Связаться с нами
            </button>
            <button onClick={() => onNavigate('catalog')}
              className="px-6 py-2.5 text-xs font-body uppercase tracking-wider rounded-lg"
              style={{ background: 'linear-gradient(135deg, #8b0000, #c0392b)', color: '#fff', letterSpacing: '0.1em' }}>
              В каталог
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
