import { useNavigate } from 'react-router-dom';
import { Home, ArrowLeft } from 'lucide-react';
import Footer from '../components/Footer';

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-[60vh] md:min-h-[70vh] bg-stone-50/50 flex flex-col justify-center overflow-hidden">
      {/* Decorative radial gradients for premium feel */}
      <div className="absolute inset-0 -z-10 opacity-20 pointer-events-none" style={{
        backgroundImage: 'radial-gradient(circle at 10% 10%, #d1fae5 0%, transparent 45%), radial-gradient(circle at 90% 90%, #f5f5f4 0%, transparent 45%)'
      }} />

      <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8 flex flex-col items-center justify-center text-center relative z-10 my-auto">
        <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center mb-6 shadow-sm border border-emerald-100/50">
          <Home className="w-10 h-10 text-emerald-800" />
        </div>
        <h1 className="text-6xl sm:text-7xl font-black text-stone-900 mb-2 font-display tracking-tight">404</h1>
        <h2 className="text-2xl font-extrabold text-stone-800 mb-4 font-display">Página no encontrada</h2>
        <p className="text-stone-500 max-w-md mb-8 text-base sm:text-lg leading-relaxed font-sans">
          Lo sentimos, el producto o sección que buscas no está disponible actualmente. Puedes volver a nuestra tienda principal para encontrar lo que necesitas.
        </p>
        <div className="flex flex-col sm:flex-row gap-3.5 w-full sm:w-auto px-4">
          <button
            onClick={() => navigate('/')}
            className="w-full sm:w-auto px-8 py-3.5 bg-stone-900 text-white rounded-2xl font-black text-sm hover:bg-emerald-800 transition-all shadow-md active:scale-95 flex items-center justify-center gap-2 uppercase tracking-wide cursor-pointer"
          >
            Volver al Inicio
          </button>
          <button
            onClick={() => navigate(-1)}
            className="w-full sm:w-auto px-8 py-3.5 bg-white text-stone-700 border border-stone-200 rounded-2xl font-bold text-sm hover:bg-stone-50 transition-all active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            Atrás
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
}
