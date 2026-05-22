import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { PRODUCTS, CATEGORIES } from '../constants';
import { ArrowRight, ArrowLeft, Sparkles, Heart, Zap, ShieldCheck } from 'lucide-react';
import Footer from '../components/Footer';
import SEOManager from '../components/SEOManager';
import Breadcrumbs from '../components/Breadcrumbs';
import { formatCurrency, cn } from '../utils';

export default function CategoryPage() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const category = CATEGORIES.find(c => c.id === id);
  const categoryProducts = PRODUCTS.filter(p => p.category === id);

  const currentIndex = CATEGORIES.findIndex(c => c.id === id);
  const nextCategory = currentIndex !== -1 ? CATEGORIES[(currentIndex + 1) % CATEGORIES.length] : null;

  const handleNextCategory = () => {
    if (nextCategory) {
      navigate(`/categoria/${nextCategory.id}`);
    }
  };

  if (!category) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Categoría no encontrada</h1>
          <button 
            onClick={() => navigate(-1)} 
            className="text-emerald-600 font-black flex items-center justify-center gap-3 p-4 rounded-2xl hover:bg-emerald-50 transition-all active:scale-95 group"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" /> 
            <span className="text-lg">Volver</span>
          </button>
        </div>
      </div>
    );
  }

  const getThemeClasses = () => {
    switch (category.color) {
      case 'emerald':
        return {
          bg: 'bg-emerald-50',
          text: 'text-emerald-600',
          accent: 'bg-emerald-600',
          hover: 'hover:border-emerald-200 hover:shadow-emerald-900/5',
          icon: <Sparkles className="w-12 h-12 text-emerald-600" />
        };
      case 'rose':
        return {
          bg: 'bg-rose-50',
          text: 'text-rose-600',
          accent: 'bg-rose-600',
          hover: 'hover:border-rose-200 hover:shadow-rose-900/5',
          icon: <Heart className="w-12 h-12 text-rose-600" />
        };
      case 'purple':
        return {
          bg: 'bg-purple-50',
          text: 'text-purple-600',
          accent: 'bg-purple-600',
          hover: 'hover:border-purple-200 hover:shadow-purple-900/5',
          icon: <Zap className="w-12 h-12 text-purple-600" />
        };
      default:
        return {
          bg: 'bg-stone-50',
          text: 'text-stone-600',
          accent: 'bg-stone-900',
          hover: 'hover:border-stone-200 hover:shadow-stone-900/5',
          icon: <Sparkles className="w-12 h-12 text-stone-600" />
        };
    }
  };

  const theme = getThemeClasses();

  return (
    <div className="flex flex-col min-h-screen">
      <SEOManager 
        title={category.name}
        description={`${category.description} Encuentra soluciones naturales para tu bienestar con productos naturales originales.`}
        canonicalUrl={`/categoria/${category.id}`}
        type="category"
        productData={{ categoryProducts }}
      />
      
      {/* Floating Category Navigation */}
      <button 
        onClick={() => navigate(-1)}
        className="fixed left-2 sm:left-4 md:left-6 lg:left-8 top-1/2 -translate-y-1/2 z-50 bg-white/90 backdrop-blur-md text-stone-700 hover:text-emerald-600 hover:bg-white w-10 h-10 sm:w-12 sm:h-12 rounded-full shadow-[0_4px_12px_rgba(0,0,0,0.15)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.2)] hover:scale-105 active:scale-95 opacity-40 hover:opacity-100 transition-all border border-stone-200/80 flex items-center justify-center group focus:outline-none"
        aria-label="Volver"
      >
        <ArrowLeft className="w-5 h-5 sm:w-6 sm:h-6 group-hover:-translate-x-0.5 transition-transform" />
      </button>

      <button 
        onClick={handleNextCategory}
        className="fixed right-2 sm:right-4 md:right-6 lg:right-8 top-1/2 -translate-y-1/2 z-50 bg-white/90 backdrop-blur-md text-stone-700 hover:text-emerald-600 hover:bg-white w-10 h-10 sm:w-12 sm:h-12 rounded-full shadow-[0_4px_12px_rgba(0,0,0,0.15)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.2)] hover:scale-105 active:scale-95 opacity-40 hover:opacity-100 transition-all border border-stone-200/80 flex items-center justify-center group focus:outline-none"
        aria-label="Siguiente"
      >
        <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6 group-hover:translate-x-0.5 transition-transform" />
      </button>

      <Breadcrumbs />

      {/* Header Section */}
      <section className={cn("py-4 lg:py-6 relative overflow-hidden", theme.bg)}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col gap-6">

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-row items-center gap-4 lg:gap-8 flex-grow"
          >
            <div className="shrink-0">
              {category.image ? (
                <div className="w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 rounded-xl overflow-hidden bg-white shadow-md border-2 border-white">
                  <img 
                    src={category.image} 
                    alt={category.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              ) : (
                <div className="scale-50 sm:scale-60 lg:scale-75">
                  {theme.icon}
                </div>
              )}
            </div>
            <div className="flex-1">
              <h1 className="text-lg sm:text-xl lg:text-2xl font-black text-[var(--color-brand-primary)] mb-0.5 font-display leading-tight">
                {category.name}
              </h1>
              <p className="text-base text-justify text-stone-600 max-w-xl leading-relaxed">
                {category.description}
              </p>
            </div>
          </motion.div>
        </div>
        
        {/* Decorative background elements */}
        <div className={cn("absolute top-0 right-0 w-1/3 h-full opacity-10 blur-3xl rounded-full translate-x-1/2 -translate-y-1/2", theme.accent)} />
      </section>

      {/* Products Grid */}
      <section className="pt-[23px] pb-24 bg-white flex-grow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {categoryProducts.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {categoryProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className={cn(
                    "group bg-white rounded-3xl p-4 border border-stone-200 transition-all",
                    theme.hover
                  )}
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
                      <div className="flex flex-col gap-1 mb-6">
                        <span className={cn("text-[20px] font-black uppercase tracking-wider", theme.text)}>Es útil para:</span>
                        <p className="text-stone-500 text-sm line-clamp-2">{product.shortDescription}</p>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className={cn("text-2xl font-bold", theme.text)}>Desde {formatCurrency(product.basePrice)}</span>
                        <div className={cn(
                          "w-10 h-10 rounded-full text-white flex items-center justify-center transition-colors bg-stone-900",
                          category.color === 'emerald' && "group-hover:bg-emerald-600",
                          category.color === 'rose' && "group-hover:bg-rose-600",
                          category.color === 'purple' && "group-hover:bg-purple-600"
                        )}>
                          <ArrowRight className="w-5 h-5" />
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-stone-500 text-lg">Próximamente más productos en esta categoría.</p>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
