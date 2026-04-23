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
      if (buyButtonRef.current) {
        const rect = buyButtonRef.current.getBoundingClientRect();
        setShowSticky(rect.top < 0);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
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
        <button onClick={() => navigate(-1)} className="text-emerald-600 font-bold flex items-center gap-2">
          <ArrowLeft className="w-5 h-5" /> Volver
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
          reviews: product.testimonials
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
              <div className="absolute -top-6 -right-6 bg-emerald-600 text-white px-8 py-4 rounded-2xl shadow-2xl font-black text-lg flex items-center gap-3 z-10">
                <Star className="w-6 h-6 fill-current" />
                <span>MÁS VENDIDO</span>
              </div>
              
                {/* Why buy section below image */}
                <div className="mt-8 p-6 bg-emerald-50 rounded-3xl border border-emerald-100">
                  <h3 className="text-[27px] font-bold text-emerald-900 mb-3 flex items-center gap-2">
                    <Info className="w-6 h-6" /> {product.whyChoose?.title || '¿Por qué elegir este producto?'}
                  </h3>
                  <p className="text-[21px] text-emerald-800 leading-relaxed">
                    {product.whyChoose?.description || 'Este suplemento ha sido formulado bajo los más altos estándares de calidad. Al elegirlo, aseguras un tratamiento natural efectivo, con respaldo científico y resultados comprobados por miles de clientes en Colombia.'}
                  </p>
                </div>

              <FAQSection 
                specificFaqs={product.seoFaqs} 
                generalFaqs={GENERAL_FAQS} 
              />
              
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
                {product.name}
              </h1>
              {product.size && (
                <div className="inline-block px-3 py-1 rounded-lg bg-stone-100 text-stone-500 text-xs font-bold mb-4">
                  {product.size}
                </div>
              )}
              <div className="flex flex-col gap-1 mb-4">
                <span className="text-[20px] font-black text-emerald-700 uppercase tracking-wider">Es útil para:</span>
                <p className="text-lg font-bold text-stone-800 leading-tight">
                  {product.shortDescription}
                </p>
              </div>
              <p className="text-lg text-stone-600 mb-6 leading-relaxed">
                {product.description}
              </p>

              <div className="space-y-3 mb-8">
                {product.benefits.map((benefit, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    </div>
                    <span className="text-stone-700 font-medium">{benefit}</span>
                  </div>
                ))}
              </div>

              <div className="p-6 bg-stone-50 rounded-3xl border border-stone-200">
                <div className="grid gap-3">
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
                          "relative flex items-center justify-between p-4 rounded-2xl border-2 transition-all text-left",
                          selectedPromo === promo.id
                            ? "border-emerald-600 bg-white shadow-md"
                            : "border-transparent bg-stone-100 hover:bg-stone-200"
                        )}
                      >
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-bold text-stone-900">{promo.label}</span>
                            {promo.badge && (
                              <span className="text-[10px] uppercase tracking-wider font-black bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full">
                                {promo.badge}
                              </span>
                            )}
                          </div>
                          <div className="text-[20px] font-black text-emerald-800 uppercase mb-1">
                            {unitCount > 1 ? `Solo ${formatCurrency(avgPrice)} por unidad` : "Precio especial"}
                          </div>
                          <span className="text-xs text-stone-500">Ahorras {formatCurrency(savings)}</span>
                        </div>
                        <div className="text-right">
                          <div className="text-lg font-black text-emerald-800">{formatCurrency(promo.price)}</div>
                          <div className="text-[10px] text-stone-400 line-through">{formatCurrency(originalPrice)}</div>
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
                  className="w-full mt-6 py-5 bg-emerald-600 text-white rounded-2xl font-black text-lg hover:bg-emerald-700 transition-all shadow-xl shadow-emerald-600/20 flex items-center justify-center gap-3 group"
                >
                  <ShoppingCart className="w-6 h-6 group-hover:scale-110 transition-transform" />
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
            </motion.div>
          </div>
        </div>
      </section>

      {/* Social Proof Section */}
      <section className="py-20 bg-stone-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-stone-900 mb-12">Lo que dicen nuestros clientes</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {product.testimonials.map((testimonial, i) => (
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

      {/* Sticky Conversion Bar (Mobile & Desktop) */}
      <AnimatePresence>
        {showSticky && (
          <motion.div
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            exit={{ y: 100 }}
            className="fixed bottom-0 left-0 right-0 bg-white border-t border-stone-200 p-3 lg:p-4 z-[100] shadow-[0_-10px_30px_rgba(0,0,0,0.1)]"
          >
            <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 lg:w-16 lg:h-16 bg-stone-100 rounded-lg lg:rounded-2xl overflow-hidden flex-shrink-0">
                  <img src={product.image} alt={product.name} className="w-full h-full object-contain" referrerPolicy="no-referrer" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs lg:text-sm font-bold text-stone-900 line-clamp-1">{product.name}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-emerald-700 font-black text-sm lg:text-lg italic">{formatCurrency(product.promos.find(p => p.id === selectedPromo)?.price || product.basePrice)}</span>
                    <span className="hidden sm:inline-block text-[10px] font-bold text-stone-400 uppercase tracking-widest">Envío Gratis</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="hidden lg:flex items-center gap-2 text-xs font-bold text-stone-500 bg-stone-50 px-4 py-2 rounded-full border">
                  <Zap className="w-3.5 h-3.5 text-emerald-500 fill-emerald-500" />
                  Paga al recibir en casa
                </div>
                <button
                  onClick={() => selectedPromo && handleBuyNow(selectedPromo)}
                  className="flex-grow sm:flex-grow-0 px-6 lg:px-10 py-3 lg:py-4 bg-emerald-600 text-white rounded-xl lg:rounded-2xl font-black text-sm lg:text-base shadow-lg shadow-emerald-600/20 active:scale-95 transition-all hover:bg-emerald-700"
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
