import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-stone-900 text-white py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-12 lg:gap-24 mb-16 items-start">
          {/* Brand Section */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <img 
                src="https://zenhogar.live/assets/logo/logo.png" 
                alt="zenhogar Logo" 
                className="h-14 w-auto object-contain"
                referrerPolicy="no-referrer"
              />
              <span className="text-3xl font-bold tracking-tight">zenhogar</span>
            </div>
            <p className="text-stone-400 max-w-sm leading-relaxed text-lg">
              Dedicados a llevar el bienestar natural a cada hogar colombiano. Calidad, confianza y salud en cada producto.
            </p>
          </div>

          {/* Contact Section */}
          <div>
            <h4 className="text-xl font-bold mb-8 text-white">Información de Contacto</h4>
            <ul className="space-y-6 text-stone-400">
              <li className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5 text-emerald-600" />
                </div>
                <div>
                  <p className="text-xs font-bold text-stone-500 uppercase tracking-widest mb-1">WhatsApp</p>
                  <a 
                    href="https://wa.me/573024102568" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-white hover:text-emerald-600 transition-colors text-lg font-medium"
                  >
                    +57 302 410 2568
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5 text-emerald-600" />
                </div>
                <div className="space-y-1">
                  <p className="text-xs font-bold text-stone-500 uppercase tracking-widest mb-1">Correos Electrónicos</p>
                  <a href="mailto:ventas@zenhogar.live" className="text-white hover:text-emerald-600 transition-colors block font-medium">ventas@zenhogar.live</a>
                  <a href="mailto:soporte@zenhogar.live" className="text-white hover:text-emerald-600 transition-colors block font-medium">soporte@zenhogar.live</a>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5 text-emerald-600" />
                </div>
                <div>
                  <p className="text-xs font-bold text-stone-500 uppercase tracking-widest mb-1">Redes Sociales</p>
                  <div className="flex gap-4 mt-2">
                    <a 
                      href="https://www.facebook.com/HomeIdeas0812" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-white hover:text-emerald-600 transition-colors font-medium"
                      aria-label="Visitar nuestro Facebook"
                    >
                      Facebook
                    </a>
                    <a 
                      href="https://www.instagram.com/zenhogar" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-white hover:text-emerald-600 transition-colors font-medium"
                      aria-label="Visitar nuestro Instagram"
                    >
                      Instagram
                    </a>
                  </div>
                </div>
              </li>
            </ul>
          </div>

          {/* Image Section */}
          <div className="flex flex-col items-center md:items-end">
            <div className="bg-white/5 p-4 rounded-[2rem] border border-white/10 backdrop-blur-sm max-w-full">
              <img 
                src="https://zenhogar.live/assets/logo/logo-invima.webp" 
                alt="Logo INVIMA" 
                className="w-full h-auto max-w-[256px] rounded-2xl shadow-2xl"
                referrerPolicy="no-referrer"
              />
            </div>
            <p className="mt-4 text-stone-500 text-xs italic text-center md:text-right">Información legal y certificaciones</p>
          </div>
        </div>

        <div className="pt-12 border-t border-stone-800 flex flex-col md:flex-row justify-between items-center gap-6 text-stone-500 text-sm">
          <p>© 2026 zenhogar. Todos los derechos reservados.</p>
          <div className="flex gap-8">
            <Link to="/" className="hover:text-white transition-colors">Inicio</Link>
            <Link to="/checkout" className="hover:text-white transition-colors">Carrito</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
