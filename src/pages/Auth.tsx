import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '../components/ui/Card';
import { Coffee, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { LoginForm } from '../sections/auth/LoginForm';
import { RegisterForm } from '../sections/auth/RegisterForm';
import { ForgotPasswordForm } from '../sections/auth/ForgotPasswordForm';

type AuthView = 'login' | 'register' | 'forgot-password';

const Auth: React.FC = () => {
  const [view, setView] = useState<AuthView>('login');

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full bg-primary/5 -z-10" />
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
        className="absolute -top-40 -right-40 text-primary/5 opacity-20"
      >
        <Coffee size={600} />
      </motion.div>

      <Link to="/" className="absolute top-8 left-8 flex items-center gap-2 text-primary/60 hover:text-primary transition-colors">
        <ArrowLeft className="w-5 h-5" />
        <span className="font-bold">Back to Home</span>
      </Link>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <Card className="p-10 space-y-8">
          {view !== 'forgot-password' && (
            <div className="text-center space-y-2">
              <div className="bg-primary w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl shadow-primary/20">
                <Coffee className="text-accent w-8 h-8" />
              </div>
              <h1 className="text-3xl font-black text-primary">
                {view === 'login' ? 'Welcome Back!' : 'Create Account'}
              </h1>
              <p className="text-primary/50">
                {view === 'login' ? 'Sign in to continue your coffee journey' : 'Join our coffee community today'}
              </p>
            </div>
          )}

          <AnimatePresence mode="wait">
            <motion.div
              key={view}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.2 }}
            >
              {view === 'login' && (
                <div className="space-y-4">
                  <LoginForm onToggle={() => setView('register')} />
                  <div className="text-center">
                    <button
                      onClick={() => setView('forgot-password')}
                      className="text-sm font-semibold text-primary/40 hover:text-orange-500 transition-colors"
                    >
                      Forgot Password?
                    </button>
                  </div>
                </div>
              )}
              
              {view === 'register' && (
                <RegisterForm onToggle={() => setView('login')} />
              )}

              {view === 'forgot-password' && (
                <ForgotPasswordForm onBack={() => setView('login')} />
              )}
            </motion.div>
          </AnimatePresence>
        </Card>
      </motion.div>
    </div>
  );
};

export default Auth;
