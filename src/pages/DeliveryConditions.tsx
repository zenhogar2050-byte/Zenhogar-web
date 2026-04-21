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
          className="flex items-center gap-2 text-stone-500 hover:text-emerald-600 transition-colors mb-8 group"
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          <span className="font-medium">Regresar</span>
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
            <h2 className="text-2xl font-bold text-stone-900 mb-4">1. Cobertura</h2>
            <p>
              ZENHOGAR realiza entregas en todo el territorio colombiano a través de nuestras transportadoras aliadas (Servientrega, Envía, Interrapidísimo, Coordinadora). Si su ubicación es de difícil acceso, nos pondremos en contacto para coordinar la mejor opción de entrega.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-stone-900 mb-4">2. Proceso de Envío</h2>
            <p>
              Una vez confirmado su pedido, el proceso de despacho se realiza en un plazo máximo de 24 horas hábiles. Recibirá una confirmación vía WhatsApp con la información de su pedido.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-stone-900 mb-4">3. Pago Contra Entrega</h2>
            <p>
              Para su mayor seguridad y confianza, ofrecemos el servicio de <strong>Pago Contra Entrega</strong> en la mayoría de municipios del país. Usted paga el valor del producto en efectivo al momento de recibirlo en su puerta.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-stone-900 mb-4">4. Seguimiento del Pedido</h2>
            <p>
              Puede solicitar el estado de su envío a través de nuestra línea de atención al cliente en WhatsApp +57 302 410 2568, proporcionando su nombre y ciudad.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-stone-900 mb-4">5. Novedades en la Entrega</h2>
            <p>
              Si al momento de la entrega no se encuentra nadie en el domicilio, la transportadora realizará hasta dos intentos adicionales. Es importante que los datos de contacto y dirección sean precisos para evitar retrasos.
            </p>
          </section>
        </div>

        <LegalFooter />
      </div>
    </div>
  );
}
