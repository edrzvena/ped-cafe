import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Menu from './pages/Menu';
import Auth from './pages/Auth';
import Cart from './pages/Cart';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import Admin from './pages/Admin';
import { AnimatePresence } from 'framer-motion';
import { CartProvider } from './lib/CartContext';
import { AuthProvider } from './lib/AuthContext';

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
        <AnimatePresence mode="wait">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/admin" element={<Admin />} />
          </Routes>
        </AnimatePresence>
      </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
