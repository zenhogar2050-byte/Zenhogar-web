import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { PRODUCTS, CATEGORIES } from '../constants';
import { ArrowRight, ArrowLeft, Sparkles, Heart, Zap } from 'lucide-react';
import Footer from '../components/Footer';
import SEOManager from '../components/SEOManager';
import { formatCurrency, cn } from '../utils';

export default function CategoryPage() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const category = CATEGORIES.find(c => c.id === id);
  const categoryProducts = PRODUCTS.filter(p => p.category === id);

  if (!category) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Categoría no encontrada</h1>
          <button onClick={() => navigate(-1)} className="text-emerald-600 hover:underline flex items-center justify-center gap-2">
            <ArrowLeft className="w-4 h-4" /> Volver
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
      />
      {/* Header Section */}
      <section className={cn("py-6 lg:py-10 relative overflow-hidden", theme.bg)}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <button onClick={() => navigate(-1)} className="inline-flex items-center gap-2 text-stone-500 hover:text-stone-900 transition-colors mb-8">
            <ArrowLeft className="w-4 h-4" /> Volver
          </button>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="mb-6">
              {theme.icon}
            </div>
            <h1 className="text-4xl lg:text-6xl font-bold text-[var(--color-brand-primary)] mb-6 font-display">
              {category.name}
            </h1>
            <p className="text-xl text-stone-600 max-w-2xl leading-relaxed">
              {category.description}
            </p>
          </motion.div>
        </div>
        
        {/* Decorative background elements */}
        <div className={cn("absolute top-0 right-0 w-1/3 h-full opacity-10 blur-3xl rounded-full translate-x-1/2 -translate-y-1/2", theme.accent)} />
      </section>

      {/* Products Grid */}
      <section className="py-24 bg-white flex-grow">
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
                        className="max-w-full max-h-full object-contain group-hover:scale-110 transition-transform duration-500"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div className="px-2">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="text-xl font-bold text-stone-900 font-display">{product.name}</h3>
                        {product.size && (
                          <span className="text-[10px] uppercase tracking-widest font-black text-stone-400 bg-stone-100 px-2 py-1 rounded-md">
                            {product.size}
                          </span>
                        )}
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
