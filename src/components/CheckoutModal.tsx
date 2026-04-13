import { useEffect, useState } from 'react';
import Icon from '@/components/ui/icon';
import { useCart } from '@/context/CartContext';

interface CheckoutModalProps {
  onClose: () => void;
}

type Step = 'delivery' | 'payment' | 'success';

const DELIVERY_METHODS = [
  { id: 'courier', label: 'Курьер', desc: 'До двери, 1–3 дня', price: 350, icon: 'Truck' },
  { id: 'pickup', label: 'Самовывоз', desc: 'Москва, бесплатно', price: 0, icon: 'MapPin' },
  { id: 'post', label: 'Почта России', desc: 'По всей России, 5–14 дней', price: 200, icon: 'Package' },
];

const PAYMENT_METHODS = [
  { id: 'card', label: 'Банковская карта', icon: 'CreditCard' },
  { id: 'sbp', label: 'СБП (по номеру телефона)', icon: 'Smartphone' },
  { id: 'cash', label: 'Наличные при получении', icon: 'Banknote' },
];

export default function CheckoutModal({ onClose }: CheckoutModalProps) {
  const { items, total, clear } = useCart();
  const [step, setStep] = useState<Step>('delivery');

  const [delivery, setDelivery] = useState('courier');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('');
  const [address, setAddress] = useState('');
  const [comment, setComment] = useState('');
  const [payment, setPayment] = useState('card');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const deliveryPrice = DELIVERY_METHODS.find(d => d.id === delivery)?.price ?? 0;
  const finalTotal = total + deliveryPrice;

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [onClose]);

  const validateDelivery = () => {
    const e: Record<string, string> = {};
    if (!name.trim()) e.name = 'Укажите имя';
    if (!phone.trim()) e.phone = 'Укажите телефон';
    if (delivery !== 'pickup' && !city.trim()) e.city = 'Укажите город';
    if (delivery !== 'pickup' && !address.trim()) e.address = 'Укажите адрес';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleDeliveryNext = () => {
    if (validateDelivery()) setStep('payment');
  };

  const handleOrder = () => {
    clear();
    setStep('success');
  };

  const inputStyle = (field: string) => ({
    background: 'rgba(255,255,255,0.04)',
    border: `1px solid ${errors[field] ? 'rgba(139,0,0,0.7)' : 'rgba(255,255,255,0.1)'}`,
    color: '#ebebeb',
    outline: 'none',
    borderRadius: '6px',
    padding: '10px 14px',
    fontSize: '13px',
    width: '100%',
    fontFamily: 'Montserrat, sans-serif',
    transition: 'border-color 0.2s',
  });

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: 'rgba(0,0,0,0.9)', backdropFilter: 'blur(10px)' }}
      onClick={e => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div
        className="relative w-full max-w-2xl max-h-[92vh] overflow-y-auto rounded-2xl animate-fade-up"
        style={{ background: '#141414', border: '1px solid rgba(139,0,0,0.35)', boxShadow: '0 40px 100px rgba(0,0,0,0.95)' }}
      >
        {/* Close */}
        <button onClick={onClose}
          className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full flex items-center justify-center transition-all"
          style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}>
          <Icon name="X" size={16} style={{ color: 'rgba(235,235,235,0.6)' }} />
        </button>

        {step !== 'success' && (
          <div className="px-8 pt-8 pb-0">
            <p className="text-xs uppercase tracking-widest font-body mb-1" style={{ color: '#c0392b', letterSpacing: '0.2em' }}>Оформление</p>
            <h2 className="font-gothic text-3xl mb-6" style={{ color: '#e8e0d0' }}>
              {step === 'delivery' ? 'Доставка' : 'Оплата'}
            </h2>

            {/* Steps */}
            <div className="flex items-center gap-3 mb-8">
              {(['delivery', 'payment'] as const).map((s, i) => (
                <div key={s} className="flex items-center gap-3">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold font-body"
                      style={{
                        background: step === s ? '#8b0000' : s === 'payment' && step === 'success' ? '#8b0000' : 'rgba(255,255,255,0.06)',
                        color: step === s ? '#fff' : 'rgba(235,235,235,0.3)',
                        border: `1px solid ${step === s ? '#8b0000' : 'rgba(255,255,255,0.1)'}`,
                      }}>
                      {i + 1}
                    </div>
                    <span className="text-xs font-body uppercase tracking-wider"
                      style={{ color: step === s ? '#e8e0d0' : 'rgba(235,235,235,0.3)', letterSpacing: '0.1em' }}>
                      {s === 'delivery' ? 'Доставка' : 'Оплата'}
                    </span>
                  </div>
                  {i === 0 && <div className="w-8 h-px" style={{ background: 'rgba(255,255,255,0.1)' }} />}
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="px-8 pb-8">
          {/* STEP 1: DELIVERY */}
          {step === 'delivery' && (
            <div className="space-y-6">
              {/* Delivery method */}
              <div>
                <p className="text-xs uppercase tracking-widest font-body mb-3" style={{ color: 'rgba(235,235,235,0.35)', letterSpacing: '0.15em' }}>Способ доставки</p>
                <div className="space-y-2">
                  {DELIVERY_METHODS.map(d => (
                    <button key={d.id} onClick={() => setDelivery(d.id)}
                      className="w-full flex items-center gap-4 p-4 rounded-xl text-left transition-all"
                      style={{
                        background: delivery === d.id ? 'rgba(139,0,0,0.12)' : 'rgba(255,255,255,0.03)',
                        border: `1px solid ${delivery === d.id ? 'rgba(139,0,0,0.5)' : 'rgba(255,255,255,0.07)'}`,
                      }}>
                      <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
                        style={{ background: delivery === d.id ? 'rgba(139,0,0,0.2)' : 'rgba(255,255,255,0.05)' }}>
                        <Icon name={d.icon} size={16} style={{ color: delivery === d.id ? '#c0392b' : 'rgba(235,235,235,0.4)' }} />
                      </div>
                      <div className="flex-1">
                        <p className="font-body text-sm font-medium" style={{ color: '#e8e0d0' }}>{d.label}</p>
                        <p className="font-body text-xs mt-0.5" style={{ color: 'rgba(235,235,235,0.35)' }}>{d.desc}</p>
                      </div>
                      <span className="font-body text-sm font-semibold" style={{ color: d.price === 0 ? '#4caf50' : '#e8e0d0' }}>
                        {d.price === 0 ? 'Бесплатно' : `${d.price} ₽`}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Contact info */}
              <div>
                <p className="text-xs uppercase tracking-widest font-body mb-3" style={{ color: 'rgba(235,235,235,0.35)', letterSpacing: '0.15em' }}>Контактные данные</p>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <input placeholder="Ваше имя *" value={name} onChange={e => setName(e.target.value)} style={inputStyle('name')}
                      onFocus={e => (e.target.style.borderColor = 'rgba(139,0,0,0.5)')}
                      onBlur={e => (e.target.style.borderColor = errors.name ? 'rgba(139,0,0,0.7)' : 'rgba(255,255,255,0.1)')} />
                    {errors.name && <p className="text-xs mt-1 font-body" style={{ color: '#c0392b' }}>{errors.name}</p>}
                  </div>
                  <div>
                    <input placeholder="Телефон *" value={phone} onChange={e => setPhone(e.target.value)} style={inputStyle('phone')}
                      onFocus={e => (e.target.style.borderColor = 'rgba(139,0,0,0.5)')}
                      onBlur={e => (e.target.style.borderColor = errors.phone ? 'rgba(139,0,0,0.7)' : 'rgba(255,255,255,0.1)')} />
                    {errors.phone && <p className="text-xs mt-1 font-body" style={{ color: '#c0392b' }}>{errors.phone}</p>}
                  </div>
                </div>
              </div>

              {/* Address */}
              {delivery !== 'pickup' && (
                <div>
                  <p className="text-xs uppercase tracking-widest font-body mb-3" style={{ color: 'rgba(235,235,235,0.35)', letterSpacing: '0.15em' }}>Адрес доставки</p>
                  <div className="space-y-3">
                    <div>
                      <input placeholder="Город *" value={city} onChange={e => setCity(e.target.value)} style={inputStyle('city')}
                        onFocus={e => (e.target.style.borderColor = 'rgba(139,0,0,0.5)')}
                        onBlur={e => (e.target.style.borderColor = errors.city ? 'rgba(139,0,0,0.7)' : 'rgba(255,255,255,0.1)')} />
                      {errors.city && <p className="text-xs mt-1 font-body" style={{ color: '#c0392b' }}>{errors.city}</p>}
                    </div>
                    <div>
                      <input placeholder="Улица, дом, квартира *" value={address} onChange={e => setAddress(e.target.value)} style={inputStyle('address')}
                        onFocus={e => (e.target.style.borderColor = 'rgba(139,0,0,0.5)')}
                        onBlur={e => (e.target.style.borderColor = errors.address ? 'rgba(139,0,0,0.7)' : 'rgba(255,255,255,0.1)')} />
                      {errors.address && <p className="text-xs mt-1 font-body" style={{ color: '#c0392b' }}>{errors.address}</p>}
                    </div>
                    <textarea placeholder="Комментарий к заказу (необязательно)" value={comment} onChange={e => setComment(e.target.value)}
                      rows={2}
                      style={{ ...inputStyle('comment'), resize: 'none' }} />
                  </div>
                </div>
              )}

              {delivery === 'pickup' && (
                <div className="p-4 rounded-xl" style={{ background: 'rgba(139,0,0,0.07)', border: '1px solid rgba(139,0,0,0.2)' }}>
                  <p className="font-body text-sm" style={{ color: 'rgba(235,235,235,0.6)' }}>
                    <Icon name="MapPin" size={13} className="inline mr-2" style={{ color: '#c0392b' }} />
                    Москва, ул. Арбат, 10. Пн–Вс 11:00–21:00
                  </p>
                </div>
              )}

              <button onClick={handleDeliveryNext}
                className="w-full btn-blood py-4 text-sm font-body font-semibold uppercase blood-glow-sm"
                style={{ letterSpacing: '0.12em' }}>
                <span className="flex items-center justify-center gap-2">
                  Далее — оплата <Icon name="ArrowRight" size={15} />
                </span>
              </button>
            </div>
          )}

          {/* STEP 2: PAYMENT */}
          {step === 'payment' && (
            <div className="space-y-6">
              {/* Order summary */}
              <div className="p-4 rounded-xl" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}>
                <p className="text-xs uppercase tracking-widest font-body mb-3" style={{ color: 'rgba(235,235,235,0.35)', letterSpacing: '0.15em' }}>Ваш заказ</p>
                <div className="space-y-2 mb-3">
                  {items.map(({ product, qty }) => (
                    <div key={product.id} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <img src={product.image} alt={product.name} className="w-8 h-8 rounded object-cover" />
                        <span className="font-body text-xs" style={{ color: 'rgba(235,235,235,0.6)' }}>
                          {product.name} × {qty}
                        </span>
                      </div>
                      <span className="font-body text-xs font-semibold" style={{ color: '#e8e0d0' }}>
                        {(product.price * qty).toLocaleString()} ₽
                      </span>
                    </div>
                  ))}
                </div>
                <div className="pt-2 space-y-1" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                  <div className="flex justify-between">
                    <span className="font-body text-xs" style={{ color: 'rgba(235,235,235,0.4)' }}>Доставка</span>
                    <span className="font-body text-xs" style={{ color: deliveryPrice === 0 ? '#4caf50' : 'rgba(235,235,235,0.6)' }}>
                      {deliveryPrice === 0 ? 'Бесплатно' : `${deliveryPrice} ₽`}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-body text-sm font-semibold" style={{ color: '#e8e0d0' }}>Итого</span>
                    <span className="font-serif text-lg font-semibold" style={{ color: '#e8e0d0' }}>{finalTotal.toLocaleString()} ₽</span>
                  </div>
                </div>
              </div>

              {/* Payment method */}
              <div>
                <p className="text-xs uppercase tracking-widest font-body mb-3" style={{ color: 'rgba(235,235,235,0.35)', letterSpacing: '0.15em' }}>Способ оплаты</p>
                <div className="space-y-2">
                  {PAYMENT_METHODS.map(p => (
                    <button key={p.id} onClick={() => setPayment(p.id)}
                      className="w-full flex items-center gap-4 p-4 rounded-xl text-left transition-all"
                      style={{
                        background: payment === p.id ? 'rgba(139,0,0,0.12)' : 'rgba(255,255,255,0.03)',
                        border: `1px solid ${payment === p.id ? 'rgba(139,0,0,0.5)' : 'rgba(255,255,255,0.07)'}`,
                      }}>
                      <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
                        style={{ background: payment === p.id ? 'rgba(139,0,0,0.2)' : 'rgba(255,255,255,0.05)' }}>
                        <Icon name={p.icon} size={16} style={{ color: payment === p.id ? '#c0392b' : 'rgba(235,235,235,0.4)' }} />
                      </div>
                      <span className="font-body text-sm" style={{ color: '#e8e0d0' }}>{p.label}</span>
                      {payment === p.id && (
                        <Icon name="Check" size={15} className="ml-auto" style={{ color: '#c0392b' }} />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex gap-3">
                <button onClick={() => setStep('delivery')}
                  className="flex-shrink-0 px-5 py-4 rounded-xl text-xs font-body uppercase tracking-wider transition-all"
                  style={{ border: '1px solid rgba(255,255,255,0.1)', color: 'rgba(235,235,235,0.4)', letterSpacing: '0.1em' }}
                  onMouseEnter={e => (e.currentTarget.style.borderColor = 'rgba(139,0,0,0.4)')}
                  onMouseLeave={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)')}>
                  <Icon name="ArrowLeft" size={14} />
                </button>
                <button onClick={handleOrder}
                  className="flex-1 btn-blood py-4 text-sm font-body font-semibold uppercase blood-glow-sm"
                  style={{ letterSpacing: '0.12em' }}>
                  <span className="flex items-center justify-center gap-2">
                    <Icon name="ShoppingBag" size={15} /> Подтвердить заказ
                  </span>
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: SUCCESS */}
          {step === 'success' && (
            <div className="text-center py-12 px-4">
              <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6"
                style={{ background: 'rgba(139,0,0,0.15)', border: '1px solid rgba(139,0,0,0.4)' }}>
                <Icon name="Check" size={36} style={{ color: '#c0392b' }} />
              </div>
              <h2 className="font-gothic text-4xl mb-3" style={{ color: '#e8e0d0' }}>Заказ принят</h2>
              <p className="font-serif italic text-lg mb-2" style={{ color: '#c0392b' }}>Тьма спешит к тебе</p>
              <p className="font-body text-sm mb-8" style={{ color: 'rgba(235,235,235,0.4)', lineHeight: '1.7' }}>
                Мы свяжемся с тобой по телефону в течение часа для подтверждения заказа.
              </p>
              <button onClick={onClose} className="btn-blood px-10 py-3.5 text-xs font-body uppercase"
                style={{ letterSpacing: '0.14em' }}>
                Закрыть
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}