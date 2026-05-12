export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: 'coffee' | 'non-coffee' | 'food' | 'dessert' | string;
  image: string;
  rating: number;
  isPopular?: boolean;
  is_available?: boolean;
}

export type OrderStatus = 'processing' | 'preparing' | 'ready' | 'completed' | 'cancelled';

export interface OrderItem extends MenuItem {
  quantity: number;
}

export interface Order {
  id: string;
  user_id: string;
  items: OrderItem[];
  total_amount: number;
  tax: number;
  status: OrderStatus;
  payment_method: string;
  order_type: 'dine-in' | 'take-away';
  table_number?: string;
  created_at: string;
  profiles?: {
    full_name: string;
    email: string;
  };
}
