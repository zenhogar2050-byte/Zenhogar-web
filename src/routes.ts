import Home from './pages/Home';
import ProductLanding from './pages/ProductLanding';
import ComboLanding from './pages/ComboLanding';
import Checkout from './pages/Checkout';
import CategoryPage from './pages/CategoryPage';
import AboutUs from './pages/AboutUs';
import PrivacyPolicy from './pages/PrivacyPolicy';
import DeliveryConditions from './pages/DeliveryConditions';
import ReturnsWarranty from './pages/ReturnsWarranty';
import Gracias from './pages/Gracias';

export const routes = [
  { path: '/', component: Home },
  { path: '/producto/:id', component: ProductLanding },
  { path: '/combo/:id', component: ComboLanding },
  { path: '/checkout', component: Checkout },
  { path: '/categoria/:id', component: CategoryPage },
  { path: '/quienes-somos', component: AboutUs },
  { path: '/politica-privacidad', component: PrivacyPolicy },
  { path: '/condiciones-entrega', component: DeliveryConditions },
  { path: '/devoluciones-garantia', component: ReturnsWarranty },
  { path: '/gracias', component: Gracias },
];
