import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect, lazy, Suspense } from 'react';
import { CartProvider } from './CartContext';
import Navbar from './components/Navbar';
import PromoBanner from './components/PromoBanner';
import WhatsAppFloat from './components/WhatsAppFloat';
import { track, markFacebookEntry, initPixel } from './utils/pixel';

function PageTracker() {
  const location = useLocation();
  useEffect(() => {
    track('PageView');
  }, [location]);
  return null;
}

// Dynamic imports for pages
const Home = lazy(() => import('./pages/Home'));
const ProductLanding = lazy(() => import('./pages/ProductLanding'));
const ComboLanding = lazy(() => import('./pages/ComboLanding'));
const Checkout = lazy(() => import('./pages/Checkout'));
const CategoryPage = lazy(() => import('./pages/CategoryPage'));
const Gracias = lazy(() => import('./pages/Gracias'));

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    if (pathname === '/') {
      // Small timeout to ensure the banner is rendered
      setTimeout(() => {
        const banner = document.getElementById('promo-banner');
        if (banner) {
          const navbarHeight = 64;
          const elementPosition = banner.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - navbarHeight;

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        } else {
          window.scrollTo(0, 0);
        }
      }, 100);
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname]);

  return null;
}

export default function App() {
  useEffect(() => {
    markFacebookEntry();
    initPixel();
  }, []);

  return (
    <CartProvider>
      <Router>
        <PageTracker />
        <ScrollToTop />
        <AppContent />
      </Router>
    </CartProvider>
  );
}

function AppContent() {
  const location = useLocation();
  const isHome = location.pathname === '/';

  return (
    <div className="min-h-screen font-sans text-stone-900">
      <Navbar />
      {isHome && <PromoBanner />}
      <main>
        <Suspense fallback={
          <div className="min-h-[60vh] flex items-center justify-center">
            <div className="w-8 h-8 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin"></div>
          </div>
        }>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/producto/:id" element={<ProductLanding />} />
            <Route path="/combo/:id" element={<ComboLanding />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/gracias" element={<Gracias />} />
            <Route path="/categoria/:id" element={<CategoryPage />} />
            <Route path="*" element={<Home />} />
          </Routes>
        </Suspense>
      </main>
      <WhatsAppFloat />
    </div>
  );
}
