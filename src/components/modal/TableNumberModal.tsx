import React from 'react';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Coffee } from 'lucide-react';

interface TableNumberModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (tableNumber: string, guestName?: string) => void;
  isGuest?: boolean;
}

const TableNumberModal: React.FC<TableNumberModalProps> = ({ isOpen, onClose, onSubmit, isGuest }) => {
  const [tableNumber, setTableNumber] = React.useState('');
  const [guestName, setGuestName] = React.useState('');

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={isGuest ? "Complete Your Order" : "Table Number"}>
      <div className="space-y-6">
        <div className="bg-secondary/10 p-6 rounded-3xl flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-secondary/20 flex items-center justify-center flex-shrink-0">
            <Coffee className="text-secondary w-6 h-6" />
          </div>
          <p className="text-sm text-primary/60 font-medium leading-relaxed">
            {isGuest 
              ? "Tell us who you are and where you're sitting so we can bring your order!" 
              : "Please enter your table number to help our barista deliver your coffee correctly."}
          </p>
        </div>
        
        {isGuest && (
          <Input 
            label="Your Name" 
            placeholder="e.g. Pedro" 
            value={guestName}
            onChange={(e) => setGuestName(e.target.value)}
          />
        )}

        <Input 
          label="Table Number" 
          placeholder="e.g. 12" 
          type="number"
          value={tableNumber}
          onChange={(e) => setTableNumber(e.target.value)}
        />

        <Button 
          className="w-full py-4 rounded-2xl font-black tracking-widest shadow-lg shadow-primary/10" 
          disabled={!tableNumber || (isGuest && !guestName)}
          onClick={() => onSubmit(tableNumber, guestName)}
        >
          CONTINUE TO PAYMENT
        </Button>
      </div>
    </Modal>
  );
};

export default TableNumberModal;
