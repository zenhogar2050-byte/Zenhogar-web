import React from 'react';
import { motion } from 'motion/react';
import { ShieldCheck, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import LegalFooter from '../components/LegalFooter';
import SEOManager from '../components/SEOManager';

const RefundPolicy = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-white min-h-screen py-20">
      <SEOManager 
        title="Política de Reembolso"
        description="Conoce nuestra política de reembolsos y derecho de retracto de ZENHOGAR en Colombia."
        canonicalUrl="/politica-reembolso"
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
              <ShieldCheck className="w-8 h-8" />
            </div>
            <h1 className="text-3xl md:text-4xl font-display font-black text-stone-900">Política de Reembolso</h1>
          </div>

          <div className="prose prose-stone lg:prose-lg max-w-none text-stone-600 space-y-8">
            <section>
              <h2 className="text-2xl font-bold text-stone-900 mb-4">1. Productos Dañados o Defectuosos</h2>
              <p>
                Si recibes un producto en mal estado, con abolladuras, goteos o cualquier anomalía física, debes reportarlo dentro de las primeras <strong>24 horas</strong> tras la entrega. ZENHOGAR realizará el reemplazo del producto sin costo adicional para ti.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-stone-900 mb-4">2. Derecho de Retracto</h2>
              <p>
                De acuerdo con la naturaleza de nuestro modelo de pago contraentrega y entrega presencial, el derecho de retracto solo se puede ejercer <strong>antes de que el pedido sea entregado o reclamado</strong>. Al momento de la entrega, el comprador revisa, inspecciona y valida el producto; al dar su aprobación y recibirlo a satisfacción, se realiza el pago respectivo. Por lo tanto, no aplican retractos posteriores a la recepción y validación en la entrega.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-stone-900 mb-4">3. Reembolsos</h2>
              <p>
                Una vez el producto retornado sea recibido y verifiquemos que cumple con las condiciones mencionadas, procesaremos tu reembolso. Dado nuestro modelo de <strong>pago contraentrega</strong>, la devolución del dinero se realizará mediante transferencia bancaria en un plazo máximo de <strong>10 días hábiles</strong>.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-stone-900 mb-4">4. Excepciones por Salud e Higiene</h2>
              <p>
                Por motivos de bioseguridad, salud e higiene, los productos naturales o cosméticos que hayan sido <strong>abiertos o utilizados</strong> no son aptos para devolución ni reembolso, a menos que se trate de una falla de calidad reportada en el tiempo estipulado.
              </p>
            </section>
          </div>
        </motion.div>

        <LegalFooter />
      </div>
    </div>
  );
};

export default RefundPolicy;
