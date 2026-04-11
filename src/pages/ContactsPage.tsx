import { useState } from 'react';
import Icon from '@/components/ui/icon';

const contacts = [
  { icon: 'Phone',   label: 'Телефон',       value: '+7 (800) 666-13-13',  sub: 'Бесплатно, 10:00–22:00', color: '#c0392b' },
  { icon: 'Mail',    label: 'Email',          value: 'dark@darkware.ru',    sub: 'Ответим в течение дня',  color: '#888' },
  { icon: 'MapPin',  label: 'Адрес',          value: 'Москва, Арбат, 13',   sub: 'Шоурум и самовывоз',     color: '#c0392b' },
  { icon: 'Clock',   label: 'Режим работы',   value: 'Пн–Пт: 11:00–21:00', sub: 'Сб–Вс: 12:00–20:00',    color: '#888' },
];

const socials = [
  { icon: '✈️', label: 'Telegram',    handle: '@darkware_official' },
  { icon: '📷', label: 'Instagram',   handle: '@darkware.ru' },
  { icon: '💬', label: 'ВКонтакте',   handle: 'vk.com/darkware' },
  { icon: '▶️', label: 'YouTube',     handle: 'Darkware channel' },
];

const faq = [
  { q: 'Из чего сделаны украшения?',   a: 'Серебро 925°, чернёное серебро, латунь с покрытием. Натуральные камни: обсидиан, гранат, оникс, лабрадор.' },
  { q: 'Есть ли уход за изделиями?',   a: 'Да. К каждому украшению прилагается инструкция по уходу. Избегайте контакта с водой и химией.' },
  { q: 'Возможен ли индивидуальный заказ?', a: 'Да, принимаем заказы на изготовление по эскизу. Срок — от 2 недель. Пишите на email.' },
  { q: 'Какая гарантия на товары?',    a: 'Гарантия 1 год на все украшения. Бесплатный ремонт при производственном браке.' },
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
    <div className="min-h-screen dark-bg font-body pt-20">
      <div className="max-w-7xl mx-auto px-4 py-12">

        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-xs uppercase tracking-widest mb-3 font-body ornament"
            style={{ color: '#c0392b', letterSpacing: '0.2em' }}>связь с тьмой</p>
          <h1 className="font-gothic text-5xl lg:text-6xl mb-4" style={{ color: '#e8e0d0' }}>Контакты</h1>
          <p className="font-serif italic text-xl" style={{ color: 'rgba(235,235,235,0.4)' }}>
            "Мы всегда в тени — но всегда рядом"
          </p>
        </div>

        {/* Contact cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
          {contacts.map(c => (
            <div key={c.label} className="card-dark p-5 rounded-xl text-center">
              <div className="w-11 h-11 rounded-xl mx-auto mb-4 flex items-center justify-center"
                style={{ background: 'rgba(139,0,0,0.12)', border: '1px solid rgba(139,0,0,0.25)' }}>
                <Icon name={c.icon} fallback="CircleAlert" size={18} style={{ color: c.color }} />
              </div>
              <p className="text-xs uppercase tracking-widest mb-1 font-body"
                style={{ color: 'rgba(235,235,235,0.3)', letterSpacing: '0.12em' }}>{c.label}</p>
              <p className="font-serif font-semibold text-sm mb-0.5" style={{ color: '#e8e0d0' }}>{c.value}</p>
              <p className="text-xs font-body" style={{ color: 'rgba(235,235,235,0.3)' }}>{c.sub}</p>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-10 mb-16">

          {/* Form */}
          <div className="card-dark p-8 rounded-2xl">
            <h2 className="font-gothic text-3xl mb-1" style={{ color: '#e8e0d0' }}>Написать нам</h2>
            <p className="font-serif italic mb-7" style={{ color: 'rgba(235,235,235,0.35)', fontSize: '0.95rem' }}>
              Ответим в течение нескольких часов
            </p>

            {sent ? (
              <div className="text-center py-14">
                <div className="text-5xl mb-4">🩸</div>
                <h3 className="font-gothic text-3xl mb-2" style={{ color: '#e8e0d0' }}>Послание принято!</h3>
                <p className="font-serif italic text-sm mb-7" style={{ color: 'rgba(235,235,235,0.4)' }}>
                  Тьма услышала вас
                </p>
                <button onClick={() => { setSent(false); setForm({ name: '', email: '', message: '' }); }}
                  className="btn-outline-blood px-7 py-2.5 text-xs font-body uppercase"
                  style={{ letterSpacing: '0.12em' }}>
                  Написать ещё
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {[
                  { key: 'name',    label: 'Ваше имя',    placeholder: 'Имя ночного странника', type: 'text' },
                  { key: 'email',   label: 'Email',        placeholder: 'dark@example.ru',        type: 'email' },
                ].map(f => (
                  <div key={f.key}>
                    <label className="text-xs uppercase tracking-widest mb-1.5 block font-body"
                      style={{ color: 'rgba(235,235,235,0.35)', letterSpacing: '0.14em' }}>{f.label}</label>
                    <input type={f.type} required placeholder={f.placeholder}
                      value={form[f.key as 'name' | 'email']}
                      onChange={e => setForm({ ...form, [f.key]: e.target.value })}
                      className="w-full px-4 py-3 rounded text-sm outline-none font-body transition-all"
                      style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', color: '#ebebeb' }} />
                  </div>
                ))}
                <div>
                  <label className="text-xs uppercase tracking-widest mb-1.5 block font-body"
                    style={{ color: 'rgba(235,235,235,0.35)', letterSpacing: '0.14em' }}>Сообщение</label>
                  <textarea required rows={5} placeholder="Ваш вопрос или пожелание..."
                    value={form.message} onChange={e => setForm({ ...form, message: e.target.value })}
                    className="w-full px-4 py-3 rounded text-sm outline-none resize-none font-body transition-all"
                    style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', color: '#ebebeb' }} />
                </div>
                <button type="submit" className="w-full btn-blood py-3.5 text-xs font-body font-semibold uppercase blood-glow-sm"
                  style={{ letterSpacing: '0.14em' }}>
                  <span className="flex items-center justify-center gap-2">
                    <Icon name="Send" size={14} /> Отправить послание
                  </span>
                </button>
              </form>
            )}
          </div>

          {/* FAQ + socials */}
          <div className="flex flex-col gap-6">
            {/* Socials */}
            <div className="card-dark p-6 rounded-2xl">
              <h3 className="font-gothic text-2xl mb-5" style={{ color: '#e8e0d0' }}>Мы в сети</h3>
              <div className="grid grid-cols-2 gap-3">
                {socials.map(s => (
                  <div key={s.label}
                    className="flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-all"
                    style={{ border: '1px solid rgba(255,255,255,0.05)', background: 'rgba(255,255,255,0.02)' }}
                    onMouseEnter={e => (e.currentTarget.style.borderColor = 'rgba(139,0,0,0.35)')}
                    onMouseLeave={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.05)')}>
                    <span className="text-xl">{s.icon}</span>
                    <div>
                      <p className="text-sm font-body font-medium" style={{ color: '#e8e0d0' }}>{s.label}</p>
                      <p className="text-xs font-body" style={{ color: 'rgba(235,235,235,0.3)' }}>{s.handle}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* FAQ */}
            <div className="card-dark p-6 rounded-2xl">
              <h3 className="font-gothic text-2xl mb-5" style={{ color: '#e8e0d0' }}>Вопросы и ответы</h3>
              <div className="space-y-2">
                {faq.map((item, i) => (
                  <div key={i} className="rounded-lg overflow-hidden"
                    style={{ border: `1px solid ${openFaq === i ? 'rgba(139,0,0,0.35)' : 'rgba(255,255,255,0.05)'}` }}>
                    <button onClick={() => setOpenFaq(openFaq === i ? null : i)}
                      className="w-full flex items-center justify-between px-4 py-3 text-left transition-all"
                      style={{ background: openFaq === i ? 'rgba(139,0,0,0.08)' : 'transparent' }}>
                      <span className="font-body text-sm font-medium" style={{ color: '#e8e0d0' }}>{item.q}</span>
                      <Icon name={openFaq === i ? 'ChevronUp' : 'ChevronDown'} size={15}
                        className="flex-shrink-0 ml-2"
                        style={{ color: openFaq === i ? '#c0392b' : 'rgba(235,235,235,0.25)' }} />
                    </button>
                    {openFaq === i && (
                      <div className="px-4 pb-4 animate-fade-in">
                        <p className="font-body text-xs leading-relaxed" style={{ color: 'rgba(235,235,235,0.45)', lineHeight: '1.7' }}>
                          {item.a}
                        </p>
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
