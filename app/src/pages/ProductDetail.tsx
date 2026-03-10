import { useState, useEffect, useRef } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { gsap } from 'gsap';
import { Minus, Plus, ShoppingCart, Star, CheckCircle, ExternalLink, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { SEO } from '@/components/SEO';
import { getProductById, getRelatedProducts, productModules } from '@/data/products';
import { cartManager } from '@/data/cart';
import { toast } from 'sonner';

export const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const product = id ? getProductById(id) : undefined;
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (contentRef.current) {
      gsap.fromTo(
        contentRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }
      );
    }
  }, [id]);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-stone-800 mb-4">产品未找到</h1>
          <Link to="/products">
            <Button>返回产品列表</Button>
          </Link>
        </div>
      </div>
    );
  }

  const relatedProducts = getRelatedProducts(product.id, 4);
  const enabledModules = product.enabledModules || productModules.map((m) => m.id);

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      cartManager.addItem(product.id, 1);
    }
    // 触发购物车更新事件，让导航栏图标抖动
    window.dispatchEvent(new CustomEvent('cartUpdated'));
    toast.success(`${product.name} x${quantity} 已加入购物车`, {
      icon: '🛒',
      duration: 2000,
    });
  };

  const handleBuyNow = () => {
    handleAddToCart();
    navigate('/');
    // Open cart
    setTimeout(() => {
      const cartButton = document.querySelector('[data-cart-trigger]') as HTMLButtonElement;
      cartButton?.click();
    }, 100);
  };

  const platformColors: Record<string, string> = {
    taobao: 'bg-orange-500',
    tmall: 'bg-red-500',
    jd: 'bg-red-600',
    douyin: 'bg-black',
    wechat: 'bg-green-500',
    xiaohongshu: 'bg-red-400',
  };

  return (
    <>
      <SEO
        title={product.metaTitle || `${product.name} | 米黛尔控糖烘焙`}
        description={product.metaDescription || product.description}
        keywords={product.keywords || [product.categoryName, product.name, '控糖烘焙']}
      />

      <div className="min-h-screen bg-stone-50 pt-20" ref={contentRef}>
        {/* Breadcrumb */}
        <div className="bg-white border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center gap-2 text-sm text-stone-500">
              <Link to="/" className="hover:text-emerald-600">首页</Link>
              <span>/</span>
              <Link to="/products" className="hover:text-emerald-600">产品中心</Link>
              <span>/</span>
              <Link to={`/products?category=${product.category}`} className="hover:text-emerald-600">
                {product.categoryName}
              </Link>
              <span>/</span>
              <span className="text-stone-800">{product.name}</span>
            </div>
          </div>
        </div>

        {/* Product Main */}
        <div className="bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
              {/* Images */}
              <div>
                <div className="relative aspect-square rounded-xl overflow-hidden bg-stone-100 mb-4">
                  <img
                    src={product.gallery[activeImage]}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                  {product.isNew && (
                    <span className="absolute top-4 left-4 bg-green-600 text-white text-sm px-3 py-1 rounded">
                      新品
                    </span>
                  )}
                  {product.isBestseller && (
                    <span className="absolute top-4 right-4 bg-emerald-600 text-white text-sm px-3 py-1 rounded">
                      热销
                    </span>
                  )}
                </div>
                <div className="flex gap-2">
                  {product.gallery.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setActiveImage(index)}
                      className={`w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${
                        activeImage === index ? 'border-emerald-600' : 'border-transparent'
                      }`}
                    >
                      <img src={image} alt={`${product.name} ${index + 1}`} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              </div>

              {/* Info */}
              <div>
                <span className="text-emerald-600 text-sm font-medium">{product.categoryName}</span>
                <h1 className="text-2xl lg:text-3xl font-bold text-stone-800 mt-2">{product.name}</h1>
                
                <div className="flex items-center gap-4 mt-4">
                  <div className="flex items-center gap-1">
                    <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    <span className="font-semibold">{product.rating}</span>
                  </div>
                  <span className="text-stone-300">|</span>
                  <span className="text-stone-600">{product.reviewCount} 条评价</span>
                </div>

                <div className="flex items-baseline gap-3 mt-6">
                  <span className="text-3xl font-bold text-emerald-600">
                    ¥{product.price.toFixed(2)}
                  </span>
                  {product.originalPrice && (
                    <span className="text-lg text-stone-400 line-through">
                      ¥{product.originalPrice.toFixed(2)}
                    </span>
                  )}
                </div>

                <p className="text-stone-600 mt-6 leading-relaxed">{product.description}</p>

                {/* Features */}
                <div className="mt-6">
                  <h3 className="font-semibold text-stone-800 mb-3">产品特点</h3>
                  <ul className="space-y-2">
                    {product.features.slice(0, 4).map((feature, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-stone-600">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Quantity */}
                <div className="mt-6">
                  <h3 className="font-semibold text-stone-800 mb-3">数量</h3>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center border rounded-lg">
                      <button
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="w-10 h-10 flex items-center justify-center hover:bg-stone-100"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="w-12 text-center">{quantity}</span>
                      <button
                        onClick={() => setQuantity(quantity + 1)}
                        className="w-10 h-10 flex items-center justify-center hover:bg-stone-100"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                    <span className="text-stone-500">库存充足</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-4 mt-8">
                  <Button
                    onClick={handleAddToCart}
                    variant="outline"
                    size="lg"
                    className="flex-1 border-stone-800 text-stone-800 hover:bg-stone-800 hover:text-white"
                  >
                    <ShoppingCart className="w-5 h-5 mr-2" />
                    加入购物车
                  </Button>
                  <Button
                    onClick={handleBuyNow}
                    size="lg"
                    className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white"
                  >
                    立即购买
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setIsFavorite(!isFavorite)}
                    className={isFavorite ? 'text-emerald-600 border-emerald-600' : ''}
                  >
                    <Heart className={`w-5 h-5 ${isFavorite ? 'fill-current' : ''}`} />
                  </Button>
                </div>

                {/* Platform Links */}
                {enabledModules.includes('platforms') && product.platformLinks && (
                  <div className="mt-8">
                    <h3 className="font-semibold text-stone-800 mb-3">其他购买渠道</h3>
                    <div className="flex flex-wrap gap-2">
                      {product.platformLinks.map((link) => (
                        <a
                          key={link.platform}
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-white text-sm hover:opacity-90 transition-opacity ${
                            platformColors[link.platform] || 'bg-stone-600'
                          }`}
                        >
                          <span>{link.icon}</span>
                          <span>{link.name}</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      ))}
                    </div>
                  </div>
                )}

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mt-6">
                  {product.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-stone-100 text-stone-600 text-sm rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <Tabs defaultValue="ingredients" className="bg-white rounded-xl p-6">
            <TabsList className="w-full justify-start border-b rounded-none h-auto p-0 mb-6">
              {enabledModules.includes('ingredients') && (
                <TabsTrigger value="ingredients" className="rounded-none border-b-2 border-transparent data-[state=active]:border-emerald-600 data-[state=active]:text-emerald-600">
                  食材用料
                </TabsTrigger>
              )}
              {enabledModules.includes('nutrition') && (
                <TabsTrigger value="nutrition" className="rounded-none border-b-2 border-transparent data-[state=active]:border-emerald-600 data-[state=active]:text-emerald-600">
                  营养成分
                </TabsTrigger>
              )}
              {enabledModules.includes('production') && (
                <TabsTrigger value="production" className="rounded-none border-b-2 border-transparent data-[state=active]:border-emerald-600 data-[state=active]:text-emerald-600">
                  生产工艺
                </TabsTrigger>
              )}
              {enabledModules.includes('story') && (
                <TabsTrigger value="story" className="rounded-none border-b-2 border-transparent data-[state=active]:border-emerald-600 data-[state=active]:text-emerald-600">
                  品牌故事
                </TabsTrigger>
              )}
              {enabledModules.includes('certifications') && (
                <TabsTrigger value="certifications" className="rounded-none border-b-2 border-transparent data-[state=active]:border-emerald-600 data-[state=active]:text-emerald-600">
                  认证资质
                </TabsTrigger>
              )}
              {enabledModules.includes('storage') && (
                <TabsTrigger value="storage" className="rounded-none border-b-2 border-transparent data-[state=active]:border-emerald-600 data-[state=active]:text-emerald-600">
                  储存方法
                </TabsTrigger>
              )}
            </TabsList>

            {enabledModules.includes('ingredients') && (
              <TabsContent value="ingredients" className="mt-0">
                <h3 className="text-lg font-semibold text-stone-800 mb-4">食材清单</h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  {product.ingredients.map((ingredient, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <span className="text-stone-600">{ingredient}</span>
                    </div>
                  ))}
                </div>
              </TabsContent>
            )}

            {enabledModules.includes('nutrition') && (
              <TabsContent value="nutrition" className="mt-0">
                <h3 className="text-lg font-semibold text-stone-800 mb-4">营养成分表</h3>
                <div className="max-w-md">
                  <div className="border rounded-lg overflow-hidden">
                    <div className="bg-stone-50 px-4 py-2 border-b">
                      <span className="font-medium">每份含量：{product.nutritionFacts.servingSize}</span>
                    </div>
                    <div className="divide-y">
                      <div className="flex justify-between px-4 py-2">
                        <span className="text-stone-600">热量</span>
                        <span className="font-medium">{product.nutritionFacts.calories} kcal</span>
                      </div>
                      <div className="flex justify-between px-4 py-2">
                        <span className="text-stone-600">总脂肪</span>
                        <span className="font-medium">{product.nutritionFacts.totalFat}g</span>
                      </div>
                      <div className="flex justify-between px-4 py-2 pl-8">
                        <span className="text-stone-500">饱和脂肪</span>
                        <span>{product.nutritionFacts.saturatedFat}g</span>
                      </div>
                      <div className="flex justify-between px-4 py-2">
                        <span className="text-stone-600">胆固醇</span>
                        <span className="font-medium">{product.nutritionFacts.cholesterol}mg</span>
                      </div>
                      <div className="flex justify-between px-4 py-2">
                        <span className="text-stone-600">钠</span>
                        <span className="font-medium">{product.nutritionFacts.sodium}mg</span>
                      </div>
                      <div className="flex justify-between px-4 py-2">
                        <span className="text-stone-600">总碳水化合物</span>
                        <span className="font-medium">{product.nutritionFacts.totalCarbs}g</span>
                      </div>
                      <div className="flex justify-between px-4 py-2 pl-8">
                        <span className="text-stone-500">膳食纤维</span>
                        <span>{product.nutritionFacts.dietaryFiber}g</span>
                      </div>
                      <div className="flex justify-between px-4 py-2 pl-8">
                        <span className="text-stone-500">糖</span>
                        <span>{product.nutritionFacts.sugars}g</span>
                      </div>
                      <div className="flex justify-between px-4 py-2">
                        <span className="text-stone-600">蛋白质</span>
                        <span className="font-medium">{product.nutritionFacts.protein}g</span>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
            )}

            {enabledModules.includes('production') && (
              <TabsContent value="production" className="mt-0">
                <h3 className="text-lg font-semibold text-stone-800 mb-4">生产工艺</h3>
                <div className="space-y-4">
                  {product.productionProcess?.map((step, index) => (
                    <div key={index} className="flex items-start gap-4">
                      <div className="w-8 h-8 bg-emerald-600 text-white rounded-full flex items-center justify-center flex-shrink-0">
                        {index + 1}
                      </div>
                      <p className="text-stone-600 pt-1">{step}</p>
                    </div>
                  ))}
                </div>
              </TabsContent>
            )}

            {enabledModules.includes('story') && (
              <TabsContent value="story" className="mt-0">
                <h3 className="text-lg font-semibold text-stone-800 mb-4">品牌故事</h3>
                <p className="text-stone-600 leading-relaxed">{product.story}</p>
              </TabsContent>
            )}

            {enabledModules.includes('certifications') && (
              <TabsContent value="certifications" className="mt-0">
                <h3 className="text-lg font-semibold text-stone-800 mb-4">认证资质</h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  {product.certifications?.map((cert, index) => (
                    <div key={index} className="flex items-center gap-2 bg-stone-50 p-4 rounded-lg">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      <span className="text-stone-700">{cert}</span>
                    </div>
                  ))}
                </div>
              </TabsContent>
            )}

            {enabledModules.includes('storage') && (
              <TabsContent value="storage" className="mt-0">
                <h3 className="text-lg font-semibold text-stone-800 mb-4">储存方法与保质期</h3>
                <div className="space-y-4">
                  <div className="bg-stone-50 p-4 rounded-lg">
                    <span className="font-medium text-stone-800">储存条件：</span>
                    <span className="text-stone-600 ml-2">{product.storageInstructions}</span>
                  </div>
                  <div className="bg-stone-50 p-4 rounded-lg">
                    <span className="font-medium text-stone-800">保质期：</span>
                    <span className="text-stone-600 ml-2">{product.shelfLife}</span>
                  </div>
                  <div className="bg-stone-50 p-4 rounded-lg">
                    <span className="font-medium text-stone-800">净含量：</span>
                    <span className="text-stone-600 ml-2">{product.weight}</span>
                  </div>
                </div>
              </TabsContent>
            )}
          </Tabs>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <h2 className="text-2xl font-bold text-stone-800 mb-6">相关推荐</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((product) => (
                <Link
                  key={product.id}
                  to={`/product/${product.id}`}
                  className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow"
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full aspect-square object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-stone-800 group-hover:text-emerald-600 transition-colors">
                      {product.name}
                    </h3>
                    <p className="text-sm text-stone-500 mt-1">{product.shortDescription}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <span className="text-emerald-600 font-bold">¥{product.price.toFixed(2)}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ProductDetail;
