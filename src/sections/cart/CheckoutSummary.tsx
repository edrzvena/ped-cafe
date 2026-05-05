import React from 'react';
import { useCart } from '../../lib/CartContext';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { ShoppingBag } from 'lucide-react';

interface CheckoutSummaryProps {
  onCheckout: () => void;
}

const CheckoutSummary: React.FC<CheckoutSummaryProps> = ({ onCheckout }) => {
  const { totalPrice, totalItems } = useCart();
  const tax = totalPrice * 0.1;
  const grandTotal = totalPrice + tax;

  return (
    <Card className="p-8 sticky top-32">
      <h3 className="text-2xl font-bold text-primary mb-8 flex items-center gap-2">
        <ShoppingBag className="text-secondary" /> Summary
      </h3>
      
      <div className="space-y-4 mb-8">
        <div className="flex justify-between text-primary/60">
          <span>Subtotal ({totalItems} items)</span>
          <span>Rp {(totalPrice).toLocaleString()}</span>
        </div>
        <div className="flex justify-between text-primary/60">
          <span>Tax (10%)</span>
          <span>Rp {(tax).toLocaleString()}</span>
        </div>
        <hr className="border-primary/5" />
        <div className="flex justify-between text-xl font-black text-primary">
          <span>Total</span>
          <span className="text-secondary">Rp {(grandTotal).toLocaleString()}</span>
        </div>
      </div>

      <Button 
        className="w-full py-4 text-lg" 
        size="lg" 
        disabled={totalItems === 0}
        onClick={onCheckout}
      >
        Proceed to Checkout
      </Button>
      
      <p className="text-center text-[10px] text-primary/40 mt-4 uppercase tracking-widest font-bold">
        Secure checkout powered by Ped's Pay
      </p>
    </Card>
  );
};

export default CheckoutSummary;
