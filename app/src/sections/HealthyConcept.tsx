import { useEffect, useRef, useState } from 'react';
import { BookOpen, Apple, Activity, Info, CheckCircle2, AlertCircle } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ContentItem {
  title: string;
  description: string;
  points: { title: string; content: string }[];
  tip?: string;
  warning?: string;
}

const HealthyConcept = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState<'sugar' | 'keto' | 'benefits'>('sugar');

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.concept-header',
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
        '.concept-content',
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: '.concept-content',
            start: 'top 75%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const tabs = [
    { id: 'sugar' as const, label: '控糖知识', icon: Apple },
    { id: 'keto' as const, label: '生酮饮食', icon: BookOpen },
    { id: 'benefits' as const, label: '健康益处', icon: Activity },
  ];

  const content: Record<string, ContentItem> = {
    sugar: {
      title: '为什么要控糖？',
      description:
        '过量的糖分摄入与多种健康问题相关，包括肥胖、2型糖尿病、心血管疾病等。控制糖分摄入是维护健康的重要一步。',
      points: [
        {
          title: '血糖管理',
          content: '控制糖分有助于维持稳定的血糖水平，减少血糖波动带来的疲劳感和饥饿感。',
        },
        {
          title: '体重控制',
          content: '减少糖分摄入可以降低多余热量的摄入，有助于体重管理和减脂。',
        },
        {
          title: '皮肤健康',
          content: '高糖饮食会加速皮肤老化，控糖有助于保持皮肤弹性和光泽。',
        },
        {
          title: '能量稳定',
          content: '避免血糖骤升骤降，让身体保持持续稳定的能量供应。',
        },
      ],
      tip: '建议每日添加糖摄入量不超过25克（约6茶匙）',
    },
    keto: {
      title: '什么是生酮饮食？',
      description:
        '生酮饮食是一种极低碳水化合物、高脂肪的饮食方式。通过大幅减少碳水摄入，迫使身体进入"酮症"状态，以脂肪作为主要能量来源。',
      points: [
        {
          title: '极低碳水',
          content: '每日碳水化合物摄入量通常控制在20-50克以内，主要来自蔬菜。',
        },
        {
          title: '适量蛋白质',
          content: '摄入适量优质蛋白质，如肉类、鱼类、蛋类等。',
        },
        {
          title: '高脂肪',
          content: '脂肪成为主要能量来源，占总热量的70-80%。',
        },
        {
          title: '适合人群',
          content: '适合需要快速减脂、控制血糖、改善胰岛素敏感性的人群。',
        },
      ],
      warning: '生酮饮食需要在专业指导下进行，不适合所有人',
    },
    benefits: {
      title: '低糖饮食的健康益处',
      description:
        '选择低糖烘焙产品，不仅能满足对甜点的渴望，还能带来多方面的健康益处。',
      points: [
        {
          title: '血糖友好',
          content: '使用天然代糖和低GI原料，对血糖影响极小，糖尿病患者也可安心享用。',
        },
        {
          title: '控制热量',
          content: '相比传统甜点，低糖产品热量更低，有助于体重管理。',
        },
        {
          title: '牙齿健康',
          content: '天然代糖不会被口腔细菌分解，不会导致蛀牙。',
        },
        {
          title: '持续满足',
          content: '低糖产品不会造成血糖骤升骤降，饱腹感更持久。',
        },
      ],
      tip: '选择低糖产品时，注意查看配料表，优先选择使用天然代糖的产品',
    },
  };

  const currentContent = content[activeTab];
  const hasWarning = 'warning' in currentContent && currentContent.warning;
  const hasTip = 'tip' in currentContent && currentContent.tip;

  return (
    <section
      id="healthy-concept"
      ref={sectionRef}
      className="relative py-24 lg:py-32 bg-white overflow-hidden"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-30">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, #e0ddd5 1px, transparent 0)`,
            backgroundSize: '40px 40px',
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        {/* Section Header */}
        <div className="concept-header text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#f1efed] rounded-full mb-6 border border-[#e0ddd5]">
            <Info className="w-4 h-4 text-[#5e5e5e]" />
            <span className="text-sm font-medium text-[#5e5e5e]">健康饮食</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#363533] mb-6">
            健康饮食理念
          </h2>
          <p className="text-lg text-[#5e5e5e] max-w-3xl mx-auto leading-relaxed">
            了解控糖饮食的科学知识，选择更健康的甜点方式
            <br className="hidden sm:block" />
            让美味与健康同行
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="concept-content">
          <div className="flex justify-center mb-10">
            <div className="inline-flex p-1.5 bg-[#f1efed] rounded-full border border-[#e0ddd5]">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 ${
                    activeTab === tab.id
                      ? 'bg-emerald-600 text-white shadow-lg'
                      : 'text-[#5e5e5e] hover:text-[#363533]'
                  }`}
                >
                  <tab.icon className="w-4 h-4" />
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Content Area */}
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Left: Text Content */}
            <div className="bg-[#f1efed] rounded-3xl p-8 lg:p-10">
              <h3 className="text-2xl font-semibold text-[#363533] mb-4">
                {currentContent.title}
              </h3>
              <p className="text-[#5e5e5e] leading-relaxed mb-8">
                {currentContent.description}
              </p>

              <div className="space-y-4">
                {currentContent.points.map((point, index) => (
                  <div
                    key={index}
                    className="flex gap-4 p-4 bg-white rounded-xl border border-[#e0ddd5]"
                  >
                    <div className="flex-shrink-0 w-8 h-8 bg-emerald-600 rounded-full flex items-center justify-center">
                      <CheckCircle2 className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-[#363533] mb-1">
                        {point.title}
                      </h4>
                      <p className="text-sm text-[#5e5e5e]">{point.content}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Tip or Warning */}
              {(hasWarning || hasTip) && (
                <div
                  className={`mt-6 p-4 rounded-xl flex items-start gap-3 ${
                    hasWarning
                      ? 'bg-amber-50 border border-amber-200'
                      : 'bg-green-50 border border-green-200'
                  }`}
                >
                  {hasWarning ? (
                    <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                  ) : (
                    <Info className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  )}
                  <p
                    className={`text-sm ${
                      hasWarning ? 'text-amber-700' : 'text-green-700'
                    }`}
                  >
                    {currentContent.warning || currentContent.tip}
                  </p>
                </div>
              )}
            </div>

            {/* Right: Visual Content */}
            <div className="space-y-6">
              {/* Sugar Comparison */}
              {activeTab === 'sugar' && (
                <div className="bg-white rounded-3xl p-8 border border-[#e0ddd5]">
                  <h4 className="text-lg font-semibold text-[#363533] mb-6">
                    糖分含量对比（每100g）
                  </h4>
                  <div className="space-y-4">
                    {[
                      { name: '传统蛋糕', value: 45, color: 'bg-red-400' },
                      { name: '普通饼干', value: 35, color: 'bg-orange-400' },
                      { name: '甜悦控糖产品', value: 2, color: 'bg-emerald-500' },
                    ].map((item, index) => (
                      <div key={index}>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-[#363533]">{item.name}</span>
                          <span className="text-[#5e5e5e]">{item.value}g</span>
                        </div>
                        <div className="h-3 bg-[#f1efed] rounded-full overflow-hidden">
                          <div
                            className={`h-full ${item.color} rounded-full transition-all duration-1000`}
                            style={{ width: `${(item.value / 45) * 100}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Keto Macro Chart */}
              {activeTab === 'keto' && (
                <div className="bg-white rounded-3xl p-8 border border-[#e0ddd5]">
                  <h4 className="text-lg font-semibold text-[#363533] mb-6">
                    生酮饮食营养比例
                  </h4>
                  <div className="flex items-center justify-center mb-6">
                    <div className="relative w-48 h-48">
                      <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                        <circle
                          cx="50"
                          cy="50"
                          r="40"
                          fill="none"
                          stroke="#f1efed"
                          strokeWidth="20"
                        />
                        <circle
                          cx="50"
                          cy="50"
                          r="40"
                          fill="none"
                          stroke="#363533"
                          strokeWidth="20"
                          strokeDasharray={`${75 * 2.51} ${100 * 2.51}`}
                          strokeLinecap="round"
                        />
                        <circle
                          cx="50"
                          cy="50"
                          r="40"
                          fill="none"
                          stroke="#5e5e5e"
                          strokeWidth="20"
                          strokeDasharray={`${20 * 2.51} ${100 * 2.51}`}
                          strokeDashoffset={-75 * 2.51}
                          strokeLinecap="round"
                        />
                        <circle
                          cx="50"
                          cy="50"
                          r="40"
                          fill="none"
                          stroke="#e0ddd5"
                          strokeWidth="20"
                          strokeDasharray={`${5 * 2.51} ${100 * 2.51}`}
                          strokeDashoffset={-95 * 2.51}
                          strokeLinecap="round"
                        />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-2xl font-bold text-[#363533]">Keto</span>
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <div className="w-4 h-4 bg-[#363533] rounded-full mx-auto mb-2" />
                      <div className="text-sm font-medium text-[#363533]">脂肪</div>
                      <div className="text-xs text-[#5e5e5e]">75%</div>
                    </div>
                    <div>
                      <div className="w-4 h-4 bg-[#5e5e5e] rounded-full mx-auto mb-2" />
                      <div className="text-sm font-medium text-[#363533]">蛋白质</div>
                      <div className="text-xs text-[#5e5e5e]">20%</div>
                    </div>
                    <div>
                      <div className="w-4 h-4 bg-[#e0ddd5] rounded-full mx-auto mb-2" />
                      <div className="text-sm font-medium text-[#363533]">碳水</div>
                      <div className="text-xs text-[#5e5e5e]">5%</div>
                    </div>
                  </div>
                </div>
              )}

              {/* Benefits Cards */}
              {activeTab === 'benefits' && (
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { value: '0', unit: 'g', label: '添加糖', desc: '使用天然代糖' },
                    { value: '低', unit: '', label: '升糖指数', desc: '血糖友好' },
                    { value: '30', unit: '%', label: '更低热量', desc: '轻松控卡' },
                    { value: '100', unit: '%', label: '天然原料', desc: '健康安心' },
                  ].map((item, index) => (
                    <div
                      key={index}
                      className="bg-white rounded-2xl p-6 border border-[#e0ddd5] text-center hover:shadow-lg transition-shadow"
                    >
                      <div className="text-3xl font-bold text-[#363533] mb-1">
                        {item.value}
                        <span className="text-lg">{item.unit}</span>
                      </div>
                      <div className="text-sm font-medium text-[#363533] mb-1">
                        {item.label}
                      </div>
                      <div className="text-xs text-[#5e5e5e]">{item.desc}</div>
                    </div>
                  ))}
                </div>
              )}

              {/* Common Info Card */}
              <div className="bg-emerald-700 rounded-3xl p-8 text-white">
                <h4 className="text-lg font-semibold mb-4">我们的承诺</h4>
                <ul className="space-y-3">
                  {[
                    '所有产品均明确标注营养成分',
                    '使用天然代糖，拒绝人工甜味剂',
                    '每批次产品均经过严格质检',
                    '为不同饮食需求提供专业建议',
                  ].map((item, index) => (
                    <li key={index} className="flex items-center gap-3 text-white/80">
                      <CheckCircle2 className="w-5 h-5 text-emerald-300 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HealthyConcept;
