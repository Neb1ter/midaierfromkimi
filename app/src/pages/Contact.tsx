import { useState } from 'react';
import { Phone, Mail, MapPin, Clock, Send, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { SEO } from '@/components/SEO';
import { companyInfo, submitContactMessage } from '@/data/contact';
import { toast } from 'sonner';

export const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.phone || !formData.message) {
      toast.error('请填写必填项');
      return;
    }

    setIsSubmitting(true);

    try {
      submitContactMessage({
        name: formData.name,
        phone: formData.phone,
        email: formData.email,
        subject: formData.subject,
        message: formData.message,
      });
      setSubmitted(true);
      toast.success('消息已发送，我们会尽快回复您');
    } catch (error) {
      toast.error('发送失败，请重试');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <>
        <SEO
          title="联系我们 | 米黛尔控糖烘焙"
          description="联系米黛尔，获取产品咨询、商务合作、分销代理等信息。我们期待与您的合作。"
          keywords={['联系米黛尔', '商务合作', '分销代理', '产品咨询']}
        />
        <div className="min-h-screen bg-stone-50 pt-20 flex items-center justify-center">
          <div className="text-center p-8">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-green-600" />
            </div>
            <h1 className="text-2xl font-bold text-stone-800 mb-4">消息已发送</h1>
            <p className="text-stone-600 mb-6">感谢您的留言，我们会尽快回复您</p>
            <Button onClick={() => setSubmitted(false)} variant="outline">
              继续留言
            </Button>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <SEO
        title="联系我们 | 米黛尔控糖烘焙"
        description="联系米黛尔，获取产品咨询、商务合作、分销代理等信息。我们期待与您的合作。"
        keywords={['联系米黛尔', '商务合作', '分销代理', '产品咨询']}
      />

      <div className="min-h-screen bg-stone-50 pt-20">
        {/* Hero */}
        <div className="bg-stone-900 text-white py-16 lg:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl lg:text-5xl font-bold mb-4">联系我们</h1>
            <p className="text-xl text-stone-300 max-w-2xl mx-auto">
              有任何问题或合作意向，欢迎随时联系我们
            </p>
          </div>
        </div>

        {/* Contact Info & Form */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
            {/* Contact Info */}
            <div>
              <h2 className="text-2xl font-bold text-stone-800 mb-6">联系方式</h2>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6 text-emerald-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-stone-800 mb-1">客服热线</h3>
                    <p className="text-stone-600">{companyInfo.phone}</p>
                    <p className="text-sm text-stone-500">周一至周日 9:00-21:00</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-emerald-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-stone-800 mb-1">电子邮箱</h3>
                    <p className="text-stone-600">{companyInfo.email}</p>
                    <p className="text-sm text-stone-500">商务合作：business@midaiersweet.com</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-emerald-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-stone-800 mb-1">公司地址</h3>
                    <p className="text-stone-600">{companyInfo.address}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Clock className="w-6 h-6 text-emerald-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-stone-800 mb-1">营业时间</h3>
                    <p className="text-stone-600">{companyInfo.businessHours}</p>
                  </div>
                </div>
              </div>

              {/* Social Media */}
              <div className="mt-10">
                <h3 className="font-semibold text-stone-800 mb-4">关注我们</h3>
                <div className="flex gap-4">
                  {[
                    { name: '微信公众号', icon: '💬' },
                    { name: '微博', icon: '📱' },
                    { name: '小红书', icon: '📕' },
                    { name: '抖音', icon: '🎵' },
                  ].map((social, index) => (
                    <div
                      key={index}
                      className="w-12 h-12 bg-stone-100 rounded-lg flex items-center justify-center hover:bg-emerald-100 transition-colors cursor-pointer"
                      title={social.name}
                    >
                      <span className="text-2xl">{social.icon}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-white rounded-xl p-6 lg:p-8 shadow-sm">
              <h2 className="text-2xl font-bold text-stone-800 mb-6">在线留言</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">
                      姓名 <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="请输入您的姓名"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">
                      电话 <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="请输入您的电话"
                      required
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="email">邮箱</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="请输入您的邮箱（选填）"
                  />
                </div>

                <div>
                  <Label htmlFor="subject">主题</Label>
                  <Input
                    id="subject"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    placeholder="请输入留言主题"
                  />
                </div>

                <div>
                  <Label htmlFor="message">
                    留言内容 <span className="text-red-500">*</span>
                  </Label>
                  <Textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="请输入您的留言内容"
                    rows={5}
                    required
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? '发送中...' : (
                    <>
                      <Send className="w-4 h-4 mr-2" />
                      发送留言
                    </>
                  )}
                </Button>
              </form>
            </div>
          </div>
        </div>

        {/* Map Placeholder */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
          <div className="bg-stone-200 rounded-xl h-64 lg:h-96 flex items-center justify-center">
            <div className="text-center">
              <MapPin className="w-12 h-12 text-stone-400 mx-auto mb-4" />
              <p className="text-stone-500">地图加载中...</p>
              <p className="text-sm text-stone-400 mt-2">{companyInfo.address}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;
