import React from 'react';
import type { MenuItem } from '../../types';
import { useCart } from '../../lib/CartContext';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { motion } from 'framer-motion';
import DeleteConfirmModal from '../../components/modal/DeleteConfirmModal';

interface CartItemProps {
  item: MenuItem & { quantity: number };
}

const CartItem: React.FC<CartItemProps> = ({ item }) => {
  const { updateQuantity, removeFromCart } = useCart();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = React.useState(false);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      className="flex items-center gap-6 p-4 bg-white rounded-3xl border border-primary/5 shadow-sm"
    >
      <div className="w-24 h-24 rounded-2xl overflow-hidden flex-shrink-0">
        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
      </div>
      
      <div className="flex-grow">
        <h3 className="font-bold text-primary">{item.name}</h3>
        <p className="text-secondary font-black text-sm">Rp {(item.price / 1000).toFixed(0)}k</p>
      </div>

      <div className="flex items-center gap-4 bg-accent/50 p-2 rounded-2xl">
        <button
          onClick={() => updateQuantity(item.id, -1)}
          className="p-1 hover:text-secondary transition-colors"
        >
          <Minus className="w-4 h-4" />
        </button>
        <span className="font-bold text-primary w-4 text-center">{item.quantity}</span>
        <button
          onClick={() => updateQuantity(item.id, 1)}
          className="p-1 hover:text-secondary transition-colors"
        >
          <Plus className="w-4 h-4" />
        </button>
      </div>

      <button
        onClick={() => setIsDeleteModalOpen(true)}
        className="p-3 text-primary/20 hover:text-red-500 hover:bg-red-50 rounded-2xl transition-all"
      >
        <Trash2 className="w-5 h-5" />
      </button>

      <DeleteConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={() => {
          removeFromCart(item.id);
          setIsDeleteModalOpen(false);
        }}
        itemName={item.name}
      />
    </motion.div>
  );
};

export default CartItem;
