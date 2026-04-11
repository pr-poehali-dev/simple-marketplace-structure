import { useState } from 'react';
import Icon from '@/components/ui/icon';

const contacts = [
  {
    icon: 'Phone',
    label: 'Телефон',
    value: '+7 (800) 555-35-35',
    sub: 'Бесплатно по России',
    color: '#f72585',
  },
  {
    icon: 'Mail',
    label: 'Email',
    value: 'hello@market.ru',
    sub: 'Ответим в течение часа',
    color: '#4361ee',
  },
  {
    icon: 'MapPin',
    label: 'Адрес',
    value: 'Москва, ул. Тверская, 1',
    sub: 'Офис и пункт выдачи',
    color: '#4cc9f0',
  },
  {
    icon: 'Clock',
    label: 'Режим работы',
    value: 'Пн–Пт: 9:00–20:00',
    sub: 'Сб–Вс: 10:00–18:00',
    color: '#ffbe0b',
  },
];

const socials = [
  { icon: '✈️', label: 'Telegram', handle: '@market_official' },
  { icon: '📷', label: 'Instagram', handle: '@market.ru' },
  { icon: '🎵', label: 'TikTok', handle: '@market_ru' },
  { icon: '💬', label: 'ВКонтакте', handle: 'vk.com/market' },
];

const faq = [
  { q: 'Как оформить заказ?', a: 'Добавьте товар в корзину и следуйте инструкциям при оформлении. Доставка занимает 1–3 рабочих дня.' },
  { q: 'Можно ли вернуть товар?', a: 'Да, в течение 30 дней после покупки без объяснения причин. Возврат денег в течение 3–5 рабочих дней.' },
  { q: 'Есть ли гарантия на товары?', a: 'На все товары распространяется гарантия производителя. На электронику — от 1 года.' },
  { q: 'Как стать продавцом?', a: 'Заполните форму на сайте или напишите нам на email. Подключение занимает 1–2 рабочих дня.' },
];

export default function ContactsPage() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [sent, setSent] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <div className="min-h-screen mesh-bg font-golos pt-20">
      <div className="max-w-7xl mx-auto px-4 py-12">

        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-sm font-medium mb-2" style={{ color: '#f72585' }}>Мы всегда на связи</p>
          <h1 className="text-4xl lg:text-5xl font-display font-black text-white mb-4">
            <span className="gradient-text">Контакты</span>
          </h1>
          <p className="text-white/50 text-lg max-w-lg mx-auto">
            Есть вопросы? Напишите нам или позвоните — поможем разобраться
          </p>
        </div>

        {/* Contact cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
          {contacts.map((c) => (
            <div key={c.label} className="p-5 rounded-2xl text-center card-hover"
              style={{ background: 'rgba(17,17,39,0.8)', border: '1px solid rgba(255,255,255,0.06)' }}>
              <div className="w-12 h-12 rounded-2xl mx-auto mb-4 flex items-center justify-center"
                style={{ background: `${c.color}20`, border: `1px solid ${c.color}30` }}>
                <Icon name={c.icon} fallback="CircleAlert" size={20} style={{ color: c.color }} />
              </div>
              <p className="text-white/40 text-xs mb-1">{c.label}</p>
              <p className="text-white font-semibold text-sm mb-0.5">{c.value}</p>
              <p className="text-white/30 text-xs">{c.sub}</p>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          {/* Form */}
          <div className="p-8 rounded-3xl"
            style={{ background: 'rgba(17,17,39,0.8)', border: '1px solid rgba(255,255,255,0.06)' }}>
            <h2 className="text-2xl font-display font-bold text-white mb-2">Написать нам</h2>
            <p className="text-white/40 text-sm mb-6">Ответим в течение нескольких часов</p>

            {sent ? (
              <div className="text-center py-12">
                <div className="text-5xl mb-4">🚀</div>
                <h3 className="text-xl font-bold text-white mb-2">Сообщение отправлено!</h3>
                <p className="text-white/50 text-sm mb-6">Скоро свяжемся с вами</p>
                <button
                  onClick={() => { setSent(false); setForm({ name: '', email: '', message: '' }); }}
                  className="btn-gradient px-6 py-2.5 rounded-xl text-sm font-semibold text-white"
                >
                  <span>Написать ещё</span>
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="text-white/50 text-xs font-medium mb-1.5 block">Ваше имя</label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="Иван Иванов"
                    className="w-full px-4 py-3 rounded-xl text-white placeholder-white/25 outline-none transition-all text-sm"
                    style={{
                      background: 'rgba(255,255,255,0.05)',
                      border: '1px solid rgba(255,255,255,0.1)',
                    }}
                  />
                </div>
                <div>
                  <label className="text-white/50 text-xs font-medium mb-1.5 block">Email</label>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="ivan@mail.ru"
                    className="w-full px-4 py-3 rounded-xl text-white placeholder-white/25 outline-none transition-all text-sm"
                    style={{
                      background: 'rgba(255,255,255,0.05)',
                      border: '1px solid rgba(255,255,255,0.1)',
                    }}
                  />
                </div>
                <div>
                  <label className="text-white/50 text-xs font-medium mb-1.5 block">Сообщение</label>
                  <textarea
                    required
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="Ваш вопрос или предложение..."
                    rows={5}
                    className="w-full px-4 py-3 rounded-xl text-white placeholder-white/25 outline-none transition-all resize-none text-sm"
                    style={{
                      background: 'rgba(255,255,255,0.05)',
                      border: '1px solid rgba(255,255,255,0.1)',
                    }}
                  />
                </div>
                <button type="submit" className="w-full btn-gradient py-3.5 rounded-xl font-semibold text-white text-sm">
                  <span className="flex items-center justify-center gap-2">
                    <Icon name="Send" size={16} /> Отправить сообщение
                  </span>
                </button>
              </form>
            )}
          </div>

          {/* FAQ + Socials */}
          <div className="space-y-6">
            {/* Socials */}
            <div className="p-6 rounded-3xl"
              style={{ background: 'rgba(17,17,39,0.8)', border: '1px solid rgba(255,255,255,0.06)' }}>
              <h3 className="font-display font-bold text-white mb-4">Мы в соцсетях</h3>
              <div className="grid grid-cols-2 gap-3">
                {socials.map((s) => (
                  <div key={s.label} className="flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all hover:bg-white/5"
                    style={{ border: '1px solid rgba(255,255,255,0.06)' }}>
                    <span className="text-xl">{s.icon}</span>
                    <div>
                      <p className="text-white text-sm font-medium">{s.label}</p>
                      <p className="text-white/35 text-xs">{s.handle}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* FAQ */}
            <div className="p-6 rounded-3xl"
              style={{ background: 'rgba(17,17,39,0.8)', border: '1px solid rgba(255,255,255,0.06)' }}>
              <h3 className="font-display font-bold text-white mb-4">Частые вопросы</h3>
              <div className="space-y-2">
                {faq.map((item, i) => (
                  <div key={i} className="rounded-xl overflow-hidden"
                    style={{ border: '1px solid rgba(255,255,255,0.06)' }}>
                    <button
                      onClick={() => setOpenFaq(openFaq === i ? null : i)}
                      className="w-full flex items-center justify-between px-4 py-3 text-left transition-all"
                      style={{ background: openFaq === i ? 'rgba(247,37,133,0.08)' : 'transparent' }}
                    >
                      <span className="text-white text-sm font-medium">{item.q}</span>
                      <Icon name={openFaq === i ? 'ChevronUp' : 'ChevronDown'} size={16}
                        className="flex-shrink-0 ml-2"
                        style={{ color: openFaq === i ? '#f72585' : 'rgba(255,255,255,0.3)' }} />
                    </button>
                    {openFaq === i && (
                      <div className="px-4 pb-3 animate-fade-up">
                        <p className="text-white/50 text-sm leading-relaxed">{item.a}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}