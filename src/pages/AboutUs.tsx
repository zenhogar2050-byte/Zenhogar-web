import React from 'react';
import { ShieldCheck, Heart, Truck, Award, ArrowLeft } from 'lucide-react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import LegalFooter from '../components/LegalFooter';

export default function AboutUs() {
  const navigate = useNavigate();

  return (
    <div className="bg-white min-h-screen py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-stone-500 hover:text-emerald-600 transition-colors mb-8 group"
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          <span className="font-medium">Regresar</span>
        </button>

        <h1 className="text-4xl font-display font-black text-stone-900 mb-12">Quiénes Somos</h1>

        {/* Content Section */}
        <div className="mb-24">
          <div className="max-w-3xl">
            <h2 className="text-3xl font-display font-bold text-stone-900 mb-6">Nuestra Historia</h2>
            <div className="space-y-4 text-stone-600 leading-relaxed text-lg">
              <p>
                ZENHOGAR nació de la convicción de que la naturaleza ofrece las mejores soluciones para nuestra salud. Lo que comenzó como un pequeño proyecto familiar se ha convertido en una marca de confianza para miles de colombianos que buscan una alternativa natural y efectiva.
              </p>
              <p>
                Nos especializamos en la selección y distribución de suplementos naturales de la más alta calidad, asegurándonos de que cada producto que llega a tu hogar cumpla con los estándares más exigentes y cuente con los registros sanitarios necesarios.
              </p>
              <p className="font-bold text-stone-900">
                Estamos ubicados en Barranquilla, Colombia, desde donde despachamos bienestar a todo el país.
              </p>
            </div>
          </div>
        </div>

        {/* Values */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-24">
          {[
            {
              icon: Heart,
              title: "Pasión por la Salud",
              desc: "Creemos firmemente en el bienestar integral como base de una vida plena."
            },
            {
              icon: ShieldCheck,
              title: "Calidad Garantizada",
              desc: "Todos nuestros productos cuentan con registro INVIMA y certificaciones de calidad."
            },
            {
              icon: Truck,
              title: "Compromiso de Entrega",
              desc: "Llegamos a todo el país con rapidez y seguridad en cada pedido."
            },
            {
              icon: Award,
              title: "Confianza",
              desc: "Miles de clientes satisfechos respaldan nuestra trayectoria y servicio."
            }
          ].map((value, idx) => (
            <div key={idx} className="bg-stone-50 p-8 rounded-[2rem] border border-stone-100 hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center mb-6">
                <value.icon className="w-6 h-6 text-emerald-600" />
              </div>
              <h3 className="text-xl font-bold text-stone-900 mb-3">{value.title}</h3>
              <p className="text-stone-600 leading-relaxed">{value.desc}</p>
            </div>
          ))}
        </div>

        {/* Mission/Vision */}
        <div className="grid md:grid-cols-2 gap-12 mb-24">
          <div className="bg-stone-50 p-12 rounded-[3rem] shadow-sm border border-stone-100">
            <h3 className="text-2xl font-display font-bold text-stone-900 mb-6">Nuestra Misión</h3>
            <p className="text-stone-600 text-lg leading-relaxed">
              Proveer soluciones naturales de salud que mejoren la calidad de vida de las familias colombianas, fomentando hábitos saludables y ofreciendo productos de alta eficacia y seguridad.
            </p>
          </div>
          <div className="bg-stone-50 p-12 rounded-[3rem] shadow-sm border border-stone-100">
            <h3 className="text-2xl font-display font-bold text-stone-900 mb-6">Nuestra Visión</h3>
            <p className="text-stone-600 text-lg leading-relaxed">
              Ser la marca líder en bienestar natural en Colombia, reconocida por nuestra integridad, la calidad superior de nuestros productos y nuestro compromiso inquebrantable con la salud de nuestros clientes.
            </p>
          </div>
        </div>

        <LegalFooter />
      </div>
    </div>
  );
}
