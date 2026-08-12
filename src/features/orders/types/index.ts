export type OrderStatus = 'confirmed' | 'preparing' | 'out_for_delivery' | 'delivered';

export interface Order {
  id: string;
  orderNumber: string;
  status: OrderStatus;
  placedAt: string;
  estimatedDelivery: string;
  items: OrderItem[];
  total: number;
  deliveryAddress: string;
  paymentMethod: string;
}

export interface OrderItem {
  name: string;
  quantity: number;
  size: string;
  price: number;
}
