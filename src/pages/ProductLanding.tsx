import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { PRODUCTS, GENERAL_FAQS } from '../constants';
import { useCart } from '../CartContext';
import { CheckCircle2, ShoppingCart, ArrowLeft, Star, TrendingUp, Zap, ShieldCheck, ChevronDown, ChevronUp, Info } from 'lucide-react';
import { cn, formatCurrency } from '../utils';
import { useEffect, useState, useRef } from 'react';
import Footer from '../components/Footer';
import SEOManager from '../components/SEOManager';
import TrustBar from '../components/TrustBar';
import ConfidenceBadges from '../components/ConfidenceBadges';
import OrderBump from '../components/OrderBump';
import FAQSection from '../components/FAQSection';
import { track } from '../utils/pixel';
import { BUMP_OPPORTUNITIES } from '../lib/bump-logic';

export default function ProductLanding() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { addToCart, addComboToCart } = useCart();
  const [selectedPromo, setSelectedPromo] = useState<string | null>(null);
  const [showSticky, setShowSticky] = useState(false);
  const buyButtonRef = useRef<HTMLButtonElement>(null);

  const product = PRODUCTS.find(p => p.id === id);

  useEffect(() => {
    const handleScroll = () => {
      if (window.innerWidth < 1024) {
        setShowSticky(true);
        return;
      }
      
      if (buyButtonRef.current) {
        const rect = buyButtonRef.current.getBoundingClientRect();
        setShowSticky(rect.top < 0);
      }
    };

    handleScroll();

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  useEffect(() => {
    const promoParam = searchParams.get('promo');
    if (promoParam && product) {
      const found = product.promos.find(p => p.label === promoParam || p.id === promoParam);
      if (found) setSelectedPromo(found.id);
    } else if (product) {
      setSelectedPromo(product.promos[2]?.id || product.promos[0].id);
    }
  }, [id, product, searchParams]);

  useEffect(() => {
    if (product) {
      track('ViewContent', { 
        content_ids: [String(product.id)], 
        content_name: product.name, 
        value: Number(product.basePrice), 
        currency: 'COP', 
        content_type: 'product' 
      });
    }
  }, [product?.id]);

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <h1 className="text-2xl font-bold mb-4">Producto no encontrado</h1>
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

  const handleBuyNow = (promoId: string) => {
    const promo = product.promos.find(p => p.id === promoId);
    track('InitiateCheckout', { 
      content_ids: [String(product.id)], 
      content_name: product.name, 
      value: Number(promo?.price || product.basePrice), 
      currency: 'COP', 
      num_items: 1, 
      content_type: 'product' 
    });
    addToCart(product, promoId);
    navigate('/checkout');
  };

  const currentBump = product ? BUMP_OPPORTUNITIES[product.id] : null;

  const handleBumpAccept = () => {
    if (!currentBump) return;
    
    track('InitiateCheckout', { 
      content_ids: [String(currentBump.targetCombo.id)], 
      content_name: currentBump.targetCombo.name, 
      value: Number(currentBump.targetCombo.price), 
      currency: 'COP', 
      num_items: 1, 
      content_type: 'product_combo' 
    });

    addComboToCart(currentBump.targetCombo); 
    navigate('/checkout');
  };

  const seoTitle = product.seoTitle || product.name;
  const seoDescription = product.seoDescription || product.shortDescription;

  return (
    <div className="min-h-screen bg-white">
      <SEOManager 
        title={seoTitle}
        description={seoDescription}
        canonicalUrl={`/producto/${product.id}`}
        ogImage={product.image}
        type="product"
        productData={{
          id: product.id,
          name: product.name,
          category: product.category,
          lowPrice: product.promos[0].price,
          highPrice: product.promos[product.promos.length - 1].price,
          offerCount: product.promos.length,
          faqs: product.seoFaqs,
          reviews: product.testimonials,
          invima: product.invima
        }}
      />

      {/* Hero Section */}
      <section className="relative pt-4 pb-12 lg:pt-8 lg:pb-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <button 
            onClick={() => navigate(-1)}
            className="mb-4 flex items-center gap-2 text-stone-500 hover:text-emerald-600 transition-all font-bold p-3 -ml-3 rounded-xl hover:bg-stone-50 group"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            <span className="text-base sm:text-lg">Volver</span>
          </button>

          <div className="grid lg:grid-cols-[1.2fr_1fr] gap-8 lg:gap-16 items-start">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="relative lg:sticky lg:top-8"
            >
              <div className="aspect-square rounded-[3rem] overflow-hidden shadow-2xl bg-stone-50 flex items-center justify-center p-6 lg:p-8">
                <img
                  src={product.image}
                  alt={product.name}
                  width={800}
                  height={800}
                  loading="eager"
                  fetchPriority="high"
                  className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
              </div>
              
              <div className="flex flex-row items-center justify-center gap-4 sm:gap-6 mt-10">
                <div className="flex items-center gap-3 px-4 sm:px-6 py-3 bg-stone-50 rounded-2xl border border-stone-200">
                  <img src="/assets/logo/invima1.webp" alt="Sello INVIMA" className="h-16 sm:h-20 object-contain drop-shadow-sm opacity-90" />
                  <div className="flex flex-col">
                    <span className="text-[11px] font-black text-stone-400 uppercase tracking-widest leading-none">Registro INVIMA</span>
                    <span className="text-[14px] sm:text-base font-bold text-stone-700">
                      {(!product.invima || product.invima.toLowerCase().includes('trámite')) 
                        ? 'Registro en proceso de verificación' 
                        : product.invima}
                    </span>
                  </div>
                </div>
                <img src="/assets/logo/sello de calidad.webp" alt="Sello 100% Quality" className="h-18 sm:h-24 object-contain drop-shadow-sm opacity-90" />
              </div>

              <div className="absolute -top-6 -right-6 bg-emerald-600 text-white px-8 py-4 rounded-2xl shadow-2xl font-black text-lg flex items-center gap-3 z-10">
                <Star className="w-6 h-6 fill-current" />
                <span>MÁS VENDIDO</span>
              </div>
              
              {/* Decorative background element for the image */}
              <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-emerald-50/50 blur-[100px] rounded-full" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="flex items-center gap-2 mb-2">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <span className="text-xs font-bold text-stone-500">4.9/5 (1,240 reseñas)</span>
                <span className="text-[10px] font-black text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full uppercase tracking-widest ml-2">Verificado</span>
              </div>
              <h1 className="text-3xl lg:text-5xl font-bold text-[var(--color-brand-primary)] mb-1 leading-tight font-display">
                {product.name} - {product.shortDescription}
              </h1>
              {product.size && (
                <div className="inline-block px-4 py-1.5 rounded-full bg-amber-100 text-amber-800 text-sm font-black border-2 border-amber-200 mb-4 shadow-sm">
                  {product.size}
                </div>
              )}
              {/* Se remueve la sección redundante de "Es útil para" ya que ahora está en el H1 semántico */}
              <h2 className="text-lg text-stone-600 mb-6 mt-4 leading-relaxed">
                {product.description} <strong className="font-bold text-stone-800">| Calidad Certificada {(!product.invima || product.invima.toLowerCase().includes('trámite')) ? '(INVIMA: Registro en proceso de verificación)' : `(INVIMA: ${product.invima})`}</strong>
              </h2>

              <div className="mb-10">
                <h3 className="text-xl font-black text-emerald-900 uppercase tracking-widest mb-6 flex items-center gap-3">
                  <TrendingUp className="w-6 h-6" /> Beneficios y Resultados
                </h3>
                <div className="space-y-6">
                  {product.benefits.map((benefit, i) => (
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

              <div className="p-6 bg-stone-50 rounded-3xl border border-stone-200">
                <div className="grid gap-2 sm:gap-3">
                  {product.promos.map((promo, idx) => {
                    const originalPrice = promo.price * 1.3;
                    const savings = originalPrice - promo.price;
                    
                    // Calculate average price per unit
                    let unitCount = 1;
                    if (idx === 1) unitCount = 2;
                    if (idx === 2) unitCount = 3;
                    if (idx === 3) unitCount = 5;
                    const avgPrice = promo.price / unitCount;

                    return (
                      <button
                        key={promo.id}
                        onClick={() => setSelectedPromo(promo.id)}
                        className={cn(
                          "relative flex items-center justify-between p-3 sm:p-4 rounded-xl sm:rounded-2xl border-2 transition-all text-left",
                          selectedPromo === promo.id
                            ? "border-emerald-600 bg-white shadow-md"
                            : "border-transparent bg-stone-100 hover:bg-stone-200"
                        )}
                      >
                        <div>
                          <div className="flex items-center gap-1.5 sm:gap-2 mb-0.5 sm:mb-1">
                            <span className="text-sm sm:text-base font-bold text-stone-900">{promo.label}</span>
                            {promo.badge && (
                              <span className="text-[9px] sm:text-[10px] uppercase tracking-wider font-black bg-emerald-100 text-emerald-700 px-1.5 py-0.5 rounded-full">
                                {promo.badge}
                              </span>
                            )}
                          </div>
                          <div className="text-[14px] sm:text-[20px] font-black text-emerald-800 uppercase mb-0.5 sm:mb-1 leading-none">
                            {unitCount > 1 ? `Solo ${formatCurrency(avgPrice)} / unidad` : "Precio especial"}
                          </div>
                          <span className="text-[10px] sm:text-xs text-stone-500 block">Ahorras {formatCurrency(savings)}</span>
                        </div>
                        <div className="text-right flex flex-col items-end justify-center">
                          <div className="text-base sm:text-lg font-black text-emerald-800 leading-none mb-1">{formatCurrency(promo.price)}</div>
                          <div className="text-[9px] sm:text-[10px] text-stone-400 line-through leading-none">{formatCurrency(originalPrice)}</div>
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* Order Bump - Visible only when 1 Unit is selected */}
                {selectedPromo === '1u' && currentBump && (
                  <OrderBump
                    productName={product.name}
                    complementName={currentBump.complementName}
                    bumpPrice={currentBump.bumpPrice}
                    savings={currentBump.savings}
                    onAccept={handleBumpAccept}
                  />
                )}

                <button
                  ref={buyButtonRef}
                  onClick={() => selectedPromo && handleBuyNow(selectedPromo)}
                  className="w-full mt-6 py-6 bg-amber-500 text-white rounded-2xl font-black text-xl hover:bg-amber-600 transition-all shadow-xl shadow-amber-500/30 flex items-center justify-center gap-3 group animate-pulse-slow hover:animate-none scale-100 hover:scale-[1.02]"
                >
                  <ShoppingCart className="w-7 h-7 group-hover:scale-110 transition-transform" />
                  COMPRAR AHORA
                </button>

                <ConfidenceBadges className="mt-4" />

                {/* Persuasive Micro-copy */}
                <div className="mt-6 space-y-3">
                  <div className="flex items-center gap-2 text-[10px] font-bold text-emerald-800 uppercase tracking-wider">
                    <CheckCircle2 className="w-3 h-3" />
                    <span>No interrumpas tu proceso: 92% de los clientes eligen el Plan de 3 meses</span>
                  </div>
                  <div className="flex items-center gap-2 text-[10px] font-bold text-stone-600 uppercase tracking-wider">
                    <CheckCircle2 className="w-3 h-3" />
                    <span>Ahorro garantizado en tu recompra automática</span>
                  </div>
                  <div className="flex items-center gap-2 text-[10px] font-bold text-stone-600 uppercase tracking-wider">
                    <CheckCircle2 className="w-3 h-3" />
                    <span>Asegura tu stock: Alta demanda en este producto</span>
                  </div>
                </div>
                
                <p className="text-center text-lg font-black text-emerald-800 mt-6 flex flex-col sm:flex-row items-center justify-center gap-2 bg-emerald-50 py-4 px-6 rounded-2xl border-2 border-emerald-200 shadow-sm">
                  <Zap className="w-6 h-6 fill-emerald-500 text-emerald-500 animate-pulse" />
                  <span>Envío GRATIS + Pago Contra Entrega + Incluye Obsequio 🎁</span>
                </p>

                <TrustBar className="mt-8" />
              </div>

              {/* Why buy section - Moved here to follow Title/Price on mobile */}
              <div className="mt-10 p-8 bg-emerald-50 rounded-[2.5rem] border-2 border-emerald-100 shadow-sm">
                <h3 className="text-2xl font-black text-emerald-900 mb-4 flex items-center gap-3">
                  <Info className="w-7 h-7" /> {product.whyChoose?.title || `¿Por qué elegir ${product.name}?`}
                </h3>
                <p className="text-xl text-emerald-800 leading-relaxed font-medium">
                  {product.whyChoose?.description || 'Este suplemento ha sido formulado bajo los más altos estándares de calidad. Al elegirlo, aseguras un tratamiento natural efectivo, con respaldo científico y resultados comprobados por miles de clientes colombianos.'}
                </p>
              </div>

              <FAQSection 
                specificFaqs={product.seoFaqs} 
                generalFaqs={GENERAL_FAQS} 
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Social Proof Section */}
      <section className="py-16 sm:py-20 bg-stone-50 border-t border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl font-black text-stone-900 mb-2 uppercase tracking-tight">Lo que dicen nuestros clientes</h2>
            <p className="text-stone-500 font-medium">Experiencias reales de clientes que ya disfrutan ZENHOGAR</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6 sm:gap-8">
            {product.testimonials.map((testimonial, i) => {
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

      {/* Sticky Conversion Bar (Mobile & Desktop) */}
      <AnimatePresence>
        {showSticky && (
          <motion.div
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            exit={{ y: 100 }}
            className="fixed bottom-0 left-0 right-0 bg-white border-t border-stone-200 p-3 lg:p-4 z-[100] shadow-[0_-10px_30px_rgba(0,0,0,0.1)]"
          >
            <div className="max-w-7xl mx-auto flex items-center justify-between gap-2 lg:gap-4">
              <div className="flex items-center gap-2 lg:gap-3 flex-1 min-w-0">
                <div className="w-10 h-10 lg:w-16 lg:h-16 bg-stone-100 rounded-lg lg:rounded-2xl overflow-hidden flex-shrink-0">
                  <img src={product.image} alt={product.name} className="w-full h-full object-contain" referrerPolicy="no-referrer" />
                </div>
                <div className="flex flex-col min-w-0">
                  <div className="flex items-center gap-1.5 flex-wrap lg:flex-nowrap">
                    <span className="text-[11px] sm:text-xs lg:text-sm font-bold text-stone-900 truncate max-w-[100px] sm:max-w-none">{product.name}</span>
                    <span className="text-emerald-700 font-black text-sm lg:text-lg italic leading-none whitespace-nowrap">
                      {formatCurrency(product.promos.find(p => p.id === selectedPromo)?.price || product.basePrice)}
                    </span>
                  </div>
                  <div className="relative mt-0.5 self-start w-full sm:w-auto">
                    <select
                      value={selectedPromo || ''}
                      onChange={(e) => setSelectedPromo(e.target.value)}
                      className="appearance-none bg-stone-100 text-stone-700 text-[9px] sm:text-[10px] lg:text-xs font-bold py-1 pl-1.5 pr-5 lg:pl-2 lg:pr-6 rounded uppercase outline-none focus:ring-1 focus:ring-emerald-500 border border-stone-200 cursor-pointer w-full text-ellipsis line-clamp-1"
                    >
                      {product.promos.map(promo => (
                        <option key={promo.id} value={promo.id}>
                          {promo.label}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="w-3 h-3 absolute right-1 lg:right-1.5 top-1/2 -translate-y-1/2 text-stone-500 pointer-events-none" />
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-4 flex-shrink-0">
                <div className="hidden lg:flex items-center gap-2 text-xs font-bold text-stone-500 bg-stone-50 px-4 py-2 rounded-full border">
                  <Zap className="w-3.5 h-3.5 text-emerald-500 fill-emerald-500" />
                  Paga al recibir en casa
                </div>
                <button
                  onClick={() => selectedPromo && handleBuyNow(selectedPromo)}
                  className="px-4 sm:px-6 lg:px-10 py-2.5 lg:py-4 bg-amber-500 text-white rounded-xl lg:rounded-2xl font-black text-[11px] sm:text-sm lg:text-base shadow-lg shadow-amber-500/20 active:scale-95 transition-all hover:bg-amber-600 whitespace-nowrap"
                >
                  COMPRAR AHORA
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
}
