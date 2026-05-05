import React, { useState, useEffect } from 'react';
import { getMenuItems, addProduct, updateProduct, deleteProduct, uploadImage } from '../api/menu';
import type { MenuItem } from '../types';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Card } from '../components/ui/Card';
import { Trash2, Edit, Plus, LogOut, Coffee, Upload, Link as LinkIcon } from 'lucide-react';

const Admin: React.FC = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [imageSource, setImageSource] = useState<'link' | 'upload'>('link');
  const [isUploading, setIsUploading] = useState(false);

  // Form State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: 0,
    category: 'coffee',
    image: '',
    isPopular: false
  });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const adminUser = import.meta.env.VITE_ADMIN_USERNAME;
    const adminPass = import.meta.env.VITE_ADMIN_PASSWORD;

    if (username === adminUser && password === adminPass) {
      setIsAdmin(true);
      sessionStorage.setItem('admin_session', 'true');
    } else {
      alert('Login Gagal, Cek Username/Password!');
    }
  };

  useEffect(() => {
    if (sessionStorage.getItem('admin_session') === 'true') {
      setIsAdmin(true);
    }
    fetchMenu();
  }, []);

  const fetchMenu = async () => {
    setLoading(true);
    try {
      const data = await getMenuItems();
      setMenuItems(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

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
      fetchMenu();
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
        fetchMenu();
      } catch (err: any) {
        alert(err.message);
      }
    }
  };

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-primary flex items-center justify-center p-6">
        <Card className="w-full max-w-md p-10 space-y-6">
          <div className="text-center">
            <Coffee className="w-12 h-12 text-secondary mx-auto mb-4" />
            <h1 className="text-2xl font-black text-primary">Admin Login</h1>
          </div>
          <form onSubmit={handleLogin} className="space-y-4">
            <Input label="Username" value={username} onChange={e => setUsername(e.target.value)} />
            <Input label="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} />
            <Button type="submit" fullWidth>Login Admin</Button>
          </form>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-6 lg:p-12">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-black text-primary">Menu Manager</h1>
            <p className="text-primary/50 text-sm">Kelola menu Cafe Ped's lo di sini</p>
          </div>
          <div className="flex gap-4">
            <Button variant="outline" onClick={() => {
              setIsAdmin(false);
              sessionStorage.removeItem('admin_session');
            }} icon={<LogOut className="w-4 h-4" />}>Logout</Button>
            <Button onClick={() => {
              setEditingItem(null);
              setFormData({ name: '', description: '', price: 0, category: 'coffee', image: '', isPopular: false });
              setIsModalOpen(true);
            }} icon={<Plus className="w-4 h-4" />}>Tambah Menu</Button>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-20">Loading Menu...</div>
        ) : (
          <div className="grid gap-4">
            {menuItems.map((item) => (
              <Card key={item.id} className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <img src={item.image} alt="" className="w-16 h-16 object-cover rounded-xl" />
                  <div>
                    <h3 className="font-bold text-primary">{item.name}</h3>
                    <p className="text-xs text-primary/40">Rp {item.price.toLocaleString()}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="ghost" size="sm" onClick={() => handleEdit(item)}>
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm" className="text-red-500" onClick={() => handleDelete(item.id)}>
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Simple Modal Form */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-6">
          <Card className="w-full max-w-lg p-8 space-y-4 max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-bold">{editingItem ? 'Edit Menu' : 'Tambah Menu Baru'}</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input label="Nama Menu" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} required />
              <Input label="Deskripsi" value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })} required />
              <Input label="Harga (Rp)" type="number" value={formData.price} onChange={e => setFormData({ ...formData, price: parseInt(e.target.value) })} required />
              <div className="space-y-2">
                <label className="text-sm font-bold">Kategori</label>
                <select
                  className="w-full p-3 rounded-2xl border-2 border-primary/10"
                  value={formData.category}
                  onChange={e => setFormData({ ...formData, category: e.target.value })}
                >
                  <option value="coffee">Coffee</option>
                  <option value="non-coffee">Non-Coffee</option>
                  <option value="food">Food</option>
                  <option value="dessert">Dessert</option>
                </select>
              </div>
              
              <div className="space-y-4">
                <label className="text-sm font-bold">Gambar Menu</label>
                <div className="flex gap-2 p-1 bg-primary/5 rounded-xl">
                  <button
                    type="button"
                    onClick={() => setImageSource('link')}
                    className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-xs font-bold transition-all ${imageSource === 'link' ? 'bg-white shadow-sm text-primary' : 'text-primary/40'}`}
                  >
                    <LinkIcon size={14} /> Link URL
                  </button>
                  <button
                    type="button"
                    onClick={() => setImageSource('upload')}
                    className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-xs font-bold transition-all ${imageSource === 'upload' ? 'bg-white shadow-sm text-primary' : 'text-primary/40'}`}
                  >
                    <Upload size={14} /> Upload File
                  </button>
                </div>

                {imageSource === 'link' ? (
                  <Input 
                    placeholder="https://images.unsplash.com/..." 
                    value={formData.image} 
                    onChange={e => setFormData({ ...formData, image: e.target.value })} 
                    required 
                  />
                ) : (
                  <div className="space-y-2">
                    <input
                      type="file"
                      accept="image/*"
                      className="w-full text-sm text-primary/60 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-accent hover:file:bg-primary-light"
                      onChange={async (e) => {
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
                      }}
                    />
                    {isUploading && <p className="text-xs text-secondary animate-pulse font-bold text-center">Uploading image...</p>}
                    {formData.image && !isUploading && (
                      <div className="relative w-20 h-20 rounded-xl overflow-hidden border-2 border-secondary">
                        <img src={formData.image} className="w-full h-full object-cover" alt="Preview" />
                      </div>
                    )}
                  </div>
                )}
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={formData.isPopular}
                  onChange={e => setFormData({ ...formData, isPopular: e.target.checked })}
                />
                <label className="text-sm font-bold">Tandai Populer</label>
              </div>
              <div className="flex gap-4 pt-4">
                <Button variant="ghost" fullWidth onClick={() => setIsModalOpen(false)}>Batal</Button>
                <Button type="submit" fullWidth>Simpan Menu</Button>
              </div>
            </form>
          </Card>
        </div>
      )}
    </div>
  );
};

export default Admin;
