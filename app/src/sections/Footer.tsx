import { useEffect, useRef } from 'react';
import {
  Mail,
  Phone,
  MapPin,
  Instagram,
  MessageCircle,
  Send,
} from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
  const footerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.footer-content',
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: footerRef.current,
            start: 'top 90%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, footerRef);

    return () => ctx.revert();
  }, []);

  const quickLinks = [
    { name: '首页', href: '#hero' },
    { name: '关于我们', href: '#about' },
    { name: '产品系列', href: '#products' },
    { name: '客户评价', href: '#testimonials' },
  ];

  const productLinks = [
    { name: '生酮系列', href: '#products' },
    { name: '常态化系列', href: '#products' },
    { name: '新品推荐', href: '#products' },
    { name: '礼盒定制', href: '#products' },
  ];

  const supportLinks = [
    { name: '配送说明', href: '#' },
    { name: '退换政策', href: '#' },
    { name: '常见问题', href: '#' },
    { name: '联系我们', href: '#' },
  ];

  const scrollToSection = (href: string) => {
    if (href === '#') return;
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer
      id="footer"
      ref={footerRef}
      className="relative bg-[#363533] text-white overflow-hidden"
    >
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-white/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />

      <div className="relative z-10">
        {/* Newsletter Section */}
        <div className="border-b border-white/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-16">
            <div className="footer-content flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
              <div>
                <h3 className="text-2xl lg:text-3xl font-semibold mb-2">
                  订阅我们的资讯
                </h3>
                <p className="text-white/60">
                  获取最新产品信息和专属优惠
                </p>
              </div>
              <div className="flex gap-3">
                <input
                  type="email"
                  placeholder="输入您的邮箱"
                  className="px-6 py-3 bg-white/10 border border-white/20 rounded-full text-white placeholder:text-white/40 focus:outline-none focus:border-white/40 w-full sm:w-72"
                />
                <button className="px-6 py-3 bg-emerald-500 text-white rounded-full font-medium hover:bg-emerald-400 transition-colors flex items-center gap-2">
                  <span className="hidden sm:inline">订阅</span>
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Main Footer Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
            {/* Brand Column */}
            <div className="footer-content lg:col-span-2">
              <a href="#hero" className="text-2xl font-semibold mb-4 inline-block">
                甜悦控糖
              </a>
              <p className="text-white/60 mb-6 max-w-sm leading-relaxed">
                专注于为控糖人群提供美味健康的烘焙产品。让健康与美味完美平衡，让每一个人都能享受甜蜜的喜悦。
              </p>

              {/* Contact Info */}
              <div className="space-y-3">
                <a
                  href="mailto:hello@tianyue.com"
                  className="flex items-center gap-3 text-white/60 hover:text-white transition-colors"
                >
                  <Mail className="w-5 h-5" />
                  hello@tianyue.com
                </a>
                <a
                  href="tel:400-888-8888"
                  className="flex items-center gap-3 text-white/60 hover:text-white transition-colors"
                >
                  <Phone className="w-5 h-5" />
                  400-888-8888
                </a>
                <div className="flex items-center gap-3 text-white/60">
                  <MapPin className="w-5 h-5" />
                  上海市静安区甜悦大厦
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div className="footer-content">
              <h4 className="font-semibold mb-4">快速链接</h4>
              <ul className="space-y-3">
                {quickLinks.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      onClick={(e) => {
                        e.preventDefault();
                        scrollToSection(link.href);
                      }}
                      className="text-white/60 hover:text-white transition-colors"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Products */}
            <div className="footer-content">
              <h4 className="font-semibold mb-4">产品系列</h4>
              <ul className="space-y-3">
                {productLinks.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      onClick={(e) => {
                        e.preventDefault();
                        scrollToSection(link.href);
                      }}
                      className="text-white/60 hover:text-white transition-colors"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Support */}
            <div className="footer-content">
              <h4 className="font-semibold mb-4">客户服务</h4>
              <ul className="space-y-3">
                {supportLinks.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      onClick={(e) => {
                        e.preventDefault();
                        scrollToSection(link.href);
                      }}
                      className="text-white/60 hover:text-white transition-colors"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-6">
            <div className="footer-content flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <p className="text-white/40 text-sm">
                © 2024 甜悦控糖. 保留所有权利.
              </p>

              {/* Social Links */}
              <div className="flex items-center gap-4">
                <a
                  href="#"
                  className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
                  aria-label="微信"
                >
                  <MessageCircle className="w-5 h-5" />
                </a>
                <a
                  href="#"
                  className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
                  aria-label="小红书"
                >
                  <Instagram className="w-5 h-5" />
                </a>
              </div>

              <div className="flex gap-6 text-sm text-white/40">
                <a href="#" className="hover:text-white transition-colors">
                  隐私政策
                </a>
                <a href="#" className="hover:text-white transition-colors">
                  服务条款
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
