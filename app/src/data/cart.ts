import { products } from './products';

export interface CartItem {
  productId: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

export interface Cart {
  items: CartItem[];
  totalCount: number;
  totalPrice: number;
}

export interface PaymentMethod {
  id: 'wechat' | 'alipay';
  name: string;
  icon: string;
  description: string;
}

export const paymentMethods: PaymentMethod[] = [
  { 
    id: 'wechat', 
    name: '微信支付', 
    icon: '💬',
    description: '使用微信扫码支付，安全便捷'
  },
  { 
    id: 'alipay', 
    name: '支付宝', 
    icon: '💰',
    description: '使用支付宝支付，支持花呗分期'
  },
];

const CART_STORAGE_KEY = 'midaiersweet_cart';

// Get cart from localStorage
export const getCart = (): Cart => {
  const cartStr = localStorage.getItem(CART_STORAGE_KEY);
  if (cartStr) {
    return JSON.parse(cartStr);
  }
  return { items: [], totalCount: 0, totalPrice: 0 };
};

// Save cart to localStorage
const saveCart = (cart: Cart): void => {
  localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
};

// Calculate cart totals
const calculateTotals = (items: CartItem[]): { totalCount: number; totalPrice: number } => {
  return items.reduce(
    (acc, item) => ({
      totalCount: acc.totalCount + item.quantity,
      totalPrice: acc.totalPrice + item.price * item.quantity,
    }),
    { totalCount: 0, totalPrice: 0 }
  );
};

// Add item to cart
export const addToCart = (productId: string, quantity: number = 1): Cart => {
  const cart = getCart();
  const product = products.find(p => p.id === productId);
  
  if (!product) return cart;
  
  const existingItem = cart.items.find(item => item.productId === productId);
  
  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    cart.items.push({
      productId,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity,
    });
  }
  
  const totals = calculateTotals(cart.items);
  cart.totalCount = totals.totalCount;
  cart.totalPrice = totals.totalPrice;
  
  saveCart(cart);
  return cart;
};

// Update item quantity
export const updateCartItemQuantity = (productId: string, quantity: number): Cart => {
  const cart = getCart();
  
  if (quantity <= 0) {
    return removeFromCart(productId);
  }
  
  const item = cart.items.find(item => item.productId === productId);
  if (item) {
    item.quantity = quantity;
  }
  
  const totals = calculateTotals(cart.items);
  cart.totalCount = totals.totalCount;
  cart.totalPrice = totals.totalPrice;
  
  saveCart(cart);
  return cart;
};

// Remove item from cart
export const removeFromCart = (productId: string): Cart => {
  const cart = getCart();
  cart.items = cart.items.filter(item => item.productId !== productId);
  
  const totals = calculateTotals(cart.items);
  cart.totalCount = totals.totalCount;
  cart.totalPrice = totals.totalPrice;
  
  saveCart(cart);
  return cart;
};

// Clear cart
export const clearCart = (): Cart => {
  const emptyCart: Cart = { items: [], totalCount: 0, totalPrice: 0 };
  saveCart(emptyCart);
  return emptyCart;
};

// Check if product is in cart
export const isInCart = (productId: string): boolean => {
  const cart = getCart();
  return cart.items.some(item => item.productId === productId);
};

// Get item quantity in cart
export const getCartItemQuantity = (productId: string): number => {
  const cart = getCart();
  const item = cart.items.find(item => item.productId === productId);
  return item?.quantity || 0;
};

// Cart manager object for convenience
export const cartManager = {
  getCart,
  addItem: addToCart,
  updateQuantity: updateCartItemQuantity,
  removeItem: removeFromCart,
  clearCart,
  isInCart,
  getItemQuantity: getCartItemQuantity,
};

// Order interface
export interface OrderItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  subtotal: number;
}

export interface Order {
  id: string;
  items: OrderItem[];
  totalAmount: number;
  paymentMethod: 'wechat' | 'alipay';
  status: 'pending' | 'paid' | 'shipped' | 'delivered' | 'cancelled';
  createdAt: string;
  paidAt?: string;
  customerName: string;
  customerPhone: string;
  customerAddress: string;
  note?: string;
}

const ORDERS_STORAGE_KEY = 'midaiersweet_orders';

// Generate order ID
const generateOrderId = (): string => {
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `MDR${timestamp}${random}`;
};

// Create order from cart
export const createOrder = (
  paymentMethod: 'wechat' | 'alipay',
  customerInfo: { name: string; phone: string; address: string; note?: string }
): Order | null => {
  const cart = getCart();
  
  if (cart.items.length === 0) return null;
  
  const orderItems: OrderItem[] = cart.items.map(item => ({
    productId: item.productId,
    name: item.name,
    price: item.price,
    quantity: item.quantity,
    subtotal: item.price * item.quantity,
  }));
  
  const order: Order = {
    id: generateOrderId(),
    items: orderItems,
    totalAmount: cart.totalPrice,
    paymentMethod,
    status: 'pending',
    createdAt: new Date().toISOString(),
    customerName: customerInfo.name,
    customerPhone: customerInfo.phone,
    customerAddress: customerInfo.address,
    note: customerInfo.note,
  };
  
  // Save order
  const orders = getOrders();
  orders.push(order);
  localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(orders));
  
  // Clear cart after order creation
  clearCart();
  
  return order;
};

// Get all orders
export const getOrders = (): Order[] => {
  const ordersStr = localStorage.getItem(ORDERS_STORAGE_KEY);
  return ordersStr ? JSON.parse(ordersStr) : [];
};

// Get order by ID
export const getOrderById = (orderId: string): Order | undefined => {
  const orders = getOrders();
  return orders.find(order => order.id === orderId);
};

// Update order status
export const updateOrderStatus = (orderId: string, status: Order['status']): boolean => {
  const orders = getOrders();
  const order = orders.find(o => o.id === orderId);
  
  if (!order) return false;
  
  order.status = status;
  if (status === 'paid') {
    order.paidAt = new Date().toISOString();
  }
  
  localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(orders));
  return true;
};

// Cancel order
export const cancelOrder = (orderId: string): boolean => {
  return updateOrderStatus(orderId, 'cancelled');
};

// Simulate payment (for demo purposes)
export const simulatePayment = (orderId: string, _method: 'wechat' | 'alipay'): Promise<boolean> => {
  return new Promise((resolve) => {
    // Simulate payment processing delay
    setTimeout(() => {
      const success = Math.random() > 0.1; // 90% success rate
      if (success) {
        updateOrderStatus(orderId, 'paid');
      }
      resolve(success);
    }, 2000);
  });
};

// Order manager object
export const orderManager = {
  createOrder,
  getOrders,
  getOrderById,
  updateOrderStatus,
  cancelOrder,
  simulatePayment,
};
