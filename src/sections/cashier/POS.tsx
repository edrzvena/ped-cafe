import React, { useState, useEffect } from 'react';
import { createOrder } from '../../api/orders';
import type { MenuItem } from '../../types';
import { motion, AnimatePresence } from 'framer-motion';
import { FiSearch, FiPlus, FiMinus, FiTrash2, FiUser, FiCreditCard, FiHash, FiCheckCircle, FiLoader, FiShoppingBag, FiMapPin } from 'react-icons/fi';
import { Button } from '../../components/ui/Button';
import { useAuth } from '../../lib/AuthContext';

interface POSItem extends MenuItem {
  quantity: number;
}

interface POSProps {
  menu: MenuItem[];
  loading: boolean;
  onOrderSuccess: () => void;
}

const POS: React.FC<POSProps> = ({ menu, loading, onOrderSuccess }) => {
  const { user } = useAuth();
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [cart, setCart] = useState<POSItem[]>(() => {
    const saved = localStorage.getItem('pos_cart');
    return saved ? JSON.parse(saved) : [];
  });
  
  // Order Metadata
  const [orderType, setOrderType] = useState<'dine-in' | 'take-away'>('dine-in');
  const [customerName, setCustomerName] = useState(() => localStorage.getItem('pos_customer_name') || '');
  const [customerPhone, setCustomerPhone] = useState(() => localStorage.getItem('pos_customer_phone') || '');
  const [tableNumber, setTableNumber] = useState(() => localStorage.getItem('pos_table_number') || '');
  const [paymentMethod, setPaymentMethod] = useState<'cash' | 'card' | 'qris'>('cash');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Update categories when menu changes
  useEffect(() => {
    if (menu.length > 0) {
      const cats = ['All', ...new Set(menu.map(item => item.category))];
      setCategories(cats);
    }
  }, [menu]);

  // Persistence Effect
  useEffect(() => {
    localStorage.setItem('pos_cart', JSON.stringify(cart));
    localStorage.setItem('pos_customer_name', customerName);
    localStorage.setItem('pos_customer_phone', customerPhone);
    localStorage.setItem('pos_table_number', tableNumber);
  }, [cart, customerName, customerPhone, tableNumber]);

  const addToCart = (item: MenuItem) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === item.id);
      if (existing) {
        return prev.map(i => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i);
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const updateQuantity = (id: string, delta: number) => {
    setCart(prev => 
      prev.map(i => i.id === id ? { ...i, quantity: Math.max(0, i.quantity + delta) } : i)
          .filter(i => i.quantity > 0)
    );
  };

  const subtotal = cart.reduce((acc, curr) => acc + (curr.price * curr.quantity), 0);
  const tax = Math.round(subtotal * 0.1);
  const total = subtotal + tax;

  const filteredMenu = menu.filter(item => {
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleCheckout = async () => {
    if (cart.length === 0) return;
    if (!user) return;
    
    if (!customerName.trim()) {
      alert('Nama pelanggan harus diisi bro!');
      return;
    }
    if (orderType === 'dine-in' && !tableNumber.trim()) {
      alert('Nomor meja wajib diisi buat Dine In!');
      return;
    }

    setIsSubmitting(true);
    try {
      const orderItems = cart.map(item => ({
        id: item.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        category: item.category
      }));

      await createOrder(
        user.id,
        total,
        orderItems,
        orderType,
        orderType === 'dine-in' ? tableNumber : 'Take Away',
        paymentMethod,
        tax,
        {
          customer_name: customerName,
          customer_phone: customerPhone
        }
      );

      onOrderSuccess();

      setCart([]);
      setTableNumber('');
      setCustomerName('');
      setCustomerPhone('');
      localStorage.removeItem('pos_cart');
      localStorage.removeItem('pos_customer_name');
      localStorage.removeItem('pos_customer_phone');
      localStorage.removeItem('pos_table_number');
    } catch (error) {
      console.error('Checkout error:', error);
      alert('Gagal membuat pesanan. Coba lagi bro!');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading && menu.length === 0) return (
    <div className="flex flex-col items-center justify-center min-h-[500px] text-primary/40">
      <FiLoader className="w-10 h-10 animate-spin mb-4" />
      <p className="font-bold uppercase tracking-widest text-xs text-center">Menyiapkan Sistem POS...</p>
    </div>
  );

  return (
    <div className="flex flex-col lg:flex-row gap-8 h-[calc(100vh-140px)] overflow-hidden">
      {/* Left Column: Menu Selection */}
      <div className="flex-1 flex flex-col gap-6 min-h-0">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 flex-shrink-0">
          <div>
            <h2 className="text-3xl font-black text-primary tracking-tight">Point of Sale</h2>
            <p className="text-primary/40 font-medium text-sm">Input pesanan pelanggan langsung</p>
          </div>
          <div className="relative w-full md:w-64">
            <input 
              type="text" 
              placeholder="Cari menu..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-primary/10 rounded-2xl text-sm focus:ring-2 focus:ring-primary/20 outline-none shadow-sm transition-all"
            />
            <FiSearch className="absolute left-3.5 top-3.5 text-primary/30" />
          </div>
        </div>

        {/* Categories Bar */}
        <div className="flex gap-2 overflow-x-auto pb-2 custom-scrollbar flex-shrink-0">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-6 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all border ${
                selectedCategory === cat 
                  ? 'bg-primary text-white border-primary shadow-lg shadow-primary/20' 
                  : 'bg-white text-primary/40 border-primary/5 hover:border-primary/20 hover:text-primary'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Menu Grid */}
        <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-4 auto-rows-max">
          {filteredMenu.map(item => {
            const isAvailable = item.is_available !== false;
            return (
              <motion.div
                key={item.id}
                whileHover={isAvailable ? { y: -4 } : {}}
                whileTap={isAvailable ? { scale: 0.95 } : {}}
                onClick={() => isAvailable && addToCart(item)}
                className={`bg-white border rounded-2xl p-4 transition-all group relative overflow-hidden flex flex-col h-full ${
                  isAvailable ? 'cursor-pointer border-primary/5 hover:shadow-xl hover:shadow-primary/5' : 'cursor-not-allowed border-red-50 bg-gray-50/50 opacity-60'
                }`}
              >
                <div className={`aspect-square rounded-xl overflow-hidden mb-3 bg-gray-50 flex-shrink-0 ${!isAvailable ? 'grayscale' : ''}`}>
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                </div>
                <div className="flex flex-col flex-1 justify-between gap-1">
                  <h4 className={`text-sm font-black line-clamp-2 leading-tight min-h-[2.5rem] ${isAvailable ? 'text-primary group-hover:text-secondary' : 'text-primary/40'}`}>
                    {item.name}
                  </h4>
                  <p className={`font-bold text-xs ${isAvailable ? 'text-secondary' : 'text-primary/20'}`}>
                    Rp {(item.price).toLocaleString()}
                  </p>
                </div>
                
                {isAvailable && cart.find(i => i.id === item.id) && (
                  <div className="absolute top-2 right-2 bg-primary text-white text-[10px] font-black w-6 h-6 flex items-center justify-center rounded-full shadow-lg">
                    {cart.find(i => i.id === item.id)?.quantity}
                  </div>
                )}

                {!isAvailable && (
                  <div className="absolute inset-0 bg-white/40 flex items-center justify-center backdrop-blur-[1px]">
                    <span className="bg-red-500 text-white text-[10px] font-black px-3 py-1 rounded-full shadow-lg rotate-[-12deg]">
                      SOLD OUT
                    </span>
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Right Column: Order Summary */}
      <div className="w-full lg:w-[420px] flex flex-col min-h-0 h-full">
        <div className="bg-white border border-primary/5 rounded-[2.5rem] shadow-xl shadow-primary/5 overflow-hidden flex flex-col h-full">
          {/* Metadata */}
          <div className="p-6 border-b border-primary/5 bg-primary/[0.02] space-y-4 flex-shrink-0">
            <div className="flex bg-white p-1 rounded-2xl border border-primary/5">
              <button onClick={() => setOrderType('dine-in')} className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${orderType === 'dine-in' ? 'bg-primary text-white shadow-lg' : 'text-primary/20 hover:text-primary'}`}><FiMapPin size={12} /> Dine In</button>
              <button onClick={() => setOrderType('take-away')} className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${orderType === 'take-away' ? 'bg-primary text-white shadow-lg' : 'text-primary/20 hover:text-primary'}`}><FiShoppingBag size={12} /> Take Away</button>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="relative">
                <FiUser className="absolute left-3 top-3.5 text-primary/30 text-xs" />
                <input type="text" placeholder="Nama Pelanggan *" value={customerName} onChange={(e) => setCustomerName(e.target.value)} className={`w-full pl-9 pr-3 py-3 bg-white border rounded-2xl text-xs font-bold focus:ring-2 outline-none ${!customerName ? 'border-red-100 bg-red-50/10' : 'border-primary/5 focus:ring-primary/20'}`} />
              </div>
              <div className="relative">
                <FiHash className="absolute left-3 top-3.5 text-primary/30 text-xs" />
                <input type="text" placeholder={orderType === 'dine-in' ? "No. Meja *" : "Take Away"} value={tableNumber} disabled={orderType === 'take-away'} onChange={(e) => setTableNumber(e.target.value)} className={`w-full pl-9 pr-3 py-3 bg-white border rounded-2xl text-xs font-bold focus:ring-2 outline-none ${orderType === 'dine-in' && !tableNumber ? 'border-red-100 bg-red-50/10' : 'border-primary/5 focus:ring-primary/20'} ${orderType === 'take-away' ? 'opacity-50 cursor-not-allowed bg-gray-50' : ''}`} />
              </div>
            </div>
          </div>

          {/* Cart */}
          <div className="flex-1 overflow-y-auto p-6 custom-scrollbar space-y-4">
            <AnimatePresence mode="popLayout">
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center py-20 opacity-20">
                  <FiPlus className="w-12 h-12 mb-4" />
                  <p className="text-sm font-bold uppercase tracking-widest">Pilih menu di kiri</p>
                </div>
              ) : (
                cart.map(item => (
                  <motion.div key={item.id} layout initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="flex items-center gap-4 bg-gray-50/50 p-3 rounded-2xl border border-primary/[0.02]">
                    <div className="w-12 h-12 rounded-xl overflow-hidden flex-shrink-0"><img src={item.image} alt={item.name} className="w-full h-full object-cover" /></div>
                    <div className="flex-1 min-w-0"><h5 className="text-xs font-black text-primary truncate">{item.name}</h5><p className="text-[10px] font-bold text-secondary">Rp {item.price.toLocaleString()}</p></div>
                    <div className="flex items-center gap-2 bg-white rounded-xl p-1 border border-primary/5 shadow-sm">
                      <button onClick={() => updateQuantity(item.id, -1)} className="w-6 h-6 flex items-center justify-center text-primary/40 hover:text-red-500"><FiMinus size={12} /></button>
                      <span className="text-xs font-black min-w-[20px] text-center">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, 1)} className="w-6 h-6 flex items-center justify-center text-primary/40 hover:text-primary"><FiPlus size={12} /></button>
                    </div>
                    <button onClick={() => setCart(prev => prev.filter(i => i.id !== item.id))} className="text-primary/10 hover:text-red-500 p-1"><FiTrash2 size={14} /></button>
                  </motion.div>
                ))
              )}
            </AnimatePresence>
          </div>

          {/* Payment */}
          <div className="p-6 border-t border-primary/5 bg-primary/[0.02] space-y-4 flex-shrink-0">
            <div className="space-y-2">
              <span className="text-[10px] font-black uppercase tracking-widest text-primary/30">Metode Pembayaran</span>
              <div className="grid grid-cols-3 gap-2">
                {['cash', 'card', 'qris'].map(m => (
                  <button key={m} onClick={() => setPaymentMethod(m as any)} className={`flex flex-col items-center gap-1.5 py-2.5 rounded-xl text-[10px] font-black transition-all border ${paymentMethod === m ? 'bg-primary text-white shadow-md shadow-primary/10' : 'bg-white text-primary/40 border-primary/5 hover:border-primary/20'}`}>
                    {m === 'cash' ? <FiCheckCircle size={10} /> : m === 'card' ? <FiCreditCard size={10} /> : <div className="w-2.5 h-2.5 bg-current rounded-sm" />}
                    {m.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex justify-between text-lg font-black text-primary pt-2"><span>TOTAL</span><span className="text-secondary">Rp {total.toLocaleString()}</span></div>
            <Button className="w-full py-6 rounded-2xl text-sm font-black tracking-widest gap-2 shadow-xl shadow-primary/20" disabled={cart.length === 0 || isSubmitting || !customerName || (orderType === 'dine-in' && !tableNumber)} onClick={handleCheckout}>
              {isSubmitting ? <FiLoader className="animate-spin" /> : <FiCheckCircle />} {isSubmitting ? 'MEMPROSES...' : 'BAYAR & PESAN'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default POS;
