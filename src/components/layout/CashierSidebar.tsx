import React from 'react';
import { FiLayout, FiList, FiClock, FiBox, FiLogOut } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

interface CashierSidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const CashierSidebar: React.FC<CashierSidebarProps> = ({ activeTab, setActiveTab }) => {
  const navigate = useNavigate();

  const menuItems = [
    { id: 'pos', label: 'POS', icon: <FiLayout className="w-6 h-6" /> },
    { id: 'monitor', label: 'Monitor', icon: <FiList className="w-6 h-6" /> },
    { id: 'history', label: 'History', icon: <FiClock className="w-6 h-6" /> },
    { id: 'stock', label: 'Stock', icon: <FiBox className="w-6 h-6" /> },
  ];

  return (
    <nav className="fixed left-0 top-0 bottom-0 w-24 bg-white border-r border-primary/5 flex flex-col items-center py-10 gap-10 z-50 hidden md:flex">
      {/* Brand Logo / Icon */}
      <div 
        onClick={() => navigate('/')}
        className="w-14 h-14 bg-primary rounded-[1.5rem] flex items-center justify-center text-white font-black text-2xl shadow-xl shadow-primary/20 cursor-pointer hover:scale-105 transition-transform"
      >
        P.
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
                ? 'bg-primary/5 text-primary shadow-inner shadow-primary/5' 
                : 'text-primary/20 hover:text-primary hover:bg-primary/5'
            }`}
          >
            {item.icon}
            
            {/* Tooltip on hover */}
            <span className="absolute left-full ml-4 px-2 py-1 bg-primary text-white text-[10px] font-bold rounded opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-50">
              {item.label}
            </span>
          </div>
        ))}
      </div>

      {/* Logout / Exit */}
      <div 
        onClick={() => navigate('/')}
        title="Exit Cashier"
        className="w-12 h-12 bg-primary/5 rounded-full flex items-center justify-center text-primary/40 cursor-pointer hover:bg-red-50 hover:text-red-500 transition-all"
      >
        <FiLogOut className="w-6 h-6" />
      </div>
    </nav>
  );
};

export default CashierSidebar;
