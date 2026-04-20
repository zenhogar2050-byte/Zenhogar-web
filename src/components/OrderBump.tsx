import React from 'react';
import { motion } from 'motion/react';
import { Zap, ShoppingCart, Sparkles, TrendingDown } from 'lucide-react';
import { formatCurrency } from '../utils';

interface OrderBumpProps {
  productName: string;
  complementName: string;
  bumpPrice: number;
  savings: number;
  onAccept: () => void;
}

const OrderBump: React.FC<OrderBumpProps> = ({
  complementName,
  bumpPrice,
  savings,
  onAccept,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: 10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      className="my-6 p-5 bg-emerald-50 border-2 border-dashed border-emerald-400 rounded-3xl relative overflow-hidden"
      id="order-bump-container"
    >
      <div className="absolute top-0 right-0 p-2">
        <Sparkles className="w-5 h-5 text-emerald-400 animate-pulse" />
      </div>

      <div className="relative z-10">
        <h4 className="text-emerald-900 font-black text-sm mb-2 flex items-center gap-2">
          ¡Espera! Completa tu tratamiento y ahorra más 🌿
        </h4>
        
        <p className="text-stone-700 text-xs leading-relaxed mb-3">
          ¿Llevas solo 1 unidad? Agrega un <span className="font-bold text-emerald-700">{complementName}</span> por solo <span className="font-bold text-emerald-700">{formatCurrency(bumpPrice)}</span> más.
        </p>

        <div className="bg-white/60 rounded-xl p-3 mb-4 border border-emerald-100">
          <div className="flex items-center gap-2 text-emerald-700 font-bold text-xs">
            <TrendingDown className="w-4 h-4" />
            💰 Ahorras {formatCurrency(savings)} comparado con el precio individual.
          </div>
          <p className="text-[10px] text-emerald-600/70 font-medium mt-1">
            ⏳ Oferta válida hasta agotar inventario.
          </p>
        </div>

        <button
          onClick={onAccept}
          className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-black text-xs transition-all shadow-lg hover:shadow-emerald-200 flex items-center justify-center gap-2 group active:scale-95"
          id="order-bump-button"
        >
          AGREGAR AL PEDIDO
          <Zap className="w-4 h-4 fill-current group-hover:scale-110 transition-transform" />
        </button>
      </div>

      {/* Background patterns */}
      <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-emerald-100 rounded-full opacity-50 blur-xl" />
    </motion.div>
  );
};

export default OrderBump;
