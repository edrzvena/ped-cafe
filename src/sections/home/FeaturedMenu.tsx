import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { getMenuItems } from '../../api/menu';
import type { MenuItem } from '../../types';
import MenuCard from '../menu/MenuCard';
import { Button } from '../../components/ui/Button';
import { Link } from 'react-router-dom';
import { Sparkles, Loader } from 'lucide-react';

const FeaturedMenu: React.FC = () => {
  const [items, setItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const allItems = await getMenuItems();
        // Ambil yang popular atau 6 item pertama
        const featured = allItems.filter(i => i.isPopular).slice(0, 6);
        setItems(featured.length > 0 ? featured : allItems.slice(0, 6));
      } catch (error) {
        console.error('Failed to fetch featured menu:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchFeatured();
  }, []);

  if (loading) {
    return (
      <div className="py-20 flex justify-center">
        <Loader className="animate-spin text-primary w-10 h-10" />
      </div>
    );
  }

  return (
    <section className="py-24 px-6 bg-accent/30">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/20 text-secondary text-xs font-bold uppercase tracking-widest">
              <Sparkles size={14} />
              Chef's Special
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-primary">
              Hot Right Now
            </h2>
            <p className="text-primary/60 max-w-xl text-lg">
              Check out our most ordered items this week. Grab yours before they run out!
            </p>
          </div>
          <Link to="/menu">
            <Button variant="outline" className="rounded-full border-primary/20 hover:border-primary text-primary px-8">
              View All Menu
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {items.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <MenuCard item={item} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedMenu;
