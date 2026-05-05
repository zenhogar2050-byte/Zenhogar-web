export interface Product {
  id: string;
  name: string;
  description: string;
  shortDescription: string;
  benefits: string[];
  image: string;
  basePrice: number;
  size?: string;
  category: string;
  promos: {
    id: string;
    label: string;
    units: number;
    price: number;
    badge?: string;
  }[];
  testimonials: {
    name: string;
    text: string;
    rating: number;
  }[];
  whyChoose?: {
    title: string;
    description: string;
  };
  seoTitle?: string;
  seoDescription?: string;
  keywords?: string;
  components?: string;
  seoFaqs?: { q: string; a: string }[];
  longTailKeywords?: string[];
  invima?: string;
}

export const CATEGORIES = [
  { 
    id: 'salud-bienestar', 
    name: 'Salud y Bienestar', 
    icon: 'Sparkles',
    image: '/assets/categories/salud-bienestar.webp',
    color: 'emerald',
    description: 'Encuentra el equilibrio perfecto para tu cuerpo con nuestra selección de suplementos naturales y vitaminas de alta calidad.',
    seoTitle: 'Salud y Bienestar: Suplementos Naturales para tu Equilibrio',
    seoDescription: 'Descubre nuestra selección de suplementos naturales para mejorar tu salud y bienestar. Productos originales con registro INVIMA. Envío gratis en Colombia.'
  },
  { 
    id: 'belleza-integral', 
    name: 'Belleza Integral', 
    icon: 'Heart',
    image: '/assets/categories/belleza-integral.webp',
    color: 'rose',
    description: 'Potencia tu belleza desde el interior con productos diseñados para nutrir tu piel, fortalecer tu cabello y revitalizar tu apariencia.',
    seoTitle: 'Belleza Integral: Nutrición para Piel, Cabello y Uñas | Zenhogar',
    seoDescription: 'Potencia tu belleza desde el interior. Colágenos, vitaminas y cuidados naturales para una apariencia radiante. Calidad certificada.'
  },
  { 
    id: 'salud-sexual', 
    name: 'Salud Sexual', 
    icon: 'Zap',
    image: '/assets/categories/salud-sexual.webp',
    color: 'purple',
    description: 'Mejora tu vitalidad y rendimiento con soluciones naturales diseñadas para tu bienestar íntimo y energía diaria.',
    seoTitle: 'Salud Sexual y Vitalidad: Potenciadores Naturales para Hombres y Mujeres',
    seoDescription: 'Mejora tu rendimiento y energía con nuestras soluciones naturales para la salud sexual. Discreción, efectividad y calidad garantizada.'
  }
];

export const PRODUCTS: Product[] = [
  {
    id: 'rtafull',
    name: 'Rtafull',
    category: 'salud-bienestar',
    shortDescription: 'Depura tu hígado y elimina la pesadez estomacal de inmediato.',
    description: '✔️ Limpieza Profunda: Con Alcachofa y Berenjena que trabajan para limpiar impurezas del organismo. ✔️ Vientre Ligero: Ayuda a reducir la sensación de pesadez y estimula la digestión para sentirte más liviano cada día. ✔️ Fuerza Natural: El poder de la Flor de Jamaica y el Apio para mantener tus defensas altas.',
    seoTitle: 'Limpieza Natural y Cuidado del Hígado con Rtafull',
    seoDescription: '✔️ Limpieza Profunda: Con Alcachofa y Berenjena. Ayuda a reducir la sensación de pesadez y estimula la digestión. ¡Calidad INVIMA!',
    benefits: [
      'Hígado depurado y saludable',
      'Adiós a la pesadez tras comer',
      'Estimula la digestión lenta',
      'Riqueza herbal de alta pureza'
    ],
    image: '/assets/products/rtafull.webp',
    basePrice: 79900,
    size: '500 ml',
    invima: 'PSA-000932-2017',
    keywords: 'limpieza hígado, digestión ligera, pesadez abdominal, depuración natural, alcachofa, Rtafull, Zenhogar, hígado graso',
    components: 'Alcachofa, Flor de Jamaica, Berenjena, Apio',
    longTailKeywords: [
      'mejor suplemento líquido para limpiar el hígado rápidamente',
      'cómo reducir la sensación de pesadez abdominal después de comer mucho',
      'solución natural para la depuración total del organismo',
      'beneficios de la alcachofa para un hígado saludable y feliz',
      'fórmula líquida de rápida absorción para digestión ligera',
      'bienestar integral y limpieza profunda con registro INVIMA',
    ],
    seoFaqs: [
      { q: '¿Cómo se debe tomar Rtafull?', a: 'Se recomienda tomar una copita después de la comida principal para ayudar a procesar las grasas y promover un bienestar integral.' },
      { q: '¿Limpia el hígado de forma natural?', a: 'Sí, sus extractos botánicos están seleccionados para apoyar la función hepática sin químicos agresivos y con calidad certificada.' },
      { q: '¿Sabe amargo?', a: 'Tiene un sabor herbal suave que es fácil de pasar y se absorbe muy rápido por ser una fórmula líquida.' }
    ],
    promos: [
      { id: '1u', label: '1 Unidad', units: 1, price: 79900 },
      { id: '2u', label: '2 Unidades', units: 2, price: 119850 },
      { id: '2x3', label: 'Pague 2 Lleve 3', units: 3, price: 159800, badge: '⭐ Recomendado' },
      { id: '3x5', label: 'Pague 3 Lleve 5', units: 5, price: 239700, badge: '🔥 Mejor Oferta' }
    ],
    testimonials: [
      { name: 'Carlos Mendoza', text: 'Me siento mucho más ligero desde el primer día. Ayuda mucho con la pesadez.', rating: 5 },
      { name: 'Elena Rodríguez', text: 'Excelente para limpiar el cuerpo. Lo tomo periódicamente para sentirme renovada.', rating: 5 }
    ],
    whyChoose: {
      title: 'Energía y Ligereza Natural',
      description: 'En ZENHOGAR impulsamos tu bienestar con extractos que el cuerpo absorbe al instante. Rtafull es la solución definitiva para quienes buscan una depuración efectiva sin recurrir a químicos pesados, respaldado por certificaciones de salud oficiales.'
    }
  },
  {
    id: 'coliplus',
    name: 'Coliplus',
    category: 'salud-bienestar',
    shortDescription: 'Regula tu tránsito intestinal y limpia el colon naturalmente.',
    description: 'Mezcla de fibras naturales para una digestión fácil y regular. Apto para diabéticos y con un rendimiento de hasta 2 meses.',
    seoTitle: 'Limpieza Intestinal Natural con Coliplus Sabor Manzana',
    seoDescription: 'Ve al baño de forma fácil y regular con Pitaya y Espirulina. Coliplus es apto para diabéticos y rinde 2 meses. ¡Salud intestinal con calidad INVIMA!',
    benefits: [
      'Tránsito intestinal fluido',
      'Endulzado sin calorías',
      'Tarro súper rendidor',
      'Fibra natural con pitaya'
    ],
    image: '/assets/products/coliplus.webp',
    basePrice: 75900,
    size: '500 ml',
    invima: 'NSA-0012423-2022',
    keywords: 'limpieza intestinal, estreñimiento, fibras naturales, pitaya, espirulina, digestión fácil, salud digestiva, Coliplus, Zenhogar',
    components: 'Pitaya, Linaza, Espirulina, Manzana',
    longTailKeywords: [
      'mejor fibra natural para ir al baño regularmente',
      'cómo limpiar el colon sin azúcar de forma segura',
      'suplemento de fibra rentable que rinde 2 meses',
      'beneficios de la pitaya y espirulina para el intestino',
      'fórmula para digestión fácil apta para diabéticos',
      'bienestar integral digestivo con registro INVIMA',
    ],
    seoFaqs: [
      { q: '¿Coliplus ayuda a ir al baño?', a: 'Sí, su mezcla de fibras naturales está diseñada para regular el tránsito intestinal y facilitar las deposiciones de forma suave y efectiva.' },
      { q: '¿Es apto para diabéticos?', a: 'Absolutamente, Coliplus no contiene azúcar añadida y es totalmente seguro para personas que cuidan sus niveles de glucosa.' },
      { q: '¿Cuánto rinde un tarro?', a: 'Gracias a su fórmula concentrada, un solo tarro de Coliplus rinde hasta 2 meses de uso continuo para tu bienestar integral.' }
    ],
    promos: [
      { id: '1u', label: '1 Unidad', units: 1, price: 75900 },
      { id: '2u', label: '2 Unidades', units: 2, price: 113850 },
      { id: '2x3', label: 'Pague 2 Lleve 3', units: 3, price: 151800, badge: '⭐ Recomendado' },
      { id: '3x5', label: 'Pague 3 Lleve 5', units: 5, price: 227700, badge: '🔥 Mejor Oferta' }
    ],
    testimonials: [
      { name: 'Marta L.', text: 'Sencillamente maravilloso. Por fin encontré una fibra que no me inflama y me ayuda a ir al baño con facilidad.', rating: 5 },
      { name: 'Jorge I.', text: 'Es muy rendidor y el sabor a manzana es delicioso. Mi digestión mejoró desde la primera semana.', rating: 5 }
    ],
    whyChoose: {
      title: 'Ligereza y regularidad garantizada',
      description: 'En ZENHOGAR estamos comprometidos con tu salud, ofrecemos productos con registro INVIMA para tu paz intestinal. Coliplus combina Pitaya y Espirulina para una limpieza suave que rinde 2 meses. Recupera tu bienestar digestivo con una fórmula certificada y segura.'
    }
  },
  {
    id: 'colageno',
    name: 'Colágeno + Citrato de Magnesio',
    category: 'salud-bienestar',
    shortDescription: 'Fortalece tus articulaciones y mejora la calidad de tu sueño.',
    description: 'Colágeno de sabor neutro ideal para mezclar con cualquier bebida, apto para todas las edades y enfocado en la hidratación de tu piel.',
    seoTitle: 'Colágeno + Citrato de Magnesio: Bienestar y Energía',
    seoDescription: 'Fortalece tus articulaciones y mejora tu digestión con Colágeno + Citrato de Magnesio. Calidad INVIMA para tu bienestar integral diaria.',
    benefits: [
      'Sin sabor, mézclalo con cualquier bebida',
      'Apto para niños y adultos mayores',
      'Hidratación profunda desde el interior',
      'Disolución rápida sin dejar grumos'
    ],
    image: '/assets/products/Colagenocitratodemagnesio.webp',
    basePrice: 85000,
    size: '700 g',
    invima: 'RSA-0026265-2023',
    keywords: 'colágeno natural, sabor neutro, hidratación piel, colágeno familiar, piel suave, Zenhogar, colágeno puro',
    components: 'Colágeno Hidrolizado Neutro, Vitaminas',
    longTailKeywords: [
      'mejor colágeno sin sabor para mezclar con jugos',
      'cómo hidratar la piel desde adentro con colágeno natural',
      'suplemento de colágeno apto para niños y adultos mayores',
      'beneficios del colágeno puro para la elasticidad de la piel',
      'fórmula neutra para nutrición familiar diaria',
      'bienestar integral y piel suave con registro INVIMA',
    ],
    seoFaqs: [
      { q: '¿Por qué combinar colágeno con magnesio?', a: 'El magnesio potencia la absorción del colágeno y ayuda a la relajación muscular, ofreciendo un bienestar integral.' },
      { q: '¿Qué beneficios tiene?', a: 'Nuestro Colágeno + Citrato de Magnesio combina la regeneración de tejidos con los beneficios musculares y nerviosos del magnesio.' },
      { q: '¿Quiénes pueden tomarlo?', a: 'Su fórmula pura es apta para toda la familia, desde niños hasta adultos mayores y mujeres lactantes, brindando bienestar integral.' }
    ],
    promos: [
      { id: '1u', label: '1 Unidad', units: 1, price: 85000 },
      { id: '2u', label: '2 Unidades', units: 2, price: 127500 },
      { id: '2x3', label: 'Pague 2 Lleve 3', units: 3, price: 170000, badge: '⭐ Recomendado' },
      { id: '3x5', label: 'Pague 3 Lleve 5', units: 5, price: 255000, badge: '🔥 Mejor Oferta' }
    ],
    testimonials: [
      { name: 'Beatriz G.', text: 'Lo mezclo con el jugo de los niños y ni cuenta se dan. He notado mi piel mucho más suave.', rating: 5 },
      { name: 'Ricardo P.', text: 'Excelente calidad. No tiene ese sabor feo de otros colágenos y se disuelve muy fácil en el café.', rating: 5 }
    ],
    whyChoose: {
      title: 'Hidratación para toda la familia',
      description: 'En ZENHOGAR estamos comprometidos con tu salud, ofrecemos productos con registro INVIMA de alta pureza. Nuestro Colágeno + Citrato de Magnesio es la mezcla ideal para fortalecer articulaciones, huesos y mejorar la función muscular. Calidad certificada para tu bienestar diario.'
    }
  },
  {
    id: 'resvis',
    name: 'Resvifactor (Calostro Bovino)',
    category: 'salud-bienestar',
    shortDescription: 'Aumenta tus defensas y protege tu cuerpo contra virus.',
    description: '✔️ Escudo Natural: Con Calostro Bovino y Hongos Naturales (Shiitake) para fortalecer tu sistema inmunológico. ✔️ Energía para Todos: Ideal para adultos mayores y jóvenes que buscan protección contra virus y bacterias. ✔️ Bienestar diario: Ayuda a la recuperación del cuerpo y aporta vitalidad inmediata.',
    seoTitle: 'Refuerzo Total para tus Defensas con Resvifactor Calostro Bovino',
    seoDescription: '✔️ Escudo Natural: Con Calostro Bovino y Shiitake. Fortalece tu sistema inmunológico y aporta vitalidad inmediata. ¡Calidad INVIMA!',
    benefits: [
      'Refuerza el sistema inmunológico',
      'Ideal para toda la familia',
      'Aporta vitalidad inmediata',
      'Recuperación física superior'
    ],
    image: '/assets/products/Resvisfactor.webp',
    basePrice: 89900,
    size: '500 ml',
    invima: 'RSAD05i27915',
    keywords: 'antioxidante, sistema inmune, resveratrol, energía vital, defensas, vitalidad diaria, Resvis Factor, Zenhogar',
    components: 'Resveratrol, Omega 3, 6, 9, Vitamina C, Zinc',
    longTailKeywords: [
      'mejor antioxidante natural para proteger las células',
      'cómo fortalecer el sistema inmunológico con resveratrol',
      'suplemento para energía real y vitalidad cada mañana',
      'beneficios del resveratrol para el escudo de vida diario',
      'fórmula para defensas arriba y protección antioxidante',
      'bienestar integral y vitalidad con registro INVIMA',
    ],
    seoFaqs: [
      { q: '¿Qué es el Resveratrol y cómo me beneficia?', a: 'Es un potente antioxidante que protege tus células y fortalece tu sistema inmune para un bienestar integral.' },
      { q: '¿Ayuda a verse más joven?', a: 'Sí, al combatir el daño oxidativo, apoya la salud de la piel y retrasa signos de envejecimiento celular.' },
      { q: '¿Es apto para adultos mayores?', a: 'Es ideal para adultos que buscan mantener su vitalidad y proteger su salud con calidad certificada.' }
    ],
    promos: [
      { id: '1u', label: '1 Unidad', units: 1, price: 89900 },
      { id: '2u', label: '2 Unidades', units: 2, price: 134850 },
      { id: '2x3', label: 'Pague 2 Lleve 3', units: 3, price: 179800, badge: '⭐ Recomendado' },
      { id: '3x5', label: 'Pague 3 Lleve 5', units: 5, price: 269700, badge: '🔥 Mejor Oferta' }
    ],
    testimonials: [
      { name: 'Fernando S.', text: 'Me siento con mucha más vitalidad desde que lo tomo. Mis defensas están al 100%.', rating: 5 },
      { name: 'Gloria Estela', text: 'Es un excelente antioxidante, mi piel se ve mucho mejor y tengo más energía.', rating: 5 }
    ],
    whyChoose: {
      title: 'Tu Escudo de Vida Diario',
      description: 'En ZENHOGAR impulsamos tu vitalidad con fórmulas que actúan desde el interior. Resvifactor es la opción ideal para quienes buscan una protección natural superior, combinando calostro y hongos funcionales para mantener tus defensas siempre activas.'
    }
  },
  {
    id: 'cla500',
    name: 'CLA 500',
    category: 'salud-bienestar',
    shortDescription: 'Reconforta articulaciones y reduce la pesadez corporal.',
    description: 'Aprovecha los beneficios de la cúrcuma y la pimienta para confortar articulaciones y proteger tu piel del paso del tiempo.',
    seoTitle: 'Reconforta tus Articulaciones con CLA 500 Cúrcuma y Pimienta',
    seoDescription: 'Reduce la pesadez y protege tu piel con CLA 500. Máximo aprovechamiento gracias al toque de pimienta negra. ¡Salud natural con calidad INVIMA!',
    benefits: [
      'Reduce la pesadez en articulaciones',
      'Máxima absorción gracias a la pimienta',
      'Protección celular contra el paso del tiempo',
      'Ayuda en procesos de tonificación muscular'
    ],
    image: '/assets/products/CLA500.webp',
    basePrice: 75900,
    size: '60 Cápsulas',
    invima: 'SD2019-0004457',
    keywords: 'cúrcuma, pimienta negra, inflamación, salud articular, antiage, antioxidante, CLA 500, Zenhogar',
    components: 'Cúrcuma, Pimienta Negra, ingredientes naturales',
    longTailKeywords: [
      'mejor suplemento de cúrcuma para confortar articulaciones',
      'cómo absorber mejor los beneficios de la cúrcuma con pimienta',
      'suplemento para proteger la piel del envejecimiento natural',
      'beneficios de la cúrcuma para la salud articular integral',
      'fórmula para reducir la pesadez de forma natural y segura',
      'bienestar integral y cuidado celular con registro INVIMA',
      'CLA 500 para pérdida de grasa saludable',
      'suplemento natural para evitar el efecto rebote en dietas',
      'tonificación muscular segura con ingredientes de alta pureza'
    ],
    seoFaqs: [
      { q: '¿Cómo funciona el CLA 500 en el cuerpo?', a: 'Ayuda a movilizar las grasas acumuladas para que el cuerpo las use como energía, favoreciendo la tonificación.' },
      { q: '¿Necesito hacer ejercicio para ver resultados?', a: 'El ejercicio potencia enormemente los resultados de nuestra fórmula balanceada para un bienestar integral.' },
      { q: '¿Tiene efectos secundarios?', a: 'Es un suplemento natural con calidad certificada, diseñado para ser seguro bajo las dosis recomendadas.' }
    ],
    promos: [
      { id: '1u', label: '1 Unidad', units: 1, price: 75900 },
      { id: '2u', label: '2 Unidades', units: 2, price: 113850 },
      { id: '2x3', label: 'Pague 2 Lleve 3', units: 3, price: 151800, badge: '⭐ Recomendado' },
      { id: '3x5', label: 'Pague 3 Lleve 5', units: 5, price: 227700, badge: '🔥 Mejor Oferta' }
    ],
    testimonials: [
      { name: 'Julián Toro', text: 'He bajado dos tallas combinando CLA 500 con ejercicio. Realmente funciona.', rating: 5 },
      { name: 'Paola V.', text: 'Me ayuda a marcar más los músculos y a reducir medidas difícil del abdomen.', rating: 5 },
      { name: 'Mateo G.', text: 'Buen complemento para el gimnasio. Siento que sudo más y movilizo mejor la energía.', rating: 4 }
    ],
    whyChoose: {
      title: 'Esculpe tu mejor versión',
      description: 'En ZENHOGAR estamos comprometidos con tu salud, ofrecemos productos con registro INVIMA para resultados honestos. CLA 500 ayuda a reducir la grasa corporal y tonificar tus músculos mediante Ácido Linoleico Conjugado de alta pureza. Control de peso seguro y certificado.'
    }
  },
  {
    id: 'cafetolio',
    name: 'Café Verde Cafetolio',
    category: 'salud-bienestar',
    shortDescription: 'Activa tu metabolismo y controla la ansiedad de picar.',
    description: 'Bebida de café verde al natural que ayuda a limpiar tu organismo, mantener tu vientre plano y darte energía.',
    seoTitle: 'Limpieza Natural y Vientre Plano con Café Verde Cafetolio',
    seoDescription: 'Elimina grasa y limpia tu hígado con el poder del grano al natural de Cafetolio. Energía pura sin nerviosismos. ¡Calidad INVIMA garantizada!',
    benefits: [
      'Activa el metabolismo naturalmente',
      'Ayuda a mantener un vientre plano',
      'Energía duradera sin causar ansiedad',
      'Apoya la depuración del hígado'
    ],
    image: '/assets/products/Cafetolio.webp',
    basePrice: 99900,
    size: '500 g',
    invima: 'NSA-0008349-2020',
    keywords: 'café verde, vientre plano, control de peso, limpiar hígado, energía natural, metabolismo, Cafetolio, Zenhogar',
    components: 'Grano de Café Verde puro, ingredientes naturales',
    longTailKeywords: [
      'mejor café verde para tener el vientre plano',
      'cómo limpiar el hígado y movilizar energías naturalmente',
      'suplemento para energía diaria sin causar nerviosismo',
      'beneficios del café verde al natural para el organismo',
      'fórmula para que el cuerpo no guarde azúcares',
      'bienestar integral y control de medidas con registro INVIMA',
      'bebida natural para mantenerse activo y saludable todo el día',
      'café verde para control de peso efectivo',
      'energía metabólica segura con ingredientes de origen natural'
    ],
    seoFaqs: [
      { q: '¿El café verde Cafetolio ayuda a moldear la figura?', a: 'Sí, su efecto termogénico natural ayuda a acelerar el metabolismo y a utilizar las grasas como fuente de energía.' },
      { q: '¿Contiene mucha cafeína?', a: 'Contiene una dosis equilibrada que brinda energía constante sin los picos de ansiedad del café tradicional.' },
      { q: '¿Cómo se recomienda tomarlo?', a: 'Se recomienda una taza antes de las comidas principales para optimizar el bienestar integral y el metabolismo.' }
    ],
    promos: [
      { id: '1u', label: '1 Unidad', units: 1, price: 99900 },
      { id: '2u', label: '2 Unidades', units: 2, price: 164000 },
      { id: '2x3', label: 'Pague 2 Lleve 3', units: 3, price: 227000, badge: '⭐ Recomendado' },
      { id: '3x5', label: 'Pague 3 Lleve 5', units: 5, price: 295000, badge: '🔥 Mejor Oferta' }
    ],
    testimonials: [
      { name: 'Isabel Cristina', text: 'Me encanta el sabor y cómo me quita la ansiedad de estar picando entre comidas.', rating: 5 },
      { name: 'Mauricio L.', text: 'Es mi café de todas las mañanas. Me mantiene activo y me ayuda a controlar el peso.', rating: 5 },
      { name: 'Daniela P.', text: 'He notado que mi metabolismo está más rápido. Muy recomendado.', rating: 5 }
    ],
    whyChoose: {
      title: 'Energía que fluye contigo',
      description: 'En ZENHOGAR estamos comprometidos con tu salud, ofrecemos productos con registro INVIMA de sabor excepcional. Cafetolio activa tu metabolismo lento y controla la ansiedad gracias al poder del Café Verde y la L-Carnitina. Fórmula balanceada para una energía vital con calidad certificada.'
    }
  },
  {
    id: 'locion',
    name: 'Loción Termoactiva',
    category: 'salud-bienestar',
    shortDescription: 'Alivio Rápido para Músculos y Articulaciones.',
    description: '✔️ Calma el Dolor: Con extractos de Uña de Gato y Caléndula que alivian golpes, torceduras y calambres. ✔️ Relajación Total: Ideal para aplicar después del ejercicio o tras un día de mucho esfuerzo físico. ✔️ Efecto Rápido: Se absorbe velozmente proporcionando alivio y descanso en la zona afectada.',
    seoTitle: 'Alivio Rápido para Músculos y Articulaciones - Loción Termoactiva',
    seoDescription: '✔️ Calma el Dolor: Con Uña de Gato y Caléndula. Alivio para golpes, torceduras y calambres con efecto calor. ¡Registro INVIMA!',
    benefits: [
      'Alivio muscular casi instantáneo',
      'Relaja tensiones por esfuerzo físico',
      'Efecto calmante ante torceduras',
      'Fórmula herbal no grasosa'
    ],
    image: '/assets/products/Termoactiva.webp',
    basePrice: 79900,
    size: '120 ml',
    invima: 'NSOC74321-16CO',
    keywords: 'dolor muscular, tensión cuello, cansancio en piernas, fatiga muscular, masajes, alivio rápido, loción termoactiva, Zenhogar',
    components: 'Salicilato de Metilo, Alcanfor, Mentol, Eucalipto, Castaño de Indias',
    longTailKeywords: [
      'mejor loción con efecto calor para tensión en la espalda',
      'cómo aliviar la tensión muscular en el cuello rápidamente',
      'solución natural para mejorar la circulación en las piernas',
      'loción termoactiva para masajes deportivos y recuperación',
      'fórmula balanceada para alivio de contracturas musculares',
      'bienestar integral corporal con masajes de calor profundo',
      'cómo reducir la fatiga muscular después del ejercicio intenso',
      'loción para el cuidado muscular diario',
      'alivio rápido de dolores articulares con calidad certificada',
      'masaje terapéutico con ingredientes naturales para relajación'
    ],
    seoFaqs: [
      { q: '¿Para qué sirve el efecto calor de la loción?', a: 'El calor ayuda a dilatar los vasos sanguíneos, mejorando la circulación y relajando las fibras musculares tensionadas.' },
      { q: '¿Se puede usar antes de hacer ejercicio?', a: 'Sí, ayuda a preparar los músculos para la actividad, promoviendo un bienestar integral y flexibilidad.' },
      { q: '¿Mancha la ropa?', a: 'Nuestra fórmula balanceada es de rápida absorción y no deja residuos grasos ni manchas en las prendas.' }
    ],
    promos: [
      { id: '1u', label: '1 Unidad', units: 1, price: 79900 },
      { id: '2u', label: '2 Unidades', units: 2, price: 119850 },
      { id: '2x3', label: 'Pague 2 Lleve 3', units: 3, price: 159800, badge: '⭐ Recomendado' },
      { id: '3x5', label: 'Pague 3 Lleve 5', units: 5, price: 239700, badge: '🔥 Mejor Oferta' }
    ],
    testimonials: [
      { name: 'Roberto J.', text: 'El calor que genera es perfecto para mis tensión en la espalda. Alivio inmediato.', rating: 5 },
      { name: 'Sandra Milena', text: 'La uso después de entrenar y mis músculos se recuperan mucho más rápido.', rating: 5 }
    ],
    whyChoose: {
      title: 'Alivio que reconforta tu cuerpo',
      description: 'En ZENHOGAR estamos comprometidos con tu salud, ofrecemos productos con registro INVIMA e ingredientes botánicos seguros. Nuestra loción termoactiva es ideal para todos los que tienen tensión muscular generados por cansancio, agotamiento o que padecen de desgaste ocasional, garantizado por normas de salud.'
    }
  },
  // New products for Salud y Bienestar
  {
    id: 'c-lagen',
    name: 'C-Lagen',
    category: 'salud-bienestar',
    shortDescription: 'Refuerzo del Mar para tus Rodillas.',
    description: 'Colágeno de origen marino diseñado para fortalecer tus articulaciones, huesos y mejorar tu movilidad diaria.',
    seoTitle: 'Refuerzo de Colágeno Marino para Rodillas y Articulaciones | C-Lagen',
    seoDescription: 'Recupera tu movilidad con C-Lagen. Colágeno de mar de fácil absorción con Magnesio para huesos fuertes y sanos. ¡Calidad INVIMA!',
    benefits: [
      'Absorción fácil y rápida por ser marino',
      'Magnesio para mayor firmeza en los huesos',
      'Camina y muévete con total libertad',
      'Fortalece tendones y ligamentos'
    ],
    image: '/assets/products/C-lagen.webp',
    basePrice: 93500,
    size: '500 g',
    invima: 'RSA-0032379-2024',
    keywords: 'colágeno marino, molestias articulares, salud articular, huesos fuertes, magnesio, movilidad, C-Lagen, Zenhogar',
    components: 'Colágeno de Mar, Magnesio, Vitamina C',
    longTailKeywords: [
      'mejor colágeno marino para fortalecer las rodillas',
      'cómo mejorar la movilidad articular sin rigidez',
      'suplemento para huesos macizos y sanos con magnesio',
      'beneficios del colágeno de mar para las articulaciones',
      'fórmula para caminar sin molestias ni desgaste',
      'bienestar integral y nutrición ósea con registro INVIMA',
      'colágeno para el cuidado de los tejidos',
      'suplemento natural para mantener la juventud de las manos',
      'fortalecimiento de tendones y ligamentos con colágeno puro'
    ],
    seoFaqs: [
      { q: '¿Qué tipo de colágeno contiene C-Lagen?', a: 'Contiene colágeno hidrolizado de alta pureza, optimizado para una absorción máxima en piel y articulaciones.' },
      { q: '¿Ayuda a reducir las líneas de expresión?', a: 'Sí, al nutrir las capas profundas de la piel, promueve la firmeza y un bienestar integral estético.' },
      { q: '¿Cuánto tiempo debo tomarlo?', a: 'Para resultados óptimos en vitalidad y belleza, se recomienda un consumo constante de al menos 3 meses.' }
    ],
    promos: [
      { id: '1u', label: '1 Unidad', units: 1, price: 93500 },
      { id: '2u', label: '2 Unidades', units: 2, price: 140250 },
      { id: '2x3', label: 'Pague 2 Lleve 3', units: 3, price: 187000, badge: '⭐ Recomendado' },
      { id: '3x5', label: 'Pague 3 Lleve 5', units: 5, price: 280500, badge: '🔥 Mejor Oferta' }
    ],
    testimonials: [
      { name: 'Lucía Méndez', text: 'Mi piel se siente mucho más firme y las líneas de expresión han disminuido. ¡Me encanta!', rating: 5 },
      { name: 'Carlos Ruiz', text: 'Lo tomo para mis articulaciones y he sentido una gran mejoría en la movilidad.', rating: 5 },
      { name: 'Mariana Soler', text: 'Excelente calidad, se nota que es colágeno puro. Muy recomendado.', rating: 5 }
    ],
    whyChoose: {
      title: 'Nutrición celular de alta pureza',
      description: 'En ZENHOGAR estamos comprometidos con tu salud, ofrecemos productos con registro INVIMA. C-Lagen nutre tu piel profundamente con una fórmula balanceada enriquecida con ácido hialurónico para resultados seguros y efectivos.'
    }
  },
  {
    id: 'citramix',
    name: 'Citramix',
    category: 'salud-bienestar',
    shortDescription: 'Relajante de Músculos y Nervios.',
    description: 'Mezcla natural con tres tipos de magnesio para relajar tus músculos, evitar calambres y mantener la calma diaria.',
    seoTitle: 'Relaja Músculos y Nervios con Citramix Sabor Durazno',
    seoDescription: 'Dile adiós a la tensión y calambres con Citramix. Tres tipos de magnesio para descansar mejor y tener una digestión ligera. ¡Calidad INVIMA!',
    benefits: [
      'Músculos descansados y sin calambres',
      'Evita la pesadez abdominal con fibra natural',
      'Calma total en días de mucho estrés',
      'Sabor delicioso a durazno maduro'
    ],
    image: '/assets/products/Citramix.webp',
    basePrice: 79900,
    size: '300 g',
    invima: 'SD2023-0004812',
    keywords: 'magnesio, calambres, estrés, digestión ligera, relajación muscular, paz mental, Citramix, Zenhogar',
    components: 'Mezcla de 3 magnesios, fibra natural, sabor a durazno',
    longTailKeywords: [
      'mejor mezcla de magnesio para evitar calambres musculares',
      'cómo mantener la calma y reducir el estrés diariamente',
      'suplemento para digestión ligera sin pesadez abdominal',
      'beneficios del magnesio para el descanso de los músculos',
      'fórmula para relajar los nervios de forma natural',
      'bienestar integral y tranquilidad con registro INVIMA',
    ],
    seoFaqs: [
      { q: '¿Citramix reemplaza el jugo de naranja diario?', a: 'Es una opción mucho más concentrada en vitamina C y antioxidantes, sin los azúcares añadidos, para un bienestar integral.' },
      { q: '¿Me da energía para el trabajo?', a: 'Sí, su mezcla revitalizante ayuda a combatir la fatiga de forma natural y constante.' },
      { q: '¿Es apto para niños?', a: 'Es una excelente fuente de vitaminas para toda la familia, siempre bajo supervisión y calidad certificada.' }
    ],
    promos: [
      { id: '1u', label: '1 Unidad', units: 1, price: 79900 },
      { id: '2u', label: '2 Unidades', units: 2, price: 119850 },
      { id: '2x3', label: 'Pague 2 Lleve 3', units: 3, price: 159800, badge: '⭐ Recomendado' },
      { id: '3x5', label: 'Pague 3 Lleve 5', units: 5, price: 239700, badge: '🔥 Mejor Oferta' }
    ],
    testimonials: [
      { name: 'Camila V.', text: 'Me encanta el sabor cítrico y me da mucha energía para empezar el día.', rating: 5 },
      { name: 'Andrés F.', text: 'Mis defensas han mejorado mucho, ya no me enfermo tan seguido.', rating: 5 }
    ],
    whyChoose: {
      title: 'Vitalidad cítrica garantizada',
      description: 'En ZENHOGAR estamos comprometidos con tu salud, ofrecemos productos con registro INVIMA de origen natural. Citramix es un polvo multivitamínico diseñado para una absorción superior de vitamina C y el bienestar integral de toda tu familia.'
    }
  },
  {
    id: 'coffee-colageno',
    name: 'Coffee + Colágeno',
    category: 'salud-bienestar',
    shortDescription: 'Café con Vitaminas para tu Belleza.',
    description: 'Combina tu café matutino con el poder del colágeno y crema de coco para fortalecer tu cabello, uñas y defensas sin caer pesado.',
    seoTitle: 'Tu Ritual de Belleza Matutino con Coffee + Colágeno',
    seoDescription: 'Fortalece cabello y uñas con Coffee + Colágeno. Hecho con crema de coco y 12 vitaminas para tu vitalidad. ¡Calidad INVIMA garantizada!',
    benefits: [
      'Fortalece cabello y uñas desde la raíz',
      'Con crema de coco, no genera pesadez',
      'Aporta 12 vitaminas esenciales para el día',
      'El ritual de belleza más delicioso'
    ],
    image: '/assets/products/Coffe+colageno.webp',
    basePrice: 75900,
    size: '400 g',
    invima: 'RSA-0010234-2020 (Registro en trámite)',
    keywords: 'café con colágeno, crema de coco, belleza integral, fortalecer cabello, uñas fuertes, vitaminas, Coffee Colágeno, Zenhogar',
    components: 'Café Premium, Colágeno, Crema de Coco, 12 Vitaminas',
    longTailKeywords: [
      'mejor café con colágeno para fortalecer cabello y uñas',
      'cómo cuidar tu belleza mientras tomas el café matutino',
      'suplemento de café con crema de coco para evitar gases',
      'beneficios de las 12 vitaminas para la vitalidad diaria',
      'fórmula antiedad para disfrutar en el desayuno',
      'bienestar integral y defensas fuertes con registro INVIMA',
    ],
    seoFaqs: [
      { q: '¿Sabe a café normal?', a: 'Sí, mantiene el delicioso sabor del café premium colombiano, pero con el beneficio añadido del colágeno para tu bienestar integral.' },
      { q: '¿Ayuda a fortalecer el cabello?', a: 'El colágeno es fundamental para la salud capilar, por lo que notarás mejoras en fuerza y brillo.' },
      { q: '¿Puedo tomarlo varias veces al día?', a: 'Se recomienda una o dos tazas diarias para mantener un equilibrio natural y nutrición constante.' }
    ],
    promos: [
      { id: '1u', label: '1 Unidad', units: 1, price: 75900 },
      { id: '2u', label: '2 Unidades', units: 2, price: 113850 },
      { id: '2x3', label: 'Pague 2 Lleve 3', units: 3, price: 151800, badge: '⭐ Recomendado' },
      { id: '3x5', label: 'Pague 3 Lleve 5', units: 5, price: 227700, badge: '🔥 Mejor Oferta' }
    ],
    testimonials: [
      { name: 'Juan Pablo', text: 'Es el mejor ritual para empezar el día. Sabe a café premium y cuida mi piel.', rating: 5 },
      { name: 'Diana Marcela', text: 'Me encanta la idea de tomar colágeno en mi café diario. Muy práctico y delicioso.', rating: 5 }
    ],
    whyChoose: {
      title: 'Belleza natural en cada taza',
      description: 'En ZENHOGAR estamos comprometidos con tu salud, ofrecemos productos con registro INVIMA de grado premium. Coffee + Colágeno fusiona el mejor café colombiano con colágeno hidrolizado para tu vitalidad diaria con calidad certificada.'
    }
  },
  {
    id: 'creatina',
    name: 'Creatina 100%',
    category: 'salud-bienestar',
    shortDescription: 'Fuerza para tus Músculos y Cerebro.',
    description: 'Creatina 100% pura para darte fuerza real, vitalidad y mantener tu mente despierta y concentrada.',
    seoTitle: 'Creatina 100% Pura para Fuerza Muscular y Cerebral',
    seoDescription: 'Potencia tus músculos y cerebro con Creatina 100% pura. Ideal para fuerza real y vitalidad en adultos. ¡Calidad de grado farmacéutico USP!',
    benefits: [
      'Pureza máxima sin rellenos ni sabores',
      'Mantiene la fuerza en brazos y piernas',
      'Mayor concentración y energía mental',
      'Grado farmacéutico para tu seguridad'
    ],
    image: '/assets/products/creatina100.webp',
    basePrice: 105000,
    size: '500 g',
    invima: 'SD2014-0003204',
    keywords: 'creatina pura, fuerza muscular, rendimiento cerebral, vitalidad, Zenhogar, creatina USP',
    components: 'Creatina Monohidratada 100% Pura',
    longTailKeywords: [
      'mejor creatina pura para ganar fuerza en brazos y piernas',
      'cómo mantener la mente despierta y concentrada naturalmente',
      'suplemento de creatina para vitalidad en adultos mayores',
      'beneficios de la creatina pura para el cerebro y músculos',
      'fórmula 100% pura sin rellenos ni sabores artificiales',
      'bienestar integral y fuerza real con calidad farmacéutica USP',
    ],
    seoFaqs: [
      { q: '¿La creatina 100% causa retención de líquidos?', a: 'La creatina aumenta la hidratación intracelular, lo cual es beneficioso para el músculo y el bienestar integral.' },
      { q: '¿Necesito fase de carga?', a: 'No es estrictamente necesaria; una dosis constante diaria asegura resultados con nuestra fórmula balanceada.' },
      { q: '¿Es segura para los riñones?', a: 'En personas sanas y bajo las dosis recomendadas, es un suplemento con calidad certificada y muy seguro.' }
    ],
    promos: [
      { id: '1u', label: '1 Unidad', units: 1, price: 105000 },
      { id: '2u', label: '2 Unidades', units: 2, price: 157500 },
      { id: '2x3', label: 'Pague 2 Lleve 3', units: 3, price: 210000, badge: '⭐ Recomendado' },
      { id: '3x5', label: 'Pague 3 Lleve 5', units: 5, price: 315000, badge: '🔥 Mejor Oferta' }
    ],
    testimonials: [
      { name: 'Mateo Holguín', text: 'He aumentado mi fuerza en el gimnasio notablemente. Muy buena pureza.', rating: 5 },
      { name: 'Santiago Arias', text: 'Excelente para la recuperación muscular. No me siento tan agotado después de entrenar.', rating: 5 }
    ],
    whyChoose: {
      title: 'Potencia muscular segura',
      description: 'En ZENHOGAR estamos comprometidos con tu salud, ofrecemos productos con registro INVIMA de alta pureza. Nuestra Creatina 100% monohidratada asegura un suplemento libre de sustancias prohibidas y optimizado para tu rendimiento físico.'
    }
  },
  {
    id: 'iprossmen',
    name: 'Iprossmen',
    category: 'salud-bienestar',
    shortDescription: 'Protección Natural para el Hombre.',
    description: 'Aliado ideal para cuidar la salud masculina, confortar la zona pélvica y mantener tu energía a largo plazo.',
    seoTitle: 'Protección Natural de la Próstata y Vitalidad con Iprossmen',
    seoDescription: 'Cuida tu próstata con el poder del tomate de árbol y arándanos de Iprossmen. Bienestar masculino y prevención garantizada. ¡Calidad INVIMA!',
    benefits: [
      'Cuida y reconforta la zona pélvica naturalmente',
      'Aporta vigor y energía para el día a día',
      'Complemento ideal para la salud masculina',
      'Fórmula rica en extracto de tomate y arándanos'
    ],
    image: '/assets/products/Iprossmen.webp',
    basePrice: 79900,
    size: '500 ml',
    invima: 'SD2015-0003504',
    keywords: 'salud masculina, próstata, vitalidad, tomate de árbol, prevención, bienestar hombre, Iprossmen, Zenhogar',
    components: 'Tomate de árbol, Arándanos, Té Verde, Saw Palmetto',
    longTailKeywords: [
      'mejor suplemento natural para confortar la zona pélvica',
      'cómo cuidar la salud masculina de forma natural y segura',
      'suplemento de tomate de árbol para el bienestar del hombre',
      'beneficios del saw palmetto para la prevención masculina',
      'fórmula para sentirse vital y con energía todo el día',
      'bienestar integral y salud del hombre con registro INVIMA',
    ],
    seoFaqs: [
      { q: '¿Iprossmen ayuda con la salud de la zona pélvica?', a: 'Sí, su fórmula balanceada está diseñada para apoyar el bienestar integral del sistema reproductor masculino.' },
      { q: '¿A qué edad se recomienda empezar a tomarlo?', a: 'Es ideal para hombres a partir de los 40 años como parte de su rutina de salud preventiva.' },
      { q: '¿Tiene contraindicaciones?', a: 'Es un producto natural con calidad certificada; se recomienda consultar al médico si hay condiciones preexistentes.' }
    ],
    promos: [
      { id: '1u', label: '1 Unidad', units: 1, price: 75900 },
      { id: '2u', label: '2 Unidades', units: 2, price: 113850 },
      { id: '2x3', label: 'Pague 2 Lleve 3', units: 3, price: 151800, badge: '⭐ Recomendado' },
      { id: '3x5', label: 'Pague 3 Lleve 5', units: 5, price: 227700, badge: '🔥 Mejor Oferta' }
    ],
    testimonials: [
      { name: 'Humberto G.', text: 'Me siento con más vitalidad y equilibrio. Un gran apoyo para la salud masculina.', rating: 5 },
      { name: 'Gabriel J.', text: 'Lo tomo como preventivo y me he sentido muy bien. Calidad garantizada.', rating: 5 }
    ],
    whyChoose: {
      title: 'Equilibrio hormonal para el hombre',
      description: 'En ZENHOGAR estamos comprometidos con tu salud, ofrecemos productos con registro INVIMA de alta precisión. Iprossmen es una fórmula balanceada enfocada en el bienestar integral de la zona pélvica mediante ingredientes de origen natural.'
    }
  },
  {
    id: 'kds-10',
    name: 'KDS 10',
    category: 'salud-bienestar',
    shortDescription: 'Fórmula avanzada multivitamínica.',
    description: 'KDS 10 aporta los nutrientes esenciales que tu cuerpo necesita cada día.',
    seoTitle: 'Cómo solucionar la falta de vitaminas y defensas bajas con KDS 10',
    seoDescription: 'Fortalece tu organismo con el complejo multivitamínico KDS 10. Fórmula balanceada para bienestar integral y calidad certificada. ¡Compra ahora!',
    benefits: [
      'Complejo completo de vitaminas y minerales',
      'Fortalece las defensas de toda la familia',
      'Combate el cansancio físico y mental',
      'Base cremosa de coco para mejor absorción'
    ],
    image: '/assets/products/Kds10.webp',
    basePrice: 79900,
    size: '500 ml',
    invima: 'SD2014-0003211 (Registro en trámite)',
    keywords: 'multivitamínico, vitalidad diaria, vitaminas y minerales, KDS 10, Zenhogar',
    components: 'Crema de Coco, Vitaminas, Minerales',
    longTailKeywords: [
      'mejor multivitamínico líquido para adultos y niños',
      'cómo asegurar la ingesta diaria de vitaminas esenciales',
      'suplemento para fortalecer las defensas de toda la familia',
      'beneficios de KDS 10 para el bienestar integral y energía',
      'fórmula balanceada de vitaminas y minerales de alta absorción',
      'bienestar integral y nutrición completa con calidad certificada',
      'cómo mejorar la vitalidad diaria con un multivitamínico natural',
      'suplemento para evitar deficiencias nutricionales',
      'vitaminas para el cansancio físico y mental con pureza garantizada',
      'fortalecimiento del sistema inmunológico con nutrición balanceada'
    ],
    seoFaqs: [
      { q: '¿Qué vitaminas contiene KDS 10?', a: 'Contiene un espectro completo de vitaminas esenciales diseñadas para un bienestar integral y equilibrio nutricional.' },
      { q: '¿Lo pueden tomar los niños?', a: 'Sí, su fórmula balanceada es apta para toda la familia bajo las dosis recomendadas por edad.' },
      { q: '¿Ayuda con el apetito?', a: 'Al corregir deficiencias vitamínicas, puede ayudar a normalizar el apetito y mejorar la vitalidad.' }
    ],
    promos: [
      { id: '1u', label: '1 Unidad', units: 1, price: 79900 },
      { id: '2u', label: '2 Unidades', units: 2, price: 119850 },
      { id: '2x3', label: 'Pague 2 Lleve 3', units: 3, price: 159800, badge: '⭐ Recomendado' },
      { id: '3x5', label: 'Pague 3 Lleve 5', units: 5, price: 239700, badge: '🔥 Mejor Oferta' }
    ],
    testimonials: [
      { name: 'Familia Restrepo', text: 'Lo tomamos todos en casa y nos sentimos con mucha más energía y salud.', rating: 5 },
      { name: 'Olga Marina', text: 'Excelente multivitamínico, mis hijos ya no se enferman tanto.', rating: 5 }
    ],
    whyChoose: {
      title: 'Nutrición familiar con confianza',
      description: 'En ZENHOGAR estamos comprometidos con tu salud, ofrecemos productos con registro INVIMA para tu familia. KDS 10 es un multivitamínico ideal para complementar la dieta diaria con la seguridad de una fórmula balanceada y certificada.'
    }
  },
  {
    id: 'liofhim',
    name: 'Liofhim',
    category: 'salud-bienestar',
    shortDescription: 'Bebida de Plantas para Dormir Profundo.',
    description: 'Bebida natural que ayuda a apagar la mente, lograr un descanso real y despertar renovado cada mañana.',
    seoTitle: 'Duerme Profundo y Despierta Renovado con Liofhim',
    seoDescription: 'Apaga la mente y logra un descanso real con Liofhim. Mezcla de Manzanilla y Albahaca para dormir rápido y sin interrupciones. ¡Calidad INVIMA!',
    benefits: [
      'Ayuda a conciliar el sueño en pocos minutos',
      'Evita los despertares a mitad de la noche',
      'Despierta con la mente clara y renovada',
      'Deliciosa mezcla de manzanilla y albahaca'
    ],
    image: '/assets/products/Liofhim.webp',
    basePrice: 75900,
    size: '30 Cápsulas',
    invima: 'SD2015-0003503 (Registro en trámite)',
    keywords: 'dormir profundo, insomnio, descanso real, manzanilla, albahaca, sueño reparador, Liofhim, Zenhogar',
    components: 'Manzanilla, Albahaca, Anís, Hierbuena',
    longTailKeywords: [
      'mejor bebida natural para dormir profundo toda la noche',
      'cómo evitar los despertares a medianoche y descansar',
      'suplemento para apagar la mente y dormir más rápido',
      'beneficios de la manzanilla y albahaca para el sueño',
      'fórmula para despertar renovado y con energía positiva',
      'bienestar integral y descanso real con registro INVIMA',
    ],
    seoFaqs: [
      { q: '¿Liofhim me dará sueño durante el día?', a: 'No, su efecto es relajante para la noche, ayudándote a apagar la mente y lograr un descanso real sin somnolencia al despertar.' },
      { q: '¿Es un medicamento para dormir?', a: 'No, es una bebida natural a base de plantas como Manzanilla y Albahaca que promueven el bienestar integral y la calma.' },
      { q: '¿Cómo se debe tomar?', a: 'Se recomienda tomar una copita diluida en agua tibia antes de dormir para disfrutar de un sueño reparador con calidad certificada.' }
    ],
    promos: [
      { id: '1u', label: '1 Unidad', units: 1, price: 75900 },
      { id: '2u', label: '2 Unidades', units: 2, price: 113850 },
      { id: '2x3', label: 'Pague 2 Lleve 3', units: 3, price: 151800, badge: '⭐ Recomendado' },
      { id: '3x5', label: 'Pague 3 Lleve 5', units: 5, price: 227700, badge: '🔥 Mejor Oferta' }
    ],
    testimonials: [
      { name: 'David R.', text: 'Antes me despertaba a cada rato, ahora con Liofhim duermo derecho hasta la mañana.', rating: 5 },
      { name: 'Patricia M.', text: 'Me ayuda a calmar la mente después de un día estresante. Es mi secreto para descansar bien.', rating: 5 }
    ],
    whyChoose: {
      title: 'Descanso profundo y natural',
      description: 'En ZENHOGAR estamos comprometidos con tu salud, ofrecemos productos con registro INVIMA para tu descanso real. Liofhim apaga la mente y relaja tu cuerpo gracias a la Manzanilla y la Albahaca. Logra un sueño reparador con la tranquilidad de una fórmula certificada y segura.'
    }
  },
  {
    id: 'liteplex',
    name: 'Liteplex',
    category: 'salud-bienestar',
    shortDescription: 'Alivio Natural para tu Digestión.',
    description: '✔️ Bienestar Estomacal: Con Jengibre, Limón y Albahaca que ayudan a calmar la pesadez y la acidez de forma natural. ✔️ Recuperación: Ideal para cuidar tu sistema digestivo después de comidas pesadas o molestias persistentes. ✔️ Sin Azúcar: Endulzado con Estevia, perfecto para cuidar tu salud sin sumar calorías.',
    seoTitle: 'Alivio Natural para tu Digestión con Liteplex',
    seoDescription: '✔️ Bienestar Estomacal: Con Jengibre y Limón. Calma la pesadez y acidez de forma natural y sin azúcar. ¡Registro INVIMA!',
    benefits: [
      'Calma la pesadez y acidez',
      'Ideal tras comidas pesadas',
      'Endulzado con Estevia'
    ],
    image: '/assets/products/Liteplex.webp',
    basePrice: 79900,
    size: '500 ml',
    invima: 'PSA-000932-2017',
    keywords: 'digestión ligera, alivio estomacal, acidez, pesadez, Liteplex, Zenhogar, jengibre, limón',
    components: 'Jengibre, Limón, Albahaca, Estevia',
    longTailKeywords: [
      'mejor suplemento líquido para acelerar el metabolismo',
      'cómo mejorar la digestión y el metabolismo naturalmente',
      'suplemento para el bienestar integral y energía metabólica',
      'beneficios de Liteplex para la quema de calorías diaria',
      'fórmula balanceada para un metabolismo activo y saludable',
      'bienestar integral y vitalidad con extractos naturales',
      'cómo recuperar el ritmo metabólico con calidad certificada',
      'suplemento para el control de peso natural',
      'solución natural para el metabolismo lento y pesadez',
      'salud metabólica integral con ingredientes de alta pureza'
    ],
    seoFaqs: [
      { q: '¿Liteplex ayuda a optimizar tu figura?', a: 'Sí, su fórmula balanceada apoya los procesos metabólicos naturales para una mejor utilización de las grasas.' },
      { q: '¿Cómo se debe consumir?', a: 'Se recomienda tomarlo diariamente para mantener un bienestar integral y metabolismo activo.' },
      { q: '¿Es apto para personas con diabetes?', a: 'Es un producto natural con calidad certificada, pero siempre recomendamos consultar a su médico.' }
    ],
    promos: [
      { id: '1u', label: '1 Unidad', units: 1, price: 79900 },
      { id: '2u', label: '2 Unidades', units: 2, price: 119850 },
      { id: '2x3', label: 'Pague 2 Lleve 3', units: 3, price: 159800, badge: '⭐ Recomendado' },
      { id: '3x5', label: 'Pague 3 Lleve 5', units: 5, price: 239700, badge: '🔥 Mejor Oferta' }
    ],
    testimonials: [
      { name: 'Fernando D.', text: 'Siento mi metabolismo mucho más activo. Me ayuda a no sentirme pesado.', rating: 5 },
      { name: 'Lorena M.', text: 'Excelente complemento para mi dieta. Me siento con más vitalidad.', rating: 5 }
    ],
    whyChoose: {
      title: 'Alivio digestivo natural',
      description: 'En ZENHOGAR cuidamos tu digestión con el poder de la naturaleza. Liteplex combina jengibre y limón para brindarte un alivio rápido contra la pesadez y la acidez, permitiéndote disfrutar de tus comidas con tranquilidad.'
    }
  },
  {
    id: 'maxlite-colageno',
    name: 'Maxlite',
    category: 'salud-bienestar',
    shortDescription: 'Nutrición Integral para Huesos y Piel.',
    description: '✔️ Cuidado de Articulaciones: Con colágeno y quinua para mantener tus huesos y articulaciones fuertes y sanos. ✔️ Piel y Cabello: Ayuda a mejorar la apariencia de la piel y fortalecer el cabello desde adentro. ✔️ Multivitamínico: Aporta las vitaminas esenciales para que tu cuerpo funcione con vitalidad.',
    seoTitle: 'Nutrición Integral para Huesos y Piel con Maxlite',
    seoDescription: '✔️ Cuidado de Articulaciones: Colágeno y quinua para huesos fuertes. Nutre piel y cabello con vitaminas esenciales. ¡Registro INVIMA!',
    benefits: [
      'Huesos y articulaciones fuertes',
      'Vitalidad para tu ritmo diario',
      'Piel más firme y elástica'
    ],
    image: '/assets/products/Maxlite.webp',
    basePrice: 89900,
    size: '700 g',
    invima: 'SD2017-0004051',
    keywords: 'colágeno ligera, quinua, articulaciones, piel firme, Maxlite, Zenhogar',
    components: 'Colágeno Hidrolizado, Quinua, Cereales Naturales, Vitaminas',
    longTailKeywords: [
      'mejor colágeno de alta absorción para deportistas',
      'cómo fortalecer las articulaciones sin sentir pesadez',
      'suplemento de colágeno ligero para el cuidado de la piel',
      'beneficios de Maxlite para el bienestar integral articular',
      'fórmula balanceada de colágeno hidrolizado premium',
      'bienestar integral y vitalidad con nutrición de tejidos',
      'cómo mejorar la movilidad articular con calidad certificada',
      'colágeno para el rendimiento físico diario',
      'suplemento natural para evitar el desgaste de cartílagos',
      'cuidado de la piel y articulaciones con ingredientes puros'
    ],
    seoFaqs: [
      { q: '¿Qué hace a Maxlite diferente de otros colágenos?', a: 'Su fórmula balanceada de alta absorción permite que los nutrientes lleguen más rápido a tus tejidos para un bienestar integral.' },
      { q: '¿Ayuda con el molestias articulares?', a: 'Sí, al nutrir el cartílago y las articulaciones, contribuye a una mejor movilidad y vitalidad.' },
      { q: '¿Se disuelve fácilmente?', a: 'Totalmente, está diseñado para una preparación rápida y sin grumos, garantizando calidad certificada.' }
    ],
    promos: [
      { id: '1u', label: '1 Unidad', units: 1, price: 89900 },
      { id: '2u', label: '2 Unidades', units: 2, price: 134850 },
      { id: '2x3', label: 'Pague 2 Lleve 3', units: 3, price: 179800, badge: '⭐ Recomendado' },
      { id: '3x5', label: 'Pague 3 Lleve 5', units: 5, price: 269700, badge: '🔥 Mejor Oferta' }
    ],
    testimonials: [
      { name: 'Andrés Felipe', text: 'Se disuelve súper fácil y no tiene sabor fuerte. Mis rodillas lo agradecen.', rating: 5 },
      { name: 'Claudia R.', text: 'Excelente absorción, he notado cambios en mi piel y cabello muy rápido.', rating: 5 }
    ],
    whyChoose: {
      title: 'Nutrición integral avanzada',
      description: 'En ZENHOGAR combinamos el colágeno con la fuerza de la quinua para ofrecerte una nutrición superior. Maxlite no solo cuida tus articulaciones, sino que te brinda la energía de los cereales naturales para que nada te detenga.'
    }
  },
  {
    id: 'megamac',
    name: 'Megamac',
    category: 'salud-bienestar',
    shortDescription: 'Energía Renovada y Vitalidad Física.',
    description: '✔️ Potencia Natural: Con Maca, Borojó y Chontaduro para combatir el cansancio y la debilidad diaria. ✔️ Energía Física: Ideal para personas que buscan un extra de fuerza y rendimiento en sus actividades. ✔️ Bienestar General: Ayuda a fortalecer las defensas y mantener el cerebro despierto y rápido.',
    seoTitle: 'Energía Renovada y Vitalidad Física con Megamac',
    seoDescription: '✔️ Potencia Natural: Maca, Borojó y Chontaduro. Combate el cansancio y fortalece tus defensas. ¡Calidad INVIMA!',
    benefits: [
      'Combate el cansancio crónico',
      'Mejora el rendimiento físico',
      'Fortalece defensas naturales',
      'Ideal para jornadas exigentes'
    ],
    image: '/assets/products/Megamac.webp',
    basePrice: 89900,
    size: '500 ml',
    invima: 'SD2014-0003213 (Registro en trámite)',
    keywords: 'energía extrema, vitalidad, rendimiento, Megamac, Zenhogar',
    components: 'Maca, Chontaduro, Borojó, Niacina, Hierro, Magnesio',
    longTailKeywords: [
      'mejor suplemento natural para el cansancio físico y mental',
      'cómo aumentar el rendimiento en días de alta exigencia',
      'suplemento para la vitalidad extrema y energía duradera',
      'beneficios de Megamac para el bienestar integral diario',
      'fórmula balanceada para combatir la fatiga crónica naturalmente',
      'bienestar integral y potencia con extractos revitalizantes',
      'cómo recuperar la energía perdida con calidad certificada',
      'suplemento para el rendimiento deportivo',
      'solución natural para el agotamiento y falta de concentración',
      'vitalidad renovada con ingredientes de alta pureza y eficacia'
    ],
    seoFaqs: [
      { q: '¿Megamac da energía inmediata?', a: 'Sí, su fórmula balanceada está diseñada para brindar un impulso de vitalidad cuando más lo necesitas.' },
      { q: '¿Lo pueden tomar personas con hipertensión?', a: 'Al ser un producto natural con calidad certificada es seguro, pero siempre recomendamos consultar a su médico.' },
      { q: '¿Contiene azúcar?', a: 'Nuestra fórmula prioriza el bienestar integral, evitando excesos de azúcares para una energía más limpia.' }
    ],
    promos: [
      { id: '1u', label: '1 Unidad', units: 1, price: 89900 },
      { id: '2u', label: '2 Unidades', units: 2, price: 134850 },
      { id: '2x3', label: 'Pague 2 Lleve 3', units: 3, price: 179800, badge: '⭐ Recomendado' },
      { id: '3x5', label: 'Pague 3 Lleve 5', units: 5, price: 269700, badge: '🔥 Mejor Oferta' }
    ],
    testimonials: [
      { name: 'Ricardo M.', text: 'Me da la energía que necesito para mis jornadas largas de trabajo. Muy efectivo.', rating: 5 },
      { name: 'Sofía L.', text: 'Excelente para el rendimiento físico. Me siento con mucha más vitalidad.', rating: 5 }
    ],
    whyChoose: {
      title: 'Vitalidad extrema sin límites',
      description: 'En ZENHOGAR estamos comprometidos con tu salud, ofrecemos productos con registro INVIMA de alto rendimiento. Megamac combate el agotamiento físico y mental gracias al Borojó, Chontaduro y Maca. Energía pura y segura con calidad certificada.'
    }
  },
  {
    id: 'resveratrol',
    name: 'Resveratrol',
    category: 'salud-bienestar',
    shortDescription: 'El poder del resveratrol.',
    description: 'Potente antioxidante para el cuidado celular y antienvejecimiento.',
    seoTitle: 'Cómo solucionar el envejecimiento prematuro y daño celular con Resveratrol',
    seoDescription: 'Protege tus células con el poder del Resveratrol. Fórmula balanceada antioxidante para bienestar integral y calidad certificada. ¡Compra ahora!',
    benefits: ['Antioxidante', 'Cuidado celular', 'Antiedad'],
    image: '/assets/products/Resveratrol.webp',
    basePrice: 79900,
    size: '500 ml',
    invima: 'SD2014-0003215',
    keywords: 'resveratrol, antioxidante, antiedad, cuidado celular, Zenhogar',
    components: 'Colágeno, Crema de Coco, Resveratrol Puro, Vitamina C',
    longTailKeywords: [
      'mejor antioxidante natural para promover la vitalidad celular',
      'cómo proteger las células del daño oxidativo con resveratrol',
      'suplemento de resveratrol líquido para máxima absorción',
      'beneficios del resveratrol para el bienestar integral y piel',
      'fórmula balanceada antiedad con ingredientes naturales',
      'bienestar integral y longevidad con calidad certificada',
      'cómo mejorar la salud cardiovascular con resveratrol puro',
      'suplemento para el cuidado celular diario',
      'solución natural para combatir los radicales libres efectivamente',
      'salud y juventud celular con ingredientes de alta pureza'
    ],
    seoFaqs: [
      { q: '¿Qué beneficios tiene el Resveratrol para la piel?', a: 'Ayuda a combatir los radicales libres, promoviendo una piel más joven y un bienestar integral celular.' },
      { q: '¿Es mejor en líquido o en cápsulas?', a: 'Nuestra presentación líquida con fórmula balanceada asegura una absorción superior y resultados más rápidos.' },
      { q: '¿Lo pueden tomar jóvenes?', a: 'Es excelente como preventivo para mantener el equilibrio natural y la vitalidad desde temprana edad.' }
    ],
    promos: [
      { id: '1u', label: '1 Unidad', units: 1, price: 79900 },
      { id: '2u', label: '2 Unidades', units: 2, price: 119850 },
      { id: '2x3', label: 'Pague 2 Lleve 3', units: 3, price: 159800, badge: '⭐ Recomendado' },
      { id: '3x5', label: 'Pague 3 Lleve 5', units: 5, price: 239700, badge: '🔥 Mejor Oferta' }
    ],
    testimonials: [
      { name: 'Elena P.', text: 'Siento mi piel mucho más joven y con más vida. Es un antioxidante increíble.', rating: 5 },
      { name: 'Mauricio G.', text: 'Me ayuda a sentirme con más vitalidad durante el día. Muy recomendado.', rating: 5 }
    ],
    whyChoose: {
      title: 'Protección celular avanzada',
      description: 'En ZENHOGAR estamos comprometidos con tu salud, ofrecemos productos con registro INVIMA para un bienestar integral. El Resveratrol protege tus células del envejecimiento prematuro y mejora la salud cardiovascular. Calidad certificada y antioxidante de alta pureza.'
    }
  },
  {
    id: 'eventone',
    name: 'Eventone',
    category: 'belleza-integral',
    shortDescription: 'Hidratación Intensa y Firmeza Facial.',
    description: '✔️ Efecto Relleno: Ayuda a que la piel retenga su humedad natural, suavizando las líneas de expresión. ✔️ Firmeza Real: Fortalece la estructura del rostro para que luzca más joven y terso. ✔️ Calma la Piel: Con extracto de Manzanilla que alivia la irritación y mejora la textura diaria.',
    seoTitle: 'Hidratación Intensa y Firmeza Facial con Eventone',
    seoDescription: '✔️ Efecto Relleno: Retiene la humedad y suaviza líneas. Firmeza real para un rostro joven con Manzanilla. ¡Calidad INVIMA!',
    benefits: [
      'Rellenado natural de líneas finas',
      'Piel facial más tersa y elástica',
      'Alivia irritaciones con manzanilla',
      'Aspecto visiblemente más joven'
    ],
    image: '/assets/products/Eventone.webp',
    basePrice: 85000,
    size: '50 ml',
    invima: 'NSOC90432-19CO',
    keywords: 'unificar tono piel, atenuar irregularidades de tono, piel radiante, brillo natural, manchas osapoyas, Eventone, Zenhogar',
    components: 'Bioretinol, Ácido hialurónico, Colágeno, Vitamina C',
    longTailKeywords: [
      'mejor crema para unificar el tono de la piel y atenuar irregularidades de tono',
      'cómo devolver el brillo natural al rostro de forma segura',
      'cuidado para reducir manchas osapoyas con ingredientes naturales',
      'beneficios de Eventone para una piel radiante y descansada',
      'fórmula suave para unificar el tono sin irritar la piel',
      'bienestar integral cutáneo con registro INVIMA certificado',
    ],
    seoFaqs: [
      { q: '¿En cuánto tiempo veo resultados con Eventone?', a: 'Con el uso nocturno constante, notarás un tono más uniforme y piel radiante en las primeras semanas de bienestar integral.' },
      { q: '¿Se puede usar en todo tipo de piel?', a: 'Sí, su fórmula balanceada está diseñada para ser respetuosa y suave con todo tipo de cutis, garantizando calidad certificada.' },
      { q: '¿Ayuda con las manchas de sol?', a: 'Efectivamente, está enfocada en reducir la apariencia de manchas osapoyas causadas por el sol y el tiempo.' }
    ],
    promos: [
      { id: '1u', label: '1 Unidad', units: 1, price: 85000 },
      { id: '2u', label: '2 Unidades', units: 2, price: 127500 },
      { id: '2x3', label: 'Pague 2 Lleve 3', units: 3, price: 170000, badge: '⭐ Recomendado' },
      { id: '3x5', label: 'Pague 3 Lleve 5', units: 5, price: 255000, badge: '🔥 Mejor Oferta' }
    ],
    testimonials: [
      { name: 'Carolina V.', text: 'Tenía unas manchas de sol muy marcadas y Eventone las ha aclarado muchísimo.', rating: 5 },
      { name: 'Sonia M.', text: 'Mi rostro se ve con un tono mucho más parejo. Estoy muy feliz con los resultados.', rating: 5 }
    ],
    whyChoose: {
      title: 'Ritual de Belleza y Salud',
      description: 'En ZENHOGAR transformamos lo cotidiano en extraordinario. Eventone combina hidratación profunda con el poder calmante de la manzanilla para que tu piel recupere su elasticidad y luzca radiante, brindándote un aspecto descansado y joven cada día.'
    }
  },
  {
    id: 'golden-passion',
    name: 'Golden Passion',
    category: 'belleza-integral',
    shortDescription: 'Bronceado Natural sin necesidad de Sol.',
    description: '✔️ Color Saludable: Logra un tono canela envidiable en pocas horas sin arriesgar tu piel a los rayos del sol. ✔️ Sin Manchas: Su fórmula de rápida absorción asegura un color uniforme en todo el cuerpo. ✔️ Rico en Vitaminas: Contiene vitamina E para hidratar la piel mientras luce un color radiante.',
    seoTitle: 'Bronceado Natural sin necesidad de Sol con Golden Passion',
    seoDescription: '✔️ Color Saludable: Tono canela sin sol. Sin manchas y rico en Vitamina E para una piel radiante. ¡Registro INVIMA!',
    benefits: [
      'Tono canela uniforme en horas',
      'Sin riesgos por exposición al sol',
      'Nutre e hidrata con Vitamina E',
      'Folleto de aplicación fácil incluido'
    ],
    image: '/assets/products/Goldenpassion.webp',
    basePrice: 79900,
    size: '100 ml',
    invima: 'SD2019-0004381 (Registro en trámite)',
    keywords: 'autobronceador, brillo piel, nutrición profunda, Golden Passion, Zenhogar',
    components: 'DHA Natural, Aceite de Almendras, Partículas de Oro, Vitamina E',
    longTailKeywords: [
      'mejor aceite corporal para un brillo dorado natural',
      'cómo nutrir la piel seca y darle luminosidad',
      'cuidado premium para una piel radiante y suave',
      'beneficios de Golden Passion para el bienestar integral cutáneo',
      'fórmula balanceada para una nutrición profunda de la piel',
      'bienestar integral y vitalidad con brillo saludable',
      'cómo mejorar la textura de la piel con calidad certificada',
      'aceite para el cuidado corporal diario',
      'ritual de belleza natural para una piel luminosa y joven',
      'nutrición intensa con ingredientes de alta pureza y brillo'
    ],
    seoFaqs: [
      { q: '¿Golden Passion deja la piel grasosa?', a: 'No, su fórmula balanceada se absorbe rápidamente dejando un brillo natural y bienestar integral.' },
      { q: '¿Se puede usar en el rostro?', a: 'Está diseñado principalmente para el cuerpo, brindando una nutrición profunda y textura suave.' },
      { q: '¿Tiene aroma?', a: 'Sí, posee una fragancia delicada que complementa tu ritual de vitalidad y cuidado diario.' }
    ],
    promos: [
      { id: '1u', label: '1 Unidad', units: 1, price: 79900 },
      { id: '2u', label: '2 Unidades', units: 2, price: 119850 },
      { id: '2x3', label: 'Pague 2 Lleve 3', units: 3, price: 159800, badge: '⭐ Recomendado' },
      { id: '3x5', label: 'Pague 3 Lleve 5', units: 5, price: 239700, badge: '🔥 Mejor Oferta' }
    ],
    testimonials: [
      { name: 'Isabel C.', text: 'Deja un brillo hermoso en la piel sin ser grasoso. Huele delicioso.', rating: 5 },
      { name: 'Marta L.', text: 'Me encanta cómo deja mi piel de suave y nutrida. Es mi favorito.', rating: 5 }
    ],
    whyChoose: {
      title: 'Nutrición dorada para tu piel',
      description: 'En ZENHOGAR estamos comprometidos con tu salud, ofrecemos productos con registro INVIMA de cuidado premium. Golden Passion nutre profundamente la piel seca y aporta un brillo saludable con Aceite de Argán y Vitamina E. Calidad certificada para tu brillo natural.'
    }
  },
  {
    id: 'hydrastrik',
    name: 'Hydrastrik',
    category: 'belleza-integral',
    shortDescription: 'Hidratación Profunda contra las Estrías.',
    description: '✔️ Piel Elástica: Mezcla aceites de coco, almendras y aguacate que preparan la piel para evitar estiramientos bruscos. ✔️ Regeneración Celular: Ayuda a mejorar la textura de la piel, haciéndola sentir más suave y flexible. ✔️ Uso Versátil: Perfecto para masajes relajantes gracias a su agradable sensación sensorial.',
    seoTitle: 'Hidratación Profunda contra las Estrías con Hydrastrik',
    seoDescription: '✔️ Piel Elástica: Aceites de coco y aguacate. Regeneración celular para una piel suave y flexible. ¡Registro INVIMA!',
    benefits: [
      'Previene la aparición de estrías',
      'Mejora elasticidad de la piel',
      'Mezcla de aceites naturales puros',
      'Perfecto para masajes corporales'
    ],
    image: '/assets/products/Hydrastrik.webp',
    basePrice: 82500,
    size: '50 ml',
    invima: 'PSA-002341-2019 (Registro en trámite)',
    keywords: 'hidratación intensiva, piel seca, fresapoya, Hydrastrik, Zenhogar',
    components: 'Aceites naturales de Almendras, Semillas de Uva, Ácido Hialurónico, Aloe Vera',
    longTailKeywords: [
      'mejor crema hidratante para piel muy seca y sensible',
      'cómo mantener la piel hidratada durante 24 horas',
      'cuidado para recuperar la elasticidad de la piel naturalmente',
      'beneficios de Hydrastrik para el bienestar integral facial',
      'fórmula balanceada para una hidratación profunda y fresca',
      'bienestar integral y vitalidad cutánea con hidratación intensa',
      'cómo calmar la sed de la piel con calidad certificada',
      'crema para el cuidado de pieles secas',
      'solución natural para la descamación y falta de humedad',
      'hidratación facial segura con ingredientes de alta pureza'
    ],
    seoFaqs: [
      { q: '¿Hydrastrik sirve para pieles grasas?', a: 'Sí, su fórmula balanceada hidrata sin obstruir poros, manteniendo el equilibrio natural y vitalidad.' },
      { q: '¿Se puede usar bajo el maquillaje?', a: 'Es una excelente base hidratante que deja la piel elástica y lista para el bienestar integral diario.' },
      { q: '¿Contiene alcohol?', a: 'No, priorizamos ingredientes suaves con calidad certificada para no irritar la piel sensible.' }
    ],
    promos: [
      { id: '1u', label: '1 Unidad', units: 1, price: 82500 },
      { id: '2u', label: '2 Unidades', units: 2, price: 123750 },
      { id: '2x3', label: 'Pague 2 Lleve 3', units: 3, price: 165000, badge: '⭐ Recomendado' },
      { id: '3x5', label: 'Pague 3 Lleve 5', units: 5, price: 247500, badge: '🔥 Mejor Oferta' }
    ],
    testimonials: [
      { name: 'Daniela F.', text: 'Mi piel estaba muy seca y Hydrastrik le devolvió la vida. Muy fresca.', rating: 5 },
      { name: 'Andrea P.', text: 'Se absorbe rápido y deja la piel súper hidratada todo el día.', rating: 5 }
    ],
    whyChoose: {
      title: 'Hidratación profunda 24h',
      description: 'En ZENHOGAR estamos comprometidos con tu salud, ofrecemos productos con registro INVIMA para hidratación intensiva. Hydrastrik restaura la elasticidad en pieles deshidratadas con Ácido Hialurónico y Aloe Vera. Fresapoya inmediata con calidad certificada.'
    }
  },
  {
    id: 'miskinne',
    name: 'Miskinne',
    category: 'belleza-integral',
    shortDescription: 'Piel Uniforme y Libre de Manchas.',
    description: '✔️ Tono Parejo: Ayuda a reducir visiblemente las manchas causadas por el sol, la edad o cicatrices previas. ✔️ Protección y Cuidado: Actúa de forma suave para evitar que aparezcan nuevas zonas osapoyas en la piel. ✔️ Aroma Natural: Con un suave toque de avena que deja una sensación de limpieza y confort.',
    seoTitle: 'Piel Uniforme y Libre de Manchas con Miskinne',
    seoDescription: '✔️ Tono Parejo: Reduce manchas de sol y edad. Protección suave con aroma natural a avena. ¡Registro INVIMA!',
    benefits: [
      'Reduce manchas de sol y edad',
      'Ayuda a proteger contra nuevas alteraciones de tono',
      'Sensación de limpieza con avena',
      'Cuidado suave y seguro'
    ],
    image: '/assets/products/Miskinne.webp',
    basePrice: 59900,
    size: '200 ml',
    invima: 'NSOC85321-18CO',
    keywords: 'cuidado piel, suavidad, protección diaria, Miskinne, Zenhogar',
    components: 'Avena, Caléndula, Manteca de Karité, Vitamina E',
    longTailKeywords: [
      'mejor crema corporal para pieles delicadas y sensibles',
      'cómo proteger la piel de las agresiones diarias naturalmente',
      'cuidado para mantener la suavidad extrema de la piel',
      'beneficios de Miskinne para el bienestar integral corporal',
      'fórmula balanceada con ingredientes naturales para el cuidado diario',
      'bienestar integral y vitalidad con una piel siempre joven',
      'cómo mejorar la salud cutánea con calidad certificada',
      'crema para el cuidado de toda la familia',
      'solución natural para la piel áspera y falta de fresapoya',
      'protección cutánea segura con ingredientes de alta pureza'
    ],
    seoFaqs: [
      { q: '¿Miskinne es apta para niños?', a: 'Sí, su fórmula balanceada y natural es ideal para el cuidado delicado de toda la familia.' },
      { q: '¿Ayuda con la resequedad extrema?', a: 'Efectivamente, proporciona una protección diaria que devuelve la suavidad y bienestar integral.' },
      { q: '¿Tiene un olor fuerte?', a: 'Posee un aroma suave y natural que respeta tu equilibrio natural y vitalidad.' }
    ],
    promos: [
      { id: '1u', label: '1 Unidad', units: 1, price: 59900 },
      { id: '2u', label: '2 Unidades', units: 2, price: 89850 },
      { id: '2x3', label: 'Pague 2 Lleve 3', units: 3, price: 119800, badge: '⭐ Recomendado' },
      { id: '3x5', label: 'Pague 3 Lleve 5', units: 5, price: 179700, badge: '🔥 Mejor Oferta' }
    ],
    testimonials: [
      { name: 'Laura B.', text: 'Es la única crema que no irrita mi piel sensible. La deja súper suave.', rating: 5 },
      { name: 'Mónica T.', text: 'Me encanta el aroma tan natural que tiene. Hidrata muy bien sin ser pegajosa.', rating: 5 }
    ],
    whyChoose: {
      title: 'Suavidad para pieles sensibles',
      description: 'En ZENHOGAR estamos comprometidos con tu salud, ofrecemos productos con registro INVIMA de fórmula gentil. Miskinne alivia la irritación y resequedad extrema con Avena y Caléndula. Protección diaria y segura con calidad certificada.'
    }
  },
  {
    id: 'tonico-capilar',
    name: 'Tónico Capilar (Extractos Mágicos)',
    category: 'belleza-integral',
    shortDescription: 'Fortalece y Estimula el Crecimiento de tu Cabello.',
    description: '✔️ Cabello más fuerte: Su fórmula avanzada ayuda a recuperar el vigor desde la raíz, evitando que se quiebre o se caiga. ✔️ Nacimiento de nuevo cabello: Ideal para poblar zonas delgadas en el cuero cabelludo, cejas o barba. ✔️ Nutrición Herbal: Contiene una mezcla de 16 extractos de plantas que mantienen el cabello sano y brillante.',
    seoTitle: 'Fortalece y Estimula el Crecimiento Capilar con Tónico Capilar',
    seoDescription: '✔️ Cabello más fuerte: Recupera el vigor desde la raíz. Nutrición herbal con 16 extractos para brillo y fuerza. ¡Registro INVIMA!',
    benefits: [
      'Evita que el cabello se quiebre',
      'Puebla zonas con poco vello',
      'Nutrición profunda desde la raíz',
      'Resultados en cabello, cejas o barba'
    ],
    image: '/assets/products/tonico.webp',
    basePrice: 89900,
    size: '120 ml',
    invima: 'NSOC02559-20CO',
    keywords: 'caída cabello, crecimiento capilar, fortalecer raíz, tónico capilar, Zenhogar',
    components: 'Minoxidil Natural, Romero, Quina, Ortiga, Biotina',
    longTailKeywords: [
      'mejor tónico capilar para evitar la caída del cabello',
      'cómo estimular el crecimiento del cabello de forma natural',
      'cuidado para fortalecer la raíz del pelo y dar brillo',
      'beneficios del tónico capilar para el bienestar integral del cuero cabelludo',
      'fórmula balanceada para un cabello más fuerte y sedoso',
      'bienestar integral y vitalidad capilar con calidad certificada',
      'cómo recuperar el volumen del cabello con ingredientes naturales',
      'tónico para el cuidado capilar diario',
      'solución natural para el cabello débil y quebradizo',
      'crecimiento saludable del cabello con ingredientes de alta pureza'
    ],
    seoFaqs: [
      { q: '¿Cada cuánto debo aplicar el tónico capilar?', a: 'Se recomienda su uso diario para que la fórmula balanceada nutra la raíz y promueva el bienestar integral.' },
      { q: '¿Deja el cabello grasoso?', a: 'No, su textura ligera se absorbe rápidamente sin afectar el brillo y vitalidad natural.' },
      { q: '¿Sirve para hombres y mujeres?', a: 'Es un cuidado de calidad certificada efectivo para cualquier persona que busque fortalecer su cabello.' }
    ],
    promos: [
      { id: '1u', label: '1 Unidad', units: 1, price: 89900 },
      { id: '2u', label: '2 Unidades', units: 2, price: 134850 },
      { id: '2x3', label: 'Pague 2 Lleve 3', units: 3, price: 179800, badge: '⭐ Recomendado' },
      { id: '3x5', label: 'Pague 3 Lleve 5', units: 5, price: 269700, badge: '🔥 Mejor Oferta' }
    ],
    testimonials: [
      { name: 'Andrés S.', text: 'He notado que se me cae mucho menos el cabello y se siente más grueso.', rating: 5 },
      { name: 'Liliana M.', text: 'Me ha ayudado a que me crezca cabello nuevo en las zonas donde tenía poco. Muy efectivo.', rating: 5 }
    ],
    whyChoose: {
      title: 'Fortalece tu cabello desde la raíz',
      description: 'En ZENHOGAR estamos comprometidos con tu salud, ofrecemos productos con registro INVIMA para el cuidado capilar. Nuestro Tónico ayuda a fortalecer la fibra capilar y estimula el crecimiento saludable con Romero, Quina y Biotina. Calidad certificada para tu volumen capilar.'
    }
  },
  {
    id: 'tufoff',
    name: 'Tufoff',
    category: 'belleza-integral',
    shortDescription: 'Refresca el aliento al instante.',
    description: 'Producto especializado que refresca el aliento al instante con sabores naturales de menta, canela y naranja.',
    seoTitle: 'Cómo solucionar el mal aliento al instante con Tufoff',
    seoDescription: 'Refresca tu aliento al instante con Tufoff. Sabores naturales de menta, canela y naranja para tu bienestar integral. ¡Siéntete seguro siempre!',
    benefits: ['Aliento fresco', 'Sabores naturales', 'Acción inmediata'],
    image: '/assets/products/Tuffof.webp',
    basePrice: 85000,
    size: '250 ml',
    invima: 'PSA-000627-2016 (Registro en trámite)',
    keywords: 'mal aliento, fresapoya bucal, menta canela, Tufoff, Zenhogar',
    components: 'Extractos naturales de Menta, Canela y Naranja',
    longTailKeywords: [
      'mejor producto para controlar el olor corporal eficazmente',
      'cómo mantener la fresapoya durante todo el día naturalmente',
      'cuidado para una limpieza profunda y cuidado suave',
      'beneficios de Tufoff para el bienestar integral e higiene',
      'fórmula balanceada para una sensación de frescura duradera',
      'bienestar integral y vitalidad con higiene',
      'cómo mejorar la confianza personal con calidad certificada',
      'producto para el cuidado personal diario',
      'solución natural para el mal olor y falta de higiene',
      'fresapoya total y segura con ingredientes de alta pureza'
    ],
    seoFaqs: [
      { q: '¿Tufoff es un desodorante?', a: 'Es un producto de limpieza profunda que complementa tu higiene para un bienestar integral y fresapoya duradera.' },
      { q: '¿Se puede usar en zonas sensibles?', a: 'Su fórmula balanceada es de cuidado suave, pero siempre recomendamos probar en una pequeña zona.' },
      { q: '¿Cuánto dura el efecto?', a: 'Brinda una sensación de vitalidad y fresapoya que te acompaña durante tus actividades diarias.' }
    ],
    promos: [
      { id: '1u', label: '1 Unidad', units: 1, price: 85000 },
      { id: '2u', label: '2 Unidades', units: 2, price: 127500 },
      { id: '2x3', label: 'Pague 2 Lleve 3', units: 3, price: 170000, badge: '⭐ Recomendado' },
      { id: '3x5', label: 'Pague 3 Lleve 5', units: 5, price: 255000, badge: '🔥 Mejor Oferta' }
    ],
    testimonials: [
      { name: 'Ricardo J.', text: 'Me da una sensación de frescura increíble que dura todo el día. Muy recomendado.', rating: 5 },
      { name: 'Andrés F.', text: 'Excelente para la higiene diaria, se siente la limpieza profunda desde el primer uso.', rating: 5 }
    ],
    whyChoose: {
      title: 'Limpieza y fresapoya garantizada',
      description: 'En ZENHOGAR estamos comprometidos con tu salud, ofrecemos productos con registro INVIMA de higiene superior. Tufoff elimina el mal de olor y brinda fresapoya duradera con Mentol y Eucalipto. Calidad certificada para tu seguridad y confianza diaria.'
    }
  },
  // Salud Sexual
  {
    id: 'akha',
    name: 'Akha (Crema Voluminizante)',
    category: 'salud-sexual',
    shortDescription: 'Mejora la Apariencia y Firmeza de la Piel.',
    description: '✔️ Piel con más Cuerpo: Su alto poder hidratante ayuda a que la piel se vea más rellena y saludable. ✔️ Efecto Antioxidante: Protege la piel del envejecimiento, mejorando su elasticidad en zonas específicas del cuerpo. ✔️ Para Toda Piel: Una crema suave que se absorbe rápido y no genera grasa.',
    seoTitle: 'Mejora la Apariencia y Firmeza de la Piel con Akha',
    seoDescription: '✔️ Piel con más Cuerpo: Hidratación para una piel sana. Efecto antioxidante y elasticidad sin grasa. ¡Registro INVIMA!',
    benefits: [
      'Piel visiblemente más saludable',
      'Protege contra el envejecimiento',
      'Absorción veloz sin sensación grasa',
      'Elasticidad mejorada en todo el cuerpo'
    ],
    image: '/assets/products/akha.webp',
    basePrice: 89900,
    size: '120 ml',
    invima: 'SD2021-0004610 (Registro en trámite)',
    keywords: 'botox natural, voluminizante, firmeza, Akha, Zenhogar',
    components: 'Extracto de Acmella Oleracea, Maca, Ginseng, Zinc, L-Arginina',
    longTailKeywords: [
      'mejor suplemento natural para la potencia y energía masculina',
      'cómo mejorar el rendimiento físico de forma natural y segura',
      'suplemento para la vitalidad natural y energía diaria',
      'beneficios de Akha para el bienestar integral masculino',
      'fórmula balanceada para potenciar el rendimiento y la fuerza',
      'bienestar integral y vitalidad con ingredientes',
      'cómo recuperar la chispa natural con calidad certificada',
      'suplemento para la salud sexual masculina',
      'solución natural para la falta de energía y bajo rendimiento',
      'potencia y vitalidad segura con ingredientes de alta pureza'
    ],
    seoFaqs: [
      { q: '¿Akha es un producto natural?', a: 'Sí, su fórmula balanceada utiliza extractos naturales para promover un bienestar integral y vitalidad.' },
      { q: '¿Cuánto tiempo antes debo tomarlo?', a: 'Se recomienda un consumo constante diario para mantener un equilibrio natural y rendimiento óptimo.' },
      { q: '¿Tiene efectos secundarios?', a: 'Es un suplemento de calidad certificada diseñado para ser seguro bajo las dosis recomendadas.' }
    ],
    promos: [
      { id: '1u', label: '1 Unidad', units: 1, price: 89900 },
      { id: '2u', label: '2 Unidades', units: 2, price: 134850 },
      { id: '2x3', label: 'Pague 2 Lleve 3', units: 3, price: 179800, badge: '⭐ Recomendado' },
      { id: '3x5', label: 'Pague 3 Lleve 5', units: 5, price: 269700, badge: '🔥 Mejor Oferta' }
    ],
    testimonials: [
      { name: 'Gabriel M.', text: 'He sentido un aumento significativo en mi energía diaria. Muy buen producto natural.', rating: 5 },
      { name: 'Javier R.', text: 'Excelente para mejorar el rendimiento físico. Me siento con mucha más vitalidad.', rating: 5 }
    ],
    whyChoose: {
      title: 'Potencia tu vitalidad natural',
      description: 'En ZENHOGAR estamos comprometidos con tu salud, ofrecemos productos con registro INVIMA de alto desempeño. Akha ayuda a recuperar el rendimiento y la energía masculina mediante Maca, Ginseng y Zinc. Confianza y vitalidad con calidad certificada.'
    }
  },
  {
    id: 'derman',
    name: 'Derman (Mascarilla Íntima)',
    category: 'salud-sexual',
    shortDescription: 'Higiene y Protección para tu Zona Íntima.',
    description: '✔️ Adiós a la Irritación: Calma la piel después de la depilación o el afeitado, evitando brotes o molestias. ✔️ Protección Natural: Ayuda a mantener el equilibrio y la salud de la piel en áreas delicadas. ✔️ Hidratación Especializada: Mantiene la zona suave y flexible, promoviendo el confort diario.',
    seoTitle: 'Higiene y Protección para tu Zona Íntima con Derman',
    seoDescription: '✔️ Adiós a la Irritación: Calma tras depilación. Protección natural y suavidad para el confort diario. ¡Registro INVIMA!',
    benefits: [
      'Calma la piel post-depilación',
      'Mantiene equilibrio en zonas íntimas',
      'Evita brotes e irritaciones',
      'Promueve el confort diario'
    ],
    image: '/assets/products/Derman.webp',
    basePrice: 89900,
    size: '120 ml',
    invima: 'NSOC12034-22CO (Registro en trámite)',
    keywords: 'bienestar íntimo, arginina, ácido salicílico, salud íntima, Derman, Zenhogar',
    components: 'Ácido Salicílico, Arginina, Ácido Láctico, Caléndula, Aloe Vera',
    longTailKeywords: [
      'mejor producto natural para el cuidado íntimo femenino',
      'cómo mejorar el bienestar íntimo de forma segura y suave',
      'cuidado para mantener la fresapoya y salud sexual natural',
      'beneficios de Derman para el bienestar integral íntimo',
      'fórmula balanceada para el cuidado delicado de la mujer',
      'bienestar integral y vitalidad en momentos de intimidad',
      'cómo recuperar la confianza íntima con calidad certificada',
      'producto para la higiene íntima diaria',
      'solución natural para la irritación y falta de confort íntimo',
      'salud íntima segura con ingredientes de alta pureza y suavidad'
    ],
    seoFaqs: [
      { q: '¿Derman altera el pH natural?', a: 'No, su fórmula balanceada está diseñada para respetar tu equilibrio natural y bienestar integral.' },
      { q: '¿Se puede usar diariamente?', a: 'Sí, es ideal para tu rutina de cuidado suave y protección diaria con calidad certificada.' },
      { q: '¿Contiene fragancias fuertes?', a: 'Posee un aroma muy sutil y natural para brindar frescura sin irritar tus zonas más delicadas.' }
    ],
    promos: [
      { id: '1u', label: '1 Unidad', units: 1, price: 89900 },
      { id: '2u', label: '2 Unidades', units: 2, price: 134850 },
      { id: '2x3', label: 'Pague 2 Lleve 3', units: 3, price: 179800, badge: '⭐ Recomendado' },
      { id: '3x5', label: 'Pague 3 Lleve 5', units: 5, price: 269700, badge: '🔥 Mejor Oferta' }
    ],
    testimonials: [
      { name: 'Mariana L.', text: 'Me brinda una frescura y seguridad única. Es muy suave con la piel.', rating: 5 },
      { name: 'Sofía C.', text: 'Excelente para el cuidado íntimo diario. Me siento muy cómoda usándolo.', rating: 5 }
    ],
    whyChoose: {
      title: 'Cuidado íntimo suave y seguro',
      description: 'En ZENHOGAR estamos comprometidos con tu salud, ofrecemos productos con registro INVIMA de extrema suavidad. Derman protege y refresca tu zona íntima con Caléndula, Aloe Vera y Manzanilla. Bienestar integral con calidad certificada.'
    }
  },
  {
    id: 'haydar',
    name: 'Haydar (Bebida Energizante)',
    category: 'salud-sexual',
    shortDescription: 'Energía y Vitalidad en un Solo Sorbo.',
    description: '✔️ Impulso Natural: Con Borojó y Maca que te dan ese ánimo extra que necesitas antes de una actividad importante. ✔️ Mente Despierta: Contiene vitaminas del complejo B que ayudan a mantener la concentración y el enfoque. ✔️ Sabor Refrescante: Disfruta de un delicioso sabor a mora azul sin necesidad de grandes volúmenes de líquido.',
    seoTitle: 'Energía y Vitalidad en un Solo Sorbo con Haydar',
    seoDescription: '✔️ Impulso Natural: Borojó y Maca para el ánimo extra. Vitaminas B para enfoque y sabor mora azul. ¡Registro INVIMA!',
    benefits: [
      'Impulso de ánimo con maca y borojó',
      'Máximo enfoque y concentración',
      'Delicioso sabor a mora azul',
      'Fácil de llevar y consumir'
    ],
    image: '/assets/products/haydar.webp',
    basePrice: 73500,
    size: '60 Cápsulas',
    invima: 'NSOC13456-23CO (Registro en trámite)',
    keywords: 'vitalidad extra, ánimo, rendimiento, Haydar, Zenhogar',
    components: 'Guaraná, Chontaduro, Borojó, Vitaminas B1, B6, B12',
    longTailKeywords: [
      'mejor suplemento natural para el rendimiento superior masculino',
      'cómo mantener la energía constante durante todo el día',
      'suplemento para la vitalidad y potencia de forma natural',
      'beneficios de Haydar para el bienestar integral y rendimiento',
      'fórmula balanceada para potenciar la energía física y mental',
      'bienestar integral y vitalidad con ingredientes',
      'cómo mejorar el desempeño diario con calidad certificada',
      'suplemento para la salud masculina integral',
      'solución natural para el cansancio y bajo rendimiento sexual',
      'energía y vitalidad segura con ingredientes de alta pureza'
    ],
    seoFaqs: [
      { q: '¿Haydar da energía para todo el día?', a: 'Sí, su fórmula balanceada brinda un flujo de energía constante para tu bienestar integral y vitalidad.' },
      { q: '¿Cómo se recomienda tomarlo?', a: 'Se sugiere una cápsula diaria para mantener un equilibrio natural y rendimiento superior.' },
      { q: '¿Es un producto seguro?', a: 'Totalmente, es un suplemento con calidad certificada diseñado para el hombre moderno.' }
    ],
    promos: [
      { id: '1u', label: '1 Unidad', units: 1, price: 73500 },
      { id: '2u', label: '2 Unidades', units: 2, price: 110250 },
      { id: '2x3', label: 'Pague 2 Lleve 3', units: 3, price: 147000, badge: '⭐ Recomendado' },
      { id: '3x5', label: 'Pague 3 Lleve 5', units: 5, price: 220500, badge: '🔥 Mejor Oferta' }
    ],
    testimonials: [
      { name: 'Mauricio L.', text: 'He notado una gran diferencia en mi rendimiento diario. Muy efectivo y natural.', rating: 5 },
      { name: 'Carlos P.', text: 'Me da la energía necesaria para mis actividades más exigentes. Excelente calidad.', rating: 5 }
    ],
    whyChoose: {
      title: 'Rendimiento superior diario',
      description: 'En ZENHOGAR estamos comprometidos con tu salud, ofrecemos productos con registro INVIMA para vitalidad masculina. Haydar potencia tu energía física y mental gracias al Guaraná, Chontaduro y Borojó. Calidad certificada para tu desempeño diario.'
    }
  },
  {
    id: 'instant-virgin',
    name: 'Instant Virgin (Gel Íntimo)',
    category: 'salud-sexual',
    shortDescription: 'Confianza y Revitalización Íntima.',
    description: '✔️ Firmeza y Tonificación: Proporciona una sensación de tono y frescura inmediata en la zona íntima. ✔️ Cuidado Delicado: Formulado para hidratar y proteger la piel sensible, mejorando la comodidad y el bienestar. ✔️ Seguridad Total: Un gel discreto diseñado para fortalecer la confianza en los momentos más importantes.',
    seoTitle: 'Confianza y Revitalización Íntima con Instant Virgin',
    seoDescription: '✔️ Firmeza y Tonificación: Contracción y fresapoya inmediata. Cuidado delicado y seguro para tu confianza. ¡Registro INVIMA!',
    benefits: [
      'Sensación inmediata de fresapoya',
      'Protege y cuida la piel sensible',
      'Fortalece la seguridad íntima',
      'Textura en gel de absorción rápida'
    ],
    image: '/assets/products/Instantvirgin.webp',
    basePrice: 79000,
    size: '50 ml',
    invima: 'NSOC78912-17CO (Registro en trámite)',
    keywords: 'confianza femenina, bienestar íntimo, salud sexual mujer, Instant Virgin, Zenhogar',
    components: 'Extracto de Hamamelis, Alumbre, Aloe Vera, Vitamina E',
    longTailKeywords: [
      'mejor producto para recuperar la confianza femenina naturalmente',
      'cómo mejorar el bienestar íntimo y plenitud de la mujer',
      'cuidado especializado para la salud sexual femenina',
      'beneficios de Instant Virgin para el bienestar integral íntimo',
      'fórmula balanceada para el cuidado y confort de la mujer',
      'bienestar integral y vitalidad en la vida íntima femenina',
      'cómo sentirse plena y segura con calidad certificada',
      'producto para el cuidado íntimo especializado',
      'solución natural para la falta de confianza y bienestar sexual',
      'salud femenina segura con ingredientes de alta pureza y eficacia'
    ],
    seoFaqs: [
      { q: '¿Instant Virgin es de uso externo?', a: 'Sí, su aplicación es externa y está diseñada para brindar bienestar integral y confianza femenina.' },
      { q: '¿Cuánto tiempo dura el efecto?', a: 'Proporciona una sensación de confort y vitalidad que te permite vivir tu plenitud con seguridad.' },
      { q: '¿Es compatible con otros productos?', a: 'Su fórmula balanceada es gentil, pero siempre recomendamos consultar si usas cuidados específicos.' }
    ],
    promos: [
      { id: '1u', label: '1 Unidad', units: 1, price: 79000 },
      { id: '2u', label: '2 Unidades', units: 2, price: 118500 },
      { id: '2x3', label: 'Pague 2 Lleve 3', units: 3, price: 158000, badge: '⭐ Recomendado' },
      { id: '3x5', label: 'Pague 3 Lleve 5', units: 5, price: 237000, badge: '🔥 Mejor Oferta' }
    ],
    testimonials: [
      { name: 'Andrea G.', text: 'Me ha ayudado a recuperar mi confianza y bienestar íntimo. Muy efectivo.', rating: 5 },
      { name: 'Lorena S.', text: 'Excelente producto, se siente la renovación desde las primeras aplicaciones.', rating: 5 }
    ],
    whyChoose: {
      title: 'Confianza y Plenitud Femenina',
      description: 'En ZENHOGAR apoyamos el bienestar integral de la mujer en todas sus etapas. Instant Virgin ofrece una solución discreta y efectiva para quienes buscan revitalizar su zona íntima con total seguridad, permitiéndote disfrutar de cada momento con máxima confianza.'
    }
  },
  {
    id: 'mamooth',
    name: 'Mammoth (Crema Voluminizante)',
    category: 'salud-sexual',
    shortDescription: 'Firmeza y Apariencia Saludable para tu Piel.',
    description: '✔️ Efecto Volumen: Ayuda a mejorar la textura y apariencia de la piel en las zonas donde más lo necesitas. ✔️ Hidratación Extrema: Sus aceites naturales mantienen la piel elástica, evitando que luzca seca o sin vida. ✔️ Rápida Absorción: Una fórmula profesional que no deja sensación grasosa y actúa desde la primera aplicación.',
    seoTitle: 'Firmeza y Apariencia Saludable para tu Piel con Mammoth',
    seoDescription: '✔️ Efecto Volumen: Mejora la textura y apariencia de la piel. Hidratación extrema con aceites naturales y rápida absorción. ¡Registro INVIMA!',
    benefits: [
      'Textura cutánea renovada',
      'Elasticidad y suavidad profunda',
      'Fórmula profesional no grasa'
    ],
    image: '/assets/products/Mammoth.webp',
    basePrice: 89000,
    size: '120 ml',
    invima: 'SD2018-0004122 (Registro en trámite)',
    keywords: 'fuerza masculina, rendimiento, vitalidad, Mamooth, Zenhogar',
    components: 'Tribulus Terrestris, Maca Negra, Zinc, Magnesio',
    longTailKeywords: [
      'mejor suplemento para aumentar la fuerza y vitalidad masculina',
      'cómo mejorar el rendimiento físico y potencia naturalmente',
      'suplemento para la fuerza interior y energía del hombre',
      'beneficios de Mamooth para el bienestar integral masculino',
      'fórmula balanceada para potenciar el desempeño y la fuerza',
      'bienestar integral y vitalidad con ingredientes de alta potencia',
      'cómo elevar el rendimiento masculino con calidad certificada',
      'suplemento para la potencia y salud sexual',
      'solución natural para la debilidad y falta de vigor masculino',
      'fuerza y vitalidad segura con ingredientes de alta pureza'
    ],
    seoFaqs: [
      { q: '¿Mamooth ayuda con la fuerza muscular?', a: 'Sí, su fórmula balanceada apoya el rendimiento físico y el bienestar integral masculino.' },
      { q: '¿En cuánto tiempo se notan los resultados?', a: 'Con un consumo constante, notarás un aumento en tu vitalidad y fuerza en pocas semanas.' },
      { q: '¿Lo pueden tomar deportistas?', a: 'Es excelente para quienes buscan un impulso natural de energía y rendimiento con calidad certificada.' }
    ],
    promos: [
      { id: '1u', label: '1 Unidad', units: 1, price: 89000 },
      { id: '2u', label: '2 Unidades', units: 2, price: 133500 },
      { id: '2x3', label: 'Pague 2 Lleve 3', units: 3, price: 178000, badge: '⭐ Recomendado' },
      { id: '3x5', label: 'Pague 3 Lleve 5', units: 5, price: 267000, badge: '🔥 Mejor Oferta' }
    ],
    testimonials: [
      { name: 'Ricardo H.', text: 'Siento una fuerza y potencia que no tenía antes. Muy efectivo para mis entrenamientos.', rating: 5 },
      { name: 'Andrés V.', text: 'Excelente para mejorar el rendimiento en todo sentido. Me siento con mucha más vitalidad.', rating: 5 }
    ],
    whyChoose: {
      title: 'Fuerza y potencia masculina',
      description: 'En ZENHOGAR estamos comprometidos con tu salud, ofrecemos productos con registro INVIMA de alto impacto. Mamooth potencia tu fuerza y vigor mediante Tribulus Terrestris y Maca Negra. Resultados seguros con calidad certificada.'
    }
  },
  {
    id: 'tyruss-full',
    name: 'Tyruss Full',
    category: 'salud-bienestar',
    shortDescription: 'Nutrición Verde para un Cuerpo Limpio.',
    description: '✔️ Desintoxicación: Mezcla el poder de la espinaca y algas naturales para ayudar a tu cuerpo a liberar toxinas acumuladas. ✔️ Digestión Perfecta: Alto contenido de fibra que optimiza el tránsito intestinal y reconforta el vientre. ✔️ Corazón Sano: Contiene grasas saludables de aguacate y almendras que protegen tu salud cardiovascular.',
    seoTitle: 'Nutrición Verde para un Cuerpo Limpio con Tyruss Full',
    seoDescription: '✔️ Desintoxicación: Con espinaca y algas naturales. Digestión perfecta que optimiza el tránsito intestinal y protege el corazón. ¡Registro INVIMA!',
    benefits: [
      'Depura el organismo suavemente',
      'Vientre plano y sin pesadez',
      'Aporte de grasas saludables'
    ],
    image: '/assets/products/Tyrussfull.webp',
    basePrice: 89900,
    size: '500 ml',
    invima: 'SD2020-0004599 (Registro en trámite)',
    keywords: 'equilibrio hormonal femenino, salud metabólica, tiroides, menopausia, sofocos, energía estable, Tyruss Full, Zenhogar',
    components: 'Crema de Coco, Clorofila, Espirulina, Arveja, Almendras, Banano, Aguacate, Espinaca, Fibra, Omega 3',
    longTailKeywords: [
      'mejor suplemento líquido para energía total y rendimiento',
      'cómo mejorar el desempeño diario de forma natural y efectiva',
      'suplemento para la vitalidad sin límites y energía constante',
      'beneficios de Tyruss Full para el bienestar integral diario',
      'fórmula balanceada para potenciar el ritmo de vida exigente',
      'bienestar integral y vitalidad con nutrición',
      'cómo mantener el rendimiento diario con calidad certificada',
      'suplemento para la energía y salud masculina',
      'solución natural para el cansancio y falta de vitalidad diaria',
      'energía total segura con ingredientes de alta pureza y eficacia'
    ],
    seoFaqs: [
      { q: '¿Tyruss Full sirve para el cansancio mental?', a: 'Sí, su fórmula balanceada apoya tanto la vitalidad física como el bienestar integral mental.' },
      { q: '¿Se toma antes de entrenar?', a: 'Puede tomarse en la mañana para asegurar energía total y rendimiento durante todo el día.' },
      { q: '¿Qué sabor tiene?', a: 'Posee un sabor agradable diseñado para ser parte de tu ritual de equilibrio natural diario.' }
    ],
    promos: [
      { id: '1u', label: '1 Unidad', units: 1, price: 89900 },
      { id: '2u', label: '2 Unidades', units: 2, price: 134850 },
      { id: '2x3', label: 'Pague 2 Lleve 3', units: 3, price: 179800, badge: '⭐ Recomendado' },
      { id: '3x5', label: 'Pague 3 Lleve 5', units: 5, price: 269700, badge: '🔥 Mejor Oferta' }
    ],
    testimonials: [
      { name: 'Juan C.', text: 'Me siento con una vitalidad total durante todo el día. Muy buen sabor y efecto.', rating: 5 },
      { name: 'Mateo R.', text: 'Excelente para mejorar el rendimiento en mis actividades diarias. Muy recomendado.', rating: 5 }
    ],
    whyChoose: {
      title: 'Limpieza y Bienestar Natural',
      description: 'En ZENHOGAR impulsamos un estilo de vida saludable basado en la pureza. Tyruss Full es el aliado perfecto para desintoxicar tu organismo de forma suave, ayudando a que tu sistema digestivo funcione sin interrupciones y protegiendo tu salud cardiovascular.'
    }
  },
  {
    id: 'zafir',
    name: 'Zafir Energizante',
    category: 'salud-sexual',
    shortDescription: 'Tu Impulso de Energía Natural.',
    description: '✔️ Vitalidad Inmediata: Gracias a la Maca y el Borojó, te ayuda a recuperar el ánimo y la fuerza antes de cualquier actividad importante. ✔️ Concentración: Sus componentes naturales mantienen tu mente alerta y enfocada. ✔️ Sabor Delicioso: Disfruta de una mezcla refrescante de arándanos y frutas que te recarga sin pesadez.',
    seoTitle: 'Tu Impulso de Energía Natural con Zafir',
    seoDescription: '✔️ Vitalidad Inmediata: Con Maca y Borojó. Concentración mental y delicioso sabor refrescante que te recarga. ¡Registro INVIMA!',
    benefits: [
      'Rendimiento físico mejorado',
      'Alerta mental sin nerviosismo',
      'Refrescante mezcla frutal'
    ],
    image: '/assets/products/Zafir.webp',
    basePrice: 73500,
    size: '500 ml',
    invima: 'RSA-3599-2025',
    keywords: 'energía inmediata, impulso natural, enfoque mental, vitalidad, Zafir, Zenhogar, bebida energizante',
    components: 'Guaraná, Té Verde, Vitaminas B1, B6, B12',
    longTailKeywords: [
      'mejor energizante natural para enfoque y energía inmediata',
      'cómo obtener un impulso rápido para terminar el día con fuerza',
      'bebida saludable para la mente clara y concentrada sin químicos',
      'beneficios de Zafir para el bienestar integral y vitalidad',
      'fórmula natural para un rendimiento superior en instantes clave',
      'bienestar integral y energía renovada con registro INVIMA',
    ],
    seoFaqs: [
      { q: '¿Zafir da mucha energía?', a: 'Sí, su fórmula está diseñada para brindar un impulso rápido y bienestar integral cuando más lo necesitas.' },
      { q: '¿Contiene cafeína artificial?', a: 'No, su energía proviene de extractos naturales como el Guaraná para una vitalidad segura y certificada.' },
      { q: '¿Me ayuda a concentrarme?', a: 'Efectivamente, apoya el enfoque total y la claridad mental en días de mucha exigencia.' }
    ],
    promos: [
      { id: '1u', label: '1 Unidad', units: 1, price: 73500 },
      { id: '2u', label: '2 Unidades', units: 2, price: 110250 },
      { id: '2x3', label: 'Pague 2 Lleve 3', units: 3, price: 147000, badge: '⭐ Recomendado' },
      { id: '3x5', label: 'Pague 3 Lleve 5', units: 5, price: 220500, badge: '🔥 Mejor Oferta' }
    ],
    testimonials: [
      { name: 'Felipe T.', text: 'Me encanta el sabor y la energía que me da. Muy natural y efectivo.', rating: 5 },
      { name: 'Sonia R.', text: 'Excelente para esos días donde necesito un extra de vitalidad. Muy recomendado.', rating: 5 }
    ],
    whyChoose: {
      title: 'Impulso natural inmediato',
      description: 'En ZENHOGAR estamos comprometidos con tu salud, ofrecemos productos con registro INVIMA para tu vitalidad. Zafir Energizante te brinda energía inmediata y enfoque total sin químicos agresivos. Tu aliado para rendir al máximo con calidad certificada.'
    }
  },
  {
    id: 'zeus',
    name: 'Zeus',
    category: 'salud-sexual',
    shortDescription: 'Máxima Potencia y Resistencia Diaria.',
    description: '✔️ Vigor Natural: Con Borojó y Chontaduro que elevan tus niveles de energía y potencia física de forma natural. ✔️ Escudo de Defensas: Fortalece tu sistema inmunológico para protegerte contra virus y debilidad. ✔️ Recuperación: Ideal para combatir el cansancio crónico y sentirte joven y activo nuevamente.',
    seoTitle: 'Máxima Potencia y Resistencia Diaria con Zeus',
    seoDescription: '✔️ Vigor Natural: Con Borojó y Chontaduro. Fortalece defensas y mejora la recuperación contra el cansancio. ¡Registro INVIMA!',
    benefits: [
      'Vitalidad física superior',
      'Refuerzo inmunológico botánico',
      'Adiós al agotamiento diario'
    ],
    image: '/assets/products/Zeus.webp',
    basePrice: 85000,
    size: '60 Cápsulas',
    invima: 'RSA-0031426-2024',
    keywords: 'vitalidad masculina, vigor natural, rendimiento sexual, potencia hombre, Zeus, Zenhogar, Borojó, Maca',
    components: 'Borojó, Chontaduro, Maca Negra, Guaraná, Vitaminas',
    longTailKeywords: [
      'mejor suplemento natural para la vitalidad masculina y vigor',
      'cómo mejorar el rendimiento del hombre de forma segura y natural',
      'suplemento con borojó y maca para energía y potencia real',
      'beneficios de Zeus para el bienestar integral masculino',
      'fórmula avanzada para la salud y vigor del hombre moderno',
      'bienestar integral y vitalidad masculina con registro INVIMA',
    ],
    seoFaqs: [
      { q: '¿Zeus ayuda con la energía diaria?', a: 'Sí, sus componentes naturales están seleccionados para brindar vitalidad y bienestar integral constante.' },
      { q: '¿Cómo se debe tomar Zeus?', a: 'Se recomienda el consumo diario progresivo para mantener un equilibrio natural y rendimiento óptimo.' },
      { q: '¿Sus ingredientes son naturales?', a: 'Totalmente, Zeus utiliza extractos de alta pureza con calidad certificada para tu seguridad.' }
    ],
    promos: [
      { id: '1u', label: '1 Unidad', units: 1, price: 85000 },
      { id: '2u', label: '2 Unidades', units: 2, price: 127500 },
      { id: '2x3', label: 'Pague 2 Lleve 3', units: 3, price: 170000, badge: '⭐ Recomendado' },
      { id: '3x5', label: 'Pague 3 Lleve 5', units: 5, price: 255000, badge: '🔥 Mejor Oferta' }
    ],
    testimonials: [
      { name: 'Héctor M.', text: 'Me siento con el poder de un dios. Mi rendimiento ha mejorado al 100%.', rating: 5 },
      { name: 'Julián D.', text: 'Excelente suplemento para la vitalidad masculina. Calidad garantizada.', rating: 5 }
    ],
    whyChoose: {
      title: 'Poder y Resistencia Natural',
      description: 'En ZENHOGAR potenciamos tu fuerza interior con ingredientes que la naturaleza ofrece. Zeus es la fórmula definitiva para quienes buscan superar el cansancio físico y mental, permitiéndote recuperar la energía vital con la seguridad de un producto certificado.'
    }
  },
  {
    id: 'nad-1',
    name: '+NAD',
    category: 'salud-bienestar',
    shortDescription: 'Cuidado Antiedad Integral y Vitalidad Celular.',
    description: '✔️ Rejuvenecimiento Celular: Con Nicotinamida (NAD) y Resveratrol para proteger tus células del envejecimiento. ✔️ Energía y Vitalidad: Ayuda a recuperar la energía perdida y mejora el metabolismo. ✔️ Base Natural: Hecho con una base de crema de coco para una mejor digestión y absorción.',
    seoTitle: 'Vitalidad Celular y Antiedad con +NAD y Resveratrol',
    seoDescription: '✔️ Rejuvenecimiento Celular: Nicotinamida y Resveratrol. Energía y vitalidad con base de coco. ¡Registro INVIMA!',
    benefits: [
      'Células protegidas contra el envejecimiento',
      'Mayor producción de energía y vitalidad',
      'Fácil digestión con base de coco'
    ],
    image: '/assets/products/+nad.webp',
    basePrice: 79900,
    size: '60 Cápsulas',
    invima: 'SD2022-0004711 (Registro en trámite)',
    keywords: 'energía natural, antiedad, vitalidad celular, piel firme, cansancio, +NAD, Zenhogar',
    components: 'Base cremosa de coco, Nicotinamida, Resveratrol',
    longTailKeywords: [
      'energía que dura todo el día sin agotarte',
      'cómo mantener la piel firme y joven naturalmente',
      'suplemento con base de coco para vitalidad diaria',
      'beneficios del nad para el cuidado antiedad integral',
      'fórmula para rendir al máximo en el trabajo y el hogar',
      'bienestar integral y energía renovada con calidad INVIMA',
      'suplemento para la salud cerebral y física',
      'solución natural para la falta de energía y deterioro cognitivo',
      'longevidad y vitalidad segura con ingredientes de alta pureza'
    ],
    seoFaqs: [
      { q: '¿Qué es el NAD+ y por qué es importante?', a: 'Es una molécula vital para la energía celular y el bienestar integral, cuyos niveles bajan con la edad.' },
      { q: '¿En cuánto tiempo se siente más energía?', a: 'Muchos usuarios notan una mejora en su vitalidad y enfoque mental tras las primeras semanas de uso constante.' },
      { q: '¿Tiene contraindicaciones?', a: 'Es un suplemento de calidad certificada, pero siempre recomendamos consultar a tu médico si tienes dudas.' }
    ],
    promos: [
      { id: '1u', label: '1 Unidad', units: 1, price: 79900 },
      { id: '2u', label: '2 Unidades', units: 2, price: 119850 },
      { id: '2x3', label: 'Pague 2 Lleve 3', units: 3, price: 159800, badge: '⭐ Recomendado' },
      { id: '3x5', label: 'Pague 3 Lleve 5', units: 5, price: 239700, badge: '🔥 Mejor Oferta' }
    ],
    testimonials: [
      { name: 'Roberto K.', text: 'Siento que mis células se han renovado. Tengo mucha más claridad mental.', rating: 5 },
      { name: 'Lucía F.', text: 'Excelente para el antienvejecimiento celular. Me siento con más energía vital.', rating: 5 }
    ],
    whyChoose: {
      title: 'Longevidad y energía celular',
      description: 'En ZENHOGAR estamos comprometidos con tu salud, ofrecemos productos con registro INVIMA con ciencia avanzada. +NAD apoya tu salud cognitiva y celular con Resveratrol y Quercetina. Fórmula balanceada para una vida longeva con calidad certificada.'
    }
  },
  {
    id: 'titan-coffee',
    name: 'Titan Coffee',
    category: 'salud-sexual',
    shortDescription: 'Café Energizante para un Rendimiento Máximo.',
    description: '✔️ Desayuno de Campeones: Combina el sabor del café con el poder de la Maca y el Chontaduro para empezar el día con fuerza. ✔️ Energía Duradera: Ayuda a reducir la fatiga física y mental durante largas jornadas de trabajo. ✔️ Base Saludable: Elaborado sobre una base de crema de coco, siendo suave con tu estómago y fácil de digerir.',
    seoTitle: 'Café Energizante para un Rendimiento Máximo con Titan Coffee',
    seoDescription: '✔️ Desayuno de Campeones: Con Maca y Chontaduro. Energía duradera con base saludable de crema de coco. ¡Registro INVIMA!',
    benefits: [
      'Desayuno de alto rendimiento',
      'Combate el cansancio laboral',
      'Libre de lácteos, base de coco'
    ],
    image: '/assets/products/Titancoffee.webp',
    basePrice: 89900,
    size: '200g',
    invima: 'PSA-000982-2018',
    keywords: 'café energizante, potencia masculina, vitalidad, Titan Coffee, Zenhogar, vigor natural',
    components: 'Maca, Chontaduro, Borojó, Ginseng, Ganoderma',
    longTailKeywords: [
      'mejor café enriquecido para la potencia y energía masculina',
      'cómo mejorar el rendimiento diario con una taza de café',
      'café con extractos naturales para la vitalidad y fuerza',
      'beneficios de Titan Coffee para el bienestar integral masculino',
      'fórmula balanceada para un impulso de energía natural y sabroso',
      'bienestar integral y vitalidad con nutrición',
      'cómo potenciar el rendimiento masculino con calidad certificada',
      'café para el hombre activo y exigente',
      'solución natural para la falta de vigor y energía matutina',
      'energía y potencia segura con ingredientes de alta pureza'
    ],
    seoFaqs: [
      { q: '¿Titan Coffee reemplaza mi café normal?', a: 'Sí, ofrece un sabor excepcional con el beneficio extra de vitalidad y bienestar integral.' },
      { q: '¿Cuántas tazas puedo tomar al día?', a: 'Se recomienda una o dos tazas para mantener un equilibrio natural y energía constante.' },
      { q: '¿Contiene ingredientes artificiales?', a: 'No, priorizamos extractos naturales con calidad certificada para tu salud.' }
    ],
    promos: [
      { id: '1u', label: '1 Unidad', units: 1, price: 89900 },
      { id: '2u', label: '2 Unidades', units: 2, price: 134850 }
    ],
    testimonials: [
      { name: 'Marcos P.', text: 'El café más potente que he probado. Me mantiene activo todo el día.', rating: 5 },
      { name: 'Elena B.', text: 'Sabor intenso y energía duradera. Mi favorito para el trabajo.', rating: 5 }
    ],
    whyChoose: {
      title: 'Energía que Despierta tus Sentidos',
      description: 'En ZENHOGAR transformamos tu ritual matutino en una fuente de vitalidad. Titan Coffee fusiona el sabor más selecto con ingredientes que impulsan tu rendimiento físico y mental, garantizando que empieces cada jornada con la fuerza y el enfoque que necesitas.'
    }
  },
  {
    id: 'hemocream',
    name: 'Hemocream',
    category: 'salud-bienestar',
    shortDescription: 'Alivio Suave con Hierbas Naturales.',
    description: 'Crema botánica que calma rápidamente el ardor y la picazón, facilitando un proceso natural y con facilidad al ir al baño.',
    seoTitle: 'Alivio del Ardor y Picazón con Hemocream Natural',
    seoDescription: 'Calma rápidamente la molestia con Caléndula y Aloe Vera. Hemocream usa 11 plantas para un proceso con facilidad. ¡Cuidado delicado con calidad INVIMA!',
    benefits: [
      'Alivio de ardor y picazón',
      'Facilita el proceso de evacuación',
      'Cuidado delicado con 11 plantas',
      'Textura suave de rápida absorción'
    ],
    image: '/assets/products/Hemocream.webp',
    basePrice: 65000,
    size: '30 ml',
    invima: 'NSOC15678-23CO',
    keywords: 'hemorroides, ardor, picazón, caléndula, aloe vera, plantas medicinales, alivio natural, Hemocream, Zenhogar',
    components: 'Caléndula, Aloe Vera, 11 plantas medicinales',
    longTailKeywords: [
      'mejor crema natural para quitar el ardor rápidamente',
      'cómo ir al baño de forma natural y con facilidad',
      'crema de caléndula y aloe vera para picazón persistente',
      'beneficios de las 11 plantas para el cuidado de la piel',
      'fórmula botánica suave para alivio inmediato',
      'bienestar integral y cuidado delicado con registro INVIMA',
    ],
    seoFaqs: [
      { q: '¿Hemocream brinda confort de inmediato?', a: 'Brinda un alivio calmante y fresapoya que mejora tu bienestar integral desde la primera aplicación.' },
      { q: '¿Cuántas veces al día se puede aplicar?', a: 'Se recomienda usarla 2 o 3 veces al día para mantener el cuidado suave y confort.' },
      { q: '¿Es un producto natural?', a: 'Sí, su fórmula balanceada prioriza ingredientes seguros con calidad certificada.' }
    ],
    promos: [
      { id: '1u', label: '1 Unidad', units: 1, price: 65000 },
      { id: '2u', label: '2 Unidades', units: 2, price: 97500 },
      { id: '2x3', label: 'Pague 2 Lleve 3', units: 3, price: 130000, badge: '⭐ Recomendado' },
      { id: '3x5', label: 'Pague 3 Lleve 5', units: 5, price: 195000, badge: '🔥 Mejor Oferta' }
    ],
    testimonials: [
      { name: 'Jorge T.', text: 'Me ha aliviado mucho el malestar y la inflamación. Muy efectiva.', rating: 5 },
      { name: 'Marta S.', text: 'Excelente crema, brinda un alivio rápido y duradero. Calidad certificada.', rating: 5 }
    ],
    whyChoose: {
      title: 'Alivio y confort inmediato',
      description: 'En ZENHOGAR estamos comprometidos con tu salud, ofrecemos productos con registro INVIMA de alivio suave. Hemocream ayuda a calmar el ardor y la pesadez gracias a la Caléndula y el Aloe Vera. Recupera tu confort con calidad certificada.'
    }
  }
];

export const COMBO_OF_THE_MONTH = {
  id: 'combo-inmunidad-dual',
  name: 'Inmunidad Dual',
  description: 'Resvisfactor y Coliplus: la combinación perfecta para confortar tu vientre, sentirte mas ligero y libre de molestias.',
  image: '/assets/combos/combo-bienestar.webp',
  price: 129900,
  originalPrice: 165800,
  products: ['resvis', 'coliplus'],
  seoTitle: 'Cómo solucionar la pesadez abdominal y defensas bajas con Inmunidad Dual',
  seoDescription: 'Reconforta tu vientre y fortalece tu sistema inmune con el combo Inmunidad Dual. Fórmula balanceada para bienestar integral y calidad certificada. ¡Ahorra $35.900!',
  whyChoose: {
    title: 'El dúo dinámico de tu bienestar',
    description: 'En ZENHOGAR estamos comprometidos con tu salud, ofrecemos productos con registro INVIMA. Este combo une la acción reconfortatoria de Coliplus con el escudo antioxidante de Resvisfactor. Solución certificada para confortar tu vientre y fortalecer tus defensas con calidad garantizada.'
  },
  badge: 'OFERTA DEL MES',
  benefits: [
    'Escudo natural contra virus',
    'Tránsito intestinal regulado',
    'Vientre plano y sin pesadez',
    'Protección antioxidante total'
  ],
  keywords: 'bienestar total, desintoxicación, limpieza hepática, colon irritable, digestión, Rtafull, Coliplus, Zenhogar, combo salud',
  components: 'Resveratrol, Omega 3, Noni, Pitaya, Linaza, Vitaminas',
  longTailKeywords: [
    'mejor combo natural para confortar el vientre y subir defensas',
    'cómo limpiar el colon y el hígado de forma efectiva y segura',
    'cuidado para el bienestar integral digestivo e inmune',
    'beneficios de Inmunidad Dual para la vitalidad y equilibrio natural',
    'fórmula balanceada para desintoxicación profunda y energía',
    'bienestar integral y salud con calidad certificada premium',
    'cómo mejorar la digestión y absorción de nutrientes con combos',
    'combo para el cuidado de la salud diaria',
    'solución natural para el colon irritable y pesadez abdominal',
    'limpieza orgánica segura con ingredientes de alta pureza'
  ],
  seoFaqs: [
    { q: '¿Por qué este combo es el más recomendado?', a: 'Porque combina el poder antioxidante de Resvis Factor con el bienestar digestivo de Coliplus para una salud integral total.' },
    { q: '¿En cuánto tiempo veré resultados?', a: 'La mayoría siente una reconfortación y mayor vitalidad desde la primera semana de uso constante.' },
    { q: '¿Es seguro para personas con gastritis?', a: 'Sí, su fórmula balanceada es gentil con el estómago, promoviendo el equilibrio natural.' }
  ],
  testimonials: [
    { name: 'Andrés Castro', text: 'Este combo cambió mi vida digestiva por completo.', rating: 5 },
    { name: 'Liliana Restrepo', text: 'Me siento mucho más ligera y con más energía.', rating: 5 }
  ]
};

export const PROMOTIONS = [
  {
    id: 'promo-1',
    name: 'Combo Piel Radiante',
    description: 'La combinación perfecta para el cuidado de tu piel y bienestar general.',
    image: '/assets/combos/promo-1.webp',
    price: 104850,
    originalPrice: 139800,
    products: ['resveratrol', 'miskinne'],
    seoTitle: 'Cómo solucionar la piel opaca y falta de elasticidad con Combo Piel Radiante',
    seoDescription: 'Luce una piel radiante con nuestro Combo Piel Radiante. Fórmula balanceada para bienestar integral, nutrición celular y calidad certificada. ¡Ahorra hoy!',
    whyChoose: {
      title: 'Tu ritual de belleza integral',
      description: 'En ZENHOGAR estamos comprometidos con tu salud, ofrecemos productos con registro INVIMA. El Combo Piel Radiante une nutrición celular y cuidado cutáneo extremo con Resveratrol y Miskinne (Avena y Caléndula). Calidad certificada para una piel luminosa desde el interior.'
    },
    badge: 'COMBO N°1',
    keywords: 'Resveratrol, Miskinne, antioxidante, cuidado de la piel, rejuvenecimiento, bienestar, Zenhogar, combo belleza',
    components: 'Resveratrol, Avena, Caléndula, Manteca de Karité, Vitamina E',
    longTailKeywords: [
      'mejor combo para rejuvenecer la piel y dar luminosidad natural',
      'cómo proteger las células y suavizar la piel al mismo tiempo',
      'cuidado para una piel radiante desde el interior y exterior',
      'beneficios del combo Piel Radiante para el bienestar integral',
      'fórmula balanceada para la elasticidad y firmeza cutánea',
      'bienestar integral y vitalidad con belleza',
      'cómo mejorar la salud de la piel con calidad certificada',
      'combo para el cuidado facial y corporal',
      'solución natural para la piel seca y falta de brillo celular',
      'belleza y salud segura con ingredientes de alta pureza'
    ],
    seoFaqs: [
      { q: '¿El resveratrol ayuda a la piel?', a: 'Sí, protege las células del daño oxidativo, promoviendo un bienestar integral y juventud.' },
      { q: '¿Miskinne se usa en todo el cuerpo?', a: 'Es ideal para brindar suavidad extrema y vitalidad a toda tu piel diariamente.' },
      { q: '¿Este combo sirve para pieles maduras?', a: 'Efectivamente, su fórmula balanceada es excelente para recuperar firmeza y equilibrio natural.' }
    ],
    benefits: [
      'Cuidado integral de la piel',
      'Potente acción antioxidante',
      'Mejora la elasticidad y firmeza',
      'Bienestar general desde el interior'
    ],
    testimonials: [
      { name: 'Martha Lucia', text: 'Mi piel se ve mucho más radiante desde que uso este combo. ¡Me encanta!', rating: 5 },
      { name: 'Gloria Ines', text: 'Excelente combinación, el resveratrol me da mucha energía.', rating: 5 }
    ]
  },
  {
    id: 'promo-2',
    name: 'Combo Belleza Eterna',
    description: 'Potencia tu belleza desde el interior con este dúo antioxidante.',
    image: '/assets/combos/promo-2.webp',
    price: 123675,
    originalPrice: 164900,
    products: ['resveratrol', 'eventone'],
    seoTitle: 'Cómo solucionar las manchas y el tono desigual con Combo Belleza Eterna',
    seoDescription: 'Unifica tu tono de piel y protege tus células con el Combo Belleza Eterna. Fórmula balanceada para bienestar integral y calidad certificada. ¡Compra ya!',
    whyChoose: {
      title: 'Belleza que trasciende el tiempo',
      description: 'En ZENHOGAR estamos comprometidos con tu salud, ofrecemos productos con registro INVIMA. Belleza Eterna combate las manchas y el tono desigual combinando el poder aclarante de Eventone con la regeneración del Resveratrol. Calidad certificada para un rostro renovado.'
    },
    badge: 'OFERTA N° 2',
    keywords: 'Resveratrol, Eventone, belleza interior, antioxidante, tono de piel, nutrición celular, Zenhogar, combo belleza',
    components: 'Resveratrol, Ácido Kójico, Vitamina C, Azeloglicina, Extracto de Regaliz',
    longTailKeywords: [
      'mejor combo para atenuar irregularidades de tono y unificar el tono de la piel',
      'cómo nutrir las células y aclarar la piel de forma segura',
      'cuidado para una belleza eterna y piel sin manchas',
      'beneficios del combo Belleza Eterna para el bienestar integral',
      'fórmula balanceada para una piel clara y vitalidad celular',
      'bienestar integral y claridad cutánea',
      'cómo recuperar la luminosidad del rostro con calidad certificada',
      'combo para el cuidado antiedad y manchas',
      'solución natural para la hiperpigmentación y envejecimiento',
      'belleza y nutrición segura con ingredientes de alta pureza'
    ],
    seoFaqs: [
      { q: '¿Eventone quita manchas de sol?', a: 'Sí, ayuda a unificar el tono promoviendo una piel radiante y bienestar integral.' },
      { q: '¿El resveratrol potencia el efecto aclarante?', a: 'Al proteger las células, permite que la piel se regenere con mayor vitalidad y equilibrio natural.' },
      { q: '¿Se puede usar en pieles sensibles?', a: 'Su fórmula balanceada con calidad certificada es apta para cuidar tu piel con suavidad.' }
    ],
    benefits: [
      'Tono de piel más uniforme',
      'Protección contra radicales libres',
      'Nutrición profunda celular',
      'Efecto antiedad natural'
    ],
    testimonials: [
      { name: 'Sandra Milena', text: 'He notado que mis manchas han disminuido. Muy recomendado.', rating: 5 },
      { name: 'Patricia Gomez', text: 'Siento mi piel más suave y protegida.', rating: 4 }
    ]
  },
  {
    id: 'promo-3',
    name: 'Combo Detox Digestivo',
    description: 'Desintoxica y regula tu sistema digestivo de forma natural.',
    image: '/assets/combos/promo-3.webp',
    price: 116850,
    originalPrice: 155000,
    products: ['coliplus', 'rtafull'],
    seoTitle: 'Cómo solucionar el estreñimiento y pesadez con Combo Detox Digestivo',
    seoDescription: 'Limpia tu organismo y regula tu digestión con el Combo Detox Digestivo. Fórmula balanceada para bienestar integral y calidad certificada. ¡Siéntete ligero!',
    whyChoose: {
      title: 'Renovación total desde el interior',
      description: 'En ZENHOGAR estamos comprometidos con tu salud, ofrecemos productos con registro INVIMA. Este Combo Detox une Rtafull y Coliplus para limpiar el hígado y colon de forma profunda pero gentil. Despídete de la pesadez y el estreñimiento con calidad certificada.'
    },
    badge: 'OFERTA N°3',
    keywords: 'Coliplus, Rtafull, desintoxicación, colon, hígado, digestión, limpieza natural, Zenhogar, combo salud',
    components: 'Noni, Pitaya, Alcachofa, Flor de Jamaica, Berenjena, Apio',
    longTailKeywords: [
      'mejor combo detox para limpiar el colon y el hígado naturalmente',
      'cómo reducir la sensación de pesadez abdominal y regular la digestión',
      'cuidado para una renovación total y bienestar digestivo',
      'beneficios del combo Detox Digestivo para la vitalidad diaria',
      'fórmula balanceada para una limpieza orgánica profunda y suave',
      'bienestar integral y ligereza con nutrición',
      'cómo mejorar el tránsito intestinal con calidad certificada',
      'combo para la desintoxicación periódica',
      'solución natural para el estreñimiento y toxinas acumuladas',
      'detox seguro y efectivo con ingredientes de alta pureza'
    ],
    seoFaqs: [
      { q: '¿Este combo causa diarrea?', a: 'No, su fórmula balanceada promueve una limpieza gentil respetando tu equilibrio natural y vitalidad.' },
      { q: '¿Cuánto dura el cuidado detox?', a: 'Se recomienda realizarlo durante un mes para un bienestar integral y resultados duraderos.' },
      { q: '¿Puedo comer normal durante el detox?', a: 'Sí, pero una dieta balanceada potenciará la vitalidad y calidad certificada del proceso.' }
    ],
    benefits: [
      'Limpieza profunda del colon',
      'Desintoxicación hepática natural',
      'Mejora notable de la digestión',
      'Reduce la pesadez abdominal'
    ],
    testimonials: [
      { name: 'Jorge Eliécer', text: 'El mejor detox que he probado. Me siento renovado.', rating: 5 },
      { name: 'Beatriz Elena', text: 'Adiós a la inflamación. Muy efectivo.', rating: 5 }
    ]
  },
  {
    id: 'promo-4',
    name: 'Combo Control & Detox',
    description: 'El apoyo ideal para tu proceso de control de peso y detox.',
    image: '/assets/combos/promo-4.webp',
    price: 119850,
    originalPrice: 159800,
    products: ['liteplex', 'rtafull'],
    seoTitle: 'Cómo solucionar el sobrepeso y metabolismo lento con Combo Control & Detox',
    seoDescription: 'Apoya tu proceso de pérdida de peso con el Combo Control & Detox. Fórmula balanceada para bienestar integral, energía y calidad certificada. ¡Ahorra hoy!',
    whyChoose: {
      title: 'Tu aliado en el control consciente',
      description: 'En ZENHOGAR estamos comprometidos con tu salud, ofrecemos productos con registro INVIMA. Control & Detox integra Liteplex y Rtafull para acelerar tu metabolismo y liberar toxinas acumuladas. Fórmula balanceada y certificada para tu proceso de bienestar.'
    },
    badge: 'COMBO N°4',
    keywords: 'Liteplex, Rtafull, control de peso, controlar medidas, desintoxicación, metabolismo, Zenhogar, combo salud',
    components: 'Té Verde, Jengibre, Limón, Alcachofa, Flor de Jamaica, Berenjena, Apio',
    longTailKeywords: [
      'mejor combo para moldear la figura y desintoxicar el cuerpo',
      'cómo acelerar el metabolismo y liberar toxinas naturalmente',
      'cuidado para el control de peso consciente y vitalidad',
      'beneficios del combo Control & Detox para el bienestar integral',
      'fórmula balanceada para reducir medidas y limpiar el organismo',
      'bienestar integral y ligereza con suplementos',
      'cómo mejorar la quema de grasa con calidad certificada',
      'combo para el control de peso saludable',
      'solución natural para la ansiedad de comer y metabolismo lento',
      'control de peso seguro con ingredientes de alta pureza'
    ],
    seoFaqs: [
      { q: '¿Liteplex quita el hambre?', a: 'Ayuda a controlar la ansiedad, promoviendo un bienestar integral y control consciente.' },
      { q: '¿Rtafull ayuda a moldear la figura?', a: 'Al limpiar el hígado y colon, mejora el metabolismo y la vitalidad para tu equilibrio natural.' },
      { q: '¿Tiene efecto rebote?', a: 'Nuestra fórmula balanceada prioriza la salud, evitando efectos negativos con calidad certificada.' }
    ],
    benefits: [
      'Apoyo en el control de peso',
      'Eliminación de toxinas acumuladas',
      'Acelera el metabolismo naturalmente',
      'Mejora la absorción de nutrientes'
    ],
    testimonials: [
      { name: 'Claudia Patricia', text: 'Me ha ayudado mucho en mi proceso de moldear la figura.', rating: 5 },
      { name: 'Ricardo Jose', text: 'Siento mucha más energía y menos ansiedad.', rating: 4 }
    ]
  },
  {
    id: 'promo-5',
    name: 'Combo Protección Total',
    description: 'Protección y limpieza profunda para tu organismo.',
    image: '/assets/combos/promo-5.webp',
    price: 123675,
    originalPrice: 164900,
    products: ['tufoff', 'rtafull'],
    seoTitle: 'Cómo solucionar el mal olor y toxinas con Combo Protección Total',
    seoDescription: 'Protección y limpieza profunda para tu organismo con el Combo Protección Total. Fórmula balanceada para bienestar integral y calidad certificada. ¡Compra ahora!',
    whyChoose: {
      title: 'Protección que nace del equilibrio',
      description: 'En ZENHOGAR estamos comprometidos con tu salud, ofrecemos productos con registro INVIMA. Protección Total une la higiene profunda de Tufoff con la depuración hepática de Rtafull. Una barrera segura contra toxinas y mal olor con calidad certificada.'
    },
    badge: 'COMBO N°5',
    keywords: 'Tufoff, Rtafull, protección, limpieza profunda, defensas, bienestar, Zenhogar, combo salud',
    components: 'Cloruro de Benzalconio, Alcachofa, Boldo, Mentol, Eucalipto',
    longTailKeywords: [
      'mejor combo para controlar el olor y desintoxicar el cuerpo',
      'cómo fortalecer las defensas y limpiar impurezas naturalmente',
      'cuidado para una protección integral y bienestar orgánico',
      'beneficios del combo Protección Total para la vitalidad diaria',
      'fórmula balanceada para una higiene profunda y detox hepático',
      'bienestar integral y fresapoya con productos',
      'cómo mejorar la salud general con calidad certificada',
      'combo para la limpieza interna y externa',
      'solución natural para las toxinas y falta de protección orgánica',
      'protección y limpieza segura con ingredientes de alta pureza'
    ],
    seoFaqs: [
      { q: '¿Tufoff ayuda con el sudor fuerte?', a: 'Sí, brinda una frescura duradera que junto a la limpieza de Rtafull promueve el bienestar integral.' },
      { q: '¿Rtafull limpia la sangre?', a: 'Ayuda a depurar el hígado y colon, lo que se refleja en una vitalidad renovada y equilibrio natural.' },
      { q: '¿Se puede tomar por tiempo prolongado?', a: 'Nuestra fórmula balanceada es segura para un mantenimiento preventivo con calidad certificada.' }
    ],
    benefits: [
      'Protección integral del organismo',
      'Limpieza profunda de impurezas',
      'Fortalece las defensas naturales',
      'Bienestar digestivo y hepático'
    ],
    testimonials: [
      { name: 'Luz Marina', text: 'Me siento protegida y con mucha más vitalidad.', rating: 5 },
      { name: 'Fernando', text: 'Un combo esencial para mantener la salud.', rating: 5 }
    ]
  },
  {
    id: 'promo-6',
    name: 'Combo Alivio Muscular',
    description: 'Cuidado muscular y articular en un solo paquete.',
    image: '/assets/combos/promo-6.webp',
    price: 123675,
    originalPrice: 164900,
    products: ['locion', 'colageno'],
    seoTitle: 'Cómo solucionar la incomodidad muscular y articular con Combo Alivio Muscular',
    seoDescription: 'Recupera tu movilidad con el Combo Alivio Muscular. Fórmula balanceada para bienestar integral, nutrición articular y calidad certificada. ¡Pídelo hoy!',
    whyChoose: {
      title: 'Libertad de movimiento total',
      description: 'En ZENHOGAR estamos comprometidos con tu salud, ofrecemos productos con registro INVIMA. Este combo nutre tus articulaciones con Colágeno y alivia la incomodidad muscular con la Loción Termoactiva (Salicilato de Metilo). Calidad certificada para tu movilidad.'
    },
    badge: 'COMBO N°6',
    keywords: 'Loción Termoactiva, Colágeno, dolor muscular, articulaciones, recuperación, alivio, Zenhogar, combo bienestar',
    components: 'Salicilato de Metilo, Colágeno Hidrolizado, Citrato de Magnesio, Alcanfor, Mentol',
    longTailKeywords: [
      'mejor combo para el molestias articulares y espalda naturalmente',
      'cómo mejorar la movilidad articular y aliviar tensiones musculares',
      'cuidado para la recuperación física y elasticidad corporal',
      'beneficios del combo Alivio Muscular para el bienestar integral',
      'fórmula balanceada para nutrir cartílagos y relajar músculos',
      'bienestar integral y vitalidad con facilidades',
      'cómo recuperar la movilidad diaria con calidad certificada',
      'combo para deportistas y adultos activos',
      'solución natural para la artritis y contracturas musculares',
      'alivio y nutrición segura con ingredientes de alta pureza'
    ],
    seoFaqs: [
      { q: '¿La loción se puede usar antes de hacer ejercicio?', a: 'Sí, su efecto termoactivo prepara los músculos para el bienestar integral y vitalidad.' },
      { q: '¿El colágeno ayuda a los huesos?', a: 'Efectivamente, nutre el sistema óseo y articular promoviendo un equilibrio natural duradero.' },
      { q: '¿Sirve para desgaste prolongado?', a: 'Nuestra fórmula balanceada es un excelente apoyo para el alivio constante con calidad certificada.' }
    ],
    benefits: [
      'Alivio muscular y articular',
      'Nutrición para huesos y cartílagos',
      'Mejora la movilidad diaria',
      'Efecto termoactivo relajante'
    ],
    testimonials: [
      { name: 'Doña Rosa', text: 'Mis rodillas ya no me molestan tanto. Gracias.', rating: 5 },
      { name: 'Don Pedro', text: 'La loción es mágica para después del trabajo.', rating: 5 }
    ]
  },
  {
    id: 'promo-7',
    name: 'Combo Energía Máxima',
    description: 'Energía natural y nutrición avanzada para tu día.',
    image: '/assets/combos/promo-7.webp',
    price: 149425,
    originalPrice: 199250,
    products: ['cafetolio', 'megamac'],
    seoTitle: 'Cómo solucionar el cansancio extremo y falta de enfoque con Combo Energía Máxima',
    seoDescription: 'Potencia tu rendimiento con el Combo Energía Máxima. Fórmula balanceada para vitalidad extrema, bienestar integral y calidad certificada. ¡Compra segura!',
    whyChoose: {
      title: 'Energía pura para tus retos',
      description: 'En ZENHOGAR estamos comprometidos con tu salud, ofrecemos productos con registro INVIMA. Energía Máxima combina Cafetolio y Megamac para potenciar tu vitalidad y enfoque mental en días de cansancio extremo. Potencia certificada y segura.'
    },
    badge: 'COMBO N°7',
    keywords: 'Cafetolio, Megamac, energía, vitalidad, nutrición, rendimiento, Zenhogar, combo energía',
    components: 'Café Verde, Borojó, Chontaduro, Maca, Polen, Ganoderma',
    longTailKeywords: [
      'mejor combo para tener energía todo el día de forma natural',
      'cómo mejorar el enfoque mental y rendimiento físico extremo',
      'cuidado para la vitalidad máxima y nutrición avanzada',
      'beneficios del combo Energía Máxima para el bienestar integral',
      'fórmula balanceada para superar el cansancio y la fatiga diaria',
      'bienestar integral y vitalidad con suplementos',
      'cómo potenciar el rendimiento intelectual con calidad certificada',
      'combo para personas con alta exigencia diaria',
      'solución natural para el agotamiento y falta de concentración',
      'energía y nutrición segura con ingredientes de alta pureza'
    ],
    seoFaqs: [
      { q: '¿Megamac quita el sueño?', a: 'Brinda vitalidad y energía natural, mejorando tu bienestar integral sin alterar tu descanso nocturno.' },
      { q: '¿Cafetolio es mejor que el café instantáneo?', a: 'Sí, su fórmula balanceada con ganoderma aporta nutrientes para un equilibrio natural superior.' },
      { q: '¿Lo pueden tomar personas que trabajan de noche?', a: 'Es ideal para mantener el enfoque y rendimiento con calidad certificada en turnos exigentes.' }
    ],
    benefits: [
      'Energía natural duradera',
      'Nutrición avanzada completa',
      'Mejora el enfoque mental',
      'Vitalidad para todo el día'
    ],
    testimonials: [
      { name: 'Luis Alberto', text: 'El mejor reemplazo para el café común. Mucha energía.', rating: 5 },
      { name: 'Carmen Alicia', text: 'Me siento mucho más fuerte y activa.', rating: 5 }
    ]
  },
  {
    id: 'promo-8',
    name: 'Combo Vitalidad & Limpieza',
    description: 'Máxima vitalidad y limpieza para tu cuerpo.',
    image: '/assets/combos/promo-8.webp',
    price: 127350,
    originalPrice: 169800,
    products: ['tyruss-full', 'rtafull'],
    seoTitle: 'Cómo solucionar la falta de vitalidad y pesadez con Combo Vitalidad & Limpieza',
    seoDescription: 'Siéntete imparable con el Combo Vitalidad & Limpieza. Fórmula balanceada para depuración natural, bienestar integral y calidad certificada. ¡Pídelo hoy!',
    whyChoose: {
      title: 'Vitalidad renovada cada mañana',
      description: 'En ZENHOGAR estamos comprometidos con tu salud, ofrecemos productos con registro INVIMA. Vitalidad & Limpieza une a Tyruss Full y Rtafull para una limpieza orgánica profunda y energía total sin complicaciones. Calidad y seguridad certificada.'
    },
    badge: 'COMBO N°8',
    keywords: 'Tyruss-Full, Rtafull, vitalidad, limpieza, energía, bienestar, Zenhogar, combo salud',
    components: 'Borojó, Chontaduro, Maca, Alcachofa, Boldo, Diente de León',
    longTailKeywords: [
      'mejor combo para limpiar el cuerpo y recuperar la energía total',
      'cómo mejorar el desempeño diario y la depuración orgánica',
      'cuidado para una vitalidad renovada y equilibrio natural',
      'beneficios del combo Vitalidad & Limpieza para el bienestar integral',
      'fórmula balanceada para depurar el hígado y potenciar la fuerza',
      'bienestar integral y ligereza con nutrición',
      'cómo mantener el ritmo de vida activo con calidad certificada',
      'combo para la salud y rendimiento masculino',
      'solución natural para la pesadez y falta de vitalidad extrema',
      'limpieza y energía segura con ingredientes de alta pureza'
    ],
    seoFaqs: [
      { q: '¿Tyruss Full se puede mezclar con Rtafull?', a: 'Se recomienda tomarlos por separado para que cada fórmula balanceada actúe en tu bienestar integral.' },
      { q: '¿Ayuda a mejorar la digestión?', a: 'Sí, la limpieza de Rtafull junto a la vitalidad de Tyruss promueven un equilibrio natural digestivo.' },
      { q: '¿Es apto para deportistas?', a: 'Efectivamente, apoya el rendimiento y la recuperación con calidad certificada para una vida activa.' }
    ],
    benefits: [
      'Vitalidad extrema natural',
      'Limpieza orgánica profunda',
      'Mejora el rendimiento general',
      'Equilibrio y bienestar total'
    ],
    testimonials: [
      { name: 'Javier', text: 'Siento que mi cuerpo funciona mucho mejor.', rating: 5 },
      { name: 'Mónica', text: 'Excelente para recuperar la energía perdida.', rating: 5 }
    ]
  }
];


export const GIFT_PRODUCTS = [
  { id: 'gift-coli', name: 'Obsequio Coliplus' },
  { id: 'gift-titan', name: 'Obsequio Titan Coffe' },
  { id: 'gift-coffee-col', name: 'Obsequio Coffe Colageno' },
  { id: 'gift-dampy', name: 'Obsequio Pañitos Dampy' },
  { id: 'gift-repo', name: 'Obsequio Gratis Repolarizador' },
  { id: 'gift-shampoo', name: 'Obsequio Shampoo Sin sal' },
  { id: 'gift-termo', name: 'Obsequio termoactiva' },
];

export const COLOMBIA_DATA = {
  'Amazonas': ['Leticia', 'Puerto Nariño'],
  'Antioquia': ['Medellín', 'Bello', 'Itagüí', 'Envigado', 'Apartadó', 'Rionegro', 'Turbo', 'Caucasia', 'Chigorodó', 'Sabaneta', 'La Estrella', 'Caldas', 'Girardota', 'Copacabana', 'Marinilla', 'El Carmen de Viboral', 'Guaduas', 'Santa Rosa de Osos', 'Yarumal', 'Sonsón'],
  'Arauca': ['Arauca', 'Saravena', 'Tame', 'Arauquita'],
  'Atlántico': ['Barranquilla', 'Soledad', 'Malambo', 'Sabanalarga', 'Puerto Colombia', 'Baranoa', 'Galapa', 'Palmar de Varela', 'Santo Tomás'],
  'Bolívar': ['Cartagena', 'Magangué', 'Turbaco', 'Arjona', 'Carmen de Bolívar'],
  'Boyacá': ['Tunja', 'Duitama', 'Sogamoso', 'Chiquinquirá', 'Puerto Boyacá', 'Paipa', 'Moniquirá'],
  'Caldas': ['Manizales', 'La Dorada', 'Chinchiná', 'Villamaría', 'Riosucio', 'Anserma'],
  'Caquetá': ['Florencia', 'San Vicente del Caguán', 'Cartagena del Chairá', 'Puerto Rico'],
  'Casanare': ['Yopal', 'Aguazul', 'Villanueva', 'Paz de Ariporo'],
  'Cauca': ['Popayán', 'Santander de Quilichao', 'Puerto Tejada', 'Piendamó', 'Patía'],
  'Cesar': ['Valledupar', 'Aguachica', 'Codazzi', 'La Paz', 'El Paso'],
  'Chocó': ['Quibdó', 'Istmina', 'Condoto', 'Tadó'],
  'Córdoba': ['Montería', 'Cereté', 'Sahagún', 'Lorica', 'Planeta Rica', 'Montelíbano', 'Tierralta'],
  'Cundinamarca': ['Soacha', 'Fusagasugá', 'Facatativá', 'Zipaquirá', 'Chía', 'Girardot', 'Mosquera', 'Madrid', 'Funza', 'Cajicá', 'Ubaté', 'Ubaque', 'Tocancipá'],
  'Bogotá D.C.': ['Bogotá'],
  'Guainía': ['Inírida'],
  'Guaviare': ['San José del Guaviare', 'Retorno'],
  'Huila': ['Neiva', 'Pitalito', 'Garzón', 'La Plata', 'Campoalegre'],
  'La Guajira': ['Riohacha', 'Maicao', 'Uribia', 'Manaure', 'Fonseca', 'San Juan del Cesar', 'Barrancas'],
  'Magdalena': ['Santa Marta', 'Ciénaga', 'Fundación', 'El Banco', 'Plato'],
  'Meta': ['Villavicencio', 'Acacías', 'Granada', 'Puerto López', 'Cumaral'],
  'Nariño': ['Pasto', 'Ipiales', 'Tumaco', 'Túquerres', 'La Unión'],
  'Norte de Santander': ['Cúcuta', 'Ocaña', 'Villa del Rosario', 'Los Patios', 'Pamplona', 'Tibú'],
  'Putumayo': ['Mocoa', 'Puerto Asís', 'Orito', 'Sibundoy'],
  'Quindío': ['Armenia', 'Calarcá', 'Quimbaya', 'Montenegro', 'Circasia', 'La Tebaida'],
  'Risaralda': ['Pereira', 'Dosquebradas', 'Santa Rosa de Cabal', 'La Virginia', 'Belén de Umbría'],
  'San Andrés y Providencia': ['San Andrés', 'Providencia'],
  'Santander': ['Bucaramanga', 'Floridablanca', 'Girón', 'Piedecuesta', 'Barrancabermeja', 'San Gil', 'Socorro', 'Barbosa'],
  'Sucre': ['Sincelejo', 'Corozal', 'Sampués', 'Tolú'],
  'Tolima': ['Ibagué', 'Espinal', 'Melgar', 'Mariquita', 'Honda', 'Chaparral', 'Líbano'],
  'Valle del Cauca': ['Cali', 'Buenaventura', 'Palmira', 'Tuluá', 'Cartago', 'Jamundí', 'Buga', 'Yumbo', 'Candelaria', 'Florida', 'Pradera', 'Zarzal'],
  'Vaupés': ['Mitú'],
  'Vichada': ['Puerto Carreño', 'La Primavera']
};

export const GENERAL_FAQS = [
  {
    q: "¿Cómo es el proceso de envío?",
    a: "Realizamos envíos a toda Colombia. El tiempo estimado es de 2 a 5 días hábiles dependiendo de tu ubicación. Recibirás un número de guía para rastrear tu pedido."
  },
  {
    q: "¿Tienen registro INVIMA?",
    a: "Sí, todos nuestros productos son originales y cuentan con su respectivo Registro Sanitario INVIMA vigente, garantizando su seguridad y calidad."
  },
  {
    q: "¿Cómo funciona el pago contra entrega?",
    a: "Es muy sencillo: realizas el pedido a través de nuestra web o WhatsApp, y pagas el valor total en efectivo únicamente cuando el transportador entregue el producto en tu puerta."
  },
  {
    q: "¿Tienen garantía de satisfacción?",
    a: "Garantizamos que recibirás un producto 100% original y en perfecto estado. Si el empaque llega dañado, realizamos el cambio sin costo adicional."
  }
];
