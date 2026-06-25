import React from 'react';
import { motion } from 'motion/react';
import { FileText, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import LegalFooter from '../components/LegalFooter';
import SEOManager from '../components/SEOManager';

const TermsOfService = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-white min-h-screen py-20">
      <SEOManager 
        title="Términos del Servicio"
        description="Conoce los Términos y Condiciones de Uso de la plataforma ZENHOGAR en Colombia."
        canonicalUrl="/terminos-servicio"
      />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-stone-500 hover:text-emerald-600 transition-all font-bold p-3 -ml-3 rounded-xl hover:bg-stone-50 mb-8 group"
        >
          <ArrowLeft className="w-6 h-6 group-hover:-translate-x-1 transition-transform" />
          <span className="text-lg">Regresar</span>
        </button>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-8"
        >
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-12 bg-emerald-100 rounded-2xl flex items-center justify-center text-emerald-700">
              <FileText className="w-8 h-8" />
            </div>
            <h1 className="text-3xl md:text-4xl font-display font-black text-stone-900">Términos del Servicio</h1>
          </div>

          <div className="prose prose-stone lg:prose-lg max-w-none text-stone-600 space-y-8 leading-relaxed">
            <section>
              <h2 className="text-2xl font-bold text-stone-900 mb-4">1. Aceptación de los Términos</h2>
              <p>
                Al acceder y utilizar el sitio web de ZENHOGAR, usted declara que es mayor de edad y que acepta estar sujeto a estos Términos y Condiciones, así como a todas las leyes aplicables en el territorio colombiano. Si no está de acuerdo con alguna parte de estos términos, le recomendamos abstenerse de utilizar nuestro servicio.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-stone-900 mb-4">2. Descripción del Servicio</h2>
              <p>
                ZENHOGAR es una plataforma de comercio electrónico dedicada a la venta de productos naturales, suplementos dietarios y artículos de bienestar personal. Nos esforzamos por proporcionar descripciones precisas; sin embargo, no garantizamos que toda la información visual o textual esté libre de errores tipográficos.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-stone-900 mb-4">3. Precios y Exactitud del Inventario</h2>
              <p>
                Todos los precios están expresados en <strong>Pesos Colombianos (COP)</strong>. Nos reservamos el derecho de modificar los precios sin previo aviso. La disponibilidad de los productos puede cambiar; en caso de que un producto pedido no esté disponible, se le notificará vía WhatsApp para ofrecerle una alternativa o proceder con la cancelación del pedido.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-stone-900 mb-4">4. Pago Contraentrega</h2>
              <p>
                Para garantizar la seguridad y transparencia en la transacción, ZENHOGAR utiliza exclusivamente el modelo de <strong>Pago Contraentrega</strong>. Esto implica que el cliente debe entregar el valor exacto del pedido en efectivo al personal de la transportadora al momento de recibir el paquete. El no pago al momento de la entrega resultará en la devolución del producto a nuestras instalaciones.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-stone-900 mb-4">5. Veracidad de la Información</h2>
              <p>
                El usuario se compromete a proporcionar información de contacto y dirección de envío veraz y completa. ZENHOGAR no se hace responsable por retrasos o imposibilidad de entrega derivados de direcciones incorrectas o números de teléfono inactivos.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-stone-900 mb-4">6. Limitación de Responsabilidad</h2>
              <p>
                ZENHOGAR no será responsable por daños indirectos, incidentales o consecuentes que resulten del uso o la imposibilidad de uso del sitio web o de los productos adquiridos, más allá del valor pagado por el cliente por dicho producto.
              </p>
            </section>
          </div>
        </motion.div>

        <LegalFooter />
      </div>
    </div>
  );
};

export default TermsOfService;
