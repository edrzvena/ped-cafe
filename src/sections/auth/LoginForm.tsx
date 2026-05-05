import React, { useState } from 'react';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { signIn } from '../../api/auth';
import { useNavigate } from 'react-router-dom';

export const LoginForm = ({ onToggle }: { onToggle: () => void }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Check if it's Admin Login
    const adminUser = import.meta.env.VITE_ADMIN_USERNAME;
    const adminPass = import.meta.env.VITE_ADMIN_PASSWORD;

    if (email === adminUser && password === adminPass) {
      sessionStorage.setItem('admin_session', 'true');
      navigate('/admin');
      return;
    }

    try {
      await signIn(email, password);
      navigate('/');
    } catch (error: any) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        label="Email Address"
        type="text"
        placeholder="name@example.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <Input
        label="Password"
        type="password"
        placeholder="••••••••"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <div className="text-right">
        <button type="button" className="text-sm text-orange-500 hover:underline">
          Forgot Password?
        </button>
      </div>
      <Button type="submit" fullWidth isLoading={loading}>
        Sign In
      </Button>
      <p className="text-center text-sm text-gray-500">
        Don't have an account?{' '}
        <button type="button" onClick={onToggle} className="text-orange-500 font-semibold">
          Sign Up
        </button>
      </p>
    </form>
  );
};
