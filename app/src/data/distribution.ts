import { Building2, Store, ShoppingBag, Smartphone, FileText, Image, BookOpen, MessageSquare } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

export interface CooperationModel {
  icon: LucideIcon;
  title: string;
  subtitle: string;
  target: string;
  highlights: string[];
  caseLabel: string;
}

export interface GrowthTier {
  level: string;
  requirement: string;
  benefits: string[];
  emoji: string;
}

export interface ToolkitItem {
  icon: LucideIcon;
  title: string;
  desc: string;
}

export interface Partner {
  name: string;
  desc: string;
  type: string;
}

export interface ProfitConfig {
  name: string;
  marginMin: number;
  marginMax: number;
}

export const cooperationModels: CooperationModel[] = [
  {
    icon: Building2,
    title: '控糖机构供应',
    subtitle: '专业机构合作',
    target: '控糖管理机构、糖尿病教育中心、营养咨询机构',
    highlights: [
      '专业营养师团队背书，精准触达控糖人群',
      '机构专属供货价，毛利空间40%-55%',
      '提供定制化产品方案与营养标签支持',
      '联合举办控糖饮食讲座，共建专业品牌形象',
    ],
    caseLabel: '合作案例：上海山丘控糖管理机构（30+注册营养师）',
  },
  {
    icon: Store,
    title: '控糖餐厅供货',
    subtitle: '餐饮渠道合作',
    target: '控糖主题餐厅、健康轻食店、生酮餐厅',
    highlights: [
      '工厂直供价，无中间环节',
      '可定制餐厅专属包装与规格',
      '提供控糖菜单搭配方案',
      '支持小批量试单，降低合作门槛',
    ],
    caseLabel: '已服务多家线下控糖餐厅',
  },
  {
    icon: ShoppingBag,
    title: '社区店/团购',
    subtitle: '社区渠道合作',
    target: '社区团购团长、控糖社区店、健康食品零售店',
    highlights: [
      '低起订量，灵活补货机制',
      '毛利空间35%-50%，复购率高',
      '总部提供开店选品指导与陈列方案',
      '区域保护政策，避免同区竞争',
    ],
    caseLabel: '控糖社区店模式洽谈中，首批合作伙伴招募',
  },
  {
    icon: Smartphone,
    title: '线上分销',
    subtitle: '达人/电商合作',
    target: '抖音/小红书/微信达人、线上分销商、社群团长',
    highlights: [
      '免费寄送样品体验',
      '提供全套内容素材包（图文+视频脚本）',
      '阶梯佣金15%-25%，销量越高比例越高',
      '专属优惠券与粉丝福利支持',
    ],
    caseLabel: '合作伙伴：瘦龙健康（100万+粉丝）',
  },
];

export const growthTiers: GrowthTier[] = [
  { level: '种子伙伴', requirement: '首次合作', benefits: ['基础供货价', '产品培训资料', '在线客服支持'], emoji: '🌱' },
  { level: '认证经销商', requirement: '累计采购满 ¥30,000', benefits: ['专属价格梯度', '营销素材包', '1对1客户经理'], emoji: '🥈' },
  { level: '城市合伙人', requirement: '累计采购满 ¥100,000', benefits: ['城市级区域保护', '定制产品权限', '联合营销基金'], emoji: '🥇' },
  { level: '战略合伙人', requirement: '累计采购满 ¥300,000', benefits: ['最优供货价', '新品优先试销权', '年度分红机制'], emoji: '💎' },
];

export const toolkitItems: ToolkitItem[] = [
  { icon: FileText, title: '产品手册', desc: '完整产品线介绍与营养数据' },
  { icon: Image, title: '社交媒体素材包', desc: '小红书/抖音图文与视频脚本模板' },
  { icon: BookOpen, title: '控糖科普资料', desc: '低GI/生酮知识卡片与话术指南' },
  { icon: MessageSquare, title: '销售话术指南', desc: '针对不同客群的沟通要点' },
];

export const partners: Partner[] = [
  { name: '上海山丘控糖管理', desc: '30+注册营养师，客户遍布全国', type: '控糖机构' },
  { name: '瘦龙健康', desc: '100万+粉丝，生酮领域头部KOL', type: '内容合作' },
  { name: '天猫旗舰店', desc: '线上主力销售渠道', type: '电商平台' },
  { name: '抖音电商', desc: '短视频+直播带货', type: '电商平台' },
  { name: '阿里巴巴', desc: 'B2B批发供货渠道', type: 'B2B平台' },
];

export const profitConfigs: ProfitConfig[] = [
  { name: '控糖机构', marginMin: 0.40, marginMax: 0.55 },
  { name: '控糖餐厅', marginMin: 0.35, marginMax: 0.50 },
  { name: '社区店/团购', marginMin: 0.35, marginMax: 0.50 },
  { name: '线上分销', marginMin: 0.15, marginMax: 0.25 },
];

export const healthTransform = [
  { label: '血压', before: '偏高', after: '正常', icon: '❤️' },
  { label: '血糖', before: '偏高', after: '正常', icon: '🩸' },
  { label: '血脂', before: '偏高', after: '正常', icon: '💪' },
];

export const factoryFeatures = [
  '自主研发，手工精制',
  '全系产品碳水低于低GI标准',
  '经专业营养专家组审查通过',
  '创始人亲身验证生酮生活方式',
];

export const applySteps = [
  { step: 1, title: '提交申请', desc: '填写合作申请表，说明您的渠道情况' },
  { step: 2, title: '方案对接', desc: '专属客户经理1-3个工作日内联系您' },
  { step: 3, title: '样品体验', desc: '免费寄送样品，亲自体验产品品质' },
  { step: 4, title: '签约合作', desc: '确认合作模式，签署协议正式开始' },
];
