import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { PROMOTIONS, COMBO_OF_THE_MONTH, GENERAL_FAQS } from '../constants';
import FAQSection from '../components/FAQSection';
import { useCart } from '../CartContext';
import { CheckCircle2, ShoppingCart, ArrowLeft, Star, Zap, ShieldCheck, TrendingUp, Info, ChevronDown, ChevronUp } from 'lucide-react';
import { cn, formatCurrency, cleanPromoName } from '../utils';
import Footer from '../components/Footer';
import SEOManager from '../components/SEOManager';
import TrustBar from '../components/TrustBar';
import ConfidenceBadges from '../components/ConfidenceBadges';
import { track } from '../utils/pixel';
import { useEffect, useState } from 'react';

export default function ComboLanding() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addComboToCart } = useCart();

  const combo = PROMOTIONS.find(p => p.id === id) || (COMBO_OF_THE_MONTH.id === id ? COMBO_OF_THE_MONTH : null);

  useEffect(() => {
    if (combo) {
      track('ViewContent', { 
        content_ids: [String(combo.id)], 
        content_name: combo.name, 
        value: Number(combo.price), 
        currency: 'COP', 
        content_type: 'product' 
      });
    }
  }, [combo?.id]);

  if (!combo) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <h1 className="text-2xl font-bold mb-4">Combo no encontrado</h1>
        <button onClick={() => navigate(-1)} className="text-emerald-600 font-bold flex items-center gap-2">
          <ArrowLeft className="w-5 h-5" /> Volver
        </button>
      </div>
    );
  }

  const handleBuyNow = () => {
    track('InitiateCheckout', { 
      content_ids: [String(combo.id)], 
      content_name: combo.name, 
      value: Number(combo.price), 
      currency: 'COP', 
      num_items: 1, 
      content_type: 'product' 
    });
    addComboToCart(combo);
    navigate('/checkout');
  };

  return (
    <div className="min-h-screen bg-white">
      <SEOManager 
        title={cleanPromoName(combo.name)}
        description={`${combo.description} Aprovecha este combo exclusivo de productos naturales originales.`}
        canonicalUrl={`/combo/${combo.id}`}
        ogImage={combo.image}
        type="product"
        productData={{
          id: combo.id,
          name: combo.name,
          category: "Combos de Salud",
          lowPrice: combo.price,
          highPrice: combo.originalPrice || combo.price,
          offerCount: 1,
          faqs: combo.seoFaqs,
          reviews: combo.testimonials
        }}
      />

      {/* Hero Section */}
      <section className="relative pt-4 pb-12 lg:pt-8 lg:pb-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <button 
            onClick={() => navigate(-1)}
            className="mb-4 flex items-center gap-2 text-stone-500 hover:text-emerald-600 transition-colors font-medium"
          >
            <ArrowLeft className="w-4 h-4" /> Volver
          </button>

          <div className="grid lg:grid-cols-[1.2fr_1fr] gap-8 lg:gap-16 items-start">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="relative lg:sticky lg:top-8"
            >
              <div className="aspect-square rounded-[3rem] overflow-hidden shadow-2xl bg-stone-50 flex items-center justify-center p-6 lg:p-8">
                <img
                  src={combo.image}
                  alt={combo.name}
                  width={800}
                  height={800}
                  loading="eager"
                  fetchPriority="high"
                  className="max-w-full max-h-full object-contain group-hover:scale-105 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="absolute -top-6 -right-6 bg-emerald-600 text-white px-8 py-4 rounded-2xl shadow-2xl font-black text-lg flex items-center gap-3 z-10">
                <Star className="w-6 h-6 fill-current" />
                <span>OFERTA ESPECIAL</span>
              </div>
              
              {/* Why buy section below image */}
              <div className="mt-8 p-6 bg-emerald-50 rounded-3xl border border-emerald-100">
                <h3 className="text-[27px] font-bold text-emerald-900 mb-3 flex items-center gap-2">
                  <Info className="w-6 h-6" /> {combo.whyChoose?.title || '¿Por qué elegir este combo?'}
                </h3>
                <p className="text-[21px] text-emerald-800 leading-relaxed">
                  {combo.whyChoose?.description || 'Este combo ha sido diseñado para ofrecerte una solución integral y efectiva, combinando lo mejor de nuestros productos para potenciar tu bienestar natural.'}
                </p>
              </div>

              <FAQSection 
                specificFaqs={combo.seoFaqs} 
                generalFaqs={GENERAL_FAQS} 
              />

              <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-emerald-50/50 blur-[100px] rounded-full" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="inline-block px-3 py-1 rounded-lg bg-emerald-100 text-emerald-700 text-[10px] font-black uppercase tracking-widest mb-4">
                {combo.badge}
              </div>
              <h1 className="text-3xl lg:text-5xl font-bold text-[var(--color-brand-primary)] mb-6 leading-tight font-display">
                {cleanPromoName(combo.name)}
              </h1>
              
              <div className="flex flex-col gap-1 mb-4">
                <span className="text-[20px] font-black text-emerald-600 uppercase tracking-wider">Es útil para:</span>
                <p className="text-lg font-bold text-stone-800 leading-tight">
                  {combo.description}
                </p>
              </div>

              <div className="space-y-4 mb-10">
                <h3 className="font-black text-stone-900 uppercase tracking-wider text-sm">Beneficios del Combo:</h3>
                {combo.benefits?.map((benefit, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    </div>
                    <span className="text-stone-700 font-medium">{benefit}</span>
                  </div>
                ))}
              </div>

              <div className="p-8 bg-stone-900 text-white rounded-[2.5rem] shadow-2xl relative overflow-hidden">
                <div className="relative z-10">
                  <div className="flex items-center gap-2 text-emerald-400 font-bold mb-6">
                    <TrendingUp className="w-5 h-5" />
                    <span>Ahorro Inmediato</span>
                  </div>
                  
                  <div className="mb-8">
                    <div className="text-stone-500 text-sm line-through mb-1">Precio Regular: {formatCurrency(combo.originalPrice)}</div>
                    <div className="flex items-baseline gap-3">
                      <span className="text-4xl lg:text-5xl font-black text-white">Solo por {formatCurrency(combo.price)}</span>
                    </div>
                    <div className="mt-2 inline-block bg-emerald-600/20 text-emerald-400 px-3 py-1 rounded-lg text-xs font-bold">
                      Ahorras {formatCurrency(combo.originalPrice - combo.price)}
                    </div>
                  </div>

                  <button
                    onClick={handleBuyNow}
                    className="w-full py-5 bg-emerald-600 text-white rounded-2xl font-black text-lg hover:bg-emerald-700 transition-all shadow-xl shadow-emerald-600/20 flex items-center justify-center gap-3 group"
                  >
                    <ShoppingCart className="w-6 h-6 group-hover:scale-110 transition-transform" />
                    APROVECHAR OFERTA
                  </button>

                  <ConfidenceBadges className="mt-4 bg-white/5 border-white/10" />
                  
                  <p className="text-center text-sm font-black text-emerald-400 mt-6 flex flex-col sm:flex-row items-center justify-center gap-2 bg-white/5 py-4 px-6 rounded-2xl border border-white/10">
                    <Zap className="w-5 h-5 fill-emerald-400 text-emerald-400 animate-pulse" />
                    <span>Envío GRATIS + Pago Contra Entrega + Incluye Obsequio 🎁</span>
                  </p>
                  
                  <TrustBar className="mt-8 border-white/10 text-white" />
                </div>

                {/* Background pattern */}
                <div className="absolute top-0 right-0 w-full h-full opacity-[0.05] pointer-events-none">
                  <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                      <pattern id="grid-combo" width="30" height="30" patternUnits="userSpaceOnUse">
                        <path d="M 30 0 L 0 0 0 30" fill="none" stroke="white" strokeWidth="1"/>
                      </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#grid-combo)" />
                  </svg>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-stone-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-stone-900 mb-12">Experiencias de nuestros clientes</h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {combo.testimonials?.map((testimonial, i) => (
              <div key={i} className="bg-white p-8 rounded-3xl shadow-sm border border-stone-100">
                <div className="flex justify-center gap-1 mb-4 text-amber-400">
                  {[...Array(5)].map((_, s) => (
                    <Star 
                      key={s} 
                      className={cn(
                        "w-5 h-5 fill-current",
                        s >= testimonial.rating && "text-stone-200"
                      )} 
                    />
                  ))}
                </div>
                <p className="text-stone-600 italic mb-6">"{testimonial.text}"</p>
                <div className="font-bold text-stone-900">{testimonial.name}</div>
                <div className="text-sm text-stone-400">Cliente Verificado</div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
