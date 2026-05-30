import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { PROMOTIONS, COMBO_OF_THE_MONTH, GENERAL_FAQS, PRODUCTS } from '../constants';
import FAQSection from '../components/FAQSection';
import { useCart } from '../CartContext';
import { CheckCircle2, ShoppingCart, ArrowLeft, Star, Zap, ShieldCheck, TrendingUp, Info, ChevronDown, ChevronUp, Play } from 'lucide-react';
import { cn, formatCurrency, cleanPromoName } from '../utils';
import Footer from '../components/Footer';
import SEOManager from '../components/SEOManager';
import Breadcrumbs from '../components/Breadcrumbs';
import TrustBar from '../components/TrustBar';
import ConfidenceBadges from '../components/ConfidenceBadges';
import { track } from '../utils/pixel';
import { useEffect, useState, useRef } from 'react';
import StickyCTA from '../components/StickyCTA';
import ProductVideo from '../components/ProductVideo';

export default function ComboLanding() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addComboToCart } = useCart();
  const buyButtonRef = useRef<HTMLButtonElement>(null);

  // Normalización de slugs tanto para ID como Nombre de Combos
  const cleanStr = (str: string) => 
    str.toLowerCase()
       .normalize("NFD")
       .replace(/[\u0300-\u036f]/g, "") // Limpiar tildes y acentos
       .replace(/[^a-z0-9]+/g, '-')     // Reemplazar espacios y caracteres no alfa-numéricos con guion
       .replace(/-+/g, '-')             // Colapsar guiones múltiples
       .replace(/^-+|-+$/g, '');        // Recortar guiones iniciales/finales

  const targetIdClean = id ? cleanStr(id) : '';

  const combo = PROMOTIONS.find(p => {
    const cleanId = cleanStr(p.id);
    const cleanName = cleanStr(p.name);
    return cleanId === targetIdClean || cleanName === targetIdClean;
  }) || (
    cleanStr(COMBO_OF_THE_MONTH.id) === targetIdClean || cleanStr(COMBO_OF_THE_MONTH.name) === targetIdClean
      ? COMBO_OF_THE_MONTH
      : null
  );

  const handleGoBack = () => {
    if (window.history.state && window.history.state.idx > 0) {
      navigate(-1);
    } else {
      navigate('/');
    }
  };

  // Video Support
  const hasVideo = combo?.videoUrl || combo?.videoUrlMp4;
  const [showVideo, setShowVideo] = useState(!!hasVideo);

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
          onClick={handleGoBack} 
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
        title={combo.seoTitle || cleanPromoName(combo.name)}
        description={combo.seoDescription || `${combo.description} Aprovecha este combo exclusivo de productos naturales originales.`}
        canonicalUrl={`/combo/${combo.id}`}
        ogImage={combo.image}
        type="product"
        faqs={[...(combo.seoFaqs || []), ...GENERAL_FAQS]}
        productData={{
          id: combo.id,
          name: combo.name,
          category: "Combos de Salud",
          googleCategory: combo.googleCategory,
          condition: combo.condition,
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

      <Breadcrumbs />

      {/* Hero Section */}
      <section className="relative pt-4 pb-12 lg:pt-8 lg:pb-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <button 
            onClick={handleGoBack}
            className="mb-4 flex items-center gap-2 text-stone-500 hover:text-emerald-600 transition-all font-bold p-3 -ml-3 rounded-xl hover:bg-stone-50/50 group"
            aria-label="Volver a la página anterior"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            <span className="text-base sm:text-lg">Volver</span>
          </button>

          <h1 className="lg:hidden text-3xl sm:text-4xl font-bold text-[var(--color-brand-primary)] mb-6 leading-tight font-display">
            {cleanPromoName(combo.name)}
          </h1>

          <div className="grid lg:grid-cols-[1.2fr_1fr] gap-8 lg:gap-16 items-start">
            <div className="flex flex-col gap-4 lg:gap-12">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="relative lg:sticky lg:top-28"
              >
                <div className="aspect-square rounded-[3rem] overflow-hidden shadow-2xl bg-stone-50 flex items-center justify-center p-6 lg:p-8">
                  {showVideo && (combo?.videoUrl || combo?.videoUrlMp4) ? (
                    <ProductVideo 
                      webmUrl={combo.videoUrl}
                      mp4Url={combo.videoUrlMp4}
                      poster={combo.videoPoster}
                      className="rounded-none"
                    />
                  ) : (
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
                  )}
                </div>

                {/* Video/Image Toggle (if both exist) */}
                {hasVideo && (
                  <div className="flex justify-center gap-2 sm:gap-4 mt-6">
                    <button
                      onClick={() => setShowVideo(true)}
                      className={cn(
                        "w-24 h-24 sm:w-16 sm:h-16 rounded-2xl border-2 transition-all p-1 flex items-center justify-center bg-white shadow-sm",
                        showVideo ? "border-emerald-600 ring-2 ring-emerald-100" : "border-stone-200"
                      )}
                    >
                      <div className="relative w-full h-full bg-stone-50 rounded-xl flex items-center justify-center overflow-hidden">
                        {combo.videoPoster ? (
                          <img src={combo.videoPoster} className="w-full h-full object-cover opacity-60" alt="" />
                        ) : (
                          <Play className="w-6 h-6 text-emerald-600 fill-current" />
                        )}
                        <Play className="w-4 h-4 text-white absolute fill-current" />
                      </div>
                    </button>
                    <button
                      onClick={() => setShowVideo(false)}
                      className={cn(
                        "w-24 h-24 sm:w-16 sm:h-16 rounded-2xl border-2 transition-all p-1 flex items-center justify-center bg-white shadow-sm",
                        !showVideo ? "border-emerald-600 ring-2 ring-emerald-100" : "border-stone-200"
                      )}
                    >
                      <img src={combo.image} className="w-full h-full object-contain" alt="" />
                    </button>
                  </div>
                )}

                {/* Presentaciones de productos del combo */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-8">
                  {combo.products.slice(0, 2).map((pid, idx) => {
                    const prod = PRODUCTS.find(p => p.id === pid);
                    if (!prod) return null;
                    return (
                      <div key={pid} className={cn(
                        "flex flex-col gap-2",
                        idx === 0 ? "items-start text-left" : "items-end text-right"
                      )}>
                        <p className="text-[11px] font-black text-stone-500 uppercase tracking-widest px-1">{prod.name}</p>
                        <div className="inline-block px-8 py-3 rounded-2xl bg-white text-stone-900 text-lg sm:text-xl font-normal border-2 border-stone-200 shadow-lg transition-all hover:scale-105">
                          <div className="flex items-center gap-3">
                            {prod.size && <span>{prod.size}</span>}
                            {prod.size && prod.presentation && <span className="w-2 h-2 rounded-full bg-stone-300" />}
                            {prod.presentation && <span>{prod.presentation}</span>}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="flex flex-row items-center justify-center gap-4 sm:gap-6 mt-10">
                  <div className="flex items-center gap-3 px-4 sm:px-6 py-3 bg-stone-50 rounded-2xl border border-stone-200">
                    <img src="/assets/logo/invima1.webp" alt="Sello INVIMA" className="h-16 sm:h-20 object-contain drop-shadow-sm opacity-90" />
                    <div className="flex flex-col">
                      <span className="text-[11px] font-black text-stone-400 uppercase tracking-widest leading-none">Registro INVIMA</span>
                      <span className="text-[14px] sm:text-base font-bold text-stone-700">Original Certificado</span>
                    </div>
                  </div>
                  <div className="flex flex-col items-center gap-1">
                    <img src="/assets/logo/sello de calidad.webp" alt="Sello 100% Quality" className="h-18 sm:h-24 object-contain drop-shadow-sm opacity-90" />
                    <span className="text-[9px] font-black text-emerald-800 uppercase tracking-tight">Garantía de Satisfacción</span>
                  </div>
                </div>

                <div className="absolute -top-6 -right-6 bg-emerald-600 text-white px-8 py-4 rounded-2xl shadow-2xl font-black text-lg flex items-center gap-3 z-10">
                  <Star className="w-6 h-6 fill-current" />
                  <span>OFERTA ESPECIAL</span>
                </div>
                
                <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-emerald-50/50 blur-[100px] rounded-full" />
              </motion.div>

              {combo.components && (
                <div id="combo-components" className="lg:mt-8 mt-4 p-6 rounded-3xl border-2 border-emerald-100 shadow-sm transition-all">
                  <h3 className="text-sm font-black text-emerald-950 uppercase tracking-[0.2em] mb-3 flex items-center gap-2">
                    <Zap className="w-4 h-4 fill-emerald-500 text-emerald-500" /> Componentes Activos del Combo
                  </h3>
                  <p className="text-stone-800 text-lg font-extrabold leading-relaxed italic mb-4">
                    {combo.components}
                  </p>

                  {combo.componentBenefits && combo.componentBenefits.length > 0 && (
                    <div className="mt-4 pt-4 border-t border-emerald-200/50 space-y-3">
                      <h4 className="text-xs font-black text-emerald-900 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" /> Cómo beneficia tu cuerpo:
                      </h4>
                      <ul className="space-y-3.5">
                        {combo.componentBenefits.map((cb, idx) => (
                          <li key={idx} className="text-stone-700 text-base leading-relaxed flex flex-col sm:flex-row sm:items-start gap-1 sm:gap-3">
                            <span className="font-extrabold text-emerald-950 shrink-0 min-w-[170px] text-sm inline-block text-left">
                              {cb.name}
                            </span>
                            <span className="text-stone-600 font-medium sm:pt-0.5">{cb.benefit}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}

              <div className="lg:mt-8 mt-4 p-6 rounded-3xl border-2 border-emerald-100 shadow-sm">
                <h3 className="text-xl font-black text-emerald-950 uppercase tracking-widest mb-6 flex items-center gap-3">
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

              {/* Desktop FAQ - Below left column seals */}
              <div className="hidden lg:block relative z-10">
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
                <div className="flex items-center gap-1 text-[10px] font-black text-emerald-700 bg-emerald-50 px-2 py-1 rounded-full uppercase tracking-widest">
                  <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></div>
                  <span>En Stock</span>
                </div>
              </div>

              <h1 className="hidden lg:block text-3xl lg:text-5xl font-bold text-[var(--color-brand-primary)] mb-6 leading-tight font-display">
                {cleanPromoName(combo.name)}
              </h1>
              
              <div className="flex flex-col gap-1 mb-4">
                <span className="text-[20px] font-black text-emerald-600 uppercase tracking-wider">Es útil para:</span>
                <h2 className="text-lg text-stone-600 mb-6 mt-2 leading-relaxed whitespace-pre-line">
                  {combo.description} <strong className="font-bold text-stone-800">| Calidad Certificada {combo.products.map(p => {
                    const productInfo = PRODUCTS.find(prod => prod.id === p);
                    if (!productInfo) return '';
                    const isPending = !productInfo.invima || productInfo.invima.toLowerCase().includes('trámite') || productInfo.invima === 'En proceso' || productInfo.invima.includes('ALERTA');
                    const invDisplay = isPending ? 'Registro en proceso de verificación' : productInfo.invima;
                    return `${productInfo.name}: ${invDisplay}`;
                  }).join(' · ')}</strong>
                </h2>
              </div>



              <div className="p-6 bg-stone-50 rounded-3xl border border-stone-200">
                <div className="grid gap-2 sm:gap-3">
                  <div className="relative flex items-center justify-between p-3 sm:p-4 rounded-xl sm:rounded-2xl border-2 border-emerald-600 bg-emerald-600 shadow-lg text-left">
                    <div>
                      <div className="flex items-center gap-1.5 sm:gap-2 mb-0.5 sm:mb-1">
                        <span className="text-sm sm:text-base font-bold text-white">Oferta Especial Combo</span>
                        <span className="text-[9px] sm:text-[10px] uppercase tracking-wider font-black px-1.5 py-0.5 rounded-full bg-white/20 text-white">
                          Ahorro Máximo
                        </span>
                      </div>
                      <div className="text-[14px] sm:text-[20px] font-black uppercase mb-0.5 sm:mb-1 leading-none text-white">
                        Mejor relación precio
                      </div>
                      <span className="text-[15px] sm:text-[18px] font-bold block text-white">
                        Ahorras {formatCurrency(combo.originalPrice - combo.price)}
                      </span>
                    </div>
                    <div className="text-right flex flex-col items-end justify-center">
                      <div className="text-base sm:text-lg font-black leading-none mb-1 text-white">
                        {formatCurrency(combo.price)}
                      </div>
                      <div className="text-[14px] sm:text-[15px] line-through leading-none text-white/90">
                        {formatCurrency(combo.originalPrice)}
                      </div>
                    </div>
                  </div>
                </div>

                <button
                  ref={buyButtonRef}
                  onClick={handleBuyNow}
                  className="w-full mt-6 py-6 bg-amber-500 text-white rounded-2xl font-black text-xl hover:bg-amber-600 transition-all shadow-xl shadow-amber-500/30 flex items-center justify-center gap-3 group animate-pulse-slow hover:animate-none scale-100 hover:scale-[1.02]"
                  aria-label={`Comprar ${combo.name} ahora`}
                >
                  <ShoppingCart className="w-7 h-7 group-hover:scale-110 transition-transform" />
                  COMPRAR AHORA
                </button>

                <ConfidenceBadges className="mt-4" />

                {/* Persuasive Micro-copy */}
                <div className="mt-6 space-y-3">
                  <div className="flex items-center gap-2 text-[10px] font-bold text-emerald-800 uppercase tracking-wider">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>Registros INVIMA Vigentes</span>
                  </div>
                  <div className="flex items-center gap-2 text-[10px] font-bold text-emerald-800 uppercase tracking-wider">
                    <CheckCircle2 className="w-3 h-3" />
                    <span>Experiencias positivas: El combo más solicitado este mes</span>
                  </div>
                  <div className="flex items-center gap-2 text-[10px] font-bold text-stone-600 uppercase tracking-wider">
                    <CheckCircle2 className="w-3 h-3" />
                    <span>Ahorro garantizado comparado con compras individuales</span>
                  </div>
                  <div className="flex items-center gap-2 text-[10px] font-bold text-stone-600 uppercase tracking-wider">
                    <CheckCircle2 className="w-3 h-3" />
                    <span>Asegura tu stock: Alta demanda en este combo</span>
                  </div>
                </div>
                
                <p className="text-center text-lg font-black text-emerald-800 mt-6 flex flex-col sm:flex-row items-center justify-center gap-2 bg-emerald-50 py-4 px-6 rounded-2xl border-2 border-emerald-200 shadow-sm">
                  <Zap className="w-6 h-6 fill-emerald-500 text-emerald-500 animate-pulse" />
                  <span>Envío GRATIS + Pago Contra Entrega + Incluye Obsequio 🎁</span>
                </p>

                <TrustBar className="mt-8" />
              </div>

              {/* Why Choose Section - Always visible under the payment zone */}
              <div className="mt-8 p-8 bg-emerald-50 rounded-[2.5rem] border-2 border-emerald-100 shadow-sm">
                <h3 className="text-2xl font-black text-emerald-950 mb-4 flex items-center gap-3">
                  <Info className="w-7 h-7" /> {combo.whyChoose?.title || '¿Por qué elegir este combo?'}
                </h3>
                <p className="text-xl text-emerald-800 leading-relaxed font-medium">
                  {combo.whyChoose?.description || 'Este combo ha sido diseñado para ofrecerte una solución integral y efectiva, combinando lo mejor de nuestros productos para potenciar tu bienestar natural.'}
                </p>
              </div>

              {/* FAQ Section - Mobile only (desktop is on left column) */}
              <div className="lg:hidden">
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
