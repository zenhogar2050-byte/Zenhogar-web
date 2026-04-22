import React, { useState, useEffect, useRef } from 'react';
import { Sparkles, ChevronLeft, ChevronRight } from 'lucide-react';
import { PROMOTIONS, COMBO_OF_THE_MONTH } from '../constants';
import { Link } from 'react-router-dom';
import { formatCurrency, cleanPromoName, cn } from '../utils';
import { motion, AnimatePresence } from 'motion/react';

export default function PromoBanner() {
  const [isPaused, setIsPaused] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [screenSize, setScreenSize] = useState<'mobile' | 'tablet' | 'desktop'>('desktop');

  useEffect(() => {
    const checkScreenSize = () => {
      const width = window.innerWidth;
      setScreenSize(width < 768 ? 'mobile' : width < 1280 ? 'tablet' : 'desktop');
    };
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize, { passive: true });
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  const baseItems = [COMBO_OF_THE_MONTH, ...PROMOTIONS];
  const mobileItems = baseItems;
  const marqueeItems = [...baseItems, ...baseItems];

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
        "bg-blue-800 text-white relative border-b border-blue-600/30 overflow-hidden select-none py-8 md:py-12",
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
          backfaceVisibility: 'hidden'
        } as React.CSSProperties}
      >
        {/* DUPLICAMOS EL CONTENIDO EXACTAMENTE 2 VECES PARA UN LOOP INVISIBLE */}
        {marqueeItems.map((promo, index) => (
          <Link 
            key={`${promo.id}-${index}`} 
            to={`/combo/${promo.id}`}
            className={cn(
              "flex flex-col items-center group flex-shrink-0 px-4 w-[240px] md:w-[350px] xl:w-[450px]"
            )}
          >
            <div className={cn(
              "rounded-[2.5rem] sm:rounded-[3rem] mb-4 sm:mb-6 flex items-center justify-center p-4 sm:p-6 overflow-hidden shadow-2xl group-hover:scale-105 transition-transform bg-white w-36 h-36 md:w-48 md:h-48 lg:w-64 lg:h-64",
              promo.id === COMBO_OF_THE_MONTH.id && "border-4 border-emerald-400"
            )}>
              <img 
                src={promo.image} 
                alt={promo.name} 
                draggable="false"
                className="max-w-full max-h-full object-contain drop-shadow-xl"
                referrerPolicy="no-referrer"
                width={screenSize === 'mobile' ? 144 : 256}
                height={screenSize === 'mobile' ? 144 : 256}
                loading={index === 0 ? "eager" : "lazy"}
                fetchPriority={index === 0 ? "high" : "auto"}
                decoding="async"
              />
            </div>
            <div className="flex items-center mb-2 sm:mb-4 px-4 w-full justify-center">
              <Sparkles className={cn(
                "mr-2 sm:mr-3 shrink-0 w-4 h-4 md:w-5 md:h-5 lg:w-6 lg:h-6",
                promo.id === COMBO_OF_THE_MONTH.id ? "text-emerald-400" : "text-blue-200"
              )} />
              <span className={cn(
                "font-black tracking-widest uppercase truncate text-lg md:text-xl lg:text-2xl"
              )}>
                {cleanPromoName(promo.name)}
              </span>
            </div>
            <div className="flex flex-col items-center gap-1 sm:gap-2">
              <span className={cn(
                "font-bold text-blue-200 line-through opacity-80 text-[10px] md:text-xs lg:text-base"
              )}>
                {formatCurrency(promo.originalPrice)}
              </span>
              <span className={cn(
                "font-black rounded-full shadow-2xl transform group-hover:scale-110 transition-transform text-sm px-5 py-1 md:text-base md:px-8 lg:text-xl lg:px-10 py-1.5 lg:py-2",
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
