import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, Menu, X, ChevronDown, Sparkles, Heart, Zap, Search, Activity, Shield, Gauge, Check } from 'lucide-react';
import React, { useState, useEffect, useRef } from 'react';
import { useCart } from '../CartContext';
import { motion, AnimatePresence } from 'motion/react';
import { CATEGORIES, PROMOTIONS, COMBO_OF_THE_MONTH } from '../constants';
import { cn } from '../utils';

const SYMPTOMS = [
  { id: 'digestiva', label: 'Digestión', icon: Activity, color: 'text-emerald-600', bg: 'bg-emerald-50', border: 'border-emerald-100', link: '/categoria/salud-bienestar' },
  { id: 'defensas', label: 'Defensas', icon: Shield, color: 'text-blue-600', bg: 'bg-blue-50', border: 'border-blue-100', link: '/categoria/salud-bienestar' },
  { id: 'energia', label: 'Energía', icon: Zap, color: 'text-orange-600', bg: 'bg-orange-50', border: 'border-orange-100', link: '/categoria/salud-bienestar' },
  { id: 'hormonal', label: 'Vitalidad', icon: Heart, color: 'text-rose-600', bg: 'bg-rose-50', border: 'border-rose-100', link: '/categoria/salud-bienestar' },
  { id: 'peso', label: 'Control Peso', icon: Gauge, color: 'text-purple-600', bg: 'bg-purple-50', border: 'border-purple-100', link: '/categoria/quemadores' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isCountryOpen, setIsCountryOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const searchRef = useRef<HTMLDivElement>(null);
  const countryRef = useRef<HTMLDivElement>(null);
  const { items, country, setCountry, getProducts, getCategories } = useCart();
  const location = useLocation();

  const cartCount = items.reduce((acc, item) => acc + item.quantity, 0);
  const currentProducts = getProducts();
  const currentCategories = getCategories();

  const searchableItems = React.useMemo(() => [
    ...currentProducts.map(p => ({ ...p, searchType: 'product' as const })),
    ...PROMOTIONS.map(p => ({ ...p, searchType: 'combo' as const })),
    { ...COMBO_OF_THE_MONTH, searchType: 'combo' as const }
  ], [currentProducts]);

  const normalize = (text: string) => {
    if (!text) return '';
    return text
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/ñ/g, 'n')
      .trim();
  };

  const searchResults = searchQuery.trim() === '' 
    ? [] 
    : searchableItems.filter(item => {
        const query = normalize(searchQuery);
        
        const nameMatch = normalize(item.name).includes(query);
        const descMatch = normalize(item.description).includes(query);
        const shortDescMatch = 'shortDescription' in item && normalize(item.shortDescription || '').includes(query);
        const keywordsMatch = normalize(item.keywords || '').includes(query);
        const componentsMatch = 'components' in item && normalize(item.components || '').includes(query);
        const longTailMatch = item.longTailKeywords?.some(kw => normalize(kw).includes(query));
        const benefitsMatch = item.benefits?.some(b => normalize(b).includes(query));

        return nameMatch || descMatch || shortDescMatch || keywordsMatch || componentsMatch || longTailMatch || benefitsMatch;
      }).slice(0, 6);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsSearchOpen(false);
      }
      if (countryRef.current && !countryRef.current.contains(event.target as Node)) {
        setIsCountryOpen(false);
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
    const category = CATEGORIES.find(c => c.id === id);
    if (category?.image) {
      return (
        <div className="w-6 h-6 md:w-8 md:h-8 rounded-full overflow-hidden border border-stone-200 bg-white shrink-0 shadow-sm group-hover:scale-110 transition-transform">
          <img src={category.image} alt="" className="w-full h-full object-cover" />
        </div>
      );
    }
    switch (id) {
      case 'salud-bienestar': return <Sparkles className="w-5 h-5 md:w-6 md:h-6 text-emerald-600 shrink-0" />;
      case 'belleza-integral': return <Heart className="w-5 h-5 md:w-6 md:h-6 text-rose-600 shrink-0" />;
      case 'salud-sexual': return <Zap className="w-5 h-5 md:w-6 md:h-6 text-purple-600 shrink-0" />;
      default: return null;
    }
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 md:h-24 items-center">
          <div className="flex items-center gap-1 sm:gap-2 md:gap-4 lg:gap-6 shrink-0 -ml-2">
            {/* Mobile Menu Button - Moved to Left */}
            <button
              onClick={() => {
                setIsOpen(!isOpen);
                setIsSearchOpen(false);
              }}
              className="md:hidden p-1 sm:p-2 text-stone-600 hover:text-emerald-600 transition-colors"
              aria-label={isOpen ? "Cerrar menú" : "Abrir menú"}
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

            <Link to="/" className="flex items-center gap-1.5 sm:gap-2 group shrink-0 -ml-1">
              <div className="relative w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 flex-shrink-0">
                  <img 
                    src="/assets/logo/logo-icon.webp" 
                    alt="Zen Hogar Icon" 
                    className="w-full h-full object-contain"
                    referrerPolicy="no-referrer"
                    loading="eager"
                    fetchPriority="high"
                    decoding="async"
                    width="64"
                    height="64"
                  />
              </div>
              <div className="flex flex-col leading-none">
                <span className="text-base sm:text-lg md:text-xl font-black text-stone-900 tracking-tighter uppercase whitespace-nowrap">Zen Hogar</span>
                <span className="text-[8px] sm:text-[9px] md:text-[11px] font-bold text-emerald-600 tracking-[0.2em] uppercase whitespace-nowrap">Salud Vital</span>
              </div>
            </Link>

            {/* Desktop Categories (Adjacent to Logo) */}
            <div className="hidden md:flex items-center gap-2 lg:gap-4 ml-4 lg:ml-6 border-l border-stone-200 pl-4 lg:pl-6 shrink-0">
              {currentCategories.map((category) => (
                <Link
                  key={category.id}
                  to={`/categoria/${category.id}`}
                  className="text-xs lg:text-sm font-bold text-stone-600 hover:text-stone-900 transition-colors flex items-center gap-1.5 lg:gap-2 whitespace-nowrap group"
                >
                  {getCategoryIcon(category.id)}
                  <span className="hidden xl:inline">{category.name}</span>
                  <span className="xl:hidden">{category.id.split('-')[0].charAt(0).toUpperCase() + category.id.split('-')[0].slice(1)}</span>
                </Link>
              ))}
            </div>
          </div>

          {/* Desktop Right Navigation - Search, Product Dropdown & Cart */}
          <div className="hidden md:flex items-center gap-3 lg:gap-5 flex-1 justify-end ml-4 md:ml-6 lg:ml-8 min-w-0">
            {/* Search Icon Button Desktop */}
            <div className="relative" ref={searchRef}>
              <button
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="p-2 text-stone-600 hover:text-emerald-600 transition-colors rounded-full hover:bg-stone-100"
                aria-label="Buscar"
              >
                <Search className="w-5 h-5" />
              </button>

              <AnimatePresence>
                {isSearchOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className="absolute top-full right-0 mt-2 w-80 sm:w-96 bg-white border border-stone-200 rounded-2xl shadow-2xl p-4 z-50 overflow-hidden"
                  >
                    {/* Search Input inside Dropdown */}
                    <div className="relative mb-4">
                      <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
                      <input
                        type="text"
                        placeholder="¿Qué buscas?"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-8 py-2 bg-stone-100 border border-stone-200 focus:border-emerald-500 rounded-xl text-sm outline-none transition-all"
                        autoFocus
                      />
                      {searchQuery && (
                        <button 
                          onClick={() => setSearchQuery('')}
                          className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1 text-stone-400 hover:text-stone-600"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      )}
                    </div>

                    {/* Symptom Quick Filter PILLS */}
                    {searchQuery.trim() === '' && (
                      <div className="mb-4">
                        <p className="text-[10px] font-black text-stone-400 uppercase tracking-widest mb-2.5 px-1">¿Qué quieres mejorar hoy?</p>
                        <div className="grid grid-cols-2 gap-2">
                          {SYMPTOMS.map((symptom) => (
                            <Link
                              key={symptom.id}
                              to={symptom.link}
                              onClick={() => setIsSearchOpen(false)}
                              className={cn(
                                "flex items-center gap-2 px-3 py-2 rounded-xl border transition-all hover:shadow-md active:scale-95",
                                symptom.bg,
                                symptom.border
                              )}
                            >
                              <symptom.icon className={cn("w-3.5 h-3.5", symptom.color)} />
                              <span className="font-bold text-stone-900 text-[11px]">{symptom.label}</span>
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="space-y-2 max-h-[60vh] overflow-y-auto">
                      {searchQuery.trim() !== '' ? (
                        searchResults.length > 0 ? (
                          searchResults.map(item => (
                            <Link
                              key={item.id}
                              to={item.searchType === 'product' ? `/producto/${item.id}` : `/combo/${item.id}`}
                              onClick={() => setIsSearchOpen(false)}
                              className="flex items-center gap-3 p-2 hover:bg-stone-50 rounded-xl transition-colors group"
                            >
                              <div className="w-10 h-10 rounded-lg bg-stone-100 flex-shrink-0 overflow-hidden relative">
                                <img 
                                  src={item.image || null} 
                                  alt={item.name} 
                                  className="w-full h-full object-contain"
                                  referrerPolicy="no-referrer"
                                />
                                {item.searchType === 'combo' && (
                                  <div className="absolute inset-0 bg-emerald-600/10 flex items-center justify-center">
                                    <Sparkles className="w-4 h-4 text-emerald-600 opacity-50" />
                                  </div>
                                )}
                              </div>
                              <div className="flex-grow min-w-0">
                                <div className="flex items-center gap-2">
                                  <p className="text-sm font-bold text-stone-900 truncate font-display">
                                    {item.name}
                                  </p>
                                  {item.searchType === 'combo' && (
                                    <span className="text-[8px] font-black bg-emerald-100 text-emerald-700 px-1.5 py-0.5 rounded-full uppercase tracking-wider">Combo</span>
                                  )}
                                </div>
                                <p className="text-xs text-stone-500 truncate">
                                  {'shortDescription' in item ? item.shortDescription : item.description}
                                </p>
                              </div>
                            </Link>
                          ))
                        ) : (
                          <p className="text-center py-4 text-sm text-stone-500">No encontramos resultados para "{searchQuery}"</p>
                        )
                      ) : (
                        <div className="py-2">
                          <p className="text-center text-xs text-stone-400 italic">Escribe para buscar productos, ingredientes o soluciones...</p>
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Right Side Actions (Desktop) */}
            <div className="relative group shrink-0">
              <button 
                className="flex items-center gap-1.5 text-stone-600 hover:text-emerald-600 font-bold transition-colors py-2"
                aria-label="Ver lista de productos"
              >
                <span className="text-sm lg:text-[15px]">Productos</span>
                <ChevronDown className="w-4 h-4" />
              </button>

              <div className="absolute top-full right-0 mt-2 w-64 bg-white border border-stone-200 rounded-xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 p-2 max-h-[70vh] overflow-y-auto z-50">
                {currentProducts.map(product => (
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

            {/* Country Selector (Desktop) */}
            <div className="relative shrink-0" ref={countryRef}>
              <button
                onClick={() => setIsCountryOpen(!isCountryOpen)}
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-full bg-stone-100 hover:bg-stone-200/80 border border-stone-200 text-xs font-bold text-stone-800 transition-all shadow-sm"
                aria-label="Seleccionar país de envío"
              >
                <img 
                  src={country === 'EC' ? "/assets/logo/Logo-ecuador.webp" : "/assets/logo/logo-colombia.webp"} 
                  alt={country === 'EC' ? "Ecuador" : "Colombia"} 
                  className="w-4 h-3 object-cover rounded-xs shrink-0" 
                />
                <ChevronDown className="w-3.5 h-3.5 text-stone-500" />
              </button>

              <AnimatePresence>
                {isCountryOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 5, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 5, scale: 0.95 }}
                    className="absolute top-full right-0 mt-2 w-48 bg-white border border-stone-200 rounded-xl shadow-2xl p-2 z-50"
                  >
                    <p className="text-[10px] font-black text-stone-400 uppercase tracking-wider px-2 py-1">Seleccionar País</p>
                    <button
                      onClick={() => {
                        setCountry('CO');
                        setIsCountryOpen(false);
                      }}
                      className={cn(
                        "w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-bold transition-colors mb-1",
                        country === 'CO' ? "bg-emerald-50 text-emerald-800" : "hover:bg-stone-50 text-stone-700"
                      )}
                    >
                      <div className="flex items-center gap-2">
                        <img src="/assets/logo/logo-colombia.webp" alt="Colombia" className="w-4 h-3 object-cover rounded-xs shrink-0" />
                        <span>Colombia</span>
                      </div>
                      {country === 'CO' && <Check className="w-3.5 h-3.5 text-emerald-600" />}
                    </button>
                    <button
                      onClick={() => {
                        setCountry('EC');
                        setIsCountryOpen(false);
                      }}
                      className={cn(
                        "w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-bold transition-colors",
                        country === 'EC' ? "bg-emerald-50 text-emerald-800" : "hover:bg-stone-50 text-stone-700"
                      )}
                    >
                      <div className="flex items-center gap-2">
                        <img src="/assets/logo/Logo-ecuador.webp" alt="Ecuador" className="w-4 h-3 object-cover rounded-xs shrink-0" />
                        <span>Ecuador</span>
                      </div>
                      {country === 'EC' && <Check className="w-3.5 h-3.5 text-emerald-600" />}
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Link
              to="/checkout"
              className="relative p-2 text-stone-600 hover:text-emerald-600 transition-colors shrink-0"
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

          {/* Mobile Actions - Buttons on Right */}
          <div className="md:hidden flex items-center gap-1.5 shrink-0 -mr-1">
            <button
              onClick={() => {
                setIsSearchOpen(!isSearchOpen);
                setIsOpen(false);
              }}
              className="p-1.5 text-stone-600 hover:text-emerald-600 transition-colors"
              aria-label="Buscar"
            >
              <Search className="w-6 h-6" />
            </button>
            <Link 
              to="/checkout" 
              className="relative p-1.5 text-stone-600 hover:text-emerald-600 transition-colors"
              aria-label="Ver carrito"
            >
              <ShoppingCart className="w-8 h-8" />
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 bg-emerald-600 text-white text-[11px] font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-white">
                  {cartCount}
                </span>
              )}
            </Link>
            <div className="relative ml-0.5" ref={countryRef}>
              <button
                onClick={() => setIsCountryOpen(!isCountryOpen)}
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-full bg-stone-100 border border-stone-200 text-sm font-bold text-stone-800 active:scale-95 transition-transform"
                aria-label="Seleccionar país"
              >
                <img 
                  src={country === 'EC' ? "/assets/logo/Logo-ecuador.webp" : "/assets/logo/logo-colombia.webp"} 
                  alt={country === 'EC' ? "Ecuador" : "Colombia"} 
                  className="w-8 h-6 object-cover rounded-sm shrink-0" 
                />
                <ChevronDown className="w-4 h-4 text-stone-500" />
              </button>

              <AnimatePresence>
                {isCountryOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 5, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 5, scale: 0.95 }}
                    className="absolute top-full right-0 mt-2 w-44 bg-white border border-stone-200 rounded-xl shadow-2xl p-2 z-50"
                  >
                    <p className="text-[10px] font-black text-stone-400 uppercase tracking-wider px-2 py-1">País de Envío</p>
                    <button
                      onClick={() => {
                        setCountry('CO');
                        setIsCountryOpen(false);
                      }}
                      className={cn(
                        "w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-bold transition-colors mb-1",
                        country === 'CO' ? "bg-emerald-50 text-emerald-800" : "hover:bg-stone-50 text-stone-700"
                      )}
                    >
                      <div className="flex items-center gap-2">
                        <img src="/assets/logo/logo-colombia.webp" alt="Colombia" className="w-4 h-3 object-cover rounded-xs shrink-0" />
                        <span>Colombia</span>
                      </div>
                      {country === 'CO' && <Check className="w-3.5 h-3.5 text-emerald-600" />}
                    </button>
                    <button
                      onClick={() => {
                        setCountry('EC');
                        setIsCountryOpen(false);
                      }}
                      className={cn(
                        "w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-bold transition-colors",
                        country === 'EC' ? "bg-emerald-50 text-emerald-800" : "hover:bg-stone-50 text-stone-700"
                      )}
                    >
                      <div className="flex items-center gap-2">
                        <img src="/assets/logo/Logo-ecuador.webp" alt="Ecuador" className="w-4 h-3 object-cover rounded-xs shrink-0" />
                        <span>Ecuador</span>
                      </div>
                      {country === 'EC' && <Check className="w-3.5 h-3.5 text-emerald-600" />}
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Mobile ELIMINAMOS LA BARRA PERSISTENTE Y LA HACEMOS COLAPSABLE */}
        <AnimatePresence>
          {isSearchOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="md:hidden pb-4 overflow-hidden"
            >
              <div className="relative px-4">
                <Search className="absolute left-7 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
                <input
                  type="text"
                  placeholder="¿Qué buscas?"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-10 py-3 bg-stone-100 border-2 border-transparent focus:border-emerald-500 rounded-xl text-sm outline-none transition-all"
                  autoFocus
                />
                {searchQuery && (
                  <button 
                    onClick={() => setSearchQuery('')}
                    className="absolute right-7 top-1/2 -translate-y-1/2 p-1 text-stone-400"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Mobile Search Results Overlay */}
      <AnimatePresence>
        {searchQuery.trim() !== '' && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden absolute top-full left-0 w-full bg-white border-b border-stone-200 shadow-xl z-40 max-h-[60vh] overflow-y-auto"
          >
            <div className="p-4 space-y-2">
              {searchResults.length > 0 ? (
                searchResults.map(item => (
                  <Link
                    key={item.id}
                    to={item.searchType === 'product' ? `/producto/${item.id}` : `/combo/${item.id}`}
                    className="flex items-center gap-4 p-3 hover:bg-stone-50 rounded-xl transition-colors"
                  >
                    <div className="w-12 h-12 rounded-lg bg-stone-100 flex-shrink-0 overflow-hidden relative">
                      <img 
                        src={item.image || null} 
                        alt={item.name} 
                        className="w-full h-full object-contain"
                        referrerPolicy="no-referrer"
                      />
                      {item.searchType === 'combo' && (
                        <div className="absolute inset-0 bg-emerald-600/10 flex items-center justify-center">
                          <Sparkles className="w-5 h-5 text-emerald-600 opacity-50" />
                        </div>
                      )}
                    </div>
                    <div className="flex-grow min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-bold text-stone-900 truncate font-display">
                          {item.name}
                        </p>
                        {item.searchType === 'combo' && (
                          <span className="text-[8px] font-black bg-emerald-100 text-emerald-700 px-1.5 py-0.5 rounded-full uppercase tracking-wider">Combo</span>
                        )}
                      </div>
                      <p className="text-xs text-stone-500 truncate">
                        {'shortDescription' in item ? item.shortDescription : item.description}
                      </p>
                    </div>
                  </Link>
                ))
              ) : (
                <p className="text-center py-8 text-sm text-stone-500">No encontramos resultados para "{searchQuery}". Prueba con "estreñimiento", "colesterol" o "sueño".</p>
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
            <div className="px-4 py-6 space-y-6">
              {/* Mobile Country Selector */}
              <div className="bg-stone-50 p-3 rounded-2xl border border-stone-200">
                <p className="text-[10px] font-black text-stone-400 uppercase tracking-[0.2em] mb-2 px-1">País de Envío</p>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => {
                      setCountry('CO');
                      setIsOpen(false);
                    }}
                    className={cn(
                      "flex items-center justify-center gap-2 p-2.5 rounded-xl font-bold text-xs transition-all border",
                      country === 'CO'
                        ? "bg-white text-emerald-800 border-emerald-500 shadow-sm"
                        : "bg-stone-100 text-stone-600 border-transparent hover:bg-stone-200"
                    )}
                  >
                    <img src="/assets/logo/logo-colombia.webp" alt="Colombia" className="w-5 h-3.5 object-cover rounded-xs shrink-0" />
                    <span>Colombia</span>
                  </button>
                  <button
                    onClick={() => {
                      setCountry('EC');
                      setIsOpen(false);
                    }}
                    className={cn(
                      "flex items-center justify-center gap-2 p-2.5 rounded-xl font-bold text-xs transition-all border",
                      country === 'EC'
                        ? "bg-white text-emerald-800 border-emerald-500 shadow-sm"
                        : "bg-stone-100 text-stone-600 border-transparent hover:bg-stone-200"
                    )}
                  >
                    <img src="/assets/logo/Logo-ecuador.webp" alt="Ecuador" className="w-5 h-3.5 object-cover rounded-xs shrink-0" />
                    <span>Ecuador</span>
                  </button>
                </div>
              </div>

              {/* Mobile Categories */}
              <div>
                <p className="text-[10px] font-black text-stone-400 uppercase tracking-[0.2em] px-2 mb-4">Categorías</p>
                <div className="grid grid-cols-1 gap-2">
                  {currentCategories.map((category) => (
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



              {/* Mobile About Us */}
              <div className="pt-4 border-t border-stone-100">
                <Link
                  to="/quienes-somos"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 text-stone-900 font-bold hover:bg-stone-50 rounded-xl transition-colors"
                >
                  <Activity className="w-5 h-5 text-emerald-600" />
                  Sobre Nosotros
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
