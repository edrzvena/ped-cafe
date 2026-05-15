import React from 'react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import CartList from '../sections/cart/CartList';
import CheckoutSummary from '../sections/cart/CheckoutSummary';
import CheckoutModal from '../components/modal/CheckoutModal';
import { motion } from 'framer-motion';
import { useCart } from '../lib/CartContext';

const Cart: React.FC = () => {
  const [isCheckoutOpen, setIsCheckoutOpen] = React.useState(false);
  const { clearCart } = useCart();
  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-background"
    >
      <Navbar />

      <div className="pt-24 md:pt-40 pb-12 md:pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-black text-primary mb-8 md:mb-12">My Cart</h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-12">
            <div className="lg:col-span-2">
              <CartList />
            </div>
            <div>
              <CheckoutSummary onCheckout={() => setIsCheckoutOpen(true)} />
            </div>
          </div>
        </div>
      </div>

      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        onSuccess={clearCart}
      />
      <Footer />
    </motion.main>
  );
};

export default Cart;
