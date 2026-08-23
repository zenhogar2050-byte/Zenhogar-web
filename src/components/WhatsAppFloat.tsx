import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { MessageCircle } from 'lucide-react';
import { motion } from 'motion/react';
import { PRODUCTS, PROMOTIONS, COMBO_OF_THE_MONTH, CATEGORIES } from '../constants';

export default function WhatsAppFloat() {
  const [isVisible, setIsVisible] = useState(true);
  const location = useLocation();

  const cleanStr = (str: string) => 
    str.toLowerCase()
       .normalize("NFD")
       .replace(/[\u0300-\u036f]/g, "")
       .replace(/[^a-z0-9]+/g, '-')
       .replace(/-+/g, '-')
       .replace(/^-+|-+$/g, '');

  // Detect context from URL
  let productContext = '';
  let categoryContext = '';
  
  if (location.pathname.startsWith('/producto/')) {
    const rawId = location.pathname.split('/').pop() || '';
    const targetClean = cleanStr(rawId);
    const product = PRODUCTS.find(p => cleanStr(p.id) === targetClean || p.masterId === rawId || cleanStr(p.name) === targetClean);
    productContext = product ? product.name : rawId.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
  } else if (location.pathname.startsWith('/combo/')) {
    const rawId = location.pathname.split('/').pop() || '';
    const targetClean = cleanStr(rawId);
    const combo = PROMOTIONS.find(p => cleanStr(p.id) === targetClean || cleanStr(p.name) === targetClean) ||
      (cleanStr(COMBO_OF_THE_MONTH.id) === targetClean || cleanStr(COMBO_OF_THE_MONTH.name) === targetClean || targetClean.includes('futbolero') || targetClean.includes('inmunidad-dual') || targetClean.includes('combo-7') || targetClean.includes('promo-7') ? COMBO_OF_THE_MONTH : null);

    if (combo) {
      const resolvedComponents = (combo.products || [])
        .map(pid => {
          const prod = PRODUCTS.find(p => p.id === pid);
          if (!prod) return pid;
          return prod.name.replace(/\s*\([^)]*\)/g, '').trim();
        })
        .filter(Boolean);

      const componentsText = resolvedComponents.length > 0 
        ? resolvedComponents.join(' + ') 
        : combo.components;

      productContext = `${combo.name}${componentsText ? ` (${componentsText})` : ''}`;
    } else {
      productContext = `Combo ${rawId.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}`;
    }
  } else if (location.pathname.startsWith('/categoria/')) {
    const rawId = location.pathname.split('/').pop() || '';
    const targetClean = cleanStr(rawId);
    const category = CATEGORIES.find(c => cleanStr(c.id) === targetClean || cleanStr(c.name) === targetClean);
    categoryContext = category ? category.name : rawId.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
  }

  const whatsappNumber = '573024102568'; 
  
  let message = 'Hola! Me gustaría recibir más información sobre los productos de Zenhogar.';
  if (productContext) {
    message = `Hola *ZENHOGAR*! 👋\n\nEstoy interesado en: *${productContext}*\n\nMe gustaría recibir más información. ¿Podrían ayudarme?`;
  } else if (categoryContext) {
    message = `Hola *ZENHOGAR*! 👋\n\nEstoy buscando productos de la categoría: *${categoryContext}*\n\n¿Me podrían asesorar para elegir el mejor para mí?`;
  } else if (location.pathname === '/') {
    message = `Hola *ZENHOGAR*! 👋\n\nEstoy visitando su tienda y me gustaría recibir información sobre sus productos y promociones. ✨`;
  }
    
  const whatsappUrl = `https://api.whatsapp.com/send?phone=${whatsappNumber}&text=${encodeURIComponent(message)}`;

  return (
    <motion.a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className="fixed bottom-36 sm:bottom-6 right-4 sm:right-6 z-[101] bg-[#25D366] text-white p-4 rounded-full shadow-2xl flex items-center justify-center group"
      aria-label="Contactar por WhatsApp"
    >
      <svg 
        viewBox="0 0 24 24" 
        className="w-6 h-6 fill-current"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
      </svg>
      <span className="absolute right-full mr-3 bg-white text-stone-900 px-3 py-1.5 rounded-lg text-sm font-bold shadow-xl opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none border border-stone-100">
        ¿Necesitas ayuda?
      </span>
    </motion.a>
  );
}
