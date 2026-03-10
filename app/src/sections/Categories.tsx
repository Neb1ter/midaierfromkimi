import { useEffect, useRef, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Categories = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeCategory, setActiveCategory] = useState<number | null>(null);

  const categories = [
    {
      id: 1,
      name: '生酮产品',
      nameEn: 'Keto Series',
      description: '专为生酮饮食用户设计，极低碳水化合物，高脂肪配比',
      products: ['生酮曲奇饼干', '生酮葱油饼', '生酮大福'],
      image: '/images/keto-category.jpg',
      color: '#2d5016',
      badge: '生酮专属',
    },
    {
      id: 2,
      name: '常态化产品',
      nameEn: 'Regular Series',
      description: '适合大多数人口味，低糖健康，美味不减',
      products: ['0糖罐子蛋糕', '低糖生日蛋糕', '无糖奶酪蛋糕', '低糖汤圆', '无糖青团', '低糖粽子'],
      image: '/images/regular-category.jpg',
      color: '#8b5a2b',
      badge: '大众口味',
    },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation
      gsap.fromTo(
        '.category-title',
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Cards animation
      gsap.fromTo(
        '.category-card',
        { y: 80, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.2,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: '.category-cards',
            start: 'top 75%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-24 lg:py-32 bg-[#f1efed] overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="category-title inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full mb-6 border border-[#e0ddd5]">
            <span className="text-sm font-medium text-[#5e5e5e]">
              产品分类
            </span>
          </div>
          <h2 className="category-title text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#363533] mb-4">
            探索我们的产品
          </h2>
          <p className="category-title text-lg text-[#5e5e5e] max-w-2xl mx-auto">
            根据您的饮食需求选择合适的产品系列，每一款都经过精心研发
          </p>
        </div>

        {/* Category Cards - Horizontal Accordion Style */}
        <div className="category-cards flex flex-col lg:flex-row gap-6">
          {categories.map((category) => (
            <div
              key={category.id}
              className={`category-card relative rounded-3xl overflow-hidden cursor-pointer transition-all duration-700 ${
                activeCategory === category.id
                  ? 'lg:flex-[2]'
                  : activeCategory !== null
                  ? 'lg:flex-[0.8]'
                  : 'lg:flex-1'
              }`}
              style={{ transitionTimingFunction: 'var(--ease-expo)' }}
              onMouseEnter={() => setActiveCategory(category.id)}
              onMouseLeave={() => setActiveCategory(null)}
            >
              {/* Background Image */}
              <div className="relative h-[400px] lg:h-[500px]">
                <img
                  src={category.image}
                  alt={category.name}
                  className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ${
                    activeCategory === category.id
                      ? 'scale-110 filter-none'
                      : 'scale-100 grayscale-[30%]'
                  }`}
                  style={{ transitionTimingFunction: 'var(--ease-expo)' }}
                />

                {/* Overlay */}
                <div
                  className={`absolute inset-0 transition-opacity duration-500 ${
                    activeCategory === category.id
                      ? 'bg-gradient-to-t from-black/70 via-black/30 to-transparent'
                      : 'bg-gradient-to-t from-black/60 via-black/40 to-transparent'
                  }`}
                />

                {/* Content */}
                <div className="absolute inset-0 p-8 flex flex-col justify-end text-white">
                  {/* Badge */}
                  <div
                    className={`inline-flex self-start px-3 py-1 rounded-full text-xs font-medium mb-4 transition-all duration-500 ${
                      activeCategory === category.id
                        ? 'bg-white/30 backdrop-blur-sm opacity-100 translate-y-0'
                        : 'opacity-0 translate-y-4'
                    }`}
                  >
                    {category.badge}
                  </div>

                  {/* Title */}
                  <div className="mb-4">
                    <h3 className="text-2xl lg:text-3xl font-semibold mb-1">
                      {category.name}
                    </h3>
                    <p className="text-sm text-white/70">{category.nameEn}</p>
                  </div>

                  {/* Description - Shows on hover */}
                  <div
                    className={`transition-all duration-500 overflow-hidden ${
                      activeCategory === category.id
                        ? 'max-h-40 opacity-100'
                        : 'max-h-0 opacity-0'
                    }`}
                  >
                    <p className="text-sm text-white/80 mb-4">
                      {category.description}
                    </p>

                    {/* Product Tags */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {category.products.map((product, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs"
                        >
                          {product}
                        </span>
                      ))}
                    </div>

                    {/* CTA */}
                    <a
                      href="#products"
                      className="inline-flex items-center gap-2 text-sm font-medium hover:gap-3 transition-all"
                    >
                      查看全部产品
                      <ArrowRight className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile: Static Cards */}
        <div className="lg:hidden mt-8 grid gap-6">
          {categories.map((category) => (
            <div
              key={category.id}
              className="bg-white rounded-2xl p-6 border border-[#e0ddd5]"
            >
              <div className="flex items-center gap-3 mb-4">
                <span
                  className="px-3 py-1 rounded-full text-xs font-medium text-white"
                  style={{ backgroundColor: category.color }}
                >
                  {category.badge}
                </span>
              </div>
              <h3 className="text-xl font-semibold text-[#363533] mb-2">
                {category.name}
              </h3>
              <p className="text-sm text-[#5e5e5e] mb-4">
                {category.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {category.products.map((product, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-[#f1efed] rounded-full text-xs text-[#5e5e5e]"
                  >
                    {product}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;
