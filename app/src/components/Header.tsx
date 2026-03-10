import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, User, ChevronDown } from 'lucide-react';
import { Cart } from './Cart';
import { getCurrentUser, logout, isSessionValid } from '@/data/auth';
import { toast } from 'sonner';

const navItems = [
  { label: '首页', href: '/' },
  { label: '产品中心', href: '/products' },
  { label: '关于我们', href: '/about' },
  { label: '分销合作', href: '/distribution' },
  { label: '联系我们', href: '/contact' },
];

export const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const user = getCurrentUser();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Check session validity periodically
    const interval = setInterval(() => {
      if (user && !isSessionValid()) {
        toast.info('登录已过期，请重新登录');
        navigate('/');
      }
    }, 60000); // Check every minute

    return () => clearInterval(interval);
  }, [user, navigate]);

  const handleLogout = () => {
    logout();
    toast.success('已退出登录');
    navigate('/');
    setUserMenuOpen(false);
  };

  const isActive = (href: string) => {
    if (href === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(href);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-sm'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <span className={`text-xl lg:text-2xl font-bold transition-colors ${
              isScrolled ? 'text-stone-800' : 'text-stone-800'
            }`}>
              米黛尔
            </span>
            <span className={`text-xs hidden sm:inline transition-colors ${
              isScrolled ? 'text-stone-500' : 'text-stone-500'
            }`}>
              甜蜜无负担
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className={`text-sm font-medium transition-colors relative group ${
                  isActive(item.href)
                    ? 'text-emerald-600'
                    : isScrolled
                    ? 'text-stone-700 hover:text-emerald-600'
                    : 'text-stone-700 hover:text-emerald-600'
                }`}
              >
                {item.label}
                <span
                  className={`absolute -bottom-1 left-0 w-0 h-0.5 bg-emerald-600 transition-all group-hover:w-full ${
                    isActive(item.href) ? 'w-full' : ''
                  }`}
                />
              </Link>
            ))}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-2 lg:gap-4">
            {/* Cart */}
            <Cart isOpen={cartOpen} onOpenChange={setCartOpen} />

            {/* User Menu */}
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center gap-1 p-2 hover:bg-stone-100 rounded-full transition-colors"
                >
                  <User className="w-5 h-5 text-stone-700" />
                  <span className="hidden sm:inline text-sm text-stone-700">{user.name}</span>
                  <ChevronDown className="w-4 h-4 text-stone-500" />
                </button>
                
                {userMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border py-1">
                    {user.role === 'admin' && (
                      <Link
                        to="/admin"
                        className="block px-4 py-2 text-sm text-stone-700 hover:bg-stone-50"
                        onClick={() => setUserMenuOpen(false)}
                      >
                        管理后台
                      </Link>
                    )}
                    {user.role === 'distributor' && (
                      <Link
                        to="/distributor"
                        className="block px-4 py-2 text-sm text-stone-700 hover:bg-stone-50"
                        onClick={() => setUserMenuOpen(false)}
                      >
                        分销中心
                      </Link>
                    )}
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-stone-50"
                    >
                      退出登录
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                to="/login"
                className="p-2 hover:bg-stone-100 rounded-full transition-colors"
              >
                <User className="w-5 h-5 text-stone-700" />
              </Link>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 hover:bg-stone-100 rounded-full transition-colors"
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5 text-stone-700" />
              ) : (
                <Menu className="w-5 h-5 text-stone-700" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-t">
          <nav className="flex flex-col py-4">
            {navItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`px-4 py-3 text-sm font-medium transition-colors ${
                  isActive(item.href)
                    ? 'text-emerald-600 bg-emerald-50'
                    : 'text-stone-700 hover:bg-stone-50'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
