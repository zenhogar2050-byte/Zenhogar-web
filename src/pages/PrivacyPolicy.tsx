import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import LegalFooter from '../components/LegalFooter';
import SEOManager from '../components/SEOManager';

export default function PrivacyPolicy() {
  const navigate = useNavigate();

  return (
    <div className="bg-white min-h-screen py-20">
      <SEOManager 
        title="Política de Privacidad"
        description="Política de tratamiento de datos personales de ZENHOGAR. Tu privacidad es nuestra prioridad."
        canonicalUrl="/politica-privacidad"
      />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-stone-500 hover:text-emerald-600 transition-all font-bold p-3 -ml-3 rounded-xl hover:bg-stone-50 mb-8 group"
        >
          <ArrowLeft className="w-6 h-6 group-hover:-translate-x-1 transition-transform" />
          <span className="text-lg">Regresar</span>
        </button>
        <h1 className="text-4xl font-display font-black text-stone-900 mb-8">Política de Tratamiento de Datos Personales</h1>
        
        <div className="prose prose-stone lg:prose-lg max-w-none text-stone-600 leading-relaxed space-y-8">
          <section>
            <h2 className="text-2xl font-bold text-stone-900 mb-4">1. Recolección de Información</h2>
            <p>
              En ZENHOGAR, recolectamos información personal necesaria para la prestación de nuestros servicios de comercio electrónico. Los datos recolectados incluyen, pero no se limitan a: nombre completo, número de teléfono (WhatsApp), dirección de envío, ciudad, departamento y correo electrónico (opcional). Esta información es recolectada directamente de usted cuando realiza un pedido en nuestro sitio web.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-stone-900 mb-4">2. Finalidad del Tratamiento de Datos</h2>
            <p>
              El tratamiento de sus datos personales tiene como finalidades principales:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Gestión de Pedidos:</strong> Procesar, validar y despachar sus solicitudes de compra.</li>
              <li><strong>Logística de Entrega:</strong> Compartir la información mínima necesaria con nuestras transportadoras aliadas (Coordinadora, Servientrega, Envia, Interrapadisimo) para la entrega efectiva de sus productos.</li>
              <li><strong>Comunicación:</strong> Contactarle vía WhatsApp o llamada telefónica para confirmar datos de envío o resolver dudas sobre su pedido.</li>
              <li><strong>Atención al Cliente:</strong> Brindar soporte post-venta y gestionar garantías o devoluciones.</li>
              <li><strong>Marketing:</strong> Enviar promociones y novedades si usted ha otorgado su consentimiento explícito.</li>
              <li><strong>Seguridad:</strong> Prevenir fraudes y garantizar la integridad de las transacciones.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-stone-900 mb-4">3. Derechos de los Usuarios</h2>
            <p>
              Bajo la Ley 1581 de 2012 y el Decreto 1377 de 2013, usted tiene derecho a conocer, actualizar, rectificar y suprimir sus datos personales de nuestras bases de datos en cualquier momento. Para ejercer estos derechos, puede escribirnos a ventas@zenhogar.live indicando su requerimiento.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-stone-900 mb-4">4. Almacenamiento y Seguridad</h2>
            <p>
              Sus datos se almacenan en servidores seguros con protocolos de encriptación. ZENHOGAR no vende ni alquila su información personal a terceros. Solo compartimos datos con proveedores de servicios necesarios para cumplir con su pedido (logística y hosting).
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-stone-900 mb-4">5. Cookies y Tecnologías de Rastreo</h2>
            <p>
              Utilizamos cookies para mejorar su experiencia de navegación, recordar sus preferencias y analizar el tráfico del sitio para optimizar nuestra oferta comercial. Puede configurar su navegador para rechazar cookies, aunque esto podría afectar la funcionalidad de algunas secciones del sitio.
            </p>
          </section>

          <p className="text-sm text-stone-400 pt-8 italic leading-relaxed">
            Esta política de privacidad se rige por las leyes de la República de Colombia. Al utilizar este sitio, usted acepta los términos aquí descritos.
          </p>
        </div>

        <LegalFooter />
      </div>
    </div>
  );
}
