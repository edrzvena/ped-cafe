import React, { useState } from 'react';
import { updateProductAvailability } from '../../api/menu';
import type { MenuItem } from '../../types';
import { FiSearch, FiCheckCircle, FiXCircle, FiLoader } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';

interface StockManagementProps {
  menu: MenuItem[];
  loading: boolean;
  onUpdate: () => void;
}

const StockManagement: React.FC<StockManagementProps> = ({ menu, loading, onUpdate }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const handleToggleAvailability = async (id: string, currentStatus: boolean) => {
    setUpdatingId(id);
    try {
      const nextStatus = !currentStatus;
      await updateProductAvailability(id, nextStatus);
      onUpdate(); // Trigger global refresh
    } catch (error) {
      console.error('Error toggling availability:', error);
      alert('Gagal update status menu bro!');
    } finally {
      setUpdatingId(null);
    }
  };

  const filteredMenu = menu.filter(item => 
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading && menu.length === 0) return (
    <div className="flex flex-col items-center justify-center min-h-[400px] text-primary/40">
      <FiLoader className="w-8 h-8 animate-spin mb-4" />
      <p className="font-bold uppercase tracking-widest text-xs">Memuat Data Menu...</p>
    </div>
  );

  return (
    <div className="space-y-8 pb-20">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-4xl font-black text-primary tracking-tight mb-2">Stock & Availability</h2>
          <p className="text-primary/40 font-medium text-sm">Update status ketersediaan menu secara real-time</p>
        </div>
        <div className="relative w-full md:w-80">
          <FiSearch className="absolute left-3.5 top-3.5 text-primary/30" />
          <input 
            type="text" 
            placeholder="Cari nama menu atau kategori..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-white border border-primary/5 rounded-2xl text-sm focus:ring-2 focus:ring-primary/20 outline-none shadow-sm"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        <AnimatePresence mode="popLayout">
          {filteredMenu.map((item) => (
            <motion.div
              key={item.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className={`bg-white border p-5 rounded-[2.5rem] transition-all duration-500 relative overflow-hidden group ${
                !item.is_available ? 'border-red-100 bg-red-50/5' : 'border-primary/5'
              }`}
            >
              <div className="flex items-center gap-5">
                <div className="w-20 h-20 rounded-2xl overflow-hidden bg-gray-50 flex-shrink-0">
                  <img src={item.image} alt={item.name} className={`w-full h-full object-cover transition-all duration-500 ${!item.is_available ? 'grayscale opacity-50' : ''}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] font-black uppercase tracking-widest text-primary/30">{item.category}</span>
                    <div className="w-1 h-1 rounded-full bg-primary/10" />
                    <span className={`text-[10px] font-black uppercase tracking-widest ${item.is_available ? 'text-green-500' : 'text-red-500'}`}>{item.is_available ? 'Available' : 'Sold Out'}</span>
                  </div>
                  <h4 className={`font-black text-lg leading-tight truncate ${!item.is_available ? 'text-primary/40' : 'text-primary'}`}>{item.name}</h4>
                  <p className="text-secondary font-bold text-sm mt-1">Rp {item.price.toLocaleString()}</p>
                </div>
              </div>
              <div className="mt-6 pt-4 border-t border-primary/5 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${item.is_available ? 'bg-green-500' : 'bg-red-500'}`} />
                  <span className="text-xs font-bold text-primary/40">Status: {item.is_available ? 'Tersedia' : 'Habis'}</span>
                </div>
                <button onClick={() => handleToggleAvailability(item.id, item.is_available || false)} disabled={updatingId === item.id} className={`px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all flex items-center gap-2 ${item.is_available ? 'bg-red-50 text-red-500 hover:bg-red-500 hover:text-white' : 'bg-green-50 text-green-500 hover:bg-green-500 hover:text-white'}`}>
                  {updatingId === item.id ? <FiLoader className="animate-spin" /> : item.is_available ? <><FiXCircle /> Set Sold Out</> : <><FiCheckCircle /> Set Available</>}
                </button>
              </div>
              {!item.is_available && <div className="absolute top-4 right-4 bg-red-500 text-white text-[10px] font-black px-3 py-1 rounded-full shadow-lg shadow-red-500/20">SOLD OUT</div>}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default StockManagement;
