import React, { useState } from 'react';
import type { Order, OrderStatus } from '../../types';
import { updateOrderStatus } from '../../api/orders';
import OrderCard from './OrderCard';
import { motion, AnimatePresence } from 'framer-motion';
import { FiRefreshCcw, FiLoader } from 'react-icons/fi';
import { Button } from '../../components/ui/Button';

interface OrderListProps {
  orders: Order[];
  loading: boolean;
  onRefresh: () => void;
  lastUpdated: string;
  setOrders: React.Dispatch<React.SetStateAction<Order[]>>;
}

const OrderList: React.FC<OrderListProps> = ({ orders, loading, onRefresh, lastUpdated, setOrders }) => {
  const [updatingIds, setUpdatingIds] = useState<Set<string>>(new Set());
  const [searchQuery, setSearchQuery] = useState('');

  const handleUpdateStatus = async (orderId: string, status: OrderStatus) => {
    if (updatingIds.has(orderId)) return;
    
    setUpdatingIds(prev => new Set(prev).add(orderId));
    try {
      // Optimistic update - update the shared state in parent
      setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status } : o));
      
      await updateOrderStatus(orderId, status);
      // No need to fetch here, the parent will handle real-time or we already did optimistic update
    } catch (error) {
      console.error('Error updating status:', error);
      onRefresh(); // Revert on error
      alert('Gagal update status pesanan. Coba lagi bro!');
    } finally {
      setUpdatingIds(prev => {
        const next = new Set(prev);
        next.delete(orderId);
        return next;
      });
    }
  };

  const filteredOrders = (statusGroup: OrderStatus[], onlyToday = false) => {
    let filtered = orders.filter(order => statusGroup.includes(order.status));
    
    if (onlyToday) {
      // More robust 'today' check: orders from the last 18 hours or starting with today's UTC date
      const today = new Date().toISOString().split('T')[0];
      const eighteenHoursAgo = new Date(Date.now() - 18 * 60 * 60 * 1000);
      
      filtered = filtered.filter(o => 
        o.created_at.startsWith(today) || 
        new Date(o.created_at) > eighteenHoursAgo
      );
    }

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(order => 
        order.id.toLowerCase().includes(query) ||
        (order.profiles?.full_name || 'Guest').toLowerCase().includes(query) ||
        order.table_number?.toLowerCase().includes(query)
      );
    }

    return filtered;
  };

  const calculateStats = () => {
    const today = new Date().toISOString().split('T')[0];
    const todaysOrders = orders.filter(o => o.created_at.startsWith(today));
    const totalSales = todaysOrders.reduce((acc, curr) => acc + curr.total_amount, 0);
    const completedCount = todaysOrders.filter(o => o.status === 'completed').length;
    
    return {
      totalSales,
      completedCount,
      activeCount: orders.filter(o => ['processing', 'preparing', 'ready'].includes(o.status)).length,
      averageTicket: todaysOrders.length > 0 ? totalSales / todaysOrders.length : 0
    };
  };

  const stats = calculateStats();

  if (loading && orders.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] text-primary/40">
        <FiLoader className="w-8 h-8 animate-spin mb-4" />
        <p>Memuat data pesanan...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-20">
      {/* Header & Stats Dashboard */}
      <div className="flex flex-col gap-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h2 className="text-4xl font-black text-primary tracking-tight mb-1">Cashier Command Center</h2>
            <p className="text-primary/40 font-medium">Monitoring real-time operasional cafe</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="hidden lg:flex flex-col items-end mr-2">
              <span className="text-[10px] font-bold text-primary/20 uppercase">Real-time Data</span>
              <span className="text-[10px] font-bold text-green-500/60 uppercase">Last Sync: {lastUpdated}</span>
            </div>
            <div className="relative">
              <input 
                type="text" 
                placeholder="Cari pesanan, meja, atau nama..."
                className="pl-10 pr-4 py-2.5 bg-white/50 backdrop-blur-sm border border-primary/10 rounded-2xl text-sm focus:ring-2 focus:ring-primary/20 outline-none w-64 transition-all"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <svg className="w-4 h-4 absolute left-3.5 top-3.5 text-primary/30" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
            </div>
            <Button
              variant="outline"
              onClick={onRefresh}
              className="gap-2 border-primary/10 bg-white/50 backdrop-blur-sm hover:bg-primary/5 rounded-2xl h-[42px]"
              disabled={loading}
            >
              <FiRefreshCcw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
              Sync
            </Button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { label: 'Penjualan Hari Ini', value: `Rp ${stats.totalSales.toLocaleString()}`, color: 'primary' },
            { label: 'Pesanan Selesai', value: stats.completedCount, color: 'green-500' },
            { label: 'Antrean Aktif', value: stats.activeCount, color: 'accent' },
            { label: 'Rata-rata Struk', value: `Rp ${Math.round(stats.averageTicket).toLocaleString()}`, color: 'secondary' }
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white/80 backdrop-blur-md border border-primary/5 p-6 rounded-[2rem] shadow-sm flex flex-col gap-1"
            >
              <span className="text-[10px] font-bold uppercase tracking-widest text-primary/30">{item.label}</span>
              <span className={`text-2xl font-black text-primary`}>{item.value}</span>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Column 1: Processing & Preparing */}
        <div className="space-y-6">
          <div className="flex items-center justify-between px-2">
            <h3 className="font-black text-primary/40 uppercase tracking-widest text-[10px] flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
              Antrean Masuk
            </h3>
            <span className="text-[10px] font-bold bg-primary/5 text-primary/40 px-2 py-0.5 rounded-md">
              {filteredOrders(['processing', 'preparing']).length}
            </span>
          </div>
          <div className="space-y-6 custom-scrollbar max-h-[800px] overflow-y-auto pr-2">
            <AnimatePresence mode="popLayout">
              {filteredOrders(['processing', 'preparing']).map((order) => (
                <OrderCard 
                  key={order.id} 
                  order={order} 
                  onUpdateStatus={handleUpdateStatus}
                  isUpdating={updatingIds.has(order.id)}
                />
              ))}
            </AnimatePresence>
          </div>
        </div>

        {/* Column 2: Ready */}
        <div className="space-y-6">
          <div className="flex items-center justify-between px-2">
            <h3 className="font-black text-primary/40 uppercase tracking-widest text-[10px] flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
              Siap Disajikan
            </h3>
            <span className="text-[10px] font-bold bg-primary/5 text-primary/40 px-2 py-0.5 rounded-md">
              {filteredOrders(['ready']).length}
            </span>
          </div>
          <div className="space-y-6 custom-scrollbar max-h-[800px] overflow-y-auto pr-2">
            <AnimatePresence mode="popLayout">
              {filteredOrders(['ready']).map((order) => (
                <OrderCard 
                  key={order.id} 
                  order={order} 
                  onUpdateStatus={handleUpdateStatus}
                  isUpdating={updatingIds.has(order.id)}
                />
              ))}
            </AnimatePresence>
          </div>
        </div>

        {/* Column 3: Completed Today */}
        <div className="space-y-6 opacity-60 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-500">
          <div className="flex items-center justify-between px-2">
            <h3 className="font-black text-primary/40 uppercase tracking-widest text-[10px] flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-gray-400" />
              Selesai Hari Ini
            </h3>
            <span className="text-[10px] font-bold bg-primary/5 text-primary/40 px-2 py-0.5 rounded-md">
              {filteredOrders(['completed'], true).length}
            </span>
          </div>
          <div className="space-y-6 custom-scrollbar max-h-[800px] overflow-y-auto pr-2">
            <AnimatePresence mode="popLayout">
              {filteredOrders(['completed'], true).map((order) => (
                <OrderCard 
                  key={order.id} 
                  order={order} 
                  onUpdateStatus={handleUpdateStatus}
                  isUpdating={updatingIds.has(order.id)}
                />
              ))}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderList;
