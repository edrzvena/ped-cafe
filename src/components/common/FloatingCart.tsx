import React from 'react';
import { ShoppingBag } from 'lucide-react';
import { useCart } from '../../lib/CartContext';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';

const FloatingCart: React.FC = () => {
  const { totalItems } = useCart();
  const navigate = useNavigate();
  const location = useLocation();

  // Don't show the floating cart on the cart page itself
  // or on administrative pages like admin and cashier
  const hideOnPaths = ['/cart', '/admin', '/cashier', '/auth', '/reset-password'];
  const shouldHide = hideOnPaths.some(path => location.pathname.startsWith(path));

  if (shouldHide) return null;

  return (
    <AnimatePresence>
      {totalItems > 0 && (
        <motion.button
          initial={{ scale: 0, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0, opacity: 0, y: 20 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => navigate('/cart')}
          className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-primary text-white shadow-2xl md:bottom-8 md:right-8 md:h-16 md:w-16 transition-colors hover:bg-primary-light"
          aria-label="View Cart"
        >
          <ShoppingBag className="h-6 w-6 md:h-7 md:w-7" />
          
          <AnimatePresence mode="popLayout">
            <motion.span
              key={totalItems}
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="absolute -top-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full bg-secondary text-[10px] font-bold text-primary shadow-sm md:h-7 md:w-7 md:text-xs border-2 border-background"
            >
              {totalItems}
            </motion.span>
          </AnimatePresence>
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default FloatingCart;
