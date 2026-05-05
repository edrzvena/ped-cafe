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

export const createOrder = async (userId: string, total: number, items: any[]) => {
  const { data, error } = await supabase
    .from('orders')
    .insert([{
      user_id: userId,
      total_amount: total,
      items: items,
      status: 'processing'
    }])
    .select();

  if (error) throw error;
  
  // Tambah poin (misal: tiap 10rb dapet 1 poin)
  const earnedPoints = Math.floor(total / 10000);
  if (earnedPoints > 0) {
    const { data: profile } = await supabase
      .from('profiles')
      .select('points')
      .eq('id', userId)
      .single();
    
    await supabase
      .from('profiles')
      .update({ points: (profile?.points || 0) + earnedPoints })
      .eq('id', userId);
  }

  return data;
};
