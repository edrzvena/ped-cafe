import React from 'react';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Coffee } from 'lucide-react';

interface TableNumberModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (tableNumber: string) => void;
}

const TableNumberModal: React.FC<TableNumberModalProps> = ({ isOpen, onClose, onSubmit }) => {
  const [tableNumber, setTableNumber] = React.useState('');

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Table Number">
      <div className="space-y-6">
        <div className="bg-secondary/10 p-6 rounded-3xl flex items-center gap-4">
          <Coffee className="text-secondary w-10 h-10" />
          <p className="text-sm text-primary/60">
            Please enter your table number to help our barista deliver your coffee correctly.
          </p>
        </div>
        
        <Input 
          label="Table Number" 
          placeholder="e.g. 12" 
          type="number"
          value={tableNumber}
          onChange={(e) => setTableNumber(e.target.value)}
        />

        <Button 
          className="w-full py-4" 
          disabled={!tableNumber}
          onClick={() => onSubmit(tableNumber)}
        >
          Continue to Payment
        </Button>
      </div>
    </Modal>
  );
};

export default TableNumberModal;
