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
          className="flex items-center gap-2 text-stone-500 hover:text-emerald-600 transition-colors mb-8 group"
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          <span className="font-medium">Regresar</span>
        </button>
        <h1 className="text-4xl font-display font-black text-stone-900 mb-8">Política de Tratamiento de Datos Personales</h1>
        
        <div className="prose prose-stone lg:prose-lg max-w-none text-stone-600 leading-relaxed space-y-8">
          <section>
            <h2 className="text-2xl font-bold text-stone-900 mb-4">1. Identificación del Responsable</h2>
            <p>
              ZENHOGAR, con domicilio en Colombia, es el responsable del tratamiento de sus datos personales. Puede contactarnos a través del correo electrónico ventas@zenhogar.live o al WhatsApp +57 302 410 2568.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-stone-900 mb-4">2. Finalidad del Tratamiento</h2>
            <p>
              Los datos personales que recolectamos son utilizados para las siguientes finalidades:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Procesar y gestionar sus pedidos y compras.</li>
              <li>Realizar la entrega de los productos a través de nuestras transportadoras aliadas.</li>
              <li>Brindar soporte y atención al cliente.</li>
              <li>Enviar información promocional, ofertas y novedades sobre nuestros productos (previa autorización).</li>
              <li>Gestionar carritos abandonados para asistirle en la finalización de su compra.</li>
              <li>Cumplir con obligaciones legales y contables.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-stone-900 mb-4">3. Derechos de los Titulares</h2>
            <p>
              De acuerdo con la Ley 1581 de 2012, usted como titular de los datos personales tiene derecho a:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Conocer, actualizar y rectificar sus datos personales.</li>
              <li>Solicitar prueba de la autorización otorgada.</li>
              <li>Ser informado sobre el uso que se le ha dado a sus datos.</li>
              <li>Revocar la autorización y/o solicitar la supresión del dato cuando no se respeten los principios, derechos y garantías constitucionales y legales.</li>
              <li>Acceder en forma gratuita a sus datos personales que hayan sido objeto de tratamiento.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-stone-900 mb-4">4. Seguridad de la Información</h2>
            <p>
              En ZENHOGAR implementamos medidas técnicas, humanas y administrativas necesarias para otorgar seguridad a los registros evitando su adulteración, pérdida, consulta, uso o acceso no autorizado o fraudulento.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-stone-900 mb-4">5. Cambios en la Política</h2>
            <p>
              ZENHOGAR se reserva el derecho de modificar esta política en cualquier momento. Cualquier cambio sustancial será informado a través de nuestro sitio web.
            </p>
          </section>

          <p className="text-sm text-stone-400 pt-8">
            Última actualización: 15 de abril de 2026.
          </p>
        </div>

        <LegalFooter />
      </div>
    </div>
  );
}
