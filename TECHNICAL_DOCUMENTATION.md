# 米黛尔网站技术文档

## 项目概述

米黛尔（Midaiersweet）是一个高端控糖烘焙品牌网站，采用React + TypeScript + Tailwind CSS技术栈构建，参考Apple设计风格，提供简洁优雅的用户体验。

---

## 技术栈

- **前端框架**: React 18 + TypeScript
- **路由**: React Router v6
- **样式**: Tailwind CSS
- **动画**: GSAP + ScrollTrigger
- **图标**: Lucide React
- **密码加密**: crypto-js (SHA-256)

---

## 项目结构

```
src/
├── components/          # 公共组件
│   ├── Navbar.tsx      # 导航栏（含次级菜单）
│   └── Footer.tsx      # 页脚
├── pages/              # 页面组件
│   ├── Home.tsx        # 首页
│   ├── About.tsx       # 关于我们
│   ├── Products.tsx    # 产品列表
│   ├── ProductDetail.tsx # 产品详情
│   ├── Contact.tsx     # 联系我们
│   ├── Distribution.tsx # 分销合作
│   ├── Privacy.tsx     # 隐私政策
│   ├── Terms.tsx       # 服务条款
│   └── admin/          # 管理后台
│       ├── Login.tsx       # 登录页面
│       ├── Admin.tsx       # 后台布局
│       ├── Dashboard.tsx   # 数据概览
│       ├── ProductsManager.tsx # 产品管理
│       ├── ProductEditor.tsx   # 产品编辑
│       ├── ContentManager.tsx  # 内容管理
│       ├── ContactManager.tsx  # 联系表单管理
│       ├── DistributorManager.tsx # 分销商管理
│       └── SettingsPage.tsx    # 系统设置
├── data/               # 数据层
│   ├── products.ts     # 产品数据
│   ├── auth.ts         # 认证系统
│   ├── distributors.ts # 分销商数据
│   └── contactForms.ts # 联系表单数据
└── App.tsx            # 应用入口
```

---

## 核心功能

### 1. 前台功能

| 页面 | 功能描述 |
|------|----------|
| 首页 | 品牌展示、精选产品、产品系列入口 |
| 产品列表 | 分类筛选、搜索、分页 |
| 产品详情 | 详细信息、制作过程、用料、营养成分、过敏源 |
| 关于我们 | 品牌故事、价值观、发展历程 |
| 联系我们 | 联系表单、FAQ |
| 分销合作 | 分销商申请、佣金说明 |

### 2. 管理后台功能

| 模块 | 功能描述 |
|------|----------|
| 登录 | 密码认证、会话管理、登录限制 |
| 概览 | 数据统计、快捷操作 |
| 产品管理 | 增删改查、价格调整、标签管理 |
| 联系表单 | 查看消息、状态管理、回复标记 |
| 分销商管理 | 分销商列表、佣金调整、销售数据 |
| 内容管理 | 页面内容编辑、导航链接管理 |
| 系统设置 | 基本设置、外观、通知、安全 |

---

## 安全设计

### 1. 认证系统

```typescript
// 登录凭证（生产环境应使用环境变量）
用户名: admin
密码: midaiersweet2024

// 密码使用SHA-256哈希存储
const ADMIN_PASSWORD_HASH = CryptoJS.SHA256('midaiersweet2024').toString();
```

### 2. 会话管理

- 会话有效期：24小时
- 自动续期：用户活动时自动延长
- 安全存储：localStorage加密存储

### 3. 登录限制

```typescript
// 防暴力破解
MAX_ATTEMPTS = 5;           // 最大尝试次数
LOCKOUT_DURATION = 15分钟;   // 锁定时间
```

### 4. 路由守卫

```typescript
// ProtectedRoute 组件
- 检查认证状态
- 未登录跳转登录页
- 会话过期自动登出
```

---

## 数据模型

### 产品数据 (Product)

```typescript
interface Product {
  id: string;                    // 产品ID
  name: string;                  // 产品名称
  category: 'keto' | 'regular';  // 分类
  price: number;                 // 售价
  originalPrice?: number;        // 原价
  image: string;                 // 主图
  images: string[];              // 图片列表
  description: string;           // 详细描述
  shortDescription: string;      // 简短描述
  
  // Apple风格内容区块
  makingProcess?: {...};         // 制作过程
  ingredientsDetail?: {...};     // 原料详情
  factoryEnvironment?: {...};    // 工厂环境
  targetAudience?: {...};        // 适用人群
  allergens?: {...};             // 过敏源信息
  
  nutrition: {...};              // 营养成分
  ingredients: string[];         // 配料表
  tags: string[];                // 标签
  relatedProducts: string[];     // 相关产品ID
  isNew?: boolean;               // 是否新品
  isBestseller?: boolean;        // 是否畅销
}
```

### 分销商数据 (Distributor)

```typescript
interface Distributor {
  id: string;
  name: string;
  email: string;
  phone: string;
  company?: string;
  commissionRate: number;        // 佣金比例 (15-25%)
  status: 'active' | 'inactive' | 'pending';
  totalSales: number;
  totalCommission: number;
  platforms: {                   // 销售平台
    wechat?: string;
    xiaohongshu?: string;
    douyin?: string;
    taobao?: string;
  };
}
```

### 销售记录 (SalesRecord)

```typescript
interface SalesRecord {
  id: string;
  distributorId: string;
  productId: string;
  productName: string;
  quantity: number;
  unitPrice: number;
  totalAmount: number;
  commission: number;            // 佣金金额
  platform: string;              // 销售平台
  orderDate: string;
  status: 'pending' | 'confirmed' | 'paid';
}
```

---

## 佣金计算逻辑

```typescript
// 佣金等级
const commissionTiers = [
  { sales: '0-5,000', rate: 15% },
  { sales: '5,001-20,000', rate: 18% },
  { sales: '20,001-50,000', rate: 22% },
  { sales: '50,000+', rate: 25% },
];

// 佣金计算
commission = totalAmount * commissionRate / 100;
```

---

## 后台管理操作指南

### 登录后台

1. 访问 `/admin/login`
2. 输入用户名: `admin`
3. 输入密码: `midaiersweet2024`
4. 登录成功后自动跳转到概览页面

### 产品管理

1. **查看产品**: 进入"产品管理"页面
2. **编辑产品**: 点击产品行的"编辑"按钮
3. **修改价格**: 在产品编辑页修改售价和原价
4. **添加标签**: 输入新标签后点击"+"按钮
5. **设置状态**: 勾选"新品"或"畅销"复选框
6. **保存更改**: 点击"保存更改"按钮

### 分销商管理

1. **查看分销商**: 进入"分销商管理"页面
2. **调整佣金**: 点击"调整佣金"按钮，输入新比例
3. **查看销售**: 点击"查看详情"查看销售记录
4. **审核申请**: 在待审核列表中批准或拒绝申请

### 联系表单管理

1. **查看消息**: 进入"联系表单"页面
2. **标记状态**: 使用操作按钮标记为"已读"/"已回复"/"归档"
3. **查看详情**: 点击行查看完整消息内容
4. **添加备注**: 在详情页添加处理备注

---

## 页面路由

| 路由 | 页面 | 说明 |
|------|------|------|
| `/` | 首页 | 品牌展示 |
| `/about` | 关于我们 | 品牌故事 |
| `/products` | 产品列表 | 支持筛选参数 |
| `/product/:id` | 产品详情 | 动态路由 |
| `/contact` | 联系我们 | 联系表单 |
| `/distribution` | 分销合作 | 分销商申请 |
| `/privacy` | 隐私政策 | 法律页面 |
| `/terms` | 服务条款 | 法律页面 |
| `/admin/login` | 后台登录 | 认证页面 |
| `/admin` | 后台概览 | 需要登录 |
| `/admin/products` | 产品管理 | 需要登录 |
| `/admin/distributors` | 分销商管理 | 需要登录 |
| `/admin/contacts` | 联系表单 | 需要登录 |

---

## 动画效果

### Hero区域动画

```typescript
// 文字入场动画
- 标题: opacity + y + scale, 1.2s, power3.out
- 副标题: opacity + y, 1s, power3.out
- CTA按钮: opacity + y, 0.8s, power3.out

// 浮动元素
- 4个装饰元素持续浮动
- 3s周期, sine.inOut缓动
- 交错0.5s

// 渐变背景
- 2个渐变球体呼吸动画
- 4s周期, scale 1.0 → 1.2
```

### 滚动触发动画

```typescript
// fade-section类元素
- 触发点: top 80%
- 动画: opacity 0→1, y 60→0
- 时长: 0.8s
- 缓动: power3.out
```

---

## 开发指南

### 添加新产品

1. 在 `src/data/products.ts` 中添加产品对象
2. 准备产品图片，放入 `public/images/`
3. 在后台"产品管理"中设置新品/畅销状态

### 修改页面内容

1. 进入后台"内容管理"
2. 选择对应页面标签
3. 编辑内容项
4. 点击"保存更改"

### 添加分销商

1. 进入后台"分销商管理"
2. 点击"添加分销商"
3. 填写分销商信息
4. 设置佣金比例

---

## 部署说明

### 构建命令

```bash
npm run build
```

### 输出目录

```
dist/
├── index.html
├── assets/
└── images/
```

### 环境要求

- Node.js 18+
- 静态文件服务器（Nginx/Apache）

---

## 后续开发建议

### 高优先级

1. **后端API**: 将数据层迁移到真实后端（Node.js/Go）
2. **数据库**: 使用PostgreSQL/MongoDB存储数据
3. **图片上传**: 集成云存储（AWS S3/阿里云OSS）
4. **支付集成**: 接入支付宝/微信支付

### 中优先级

1. **用户系统**: 前端用户注册登录
2. **订单系统**: 完整的购物车、订单流程
3. **库存管理**: 实时库存跟踪
4. **邮件通知**: 订单确认、发货通知

### 低优先级

1. **多语言**: 国际化支持
2. **PWA**: 渐进式Web应用
3. **SEO优化**: SSR/SSG方案
4. **数据分析**: 用户行为追踪

---

## 联系信息

如有技术问题，请联系开发团队。

---

*文档版本: 1.0*  
*最后更新: 2024年3月*
