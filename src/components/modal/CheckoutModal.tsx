import React, { useState } from 'react';
import TableNumberModal from './TableNumberModal';
import PaymentModal from './PaymentModal';
import SuccessModal from './SuccessModal';
import OrderTypeModal from './OrderTypeModal';
import { useAuth } from '../../lib/AuthContext';
import { useCart } from '../../lib/CartContext';
import { createOrder } from '../../api/orders';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const CheckoutModal: React.FC<CheckoutModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const [step, setStep] = useState(0); // Start at 0 for Order Type
  const [orderType, setOrderType] = useState<'dine-in' | 'take-away' | null>(null);
  const [table, setTable] = useState('');
  const [orderNumber, setOrderNumber] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [guestName, setGuestName] = useState('');
  const { user } = useAuth();
  const { cart, totalPrice } = useCart();

  const handleOrderTypeSelect = (type: 'dine-in' | 'take-away') => {
    setOrderType(type);
    if (type === 'dine-in') {
      setStep(1); // Go to table selection
    } else {
      setTable('Take Away');
      if (!user) {
        setStep(1); // For guests, we still need their name even for take-away
      } else {
        setStep(2); // Logged in, skip to payment
      }
    }
  };

  const handleTableSubmit = (num: string, name?: string) => {
    if (orderType === 'dine-in') {
      setTable(`Table #${num}`);
    }
    if (name) setGuestName(name);
    setStep(2);
  };

  const handlePaymentSelect = async (_method: string) => {
    setLoading(true);
    try {
      const taxAmount = totalPrice * 0.1;
      // If no user, we might use a null ID or a placeholder. 
      // Supabase usually requires a UUID for foreign keys, but if it's nullable, null works.
      const data = await createOrder(
        user?.id || '00000000-0000-0000-0000-000000000000', // Placeholder UUID if NULL is not allowed
        totalPrice + taxAmount, 
        cart, 
        orderType || 'dine-in', 
        table.replace('Table #', ''), 
        _method,
        taxAmount,
        {
          customer_name: user ? (user.user_metadata?.full_name || user.email) : guestName,
          customer_phone: user?.user_metadata?.phone || ''
        }
      );
      
      if (data && data[0]) {
        setOrderNumber(data[0].order_number);
      }
      setStep(3);
    } catch (err: any) {
      alert('Order failed: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCloseSuccess = () => {
    setStep(0);
    onSuccess();
    onClose();
  };

  return (
    <>
      <OrderTypeModal
        isOpen={isOpen && step === 0}
        onClose={onClose}
        onSelect={handleOrderTypeSelect}
      />
      <TableNumberModal 
        isOpen={isOpen && step === 1} 
        onClose={() => setStep(0)} 
        onSubmit={handleTableSubmit} 
        isGuest={!user}
      />
      <PaymentModal 
        isOpen={isOpen && step === 2} 
        onClose={() => orderType === 'dine-in' ? setStep(1) : setStep(0)} 
        onSelectPayment={handlePaymentSelect} 
      />
      {loading && (
        <div className="fixed inset-0 z-[110] bg-primary/20 backdrop-blur-sm flex items-center justify-center">
          <div className="bg-white p-6 rounded-3xl shadow-xl flex items-center gap-4">
            <div className="w-6 h-6 border-4 border-secondary border-t-transparent rounded-full animate-spin" />
            <span className="font-bold text-primary">Processing Order...</span>
          </div>
        </div>
      )}
      <SuccessModal 
        isOpen={isOpen && step === 3} 
        onClose={handleCloseSuccess} 
        orderType={orderType}
        table={table}
        orderNumber={orderNumber}
      />
    </>
  );
};

export default CheckoutModal;
