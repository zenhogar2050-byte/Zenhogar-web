import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Truck, ShieldCheck } from 'lucide-react';

export default function TopBanner() {
  const [isMobile, setIsMobile] = useState(false);
  const [startAnimation, setStartAnimation] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
    // Defer animation to free main thread for initial paint
    const timer = setTimeout(() => setStartAnimation(true), 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="bg-stone-900 overflow-hidden h-9 sm:h-10 flex items-center border-b border-white/5 relative z-[60]">
      <motion.div 
        animate={startAnimation ? { x: [0, -1000] } : { x: 0 }}
        transition={{ 
          duration: isMobile ? 20 : 35, 
          repeat: Infinity, 
          ease: "linear" 
        }}
        className="flex whitespace-nowrap gap-12 items-center"
      >
        {[...Array(isMobile ? 3 : 10)].map((_, i) => (
          <div key={i} className="flex items-center gap-8">
            <div className="flex items-center gap-2 text-[10px] font-black text-white tracking-[0.2em] uppercase">
              <Truck className="w-3 h-3 text-emerald-400" />
              Envío Gratis en Todo Colombia
            </div>
            <div className="flex items-center gap-2 text-[10px] font-black text-white tracking-[0.2em] uppercase">
              <ShieldCheck className="w-3 h-3 text-emerald-400" />
              Pago Contraentrega (Pagas al recibir)
            </div>
            <div className="text-[10px] font-black text-emerald-400 tracking-[0.2em] uppercase">
              Garantía de Satisfacción 100%
            </div>
          </div>
        ))}
      </motion.div>
    </div>
  );
}
