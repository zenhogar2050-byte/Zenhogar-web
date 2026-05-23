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
        orderData: {
          value: location.state.orderData?.value || 0,
          currency: location.state.orderData?.currency || 'COP',
          email: location.state.orderData?.email || "contacto@zenhogar.live"
        },
        whatsappUrl: location.state.whatsappUrl,
        ticketNumber: location.state.ticketNumber
      };
    }
    
    try {
      const saved = JSON.parse(localStorage.getItem('lastOrder') || '{}');
      if (saved.total) {
        return {
          orderData: { 
            value: saved.total, 
            currency: 'COP', 
            email: saved.email || "contacto@zenhogar.live" 
          },
          whatsappUrl: saved.whatsappUrl || 'https://wa.me/573024102568',
          ticketNumber: saved.ticketNumber || 'N/A'
        };
      }
    } catch (e) {
      console.error('Error loading saved order:', e);
    }
    
    return {
      orderData: { value: 0, currency: 'COP', email: "contacto@zenhogar.live" },
      whatsappUrl: 'https://wa.me/573024102568',
      ticketNumber: 'PENDIENTE'
    };
  };

  const { orderData, whatsappUrl, ticketNumber } = getInitialData();

  // Integración de Google Customer Reviews Opt-In
  useEffect(() => {
    const emailToUse = orderData.email || 'contacto@zenhogar.live';
    const orderIdToUse = ticketNumber || `ZH-${Date.now()}`;
    const countryToUse = 'CO'; // Colombia (CO)

    // Calcular fecha estimada de entrega: Hoy + 3 días en formato YYYY-MM-DD
    const deliveryDateStr = (() => {
      const date = new Date();
      date.setDate(date.getDate() + 3);
      const yyyy = date.getFullYear();
      const mm = String(date.getMonth() + 1).padStart(2, '0');
      const dd = String(date.getDate()).padStart(2, '0');
      return `${yyyy}-${mm}-${dd}`;
    })();

    // Configurar la función global renderOptIn requerida por el script de GAPI
    (window as any).renderOptIn = () => {
      console.log('🚀 GAPI onload: Iniciando renderOptIn de Google Customer Reviews...');
      if ((window as any).gapi) {
        (window as any).gapi.load('surveyoptin', () => {
          console.log('⚙️ GAPI surveyoptin cargado. Renderizando encuesta con:', {
            merchant_id: 5781084661,
            order_id: orderIdToUse,
            email: emailToUse,
            delivery_country: countryToUse,
            estimated_delivery_date: deliveryDateStr,
            opt_in_style: 'BOTTOM_RIGHT_DIALOG'
          });
          
          try {
            (window as any).gapi.surveyoptin.render({
              "merchant_id": 5781084661,
              "order_id": orderIdToUse,
              "email": emailToUse,
              "delivery_country": countryToUse,
              "estimated_delivery_date": deliveryDateStr,
              "opt_in_style": "BOTTOM_RIGHT_DIALOG"
            });
            console.log('✅ Llamada a gapi.surveyoptin.render ejecutada correctamente.');
          } catch (err) {
            console.error('❌ Error al renderizar la encuesta de Google:', err);
          }
        });
      } else {
        console.warn('⚠️ GAPI no está definido en el objeto window al invocar renderOptIn.');
      }
    };

    // Si GAPI ya está cargado por visitas/rutas anteriores, llamamos directamente
    if ((window as any).gapi && (window as any).gapi.surveyoptin) {
      console.log('⚡ GAPI y surveyoptin ya existen, ejecutando renderOptIn directamente.');
      (window as any).renderOptIn();
    }

    // Crear y cargar el script de la plataforma de Google de forma asíncrona
    const script = document.createElement('script');
    script.src = 'https://apis.google.com/js/platform.js?onload=renderOptIn';
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);

    // Limpieza al desmontar el componente
    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
      delete (window as any).renderOptIn;
    };
  }, [ticketNumber, orderData.email]);

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
          <h1 className="text-3xl font-black text-stone-900">¡Excelente!</h1>
          <p className="text-stone-500 font-medium px-4">
            Tu pedido ha sido registrado. En breve recibiras una notificación con la guia. Si quieres puedes confírmarlo por WhatsApp para agilizar su despacho.
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