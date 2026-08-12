export type OrderStatus =
  | 'confirmed'
  | 'preparing'
  | 'ready'
  | 'picked_up'
  | 'on_the_way'
  | 'arriving'
  | 'delivered'
  | 'cancelled'
  | 'refunded';

export interface OrderItem {
  id?: string;
  productId?: string;
  name: string;
  image?: string;
  quantity: number;
  size: string;
  price: number;
  addOns?: string[];
  customizations?: string[];
}
