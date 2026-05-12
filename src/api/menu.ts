import { supabase } from '../lib/supabase';
import type { MenuItem } from '../types';

export const uploadImage = async (file: File) => {
  const fileExt = file.name.split('.').pop();
  const fileName = `${Math.random()}.${fileExt}`;
  const filePath = `${fileName}`;

  const { error: uploadError } = await supabase.storage
    .from('product-images')
    .upload(filePath, file);

  if (uploadError) throw uploadError;

  const { data } = supabase.storage
    .from('product-images')
    .getPublicUrl(filePath);

  return data.publicUrl;
};

export const getMenuItems = async (): Promise<MenuItem[]> => {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching menu:', error);
    throw error;
  }

  // Kita mapping biar sesuai dengan interface MenuItem kalau ada beda nama kolom
  return data.map((item: any) => ({
    id: item.id,
    name: item.name,
    description: item.description,
    price: item.price,
    category: item.category,
    image: item.image_url || item.image, // Handle image_url dari supabase
    rating: item.rating || 5, // Default rating kalau di DB belum ada
    isPopular: item.isPopular,
    is_available: item.is_available ?? true // Default true kalau kolom belum ada
  }));
};

export const updateProductAvailability = async (id: string, is_available: boolean) => {
  const { data, error } = await supabase
    .from('products')
    .update({ is_available })
    .eq('id', id)
    .select();

  if (error) throw error;
  return data;
};

export const addProduct = async (product: Omit<MenuItem, 'id' | 'rating'>) => {
  const { data, error } = await supabase
    .from('products')
    .insert([{
      name: product.name,
      description: product.description,
      price: product.price,
      category: product.category,
      image_url: product.image,
      isPopular: product.isPopular,
      rating: 5
    }]);
  if (error) throw error;
  return data;
};

export const updateProduct = async (id: string, product: Omit<MenuItem, 'id' | 'rating'>) => {
  const { data, error } = await supabase
    .from('products')
    .update({
      name: product.name,
      description: product.description,
      price: product.price,
      category: product.category,
      image_url: product.image,
      isPopular: product.isPopular
    })
    .eq('id', id);
  if (error) throw error;
  return data;
};

export const deleteProduct = async (id: string) => {
  const { error } = await supabase
    .from('products')
    .delete()
    .eq('id', id);
  if (error) throw error;
};
