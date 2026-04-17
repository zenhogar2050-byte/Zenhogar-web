import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Users, Eye } from 'lucide-react';

const RECENT_ACTIVITY = [
  { city: 'Bogotá', product: 'Combo Inmunidad Dual' },
  { city: 'Medellín', product: 'Resvis Factor' },
  { city: 'Cali', product: 'Coliplus' },
  { city: 'Barranquilla', product: 'Rtafull' },
  { city: 'Bucaramanga', product: 'Combo Detox' },
  { city: 'Pereira', product: 'Liteplex' },
  { city: 'Manizales', product: 'Maxlite Colágeno' },
  { city: 'Cartagena', product: 'Inmunidad Dual' },
];

export default function SocialProof() {
  const [current, setCurrent] = useState(0);
  const [visible, setVisible] = useState(false);
  const [onlineCount, setOnlineCount] = useState(12);

  useEffect(() => {
    setOnlineCount(Math.floor(Math.random() * (28 - 12 + 1)) + 12);
    
    const showTimer = setTimeout(() => {
      setVisible(true);
    }, 5000);

    const interval = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setCurrent((prev) => (prev + 1) % RECENT_ACTIVITY.length);
        setOnlineCount(prev => {
          const change = Math.random() > 0.5 ? 1 : -1;
          const next = prev + change;
          return next < 8 ? 8 : next > 35 ? 35 : next;
        });
        setVisible(true);
      }, 1000);
    }, 12000);

    return () => {
      clearTimeout(showTimer);
      clearInterval(interval);
    };
  }, []);

  const activity = RECENT_ACTIVITY[current];

  return (
    <div className="fixed bottom-6 left-6 z-50 pointer-events-none hidden md:block">
      <AnimatePresence>
        {visible && (
          <motion.div
            initial={{ opacity: 0, x: -50, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -50, scale: 0.9 }}
            className="bg-white rounded-2xl p-4 shadow-2xl border border-stone-100 flex items-center gap-4 max-w-xs"
          >
            <div className="w-10 h-10 bg-emerald-50 rounded-full flex items-center justify-center flex-shrink-0">
              <Eye className="w-5 h-5 text-emerald-600" />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-0.5">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <p className="text-[10px] text-emerald-600 font-black uppercase tracking-widest">{onlineCount} personas en línea</p>
              </div>
              <p className="text-sm font-bold text-stone-900">
                Alguien en <span className="text-emerald-700">{activity.city}</span>
              </p>
              <p className="text-[11px] text-stone-600">
                está viendo el <span className="font-bold">{activity.product}</span>
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
