import React from 'react';
import { Card } from '../../components/ui/Card';
import { Coffee, ShieldCheck } from 'lucide-react';

interface MembershipCardProps {
  memberSince?: string;
  memberId?: string;
}

const MembershipCard: React.FC<MembershipCardProps> = ({ memberSince, memberId }) => {
  const formatDate = (dateString?: string) => {
    if (!dateString) return 'Loading...';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  };

  return (
    <Card className="bg-gradient-to-br from-primary to-primary-light text-accent p-10 rounded-[3rem] shadow-2xl relative overflow-hidden">
      <div className="relative z-10 space-y-12">
        <div className="flex justify-between items-center">
          <div className="bg-white/10 p-4 rounded-3xl backdrop-blur-md">
            <Coffee className="text-secondary w-8 h-8" />
          </div>
        </div>

        <div>
          <p className="text-[10px] uppercase tracking-[0.3em] font-bold text-accent/40 mb-2">Member Since</p>
          <p className="text-2xl font-serif">{formatDate(memberSince)}</p>
        </div>

        <div className="flex justify-between items-end">
          <div className="space-y-1">
            <p className="text-[10px] uppercase tracking-[0.3em] font-bold text-accent/40">Member ID</p>
            <p className="font-mono text-lg">{memberId || 'PED-XXXX-XXXX'}</p>
          </div>
          <ShieldCheck className="text-secondary/50 w-12 h-12" />
        </div>
      </div>
      
      {/* Gloss Effect */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-tr from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
    </Card>
  );
};

export default MembershipCard;
