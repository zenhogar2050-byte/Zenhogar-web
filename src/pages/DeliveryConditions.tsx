import React from 'react';
import { Truck, Clock, MapPin, ShieldCheck, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import LegalFooter from '../components/LegalFooter';
import SEOManager from '../components/SEOManager';

export default function DeliveryConditions() {
  const navigate = useNavigate();

  return (
    <div className="bg-white min-h-screen py-20">
      <SEOManager 
        title="Condiciones de Entrega"
        description="Información sobre tiempos de entrega, cobertura y método de pago contra entrega en Colombia."
        canonicalUrl="/condiciones-entrega"
      />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-stone-500 hover:text-emerald-600 transition-all font-bold p-3 -ml-3 rounded-xl hover:bg-stone-50 mb-8 group"
        >
          <ArrowLeft className="w-6 h-6 group-hover:-translate-x-1 transition-transform" />
          <span className="text-lg">Regresar</span>
        </button>
        <h1 className="text-4xl font-display font-black text-stone-900 mb-8">Condiciones de Entrega</h1>
        
        <div className="grid sm:grid-cols-2 gap-8 mb-12">
          <div className="bg-stone-50 p-6 rounded-2xl border border-stone-100">
            <Truck className="w-8 h-8 text-emerald-600 mb-4" />
            <h3 className="font-bold text-lg mb-2">Envío Gratis</h3>
            <p className="text-stone-600 text-sm">Ofrecemos envío gratuito a nivel nacional en todos nuestros pedidos.</p>
          </div>
          <div className="bg-stone-50 p-6 rounded-2xl border border-stone-100">
            <Clock className="w-8 h-8 text-emerald-600 mb-4" />
            <h3 className="font-bold text-lg mb-2">Tiempos de Entrega</h3>
            <p className="text-stone-600 text-sm">Ciudades principales: 2-4 días hábiles. Resto del país: 3-7 días hábiles.</p>
          </div>
        </div>

        <div className="prose prose-stone lg:prose-lg max-w-none text-stone-600 leading-relaxed space-y-8">
          <section>
            <h2 className="text-2xl font-bold text-stone-900 mb-4">1. Cobertura Nacional y Valor del Envío</h2>
            <p>
              ZENHOGAR ofrece cobertura en el 98% del territorio nacional colombiano. Lo mejor de todo es que <strong>el envío es 100% gratuito</strong> para todos nuestros clientes, sin importar el monto de la compra o el destino (sujeto a cobertura de transportadora). Trabajamos con las mejores empresas de logística del país: Coordinadora, Servientrega, Envía e Interrapidísimo.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-stone-900 mb-4">2. Tiempos de Entrega</h2>
            <p>
              Nuestros tiempos de entrega estimados son:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Ciudades Principales (Bogotá, Medellín, Cali, Barranquilla):</strong> 2 a 3 días hábiles.</li>
              <li><strong>Ciudades Intermedias:</strong> 3 a 5 días hábiles.</li>
              <li><strong>Zonas Especiales o Trayectos Extendidos:</strong> 5 a 8 días hábiles.</li>
            </ul>
            <p className="text-sm italic">Nota: Los tiempos pueden variar por condiciones climáticas, orden público o novedades en la transportadora.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-stone-900 mb-4">3. Modelo de Pago Contraentrega</h2>
            <p>
              Para su tranquilidad, operamos bajo el modelo de <strong>pago contraentrega</strong>. Usted solo entrega el dinero en efectivo cuando el transportador llega a su domicilio con el paquete. Asegúrese de tener el valor exacto listo para agilizar la entrega. No se aceptan cheques ni transferencias al momento de la entrega física (la transferencia debe coordinarse previamente si se desea ese método).
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-stone-900 mb-4">4. Seguimiento y Novedades</h2>
            <p>
              Una vez su pedido es despachado, usted podrá consultar el estado del envío a través de nuestra línea de WhatsApp. Si hay alguna novedad (dirección errada, nadie en casa), realizaremos hasta 3 intentos de entrega antes de que el producto sea retornado a bodega.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-stone-900 mb-4">5. Recepción del Producto</h2>
            <p>
              Al recibir su pedido, verifique que el empaque esté sellado y no presente signos de manipulación. Si nota alguna irregularidad, déjelo registrado en la guía del transportador y contáctenos de inmediato para gestionar la novedad.
            </p>
          </section>
        </div>

        <LegalFooter />
      </div>
    </div>
  );
}
