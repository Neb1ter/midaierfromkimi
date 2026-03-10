export interface Distributor {
  id: string;
  name: string;
  email: string;
  phone: string;
  company?: string;
  commissionRate: number; // Percentage (e.g., 15 for 15%)
  status: 'active' | 'inactive' | 'pending';
  joinDate: string;
  totalSales: number;
  totalCommission: number;
  platforms: {
    wechat?: string;
    xiaohongshu?: string;
    douyin?: string;
    taobao?: string;
    other?: string;
  };
  notes?: string;
}

export interface SalesRecord {
  id: string;
  distributorId: string;
  productId: string;
  productName: string;
  quantity: number;
  unitPrice: number;
  totalAmount: number;
  commission: number;
  platform: string;
  orderDate: string;
  customerName?: string;
  status: 'pending' | 'confirmed' | 'paid';
}

// Mock distributors data
export const distributors: Distributor[] = [
  {
    id: 'dist-001',
    name: '张小明',
    email: 'zhang@example.com',
    phone: '13800138001',
    company: '甜蜜时光工作室',
    commissionRate: 15,
    status: 'active',
    joinDate: '2024-01-15',
    totalSales: 25800,
    totalCommission: 3870,
    platforms: {
      wechat: '甜蜜时光',
      xiaohongshu: '@甜蜜时光',
    },
  },
  {
    id: 'dist-002',
    name: '李美丽',
    email: 'li@example.com',
    phone: '13800138002',
    commissionRate: 20,
    status: 'active',
    joinDate: '2024-02-01',
    totalSales: 15600,
    totalCommission: 3120,
    platforms: {
      douyin: '美丽烘焙',
      taobao: '美丽烘焙店',
    },
  },
  {
    id: 'dist-003',
    name: '王健康',
    email: 'wang@example.com',
    phone: '13800138003',
    commissionRate: 12,
    status: 'pending',
    joinDate: '2024-03-01',
    totalSales: 0,
    totalCommission: 0,
    platforms: {
      wechat: '健康生活',
    },
  },
];

// Mock sales records
export const salesRecords: SalesRecord[] = [
  {
    id: 'sale-001',
    distributorId: 'dist-001',
    productId: 'jar-cake',
    productName: '零糖罐子蛋糕',
    quantity: 10,
    unitPrice: 38,
    totalAmount: 380,
    commission: 57,
    platform: 'wechat',
    orderDate: '2024-03-15',
    customerName: '客户A',
    status: 'confirmed',
  },
  {
    id: 'sale-002',
    distributorId: 'dist-001',
    productId: 'cheesecake',
    productName: '无糖奶酪蛋糕',
    quantity: 5,
    unitPrice: 58,
    totalAmount: 290,
    commission: 43.5,
    platform: 'xiaohongshu',
    orderDate: '2024-03-14',
    status: 'paid',
  },
  {
    id: 'sale-003',
    distributorId: 'dist-002',
    productId: 'keto-cookies',
    productName: '生酮曲奇饼干',
    quantity: 20,
    unitPrice: 28,
    totalAmount: 560,
    commission: 112,
    platform: 'douyin',
    orderDate: '2024-03-13',
    status: 'confirmed',
  },
];

// Distributor management functions
export const distributorManager = {
  getAll: (): Distributor[] => {
    return [...distributors];
  },

  getById: (id: string): Distributor | undefined => {
    return distributors.find((d) => d.id === id);
  },

  getByStatus: (status: Distributor['status']): Distributor[] => {
    return distributors.filter((d) => d.status === status);
  },

  updateCommission: (id: string, rate: number): boolean => {
    const distributor = distributors.find((d) => d.id === id);
    if (distributor) {
      distributor.commissionRate = rate;
      return true;
    }
    return false;
  },

  updateStatus: (id: string, status: Distributor['status']): boolean => {
    const distributor = distributors.find((d) => d.id === id);
    if (distributor) {
      distributor.status = status;
      return true;
    }
    return false;
  },

  getSalesByDistributor: (distributorId: string): SalesRecord[] => {
    return salesRecords.filter((s) => s.distributorId === distributorId);
  },

  getTotalSales: (): number => {
    return salesRecords.reduce((sum, s) => sum + s.totalAmount, 0);
  },

  getTotalCommission: (): number => {
    return salesRecords.reduce((sum, s) => sum + s.commission, 0);
  },

  getSalesByPlatform: (): Record<string, number> => {
    const result: Record<string, number> = {};
    salesRecords.forEach((s) => {
      result[s.platform] = (result[s.platform] || 0) + s.totalAmount;
    });
    return result;
  },

  getMonthlySales: (year: number, month: number): number => {
    return salesRecords
      .filter((s) => {
        const date = new Date(s.orderDate);
        return date.getFullYear() === year && date.getMonth() === month - 1;
      })
      .reduce((sum, s) => sum + s.totalAmount, 0);
  },
};
