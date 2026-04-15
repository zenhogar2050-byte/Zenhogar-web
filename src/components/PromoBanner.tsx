import React, { useState, useEffect, useRef } from 'react';
import { Sparkles, ChevronLeft, ChevronRight } from 'lucide-react';
import { PROMOTIONS, COMBO_OF_THE_MONTH } from '../constants';
import { Link } from 'react-router-dom';
import { formatCurrency, cleanPromoName, cn } from '../utils';
import { motion, AnimatePresence } from 'motion/react';

export default function PromoBanner() {
  const [isPaused, setIsPaused] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [screenSize, setScreenSize] = useState<'mobile' | 'tablet' | 'desktop'>(() => {
    if (typeof window !== 'undefined') {
      const width = window.innerWidth;
      if (width < 768) return 'mobile';
      if (width < 1280) return 'tablet';
    }
    return 'desktop';
  });

  // En móvil, incluimos la Oferta del Mes al principio
  const baseItems = [COMBO_OF_THE_MONTH, ...PROMOTIONS];
  const mobileItems = baseItems;
  const marqueeItems = [...baseItems, ...baseItems, ...baseItems];

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
    tablet: 8,
    desktop: 15
  };

  const currentDuration = durations[screenSize];

  if (screenSize === 'mobile') {
    return (
      <div 
        id="promo-banner-mobile" 
        className="bg-blue-700 text-white py-10 relative border-b border-blue-500/30 overflow-hidden select-none touch-pan-y"
      >
        <div className="max-w-md mx-auto px-4 relative h-[420px] flex items-center justify-center">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, scale: 0.8, x: 100 }}
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
                <motion.div 
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
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
                </motion.div>

                <div className="flex items-center mb-4">
                  <Sparkles className={cn(
                    "w-6 h-6 mr-3 animate-pulse",
                    mobileItems[currentIndex].id === COMBO_OF_THE_MONTH.id ? "text-emerald-400" : "text-blue-200"
                  )} />
                  <span className="text-2xl font-black tracking-wider uppercase text-center leading-tight">
                    {cleanPromoName(mobileItems[currentIndex].name)}
                  </span>
                </div>

                <div className="flex flex-col items-center gap-2">
                  <span className="text-sm font-bold text-blue-200 line-through opacity-80">
                    {formatCurrency(mobileItems[currentIndex].originalPrice)}
                  </span>
                  <span className={cn(
                    "text-xl font-black px-8 py-2 rounded-full shadow-2xl transform active:scale-95 transition-transform",
                    mobileItems[currentIndex].id === COMBO_OF_THE_MONTH.id
                      ? "bg-emerald-500 text-white"
                      : "bg-white text-blue-700"
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
      className="bg-blue-700 text-white py-8 relative border-b border-blue-500/30 overflow-hidden select-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div 
        className={cn(
          "flex items-center whitespace-nowrap animate-marquee",
          isPaused && "pause-animation"
        )}
        style={{ animationDuration: `${currentDuration}s` }}
      >
        {marqueeItems.map((promo, index) => (
          <Link 
            key={`${promo.id}-${index}`} 
            to={`/combo/${promo.id}`}
            className="inline-flex flex-col items-center mx-8 hover:text-blue-200 transition-colors cursor-pointer group flex-shrink-0"
          >
            <div className={cn(
              "w-48 h-48 sm:w-60 sm:h-60 rounded-[2rem] sm:rounded-[2.5rem] mb-4 flex items-center justify-center p-4 overflow-hidden shadow-2xl group-hover:scale-105 transition-transform",
              promo.id === COMBO_OF_THE_MONTH.id ? "bg-emerald-50 border-4 border-emerald-400/50" : "bg-white"
            )}>
              <img 
                src={promo.image} 
                alt={promo.name} 
                draggable="false"
                className="max-w-full max-h-full object-contain drop-shadow-md"
                referrerPolicy="no-referrer"
                width="240"
                height="240"
                loading="lazy"
              />
            </div>
            <div className="flex items-center mb-3">
              <Sparkles className={cn(
                "w-5 h-5 sm:w-6 sm:h-6 mr-2 sm:mr-3",
                promo.id === COMBO_OF_THE_MONTH.id ? "text-emerald-400" : "text-blue-200"
              )} />
              <span className="text-xl sm:text-2xl font-black tracking-wide uppercase">
                {cleanPromoName(promo.name)}
              </span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <span className="text-xs sm:text-sm font-bold text-blue-200 line-through opacity-80">
                {formatCurrency(promo.originalPrice)}
              </span>
              <span className={cn(
                "text-base sm:text-lg font-black px-4 sm:px-5 py-1 sm:py-1.5 rounded-full shadow-xl transform group-hover:scale-110 transition-transform",
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
