import React from 'react';
import type { Order, OrderStatus } from '../../types';
import { motion } from 'framer-motion';
import { FiClock, FiPackage, FiMapPin, FiCreditCard, FiLoader } from 'react-icons/fi';

interface OrderCardProps {
  order: Order;
  onUpdateStatus: (orderId: string, status: OrderStatus) => void;
  isUpdating?: boolean;
}

const OrderCard: React.FC<OrderCardProps> = ({ order, onUpdateStatus, isUpdating }) => {
  const metadata = order.items?.find((item: any) => item.name === '_metadata') as any;
  const displayItems = order.items?.filter((item: any) => item.name !== '_metadata' && item.name !== 'Note') || [];

  const orderType = order.order_type || metadata?.order_type || 'dine-in';
  const tableNumber = order.table_number || metadata?.table_number || '-';
  const paymentMethod = order.payment_method || metadata?.payment_method || 'Cash';
  const taxAmount = order.tax || metadata?.tax || 0;

  // Format time better
  const orderTime = new Date(order.created_at).toLocaleTimeString('id-ID', {
    hour: '2-digit',
    minute: '2-digit'
  });

  const getStatusConfig = (status: OrderStatus) => {
    switch (status) {
      case 'processing': return { color: 'bg-blue-500', text: 'text-blue-500', bg: 'bg-blue-100', label: 'Baru' };
      case 'preparing': return { color: 'bg-orange-500', text: 'text-orange-500', bg: 'bg-orange-100', label: 'Proses' };
      case 'ready': return { color: 'bg-green-500', text: 'text-green-500', bg: 'bg-green-100', label: 'Ready' };
      case 'completed': return { color: 'bg-gray-400', text: 'text-gray-400', bg: 'bg-gray-100', label: 'Selesai' };
      default: return { color: 'bg-gray-500', text: 'text-gray-500', bg: 'bg-gray-100', label: status };
    }
  };

  const config = getStatusConfig(order.status);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="group"
    >
      <div className="bg-white rounded-[2rem] border border-primary/5 p-1 shadow-sm group-hover:shadow-xl group-hover:shadow-primary/5 transition-all duration-500 overflow-hidden relative">
        {/* Status indicator pill */}
        <div className={`absolute top-4 right-4 px-3 py-1 rounded-full ${config.bg} ${config.text} text-[10px] font-black uppercase tracking-wider z-10 shadow-sm`}>
          {config.label}
        </div>

        <div className="p-5 pt-7">
          <div className="flex items-start gap-4 mb-6">
            <div className="w-14 h-14 rounded-2xl bg-primary flex flex-col items-center justify-center text-white shadow-lg shadow-primary/20">
              <span className="text-[10px] font-bold opacity-60 uppercase tracking-tighter leading-none mb-1">Time</span>
              <span className="text-sm font-black leading-none">{orderTime}</span>
            </div>
            <div>
              <h4 className="font-black text-primary text-xl leading-tight">
                {metadata?.customer_name || order.profiles?.full_name || 'Guest'}
              </h4>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-[10px] font-bold text-primary/40 uppercase tracking-widest flex items-center gap-1">
                  ID: {order.id.slice(0, 8).toUpperCase()}
                </span>
                <div className="w-1 h-1 rounded-full bg-primary/10" />
                {orderType === 'take-away' ? (
                  <span className="flex items-center gap-1 text-[10px] font-bold text-orange-500 uppercase tracking-widest bg-orange-50 px-2 py-0.5 rounded-md">
                    <FiPackage className="w-3 h-3" /> Take Away
                  </span>
                ) : (
                  <span className="flex items-center gap-1 text-[10px] font-bold text-blue-500 uppercase tracking-widest bg-blue-50 px-2 py-0.5 rounded-md">
                    <FiMapPin className="w-3 h-3" /> Table {tableNumber}
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="space-y-3 mb-6 bg-primary/[0.02] p-4 rounded-2xl">
            {displayItems.map((item, idx) => (
              <div key={idx} className="flex justify-between items-center group/item">
                <div className="flex items-center gap-3">
                  <span className="w-6 h-6 rounded-lg bg-primary text-white flex items-center justify-center text-[10px] font-black">
                    {item.quantity}
                  </span>
                  <span className="text-sm font-bold text-primary/80">
                    {item.name}
                  </span>
                </div>
                <span className="text-xs font-mono text-primary/30">
                  Rp {(item.price * item.quantity).toLocaleString()}
                </span>
              </div>
            ))}
          </div>

          <div className="px-1 space-y-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2 text-[10px] font-bold text-primary/30 uppercase tracking-widest">
                <FiCreditCard className="w-3.5 h-3.5 text-primary/20" />
                <span>{paymentMethod}</span>
              </div>
              <div className="text-[10px] font-bold text-primary/30 uppercase tracking-widest">
                Tax: Rp {taxAmount.toLocaleString()}
              </div>
            </div>

            <div className="flex justify-between items-end border-t border-primary/5 pt-4">
              <div className="text-[10px] text-primary/40 font-black uppercase tracking-tighter">Grand Total</div>
              <div className="text-2xl font-black text-primary tracking-tight leading-none">
                Rp {order.total_amount?.toLocaleString()}
              </div>
            </div>
          </div>
        </div>

        <div className="p-3 bg-primary/[0.02] flex gap-2">
          {order.status === 'processing' && (
            <button
              className="flex-1 bg-blue-500 hover:bg-blue-600 text-white font-black py-4 rounded-2xl transition-all shadow-lg shadow-blue-500/20 active:scale-95 flex items-center justify-center gap-2 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={() => onUpdateStatus(order.id, 'preparing')}
              disabled={isUpdating}
            >
              {isUpdating ? <FiLoader className="animate-spin" /> : 'Start Preparing'}
            </button>
          )}
          {order.status === 'preparing' && (
            <button
              className="flex-1 bg-orange-500 hover:bg-orange-600 text-white font-black py-4 rounded-2xl transition-all shadow-lg shadow-orange-500/20 active:scale-95 flex items-center justify-center gap-2 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={() => onUpdateStatus(order.id, 'ready')}
              disabled={isUpdating}
            >
              {isUpdating ? <FiLoader className="animate-spin" /> : 'Ready to Serve'}
            </button>
          )}
          {order.status === 'ready' && (
            <button
              className="flex-1 bg-green-500 hover:bg-green-600 text-white font-black py-4 rounded-2xl transition-all shadow-lg shadow-green-500/20 active:scale-95 flex items-center justify-center gap-2 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={() => onUpdateStatus(order.id, 'completed')}
              disabled={isUpdating}
            >
              {isUpdating ? <FiLoader className="animate-spin" /> : 'Mark Completed'}
            </button>
          )}
          <button className="w-14 h-14 rounded-2xl bg-white border border-primary/10 flex items-center justify-center text-primary/30 hover:text-primary hover:border-primary transition-all shadow-sm">
            <FiClock className="w-5 h-5" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default OrderCard;
