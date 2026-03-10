import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';
import { companyInfo } from '@/data/contact';

const footerLinks = {
  products: [
    { label: '生酮系列', href: '/products?category=keto' },
    { label: '常规控糖系列', href: '/products?category=regular' },
    { label: '新品推荐', href: '/products?filter=new' },
    { label: '热销产品', href: '/products?filter=bestseller' },
  ],
  about: [
    { label: '品牌故事', href: '/about#story' },
    { label: '工厂生产', href: '/about#factory' },
    { label: '食材用料', href: '/about#ingredients' },
    { label: '资质认证', href: '/about#certifications' },
  ],
  support: [
    { label: '配送说明', href: '/about#shipping' },
    { label: '退换政策', href: '/about#returns' },
    { label: '常见问题', href: '/about#faq' },
    { label: '联系我们', href: '/contact' },
  ],
  cooperation: [
    { label: '分销合作', href: '/distribution' },
    { label: '企业采购', href: '/contact?subject=bulk' },
    { label: '品牌合作', href: '/contact?subject=partnership' },
  ],
};

export const Footer: React.FC = () => {
  return (
    <footer className="bg-stone-900 text-stone-300">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Brand Info */}
          <div className="lg:col-span-2">
            <Link to="/" className="inline-block">
              <h3 className="text-2xl font-bold text-white mb-4">米黛尔</h3>
            </Link>
            <p className="text-stone-400 mb-6 max-w-sm">
              {companyInfo.description}
            </p>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-rose-500" />
                <span>{companyInfo.phone}</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-rose-500" />
                <span>{companyInfo.email}</span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="w-4 h-4 text-rose-500" />
                <span className="text-sm">{companyInfo.address}</span>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="w-4 h-4 text-rose-500" />
                <span className="text-sm">{companyInfo.businessHours}</span>
              </div>
            </div>
          </div>

          {/* Products */}
          <div>
            <h4 className="text-white font-semibold mb-4">产品中心</h4>
            <ul className="space-y-2">
              {footerLinks.products.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-stone-400 hover:text-rose-500 transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* About */}
          <div>
            <h4 className="text-white font-semibold mb-4">关于我们</h4>
            <ul className="space-y-2">
              {footerLinks.about.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-stone-400 hover:text-rose-500 transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support & Cooperation */}
          <div>
            <h4 className="text-white font-semibold mb-4">客户服务</h4>
            <ul className="space-y-2 mb-6">
              {footerLinks.support.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-stone-400 hover:text-rose-500 transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <h4 className="text-white font-semibold mb-4">商务合作</h4>
            <ul className="space-y-2">
              {footerLinks.cooperation.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-stone-400 hover:text-rose-500 transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-stone-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-stone-500">
              © {new Date().getFullYear()} 米黛尔. 保留所有权利.
            </p>
            <div className="flex items-center gap-6 text-sm text-stone-500">
              <Link to="/about#privacy" className="hover:text-rose-500 transition-colors">
                隐私政策
              </Link>
              <Link to="/about#terms" className="hover:text-rose-500 transition-colors">
                使用条款
              </Link>
              <Link to="/about#sitemap" className="hover:text-rose-500 transition-colors">
                网站地图
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
