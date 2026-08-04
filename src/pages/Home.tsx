import { motion } from 'motion/react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { PROMOTIONS, COMBO_OF_THE_MONTH, CATEGORIES, PRODUCTS, GENERAL_FAQS } from '../constants';
import FAQSection from '../components/FAQSection';
import { ArrowRight, CheckCircle2, ShieldCheck, Truck, Sparkles, ShoppingCart, Zap, Heart, Star, Activity, Flame, Shield, Stethoscope, Gauge } from 'lucide-react';
import Footer from '../components/Footer';
import SEOManager from '../components/SEOManager';
import TrustBar from '../components/TrustBar';
import { formatCurrency, cn, cleanPromoName } from '../utils';
import { useCart } from '../CartContext';
import { useEffect, useState, useRef } from 'react';
import StickyCTA from '../components/StickyCTA';
import ProductVideo from '../components/ProductVideo';

const SYMPTOMS = [
  { id: 'digestiva', label: 'Digestión', icon: Activity, color: 'text-emerald-800', bg: 'bg-emerald-50', border: 'border-emerald-100', link: '/categoria/salud-bienestar' },
  { id: 'defensas', label: 'Defensas', icon: Shield, color: 'text-blue-800', bg: 'bg-blue-50', border: 'border-blue-100', link: '/categoria/salud-bienestar' },
  { id: 'energia', label: 'Energía', icon: Zap, color: 'text-orange-800', bg: 'bg-orange-50', border: 'border-orange-100', link: '/categoria/salud-bienestar' },
  { id: 'hormonal', label: 'Vitalidad', icon: Heart, color: 'text-rose-800', bg: 'bg-rose-50', border: 'border-rose-100', link: '/categoria/salud-bienestar' },
  { id: 'peso', label: 'Control Peso', icon: Gauge, color: 'text-purple-800', bg: 'bg-purple-50', border: 'border-purple-100', link: '/categoria/quemadores' },
];

export default function Home() {
  const navigate = useNavigate();
  const { hash } = useLocation();
  const { addComboToCart, getProducts, getCategories, isEC, formatPrice } = useCart();
  const [stock, setStock] = useState(42);
  const buyButtonRef = useRef<HTMLButtonElement>(null);

  const availableProducts = getProducts();
  const currentCategories = getCategories();

  const launchProductIds = isEC ? [
    'coliplus',
    'hemocream',
    'tonico-capilar',
    'colageno',
    'rtafull',
    'derman',
    'locion',
    'mamooth',
    'titan-coffee',
    'instant-virgin'
  ] : [
    'ashwagandha',
    'resveratrol-nad',
    'vinagre-manzana',
    'citrato-potasio-magnesio',
    'oregano',
    'bisglicinato-magnesio',
    'guanda-mix',
    'booster-lion'
  ];

  const launchProducts = launchProductIds
    .map(id => availableProducts.find(p => p.id === id))
    .filter((p): p is NonNullable<typeof p> => !!p);

  useEffect(() => {
    const timer = setInterval(() => {
      setStock(prev => {
        if (prev <= 7) return 7;
        const change = Math.random() > 0.7 ? 1 : 0;
        return prev - change;
      });
    }, 45000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (hash) {
      const element = document.getElementById(hash.replace('#', ''));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [hash]);

  const handleComboBuy = () => {
    addComboToCart(COMBO_OF_THE_MONTH);
    navigate('/checkout');
  };

  const handlePromoBuy = (promo: any) => {
    navigate(`/combo/${promo.id}`);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <SEOManager 
        title="Combos y Ofertas en Productos Naturales Originales"
        description="Aprovecha nuestras ofertas y combos exclusivos en productos naturales originales. Soluciones naturales para colon irritable, hígado graso, dolor articular y control de peso. Envío gratis y pago contra entrega en Colombia."
        canonicalUrl="/"
        faqs={GENERAL_FAQS}
      />

      {/* Hero Section - Solution Oriented */}
      <section className="relative pt-6 pb-6 lg:pt-16 lg:pb-12 overflow-hidden bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <div className="pt-2">
              <h1 className="text-4xl lg:text-7xl font-bold text-stone-900 mb-4 lg:mb-6 font-display leading-[1.1] tracking-tight text-balance">
                Reclama el Control de tu <span className="text-emerald-700 italic">Vitalidad</span>
              </h1>
              <p className="text-lg lg:text-2xl text-stone-600 mb-6 lg:mb-10 leading-relaxed font-light">
                Soluciones orgánicas de grado premium diseñadas para transformar tu salud desde el interior. Ciencia natural para una vida sin límites.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <div role="status" className="flex items-center gap-2 text-stone-700 font-medium bg-stone-50 px-6 py-2 rounded-full border border-stone-100 shadow-sm transition-transform active:scale-95">
                <ShieldCheck className="w-5 h-5 text-emerald-700" aria-hidden="true" />
                <span className="text-sm font-bold">Certificación INVIMA Garantizada</span>
              </div>
            </div>
            
            <div className="hidden md:block">
              <TrustBar className="mt-8 lg:mt-16 bg-white/50 backdrop-blur-sm rounded-3xl border border-stone-100 p-4 lg:p-8 shadow-sm" />
            </div>
          </div>
        </div>
        {/* Abstract organic background elements - Ultra-optimized radial gradients instead of heavy blur filters */}
        <div className="absolute inset-0 -z-10 opacity-20 pointer-events-none hidden md:block" style={{
          backgroundImage: 'radial-gradient(circle at 10% 10%, #d1fae5 0%, transparent 45%), radial-gradient(circle at 90% 90%, #f5f5f4 0%, transparent 45%)'
        }} />
      </section>

      {/* Categories Section - Moved to Top */}
      <section className="py-12 bg-stone-50 border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-8 lg:gap-12">
            {currentCategories.map((category) => {
              const Icon = category.id === 'salud-bienestar' ? Activity : 
                           category.id === 'belleza-integral' ? Sparkles : Flame;
              
              const colors = {
                emerald: {
                  bg: 'bg-gradient-to-b from-emerald-500 to-emerald-700',
                  border: 'border-emerald-400/30',
                  shadow: 'shadow-[0_15px_30px_-5px_rgba(5,150,105,0.4)]',
                  text: 'text-emerald-600',
                  glow: 'group-hover:shadow-[0_20px_40px_-5px_rgba(5,150,105,0.6)]'
                },
                rose: {
                  bg: 'bg-gradient-to-b from-rose-500 to-rose-700',
                  border: 'border-rose-400/30',
                  shadow: 'shadow-[0_15px_30px_-5px_rgba(225,29,72,0.4)]',
                  text: 'text-rose-600',
                  glow: 'group-hover:shadow-[0_20px_40px_-5px_rgba(225,29,72,0.6)]'
                },
                purple: {
                  bg: 'bg-gradient-to-b from-purple-500 to-purple-700',
                  border: 'border-purple-400/30',
                  shadow: 'shadow-[0_15px_30px_-5px_rgba(147,51,234,0.4)]',
                  text: 'text-purple-600',
                  glow: 'group-hover:shadow-[0_20px_40px_-5px_rgba(147,51,234,0.6)]'
                }
              }[category.color as 'emerald' | 'rose' | 'purple'];

              return (
                <Link
                  key={category.id}
                  to={`/categoria/${category.id}`}
                  className="group transition-all hover:-translate-y-2 active:translate-y-0"
                  aria-label={`Ver categoría ${category.name}`}
                >
                  {/* Unified 3D Capsule Button - Simplified shadows on mobile */}
                  <div className={cn(
                    "relative overflow-hidden text-white px-6 sm:px-10 py-3 sm:py-5 rounded-full font-black uppercase tracking-widest flex items-center gap-4 sm:gap-5 transition-all border-b-8 border-t border-white/20 active:border-b-4 active:translate-y-1 shadow-lg md:shadow-2xl min-w-[240px] sm:min-w-[320px]",
                    colors.bg,
                    category.color === 'emerald' && "border-b-emerald-900",
                    category.color === 'rose' && "border-b-rose-900",
                    category.color === 'purple' && "border-b-purple-900",
                    colors.glow
                  )}>
                    {/* Glossy Overlay */}
                    <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-white/20 to-transparent pointer-events-none" />
                    
                    <div className="shrink-0 relative z-10 w-12 h-12 sm:w-16 sm:h-16 rounded-full overflow-hidden border-2 border-white/30 bg-white/10 flex items-center justify-center p-0.5">
                      {category.image ? (
                        <img 
                          src={category.image} 
                          alt={category.name}
                          className="w-full h-full object-cover rounded-full"
                          referrerPolicy="no-referrer"
                          width="64"
                          height="64"
                          loading={currentCategories.indexOf(category) === 0 ? "eager" : "lazy"}
                          fetchPriority={currentCategories.indexOf(category) === 0 ? "high" : "low"}
                          decoding="async"
                        />
                      ) : (
                        <Icon className="w-8 h-8 sm:w-10 sm:h-10 text-white drop-shadow-md" />
                      )}
                    </div>
                    
                    <div className="flex flex-col relative z-10 flex-1">
                      <span className="text-[8px] sm:text-[10px] opacity-80 leading-none mb-1">Ver más productos de</span>
                      <span className="text-sm sm:text-lg leading-tight truncate">{category.name}</span>
                    </div>
                    
                    <ArrowRight className="w-5 h-5 sm:w-8 sm:h-8 relative z-10 group-hover:translate-x-2 transition-transform shrink-0" />
                  </div>
                </Link>
              );
            })}
                  {/* Mobile-Only Oferta del Mes (Combo del Mes) */}
          {false && (
            <div className="mt-10 md:hidden">
              <h2 className="text-2xl font-black text-stone-900 uppercase tracking-tight mb-6 px-1 text-center">Oferta del Mes</h2>
              <div
                className="group bg-white rounded-3xl p-4 border border-stone-200 hover:border-emerald-200 hover:shadow-xl hover:shadow-emerald-900/5 transition-all flex flex-col"
              >
                <Link to={`/combo/${COMBO_OF_THE_MONTH.id}`} className="flex flex-col h-full" aria-label={`Ver detalles de ${COMBO_OF_THE_MONTH.name}`}>
                  <div className="aspect-square rounded-2xl overflow-hidden bg-stone-100 mb-6 flex items-center justify-center p-2 shrink-0">
                    <img
                      src={COMBO_OF_THE_MONTH.image}
                      alt={COMBO_OF_THE_MONTH.name}
                      width={400}
                      height={400}
                      loading="lazy"
                      className="max-w-full max-h-full object-contain group-hover:scale-110 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="px-2 flex flex-col flex-grow text-left">
                    <div className="flex flex-col gap-2 mb-3">
                      <h3 className="text-xl font-bold text-stone-900 font-display leading-tight">{cleanPromoName(COMBO_OF_THE_MONTH.name)}</h3>
                      
                      <div className="flex flex-wrap items-center gap-1.5 min-h-[32px]">
                        <div className="inline-block px-2.5 py-1.5 rounded-lg bg-emerald-50 text-emerald-800 text-[10px] font-bold border border-emerald-100 shadow-sm whitespace-nowrap">
                          🔒 OFERTA DEL MES
                        </div>
                        <div className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-white text-stone-900 text-[10px] font-normal border border-stone-200 shadow-sm">
                          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 animate-pulse" />
                          <span className="whitespace-nowrap">Envío GRATIS + Pago Contraentrega</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col gap-1 mb-4">
                      <span className="text-[10px] font-black text-emerald-800 uppercase tracking-wider">El combo contiene:</span>
                      <p className="text-stone-500 text-sm">{COMBO_OF_THE_MONTH.components}</p>
                    </div>

                    {/* Benefits with checkmarks */}
                    <div className="space-y-2 mb-6">
                      {COMBO_OF_THE_MONTH.benefits.slice(0, 4).map((benefit, i) => (
                        <div key={i} className="flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-emerald-800 flex-shrink-0 mt-0.5" />
                          <span className="text-xs text-stone-700 font-medium">
                            {benefit}
                          </span>
                        </div>
                      ))}
                    </div>

                    <div className="flex items-center justify-between mt-auto pt-4 border-t border-stone-100">
                      <div className="flex flex-col">
                        <span className="text-stone-400 text-xs line-through">Antes {formatCurrency(COMBO_OF_THE_MONTH.originalPrice)}</span>
                        <span className="text-2xl font-bold text-stone-900">{formatCurrency(COMBO_OF_THE_MONTH.price)}</span>
                      </div>
                      <div className="w-10 h-10 rounded-full bg-stone-900 text-white flex items-center justify-center transition-colors group-hover:bg-emerald-600 shrink-0">
                        <ArrowRight className="w-5 h-5" />
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          )}        </div>

          {/* New Mobile-Only Best Sellers Section */}
          <div className="mt-10 md:hidden">
            <h2 className="text-2xl font-black text-stone-900 uppercase tracking-tight mb-6 px-1 text-center">Productos en Lanzamiento</h2>
            
            <div className="grid grid-cols-1 gap-6">
              {launchProducts.map((product) => (
                <div
                  key={product.id}
                  className="group bg-white rounded-3xl p-4 border border-stone-200 hover:border-emerald-200 hover:shadow-xl hover:shadow-emerald-900/5 transition-all flex flex-col h-full"
                >
                  <Link to={`/producto/${product.id}`} className="flex flex-col h-full" aria-label={`Ver detalles de ${product.name}`}>
                    <div className="aspect-square rounded-2xl overflow-hidden bg-stone-100 mb-6 flex items-center justify-center p-2 shrink-0">
                      <img
                        src={product.image}
                        alt={product.name}
                        width={400}
                        height={400}
                        loading="lazy"
                        className="max-w-full max-h-full object-contain group-hover:scale-110 transition-transform duration-500"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div className="px-2 flex flex-col flex-grow text-left">
                      <div className="flex flex-col gap-2 mb-3">
                        <h3 className="text-xl font-bold text-stone-900 font-display leading-tight">{product.name}</h3>
                        <div className="flex flex-wrap items-center gap-1.5 min-h-[32px]">
                          {(product.size || product.presentation) && (
                            <div className="inline-block px-2.5 py-1.5 rounded-lg bg-white text-stone-900 text-[10px] font-normal border border-stone-200 shadow-sm whitespace-nowrap">
                              <div className="flex items-center gap-1.5">
                                {product.size && <span>{product.size}</span>}
                                {product.size && product.presentation && <span className="w-1 h-1 rounded-full bg-stone-300" />}
                                {product.presentation && <span>{product.presentation}</span>}
                              </div>
                            </div>
                          )}
                          {product.invima && (
                            <div className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-white text-stone-900 text-[10px] font-normal border border-stone-200 shadow-sm">
                              <ShieldCheck className="w-3.5 h-3.5 text-stone-400 group-hover:text-emerald-500 transition-colors" />
                              <span className="whitespace-nowrap">INVIMA: {product.invima.includes('proceso') || product.invima.includes('verificación') ? 'En trámite' : product.invima}</span>
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="flex flex-col gap-1 mb-4">
                        <span className="text-[20px] font-black uppercase tracking-wider text-emerald-800">Es útil para:</span>
                        <p className="text-stone-500 text-sm line-clamp-2">{product.shortDescription}</p>
                      </div>

                      {/* Benefits with checkmarks */}
                      <div className="space-y-2 mb-6">
                        {product.benefits.slice(0, 3).map((benefit, i) => (
                          <div key={i} className="flex items-start gap-2">
                            <CheckCircle2 className="w-4 h-4 text-emerald-800 flex-shrink-0 mt-0.5" />
                            <span className="text-xs text-stone-700 font-medium">
                              {benefit}
                            </span>
                          </div>
                        ))}
                      </div>
                      <div className="flex items-center justify-between mt-auto pt-4 border-t border-stone-100">
                        <span className="text-2xl font-bold text-stone-900">Desde {formatCurrency(product.basePrice)}</span>
                        <div className="w-10 h-10 rounded-full bg-stone-900 text-white flex items-center justify-center transition-colors group-hover:bg-emerald-600 shrink-0">
                          <ArrowRight className="w-5 h-5" />
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section id="productos" className="py-24 bg-stone-50 hidden md:block">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-[var(--color-brand-primary)] mb-4 font-display">Productos en Lanzamiento</h2>
            <p className="text-stone-600 max-w-2xl mx-auto">Descubre nuestras últimas incorporaciones diseñadas para potenciar tu salud y bienestar natural.</p>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {launchProducts.map((product, index) => (
              <div
                key={product.id}
                className="group bg-white rounded-3xl p-4 border border-stone-200 hover:border-emerald-200 hover:shadow-xl hover:shadow-emerald-900/5 transition-all flex flex-col h-full"
              >
                <Link to={`/producto/${product.id}`} className="flex flex-col h-full" aria-label={`Ver detalles de ${product.name}`}>
                  <div className="aspect-square rounded-2xl overflow-hidden bg-stone-100 mb-6 flex items-center justify-center p-2 relative shrink-0">
                    <img
                      src={product.image}
                      alt={product.name}
                      width={300}
                      height={300}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="px-2 flex flex-col flex-grow">
                    <div className="flex flex-col gap-2 mb-3">
                      <h3 className="text-xl font-bold text-[var(--color-brand-primary)] font-display leading-tight">{product.name}</h3>
                      <div className="flex flex-wrap items-center gap-1.5 min-h-[32px]">
                        {(product.size || product.presentation) && (
                          <div className="inline-block px-2.5 py-1.5 rounded-lg bg-white text-stone-900 text-[10px] font-normal border border-stone-200 shadow-sm whitespace-nowrap">
                            <div className="flex items-center gap-1.5">
                              {product.size && <span>{product.size}</span>}
                              {product.size && product.presentation && <span className="w-1 h-1 rounded-full bg-stone-300" />}
                              {product.presentation && <span>{product.presentation}</span>}
                            </div>
                          </div>
                        )}
                        {product.invima && (
                          <div className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-white text-stone-900 text-[10px] font-normal border border-stone-200 shadow-sm">
                            <ShieldCheck className="w-3.5 h-3.5 text-stone-400 group-hover:text-emerald-500 transition-colors" />
                            <span className="whitespace-nowrap">INVIMA: {product.invima.includes('proceso') || product.invima.includes('verificación') ? 'En trámite' : product.invima}</span>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="flex flex-col gap-1 mb-4">
                      <span className="text-[10px] font-black text-emerald-800 uppercase tracking-wider">Es útil para:</span>
                      <p className="text-stone-600 text-sm line-clamp-2">{product.shortDescription}</p>
                    </div>

                    {/* Benefits with checkmarks */}
                    <div className="space-y-2 mb-6">
                      {product.benefits.slice(0, 3).map((benefit, i) => (
                        <div key={i} className="flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-emerald-800 flex-shrink-0 mt-0.5" />
                          <span className="text-xs text-stone-700 font-medium">
                            {benefit}
                          </span>
                        </div>
                      ))}
                    </div>

                    <div className="flex items-center justify-between mt-auto pt-4 border-t border-stone-100">
                      <span className="text-emerald-700 font-bold">Desde {formatCurrency(product.basePrice)}</span>
                      <div className="w-10 h-10 rounded-full bg-stone-900 text-white flex items-center justify-center group-hover:bg-emerald-600 transition-colors shrink-0">
                        <ArrowRight className="w-5 h-5" />
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
          
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24 bg-white hidden md:block">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <div>
              <h2 className="text-4xl lg:text-7xl font-bold text-stone-900 mb-4 lg:mb-6 font-display leading-[1.1] tracking-tight text-balance">
                Tu Bienestar es Nuestra <span className="text-emerald-800 italic">Prioridad Número Uno</span>
              </h2>
              <p className="text-lg text-stone-600 mb-12 leading-relaxed">
                En Zenhogar nos dedicamos a seleccionar los mejores productos naturales, garantizando que cada artículo que recibas sea 100% original y efectivo.
              </p>
              
              <div className="grid sm:grid-cols-3 gap-6 text-left">
                {[
                  { title: 'Productos 100% Originales', desc: 'Calidad garantizada.' },
                  { title: 'Asesoría Personalizada', desc: 'Equipo listo para ayudarte.' },
                  { title: 'Pago Seguro', desc: 'Pago contra entrega.' }
                ].map((item, i) => (
                  <div key={i} className="p-6 rounded-2xl border-2 border-stone-100 bg-stone-50/50 hover:border-emerald-300 hover:bg-emerald-50 transition-all shadow-sm group">
                    <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-sm">
                      <CheckCircle2 className="w-6 h-6 text-emerald-800" />
                    </div>
                    <h3 className="font-bold text-stone-900 mb-2">{item.title}</h3>
                    <p className="text-[11px] text-stone-600 leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-stone-900 text-white overflow-hidden relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-[var(--color-brand-primary)] mb-4 font-display text-center">Lo que dicen nuestros clientes</h2>
            <p className="text-stone-400 max-w-2xl mx-auto">Historias reales de personas que han transformado su bienestar con nuestros productos.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: 'María Fernanda', text: 'El Rtafull me ayudó muchísimo con mi pesadez estomacal. ¡Me siento como nueva!', rating: 5 },
              { name: 'Juan Carlos', text: 'Excelente servicio y el pago contra entrega me dio mucha confianza para mi primera compra.', rating: 5 },
              { name: 'Luz Adriana', text: 'Los combos son geniales, el ahorro es real y los productos son originales.', rating: 5 }
            ].map((t, i) => (
              <div
                key={i}
                className="bg-white/5 backdrop-blur-sm border border-white/10 p-8 rounded-[2rem] hover:bg-white/10 transition-all"
              >
                <div className="flex gap-1 mb-6 text-emerald-500">
                  {[...Array(t.rating)].map((_, s) => (
                    <Star key={s} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <p className="text-lg text-stone-300 italic mb-8">"{t.text}"</p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-emerald-600/20 flex items-center justify-center text-emerald-500 font-bold">
                    {t.name[0]}
                  </div>
                  <div>
                    <div className="font-bold">{t.name}</div>
                    <div className="text-xs text-stone-500 uppercase tracking-widest">Cliente Verificado</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Decorative background pattern */}
        <div className="absolute top-0 left-0 w-full h-full opacity-[0.02] pointer-events-none">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid-footer" width="60" height="60" patternUnits="userSpaceOnUse">
                <path d="M 60 0 L 0 0 0 60" fill="none" stroke="white" strokeWidth="1"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid-footer)" />
          </svg>
        </div>
      </section>

      <FAQSection generalFaqs={GENERAL_FAQS} />
      
      {/* Footer */}
      <Footer />
    </div>
  );
}
