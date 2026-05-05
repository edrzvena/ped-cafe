import React, { useState, useEffect } from 'react';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { User, Mail, Phone, MapPin } from 'lucide-react';
import { useAuth } from '../../lib/AuthContext';
import { getProfile, updateProfile } from '../../api/auth';

const ProfileInfo: React.FC = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    full_name: '',
    phone: '',
    address: ''
  });

  useEffect(() => {
    if (user) {
      setProfile({
        full_name: user.user_metadata?.full_name || '',
        phone: '',
        address: ''
      });

      getProfile(user.id).then((data) => {
        if (data) {
          setProfile({
            full_name: data.full_name || '',
            phone: data.phone || '',
            address: data.address || ''
          });
        }
      });
    }
  }, [user]);

  const handleSave = async () => {
    if (!user) return;
    setLoading(true);
    try {
      await updateProfile(user.id, profile);
      setIsEditing(false);
      alert('Profile updated successfully!');
    } catch (error: any) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="p-10 space-y-8">
      <div className="flex flex-col sm:flex-row items-center gap-8 pb-8 border-b border-primary/5">
        <div className="w-24 h-24 bg-secondary/10 rounded-full flex items-center justify-center border-4 border-white shadow-xl">
          <User className="text-secondary w-10 h-10" />
        </div>
        <div className="text-center sm:text-left space-y-1 flex-1">
          <h2 className="text-3xl font-black text-primary font-serif">
            {profile.full_name || 'Coffee Lover'}
          </h2>
          <p className="text-primary/40 text-sm">{user?.email}</p>
        </div>
        {!isEditing && (
          <Button variant="outline" onClick={() => setIsEditing(true)}>
            Edit Profile
          </Button>
        )}
      </div>

      <div className="grid sm:grid-cols-2 gap-6">
        <Input 
          label="Display Name" 
          value={profile.full_name} 
          onChange={(e) => setProfile({ ...profile, full_name: e.target.value })}
          disabled={!isEditing}
          icon={<User />} 
        />
        <Input 
          label="Email Address" 
          value={user?.email || ''} 
          disabled 
          icon={<Mail />} 
        />
        <Input 
          label="Phone Number" 
          value={profile.phone} 
          onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
          disabled={!isEditing}
          icon={<Phone />} 
        />
        <Input 
          label="Default Address" 
          value={profile.address} 
          onChange={(e) => setProfile({ ...profile, address: e.target.value })}
          disabled={!isEditing}
          icon={<MapPin />} 
        />
      </div>

      {isEditing && (
        <div className="flex justify-end gap-4 pt-4">
          <Button variant="ghost" onClick={() => setIsEditing(false)}>
            Cancel
          </Button>
          <Button className="px-10" onClick={handleSave} isLoading={loading}>
            Save Changes
          </Button>
        </div>
      )}
    </Card>
  );
};

export default ProfileInfo;
