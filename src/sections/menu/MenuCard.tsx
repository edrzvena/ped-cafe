import React from 'react';
import type { MenuItem } from '../../types';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Star, Plus } from 'lucide-react';
import { motion } from 'framer-motion';
import { useCart } from '../../lib/CartContext';
import { useAuth } from '../../lib/AuthContext';
import { useNavigate } from 'react-router-dom';

interface MenuCardProps {
  item: MenuItem;
}

const MenuCard: React.FC<MenuCardProps> = ({ item }) => {
  const { addToCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleAddToCart = () => {
    if (!user) {
      alert('Login dulu yuk biar bisa pesen kopi favorit lo!');
      navigate('/auth');
      return;
    }
    addToCart(item);
  };

  return (
    <Card className="p-0 overflow-hidden group h-full flex flex-col">
      <div className="relative h-48 overflow-hidden">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />
        {item.isPopular && (
          <Badge variant="secondary" className="absolute top-4 left-4 shadow-lg">
            Popular
          </Badge>
        )}
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-lg flex items-center gap-1 shadow-sm">
          <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
          <span className="text-xs font-bold text-primary">{item.rating}</span>
        </div>
      </div>

      <div className="p-6 flex flex-col flex-1">
        <div className="flex-1 space-y-4">
          <div className="flex justify-between items-start">
            <h3 className="text-lg font-bold text-primary line-clamp-1">
              {item.name}
            </h3>
            <span className="text-secondary font-black whitespace-nowrap">
              Rp {(item.price / 1000).toFixed(0)}k
            </span>
          </div>

          <p className="text-primary/50 text-xs line-clamp-2 leading-relaxed">
            {item.description}
          </p>
        </div>

        <div className="flex items-center justify-between pt-2 mt-auto">
          <Badge variant="accent" className="capitalize text-[10px]">
            {item.category}
          </Badge>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleAddToCart}
            className="bg-primary text-accent p-2 rounded-xl shadow-lg shadow-primary/20 hover:bg-secondary hover:text-primary transition-colors"
          >
            <Plus className="w-5 h-5" />
          </motion.button>
        </div>
      </div>
    </Card>
  );
};

export default MenuCard;
