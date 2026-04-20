import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useCart } from '../CartContext';
import { COLOMBIA_DATA, PRODUCTS, COMBO_OF_THE_MONTH, PROMOTIONS } from '../constants';
import { formatCurrency } from '../utils';
import { Trash2, Plus, Minus, ShoppingBag, Send, CheckCircle2, ArrowLeft } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import { trackPurchaseIfFromFacebook, track } from '../utils/pixel';
import OrderBump from '../components/OrderBump';
import { BUMP_OPPORTUNITIES } from '../lib/bump-logic';
import { saveOrderToFirebase } from '../lib/firebase';

export default function Checkout() {
  const navigate = useNavigate();
  const { items, total, updateQuantity, removeFromCart, clearCart, addComboToCart } = useCart();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    department: '',
    city: '',
  });
  const [hasTrackedAbandoned, setHasTrackedAbandoned] = useState(false);
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes

  useEffect(() => {
    if (timeLeft <= 0) return;
    const timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  useEffect(() => {
    if (items.length === 0 || hasTrackedAbandoned) return;

    // Solo trackear si al menos tiene nombre y teléfono
    if (formData.fullName.length > 3 && formData.phone.length > 6) {
      const timer = setTimeout(async () => {
        try {
          const orderDetails = items.map(item => 
            `- ${item.productName} (${item.promoLabel}) x${item.quantity}`
          ).join('\n');

          // Firebase Tracking (NEW for 2.0/Cloudflare)
          await saveOrderToFirebase({
            customer: formData,
            order_details: orderDetails,
            total: formatCurrency(total),
            type: 'abandoned'
          });

          await fetch('/api/abandoned', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              customer: formData,
              order_details: orderDetails,
              total: formatCurrency(total),
            }),
          });
          setHasTrackedAbandoned(true);
        } catch (e) {
          console.error("Error tracking abandoned cart:", e);
        }
      }, 5000); // 5 segundos de inactividad después de llenar datos básicos

      return () => clearTimeout(timer);
    }
  }, [formData.fullName, formData.phone, items, total, hasTrackedAbandoned]);

  const departments = Object.keys(COLOMBIA_DATA || {});
  const cities = formData.department ? (COLOMBIA_DATA as any)[formData.department] || [] : [];

  // Order Bump Logic for Checkout
  const getBumpOpportunity = () => {
    if (items.length !== 1) return null;
    const item = items[0];
    if (item.promoId !== '1u') return null;
    const opportunity = BUMP_OPPORTUNITIES[item.productId];
    if (!opportunity) return null;
    return { ...opportunity, originalItem: item };
  };

  const bumpOpportunity = getBumpOpportunity();

  const handleBumpAccept = () => {
    if (!bumpOpportunity) return;
    
    track('InitiateCheckout', { 
      content_ids: [String(bumpOpportunity.targetCombo.id)], 
      content_name: bumpOpportunity.targetCombo.name, 
      value: Number(bumpOpportunity.targetCombo.price), 
      currency: 'COP', 
      num_items: 1, 
      content_type: 'product_combo_bump' 
    });

    removeFromCart(bumpOpportunity.originalItem.productId, bumpOpportunity.originalItem.promoId);
    addComboToCart(bumpOpportunity.targetCombo);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
      ...(name === 'department' ? { city: '' } : {}),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (items.length === 0) return;
    
    setIsSubmitting(true);

    const orderDetails = items.map(item => 
      `- ${item.productName} (${item.promoLabel}) x${item.quantity}: ${formatCurrency(item.price * item.quantity)}`
    ).join('\n');

    try {
      // Firebase Saving (Critical for Cloudflare persistence)
      await saveOrderToFirebase({
        customer: formData,
        order_details: orderDetails,
        total: total,
        cart: { items, total },
        type: 'order'
      });

      const sheetsPayload = {
        token: "zenhogar_secret_2026",
        customer: formData,
        order_details: orderDetails,
        total: formatCurrency(total),
      };

      const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbwqnSdoy7ValvFcaQDXegyc511rd4g1RSqhzecQWvx1QFgICPful7Wpgcdq1P_Cw8yR_Q/exec";

      const response = await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify(sheetsPayload),
      });

      const result = await response.json();
      let currentTicket = result.ticket || "N/A";

      const message = `*🛍️ PEDIDO #${currentTicket} - ZENHOGAR*\n\n` +
        `*PRODUCTOS:*\n${orderDetails}\n\n` +
        `*TOTAL A PAGAR:* ${formatCurrency(total)}\n\n` +
        `*DATOS DEL CLIENTE:*\n` +
        `👤 *Nombre:* ${formData.fullName}\n` +
        `📧 *Email:* ${formData.email}\n` +
        `📱 *Teléfono:* ${formData.phone}\n\n` +
        `*DIRECCIÓN DE ENVÍO:*\n` +
        `🏠 *Dirección:* ${formData.address}\n` +
        `📍 *Ciudad:* ${formData.city}\n` +
        `🗺️ *Departamento:* ${formData.department}\n\n` +
        `_Por favor, confirma mi pedido. ¡Gracias!_`;

      const encodedMessage = encodeURIComponent(message);
      const finalWhatsappUrl = `https://api.whatsapp.com/send?phone=573024102568&text=${encodedMessage}`;
      
      localStorage.setItem('lastOrder', JSON.stringify({ 
        total: total, 
        ticketNumber: currentTicket,
        whatsappUrl: finalWhatsappUrl,
        items: items.map(i => ({
          id: i.productId, 
          name: i.productName, 
          price: i.price, 
          qty: i.quantity
        })) 
      }));

      clearCart();
      navigate('/gracias', { 
        state: { 
          orderData: { value: total, currency: 'COP' },
          whatsappUrl: finalWhatsappUrl,
          ticketNumber: currentTicket
        } 
      });
      window.scrollTo(0, 0);
      
    } catch (error) {
      console.error('Error:', error);
      navigate('/gracias', { 
        state: { 
          orderData: { value: total, currency: 'COP' },
          whatsappUrl: `https://api.whatsapp.com/send?phone=573024102568&text=${encodeURIComponent('Error al procesar pedido, por favor contactar soporte.')}`,
          ticketNumber: 'ERROR'
        } 
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-stone-50 py-12">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <Link to="/" className="inline-flex items-center gap-2 text-stone-500 hover:text-stone-900 mb-8 font-bold transition-colors">
          <ArrowLeft className="w-4 h-4" /> Volver a la tienda
        </Link>
        <div className="grid lg:grid-cols-12 gap-12">
          
          {/* Columna Izquierda: Resumen con Imagen */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-stone-100">
              <h1 className="text-2xl font-bold text-stone-900 flex items-center gap-3 mb-4">
                <ShoppingBag className="w-6 h-6 text-emerald-600" /> Resumen de Compra
              </h1>

              {/* Countdown Urgency */}
              <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 mb-8 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
                  <p className="text-xs font-bold text-amber-900 uppercase tracking-wider">Tu descuento está reservado por:</p>
                </div>
                <div className="bg-white px-4 py-1.5 rounded-xl border border-amber-200 text-amber-700 font-mono font-black text-lg">
                  {formatTime(timeLeft)}
                </div>
              </div>

              <div className="space-y-6">
                <AnimatePresence mode="popLayout">
                  {items.map((item) => (
                    <motion.div 
                      key={`${item.productId}-${item.promoId}`} 
                      layout
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="flex gap-4 p-4 rounded-2xl bg-stone-50 border border-stone-100"
                    >
                      {/* Lógica de Imagen Integrada */}
                      <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl overflow-hidden bg-white border border-stone-200 flex-shrink-0 flex items-center justify-center p-1">
                        <img
                          src={(
                            PRODUCTS.find(p => p.id === item.productId)?.image || 
                            PROMOTIONS.find(p => p.id === item.productId)?.image || 
                            (item.productId === COMBO_OF_THE_MONTH.id ? COMBO_OF_THE_MONTH.image : null)
                          ) || undefined}
                          alt={item.productName}
                          className="max-w-full max-h-full object-contain"
                          referrerPolicy="no-referrer"
                        />
                      </div>

                      <div className="flex-grow">
                        <div className="flex justify-between">
                          <h3 className="text-sm font-bold text-stone-900">{item.productName}</h3>
                          <button 
                            onClick={() => removeFromCart(item.productId, item.promoId)} 
                            className="text-stone-400 hover:text-red-500 transition-colors p-1"
                            aria-label={`Eliminar ${item.productName} del carrito`}
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                        <p className="text-xs text-stone-500 mb-2">{item.promoLabel}</p>
                        <div className="flex justify-between items-center">
                          <div className="flex items-center gap-2 bg-white border rounded-lg px-2 py-1">
                            <button 
                              onClick={() => updateQuantity(item.productId, item.promoId, item.quantity - 1)} 
                              className="hover:text-emerald-600 p-1"
                              aria-label="Disminuir cantidad"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="text-sm font-bold min-w-[20px] text-center">{item.quantity}</span>
                            <button 
                              onClick={() => updateQuantity(item.productId, item.promoId, item.quantity + 1)} 
                              className="hover:text-emerald-600 p-1"
                              aria-label="Aumentar cantidad"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                          <span className="font-bold text-emerald-700">{formatCurrency(item.price * item.quantity)}</span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
              <div className="mt-8 pt-8 border-t border-stone-100 flex justify-between items-center">
                <span className="text-xl font-bold text-stone-900">Total</span>
                <span className="text-3xl font-black text-emerald-700">{formatCurrency(total)}</span>
              </div>
            </div>
          </div>

          {/* Columna Derecha: Formulario */}
          <div className="lg:col-span-5">
            <div className="bg-white rounded-3xl p-8 shadow-xl border border-stone-100 sticky top-24">
              <h2 className="text-2xl font-bold text-stone-900 mb-8">Envío y Pago</h2>
              <form onSubmit={handleSubmit} className="space-y-5">
                <input required type="text" name="fullName" value={formData.fullName} onChange={handleInputChange} placeholder="Nombre Completo" className="w-full px-5 py-4 rounded-2xl bg-stone-50 border border-stone-200 outline-none focus:border-emerald-500 transition-all" />
                <input required type="email" name="email" value={formData.email} onChange={handleInputChange} placeholder="Correo Electrónico" className="w-full px-5 py-4 rounded-2xl bg-stone-50 border border-stone-200 outline-none focus:border-emerald-500 transition-all" />
                <input required type="tel" name="phone" value={formData.phone} onChange={handleInputChange} placeholder="WhatsApp" className="w-full px-5 py-4 rounded-2xl bg-stone-50 border border-stone-200 outline-none focus:border-emerald-500 transition-all" />
                <input required type="text" name="address" value={formData.address} onChange={handleInputChange} placeholder="Dirección Exacta" className="w-full px-5 py-4 rounded-2xl bg-stone-50 border border-stone-200 outline-none focus:border-emerald-500 transition-all" />
                
                <div className="grid grid-cols-2 gap-4">
                  <select required name="department" value={formData.department} onChange={handleInputChange} className="w-full px-5 py-4 rounded-2xl bg-stone-50 border border-stone-200 outline-none focus:border-emerald-500 appearance-none">
                    <option value="">Departamento</option>
                    {departments.map(d => <option key={d} value={d}>{d}</option>)}
                  </select>
                  <select required name="city" value={formData.city} onChange={handleInputChange} disabled={!formData.department} className="w-full px-5 py-4 rounded-2xl bg-stone-50 border border-stone-200 outline-none focus:border-emerald-500 disabled:opacity-50 appearance-none">
                    <option value="">Ciudad</option>
                    {cities.map((c: string) => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>

                {bumpOpportunity && (
                  <div className="pt-2">
                    <OrderBump
                      productName={bumpOpportunity.originalItem.productName}
                      complementName={bumpOpportunity.complementName}
                      bumpPrice={bumpOpportunity.bumpPrice}
                      savings={bumpOpportunity.savings}
                      onAccept={handleBumpAccept}
                    />
                  </div>
                )}

                <div className="space-y-4">
                  <button type="submit" disabled={isSubmitting || items.length === 0} className="w-full py-5 bg-emerald-600 text-white rounded-2xl font-black text-xl hover:bg-emerald-700 transition-all shadow-xl shadow-emerald-600/20 flex items-center justify-center gap-3 disabled:opacity-50 active:scale-95">
                    {isSubmitting ? (
                      <div className="w-6 h-6 border-4 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        ¡SÍ! ENVIAR MI PEDIDO AHORA
                      </>
                    )}
                  </button>
                  
                  <div className="flex flex-col items-center gap-3">
                    <p className="text-center text-[10px] text-stone-400 font-bold uppercase tracking-widest flex items-center gap-2">
                       <CheckCircle2 className="w-3 h-3 text-emerald-500" /> Pago 100% Seguro Contra Entrega
                    </p>
                    <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6 transition-all duration-500 py-6">
                      <div className="flex flex-col items-center">
                        <img src="/assets/partners/coordinadora.webp" alt="Coordinadora" className="h-12 transition-all object-contain" referrerPolicy="no-referrer" onError={(e) => { e.currentTarget.style.display='none'; e.currentTarget.nextSibling.style.display='block'; }} />
                        <span className="hidden text-[10px] font-black text-stone-400">COORDINADORA</span>
                      </div>
                      <div className="flex flex-col items-center">
                        <img src="/assets/partners/servientrega.webp" alt="Servientrega" className="h-12 transition-all object-contain" referrerPolicy="no-referrer" onError={(e) => { e.currentTarget.style.display='none'; e.currentTarget.nextSibling.style.display='block'; }} />
                        <span className="hidden text-[10px] font-black text-stone-400">SERVIENTREGA</span>
                      </div>
                      <div className="flex flex-col items-center">
                        <img src="/assets/partners/interrapidisimo.webp" alt="Interrapidisimo" className="h-12 transition-all object-contain" referrerPolicy="no-referrer" onError={(e) => { e.currentTarget.style.display='none'; e.currentTarget.nextSibling.style.display='block'; }} />
                        <span className="hidden text-[10px] font-black text-stone-400">INTERRAPIDISIMO</span>
                      </div>
                      <div className="flex flex-col items-center">
                        <img src="/assets/partners/swayp.webp" alt="Swayp" className="h-12 transition-all object-contain" referrerPolicy="no-referrer" onError={(e) => { e.currentTarget.style.display='none'; e.currentTarget.nextSibling.style.display='block'; }} />
                        <span className="hidden text-[10px] font-black text-stone-400">SWAYP</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Steps Section */}
                <div className="mt-8 pt-6 border-t border-stone-100">
                  <p className="text-[10px] font-black text-stone-400 uppercase tracking-widest mb-4 text-center">¿Qué pasará después de mi compra?</p>
                  <div className="grid grid-cols-3 gap-2">
                    <div className="text-center">
                      <div className="w-8 h-8 rounded-full bg-stone-100 flex items-center justify-center text-xs font-black text-stone-500 mx-auto mb-2">1</div>
                      <p className="text-[9px] font-bold text-stone-600 leading-tight">Confirmamos por WhatsApp</p>
                    </div>
                    <div className="text-center">
                      <div className="w-8 h-8 rounded-full bg-stone-100 flex items-center justify-center text-xs font-black text-stone-500 mx-auto mb-2">2</div>
                      <p className="text-[9px] font-bold text-stone-600 leading-tight">Despachamos de inmediato</p>
                    </div>
                    <div className="text-center">
                      <div className="w-8 h-8 rounded-full bg-stone-100 flex items-center justify-center text-xs font-black text-stone-500 mx-auto mb-2">3</div>
                      <p className="text-[9px] font-bold text-stone-600 leading-tight">Pagas al recibir en casa</p>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}