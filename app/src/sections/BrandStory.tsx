import { useEffect, useRef } from 'react';
import { Heart, Target, Lightbulb, Users } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const BrandStory = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header animation
      gsap.fromTo(
        '.brand-header',
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

      // Story cards animation
      gsap.fromTo(
        '.story-card',
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: contentRef.current,
            start: 'top 75%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Timeline animation
      gsap.fromTo(
        '.timeline-item',
        { x: -30, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.2,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: '.timeline',
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const brandValues = [
    {
      icon: Heart,
      title: '亲身验证',
      description:
        '创始人本人通过生酮饮食、戒糖戒酒、规律运动，一年内三高指标全面趋于正常，体重减轻40斤。产品是真实生活方式的结晶。',
    },
    {
      icon: Target,
      title: '进口原料',
      description:
        '所有核心食材均采用进口原料，杏仁粉来自美国、奶油芝士来自新西兰、黄油来自法国，品质可溯源。',
    },
    {
      icon: Lightbulb,
      title: '科学配方',
      description:
        '生酮与零糖双线并行，赤藓糖醇替代蔗糖，精准控制每份产品净碳水含量，让美味与健康不再对立。',
    },
    {
      icon: Users,
      title: '多重认证',
      description:
        'ISO22000食品安全认证、HACCP危害分析关键控制点、有机原料认证、绿色食品认证，每一项都是对品质的承诺。',
    },
  ];

  const milestones = [
    { year: '2021', event: '迷黛尔品牌创立，创始人以亲身经历为起点' },
    { year: '2022', event: '推出明星产品零糖罐子蛋糕，广受好评' },
    { year: '2023', event: '产品系列扩展至30+款，覆盖生酮与零糖双线' },
    { year: '2024', event: '入驻淘宝、抖音商城、拼多多，服务万名用户' },
  ];

  return (
    <section
      id="brand-story"
      ref={sectionRef}
      className="relative py-24 lg:py-32 bg-[#f1efed] overflow-hidden"
    >
      {/* Background Decoration */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-[#e0ddd5]/30 to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        {/* Section Header */}
        <div className="brand-header text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full mb-6 border border-[#e0ddd5]">
            <span className="text-sm font-medium text-[#5e5e5e]">品牌故事</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#363533] mb-6">
            迷黛尔的故事
          </h2>
          <p className="text-lg text-[#5e5e5e] max-w-3xl mx-auto leading-relaxed">
            迷黛尔诞生于一段真实的人生转变：
            <span className="text-[#363533] font-medium">
              创始人以亲身经历证明，改变饮食方式，可以真正改变生命质量。
            </span>
          </p>
        </div>

        {/* Brand Origin Story */}
        <div ref={contentRef} className="grid lg:grid-cols-2 gap-12 lg:gap-20 mb-20">
          <div className="story-card">
            <h3 className="text-2xl font-semibold text-[#363533] mb-4">
              一段真实的人生转变
            </h3>
            <p className="text-[#5e5e5e] leading-relaxed mb-4">
              迷黛尔的创始人曾是一位典型的三高患者——高血压、高血糖、高血脂。这不是别人的故事，是他自己每天面对的现实。
            </p>
            <p className="text-[#5e5e5e] leading-relaxed mb-4">
              2021年起，他开始系统性地改变生活方式：生酮饮食、彻底戒糖戒酒、规律运动、调整作息。一年后，三项指标全面趋于正常，体重减轻了整整40斤。
            </p>
            <p className="text-[#363533] font-medium leading-relaxed">
              这段经历让他深信：食物可以是药，也可以是毒。于是迷黛尔诞生了——用真实有效的配方，让更多人吃得好、活得健康。
            </p>
          </div>

          <div className="story-card">
            <h3 className="text-2xl font-semibold text-[#363533] mb-4">
              进口原料，认证品质
            </h3>
            <p className="text-[#5e5e5e] leading-relaxed mb-4">
              创始人深知原料是一切的根本。迷黛尔所有核心食材均采用进口原料：美国杏仁粉、新西兰奶油芝士、法国黄油、菲律宾椰子粉……
            </p>
            <p className="text-[#5e5e5e] leading-relaxed mb-4">
              工厂通过ISO22000、HACCP、有机原料认证等多项权威认证，每一批次产品均经过严格质检，确保安全可溯源。
            </p>
            <p className="text-[#363533] font-medium leading-relaxed">
              零糖系列与生酮系列双线并行，还提供定制化生酮套餐，满足不同人群的健康需求。
            </p>
          </div>
        </div>

        {/* Brand Values */}
        <div className="mb-20">
          <h3 className="text-2xl font-semibold text-[#363533] text-center mb-10">
            我们的价值观
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {brandValues.map((value, index) => (
              <div
                key={index}
                className="story-card group p-6 bg-white rounded-2xl border border-[#e0ddd5] hover:shadow-xl hover:shadow-[#363533]/5 hover:-translate-y-2 transition-all duration-500"
              >
                <div className="w-14 h-14 bg-emerald-50 rounded-xl flex items-center justify-center mb-4 group-hover:bg-emerald-600 transition-colors duration-300">
                  <value.icon className="w-7 h-7 text-emerald-600 group-hover:text-white transition-colors" />
                </div>
                <h4 className="text-lg font-semibold text-[#363533] mb-2">
                  {value.title}
                </h4>
                <p className="text-sm text-[#5e5e5e] leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Timeline */}
        <div className="timeline">
          <h3 className="text-2xl font-semibold text-[#363533] text-center mb-10">
            发展历程
          </h3>
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-1/2 top-0 bottom-0 w-px bg-[#e0ddd5] hidden lg:block" />

            <div className="space-y-8 lg:space-y-0">
              {milestones.map((milestone, index) => (
                <div
                  key={index}
                  className={`timeline-item flex flex-col lg:flex-row items-center gap-4 lg:gap-0 ${
                    index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
                  }`}
                >
                  <div
                    className={`w-full lg:w-1/2 ${
                      index % 2 === 0 ? 'lg:text-right lg:pr-12' : 'lg:text-left lg:pl-12'
                    }`}
                  >
                    <div className="bg-white rounded-2xl p-6 border border-[#e0ddd5] inline-block">
                      <div className="text-2xl font-bold text-[#363533] mb-1">
                        {milestone.year}
                      </div>
                      <div className="text-[#5e5e5e]">{milestone.event}</div>
                    </div>
                  </div>

                  {/* Timeline Dot */}
                  <div className="w-4 h-4 bg-emerald-600 rounded-full border-4 border-[#f1efed] z-10 hidden lg:block" />

                  <div className="w-full lg:w-1/2" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BrandStory;
