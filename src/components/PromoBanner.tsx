import React, { useState, useEffect, useRef } from 'react';
import { Sparkles, ChevronLeft, ChevronRight } from 'lucide-react';
import { PROMOTIONS, COMBO_OF_THE_MONTH } from '../constants';
import { Link } from 'react-router-dom';
import { formatCurrency, cleanPromoName, cn } from '../utils';
import { motion, AnimatePresence } from 'motion/react';

export default function PromoBanner() {
  const [isPaused, setIsPaused] = useState(false);
  
  const baseItems = [COMBO_OF_THE_MONTH, ...PROMOTIONS];
  // Triplicamos para asegurar que no haya huecos en pantallas grandes y el loop sea invisible
  const items = [...baseItems, ...baseItems, ...baseItems];

  // Duración total basada en el número de items
  const duration = baseItems.length * 8; 

  return (
    <div 
      id="promo-banner" 
      className="bg-blue-800 text-white relative overflow-hidden py-10 sm:py-16 select-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div 
        className={cn(
          "flex items-center w-max animate-marquee gap-8 sm:gap-12 lg:gap-16",
          isPaused && "pause-animation"
        )}
        style={{ 
          '--marquee-duration': `${duration}s`,
          '--marquee-end': '-33.33333%' 
        } as React.CSSProperties}
      >
        {items.map((promo, index) => (
          <Link 
            key={`${promo.id}-${index}`} 
            to={`/combo/${promo.id}`}
            className="flex flex-col items-center group flex-shrink-0 w-[280px] sm:w-[350px] lg:w-[400px]"
          >
            <div className="rounded-[2.5rem] sm:rounded-[3rem] mb-4 sm:mb-8 flex items-center justify-center p-4 sm:p-8 overflow-hidden shadow-2xl group-hover:scale-105 transition-transform bg-white w-48 h-48 sm:w-64 sm:h-64 border-4 border-transparent ring-4 ring-white/10 group-hover:ring-white/30">
              <img 
                src={promo.image} 
                alt={promo.name} 
                draggable="false"
                className="max-w-full max-h-full object-contain drop-shadow-2xl"
                referrerPolicy="no-referrer"
                width="300"
                height="300"
                loading={index < 3 ? "eager" : "lazy"}
                fetchPriority={index < 3 ? "high" : "low"}
              />
            </div>
            <div className="flex items-center mb-2 px-4 w-full justify-center">
              <Sparkles className="mr-2 sm:mr-3 shrink-0 w-4 h-4 sm:w-6 sm:h-6 text-blue-200" />
              <span className="font-black tracking-widest uppercase truncate text-base sm:text-2xl text-white">
                {cleanPromoName(promo.name)}
              </span>
            </div>
            <div className="flex flex-col items-center gap-1 sm:gap-2">
              <span className="font-bold text-blue-300/80 line-through text-[10px] sm:text-base">
                {formatCurrency(promo.originalPrice)}
              </span>
              <span className="font-black rounded-full shadow-2xl transform group-hover:scale-110 transition-transform text-xs sm:text-lg px-5 sm:px-8 py-2 bg-white text-blue-800">
                Solo por {formatCurrency(promo.price)}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
