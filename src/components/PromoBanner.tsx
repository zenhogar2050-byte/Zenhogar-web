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

  // VELOCIDADES CALIBRADAS PARA MARQUEE
  const durations = {
    mobile: 25,
    tablet: 27.5,
    desktop: 55
  };

  const currentDuration = durations[screenSize];

  // Versión Unificada Marquee (Mobile, Tablet y Desktop)
  return (
    <div 
      id="promo-banner" 
      className={cn(
        "bg-blue-800 text-white relative border-b border-blue-600/30 overflow-hidden select-none",
        screenSize === 'mobile' ? "py-8" : "py-12"
      )}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div 
        className={cn(
          "flex items-center w-max animate-marquee transform-gpu",
          isPaused && "pause-animation"
        )}
        style={{ 
          '--marquee-duration': `${currentDuration}s`,
          '--marquee-end': '-50%',
          'backface-visibility': 'hidden'
        } as React.CSSProperties}
      >
        {/* DUPLICAMOS EL CONTENIDO EXACTAMENTE 2 VECES PARA UN LOOP INVISIBLE */}
        {[...baseItems, ...baseItems].map((promo, index) => (
          <Link 
            key={`${promo.id}-${index}`} 
            to={`/combo/${promo.id}`}
            className={cn(
              "flex flex-col items-center group flex-shrink-0 px-4",
              screenSize === 'mobile' ? "w-[240px]" : "w-[350px] xl:w-[450px]"
            )}
          >
            <div className={cn(
              "rounded-[2.5rem] sm:rounded-[3rem] mb-4 sm:mb-6 flex items-center justify-center p-4 sm:p-6 overflow-hidden shadow-2xl group-hover:scale-105 transition-transform bg-white",
              screenSize === 'mobile' ? "w-36 h-36" : "w-48 h-48 sm:w-64 sm:h-64",
              promo.id === COMBO_OF_THE_MONTH.id && "border-4 border-emerald-400"
            )}>
              <img 
                src={promo.image} 
                alt={promo.name} 
                draggable="false"
                className="max-w-full max-h-full object-contain drop-shadow-xl"
                referrerPolicy="no-referrer"
                width={screenSize === 'mobile' ? 200 : 400}
                height={screenSize === 'mobile' ? 200 : 400}
                loading={index === 0 && screenSize !== 'mobile' ? "eager" : "lazy"}
                fetchPriority={index === 0 && screenSize !== 'mobile' ? "high" : "auto"}
              />
            </div>
            <div className="flex items-center mb-2 sm:mb-4 px-4 w-full justify-center">
              <Sparkles className={cn(
                "mr-2 sm:mr-3 shrink-0",
                screenSize === 'mobile' ? "w-4 h-4" : "w-5 h-5 sm:w-6 sm:h-6",
                promo.id === COMBO_OF_THE_MONTH.id ? "text-emerald-400" : "text-blue-200"
              )} />
              <span className={cn(
                "font-black tracking-widest uppercase truncate",
                screenSize === 'mobile' ? "text-lg" : "text-xl sm:text-2xl"
              )}>
                {cleanPromoName(promo.name)}
              </span>
            </div>
            <div className="flex flex-col items-center gap-1 sm:gap-2">
              <span className={cn(
                "font-bold text-blue-200 line-through opacity-80",
                screenSize === 'mobile' ? "text-[10px]" : "text-xs sm:text-base"
              )}>
                {formatCurrency(promo.originalPrice)}
              </span>
              <span className={cn(
                "font-black rounded-full shadow-2xl transform group-hover:scale-110 transition-transform",
                screenSize === 'mobile' ? "text-sm px-5 py-1" : "text-base sm:text-xl px-6 sm:px-10 py-1.5 sm:py-2",
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
