import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TrendingUp, DollarSign, ShoppingBag, ArrowUp, ArrowDown, LogOut, User, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { SEO } from '@/components/SEO';
import { getCurrentUser, logout, isDistributor, getDistributorByUsername, type DistributorInfo, LEVEL_NAMES } from '@/data/auth';
import { toast } from 'sonner';

export const DistributorDashboard: React.FC = () => {
  const navigate = useNavigate();
  const user = getCurrentUser();
  const [distributor, setDistributor] = useState<DistributorInfo | null>(null);

  useEffect(() => {
    if (!user || !isDistributor()) {
      toast.error('请先登录');
      navigate('/login');
      return;
    }

    const info = getDistributorByUsername(user.username);
    if (info) {
      setDistributor(info);
    }
  }, [user, navigate]);

  const handleLogout = () => {
    logout();
    toast.success('已退出登录');
    navigate('/');
  };

  if (!distributor) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-stone-600">加载中...</p>
        </div>
      </div>
    );
  }

  const stats = [
    {
      title: '本月销售额',
      value: `¥${distributor.monthlySales.toLocaleString()}`,
      change: '+12.5%',
      icon: ShoppingBag,
      trend: 'up',
    },
    {
      title: '本月佣金',
      value: `¥${distributor.monthlyCommission.toLocaleString()}`,
      change: '+8.3%',
      icon: DollarSign,
      trend: 'up',
    },
    {
      title: '累计销售额',
      value: `¥${distributor.totalSales.toLocaleString()}`,
      change: '+23.1%',
      icon: TrendingUp,
      trend: 'up',
    },
    {
      title: '累计佣金',
      value: `¥${distributor.totalCommission.toLocaleString()}`,
      change: '+18.7%',
      icon: DollarSign,
      trend: 'up',
    },
  ];

  return (
    <>
      <SEO
        title="分销中心 | 米黛尔控糖烘焙"
        description="分销商管理中心，查看销售数据、佣金收益"
      />

      <div className="min-h-screen bg-stone-50 pt-20">
        {/* Header */}
        <div className="bg-white border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-stone-800">分销中心</h1>
                <p className="text-stone-500 text-sm">欢迎回来，{distributor.name}</p>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-right hidden sm:block">
                  <div className="text-sm text-stone-500">当前等级</div>
                  <div className="font-semibold text-emerald-600">
                    {LEVEL_NAMES[distributor.level]}
                  </div>
                </div>
                <Button variant="outline" size="sm" onClick={handleLogout}>
                  <LogOut className="w-4 h-4 mr-2" />
                  退出
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Stats */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {stats.map((stat, index) => (
              <Card key={index}>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium text-stone-500">
                    {stat.title}
                  </CardTitle>
                  <stat.icon className="w-4 h-4 text-stone-400" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-stone-800">{stat.value}</div>
                  <div className={`flex items-center text-sm mt-1 ${
                    stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {stat.trend === 'up' ? (
                      <ArrowUp className="w-3 h-3 mr-1" />
                    ) : (
                      <ArrowDown className="w-3 h-3 mr-1" />
                    )}
                    {stat.change}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Main Content */}
          <Tabs defaultValue="overview" className="space-y-6">
            <TabsList>
              <TabsTrigger value="overview">概览</TabsTrigger>
              <TabsTrigger value="profile">个人信息</TabsTrigger>
              <TabsTrigger value="commission">佣金明细</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              {/* Level Info */}
              <Card>
                <CardHeader>
                  <CardTitle>等级信息</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-6">
                    <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center">
                      <Award className="w-10 h-10 text-emerald-600" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-stone-800">
                        {LEVEL_NAMES[distributor.level]}分销商
                      </div>
                      <div className="text-stone-500 mt-1">
                        佣金比例：{(distributor.commissionRate * 100).toFixed(0)}%
                      </div>
                      <div className="text-sm text-stone-400 mt-1">
                        加入时间：{distributor.joinDate}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Recent Activity */}
              <Card>
                <CardHeader>
                  <CardTitle>最近活动</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { action: '销售订单', detail: '生酮吐司面包 x 3', amount: 116.4, commission: 17.46, date: '2024-03-06' },
                      { action: '销售订单', detail: '无糖燕麦曲奇 x 2', amount: 65.6, commission: 9.84, date: '2024-03-05' },
                      { action: '销售订单', detail: '生酮芝士蛋糕 x 1', amount: 128.0, commission: 19.2, date: '2024-03-04' },
                    ].map((activity, index) => (
                      <div key={index} className="flex items-center justify-between py-3 border-b last:border-0">
                        <div>
                          <div className="font-medium text-stone-800">{activity.action}</div>
                          <div className="text-sm text-stone-500">{activity.detail}</div>
                          <div className="text-xs text-stone-400">{activity.date}</div>
                        </div>
                        <div className="text-right">
                          <div className="font-medium text-stone-800">¥{activity.amount.toFixed(2)}</div>
                          <div className="text-sm text-emerald-600">佣金 ¥{activity.commission.toFixed(2)}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="profile">
              <Card>
                <CardHeader>
                  <CardTitle>个人信息</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 bg-stone-200 rounded-full flex items-center justify-center">
                        <User className="w-8 h-8 text-stone-400" />
                      </div>
                      <div>
                        <div className="font-semibold text-stone-800">{distributor.name}</div>
                        <div className="text-sm text-stone-500">{distributor.username}</div>
                      </div>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-4 pt-4">
                      <div>
                        <label className="text-sm text-stone-500">手机号码</label>
                        <div className="font-medium text-stone-800">{distributor.phone}</div>
                      </div>
                      <div>
                        <label className="text-sm text-stone-500">电子邮箱</label>
                        <div className="font-medium text-stone-800">{distributor.email}</div>
                      </div>
                      <div className="sm:col-span-2">
                        <label className="text-sm text-stone-500">地址</label>
                        <div className="font-medium text-stone-800">{distributor.address}</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="commission">
              <Card>
                <CardHeader>
                  <CardTitle>佣金明细</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="bg-stone-50 p-4 rounded-lg">
                      <div className="grid grid-cols-3 gap-4 text-center">
                        <div>
                          <div className="text-sm text-stone-500">本月佣金</div>
                          <div className="text-xl font-bold text-emerald-600">
                            ¥{distributor.monthlyCommission.toLocaleString()}
                          </div>
                        </div>
                        <div>
                          <div className="text-sm text-stone-500">累计佣金</div>
                          <div className="text-xl font-bold text-stone-800">
                            ¥{distributor.totalCommission.toLocaleString()}
                          </div>
                        </div>
                        <div>
                          <div className="text-sm text-stone-500">佣金比例</div>
                          <div className="text-xl font-bold text-stone-800">
                            {(distributor.commissionRate * 100).toFixed(0)}%
                          </div>
                        </div>
                      </div>
                    </div>
                    <p className="text-sm text-stone-500 text-center">
                      佣金每月结算，次月10日前发放至指定账户
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  );
};

export default DistributorDashboard;
