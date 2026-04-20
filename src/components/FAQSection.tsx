import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { cn } from '../utils';

interface FAQItem {
  q: string;
  a: string;
}

interface FAQSectionProps {
  specificFaqs?: FAQItem[];
  generalFaqs?: FAQItem[];
  title?: string;
  className?: string;
}

export default function FAQSection({ 
  specificFaqs = [], 
  generalFaqs = [], 
  title = "Preguntas Frecuentes",
  className 
}: FAQSectionProps) {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  
  // Combina las FAQs específicas del producto con las generales
  const allFaqs = [...specificFaqs, ...generalFaqs];

  if (allFaqs.length === 0) return null;

  return (
    <div className={cn("mt-6 space-y-3", className)}>
      <h3 className="text-lg font-bold text-stone-900 mb-4 px-2">{title}</h3>
      <div className="space-y-3">
        {allFaqs.map((faq, i) => (
          <div key={i} className="border border-stone-200 rounded-2xl overflow-hidden bg-white shadow-sm transition-all hover:border-emerald-200">
            <button 
              onClick={() => setOpenFaq(openFaq === i ? null : i)}
              className="w-full flex items-center justify-between p-4 text-left hover:bg-stone-50 transition-colors group"
            >
              <span className="text-sm font-bold text-stone-900 group-hover:text-emerald-700 transition-colors">{faq.q}</span>
              <div className={cn(
                "w-8 h-8 rounded-full flex items-center justify-center transition-all",
                openFaq === i ? "bg-emerald-50 text-emerald-600 rotate-180" : "bg-stone-50 text-stone-400"
              )}>
                <ChevronDown className="w-4 h-4" />
              </div>
            </button>
            <AnimatePresence>
              {openFaq === i && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden"
                >
                  <div className="p-4 pt-0 text-[13px] text-stone-600 leading-relaxed">
                    <div className="pt-2 border-t border-stone-50">
                      {faq.a}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </div>
  );
}
