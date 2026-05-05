export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: 'coffee' | 'non-coffee' | 'food' | 'dessert';
  image: string;
  rating: number;
  isPopular?: boolean;
}

export const menuData: MenuItem[] = [
  {
    id: '1',
    name: 'Vanilla Latte',
    description: 'Espresso with steamed milk and premium vanilla syrup.',
    price: 35000,
    category: 'coffee',
    image: 'https://images.unsplash.com/photo-1544787210-2211d4d62635?auto=format&fit=crop&q=80&w=400',
    rating: 4.8,
    isPopular: true,
  },
  {
    id: '2',
    name: 'Caramel Macchiato',
    description: 'Freshly steamed milk with vanilla-flavored syrup marked with espresso.',
    price: 38000,
    category: 'coffee',
    image: 'https://images.unsplash.com/photo-1485808191679-5f86510681a2?auto=format&fit=crop&q=80&w=400',
    rating: 4.9,
    isPopular: true,
  },
  {
    id: '3',
    name: 'Matcha Green Tea',
    description: 'Smooth and creamy matcha sweetened just right and served with milk.',
    price: 32000,
    category: 'non-coffee',
    image: 'https://images.unsplash.com/photo-1515823064-d6e0c04616a7?auto=format&fit=crop&q=80&w=400',
    rating: 4.7,
  },
  {
    id: '4',
    name: 'Avocado Toast',
    description: 'Smashed avocado on sourdough bread with cherry tomatoes.',
    price: 45000,
    category: 'food',
    image: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&q=80&w=400',
    rating: 4.6,
  },
  {
    id: '5',
    name: 'Chocolate Croissant',
    description: 'Buttery, flaky pastry filled with rich dark chocolate.',
    price: 28000,
    category: 'dessert',
    image: 'https://images.unsplash.com/photo-1530610476181-d83430b64dcd?auto=format&fit=crop&q=80&w=400',
    rating: 4.9,
    isPopular: true,
  },
  {
    id: '6',
    name: 'Cold Brew Coffee',
    description: 'Slow-steeped in cool water for 20 hours for a super smooth taste.',
    price: 30000,
    category: 'coffee',
    image: 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&q=80&w=400',
    rating: 4.5,
  }
];
