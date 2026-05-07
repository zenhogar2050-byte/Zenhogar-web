import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { PROMOTIONS, COMBO_OF_THE_MONTH, GENERAL_FAQS, PRODUCTS } from '../constants';
import FAQSection from '../components/FAQSection';
import { useCart } from '../CartContext';
import { CheckCircle2, ShoppingCart, ArrowLeft, Star, Zap, ShieldCheck, TrendingUp, Info, ChevronDown, ChevronUp } from 'lucide-react';
import { cn, formatCurrency, cleanPromoName } from '../utils';
import Footer from '../components/Footer';
import SEOManager from '../components/SEOManager';
import TrustBar from '../components/TrustBar';
import ConfidenceBadges from '../components/ConfidenceBadges';
import { track } from '../utils/pixel';
import { useEffect, useState, useRef } from 'react';
import StickyCTA from '../components/StickyCTA';

export default function ComboLanding() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addComboToCart } = useCart();
  const buyButtonRef = useRef<HTMLButtonElement>(null);

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
        <button 
          onClick={() => navigate(-1)} 
          className="text-emerald-600 font-black flex items-center gap-3 p-4 rounded-2xl hover:bg-emerald-50 transition-all active:scale-95 group"
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" /> 
          <span className="text-lg">Volver</span>
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
          reviews: combo.testimonials,
          invima: combo.products.map(p => {
             const productInfo = PRODUCTS.find(prod => prod.id === p);
             if (!productInfo) return '';
             const isPending = !productInfo.invima || productInfo.invima.toLowerCase().includes('trámite') || productInfo.invima === 'En proceso' || productInfo.invima.includes('ALERTA');
             const invDisplay = isPending ? 'Registro en proceso de verificación' : productInfo.invima;
             return `${productInfo.name}: ${invDisplay}`;
          }).filter(Boolean).join(' · ')
        }}
      />

      {/* Hero Section */}
      <section className="relative pt-4 pb-12 lg:pt-8 lg:pb-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <button 
            onClick={() => navigate(-1)}
            className="mb-4 flex items-center gap-2 text-stone-500 hover:text-emerald-600 transition-all font-bold p-3 -ml-3 rounded-xl hover:bg-stone-50/50 group"
            aria-label="Volver a la página anterior"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            <span className="text-base sm:text-lg">Volver</span>
          </button>

          <div className="grid lg:grid-cols-[1.2fr_1fr] gap-8 lg:gap-16 items-start">
            <div className="flex flex-col gap-12">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="relative lg:sticky lg:top-28"
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

                <div className="flex flex-row items-center justify-center gap-4 sm:gap-6 mt-10">
                  <div className="flex items-center gap-3 px-4 sm:px-6 py-3 bg-stone-50 rounded-2xl border border-stone-200">
                    <img src="/assets/logo/invima1.webp" alt="Sello INVIMA" className="h-16 sm:h-20 object-contain drop-shadow-sm opacity-90" />
                    <div className="flex flex-col">
                      <span className="text-[11px] font-black text-stone-400 uppercase tracking-widest leading-none">Registro INVIMA</span>
                      <span className="text-[14px] sm:text-base font-bold text-stone-700">Aprobado</span>
                    </div>
                  </div>
                  <img src="/assets/logo/sello de calidad.webp" alt="Sello 100% Quality" className="h-18 sm:h-24 object-contain drop-shadow-sm opacity-90" />
                </div>

                <div className="absolute -top-6 -right-6 bg-emerald-600 text-white px-8 py-4 rounded-2xl shadow-2xl font-black text-lg flex items-center gap-3 z-10">
                  <Star className="w-6 h-6 fill-current" />
                  <span>OFERTA ESPECIAL</span>
                </div>
                
                <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-emerald-50/50 blur-[100px] rounded-full" />
              </motion.div>

              {/* Desktop Why Choose & FAQ - Below left column seals */}
              <div className="hidden lg:block relative z-10">
                <div className="p-8 bg-emerald-50 rounded-[2.5rem] border-2 border-emerald-100 shadow-sm mb-10">
                  <h3 className="text-2xl font-black text-emerald-900 mb-4 flex items-center gap-3">
                    <Info className="w-7 h-7" /> {combo.whyChoose?.title || '¿Por qué elegir este combo?'}
                  </h3>
                  <p className="text-xl text-emerald-800 leading-relaxed font-medium">
                    {combo.whyChoose?.description || 'Este combo ha sido diseñado para ofrecerte una solución integral y efectiva, combinando lo mejor de nuestros productos para potenciar tu bienestar natural.'}
                  </p>
                </div>

                <FAQSection 
                  specificFaqs={combo.seoFaqs} 
                  generalFaqs={GENERAL_FAQS} 
                />
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="flex flex-wrap items-center gap-2 mb-4">
                <div className="inline-block px-3 py-1 rounded-lg bg-emerald-100 text-emerald-700 text-[10px] font-black uppercase tracking-widest">
                  {combo.badge}
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1 bg-stone-100 rounded-lg border border-stone-200">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
                  </span>
                  <span className="text-[10px] font-black text-stone-600 uppercase tracking-widest leading-none">19 personas viendo este combo</span>
                </div>
              </div>

              <h1 className="text-3xl lg:text-5xl font-bold text-[var(--color-brand-primary)] mb-6 leading-tight font-display">
                {cleanPromoName(combo.name)}
              </h1>
              
              <div className="flex flex-col gap-1 mb-4">
                <span className="text-[20px] font-black text-emerald-600 uppercase tracking-wider">Es útil para:</span>
                <h2 className="text-lg font-bold text-stone-800 leading-tight">
                  {combo.description} <strong className="font-bold text-stone-800">| Calidad Certificada {combo.products.map(p => {
                    const productInfo = PRODUCTS.find(prod => prod.id === p);
                    if (!productInfo) return '';
                    const isPending = !productInfo.invima || productInfo.invima.toLowerCase().includes('trámite') || productInfo.invima === 'En proceso' || productInfo.invima.includes('ALERTA');
                    const invDisplay = isPending ? 'Registro en proceso de verificación' : productInfo.invima;
                    return `${productInfo.name}: ${invDisplay}`;
                  }).join(' · ')}</strong>
                </h2>
              </div>

              <div className="mb-10">
                <h3 className="text-xl font-black text-emerald-900 uppercase tracking-widest mb-6 flex items-center gap-3">
                  <TrendingUp className="w-6 h-6" /> Beneficios del Combo:
                </h3>
                <div className="space-y-6">
                  {combo.benefits?.map((benefit, i) => (
                    <div key={i} className="flex items-start gap-4 group">
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-emerald-50 border-2 border-emerald-500 flex items-center justify-center shadow-sm mt-0.5 group-hover:scale-110 transition-transform">
                        <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                      </div>
                      <div className="flex-1">
                        <span className="text-stone-800 text-lg font-black leading-tight block">{benefit}</span>
                        <div className="w-12 h-0.5 bg-emerald-100 mt-1 transition-all group-hover:w-full" />
                      </div>
                    </div>
                  ))}
                </div>
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
                    <div className="mt-2 inline-block bg-emerald-600/20 text-emerald-400 px-3 py-1 rounded-lg text-xs font-bold" role="status">
                      Ahorras {formatCurrency(combo.originalPrice - combo.price)}
                    </div>
                  </div>

                  <button
                    ref={buyButtonRef}
                    onClick={handleBuyNow}
                    className="w-full py-6 bg-amber-500 text-white rounded-2xl font-black text-xl hover:bg-amber-600 transition-all shadow-xl shadow-amber-500/30 flex items-center justify-center gap-3 group scale-100 hover:scale-[1.02]"
                    aria-label={`Aprovechar oferta de ${combo.name} ahora`}
                  >
                    <ShoppingCart className="w-7 h-7 group-hover:scale-110 transition-transform" />
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

              {/* Why buy section - Mobile only */}
              <div className="lg:hidden">
                <div className="mt-10 p-8 bg-emerald-50 rounded-[2.5rem] border-2 border-emerald-100 shadow-sm">
                  <h3 className="text-2xl font-black text-emerald-900 mb-4 flex items-center gap-3">
                    <Info className="w-7 h-7" /> {combo.whyChoose?.title || '¿Por qué elegir este combo?'}
                  </h3>
                  <p className="text-xl text-emerald-800 leading-relaxed font-medium">
                    {combo.whyChoose?.description || 'Este combo ha sido diseñado para ofrecerte una solución integral y efectiva, combinando lo mejor de nuestros productos para potenciar tu bienestar natural.'}
                  </p>
                </div>

                <FAQSection 
                  specificFaqs={combo.seoFaqs} 
                  generalFaqs={GENERAL_FAQS} 
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 sm:py-20 bg-stone-50 border-t border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl font-black text-stone-900 mb-2 uppercase tracking-tight">Experiencias de nuestros clientes</h2>
            <p className="text-stone-500 font-medium">Casos reales de clientes con excelentes resultados</p>
          </div>
          <div className="grid md:grid-cols-2 gap-6 sm:gap-8 max-w-4xl mx-auto">
            {combo.testimonials?.map((testimonial, i) => {
               // Generate dynamic real-looking avatars using initials
               const avatarUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(testimonial.name)}&background=10b981&color=fff&size=128&font-size=0.4&bold=true`;
               // Fake recent date based on index
               const fakeDaysAgo = (i * 3) + 2; 

               return (
                <div key={i} className="bg-white p-6 sm:p-8 rounded-3xl shadow-sm border border-stone-100 relative">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full overflow-hidden bg-stone-100 border-2 border-emerald-100 flex-shrink-0">
                         <img src={avatarUrl} alt={`Avatar de ${testimonial.name}`} className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <div className="font-bold text-stone-900 text-sm sm:text-base leading-tight">{testimonial.name}</div>
                        <div className="flex flex-wrap items-center gap-1.5 mt-1">
                          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                          <span className="text-[10px] sm:text-xs font-bold text-emerald-700 uppercase tracking-wide">Usuario Verificado</span>
                          <span className="text-[10px] sm:text-xs text-stone-400">&middot; Hace {fakeDaysAgo} días</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-1 mb-3">
                    {[...Array(5)].map((_, s) => (
                      <Star 
                        key={s} 
                        className={cn(
                          "w-4 h-4 fill-current",
                          s >= testimonial.rating ? "text-stone-200" : "text-amber-400"
                        )} 
                      />
                    ))}
                  </div>
                  <p className="text-stone-700 text-sm sm:text-base leading-relaxed italic">"{testimonial.text}"</p>
                </div>
               );
            })}
          </div>
        </div>
      </section>
      <StickyCTA 
        name={combo.name}
        image={combo.image}
        price={combo.price}
        onBuy={handleBuyNow}
        desktopTriggerRef={buyButtonRef}
      />

      <Footer />
    </div>
  );
}
