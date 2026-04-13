import { useState } from 'react';
import Icon from '@/components/ui/icon';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import CartDrawer from '@/components/CartDrawer';
import AuthModal from '@/components/AuthModal';

interface NavbarProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

export default function Navbar({ currentPage, onNavigate }: NavbarProps) {
  const [menuOpen, setMenuOpen]   = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [cartOpen, setCartOpen]   = useState(false);
  const [authOpen, setAuthOpen]   = useState(false);
  const { count } = useCart();
  const { user } = useAuth();

  const navItems = [
    { id: 'home',     label: 'Главная' },
    { id: 'catalog',  label: 'Каталог' },
    { id: 'contacts', label: 'Контакты' },
  ];

  return (
    <>
      {cartOpen && <CartDrawer onClose={() => setCartOpen(false)} />}
      {authOpen && <AuthModal onClose={() => setAuthOpen(false)} onSuccess={() => onNavigate('profile')} />}

      <nav className="fixed top-0 left-0 right-0 z-40"
        style={{ background: 'rgba(10,10,10,0.93)', backdropFilter: 'blur(16px)', borderBottom: '1px solid rgba(139,0,0,0.25)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">

            {/* Logo */}
            <button onClick={() => onNavigate('home')} className="flex items-center gap-3">
              <span className="text-3xl font-gothic animate-flicker" style={{ color: '#c0392b', lineHeight: 1 }}>☩</span>
              <span className="font-gothic text-2xl" style={{ color: '#e8e0d0', letterSpacing: '0.12em' }}>DARKWARE</span>
            </button>

            {/* Desktop nav */}
            <div className="hidden md:flex items-center gap-1">
              {navItems.map(item => (
                <button key={item.id} onClick={() => onNavigate(item.id)}
                  className="relative px-5 py-2 text-xs font-body font-medium uppercase transition-all duration-200"
                  style={{ color: currentPage === item.id ? '#c0392b' : 'rgba(235,235,235,0.5)', letterSpacing: '0.12em' }}>
                  {item.label}
                  {currentPage === item.id && (
                    <span className="absolute bottom-0 left-5 right-5 h-px" style={{ background: '#c0392b' }} />
                  )}
                </button>
              ))}
            </div>

            {/* Right */}
            <div className="flex items-center gap-2">
              {/* Search */}
              <div className="relative hidden md:block">
                {searchOpen ? (
                  <div className="flex items-center gap-2 animate-scale-in">
                    <input autoFocus type="text" value={searchQuery}
                      onChange={e => setSearchQuery(e.target.value)}
                      placeholder="Поиск украшений..."
                      className="w-44 px-3 py-1.5 text-sm outline-none rounded"
                      style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(139,0,0,0.4)', color: '#ebebeb' }}
                      onKeyDown={e => {
                        if (e.key === 'Enter') { onNavigate('catalog'); setSearchOpen(false); }
                        if (e.key === 'Escape') setSearchOpen(false);
                      }} />
                    <button onClick={() => setSearchOpen(false)} style={{ color: 'rgba(255,255,255,0.35)' }}>
                      <Icon name="X" size={15} />
                    </button>
                  </div>
                ) : (
                  <button onClick={() => setSearchOpen(true)} className="p-2 transition-colors"
                    style={{ color: 'rgba(235,235,235,0.4)' }}
                    onMouseEnter={e => (e.currentTarget.style.color = '#c0392b')}
                    onMouseLeave={e => (e.currentTarget.style.color = 'rgba(235,235,235,0.4)')}>
                    <Icon name="Search" size={17} />
                  </button>
                )}
              </div>

              {/* Auth button */}
              {user ? (
                <button onClick={() => onNavigate('profile')}
                  className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all"
                  style={{
                    border: `1px solid ${currentPage === 'profile' ? 'rgba(139,0,0,0.5)' : 'rgba(255,255,255,0.1)'}`,
                    color: currentPage === 'profile' ? '#c0392b' : 'rgba(235,235,235,0.5)',
                    background: currentPage === 'profile' ? 'rgba(139,0,0,0.08)' : 'transparent',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(139,0,0,0.5)'; e.currentTarget.style.color = '#c0392b'; }}
                  onMouseLeave={e => {
                    e.currentTarget.style.borderColor = currentPage === 'profile' ? 'rgba(139,0,0,0.5)' : 'rgba(255,255,255,0.1)';
                    e.currentTarget.style.color = currentPage === 'profile' ? '#c0392b' : 'rgba(235,235,235,0.5)';
                  }}>
                  <div className="w-5 h-5 rounded-full flex items-center justify-center text-xs font-gothic"
                    style={{ background: 'rgba(139,0,0,0.3)', color: '#c0392b' }}>
                    {user.name ? user.name[0].toUpperCase() : '☩'}
                  </div>
                  <span className="text-xs font-body" style={{ maxWidth: '80px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {user.name || user.email}
                  </span>
                </button>
              ) : (
                <button onClick={() => setAuthOpen(true)}
                  className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all text-xs font-body"
                  style={{ border: '1px solid rgba(139,0,0,0.4)', color: 'rgba(235,235,235,0.6)', letterSpacing: '0.08em' }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = '#c0392b'; e.currentTarget.style.color = '#c0392b'; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(139,0,0,0.4)'; e.currentTarget.style.color = 'rgba(235,235,235,0.6)'; }}>
                  <Icon name="User" size={14} />
                  Войти
                </button>
              )}

              {/* Cart button */}
              <button onClick={() => setCartOpen(true)}
                className="relative p-2 transition-colors"
                style={{ color: count > 0 ? '#c0392b' : 'rgba(235,235,235,0.4)' }}
                onMouseEnter={e => (e.currentTarget.style.color = '#c0392b')}
                onMouseLeave={e => (e.currentTarget.style.color = count > 0 ? '#c0392b' : 'rgba(235,235,235,0.4)')}>
                <Icon name="ShoppingBag" size={17} />
                {count > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 min-w-[16px] h-4 px-1 rounded-full text-white flex items-center justify-center font-bold"
                    style={{ background: '#8b0000', fontSize: '9px' }}>
                    {count}
                  </span>
                )}
              </button>

              <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden p-2"
                style={{ color: 'rgba(235,235,235,0.5)' }}>
                <Icon name={menuOpen ? 'X' : 'Menu'} size={19} />
              </button>
            </div>
          </div>
        </div>

        {menuOpen && (
          <div className="md:hidden py-4 px-6 animate-fade-up"
            style={{ background: 'rgba(10,10,10,0.98)', borderTop: '1px solid rgba(139,0,0,0.2)' }}>
            {navItems.map(item => (
              <button key={item.id} onClick={() => { onNavigate(item.id); setMenuOpen(false); }}
                className="block w-full text-left py-3 text-xs uppercase tracking-widest font-body font-medium transition-colors"
                style={{ color: currentPage === item.id ? '#c0392b' : 'rgba(235,235,235,0.5)', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                {item.label}
              </button>
            ))}
          </div>
        )}
      </nav>
    </>
  );
}