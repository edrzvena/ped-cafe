import { supabase } from '../lib/supabase';

export const getUserOrders = async (userId: string) => {
  const { data, error } = await supabase
    .from('orders')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data;
};

export const createOrder = async (
  userId: string, 
  total: number, 
  items: any[], 
  orderType?: 'dine-in' | 'take-away',
  tableNumber?: string,
  paymentMethod?: string,
  tax?: number,
  additionalMetadata?: Record<string, any>
) => {
  const enrichedItems = [
    ...items,
    {
      name: '_metadata',
      order_type: orderType,
      table_number: tableNumber,
      payment_method: paymentMethod,
      tax: tax,
      is_hidden: true,
      ...additionalMetadata
    }
  ];

  console.log('Creating order for user:', userId, 'Total:', total);

  const { data, error } = await supabase
    .from('orders')
    .insert([{
      user_id: userId,
      total_amount: total,
      items: enrichedItems,
      status: 'processing'
    }])
    .select();

  if (error) {
    console.error('Order creation error:', error);
    throw error;
  }
  
  // Award points
  const earnedPoints = Math.floor(total / 10000);
  if (earnedPoints > 0) {
    try {
      const { data: profile } = await supabase
        .from('profiles')
        .select('points')
        .eq('id', userId)
        .single();
      
      await supabase
        .from('profiles')
        .update({ points: (profile?.points || 0) + earnedPoints })
        .eq('id', userId);
    } catch (e) {
      console.warn('Point awarding failed, but order was created:', e);
    }
  }

  return data;
};

export const getAllOrders = async () => {
  const { data, error } = await supabase
    .from('orders')
    .select('*, profiles(full_name, email)')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching with join:', error);
    const { data: simpleData, error: simpleError } = await supabase
      .from('orders')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (simpleError) throw simpleError;
    return simpleData;
  }
  
  return data;
};

export const updateOrderStatus = async (orderId: string, status: string) => {
  console.log('Updating order status:', orderId, 'to', status);
  
  const { data, error } = await supabase
    .from('orders')
    .update({ status })
    .eq('id', orderId)
    .select();

  if (error) {
    console.error('Update status error:', error);
    throw error;
  }

  if (data && data.length === 0) {
    console.warn('Update successful but NO rows were affected. Check if ID exists:', orderId);
  } else {
    console.log('Update success! Returned data:', data);
  }

  return data;
};
