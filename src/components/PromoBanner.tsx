import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { PROMOTIONS, COMBO_OF_THE_MONTH, PRODUCTS } from '../constants';
import { Link } from 'react-router-dom';
import { formatCurrency, cleanPromoName, cn } from '../utils';
import { motion, AnimatePresence } from 'motion/react';

export default function PromoBanner() {
  const baseItems = [COMBO_OF_THE_MONTH, ...PROMOTIONS];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const nextSlide = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % baseItems.length);
  };

  const prevSlide = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + baseItems.length) % baseItems.length);
  };

  useEffect(() => {
    if (!isHovered) {
      const timer = setInterval(nextSlide, 7000);
      return () => clearInterval(timer);
    }
  }, [isHovered]);

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 500 : -500,
      opacity: 0,
      scale: 0.9
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 500 : -500,
      opacity: 0,
      scale: 0.9
    })
  };

  const currentPromo = baseItems[currentIndex];

  return (
    <div 
      id="promo-banner" 
      className="bg-blue-800 text-white relative overflow-hidden py-8 sm:py-12 select-none min-h-[400px] sm:min-h-[550px] flex items-center justify-center"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-700/30 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-900/40 rounded-full blur-3xl" />
      </div>

      <div className="relative w-full max-w-5xl px-4 sm:px-12 flex items-center justify-center">
        {/* Navigation Arrows */}
        <button 
          onClick={prevSlide}
          className="absolute left-2 sm:left-4 z-20 p-2 sm:p-4 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md transition-all active:scale-95 group border border-white/10"
          aria-label="Anterior"
        >
          <ChevronLeft className="w-6 h-6 sm:w-8 sm:h-8 text-white group-hover:-translate-x-1 transition-transform" />
        </button>

        <button 
          onClick={nextSlide}
          className="absolute right-2 sm:right-4 z-20 p-2 sm:p-4 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md transition-all active:scale-95 group border border-white/10"
          aria-label="Siguiente"
        >
          <ChevronRight className="w-6 h-6 sm:w-8 sm:h-8 text-white group-hover:translate-x-1 transition-transform" />
        </button>

        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={currentPromo.id}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 },
              scale: { duration: 0.3 }
            }}
            className="w-full flex flex-col items-center"
          >
            <Link 
              to={`/combo/${currentPromo.id}`}
              className="flex flex-col items-center group w-full"
            >
              <div className="relative">
                {currentPromo.id === COMBO_OF_THE_MONTH.id && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute -top-6 -left-6 z-10 bg-amber-400 text-amber-950 font-black text-[10px] sm:text-xs px-4 py-1.5 rounded-full shadow-lg transform -rotate-12 uppercase tracking-widest border-2 border-white"
                  >
                    🚀 Oferta del Mes
                  </motion.div>
                )}
                
                <div className="rounded-[3rem] sm:rounded-[4rem] mb-4 sm:mb-6 flex items-center justify-center p-1 sm:p-2 overflow-hidden shadow-[0_20px_50px_-12px_rgba(0,0,0,0.3)] group-hover:scale-105 transition-all duration-500 bg-white w-48 h-48 sm:w-64 sm:h-64 border-4 border-white/20 ring-1 ring-white/10 group-hover:ring-white/30">
                  <img 
                    src={currentPromo.image} 
                    alt={currentPromo.name} 
                    draggable="false"
                    className="max-w-full max-h-full object-contain mix-blend-multiply transition-all duration-300 scale-110 group-hover:scale-115"
                    referrerPolicy="no-referrer"
                    width="400"
                    height="400"
                    loading="eager"
                  />
                </div>
              </div>

              <div className="flex flex-col items-center text-center space-y-3 max-w-2xl px-4">
                <div className="flex items-center gap-3">
                  <h2 className="font-black tracking-tighter uppercase text-xl sm:text-4xl lg:text-5xl text-white drop-shadow-sm">
                    {cleanPromoName(currentPromo.name)}
                  </h2>
                </div>

                <div className="flex flex-wrap justify-center items-center gap-x-4 gap-y-2 py-1 bg-blue-900/40 rounded-2xl px-8 backdrop-blur-sm border border-white/5 shadow-inner">
                  {currentPromo.products?.map((id, idx) => {
                    const product = PRODUCTS.find(p => p.id === id);
                    if (!product) return null;
                    return (
                      <React.Fragment key={id}>
                        {idx > 0 && <span className="text-blue-400/60 font-bold text-lg px-1">+</span>}
                        <span className="text-[13px] font-black text-blue-100 uppercase tracking-[0.1em] flex items-center">
                          {product.name}
                        </span>
                      </React.Fragment>
                    );
                  })}
                </div>
                
                <div className="flex flex-col items-center gap-2 sm:gap-4 pt-2">
                  <div className="flex flex-col items-center">
                    <span className="font-bold text-white line-through text-[13px] mb-1">
                      {formatCurrency(currentPromo.originalPrice)}
                    </span>
                    <div className="relative group">
                      <div className="absolute -inset-1 bg-gradient-to-r from-blue-400 to-emerald-400 rounded-full blur opacity-25 group-hover:opacity-100 transition duration-1000 group-hover:duration-200" />
                      <span className="relative font-black rounded-full shadow-2xl transform text-lg sm:text-3xl px-8 sm:px-14 py-3 sm:py-5 bg-white text-blue-800 flex items-center justify-center">
                        Solo por {formatCurrency(currentPromo.price)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        </AnimatePresence>

      </div>
    </div>
  );
}
