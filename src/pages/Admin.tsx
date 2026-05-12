import React, { useState, useEffect, useCallback } from 'react';
import { getMenuItems } from '../api/menu';
import type { MenuItem } from '../types';
import { motion } from 'framer-motion';
import AdminSidebar from '../components/layout/AdminSidebar';
import AdminDashboard from '../sections/admin/AdminDashboard';
import MenuManager from '../sections/admin/MenuManager';
import AdminLogin from '../sections/admin/AdminLogin';

const Admin: React.FC = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [activeTab, setActiveTab] = useState('dashboard');

  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchMenu = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getMenuItems();
      setMenuItems(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (sessionStorage.getItem('admin_session') === 'true') {
      setIsAdmin(true);
    }
    fetchMenu();
  }, [fetchMenu]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const adminUser = import.meta.env.VITE_ADMIN_USERNAME;
    const adminPass = import.meta.env.VITE_ADMIN_PASSWORD;

    if (username === adminUser && password === adminPass) {
      setIsAdmin(true);
      sessionStorage.setItem('admin_session', 'true');
    } else {
      alert('Login Gagal, Cek Username/Password!');
    }
  };

  const handleLogout = () => {
    setIsAdmin(false);
    sessionStorage.removeItem('admin_session');
  };

  if (!isAdmin) {
    return (
      <AdminLogin
        username={username}
        setUsername={setUsername}
        password={password}
        setPassword={setPassword}
        handleLogin={handleLogin}
      />
    );
  }

  return (
    <div className="min-h-screen bg-[#FDFCFB] selection:bg-primary/10 overflow-x-hidden">
      <AdminSidebar activeTab={activeTab} setActiveTab={setActiveTab} onLogout={handleLogout} />

      <main className="md:ml-24 p-6 md:p-12 max-w-[1600px] mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
          <div>
            <h1 className="text-5xl font-black text-primary tracking-tighter mb-2">Admin Center</h1>
            <p className="text-primary/40 font-medium uppercase tracking-[0.2em] text-xs">Management & Insights</p>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {activeTab === 'dashboard' && <AdminDashboard menuItems={menuItems} />}

          {activeTab === 'menu' && (
            <MenuManager menuItems={menuItems} loading={loading} onRefresh={fetchMenu} />
          )}

          {activeTab === 'settings' && (
            <div className="p-20 text-center border-2 border-dashed border-primary/5 rounded-[3rem]">
              <h2 className="text-2xl font-black text-primary/20 uppercase tracking-widest">Global Settings</h2>
              <p className="text-primary/10 font-bold mt-2">Coming Soon for Enterprise Control</p>
            </div>
          )}
        </motion.div>
      </main>

      {/* Aesthetic Background Ornaments */}
      <div className="fixed top-[-10%] left-[-10%] -z-10 w-[50%] h-[50%] bg-secondary/[0.03] rounded-full blur-[120px] pointer-events-none" />
      <div className="fixed bottom-[-10%] right-[-10%] -z-10 w-[50%] h-[50%] bg-primary/[0.02] rounded-full blur-[120px] pointer-events-none" />
    </div>
  );
};

export default Admin;
