import React from 'react';
import { ShieldCheck, Truck, CreditCard, Award } from 'lucide-react';
import { cn } from '../utils';

export default function TrustBar({ className }: { className?: string }) {
  const trustItems = [
    {
      icon: <ShieldCheck className="w-5 h-5 text-emerald-600" />,
      title: "Registro INVIMA",
      desc: "Productos 100% Originales"
    },
    {
      icon: <Truck className="w-5 h-5 text-emerald-600" />,
      title: "Envío Gratis",
      desc: "A toda Colombia"
    },
    {
      icon: <CreditCard className="w-5 h-5 text-emerald-600" />,
      title: "Pago Contra Entrega",
      desc: "Paga al recibir en casa"
    },
    {
      icon: <Award className="w-5 h-5 text-emerald-600" />,
      title: "Garantía Total",
      desc: "Calidad Certificada"
    }
  ];

  return (
    <div className={cn("grid grid-cols-2 lg:grid-cols-4 gap-4 py-6 border-y border-stone-100", className)}>
      {trustItems.map((item, i) => (
        <div key={i} className="flex flex-col items-center text-center p-2 group">
          <div className="mb-2 p-2 rounded-full bg-emerald-50 group-hover:bg-emerald-100 transition-colors">
            {item.icon}
          </div>
          <div className="text-[11px] font-black text-stone-900 uppercase tracking-wider mb-0.5">{item.title}</div>
          <div className="text-[10px] text-stone-500 font-medium">{item.desc}</div>
        </div>
      ))}
    </div>
  );
}
