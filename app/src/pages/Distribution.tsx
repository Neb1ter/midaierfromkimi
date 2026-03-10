import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, CheckCircle, Shield, Calculator, Heart, Star, Zap, Target, HandshakeIcon, Users, Download, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SEO } from '@/components/SEO';
import { cooperationModels, growthTiers, toolkitItems, partners, profitConfigs, healthTransform, factoryFeatures, applySteps } from '@/data/distribution';

gsap.registerPlugin(ScrollTrigger);

function ProfitCalc() {
  const [m, setM] = useState(0);
  const [vol, setVol] = useState(10000);
  const c = profitConfigs[m];
  const pMin = Math.round(vol * c.marginMin), pMax = Math.round(vol * c.marginMax);
  return (
    <div className="bg-white rounded-2xl p-6 lg:p-8 shadow-sm border border-stone-100">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-amber-100 rounded-xl flex items-center justify-center"><Calculator className="w-5 h-5 text-amber-600" /></div>
        <div><h3 className="font-semibold text-stone-800">利润预估计算器</h3><p className="text-sm text-stone-500">选择合作模式，预估您的月收益</p></div>
      </div>
      <label className="text-sm font-medium text-stone-600 mb-3 block">选择合作模式</label>
      <div className="grid grid-cols-2 gap-2 mb-6">
        {profitConfigs.map((pc, i) => (<button key={i} onClick={() => setM(i)} className={`px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${m === i ? 'bg-emerald-600 text-white' : 'bg-stone-50 text-stone-600 hover:bg-stone-100'}`}>{pc.name}</button>))}
      </div>
      <div className="flex items-center justify-between mb-3"><label className="text-sm font-medium text-stone-600">预估月采购额</label><span className="text-lg font-bold text-emerald-600">¥{vol.toLocaleString()}</span></div>
      <input type="range" min="5000" max="200000" step="5000" value={vol} onChange={e => setVol(Number(e.target.value))} className="w-full h-2 bg-stone-200 rounded-full appearance-none cursor-pointer accent-emerald-600 mb-1" />
      <div className="flex justify-between text-xs text-stone-400 mb-6"><span>¥5,000</span><span>¥200,000</span></div>
      <div className="bg-emerald-50 rounded-xl p-5">
        <div className="text-sm text-stone-500 mb-2">预估月毛利空间</div>
        <div className="text-3xl font-bold text-stone-800">¥{pMin.toLocaleString()} - ¥{pMax.toLocaleString()}</div>
        <div className="text-sm text-emerald-600 mt-2">毛利率 {Math.round(c.marginMin * 100)}% - {Math.round(c.marginMax * 100)}%</div>
        <div className="mt-4 pt-4 border-t border-emerald-100 text-xs text-stone-400">* 以上为预估数据，实际收益取决于销售价格、运营成本等因素</div>
      </div>
    </div>
  );
}

export const Distribution = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [form, setForm] = useState({ name: '', phone: '', company: '', type: '', message: '' });

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray('.da').forEach((el) => { gsap.fromTo(el as Element, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out', scrollTrigger: { trigger: el as Element, start: 'top 80%' } }); });
    }); return () => ctx.revert();
  }, []);

  const cur = cooperationModels[active];
  const CurIcon = cur.icon;

  return (
    <><SEO title="渠道合作中心 | 米黛尔控糖食品" description="加入米黛尔渠道合作计划，工厂直供控糖食品。" keywords={['控糖食品供应', '生酮食品代理', '分销合作']} />
    <div className="min-h-screen bg-white pt-20" ref={ref}>

      {/* Hero */}
      <section className="relative bg-stone-950 text-white overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-stone-950 via-stone-900 to-emerald-950" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-36">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-1.5 mb-6"><HandshakeIcon className="w-4 h-4 text-emerald-400" /><span className="text-sm text-stone-300">渠道合作中心</span></div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6 tracking-tight">工厂直供控糖食品<br /><span className="text-emerald-400">共建健康事业版图</span></h1>
            <p className="text-lg text-stone-400 leading-relaxed mb-10 max-w-2xl">米黛尔拥有自主研发与生产能力，全系产品符合低GI标准。面向控糖机构、餐厅、社区店、线上达人开放四类合作模式，提供全链路赋能。</p>
            <div className="flex flex-wrap gap-4">
              <a href="#apply"><Button size="lg" className="bg-emerald-600 hover:bg-emerald-700 text-white px-8">立即申请合作<ArrowRight className="w-4 h-4 ml-2" /></Button></a>
              <a href="#models"><Button size="lg" variant="outline" className="border-white/20 text-white hover:bg-white/10 px-8">了解合作模式</Button></a>
            </div>
            <div className="grid grid-cols-3 gap-6 mt-14 pt-8 border-t border-white/10">
              {[['9+', '在售产品款'], ['SC认证', '正规生产资质'], ['低GI', '全系产品标准']].map(([v, l], i) => (<div key={i}><div className="text-2xl lg:text-3xl font-bold">{v}</div><div className="text-sm text-stone-500 mt-1">{l}</div></div>))}
            </div>
          </div>
        </div>
      </section>

      {/* 为什么选择米黛尔 */}
      <section className="da py-20 lg:py-28 bg-stone-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div>
              <div className="inline-flex items-center gap-2 text-emerald-600 text-sm font-medium mb-4"><Shield className="w-4 h-4" /><span>合作优势</span></div>
              <h2 className="text-3xl lg:text-4xl font-bold text-stone-800 mb-6 leading-tight">为什么选择米黛尔<br /><span className="text-emerald-600">六大核心优势</span></h2>
              <div className="space-y-4 text-stone-600 leading-relaxed">
                <p>米黛尔专注于控糖烘焙领域，拥有<strong className="text-stone-800">自主研发、自主生产、自主品控</strong>的完整产业链能力，为合作伙伴提供稳定、可靠的产品供应。</p>
                <p>我们深知控糖人群的需求，每一款产品都经过严格的营养计算和口味调试，确保低GI值的同时不失美味。</p>
              </div>
              <div className="grid grid-cols-2 gap-3 mt-8">
                {[
                  { icon: '🏭', label: '自有工厂', desc: '5000㎡现代化产线' },
                  { icon: '🔬', label: '研发实力', desc: '专业营养师团队' },
                  { icon: '✅', label: '品质认证', desc: 'SC许可+低GI认证' },
                  { icon: '📦', label: '稳定供应', desc: '日产10万+产能' },
                ].map((h, i) => (
                  <div key={i} className="bg-white rounded-xl p-4 shadow-sm">
                    <div className="text-2xl mb-2">{h.icon}</div>
                    <div className="text-sm font-medium text-stone-800 mb-1">{h.label}</div>
                    <div className="text-xs text-stone-500">{h.desc}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-gradient-to-br from-emerald-50 to-stone-100 rounded-3xl p-8 lg:p-12">
              <div className="bg-white rounded-2xl p-6 shadow-sm mb-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center text-xl">🏭</div>
                  <div>
                    <div className="font-semibold text-stone-800">米黛尔食品工厂</div>
                    <div className="text-sm text-stone-500">SC生产许可 · 低GI专家认证</div>
                  </div>
                </div>
                <div className="space-y-2">
                  {factoryFeatures.map((t, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                      <span className="text-sm text-stone-600">{t}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <div className="text-sm font-medium text-stone-500 mb-3">品牌核心优势</div>
                {[
                  { I: Zap, c: 'text-amber-500', t: '研发壁垒', d: '手工制作工艺，大厂不涉足，小厂做不到' },
                  { I: Target, c: 'text-emerald-500', t: '价格优势', d: '2025年全新定价策略，工厂直供更具竞争力' },
                  { I: Shield, c: 'text-emerald-600', t: '品质保障', d: 'SC认证生产，低GI/生酮专家组审查通过' }
                ].map(({ I, c, t, d }, i) => (
                  <div key={i} className="flex items-start gap-3 mb-3">
                    <I className={`w-5 h-5 ${c} flex-shrink-0 mt-0.5`} />
                    <div>
                      <div className="text-sm font-medium text-stone-800">{t}</div>
                      <div className="text-xs text-stone-500">{d}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 四类合作模式 */}
      <section id="models" className="da py-20 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="text-emerald-600 text-sm font-medium tracking-wider uppercase mb-3 block">合作模式</span>
            <h2 className="text-3xl lg:text-4xl font-bold text-stone-800 mb-4">四种模式，灵活合作</h2>
            <p className="text-stone-500 max-w-2xl mx-auto">无论您是控糖机构、餐厅、社区店主还是线上达人，都能找到最适合的合作方式</p>
          </div>
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {cooperationModels.map((m, i) => { const I = m.icon; return (<button key={i} onClick={() => setActive(i)} className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all ${active === i ? 'bg-emerald-700 text-white shadow-lg' : 'bg-stone-100 text-stone-600 hover:bg-stone-200'}`}><I className="w-4 h-4" />{m.title}</button>); })}
          </div>
          <div className="bg-stone-50 rounded-3xl p-6 lg:p-10">
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
              <div>
                <div className="flex items-center gap-3 mb-4"><div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center"><CurIcon className="w-6 h-6 text-emerald-600" /></div><div><h3 className="text-xl font-bold text-stone-800">{cur.title}</h3><p className="text-sm text-stone-500">{cur.subtitle}</p></div></div>
                <div className="mb-6"><div className="text-sm font-medium text-stone-500 mb-2">目标合作伙伴</div><p className="text-stone-700">{cur.target}</p></div>
                <div className="space-y-3">{cur.highlights.map((h, i) => (<div key={i} className="flex items-start gap-3"><CheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" /><span className="text-stone-600">{h}</span></div>))}</div>
                <div className="mt-6 pt-6 border-t border-stone-200 flex items-center gap-2 text-sm text-stone-500"><Star className="w-4 h-4 text-amber-500" /><span>{cur.caseLabel}</span></div>
              </div>
              <ProfitCalc />
            </div>
          </div>
        </div>
      </section>

      {/* 合作伙伴 - 金色尊贵主题 */}
      <section className="da py-20 lg:py-28 bg-stone-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12"><span className="text-amber-600 text-sm font-medium tracking-wider uppercase mb-3 block">🤝 尊贵合作伙伴</span><h2 className="text-3xl lg:text-4xl font-bold text-stone-800 mb-4">已建立的合作网络</h2></div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {partners.map((p, i) => (<div key={i} className="bg-white rounded-xl p-6 hover:shadow-md transition-shadow border border-amber-100 hover:border-amber-200"><div className="flex items-start justify-between mb-3"><div className="w-12 h-12 bg-amber-50 rounded-xl flex items-center justify-center text-lg font-bold text-amber-600">{p.name[0]}</div><span className="text-xs bg-amber-50 text-amber-700 px-2 py-1 rounded-full font-medium">{p.type}</span></div><h3 className="font-semibold text-stone-800 mb-1">{p.name}</h3><p className="text-sm text-stone-500">{p.desc}</p></div>))}
            <div className="bg-gradient-to-br from-amber-50 to-amber-100 rounded-xl p-6 flex flex-col items-center justify-center text-center border border-amber-200"><Users className="w-8 h-8 text-amber-600 mb-2" /><h3 className="font-semibold text-amber-800 mb-1">成为下一位伙伴</h3><p className="text-sm text-amber-600">立即申请加入尊贵合作网络</p></div>
          </div>
        </div>
      </section>

      {/* 伙伴成长体系 - 金色尊贵主题 */}
      <section className="da py-20 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14"><span className="text-amber-600 text-sm font-medium tracking-wider uppercase mb-3 block">🏆 成长体系</span><h2 className="text-3xl lg:text-4xl font-bold text-stone-800 mb-4">伙伴晋级路径</h2><p className="text-stone-500 max-w-2xl mx-auto">从种子伙伴到战略合伙人，每一步晋级都解锁更多尊享权益</p></div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {growthTiers.map((t, i) => (
              <div key={i} className={`relative rounded-2xl p-6 hover:shadow-md transition-shadow ${i === 3 ? 'bg-gradient-to-br from-amber-50 to-amber-100 border-2 border-amber-300' : 'bg-stone-50'}`}>
                {i < growthTiers.length - 1 && <div className="hidden lg:block absolute top-1/2 -right-3 z-10"><ChevronRight className="w-6 h-6 text-stone-300" /></div>}
                <div className="text-3xl mb-3">{t.emoji}</div>
                <h3 className="font-bold text-stone-800 mb-1">{t.level}</h3>
                <p className={`text-xs font-medium mb-4 ${i === 3 ? 'text-amber-700' : 'text-emerald-600'}`}>{t.requirement}</p>
                <div className="space-y-2">{t.benefits.map((b, j) => (<div key={j} className="flex items-center gap-2"><CheckCircle className={`w-3.5 h-3.5 flex-shrink-0 ${i === 3 ? 'text-amber-500' : 'text-emerald-500'}`} /><span className="text-sm text-stone-600">{b}</span></div>))}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 赋能工具箱 */}
      <section className="da py-20 lg:py-28 bg-stone-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12"><span className="text-emerald-600 text-sm font-medium tracking-wider uppercase mb-3 block">赋能支持</span><h2 className="text-3xl lg:text-4xl font-bold text-stone-800 mb-4">合作伙伴工具箱</h2><p className="text-stone-500 max-w-2xl mx-auto">签约即享全套营销与运营支持资料</p></div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {toolkitItems.map((tk, i) => { const I = tk.icon; return (
              <div key={i} className="bg-white rounded-xl p-6 text-center hover:shadow-md transition-shadow border border-stone-100">
                <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center mx-auto mb-4"><I className="w-6 h-6 text-emerald-600" /></div>
                <h3 className="font-semibold text-stone-800 mb-2">{tk.title}</h3>
                <p className="text-sm text-stone-500 mb-4">{tk.desc}</p>
                <button className="inline-flex items-center gap-1 text-sm text-emerald-600 font-medium hover:text-emerald-700"><Download className="w-4 h-4" />签约后下载</button>
              </div>
            ); })}
          </div>
        </div>
      </section>

      {/* 合作流程 + 申请表单 */}
      <section id="apply" className="da py-20 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14"><span className="text-emerald-600 text-sm font-medium tracking-wider uppercase mb-3 block">立即行动</span><h2 className="text-3xl lg:text-4xl font-bold text-stone-800 mb-4">四步开启合作</h2></div>
          <div className="grid sm:grid-cols-4 gap-4 mb-16">
            {applySteps.map((s) => (<div key={s.step} className="text-center"><div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-3 text-emerald-700 font-bold text-lg">{s.step}</div><h3 className="font-semibold text-stone-800 mb-1">{s.title}</h3><p className="text-sm text-stone-500">{s.desc}</p></div>))}
          </div>
          <div className="max-w-2xl mx-auto">
            <div className="bg-stone-50 rounded-2xl p-6 lg:p-10">
              <h3 className="text-xl font-bold text-stone-800 mb-6 text-center">提交合作申请</h3>
              <form onSubmit={(e) => { e.preventDefault(); alert('申请已提交！我们将在1-3个工作日内联系您。'); setForm({ name: '', phone: '', company: '', type: '', message: '' }); }} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div><label className="text-sm font-medium text-stone-700 mb-1 block">姓名 *</label><input required value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} className="w-full px-4 py-2.5 rounded-lg border border-stone-200 focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none text-sm" placeholder="您的姓名" /></div>
                  <div><label className="text-sm font-medium text-stone-700 mb-1 block">电话 *</label><input required value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} className="w-full px-4 py-2.5 rounded-lg border border-stone-200 focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none text-sm" placeholder="联系电话" /></div>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div><label className="text-sm font-medium text-stone-700 mb-1 block">公司/门店</label><input value={form.company} onChange={e => setForm({ ...form, company: e.target.value })} className="w-full px-4 py-2.5 rounded-lg border border-stone-200 focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none text-sm" placeholder="公司或门店名称" /></div>
                  <div><label className="text-sm font-medium text-stone-700 mb-1 block">合作类型 *</label><select required value={form.type} onChange={e => setForm({ ...form, type: e.target.value })} className="w-full px-4 py-2.5 rounded-lg border border-stone-200 focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none text-sm bg-white"><option value="">请选择</option><option value="institution">控糖机构供应</option><option value="restaurant">控糖餐厅供货</option><option value="community">社区店/团购</option><option value="online">线上分销</option></select></div>
                </div>
                <div><label className="text-sm font-medium text-stone-700 mb-1 block">补充说明</label><textarea value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} rows={3} className="w-full px-4 py-2.5 rounded-lg border border-stone-200 focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none text-sm resize-none" placeholder="请简要介绍您的渠道情况和合作意向" /></div>
                <Button type="submit" size="lg" className="w-full bg-emerald-600 hover:bg-emerald-700 text-white">提交合作申请<ArrowRight className="w-4 h-4 ml-2" /></Button>
              </form>
            </div>
          </div>
        </div>
      </section>

    </div></>
  );
};
