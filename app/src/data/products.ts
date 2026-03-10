export interface PlatformLink {
  platform: 'taobao' | 'tmall' | 'jd' | 'douyin' | 'xiaohongshu' | 'wechat';
  name: string;
  url: string;
  icon: string;
}

export interface ProductModule {
  id: string;
  name: string;
  content: string;
  enabled: boolean;
}

export interface Product {
  id: string;
  name: string;
  category: 'keto' | 'regular';
  categoryName: string;
  price: number;
  originalPrice?: number;
  image: string;
  gallery: string[];
  description: string;
  shortDescription: string;
  features: string[];
  ingredients: string[];
  nutritionFacts: {
    servingSize: string;
    calories: number;
    totalFat: number;
    saturatedFat: number;
    cholesterol: number;
    sodium: number;
    totalCarbs: number;
    dietaryFiber: number;
    sugars: number;
    protein: number;
  };
  storageInstructions: string;
  shelfLife: string;
  weight: string;
  tags: string[];
  isNew?: boolean;
  isBestseller?: boolean;
  rating: number;
  reviewCount: number;
  enabledModules?: string[];
  platformLinks?: PlatformLink[];
  metaTitle?: string;
  metaDescription?: string;
  keywords?: string[];
  story?: string;
  productionProcess?: string[];
  certifications?: string[];
}

export const productModules: ProductModule[] = [
  { id: 'story', name: '品牌故事', content: '', enabled: true },
  { id: 'ingredients', name: '食材用料', content: '', enabled: true },
  { id: 'nutrition', name: '营养成分', content: '', enabled: true },
  { id: 'production', name: '生产工艺', content: '', enabled: true },
  { id: 'reviews', name: '用户评价', content: '', enabled: true },
  { id: 'certifications', name: '认证资质', content: '', enabled: true },
  { id: 'storage', name: '储存方法', content: '', enabled: true },
  { id: 'platforms', name: '购买渠道', content: '', enabled: true },
];

const generatePlatformLinks = (productName: string): PlatformLink[] => [
  { platform: 'taobao', name: '淘宝', url: `https://s.taobao.com/search?q=${encodeURIComponent(productName)}`, icon: '🛒' },
  { platform: 'tmall', name: '天猫', url: `https://list.tmall.com/search_product.htm?q=${encodeURIComponent(productName)}`, icon: '🏪' },
  { platform: 'jd', name: '京东', url: `https://search.jd.com/Search?keyword=${encodeURIComponent(productName)}`, icon: '📦' },
  { platform: 'douyin', name: '抖音商城', url: `https://www.douyin.com/search/${encodeURIComponent(productName)}`, icon: '🎵' },
  { platform: 'wechat', name: '微信小程序', url: '#wechat-mini-program', icon: '💬' },
];

export const products: Product[] = [
  {
    id: 'keto-bread-001',
    name: '生酮吐司面包',
    category: 'keto',
    categoryName: '生酮系列',
    price: 38.8,
    originalPrice: 48.0,
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=800&q=80',
      'https://images.unsplash.com/photo-1598373182133-52452f7691ef?w=800&q=80',
      'https://images.unsplash.com/photo-1549931319-a545dcf3bc73?w=800&q=80',
    ],
    description: '采用进口杏仁粉、椰子粉制作，每片仅含2g净碳水，富含膳食纤维和健康脂肪。无添加糖、无麸质，是生酮饮食者的理想选择。',
    shortDescription: '低碳水高纤维，生酮饮食首选',
    features: [
      '每片仅2g净碳水，完美适配生酮饮食',
      '富含膳食纤维，饱腹感持久',
      '采用进口杏仁粉、椰子粉制作',
      '无添加糖、无麸质、无防腐剂',
      '口感松软，麦香浓郁',
    ],
    ingredients: [
      '杏仁粉（美国进口）',
      '椰子粉（菲律宾进口）',
      '洋车前子壳粉',
      '草饲黄油',
      '散养鸡蛋',
      '赤藓糖醇',
      '泡打粉',
      '海盐',
    ],
    nutritionFacts: {
      servingSize: '50g/片',
      calories: 145,
      totalFat: 12,
      saturatedFat: 4.5,
      cholesterol: 35,
      sodium: 180,
      totalCarbs: 8,
      dietaryFiber: 6,
      sugars: 1,
      protein: 6,
    },
    storageInstructions: '0-4°C冷藏保存，开封后请尽快食用',
    shelfLife: '冷藏7天，冷冻30天',
    weight: '400g（8片装）',
    tags: ['生酮', '低碳水', '无麸质', '高纤维'],
    isNew: true,
    isBestseller: true,
    rating: 4.9,
    reviewCount: 328,
    enabledModules: ['story', 'ingredients', 'nutrition', 'production', 'reviews', 'certifications', 'storage', 'platforms'],
    platformLinks: generatePlatformLinks('生酮吐司面包'),
    metaTitle: '生酮吐司面包 | 米黛尔控糖烘焙 - 低碳水高纤维',
    metaDescription: '米黛尔生酮吐司面包，每片仅2g净碳水，采用进口杏仁粉制作，无添加糖无麸质，生酮饮食者的理想选择。',
    keywords: ['生酮面包', '低碳水吐司', '无糖面包', '生酮食品', '控糖烘焙'],
    story: '这款生酮吐司的诞生源于我们对健康饮食的执着追求。经过上百次配方调试，我们终于找到了完美的比例，让生酮饮食者也能享受美味的面包。',
    productionProcess: [
      '精选进口杏仁粉、椰子粉原料',
      '低温慢速搅拌，保留营养',
      '恒温发酵，口感更松软',
      '分段烘烤，外酥内软',
      '快速冷却，锁住新鲜',
    ],
    certifications: ['ISO22000食品安全认证', 'HACCP危害分析关键控制点', '有机原料认证'],
  },
  {
    id: 'keto-cake-002',
    name: '生酮芝士蛋糕',
    category: 'keto',
    categoryName: '生酮系列',
    price: 128.0,
    originalPrice: 158.0,
    image: 'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=800&q=80',
      'https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=800&q=80',
      'https://images.unsplash.com/photo-1524351199678-941a58a3df26?w=800&q=80',
    ],
    description: '新西兰进口奶油芝士，搭配天然代糖，每100g仅含3g净碳水。口感绵密顺滑，入口即化，是生酮饮食者的甜品福音。',
    shortDescription: '绵密顺滑，入口即化的生酮甜品',
    features: [
      '新西兰进口奶油芝士制作',
      '每100g仅3g净碳水',
      '天然代糖，零血糖负担',
      '口感绵密，入口即化',
      '6寸大小，适合2-4人分享',
    ],
    ingredients: [
      '奶油芝士（新西兰进口）',
      '淡奶油（法国进口）',
      '赤藓糖醇',
      '散养鸡蛋',
      '柠檬汁',
      '香草精',
      '黄油',
    ],
    nutritionFacts: {
      servingSize: '100g',
      calories: 320,
      totalFat: 28,
      saturatedFat: 16,
      cholesterol: 95,
      sodium: 280,
      totalCarbs: 5,
      dietaryFiber: 2,
      sugars: 1,
      protein: 12,
    },
    storageInstructions: '0-4°C冷藏保存，建议2小时内食用完毕',
    shelfLife: '冷藏3天',
    weight: '500g（6寸）',
    tags: ['生酮', '芝士蛋糕', '低碳水', '甜品'],
    isBestseller: true,
    rating: 4.8,
    reviewCount: 256,
    enabledModules: ['story', 'ingredients', 'nutrition', 'production', 'reviews', 'certifications', 'storage', 'platforms'],
    platformLinks: generatePlatformLinks('生酮芝士蛋糕'),
    metaTitle: '生酮芝士蛋糕 | 米黛尔控糖烘焙 - 低碳水甜品',
    metaDescription: '米黛尔生酮芝士蛋糕，新西兰进口奶油芝士制作，每100g仅3g净碳水，口感绵密顺滑，生酮饮食者的甜品福音。',
    keywords: ['生酮蛋糕', '芝士蛋糕', '低碳水甜品', '无糖蛋糕', '控糖烘焙'],
    story: '我们的生酮芝士蛋糕配方经过上百次调试，只为找到最完美的口感。采用新西兰进口奶油芝士，搭配天然代糖，让生酮饮食者也能享受甜品的美好。',
    productionProcess: [
      '奶油芝士室温软化',
      '分次加入代糖打发',
      '逐个加入鸡蛋搅拌均匀',
      '水浴烘烤，口感更细腻',
      '冷藏定型，风味更佳',
    ],
    certifications: ['ISO22000食品安全认证', 'HACCP危害分析关键控制点'],
  },
  {
    id: 'keto-brownie-003',
    name: '生酮巧克力布朗尼',
    category: 'keto',
    categoryName: '生酮系列',
    price: 58.0,
    originalPrice: 68.0,
    image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=800&q=80',
      'https://images.unsplash.com/photo-1610611424854-5e07032143d8?w=800&q=80',
      'https://images.unsplash.com/photo-1589119908995-c6837d8ec81c?w=800&q=80',
    ],
    description: '比利时黑巧克力，搭配夏威夷果，每块仅含2.5g净碳水。外酥内软，巧克力味浓郁，是下午茶的最佳伴侣。',
    shortDescription: '比利时黑巧，外酥内软',
    features: [
      '比利时85%黑巧克力制作',
      '每块仅2.5g净碳水',
      '添加夏威夷果，口感丰富',
      '外酥内软，巧克力味浓郁',
      '独立包装，方便携带',
    ],
    ingredients: [
      '黑巧克力（比利时进口，85%可可含量）',
      '杏仁粉',
      '黄油',
      '赤藓糖醇',
      '夏威夷果',
      '散养鸡蛋',
      '可可粉',
      '香草精',
    ],
    nutritionFacts: {
      servingSize: '40g/块',
      calories: 165,
      totalFat: 14,
      saturatedFat: 6,
      cholesterol: 25,
      sodium: 45,
      totalCarbs: 6,
      dietaryFiber: 3.5,
      sugars: 1,
      protein: 4,
    },
    storageInstructions: '常温避光保存，或冷藏保存',
    shelfLife: '常温15天，冷藏30天',
    weight: '240g（6块装）',
    tags: ['生酮', '巧克力', '布朗尼', '低碳水'],
    isNew: true,
    rating: 4.7,
    reviewCount: 189,
    enabledModules: ['story', 'ingredients', 'nutrition', 'production', 'reviews', 'certifications', 'storage', 'platforms'],
    platformLinks: generatePlatformLinks('生酮巧克力布朗尼'),
    metaTitle: '生酮巧克力布朗尼 | 米黛尔控糖烘焙 - 低碳水甜品',
    metaDescription: '米黛尔生酮巧克力布朗尼，比利时85%黑巧克力制作，每块仅2.5g净碳水，外酥内软，巧克力味浓郁。',
    keywords: ['生酮布朗尼', '巧克力布朗尼', '低碳水甜品', '无糖巧克力', '控糖烘焙'],
    story: '这款布朗尼的灵感来自比利时巧克力工坊。我们将传统配方改良为生酮版本，保留浓郁巧克力风味的同时，大幅降低碳水含量。',
    productionProcess: [
      '黑巧克力隔水融化',
      '黄油与代糖打发',
      '混合杏仁粉与可可粉',
      '加入夏威夷果碎',
      '分段烘烤，外酥内软',
    ],
    certifications: ['ISO22000食品安全认证'],
  },
  {
    id: 'sugarfree-cookie-004',
    name: '无糖燕麦曲奇',
    category: 'regular',
    categoryName: '常规控糖系列',
    price: 32.8,
    originalPrice: 42.0,
    image: 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=800&q=80',
      'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=800&q=80',
      'https://images.unsplash.com/photo-1590080875515-8a3a8dc5735e?w=800&q=80',
    ],
    description: '澳洲进口燕麦，搭配核桃仁，无添加蔗糖。富含膳食纤维，饱腹感强，是健康零食的首选。',
    shortDescription: '澳洲燕麦，富含膳食纤维',
    features: [
      '澳洲进口燕麦制作',
      '无添加蔗糖，使用天然代糖',
      '添加核桃仁，营养丰富',
      '富含膳食纤维，饱腹感强',
      '酥脆可口，老少皆宜',
    ],
    ingredients: [
      '燕麦片（澳洲进口）',
      '核桃仁',
      '全麦粉',
      '赤藓糖醇',
      '黄油',
      '散养鸡蛋',
      '香草精',
      '肉桂粉',
    ],
    nutritionFacts: {
      servingSize: '30g/块',
      calories: 125,
      totalFat: 7,
      saturatedFat: 2.5,
      cholesterol: 15,
      sodium: 65,
      totalCarbs: 14,
      dietaryFiber: 3,
      sugars: 1,
      protein: 3,
    },
    storageInstructions: '常温密封保存，避免潮湿',
    shelfLife: '常温30天',
    weight: '180g（6块装）',
    tags: ['无糖', '燕麦', '高纤维', '健康零食'],
    isBestseller: true,
    rating: 4.8,
    reviewCount: 412,
    enabledModules: ['story', 'ingredients', 'nutrition', 'production', 'reviews', 'certifications', 'storage', 'platforms'],
    platformLinks: generatePlatformLinks('无糖燕麦曲奇'),
    metaTitle: '无糖燕麦曲奇 | 米黛尔控糖烘焙 - 健康零食',
    metaDescription: '米黛尔无糖燕麦曲奇，澳洲进口燕麦制作，无添加蔗糖，富含膳食纤维，是健康零食的首选。',
    keywords: ['无糖曲奇', '燕麦饼干', '健康零食', '控糖食品', '高纤维'],
    story: '这款曲奇源于我们对健康零食的追求。澳洲进口燕麦搭配核桃仁，无添加蔗糖，让每一口都充满自然的香甜。',
    productionProcess: [
      '燕麦片低温烘焙',
      '核桃仁切碎备用',
      '黄油与代糖打发',
      '混合所有原料成型',
      '分段烘烤至金黄酥脆',
    ],
    certifications: ['ISO22000食品安全认证', '绿色食品认证'],
  },
  {
    id: 'sugarfree-mooncake-005',
    name: '无糖冰皮月饼',
    category: 'regular',
    categoryName: '常规控糖系列',
    price: 168.0,
    originalPrice: 198.0,
    image: 'https://images.unsplash.com/photo-1631857502787-8e9b1f4e5e6f?w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1631857502787-8e9b1f4e5e6f?w=800&q=80',
      'https://images.unsplash.com/photo-1568158879083-c42860933ed7?w=800&q=80',
      'https://images.unsplash.com/photo-1601312378427-b239537f2831?w=800&q=80',
    ],
    description: '传统中秋美味，创新无糖配方。采用天然代糖，保留传统风味的同时，让血糖不再飙升。礼盒装，送礼自用两相宜。',
    shortDescription: '传统美味，创新无糖配方',
    features: [
      '传统冰皮工艺制作',
      '天然代糖，零血糖负担',
      '四种口味：豆沙、莲蓉、五仁、抹茶',
      '精美礼盒包装',
      '送礼自用两相宜',
    ],
    ingredients: [
      '糯米粉',
      '粘米粉',
      '澄粉',
      '赤藓糖醇',
      '红豆沙馅',
      '莲蓉馅',
      '五仁馅',
      '抹茶馅',
      '椰浆',
    ],
    nutritionFacts: {
      servingSize: '60g/个',
      calories: 145,
      totalFat: 4,
      saturatedFat: 1.5,
      cholesterol: 0,
      sodium: 25,
      totalCarbs: 26,
      dietaryFiber: 2,
      sugars: 2,
      protein: 3,
    },
    storageInstructions: '0-4°C冷藏保存',
    shelfLife: '冷藏15天',
    weight: '480g（8个装，4种口味）',
    tags: ['无糖', '月饼', '节日礼品', '传统糕点'],
    isNew: true,
    rating: 4.9,
    reviewCount: 156,
    enabledModules: ['story', 'ingredients', 'nutrition', 'production', 'reviews', 'certifications', 'storage', 'platforms'],
    platformLinks: generatePlatformLinks('无糖冰皮月饼'),
    metaTitle: '无糖冰皮月饼 | 米黛尔控糖烘焙 - 节日礼品',
    metaDescription: '米黛尔无糖冰皮月饼，传统中秋美味创新无糖配方，天然代糖零血糖负担，精美礼盒包装，送礼自用两相宜。',
    keywords: ['无糖月饼', '冰皮月饼', '中秋礼品', '控糖食品', '传统糕点'],
    story: '中秋佳节，月饼是不可或缺的传统美食。我们的无糖冰皮月饼，让糖尿病患者和控糖人群也能安心享用这份团圆美味。',
    productionProcess: [
      '糯米粉、粘米粉、澄粉混合',
      '加入椰浆和代糖蒸制冰皮',
      '制作四种口味馅料',
      '包制月饼成型',
      '冷藏定型，口感更佳',
    ],
    certifications: ['ISO22000食品安全认证', 'HACCP危害分析关键控制点'],
  },
  {
    id: 'sugarfree-bread-006',
    name: '全麦无糖吐司',
    category: 'regular',
    categoryName: '常规控糖系列',
    price: 28.8,
    originalPrice: 35.0,
    image: 'https://images.unsplash.com/photo-1598373182133-52452f7691ef?w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1598373182133-52452f7691ef?w=800&q=80',
      'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=800&q=80',
      'https://images.unsplash.com/photo-1549931319-a545dcf3bc73?w=800&q=80',
    ],
    description: '100%全麦粉制作，富含膳食纤维和维生素B族。无添加蔗糖，低GI值，是控糖人群的理想主食选择。',
    shortDescription: '100%全麦，富含膳食纤维',
    features: [
      '100%全麦粉制作',
      '无添加蔗糖，低GI值',
      '富含膳食纤维和维生素B族',
      '口感扎实，麦香浓郁',
      '适合控糖人群日常主食',
    ],
    ingredients: [
      '全麦粉',
      '酵母',
      '海盐',
      '橄榄油',
      '水',
      '小麦胚芽',
    ],
    nutritionFacts: {
      servingSize: '50g/片',
      calories: 110,
      totalFat: 2,
      saturatedFat: 0.3,
      cholesterol: 0,
      sodium: 150,
      totalCarbs: 20,
      dietaryFiber: 4,
      sugars: 1,
      protein: 5,
    },
    storageInstructions: '常温密封保存，或冷冻保存',
    shelfLife: '常温3天，冷冻30天',
    weight: '400g（8片装）',
    tags: ['无糖', '全麦', '高纤维', '低GI'],
    rating: 4.6,
    reviewCount: 278,
    enabledModules: ['story', 'ingredients', 'nutrition', 'production', 'reviews', 'certifications', 'storage', 'platforms'],
    platformLinks: generatePlatformLinks('全麦无糖吐司'),
    metaTitle: '全麦无糖吐司 | 米黛尔控糖烘焙 - 健康主食',
    metaDescription: '米黛尔全麦无糖吐司，100%全麦粉制作，无添加蔗糖低GI值，富含膳食纤维，是控糖人群的理想主食选择。',
    keywords: ['全麦吐司', '无糖面包', '低GI食品', '控糖主食', '健康烘焙'],
    story: '全麦吐司是控糖人群的理想主食选择。我们采用100%全麦粉制作，保留麦麸和胚芽的营养成分，让每一口都充满健康。',
    productionProcess: [
      '全麦粉与水混合静置',
      '加入酵母发酵',
      '揉面至完全扩展',
      '分割成型入模',
      '烘烤至金黄',
    ],
    certifications: ['ISO22000食品安全认证', '绿色食品认证'],
  },
  {
    id: 'keto-muffin-007',
    name: '生酮蓝莓马芬',
    category: 'keto',
    categoryName: '生酮系列',
    price: 48.0,
    originalPrice: 58.0,
    image: 'https://images.unsplash.com/photo-1607958996333-41aef7caefaa?w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1607958996333-41aef7caefaa?w=800&q=80',
      'https://images.unsplash.com/photo-1576618148400-f54bed99fcfd?w=800&q=80',
      'https://images.unsplash.com/photo-1568051243851-f9b136146e97?w=800&q=80',
    ],
    description: '新鲜蓝莓搭配杏仁粉，每颗仅含3g净碳水。口感松软，蓝莓爆浆，是生酮早餐的完美选择。',
    shortDescription: '新鲜蓝莓，松软爆浆',
    features: [
      '新鲜蓝莓制作',
      '每颗仅3g净碳水',
      '杏仁粉替代小麦粉',
      '口感松软，蓝莓爆浆',
      '独立包装，方便携带',
    ],
    ingredients: [
      '杏仁粉',
      '新鲜蓝莓',
      '赤藓糖醇',
      '黄油',
      '散养鸡蛋',
      '泡打粉',
      '香草精',
      '柠檬汁',
    ],
    nutritionFacts: {
      servingSize: '60g/个',
      calories: 165,
      totalFat: 13,
      saturatedFat: 5,
      cholesterol: 45,
      sodium: 120,
      totalCarbs: 9,
      dietaryFiber: 6,
      sugars: 2,
      protein: 5,
    },
    storageInstructions: '0-4°C冷藏保存',
    shelfLife: '冷藏5天，冷冻21天',
    weight: '240g（4个装）',
    tags: ['生酮', '蓝莓', '马芬', '早餐'],
    rating: 4.7,
    reviewCount: 145,
    enabledModules: ['story', 'ingredients', 'nutrition', 'production', 'reviews', 'certifications', 'storage', 'platforms'],
    platformLinks: generatePlatformLinks('生酮蓝莓马芬'),
    metaTitle: '生酮蓝莓马芬 | 米黛尔控糖烘焙 - 生酮早餐',
    metaDescription: '米黛尔生酮蓝莓马芬，新鲜蓝莓搭配杏仁粉，每颗仅3g净碳水，口感松软蓝莓爆浆，是生酮早餐的完美选择。',
    keywords: ['生酮马芬', '蓝莓马芬', '生酮早餐', '低碳水', '控糖烘焙'],
    story: '这款马芬的灵感来自美式早餐文化。我们用杏仁粉替代小麦粉，加入新鲜蓝莓，创造出这款生酮友好的美味早餐。',
    productionProcess: [
      '杏仁粉与泡打粉混合',
      '黄油与代糖打发',
      '逐个加入鸡蛋',
      '轻轻拌入新鲜蓝莓',
      '烘烤至金黄蓬松',
    ],
    certifications: ['ISO22000食品安全认证'],
  },
  {
    id: 'sugarfree-macaron-008',
    name: '无糖法式马卡龙',
    category: 'regular',
    categoryName: '常规控糖系列',
    price: 88.0,
    originalPrice: 108.0,
    image: 'https://images.unsplash.com/photo-1569864358642-9d1684040f43?w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1569864358642-9d1684040f43?w=800&q=80',
      'https://images.unsplash.com/photo-1470124182917-cc6e71b22ecc?w=800&q=80',
      'https://images.unsplash.com/photo-1468218620578-e8d78dcda7b1?w=800&q=80',
    ],
    description: '法式经典甜品，创新无糖配方。外壳酥脆，内馅绵密，多种口味可选。是送礼的精致选择。',
    shortDescription: '法式经典，外壳酥脆内馅绵密',
    features: [
      '法式传统工艺制作',
      '天然代糖，零血糖负担',
      '外壳酥脆，内馅绵密',
      '6种口味：香草、巧克力、抹茶、玫瑰、柠檬、咖啡',
      '精美礼盒包装',
    ],
    ingredients: [
      '杏仁粉',
      '蛋白',
      '赤藓糖醇',
      '淡奶油',
      '黄油',
      '香草精',
      '可可粉',
      '抹茶粉',
      '玫瑰酱',
      '柠檬汁',
      '咖啡粉',
    ],
    nutritionFacts: {
      servingSize: '20g/个',
      calories: 65,
      totalFat: 4,
      saturatedFat: 1.5,
      cholesterol: 5,
      sodium: 15,
      totalCarbs: 6,
      dietaryFiber: 1,
      sugars: 1,
      protein: 2,
    },
    storageInstructions: '0-4°C冷藏保存',
    shelfLife: '冷藏7天',
    weight: '120g（6个装，6种口味）',
    tags: ['无糖', '马卡龙', '法式甜品', '礼品'],
    isNew: true,
    rating: 4.8,
    reviewCount: 98,
    enabledModules: ['story', 'ingredients', 'nutrition', 'production', 'reviews', 'certifications', 'storage', 'platforms'],
    platformLinks: generatePlatformLinks('无糖法式马卡龙'),
    metaTitle: '无糖法式马卡龙 | 米黛尔控糖烘焙 - 精致礼品',
    metaDescription: '米黛尔无糖法式马卡龙，法式经典甜品创新无糖配方，外壳酥脆内馅绵密，6种口味可选，是送礼的精致选择。',
    keywords: ['无糖马卡龙', '法式马卡龙', '精致礼品', '控糖甜品', '法式烘焙'],
    story: '马卡龙是法式甜品的代表。我们的无糖版本保留了传统工艺的精髓，用天然代糖替代蔗糖，让每个人都能享受这份精致。',
    productionProcess: [
      '杏仁粉与糖粉混合研磨',
      '蛋白打发至硬性发泡',
      '翻拌面糊至完美状态',
      '挤制晾干形成硬壳',
      '低温烘烤，形成裙边',
    ],
    certifications: ['ISO22000食品安全认证'],
  },
  {
    id: 'keto-cookie-009',
    name: '生酮黄油曲奇',
    category: 'keto',
    categoryName: '生酮系列',
    price: 42.0,
    originalPrice: 52.0,
    image: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=800&q=80',
      'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=800&q=80',
      'https://images.unsplash.com/photo-1590080875515-8a3a8dc5735e?w=800&q=80',
    ],
    description: '法国进口黄油，搭配杏仁粉，每块仅含1.5g净碳水。酥脆可口，黄油香味浓郁，是下午茶的完美搭配。',
    shortDescription: '法国黄油，酥脆香浓',
    features: [
      '法国进口黄油制作',
      '每块仅1.5g净碳水',
      '杏仁粉替代小麦粉',
      '酥脆可口，黄油香浓',
      '独立包装，方便携带',
    ],
    ingredients: [
      '黄油（法国进口）',
      '杏仁粉',
      '赤藓糖醇',
      '散养鸡蛋',
      '香草精',
      '海盐',
    ],
    nutritionFacts: {
      servingSize: '25g/块',
      calories: 135,
      totalFat: 12,
      saturatedFat: 5,
      cholesterol: 30,
      sodium: 45,
      totalCarbs: 4,
      dietaryFiber: 2.5,
      sugars: 0.5,
      protein: 3,
    },
    storageInstructions: '常温密封保存',
    shelfLife: '常温21天',
    weight: '150g（6块装）',
    tags: ['生酮', '黄油曲奇', '低碳水', '下午茶'],
    rating: 4.9,
    reviewCount: 234,
    enabledModules: ['story', 'ingredients', 'nutrition', 'production', 'reviews', 'certifications', 'storage', 'platforms'],
    platformLinks: generatePlatformLinks('生酮黄油曲奇'),
    metaTitle: '生酮黄油曲奇 | 米黛尔控糖烘焙 - 低碳水零食',
    metaDescription: '米黛尔生酮黄油曲奇，法国进口黄油搭配杏仁粉，每块仅1.5g净碳水，酥脆可口黄油香浓，是下午茶的完美搭配。',
    keywords: ['生酮曲奇', '黄油曲奇', '低碳水零食', '控糖食品', '生酮烘焙'],
    story: '这款曲奇源于丹麦传统配方。我们用杏仁粉替代小麦粉，用天然代糖替代蔗糖，创造出这款生酮友好的经典曲奇。',
    productionProcess: [
      '黄油室温软化',
      '与代糖打发至蓬松',
      '加入鸡蛋和香草精',
      '混合杏仁粉成型',
      '低温烘烤至金黄酥脆',
    ],
    certifications: ['ISO22000食品安全认证', 'HACCP危害分析关键控制点'],
  },
];

export const getProductById = (id: string): Product | undefined => {
  return products.find(product => product.id === id);
};

export const getProductsByCategory = (category: 'keto' | 'regular'): Product[] => {
  return products.filter(product => product.category === category);
};

export const getBestsellers = (): Product[] => {
  return products.filter(product => product.isBestseller);
};

export const getNewProducts = (): Product[] => {
  return products.filter(product => product.isNew);
};

export const getRelatedProducts = (currentProductId: string, limit: number = 4): Product[] => {
  const currentProduct = getProductById(currentProductId);
  if (!currentProduct) return [];
  
  return products
    .filter(product => product.id !== currentProductId && product.category === currentProduct.category)
    .slice(0, limit);
};

// 产品管理函数
const PRODUCTS_STORAGE_KEY = 'midaiersweet_products';

// 获取所有产品（优先从localStorage）
export const getAllProducts = (): Product[] => {
  const stored = localStorage.getItem(PRODUCTS_STORAGE_KEY);
  if (stored) {
    return JSON.parse(stored);
  }
  return products;
};

// 保存产品到localStorage
const saveProducts = (productList: Product[]): void => {
  localStorage.setItem(PRODUCTS_STORAGE_KEY, JSON.stringify(productList));
};

// 添加产品
export const addProduct = (product: Product): boolean => {
  const productList = getAllProducts();
  if (productList.find(p => p.id === product.id)) {
    return false;
  }
  productList.push(product);
  saveProducts(productList);
  return true;
};

// 更新产品
export const updateProduct = (id: string, updates: Partial<Product>): boolean => {
  const productList = getAllProducts();
  const index = productList.findIndex(p => p.id === id);
  if (index === -1) return false;
  
  productList[index] = { ...productList[index], ...updates };
  saveProducts(productList);
  return true;
};

// 删除产品
export const deleteProduct = (id: string): boolean => {
  const productList = getAllProducts();
  const filtered = productList.filter(p => p.id !== id);
  if (filtered.length === productList.length) return false;
  
  saveProducts(filtered);
  return true;
};

// 切换产品上架/下架状态
export const toggleProductStatus = (id: string): boolean => {
  const productList = getAllProducts();
  const product = productList.find(p => p.id === id);
  if (!product) return false;
  
  product.isBestseller = !product.isBestseller; // 用isBestseller作为上架标记
  saveProducts(productList);
  return true;
};

// 重置产品数据
export const resetProducts = (): void => {
  localStorage.removeItem(PRODUCTS_STORAGE_KEY);
};

// 产品管理器
export const productManager = {
  getAll: getAllProducts,
  add: addProduct,
  update: updateProduct,
  delete: deleteProduct,
  toggleStatus: toggleProductStatus,
  reset: resetProducts,
};
