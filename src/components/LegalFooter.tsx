import React from 'react';
import { Mail, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function LegalFooter() {
  return (
    <div className="mt-32 pt-20 border-t border-stone-200">
      <div className="grid md:grid-cols-4 gap-12 items-start">
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <img 
              src="/assets/logo/logo.png" 
              alt="zenhogar Logo" 
              className="h-12 w-auto object-contain"
              referrerPolicy="no-referrer"
            />
            <span className="text-2xl font-bold tracking-tight text-stone-900">zenhogar</span>
          </div>
          <p className="text-stone-500 leading-relaxed">
            Dedicados a llevar el bienestar natural a cada hogar colombiano. Calidad, confianza y salud en cada producto.
          </p>
        </div>

        <div>
          <h4 className="text-lg font-bold mb-6 text-stone-900">Nosotros</h4>
          <ul className="space-y-3 text-stone-500">
            <li><Link to="/quienes-somos" className="hover:text-emerald-600 transition-colors">Quiénes Somos</Link></li>
            <li><Link to="/politica-privacidad" className="hover:text-emerald-600 transition-colors">Política de Privacidad</Link></li>
            <li><Link to="/condiciones-entrega" className="hover:text-emerald-600 transition-colors">Condiciones de Entrega</Link></li>
            <li><Link to="/devoluciones-garantia" className="hover:text-emerald-600 transition-colors">Devoluciones y Garantía</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-lg font-bold mb-6 text-stone-900">Contacto</h4>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-stone-100 flex items-center justify-center">
                <Phone className="w-5 h-5 text-emerald-600" />
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-widest text-stone-400 font-bold">WhatsApp</p>
                <p className="text-stone-900 font-bold">+57 302 410 2568</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-stone-100 flex items-center justify-center">
                <Mail className="w-5 h-5 text-emerald-600" />
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-widest text-stone-400 font-bold">Correos</p>
                <p className="text-stone-900 font-bold">ventas@zenhogar.live</p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center md:items-end">
          <div className="bg-stone-50 p-4 rounded-3xl border border-stone-100 shadow-sm">
            <img 
              src="/assets/logo/logo-invima.webp" 
              alt="INVIMA" 
              className="w-48 h-auto"
              referrerPolicy="no-referrer"
            />
          </div>
          <p className="mt-3 text-stone-400 text-[10px] italic">Información legal y certificaciones</p>
        </div>
      </div>
    </div>
  );
}
