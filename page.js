"use client";

import React, { useState, useEffect } from 'react';
import { ShoppingBag, Star, Heart, Search, Menu, X, Truck, Shield, RotateCcw, Headphones, User, Mail, Lock, Eye, EyeOff, Filter, ShoppingCart } from 'lucide-react';

// Search Modal Component
const SearchModal = ({ isOpen, onClose, darkMode, searchTerm, setSearchTerm, searchResults, addToCart }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className={`w-full max-w-2xl mx-4 rounded-2xl shadow-2xl ${
        darkMode ? 'bg-neutral-800' : 'bg-white'
      }`}>
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
              Cari Produk
            </h2>
            <button onClick={onClose} className={`p-2 rounded-full hover:bg-gray-100 ${darkMode ? 'hover:bg-neutral-700' : ''}`}>
              <X className="w-5 h-5" />
            </button>
          </div>
          
          <input
            type="text"
            placeholder="Cari produk..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={`w-full p-4 rounded-xl border-2 focus:outline-none focus:border-purple-500 ${
              darkMode 
                ? 'bg-neutral-700 border-neutral-600 text-white placeholder-gray-400' 
                : 'bg-gray-50 border-gray-200 text-gray-800'
            }`}
            autoFocus
          />
          
          <div className="mt-4 max-h-96 overflow-y-auto">
            {searchResults.map(product => (
              <div key={product.id} className={`p-4 rounded-xl hover:bg-gray-50 cursor-pointer transition-colors flex items-center justify-between ${
                darkMode ? 'hover:bg-neutral-700' : 'hover:bg-gray-50'
              }`}>
                <div className="flex items-center space-x-4">
                  <div className="text-2xl">{product.image}</div>
                  <div>
                    <h3 className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                      {product.name}
                    </h3>
                    <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      {product.category} • {product.price}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => addToCart(product)}
                  className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors"
                >
                  Tambah
                </button>
              </div>
            ))}
            {searchResults.length === 0 && searchTerm && (
              <p className={`text-center py-8 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Produk tidak ditemukan
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// Enhanced Auth Modal
const EnhancedAuthModal = ({ 
  isOpen, 
  onClose, 
  darkMode, 
  isRegistering, 
  setIsRegistering,
  loginForm,
  setLoginForm,
  registerForm,
  setRegisterForm,
  onLogin,
  showPassword,
  setShowPassword
}) => {
  if (!isOpen) return null;

  const handleSubmit = () => {
    if (isRegistering) {
      if (registerForm.password !== registerForm.confirmPassword) {
        alert('Password tidak sama!');
        return;
      }
      onLogin({ name: registerForm.name, email: registerForm.email });
    } else {
      onLogin({ name: 'User', email: loginForm.email });
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className={`w-full max-w-md mx-4 rounded-2xl shadow-2xl ${
        darkMode ? 'bg-neutral-800' : 'bg-white'
      }`}>
        <div className="p-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
              {isRegistering ? 'Daftar' : 'Masuk'}
            </h2>
            <button onClick={onClose} className={`p-2 rounded-full hover:bg-gray-100 ${darkMode ? 'hover:bg-neutral-700' : ''}`}>
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="space-y-4">
            {isRegistering && (
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Nama Lengkap"
                  value={registerForm.name}
                  onChange={(e) => setRegisterForm({...registerForm, name: e.target.value})}
                  className={`w-full pl-10 pr-4 py-3 rounded-xl border focus:outline-none focus:border-purple-500 ${
                    darkMode 
                      ? 'bg-neutral-700 border-neutral-600 text-white placeholder-gray-400' 
                      : 'bg-gray-50 border-gray-200'
                  }`}
                />
              </div>
            )}

            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="email"
                placeholder="Email"
                value={isRegistering ? registerForm.email : loginForm.email}
                onChange={(e) => {
                  if (isRegistering) {
                    setRegisterForm({...registerForm, email: e.target.value});
                  } else {
                    setLoginForm({...loginForm, email: e.target.value});
                  }
                }}
                className={`w-full pl-10 pr-4 py-3 rounded-xl border focus:outline-none focus:border-purple-500 ${
                  darkMode 
                    ? 'bg-neutral-700 border-neutral-600 text-white placeholder-gray-400' 
                    : 'bg-gray-50 border-gray-200'
                }`}
              />
            </div>

            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Password"
                value={isRegistering ? registerForm.password : loginForm.password}
                onChange={(e) => {
                  if (isRegistering) {
                    setRegisterForm({...registerForm, password: e.target.value});
                  } else {
                    setLoginForm({...loginForm, password: e.target.value});
                  }
                }}
                className={`w-full pl-10 pr-12 py-3 rounded-xl border focus:outline-none focus:border-purple-500 ${
                  darkMode 
                    ? 'bg-neutral-700 border-neutral-600 text-white placeholder-gray-400' 
                    : 'bg-gray-50 border-gray-200'
                }`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>

            {isRegistering && (
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="password"
                  placeholder="Konfirmasi Password"
                  value={registerForm.confirmPassword}
                  onChange={(e) => setRegisterForm({...registerForm, confirmPassword: e.target.value})}
                  className={`w-full pl-10 pr-4 py-3 rounded-xl border focus:outline-none focus:border-purple-500 ${
                    darkMode 
                      ? 'bg-neutral-700 border-neutral-600 text-white placeholder-gray-400' 
                      : 'bg-gray-50 border-gray-200'
                  }`}
                />
              </div>
            )}

            <button
              onClick={handleSubmit}
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-xl font-bold hover:from-purple-700 hover:to-pink-700 transition-all duration-300"
            >
              {isRegistering ? 'Daftar' : 'Masuk'}
            </button>
          </div>

          <div className="mt-6 text-center">
            <button
              onClick={() => setIsRegistering(!isRegistering)}
              className="text-purple-600 hover:text-purple-700 font-medium"
            >
              {isRegistering ? 'Sudah punya akun? Masuk' : 'Belum punya akun? Daftar'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Cart Sidebar
const CartSidebar = ({ isOpen, onClose, darkMode, cart, setCart }) => {
  const removeFromCart = (index) => {
    const newCart = cart.filter((_, i) => i !== index);
    setCart(newCart);
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => {
      const price = parseInt(item.price.replace(/\D/g, ''));
      return total + price;
    }, 0);
  };

  return (
    <>
      {isOpen && <div className="fixed inset-0 bg-black/20 z-40" onClick={onClose}></div>}
      <div className={`fixed inset-y-0 right-0 z-50 w-96 transform transition-transform duration-300 ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      } ${darkMode ? 'bg-neutral-800' : 'bg-white'} shadow-2xl`}>
        <div className="h-full flex flex-col">
          <div className={`p-6 border-b ${darkMode ? 'border-neutral-700' : 'border-gray-200'}`}>
            <div className="flex items-center justify-between">
              <h2 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                Keranjang ({cart.length})
              </h2>
              <button onClick={onClose} className={`p-2 rounded-full hover:bg-gray-100 ${darkMode ? 'hover:bg-neutral-700' : ''}`}>
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-6">
            {cart.length === 0 ? (
              <div className="text-center py-8">
                <ShoppingCart className="w-16 h-16 mx-auto text-gray-400 mb-4" />
                <p className={`text-lg ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Keranjang kosong
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {cart.map((item, index) => (
                  <div key={index} className={`p-4 rounded-xl border ${
                    darkMode ? 'border-neutral-600' : 'border-gray-200'
                  }`}>
                    <div className="flex items-center space-x-4">
                      <div className="text-2xl">{item.image}</div>
                      <div className="flex-1">
                        <h3 className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                          {item.name}
                        </h3>
                        <p className="text-purple-600 font-bold">{item.price}</p>
                      </div>
                      <button
                        onClick={() => removeFromCart(index)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {cart.length > 0 && (
            <div className={`p-6 border-t ${darkMode ? 'border-neutral-700' : 'border-gray-200'}`}>
              <div className={`mb-4 text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                Total: Rp {getTotalPrice().toLocaleString()}
              </div>
              <button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-xl font-bold hover:from-purple-700 hover:to-pink-700 transition-all duration-300">
                Checkout
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

// Product Filter Sidebar
const ProductFilterSidebar = ({ darkMode, filters, setFilters }) => {
  const categories = ['Kemeja', 'Dress', 'Celana', 'Jaket', 'Kaos', 'Blazer'];
  const priceRanges = [
    { label: 'Di bawah Rp 200.000', value: '0-200000' },
    { label: 'Rp 200.000 - Rp 400.000', value: '200000-400000' },
    { label: 'Rp 400.000 - Rp 600.000', value: '400000-600000' },
    { label: 'Di atas Rp 600.000', value: '600000-999999' }
  ];

  const handleFilterChange = (key, value) => {
    setFilters({ ...filters, [key]: value });
  };

  return (
    <div className={`p-6 rounded-2xl ${darkMode ? 'bg-neutral-800' : 'bg-gray-50'}`}>
      <div className="flex items-center mb-4">
        <Filter className="w-5 h-5 mr-2" />
        <h3 className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
          Filter Produk
        </h3>
      </div>

      <div className="space-y-4">
        <div>
          <label className={`block text-sm font-medium mb-2 ${
            darkMode ? 'text-gray-300' : 'text-gray-700'
          }`}>
            Kategori
          </label>
          <select
            value={filters.category}
            onChange={(e) => handleFilterChange('category', e.target.value)}
            className={`w-full p-3 rounded-xl border focus:outline-none focus:border-purple-500 ${
              darkMode 
                ? 'bg-neutral-700 border-neutral-600 text-white' 
                : 'bg-white border-gray-200'
            }`}
          >
            <option value="">Semua Kategori</option>
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>

        <div>
          <label className={`block text-sm font-medium mb-2 ${
            darkMode ? 'text-gray-300' : 'text-gray-700'
          }`}>
            Harga
          </label>
          <select
            value={filters.priceRange}
            onChange={(e) => handleFilterChange('priceRange', e.target.value)}
            className={`w-full p-3 rounded-xl border focus:outline-none focus:border-purple-500 ${
              darkMode 
                ? 'bg-neutral-700 border-neutral-600 text-white' 
                : 'bg-white border-gray-200'
            }`}
          >
            <option value="">Semua Harga</option>
            {priceRanges.map(range => (
              <option key={range.value} value={range.value}>{range.label}</option>
            ))}
          </select>
        </div>

        <div>
          <label className={`block text-sm font-medium mb-2 ${
            darkMode ? 'text-gray-300' : 'text-gray-700'
          }`}>
            Rating Minimum
          </label>
          <select
            value={filters.rating}
            onChange={(e) => handleFilterChange('rating', e.target.value)}
            className={`w-full p-3 rounded-xl border focus:outline-none focus:border-purple-500 ${
              darkMode 
                ? 'bg-neutral-700 border-neutral-600 text-white' 
                : 'bg-white border-gray-200'
            }`}
          >
            <option value="">Semua Rating</option>
            <option value="4.5">4.5+ ⭐</option>
            <option value="4.0">4.0+ ⭐</option>
            <option value="3.5">3.5+ ⭐</option>
          </select>
        </div>

        <button
          onClick={() => setFilters({ category: '', priceRange: '', rating: '' })}
          className={`w-full mt-4 py-2 px-4 rounded-xl border transition-colors ${
            darkMode 
              ? 'border-neutral-600 hover:bg-neutral-700' 
              : 'border-gray-300 hover:bg-gray-50'
          }`}
        >
          Reset Filter
        </button>
      </div>
    </div>
  );
};

// Toast Notification
const Toast = ({ message, type, onClose }) => {
  const bgColor = type === 'success' ? 'bg-green-500' : type === 'error' ? 'bg-red-500' : 'bg-blue-500';
  
  return (
    <div className={`fixed top-20 right-4 z-50 ${bgColor} text-white px-6 py-4 rounded-xl shadow-2xl animate-pulse`}>
      <div className="flex items-center justify-between">
        <span>{message}</span>
        <button onClick={onClose} className="ml-4">
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

// Enhanced User Profile Section
const UserProfileSection = ({ isLoggedIn, user, onLogout, darkMode }) => {
  if (!isLoggedIn) return null;

  return (
    <div className="flex items-center space-x-2">
      <div className={`w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold`}>
        {user?.name?.charAt(0) || 'U'}
      </div>
      <span className={`hidden md:block ${darkMode ? 'text-white' : 'text-gray-800'}`}>
        {user?.name || 'User'}
      </span>
      <button
        onClick={onLogout}
        className={`text-sm px-3 py-1 rounded-full border transition-colors ${
          darkMode 
            ? 'border-neutral-600 hover:bg-neutral-700' 
            : 'border-gray-300 hover:bg-gray-100'
        }`}
      >
        Logout
      </button>
    </div>
  );
};

const UnikloWebsite = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [favorites, setFavorites] = useState([]);
  const [cart, setCart] = useState([]);
  const [darkMode, setDarkMode] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [loginForm, setLoginForm] = useState({
    email: '',
    password: ''
  });
  const [registerForm, setRegisterForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [isRegistering, setIsRegistering] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showSearchModal, setShowSearchModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [showCartSidebar, setShowCartSidebar] = useState(false);
  const [filters, setFilters] = useState({
    category: '',
    priceRange: '',
    rating: ''
  });
  const [toast, setToast] = useState(null);

  const heroSlides = [
    {
      title: "Koleksi Musim Panas 2025",
      subtitle: "Fashion Tropis untuk Gaya Hidup Aktif",
      image: "🌴",
      color: "from-orange-400 to-pink-400"
    },
    {
      title: "Gaya Kasual Premium",
      subtitle: "Kenyamanan Bertemu Elegans",
      image: "👔",
      color: "from-blue-500 to-purple-600"
    },
    {
      title: "Limited Edition",
      subtitle: "Koleksi Eksklusif Hanya di Uniklo",
      image: "✨",
      color: "from-purple-500 to-pink-500"
    }
  ];

  const products = [
    {
      id: 1,
      name: "Kemeja Linen Premium",
      price: "Rp 299.000",
      originalPrice: "Rp 399.000",
      image: "👔",
      category: "Kemeja",
      rating: 4.8,
      colors: ["Putih", "Biru", "Khaki"],
      sizes: ["S", "M", "L", "XL"],
      isNew: true,
      discount: 25
    },
    {
      id: 2,
      name: "Dress Floral Musim Panas",
      price: "Rp 349.000",
      originalPrice: "Rp 449.000",
      image: "👗",
      category: "Dress",
      rating: 4.9,
      colors: ["Merah", "Kuning", "Biru"],
      sizes: ["S", "M", "L"],
      isNew: true,
      discount: 22
    },
    {
      id: 3,
      name: "Celana Chino Slim Fit",
      price: "Rp 279.000",
      image: "👖",
      category: "Celana",
      rating: 4.7,
      colors: ["Navy", "Khaki", "Hitam"],
      sizes: ["28", "30", "32", "34"],
      isNew: false
    },
    {
      id: 4,
      name: "Jaket Bomber Vintage",
      price: "Rp 449.000",
      originalPrice: "Rp 599.000",
      image: "🧥",
      category: "Jaket",
      rating: 4.8,
      colors: ["Hitam", "Army", "Navy"],
      sizes: ["S", "M", "L", "XL"],
      isNew: true,
      discount: 25
    },
    {
      id: 5,
      name: "T-Shirt Organic Cotton",
      price: "Rp 149.000",
      image: "👕",
      category: "Kaos",
      rating: 4.6,
      colors: ["Putih", "Hitam", "Grey", "Navy"],
      sizes: ["S", "M", "L", "XL", "XXL"],
      isNew: false
    },
    {
      id: 6,
      name: "Blazer Formal Modern",
      price: "Rp 699.000",
      originalPrice: "Rp 899.000",
      image: "🥋",
      category: "Blazer",
      rating: 4.9,
      colors: ["Navy", "Charcoal", "Black"],
      sizes: ["S", "M", "L", "XL"],
      isNew: true,
      discount: 22
    }
  ];

  const categories = [
    { name: "Kemeja", icon: "👔", count: 45 },
    { name: "Dress", icon: "👗", count: 32 },
    { name: "Celana", icon: "👖", count: 28 },
    { name: "Jaket", icon: "🧥", count: 24 },
    { name: "Kaos", icon: "👕", count: 67 },
    { name: "Aksesoris", icon: "👜", count: 38 }
  ];

  const features = [
    {
      icon: <Truck className="w-8 h-8" />,
      title: "Gratis Ongkir",
      description: "Gratis ongkos kirim untuk pembelian di atas Rp 200.000"
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Garansi Kualitas",
      description: "Jaminan kualitas produk original dengan garansi 30 hari"
    },
    {
      icon: <RotateCcw className="w-8 h-8" />,
      title: "Easy Return",
      description: "Kemudahan pengembalian barang dalam 14 hari"
    },
    {
      icon: <Headphones className="w-8 h-8" />,
      title: "24/7 Support",
      description: "Customer service siap membantu Anda kapan saja"
    }
  ];

  // Filter products based on search and filters
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.category.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = !filters.category || product.category === filters.category;
    
    const matchesPrice = !filters.priceRange || (() => {
      const [min, max] = filters.priceRange.split('-').map(Number);
      const productPrice = parseInt(product.price.replace(/\D/g, ''));
      return productPrice >= min && productPrice <= max;
    })();
    
    const matchesRating = !filters.rating || product.rating >= parseFloat(filters.rating);
    
    return matchesSearch && matchesCategory && matchesPrice && matchesRating;
  });

  const searchResults = searchTerm ? filteredProducts : [];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const toggleFavorite = (productId) => {
    setFavorites(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const addToCart = (product) => {
    setCart(prev => [...prev, product]);
    setToast({ message: `${product.name} ditambahkan ke keranjang!`, type: 'success' });
    setTimeout(() => setToast(null), 3000);
  };

  const toggleDarkMode = () => {
    setDarkMode(prev => !prev);
  };

  const handleLogin = (userData) => {
    setUser(userData);
    setIsLoggedIn(true);
    setShowLoginModal(false);
    setToast({ message: `Selamat datang, ${userData.name}!`, type: 'success' });
    setTimeout(() => setToast(null), 3000);
  };

  const handleLogout = () => {
    setUser(null);
    setIsLoggedIn(false);
    setToast({ message: 'Berhasil logout!', type: 'success' });
    setTimeout(() => setToast(null), 3000);
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'dark bg-neutral-900 text-white' : 'bg-white text-gray-800'}`}>
      {/* Header */}
      <header className={`fixed top-0 w-full backdrop-blur-md shadow-lg z-50 border-b transition-colors duration-300 ${
        darkMode 
          ? 'bg-neutral-900/95 border-gray-700' 
          : 'bg-white/95 border-gray-200'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Uniklo
              </h1>
              <button
                onClick={toggleDarkMode}
                className={`p-2 rounded-lg transition-colors duration-300 ${
                  darkMode 
                    ? 'hover:bg-gray-700 text-yellow-400' 
                    : 'hover:bg-gray-200 text-gray-600'
                }`}
                title="Ganti Tema"
              >
                {darkMode ? "🌙" : "☀️"}
              </button>
            </div>
            
            <nav className="hidden md:flex space-x-8">
              {['Beranda', 'Produk', 'Kategori', 'Tentang', 'Kontak'].map((item) => (
                <a 
                  key={item}
                  href={`#${item.toLowerCase()}`} 
                  className={`hover:text-purple-600 transition-colors font-medium ${
                    darkMode ? 'text-gray-200' : 'text-gray-800'
                  }`}
                >
                  {item}
                </a>
              ))}
            </nav>

            <div className="flex items-center space-x-4">
              <Search 
                className={`w-5 h-5 cursor-pointer hover:text-purple-600 transition-colors ${
                  darkMode ? 'text-gray-400' : 'text-gray-600'
                }`}
                onClick={() => setShowSearchModal(true)}
              />
              <div className="relative">
                <Heart className={`w-5 h-5 cursor-pointer hover:text-purple-600 transition-colors ${
                  darkMode ? 'text-gray-400' : 'text-gray-600'
                }`} />
                {favorites.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-pink-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                    {favorites.length}
                  </span>
                )}
              </div>
              <div className="relative">
                <ShoppingBag 
                  className={`w-5 h-5 cursor-pointer hover:text-purple-600 transition-colors ${
                    darkMode ? 'text-gray-400' : 'text-gray-600'
                  }`}
                  onClick={() => setShowCartSidebar(true)}
                />
                {cart.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-purple-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                    {cart.length}
                  </span>
                )}
              </div>
              
              {isLoggedIn ? (
                <UserProfileSection 
                  isLoggedIn={isLoggedIn}
                  user={user}
                  onLogout={handleLogout}
                  darkMode={darkMode}
                />
              ) : (
                <button
                  onClick={() => setShowLoginModal(true)}
                  className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-300"
                >
                  Masuk
                </button>
              )}
              
              <button 
                className={`md:hidden ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className={`fixed inset-0 z-40 pt-16 md:hidden transition-colors duration-300 ${
          darkMode ? 'bg-neutral-900' : 'bg-white'
        }`}>
          <nav className="flex flex-col space-y-4 p-6">
            {['Beranda', 'Produk', 'Kategori', 'Tentang', 'Kontak'].map((item) => (
              <a 
                key={item}
                href={`#${item.toLowerCase()}`} 
                className={`text-lg font-medium hover:text-purple-600 transition-colors ${
                  darkMode ? 'text-gray-200' : 'text-gray-800'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {item}
              </a>
            ))}
          </nav>
        </div>
      )}

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center pt-16">
        <div className={`absolute inset-0 bg-gradient-to-br ${heroSlides[currentSlide].color} transition-all duration-1000`}>
          <div className="absolute inset-0 bg-black/20"></div>
        </div>
        <div className="relative z-10 h-full flex items-center justify-center text-center text-white">
          <div className="max-w-4xl mx-auto px-4">
            <div className="text-8xl mb-6 animate-bounce">
              {heroSlides[currentSlide].image}
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-pulse">
              {heroSlides[currentSlide].title}
            </h1>
            <p className="text-xl md:text-2xl mb-8 opacity-90">
              {heroSlides[currentSlide].subtitle}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-purple-600 px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-2xl">
                Belanja Sekarang
              </button>
              <button className="border-2 border-white text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white hover:text-purple-600 transition-all duration-300 transform hover:scale-105">
                Lihat Koleksi
              </button>
            </div>
          </div>
        </div>
        
        {/* Slide Indicators */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentSlide ? 'bg-white scale-125' : 'bg-white/50 hover:bg-white/75'
              }`}
              onClick={() => setCurrentSlide(index)}
            />
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className={`py-20 transition-colors duration-300 ${
        darkMode ? 'bg-neutral-800' : 'bg-gray-50'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center group">
                <div className="bg-gradient-to-br from-purple-500 to-pink-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <div className="text-white">
                    {feature.icon}
                  </div>
                </div>
                <h3 className={`text-xl font-bold mb-2 ${
                  darkMode ? 'text-white' : 'text-gray-800'
                }`}>{feature.title}</h3>
                <p className={`${
                  darkMode ? 'text-gray-300' : 'text-gray-600'
                }`}>{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section id="kategori" className={`py-20 transition-colors duration-300 ${
        darkMode ? 'bg-neutral-900' : 'bg-white'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className={`text-4xl font-bold mb-4 ${
              darkMode ? 'text-white' : 'text-gray-800'
            }`}>Kategori Produk</h2>
            <p className={`text-xl ${
              darkMode ? 'text-gray-300' : 'text-gray-600'
            }`}>Temukan produk favorit Anda berdasarkan kategori</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {categories.map((category, index) => (
              <div 
                key={index} 
                className={`p-6 rounded-2xl text-center hover:shadow-xl transition-all duration-300 transform hover:scale-105 cursor-pointer border ${
                  darkMode 
                    ? 'bg-gradient-to-br from-neutral-800 to-neutral-700 border-neutral-600 hover:border-purple-500' 
                    : 'bg-gradient-to-br from-purple-50 to-pink-50 border-purple-100'
                }`}
                onClick={() => setFilters({...filters, category: category.name})}
              >
                <div className="text-4xl mb-3">{category.icon}</div>
                <h3 className={`font-bold mb-1 ${
                  darkMode ? 'text-white' : 'text-gray-800'
                }`}>{category.name}</h3>
                <p className={`text-sm ${
                  darkMode ? 'text-gray-400' : 'text-gray-600'
                }`}>{category.count} produk</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section id="produk" className={`py-20 transition-colors duration-300 ${
        darkMode ? 'bg-neutral-800' : 'bg-gray-50'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className={`text-4xl font-bold mb-4 ${
              darkMode ? 'text-white' : 'text-gray-800'
            }`}>Produk Terbaru</h2>
            <p className={`text-xl ${
              darkMode ? 'text-gray-300' : 'text-gray-600'
            }`}>Koleksi fashion terbaru dengan kualitas premium</p>
          </div>
          
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Filter Sidebar */}
            <div className="lg:w-1/4">
              <ProductFilterSidebar 
                darkMode={darkMode}
                filters={filters}
                setFilters={setFilters}
              />
            </div>
            
            {/* Products Grid */}
            <div className="lg:w-3/4">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredProducts.map((product) => (
                  <div key={product.id} className={`rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:scale-105 group ${
                    darkMode ? 'bg-neutral-700' : 'bg-white'
                  }`}>
                    <div className={`relative p-8 ${
                      darkMode ? 'bg-gradient-to-br from-neutral-600 to-neutral-700' : 'bg-gradient-to-br from-gray-50 to-gray-100'
                    }`}>
                      <div className="text-6xl text-center mb-4">{product.image}</div>
                      {product.isNew && (
                        <span className="absolute top-4 left-4 bg-gradient-to-r from-green-400 to-green-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                          BARU
                        </span>
                      )}
                      {product.discount && (
                        <span className="absolute top-4 right-4 bg-gradient-to-r from-red-400 to-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                          -{product.discount}%
                        </span>
                      )}
                      <button
                        onClick={() => toggleFavorite(product.id)}
                        className={`absolute top-4 right-16 p-2 rounded-full shadow-md hover:shadow-lg transition-all duration-300 ${
                          darkMode ? 'bg-neutral-600' : 'bg-white'
                        }`}
                      >
                        <Heart 
                          className={`w-5 h-5 ${
                            favorites.includes(product.id) 
                              ? 'text-red-500 fill-current' 
                              : darkMode ? 'text-gray-300' : 'text-gray-400'
                          }`} 
                        />
                      </button>
                    </div>
                    <div className="p-6">
                      <div className="flex items-center mb-2">
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${
                                i < Math.floor(product.rating)
                                  ? 'text-yellow-400 fill-current'
                                  : darkMode ? 'text-gray-500' : 'text-gray-300'
                              }`}
                            />
                          ))}
                        </div>
                        <span className={`text-sm ml-2 ${
                          darkMode ? 'text-gray-400' : 'text-gray-600'
                        }`}>({product.rating})</span>
                      </div>
                      <h3 className={`text-xl font-bold mb-2 group-hover:text-purple-600 transition-colors ${
                        darkMode ? 'text-white' : 'text-gray-800'
                      }`}>
                        {product.name}
                      </h3>
                      <p className={`text-sm mb-3 ${
                        darkMode ? 'text-gray-400' : 'text-gray-500'
                      }`}>{product.category}</p>
                      <div className="flex items-center mb-4">
                        <span className="text-2xl font-bold text-purple-600">{product.price}</span>
                        {product.originalPrice && (
                          <span className={`text-lg line-through ml-2 ${
                            darkMode ? 'text-gray-500' : 'text-gray-400'
                          }`}>{product.originalPrice}</span>
                        )}
                      </div>
                      <div className="mb-4">
                        <p className={`text-sm mb-2 ${
                          darkMode ? 'text-gray-400' : 'text-gray-600'
                        }`}>Warna:</p>
                        <div className="flex gap-2 flex-wrap">
                          {product.colors.map((color, index) => (
                            <span key={index} className={`text-xs px-2 py-1 rounded-full ${
                              darkMode ? 'bg-neutral-600 text-gray-300' : 'bg-gray-100 text-gray-700'
                            }`}>
                              {color}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="mb-6">
                        <p className={`text-sm mb-2 ${
                          darkMode ? 'text-gray-400' : 'text-gray-600'
                        }`}>Ukuran:</p>
                        <div className="flex gap-2 flex-wrap">
                          {product.sizes.map((size, index) => (
                            <span key={index} className={`text-xs px-2 py-1 rounded border ${
                              darkMode 
                                ? 'border-neutral-500 text-gray-300' 
                                : 'border-gray-300 text-gray-700'
                            }`}>
                              {size}
                            </span>
                          ))}
                        </div>
                      </div>
                      <button
                        onClick={() => addToCart(product)}
                        className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-full font-bold hover:from-purple-700 hover:to-pink-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
                      >
                        Tambah ke Keranjang
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              
              {filteredProducts.length === 0 && (
                <div className="text-center py-16">
                  <div className="text-6xl mb-4">🔍</div>
                  <h3 className={`text-2xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                    Produk tidak ditemukan
                  </h3>
                  <p className={`text-lg ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    Coba ubah filter atau kata kunci pencarian
                  </p>
                  <button
                    onClick={() => {
                      setFilters({ category: '', priceRange: '', rating: '' });
                      setSearchTerm('');
                    }}
                    className="mt-4 bg-purple-600 text-white px-6 py-3 rounded-full hover:bg-purple-700 transition-colors"
                  >
                    Reset Pencarian
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="tentang" className={`py-20 transition-colors duration-300 ${
        darkMode ? 'bg-neutral-900' : 'bg-white'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className={`text-4xl font-bold mb-6 ${
                darkMode ? 'text-white' : 'text-gray-800'
              }`}>Tentang Uniklo</h2>
              <p className={`text-lg mb-6 ${
                darkMode ? 'text-gray-300' : 'text-gray-600'
              }`}>
                Uniklo adalah destinasi fashion terdepan yang menghadirkan koleksi pakaian berkualitas tinggi dengan desain modern dan harga terjangkau. Sejak didirikan, kami berkomitmen untuk memberikan pengalaman berbelanja yang menyenangkan dan produk fashion yang mengikuti tren terkini.
              </p>
              <p className={`text-lg mb-8 ${
                darkMode ? 'text-gray-300' : 'text-gray-600'
              }`}>
                Dengan fokus pada kualitas bahan, kenyamanan, dan gaya yang timeless, setiap produk Uniklo dirancang untuk memenuhi kebutuhan fashion sehari-hari hingga acara spesial Anda.
              </p>
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-600 mb-2">500+</div>
                  <div className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Produk Tersedia</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-600 mb-2">10K+</div>
                  <div className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Pelanggan Puas</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-600 mb-2">5</div>
                  <div className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Tahun Pengalaman</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-600 mb-2">50+</div>
                  <div className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Kota Jangkauan</div>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-br from-purple-400 to-pink-400 rounded-2xl p-8 text-center text-white transform rotate-3 hover:rotate-0 transition-transform duration-300">
                <div className="text-6xl mb-4">👨‍💼👩‍💼</div>
                <h3 className="text-2xl font-bold mb-4">Tim Professional</h3>
                <p className="text-lg opacity-90">
                  Tim ahli fashion kami selalu siap membantu Anda menemukan gaya yang sempurna
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className={`py-16 transition-colors duration-300 ${
        darkMode ? 'bg-black' : 'bg-gray-900'
      } text-white`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Uniklo
              </h3>
              <p className="text-gray-400 mb-4">
                Fashion berkualitas dengan harga terjangkau untuk gaya hidup modern Anda.
              </p>
              <div className="text-2xl space-x-2">
                <span>📍</span>
                <span>📞</span>
                <span>📧</span>
                <span>📱</span>
              </div>
            </div>
            <div>
              <h4 className="text-lg font-bold mb-4">Bantuan</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">FAQ</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Panduan Ukuran</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Cara Pemesanan</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Pengembalian</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-bold mb-4">Perusahaan</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Tentang Kami</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Karir</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Press</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Kontak</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-bold mb-4">Newsletter</h4>
              <p className="text-gray-400 mb-4">
                Dapatkan update produk terbaru dan promo menarik
              </p>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Email Anda"
                  className={`flex-1 px-4 py-2 rounded-l-full border focus:outline-none focus:border-purple-500 ${
                    darkMode 
                      ? 'bg-neutral-800 border-neutral-600 text-white placeholder-gray-400' 
                      : 'bg-gray-800 border-gray-700 text-white'
                  }`}
                />
                <button className="bg-gradient-to-r from-purple-600 to-pink-600 px-6 py-2 rounded-r-full hover:from-purple-700 hover:to-pink-700 transition-all duration-300">
                  ✉️
                </button>
              </div>
            </div>
          </div>
          <div className={`border-t mt-12 pt-8 text-center text-gray-400 ${
            darkMode ? 'border-neutral-700' : 'border-gray-800'
          }`}>
            <p>&copy; 2025 Uniklo. Semua hak dilindungi. | Dibuat dengan ❤️ di Indonesia</p>
          </div>
        </div>
      </footer>

      {/* Modals and Sidebars */}
      <SearchModal
        isOpen={showSearchModal}
        onClose={() => setShowSearchModal(false)}
        darkMode={darkMode}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        searchResults={searchResults}
        addToCart={addToCart}
      />

      <EnhancedAuthModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        darkMode={darkMode}
        isRegistering={isRegistering}
        setIsRegistering={setIsRegistering}
        loginForm={loginForm}
        setLoginForm={setLoginForm}
        registerForm={registerForm}
        setRegisterForm={setRegisterForm}
        onLogin={handleLogin}
        showPassword={showPassword}
        setShowPassword={setShowPassword}
      />

      <CartSidebar
        isOpen={showCartSidebar}
        onClose={() => setShowCartSidebar(false)}
        darkMode={darkMode}
        cart={cart}
        setCart={setCart}
      />

      {/* Toast Notification */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
};

export default UnikloWebsite;