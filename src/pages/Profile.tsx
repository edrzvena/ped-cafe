import React from 'react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import ProfileInfo from '../sections/profile/ProfileInfo';
import MembershipCard from '../sections/profile/MembershipCard';
import { motion } from 'framer-motion';

import { useAuth } from '../lib/AuthContext';
import { useNavigate } from 'react-router-dom';
import { LogOut } from 'lucide-react';

const Profile: React.FC = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (!user) navigate('/auth');
  }, [user, navigate]);

  const handleLogout = async () => {
    await signOut();
    navigate('/');
  };

  if (!user) return null;
  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-background"
    >
      <Navbar />
      
      <div className="pt-40 pb-20 px-6">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="flex justify-between items-end">
            <h1 className="text-5xl font-black text-primary">My Profile</h1>
            <button 
              onClick={handleLogout}
              className="flex items-center gap-2 text-red-500 font-bold hover:bg-red-50 px-4 py-2 rounded-xl transition-colors"
            >
              <LogOut size={20} />
              Sign Out
            </button>
          </div>
          
          <div className="grid lg:grid-cols-3 gap-12 items-start">
            <div className="lg:col-span-1">
              <MembershipCard />
              <div className="mt-8 p-6 bg-white rounded-3xl border border-primary/5 space-y-4">
                <h4 className="font-bold text-primary">Account Security</h4>
                <p className="text-sm text-primary/40 leading-relaxed">
                  Protect your account with two-factor authentication and a strong password.
                </p>
                <button className="text-secondary font-bold text-sm hover:underline">Change Password</button>
              </div>
            </div>
            <div className="lg:col-span-2">
              <ProfileInfo />
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </motion.main>
  );
};

export default Profile;
