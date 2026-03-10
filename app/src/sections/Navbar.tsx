import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Menu, X } from 'lucide-react';
import { getCart } from '@/data/cart';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [cartShake, setCartShake] = useState(false);

  // 更新购物车数量
  const updateCartCount = () => {
    const cart = getCart();
    setCartCount(cart.totalCount);
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // 初始化购物车数量
    updateCartCount();
    
    // 监听购物车更新事件
    const handleCartUpdate = () => {
      updateCartCount();
      setCartShake(true);
      setTimeout(() => setCartShake(false), 500);
    };
    window.addEventListener('cartUpdated', handleCartUpdate);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('cartUpdated', handleCartUpdate);
    };
  }, []);

  const navLinks = [
    { name: '首页', href: '/#hero' },
    { name: '品牌故事', href: '/#brand-story' },
    { name: '健康饮食', href: '/#healthy-concept' },
    { name: '产品系列', href: '/products' },
    { name: '客户评价', href: '/#testimonials' },
  ];

  const scrollToSection = (href: string) => {
    if (href.startsWith('/')) {
      window.location.href = href;
      return;
    }
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
          isScrolled
            ? 'py-3 px-4 md:px-8'
            : 'py-6 px-4 md:px-12'
        }`}
        style={{ transitionTimingFunction: 'var(--ease-expo)' }}
      >
        <div
          className={`mx-auto transition-all duration-700 ${
            isScrolled
              ? 'max-w-6xl glass rounded-full px-6 py-3 shadow-lg'
              : 'max-w-7xl'
          }`}
          style={{ 
            transitionTimingFunction: 'var(--ease-expo)',
            background: isScrolled ? 'rgba(16, 185, 129, 0.95)' : 'transparent'
          }}
        >
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link
              to="/"
              className="text-xl md:text-2xl font-semibold tracking-tight text-white hover:opacity-80 transition-opacity"
            >
              甜悦控糖
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  className="relative text-sm font-medium text-white/90 hover:text-white transition-colors group"
                >
                  {link.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full" />
                </Link>
              ))}
            </div>

            {/* Cart & Mobile Menu */}
            <div className="flex items-center gap-4">
              <Link
                to="/cart"
                className={`relative p-2 hover:bg-white/20 rounded-full transition-colors ${cartShake ? 'animate-bounce' : ''}`}
                aria-label="购物车"
              >
                <ShoppingCart className="w-5 h-5 text-white" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-white text-emerald-600 text-xs font-bold rounded-full flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </Link>

              {/* Mobile Menu Button */}
              <button
                className="md:hidden p-2 hover:bg-white/20 rounded-full transition-colors"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label="菜单"
              >
                {isMobileMenuOpen ? (
                  <X className="w-5 h-5 text-white" />
                ) : (
                  <Menu className="w-5 h-5 text-white" />
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 z-40 md:hidden transition-all duration-500 ${
          isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
        style={{ transitionTimingFunction: 'var(--ease-expo)' }}
      >
        <div
          className="absolute inset-0 bg-black/20 backdrop-blur-sm"
          onClick={() => setIsMobileMenuOpen(false)}
        />
        <div
          className={`absolute top-20 left-4 right-4 bg-emerald-600 rounded-2xl shadow-2xl p-6 transition-all duration-500 ${
            isMobileMenuOpen ? 'translate-y-0 opacity-100' : '-translate-y-8 opacity-0'
          }`}
          style={{ transitionTimingFunction: 'var(--ease-expo)' }}
        >
          <div className="flex flex-col gap-4">
            {navLinks.map((link, index) => (
              <Link
                key={link.name}
                to={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-lg font-medium text-white py-3 border-b border-white/20 last:border-0 hover:pl-4 transition-all"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
