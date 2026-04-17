import React from 'react';
import { motion } from 'motion/react';
import { Truck, ShieldCheck } from 'lucide-react';

export default function TopBanner() {
  return (
    <div className="bg-stone-900 overflow-hidden py-2 border-b border-white/5 relative z-[60]">
      <motion.div 
        animate={{ x: [0, -1000] }}
        transition={{ 
          duration: 30, 
          repeat: Infinity, 
          ease: "linear" 
        }}
        className="flex whitespace-nowrap gap-12 items-center"
      >
        {[...Array(10)].map((_, i) => (
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
