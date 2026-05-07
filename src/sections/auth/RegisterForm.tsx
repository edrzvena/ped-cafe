import React, { useState } from 'react';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { signUp } from '../../api/auth';
import { useNavigate } from 'react-router-dom';

export const RegisterForm = ({ onToggle }: { onToggle: () => void }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = await signUp(email, password, fullName);

      if (data.user && !data.session) {
        setIsSubmitted(true);
      } else {
        navigate('/');
      }
    } catch (error: any) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="text-center space-y-4 p-4 bg-primary/5 rounded-2xl border border-primary/10">
        <div className="text-4xl">📧</div>
        <h2 className="text-xl font-bold text-primary">Check your email!</h2>
        <p className="text-sm text-primary/60">
          We've sent a confirmation link to <span className="font-bold text-primary">{email}</span>.
          Please click the link to activate your account.
        </p>
        <Button variant="outline" fullWidth onClick={onToggle}>
          Back to Login
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        label="Full Name"
        type="text"
        placeholder="John Doe"
        value={fullName}
        onChange={(e) => setFullName(e.target.value)}
        required
      />
      <Input
        label="Email"
        type="email"
        placeholder="your@email.com"
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
      <Button type="submit" fullWidth isLoading={loading}>
        Create Account
      </Button>
      <p className="text-center text-sm text-gray-500">
        Already have an account?{' '}
        <button type="button" onClick={onToggle} className="text-orange-500 font-semibold">
          Sign In
        </button>
      </p>
    </form>
  );
};
