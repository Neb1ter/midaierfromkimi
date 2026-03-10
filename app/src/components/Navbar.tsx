import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingBag, Menu, X, ChevronDown, Handshake } from 'lucide-react';

interface NavItem {
  name: string;
  href: string;
  children?: { name: string; href: string; description?: string }[];
}

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
    setActiveDropdown(null);
  }, [location]);

  const navItems: NavItem[] = [
    { name: '首页', href: '/' },
    {
      name: '产品系列',
      href: '/products',
      children: [
        { name: '全部产品', href: '/products', description: '浏览所有控糖烘焙产品' },
        { name: '生酮系列', href: '/products?category=keto', description: '专为生酮饮食设计' },
        { name: '常态化系列', href: '/products?category=regular', description: '适合大多数人口味' },
        { name: '新品上市', href: '/products?filter=new', description: '最新推出的产品' },
        { name: '畅销推荐', href: '/products?filter=bestseller', description: '最受欢迎的精选' },
      ],
    },
    { name: '关于我们', href: '/about' },
    { name: '分销合作', href: '/distribution' },
    { name: '联系我们', href: '/contact' },
  ];

  const isActive = (href: string) => {
    if (href === '/') return location.pathname === '/';
    return location.pathname.startsWith(href);
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? 'nav-glass border-b border-[#d2d2d7]' : 'bg-transparent'
        }`}
      >
        <div className="max-w-[1440px] mx-auto px-6 md:px-12">
          <div className="flex items-center justify-between h-14 md:h-16">
            {/* Logo */}
            <Link
              to="/"
              className="text-xl md:text-2xl font-semibold tracking-tight text-[#1d1d1f] hover:opacity-80 transition-opacity"
            >
              米黛尔
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-1">
              {navItems.map((item) => (
                <div
                  key={item.name}
                  className="relative"
                  onMouseEnter={() => item.children && setActiveDropdown(item.name)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <Link
                    to={item.href}
                    className={`flex items-center gap-1 px-4 py-2 text-sm font-medium rounded-full transition-all ${
                      isActive(item.href)
                        ? 'text-[#1d1d1f]'
                        : 'text-[#86868b] hover:text-[#1d1d1f]'
                    }`}
                  >
                    {item.name}
                    {item.children && (
                      <ChevronDown
                        className={`w-4 h-4 transition-transform ${
                          activeDropdown === item.name ? 'rotate-180' : ''
                        }`}
                      />
                    )}
                  </Link>

                  {/* Dropdown Menu */}
                  {item.children && activeDropdown === item.name && (
                    <div className="absolute top-full left-0 pt-2">
                      <div className="bg-white/95 backdrop-blur-xl rounded-2xl shadow-xl border border-[#d2d2d7] p-2 min-w-[240px]">
                        {item.children.map((child) => (
                          <Link
                            key={child.name}
                            to={child.href}
                            className="block px-4 py-3 rounded-xl hover:bg-[#f5f5f7] transition-colors"
                          >
                            <div className="text-sm font-medium text-[#1d1d1f]">
                              {child.name}
                            </div>
                            {child.description && (
                              <div className="text-xs text-[#86868b] mt-0.5">
                                {child.description}
                              </div>
                            )}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-2">
              <Link
                to="/distribution"
                className="hidden md:inline-flex items-center gap-1 px-4 py-2 text-sm font-medium text-[#86868b] hover:text-[#1d1d1f] transition-colors"
              >
                <Handshake className="w-4 h-4" />
                分销合作
              </Link>
              <Link
                to="/contact"
                className="hidden md:inline-flex btn-primary text-sm py-2 px-4"
              >
                立即咨询
              </Link>
              <button
                className="p-2 hover:bg-[#f5f5f7] rounded-full transition-colors"
                aria-label="购物车"
              >
                <ShoppingBag className="w-5 h-5 text-[#1d1d1f]" />
              </button>
              <button
                className="md:hidden p-2 hover:bg-[#f5f5f7] rounded-full transition-colors"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label="菜单"
              >
                {isMobileMenuOpen ? (
                  <X className="w-5 h-5 text-[#1d1d1f]" />
                ) : (
                  <Menu className="w-5 h-5 text-[#1d1d1f]" />
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 z-40 md:hidden transition-all duration-300 ${
          isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
      >
        <div
          className="absolute inset-0 bg-black/20 backdrop-blur-sm"
          onClick={() => setIsMobileMenuOpen(false)}
        />
        <div
          className={`absolute top-14 left-0 right-0 bg-white border-b border-[#d2d2d7] transition-all duration-300 ${
            isMobileMenuOpen ? 'translate-y-0' : '-translate-y-4'
          }`}
        >
          <div className="p-4 space-y-1">
            {navItems.map((item) => (
              <div key={item.name}>
                <Link
                  to={item.href}
                  className={`block px-4 py-3 rounded-xl text-base font-medium ${
                    isActive(item.href)
                      ? 'text-[#1d1d1f] bg-[#f5f5f7]'
                      : 'text-[#86868b]'
                  }`}
                  onClick={() => !item.children && setIsMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
                {item.children && (
                  <div className="ml-4 mt-1 space-y-1">
                    {item.children.map((child) => (
                      <Link
                        key={child.name}
                        to={child.href}
                        className="block px-4 py-2 rounded-xl text-sm text-[#86868b] hover:text-[#1d1d1f] hover:bg-[#f5f5f7]"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {child.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <div className="pt-4 border-t border-[#d2d2d7] mt-4">
              <Link
                to="/contact"
                className="block w-full btn-primary text-center"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                立即咨询
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
