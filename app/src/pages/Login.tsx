import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Eye, EyeOff, Lock, User, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { SEO } from '@/components/SEO';
import { login } from '@/data/auth';
import { toast } from 'sonner';

export const Login: React.FC = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!username || !password) {
      toast.error('请输入用户名和密码');
      return;
    }

    setIsLoading(true);

    try {
      const user = login(username, password);

      if (user) {
        toast.success(`欢迎回来，${user.name}`);
        
        // Redirect based on role
        if (user.role === 'admin') {
          navigate('/admin');
        } else {
          navigate('/distributor');
        }
      } else {
        toast.error('用户名或密码错误');
      }
    } catch (error) {
      toast.error('登录失败，请重试');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <SEO
        title="登录 | 米黛尔控糖烘焙"
        description="登录米黛尔管理后台或分销中心"
        keywords={['登录', '米黛尔', '管理后台', '分销中心']}
      />

      <div className="min-h-screen bg-stone-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full">
          {/* Logo */}
          <div className="text-center mb-8">
            <Link to="/" className="inline-block">
              <h1 className="text-3xl font-bold text-stone-800">米黛尔</h1>
            </Link>
            <p className="mt-2 text-stone-600">管理后台 / 分销中心登录</p>
          </div>

          {/* Login Form */}
          <div className="bg-white rounded-xl shadow-sm p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label htmlFor="username">用户名</Label>
                <div className="relative mt-1">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-400" />
                  <Input
                    id="username"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="请输入用户名"
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="password">密码</Label>
                <div className="relative mt-1">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-400" />
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="请输入密码"
                    className="pl-10 pr-10"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600"
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>

              <Button
                type="submit"
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white"
                disabled={isLoading}
              >
                {isLoading ? '登录中...' : (
                  <>
                    登录
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </>
                )}
              </Button>
            </form>

            {/* Demo Accounts */}
            <div className="mt-8 pt-6 border-t">
              <p className="text-sm text-stone-500 text-center mb-4">测试账号</p>
              <div className="space-y-2 text-sm">
                <div className="bg-stone-50 p-3 rounded-lg">
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-stone-700">管理员</span>
                    <span className="text-stone-500">admin / midaiersweet2024</span>
                  </div>
                </div>
                <div className="bg-stone-50 p-3 rounded-lg">
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-stone-700">分销商1</span>
                    <span className="text-stone-500">dist001 / dist001@2024</span>
                  </div>
                </div>
                <div className="bg-stone-50 p-3 rounded-lg">
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-stone-700">分销商2</span>
                    <span className="text-stone-500">dist002 / dist002@2024</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Back Link */}
          <div className="mt-6 text-center">
            <Link to="/" className="text-sm text-stone-500 hover:text-emerald-600">
              返回首页
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
