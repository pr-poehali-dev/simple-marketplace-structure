import { useState } from 'react';
import Icon from '@/components/ui/icon';
import { useAuth } from '@/context/AuthContext';

interface ProfilePageProps {
  onNavigate: (page: string) => void;
}

const DELIVERY_LABELS: Record<string, string> = {
  courier: 'Курьер',
  pickup: 'Самовывоз',
  post: 'Почта России',
};

const PAYMENT_LABELS: Record<string, string> = {
  card: 'Банковская карта',
  sbp: 'СБП',
  cash: 'Наличные',
};

const STATUS_COLORS: Record<string, string> = {
  new: '#c0392b',
  processing: '#e67e22',
  shipped: '#2980b9',
  delivered: '#27ae60',
  cancelled: 'rgba(235,235,235,0.3)',
};

const STATUS_LABELS: Record<string, string> = {
  new: 'Новый',
  processing: 'В обработке',
  shipped: 'Отправлен',
  delivered: 'Доставлен',
  cancelled: 'Отменён',
};

export default function ProfilePage({ onNavigate }: ProfilePageProps) {
  const { user, orders, logout, updateProfile, refreshProfile } = useAuth();
  const [activeTab, setActiveTab] = useState<'orders' | 'settings'>('orders');
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const [form, setForm] = useState({
    name: user?.name || '',
    phone: user?.phone || '',
    city: user?.city || '',
    address: user?.address || '',
  });

  const handleSave = async () => {
    setSaving(true);
    const ok = await updateProfile(form);
    setSaving(false);
    if (ok) {
      setSaved(true);
      setEditing(false);
      setTimeout(() => setSaved(false), 3000);
    }
  };

  const handleLogout = () => {
    logout();
    onNavigate('home');
  };

  const inputBase = {
    background: 'rgba(255,255,255,0.04)',
    border: '1px solid rgba(255,255,255,0.1)',
    color: '#ebebeb',
    outline: 'none',
    borderRadius: '8px',
    padding: '11px 14px',
    fontSize: '14px',
    width: '100%',
    fontFamily: 'Montserrat, sans-serif',
  };

  const roBase = {
    ...inputBase,
    background: 'rgba(255,255,255,0.02)',
    color: 'rgba(235,235,235,0.5)',
    cursor: 'default',
  };

  return (
    <div className="min-h-screen pt-20" style={{ background: '#0a0a0a' }}>
      <div className="max-w-4xl mx-auto px-4 py-10">

        {/* Header */}
        <div className="flex items-start justify-between mb-8">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full flex items-center justify-center text-2xl font-gothic"
              style={{ background: 'rgba(139,0,0,0.2)', border: '2px solid rgba(139,0,0,0.5)', color: '#c0392b' }}>
              {user?.name ? user.name[0].toUpperCase() : '☩'}
            </div>
            <div>
              <h1 className="font-gothic text-2xl" style={{ color: '#e8e0d0' }}>{user?.name || 'Покупатель'}</h1>
              <p className="text-sm font-body mt-0.5" style={{ color: 'rgba(235,235,235,0.4)' }}>{user?.email}</p>
              {user?.created_at && (
                <p className="text-xs font-body mt-1" style={{ color: 'rgba(235,235,235,0.25)' }}>
                  С нами с {new Date(user.created_at).toLocaleDateString('ru-RU', { month: 'long', year: 'numeric' })}
                </p>
              )}
            </div>
          </div>
          <button onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 text-xs font-body uppercase tracking-wider transition-all rounded-lg"
            style={{ border: '1px solid rgba(255,255,255,0.08)', color: 'rgba(235,235,235,0.4)', letterSpacing: '0.1em' }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(139,0,0,0.4)'; e.currentTarget.style.color = '#c0392b'; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'; e.currentTarget.style.color = 'rgba(235,235,235,0.4)'; }}>
            <Icon name="LogOut" size={13} />
            Выйти
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          {[
            { label: 'Заказов', value: orders.length },
            { label: 'Потрачено', value: orders.reduce((s, o) => s + o.total, 0).toLocaleString() + ' ₽' },
            { label: 'Статус', value: orders.some(o => o.status === 'shipped') ? 'В пути' : 'Активен' },
          ].map(s => (
            <div key={s.label} className="p-4 rounded-xl text-center"
              style={{ background: '#141414', border: '1px solid rgba(255,255,255,0.06)' }}>
              <p className="font-gothic text-2xl mb-1" style={{ color: '#e8e0d0' }}>{s.value}</p>
              <p className="text-xs font-body uppercase tracking-wider" style={{ color: 'rgba(235,235,235,0.3)', letterSpacing: '0.1em' }}>{s.label}</p>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex gap-0 mb-6" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
          {(['orders', 'settings'] as const).map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)}
              className="px-6 pb-3 text-xs font-body uppercase tracking-widest relative"
              style={{ color: activeTab === tab ? '#c0392b' : 'rgba(235,235,235,0.35)', letterSpacing: '0.12em' }}>
              {tab === 'orders' ? `Мои заказы (${orders.length})` : 'Личные данные'}
              {activeTab === tab && <span className="absolute bottom-0 left-0 right-0 h-px" style={{ background: '#c0392b' }} />}
            </button>
          ))}
        </div>

        {/* Orders tab */}
        {activeTab === 'orders' && (
          <div className="space-y-4">
            {orders.length === 0 ? (
              <div className="text-center py-16">
                <div className="text-5xl mb-4">🛒</div>
                <p className="font-serif text-xl mb-2" style={{ color: 'rgba(235,235,235,0.4)' }}>Заказов пока нет</p>
                <button onClick={() => onNavigate('catalog')}
                  className="mt-4 px-6 py-2.5 text-xs font-body uppercase tracking-widest transition-all"
                  style={{ background: 'linear-gradient(135deg, #8b0000, #c0392b)', color: '#fff', borderRadius: '6px', letterSpacing: '0.1em' }}>
                  Перейти в каталог
                </button>
              </div>
            ) : (
              orders.map(order => (
                <div key={order.id} className="p-5 rounded-xl"
                  style={{ background: '#141414', border: '1px solid rgba(255,255,255,0.06)' }}>
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <p className="font-body text-sm font-semibold" style={{ color: '#e8e0d0' }}>
                        Заказ №{order.id}
                      </p>
                      <p className="text-xs font-body mt-0.5" style={{ color: 'rgba(235,235,235,0.3)' }}>
                        {new Date(order.created_at).toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' })}
                      </p>
                    </div>
                    <span className="px-3 py-1 text-xs font-body uppercase rounded-full"
                      style={{ background: `${STATUS_COLORS[order.status] || '#888'}22`, color: STATUS_COLORS[order.status] || '#888', border: `1px solid ${STATUS_COLORS[order.status] || '#888'}44` }}>
                      {STATUS_LABELS[order.status] || order.status}
                    </span>
                  </div>

                  {/* Items */}
                  <div className="space-y-1.5 mb-3">
                    {(Array.isArray(order.items) ? order.items : []).map((item, i) => (
                      <div key={i} className="flex items-center justify-between">
                        <span className="text-xs font-body" style={{ color: 'rgba(235,235,235,0.6)' }}>
                          {item.name} × {item.qty}
                        </span>
                        <span className="text-xs font-body" style={{ color: 'rgba(235,235,235,0.4)' }}>
                          {(item.price * item.qty).toLocaleString()} ₽
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center justify-between pt-3" style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                    <div className="flex items-center gap-4">
                      <span className="text-xs font-body" style={{ color: 'rgba(235,235,235,0.3)' }}>
                        {DELIVERY_LABELS[order.delivery_method] || order.delivery_method}
                      </span>
                      <span className="text-xs font-body" style={{ color: 'rgba(235,235,235,0.3)' }}>
                        {PAYMENT_LABELS[order.payment_method] || order.payment_method}
                      </span>
                    </div>
                    <span className="font-serif text-base font-semibold" style={{ color: '#e8e0d0' }}>
                      {order.total.toLocaleString()} ₽
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* Settings tab */}
        {activeTab === 'settings' && (
          <div className="max-w-lg">
            <div className="space-y-4 mb-6">
              <div>
                <p className="text-xs uppercase tracking-widest font-body mb-2"
                  style={{ color: 'rgba(235,235,235,0.3)', letterSpacing: '0.15em' }}>Email</p>
                <input value={user?.email || ''} readOnly style={roBase} />
              </div>

              <div>
                <p className="text-xs uppercase tracking-widest font-body mb-2"
                  style={{ color: 'rgba(235,235,235,0.3)', letterSpacing: '0.15em' }}>Имя</p>
                <input
                  value={form.name}
                  onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                  placeholder="Ваше имя"
                  readOnly={!editing}
                  style={editing ? inputBase : roBase}
                  onFocus={e => editing && (e.target.style.borderColor = 'rgba(139,0,0,0.6)')}
                  onBlur={e => (e.target.style.borderColor = 'rgba(255,255,255,0.1)')}
                />
              </div>

              <div>
                <p className="text-xs uppercase tracking-widest font-body mb-2"
                  style={{ color: 'rgba(235,235,235,0.3)', letterSpacing: '0.15em' }}>Телефон</p>
                <input
                  value={form.phone}
                  onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
                  placeholder="+7 (000) 000-00-00"
                  readOnly={!editing}
                  style={editing ? inputBase : roBase}
                  onFocus={e => editing && (e.target.style.borderColor = 'rgba(139,0,0,0.6)')}
                  onBlur={e => (e.target.style.borderColor = 'rgba(255,255,255,0.1)')}
                />
              </div>

              <div>
                <p className="text-xs uppercase tracking-widest font-body mb-2"
                  style={{ color: 'rgba(235,235,235,0.3)', letterSpacing: '0.15em' }}>Город</p>
                <input
                  value={form.city}
                  onChange={e => setForm(f => ({ ...f, city: e.target.value }))}
                  placeholder="Москва"
                  readOnly={!editing}
                  style={editing ? inputBase : roBase}
                  onFocus={e => editing && (e.target.style.borderColor = 'rgba(139,0,0,0.6)')}
                  onBlur={e => (e.target.style.borderColor = 'rgba(255,255,255,0.1)')}
                />
              </div>

              <div>
                <p className="text-xs uppercase tracking-widest font-body mb-2"
                  style={{ color: 'rgba(235,235,235,0.3)', letterSpacing: '0.15em' }}>Адрес доставки</p>
                <textarea
                  value={form.address}
                  onChange={e => setForm(f => ({ ...f, address: e.target.value }))}
                  placeholder="Улица, дом, квартира"
                  readOnly={!editing}
                  rows={2}
                  style={{ ...editing ? inputBase : roBase, resize: 'none' }}
                  onFocus={e => editing && (e.target.style.borderColor = 'rgba(139,0,0,0.6)')}
                  onBlur={e => (e.target.style.borderColor = 'rgba(255,255,255,0.1)')}
                />
              </div>
            </div>

            {saved && (
              <div className="mb-4 px-4 py-2.5 rounded-lg text-center"
                style={{ background: 'rgba(39,174,96,0.1)', border: '1px solid rgba(39,174,96,0.3)' }}>
                <p className="text-xs font-body" style={{ color: '#27ae60' }}>Данные успешно сохранены</p>
              </div>
            )}

            <div className="flex gap-3">
              {!editing ? (
                <button onClick={() => setEditing(true)}
                  className="flex items-center gap-2 px-6 py-3 text-xs font-body uppercase tracking-wider transition-all rounded-lg"
                  style={{ background: 'linear-gradient(135deg, #8b0000, #c0392b)', color: '#fff', letterSpacing: '0.1em' }}>
                  <Icon name="Pencil" size={13} />
                  Редактировать
                </button>
              ) : (
                <>
                  <button onClick={handleSave} disabled={saving}
                    className="flex items-center gap-2 px-6 py-3 text-xs font-body uppercase tracking-wider transition-all rounded-lg"
                    style={{ background: 'linear-gradient(135deg, #8b0000, #c0392b)', color: '#fff', letterSpacing: '0.1em', opacity: saving ? 0.6 : 1 }}>
                    <Icon name="Check" size={13} />
                    {saving ? 'Сохраняю...' : 'Сохранить'}
                  </button>
                  <button onClick={() => setEditing(false)}
                    className="px-5 py-3 text-xs font-body uppercase tracking-wider transition-all rounded-lg"
                    style={{ border: '1px solid rgba(255,255,255,0.1)', color: 'rgba(235,235,235,0.4)', letterSpacing: '0.1em' }}>
                    Отмена
                  </button>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
