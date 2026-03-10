import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DollarSign, ShoppingBag, Users, LogOut, Plus, Edit, Trash2, CheckCircle, MessageSquare, Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { SEO } from '@/components/SEO';
import { getCurrentUser, logout, isAdmin, getDistributors, updateDistributor, deleteDistributor, addDistributor, type DistributorInfo, COMMISSION_RATES, LEVEL_NAMES } from '@/data/auth';
import { getMessages, updateMessageStatus, deleteMessage, type ContactMessage, getUnreadMessageCount } from '@/data/contact';
import { productManager, type Product } from '@/data/products';
import { toast } from 'sonner';

export const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();
  const user = getCurrentUser();
  const [distributors, setDistributors] = useState<DistributorInfo[]>([]);
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [selectedDistributor, setSelectedDistributor] = useState<DistributorInfo | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  
  // 产品管理状态
  const [productList, setProductList] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [showProductModal, setShowProductModal] = useState(false);
  const [isEditingProduct, setIsEditingProduct] = useState(false);
  
  // 产品表单数据
  const [productForm, setProductForm] = useState({
    name: '',
    category: 'keto' as 'keto' | 'regular',
    categoryName: '生酮系列',
    price: '',
    originalPrice: '',
    image: '',
    description: '',
    shortDescription: '',
    tags: '',
  });

  // Form states
  const [formData, setFormData] = useState<{
    username: string;
    name: string;
    phone: string;
    email: string;
    address: string;
    level: 'bronze' | 'silver' | 'gold' | 'platinum';
    status: 'active' | 'inactive';
  }>({
    username: '',
    name: '',
    phone: '',
    email: '',
    address: '',
    level: 'bronze',
    status: 'active',
  });

  useEffect(() => {
    if (!user || !isAdmin()) {
      toast.error('请先登录管理员账号');
      navigate('/login');
      return;
    }

    loadData();
  }, [user, navigate]);

  const loadData = () => {
    setDistributors(getDistributors());
    setMessages(getMessages());
    setUnreadCount(getUnreadMessageCount());
    setProductList(productManager.getAll());
  };
  
  // 产品管理函数
  const handleToggleProductStatus = (id: string) => {
    const success = productManager.toggleStatus(id);
    if (success) {
      toast.success('产品状态已更新');
      loadData();
    } else {
      toast.error('操作失败');
    }
  };
  
  const handleDeleteProduct = (id: string) => {
    if (confirm('确定要删除该产品吗？')) {
      const success = productManager.delete(id);
      if (success) {
        toast.success('产品已删除');
        loadData();
      } else {
        toast.error('删除失败');
      }
    }
  };
  
  const openAddProductModal = () => {
    setIsEditingProduct(false);
    setSelectedProduct(null);
    setProductForm({
      name: '',
      category: 'keto',
      categoryName: '生酮系列',
      price: '',
      originalPrice: '',
      image: '',
      description: '',
      shortDescription: '',
      tags: '',
    });
    setShowProductModal(true);
  };
  
  const openEditProductModal = (product: Product) => {
    setIsEditingProduct(true);
    setSelectedProduct(product);
    setProductForm({
      name: product.name,
      category: product.category,
      categoryName: product.categoryName,
      price: product.price.toString(),
      originalPrice: product.originalPrice?.toString() || '',
      image: product.image,
      description: product.description,
      shortDescription: product.shortDescription,
      tags: product.tags.join(', '),
    });
    setShowProductModal(true);
  };
  
  const closeProductModal = () => {
    setShowProductModal(false);
    setSelectedProduct(null);
  };
  
  const handleSaveProduct = () => {
    if (!productForm.name || !productForm.price || !productForm.image) {
      toast.error('请填写必要信息');
      return;
    }
    
    const price = parseFloat(productForm.price);
    const originalPrice = productForm.originalPrice ? parseFloat(productForm.originalPrice) : undefined;
    
    if (isEditingProduct && selectedProduct) {
      // 更新产品
      const success = productManager.update(selectedProduct.id, {
        name: productForm.name,
        category: productForm.category,
        categoryName: productForm.categoryName,
        price,
        originalPrice,
        image: productForm.image,
        description: productForm.description,
        shortDescription: productForm.shortDescription,
        tags: productForm.tags.split(',').map(t => t.trim()).filter(Boolean),
      });
      
      if (success) {
        toast.success('产品信息已更新');
        closeProductModal();
        loadData();
      } else {
        toast.error('更新失败');
      }
    } else {
      // 添加新产品
      const id = 'product-' + Date.now();
      const success = productManager.add({
        id,
        name: productForm.name,
        category: productForm.category,
        categoryName: productForm.categoryName,
        price,
        originalPrice,
        image: productForm.image,
        gallery: [productForm.image],
        description: productForm.description,
        shortDescription: productForm.shortDescription,
        features: [],
        ingredients: [],
        nutritionFacts: {
          servingSize: '100g',
          calories: 0,
          totalFat: 0,
          saturatedFat: 0,
          cholesterol: 0,
          sodium: 0,
          totalCarbs: 0,
          dietaryFiber: 0,
          sugars: 0,
          protein: 0,
        },
        storageInstructions: '0-4°C 冷藏保存',
        shelfLife: '冷藏 7 天',
        weight: '500g',
        tags: productForm.tags.split(',').map(t => t.trim()).filter(Boolean),
        rating: 5.0,
        reviewCount: 0,
        isBestseller: true,
        isNew: true,
      });
      
      if (success) {
        toast.success('产品已添加');
        closeProductModal();
        loadData();
      } else {
        toast.error('添加失败');
      }
    }
  };

  const handleLogout = () => {
    logout();
    toast.success('已退出登录');
    navigate('/');
  };

  const handleAddDistributor = () => {
    if (!formData.username || !formData.name || !formData.phone) {
      toast.error('请填写必要信息');
      return;
    }

    const success = addDistributor({
      username: formData.username,
      name: formData.name,
      phone: formData.phone,
      email: formData.email,
      address: formData.address,
      joinDate: new Date().toISOString().split('T')[0],
      level: formData.level,
      commissionRate: COMMISSION_RATES[formData.level],
      status: formData.status,
    });

    if (success) {
      toast.success('分销商添加成功');
      setIsAddDialogOpen(false);
      setFormData({ username: '', name: '', phone: '', email: '', address: '', level: 'bronze', status: 'active' });
      loadData();
    } else {
      toast.error('用户名已存在');
    }
  };

  const handleUpdateDistributor = () => {
    if (!selectedDistributor) return;

    const success = updateDistributor(selectedDistributor.username, {
      name: formData.name,
      phone: formData.phone,
      email: formData.email,
      address: formData.address,
      level: formData.level,
      commissionRate: COMMISSION_RATES[formData.level],
      status: formData.status,
    });

    if (success) {
      toast.success('分销商信息更新成功');
      setIsEditDialogOpen(false);
      loadData();
    } else {
      toast.error('更新失败');
    }
  };

  const handleDeleteDistributor = (username: string) => {
    if (confirm('确定要删除该分销商吗？')) {
      const success = deleteDistributor(username);
      if (success) {
        toast.success('分销商已删除');
        loadData();
      } else {
        toast.error('删除失败');
      }
    }
  };

  const handleUpdateMessageStatus = (id: string, status: ContactMessage['status']) => {
    const success = updateMessageStatus(id, status);
    if (success) {
      toast.success('状态已更新');
      loadData();
    }
  };

  const handleDeleteMessage = (id: string) => {
    if (confirm('确定要删除该消息吗？')) {
      const success = deleteMessage(id);
      if (success) {
        toast.success('消息已删除');
        loadData();
      }
    }
  };

  const openEditDialog = (distributor: DistributorInfo) => {
    setSelectedDistributor(distributor);
    setFormData({
      username: distributor.username,
      name: distributor.name,
      phone: distributor.phone,
      email: distributor.email,
      address: distributor.address,
      level: distributor.level,
      status: distributor.status,
    });
    setIsEditDialogOpen(true);
  };

  const totalSales = distributors.reduce((sum, d) => sum + d.totalSales, 0);
  const totalCommission = distributors.reduce((sum, d) => sum + d.totalCommission, 0);

  const stats = [
    { title: '分销商数量', value: distributors.length, icon: Users },
    { title: '累计销售额', value: `¥${totalSales.toLocaleString()}`, icon: ShoppingBag },
    { title: '累计佣金', value: `¥${totalCommission.toLocaleString()}`, icon: DollarSign },
    { title: '未读消息', value: unreadCount, icon: MessageSquare },
  ];

  return (
    <>
      <SEO
        title="管理后台 | 米黛尔控糖烘焙"
        description="米黛尔管理后台，管理分销商、产品、订单等"
      />

      <div className="min-h-screen bg-stone-50 pt-20">
        {/* Header */}
        <div className="bg-white border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-stone-800">管理后台</h1>
                <p className="text-stone-500 text-sm">欢迎回来，管理员</p>
              </div>
              <Button variant="outline" size="sm" onClick={handleLogout}>
                <LogOut className="w-4 h-4 mr-2" />
                退出
              </Button>
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
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Main Content */}
          <Tabs defaultValue="distributors" className="space-y-6">
            <TabsList>
              <TabsTrigger value="distributors">分销商管理</TabsTrigger>
              <TabsTrigger value="messages">
                留言管理
                {unreadCount > 0 && (
                  <span className="ml-2 bg-emerald-600 text-white text-xs px-2 py-0.5 rounded-full">
                    {unreadCount}
                  </span>
                )}
              </TabsTrigger>
              <TabsTrigger value="products">产品管理</TabsTrigger>
            </TabsList>

            {/* Distributors Tab */}
            <TabsContent value="distributors" className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-semibold text-stone-800">分销商列表</h2>
                <Button onClick={() => setIsAddDialogOpen(true)}>
                  <Plus className="w-4 h-4 mr-2" />
                  添加分销商
                </Button>
              </div>

              <div className="bg-white rounded-lg border overflow-hidden">
                <table className="w-full">
                  <thead className="bg-stone-50">
                    <tr>
                      <th className="px-4 py-3 text-left text-sm font-medium text-stone-500">用户名</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-stone-500">姓名</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-stone-500">等级</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-stone-500">佣金比例</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-stone-500">累计销售</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-stone-500">状态</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-stone-500">操作</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {distributors.map((distributor) => (
                      <tr key={distributor.username} className="hover:bg-stone-50">
                        <td className="px-4 py-3 text-sm">{distributor.username}</td>
                        <td className="px-4 py-3 text-sm">{distributor.name}</td>
                        <td className="px-4 py-3 text-sm">
                          <span className={`px-2 py-1 rounded text-xs ${
                            distributor.level === 'platinum' ? 'bg-purple-100 text-purple-700' :
                            distributor.level === 'gold' ? 'bg-yellow-100 text-yellow-700' :
                            distributor.level === 'silver' ? 'bg-gray-100 text-gray-700' :
                            'bg-orange-100 text-orange-700'
                          }`}>
                            {LEVEL_NAMES[distributor.level]}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-sm">{(distributor.commissionRate * 100).toFixed(0)}%</td>
                        <td className="px-4 py-3 text-sm">¥{distributor.totalSales.toLocaleString()}</td>
                        <td className="px-4 py-3 text-sm">
                          <span className={`px-2 py-1 rounded text-xs ${
                            distributor.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                          }`}>
                            {distributor.status === 'active' ? '正常' : '停用'}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-sm">
                          <div className="flex gap-2">
                            <button
                              onClick={() => openEditDialog(distributor)}
                              className="p-1 text-stone-400 hover:text-blue-600"
                            >
                              <Edit className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDeleteDistributor(distributor.username)}
                              className="p-1 text-stone-400 hover:text-red-600"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </TabsContent>

            {/* Messages Tab */}
            <TabsContent value="messages" className="space-y-6">
              <h2 className="text-lg font-semibold text-stone-800">留言列表</h2>
              <div className="space-y-4">
                {messages.length === 0 ? (
                  <div className="text-center py-8 text-stone-500">暂无留言</div>
                ) : (
                  messages.map((message) => (
                    <Card key={message.id} className={message.status === 'unread' ? 'border-emerald-300' : ''}>
                      <CardContent className="p-4">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <div className="font-semibold text-stone-800">{message.name}</div>
                            <div className="text-sm text-stone-500">{message.phone}</div>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className={`px-2 py-1 rounded text-xs ${
                              message.status === 'unread' ? 'bg-red-100 text-red-700' :
                              message.status === 'read' ? 'bg-blue-100 text-blue-700' :
                              'bg-green-100 text-green-700'
                            }`}>
                              {message.status === 'unread' ? '未读' : message.status === 'read' ? '已读' : '已回复'}
                            </span>
                            <button
                              onClick={() => handleDeleteMessage(message.id)}
                              className="p-1 text-stone-400 hover:text-red-600"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                        <div className="text-sm text-stone-600 mb-2">{message.subject}</div>
                        <div className="text-sm text-stone-500 bg-stone-50 p-3 rounded">{message.message}</div>
                        <div className="flex justify-between items-center mt-3">
                          <div className="text-xs text-stone-400">{message.createdAt}</div>
                          {message.status === 'unread' && (
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleUpdateMessageStatus(message.id, 'read')}
                            >
                              <CheckCircle className="w-4 h-4 mr-1" />
                              标记已读
                            </Button>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))
                )}
              </div>
            </TabsContent>

            {/* Products Tab */}
            <TabsContent value="products" className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-semibold text-stone-800">产品列表</h2>
                <div className="flex gap-2 items-center">
                  <Button size="sm" onClick={openAddProductModal}>
                    <Plus className="w-4 h-4 mr-2" />
                    新增产品
                  </Button>
                  <div className="text-sm text-stone-500">共 {productList.length} 个产品</div>
                </div>
              </div>
              <div className="bg-white rounded-lg border overflow-hidden">
                <table className="w-full">
                  <thead className="bg-stone-50">
                    <tr>
                      <th className="px-4 py-3 text-left text-sm font-medium text-stone-500">产品</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-stone-500">分类</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-stone-500">价格</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-stone-500">评分</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-stone-500">状态</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-stone-500">操作</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {productList.map((product) => (
                      <tr key={product.id} className="hover:bg-stone-50">
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-3">
                            <img src={product.image} alt={product.name} className="w-10 h-10 rounded object-cover" />
                            <span className="text-sm font-medium">{product.name}</span>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-sm">{product.categoryName}</td>
                        <td className="px-4 py-3 text-sm">¥{product.price.toFixed(2)}</td>
                        <td className="px-4 py-3 text-sm">{product.rating}</td>
                        <td className="px-4 py-3 text-sm">
                          <span className={`px-2 py-1 rounded text-xs ${
                            product.isBestseller ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                          }`}>
                            {product.isBestseller ? '上架' : '下架'}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-sm">
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleToggleProductStatus(product.id)}
                              className="p-1 text-stone-400 hover:text-emerald-600"
                              title={product.isBestseller ? '下架' : '上架'}
                            >
                              {product.isBestseller ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                            </button>
                            <button
                              onClick={() => openEditProductModal(product)}
                              className="p-1 text-stone-400 hover:text-blue-600"
                              title="编辑"
                            >
                              <Edit className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDeleteProduct(product.id)}
                              className="p-1 text-stone-400 hover:text-red-600"
                              title="删除"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* Add/Edit Distributor Modal */}
      {isAddDialogOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-lg w-full max-w-md max-h-[90vh] overflow-auto">
            <div className="p-6 border-b">
              <h2 className="text-lg font-semibold">添加分销商</h2>
              <p className="text-sm text-stone-500">填写分销商信息</p>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">用户名 *</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border rounded-md"
                  value={formData.username}
                  onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                  placeholder="如：dist004"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">姓名 *</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border rounded-md"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="分销商姓名"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">手机号 *</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border rounded-md"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="手机号码"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">邮箱</label>
                <input
                  type="email"
                  className="w-full px-3 py-2 border rounded-md"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="电子邮箱"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">地址</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border rounded-md"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  placeholder="地址"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">等级</label>
                <select
                  className="w-full px-3 py-2 border rounded-md"
                  value={formData.level}
                  onChange={(e) => setFormData({ ...formData, level: e.target.value as typeof formData.level })}
                >
                  <option value="bronze">铜牌 (15%)</option>
                  <option value="silver">银牌 (18%)</option>
                  <option value="gold">金牌 (22%)</option>
                  <option value="platinum">铂金 (25%)</option>
                </select>
              </div>
              <div className="flex gap-3 pt-4">
                <button
                  className="flex-1 px-4 py-2 bg-stone-200 rounded-md hover:bg-stone-300"
                  onClick={() => setIsAddDialogOpen(false)}
                >
                  取消
                </button>
                <button
                  className="flex-1 px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700"
                  onClick={handleAddDistributor}
                >
                  添加
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Distributor Modal */}
      {isEditDialogOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-lg w-full max-w-md max-h-[90vh] overflow-auto">
            <div className="p-6 border-b">
              <h2 className="text-lg font-semibold">编辑分销商</h2>
              <p className="text-sm text-stone-500">修改分销商信息</p>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">姓名</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border rounded-md"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">手机号</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border rounded-md"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">邮箱</label>
                <input
                  type="email"
                  className="w-full px-3 py-2 border rounded-md"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">地址</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border rounded-md"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">等级</label>
                <select
                  className="w-full px-3 py-2 border rounded-md"
                  value={formData.level}
                  onChange={(e) => setFormData({ ...formData, level: e.target.value as typeof formData.level })}
                >
                  <option value="bronze">铜牌 (15%)</option>
                  <option value="silver">银牌 (18%)</option>
                  <option value="gold">金牌 (22%)</option>
                  <option value="platinum">铂金 (25%)</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">状态</label>
                <select
                  className="w-full px-3 py-2 border rounded-md"
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value as typeof formData.status })}
                >
                  <option value="active">正常</option>
                  <option value="inactive">停用</option>
                </select>
              </div>
              <div className="flex gap-3 pt-4">
                <button
                  className="flex-1 px-4 py-2 bg-stone-200 rounded-md hover:bg-stone-300"
                  onClick={() => setIsEditDialogOpen(false)}
                >
                  取消
                </button>
                <button
                  className="flex-1 px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700"
                  onClick={handleUpdateDistributor}
                >
                  保存
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Product Modal (Add/Edit) */}
      {showProductModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-auto">
            <div className="p-6 border-b">
              <h2 className="text-lg font-semibold">{isEditingProduct ? '编辑产品' : '新增产品'}</h2>
              <p className="text-sm text-stone-500">{isEditingProduct ? '修改产品信息' : '填写产品信息'}</p>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">产品名称 {isEditingProduct ? '' : '*'}</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border rounded-md"
                    value={productForm.name}
                    onChange={(e) => setProductForm({ ...productForm, name: e.target.value })}
                    placeholder="如：生酮吐司面包"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">分类 {isEditingProduct ? '' : '*'}</label>
                  <select
                    className="w-full px-3 py-2 border rounded-md"
                    value={productForm.category}
                    onChange={(e) => {
                      const cat = e.target.value as 'keto' | 'regular';
                      setProductForm({ 
                        ...productForm, 
                        category: cat,
                        categoryName: cat === 'keto' ? '生酮系列' : '常规控糖系列'
                      });
                    }}
                  >
                    <option value="keto">生酮系列</option>
                    <option value="regular">常规控糖系列</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">价格 (元) {isEditingProduct ? '' : '*'}</label>
                  <input
                    type="number"
                    step="0.1"
                    className="w-full px-3 py-2 border rounded-md"
                    value={productForm.price}
                    onChange={(e) => setProductForm({ ...productForm, price: e.target.value })}
                    placeholder="如：38.8"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">原价 (元，可选)</label>
                  <input
                    type="number"
                    step="0.1"
                    className="w-full px-3 py-2 border rounded-md"
                    value={productForm.originalPrice}
                    onChange={(e) => setProductForm({ ...productForm, originalPrice: e.target.value })}
                    placeholder="如：48.0"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">产品图片 URL {isEditingProduct ? '' : '*'}</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border rounded-md"
                  value={productForm.image}
                  onChange={(e) => setProductForm({ ...productForm, image: e.target.value })}
                  placeholder="https://example.com/image.jpg"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">简短描述 {isEditingProduct ? '' : '*'}</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border rounded-md"
                  value={productForm.shortDescription}
                  onChange={(e) => setProductForm({ ...productForm, shortDescription: e.target.value })}
                  placeholder="产品简短描述"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">详细描述 {isEditingProduct ? '' : '*'}</label>
                <textarea
                  className="w-full px-3 py-2 border rounded-md"
                  rows={4}
                  value={productForm.description}
                  onChange={(e) => setProductForm({ ...productForm, description: e.target.value })}
                  placeholder="产品详细描述..."
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">标签 (用逗号分隔)</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border rounded-md"
                  value={productForm.tags}
                  onChange={(e) => setProductForm({ ...productForm, tags: e.target.value })}
                  placeholder="生酮，低碳水，无糖"
                />
              </div>
              <div className="flex gap-3 pt-4">
                <button
                  className="flex-1 px-4 py-2 bg-stone-200 rounded-md hover:bg-stone-300"
                  onClick={closeProductModal}
                >
                  取消
                </button>
                <button
                  className="flex-1 px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700"
                  onClick={handleSaveProduct}
                >
                  {isEditingProduct ? '保存修改' : '添加产品'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AdminDashboard;
