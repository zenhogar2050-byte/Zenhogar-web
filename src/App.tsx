import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect, lazy, Suspense } from 'react';
import { CartProvider } from './CartContext';
import Navbar from './components/Navbar';
import PromoBanner from './components/PromoBanner';
import WhatsAppFloat from './components/WhatsAppFloat';
import TopBanner from './components/TopBanner';
import SocialProof from './components/SocialProof';
import { track, markFacebookEntry, initPixel } from './utils/pixel';

function PageTracker() {
  const location = useLocation();
  useEffect(() => {
    track('PageView');
  }, [location]);
  return null;
}

// Dynamic imports for pages
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
    
    // Defer non-critical third-party scripts even further
    const timer = setTimeout(() => {
      // Execute intensive scripts only when main thread is likely idle
      const idleCallback = (window as any).requestIdleCallback || ((cb: any) => setTimeout(cb, 1));
      idleCallback(() => {
        initPixel();
        
        // Init GTM
        const script = document.createElement('script');
        script.async = true;
        script.src = 'https://www.googletagmanager.com/gtag/js?id=G-57BY2PVKF4';
        document.head.appendChild(script);
        
        (window as any).dataLayer = (window as any).dataLayer || [];
        function gtag(..._args: any[]){(window as any).dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'G-57BY2PVKF4');
      });
    }, 5000);

    return () => clearTimeout(timer);
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
            <Route path="*" element={<Home />} />
          </Routes>
        </Suspense>
      </main>
      <WhatsAppFloat />
      <SocialProof />
    </div>
  );
}
