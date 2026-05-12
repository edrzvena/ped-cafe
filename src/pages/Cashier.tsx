import React, { useEffect, useState, useCallback } from 'react';
import OrderList from '../sections/cashier/OrderList';
import SalesHistory from '../sections/cashier/SalesHistory';
import POS from '../sections/cashier/POS';
import CashierSidebar from '../components/layout/CashierSidebar';
import StockManagement from '../sections/cashier/StockManagement';
import { motion } from 'framer-motion';
import { useAuth } from '../lib/AuthContext';
import { useNavigate } from 'react-router-dom';
import { getAllOrders } from '../api/orders';
import { getMenuItems } from '../api/menu';
import { supabase } from '../lib/supabase';
import type { Order, MenuItem } from '../types';

const Cashier: React.FC = () => {
  const { isCashier, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('pos');
  
  // Shared state for Orders
  const [orders, setOrders] = useState<Order[]>([]);
  const [ordersLoading, setOrdersLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState<string>('');

  // Shared state for Menu (Real-time)
  const [menu, setMenu] = useState<MenuItem[]>([]);
  const [menuLoading, setMenuLoading] = useState(true);

  const fetchOrders = useCallback(async (showLoading = false) => {
    if (showLoading) setOrdersLoading(true);
    try {
      const data = await getAllOrders();
      if (Array.isArray(data)) {
        setOrders(data as Order[]);
      }
      setLastUpdated(new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setOrdersLoading(false);
    }
  }, []);

  const fetchMenu = useCallback(async () => {
    try {
      const data = await getMenuItems();
      setMenu(data);
    } catch (error) {
      console.error('Error fetching menu:', error);
    } finally {
      setMenuLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!authLoading && !isCashier) {
      navigate('/');
    }
  }, [isCashier, authLoading, navigate]);

  useEffect(() => {
    if (isCashier) {
      fetchOrders(true);
      fetchMenu();
      
      // 1. Real-time Subscription for ORDERS
      const ordersChannel = supabase
        .channel('cashier_orders_channel')
        .on('postgres_changes', { event: '*', schema: 'public', table: 'orders' }, () => {
          fetchOrders();
        })
        .subscribe();

      // 2. Real-time Subscription for PRODUCTS (Menu Availability)
      const productsChannel = supabase
        .channel('cashier_products_channel')
        .on('postgres_changes', { event: '*', schema: 'public', table: 'products' }, () => {
          fetchMenu();
        })
        .subscribe();

      return () => {
        supabase.removeChannel(ordersChannel);
        supabase.removeChannel(productsChannel);
      };
    }
  }, [isCashier, fetchOrders, fetchMenu]);

  if (authLoading) return null;
  if (!isCashier) return null;

  return (
    <div className="min-h-screen bg-[#FDFCFB] selection:bg-primary/10 overflow-x-hidden">
      <CashierSidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      <main className="md:ml-24 p-6 md:p-12 max-w-[1600px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          {/* POS Tab */}
          <div className={activeTab === 'pos' ? 'block' : 'hidden'}>
            <POS 
              menu={menu} 
              loading={menuLoading}
              onOrderSuccess={() => fetchOrders(false)} 
            />
          </div>

          {/* Monitor Tab */}
          <div className={activeTab === 'monitor' ? 'block' : 'hidden'}>
            <OrderList 
              orders={orders} 
              loading={ordersLoading} 
              onRefresh={() => fetchOrders(true)} 
              lastUpdated={lastUpdated}
              setOrders={setOrders}
            />
          </div>

          {/* History Tab */}
          <div className={activeTab === 'history' ? 'block' : 'hidden'}>
            <SalesHistory orders={orders} loading={ordersLoading} />
          </div>
          
          {/* Stock Tab */}
          <div className={activeTab === 'stock' ? 'block' : 'hidden'}>
            <StockManagement menu={menu} loading={menuLoading} onUpdate={fetchMenu} />
          </div>
        </motion.div>
      </main>

      {/* Background Ornaments */}
      <div className="fixed top-[-10%] right-[-10%] -z-10 w-[60%] h-[60%] bg-primary/[0.02] rounded-full blur-[120px] pointer-events-none rotate-12" />
      <div className="fixed bottom-[-5%] left-[10%] -z-10 w-[40%] h-[40%] bg-accent/[0.03] rounded-full blur-[100px] pointer-events-none" />
    </div>
  );
};

export default Cashier;
