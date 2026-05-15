import React, { useState } from 'react';
import { addProduct, updateProduct, deleteProduct, uploadImage } from '../../api/menu';
import type { MenuItem } from '../../types';
import { Button } from '../../components/ui/Button';
import { motion, AnimatePresence } from 'framer-motion';
import { FiPlus, FiEdit2, FiTrash2, FiUpload, FiLink, FiX, FiStar, FiLoader, FiSearch } from 'react-icons/fi';

interface MenuManagerProps {
  menuItems: MenuItem[];
  loading: boolean;
  onRefresh: () => void;
}

const MenuManager: React.FC<MenuManagerProps> = ({ menuItems, loading, onRefresh }) => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Form State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);
  const [imageSource, setImageSource] = useState<'link' | 'upload'>('link');
  const [isUploading, setIsUploading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: 0,
    category: 'coffee',
    image: '',
    isPopular: false
  });

  // Helpers for IDR formatting
  const formatIDR = (num: number) => num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  const parseIDR = (str: string) => parseInt(str.replace(/\./g, '')) || 0;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingItem) {
        await updateProduct(editingItem.id, formData);
      } else {
        await addProduct(formData);
      }
      setIsModalOpen(false);
      setEditingItem(null);
      setFormData({ name: '', description: '', price: 0, category: 'coffee', image: '', isPopular: false });
      onRefresh();
    } catch (err: any) {
      alert(err.message);
    }
  };

  const handleEdit = (item: MenuItem) => {
    setEditingItem(item);
    setFormData({
      name: item.name,
      description: item.description,
      price: item.price,
      category: item.category,
      image: item.image,
      isPopular: item.isPopular || false
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Yakin mau hapus menu ini?')) {
      try {
        await deleteProduct(id);
        onRefresh();
      } catch (err: any) {
        alert(err.message);
      }
    }
  };

  const categories = ['All', ...new Set(menuItems.map(item => item.category))];
  const filteredItems = menuItems.filter(item => {
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-8">
      {/* Header with Search and Category Filter */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
        <div className="flex gap-2 overflow-x-auto pb-2 custom-scrollbar max-w-full w-full lg:w-auto">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 md:px-6 py-2 md:py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest whitespace-nowrap transition-all border ${
                selectedCategory === cat 
                  ? 'bg-primary text-white border-primary shadow-lg shadow-primary/20' 
                  : 'bg-white text-primary/40 border-primary/5 hover:border-primary/20 hover:text-primary'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
          <div className="relative flex-1 lg:w-80">
            <FiSearch className="absolute left-4 top-4 text-primary/30" />
            <input 
              type="text" 
              placeholder="Cari menu..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-3 bg-white border border-primary/5 rounded-2xl text-sm font-bold focus:ring-4 focus:ring-primary/10 outline-none shadow-sm transition-all"
            />
          </div>
          <Button 
            onClick={() => {
              setEditingItem(null);
              setFormData({ name: '', description: '', price: 0, category: 'coffee', image: '', isPopular: false });
              setIsModalOpen(true);
            }} 
            className="py-3 md:py-4 px-6 rounded-2xl font-black gap-2 shadow-xl shadow-primary/10"
            icon={<FiPlus />}
          >
            TAMBAH
          </Button>
        </div>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-20 text-primary/20">
          <FiLoader className="w-10 h-10 animate-spin mb-4" />
          <p className="font-black uppercase tracking-widest text-xs">Synchronizing Database...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="bg-white border border-primary/5 p-4 md:p-5 rounded-[2rem] md:rounded-[2.5rem] shadow-xl shadow-primary/[0.02] hover:shadow-primary/5 transition-all group"
            >
              <div className="flex gap-4 md:gap-5">
                <div className="w-20 h-20 md:w-24 md:h-24 rounded-2xl overflow-hidden bg-gray-50 flex-shrink-0 relative">
                  <img src={item.image} alt="" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  {item.isPopular && (
                    <div className="absolute top-2 left-2 bg-secondary text-primary p-1.5 rounded-lg shadow-lg">
                      <FiStar size={12} fill="currentColor" />
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0 flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] font-black uppercase tracking-widest text-primary/30">{item.category}</span>
                    <h3 className="font-black text-primary truncate group-hover:text-secondary transition-colors text-base md:text-lg leading-tight">{item.name}</h3>
                    <p className="text-secondary font-bold text-xs md:text-sm mt-1">Rp {item.price.toLocaleString()}</p>
                  </div>
                  <div className="flex gap-2 justify-end mt-4">
                    <button 
                      onClick={() => handleEdit(item)}
                      className="w-8 h-8 md:w-10 md:h-10 rounded-xl bg-primary/5 text-primary/40 flex items-center justify-center hover:bg-primary hover:text-white transition-all shadow-sm"
                    >
                      <FiEdit2 size={14} />
                    </button>
                    <button 
                      onClick={() => handleDelete(item.id)}
                      className="w-8 h-8 md:w-10 md:h-10 rounded-xl bg-red-50 text-red-400 flex items-center justify-center hover:bg-red-500 hover:text-white transition-all shadow-sm"
                    >
                      <FiTrash2 size={14} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal Form */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6 overflow-hidden">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsModalOpen(false)} className="absolute inset-0 bg-primary/20 backdrop-blur-md" />
            <motion.div initial={{ opacity: 0, y: 50, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 50, scale: 0.95 }} className="w-full max-w-xl bg-white p-6 md:p-10 rounded-[2rem] md:rounded-[3rem] shadow-2xl relative z-10 max-h-[90vh] overflow-y-auto custom-scrollbar">
              <div className="flex justify-between items-center mb-6 md:mb-8">
                <h2 className="text-2xl md:text-3xl font-black text-primary tracking-tight">{editingItem ? 'Edit Profile' : 'New Creation'}</h2>
                <button onClick={() => setIsModalOpen(false)} className="w-10 h-10 rounded-full bg-primary/5 flex items-center justify-center hover:bg-red-50 hover:text-red-500 transition-all"><FiX /></button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2 col-span-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-primary/40 ml-4">Nama Produk</label>
                    <input value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} className="w-full px-6 py-4 bg-gray-50 border border-primary/5 rounded-2xl font-bold focus:ring-4 focus:ring-secondary/20 outline-none transition-all" placeholder="Contoh: Caramel Macchiato" required />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-primary/40 ml-4">Harga (Rp)</label>
                    <input type="text" value={formatIDR(formData.price)} onChange={e => setFormData({ ...formData, price: parseIDR(e.target.value) })} className="w-full px-6 py-4 bg-gray-50 border border-primary/5 rounded-2xl font-bold focus:ring-4 focus:ring-secondary/20 outline-none transition-all" placeholder="0" required />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-primary/40 ml-4">Kategori</label>
                    <select className="w-full px-6 py-4 bg-gray-50 border border-primary/5 rounded-2xl font-bold focus:ring-4 focus:ring-secondary/20 outline-none transition-all appearance-none" value={formData.category} onChange={e => setFormData({ ...formData, category: e.target.value })}>
                      <option value="coffee">Coffee</option>
                      <option value="non-coffee">Non-Coffee</option>
                      <option value="food">Food</option>
                      <option value="dessert">Dessert</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-primary/40 ml-4">Deskripsi</label>
                  <textarea value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })} className="w-full px-6 py-4 bg-gray-50 border border-primary/5 rounded-2xl font-bold focus:ring-4 focus:ring-secondary/20 outline-none transition-all min-h-[100px]" placeholder="Ceritakan tentang menu ini..." required />
                </div>
                
                <div className="space-y-4">
                  <label className="text-[10px] font-black uppercase tracking-widest text-primary/40 ml-4">Asset Image</label>
                  <div className="flex gap-2 p-1 bg-primary/5 rounded-2xl">
                    <button type="button" onClick={() => setImageSource('link')} className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${imageSource === 'link' ? 'bg-white shadow-md text-primary' : 'text-primary/40'}`}><FiLink /> Web URL</button>
                    <button type="button" onClick={() => setImageSource('upload')} className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${imageSource === 'upload' ? 'bg-white shadow-md text-primary' : 'text-primary/40'}`}><FiUpload /> Local File</button>
                  </div>

                  {imageSource === 'link' ? (
                    <input placeholder="Paste image address..." value={formData.image} onChange={e => setFormData({ ...formData, image: e.target.value })} className="w-full px-6 py-4 bg-gray-50 border border-primary/5 rounded-2xl font-bold focus:ring-4 focus:ring-secondary/20 outline-none transition-all" required />
                  ) : (
                    <div className="flex items-center gap-4 p-4 border-2 border-dashed border-primary/10 rounded-2xl">
                      <input type="file" accept="image/*" className="flex-1 text-xs font-bold text-primary/40" onChange={async (e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          setIsUploading(true);
                          try {
                            const url = await uploadImage(file);
                            setFormData({ ...formData, image: url });
                          } catch (err: any) {
                            alert('Upload gagal: ' + err.message);
                          } finally {
                            setIsUploading(false);
                          }
                        }
                      }} />
                      {isUploading && <FiLoader className="animate-spin text-secondary" />}
                    </div>
                  )}
                  {formData.image && <div className="relative w-24 h-24 rounded-2xl overflow-hidden border-4 border-white shadow-lg mx-auto"><img src={formData.image} className="w-full h-full object-cover" alt="Preview" /></div>}
                </div>

                <label className="flex items-center gap-3 p-4 bg-gray-50 rounded-2xl cursor-pointer hover:bg-secondary/10 transition-colors">
                  <input type="checkbox" checked={formData.isPopular} onChange={e => setFormData({ ...formData, isPopular: e.target.checked })} className="w-5 h-5 rounded border-primary/20 text-primary focus:ring-secondary" />
                  <span className="text-sm font-black text-primary uppercase tracking-widest">Mark as Popular Item</span>
                </label>

                <div className="flex gap-4 pt-6">
                  <Button variant="ghost" className="flex-1 py-5 rounded-2xl font-black tracking-widest" onClick={() => setIsModalOpen(false)}>BATAL</Button>
                  <Button type="submit" className="flex-1 py-5 rounded-2xl font-black tracking-widest shadow-xl shadow-primary/20">SIMPAN PERUBAHAN</Button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MenuManager;
