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
          className="fixed bottom-0 left-0 right-0 bg-white border-t border-stone-200 p-4 lg:p-4 z-[100] shadow-[0_-10px_30px_rgba(0,0,0,0.1)]"
        >
          <div className="max-w-7xl mx-auto flex items-center justify-between gap-1.5 lg:gap-4">
            <div className="flex items-center gap-2 lg:gap-3 flex-1 min-w-0">
              <div className="w-14 h-14 lg:w-16 lg:h-16 bg-stone-100 rounded-lg lg:rounded-2xl overflow-hidden flex-shrink-0">
                <img src={image} alt={name} className="w-full h-full object-contain" referrerPolicy="no-referrer" />
              </div>
              <div className="flex flex-col min-w-0">
                <div className="flex items-center gap-1 flex-wrap lg:flex-nowrap">
                  <span className="text-[14px] sm:text-sm lg:text-sm font-bold text-stone-900 line-clamp-2 leading-tight">{name}</span>
                  <span className="text-emerald-700 font-black text-base lg:text-lg italic leading-none whitespace-nowrap">
                    {formatCurrency(price)}
                  </span>
                </div>
                
                {promos && onPromoChange && (
                  <div className="relative mt-1 self-start w-full sm:w-auto">
                    <select
                      value={selectedPromoId || ''}
                      onChange={(e) => onPromoChange(e.target.value)}
                      aria-label="Seleccionar promoción"
                      className="appearance-none bg-stone-100 text-stone-700 text-[11px] sm:text-[12px] lg:text-xs font-bold py-1.5 pl-1.5 pr-5 lg:pl-2 lg:pr-6 rounded uppercase outline-none focus:ring-1 focus:ring-emerald-500 border border-stone-200 cursor-pointer w-full text-ellipsis line-clamp-1"
                    >
                      {promos.map(promo => (
                        <option key={promo.id} value={promo.id}>
                          {promo.label}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="w-3 h-3 absolute right-1 lg:right-1.5 top-1/2 -translate-y-1/2 text-stone-500 pointer-events-none" />
                  </div>
                )}
              </div>
            </div>
            
            <div className="flex items-center gap-4 flex-shrink-0">
              <div className="hidden lg:flex items-center gap-2 text-xs font-bold text-stone-500 bg-stone-50 px-4 py-2 rounded-full border">
                <Zap className="w-3.5 h-3.5 text-emerald-500 fill-emerald-500" />
                Paga al recibir en casa
              </div>
              <button
                onClick={onBuy}
                className="px-4 sm:px-6 lg:px-10 py-2.5 lg:py-4 bg-amber-500 text-white rounded-xl lg:rounded-2xl font-black text-[11px] sm:text-sm lg:text-base shadow-lg shadow-amber-500/20 active:scale-95 transition-all hover:bg-amber-600 whitespace-nowrap"
              >
                COMPRAR AHORA
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
