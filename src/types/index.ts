export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: 'coffee' | 'non-coffee' | 'food' | 'dessert' | string;
  image: string;
  rating: number;
  isPopular?: boolean;
}
