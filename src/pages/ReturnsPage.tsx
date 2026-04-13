import Icon from '@/components/ui/icon';

interface ReturnsPageProps {
  onNavigate: (page: string) => void;
}

const conditions = [
  { icon: 'CheckCircle', title: 'Товар не использовался', desc: 'Украшение не носили, нет царапин, деформаций и следов использования' },
  { icon: 'Tag', title: 'Бирки и упаковка', desc: 'Сохранены оригинальные бирки, фирменная коробочка и все вложения' },
  { icon: 'Calendar', title: 'Срок 30 дней', desc: 'Обращение в течение 30 дней с момента получения заказа' },
  { icon: 'FileText', title: 'Документы', desc: 'Наличие чека или подтверждения заказа (номер заказа в личном кабинете)' },
];

const steps = [
  { n: '01', title: 'Заявка', desc: 'Напишите на dark@darkware.ru с номером заказа и причиной возврата' },
  { n: '02', title: 'Подтверждение', desc: 'Мы ответим в течение 1 рабочего дня и согласуем способ возврата' },
  { n: '03', title: 'Отправка', desc: 'Отправьте товар на наш адрес. Расходы на пересылку при браке — наши' },
  { n: '04', title: 'Возврат денег', desc: 'Деньги вернём на карту в течение 3–5 рабочих дней после получения товара' },
];

const cases = [
  {
    icon: 'ShieldCheck',
    color: '#27ae60',
    title: 'Производственный брак',
    items: ['Дефект пайки или сборки', 'Некорректный цвет или покрытие', 'Сколы камней при получении', 'Несоответствие описанию на сайте'],
    note: 'Возврат и ремонт за наш счёт, включая доставку',
  },
  {
    icon: 'RefreshCw',
    color: '#2980b9',
    title: 'Обмен или возврат',
    items: ['Не подошёл размер', 'Не понравилось изделие вживую', 'Хотите другую модель', 'Подарок не угадал с выбором'],
    note: 'Возврат средств или обмен в течение 30 дней',
  },
  {
    icon: 'XCircle',
    color: '#c0392b',
    title: 'Возврат невозможен',
    items: ['Изделие по индивидуальному заказу', 'Следы носки или повреждения', 'Прошло более 30 дней', 'Отсутствует упаковка и бирки'],
    note: 'Рассматриваем каждый случай индивидуально',
  },
];

const faq = [
  { q: 'Сколько ждать возврата денег?', a: 'После получения и проверки товара — 3–5 рабочих дней. Банк может добавить 1–2 дня на зачисление.' },
  { q: 'Кто платит за обратную доставку?', a: 'При браке — мы. При отказе по вашему желанию — вы. Стоимость доставки Почтой России в среднем 200 ₽.' },
  { q: 'Можно обменять на другую модель?', a: 'Да, если сумма совпадает или вы доплатите разницу. Напишите нам и мы всё согласуем.' },
  { q: 'Что если утеряна упаковка?', a: 'Рассмотрим индивидуально. Отсутствие коробки не всегда является основанием для отказа — свяжитесь с нами.' },
];

export default function ReturnsPage({ onNavigate }: ReturnsPageProps) {
  return (
    <div className="min-h-screen pt-20" style={{ background: '#0a0a0a' }}>

      {/* Hero */}
      <section className="py-14 px-4" style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-xs uppercase tracking-widest font-body mb-3" style={{ color: '#c0392b', letterSpacing: '0.2em' }}>Возврат</p>
          <h1 className="font-gothic text-4xl md:text-5xl mb-4" style={{ color: '#e8e0d0' }}>Политика возврата</h1>
          <p className="font-body text-base" style={{ color: 'rgba(235,235,235,0.4)', lineHeight: '1.8' }}>
            30 дней на возврат без лишних вопросов. Ваше доверие для нас важнее любой продажи
          </p>
        </div>
      </section>

      {/* Conditions */}
      <section className="py-14 px-4">
        <div className="max-w-4xl mx-auto">
          <p className="text-xs uppercase tracking-widest font-body mb-8 text-center" style={{ color: 'rgba(235,235,235,0.3)', letterSpacing: '0.15em' }}>Условия возврата</p>
          <div className="grid md:grid-cols-2 gap-4">
            {conditions.map(c => (
              <div key={c.title} className="flex gap-4 p-5 rounded-xl"
                style={{ background: '#141414', border: '1px solid rgba(255,255,255,0.06)' }}>
                <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ background: 'rgba(139,0,0,0.1)', border: '1px solid rgba(139,0,0,0.2)' }}>
                  <Icon name={c.icon} fallback="Check" size={18} style={{ color: '#c0392b' }} />
                </div>
                <div>
                  <h4 className="font-body text-sm font-semibold mb-1" style={{ color: '#e8e0d0' }}>{c.title}</h4>
                  <p className="font-body text-xs" style={{ color: 'rgba(235,235,235,0.45)', lineHeight: '1.65' }}>{c.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Cases */}
      <section className="py-14 px-4" style={{ borderTop: '1px solid rgba(255,255,255,0.04)' }}>
        <div className="max-w-4xl mx-auto">
          <p className="text-xs uppercase tracking-widest font-body mb-8 text-center" style={{ color: 'rgba(235,235,235,0.3)', letterSpacing: '0.15em' }}>Случаи возврата</p>
          <div className="grid md:grid-cols-3 gap-5">
            {cases.map(c => (
              <div key={c.title} className="p-6 rounded-2xl flex flex-col gap-4"
                style={{ background: '#141414', border: `1px solid ${c.color}22` }}>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg flex items-center justify-center"
                    style={{ background: `${c.color}18` }}>
                    <Icon name={c.icon} fallback="CircleAlert" size={18} style={{ color: c.color }} />
                  </div>
                  <h3 className="font-serif text-sm font-semibold" style={{ color: '#e8e0d0' }}>{c.title}</h3>
                </div>
                <ul className="space-y-2">
                  {c.items.map(item => (
                    <li key={item} className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full flex-shrink-0" style={{ background: c.color }} />
                      <span className="text-xs font-body" style={{ color: 'rgba(235,235,235,0.5)', lineHeight: '1.6' }}>{item}</span>
                    </li>
                  ))}
                </ul>
                <p className="text-xs font-body pt-2 mt-auto" style={{ color: c.color, borderTop: `1px solid ${c.color}22` }}>{c.note}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Steps */}
      <section className="py-14 px-4" style={{ borderTop: '1px solid rgba(255,255,255,0.04)' }}>
        <div className="max-w-4xl mx-auto">
          <p className="text-xs uppercase tracking-widest font-body mb-8 text-center" style={{ color: 'rgba(235,235,235,0.3)', letterSpacing: '0.15em' }}>Как оформить возврат</p>
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
          <p className="font-body text-sm" style={{ color: 'rgba(235,235,235,0.4)' }}>Нужна помощь с возвратом?</p>
          <div className="flex gap-3">
            <button onClick={() => onNavigate('contacts')}
              className="px-6 py-2.5 text-xs font-body uppercase tracking-wider rounded-lg transition-all"
              style={{ border: '1px solid rgba(139,0,0,0.4)', color: '#c0392b', letterSpacing: '0.1em' }}
              onMouseEnter={e => (e.currentTarget.style.background = 'rgba(139,0,0,0.1)')}
              onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}>
              Написать нам
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
