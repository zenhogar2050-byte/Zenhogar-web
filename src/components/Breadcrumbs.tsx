import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';
import { CATEGORIES, PRODUCTS, PROMOTIONS, COMBO_OF_THE_MONTH } from '../constants';

interface BreadcrumbItem {
  label: string;
  path?: string;
  isCurrent?: boolean;
}

export default function Breadcrumbs() {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);

  // Normalización ultra-robusta de slugs para emparejar enlaces basados tanto en ID como en Nombre
  const cleanStr = (str: string) => 
    str.toLowerCase()
       .normalize("NFD")
       .replace(/[\u0300-\u036f]/g, "") // Limpiar tildes y acentos
       .replace(/[^a-z0-9]+/g, '-')     // Reemplazar espacios y caracteres no alfa-numéricos con guion
       .replace(/-+/g, '-')             // Colapsar guiones múltiples
       .replace(/^-+|-+$/g, '');        // Recortar guiones iniciales/finales

  const getBreadcrumbs = (): BreadcrumbItem[] => {
    const items: BreadcrumbItem[] = [
      { label: 'Inicio', path: '/' },
    ];

    if (pathnames[0] === 'categoria') {
      const targetIdClean = pathnames[1] ? cleanStr(pathnames[1]) : '';
      const category = CATEGORIES.find((c) => {
        const cleanId = cleanStr(c.id);
        const cleanName = cleanStr(c.name);
        return cleanId === targetIdClean || cleanName === targetIdClean;
      });
      if (category) {
        items.push({ label: category.name, isCurrent: true });
      }
    } else if (pathnames[0] === 'producto') {
      const targetIdClean = pathnames[1] ? cleanStr(pathnames[1]) : '';
      const product = PRODUCTS.find((p) => {
        const cleanId = cleanStr(p.id);
        const cleanName = cleanStr(p.name);
        return cleanId === targetIdClean || cleanName === targetIdClean;
      });
      if (product) {
        const category = CATEGORIES.find((c) => cleanStr(c.id) === cleanStr(product.category));
        if (category) {
          items.push({ label: category.name, path: `/categoria/${category.id}` });
        }
        items.push({ label: product.name, isCurrent: true });
      }
    } else if (pathnames[0] === 'combo') {
      const targetIdClean = pathnames[1] ? cleanStr(pathnames[1]) : '';
      const combo = [COMBO_OF_THE_MONTH, ...PROMOTIONS].find((p) => {
        const cleanId = cleanStr(p.id);
        const cleanName = cleanStr(p.name);
        return cleanId === targetIdClean || cleanName === targetIdClean;
      });
      if (combo) {
        items.push({ label: 'Combos', path: '/categoria/combos' });
        items.push({ label: combo.name, isCurrent: true });
      }
    } else if (pathnames[0] === 'checkout') {
      items.push({ label: 'Carrito de Compras', isCurrent: true });
    } else if (pathnames[0] === 'quienes-somos') {
      items.push({ label: 'Quiénes Somos', isCurrent: true });
    }

    return items;
  };

  const items = getBreadcrumbs();

  if (items.length <= 1) return null;

  return (
    <nav aria-label="Breadcrumb" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
      <ol className="flex flex-wrap items-center gap-2 text-xs sm:text-sm font-medium text-stone-500">
        {items.map((item, index) => (
          <li key={index} className="flex items-center gap-2">
            {index > 0 && <ChevronRight className="w-3.5 h-3.5 text-stone-300 shrink-0" />}
            {item.path && !item.isCurrent ? (
              <Link
                to={item.path}
                className="hover:text-emerald-600 transition-colors flex items-center gap-1.5"
              >
                {index === 0 && <Home className="w-3.5 h-3.5" />}
                {item.label}
              </Link>
            ) : (
              <span className={item.isCurrent ? "text-stone-900 font-bold" : ""}>
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
