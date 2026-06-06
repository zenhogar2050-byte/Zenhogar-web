import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect, lazy, Suspense } from 'react';
import { CartProvider } from './CartContext';
import Navbar from './components/Navbar';
import PromoBanner from './components/PromoBanner';
import WhatsAppFloat from './components/WhatsAppFloat';
import TopBanner from './components/TopBanner';
import { track, markFacebookEntry, initPixel } from './utils/pixel';

function SEOCleaner() {
  useEffect(() => {
    // Elimina el esquema estático para que no choque con el dinámico de Helmet
    const staticSchema = document.getElementById('schema-static');
    if (staticSchema) {
      staticSchema.remove();
    }
  }, []);
  return null;
}

function PageTracker() {
  const { pathname } = useLocation();
  useEffect(() => {
    track('PageView');
  }, [pathname]);
  return null;
}

// Static imports for SSR compatibility
import Home from './pages/Home';
import ProductLanding from './pages/ProductLanding';
import ComboLanding from './pages/ComboLanding';
import Checkout from './pages/Checkout';
import CategoryPage from './pages/CategoryPage';
import Gracias from './pages/Gracias';
import AboutUs from './pages/AboutUs';
import PrivacyPolicy from './pages/PrivacyPolicy';
import RefundPolicy from './pages/RefundPolicy';
import TermsOfService from './pages/TermsOfService';
import DeliveryConditions from './pages/DeliveryConditions';
import ReturnsWarranty from './pages/ReturnsWarranty';
import AdminDashboard from './pages/AdminDashboard';
import NotFound from './pages/NotFound';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [pathname]);
  return null;
}

export default function App() {
  useEffect(() => {
    markFacebookEntry();
  }, []);

  return (
    <CartProvider>
      <SEOCleaner />
      <PageTracker />
      <ScrollToTop />
      <AppContent />
    </CartProvider>
  );
}

function AppContent() {
  const location = useLocation();
  const isHome = location.pathname === '/';
  const isAdmin = location.pathname.startsWith('/admin');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const p = new URLSearchParams(window.location.search);
      const gclid = p.get('gclid');
      if (gclid) {
        localStorage.setItem('gclid', gclid);
        console.log('🎯 [GCLID Tracker] GCLID detectado y guardado en localStorage:', gclid);
      }
    }
  }, [location.search]);

  if (isAdmin) {
    return (
      <Suspense fallback={null}>
        <Routes>
          <Route path="/admin" element={<AdminDashboard />} />
        </Routes>
      </Suspense>
    );
  }

  return (
    <div className="min-h-screen font-sans text-stone-900">
      <a 
        href="#main-content" 
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:bg-emerald-600 focus:text-white focus:px-6 focus:py-3 focus:rounded-xl focus:shadow-xl"
      >
        Saltar al contenido principal
      </a>
      <TopBanner />
      <Navbar />
      {isHome && <PromoBanner />}
      <main id="main-content">
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
            <Route path="/quienes-somos" element={<AboutUs />} />
            <Route path="/politica-privacidad" element={<PrivacyPolicy />} />
            <Route path="/politica-reembolso" element={<RefundPolicy />} />
            <Route path="/terminos-servicio" element={<TermsOfService />} />
            <Route path="/condiciones-entrega" element={<DeliveryConditions />} />
            <Route path="/devoluciones-garantia" element={<ReturnsWarranty />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </main>
      <WhatsAppFloat />
    </div>
  );
}