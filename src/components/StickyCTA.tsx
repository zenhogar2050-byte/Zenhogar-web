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

  const isProductPage = !!(promos && onPromoChange);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          exit={{ y: 100 }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className="fixed bottom-0 left-0 right-0 bg-white border-t border-stone-200 py-3 px-4 sm:px-6 lg:py-4 z-[100] shadow-[0_-10px_30px_rgba(0,0,0,0.1)]"
        >
          <div className="max-w-7xl mx-auto">
            {isProductPage ? (
              /* Product Page Layout: Compact, no name, 2-line selector */
              <div className="flex items-center gap-3 sm:gap-4 lg:gap-6">
                <div className="w-[72px] h-[72px] sm:w-20 sm:h-20 lg:w-24 lg:h-24 bg-white border border-stone-100 rounded-xl overflow-hidden flex-shrink-0 p-1.5 shadow-sm">
                  <img src={image} alt={name} className="w-full h-full object-contain" referrerPolicy="no-referrer" />
                </div>

                <div className="flex-1 flex flex-col gap-1.5 min-w-0">
                  <div className="text-emerald-700 font-black text-lg sm:text-xl italic leading-none whitespace-nowrap">
                    {formatCurrency(price)}
                  </div>

                  <div className="relative w-full">
                    <div className="bg-stone-50 text-stone-700 text-[12px] sm:text-[13px] lg:text-sm font-bold py-2 lg:py-2.5 pl-3 pr-9 rounded-xl uppercase border border-stone-200 w-full min-h-[2.5rem] lg:min-h-[3rem] flex items-center leading-[1.2] whitespace-normal break-words hover:bg-stone-100 transition-colors">
                      <span className="line-clamp-2">
                        {promos?.find(p => p.id === selectedPromoId)?.label || 'Seleccionar...'}
                      </span>
                    </div>
                    <select
                      value={selectedPromoId || ''}
                      onChange={(e) => onPromoChange(e.target.value)}
                      aria-label="Seleccionar promoción"
                      className="absolute inset-0 opacity-0 cursor-pointer w-full h-full z-10"
                    >
                      {promos?.map(promo => (
                        <option key={promo.id} value={promo.id}>
                          {promo.label} - {formatCurrency(promo.price)}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="w-4 h-4 lg:w-5 lg:h-5 absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 pointer-events-none" />
                  </div>
                </div>
                
                <div className="flex-shrink-0">
                  <button
                    onClick={onBuy}
                    className="px-5 py-3 sm:px-8 sm:py-3.5 lg:px-12 lg:py-4 bg-amber-500 text-white rounded-xl lg:rounded-2xl font-black text-[14px] lg:text-base shadow-lg shadow-amber-500/20 active:scale-95 transition-all hover:bg-amber-600 whitespace-nowrap uppercase italic"
                  >
                    COMPRAR
                  </button>
                </div>
              </div>
            ) : (
              /* Home/Combo Layout: Single row like the reference image */
              <div className="flex items-center justify-between gap-3 sm:gap-4 lg:gap-6">
                <div className="flex items-center gap-3 sm:gap-4 lg:gap-5 flex-1 min-w-0">
                  <div className="w-[64px] h-[64px] sm:w-[72px] sm:h-[72px] lg:w-20 lg:h-20 bg-stone-50 rounded-2xl overflow-hidden flex-shrink-0 p-1 shadow-sm border border-stone-100/50">
                    <img src={image} alt={name} className="w-full h-full object-contain" referrerPolicy="no-referrer" />
                  </div>
                  
                  <div className="flex flex-col gap-0.5 min-w-0">
                    <span className="text-[15px] sm:text-[18px] lg:text-xl font-black text-stone-900 leading-[1.1] tracking-tight uppercase line-clamp-2">
                      {name}
                    </span>
                    <div className="text-emerald-700 font-black text-[18px] sm:text-[22px] lg:text-2xl italic leading-none whitespace-nowrap">
                      {formatCurrency(price)}
                    </div>
                  </div>
                </div>

                <div className="flex-shrink-0">
                  <button
                    onClick={onBuy}
                    className="px-6 py-3 sm:px-10 sm:py-4 lg:px-14 lg:py-5 bg-amber-500 text-white rounded-[20px] lg:rounded-[24px] font-black text-[14px] sm:text-base lg:text-lg shadow-lg shadow-amber-500/25 active:scale-95 transition-all hover:bg-amber-600 whitespace-nowrap uppercase tracking-wide"
                  >
                    COMPRAR
                  </button>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
