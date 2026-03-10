import { useEffect, useRef, useState } from 'react';
import { ShoppingBag, Plus, Check } from 'lucide-react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import TiltedCard from '@/components/ui/TiltedCard';
import { getAllProducts, type Product } from '@/data/products';

gsap.registerPlugin(ScrollTrigger);

const Products = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [filter, setFilter] = useState<'all' | 'keto' | 'regular'>('all');
  const [cart, setCart] = useState<string[]>([]);
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    setProducts(getAllProducts().filter(p => p.isBestseller !== false));
  }, []);

  const filteredProducts =
    filter === 'all'
      ? products
      : filter === 'keto'
      ? products.filter((p) => p.category === 'keto')
      : products.filter((p) => p.category === 'regular');

  const addToCart = (productId: string) => {
    if (!cart.includes(productId)) {
      setCart([...cart, productId]);
      // 触发购物车更新事件
      window.dispatchEvent(new CustomEvent('cartUpdated'));
    }
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.products-header',
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

      gsap.fromTo(
        '.product-card-wrapper',
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: '.products-grid',
            start: 'top 75%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [filteredProducts]);

  return (
    <section
      id="products"
      ref={sectionRef}
      className="relative py-24 lg:py-32 bg-[#f1efed] overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        {/* Section Header */}
        <div className="products-header flex flex-col lg:flex-row lg:items-end lg:justify-between mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full mb-6 border border-[#e0ddd5]">
              <ShoppingBag className="w-4 h-4 text-emerald-600" />
              <span className="text-sm font-medium text-emerald-600">
                精选产品
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#363533] mb-4">
              精选产品
            </h2>
            <p className="text-lg text-[#5e5e5e] max-w-xl">
              三十多款可选产品，涵盖中西方不同形式糕点
            </p>
          </div>

          {/* Filter Buttons */}
          <div className="flex gap-3 mt-6 lg:mt-0">
            {[
              { key: 'all', label: '全部' },
              { key: 'keto', label: '生酮' },
              { key: 'regular', label: '常态化' },
            ].map((item) => (
              <button
                key={item.key}
                onClick={() => setFilter(item.key as typeof filter)}
                className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                  filter === item.key
                    ? 'bg-emerald-600 text-white'
                    : 'bg-white text-[#5e5e5e] hover:bg-[#e0ddd5] border border-[#e0ddd5]'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        {/* Products Grid */}
        <div className="products-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.slice(0, 9).map((product, index) => (
            <div
              key={product.id}
              className="product-card-wrapper"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="bg-white rounded-3xl overflow-hidden border border-[#e0ddd5] shadow-sm hover:shadow-xl transition-shadow duration-300">
                {/* TiltedCard Image */}
                <div className="relative aspect-[3/4] overflow-hidden group">
                  {/* 3D Tilt Card Effect */}
                  <div className="product-card-3d w-full h-full cursor-pointer">
                    <div className="product-card-inner relative w-full h-full transition-all duration-500 ease-out group-hover:scale-105 group-hover:shadow-2xl">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      
                      {/* Overlay gradient - shown on hover */}
                      <div className="absolute inset-0 bg-gradient-to-t from-emerald-600/90 via-emerald-500/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      
                      {/* Product info overlay - shown on hover */}
                      <div className="absolute inset-0 flex items-end justify-center p-4 opacity-0 group-hover:opacity-100 transition-all duration-500">
                        <div className="text-center text-white pb-4 transform translate-y-8 group-hover:translate-y-0 transition-transform duration-500">
                          <p className="text-lg font-semibold drop-shadow-lg">{product.name}</p>
                          <p className="text-sm opacity-90 drop-shadow-md">¥{product.price.toFixed(2)}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="absolute top-4 left-4 flex flex-wrap gap-2 z-10 pointer-events-none">
                    {product.tags.slice(0, 2).map((tag, i) => (
                      <span
                        key={i}
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          product.category === 'keto'
                            ? 'bg-emerald-100 text-emerald-700'
                            : 'bg-white/90 text-[#363533]'
                        }`}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Category Badge */}
                  <div className="absolute top-4 right-4 z-10 pointer-events-none">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        product.category === 'keto'
                          ? 'bg-emerald-600 text-white'
                          : 'bg-[#363533] text-white'
                      }`}
                    >
                      {product.categoryName}
                    </span>
                  </div>

                  {/* Quick Add Button */}
                  <button
                    onClick={() => addToCart(product.id)}
                    className={`absolute bottom-4 right-4 w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 z-10 ${
                      cart.includes(product.id)
                        ? 'bg-emerald-600 text-white'
                        : 'bg-white text-[#363533] hover:bg-emerald-600 hover:text-white'
                    } shadow-lg`}
                  >
                    {cart.includes(product.id) ? (
                      <Check className="w-5 h-5" />
                    ) : (
                      <Plus className="w-5 h-5" />
                    )}
                  </button>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-lg font-semibold text-[#363533] group-hover:text-emerald-600 transition-colors">
                      {product.name}
                    </h3>
                  </div>

                  <p className="text-sm text-[#5e5e5e] mb-4 line-clamp-2">
                    {product.shortDescription}
                  </p>

                  <div className="flex items-center justify-between">
                    <div className="flex items-baseline gap-2">
                      <span className="text-xl font-bold text-emerald-600">
                        ¥{product.price.toFixed(2)}
                      </span>
                      {product.originalPrice && (
                        <span className="text-sm text-[#5e5e5e] line-through">
                          ¥{product.originalPrice.toFixed(2)}
                        </span>
                      )}
                    </div>

                    <button
                      onClick={() => addToCart(product.id)}
                      className={`text-sm font-medium transition-colors ${
                        cart.includes(product.id)
                          ? 'text-emerald-600'
                          : 'text-[#5e5e5e] hover:text-emerald-600'
                      }`}
                    >
                      {cart.includes(product.id) ? '已添加' : '加入购物车'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <a
            href="/products"
            className="inline-flex items-center gap-2 px-8 py-4 bg-emerald-600 text-white rounded-full font-medium hover:bg-emerald-700 transition-all duration-300 hover:shadow-xl hover:shadow-emerald-600/20"
          >
            查看全部产品
            <span className="text-sm opacity-70">({products.length}+款)</span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Products;
