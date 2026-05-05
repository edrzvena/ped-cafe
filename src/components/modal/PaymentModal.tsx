import React from 'react';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { CreditCard, Wallet, Smartphone } from 'lucide-react';
import { cn } from '../../lib/utils';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectPayment: (method: string) => void;
}

const PaymentModal: React.FC<PaymentModalProps> = ({ isOpen, onClose, onSelectPayment }) => {
  const [selected, setSelected] = React.useState('card');

  const methods = [
    { id: 'card', name: 'Credit Card', icon: <CreditCard /> },
    { id: 'e-wallet', name: 'E-Wallet', icon: <Smartphone /> },
    { id: 'cashier', name: 'Pay at Cashier', icon: <Wallet /> },
  ];

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Payment Method">
      <div className="space-y-6">
        <div className="grid gap-4">
          {methods.map((method) => (
            <button
              key={method.id}
              onClick={() => setSelected(method.id)}
              className={cn(
                "flex items-center gap-4 p-5 rounded-2xl border-2 transition-all duration-300",
                selected === method.id 
                  ? "border-secondary bg-secondary/5" 
                  : "border-primary/5 hover:border-primary/10"
              )}
            >
              <div className={cn(
                "p-3 rounded-xl",
                selected === method.id ? "bg-secondary text-primary" : "bg-primary/5 text-primary/40"
              )}>
                {method.icon}
              </div>
              <span className="font-bold text-primary">{method.name}</span>
            </button>
          ))}
        </div>

        <Button className="w-full py-4" onClick={() => onSelectPayment(selected)}>
          Complete Payment
        </Button>
      </div>
    </Modal>
  );
};

export default PaymentModal;
