import React, { useState, useEffect } from 'react';
import { getMenuItems } from '../../api/menu';
import type { MenuItem } from '../../types';
import MenuCard from './MenuCard';
import CategoryFilter from './CategoryFilter';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader } from 'lucide-react';

const MenuList: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        setError(null);
        const data = await getMenuItems();
        setMenuItems(data);
      } catch (err: any) {
        setError(err.message || 'Gagal mengambil data menu');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchMenu();
  }, []);

  const filteredItems = activeCategory === 'all'
    ? menuItems
    : menuItems.filter(item => item.category === activeCategory);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-4">
        <Loader className="w-10 h-10 animate-spin text-primary" />
        <p className="text-primary/60 font-bold">Loading Menu...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center px-6">
        <p className="text-red-500 font-bold text-lg mb-2">Waduh, Error!</p>
        <p className="text-primary/60 mb-6">{error}</p>
        <button 
          onClick={() => window.location.reload()}
          className="bg-primary text-accent px-6 py-2 rounded-full font-bold"
        >
          Coba Lagi
        </button>
      </div>
    );
  }

  if (menuItems.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center px-6">
        <p className="text-primary/60 text-lg mb-4">Menu belum tersedia, Bro. Cek table "products" di Supabase lo!</p>
      </div>
    );
  }

  return (
    <section className="py-20 px-6 max-w-7xl mx-auto">
      <CategoryFilter
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
      />

      <motion.div
        layout
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        <AnimatePresence mode="popLayout">
          {filteredItems.map((item) => (
            <motion.div
              key={item.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
            >
              <MenuCard item={item} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </section>
  );
};

export default MenuList;
