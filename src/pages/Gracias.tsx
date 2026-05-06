import { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'motion/react';
import { CheckCircle2, Send, ShoppingBag } from 'lucide-react';
import { trackPurchaseIfFromFacebook, track } from '../utils/pixel';

export default function Gracias() {
  const location = useLocation();
  
  // Aseguramos que la página no sea indexada por buscadores
  useEffect(() => {
    const meta = document.createElement('meta');
    meta.name = 'robots';
    meta.content = 'noindex, nofollow';
    document.head.appendChild(meta);
    return () => {
      document.head.removeChild(meta);
    };
  }, []);
  
  // Recuperación de datos: Prioriza el estado de la navegación, luego el almacenamiento local
  const getInitialData = () => {
    if (location.state) {
      return {
        orderData: location.state.orderData,
        whatsappUrl: location.state.whatsappUrl,
        ticketNumber: location.state.ticketNumber
      };
    }
    
    try {
      const saved = JSON.parse(localStorage.getItem('lastOrder') || '{}');
      if (saved.total) {
        return {
          orderData: { value: saved.total, currency: 'COP' },
          whatsappUrl: saved.whatsappUrl || 'https://wa.me/573024102568',
          ticketNumber: saved.ticketNumber || 'N/A'
        };
      }
    } catch (e) {
      console.error('Error loading saved order:', e);
    }
    
    return {
      orderData: { value: 0, currency: 'COP' },
      whatsappUrl: 'https://wa.me/573024102568',
      ticketNumber: 'PENDIENTE'
    };
  };

  const { orderData, whatsappUrl, ticketNumber } = getInitialData();

  // Registro automático de la compra en el Píxel al cargar la página
  useEffect(() => {
    if (orderData.value > 0) {
      trackPurchaseIfFromFacebook({ 
        value: orderData.value, 
        currency: 'COP',
        content_name: 'Compra Finalizada',
        content_ids: [ticketNumber]
      });
    }
  }, [orderData.value, ticketNumber]);

  // Evento adicional para cuando el usuario hace clic en el botón de confirmación
  const handleWhatsAppClick = () => {
    track('Contact', { 
      value: orderData.value, 
      currency: 'COP',
      content_category: 'WhatsApp Confirmation'
    });
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-stone-50">
      <motion.div 
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }} 
        className="bg-white p-8 rounded-[2.5rem] shadow-2xl text-center max-w-md border border-stone-100 relative overflow-hidden"
      >
        {/* Decoración sutil de fondo */}
        <div className="absolute top-0 left-0 w-full h-2 bg-emerald-500" />
        
        <div className="w-24 h-24 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-8 relative">
          <CheckCircle2 className="w-12 h-12 text-emerald-600" />
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
            className="absolute -right-2 -top-2 bg-amber-400 text-white p-2 rounded-full"
          >
            <ShoppingBag className="w-4 h-4" />
          </motion.div>
        </div>
        
        <div className="space-y-2 mb-8">
          <span className="inline-block px-4 py-1.5 bg-stone-100 rounded-full text-stone-600 font-black text-[10px] tracking-[0.2em] uppercase">
            ORDEN REGISTRADA: #{ticketNumber}
          </span>
          <h1 className="text-3xl font-black text-stone-900">¡Casi listo!</h1>
          <p className="text-stone-500 font-medium px-4">
            Tu pedido ha sido reservado. Por favor, confírmalo ahora por WhatsApp para despacharlo hoy mismo.
          </p>
        </div>

        <div className="space-y-4">
          <a 
            href={whatsappUrl} 
            target="_blank" 
            rel="noopener noreferrer" 
            onClick={handleWhatsAppClick}
            className="w-full inline-flex items-center justify-center gap-3 px-8 py-6 bg-emerald-600 text-white rounded-2xl font-black text-xl hover:bg-emerald-700 transition-all shadow-xl shadow-emerald-600/30 active:scale-95"
          >
            <Send className="w-6 h-6 fill-current" /> CONFIRMAR PEDIDO
          </a>
          
          <div className="p-4 bg-amber-50 rounded-2xl border border-amber-100">
            <p className="text-[11px] text-amber-800 font-bold leading-tight">
              ⚠️ Si no confirmas por WhatsApp, tu despacho podría tardar hasta 48 horas adicionales en procesarse.
            </p>
          </div>
        </div>

        <Link 
          to="/" 
          className="inline-block mt-8 text-stone-400 hover:text-stone-900 font-bold text-xs uppercase tracking-widest transition-colors"
        >
          ← Volver a la página principal
        </Link>
      </motion.div>
      
      <p className="mt-8 text-stone-400 text-[10px] font-medium">
        © 2026 ZenHogar - Compra 100% Protegida
      </p>
    </div>
  );
}