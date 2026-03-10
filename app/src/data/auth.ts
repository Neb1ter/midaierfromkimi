import CryptoJS from 'crypto-js';

// Admin credentials - 管理员账户密码
const ADMIN_USERNAME = 'admin';
const ADMIN_PASSWORD_HASH = CryptoJS.SHA256('midaiersweet2024').toString();

// Distributor credentials - 分销商账户密码
const DISTRIBUTOR_CREDENTIALS: Record<string, string> = {
  'dist001': CryptoJS.SHA256('dist001@2024').toString(),
  'dist002': CryptoJS.SHA256('dist002@2024').toString(),
  'dist003': CryptoJS.SHA256('dist003@2024').toString(),
};

export interface User {
  username: string;
  name: string;
  role: 'admin' | 'distributor';
  loginTime: string;
}

export interface DistributorInfo {
  username: string;
  name: string;
  phone: string;
  email: string;
  address: string;
  joinDate: string;
  level: 'bronze' | 'silver' | 'gold' | 'platinum';
  commissionRate: number;
  totalSales: number;
  totalCommission: number;
  monthlySales: number;
  monthlyCommission: number;
  status: 'active' | 'inactive';
}

// Default distributor accounts info
interface DefaultDistributorAccount {
  username: string;
  password: string;
  name: string;
  phone: string;
  email: string;
  address: string;
  joinDate: string;
}

export const DEFAULT_DISTRIBUTOR_ACCOUNTS: DefaultDistributorAccount[] = [
  { username: 'dist001', password: 'dist001@2024', name: '张小明', phone: '13800138001', email: 'dist001@midaiersweet.com', address: '北京市朝阳区', joinDate: '2024-01-15' },
  { username: 'dist002', password: 'dist002@2024', name: '李美丽', phone: '13800138002', email: 'dist002@midaiersweet.com', address: '上海市浦东新区', joinDate: '2024-02-20' },
  { username: 'dist003', password: 'dist003@2024', name: '王健康', phone: '13800138003', email: 'dist003@midaiersweet.com', address: '广州市天河区', joinDate: '2024-03-10' },
];

// Commission rates by level
export const COMMISSION_RATES = {
  bronze: 0.15,    // 15%
  silver: 0.18,    // 18%
  gold: 0.22,      // 22%
  platinum: 0.25,  // 25%
};

// Level names in Chinese
export const LEVEL_NAMES = {
  bronze: '铜牌',
  silver: '银牌',
  gold: '金牌',
  platinum: '铂金',
};

// Initialize distributor data in localStorage
export const initializeDistributors = (): void => {
  if (!localStorage.getItem('distributors')) {
    const initialDistributors: DistributorInfo[] = DEFAULT_DISTRIBUTOR_ACCOUNTS.map((account, index) => ({
      ...account,
      level: ['bronze', 'silver', 'gold'][index] as 'bronze' | 'silver' | 'gold',
      commissionRate: [0.15, 0.18, 0.22][index],
      totalSales: [15000, 28000, 42000][index],
      totalCommission: [2250, 5040, 9240][index],
      monthlySales: [5000, 8000, 12000][index],
      monthlyCommission: [750, 1440, 2640][index],
      status: 'active',
    }));
    localStorage.setItem('distributors', JSON.stringify(initialDistributors));
  }
};

// Get all distributors
export const getDistributors = (): DistributorInfo[] => {
  initializeDistributors();
  return JSON.parse(localStorage.getItem('distributors') || '[]');
};

// Get distributor by username
export const getDistributorByUsername = (username: string): DistributorInfo | undefined => {
  const distributors = getDistributors();
  return distributors.find(d => d.username === username);
};

// Update distributor
export const updateDistributor = (username: string, updates: Partial<DistributorInfo>): boolean => {
  const distributors = getDistributors();
  const index = distributors.findIndex(d => d.username === username);
  if (index === -1) return false;
  
  distributors[index] = { ...distributors[index], ...updates };
  localStorage.setItem('distributors', JSON.stringify(distributors));
  return true;
};

// Add new distributor (admin only)
export const addDistributor = (distributor: Omit<DistributorInfo, 'totalSales' | 'totalCommission' | 'monthlySales' | 'monthlyCommission'>): boolean => {
  const distributors = getDistributors();
  if (distributors.find(d => d.username === distributor.username)) {
    return false;
  }
  
  const newDistributor: DistributorInfo = {
    ...distributor,
    totalSales: 0,
    totalCommission: 0,
    monthlySales: 0,
    monthlyCommission: 0,
  };
  
  distributors.push(newDistributor);
  localStorage.setItem('distributors', JSON.stringify(distributors));
  return true;
};

// Delete distributor (admin only)
export const deleteDistributor = (username: string): boolean => {
  const distributors = getDistributors();
  const filtered = distributors.filter(d => d.username !== username);
  if (filtered.length === distributors.length) return false;
  
  localStorage.setItem('distributors', JSON.stringify(filtered));
  return true;
};

// Update distributor sales and commission
export const updateDistributorSales = (username: string, saleAmount: number): boolean => {
  const distributor = getDistributorByUsername(username);
  if (!distributor) return false;
  
  const commission = saleAmount * distributor.commissionRate;
  
  return updateDistributor(username, {
    totalSales: distributor.totalSales + saleAmount,
    totalCommission: distributor.totalCommission + commission,
    monthlySales: distributor.monthlySales + saleAmount,
    monthlyCommission: distributor.monthlyCommission + commission,
  });
};

// Reset monthly stats (called at month end)
export const resetMonthlyStats = (): void => {
  const distributors = getDistributors();
  const updated = distributors.map(d => ({
    ...d,
    monthlySales: 0,
    monthlyCommission: 0,
  }));
  localStorage.setItem('distributors', JSON.stringify(updated));
};

// Login function
export const login = (username: string, password: string): User | null => {
  const passwordHash = CryptoJS.SHA256(password).toString();
  
  // Check admin
  if (username === ADMIN_USERNAME && passwordHash === ADMIN_PASSWORD_HASH) {
    const user: User = {
      username,
      name: '管理员',
      role: 'admin',
      loginTime: new Date().toISOString(),
    };
    localStorage.setItem('currentUser', JSON.stringify(user));
    return user;
  }
  
  // Check distributor
  if (DISTRIBUTOR_CREDENTIALS[username] && DISTRIBUTOR_CREDENTIALS[username] === passwordHash) {
    const distributor = getDistributorByUsername(username);
    const user: User = {
      username,
      name: distributor?.name || username,
      role: 'distributor',
      loginTime: new Date().toISOString(),
    };
    localStorage.setItem('currentUser', JSON.stringify(user));
    return user;
  }
  
  return null;
};

// Logout function
export const logout = (): void => {
  localStorage.removeItem('currentUser');
};

// Get current user
export const getCurrentUser = (): User | null => {
  const userStr = localStorage.getItem('currentUser');
  return userStr ? JSON.parse(userStr) : null;
};

// Check if user is logged in
export const isLoggedIn = (): boolean => {
  return !!getCurrentUser();
};

// Check if current user is admin
export const isAdmin = (): boolean => {
  const user = getCurrentUser();
  return user?.role === 'admin';
};

// Check if current user is distributor
export const isDistributor = (): boolean => {
  const user = getCurrentUser();
  return user?.role === 'distributor';
};

// Require auth guard
export const requireAuth = (): boolean => {
  return isLoggedIn();
};

// Require admin guard
export const requireAdmin = (): boolean => {
  return isAdmin();
};

// Session timeout in milliseconds (2 hours)
const SESSION_TIMEOUT = 2 * 60 * 60 * 1000;

// Check session validity
export const isSessionValid = (): boolean => {
  const user = getCurrentUser();
  if (!user) return false;
  
  const loginTime = new Date(user.loginTime).getTime();
  const now = new Date().getTime();
  
  if (now - loginTime > SESSION_TIMEOUT) {
    logout();
    return false;
  }
  
  return true;
};

// Extend session
export const extendSession = (): void => {
  const user = getCurrentUser();
  if (user) {
    user.loginTime = new Date().toISOString();
    localStorage.setItem('currentUser', JSON.stringify(user));
  }
};
