import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Heart, Target, Eye, Award, Globe, CheckCircle } from 'lucide-react';
import { SEO } from '@/components/SEO';
import { factoryInfo, ingredientInfo } from '@/data/contact';

gsap.registerPlugin(ScrollTrigger);

const values = [
  {
    icon: Heart,
    title: '健康至上',
    description: '我们始终将客户的健康放在首位，每一款产品都经过严格的营养计算。',
  },
  {
    icon: Target,
    title: '品质为本',
    description: '从原料采购到生产加工，每一个环节都追求最高品质标准。',
  },
  {
    icon: Eye,
    title: '创新驱动',
    description: '持续研发新产品，不断优化配方，为客户带来更好的体验。',
  },
  {
    icon: Award,
    title: '诚信经营',
    description: '透明的成分标注，真实的营养数据，让客户买得放心、吃得安心。',
  },
];

const milestones = [
  { year: '2020', event: '米黛尔品牌成立，首家门店开业' },
  { year: '2021', event: '线上商城上线，服务范围扩展至全国' },
  { year: '2022', event: '现代化工厂建成，产能大幅提升' },
  { year: '2023', event: '产品系列扩展至30+，服务客户突破万名' },
  { year: '2024', event: '获得多项国际认证，品牌影响力持续提升' },
];

export const About: React.FC = () => {
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.about-section',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: contentRef.current,
            start: 'top 70%',
          },
        }
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <>
      <SEO
        title="关于我们 | 米黛尔控糖烘焙"
        description="了解米黛尔的品牌故事、企业理念和生产工厂。我们专注于高端控糖烘焙，为健康意识人群提供美味与健康兼得的烘焙产品。"
        keywords={['米黛尔', '品牌故事', '控糖烘焙', '企业介绍', '工厂生产']}
      />

      <div className="min-h-screen bg-stone-50 pt-20" ref={contentRef}>
        {/* Hero */}
        <div className="relative bg-stone-900 text-white py-24 lg:py-32">
          <div className="absolute inset-0 opacity-20">
            <img
              src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1920&q=80"
              alt="关于米黛尔"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl lg:text-5xl font-bold mb-4">关于米黛尔</h1>
            <p className="text-xl text-stone-300 max-w-2xl mx-auto">
              让控糖人群也能享受甜蜜时光
            </p>
          </div>
        </div>

        {/* Brand Story */}
        <section id="story" className="about-section py-20 lg:py-32">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
              <div>
                <span className="text-emerald-600 text-sm font-medium tracking-wider uppercase mb-4 block">
                  品牌故事
                </span>
                <h2 className="text-3xl lg:text-4xl font-bold text-stone-800 mb-6">
                  源于热爱，成于坚持
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
                    我们的使命是让每一位控糖人群都能安心享受甜蜜时光。
                  </p>
                </div>
              </div>
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=800&q=80"
                  alt="米黛尔团队"
                  className="rounded-2xl shadow-xl"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Founder Story */}
        <section className="about-section py-20 lg:py-32 bg-emerald-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <span className="text-emerald-600 text-sm font-medium tracking-wider uppercase mb-4 block">
                创始人故事
              </span>
              <h2 className="text-3xl lg:text-4xl font-bold text-stone-800 mb-4">
                一份初心，一路坚持
              </h2>
            </div>
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=800&q=80"
                  alt="创始人陈明浩"
                  className="rounded-2xl shadow-xl w-full max-w-md mx-auto"
                />
                <div className="absolute -bottom-4 -right-4 bg-emerald-600 text-white px-6 py-3 rounded-lg shadow-lg">
                  <div className="font-semibold">陈明浩</div>
                  <div className="text-sm text-emerald-100">创始人 & CEO</div>
                </div>
              </div>
              <div className="space-y-6 text-stone-600 leading-relaxed">
                <p className="text-lg">
                  "2018年，我的母亲被诊断出糖尿病。作为一个烘焙爱好者，看着她不得不放弃最爱的甜品，
                  我深感心痛。那一刻，我决定要为她，也为所有控糖人群做些什么。"
                </p>
                <p>
                  带着这份初心，陈明浩开始了控糖烘焙的研发之路。他辞去了知名外企的高薪工作，
                  全身心投入到这个看似不可能的任务中——做出既控糖又美味的烘焙产品。
                </p>
                <p>
                  两年间，他拜访了国内外多位营养学专家和烘焙大师，尝试了上百种配方。
                  无数次的失败，无数次的调整，终于在2020年研发出了第一代生酮吐司产品。
                </p>
                <p>
                  "当我母亲第一次尝到我们的生酮吐司，露出了久违的笑容时，我知道这一切都值得。"
                  陈明浩回忆道，"那一刻，米黛尔不仅仅是一个品牌，更是一份对健康的承诺。"
                </p>
                <div className="bg-white p-6 rounded-xl border-l-4 border-emerald-600 mt-8">
                  <p className="text-stone-800 font-medium italic">
                    "我们相信，健康与美味从来不是对立的。每一位控糖人群都值得拥有享受甜蜜的权利。"
                  </p>
                  <p className="text-emerald-600 mt-2 font-semibold">—— 陈明浩</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="about-section py-20 lg:py-32 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <span className="text-emerald-600 text-sm font-medium tracking-wider uppercase mb-4 block">
                企业理念
              </span>
              <h2 className="text-3xl lg:text-4xl font-bold text-stone-800 mb-4">
                我们的价值观
              </h2>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((value, index) => (
                <div
                  key={index}
                  className="bg-stone-50 p-6 rounded-xl hover:bg-stone-100 transition-colors"
                >
                  <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center mb-4">
                    <value.icon className="w-6 h-6 text-emerald-600" />
                  </div>
                  <h3 className="font-semibold text-lg text-stone-800 mb-2">{value.title}</h3>
                  <p className="text-stone-600 text-sm">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Factory */}
        <section id="factory" className="about-section py-20 lg:py-32 bg-stone-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
              <div className="order-2 lg:order-1">
                <img
                  src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&q=80"
                  alt="米黛尔工厂"
                  className="rounded-2xl shadow-xl"
                />
              </div>
              <div className="order-1 lg:order-2">
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
                  <div className="bg-white p-4 rounded-lg">
                    <div className="text-2xl font-bold text-emerald-600">5000㎡</div>
                    <div className="text-sm text-stone-500">工厂面积</div>
                  </div>
                  <div className="bg-white p-4 rounded-lg">
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

        {/* Ingredients */}
        <section id="ingredients" className="about-section py-20 lg:py-32 bg-white">
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
                  className="bg-stone-50 rounded-xl overflow-hidden hover:shadow-lg transition-shadow"
                >
                  <img
                    src={source.image}
                    alt={source.name}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-5">
                    <div className="flex items-center gap-2 mb-2">
                      <Globe className="w-4 h-4 text-emerald-600" />
                      <span className="text-sm text-emerald-600 font-medium">{source.origin}</span>
                    </div>
                    <h3 className="font-semibold text-stone-800 mb-2">{source.name}</h3>
                    <p className="text-sm text-stone-600">{source.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Certifications */}
        <section id="certifications" className="about-section py-20 lg:py-32 bg-stone-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <span className="text-emerald-600 text-sm font-medium tracking-wider uppercase mb-4 block">
                认证资质
              </span>
              <h2 className="text-3xl lg:text-4xl font-bold text-stone-800 mb-4">
                权威认证，品质保障
              </h2>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {factoryInfo.certifications.map((cert, index) => (
                <div
                  key={index}
                  className="bg-white p-6 rounded-xl shadow-sm flex items-center gap-3"
                >
                  <Award className="w-8 h-8 text-emerald-600 flex-shrink-0" />
                  <span className="text-stone-700 font-medium text-sm">{cert}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Milestones */}
        <section className="about-section py-20 lg:py-32 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <span className="text-emerald-600 text-sm font-medium tracking-wider uppercase mb-4 block">
                发展历程
              </span>
              <h2 className="text-3xl lg:text-4xl font-bold text-stone-800 mb-4">
                米黛尔成长之路
              </h2>
            </div>
            <div className="max-w-3xl mx-auto">
              {milestones.map((milestone, index) => (
                <div key={index} className="flex gap-6 mb-8 last:mb-0">
                  <div className="flex flex-col items-center">
                    <div className="w-4 h-4 bg-emerald-600 rounded-full" />
                    {index < milestones.length - 1 && (
                      <div className="w-0.5 h-full bg-stone-200 mt-2" />
                    )}
                  </div>
                  <div className="pb-8">
                    <div className="text-2xl font-bold text-emerald-600 mb-1">{milestone.year}</div>
                    <div className="text-stone-600">{milestone.event}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Team */}
        <section className="about-section py-20 lg:py-32 bg-stone-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <span className="text-emerald-600 text-sm font-medium tracking-wider uppercase mb-4 block">
                核心团队
              </span>
              <h2 className="text-3xl lg:text-4xl font-bold text-stone-800 mb-4">
                专业团队，用心服务
              </h2>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { name: '陈明浩', role: '创始人 & CEO', image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80' },
                { name: '林雅琴', role: '首席烘焙师', image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&q=80' },
                { name: '王建国', role: '营养顾问', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=80' },
                { name: '李思雨', role: '产品研发总监', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80' },
              ].map((member, index) => (
                <div key={index} className="text-center">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
                  />
                  <h3 className="font-semibold text-stone-800">{member.name}</h3>
                  <p className="text-stone-500 text-sm">{member.role}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default About;
