import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Heart, Leaf, Shield, Award, CheckCircle, Factory, Wheat, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SEO } from '@/components/SEO';
import { getBestsellers, getNewProducts } from '@/data/products';
import { factoryInfo, ingredientInfo } from '@/data/contact';

gsap.registerPlugin(ScrollTrigger);

const whyChooseUs = [
  {
    icon: Heart,
    title: '专业控糖配方',
    description: '由营养师和烘焙大师联合研发，每款产品都经过严格的糖分计算，确保低GI值，让血糖不再飙升。',
  },
  {
    icon: Leaf,
    title: '天然优质原料',
    description: '全球甄选优质食材，美国杏仁粉、新西兰奶油芝士、法国黄油、比利时巧克力，只为最好的品质。',
  },
  {
    icon: Shield,
    title: '食品安全认证',
    description: '通过ISO22000、HACCP等多项国际食品安全认证，10万级洁净车间生产，全程可追溯。',
  },
  {
    icon: Award,
    title: '美味与健康兼得',
    description: '打破健康食品不好吃的刻板印象，我们的每一款产品都经过上百次口味调试，美味不打折。',
  },
];

const stats = [
  { value: '50,000+', label: '满意客户' },
  { value: '30+', label: '精选产品' },
  { value: '99%', label: '好评率' },
  { value: '4年', label: '专注控糖' },
];

export const Home: React.FC = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const storyRef = useRef<HTMLDivElement>(null);
  const productsRef = useRef<HTMLDivElement>(null);
  const whyRef = useRef<HTMLDivElement>(null);
  const factoryRef = useRef<HTMLDivElement>(null);
  const ingredientsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero animations
      gsap.fromTo(
        '.hero-title',
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1, ease: 'power3.out', delay: 0.3 }
      );
      gsap.fromTo(
        '.hero-subtitle',
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', delay: 0.6 }
      );
      gsap.fromTo(
        '.hero-cta',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out', delay: 0.9 }
      );

      // Story section
      gsap.fromTo(
        '.story-content',
        { opacity: 0, x: -50 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: storyRef.current,
            start: 'top 70%',
          },
        }
      );
      gsap.fromTo(
        '.story-image',
        { opacity: 0, x: 50 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: storyRef.current,
            start: 'top 70%',
          },
        }
      );

      // Products section
      gsap.fromTo(
        '.product-card',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: productsRef.current,
            start: 'top 70%',
          },
        }
      );

      // Why choose us section
      gsap.fromTo(
        '.why-card',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: whyRef.current,
            start: 'top 70%',
          },
        }
      );

      // Factory section
      gsap.fromTo(
        '.factory-content',
        { opacity: 0, x: -50 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: factoryRef.current,
            start: 'top 70%',
          },
        }
      );

      // Ingredients section
      gsap.fromTo(
        '.ingredient-card',
        { opacity: 0, scale: 0.9 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.5,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: ingredientsRef.current,
            start: 'top 70%',
          },
        }
      );
    });

    return () => ctx.revert();
  }, []);

  const bestsellers = getBestsellers().slice(0, 4);
  const newProducts = getNewProducts().slice(0, 4);

  return (
    <>
      <SEO />
      
      {/* Hero Section */}
      <section
        ref={heroRef}
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
      >
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1509440159596-0249088772ff?w=1920&q=80"
            alt="米黛尔烘焙"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-white/90 via-white/70 to-transparent" />
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
          <div className="max-w-2xl">
            <h1 className="hero-title text-4xl sm:text-5xl lg:text-6xl font-bold text-stone-800 leading-tight mb-6">
              甜蜜无负担
              <br />
              <span className="text-emerald-600">健康每一天</span>
            </h1>
            <p className="hero-subtitle text-lg sm:text-xl text-stone-600 mb-8 leading-relaxed">
              米黛尔专注于高端控糖烘焙，为糖尿病患者、生酮饮食者和健康意识人群
              提供美味与健康兼得的烘焙产品。
            </p>
            <div className="hero-cta flex flex-wrap gap-4">
              <Link to="/products">
                <Button size="lg" className="bg-emerald-600 hover:bg-emerald-700 text-white">
                  探索产品
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
              <Link to="/about">
                <Button size="lg" variant="outline" className="border-stone-400 text-stone-700">
                  了解更多
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-stone-400 rounded-full flex justify-center pt-2">
            <div className="w-1.5 h-3 bg-stone-400 rounded-full" />
          </div>
        </div>
      </section>

      {/* Brand Story Section */}
      <section ref={storyRef} className="py-20 lg:py-32 bg-stone-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div className="story-content">
              <span className="text-emerald-600 text-sm font-medium tracking-wider uppercase mb-4 block">
                品牌故事
              </span>
              <h2 className="text-3xl lg:text-4xl font-bold text-stone-800 mb-6">
                让控糖人群也能
                <br />
                享受甜蜜时光
              </h2>
              <div className="space-y-4 text-stone-600 leading-relaxed">
                <p>
                  米黛尔成立于2020年，源于一个简单的信念：控糖不应该意味着放弃美味。
                  我们的创始人团队中有糖尿病患者和生酮饮食践行者，深知控糖人群对美食的渴望。
                </p>
                <p>
                  经过四年的潜心研发，我们与营养师、烘焙大师合作，开发出一系列
                  既美味又健康的控糖烘焙产品。每一款产品都经过严格的糖分计算和口味调试，
                  确保低GI值的同时，不失美味。
                </p>
                <p>
                  今天，米黛尔已经服务超过50,000名客户，帮助他们重新找回享受甜品的快乐。
                </p>
              </div>
              <div className="grid grid-cols-4 gap-6 mt-8">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="text-2xl lg:text-3xl font-bold text-emerald-600">{stat.value}</div>
                    <div className="text-sm text-stone-500 mt-1">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="story-image relative">
              <img
                src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80"
                alt="米黛尔烘焙师"
                className="rounded-2xl shadow-2xl"
              />
              <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-xl shadow-lg">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center">
                    <Heart className="w-6 h-6 text-emerald-600" />
                  </div>
                  <div>
                    <div className="font-semibold text-stone-800">用心烘焙</div>
                    <div className="text-sm text-stone-500">每一口都是健康</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Factory Section */}
      <section ref={factoryRef} className="py-20 lg:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div className="order-2 lg:order-1 relative">
              <div className="grid grid-cols-2 gap-4">
                {factoryInfo.images.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={`工厂图片 ${index + 1}`}
                    className={`rounded-xl shadow-lg object-cover h-48 w-full ${index === 0 ? 'col-span-2 h-64' : ''}`}
                  />
                ))}
              </div>
              <div className="absolute -bottom-4 -right-4 bg-emerald-600 text-white p-4 rounded-xl shadow-lg">
                <Factory className="w-8 h-8" />
              </div>
            </div>
            <div className="factory-content order-1 lg:order-2">
              <span className="text-emerald-600 text-sm font-medium tracking-wider uppercase mb-4 block">
                工厂生产
              </span>
              <h2 className="text-3xl lg:text-4xl font-bold text-stone-800 mb-6">
                现代化生产
                <br />
                严格品质把控
              </h2>
              <div className="space-y-4 text-stone-600 leading-relaxed mb-6">
                <p>
                  米黛尔拥有5000平方米的现代化烘焙工厂，配备10万级洁净车间和全自动化生产线。
                  从原料入库到成品出库，每一个环节都有严格的质量把控。
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-stone-50 p-4 rounded-lg">
                  <div className="text-2xl font-bold text-emerald-600">5000㎡</div>
                  <div className="text-sm text-stone-500">工厂面积</div>
                </div>
                <div className="bg-stone-50 p-4 rounded-lg">
                  <div className="text-2xl font-bold text-emerald-600">10万+</div>
                  <div className="text-sm text-stone-500">日产能</div>
                </div>
              </div>
              <div className="space-y-2">
                {factoryInfo.features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                    <span className="text-sm text-stone-600">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Ingredients Section */}
      <section ref={ingredientsRef} className="py-20 lg:py-32 bg-stone-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-emerald-600 text-sm font-medium tracking-wider uppercase mb-4 block">
              食材用料
            </span>
            <h2 className="text-3xl lg:text-4xl font-bold text-stone-800 mb-4">
              全球甄选优质食材
            </h2>
            <p className="text-stone-600 max-w-2xl mx-auto">
              我们坚持从全球优质产地直接采购原料，确保每一份产品都使用最优质的食材
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {ingredientInfo.sources.map((source, index) => (
              <div
                key={index}
                className="ingredient-card bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow"
              >
                <img
                  src={source.image}
                  alt={source.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-5">
                  <div className="flex items-center gap-2 mb-2">
                    <Wheat className="w-4 h-4 text-emerald-600" />
                    <span className="text-sm text-emerald-600 font-medium">{source.origin}</span>
                  </div>
                  <h3 className="font-semibold text-stone-800 mb-2">{source.name}</h3>
                  <p className="text-sm text-stone-600">{source.description}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 bg-white rounded-xl p-6 lg:p-8">
            <div className="flex flex-wrap justify-center gap-4">
              {ingredientInfo.quality.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 bg-stone-50 px-4 py-2 rounded-full"
                >
                  <Shield className="w-4 h-4 text-emerald-600" />
                  <span className="text-sm text-stone-700">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section ref={productsRef} className="py-20 lg:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Bestsellers */}
          <div className="mb-16">
            <div className="flex items-end justify-between mb-8">
              <div>
                <span className="text-emerald-600 text-sm font-medium tracking-wider uppercase mb-2 block">
                  热销产品
                </span>
                <h2 className="text-3xl lg:text-4xl font-bold text-stone-800">
                  顾客最爱
                </h2>
              </div>
              <Link
                to="/products?filter=bestseller"
                className="hidden sm:flex items-center gap-2 text-emerald-600 hover:text-emerald-700 font-medium"
              >
                查看全部
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {bestsellers.map((product) => (
                <Link
                  key={product.id}
                  to={`/product/${product.id}`}
                  className="product-card group"
                >
                  <div className="relative overflow-hidden rounded-xl mb-4">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full aspect-square object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    {product.isBestseller && (
                      <span className="absolute top-3 left-3 bg-emerald-600 text-white text-xs px-2 py-1 rounded">
                        热销
                      </span>
                    )}
                  </div>
                  <h3 className="font-semibold text-stone-800 group-hover:text-emerald-600 transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-sm text-stone-500 mb-2">{product.shortDescription}</p>
                  <div className="flex items-center gap-2">
                    <span className="text-emerald-600 font-bold">¥{product.price.toFixed(2)}</span>
                    {product.originalPrice && (
                      <span className="text-stone-400 text-sm line-through">
                        ¥{product.originalPrice.toFixed(2)}
                      </span>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* New Products */}
          <div>
            <div className="flex items-end justify-between mb-8">
              <div>
                <span className="text-emerald-600 text-sm font-medium tracking-wider uppercase mb-2 block">
                  新品上市
                </span>
                <h2 className="text-3xl lg:text-4xl font-bold text-stone-800">
                  最新推荐
                </h2>
              </div>
              <Link
                to="/products?filter=new"
                className="hidden sm:flex items-center gap-2 text-emerald-600 hover:text-emerald-700 font-medium"
              >
                查看全部
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {newProducts.map((product) => (
                <Link
                  key={product.id}
                  to={`/product/${product.id}`}
                  className="product-card group"
                >
                  <div className="relative overflow-hidden rounded-xl mb-4">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full aspect-square object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    {product.isNew && (
                      <span className="absolute top-3 left-3 bg-green-600 text-white text-xs px-2 py-1 rounded">
                        新品
                      </span>
                    )}
                  </div>
                  <h3 className="font-semibold text-stone-800 group-hover:text-emerald-600 transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-sm text-stone-500 mb-2">{product.shortDescription}</p>
                  <div className="flex items-center gap-2">
                    <span className="text-emerald-600 font-bold">¥{product.price.toFixed(2)}</span>
                    {product.originalPrice && (
                      <span className="text-stone-400 text-sm line-through">
                        ¥{product.originalPrice.toFixed(2)}
                      </span>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section ref={whyRef} className="py-20 lg:py-32 bg-stone-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-emerald-400 text-sm font-medium tracking-wider uppercase mb-4 block">
              为什么选择米黛尔
            </span>
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              我们的优势
            </h2>
            <p className="text-stone-400 max-w-2xl mx-auto">
              四年专注控糖烘焙，我们用专业和用心，为您带来美味与健康的完美平衡
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {whyChooseUs.map((item, index) => (
              <div
                key={index}
                className="why-card bg-stone-800/50 backdrop-blur p-6 rounded-xl hover:bg-stone-800 transition-colors"
              >
                <div className="w-12 h-12 bg-emerald-600/20 rounded-lg flex items-center justify-center mb-4">
                  <item.icon className="w-6 h-6 text-emerald-400" />
                </div>
                <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
                <p className="text-stone-400 text-sm leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>

          {/* Testimonials */}
          <div className="mt-16 grid md:grid-cols-3 gap-6">
            {[
              {
                name: '王女士',
                role: '糖尿病患者',
                content: '终于找到可以放心吃的甜点了！血糖控制得很好，而且味道真的很棒。',
                rating: 5,
              },
              {
                name: '李先生',
                role: '生酮饮食者',
                content: '生酮吐司是我每天早餐的必备，碳水含量低，口感却一点不输普通面包。',
                rating: 5,
              },
              {
                name: '张小姐',
                role: '健身爱好者',
                content: '无糖但很好吃，完全满足了我的甜品欲望，又不会破坏健身计划。',
                rating: 5,
              },
            ].map((testimonial, index) => (
              <div key={index} className="bg-stone-800/50 backdrop-blur p-6 rounded-xl">
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-stone-300 mb-4">"{testimonial.content}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-emerald-600 rounded-full flex items-center justify-center text-white font-medium">
                    {testimonial.name[0]}
                  </div>
                  <div>
                    <div className="font-medium">{testimonial.name}</div>
                    <div className="text-sm text-stone-500">{testimonial.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 lg:py-32 bg-emerald-700">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
            开始您的健康甜蜜之旅
          </h2>
          <p className="text-emerald-100 mb-8 text-lg">
            立即探索我们的控糖烘焙产品，享受美味无负担
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/products">
              <Button size="lg" className="bg-white text-emerald-600 hover:bg-emerald-50">
                立即选购
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
            <Link to="/contact">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-emerald-800">
                联系我们
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
