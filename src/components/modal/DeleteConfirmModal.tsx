import React from 'react';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { Trash2 } from 'lucide-react';

interface DeleteConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  itemName: string;
}

const DeleteConfirmModal: React.FC<DeleteConfirmModalProps> = ({ isOpen, onClose, onConfirm, itemName }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Remove Item">
      <div className="space-y-8">
        <div className="flex items-center gap-6 p-6 bg-red-50 rounded-3xl">
          <div className="bg-red-500 p-3 rounded-2xl text-white">
            <Trash2 />
          </div>
          <p className="text-sm text-red-900 font-medium">
            Are you sure you want to remove <span className="font-bold">{itemName}</span> from your cart?
          </p>
        </div>

        <div className="flex gap-4">
          <Button variant="outline" className="flex-1" onClick={onClose}>
            Cancel
          </Button>
          <Button className="flex-1 bg-red-500 hover:bg-red-600 border-red-500" onClick={onConfirm}>
            Remove
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default DeleteConfirmModal;
