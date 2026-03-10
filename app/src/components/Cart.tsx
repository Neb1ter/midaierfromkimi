import { useState, useEffect } from 'react';
import { Plus, Minus, ShoppingBag, Trash2, CreditCard } from 'lucide-react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { cartManager, orderManager, paymentMethods, type Cart as CartType } from '@/data/cart';

interface CartProps {
  isOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export const Cart: React.FC<CartProps> = ({ isOpen, onOpenChange }) => {
  const [cart, setCart] = useState<CartType>({ items: [], totalCount: 0, totalPrice: 0 });
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'wechat' | 'alipay'>('wechat');
  const [isProcessing, setIsProcessing] = useState(false);
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    phone: '',
    address: '',
    note: '',
  });

  useEffect(() => {
    setCart(cartManager.getCart());
    
    // 监听购物车更新事件
    const handleCartUpdate = () => {
      setCart(cartManager.getCart());
    };
    window.addEventListener('cartUpdated', handleCartUpdate);
    
    return () => {
      window.removeEventListener('cartUpdated', handleCartUpdate);
    };
  }, []);

  const updateCart = () => {
    setCart(cartManager.getCart());
  };

  const handleUpdateQuantity = (productId: string, quantity: number) => {
    cartManager.updateQuantity(productId, quantity);
    updateCart();
  };

  const handleRemoveItem = (productId: string) => {
    cartManager.removeItem(productId);
    updateCart();
    toast.success('商品已移除');
  };

  const handleClearCart = () => {
    cartManager.clearCart();
    updateCart();
    toast.success('购物车已清空');
  };

  const handleCheckout = () => {
    if (cart.items.length === 0) {
      toast.error('购物车为空');
      return;
    }
    setCheckoutOpen(true);
    if (onOpenChange) onOpenChange(false);
  };

  const handlePayment = async () => {
    if (!customerInfo.name || !customerInfo.phone || !customerInfo.address) {
      toast.error('请填写完整的收货信息');
      return;
    }

    setIsProcessing(true);
    
    try {
      const order = orderManager.createOrder(paymentMethod, customerInfo);
      
      if (order) {
        // Simulate payment
        const success = await orderManager.simulatePayment(order.id, paymentMethod);
        
        if (success) {
          toast.success(`订单 ${order.id} 支付成功！`);
          setCheckoutOpen(false);
          updateCart();
          setCustomerInfo({ name: '', phone: '', address: '', note: '' });
        } else {
          toast.error('支付失败，请重试');
        }
      }
    } catch (error) {
      toast.error('支付处理失败');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <>
      <Sheet open={isOpen} onOpenChange={onOpenChange}>
        <SheetTrigger asChild>
          <button className="relative p-2 hover:bg-stone-100 rounded-full transition-colors">
            <ShoppingBag className="w-5 h-5 text-stone-700" />
            {cart.totalCount > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-rose-500 text-white text-xs rounded-full flex items-center justify-center">
                {cart.totalCount}
              </span>
            )}
          </button>
        </SheetTrigger>
        <SheetContent className="w-full sm:max-w-md flex flex-col">
          <SheetHeader>
            <SheetTitle className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5" />
              购物车 ({cart.totalCount})
            </SheetTitle>
          </SheetHeader>
          
          <div className="flex-1 overflow-auto py-4">
            {cart.items.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-stone-400">
                <ShoppingBag className="w-16 h-16 mb-4" />
                <p>购物车是空的</p>
                <p className="text-sm mt-2">快去选购心仪的商品吧</p>
              </div>
            ) : (
              <div className="space-y-4">
                {cart.items.map((item) => (
                  <div key={item.productId} className="flex gap-4 p-3 bg-stone-50 rounded-lg">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-20 h-20 object-cover rounded-md"
                    />
                    <div className="flex-1">
                      <h4 className="font-medium text-stone-800">{item.name}</h4>
                      <p className="text-rose-600 font-semibold mt-1">
                        ¥{item.price.toFixed(2)}
                      </p>
                      <div className="flex items-center gap-2 mt-2">
                        <button
                          onClick={() => handleUpdateQuantity(item.productId, item.quantity - 1)}
                          className="w-6 h-6 flex items-center justify-center bg-white border rounded hover:bg-stone-100"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-8 text-center">{item.quantity}</span>
                        <button
                          onClick={() => handleUpdateQuantity(item.productId, item.quantity + 1)}
                          className="w-6 h-6 flex items-center justify-center bg-white border rounded hover:bg-stone-100"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                        <button
                          onClick={() => handleRemoveItem(item.productId)}
                          className="ml-auto p-1 text-stone-400 hover:text-red-500"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          
          {cart.items.length > 0 && (
            <div className="border-t pt-4 space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-stone-600">共 {cart.totalCount} 件商品</span>
                <button
                  onClick={handleClearCart}
                  className="text-sm text-stone-400 hover:text-red-500"
                >
                  清空购物车
                </button>
              </div>
              <div className="flex justify-between items-center text-lg font-semibold">
                <span>合计</span>
                <span className="text-rose-600">¥{cart.totalPrice.toFixed(2)}</span>
              </div>
              <Button
                onClick={handleCheckout}
                className="w-full bg-stone-800 hover:bg-stone-700 text-white"
              >
                <CreditCard className="w-4 h-4 mr-2" />
                去结算
              </Button>
            </div>
          )}
        </SheetContent>
      </Sheet>

      {/* Checkout Dialog */}
      <Dialog open={checkoutOpen} onOpenChange={setCheckoutOpen}>
        <DialogContent className="max-w-md max-h-[90vh] overflow-auto">
          <DialogHeader>
            <DialogTitle>确认订单</DialogTitle>
            <DialogDescription>请填写收货信息并选择支付方式</DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            {/* Order Summary */}
            <div className="bg-stone-50 p-4 rounded-lg">
              <h4 className="font-medium mb-2">订单金额</h4>
              <div className="flex justify-between text-lg font-semibold">
                <span>合计</span>
                <span className="text-rose-600">¥{cart.totalPrice.toFixed(2)}</span>
              </div>
            </div>

            {/* Customer Info */}
            <div className="space-y-3">
              <h4 className="font-medium">收货信息</h4>
              <Input
                placeholder="收货人姓名"
                value={customerInfo.name}
                onChange={(e) => setCustomerInfo({ ...customerInfo, name: e.target.value })}
              />
              <Input
                placeholder="手机号码"
                value={customerInfo.phone}
                onChange={(e) => setCustomerInfo({ ...customerInfo, phone: e.target.value })}
              />
              <Input
                placeholder="收货地址"
                value={customerInfo.address}
                onChange={(e) => setCustomerInfo({ ...customerInfo, address: e.target.value })}
              />
              <Input
                placeholder="备注（可选）"
                value={customerInfo.note}
                onChange={(e) => setCustomerInfo({ ...customerInfo, note: e.target.value })}
              />
            </div>

            <Separator />

            {/* Payment Method */}
            <div className="space-y-3">
              <h4 className="font-medium">支付方式</h4>
              <RadioGroup
                value={paymentMethod}
                onValueChange={(value) => setPaymentMethod(value as 'wechat' | 'alipay')}
                className="space-y-2"
              >
                {paymentMethods.map((method) => (
                  <div key={method.id} className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-stone-50">
                    <RadioGroupItem value={method.id} id={method.id} />
                    <Label htmlFor={method.id} className="flex-1 cursor-pointer">
                      <div className="flex items-center gap-2">
                        <span className="text-2xl">{method.icon}</span>
                        <div>
                          <div className="font-medium">{method.name}</div>
                          <div className="text-sm text-stone-500">{method.description}</div>
                        </div>
                      </div>
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>

            <Button
              onClick={handlePayment}
              disabled={isProcessing}
              className="w-full bg-stone-800 hover:bg-stone-700 text-white"
            >
              {isProcessing ? '处理中...' : `确认支付 ¥${cart.totalPrice.toFixed(2)}`}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Cart;
