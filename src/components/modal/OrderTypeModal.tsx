import React from 'react';
import { Card } from '../ui/Card';
import { Utensils, ShoppingBag, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface OrderTypeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (type: 'dine-in' | 'take-away') => void;
}

const OrderTypeModal: React.FC<OrderTypeModalProps> = ({ isOpen, onClose, onSelect }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-primary/40 backdrop-blur-md"
          />
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="relative w-full max-w-md"
          >
            <Card className="p-10 text-center space-y-8 border-4 border-white shadow-2xl">
              <button 
                onClick={onClose}
                className="absolute top-4 right-4 p-2 hover:bg-primary/5 rounded-full transition-colors"
              >
                <X size={20} className="text-primary/40" />
              </button>

              <div className="space-y-2">
                <h2 className="text-3xl font-black text-primary font-serif">Order Type</h2>
                <p className="text-primary/40">How would you like to enjoy your coffee?</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={() => onSelect('dine-in')}
                  className="group flex flex-col items-center gap-4 p-8 rounded-3xl border-2 border-primary/5 hover:border-secondary hover:bg-secondary/5 transition-all"
                >
                  <div className="p-4 bg-primary/5 rounded-2xl group-hover:bg-secondary/20 transition-colors">
                    <Utensils className="text-primary group-hover:text-secondary w-8 h-8" />
                  </div>
                  <span className="font-black text-primary">Dine In</span>
                </button>

                <button
                  onClick={() => onSelect('take-away')}
                  className="group flex flex-col items-center gap-4 p-8 rounded-3xl border-2 border-primary/5 hover:border-secondary hover:bg-secondary/5 transition-all"
                >
                  <div className="p-4 bg-primary/5 rounded-2xl group-hover:bg-secondary/20 transition-colors">
                    <ShoppingBag className="text-primary group-hover:text-secondary w-8 h-8" />
                  </div>
                  <span className="font-black text-primary">Take Away</span>
                </button>
              </div>
            </Card>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default OrderTypeModal;
