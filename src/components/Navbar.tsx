import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, Menu, X, ChevronDown, Sparkles, Heart, Zap, Search } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { useCart } from '../CartContext';
import { motion, AnimatePresence } from 'motion/react';
import { PRODUCTS, CATEGORIES } from '../constants';
import { cn } from '../utils';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isProductsOpen, setIsProductsOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const searchRef = useRef<HTMLDivElement>(null);
  const { items } = useCart();
  const location = useLocation();

  const cartCount = items.reduce((acc, item) => acc + item.quantity, 0);

  const filteredProducts = searchQuery.trim() === '' 
    ? [] 
    : PRODUCTS.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase())).slice(0, 5);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsSearchOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    setIsSearchOpen(false);
    setSearchQuery('');
    setIsOpen(false);
  }, [location]);

  const getCategoryIcon = (id: string) => {
    switch (id) {
      case 'salud-bienestar': return <Sparkles className="w-4 h-4 text-emerald-600" />;
      case 'belleza-integral': return <Heart className="w-4 h-4 text-rose-600" />;
      case 'salud-sexual': return <Zap className="w-4 h-4 text-purple-600" />;
      default: return null;
    }
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-28 items-center">
          <Link to="/" className="flex items-center gap-3 group shrink-0">
            <img 
              src="/assets/logo/logo.png" 
              alt="zenhogar Logo" 
              className="h-20 sm:h-24 w-auto object-contain"
              referrerPolicy="no-referrer"
            />
            <span className="text-xl sm:text-2xl font-bold text-[var(--color-brand-primary)] tracking-tight hidden xs:block">zenhogar</span>
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-4 lg:gap-8">
            {/* Categories Links */}
            <div className="flex items-center gap-4 lg:gap-6">
              {CATEGORIES.map((category) => (
                <Link
                  key={category.id}
                  to={`/categoria/${category.id}`}
                  className="text-sm font-semibold text-stone-600 hover:text-stone-900 transition-colors flex items-center gap-1.5"
                >
                  {getCategoryIcon(category.id)}
                  {category.name}
                </Link>
              ))}
            </div>

            <div className="h-6 w-px bg-stone-200 mx-2" />

            {/* Search Button Desktop */}
            <div className="relative" ref={searchRef}>
              <button 
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="p-2 text-stone-600 hover:text-emerald-600 transition-colors"
                aria-label="Buscar productos"
              >
                <Search className="w-5 h-5" />
              </button>
              
              <AnimatePresence>
                {isSearchOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className="absolute top-full right-0 mt-2 w-80 bg-white border border-stone-200 rounded-2xl shadow-2xl p-4"
                  >
                    <div className="relative mb-4">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
                      <input
                        autoFocus
                        type="text"
                        placeholder="Buscar productos..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 bg-stone-100 border-none rounded-xl text-sm focus:ring-2 focus:ring-emerald-500 outline-none"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      {filteredProducts.length > 0 ? (
                        filteredProducts.map(product => (
                          <Link
                            key={product.id}
                            to={`/producto/${product.id}`}
                            className="flex items-center gap-3 p-2 hover:bg-stone-50 rounded-xl transition-colors group"
                          >
                            <div className="w-10 h-10 rounded-lg bg-stone-100 flex-shrink-0 overflow-hidden">
                              <img 
                                src={product.image || null} 
                                alt={product.name} 
                                className="w-full h-full object-contain"
                                referrerPolicy="no-referrer"
                              />
                            </div>
                            <div className="flex-grow min-w-0">
                              <p className="text-sm font-bold text-stone-900 truncate font-display">
                                {product.name}
                              </p>
                              <p className="text-xs text-stone-500 truncate">{product.shortDescription}</p>
                            </div>
                          </Link>
                        ))
                      ) : searchQuery.trim() !== '' ? (
                        <p className="text-center py-4 text-sm text-stone-500">No se encontraron productos</p>
                      ) : (
                        <p className="text-center py-4 text-sm text-stone-400 italic">Escribe para buscar...</p>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="relative group">
              <button 
                className="flex items-center gap-1 text-stone-600 hover:text-emerald-600 font-medium transition-colors"
                aria-label="Ver lista de productos"
              >
                Productos <ChevronDown className="w-4 h-4" />
              </button>
              <div className="absolute top-full right-0 mt-2 w-64 bg-white border border-stone-200 rounded-xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 p-2 max-h-[70vh] overflow-y-auto">
                {PRODUCTS.map(product => (
                  <Link
                    key={product.id}
                    to={`/producto/${product.id}`}
                    className="block px-4 py-2.5 text-sm text-stone-600 hover:bg-emerald-50 hover:text-emerald-700 rounded-lg transition-colors font-display"
                  >
                    {product.name}
                  </Link>
                ))}
              </div>
            </div>
            <Link
              to="/checkout"
              className="relative p-2 text-stone-600 hover:text-emerald-600 transition-colors"
              aria-label="Ver carrito de compras"
            >
              <ShoppingCart className="w-6 h-6" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-emerald-600 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-white">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-1 sm:gap-2">
            <button 
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="p-2 text-stone-600 hover:text-emerald-600 transition-colors"
              aria-label="Abrir buscador"
            >
              <Search className="w-6 h-6" />
            </button>
            <Link 
              to="/checkout" 
              className="relative p-2 text-stone-600 hover:text-emerald-600 transition-colors"
              aria-label="Ver carrito"
            >
              <ShoppingCart className="w-6 h-6" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-emerald-600 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-white">
                  {cartCount}
                </span>
              )}
            </Link>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-stone-600 hover:text-emerald-600 transition-colors"
              aria-label={isOpen ? "Cerrar menú" : "Abrir menú"}
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Search Overlay */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden absolute top-full left-0 w-full bg-white border-b border-stone-200 p-4 z-40"
          >
            <div className="relative mb-4">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
              <input
                autoFocus
                type="text"
                placeholder="Buscar productos..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-10 py-3 bg-stone-100 border-none rounded-xl text-sm focus:ring-2 focus:ring-emerald-500 outline-none"
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-stone-400"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
            
            <div className="space-y-2 max-h-[60vh] overflow-y-auto">
              {filteredProducts.length > 0 ? (
                filteredProducts.map(product => (
                  <Link
                    key={product.id}
                    to={`/producto/${product.id}`}
                    className="flex items-center gap-4 p-3 hover:bg-stone-50 rounded-xl transition-colors"
                  >
                    <div className="w-12 h-12 rounded-lg bg-stone-100 flex-shrink-0 overflow-hidden">
                      <img 
                        src={product.image || null} 
                        alt={product.name} 
                        className="w-full h-full object-contain"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div className="flex-grow min-w-0">
                      <p className="text-sm font-bold text-stone-900 truncate font-display">
                        {product.name}
                      </p>
                      <p className="text-xs text-stone-500 truncate">{product.shortDescription}</p>
                    </div>
                  </Link>
                ))
              ) : searchQuery.trim() !== '' && (
                <p className="text-center py-8 text-sm text-stone-500">No se encontraron productos</p>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-b border-stone-200 overflow-hidden"
          >
            <div className="px-4 py-6 space-y-8">
              {/* Mobile Categories */}
              <div>
                <p className="text-[10px] font-black text-stone-400 uppercase tracking-[0.2em] px-2 mb-4">Categorías</p>
                <div className="grid grid-cols-1 gap-2">
                  {CATEGORIES.map((category) => (
                    <Link
                      key={category.id}
                      to={`/categoria/${category.id}`}
                      onClick={() => setIsOpen(false)}
                      className={cn(
                        "flex items-center gap-3 px-4 py-3 rounded-xl transition-colors font-bold",
                        category.color === 'emerald' && "bg-emerald-50 text-emerald-700",
                        category.color === 'rose' && "bg-rose-50 text-rose-700",
                        category.color === 'purple' && "bg-purple-50 text-purple-700"
                      )}
                    >

                      {getCategoryIcon(category.id)}
                      {category.name}
                    </Link>
                  ))}
                </div>
              </div>

              {/* Mobile Products */}
              <div>
                <button 
                  onClick={() => setIsProductsOpen(!isProductsOpen)}
                  className="w-full flex items-center justify-between text-[10px] font-black text-stone-400 uppercase tracking-[0.2em] px-2 mb-4"
                >
                  Todos los Productos
                  <ChevronDown className={cn("w-4 h-4 transition-transform", isProductsOpen && "rotate-180")} />
                </button>
                <AnimatePresence>
                  {isProductsOpen && (
                    <motion.div 
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="grid grid-cols-1 gap-1 overflow-hidden"
                    >
                      {PRODUCTS.map(product => (
                        <Link
                          key={product.id}
                          to={`/producto/${product.id}`}
                          onClick={() => setIsOpen(false)}
                          className="px-4 py-2.5 text-sm text-stone-600 hover:bg-stone-50 rounded-lg transition-colors font-display"
                        >
                          {product.name}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
