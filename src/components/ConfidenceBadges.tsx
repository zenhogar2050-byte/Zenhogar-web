import React from 'react';
import { ShieldCheck, Truck, Star, Lock } from 'lucide-react';
import { cn } from '../utils';

export default function ConfidenceBadges({ className }: { className?: string }) {
  return (
    <div className={cn("flex flex-wrap justify-center gap-x-6 gap-y-3 mt-4 py-4 px-2 bg-stone-50 rounded-2xl border border-stone-200/60", className)}>
      <div className="flex items-center gap-2">
        <Lock className="w-4 h-4 text-emerald-600" />
        <span className="text-[11px] font-bold text-stone-700 uppercase tracking-tight">Pago 100% Seguro</span>
      </div>
      <div className="flex items-center gap-2">
        <Truck className="w-4 h-4 text-emerald-600" />
        <span className="text-[11px] font-bold text-stone-700 uppercase tracking-tight">Envío Gratis Hoy</span>
      </div>
      <div className="flex items-center gap-2">
        <div className="flex gap-0.5">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="w-2.5 h-2.5 fill-amber-400 text-amber-400" />
          ))}
        </div>
        <span className="text-[11px] font-bold text-stone-700 uppercase tracking-tight">4.9/5 Opiniones</span>
      </div>
    </div>
  );
}
