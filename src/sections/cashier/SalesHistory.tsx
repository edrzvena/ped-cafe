import React, { useState } from 'react';
import type { Order } from '../../types';
import { FiDownload, FiCalendar, FiDollarSign, FiSearch, FiArrowRight, FiUser, FiHash, FiCreditCard } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '../../components/ui/Button';

interface SalesHistoryProps {
  orders: Order[];
  loading: boolean;
}

const SalesHistory: React.FC<SalesHistoryProps> = ({ orders, loading }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [dateFilter, setDateFilter] = useState<'today' | 'all' | 'custom'>('today');
  const [customDate, setCustomDate] = useState(new Date().toISOString().split('T')[0]);

  const filteredOrders = orders
    .filter(o => o.status === 'completed')
    .filter(order => {
      const metadata = order.items?.find((item: any) => item.name === '_metadata') as any;
      const customerName = metadata?.customer_name || order.profiles?.full_name || 'Guest';
      const matchesSearch = 
        customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.id.toLowerCase().includes(searchQuery.toLowerCase());
      
      const orderDate = order.created_at.split('T')[0];
      
      if (dateFilter === 'today') {
        const today = new Date().toISOString().split('T')[0];
        return matchesSearch && orderDate === today;
      }

      if (dateFilter === 'custom') {
        return matchesSearch && orderDate === customDate;
      }
      
      return matchesSearch;
    });

  const totalRevenue = filteredOrders.reduce((acc, curr) => acc + curr.total_amount, 0);

  const exportToCSV = () => {
    if (filteredOrders.length === 0) return;

    // CSV Headers
    const headers = [
      'Order ID',
      'Date',
      'Time',
      'Customer Name',
      'Phone',
      'Email',
      'Table',
      'Type',
      'Payment',
      'Items',
      'Subtotal',
      'Tax',
      'Total'
    ];

    // CSV Rows
    const rows = filteredOrders.map(order => {
      const metadata = order.items?.find((item: any) => item.name === '_metadata') as any;
      const customerName = metadata?.customer_name || order.profiles?.full_name || 'Guest';
      const phone = metadata?.customer_phone || '-';
      const email = order.profiles?.email || '-';
      const table = order.table_number || metadata?.table_number || '-';
      const payment = order.payment_method || metadata?.payment_method || 'Cash';
      const items = order.items
        ?.filter((item: any) => item.name !== '_metadata')
        .map((item: any) => `${item.quantity}x ${item.name}`)
        .join('; ');
      
      const date = new Date(order.created_at);
      const tax = order.tax || metadata?.tax || 0;
      
      return [
        order.id.slice(0, 8).toUpperCase(),
        date.toLocaleDateString('id-ID'),
        date.toLocaleTimeString('id-ID'),
        customerName,
        phone,
        email,
        table,
        order.order_type || 'dine-in',
        payment,
        `"${items}"`,
        order.total_amount - tax,
        tax,
        order.total_amount
      ];
    });

    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `sales_report_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-8 pb-20">
      {/* Header & Controls */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
        <div>
          <h2 className="text-4xl font-black text-primary tracking-tight mb-2">Sales History</h2>
          <p className="text-primary/40 font-medium">Rekapitulasi seluruh transaksi yang telah selesai</p>
        </div>
        
        <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
          <div className="relative flex-1 lg:flex-none">
            <FiSearch className="absolute left-3.5 top-3.5 text-primary/30" />
            <input 
              type="text" 
              placeholder="Cari transaksi..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-3 bg-white border border-primary/5 rounded-2xl text-sm focus:ring-2 focus:ring-primary/20 outline-none w-full lg:w-64 shadow-sm"
            />
          </div>
          
          <div className="flex bg-white p-1 rounded-2xl border border-primary/5 shadow-sm">
            <button 
              onClick={() => setDateFilter('today')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${dateFilter === 'today' ? 'bg-primary text-white' : 'text-primary/40 hover:text-primary'}`}
            >
              Today
            </button>
            <button 
              onClick={() => setDateFilter('custom')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${dateFilter === 'custom' ? 'bg-primary text-white' : 'text-primary/40 hover:text-primary'}`}
            >
              Custom Date
            </button>
            <button 
              onClick={() => setDateFilter('all')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${dateFilter === 'all' ? 'bg-primary text-white' : 'text-primary/40 hover:text-primary'}`}
            >
              All Time
            </button>
          </div>

          {dateFilter === 'custom' && (
            <div className="relative animate-in fade-in slide-in-from-right-4 duration-300">
              <FiCalendar className="absolute left-3.5 top-3.5 text-primary/30" />
              <input 
                type="date" 
                value={customDate}
                onChange={(e) => setCustomDate(e.target.value)}
                className="pl-10 pr-4 py-3 bg-white border border-primary/5 rounded-2xl text-sm font-bold focus:ring-2 focus:ring-primary/20 outline-none shadow-sm"
              />
            </div>
          )}

          <Button 
            onClick={exportToCSV}
            className="gap-2 px-6 py-3 rounded-2xl h-[46px]"
          >
            <FiDownload /> Export CSV
          </Button>
        </div>
      </div>

      {/* Stats Dashboard */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Revenue', value: `Rp ${totalRevenue.toLocaleString()}`, color: 'primary', icon: <FiDollarSign /> },
          { label: 'Transactions', value: filteredOrders.length, color: 'secondary', icon: <FiCalendar /> },
          { label: 'Avg Ticket', value: `Rp ${filteredOrders.length ? Math.round(totalRevenue / filteredOrders.length).toLocaleString() : 0}`, color: 'accent', icon: <FiArrowRight /> },
          { label: 'Filter Active', value: dateFilter.toUpperCase(), color: 'green-500', icon: <FiCalendar /> }
        ].map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white/80 backdrop-blur-md border border-primary/5 p-6 rounded-[2rem] shadow-sm flex flex-col gap-1"
          >
            <div className="flex items-center gap-2 text-primary/30 mb-1">
              <span className="p-1.5 bg-primary/5 rounded-lg">{item.icon}</span>
              <span className="text-[10px] font-bold uppercase tracking-widest">{item.label}</span>
            </div>
            <span className="text-2xl font-black text-primary">{item.value}</span>
          </motion.div>
        ))}
      </div>

      {/* Data Table */}
      <div className="bg-white rounded-[2.5rem] border border-primary/5 overflow-hidden shadow-xl shadow-primary/[0.02]">
        <div className="overflow-x-auto custom-scrollbar">
          <table className="w-full text-left border-collapse min-w-[1000px]">
            <thead>
              <tr className="bg-primary/[0.02] text-primary/40 text-[10px] font-black uppercase tracking-widest border-b border-primary/5">
                <th className="px-8 py-6">Order Details</th>
                <th className="px-8 py-6">Customer</th>
                <th className="px-8 py-6">Contact</th>
                <th className="px-8 py-6">Payment & Type</th>
                <th className="px-8 py-6">Items Summary</th>
                <th className="px-8 py-6 text-right">Total Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-primary/5">
              {loading && orders.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-8 py-20 text-center">
                    <div className="flex flex-col items-center gap-4 text-primary/20">
                      <div className="w-8 h-8 border-4 border-current border-t-transparent rounded-full animate-spin" />
                      <span className="font-bold uppercase tracking-widest text-xs">Loading Data...</span>
                    </div>
                  </td>
                </tr>
              ) : filteredOrders.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-8 py-20 text-center">
                    <p className="text-primary/20 font-black uppercase tracking-widest">Tidak ada transaksi ditemukan</p>
                  </td>
                </tr>
              ) : (
                <AnimatePresence>
                  {filteredOrders.map((order, i) => {
                    const metadata = order.items?.find((item: any) => item.name === '_metadata') as any;
                    const customerName = metadata?.customer_name || order.profiles?.full_name || 'Guest';
                    const phone = metadata?.customer_phone || '-';
                    const email = order.profiles?.email || '-';
                    const payment = order.payment_method || metadata?.payment_method || 'Cash';
                    const tableNum = order.table_number || metadata?.table_number || '-';
                    
                    return (
                      <motion.tr 
                        key={order.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="hover:bg-primary/[0.01] transition-colors"
                      >
                        <td className="px-8 py-6">
                          <div className="flex flex-col">
                            <span className="font-mono text-xs font-bold text-primary/60">#{order.id.slice(0, 8).toUpperCase()}</span>
                            <span className="text-[10px] text-primary/30 mt-1">
                              {new Date(order.created_at).toLocaleString('id-ID', { dateStyle: 'medium', timeStyle: 'short' })}
                            </span>
                          </div>
                        </td>
                        <td className="px-8 py-6">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-secondary/10 flex items-center justify-center text-secondary">
                              <FiUser size={14} />
                            </div>
                            <span className="font-black text-primary text-sm">{customerName}</span>
                          </div>
                        </td>
                        <td className="px-8 py-6">
                          <div className="flex flex-col gap-1">
                            <span className="text-xs font-bold text-primary/60">{phone}</span>
                            <span className="text-[10px] text-primary/30">{email}</span>
                          </div>
                        </td>
                        <td className="px-8 py-6">
                          <div className="flex flex-col gap-1">
                            <div className="flex items-center gap-2 text-xs font-black text-primary/70">
                              <FiCreditCard className="text-primary/20" />
                              {payment}
                            </div>
                            <div className="flex items-center gap-2 text-[10px] font-bold text-primary/40 uppercase tracking-widest">
                              <FiHash className="text-primary/10" />
                              {order.order_type || 'dine-in'} {tableNum !== '-' && `• Meja ${tableNum}`}
                            </div>
                          </div>
                        </td>
                        <td className="px-8 py-6">
                          <div className="max-w-[200px]">
                            <p className="text-xs text-primary/60 truncate">
                              {order.items
                                ?.filter((item: any) => item.name !== '_metadata')
                                .map((item: any) => `${item.quantity}x ${item.name}`)
                                .join(', ') || '-'}
                            </p>
                            <span className="text-[10px] text-primary/30 italic">
                              {order.items?.filter((item: any) => item.name !== '_metadata').length} items
                            </span>
                          </div>
                        </td>
                        <td className="px-8 py-6 text-right">
                          <span className="text-lg font-black text-primary">Rp {order.total_amount.toLocaleString()}</span>
                        </td>
                      </motion.tr>
                    );
                  })}
                </AnimatePresence>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SalesHistory;
