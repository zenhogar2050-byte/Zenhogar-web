import React from 'react';
import { RefreshCcw, ShieldCheck, AlertCircle, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import LegalFooter from '../components/LegalFooter';

export default function ReturnsWarranty() {
  const navigate = useNavigate();

  return (
    <div className="bg-white min-h-screen py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-stone-500 hover:text-emerald-600 transition-colors mb-8 group"
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          <span className="font-medium">Regresar</span>
        </button>
        <h1 className="text-4xl font-display font-black text-stone-900 mb-8">Devoluciones y Garantía</h1>
        
        <div className="bg-emerald-50 border border-emerald-100 p-8 rounded-[2rem] mb-12 flex items-start gap-6">
          <div className="w-12 h-12 bg-emerald-600 rounded-xl flex items-center justify-center shrink-0">
            <ShieldCheck className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-stone-900 mb-2">Compromiso ZENHOGAR</h3>
            <p className="text-stone-600">
              Su satisfacción es nuestra prioridad. Todos nuestros productos cuentan con garantía de originalidad y calidad.
            </p>
          </div>
        </div>

        <div className="prose prose-stone lg:prose-lg max-w-none text-stone-600 leading-relaxed space-y-8">
          <section>
            <h2 className="text-2xl font-bold text-stone-900 mb-4">1. Garantía de Calidad</h2>
            <p>
              ZENHOGAR garantiza que todos los productos son originales, cuentan con registro INVIMA vigente y han sido almacenados bajo condiciones óptimas. La garantía cubre defectos de fabricación o daños ocurridos durante el transporte.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-stone-900 mb-4">2. Plazo para Reclamaciones</h2>
            <p>
              Usted dispone de <strong>48 horas</strong> después de recibido el producto para reportar cualquier novedad relacionada con daños físicos, producto equivocado o faltantes en su pedido.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-stone-900 mb-4">3. Proceso de Devolución</h2>
            <p>
              Para iniciar un proceso de devolución o garantía, debe seguir estos pasos:
            </p>
            <ol className="list-decimal pl-6 space-y-2">
              <li>Contactarnos vía WhatsApp al +57 302 410 2568.</li>
              <li>Enviar fotos o videos del estado del producto y la guía de envío.</li>
              <li>Describir brevemente el motivo de la reclamación.</li>
            </ol>
            <p className="mt-4">
              Nuestro equipo evaluará el caso y le dará respuesta en un plazo máximo de 24 horas hábiles.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-stone-900 mb-4">4. Condiciones para el Cambio</h2>
            <p>
              Para que un cambio o devolución sea efectivo (por motivos diferentes a calidad), el producto debe estar:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>En su empaque original y con sus sellos de seguridad intactos.</li>
              <li>Sin señales de uso o manipulación.</li>
              <li>En perfecto estado de conservación.</li>
            </ul>
          </section>

          <div className="bg-stone-50 p-6 rounded-2xl border border-stone-100 mt-12">
            <div className="flex items-center gap-3 text-stone-900 font-bold mb-2">
              <AlertCircle className="w-5 h-5 text-blue-600" />
              <span>Nota Importante</span>
            </div>
            <p className="text-sm text-stone-500">
              Por tratarse de productos de consumo y salud, no se aceptan devoluciones de productos cuyos sellos de seguridad hayan sido removidos o alterados, por razones de higiene y seguridad sanitaria.
            </p>
          </div>
        </div>

        <LegalFooter />
      </div>
    </div>
  );
}
