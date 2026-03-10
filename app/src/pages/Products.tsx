import { useState, useEffect, useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Filter, ChevronDown, Star, ShoppingCart } from 'lucide-react';
import { SEO } from '@/components/SEO';
import { products, type Product } from '@/data/products';
import { cartManager } from '@/data/cart';
import { toast } from 'sonner';

const categories = [
  { id: 'all', name: '全部产品' },
  { id: 'keto', name: '生酮系列' },
  { id: 'regular', name: '常规控糖系列' },
];

const filters = [
  { id: 'all', name: '全部' },
  { id: 'new', name: '新品' },
  { id: 'bestseller', name: '热销' },
];

const sortOptions = [
  { id: 'default', name: '默认排序' },
  { id: 'price-asc', name: '价格从低到高' },
  { id: 'price-desc', name: '价格从高到低' },
  { id: 'rating', name: '评分最高' },
];

export const Products: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || 'all');
  const [selectedFilter, setSelectedFilter] = useState(searchParams.get('filter') || 'all');
  const [sortBy, setSortBy] = useState('default');
  const [showSortDropdown, setShowSortDropdown] = useState(false);

  useEffect(() => {
    const category = searchParams.get('category');
    const filter = searchParams.get('filter');
    if (category) setSelectedCategory(category);
    if (filter) setSelectedFilter(filter);
  }, [searchParams]);

  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Filter by category
    if (selectedCategory !== 'all') {
      result = result.filter((p) => p.category === selectedCategory);
    }

    // Filter by type
    if (selectedFilter === 'new') {
      result = result.filter((p) => p.isNew);
    } else if (selectedFilter === 'bestseller') {
      result = result.filter((p) => p.isBestseller);
    }

    // Sort
    switch (sortBy) {
      case 'price-asc':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
    }

    return result;
  }, [selectedCategory, selectedFilter, sortBy]);

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    const newParams = new URLSearchParams(searchParams);
    if (category === 'all') {
      newParams.delete('category');
    } else {
      newParams.set('category', category);
    }
    setSearchParams(newParams);
  };

  const handleFilterChange = (filter: string) => {
    setSelectedFilter(filter);
    const newParams = new URLSearchParams(searchParams);
    if (filter === 'all') {
      newParams.delete('filter');
    } else {
      newParams.set('filter', filter);
    }
    setSearchParams(newParams);
  };

  const handleAddToCart = (e: React.MouseEvent, product: Product) => {
    e.preventDefault();
    e.stopPropagation();
    cartManager.addItem(product.id, 1);
    toast.success(`${product.name} 已加入购物车`);
  };

  const getSortName = () => {
    return sortOptions.find((o) => o.id === sortBy)?.name || '默认排序';
  };

  return (
    <>
      <SEO
        title="产品中心 | 米黛尔控糖烘焙"
        description="探索米黛尔全线控糖烘焙产品，包括生酮系列和常规控糖系列。无糖、低碳水、高纤维，美味与健康兼得。"
        keywords={['控糖产品', '生酮食品', '无糖烘焙', '低碳水', '米黛尔产品']}
      />

      <div className="min-h-screen bg-stone-50 pt-20">
        {/* Header */}
        <div className="bg-white border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <h1 className="text-3xl lg:text-4xl font-bold text-stone-800 mb-2">产品中心</h1>
            <p className="text-stone-600">探索我们的控糖烘焙产品系列</p>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white border-b sticky top-16 z-30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex flex-wrap items-center gap-4">
              {/* Categories */}
              <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0">
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => handleCategoryChange(cat.id)}
                    className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                      selectedCategory === cat.id
                        ? 'bg-emerald-600 text-white'
                        : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                    }`}
                  >
                    {cat.name}
                  </button>
                ))}
              </div>

              <div className="hidden sm:block w-px h-6 bg-stone-200" />

              {/* Filters */}
              <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0">
                {filters.map((filter) => (
                  <button
                    key={filter.id}
                    onClick={() => handleFilterChange(filter.id)}
                    className={`px-3 py-1.5 rounded-full text-sm whitespace-nowrap transition-colors ${
                      selectedFilter === filter.id
                        ? 'bg-stone-800 text-white'
                        : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                    }`}
                  >
                    {filter.name}
                  </button>
                ))}
              </div>

              <div className="flex-1" />

              {/* Sort */}
              <div className="relative">
                <button
                  onClick={() => setShowSortDropdown(!showSortDropdown)}
                  className="flex items-center gap-2 px-4 py-2 bg-stone-100 rounded-lg text-sm text-stone-700 hover:bg-stone-200 transition-colors"
                >
                  <Filter className="w-4 h-4" />
                  {getSortName()}
                  <ChevronDown className="w-4 h-4" />
                </button>
                {showSortDropdown && (
                  <div className="absolute right-0 mt-2 w-40 bg-white rounded-lg shadow-lg border py-1 z-40">
                    {sortOptions.map((option) => (
                      <button
                        key={option.id}
                        onClick={() => {
                          setSortBy(option.id);
                          setShowSortDropdown(false);
                        }}
                        className={`block w-full text-left px-4 py-2 text-sm hover:bg-stone-50 ${
                          sortBy === option.id ? 'text-emerald-600' : 'text-stone-700'
                        }`}
                      >
                        {option.name}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Product Grid */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {filteredProducts.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-stone-500">暂无符合条件的产品</p>
            </div>
          ) : (
            <>
              <p className="text-sm text-stone-500 mb-6">
                共 {filteredProducts.length} 款产品
              </p>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredProducts.map((product) => (
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
                      <div className="absolute top-3 left-3 flex gap-2">
                        {product.isNew && (
                          <span className="bg-green-600 text-white text-xs px-2 py-1 rounded">
                            新品
                          </span>
                        )}
                        {product.isBestseller && (
                          <span className="bg-emerald-600 text-white text-xs px-2 py-1 rounded">
                            热销
                          </span>
                        )}
                      </div>
                      <button
                        onClick={(e) => handleAddToCart(e, product)}
                        className="absolute bottom-3 right-3 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-emerald-600 hover:text-white"
                      >
                        <ShoppingCart className="w-5 h-5" />
                      </button>
                    </div>
                    <div className="p-4">
                      <span className="text-xs text-emerald-600 font-medium">
                        {product.categoryName}
                      </span>
                      <h3 className="font-semibold text-stone-800 mt-1 group-hover:text-emerald-600 transition-colors">
                        {product.name}
                      </h3>
                      <p className="text-sm text-stone-500 mt-1 line-clamp-2">
                        {product.shortDescription}
                      </p>
                      <div className="flex items-center gap-2 mt-2">
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm text-stone-600">{product.rating}</span>
                        </div>
                        <span className="text-stone-300">|</span>
                        <span className="text-sm text-stone-500">{product.reviewCount}条评价</span>
                      </div>
                      <div className="flex items-center gap-2 mt-3">
                        <span className="text-lg font-bold text-emerald-600">
                          ¥{product.price.toFixed(2)}
                        </span>
                        {product.originalPrice && (
                          <span className="text-sm text-stone-400 line-through">
                            ¥{product.originalPrice.toFixed(2)}
                          </span>
                        )}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Products;
