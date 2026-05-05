import React from 'react';
import { useCart } from '../../lib/CartContext';
import CartItem from './CartItem';
import { AnimatePresence } from 'framer-motion';
import { ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '../../components/ui/Button';

const CartList: React.FC = () => {
  const { cart } = useCart();

  if (cart.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center space-y-6">
        <div className="bg-primary/5 p-10 rounded-full text-primary/20">
          <ShoppingBag size={80} />
        </div>
        <div className="space-y-2">
          <h2 className="text-3xl font-black text-primary">Your cart is empty</h2>
          <p className="text-primary/50">Looks like you haven't added any coffee yet.</p>
        </div>
        <Link to="/menu">
          <Button>Browse Menu</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <AnimatePresence mode="popLayout">
        {cart.map((item) => (
          <CartItem key={item.id} item={item} />
        ))}
      </AnimatePresence>
    </div>
  );
};

export default CartList;
