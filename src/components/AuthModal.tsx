import { useEffect, useState } from 'react';
import Icon from '@/components/ui/icon';
import { useAuth } from '@/context/AuthContext';

interface AuthModalProps {
  onClose: () => void;
  onSuccess?: () => void;
}

export default function AuthModal({ onClose, onSuccess }: AuthModalProps) {
  const { login, register, loading } = useAuth();
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [showPass, setShowPass] = useState(false);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [onClose]);

  const handleSubmit = async () => {
    setError('');
    if (!email.trim() || !password.trim()) { setError('Заполните все поля'); return; }
    if (mode === 'register' && !name.trim()) { setError('Укажите ваше имя'); return; }

    const err = mode === 'login'
      ? await login(email, password)
      : await register(email, password, name);

    if (err) { setError(err); return; }
    onSuccess?.();
    onClose();
  };

  const inputBase = {
    background: 'rgba(255,255,255,0.04)',
    border: '1px solid rgba(255,255,255,0.1)',
    color: '#ebebeb',
    outline: 'none',
    borderRadius: '8px',
    padding: '12px 14px',
    fontSize: '14px',
    width: '100%',
    fontFamily: 'Montserrat, sans-serif',
    transition: 'border-color 0.2s',
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: 'rgba(0,0,0,0.92)', backdropFilter: 'blur(10px)' }}
      onClick={e => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div
        className="relative w-full max-w-md rounded-2xl animate-fade-up"
        style={{ background: '#141414', border: '1px solid rgba(139,0,0,0.35)', boxShadow: '0 40px 100px rgba(0,0,0,0.95), 0 0 60px rgba(139,0,0,0.1)' }}
      >
        <button onClick={onClose}
          className="absolute top-4 right-4 w-9 h-9 rounded-full flex items-center justify-center"
          style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}>
          <Icon name="X" size={16} style={{ color: 'rgba(235,235,235,0.6)' }} />
        </button>

        <div className="p-8">
          {/* Лого */}
          <div className="flex items-center gap-2 mb-6">
            <span className="text-2xl font-gothic" style={{ color: '#c0392b' }}>☩</span>
            <span className="font-gothic text-xl" style={{ color: '#e8e0d0', letterSpacing: '0.1em' }}>DARKWARE</span>
          </div>

          <p className="text-xs uppercase tracking-widest font-body mb-1" style={{ color: '#c0392b', letterSpacing: '0.2em' }}>
            {mode === 'login' ? 'Вход' : 'Регистрация'}
          </p>
          <h2 className="font-gothic text-2xl mb-6" style={{ color: '#e8e0d0' }}>
            {mode === 'login' ? 'Войти в аккаунт' : 'Создать аккаунт'}
          </h2>

          {/* Tabs */}
          <div className="flex gap-0 mb-6" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
            {(['login', 'register'] as const).map(m => (
              <button key={m} onClick={() => { setMode(m); setError(''); }}
                className="px-5 pb-3 text-xs font-body uppercase tracking-widest relative"
                style={{ color: mode === m ? '#c0392b' : 'rgba(235,235,235,0.35)', letterSpacing: '0.12em' }}>
                {m === 'login' ? 'Вход' : 'Регистрация'}
                {mode === m && <span className="absolute bottom-0 left-0 right-0 h-px" style={{ background: '#c0392b' }} />}
              </button>
            ))}
          </div>

          <div className="space-y-3">
            {mode === 'register' && (
              <input
                placeholder="Ваше имя"
                value={name}
                onChange={e => setName(e.target.value)}
                style={inputBase}
                onFocus={e => (e.target.style.borderColor = 'rgba(139,0,0,0.6)')}
                onBlur={e => (e.target.style.borderColor = 'rgba(255,255,255,0.1)')}
              />
            )}
            <input
              placeholder="Email"
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              style={inputBase}
              onFocus={e => (e.target.style.borderColor = 'rgba(139,0,0,0.6)')}
              onBlur={e => (e.target.style.borderColor = 'rgba(255,255,255,0.1)')}
            />
            <div className="relative">
              <input
                placeholder="Пароль"
                type={showPass ? 'text' : 'password'}
                value={password}
                onChange={e => setPassword(e.target.value)}
                style={{ ...inputBase, paddingRight: '42px' }}
                onFocus={e => (e.target.style.borderColor = 'rgba(139,0,0,0.6)')}
                onBlur={e => (e.target.style.borderColor = 'rgba(255,255,255,0.1)')}
                onKeyDown={e => { if (e.key === 'Enter') handleSubmit(); }}
              />
              <button onClick={() => setShowPass(!showPass)}
                className="absolute right-3 top-1/2 -translate-y-1/2"
                style={{ color: 'rgba(235,235,235,0.3)' }}>
                <Icon name={showPass ? 'EyeOff' : 'Eye'} size={15} />
              </button>
            </div>

            {error && (
              <p className="text-xs font-body py-2 px-3 rounded-lg"
                style={{ color: '#c0392b', background: 'rgba(139,0,0,0.1)', border: '1px solid rgba(139,0,0,0.25)' }}>
                {error}
              </p>
            )}

            <button
              onClick={handleSubmit}
              disabled={loading}
              className="w-full py-3.5 text-sm font-body font-semibold uppercase transition-all mt-2"
              style={{
                background: 'linear-gradient(135deg, #8b0000, #c0392b)',
                color: '#fff',
                borderRadius: '6px',
                letterSpacing: '0.1em',
                opacity: loading ? 0.6 : 1,
                boxShadow: '0 0 20px rgba(192,57,43,0.3)',
              }}>
              {loading ? 'Подождите...' : mode === 'login' ? 'Войти' : 'Создать аккаунт'}
            </button>
          </div>

          <p className="text-xs font-body text-center mt-5" style={{ color: 'rgba(235,235,235,0.3)' }}>
            {mode === 'login' ? 'Нет аккаунта? ' : 'Уже есть аккаунт? '}
            <button onClick={() => { setMode(mode === 'login' ? 'register' : 'login'); setError(''); }}
              style={{ color: '#c0392b' }}>
              {mode === 'login' ? 'Зарегистрироваться' : 'Войти'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
