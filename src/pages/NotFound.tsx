import { useNavigate } from 'react-router-dom';
import { Home, ArrowLeft } from 'lucide-react';
import Footer from '../components/Footer';

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 py-24 sm:px-6 lg:px-8 flex flex-col items-center justify-center text-center">
        <div className="w-24 h-24 bg-emerald-50 rounded-full flex items-center justify-center mb-8">
          <Home className="w-12 h-12 text-emerald-600" />
        </div>
        <h1 className="text-6xl font-black text-stone-900 mb-4 font-display">404</h1>
        <h2 className="text-2xl font-bold text-stone-800 mb-6">Página no encontrada</h2>
        <p className="text-stone-500 max-w-md mb-12 text-lg leading-relaxed">
          Lo sentimos, el producto o sección que buscas no está disponible actualmente. Puedes volver a nuestra tienda principal para encontrar lo que necesitas.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <button
            onClick={() => navigate('/')}
            className="px-8 py-4 bg-emerald-600 text-white rounded-2xl font-bold text-lg hover:bg-emerald-700 transition-all shadow-lg flex items-center justify-center gap-2"
          >
            Ir a la Inicio
          </button>
          <button
            onClick={() => navigate(-1)}
            className="px-8 py-4 bg-stone-100 text-stone-700 rounded-2xl font-bold text-lg hover:bg-stone-200 transition-all flex items-center justify-center gap-2"
          >
            <ArrowLeft className="w-5 h-5" />
            Volver atrás
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
}
