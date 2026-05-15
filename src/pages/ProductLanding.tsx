import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { PRODUCTS, GENERAL_FAQS } from '../constants';
import { useCart } from '../CartContext';
import { CheckCircle2, ShoppingCart, ArrowLeft, Star, TrendingUp, Zap, ShieldCheck, ChevronDown, ChevronUp, Info, Play } from 'lucide-react';
import { cn, formatCurrency } from '../utils';
import { useEffect, useState, useRef } from 'react';
import Footer from '../components/Footer';
import SEOManager from '../components/SEOManager';
import Breadcrumbs from '../components/Breadcrumbs';
import TrustBar from '../components/TrustBar';
import ConfidenceBadges from '../components/ConfidenceBadges';
import OrderBump from '../components/OrderBump';
import FAQSection from '../components/FAQSection';
import { track } from '../utils/pixel';
import { BUMP_OPPORTUNITIES } from '../lib/bump-logic';

import StickyCTA from '../components/StickyCTA';
import ProductVideo from '../components/ProductVideo';

export default function ProductLanding() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { addToCart, addComboToCart } = useCart();
  const [selectedPromo, setSelectedPromo] = useState<string | null>(null);
  const buyButtonRef = useRef<HTMLButtonElement>(null);

  const product = PRODUCTS.find(p => p.id === id);

  // Gallery Logic with Video Support
  const galleryItems = product ? [
    ...(product.videoUrl || product.videoUrlMp4 ? [{ type: 'video', webm: product.videoUrl, mp4: product.videoUrlMp4, poster: product.videoPoster }] : []),
    { type: 'image', url: product.image },
    ...(product.supportImages || []).map(img => ({ type: 'image', url: img }))
  ] : [];

  const [activeItem, setActiveItem] = useState(galleryItems[0] || null);

  useEffect(() => {
    if (galleryItems.length > 0) {
      setActiveItem(galleryItems[0]);
    }
  }, [id, product]);

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

  // Bot-friendly clean metadata
  const finalSeoTitle = product.seoTitle || product.name;
  const finalSeoDescription = product.seoDescription || product.description.split('.')[0] + '.';

  return (
    <div className="min-h-screen bg-white">
      <SEOManager 
        title={finalSeoTitle}
        description={finalSeoDescription}
        canonicalUrl={`/producto/${product.id}`}
        ogImage={product.image}
        type="product"
        faqs={[...(product.seoFaqs || []), ...GENERAL_FAQS]}
        productData={{
          id: product.id,
          masterId: product.masterId,
          name: product.name,
          description: product.description,
          category: product.category,
          googleCategory: product.googleCategory,
          condition: product.condition,
          lowPrice: product.promos[0].price,
          highPrice: product.promos[product.promos.length - 1].price,
          offerCount: product.promos.length,
          faqs: product.seoFaqs,
          reviews: product.testimonials,
          invima: product.invima
        }}
      />

      <Breadcrumbs />

      {/* Hero Section */}
      <section className="relative pt-4 pb-12 lg:pt-8 lg:pb-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <button 
            onClick={() => navigate(-1)}
            className="mb-4 flex items-center gap-2 text-stone-500 hover:text-emerald-600 transition-all font-bold p-3 -ml-3 rounded-xl hover:bg-stone-50 group"
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
                  {activeItem?.type === 'video' ? (
                    <ProductVideo 
                      webmUrl={activeItem.webm} 
                      mp4Url={activeItem.mp4} 
                      poster={activeItem.poster}
                      className="rounded-none" 
                    />
                  ) : (
                    <img
                      src={activeItem?.url || product.image}
                      alt={product.name}
                      width={800}
                      height={800}
                      loading="eager"
                      fetchPriority="high"
                      className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-700"
                      referrerPolicy="no-referrer"
                    />
                  )}
                </div>

                {/* Thumbnail Gallery */}
                {galleryItems.length > 1 && (
                  <div className="grid grid-cols-3 sm:grid-cols-5 gap-1.5 sm:gap-3 mt-6">
                    {galleryItems.map((item, index) => (
                      <button
                        key={index}
                        onClick={() => setActiveItem(item)}
                        className={cn(
                          "aspect-square rounded-2xl sm:rounded-2xl overflow-hidden border-2 transition-all p-1 sm:p-1 bg-white shadow-sm hover:scale-105 active:scale-95 group/thumb flex items-center justify-center",
                          (activeItem === item) 
                            ? "border-emerald-600 ring-2 ring-emerald-100" 
                            : "border-stone-200 hover:border-emerald-300"
                        )}
                        aria-label={`Ver ${item.type === 'video' ? 'video' : 'imagen'} ${index + 1} de ${product.name}`}
                      >
                        {item.type === 'video' ? (
                          <div className="relative w-full h-full bg-stone-100 flex items-center justify-center overflow-hidden rounded-xl">
                            {item.poster ? (
                              <img src={item.poster} className="w-full h-full object-cover opacity-60" alt="Video thumbnail" />
                            ) : (
                              <Play className="w-8 h-8 text-emerald-600 fill-current" />
                            )}
                            <div className="absolute inset-0 flex items-center justify-center bg-black/10">
                              <Play className="w-6 h-6 text-white fill-current" />
                            </div>
                          </div>
                        ) : (
                    <img 
                      src={item.url} 
                      alt={`${product.name} miniatura ${index + 1}`} 
                      className="w-full h-full object-contain group-hover/thumb:scale-110 transition-transform" 
                      referrerPolicy="no-referrer"
                      width="80"
                      height="80"
                      loading="lazy"
                      decoding="async"
                    />
                        )}
                      </button>
                    ))}
                  </div>
                )}
                
                <div className="flex flex-row items-center justify-center gap-4 sm:gap-6 mt-10">
                  <div className="flex items-center gap-3 px-4 sm:px-6 py-3 bg-stone-50 rounded-2xl border border-stone-200">
                    <img src="/assets/logo/invima1.webp" alt="Sello INVIMA" className="h-16 sm:h-20 object-contain drop-shadow-sm opacity-90" width="80" height="80" />
                    <div className="flex flex-col">
                      <span className="text-[11px] font-black text-stone-400 uppercase tracking-widest leading-none">Registro INVIMA</span>
                      <span className="text-[14px] sm:text-base font-bold text-stone-700">
                        {(!product.invima || product.invima.toLowerCase().includes('trámite')) 
                          ? 'Registro en proceso de verificación' 
                          : product.invima}
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-col items-center gap-1">
                    <img src="/assets/logo/sello de calidad.webp" alt="Sello 100% Quality" className="h-18 sm:h-24 object-contain drop-shadow-sm opacity-90" width="96" height="96" />
                    <span className="text-[9px] font-black text-emerald-800 uppercase tracking-tight">Garantía de Satisfacción</span>
                  </div>
                </div>

                <div className="absolute -top-6 -right-6 bg-emerald-600 text-white px-8 py-4 rounded-2xl shadow-2xl font-black text-lg flex items-center gap-3 z-10">
                  <Star className="w-6 h-6 fill-current" />
                  <span>MÁS VENDIDO</span>
                </div>
                
                {/* Decorative background element for the image */}
                <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-emerald-50/50 blur-[100px] rounded-full" />
              </motion.div>

              {/* Desktop Why Choose & FAQ - Below left column seals */}
              <div className="hidden lg:block relative z-10">
                <div className="p-8 bg-emerald-50 rounded-[2.5rem] border-2 border-emerald-100 shadow-sm mb-10">
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
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <span className="text-xs font-bold text-stone-500">4.9/5 (1,240 reseñas)</span>
                <span className="text-[10px] font-black text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full uppercase tracking-widest ml-1">Verificado</span>
                <div className="flex items-center gap-1 text-[10px] font-black text-emerald-700 bg-emerald-100/50 px-2 py-0.5 rounded-full uppercase tracking-widest ml-1">
                  <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></div>
                  <span>En Stock</span>
                </div>
              </div>
              
              <h1 className="text-3xl lg:text-5xl font-bold text-[var(--color-brand-primary)] mb-6 leading-tight font-display">
                {product.name} - {product.shortDescription}
              </h1>
              
              {/* Se remueve la sección redundante de "Es útil para" ya que ahora está en el H1 semántico */}
              <div className="mb-6 flex flex-wrap items-center gap-4">
                {(product.size || product.presentation) && (
                  <div className="inline-block px-8 py-3 rounded-2xl bg-white text-stone-900 text-xl font-normal border-2 border-stone-200 shadow-md transition-all hover:scale-105">
                    <div className="flex items-center gap-3">
                      {product.size && <span>{product.size}</span>}
                      {product.size && product.presentation && <span className="w-2 h-2 rounded-full bg-stone-300" />}
                      {product.presentation && <span>{product.presentation}</span>}
                    </div>
                  </div>
                )}
              </div>

              <h2 className="text-lg text-stone-600 mb-6 mt-4 leading-relaxed whitespace-pre-line">
                {product.description} <strong className="font-bold text-stone-800">| Calidad Certificada {(!product.invima || product.invima.toLowerCase().includes('trámite')) ? '(INVIMA: Registro en proceso de verificación)' : `(INVIMA: ${product.invima})`}</strong>
              </h2>

              {product.components && (
                <div className="mb-8 p-6 bg-emerald-50/30 rounded-3xl border-2 border-emerald-100 shadow-sm transition-all hover:bg-emerald-50">
                  <h3 className="text-sm font-black text-emerald-900 uppercase tracking-[0.2em] mb-3 flex items-center gap-2">
                    <Zap className="w-4 h-4 fill-emerald-500 text-emerald-500" /> Componentes Activos
                  </h3>
                  <p className="text-stone-700 text-lg font-medium leading-relaxed italic">
                    {product.components}
                  </p>
                </div>
              )}

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
                  {product.promos.map((promo) => {
                    const originalPrice = product.basePrice * promo.units;
                    const savings = originalPrice - promo.price;
                    const avgPrice = promo.price / promo.units;

                    return (
                      <button
                        key={promo.id}
                        onClick={() => setSelectedPromo(promo.id)}
                        className={cn(
                          "relative flex items-center justify-between p-3 sm:p-4 rounded-xl sm:rounded-2xl border-2 transition-all text-left",
                          selectedPromo === promo.id
                            ? "border-emerald-600 bg-emerald-600 shadow-lg"
                            : "border-transparent bg-stone-100 hover:bg-stone-200"
                        )}
                        aria-label={`Seleccionar promoción ${promo.label}`}
                        aria-pressed={selectedPromo === promo.id}
                      >
                        <div>
                          <div className="flex items-center gap-1.5 sm:gap-2 mb-0.5 sm:mb-1">
                            <span className={`text-sm sm:text-base font-bold transition-colors ${selectedPromo === promo.id ? 'text-white' : 'text-stone-900'}`}>{promo.label}</span>
                            {promo.badge && (
                              <span className={`text-[9px] sm:text-[10px] uppercase tracking-wider font-black px-1.5 py-0.5 rounded-full transition-colors ${selectedPromo === promo.id ? 'bg-white/20 text-white' : 'bg-emerald-100 text-emerald-700'}`}>
                                {promo.badge}
                              </span>
                            )}
                          </div>
                          <div className={`text-[14px] sm:text-[20px] font-black uppercase mb-0.5 sm:mb-1 leading-none transition-colors ${selectedPromo === promo.id ? 'text-white' : 'text-emerald-800'}`}>
                            {promo.units > 1 ? `Solo ${formatCurrency(avgPrice)} / unidad` : "Precio especial"}
                          </div>
                          {savings > 0 && (
                            <span className={`text-[15px] sm:text-[18px] font-bold block transition-colors ${selectedPromo === promo.id ? 'text-white' : 'text-emerald-700'}`}>
                              Ahorras {formatCurrency(savings)}
                            </span>
                          )}
                        </div>
                        <div className="text-right flex flex-col items-end justify-center">
                          <div className={`text-base sm:text-lg font-black leading-none mb-1 transition-colors ${selectedPromo === promo.id ? 'text-white' : 'text-emerald-800'}`}>
                            {formatCurrency(promo.price)}
                          </div>
                          {savings > 0 && (
                            <div className={`text-[14px] sm:text-[15px] line-through leading-none transition-colors ${selectedPromo === promo.id ? 'text-white/90' : 'text-stone-500'}`}>
                              {formatCurrency(originalPrice)}
                            </div>
                          )}
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
                  aria-label={`Comprar ${product.name} ahora`}
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

              {/* Why buy section - Mobile only */}
              <div className="lg:hidden">
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
              </div>
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
                        <img 
                          src={avatarUrl} 
                          alt={`Avatar de ${testimonial.name}`} 
                          className="w-full h-full object-cover" 
                          width="48" 
                          height="48" 
                          loading="lazy" 
                          decoding="async"
                        />
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
        name={product.name}
        image={product.image}
        price={product.promos.find(p => p.id === selectedPromo)?.price || product.basePrice}
        onBuy={() => selectedPromo && handleBuyNow(selectedPromo)}
        desktopTriggerRef={buyButtonRef}
        promos={product.promos}
        selectedPromoId={selectedPromo || undefined}
        onPromoChange={(id) => setSelectedPromo(id)}
      />

      <Footer />
    </div>
  );
}
