import { motion } from 'motion/react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { PROMOTIONS, COMBO_OF_THE_MONTH, CATEGORIES, PRODUCTS } from '../constants';
import { ArrowRight, CheckCircle2, ShieldCheck, Truck, Sparkles, ShoppingCart, Zap, Heart, Star, Activity, Flame } from 'lucide-react';
import Footer from '../components/Footer';
import SEOManager from '../components/SEOManager';
import { formatCurrency, cn, cleanPromoName } from '../utils';
import { useCart } from '../CartContext';
import { useEffect } from 'react';

export default function Home() {
  const navigate = useNavigate();
  const { hash } = useLocation();
  const { addComboToCart } = useCart();

  useEffect(() => {
    if (hash) {
      const element = document.getElementById(hash.replace('#', ''));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [hash]);

  const handleComboBuy = () => {
    navigate(`/combo/${COMBO_OF_THE_MONTH.id}`);
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
      />

      {/* Hero Section - Solution Oriented */}
      <section className="relative pt-10 pb-12 lg:pt-16 lg:pb-20 overflow-hidden bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-4xl lg:text-7xl font-bold text-stone-900 mb-6 font-display leading-[1.1] tracking-tight">
                Reclama el Control de tu <span className="text-emerald-600 italic">Vitalidad</span>
              </h1>
              <p className="text-xl lg:text-2xl text-stone-600 mb-10 leading-relaxed font-light">
                Soluciones orgánicas de grado premium diseñadas para transformar tu salud desde el interior. Ciencia natural para una vida sin límites.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <div className="flex items-center gap-2 text-stone-500 font-medium">
                  <ShieldCheck className="w-5 h-5 text-emerald-600" />
                  <span>Certificación INVIMA Garantizada</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
        {/* Abstract organic background elements */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10 opacity-30">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-emerald-100 blur-[120px] rounded-full" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-stone-100 blur-[120px] rounded-full" />
        </div>
      </section>

      {/* Categories Section - Moved to Top */}
      <section className="py-12 bg-stone-50 border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-8 lg:gap-12">
            {CATEGORIES.map((category) => {
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
                >
                  {/* Unified 3D Capsule Button */}
                  <div className={cn(
                    "relative overflow-hidden text-white px-8 sm:px-10 py-4 sm:py-5 rounded-full font-black uppercase tracking-widest flex items-center gap-5 transition-all border-b-8 border-t border-white/20 active:border-b-4 active:translate-y-1 shadow-2xl",
                    colors.bg,
                    category.color === 'emerald' && "border-b-emerald-900",
                    category.color === 'rose' && "border-b-rose-900",
                    category.color === 'purple' && "border-b-purple-900",
                    colors.shadow,
                    colors.glow
                  )}>
                    {/* Glossy Overlay */}
                    <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-white/20 to-transparent pointer-events-none" />
                    
                    <Icon className="w-8 h-8 sm:w-10 sm:h-10 relative z-10 drop-shadow-md" />
                    
                    <div className="flex flex-col relative z-10">
                      <span className="text-[8px] sm:text-[10px] opacity-80 leading-none mb-1">Ver más productos de</span>
                      <span className="text-xs sm:text-base leading-tight">{category.name}</span>
                    </div>
                    
                    <ArrowRight className="w-6 h-6 sm:w-8 sm:h-8 relative z-10 group-hover:translate-x-2 transition-transform" />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-white border-y border-stone-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="sr-only">Nuestras Ventajas</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-xl bg-stone-50 text-emerald-600">
                <Truck className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-stone-900 mb-1">Envíos a todo el país</h3>
                <p className="text-sm text-stone-500">Llegamos a cada rincón de Colombia con seguridad.</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-xl bg-stone-50 text-emerald-600">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-stone-900 mb-1">Pago Contra Entrega</h3>
                <p className="text-sm text-stone-500">Paga cuando recibas tu pedido en la puerta de tu casa.</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-xl bg-stone-50 text-emerald-600">
                <Sparkles className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-stone-900 mb-1">Garantía de Calidad</h3>
                <p className="text-sm text-stone-500">Productos originales y con registro sanitario.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Combo of the Month */}
      <section id="oferta-del-mes" className="pt-8 pb-4 lg:pt-12 lg:pb-6 bg-white hidden sm:block">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative overflow-hidden rounded-[2.5rem] lg:rounded-[3rem] bg-stone-900 text-white p-6 sm:p-10 lg:p-16"
          >
            <div className="grid lg:grid-cols-2 gap-10 lg:gap-12 items-center relative z-10">
              <div className="text-center lg:text-left">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-600 text-white text-[10px] sm:text-xs font-black tracking-widest uppercase mb-6 lg:mb-8">
                  <Zap className="w-3 h-3 sm:w-4 sm:h-4 fill-current" />
                  <span>{COMBO_OF_THE_MONTH.badge}</span>
                </div>
                <h2 className="text-3xl sm:text-4xl lg:text-6xl font-black mb-4 lg:mb-6 leading-tight font-display">
                  {cleanPromoName(COMBO_OF_THE_MONTH.name)}
                </h2>
                <div className="mb-8 lg:mb-10 max-w-lg mx-auto lg:mx-0 text-center lg:text-left">
                  <h3 className="text-emerald-500 font-bold text-[27px] mb-2 leading-tight">{COMBO_OF_THE_MONTH.whyChoose?.title}</h3>
                  <p className="text-[21px] lg:text-[21px] text-stone-400 leading-relaxed">
                    {COMBO_OF_THE_MONTH.whyChoose?.description}
                  </p>
                </div>
                
                <div className="flex flex-col sm:flex-row items-center lg:items-end gap-4 sm:gap-6 mb-8 lg:mb-10">
                  <div className="text-center sm:text-left">
                    <div className="text-stone-500 text-xs sm:text-sm line-through mb-1">Antes {formatCurrency(COMBO_OF_THE_MONTH.originalPrice)}</div>
                    <div className="text-4xl sm:text-5xl font-black text-emerald-500">{formatCurrency(COMBO_OF_THE_MONTH.price)}</div>
                  </div>
                  <div className="bg-emerald-600/20 text-emerald-500 px-3 py-1 rounded-lg text-xs sm:text-sm font-bold">
                    Ahorra {formatCurrency(COMBO_OF_THE_MONTH.originalPrice - COMBO_OF_THE_MONTH.price)}
                  </div>
                </div>

                <button 
                  onClick={handleComboBuy}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-white text-stone-900 rounded-2xl font-black text-xs lg:text-sm hover:bg-emerald-500 hover:text-white transition-all shadow-xl shadow-white/5 group"
                >
                  <ShoppingCart className="w-4 h-4 lg:w-5 lg:h-5 group-hover:scale-110 transition-transform" />
                  APROVECHAR OFERTA
                </button>

                <div className="mt-8 flex items-center gap-3 text-emerald-500 font-bold text-sm lg:text-base">
                  <Zap className="w-5 h-5 fill-current animate-pulse" />
                  <span>Envío GRATIS + Pago Contra Entrega + Incluye Obsequio 🎁</span>
                </div>
              </div>
              
              <div className="relative mt-4 lg:mt-0">
                <div className="aspect-square rounded-[1.5rem] lg:rounded-[2rem] overflow-hidden bg-white/5 backdrop-blur-sm border border-white/10 p-6 sm:p-8 flex items-center justify-center">
                  <img 
                    src={COMBO_OF_THE_MONTH.image} 
                    alt={COMBO_OF_THE_MONTH.name}
                    width={600}
                    height={600}
                    loading="eager"
                    fetchPriority="high"
                    className="max-w-full max-h-full object-contain drop-shadow-[0_15px_40px_rgba(0,0,0,0.5)]"
                    referrerPolicy="no-referrer"
                  />
                </div>
                {/* Decorative elements */}
                <div className="absolute -top-6 -right-6 lg:-top-10 lg:-right-10 w-24 h-24 lg:w-40 lg:h-40 bg-emerald-600/20 blur-2xl lg:blur-3xl rounded-full" />
                <div className="absolute -bottom-6 -left-6 lg:-bottom-10 lg:-left-10 w-24 h-24 lg:w-40 lg:h-40 bg-emerald-600/20 blur-2xl lg:blur-3xl rounded-full" />
              </div>
            </div>
            
            {/* Background pattern */}
            <div className="absolute top-0 right-0 w-full h-full opacity-[0.03] pointer-events-none">
              <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                    <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="1"/>
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid)" />
              </svg>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Products Grid */}
      <section id="productos" className="py-24 bg-stone-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-[var(--color-brand-primary)] mb-4 font-display">Top 6: Los Más Vendidos</h2>
            <p className="text-stone-600 max-w-2xl mx-auto">Nuestros productos favoritos seleccionados por su efectividad y calidad superior.</p>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {PRODUCTS.slice(0, 6).map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group bg-white rounded-3xl p-4 border border-stone-200 hover:border-emerald-200 hover:shadow-xl hover:shadow-emerald-900/5 transition-all"
              >
                <Link to={`/producto/${product.id}`} className="block">
                  <div className="aspect-square rounded-2xl overflow-hidden bg-stone-100 mb-6 flex items-center justify-center p-2">
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
                  <div className="px-2">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="text-xl font-bold text-[var(--color-brand-primary)] font-display">{product.name}</h3>
                      {product.size && (
                        <span className="text-[10px] uppercase tracking-widest font-black text-stone-400 bg-stone-100 px-2 py-1 rounded-md">
                          {product.size}
                        </span>
                      )}
                    </div>
                    <div className="flex flex-col gap-1 mb-4">
                      <span className="text-[10px] font-black text-emerald-600 uppercase tracking-wider">Es útil para:</span>
                      <p className="text-stone-500 text-sm line-clamp-2">{product.shortDescription}</p>
                    </div>

                    {/* Benefits with checkmarks */}
                    <div className="space-y-2 mb-6">
                      {product.benefits.slice(0, 2).map((benefit, i) => (
                        <div key={i} className="flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                          <span className="text-xs text-stone-600 font-medium line-clamp-1">{benefit}</span>
                        </div>
                      ))}
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-emerald-700 font-bold">Desde {formatCurrency(product.basePrice)}</span>
                      <div className="w-10 h-10 rounded-full bg-stone-900 text-white flex items-center justify-center group-hover:bg-emerald-600 transition-colors">
                        <ArrowRight className="w-5 h-5" />
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
          
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl lg:text-5xl font-bold text-[var(--color-brand-primary)] mb-6 font-display leading-tight">
                Tu Bienestar es Nuestra <span className="text-emerald-600 italic">Prioridad Número Uno</span>
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
                      <CheckCircle2 className="w-6 h-6 text-emerald-600" />
                    </div>
                    <h4 className="font-bold text-stone-900 mb-2">{item.title}</h4>
                    <p className="text-xs text-stone-500 leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </motion.div>
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
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
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
              </motion.div>
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

      {/* Footer */}
      <Footer />
    </div>
  );
}
