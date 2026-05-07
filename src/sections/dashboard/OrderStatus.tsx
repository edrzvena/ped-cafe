import React, { useState, useEffect } from 'react';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Clock, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../../lib/AuthContext';
import { getUserOrders } from '../../api/orders';

const OrderStatus: React.FC = () => {
  const { user } = useAuth();
  const [allOrdersCount, setAllOrdersCount] = useState(0);
  const [activeOrder, setActiveOrder] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      getUserOrders(user.id).then(data => {
        setAllOrdersCount(data.length);
        const active = data.find(o => o.status === 'processing' || o.status === 'pending');
        if (active) {
          // Find the index of active order to determine its personal number
          const index = data.findIndex(o => o.id === active.id);
          active.personalNumber = data.length - index;
        }
        setActiveOrder(active);
        setLoading(false);
      });
    }
  }, [user]);

  if (loading) return null;

  if (!activeOrder) {
    return (
      <Card className="p-8 text-center space-y-4">
        <div className="bg-primary/5 p-4 rounded-full w-16 h-16 mx-auto flex items-center justify-center">
          <Clock className="text-primary/20" />
        </div>
        <p className="text-primary/40 text-sm font-bold">No active orders right now.</p>
      </Card>
    );
  }

  return (
    <Card className="p-8 space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-bold text-primary">Active Order</h3>
        <Badge variant="secondary">{activeOrder.status}</Badge>
      </div>
      
      <div className="flex gap-6 items-center">
        <div className="bg-accent p-4 rounded-2xl relative">
          <Clock className="text-secondary w-8 h-8 animate-pulse" />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <p className="font-bold text-primary text-lg">Order #{activeOrder.personalNumber}</p>
            <span className="text-[10px] font-mono text-primary/30 mt-1">
              (ID: {activeOrder.id.slice(0, 4).toUpperCase()})
            </span>
          </div>
          <p className="text-sm text-primary/50">Your order is being crafted</p>
        </div>
      </div>

      <div className="space-y-4 pt-4 border-t border-primary/5">
        {[
          { label: 'Order Received', done: true },
          { label: 'Payment Confirmed', done: true },
          { label: 'Barista is preparing', done: activeOrder.status === 'processing' },
          { label: 'Ready for pickup', done: false },
        ].map((step, i) => (
          <div key={i} className="flex items-center gap-3">
            <CheckCircle2 className={`w-4 h-4 ${step.done ? 'text-secondary' : 'text-primary/10'}`} />
            <span className={`text-sm ${step.done ? 'text-primary font-bold' : 'text-primary/30'}`}>
              {step.label}
            </span>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default OrderStatus;
