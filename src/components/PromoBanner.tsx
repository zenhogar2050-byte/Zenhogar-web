import React, { useState, useEffect, useRef } from 'react';
import { Sparkles, ChevronLeft, ChevronRight } from 'lucide-react';
import { PROMOTIONS, COMBO_OF_THE_MONTH } from '../constants';
import { Link } from 'react-router-dom';
import { formatCurrency, cleanPromoName, cn } from '../utils';
import { motion, AnimatePresence } from 'motion/react';

export default function PromoBanner() {
  const [isPaused, setIsPaused] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFirstMount, setIsFirstMount] = useState(true);
  const [screenSize, setScreenSize] = useState<'mobile' | 'tablet' | 'desktop'>(() => {
    if (typeof window !== 'undefined') {
      const width = window.innerWidth;
      if (width < 768) return 'mobile';
      if (width < 1280) return 'tablet';
    }
    return 'desktop';
  });

  // Marcar que ya no es el primer montaje después del render inicial
  useEffect(() => {
    setIsFirstMount(false);
  }, []);

  // En móvil, incluimos la Oferta del Mes al principio
  const baseItems = [COMBO_OF_THE_MONTH, ...PROMOTIONS];
  const mobileItems = baseItems;
  // Solo calculamos marqueeItems si NO estamos en móvil
  // Aumentamos a 5 repeticiones para asegurar que el loop sea invisible y cubra pantallas ultra-wide
  const marqueeItems = screenSize !== 'mobile' 
    ? [...baseItems, ...baseItems, ...baseItems, ...baseItems, ...baseItems]
    : [];

  useEffect(() => {
    const checkScreenSize = () => {
      const width = window.innerWidth;
      if (width < 768) {
        setScreenSize('mobile');
      } else if (width < 1280) {
        setScreenSize('tablet');
      } else {
        setScreenSize('desktop');
      }
    };
    
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  // Auto-play para móvil
  useEffect(() => {
    if (screenSize !== 'mobile' || isPaused) return;
    
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % mobileItems.length);
    }, 4000); // 4 segundos por combo

    return () => clearInterval(timer);
  }, [screenSize, isPaused, mobileItems.length]);

  const handleDragEnd = (event: any, info: any) => {
    if (screenSize !== 'mobile') return;
    const threshold = 50;
    if (info.offset.x < -threshold) {
      setCurrentIndex((prev) => (prev + 1) % mobileItems.length);
    } else if (info.offset.x > threshold) {
      setCurrentIndex((prev) => (prev - 1 + mobileItems.length) % mobileItems.length);
    }
    setIsPaused(false);
  };

  // VELOCIDADES CALIBRADAS PARA MARQUEE (Tablet/Desktop)
  const durations = {
    mobile: 4,
    tablet: 27.5,
    desktop: 55
  };

  const currentDuration = durations[screenSize];

  if (screenSize === 'mobile') {
    return (
      <div 
        id="promo-banner-mobile" 
        className="bg-blue-800 text-white py-10 relative border-b border-blue-600/30 overflow-hidden select-none touch-pan-y"
      >
        <div className="max-w-md mx-auto px-4 relative h-[420px] flex items-center justify-center">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={currentIndex}
              initial={isFirstMount ? false : { opacity: 0, scale: 0.8, x: 100 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.8, x: -100 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              onDragStart={() => setIsPaused(true)}
              onDragEnd={handleDragEnd}
              className="absolute inset-0 flex flex-col items-center justify-center cursor-grab active:cursor-grabbing"
            >
              <Link 
                to={`/combo/${mobileItems[currentIndex].id}`}
                className="flex flex-col items-center group"
              >
                <div 
                  className={cn(
                    "w-64 h-64 rounded-[3rem] mb-6 flex items-center justify-center p-6 shadow-2xl transition-colors",
                    mobileItems[currentIndex].id === COMBO_OF_THE_MONTH.id 
                      ? "bg-emerald-50 border-4 border-emerald-400/50" 
                      : "bg-white"
                  )}
                >
                  <img 
                    src={mobileItems[currentIndex].image} 
                    alt={mobileItems[currentIndex].name} 
                    draggable="false"
                    className="max-w-full max-h-full object-contain drop-shadow-xl"
                    referrerPolicy="no-referrer"
                    width="256"
                    height="256"
                    fetchPriority={currentIndex === 0 ? "high" : "auto"}
                    loading={currentIndex === 0 ? "eager" : "lazy"}
                  />
                </div>

                <div className="flex items-center mb-4">
                  <Sparkles className={cn(
                    "w-6 h-6 mr-3 animate-pulse",
                    mobileItems[currentIndex].id === COMBO_OF_THE_MONTH.id ? "text-emerald-400" : "text-blue-100"
                  )} />
                  <span className="text-2xl font-black tracking-wider uppercase text-center leading-tight">
                    {cleanPromoName(mobileItems[currentIndex].name)}
                  </span>
                </div>

                <div className="flex flex-col items-center gap-2">
                  <span className="text-sm font-bold text-blue-100 line-through opacity-90">
                    {formatCurrency(mobileItems[currentIndex].originalPrice)}
                  </span>
                  <span className={cn(
                    "text-xl font-black px-8 py-2 rounded-full shadow-2xl transform active:scale-95 transition-transform",
                    mobileItems[currentIndex].id === COMBO_OF_THE_MONTH.id
                      ? "bg-emerald-500 text-white"
                      : "bg-white text-blue-800"
                  )}>
                    Solo por {formatCurrency(mobileItems[currentIndex].price)}
                  </span>
                </div>
              </Link>
            </motion.div>
          </AnimatePresence>

          {/* Indicadores de posición */}
          <div className="absolute bottom-0 flex gap-2">
            {mobileItems.map((_, idx) => (
              <div 
                key={idx}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${idx === currentIndex ? 'bg-white w-6' : 'bg-blue-400/50'}`}
              />
            ))}
          </div>

          {/* Flechas de navegación */}
          <button 
            onClick={() => setCurrentIndex((prev) => (prev - 1 + mobileItems.length) % mobileItems.length)}
            className="absolute left-2 p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors"
            aria-label="Ver promoción anterior"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button 
            onClick={() => setCurrentIndex((prev) => (prev + 1) % mobileItems.length)}
            className="absolute right-2 p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors"
            aria-label="Ver siguiente promoción"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      </div>
    );
  }

  // Versión Marquee para Tablet y Desktop
  return (
    <div 
      id="promo-banner" 
      className="bg-blue-800 text-white py-12 relative border-b border-blue-600/30 overflow-hidden select-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div 
        className={cn(
          "flex items-center w-max animate-marquee",
          isPaused && "pause-animation"
        )}
        style={{ 
          '--marquee-duration': `${currentDuration}s`,
          '--marquee-end': '-50%' // Usamos exactamente la mitad para un loop perfecto
        } as React.CSSProperties}
      >
        {/* DUPLICAMOS EL CONTENIDO EXACTAMENTE 2 VECES PARA UN LOOP INVISIBLE */}
        {[...baseItems, ...baseItems].map((promo, index) => (
          <Link 
            key={`${promo.id}-${index}`} 
            to={`/combo/${promo.id}`}
            className="flex flex-col items-center group flex-shrink-0"
            style={{ width: screenSize === 'desktop' ? '450px' : '350px' }} // ANCHO FIJO PARA MATEMÁTICA PERFECTA
          >
            <div className={cn(
              "w-48 h-48 sm:w-64 sm:h-64 rounded-[2.5rem] sm:rounded-[3rem] mb-6 flex items-center justify-center p-6 overflow-hidden shadow-2xl group-hover:scale-105 transition-transform bg-white",
              promo.id === COMBO_OF_THE_MONTH.id && "border-4 border-emerald-400"
            )}>
              <img 
                src={promo.image} 
                alt={promo.name} 
                draggable="false"
                className="max-w-full max-h-full object-contain drop-shadow-xl"
                referrerPolicy="no-referrer"
                width="256"
                height="256"
                loading={index < 4 ? "eager" : "lazy"}
              />
            </div>
            <div className="flex items-center mb-4 px-4 w-full justify-center">
              <Sparkles className={cn(
                "w-5 h-5 sm:w-6 sm:h-6 mr-3 shrink-0",
                promo.id === COMBO_OF_THE_MONTH.id ? "text-emerald-400" : "text-blue-200"
              )} />
              <span className="text-xl sm:text-2xl font-black tracking-widest uppercase truncate">
                {cleanPromoName(promo.name)}
              </span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <span className="text-xs sm:text-base font-bold text-blue-200 line-through opacity-80">
                {formatCurrency(promo.originalPrice)}
              </span>
              <span className={cn(
                "text-base sm:text-xl font-black px-6 sm:px-10 py-1.5 sm:py-2 rounded-full shadow-2xl transform group-hover:scale-110 transition-transform",
                promo.id === COMBO_OF_THE_MONTH.id ? "bg-emerald-500 text-white" : "bg-white text-blue-700"
              )}>
                Solo por {formatCurrency(promo.price)}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
