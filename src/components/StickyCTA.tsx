import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShoppingCart, ChevronDown, Zap } from 'lucide-react';
import { formatCurrency, cn } from '../utils';

interface StickyCTAProps {
  name: string;
  image: string;
  price: number;
  originalPrice?: number;
  onBuy: () => void;
  showAlwaysOnMobile?: boolean;
  desktopTriggerRef?: React.RefObject<HTMLElement>;
  promos?: { id: string; label: string; price: number }[];
  selectedPromoId?: string;
  onPromoChange?: (id: string) => void;
}

export default function StickyCTA({
  name,
  image,
  price,
  originalPrice,
  onBuy,
  showAlwaysOnMobile = true,
  desktopTriggerRef,
  promos,
  selectedPromoId,
  onPromoChange
}: StickyCTAProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // On mobile (< 1024px), show always if parent tells us so
      if (window.innerWidth < 1024) {
        setIsVisible(showAlwaysOnMobile);
        return;
      }
      
      // On desktop, use the trigger ref
      if (desktopTriggerRef?.current) {
        const rect = desktopTriggerRef.current.getBoundingClientRect();
        // Visible when the main button is above the viewport
        setIsVisible(rect.top < 0);
      } else {
        // If no ref, maybe a default behavior or just don't show on desktop
        setIsVisible(false);
      }
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, [showAlwaysOnMobile, desktopTriggerRef]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          exit={{ y: 100 }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className="fixed bottom-0 left-0 right-0 bg-white border-t border-stone-200 p-5 lg:p-4 z-[100] shadow-[0_-10px_30px_rgba(0,0,0,0.1)]"
        >
          <div className="max-w-7xl mx-auto flex items-center justify-between gap-2 lg:gap-4">
            <div className="flex items-center gap-2.5 lg:gap-3 flex-1 min-w-0">
              <div className="w-[4.5rem] h-[4.5rem] lg:w-16 lg:h-16 bg-stone-100 rounded-xl lg:rounded-2xl overflow-hidden flex-shrink-0">
                <img src={image} alt={name} className="w-full h-full object-contain" referrerPolicy="no-referrer" />
              </div>
              <div className="flex flex-col min-w-0 gap-0.5">
                <div className="flex flex-col items-start gap-1">
                  <span className="text-[16px] sm:text-sm lg:text-sm font-extrabold text-stone-900 line-clamp-2 leading-tight pr-2">{name}</span>
                  <span className="text-emerald-700 font-black text-[18px] lg:text-lg italic leading-none whitespace-nowrap">
                    {formatCurrency(price)}
                  </span>
                </div>
                
                {promos && onPromoChange && (
                  <div className="relative mt-1 self-start w-full sm:w-auto">
                    <select
                      value={selectedPromoId || ''}
                      onChange={(e) => onPromoChange(e.target.value)}
                      aria-label="Seleccionar promoción"
                      className="appearance-none bg-stone-100 text-stone-700 text-[13px] sm:text-[12px] lg:text-xs font-bold py-2 pl-2 pr-6 rounded-lg uppercase outline-none focus:ring-1 focus:ring-emerald-500 border border-stone-200 cursor-pointer w-full text-ellipsis"
                    >
                      {promos.map(promo => (
                        <option key={promo.id} value={promo.id}>
                          {promo.label}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="w-4 h-4 absolute right-1.5 top-1/2 -translate-y-1/2 text-stone-500 pointer-events-none" />
                  </div>
                )}
              </div>
            </div>
            
            <div className="flex items-center gap-2 flex-shrink-0">
              <button
                onClick={onBuy}
                className="px-5 py-3.5 lg:px-10 lg:py-4 bg-amber-500 text-white rounded-xl lg:rounded-2xl font-black text-[13px] lg:text-base shadow-lg shadow-amber-500/20 active:scale-95 transition-all hover:bg-amber-600 whitespace-nowrap"
              >
                COMPRAR
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
