import React from 'react';
import { motion } from 'framer-motion';
import { FiLock, FiArrowRight } from 'react-icons/fi';
import { Button } from '../../components/ui/Button';

interface AdminLoginProps {
  username: string;
  setUsername: (val: string) => void;
  password: string;
  setPassword: (val: string) => void;
  handleLogin: (e: React.FormEvent) => void;
}

const AdminLogin: React.FC<AdminLoginProps> = ({ 
  username, setUsername, password, setPassword, handleLogin 
}) => {
  return (
    <div className="min-h-screen bg-primary flex items-center justify-center p-6 relative overflow-hidden">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md bg-white p-10 rounded-[3rem] shadow-2xl relative z-10"
      >
        <div className="text-center space-y-2 mb-8">
          <div className="w-16 h-16 bg-secondary/10 rounded-2xl flex items-center justify-center text-primary mx-auto mb-4 shadow-inner">
            <FiLock size={32} />
          </div>
          <h1 className="text-3xl font-black text-primary tracking-tight">Admin Gate</h1>
          <p className="text-primary/40 font-bold text-sm uppercase tracking-widest">Master Access Only</p>
        </div>
        
        <form onSubmit={handleLogin} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-[10px] font-black uppercase tracking-widest text-primary/40 ml-4">Username</label>
            <input 
              type="text"
              value={username}
              onChange={e => setUsername(e.target.value)}
              className="w-full px-6 py-4 bg-gray-50 border border-primary/5 rounded-2xl font-bold focus:ring-4 focus:ring-secondary/20 outline-none transition-all"
              placeholder="Enter admin ID"
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-[10px] font-black uppercase tracking-widest text-primary/40 ml-4">Password</label>
            <input 
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full px-6 py-4 bg-gray-50 border border-primary/5 rounded-2xl font-bold focus:ring-4 focus:ring-secondary/20 outline-none transition-all"
              placeholder="••••••••"
            />
          </div>
          <Button type="submit" className="w-full py-6 rounded-2xl font-black tracking-widest gap-2 mt-4" icon={<FiArrowRight />}>
            UNLOCK ACCESS
          </Button>
        </form>
      </motion.div>
      
      {/* Aesthetic background */}
      <div className="absolute top-[-20%] right-[-10%] w-[60%] h-[60%] bg-secondary/10 rounded-full blur-[120px]" />
      <div className="absolute bottom-[-20%] left-[-10%] w-[60%] h-[60%] bg-accent/5 rounded-full blur-[120px]" />
    </div>
  );
};

export default AdminLogin;
