import React, { useState, useEffect } from 'react';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { useAuth } from '../../lib/AuthContext';
import { getUserOrders } from '../../api/orders';

const OrderHistory: React.FC = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      getUserOrders(user.id).then(data => {
        setOrders(data);
        setLoading(false);
      });
    }
  }, [user]);

  if (loading) return <p className="text-primary/40 text-sm">Loading history...</p>;

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-bold text-primary">Order History</h3>
      <div className="space-y-4">
        {orders.length === 0 ? (
          <p className="text-primary/40 text-sm">No orders yet.</p>
        ) : (
          orders.map((order, index) => {
            const personalOrderNumber = orders.length - index;
            return (
              <Card key={order.id} className="p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <span className="font-bold text-primary">Order #{personalOrderNumber}</span>
                    <span className="text-xs font-mono text-primary/30">
                      (ID: {order.id.slice(0, 4).toUpperCase()})
                    </span>
                    <span className="text-xs text-primary/40">
                      {new Date(order.created_at).toLocaleDateString('id-ID')}
                    </span>
                  </div>
                  <p className="text-sm text-primary/60">
                    {order.items?.filter((i: any) => i.name !== 'Note').map((i: any) => i.name).join(', ')}
                  </p>
                  {order.items?.find((i: any) => i.name === 'Note') && (
                    <div className="mt-2 text-[10px] bg-secondary/10 text-secondary px-3 py-1 rounded-full font-bold inline-block">
                      {order.items.find((i: any) => i.name === 'Note').description}
                    </div>
                  )}
                </div>
                <div className="text-right flex flex-col items-end">
                  <p className="font-black text-primary mb-2">Rp {order.total_amount?.toLocaleString()}</p>
                  <Badge variant={order.status === 'completed' ? 'accent' : 'secondary'}>
                    {order.status}
                  </Badge>
                </div>
              </Card>
            );
          })
        )}
      </div>
    </div>
  );
};

export default OrderHistory;
