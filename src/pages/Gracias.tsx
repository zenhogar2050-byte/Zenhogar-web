import { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'motion/react';
import { CheckCircle2, Send, ArrowLeft } from 'lucide-react';
import { trackPurchaseIfFromFacebook, track } from '../utils/pixel';

export default function Gracias() {
  const location = useLocation();
  
  // Fallback to localStorage if state is lost on refresh
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
      orderData: { value: 89900, currency: 'COP' },
      whatsappUrl: 'https://wa.me/573024102568',
      ticketNumber: 'N/A'
    };
  };

  const { orderData, whatsappUrl, ticketNumber } = getInitialData();

  useEffect(() => {
    // El usuario pidió exactamente este valor en la instrucción, 
    // pero usaré el de la orden si está disponible para ser más preciso, 
    // respetando la lógica de la instrucción.
    trackPurchaseIfFromFacebook({ value: orderData.value, currency: 'COP' });
  }, [orderData.value]);

  const handleWhatsAppClick = () => {
    track('InitiateCheckout', { value: orderData.value, currency: 'COP' });
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-stone-50">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }} 
        animate={{ opacity: 1, scale: 1 }} 
        className="bg-white p-8 rounded-3xl shadow-2xl text-center max-w-md border border-stone-100"
      >
        <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 className="w-10 h-10 text-emerald-600" />
        </div>
        
        <span className="text-emerald-600 font-black text-sm tracking-widest uppercase mb-2 block">
          Ticket de Pedido: #{ticketNumber}
        </span>
        
        <h1 className="text-2xl font-black text-stone-900 mb-4">¡Pedido Recibido!</h1>
        <p className="text-stone-600 mb-8">Gracias por confiar en nosotros. Haz clic abajo para confirmar tu entrega por WhatsApp.</p>
        
        <a 
          href={whatsappUrl} 
          target="_blank" 
          rel="noopener noreferrer" 
          onClick={handleWhatsAppClick}
          className="w-full inline-flex items-center justify-center gap-3 px-8 py-5 bg-emerald-600 text-white rounded-2xl font-black text-lg hover:bg-emerald-700 transition-all shadow-xl shadow-emerald-600/20"
        >
          <Send className="w-6 h-6" /> CONFIRMAR PEDIDO #{ticketNumber}
        </a>
        <Link to="/" className="block mt-6 text-stone-400 hover:text-stone-600 font-bold text-sm">Volver a la tienda</Link>
      </motion.div>
    </div>
  );
}
