import React, { useState, useEffect, useRef } from 'react';
import { Sparkles, ChevronLeft, ChevronRight } from 'lucide-react';
import { PROMOTIONS, COMBO_OF_THE_MONTH } from '../constants';
import { Link } from 'react-router-dom';
import { formatCurrency, cleanPromoName, cn } from '../utils';
import { motion, AnimatePresence } from 'motion/react';

export default function PromoBanner() {
  const [isPaused, setIsPaused] = useState(false);
  
  const baseItems = [COMBO_OF_THE_MONTH, ...PROMOTIONS];
  // Duplicamos exactamente 2 veces para un loop invisible con translate -50%
  const items = [...baseItems, ...baseItems];

  // Duración total basada en el número de items (4 segundos por item por defecto)
  const duration = baseItems.length * 6; 

  return (
    <div 
      id="promo-banner" 
      className="bg-blue-800 text-white relative overflow-hidden py-8 sm:py-12 select-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div 
        className={cn(
          "flex items-center w-max animate-marquee",
          isPaused && "pause-animation"
        )}
        style={{ 
          '--marquee-duration': `${duration}s`,
          '--marquee-end': '-50%' 
        } as React.CSSProperties}
      >
        {items.map((promo, index) => (
          <Link 
            key={`${promo.id}-${index}`} 
            to={`/combo/${promo.id}`}
            className="flex flex-col items-center group flex-shrink-0 w-[280px] sm:w-[350px] xl:w-[450px]"
          >
            <div className="rounded-[2.5rem] sm:rounded-[3rem] mb-4 sm:mb-6 flex items-center justify-center p-4 sm:p-6 overflow-hidden shadow-2xl group-hover:scale-105 transition-transform bg-white w-40 h-40 sm:w-64 sm:h-64">
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
            <div className="flex items-center mb-2 sm:mb-4 px-4 w-full justify-center">
              <Sparkles className={cn(
                "mr-2 sm:mr-3 shrink-0 w-4 h-4 sm:w-6 sm:h-6",
                promo.id === COMBO_OF_THE_MONTH.id ? "text-emerald-400" : "text-blue-200"
              )} />
              <span className="font-black tracking-widest uppercase truncate text-lg sm:text-2xl">
                {cleanPromoName(promo.name)}
              </span>
            </div>
            <div className="flex flex-col items-center gap-1 sm:gap-2">
              <span className="font-bold text-blue-200 line-through opacity-80 text-[10px] sm:text-base">
                {formatCurrency(promo.originalPrice)}
              </span>
              <span className={cn(
                "font-black rounded-full shadow-2xl transform group-hover:scale-110 transition-transform text-sm sm:text-xl px-5 sm:px-10 py-1 sm:py-2",
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
