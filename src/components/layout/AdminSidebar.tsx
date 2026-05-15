import React from 'react';
import { FiCoffee, FiPieChart, FiSettings, FiLogOut, FiHome } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

interface AdminSidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onLogout: () => void;
}

const AdminSidebar: React.FC<AdminSidebarProps> = ({ activeTab, setActiveTab, onLogout }) => {
  const navigate = useNavigate();

  const menuItems = [
    { id: 'dashboard', label: 'Overview', icon: <FiPieChart className="w-6 h-6" /> },
    { id: 'menu', label: 'Menu Manager', icon: <FiCoffee className="w-6 h-6" /> },
    { id: 'settings', label: 'Settings', icon: <FiSettings className="w-6 h-6" /> },
  ];

  return (
    <>
      {/* Desktop Sidebar */}
      <nav className="fixed left-0 top-0 bottom-0 w-24 bg-white border-r border-primary/5 flex flex-col items-center py-10 gap-10 z-50 hidden md:flex">
        {/* Brand Logo */}
        <div 
          onClick={() => navigate('/')}
          className="w-14 h-14 bg-secondary rounded-[1.5rem] flex items-center justify-center text-primary font-black text-2xl shadow-xl shadow-secondary/20 cursor-pointer hover:scale-105 transition-transform"
        >
          A.
        </div>
        
        {/* Menu Navigation */}
        <div className="flex-1 flex flex-col gap-8 items-center">
          {menuItems.map((item) => (
            <div 
              key={item.id} 
              onClick={() => setActiveTab(item.id)}
              title={item.label}
              className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all cursor-pointer relative group ${
                activeTab === item.id 
                  ? 'bg-secondary/10 text-primary shadow-inner shadow-secondary/5' 
                  : 'text-primary/20 hover:text-primary hover:bg-primary/5'
              }`}
            >
              {item.icon}
              <span className="absolute left-full ml-4 px-2 py-1 bg-primary text-white text-[10px] font-bold rounded opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-50">
                {item.label}
              </span>
            </div>
          ))}
        </div>

        {/* Exit & Logout */}
        <div className="flex flex-col gap-4">
          <button 
            onClick={() => navigate('/')}
            title="Back to Home"
            className="w-12 h-12 bg-primary/5 rounded-full flex items-center justify-center text-primary/40 hover:bg-primary/10 hover:text-primary transition-all"
          >
            <FiHome className="w-6 h-6" />
          </button>
          <button 
            onClick={onLogout}
            title="Logout Admin"
            className="w-12 h-12 bg-red-50 rounded-full flex items-center justify-center text-red-400 hover:bg-red-500 hover:text-white transition-all"
          >
            <FiLogOut className="w-6 h-6" />
          </button>
        </div>
      </nav>

      {/* Mobile Bottom Nav */}
      <nav className="fixed bottom-0 left-0 right-0 h-20 bg-white border-t border-primary/5 flex items-center justify-around px-6 z-50 md:hidden shadow-[0_-10px_40px_rgba(0,0,0,0.05)]">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`flex flex-col items-center gap-1 transition-all ${
              activeTab === item.id ? 'text-primary scale-110' : 'text-primary/20'
            }`}
          >
            <div className={`p-2 rounded-xl ${activeTab === item.id ? 'bg-secondary/10' : ''}`}>
              {item.icon}
            </div>
            <span className="text-[10px] font-bold uppercase tracking-tighter">{item.label.split(' ')[0]}</span>
          </button>
        ))}
        <button
          onClick={onLogout}
          className="flex flex-col items-center gap-1 text-red-400"
        >
          <div className="p-2 rounded-xl bg-red-50">
            <FiLogOut className="w-6 h-6" />
          </div>
          <span className="text-[10px] font-bold uppercase tracking-tighter">Exit</span>
        </button>
      </nav>
    </>
  );
};

export default AdminSidebar;
