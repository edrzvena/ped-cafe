import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card } from '../../components/ui/Card';
import { Star, Coffee } from 'lucide-react';
import { useAuth } from '../../lib/AuthContext';
import { getProfile } from '../../api/auth';

const PointsCard: React.FC = () => {
  const { user } = useAuth();
  const [points, setPoints] = useState(0);

  useEffect(() => {
    if (user) {
      getProfile(user.id).then(data => {
        if (data) setPoints(data.points || 0);
      });
    }
  }, [user]);

  const progress = Math.min((points / 500) * 100, 100);

  return (
    <Card className="bg-primary text-accent p-8 overflow-hidden relative">
      <div className="relative z-10 space-y-6">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-accent/60 text-xs uppercase tracking-widest font-bold mb-1">Loyalty Points</p>
            <h3 className="text-4xl font-black font-serif">{points.toLocaleString()}</h3>
          </div>
          <div className="bg-secondary/20 p-3 rounded-2xl">
            <Star className="text-secondary fill-secondary" />
          </div>
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between text-xs font-bold">
            <span>Progress to Reward</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              className="h-full bg-secondary"
            />
          </div>
        </div>

        <p className="text-accent/40 text-[10px] leading-relaxed">
          Earn 1 point for every Rp 10.000 spent. <br />
          Redeem 500 points for a free signature coffee.
        </p>
      </div>

      <Coffee size={200} className="absolute -bottom-10 -right-10 text-white opacity-5 -rotate-12" />
    </Card>
  );
};

export default PointsCard;
