import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-stone-900 text-white py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-12 lg:gap-16 mb-16 items-start">
          {/* Brand Section */}
          <div className="space-y-6">
            <Link to="/" className="flex items-center gap-3 group">
              <div className="w-12 h-12 md:w-16 md:h-16 flex-shrink-0">
                <img 
                  src="/assets/logo/logo-icon.webp" 
                  alt="Zen Hogar Icon" 
                  className="w-full h-full object-contain"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                  width="64"
                  height="64"
                />
              </div>
              <div className="flex flex-col leading-none">
                <span className="text-2xl font-black text-white tracking-tighter uppercase">Zen Hogar</span>
                <span className="text-[10px] font-bold text-emerald-400 tracking-[0.2em] uppercase">Salud Vital</span>
              </div>
            </Link>
            <p className="text-stone-300 max-w-sm leading-relaxed text-lg">
              Dedicados a llevar el bienestar natural a cada hogar colombiano. Calidad, confianza y salud en cada producto.
            </p>
          </div>

          {/* Quick Links Section */}
          <div>
            <h2 className="text-xl font-bold mb-8 text-white uppercase tracking-wider text-sm">Nosotros</h2>
            <ul className="space-y-4 text-stone-200">
              <li>
                <Link to="/quienes-somos" className="hover:text-emerald-400 transition-colors">Quiénes Somos</Link>
              </li>
              <li>
                <Link to="/politica-privacidad" className="hover:text-emerald-400 transition-colors">Política de Privacidad</Link>
              </li>
              <li>
                <Link to="/condiciones-entrega" className="hover:text-emerald-400 transition-colors">Condiciones de Entrega</Link>
              </li>
              <li>
                <Link to="/devoluciones-garantia" className="hover:text-emerald-400 transition-colors">Devoluciones y Garantía</Link>
              </li>
            </ul>
          </div>

          {/* Contact Section */}
          <div>
            <h2 className="text-xl font-bold mb-8 text-white uppercase tracking-wider text-sm">Contacto</h2>
            <ul className="space-y-6 text-stone-200">
              <li className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5 text-emerald-400" />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-stone-300 uppercase tracking-widest mb-1">WhatsApp</p>
                  <a 
                    href="https://wa.me/573024102568" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-white hover:text-emerald-400 transition-colors text-lg font-medium"
                  >
                    +57 302 410 2568
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5 text-emerald-400" />
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] font-bold text-stone-300 uppercase tracking-widest mb-1">Correos</p>
                  <a href="mailto:ventas@zenhogar.live" className="text-white hover:text-emerald-400 transition-colors block font-medium">ventas@zenhogar.live</a>
                </div>
              </li>
            </ul>
          </div>

          {/* Image Section */}
          <div className="flex flex-col items-center md:items-end">
            <div className="bg-white/5 p-4 rounded-[2rem] border border-white/10 backdrop-blur-sm max-w-full">
              <img 
                src="/assets/logo/logo-invima.webp" 
                alt="Logo INVIMA" 
                className="w-full h-auto max-w-[256px] rounded-2xl shadow-2xl"
                referrerPolicy="no-referrer"
                loading="lazy"
                width="256"
                height="128"
              />
            </div>
            <p className="mt-4 text-stone-300 text-xs italic text-center md:text-right">Información legal y certificaciones</p>
          </div>
        </div>

        <div className="pt-12 border-t border-stone-800 flex flex-col md:flex-row justify-between items-center gap-6 text-stone-100 text-sm">
          <p>© 2026 zenhogar. Todos los derechos reservados.</p>
          <div className="flex gap-8">
            <Link to="/" className="hover:text-white transition-colors">Inicio</Link>
            <Link to="/checkout" className="hover:text-white transition-colors">Carrito</Link>
          </div>
        </div>

        {/* Local SEO Cities Section */}
        <div className="mt-8 pt-8 border-t border-stone-800/50 text-center">
          <p className="text-[11px] font-bold text-stone-100 uppercase tracking-widest mb-3">Envíos con Pago Contra Entrega en Colombia:</p>
          <p className="text-[11px] text-stone-300 leading-relaxed max-w-5xl mx-auto">
            Despachos diarios desde Barranquilla a: Bogotá, Medellín, Cali, Barranquilla, Cartagena, Cúcuta, Bucaramanga, Pereira, Ibagué, Santa Marta, Valledupar, Villavicencio, Montería, Pasto, Neiva, Popayán, Sincelejo, Armenia, Riohacha, Tunja, Quibdó, Florencia y cualquier rincón de Colombia.
          </p>
        </div>

        {/* YMYL Medical Disclaimer */}
        <div className="mt-8 pt-8 border-t border-stone-800/50">
          <p className="text-[10px] text-stone-300 leading-relaxed text-center max-w-4xl mx-auto italic">
            Aviso Legal: Los productos ofrecidos por ZENHOGAR son suplementos dietarios y no pretenden diagnosticar, tratar, curar o prevenir ninguna enfermedad. La información proporcionada en este sitio web tiene fines informativos y no sustituye el consejo médico profesional. Siempre consulte con su médico antes de comenzar cualquier régimen de suplementación. Los resultados pueden variar de persona a persona. Todos nuestros productos cuentan con registro INVIMA vigente.
          </p>
        </div>
      </div>
    </footer>
  );
}
