import React from 'react';
import { motion } from 'motion/react';
import { ShieldCheck, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const RefundPolicy = () => {
  return (
    <div className="min-h-screen bg-stone-50 pt-32 pb-20 px-4">
      <div className="max-w-4xl mx-auto">
        <Link to="/" className="inline-flex items-center gap-2 text-stone-500 hover:text-emerald-700 transition-colors mb-8 font-bold">
          <ArrowLeft className="w-5 h-5" />
          Volver al Inicio
        </Link>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-stone-200"
        >
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-12 bg-emerald-100 rounded-2xl flex items-center justify-center text-emerald-700">
              <ShieldCheck className="w-8 h-8" />
            </div>
            <h1 className="text-3xl md:text-4xl font-black text-stone-900">Política de Reembolso</h1>
          </div>

          <div className="prose prose-stone max-w-none text-stone-600 space-y-6">
            <section>
              <h2 className="text-xl font-bold text-stone-900 border-b border-stone-100 pb-2">1. Productos Dañados o Defectuosos</h2>
              <p>
                Si recibes un producto en mal estado, con abolladuras, goteos o cualquier anomalía física, debes reportarlo dentro de las primeras <strong>24 horas</strong> tras la entrega. ZENHOGAR realizará el reemplazo del producto sin costo adicional para ti.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-stone-900 border-b border-stone-100 pb-2">2. Derecho de Retracto (Ley 1480)</h2>
              <p>
                De acuerdo con el Estatuto del Consumidor, tienes derecho a retractarte de tu compra dentro de los primeros <strong>5 días hábiles</strong> posteriores a la recepción del pedido, siempre que se cumplan las siguientes condiciones:
              </p>
              <ul className="list-disc pl-6 space-y-1">
                <li>El producto <strong>no debe haber sido abierto</strong>.</li>
                <li>No debe presentar señales de uso o alteración.</li>
                <li>Debe encontrarse en perfecto estado y en su empaque original.</li>
              </ul>
              <p>En este caso, el cliente deberá asumir los costos de transporte para la devolución del producto a nuestras instalaciones.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-stone-900 border-b border-stone-100 pb-2">3. Reembolsos</h2>
              <p>
                Una vez el producto retornado sea recibido y verifiquemos que cumple con las condiciones mencionadas, procesaremos tu reembolso. Dado nuestro modelo de <strong>pago contraentrega</strong>, la devolución del dinero se realizará mediante transferencia bancaria en un plazo máximo de <strong>10 días hábiles</strong>.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-stone-900 border-b border-stone-100 pb-2">4. Excepciones por Salud e Higiene</h2>
              <p>
                Por motivos de bioseguridad, salud e higiene, los productos naturales o cosméticos que hayan sido <strong>abiertos o utilizados</strong> no son aptos para devolución ni reembolso, a menos que se trate de una falla de calidad reportada en el tiempo estipulado.
              </p>
            </section>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default RefundPolicy;
