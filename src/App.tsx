import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect, lazy, Suspense } from 'react';
import { CartProvider } from './CartContext';
import Navbar from './components/Navbar';
import PromoBanner from './components/PromoBanner';
import WhatsAppFloat from './components/WhatsAppFloat';
import TopBanner from './components/TopBanner';
import SocialProof from './components/SocialProof';
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

// Dynamic imports
import Home from './pages/Home';
const ProductLanding = lazy(() => import('./pages/ProductLanding'));
const ComboLanding = lazy(() => import('./pages/ComboLanding'));
const Checkout = lazy(() => import('./pages/Checkout'));
const CategoryPage = lazy(() => import('./pages/CategoryPage'));
const Gracias = lazy(() => import('./pages/Gracias'));
const AboutUs = lazy(() => import('./pages/AboutUs'));
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy'));
const DeliveryConditions = lazy(() => import('./pages/DeliveryConditions'));
const ReturnsWarranty = lazy(() => import('./pages/ReturnsWarranty'));
const AdminDashboard = lazy(() => import('./pages/AdminDashboard'));

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
      <Router>
        <SEOCleaner />
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
  const isAdmin = location.pathname.startsWith('/admin');

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
      <TopBanner />
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
            <Route path="/quienes-somos" element={<AboutUs />} />
            <Route path="/politica-privacidad" element={<PrivacyPolicy />} />
            <Route path="/condiciones-entrega" element={<DeliveryConditions />} />
            <Route path="/devoluciones-garantia" element={<ReturnsWarranty />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="*" element={<Home />} />
          </Routes>
        </Suspense>
      </main>
      <WhatsAppFloat />
      <SocialProof />
    </div>
  );
}