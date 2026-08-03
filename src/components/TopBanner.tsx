import React, { useState, useEffect } from 'react';
import { Truck, ShieldCheck } from 'lucide-react';
import { useCart } from '../CartContext';

export default function TopBanner() {
  const [isMobile, setIsMobile] = useState(false);
  const [startAnimation, setStartAnimation] = useState(false);
  const countryName = 'Colombia';
  const paymentText = 'Pago Contraentrega (Pagas al recibir)';

  return (
    <div className="bg-stone-900 overflow-hidden h-9 sm:h-10 flex items-center border-b border-white/5 relative z-[60]">
      <div 
        className="flex whitespace-nowrap animate-marquee items-center"
        style={{ 
          '--marquee-duration': isMobile ? '20s' : '35s',
          '--marquee-end': '-50%'
        } as React.CSSProperties}
      >
        {[...Array(2)].map((_, setIdx) => (
          <div key={setIdx} className="flex items-center gap-12 mr-12">
            {[...Array(isMobile ? 2 : 5)].map((_, i) => (
              <React.Fragment key={i}>
                <div className="flex items-center gap-2 text-[10px] font-black text-white tracking-[0.2em] uppercase">
                  <Truck className="w-3 h-3 text-emerald-400" />
                  Envío Gratis en Todo {countryName}
                </div>
                <div className="flex items-center gap-2 text-[10px] font-black text-white tracking-[0.2em] uppercase">
                  <ShieldCheck className="w-3 h-3 text-emerald-400" />
                  {paymentText}
                </div>
                <div className="text-[10px] font-black text-emerald-400 tracking-[0.2em] uppercase">
                  Garantía de Satisfacción 100%
                </div>
              </React.Fragment>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
