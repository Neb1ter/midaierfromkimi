export interface ContactMessage {
  id: string;
  name: string;
  phone: string;
  email: string;
  subject: string;
  message: string;
  createdAt: string;
  status: 'unread' | 'read' | 'replied';
}

const MESSAGES_STORAGE_KEY = 'midaiersweet_messages';

// Generate message ID
const generateMessageId = (): string => {
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `MSG${timestamp}${random}`;
};

// Submit contact message
export const submitContactMessage = (data: Omit<ContactMessage, 'id' | 'createdAt' | 'status'>): ContactMessage => {
  const message: ContactMessage = {
    ...data,
    id: generateMessageId(),
    createdAt: new Date().toISOString(),
    status: 'unread',
  };
  
  const messages = getMessages();
  messages.push(message);
  localStorage.setItem(MESSAGES_STORAGE_KEY, JSON.stringify(messages));
  
  return message;
};

// Get all messages (admin only)
export const getMessages = (): ContactMessage[] => {
  const messagesStr = localStorage.getItem(MESSAGES_STORAGE_KEY);
  return messagesStr ? JSON.parse(messagesStr) : [];
};

// Get message by ID
export const getMessageById = (id: string): ContactMessage | undefined => {
  const messages = getMessages();
  return messages.find(m => m.id === id);
};

// Update message status
export const updateMessageStatus = (id: string, status: ContactMessage['status']): boolean => {
  const messages = getMessages();
  const message = messages.find(m => m.id === id);
  
  if (!message) return false;
  
  message.status = status;
  localStorage.setItem(MESSAGES_STORAGE_KEY, JSON.stringify(messages));
  return true;
};

// Delete message (admin only)
export const deleteMessage = (id: string): boolean => {
  const messages = getMessages();
  const filtered = messages.filter(m => m.id !== id);
  
  if (filtered.length === messages.length) return false;
  
  localStorage.setItem(MESSAGES_STORAGE_KEY, JSON.stringify(filtered));
  return true;
};

// Get unread message count
export const getUnreadMessageCount = (): number => {
  const messages = getMessages();
  return messages.filter(m => m.status === 'unread').length;
};

// Company info
export const companyInfo = {
  name: '米黛尔',
  fullName: '米黛尔健康烘焙',
  slogan: '甜蜜无负担，健康每一口',
  description: '专注于高端控糖烘焙食品，为糖尿病患者、生酮饮食者和健康意识人群提供美味与健康兼得的烘焙产品。',
  address: '上海市浦东新区张江高科技园区科苑路88号',
  phone: '400-888-9999',
  email: 'hello@midaiersweet.com',
  website: 'www.midaiersweet.com',
  businessHours: '周一至周日 9:00-21:00',
  foundedYear: 2020,
  socialMedia: {
    wechat: '米黛尔官方',
    weibo: '@米黛尔控糖烘焙',
    xiaohongshu: '米黛尔官方账号',
    douyin: '米黛尔官方旗舰店',
  },
};

// Factory info
export const factoryInfo = {
  name: '米黛尔现代化烘焙工厂',
  location: '上海市浦东新区',
  area: '5000平方米',
  established: '2020年',
  capacity: '日产能10万件',
  certifications: [
    'ISO22000食品安全管理体系认证',
    'HACCP危害分析与关键控制点认证',
    'SC食品生产许可证',
    'ISO9001质量管理体系认证',
  ],
  features: [
    '10万级洁净车间',
    '全自动化生产线',
    '24小时温控系统',
    '严格的质量检测流程',
    '全程可追溯系统',
  ],
  images: [
    'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&q=80',
    'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',
    'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=800&q=80',
  ],
};

// Ingredient sourcing
export const ingredientInfo = {
  title: '全球甄选优质食材',
  description: '我们坚持从全球优质产地直接采购原料，确保每一份产品都使用最优质的食材。',
  sources: [
    {
      name: '杏仁粉',
      origin: '美国加州',
      description: '精选美国加州优质杏仁，低温研磨保留营养',
      image: 'https://images.unsplash.com/photo-1508061253366-f7da158b6d46?w=400&q=80',
    },
    {
      name: '椰子粉',
      origin: '菲律宾',
      description: '菲律宾有机椰子，天然无添加',
      image: 'https://images.unsplash.com/photo-1544376798-89aa6b82c970?w=400&q=80',
    },
    {
      name: '奶油芝士',
      origin: '新西兰',
      description: '新西兰进口奶油芝士，奶香浓郁',
      image: 'https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?w=400&q=80',
    },
    {
      name: '黄油',
      origin: '法国',
      description: '法国AOP认证黄油，传统工艺制作',
      image: 'https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?w=400&q=80',
    },
    {
      name: '燕麦',
      origin: '澳洲',
      description: '澳洲优质燕麦，富含膳食纤维',
      image: 'https://images.unsplash.com/photo-1517093725432-a9acbc3e45f8?w=400&q=80',
    },
    {
      name: '黑巧克力',
      origin: '比利时',
      description: '比利时85%可可含量黑巧克力',
      image: 'https://images.unsplash.com/photo-1511381939415-e44015466834?w=400&q=80',
    },
  ],
  quality: [
    '所有原料均通过严格的质量检测',
    '与全球知名供应商建立长期合作关系',
    '建立完善的原料追溯体系',
    '定期对供应商进行审核评估',
  ],
};
