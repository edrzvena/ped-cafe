import React from 'react';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { CheckCircle2, Coffee } from 'lucide-react';
import { motion } from 'framer-motion';

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  orderType: 'dine-in' | 'take-away' | null;
  table: string;
  orderNumber: number | null;
}

const SuccessModal: React.FC<SuccessModalProps> = ({ isOpen, onClose, orderType, table, orderNumber }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="text-center space-y-8 py-4">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", damping: 12 }}
          className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center mx-auto shadow-2xl shadow-green-500/20"
        >
          <CheckCircle2 className="w-12 h-12 text-white" />
        </motion.div>

        <div className="space-y-2">
          <h2 className="text-3xl font-black text-primary">Order Successful!</h2>
          <p className="text-primary/50">
            {orderType === 'dine-in' 
              ? 'Your order has been received. Please wait at your table while our barista prepares your perfect cup.' 
              : 'Your order has been received. Please head to the pickup counter to collect your coffee once it is ready.'}
          </p>
        </div>

        <div className="bg-accent/50 p-6 rounded-3xl flex flex-col items-center justify-center gap-2">
          <div className="flex items-center gap-3">
            <Coffee className="text-secondary" />
            <span className="font-bold text-primary">
              {orderType === 'dine-in' ? table : 'Take Away Order'}
            </span>
          </div>
          <p className="text-xs font-black text-primary/40 uppercase tracking-widest">
            Queue Number: <span className="text-primary text-base ml-1">#{orderNumber || '...'}</span>
          </p>
        </div>

        <Button className="w-full py-4" onClick={onClose}>
          {orderType === 'dine-in' ? 'Check Order Status' : 'Go to Pickup Counter'}
        </Button>
      </div>
    </Modal>
  );
};

export default SuccessModal;
