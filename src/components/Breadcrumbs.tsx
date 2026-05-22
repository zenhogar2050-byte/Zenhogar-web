import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';
import { CATEGORIES, PRODUCTS, PROMOTIONS } from '../constants';

interface BreadcrumbItem {
  label: string;
  path?: string;
  isCurrent?: boolean;
}

export default function Breadcrumbs() {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);

  const getBreadcrumbs = (): BreadcrumbItem[] => {
    const items: BreadcrumbItem[] = [
      { label: 'Inicio', path: '/' },
    ];

    if (pathnames[0] === 'categoria') {
      const categoryId = pathnames[1];
      const category = CATEGORIES.find((c) => c.id === categoryId);
      if (category) {
        items.push({ label: category.name, isCurrent: true });
      }
    } else if (pathnames[0] === 'producto') {
      const productId = pathnames[1];
      const product = PRODUCTS.find((p) => p.id === productId);
      if (product) {
        const category = CATEGORIES.find((c) => c.id === product.category);
        if (category) {
          items.push({ label: category.name, path: `/categoria/${category.id}` });
        }
        items.push({ label: product.name, isCurrent: true });
      }
    } else if (pathnames[0] === 'combo') {
      const comboId = pathnames[1];
      const combo = PROMOTIONS.find((p) => p.id === comboId);
      if (combo) {
        items.push({ label: 'Combos y Ofertas', isCurrent: true });
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
      <ol className="flex flex-wrap items-center gap-2 text-[15px] font-medium text-stone-500">
        {items.map((item, index) => (
          <li key={index} className="flex items-center gap-2">
            {index > 0 && <ChevronRight className="w-4 h-4 text-stone-300 shrink-0" />}
            {item.path && !item.isCurrent ? (
              <Link
                to={item.path}
                className="hover:text-emerald-600 transition-colors flex items-center gap-1.5"
              >
                {index === 0 && <Home className="w-4 h-4" />}
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
