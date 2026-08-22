export interface ComponentBenefit {
  name: string;
  benefit: string;
}

export interface Product {
  id: string;
  masterId: string;
  name: string;
  description: string;
  shortDescription: string;
  benefits: string[];
  image: string;
  basePrice: number;
  size?: string;
  componentBenefits?: ComponentBenefit[];
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
  presentation?: string;
  peso_adicional?: number;
  supportImages?: string[];
  videoUrl?: string;
  videoUrlMp4?: string;
  videoPoster?: string;
  googleCategory?: string;
  condition?: 'new';
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
  },
  { 
    id: 'combos', 
    name: 'Combos', 
    icon: 'Sparkles',
    image: '/assets/categories/Combos.webp',
    color: 'emerald',
    description: 'Nuestra selección exclusiva de combos especialmente diseñados para multiplicar tu salud integral, belleza y vitalidad al mejor precio y con ahorro garantizado.',
    seoTitle: 'Combos y Ofertas Especiales de Salud y Bienestar | Zenhogar',
    seoDescription: 'Accede a los mejores combos de salud, desintoxicación, belleza y bienestar formulados por ZENHOGAR con registro INVIMA y envío sin costo.'
  }
];

export type Category = typeof CATEGORIES[number];

export const PRODUCTS: Product[] = [
  {
    id: 'rtafull',
    masterId: '11323',
    name: 'RtaFull',
    category: 'salud-bienestar',
    shortDescription: 'Apoyo Hepático y Desintoxicación Digestiva Natural.',
    description: `Recupera la sensación de ligereza con RtaFull, el suplemento diseñado para favorecer la depuración natural de tu organismo. Su fórmula combina extractos botánicos de alcachofa, berenjena, apio y flor de jamaica, que actúan en armonía para promover la reducción de toxinas. RtaFull es el aliado ideal para quienes buscan reducir la pesadez abdominal, favorecer la digestión y revitalizar su bienestar desde el interior.

Ideal para procesos de detox y depuración profunda, este suplemento especialmente formulado ayuda a descongestionar el sistema digestivo, promoviendo una sensación de bienestar inmediato y una vitalidad renovada. Con su formato líquido de rápida absorción, RtaFull asegura que los activos naturales lleguen directamente a tu organismo donde más se necesitan.

✔️ Depuración Total: Ayuda a la limpieza interna del hígado y los riñones de impurezas y grasas.
✔️ Adiós a la Inflamación: Reduce la pesadez estomacal y la sensación de hinchazón tras las comidas.
✔️ Alianza Herbal: El poder del apio y el perejil para una función renal óptima y defensas activas.`,
    seoTitle: 'Rtafull: Apoyo para la desintoxicación del organismo naturalmente | Zenhogar',
    seoDescription: 'Apoya tu salud hepática y favorece la reducción de la pesadez con Rtafull. Concentrado natural con Alcachofa y Berenjena para una digestión más ligera. ¡Registro INVIMA!',
    benefits: [
      'Ayuda en la depuración natural de hígado y riñones de toxinas acumuladas',
      'Favorece la reducción de la pesadez y el malestar tras comer',
      'Estimula el bienestar digestivo para un abdomen más ligero',
      'Fórmula líquida concentrada de absorción ultra-rápida y segura',
      'Ingredientes 100% naturales con certificación de calidad oficial'
    ],
    image: '/assets/products/rtafull.webp',
    basePrice: 79900,
    size: '500ml',
    presentation: 'Líquido',
    invima: 'PSA-000932-2017',
    peso_adicional: 0,
    googleCategory: 'Health & Beauty > Health Care > Fitness & Nutrition',
    condition: 'new',
    supportImages: [
      '/assets/products/rtafull-apoyo-1.webp',
      '/assets/products/rtafull-apoyo-2.webp',
      '/assets/products/rtafull-apoyo-3.webp',
      '/assets/products/rtafull-apoyo-4.webp'
    ],
    keywords: 'limpieza hígado, digestión ligera, pesadez abdominal, depurar el organismo, alcachofa, Rtafull, Zenhogar, bienestar hepático',
    components: 'Alcachofa, Flor de Jamaica, Berenjena, Apio y Perejil',
    componentBenefits: [
    {
        'name': 'Alcachofa y Berenjena',
        'benefit': 'Favorecen los procesos digestivos naturales y apoyan la correcta asimilación de las grasas de los alimentos.'
    },
    {
        'name': 'Apio y Perejil',
        'benefit': 'Contribuyen a la eliminación normal de líquidos en el organismo y apoyan las funciones de depuración natural.'
    },
    {
        'name': 'Flor de Jamaica',
        'benefit': 'Aporta antioxidantes que ayudan a proteger las células frente al estrés oxidativo cotidiano.'
    }
],
    longTailKeywords: [
      'mejor suplemento líquido para limpiar el hígado rápidamente',
      'cómo reducir la sensación de pesadez abdominal después de comer mucho',
      'solución natural para la depuración total del organismo',
      'beneficios de la alcachofa para un hígado saludable y feliz',
      'fórmula líquida de rápida absorción para digestión ligera',
      'bienestar integral y limpieza profunda con registro INVIMA',
    ],
    seoFaqs: [
      { q: '¿Cómo debo consumir este producto para obtener mejores resultados?', a: 'Consumir de 1 a 2 copas dosificadoras (15ml - 30ml) al día.' },
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
    masterId: '11341',
    name: 'Coliplus',
    category: 'salud-bienestar',
    shortDescription: 'Renovación Intestinal y Equilibrio Digestivo Natural.',
    description: `Libera tu sistema digestivo con Coliplus, la mezcla de fibras premium diseñada para restaurar el tránsito intestinal y purificar el colon de forma gentil y efectiva. Su combinación única de linaza, pitaya y espirulina actúa como un suave motor interno que combate el estreñimiento crónico y reduce la hinchazón abdominal persistente. Coliplus no solo facilita el ir al baño con regularidad, sino que nutre tu microbiota intestinal para una salud digestiva de largo plazo.

Formulado sin azúcares añadidos, es el aliado perfecto para personas diabéticas o quienes buscan cuidar su figura sin sacrificar el sabor. Con un delicioso toque a manzana verde, Coliplus se integra fácilmente en tu rutina diaria, proporcionando hasta 2 meses de bienestar continuo y una sensación de ligereza abdominal inigualable.

✔️ Regularidad Garantizada: Mezcla de chía y pitaya que asegura un movimiento intestinal fluido y natural.
✔️ Colon Saludable: Limpieza profunda de residuos acumulados sin causar irritación ni cólicos.
✔️ Rendimiento Superior: Fórmula concentrada de 450g que rinde el doble que las fibras convencionales.`,
    seoTitle: 'Coliplus: Cómo regular el tránsito intestinal y depurar el colon | Zenhogar',
    seoDescription: 'Recupera tu regularidad con Coliplus. Fibra natural con Pitaya y Espirulina para depurar el colon y reconfortar el vientre. ¡Rinde 2 meses y tiene Registro INVIMA!',
    benefits: [
      'Regula el tránsito intestinal combatiendo el estreñimiento de raíz',
      'Favorece el confort del colon y reduce la pesadez abdominal de forma estable',
      'Fórmula apta para diabéticos, libre de azúcares y calorías extras',
      'Nutre la flora intestinal con superalimentos como la espirulina',
      'Máxima rentabilidad: rinde hasta 60 días de bienestar diario'
    ],
    image: '/assets/products/coliplus.webp',
    basePrice: 75900,
    size: '450g',
    presentation: 'Polvo',
    invima: 'NSA-0012423-2022',
    peso_adicional: 0,
    googleCategory: 'Health & Beauty > Health Care > Fitness & Nutrition',
    condition: 'new',
    supportImages: [
      '/assets/products/coliplus-apoyo-1.webp',
      '/assets/products/coliplus-apoyo-2.webp',
      '/assets/products/coliplus-apoyo-3.webp',
      '/assets/products/coliplus-apoyo-4.webp'
    ],
    keywords: 'limpieza intestinal, estreñimiento, fibras naturales, pitaya, espirulina, digestión fácil, salud digestiva, Coliplus, Zenhogar',
    components: 'Linaza, Pitaya, Flor de Jamaica, Alcachofa, Chía y Espirulina',
    componentBenefits: [
    {
        'name': 'Linaza',
        'benefit': 'Aporta fibra natural y mucílagos que favorecen el tránsito intestinal y apoyan una evacuación regular.'
    },
    {
        'name': 'Pitaya',
        'benefit': 'Promueve el movimiento intestinal de forma natural y ayuda a mitigar la sensación de pesadez o tránsito lento.'
    },
    {
        'name': 'Flor de Jamaica y Alcachofa',
        'benefit': 'Contribuyen a reducir la pesadez estomacal y promueven el confort digestivo general.'
    },
    {
        'name': 'Espirulina',
        'benefit': 'Aporta nutrientes esenciales que apoyan y protegen el equilibrio de la flora intestinal.'
    }
],
    longTailKeywords: [
      'mejor fibra natural para ir al baño regularmente',
      'cómo limpiar el colon sin azúcar de forma segura',
      'suplemento de fibra rentable que rinde 2 meses',
      'beneficios de la pitaya y espirulina para el intestino',
      'fórmula para digestión fácil apta para diabéticos',
      'bienestar integral digestivo con registro INVIMA',
    ],
    seoFaqs: [
      { q: '¿Cómo debo consumir este producto para obtener mejores resultados?', a: 'Mezclar 1 cucharada sopera en un vaso de agua o jugo.' },
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
    masterId: '11312',
    name: 'Colágeno',
    category: 'salud-bienestar',
    shortDescription: 'Regeneración Estructural y Vitalidad Osteomuscular.',
    description: `Restaura la elasticidad de tu cuerpo y fortalece tu sistema estructural desde el interior con nuestro Colágeno Hidrolizado + Citrato de Magnesio. Esta fórmula avanzada de alta pureza ha sido diseñada para quienes buscan recuperar la movilidad perdida, proteger sus articulaciones del desgaste y mejorar la calidad de su descanso nocturno. La combinación de péptidos de colágeno de fácil absorción con el citrato de magnesio potencia la regeneración de tejidos, cartílagos y ligamentos, combatiendo los signos visibles del envejecimiento como la flacidez y las líneas de expresión.

Ideal para toda la familia, este suplemento de sabor neutro se disuelve instantáneamente sin dejar grumos, siendo el complemento perfecto para tus bebidas diarias. El magnesio no solo optimiza la síntesis de colágeno, sino que promueve una relajación muscular profunda, ayudando a reducir el estrés y los calambres para que despiertes con una energía renovada.

✔️ Movilidad y Fuerza: Nutre profundamente el sistema óseo y mejora la flexibilidad de las articulaciones.
✔️ Belleza desde el Interior: Hidrata la piel en sus capas más profundas, fortaleciendo también cabello y uñas.
✔️ Pureza Familiar: Sabor neutro y disolución rápida, apto para todas las edades y estilos de vida activos.`,
    seoTitle: 'Colágeno + Citrato de Magnesio: Regeneración Articular y Piel Firme | Zenhogar',
    seoDescription: 'Fortalece tus articulaciones y mejora la firmeza de tu piel con Colágeno + Citrato de Magnesio. Fórmula pura para vitalidad ósea y descanso reparador. ¡Calidad INVIMA!',
    benefits: [
      'Fortalece la estructura ósea y protege las articulaciones del desgaste',
      'Mejora notablemente la elasticidad de la piel y reduce la flacidez',
      'Promueve una relajación muscular profunda y un sueño reparador',
      'Sabor totalmente neutro, ideal para mezclar con café, jugos o agua',
      'Fórmula familiar segura para niños, adultos y personas mayores'
    ],
    image: '/assets/products/Colagenocitratodemagnesio.webp',
    basePrice: 85000,
    size: '180g',
    presentation: 'Polvo',
    invima: 'RSA-0026265-2023',
    googleCategory: 'Health & Beauty > Health Care > Fitness & Nutrition',
    condition: 'new',
    supportImages: [
      '/assets/products/colageno-apoyo-1.webp',
      '/assets/products/colageno-apoyo-2.webp',
      '/assets/products/colageno-apoyo-3.webp',
      '/assets/products/colageno-apoyo-4.webp'
    ],
    keywords: 'colágeno natural, sabor neutro, hidratación piel, colágeno familiar, piel suave, Zenhogar, colágeno puro',
    components: 'Colágeno Hidrolizado y Citrato de Magnesio',
    componentBenefits: [
    {
        'name': 'Colágeno Hidrolizado',
        'benefit': 'Proporciona los aminoácidos necesarios que apoyan la estructura natural y la firmeza de la piel y los cartílagos.'
    },
    {
        'name': 'Citrato de Magnesio',
        'benefit': 'Apoya el funcionamiento muscular normal y contribuye al mantenimiento saludable del sistema óseo.'
    }
],
    longTailKeywords: [
      'mejor colágeno sin sabor para mezclar con jugos',
      'cómo hidratar la piel desde adentro con colágeno natural',
      'suplemento de colágeno apto para niños y adultos mayores',
      'beneficios del colágeno puro para la elasticidad de la piel',
      'fórmula neutra para nutrición familiar diaria',
      'bienestar integral y piel suave con registro INVIMA',
    ],
    seoFaqs: [
      { q: '¿Cómo debo consumir este producto para obtener mejores resultados?', a: 'Disolver 1 cucharada en agua o jugo una vez al día.' },
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
    masterId: '22967',
    name: 'Resvisfactor',
    category: 'salud-bienestar',
    shortDescription: 'Favorece Tu Sistema Inmunológico y Vitalidad Celular Avanzada.',
    description: `Fortalece tus defensas naturales y protege tu organismo con Resvisfactor, el sistema de protección biológica de vanguardia. Esta poderosa fórmula combina el calostro bovino (el "oro líquido" de la naturaleza) con los beneficios milenarios del hongo Shiitake y los betaglucanos del Ganoderma Lucidum. Diseñado para ser el soporte diario de tu familia, Resvisfactor ayuda a modular la respuesta inmunológica, acelerar la recuperación física y proporcionar una carga masiva de antioxidantes que combaten el daño celular.

Enriquecido con un complejo multivitamínico total y Omega 3, 6 y 9, este suplemento no solo previene infecciones recurrentes, sino que aporta una vitalidad inmediata para enfrentar jornadas exigentes. Su base nutricional de proteína de soya y suero lo convierte en el complemento ideal para adultos mayores, jóvenes y personas que buscan una protección superior contra virus y bacterias en un entorno cambiante.

✔️ Fortalecimiento Inmune: Calostro y Shiitake que actúan como un blindaje natural contra agentes externos.
✔️ Recuperación y Vitalidad: Aminoácidos esenciales (L-Arginina, L-Glutamina) para una regeneración muscular óptima.
✔️ Nutrición Completa: Omega 3-6-9 y vitaminas esenciales para el equilibrio metabólico de toda la familia.`,
    seoTitle: 'Resvisfactor Calostro Bovino: Refuerzo Total de Defensas | Zenhogar',
    seoDescription: 'Fortalece tu sistema inmunológico con Resvisfactor. Fórmula con Calostro Bovino y Shiitake para un escudo natural y vitalidad inmediata. ¡Calidad INVIMA garantizada!',
    benefits: [
      'Eleva significativamente las defensas naturales y la respuesta inmune',
      'Aporta una sensación de vigor y vitalidad constante durante el día',
      'Ideal para la protección familiar contra virus, gripes y bacterias',
      'Acelera la recuperación física y protege las células del estrés oxidativo',
      'Fórmula completa con Omega 3-6-9 y 12 vitaminas fundamentales'
    ],
    image: '/assets/products/Resvisfactor.webp',
    basePrice: 89900,
    size: '700g',
    presentation: 'Polvo',
    invima: 'RSAD05i27915',
    googleCategory: 'Health & Beauty > Health Care > Fitness & Nutrition',
    condition: 'new',
    supportImages: [
      '/assets/products/resvis-apoyo-1.webp',
      '/assets/products/resvis-apoyo-2.webp',
      '/assets/products/resvis-apoyo-3.webp',
      '/assets/products/resvis-apoyo-4.webp'
    ],
    keywords: 'antioxidante, sistema inmune, resveratrol, energía vital, defensas, vitalidad diaria, Resvis Factor, Zenhogar',
    components: 'Calostro Bovino, Shiitake, Quinua, Malta y Vitaminas',
    componentBenefits: [
    {
        'name': 'Calostro Bovino y Shiitake',
        'benefit': 'Favorecen el fortalecimiento de las defensas naturales y apoyan el normal funcionamiento del sistema inmune.'
    },
    {
        'name': 'Quinua y Malta',
        'benefit': 'Aportan energía limpia y aminoácidos esenciales.'
    },
    {
        'name': 'Vitaminas',
        'benefit': 'Contribuyen al rendimiento energético diario y al buen funcionamiento general del organismo.'
    }
],
    longTailKeywords: [
      'mejor antioxidante natural para proteger las células',
      'cómo fortalecer el sistema inmunológico con resveratrol',
      'suplemento para energía real y vitalidad cada mañana',
      'beneficios del resveratrol para el escudo de vida diario',
      'fórmula para defensas arriba y protección antioxidante',
      'bienestar integral y vitalidad con registro INVIMA',
    ],
    seoFaqs: [
      { q: '¿Cómo debo consumir este producto para obtener mejores resultados?', a: 'Disolver de 1 a 2 cucharadas (15g - 30g) en un vaso con agua o leche.' },
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
      description: 'En ZENHOGAR impulsamos tu vitalidad con fórmulas que actúan desde el interior. Resvisfactor es la opción ideal para quienes buscan una protección natural superior, combinando calostro y hongos funcionales para mantener tus defensas siempre activas.'
    }
  },
  {
    id: 'booster-lion',
    masterId: '129326',
    name: 'Booster Lion',
    category: 'salud-bienestar',
    shortDescription: 'Soporte Cognitivo, Memoria y Enfoque Natural con Melena de León.',
    description: `Optimiza tu rendimiento mental y potencia tu claridad cognitiva con Booster Lion, el alimento funcional de última generación diseñado a base de crema de coco. Su fórmula premium está enriquecida con vitaminas y minerales esenciales, teniendo como ingrediente estrella 300 mg de Betaglucanos de Hericium Erinaceus (Melena de León), un hongo funcional ampliamente estudiado y reconocido por su capacidad para estimular el enfoque, la memoria y la salud cerebral.

Enriquecido con una fuente de proteína de suero lácteo de excelente calidad, Booster Lion promueve el fortalecimiento muscular y la recuperación física, mientras sus betaglucanos aportan un soporte único para mejorar la salud del sistema digestivo. Disfruta de un delicioso sabor artificial a vainilla fina, sin preocuparte por azúcares añadidos ni partículas extrañas; es una bebida nutritiva y sumamente práctica creada para nutrir tu mente y potenciar tu estilo de vida activo.

✔️ Salud Cognitiva: Favorece la memoria, concentración y activa tu agilidad mental ante jornadas de alta exigencia.
✔️ Inmunidad y Vigor: Premezcla de sales minerales y vitaminas esenciales que robustecen las defensas naturales y protegen contra el cansancio cerebral.
✔️ Formulación Limpia: 100% libre de azúcares añadidos y libre de impurezas para asegurar máxima asimilación y pureza cerebral.`,
    seoTitle: 'Booster Lion Melena de León | Enfoque y Salud Mental | Zenhogar',
    seoDescription: 'Potencia tu concentración y claridad mental con Booster Lion. Alimento con hongo funcional Melena de León, vitaminas y sabor vainilla. ¡Registro INVIMA IRSA-0021928-2022!',
    benefits: [
      'Contiene Melena de León para optimizar la memoria, concentración y salud cognitiva',
      'Aporta vitaminas y minerales esenciales que fortalecen activamente tu sistema inmune',
      'Fuente de proteína de suero lácteo que favorece la energía limpia y mantenimiento muscular',
      'Contribuye al bienestar digestivo y regenerador gracias a los betaglucanos premium',
      'Alimento bajo en calorías, ideal para complementar un estilo de vida saludable y activo',
      'Sin azúcares añadidos, formulado en polvo fino de exquisito sabor vainilla'
    ],
    image: '/assets/products/booster-lion.webp',
    basePrice: 79900,
    size: '350g',
    presentation: 'Polvo',
    invima: 'IRSA-0021928-2022',
    googleCategory: 'Health & Beauty > Health Care > Fitness & Nutrition',
    condition: 'new',
    supportImages: [
      '/assets/products/booster-lion-apoyo-1.webp',
      '/assets/products/booster-lion-apoyo-2.webp',
      '/assets/products/booster-lion-apoyo-3.webp',
      '/assets/products/booster-lion-apoyo-4.webp'
    ],
    keywords: 'booster lion, boster lion, melena de leon, hongo funcional, enfoque mental, memoria, salud cerebral, zenhogar, suplemento concentracion',
    components: 'Crema de coco, Proteína de suero lácteo, Betaglucanos de Hericium erinaceus (Melena de león), Sabor artificial a vainilla, Vitaminas y Minerales',
    componentBenefits: [
      {
        'name': 'Hericium Erinaceus (Melena de León)',
        'benefit': 'Hongo adaptógeno reconocido por ayudar a estimular el factor de crecimiento nervioso, protegiendo las redes cognitivas.'
      },
      {
        'name': 'Crema de Coco y Suero Lácteo',
        'benefit': 'Lípidos saludables de fácil asimilación y rica fuente de aminoácidos para la recuperación muscular prolongada.'
      },
      {
        'name': 'Vitaminas B, C, D, Calcio y Magnesio',
        'benefit': 'Complejo de micronutrientes de alta biodisponibilidad para blindar el sistema inmune y combatir la fatiga crónica.'
      }
    ],
    longTailKeywords: [
      'mejor suplemento de melena de leon para enfoque y memoria',
      'cómo mejorar la concentracion y salud cerebral de forma natural',
      'alimento a base de crema de coco con hongos funcionales',
      'beneficios de booster lion para personas de alta exigencia mental',
      'polvo de melena de leon para vitalidad libre de picos de ansiedad',
      'bienestar cerebral and digestivo con betaglucanos de hericium erinaceus',
      'cómo complementar la nutricion del cerebro con vitaminas y minerales',
      'suplemento para estudiantes y deportistas con registro INVIMA',
      'bebida de vainilla con melena de leon sin azucares añadidos'
    ],
    seoFaqs: [
      { q: '¿Cómo se debe consumir Booster Lion?', a: 'Se recomienda mezclar 1 y media cucharadas en agua, leche o bebida vegetal caliente o fría; disolver perfectamente mediante licuadora o agitando.' },
      { q: '¿Contiene alérgenos la formulación?', a: 'Contiene derivados lácteos provenientes de la proteína de suero, por lo que no es apto para personas con alergias severas a la leche.' },
      { q: '¿En cuánto tiempo se sienten los efectos cognitivos?', a: 'La asimilación de sus vitaminas y el aporte energético se perciben de manera inmediata, mientras que la óptima claridad mental progresa con el uso diario continuo.' }
    ],
    promos: [
      { id: '1u', label: '1 Unidad', units: 1, price: 79900 },
      { id: '2u', label: '2 Unidades', units: 2, price: 119850 },
      { id: '2x3', label: 'Pague 2 Lleve 3', units: 3, price: 159800, badge: '⭐ Recomendado' },
      { id: '3x5', label: 'Pague 3 Lleve 5', units: 5, price: 239700, badge: '🔥 Mejor Oferta' }
    ],
    testimonials: [
      { name: 'Diana Marcela', text: 'Excelente para estudiar, me concentro por horas sin sentir cansancio ni dolor de cabeza.', rating: 5 },
      { name: 'Andrés Felipe', text: 'El sabor a vainilla es increíble y me ayuda muchísimo con la memoria en mi trabajo.', rating: 5 }
    ],
    whyChoose: {
      title: 'Enfoque Superior Sin Límites',
      description: 'En ZENHOGAR impulsamos tu rendimiento diario. Booster Lion integra las bondades del hongo funcional Melena de León con un perfil vitamínico avanzado para blindar tu mente y vitalidad con el respaldo de un registro INVIMA certificado.'
    }
  },
  {
    id: 'locion',
    masterId: '11236',
    name: 'Termoactiva',
    category: 'salud-bienestar',
    shortDescription: 'Alivio Muscular Termoactivo y Recuperación Profunda.',
    description: `Experimenta un alivio inmediato y reconfortante con nuestra Loción Termoactiva, el cuidado intensivo diseñado para liberar la tensión acumulada en tus músculos y articulaciones. Su potente fórmula botánica combina los beneficios ancestrales de la uña de gato, la árnica y el castaño de indias para penetrar profundamente en las capas de la piel, proporcionando un calor reconfortante que relaja las fibras musculares y mejora la sensación de bienestar local al instante.

Ideal para deportistas que buscan acelerar su recuperación o para quienes sufren de fatiga muscular tras largas jornadas de trabajo o actividad, esta loción no grasosa se absorbe en segundos sin manchar la ropa. Ya sea una molestia en el cuello, pesadez en las piernas o un dolor articular inoportuno, la Loción Termoactiva de ZENHOGAR actúa como un aliado natural que devuelve la movilidad y el confort a tu cuerpo.

✔️ Calor Reparador: Estimula la superficie cutánea para reconfortar y aliviar la zona rápidamente.
✔️ Alianza Botánica: Árnica y Chuchuguaza que trabajan en sinergia para reconfortar tras golpes y torceduras.
✔️ Bienestar Inmediato: Textura ligera de rápida acción que relaja tensiones y mejora la flexibilidad.`,
    seoTitle: 'Loción Termoactiva: Alivio para Dolores Musculares y Articulares | Zenhogar',
    seoDescription: 'Alivia el dolor y la tensión con la Loción Termoactiva de ZENHOGAR. Efecto calor profundo con Árnica y Uña de Gato para recuperación muscular total. ¡Registro INVIMA!',
    benefits: [
      'Alivio casi instantáneo de dolores musculares, golpes y calambres',
      'Efecto calor profundo que relaja tensiones y desinflama tejidos',
      'Fórmula botánica con extractos de alta pureza y absorción rápida',
      'Ideal para masajes de recuperación deportiva y relajación diaria',
      'No deja residuos grasos y es amable con todo tipo de piel'
    ],
    image: '/assets/products/Termoactiva.webp',
    basePrice: 59900,
    size: '120ml',
    presentation: 'Crema / Gel',
    invima: 'NSOC74321-16CO',
    googleCategory: 'Health & Beauty > Health Care > Fitness & Nutrition',
    condition: 'new',
    supportImages: [
      '/assets/products/locion-apoyo-1.webp',
      '/assets/products/locion-apoyo-2.webp',
      '/assets/products/locion-apoyo-3.webp',
      '/assets/products/locion-apoyo-4.webp'
    ],
    keywords: 'dolor muscular, tensión cuello, cansancio en piernas, fatiga muscular, masajes, alivio rápido, loción termoactiva, Zenhogar',
    components: 'Árnica, Castaño de Indias, Caléndula, Uña de Gato y Chuchuguaza',
    componentBenefits: [
    {
        'name': 'Árnica y Uña de Gato',
        'benefit': 'Brindan un rápido alivio y confort en los músculos de forma externa.'
    },
    {
        'name': 'Castaño de Indias',
        'benefit': 'Favorece la sensación de ligereza y ayuda a mitigar la pesadez en las zonas aplicadas.'
    },
    {
        'name': 'Caléndula y Chuchuguaza',
        'benefit': 'Calman la irritación de la piel y aportan una sensación de bienestar y movilidad en las articulaciones.'
    }
],
    longTailKeywords: [
      'mejor loción con efecto calor para tensión en la espalda',
      'cómo aliviar la tensión muscular en el cuello rápidamente',
      'alternativa natural para mejorar la circulación en las piernas',
      'loción termoactiva para masajes deportivos y recuperación',
      'fórmula balanceada para alivio de contracturas musculares',
      'bienestar integral corporal con masajes de calor profundo',
      'cómo reducir la fatiga muscular después del ejercicio intenso',
      'loción para el cuidado muscular diario',
      'alivio rápido de dolores articulares con calidad certificada',
      'masaje terapéutico con ingredientes naturales para relajación'
    ],
    seoFaqs: [
      { q: '¿Cómo debo aplicar este producto para obtener mejores resultados?', a: 'Aplicar una cantidad suficiente y masajear la zona afectada.' },
      { q: '¿Para qué sirve el efecto calor de la loción?', a: 'El calor ayuda a dilatar los vasos sanguíneos, mejorando la circulación y relajando las fibras musculares tensionadas.' },
      { q: '¿Se puede usar antes de hacer ejercicio?', a: 'Sí, ayuda a preparar los músculos para la actividad, promoviendo un bienestar integral y flexibilidad.' },
      { q: '¿Mancha la ropa?', a: 'Nuestra fórmula balanceada es de rápida absorción y no deja residuos grasos ni manchas en las prendas.' }
    ],
    promos: [
      { id: '1u', label: '1 Unidad', units: 1, price: 59900 },
      { id: '2u', label: '2 Unidades', units: 2, price: 89850 },
      { id: '2x3', label: 'Pague 2 Lleve 3', units: 3, price: 119800, badge: '⭐ Recomendado' },
      { id: '3x5', label: 'Pague 3 Lleve 5', units: 5, price: 179700, badge: '🔥 Mejor Oferta' }
    ],
    testimonials: [
      { name: 'Roberto J.', text: 'El calor que genera es perfecto para mis tensión en la espalda. Alivio inmediato.', rating: 5 },
      { name: 'Sandra Milena', text: 'La uso después de entrenar y mis músculos se recuperan mucho más rápido.', rating: 5 }
    ],
    whyChoose: {
      title: 'Alivio que reconforta tu cuerpo',
      description: 'En ZENHOGAR estamos comprometidos con tu salud, ofrecemos productos con registro INVIMA e ingredientes botánicos seguros. Nuestra loción termoactiva es ideal para todos los que tienen tensión muscular generados por cansancio, agotamiento o que padecen de desgaste ocasional, respaldado por estándares de calidad.'
    }
  },
  // New products for Salud y Bienestar
  {
    id: 'c-lagen',
    masterId: '144660',
    name: 'C-Lagen',
    category: 'salud-bienestar',
    shortDescription: 'Regeneración Articular con Vitalidad Marina.',
    description: `Recupera la libertad de movimiento con C-Lagen, el colágeno hidrolizado de origen marino diseñado específicamente para fortalecer y regenerar tus articulaciones críticas como rodillas, caderas y hombros. Su estructura molecular especializada asegura una absorción hasta 1.5 veces mayor que los colágenos tradicionales, permitiendo que sus péptidos lleguen directamente al cartílago y tendones para restaurar su resistencia y elasticidad.

Potenciado con un complejo multivitamínico total y citrato de magnesio, C-Lagen no solo protege tus huesos del desgaste, sino que nutre el sistema nervioso para una respuesta muscular más ágil. Es la solución definitiva para quienes sienten rigidez al despertar o molestias al subir escaleras, proporcionando una base sólida de minerales que mantienen tu esqueleto joven y funcional a cualquier edad.

✔️ Poder Oceánico: Colágeno marino de alta biodisponibilidad para una reconstrucción articular real.
✔️ Huesos Macizos: Minerales esenciales que previenen la desmineralización y fortalecen la densidad ósea.
✔️ Movilidad sin Límites: Nutre profundamente ligamentos y tendones para un caminar fluido y sin dolor.`,
    seoTitle: 'C-Lagen Colágeno Marino: Salud de Rodillas y Articulaciones | Zenhogar',
    seoDescription: 'Fortalece tus rodillas y recupera tu movilidad con C-Lagen. Colágeno Marino puro con Magnesio para una regeneración articular superior. ¡Registro INVIMA certificado!',
    benefits: [
      'Máxima biodisponibilidad gracias a su origen marino de alta pureza',
      'Protege y regenera cartílagos desgastados en rodillas y caderas',
      'Fortalece la densidad ósea con su aporte de magnesio y minerales',
      'Mejora notablemente la flexibilidad de tendones y ligamentos',
      'Deliciosa fórmula en polvo de fácil disolución para tu rutina diaria'
    ],
    image: '/assets/products/C-lagen.webp',
    basePrice: 93500,
    size: '500g',
    presentation: 'Polvo',
    invima: 'RSA-0032379-2024',
    googleCategory: 'Health & Beauty > Health Care > Fitness & Nutrition',
    condition: 'new',
    supportImages: [
      '/assets/products/c-lagen-apoyo-1.webp',
      '/assets/products/c-lagen-apoyo-2.webp',
      '/assets/products/c-lagen-apoyo-3.webp',
      '/assets/products/c-lagen-apoyo-4.webp'
    ],
    keywords: 'colágeno marino, molestias articulares, salud articular, huesos fuertes, magnesio, movilidad, C-Lagen, Zenhogar',
    components: 'Colágeno Marino, Citrato de Magnesio, Vitaminas y Minerales',
    componentBenefits: [
    {
        'name': 'Colágeno Marino',
        'benefit': 'Posee una excelente absorción que favorece la elasticidad de la piel y apoya su firmeza natural.'
    },
    {
        'name': 'Citrato de Magnesio, Vitaminas y Minerales',
        'benefit': 'Contribuyen al bienestar de las articulaciones y promueven una agradable sensación de relajación y descanso.'
    }
],
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
      { q: '¿Cómo debo consumir este producto para obtener mejores resultados?', a: 'Disolver 1 cucharada (15g) en agua o jugo de frutas.' },
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
    masterId: '129312',
    name: 'Citramix',
    category: 'salud-bienestar',
    shortDescription: 'Equilibrio Neuro-Muscular y Relax Profundo.',
    description: `Encuentra la calma y libera la tensión acumulada con Citramix, la solución maestra de magnesio diseñada para equilibrar tu sistema nervioso y relajar tus músculos de forma integral. Su fórmula avanzada utiliza una mezcla estratégica de citrato y bisglicinato de magnesio, asegurando que cada célula de tu cuerpo reciba este mineral vital para evitar calambres, tics nerviosos y la rigidez muscular provocada por el estrés diario.

Con un refrescante sabor a durazno maduro, Citramix no solo mejora tu descanso nocturno, sino que su alto contenido de fibra previene la pesadez abdominal y regula la presión arterial de manera natural. Enriquecido con un complejo multivitamínico revitalizante, es el complemento perfecto para desconectar tras una jornada exigente, ayudándote a recuperar la paz mental y la ligereza física que necesitas.

✔️ Triple Acción de Magnesio: Optimiza la relajación muscular y combate el estrés crónico de raíz.
✔️ Adiós a los Calambres: Previene espasmos y rigidez, mejorando la flexibilidad de todo el cuerpo.
✔️ Bienestar Digestivo: La inulina incorporada promueve una digestión ligera y un vientre desinflamado.`,
    seoTitle: 'Citramix Magnesio Durazno: Relax Muscular y Paz Mental | Zenhogar',
    seoDescription: 'Dile adiós al estrés y los calambres con Citramix. Triple aporte de Magnesio para un descanso profundo y músculos relajados. ¡Delicioso sabor a durazno!',
    benefits: [
      'Relaja profundamente los músculos evitando calambres y rigidez',
      'Combate el agotamiento nervioso y mejora la calidad del descanso',
      'Promueve una digestión equilibrada y libre de pesadez abdominal diaria',
      'Aporta un complejo vitamínico completo para la vitalidad celular',
      'Sabor premium a durazno, ideal para disfrutar frío en la noche'
    ],
    image: '/assets/products/Citramix.webp',
    basePrice: 79900,
    size: '350g',
    invima: 'SD2023-0004812',
    googleCategory: 'Health & Beauty > Health Care > Fitness & Nutrition',
    condition: 'new',
    supportImages: [
      '/assets/products/citramix-apoyo-1.webp',
      '/assets/products/citramix-apoyo-2.webp',
      '/assets/products/citramix-apoyo-3.webp',
      '/assets/products/citramix-apoyo-4.webp'
    ],
    keywords: 'magnesio, calambres, estrés, digestión ligera, relajación muscular, paz mental, Citramix, Zenhogar',
    components: 'Citrato de Magnesio, Bisglicinato de Magnesio y Vitaminas',
    componentBenefits: [
    {
        'name': 'Citrato y Bisglicinato de Magnesio',
        'benefit': 'Doble fuente de magnesio de alta disponibilidad que apoya el rendimiento muscular, ayuda a evitar la fatiga y promueve un descanso profundo y reparador.'
    },
    {
        'name': 'Vitaminas',
        'benefit': 'Disminuyen el cansancio diario.'
    }
],
    longTailKeywords: [
      'mejor mezcla de magnesio para evitar calambres musculares',
      'cómo mantener la calma y reducir el estrés diariamente',
      'suplemento para digestión ligera sin pesadez abdominal',
      'beneficios del magnesio para el descanso de los músculos',
      'fórmula para relajar los nervios de forma natural',
      'bienestar integral y tranquilidad con registro INVIMA',
    ],
    seoFaqs: [
      { q: '¿Cómo debo consumir este producto para obtener mejores resultados?', a: 'Mezclar 1 cucharada (15g) en un vaso de agua, ideal en la noche.' },
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
    masterId: '23012',
    name: 'Coffee + Colágeno',
    category: 'salud-bienestar',
    shortDescription: 'Ritual de Belleza y Vitalidad Diaria Especializada.',
    description: `Transforma tu primera taza del día en un potente ritual de rejuvenecimiento con Coffee + Colágeno. Esta deliciosa mezcla combina el aroma estimulante del café soluble premium con los beneficios estructurales del colágeno hidrolizado, todo sobre una base cremosa y saludable de coco. Diseñado para nutrir tu belleza desde la raíz, este café funcional fortalece tu cabello, aporta brillo a tu piel y robustez a tus uñas mientras te proporciona la energía necesária para conquistar tu jornada.

Libre de lácteos y grasas trans, nuestra fórmula se apoya en los triglicéridos de cadena media (MCT) del coco para una energía cerebral sostenida sin pesadez estomacal. Enriquecido con 12 vitaminas fundamentales, Coffee + Colágeno es más que un capricho; es tu seguro diario de vitalidad que cuida tu estética y tu sistema óseo en cada sorbo.

✔️ Belleza Estructural: Bio-péptidos de colágeno que restauran la firmeza de la piel y fuerza capilar.
✔️ Energía con Propósito: Café funcional con crema de coco que activa tu mente sin irritar el estómago.
✔️ Blindaje Vitamínico: Carga completa de vitaminas A, C, D, E y complejo B para defensas invencibles.`,
    seoTitle: 'Coffee + Colágeno con Crema de Coco: Belleza y Energía | Zenhogar',
    seoDescription: 'Fortalece tu cabello y uñas mientras disfrutas tu café. Coffee + Colágeno con base de Coco y 12 vitaminas para una belleza integral. ¡Calidad INVIMA!',
    benefits: [
      'Fortalece la fibra capilar y las uñas desde las capas internas',
      'Promueve una piel luminosa y elástica gracias al colágeno puro',
      'Aporta energía limpia y sostenida con los beneficios del coco',
      'Contiene el 50% del requerimiento diario de vitaminas clave',
      'Sabor gourmet cremoso sin azúcar añadida ni pesadez gástrica'
    ],
    image: '/assets/products/Coffe+colageno.webp',
    basePrice: 75900,
    size: '400g',
    invima: 'RSA-0010130-2020',
    googleCategory: 'Health & Beauty > Health Care > Fitness & Nutrition',
    condition: 'new',
    supportImages: [
      '/assets/products/cafe-colageno-apoyo-1.webp',
      '/assets/products/cafe-colageno-apoyo-2.webp',
      '/assets/products/cafe-colageno-apoyo-3.webp',
      '/assets/products/cafe-colageno-apoyo-4.webp'
    ],
    keywords: 'café con colágeno, crema de coco, belleza integral, fortalecer cabello, uñas fuertes, vitaminas, Coffee Colágeno, Zenhogar',
    components: 'Crema de Coco, Colágeno Hidrolizado y Café Soluble',
    componentBenefits: [
    {
        'name': 'Café Soluble',
        'benefit': 'Aporta un impulso rápido de energía y mejora el enfoque diario.'
    },
    {
        'name': 'Crema de Coco',
        'benefit': 'Proporciona grasas saludables (MCT) que apoyan el rendimiento mental y la claridad.'
    },
    {
        'name': 'Colágeno Hidrolizado',
        'benefit': 'Favorece y fortalece la estructura natural del cabello, la piel y las uñas.'
    }
],
    longTailKeywords: [
      'mejor café con colágeno para fortalecer cabello y uñas',
      'cómo cuidar tu belleza mientras tomas el café matutino',
      'suplemento de café con crema de coco para evitar gases',
      'beneficios de las 12 vitaminas para la vitalidad diaria',
      'fórmula antiedad para disfrutar en el desayuno',
      'bienestar integral y defensas fuertes con registro INVIMA',
    ],
    seoFaqs: [
      { q: '¿Cómo debo consumir este producto para obtener mejores resultados?', a: 'Disolver 1 cucharada (20g) en una taza de agua o leche caliente.' },
      { q: '¿Sabe a café normal?', a: 'Sí, mantiene el delicioso sabor del café premium colombiano, pero con el beneficio añadido del colágeno para tu bienestar integral.' },
      { q: '¿Ayuda a fortalecer el cabello?', a: 'El colágeno es fundamental para la salud capilar, por lo que notarás mejoras en fuerza y brillo.' }
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
    masterId: '164776',
    name: 'Creatina 100%',
    category: 'salud-bienestar',
    shortDescription: 'Poder Muscular y Agudeza Mental Superior.',
    description: `Alcanza tu máximo potencial físico y cognitivo con nuestra Creatina 100% Pura, el suplemento de grado farmacéutico diseñado para quienes no aceptan menos que la perfección. Nuestra creatina monohidratada de alta densidad optimiza la resíntesis de ATP, permitiéndote entrenar con una fuerza explosiva y recuperarte en tiempo récord. No es solo un aliado para el músculo; la creatina es un potente combustible cerebral que mejora la memoria de trabajo y la velocidad de procesamiento mental, manteniéndote enfocado y alerta en tus desafíos diarios.

Libre de rellenos, sabores artificiales o aditivos innecesarios, esta fórmula de máxima pureza es ideal tanto para deportistas de élite como para adultos mayores que desean preservar su vitalidad muscular y cognitiva. Su solubilidad instantánea permite consumirla fácilmente en cualquier bebida, garantizando que cada gramo trabaje en favor de tu rendimiento integral.

✔️ Fuerza Real: Potencia la contracción muscular y el volumen celular para una estructura física sólida.
✔️ Enfoque Cerebral: Nutre las neuronas y reduce la fatiga mental, mejorando la concentración sostenida.
✔️ Grado Farmacéutico: Pureza total bajo estándares USP, asegurando un suplemento limpio y ultra-seguro.`,
    seoTitle: 'Creatina 100% Pura Monohidratada: Fuerza y Enfoque | Zenhogar',
    seoDescription: 'Potencia tus músculos y cerebro con Creatina 100% pura de ZENHOGAR. Grado farmacéutico USP para fuerza real, recuperación rápida y claridad mental. ¡Compra calidad!',
    benefits: [
      'Aumenta la fuerza explosiva y el rendimiento físico de alta intensidad',
      'Mejora significativamente la memoria, el enfoque y la agudeza mental',
      'Acelera la recuperación muscular post-entrenamiento evitando el catabolismo',
      'Fórmula 100% pura monohidratada, sin rellenos ni azúcares añadidos',
      'Calidad de grado farmacéutico USP para una seguridad y absorción total'
    ],
    image: '/assets/products/creatina100.webp',
    basePrice: 105000,
    size: '200g',
    invima: 'SD2014-0003204',
    googleCategory: 'Health & Beauty > Health Care > Fitness & Nutrition',
    condition: 'new',
    supportImages: [
      '/assets/products/creatina-apoyo-1.webp',
      '/assets/products/creatina-apoyo-2.webp',
      '/assets/products/creatina-apoyo-3.webp',
      '/assets/products/creatina-apoyo-4.webp'
    ],
    keywords: 'creatina pura, fuerza muscular, rendimiento cerebral, vitalidad, Zenhogar, creatina USP',
    components: 'Creatina monohidratada 100% pura',
    componentBenefits: [
    {
        'name': 'Creatina Monohidratada',
        'benefit': 'Optimiza los niveles de energía en los músculos, favoreciendo un mayor rendimiento, fuerza y resistencia durante el entrenamiento.'
    }
],
    longTailKeywords: [
      'mejor creatina pura para ganar fuerza en brazos y piernas',
      'cómo mantener la mente despierta y concentrada naturalmente',
      'suplemento de creatina para vitalidad en adultos mayores',
      'beneficios de la creatina pura para el cerebro y músculos',
      'fórmula 100% pura sin rellenos ni sabores artificiales',
      'bienestar integral y fuerza real con calidad farmacéutica USP',
    ],
    seoFaqs: [
      { q: '¿Cómo debo consumir este producto para obtener mejores resultados?', a: 'Disolver 1 medida (5g) en agua antes o después de entrenar.' },
      { q: '¿La creatina 100% causa retención de líquidos?', a: 'La creatina aumenta la hidratación intracelular, lo cual es beneficioso para el músculo y el bienestar integral.' },
      { q: '¿Necesito fase de carga?', a: 'No es estrictamente necesaria; una dosis constante diaria asegura resultados con nuestra fórmula balanceada.' },
      { q: '¿Es segura para los riñones?', a: 'En personas que buscan bienestar y bajo las dosis recomendadas, es un suplemento con calidad certificada y muy seguro.' }
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
    masterId: '11299',
    name: 'Iprossmen',
    category: 'salud-bienestar',
    shortDescription: 'Salud Masculina Integral y Apoyo al Bienestar Urinario.',
    description: `Protege tu vitalidad y cuida tu salud con Iprossmen, la solución fitoterapéutica avanzada diseñada exclusivamente para las necesidades del hombre moderno. Su fórmula de alta precisión aprovecha el poder antioxidante del licopeno de tomate y los arándanos rojos para brindar soporte natural que reconforta la zona pélvica y favorece la función urinaria. Iprossmen ayuda a regular los procesos inflamatorios de la próstata, permitiéndote mantener una vida activa y libre de molestias persistentes.

Enriquecido con jengibre, ciruela y vitamina E, este elixir masculino actúa como un potente regenerador celular que combate el envejecimiento del sistema reproductor. Es el aliado indispensable para hombres que buscan prevención y equilibrio hormonal, asegurando un flujo de energía constante y un bienestar integral que se siente desde los primeros días de uso.

✔️ Bienestar Pélvico: Ayuda a desinflamar y proteger la salud de la próstata de forma preventiva.
✔️ Vigor Natural: Extractos frutales que aportan antioxidantes clave para la vitalidad masculina.
✔️ Protección Celular: Rico en vitamina E y polifenoles que combaten el daño oxidativo sistémico.`,
    seoTitle: 'Iprossmen: Salud de la Próstata y Bienestar del Hombre | Zenhogar',
    seoDescription: 'Cuida tu salud masculina con Iprossmen. Fórmula natural con Licopeno de Tomate y Arándanos para proteger la próstata y darte vigor diario. ¡Registro INVIMA certificado!',
    benefits: [
      'Protege y reconforta la salud de la próstata de manera preventiva',
      'Mejora notablemente la función urinaria y reduce la inflamación pélvica',
      'Aporta una potente carga de antioxidantes específicos para el hombre',
      'Favorece el equilibrio hormonal y mantiene los niveles de vigor elevados',
      'Fórmula líquida de alta absorción con ingredientes naturales certificados'
    ],
    image: '/assets/products/Iprossmen.webp',
    basePrice: 79900,
    size: '500ml',
    invima: 'SD2015-0003504',
    googleCategory: 'Health & Beauty > Personal Care',
    condition: 'new',
    supportImages: [
      '/assets/products/iprossmen-apoyo-1.webp',
      '/assets/products/iprossmen-apoyo-2.webp',
      '/assets/products/iprossmen-apoyo-3.webp',
      '/assets/products/iprossmen-apoyo-4.webp'
    ],
    keywords: 'salud masculina, próstata, vitalidad, tomate de árbol, prevención, bienestar hombre, Iprossmen, Zenhogar',
    components: 'Té Verde, Tomate de Árbol, Arándanos, Mandarina, Jengibre, Ciruela y Vitamina E',
    componentBenefits: [
    {
        'name': 'Té Verde, Tomate de Árbol y Arándanos',
        'benefit': 'Aportan licopeno y polifenoles que favorecen el bienestar del sistema urinario y apoyan la salud del hombre.'
    },
    {
        'name': 'Mandarina, Jengibre y Ciruela',
        'benefit': 'Mejoran la digestión y absorción.'
    },
    {
        'name': 'Vitamina E',
        'benefit': 'Excelente antioxidante natural que ayuda a proteger las células.'
    }
],
    longTailKeywords: [
      'mejor suplemento natural para confortar la zona pélvica',
      'cómo cuidar la salud masculina de forma natural y segura',
      'suplemento de tomate de árbol para el bienestar del hombre',
      'beneficios del saw palmetto para la prevención masculina',
      'fórmula para sentirse vital y con energía todo el día',
      'bienestar integral y salud del hombre con registro INVIMA',
    ],
    seoFaqs: [
      { q: '¿Cómo debo consumir este producto para obtener mejores resultados?', a: 'Tomar de 1 a 2 cucharadas (15ml - 30ml) al día.' },
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
    masterId: '129333',
    name: 'KDS 10',
    category: 'salud-bienestar',
    shortDescription: 'Suplemento Vitamínico y Energía Vital Familiar.',
    description: `Asegura la nutrición de quienes más quieres con KDS 10, el sistema multivitamínico de espectro completo diseñado para cubrir las brechas nutricionales de toda la familia. Su fórmula diseñada sobre una base cremosa de coco potencia la absorción de vitaminas A, C, D, E y el complejo B, proporcionando un blindaje inmunológico real y una energía física inagotable. Ideal para niños en etapa de crecimiento, adultos con jornadas exigentes y personas mayores, KDS 10 garantiza que el organismo reciba cada mineral esencial para su correcto funcionamiento.

Más que un simple suplemento, KDS 10 actúa como un revitalizante metabólico que combate la fatiga mental y fortalece la estructura ósea gracias a su aporte de zinc y hierro. Su deliciosa textura y fácil disolución lo convierten en el complemento perfecto para el desayuno diario, brindando la tranquilidad de saber que tu salud y la de los tuyos está respaldada por una fórmula de grado superior y calidad certificada.

✔️ Inmunidad Total: Fortalece las defensas naturales contra virus y bacterias del entorno escolar y laboral.
✔️ Crecimiento y Vigor: Aporta los ladrillos nutricionales necesarios para el desarrollo físico y mental.
✔️ Absorción Superior: Base de coco que facilita el transporte de micronutrientes a las células de forma eficiente.`,
    seoTitle: 'KDS 10 Multivitamínico Familiar: Defensas y Vitalidad | Zenhogar',
    seoDescription: 'Fortalece a toda tu familia con KDS 10. Complejo completo de vitaminas y minerales para defensas altas y energía sin límites. ¡Nutrición inteligente certificada!',
    benefits: [
      'Proporciona el 100% de las vitaminas y minerales esenciales diarios',
      'Fortalece drásticamente el sistema inmunológico de niños y adultos',
      'Ayuda a reducir el cansancio físico recurrente y mejora el enfoque mental',
      'Delicioso sabor y base de coco que asegura una digestión ligera',
      'Ideal para complementar dietas con deficiencias o periodos de desgaste'
    ],
    image: '/assets/products/Kds10.webp',
    basePrice: 79900,
    size: '350g',
    invima: 'RSA-0025607-2023',
    googleCategory: 'Health & Beauty > Health Care > Fitness & Nutrition',
    condition: 'new',
    supportImages: [
      '/assets/products/kds-10-apoyo-1.webp',
      '/assets/products/kds-10-apoyo-2.webp',
      '/assets/products/kds-10-apoyo-3.webp',
      '/assets/products/kds-10-apoyo-4.webp'
    ],
    keywords: 'multivitamínico, vitalidad diaria, vitaminas y minerales, KDS 10, Zenhogar',
    components: 'Crema de coco, Proteína de suero, Magnesio, Hierro, Zinc y Complejo Vitamínico',
    componentBenefits: [
    {
        'name': 'Proteína de suero y Crema de coco',
        'benefit': 'Aportan bloques de construcción muscular y energía.'
    },
    {
        'name': 'Hierro y Zinc',
        'benefit': 'undamentales para apoyar la producción de glóbulos rojos y contribuir al desarrollo físico y cognitivo diario.'
    },
    {
        'name': 'Magnesio y Vitaminas',
        'benefit': 'Contribuyen al funcionamiento normal del sistema inmunológico.'
    }
],
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
      { q: '¿Cómo debo consumir este producto para obtener mejores resultados?', a: 'Disolver 1 cucharada (20g) en un vaso de agua, leche o jugo.' },
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
    masterId: '57848',
    name: 'Liofhim',
    category: 'salud-bienestar',
    shortDescription: 'Ritual de Descanso Nocturno y Sueño Reparador.',
    description: `Recupera el placer de dormir profundamente y despierta con una energía renovada gracias a Liofhim, el complemento de relajación botánica de ZENHOGAR. Su fórmula ayuda a calmar la mente, combina extractos concentrados de manzanilla, albahaca y hierbabuena, actuando como un bálsamo para promover la serenidad. Liofhim facilita el descanso nocturno y promueve un sueño de alta calidad, ayudando a mantener la continuidad del reposo y evitando la agitación nocturna.

A diferencia de los somníferos químicos, Liofhim promueve un descanso fisiológico natural sin causar dependencia ni somnolencia al día siguiente. Es el aliado perfecto para calmar la ansiedad nocturna, relajar los músculos y permitir que tu mente se regenere por completo. Despídete del insomnio y redescubre lo que significa tener una mente clara y un cuerpo revitalizado cada mañana.

✔️ Apagado Mental: Calma el flujo de pensamientos intrusivos para una relajación profunda e inmediata.
✔️ Sueño Continuo: Ayuda a mantener un estado de descanso estable y sin interrupciones durante la noche.
✔️ Amanecer Vital: Fórmula herbal que asegura despertar sin pesadez, con máxima claridad y vigor.`,
    seoTitle: 'Liofhim Descanso Profundo: Sueño Reparador y Calma Natural | Zenhogar',
    seoDescription: 'Duerme profundamente con Liofhim. Mezcla botánica de Manzanilla y Albahaca para apagar la mente y despertar renovado cada mañana. ¡Sin somnolencia diurna!',
    benefits: [
      'Facilita el inicio del sueño profundo de forma rápida y natural',
      'Disminuye los despertares nocturnos logrando un descanso ininterrumpido',
      'Reduce significativamente el estrés y la tensión acumulada del día',
      'Despierta con la mente lúcida y energía renovada sin efectos secundarios',
      'Sabor botánico relajante de alta pureza con registro INVIMA certificado'
    ],
    image: '/assets/products/Liofhim.webp',
    basePrice: 75900,
    size: '500ml',
    presentation: 'Líquido',
    invima: 'RSA-0020527-2022',
    googleCategory: 'Health & Beauty > Health Care > Fitness & Nutrition',
    condition: 'new',
    supportImages: [
      '/assets/products/liofhim-apoyo-1.webp',
      '/assets/products/liofhim-apoyo-2.webp',
      '/assets/products/liofhim-apoyo-3.webp',
      '/assets/products/liofhim-apoyo-4.webp'
    ],
    keywords: 'dormir profundo, insomnio, descanso real, manzanilla, albahaca, sueño reparador, Liofhim, Zenhogar',
    components: 'Manzanilla, Albahaca, Anís, Hierbabuena y Vitaminas C y E',
    componentBenefits: [
    {
        'name': 'Manzanilla, Albahaca y Anís',
        'benefit': 'Extractos herbales con propiedades relajantes que promueven la tranquilidad, disminuyen el estrés diario y facilitan un descanso profundo.'
    },
    {
        'name': 'Hierbabuena',
        'benefit': 'Aporta una sensación de alivio y confort digestivo ideal para las noches.'
    },
    {
        'name': 'Vitaminas C y E',
        'benefit': 'Apoyan la regeneración natural de las células y protegen el cuerpo durante el descanso nocturno.'
    }
],
    longTailKeywords: [
      'mejor bebida natural para dormir profundo toda la noche',
      'cómo evitar los despertares a medianoche y descansar',
      'suplemento para apagar la mente y dormir más rápido',
      'beneficios de la manzanilla y albahaca para el sueño',
      'fórmula para despertar renovado y con energía positiva',
      'bienestar integral y descanso real con registro INVIMA',
    ],
    seoFaqs: [
      { q: '¿Cómo debo consumir este producto para obtener mejores resultados?', a: 'Tomar 1 copa (15ml) dos veces al día o diluir en un litro de agua.' },
      { q: '¿Liofhim me dará sueño durante el día?', a: 'No, su efecto es relajante para la noche, ayudándote a apagar la mente y lograr un descanso real sin somnolencia al despertar.' },
      { q: '¿Es un medicamento para dormir?', a: 'No, es una bebida natural a base de plantas como Manzanilla y Albahaca que promueven el bienestar integral y la calma.' }
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
    masterId: '26272',
    name: 'Liteplex',
    category: 'salud-bienestar',
    shortDescription: 'Bienestar Digestivo y Ligereza Metabólica.',
    description: `Recupera la armonía de tu sistema digestivo con Liteplex, el concentrado botánico diseñado para proporcionar un alivio rápido y natural contra la pesadez y la acidez. Su fórmula de alta pureza combina extractos de jengibre, menta y albahaca, que actúan como un bálsamo reconfortante en el tracto digestivo, facilitando una digestión ligera incluso después de comidas abundantes. Liteplex es el aliado ideal para quienes buscan mantener un metabolismo activo y un vientre plano sin recurrir a químicos agresivos.

Endulzado naturalmente con estevia, este refrescante suplemento con sabor a limón se absorbe instantáneamente, proporcionando una sensación de frescura y bienestar que perdura. Es la solución perfecta para llevar contigo y asegurar que tu jornada no se vea interrumpida por molestias abdominales, permitiéndote disfrutar de cada momento con total ligereza y confort.

✔️ Alivio Estomacal: Calma la acidez y la pesadez abdominal con la frescura natural del limón y la menta.
✔️ Digestión Ágil: El jengibre y la albahaca estimulan el tránsito digestivo para evitar la hinchazón.
✔️ Pureza Saludable: Sin azúcar añadida y bajo en calorías, ideal para mantener tu equilibrio metabólico diaria.`,
    seoTitle: 'Liteplex Alivio Digestivo: Digestión Ligera y Bienestar Natural | Zenhogar',
    seoDescription: 'Dile adiós a la pesadez y la acidez con Liteplex de ZENHOGAR. Concentrado de Jengibre y Limón para una digestión ágil y un vientre desinflamado. ¡Calidad INVIMA!',
    benefits: [
      'Alivio casi inmediato contra la pesadez estomacal y la acidez',
      'Promueve una digestión ágil y previene la hinchazón abdominal',
      'Fórmula líquida concentrada de origen botánico y rápida absorción',
      'Endulzado con estevia, apto para quienes cuidan su figura y salud',
      'Delicioso sabor a limón que proporciona frescura y ligereza constante'
    ],
    image: '/assets/products/Liteplex.webp',
    basePrice: 79900,
    size: '500ml',
    presentation: 'Líquido',
    invima: 'PSA-000932-2017',
    googleCategory: 'Health & Beauty > Health Care > Fitness & Nutrition',
    condition: 'new',
    supportImages: [
      '/assets/products/liteplex-apoyo-2.webp',
      '/assets/products/liteplex-apoyo-3.webp',
      '/assets/products/liteplex-apoyo-4.webp'
    ],
    keywords: 'digestión ligera, alivio estomacal, acidez, pesadez, Liteplex, Zenhogar, jengibre, limón',
    components: 'Té Verde, Jengibre, Limón, Albahaca y Menta',
    componentBenefits: [
    {
        'name': 'Té Verde y Jengibre',
        'benefit': 'Estimulan la digestión lenta y favorecen el bienestar y confort de las paredes estomacales.'
    },
    {
        'name': 'Limón, Albahaca y Menta',
        'benefit': 'Ayudan a mantener un pH equilibrado en el estómago, aportan frescura y promueven una digestión ligera y sin pesadez.'
    }
],
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
      { q: '¿Cómo debo consumir este producto para obtener mejores resultados?', a: 'Tomar 1 copa (15ml) dos veces al día o diluir en agua.' },
      { q: '¿Liteplex ayuda a optimizar tu figura?', a: 'Sí, su fórmula balanceada apoya los procesos metabólicos naturales para una mejor utilización de las grasas.' },
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
    masterId: '11264',
    name: 'Maxlite',
    category: 'salud-bienestar',
    shortDescription: 'Nutrición Estructural y Vitalidad Osteoarticular.',
    description: `Eleva tu nutrición diaria con Maxlite, la mezcla súper-alimento diseñada para fortalecer tu estructura física y rejuvenecer tu piel desde el interior. Esta fórmula premium combina los péptidos de colágeno hidrolizado con la riqueza proteica de la quinua orgánica, creando un sistema de soporte completo para tus huesos, articulaciones y tejidos. Enriquecido con el potente antioxidante de resveratrol y omega 3-6-9, Maxlite combate el desgaste celular y promueve una elasticidad superior en todo tu cuerpo.

Complementado con un amplio espectro de vitaminas esenciales, este suplemento es el aliado perfecto para personas activas que no desean que el paso del tiempo limite su ritmo. Su textura ligera y nutritiva nutre profundamente la fibra capilar y la dermis, devolviéndole la luminosidad al rostro y la firmeza al cabello, todo con el respaldo de una fórmula balanceada de alta pureza.

✔️ Cuidado Articular Superior: Colágeno y quinua que restauran la movilidad y protegen contra el desgaste.
✔️ Piel y Cabello Radiante: Biotina y vitaminas que fortalecen la queratina natural y reducen la flacidez.
✔️ Energía Multivitamínica: Carga completa de micronutrientes para una vitalidad inagotable y defensas fuertes.`,
    seoTitle: 'Maxlite Colágeno y Quinua: Nutrición Celular y Salud Articular | Zenhogar',
    seoDescription: 'Fortalece tus huesos y rejuvenece tu piel con Maxlite. Fórmula con Quinua, Colágeno y Resveratrol para una vitalidad integral y movilidad sin límites. ¡Calidad INVIMA!',
    benefits: [
      'Fortalece la estructura ósea y protege las articulaciones del desgaste diario',
      'Mejora visiblemente la firmeza de la piel y la salud de cabello y uñas',
      'Aporta una carga de energía natural gracias a los superalimentos como la quinua',
      'Potente acción antioxidante preventiva con Resveratrol y Omega 3-6-9',
      'Suplemento nutricional integral ideal para mantener un estilo de vida activo'
    ],
    image: '/assets/products/Maxlite.webp',
    basePrice: 89900,
    size: '800g',
    presentation: 'Polvo',
    invima: 'SD2017-0004051',
    googleCategory: 'Health & Beauty > Health Care > Fitness & Nutrition',
    condition: 'new',
    supportImages: [
      '/assets/products/maxlite-apoyo-1.webp',
      '/assets/products/maxlite-apoyo-2.webp',
      '/assets/products/maxlite-apoyo-3.webp',
      '/assets/products/maxlite-apoyo-4.webp'
    ],
    keywords: 'colágeno ligera, quinua, articulaciones, piel firme, Maxlite, Zenhogar',
    components: 'Péptidos de Colágeno, Resveratrol, Quinua, Omega 3-6-9 y Vitaminas',
    componentBenefits: [
    {
        'name': 'Péptidos de Colágeno',
        'benefit': 'Estructuras de alta absorción que apoyan la producción natural de colágeno y contribuyen al bienestar del sistema óseo.'
    },
    {
        'name': 'Resveratrol y Omegas',
        'benefit': 'Favorecen la salud cardiovascular y aportan antioxidantes que ayudan a retrasar los efectos del estrés oxidativo en las células.'
    }
],
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
      { q: '¿Cómo debo consumir este producto para obtener mejores resultados?', a: 'Mezclar 1 cucharada (15g) en un vaso de agua o leche.' },
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
    masterId: '11247',
    name: 'Megamac',
    category: 'salud-bienestar',
    shortDescription: 'Potencia Ancestral y Energía Vital Extrema.',
    description: `Recupera el vigor y la energía que tu cuerpo reclama con Megamac, el revitalizador natural más potente de nuestra línea. Inspirado en la sabiduría de la biodiversidad colombiana, Megamac combina los extractos sagrados de maca, borojó y chontaduro en una fórmula de alta densidad nutricional diseñada para erradicar el cansancio crónico y la debilidad física. Es el combustible ideal para quienes enfrentan jornadas extenuantes, deportistas de alto rendimiento o cualquier persona que busque un impulso real de vitalidad.

Enriquecido con una base proteica de suero y minerales críticos como el magnesio y el zinc, este suplemento no solo mejora tu respuesta física, sino que mantiene tu mente alerta y enfocada bajo presión. Megamac actúa como un tónico integral que fortalece tus defensas y optimiza tu fuerza muscular, permitiéndote alcanzar metas que antes parecían inalcanzables con la seguridad de una nutrición pura y equilibrada.

✔️ Energía Explosiva: Maca y Borojó que actúan como motores naturales de vitalidad física y mental.
✔️ Recuperación Máxima: Proteína de suero y aminoácidos que reconstruyen el vigor tras el esfuerzo.
✔️ Enfoque y Resistencia: Minerales clave que combaten la fatiga y mantienen el sistema nervioso equilibrado.`,
    seoTitle: 'Megamac Borojó y Maca: Energía Extrema y Vigor Natural | Zenhogar',
    seoDescription: 'Combate el cansancio y potencia tu energía con Megamac. Fórmula ancestral con Borojó y Chontaduro para una vitalidad inagotable y rendimiento superior. ¡Registro INVIMA!',
    benefits: [
      'Efecto revitalizante inmediato contra el cansancio físico y mental crónico',
      'Aumenta significativamente el rendimiento en actividades de alta exigencia',
      'Fortalece las defensas naturales y aporta minerales críticos para la salud',
      'Ideal para recuperar el vigor tras largas jornadas de trabajo o entrenamiento',
      'Fórmula balanceada con superalimentos colombianos de máxima pureza'
    ],
    image: '/assets/products/Megamac.webp',
    basePrice: 89900,
    size: '700g',
    presentation: 'Polvo',
    invima: 'RSA-001291-2016',
    googleCategory: 'Health & Beauty > Health Care > Fitness & Nutrition',
    condition: 'new',
    supportImages: [
      '/assets/products/megamac-apoyo-1.webp',
      '/assets/products/megamac-apoyo-2.webp',
      '/assets/products/megamac-apoyo-3.webp',
      '/assets/products/megamac-apoyo-4.webp'
    ],
    keywords: 'energía extrema, vitalidad, rendimiento, Megamac, Zenhogar',
    components: 'Maca, Borojó, Proteína de Suero, Vitaminas y Minerales',
    componentBenefits: [
    {
        'name': 'Maca y Borojó',
        'benefit': 'Actúan como energizantes naturales que optimizan el rendimiento físico y ayudan a disminuir la fatiga.'
    },
    {
        'name': 'Proteína de Suero',
        'benefit': 'Nutre la masa muscular.'
    },
    {
        'name': 'Vitaminas y Minerales',
        'benefit': 'Ideales para recuperar energía en el desgaste diario.'
    }
],
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
      { q: '¿Cómo debo consumir este producto para obtener mejores resultados?', a: 'Disolver de 1 a 2 cucharadas en un vaso de leche o agua.' },
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
    masterId: '129297',
    name: 'Resveratrol',
    category: 'salud-bienestar',
    shortDescription: 'Protección Celular y Ritual de Juventud Longevital.',
    description: `Detén el paso del tiempo y protege tu salud celular con Resveratrol, el suplemento para longevidad definitivo que combina la ciencia antienvejecimiento más avanzada con la pureza de la naturaleza. Nuestra fórmula en polvo de alta pureza entrega una dosis masiva de resveratrol, potenciada con 10,000 mg de colágeno hidrolizado de fácil absorción. Este sistema antioxidante bicapa actúa neutralizando los radicales libres desde el interior, promoviendo una regeneración profunda que se refleja en una piel más firme, un cabello radiante y una vitalidad renovada.

Enriquecido con extractos de arándanos y uva liofilizada, el Resveratrol de ZENHOGAR es un excelente coadyudante para tu sistema cardiovascular y cerebral. Es el ritual diario indispensable para quienes buscan una juventud prolongada y un bienestar integral, asegurando que cada célula de tu cuerpo funcione en su nivel óptimo para una vida larga, activa y saludable.

✔️ Blindaje Antioxidante: Protege el ADN celular contra el daño oxidativo y el envejecimiento prematuro.
✔️ Regeneración de Tejidos: 10,000 mg de colágeno que restauran la turgencia de la piel y salud articular.
✔️ Bienestar Cardiovascular: Los polifenoles de la uva favorecen una circulación saludable y bienestar estable.`,
    seoTitle: 'Resveratrol Antioxidante con 10,000mg de Colágeno | Zenhogar',
    seoDescription: 'Protege tus células y rejuvenece tu piel con el Resveratrol de ZENHOGAR. Potente antioxidante líquido con Colágeno para una vitalidad celular superior. ¡Alta absorción!',
    benefits: [
      'Potente acción antioxidante que combate el envejecimiento celular prematuro',
      'Restituye la firmeza y elasticidad de la piel con 10,000 mg de colágeno',
      'Protege el sistema cardiovascular y cerebral del estrés oxidativo diario',
      'Fórmula líquida concentrada para una absorción inmediata y efectiva',
      'Cuidado integral que promueve la longevidad y una vitalidad renovada'
    ],
    image: '/assets/products/Resveratrol.webp',
    basePrice: 79900,
    size: '350g',
    presentation: 'Polvo',
    invima: 'SD2014-0003215',
    googleCategory: 'Health & Beauty > Health Care > Fitness & Nutrition',
    condition: 'new',
    supportImages: [
      '/assets/products/resveratrol-apoyo-1.webp',
      '/assets/products/resveratrol-apoyo-2.webp',
      '/assets/products/resveratrol-apoyo-3.webp',
      '/assets/products/resveratrol-apoyo-4.webp'
    ],
    keywords: 'resveratrol, antioxidante, antiedad, cuidado celular, Zenhogar',
    components: 'Resveratrol, Colágeno Hidrolizado (10.000mg), Arándano y Uva liofilizada',
    componentBenefits: [
    {
        'name': 'Resveratrol, Arándano y Uva',
        'benefit': 'Altos en polifenoles que favorecen la salud cardiovascular y ayudan a proteger las células contra el daño oxidativo.'
    },
    {
        'name': '10.000mg de Colágeno',
        'benefit': 'Alta dosis que apoya la elasticidad y la firmeza natural de la piel.'
    }
],
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
      { q: '¿Cómo debo consumir este producto para obtener mejores resultados?', a: 'Mezclar 1 cucharada (15g) en un vaso de agua o leche.' },
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
    masterId: '23015',
    name: 'Eventone',
    category: 'belleza-integral',
    shortDescription: 'Brillo, Vitalidad y Tono Uniforme para tu Rostro.',
    description: `Ilumina tu belleza natural con Eventone, el suero perfeccionador de alto impacto diseñado para favorecer la uniformidad y unificar el tono de tu piel. Su fórmula maestra combina el poder regenerador del Bio-Retinol (alternativa natural al retinol tradicional) con la hidratación profunda del ácido hialurónico y extractos calmantes de manzanilla. Eventone es el aliado ideal penetrando las capas profundas de la dermis para equilibrar la apariencia de la piel, reduciendo visiblemente las irregularidades causadas por el sol, la edad o factores externos.

Además de su acción iluminadora, Eventone proporciona un efecto revitalizador que suaviza las líneas de expresión y mejora la firmeza de la piel, devolviéndole su luminosidad y brillo natural. Con su textura sedosa de rápida absorción, es el cuidado nocturno ideal para quienes buscan un rostro natural, libre de irregularidades y con una vitalidad renovada.

✔️ Tono Uniforme: Reduce progresivamente la intensidad de las manchas y equilibra el color de la piel.
✔️ Hidratación y Relleno: Ácido hialurónico de alto peso molecular que suaviza arrugas y mejora la turgencia.
✔️ Luminosidad Radiante: Recupera el brillo natural y la lozanía de un rostro descansado y saludable.`,
    seoTitle: 'Eventone: Cómo unificar el tono de la piel y reducir manchas | Zenhogar',
    seoDescription: 'Atenúa la apariencia de manchas y recupera la luminosidad con Eventone. Suero con Bio-Retinol y Ácido Hialurónico para un tono uniforme y firmeza real. ¡Registro INVIMA!',
    benefits: [
      'Unifica el tono de la piel y reduce manchas oscuras visibles',
      'Efecto relleno inmediato gracias al ácido hialurónico puro',
      'Regeneración profunda celular con Bio-Retinol sin irritación',
      'Diferencia notable en la luminosidad y textura del rostro',
      'Fórmula ligera y nutritiva ideal para tu rutina de cuidado nocturno'
    ],
    image: '/assets/products/Eventone.webp',
    basePrice: 85000,
    size: '30ml',
    presentation: 'Crema',
    invima: 'NSOC90432-19CO',
    googleCategory: 'Health & Beauty > Personal Care > Cosmetics',
    condition: 'new',
    supportImages: [
      '/assets/products/eventone-apoyo-1.webp',
      '/assets/products/eventone-apoyo-2.webp',
      '/assets/products/eventone-apoyo-3.webp',
      '/assets/products/eventone-apoyo-4.webp'
    ],
    keywords: 'unificar tono piel, atenuar irregularidades de tono, piel radiante, brillo natural, manchas oscuras, Eventone, Zenhogar, bio retinol',
    components: 'Bio Retinol, Ácido Hialurónico, Colágeno, B5, Manzanilla y Aloe Vera',
    componentBenefits: [
    {
        'name': 'Bio Retinol',
        'benefit': 'Favorece la revitalización de la piel para mejorar su textura y suavizar la apariencia de los signos de la edad.'
    },
    {
        'name': 'Ácido Hialurónico',
        'benefit': 'Retiene la humedad cutánea.'
    },
    {
        'name': 'Colágeno, B5, Manzanilla y Aloe Vera',
        'benefit': 'Calman, brindan una hidratación completa y apoyan la firmeza natural del rostro.'
    }
],
    longTailKeywords: [
      'mejor crema para unificar el tono de la piel y atenuar manchas faciales',
      'cómo devolver el brillo natural al rostro de forma segura con bio retinol',
      'cuidado nocturno para reducir manchas oscuras con ingredientes naturales',
      'beneficios del ácido hialurónico para una piel radiante y descansada',
      'fórmula suave para unificar el tono sin irritar la piel sensible',
      'bienestar integral cutáneo con registro INVIMA certificado en Colombia',
      'crema facial con bio-retinol para rejuvenecimiento nocturno sin irritación',
    ],
    seoFaqs: [
      { q: '¿Cómo debo aplicar este producto para obtener mejores resultados?', a: 'Aplicar únicamente en la noche sobre el rostro limpio, masajeando suavemente hasta su total absorción.' },
      { q: '¿En cuánto tiempo veo resultados con Eventone?', a: 'Con el uso nocturno constante, notarás un tono más uniforme y una piel más radiante a partir de las primeras 3 a 4 semanas de uso.' },
      { q: '¿Se puede usar en todo tipo de piel?', a: 'Sí, su fórmula balanceada con manzanilla y aloe vera está diseñada para ser respetuosa y suave incluso con pieles delicadas.' },
      { q: '¿Ayuda con las manchas de sol?', a: 'Efectivamente, sus componentes están enfocados en reducir la apariencia de manchas oscuras causadas por la exposición solar y el envejecimiento.' }
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
    masterId: '61681',
    name: 'Golden Passion',
    category: 'belleza-integral',
    shortDescription: 'Destello Dorado y Bronceado de Lujo sin Sol.',
    description: `Envuelve tu cuerpo en un resplandor eterno con Golden Passion, el aceite autobronceador de alta gama diseñado para quienes exigen un tono canela perfecto sin los riesgos de la radiación solar. Su fórmula sofisticada, enriquecida con vitamina E y aceites preciosos, se funde instantáneamente con tu piel para revelar un color dorado, uniforme y radiante en cuestión de horas. Golden Passion no solo embellece; hidrata profundamente, dejando un acabado satinado y una suavidad sedosa que resalta cada curva de tu cuerpo.

A diferencia de los autobronceadores convencionales, nuestra fórmula de secado rápido garantiza una aplicación libre de manchas y un aroma delicado que transforma tu rutina de cuidado en un ritual de lujo. Disfruta de una piel luminosa, nutrida y con ese aspecto de "recién llegada de vacaciones" durante todo el año, manteniendo la salud y la vitalidad de tu dermis con la excelencia de ZENHOGAR.

✔️ Tono Canela: Logra un bronceado natural, intenso y uniforme sin necesidad de exposición al sol.
✔️ Hidratación Luminosa: Nutre profundamente con vitamina E, evitando la resequedad y aportando un brillo saludable.
✔️ Acabado Terciopelo: Textura no grasa que se absorbe velozmente, permitiéndote vestirte de inmediato con total confianza.`,
    seoTitle: 'Golden Passion: Autobronceador de Lujo y Brillo Dorado | Zenhogar',
    seoDescription: 'Presume un bronceado perfecto todo el año con Golden Passion. Aceite autobronceador enriquecido con Vitamina E para un tono canela natural y piel radiante. ¡Sin manchas!',
    benefits: [
      'Proporciona un bronceado canela natural y uniforme en pocas horas',
      'Protege y nutre la piel con una potente dosis de Vitamina E pura',
      'Evita los daños acumulativos causados por la radiación UV del sol',
      'Fórmula satinada que aporta una luminosidad sofisticada y no grasa',
      'Incluye guía de aplicación experta para un resultado profesional en casa'
    ],
    image: '/assets/products/Goldenpassion.webp',
    basePrice: 79900,
    size: '90ml',
    presentation: 'Crema / Líquido',
    invima: 'NSOC35087-24CO',
    googleCategory: 'Health & Beauty > Personal Care > Cosmetics',
    condition: 'new',
    supportImages: [
      '/assets/products/golden-passion-apoyo-1.webp',
      '/assets/products/golden-passion-apoyo-2.webp',
      '/assets/products/golden-passion-apoyo-3.webp',
      '/assets/products/golden-passion-apoyo-4.webp'
    ],
    keywords: 'autobronceador, brillo piel, nutrición profunda, Golden Passion, Zenhogar',
    components: 'DHA, Vitamina E, Ácido Oleico y Ácido Palmitoleico',
    componentBenefits: [
    {
        'name': 'DHA y Vitamina E',
        'benefit': 'Ayudan a proteger la barrera cutánea frente a la oxidación externa.'
    },
    {
        'name': 'Ácido Oleico y Palmitoleico',
        'benefit': 'Nutren la superficie de la piel, favoreciendo un tono bronceado uniforme, luminoso y saludable.'
    }
],
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
      { q: '¿Cómo debo aplicar este producto para obtener mejores resultados?', a: 'Aplicar uniformemente sobre la piel limpia y seca.' },
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
    masterId: '11346',
    name: 'Hydrastrik',
    category: 'belleza-integral',
    shortDescription: 'Elásticidad y Nutrición Profunda Para Tu Piel.',
    description: `Desafía los límites de la elasticidad cutánea con Hydrastrik, el cuidado premium diseñado para blindar tu piel contra las estrías y la flacidez. Esta mezcla de aceites puros de almendras, coco y aguacate ayuda a crear una barrera lipídica de alta resistencia que nutre las fibras de colágeno y elastina en las capas más profundas de la dermis. Hydrastrik es el aliado indispensable durante etapas de cambio físico, ayudando a que tu piel se mantenga firme, flexible y con apariencia saludable.

Su textura fluida y su aroma envolvente lo convierten en el complemento perfecto para un masaje terapéutico que revitaliza los sentidos mientras restaura la suavidad perdida. Con cada aplicación, Hydrastrik infunde vitalidad a la piel deshidratada, devolviéndole su vitalidad natural y una sedosidad incomparable que se siente desde el primer contacto.

✔️ Elasticidad Blindada: Prepara y fortalece los tejidos para prevenir rupturas y marcas por estiramiento.
✔️ Regeneración Botánica: Aceites de grado superior que aceleran la renovación celular y suavizan cicatrices.
✔️ Confort Sensorial: Ideal para masajes relajantes, dejando la piel nutrida sin sensación pegajosa.`,
    seoTitle: 'Hydrastrik: Aceite Anti-Estrías y Elasticidad Cutánea | Zenhogar',
    seoDescription: 'Protege tu piel y previene estrías con Hydrastrik. Mezcla de aceites puros de Almendras y Aguacate para una elasticidad máxima y suavidad extrema. ¡Calidad INVIMA!',
    benefits: [
      'Previene eficazmente la formación de estrías al mejorar la elasticidad',
      'Nutrición profunda con óleos naturales de Almendra, Coco y Aguacate',
      'Mejora visiblemente la textura y firmeza en zonas críticas del cuerpo',
      'Fórmula de absorción inteligente ideal para masajes y rituales de cuidado',
      'Restaura la barrera lipídica natural devolviendo la flexibilidad a la piel'
    ],
    image: '/assets/products/Hydrastrik.webp',
    basePrice: 82500,
    size: '150ml',
    presentation: 'Aceite',
    invima: 'NSOC20441-23CO',
    googleCategory: 'Health & Beauty > Personal Care > Cosmetics',
    condition: 'new',
    supportImages: [
      '/assets/products/hydrastrik-apoyo-1.webp',
      '/assets/products/hydrastrik-apoyo-2.webp',
      '/assets/products/hydrastrik-apoyo-3.webp',
      '/assets/products/hydrastrik-apoyo-4.webp'
    ],
    keywords: 'hidratación intensiva, piel seca, fresapoya, Hydrastrik, Zenhogar',
    components: 'Almendras, Semillas de Uva, Jojoba, Coco, Mango y Aguacate',
    componentBenefits: [
    {
        'name': 'Aceites de Jojoba, Almendras y Semillas de Uva',
        'benefit': 'Nutren la piel intensamente, ayudando a mantener su flexibilidad y suavidad natural.'
    },
    {
        'name': 'Coco, Mango y Aguacate',
        'benefit': 'Forman una barrera protectora que ayuda a prevenir la sequedad y mantiene la hidratación.'
    }
],
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
      { q: '¿Cómo debo aplicar este producto para obtener mejores resultados?', a: 'Aplicar sobre la piel limpia para hidratar profundamente.' },
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
    masterId: '11290',
    name: 'Miskinne',
    category: 'belleza-integral',
    shortDescription: 'Perfeccionador Cutáneo y Escudo de Suavidad Calmante.',
    description: `Redescubre la claridad y la suavidad de un rostro perfecto con Miskinne, la crema perfeccionadora diseñada para pieles que exigen un cuidado extra-delicado. Su fórmula magistral, centrada en las propiedades calmantes de la avena natural y la caléndula orgánica, actúa como un escudo protector que alivia la irritación mientras trabaja activamente en unificar el tono de la piel. Miskinne penetra suavemente para atenuar irregularidades pigmentarias, devolviéndole a tu cutis su luminosidad original y una textura de seda.

Especialmente eficaz para suavizar zonas propensas a la resequedad y el sombreado, esta crema proporciona una hidratación profunda que calma la piel estresada por factores ambientales. Con su aroma limpio y reconfortante, Miskinne transforma tu rutina nocturna en un acto de purificación y equilibrio, asegurando que cada mañana despiertes con una piel visiblemente más radiante, descansada y uniforme.

✔️ Tono Sublime: Reduce progresivamente la apariencia de manchas sutiles y zonas sombreadas.
✔️ Calma Absoluta: La caléndula y la avena alivian instantáneamente la rojez y la sensibilidad cutánea.
✔️ Nutrición Sedosa: Crea una barrera de suavidad que mantiene la humedad esencial durante horas.`,
    seoTitle: 'Miskinne: Crema Unificadora de Tono y Cuidado Gentil | Zenhogar',
    seoDescription: 'Unifica tu tono y calma tu piel con Miskinne de ZENHOGAR. Hidratación profunda con Avena y Caléndula para un rostro luminoso y libre de manchas. ¡Suavidad total!',
    benefits: [
      'Atenúa visiblemente manchas superficiales y empareja el tono de la piel',
      'Proporciona un alivio inmediato a pieles sensibles, secas o irritadas',
      'Enriquecida con Avena y Caléndula para una nutrición natural y suave',
      'Protege la dermis contra futuras alteraciones de tono y agresiones externas',
      'Fórmula hipoalergénica de alta pureza con registro INVIMA certificado'
    ],
    image: '/assets/products/Miskinne.webp',
    basePrice: 59900,
    size: '60g',
    presentation: 'Crema',
    invima: 'NSOC85321-18CO',
    googleCategory: 'Health & Beauty > Personal Care > Cosmetics',
    condition: 'new',
    supportImages: [
      '/assets/products/miskinne-apoyo-1.webp',
      '/assets/products/miskinne-apoyo-2.webp',
      '/assets/products/miskinne-apoyo-3.webp',
      '/assets/products/miskinne-apoyo-4.webp'
    ],
    keywords: 'cuidado piel, suavidad, protección diaria, Miskinne, Zenhogar',
    components: 'Avena, Caléndula, Manteca de Karité, Vitamina E',
    componentBenefits: [
    {
        'name': 'Avena y Caléndula',
        'benefit': 'Calman la piel sensible e irritada.'
    },
    {
        'name': 'Manteca de Karité y Vitamina E',
        'benefit': 'Humectan intensamente y favorecen la elasticidad de la piel, ayudando a suavizar la apariencia de marcas e imperfecciones.'
    }
],
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
      { q: '¿Cómo debo aplicar este producto para obtener mejores resultados?', a: 'Aplicar en la noche y retirar con abundante agua al día siguiente.' },
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
    masterId: '11260',
    name: 'Tónico Capilar',
    category: 'belleza-integral',
    shortDescription: 'Densificadora Capilar y Ritual de Crecimiento Avanzado.',
    description: `Recupera la abundancia y la fuerza de tu cabello con el Tónico Capilar, la joya de la ciencia capilar de ZENHOGAR. Este nutriente de alto impacto está formulado con una concentración revolucionaria de Trichogen al 8% y un complejo de 16 extractos botánicos puros que trabajan en sinergia para revitalizar los folículos. Diseñado para combatir la caída, este tónico no solo frena el debilitamiento, sino que favorece el nacimiento de hebras más gruesas, densas y resistentes.

Perfecto para revitalizar el cuero cabelludo, así como para poblar con precisión cejas y barba, su aplicación en spray garantiza que los nutrientes premium como la cebolla y el ginkgo biloba penetren profundamente. Es el sistema definitivo para transformar un cabello frágil en una melena (o barba) llena de vigor, brillo y vitalidad, con resultados respaldados por la biotecnología capilar más avanzada.

✔️ Arquitectura Capilar: Fortalece el anclaje del cabello reduciendo la caída y el quiebre de forma visible.
✔️ Densidad y Crecimiento: El Trichogen al 8% estimula la zona de crecimiento para un mayor volumen folicular.
✔️ Vitalidad Herbal: 16 extractos que nutren, purifican y devuelven el brillo natural a la fibra capilar.`,
    seoTitle: 'Tónico Capilar con Trichogen al 8%: Crecimiento y Densidad | Zenhogar',
    seoDescription: 'Detén la caída y estimula el crecimiento con el Tónico capilar de ZENHOGAR. 16 extractos naturales y Trichogen 8% para un cabello, barba y cejas fuertes y densos.',
    benefits: [
      'Detiene la caída excesiva y fortalece el cabello desde el folículo piloso',
      'Estimula el crecimiento rápido de nuevas hebras más gruesas y resistentes',
      'Puebla con eficacia zonas de baja densidad en el cuero cabelludo, barba y cejas',
      'Nutre profundamente la raíz con 16 extractos botánicos y Trichogen al 8%',
      'Mejora notablemente la textura, el brillo y la salud integral del cabello'
    ],
    image: '/assets/products/tonico.webp',
    basePrice: 89900,
    size: '120ml',
    presentation: 'Líquido (Spray)',
    invima: 'NSOC02559-20CO',
    googleCategory: 'Health & Beauty > Personal Care > Hair Care',
    condition: 'new',
    supportImages: [
      '/assets/products/tonico-apoyo-1.webp',
      '/assets/products/tonico-apoyo-2.webp',
      '/assets/products/tonico-apoyo-3.webp',
      '/assets/products/tonico-apoyo-4.webp'
    ],
    keywords: 'caída cabello, crecimiento capilar, fortalecer raíz, tónico capilar, Zenhogar',
    components: 'Trichogen al 8%, Cebolla, Ginkgo Biloba y 16 extractos herbales',
    componentBenefits: [
    {
        'name': 'Trichogen al 8%',
        'benefit': 'Complejo capilar que ayuda a disminuir la caída y fortalece el cabello desde la raíz.'
    },
    {
        'name': 'Cebolla y Ginkgo Biloba',
        'benefit': 'Estimulan y nutren la zona capilar, favoreciendo el crecimiento saludable y el engrosamiento del nuevo cabello.'
    }
],
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
      { q: '¿Cómo debo aplicar este producto para obtener mejores resultados?', a: 'Aplicar directamente en el cuero cabelludo y masajear.' },
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
    masterId: '68746',
    name: 'Tufoff',
    category: 'belleza-integral',
    shortDescription: 'Refresca el aliento al instante con Ciencia Natural.',
    description: `Descubre la confianza absoluta en cada palabra con Tufoff, la solución avanzada diseñada para neutralizar el mal aliento desde su origen. Esta innovadora fórmula combina la frescura criogénica del aceite de menta con el poder neutralizador del bicarbonato de sodio y la canela. A diferencia de los caramelos convencionales, Tufoff no solapa los olores; actúa mediante una reacción química gentil que descompone los compuestos volátiles de azufre, responsables del mal olor tras consumir tabaco, alcohol o alimentos fuertes.

Enriquecido con inulina (prebiótico natural), Tufoff no solo brinda frescura inmediata, sino que contribuye a mantener el equilibrio saludable de la microbiota bucal. Sin azúcar y endulzado exclusivamente con eritritol, es el aliado perfecto para tu salud dental y tu seguridad en cualquier interacción social o profesional.

✔️ Acción Criogénica Inmediata: Sensación de limpieza profunda que neutraliza olores de comida, tabaco y café al instante.
✔️ Equilibrio Prebiótico: Contiene inulina para proteger la salud de tu boca mientras refresca tu aliento.
✔️ Salud Dental Garantizada: 100% Sin azúcar y con bicarbonato para equilibrar el pH bucal y proteger el esmalte.`,
    seoTitle: 'Tufoff: Cómo neutralizar el mal aliento de forma instantánea y natural',
    seoDescription: 'Neutraliza el mal aliento al instante con Tufoff. Dulces sin azúcar con prebióticos y aceites esenciales para una frescura total y equilibrio bucal. ¡Confianza certificada!',
    benefits: [
      'Neutraliza el aliento a tabaco, alcohol y condimentos al contacto',
      'Protege la microbiota bucal gracias a su aporte de prebióticos (Inulina)',
      'Equilibra el pH de la boca reduciendo la acidez con bicarbonato',
      'Seguro para los dientes: Fórmula con eritritol, totalmente libre de azúcar',
      'Formato discreto de 75g ideal para llevar a juntas o citas'
    ],
    image: '/assets/products/Tuffof.webp',
    basePrice: 85000,
    size: '75g',
    presentation: 'Dulce / Caramelo',
    invima: 'NSA-0009109-2020',
    googleCategory: 'Health & Beauty > Personal Care',
    condition: 'new',
    supportImages: [
      '/assets/products/tufoff-apoyo-1.webp',
      '/assets/products/tufoff-apoyo-2.webp',
      '/assets/products/tufoff-apoyo-3.webp',
      '/assets/products/tufoff-apoyo-4.webp'
    ],
    keywords: 'mal aliento, frescura bucal, menta canela, Tufoff, Zenhogar, higiene oral rápida',
    components: 'Eritritol, Inulina, Aceite de Menta, Canela y Bicarbonato de Sodio',
    componentBenefits: [
    {
        'name': 'Aceite de Menta y Canela',
        'benefit': 'Neutralizan los malos olores bucales, aportando una sensación de frescura al instante.'
    },
    {
        'name': 'Bicarbonato de Sodio',
        'benefit': 'Ayuda a equilibrar el pH bucal para prevenir las causas del mal aliento y mantener la boca limpia.'
    },
    {
        'name': 'Eritritol e Inulina',
        'benefit': 'Apoyan el cuidado de la salud oral con un agradable sabor natural que no afecta tus hábitos saludables.'
    }
],
    longTailKeywords: [
      'mejor producto para neutralizar el mal aliento de forma inmediata',
      'cómo mantener un aliento fresco durante todo el día naturalmente',
      'dulces sin azúcar para neutralizar el olor a comida en la boca',
      'beneficios del bicarbonato de sodio para la higiene bucal rápida',
      'fórmula natural para refrescar el aliento sin dañar el esmalte dental',
      'bienestar integral y confianza personal con aliento fresco premium',
      'solución discreta para el mal aliento después de fumar o comer ajo',
    ],
    seoFaqs: [
      { q: '¿Cómo debo consumir este producto para obtener mejores resultados?', a: 'Disolver un dulce lentamente en la boca después de cada comida o según necesites refrescar tu aliento.' },
      { q: '¿Contiene azúcar?', a: 'No, Tufoff es totalmente libre de azúcar. Está endulzado con eritritol, lo que lo hace seguro para los dientes y para personas diabéticas.' },
      { q: '¿Qué diferencia a Tufoff de un chicle normal?', a: 'A diferencia de los chicles, Tufoff contiene bicarbonato y aceites esenciales que neutralizan químicamente las bacterias del olor, no solo ocultan el aroma.' },
      { q: '¿Cuánto dura el efecto de frescura?', a: 'Gracias a su fórmula concentrada, la sensación de limpieza y frescura puede durar varias horas según la actividad.' }
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
      title: 'Limpieza y frescura superior',
      description: 'En ZENHOGAR estamos comprometidos con tu salud, ofrecemos productos con registro INVIMA de higiene superior. Tufoff ayuda a reducir el mal de olor y brinda frescura duradera con Mentol y Eucalipto. Calidad certificada para tu seguridad y confianza diaria.'
    }
  },
  // Salud Sexual
  {
    id: 'akha',
    masterId: '61195',
    name: 'Akha (Crema Voluminizante)',
    category: 'salud-sexual',
    shortDescription: 'Firmeza, Elasticidad y Vigor para tu Piel.',
    description: `Crema voluminizante de alto poder regenerador diseñada para mejorar la apariencia, firmeza y elasticidad de la piel en áreas específicas. Formulada con una rica mezcla de extractos botánicos como Acmella Oleracea (conocida por su efecto tensor natural), Maca y Ginseng, Akha proporciona una hidratación profunda que ayuda a recuperar el vigor cutáneo y suavizar la textura de la piel.

Su fórmula avanzada refuerza la barrera natural de la piel, protegiéndola contra factores externos y el envejecimiento prematuro. Ideal para quienes buscan una apariencia más saludable, firme y elástica sin dejar sensación grasa, ya que su absorción es inmediata y refrescante.

✔️ Efecto Tensor Natural: Ayuda a mejorar la firmeza y el tono de la piel de forma progresiva.
✔️ Nutrición Profunda: Enriquecida con Zinc y L-Arginina para promover la renovación celular y vitalidad.
✔️ Absorción Superior: Textura ligera que no mancha la ropa y deja la piel suave y renovada al instante.`,
    seoTitle: 'Crema voluminizante y reafirmante natural Akha | Zenhogar',
    seoDescription: 'Recupera la firmeza y elasticidad de tu piel con Akha. Crema con Acmella Oleracea y Maca para un efecto tensor natural y vitalidad cutánea. ¡Registro INVIMA!',
    benefits: [
      'Piel visiblemente más saludable, firme y tonificada',
      'Protección antioxidante avanzada contra el envejecimiento',
      'Absorción ultra-veloz sin dejar residuos grasos en la ropa',
      'Mejora la elasticidad y suavidad en las zonas aplicadas',
      'Fórmula botánica segura para el cuidado diario de la piel'
    ],
    image: '/assets/products/akha.webp',
    basePrice: 89900,
    size: '30ml',
    presentation: 'Crema',
    invima: 'NSOC19282-23CO',
    googleCategory: 'Health & Beauty > Personal Care > Cosmetics',
    condition: 'new',
    supportImages: [
      '/assets/products/akha-apoyo-2.webp',
      '/assets/products/akha-apoyo-3.webp',
      '/assets/products/akha-apoyo-4.webp'
    ],
    keywords: 'botox natural, voluminizante, firmeza, Akha, Zenhogar',
    components: 'Extracto de Acmella Oleracea, Maca, Ginseng, Zinc, L-Arginina',
    componentBenefits: [
    {
        'name': 'Acmella Oleracea',
        'benefit': 'Aporta un efecto tonificante que mejora la firmeza y la elasticidad de la piel en el cuidado masculino.'
    },
    {
        'name': 'Maca, Ginseng y L-Arginina',
        'benefit': 'Brindan una intensa sensación de vitalidad y frescura, ideal para hombres.'
    },
    {
        'name': 'Zinc',
        'benefit': 'Contribuye a mantener la suavidad y el estado óptimo de la piel.'
    }
],
    longTailKeywords: [
      'mejor crema natural para mejorar la firmeza de la piel en hombres',
      'cómo recuperar la elasticidad cutánea con extractos de maca y ginseng',
      'crema hidratante con acmella oleracea para efecto tensor inmediato',
      'beneficios de Akha para la nutrición y vigor de la piel masculina',
      'fórmula botánica para una piel más saludable, elástica y rejuvenecida',
      'bienestar integral y vitalidad dérmica con registro INVIMA certificado',
      'cómo prevenir el envejecimiento prematuro de la piel de forma segura',
      'crema para la firmeza del cuerpo con ingredientes naturales premium',
      'solución efectiva para la piel opaca y falta de tono muscular cutáneo',
      'vitalidad y elasticidad segura con ingredientes de alta pureza botánica'
    ],
    seoFaqs: [
      { q: '¿Cómo debo aplicar Akha para obtener resultados visibles?', a: 'Se recomienda aplicar en la zona deseada mediante masajes circulares firmes dos veces al día, promoviendo la absorción y el equilibrio natural.' },
      { q: '¿Akha es un producto totalmente natural?', a: 'Sí, su fórmula balanceada utiliza extractos de alta pureza como Maca y Ginseng para promover un bienestar integral y vitalidad en tu piel.' },
      { q: '¿Tiene contraindicaciones o efectos secundarios?', a: 'Es un producto de calidad certificada diseñado para ser seguro en todo tipo de piel bajo las dosis recomendadas, aportando nutrición sin irritaciones.' },
      { q: '¿En cuánto tiempo se nota el efecto reafirmante?', a: 'Muchos usuarios perciben una mejora en la hidratación y suavidad inmediata, con resultados de firmeza notables tras 4 semanas de uso constante.' }
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
    masterId: '61835',
    name: 'Derman (Mascarilla Íntima)',
    category: 'salud-sexual',
    shortDescription: 'Protección, Frescura y Equilibrio para tu Zona Íntima.',
    description: `Derman es una mascarilla íntima en crema diseñada científicamente para brindar higiene, protección y confort absoluto en las áreas más delicadas del cuerpo. Su fórmula combina las propiedades regeneradoras de la Caléndula con el poder hidratante del Aloe Vera y la Manzanilla, creando una barrera protectora que mantiene el equilibrio natural de la flora y previene irritaciones comunes tras la depilación o el uso de ropa ajustada.

Ideal para el cuidado diario, Derman calma instantáneamente el ardor, evita los brotes cutáneos y proporciona una sensación duradera de frescura y suavidad, permitiéndote sentirte cómoda y segura en todo momento con la garantía de una fórmula gentil y probada.

✔️ Adiós a la Irritación: Calma la piel sensible después del afeitado o depilación con láser/cera.
✔️ Protección Natural: Ayuda a mantener el pH equilibrado y la salud de la piel en áreas íntimas.
✔️ Hidratación de Confort: Nutre profundamente, evitando la resequedad y promoviendo la elasticidad.`,
    seoTitle: 'Derman Mascarilla Íntima | Cuidado y Protección tras Depilación',
    seoDescription: 'Protege y calma tu zona íntima con Derman. Mascarilla en crema con Caléndula y Aloe Vera para evitar irritaciones y mantener el equilibrio natural. ¡Registro INVIMA!',
    benefits: [
      'Calma y regenera la piel post-depilación o afeitado',
      'Mantiene el equilibrio natural en zonas íntimas externas',
      'Previene de forma efectiva brotes, vellos encarnados e irritaciones',
      'Promueve el confort y la frescura diaria con aroma sutil',
      'Textura suave que se absorbe sin dejar humedad excesiva'
    ],
    image: '/assets/products/Derman.webp',
    basePrice: 89900,
    size: '30ml',
    presentation: 'Crema',
    invima: 'NSOC36162-24CO',
    googleCategory: 'Health & Beauty > Personal Care > Cosmetics',
    condition: 'new',
    supportImages: [
      '/assets/products/derman-apoyo-1.webp',
      '/assets/products/derman-apoyo-2.webp',
      '/assets/products/derman-apoyo-3.webp',
      '/assets/products/derman-apoyo-4.webp'
    ],
    keywords: 'bienestar íntimo, arginina, ácido salicílico, salud íntima, Derman, Zenhogar',
    components: 'Ácido Salicílico, Arginina, Ácido Undecilénico y Lanolina',
    componentBenefits: [
    {
        'name': 'Ácido Salicílico',
        'benefit': 'Exfolia suavemente y previene vellos encarnados tras la depilación.'
    },
    {
        'name': 'Arginina y Lanolina',
        'benefit': 'Humectan intensamente y reconfortan la piel frente a la fricción o irritación.'
    },
    {
        'name': 'Ácido Undecilénico',
        'benefit': 'Aporta una agradable sensación de frescura, limpieza y confort prolongado en áreas delicadas.'
    }
],
    longTailKeywords: [
      'mejor mascarilla íntima para prevenir irritación tras la depilación con cera',
      'cómo mantener el pH balanceado y la frescura en la zona delicada femenina',
      'cuidado especializado para la salud íntima natural con caléndula y aloe vera',
      'beneficios de Derman para el bienestar integral y confort de la mujer',
      'fórmula suave para proteger la piel después del rasurado o láser íntimo',
      'bienestar integral y vitalidad en el cuidado diario de la zona genital',
      'cómo recuperar la confianza íntima con productos de calidad certificada',
      'mascarilla hidratante para la higiene íntima calmante y protectora',
      'solución natural para el ardor y la picazón en áreas sensibles externas',
      'salud íntima segura con ingredientes de alta pureza y suavidad extrema'
    ],
    seoFaqs: [
      { q: '¿Derman ayuda realmente tras la depilación?', a: 'Absolutamente, sus extractos de caléndula calman el ardor y regeneran la piel sensible post-depilación, brindando bienestar instantáneo.' },
      { q: '¿Altera Derman el pH de mi zona íntima?', a: 'No, su fórmula balanceada está diseñada para respetar tu barrera natural y promover un equilibrio saludable sin químicos agresivos.' },
      { q: '¿Con qué frecuencia se puede usar Derman?', a: 'Es ideal para tu rutina de cuidado diario, aplicándola siempre en la piel limpia para mantener la suavidad y protección certificada.' },
      { q: '¿Tiene fragancias que puedan irritar?', a: 'Derman posee un aroma muy sutil y natural, libre de perfumes irritantes, ideal para brindar frescura con total seguridad.' }
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
    masterId: '166801',
    name: 'Haydar (Bebida Energizante)',
    category: 'salud-sexual',
    shortDescription: 'Energía Explosiva y Vitalidad en un Solo Sorbo.',
    description: `Haydar es una bebida energizante concentrada que extrae el máximo potencial revitalizante del Borojó y la Maca para brindarte un impulso inmediato de energía cuando más lo necesitas. Su fórmula está diseñada para deportistas y personas con alta exigencia diaria que buscan un vigor excepcional, mayor resistencia física y una claridad mental superior sin los efectos negativos de las bebidas comerciales cargadas de azúcar.

Enriquecida con Vitaminas del Complejo B, Haydar no solo despierta tu cuerpo, sino que agudiza tus sentidos y mejora el enfoque, permitiéndote rendir al máximo en el gimnasio, en el trabajo o en tus encuentros personales con total seguridad y confianza.

✔️ Impulso Natural: Borojó y Maca seleccionados para elevar el ánimo y la fuerza física al instante.
✔️ Mente Despierta: Vitaminas B que optimizan la concentración mental y el procesamiento de energía.
✔️ Sabor y Practicidad: Delicioso sabor a mora azul en un formato listo para tomar y llevar a cualquier parte.`,
    seoTitle: 'Haydar Bebida Energizante Natural | Borojó y Maca | Zenhogar',
    seoDescription: 'Potencia tu energía y enfoque con Haydar. Bebida energizante natural con Borojó, Maca y Vitaminas B para un rendimiento superior diario. ¡Registro INVIMA!',
    benefits: [
      'Impulso de ánimo y fuerza física con ingredientes botánicos',
      'Maximiza el enfoque mental y la concentración durante horas',
      'Delicioso y refrescante sabor a mora azul sin exceso de gas',
      'Formato práctico de 240ml ideal para antes de la actividad física',
      'Cuidado integral del metabolismo energético con Complejo B'
    ],
    image: '/assets/products/haydar.webp',
    basePrice: 73500,
    size: 'bebida 240ml',
    presentation: 'Bebida',
    invima: 'RSA-3599-2025',
    googleCategory: 'Health & Beauty > Health Care > Fitness & Nutrition',
    condition: 'new',
    supportImages: [
      '/assets/products/haydar-apoyo-2.webp',
      '/assets/products/haydar-apoyo-3.webp',
      '/assets/products/haydar-apoyo-4.webp'
    ],
    keywords: 'vitalidad extra, ánimo, rendimiento, Haydar, Zenhogar',
    components: 'Borojó, Maca, Taurina, Cafeína, Guaraná y Vitaminas del Complejo B',
    componentBenefits: [
    {
        'name': 'Taurina, Cafeína y Guaraná',
        'benefit': 'Combinación ideal que eleva el enfoque mental, mejora la concentración e incrementa la energía diaria.'
    },
    {
        'name': 'Borojó y Maca',
        'benefit': 'Mantienen el vigor físico prolongado.'
    },
    {
        'name': 'Complejo B',
        'benefit': 'Optimiza el metabolismo energético.'
    }
],
    longTailKeywords: [
      'mejor bebida energizante natural con borojó y maca para rendimiento',
      'cómo obtener energía explosiva de forma saludable sin exceso de azúcar',
      'energizante líquido con borojó para enfoque mental y vigor físico',
      'beneficios de Haydar para el bienestar integral y vitalidad masculina',
      'fórmula balanceada para un impulso de vigor inmediato antes del deporte',
      'bienestar integral y energía renovada con suplementos líquidos naturales',
      'cómo mejorar el desempeño físico diario con nutrición de calidad certificada',
      'bebida para la vitalidad extrema y concentración en días de cansancio',
      'solución natural para la falta de ánimo y bajo rendimiento energético',
      'energía y vitalidad segura con ingredientes de alta pureza y registro INVIMA'
    ],
    seoFaqs: [
      { q: '¿Cuánto tiempo tarda en hacer efecto el energizante Haydar?', a: 'Gracias a su formato líquido, los extractos de maca y borojó se absorben rápido, sintiendo vitalidad en unos 20 a 30 minutos.' },
      { q: '¿Haydar genera taquicardia o nerviosismo?', a: 'No, su fórmula balanceada optimiza el metabolismo energético de forma fluida, promoviendo un bienestar integral sin excesos.' },
      { q: '¿Se puede tomar Haydar antes de entrenar en el gimnasio?', a: 'Es ideal como pre-entreno natural, brindando el vigor y enfoque necesario para una rutina de alto rendimiento certificado.' },
      { q: '¿Contiene taurina o cafeína natural?', a: 'Sí, utiliza guaraná y taurina en niveles seguros para garantizar una vitalidad y energía superior con total confianza.' }
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
    masterId: '60017',
    name: 'Instant Virgin (Gel Íntimo)',
    category: 'salud-sexual',
    shortDescription: 'Renovación, Firmeza y Plenitud Femenina.',
    description: `Redescubre tu seguridad íntima con Instant Virgin, el gel revitalizante de vanguardia formulado para brindar una sensación inmediata de bienestar y plenitud. Diseñado bajo rigurosos estándares biotecnológicos, este gel combina las propiedades regeneradoras del Aloe Vera con la acción vasotónica de sales minerales puras y D-Pantenol. Su aplicación proporciona un efecto tonificante y de contracción natural que ayuda a recuperar la sensibilidad y el tono de la zona íntima, devolviéndote el control y la confianza en tus momentos de mayor conexión.

Su fórmula fluida de pH balanceado ha sido optimizada para respetar la delicada barrera de la flora genital, ofreciendo una hidratación profunda que previene la resequedad y el malestar. Es la solución ideal para mujeres que desean revitalizar su feminidad, especialmente tras el parto o cambios hormonales, permitiendo vivir una sexualidad plena, cómoda y segura.

✔️ Tonificación Inmediata: Efecto de contracción natural que mejora la percepción y sensibilidad íntima.
✔️ Cuidado y Confort: Hidratación superior con Aloe Vera para una piel suave y protegida de irritaciones.
✔️ Armonía Biológica: Su pH equilibrado asegura una compatibilidad total con tu cuerpo y la salud de tu flora.`,
    seoTitle: 'Gel de Renovación y Firmeza Íntima Instant Virgin | Zenhogar',
    seoDescription: 'Recupera el tono y la confianza íntima con Instant Virgin. Gel con Aloe Vera y efecto de contracción natural para una plenitud femenina real. ¡Registro INVIMA!',
    benefits: [
      'Brinda una sensación inmediata de mayor firmeza y tono genital',
      'Aumenta la sensibilidad y plenitud en los momentos de intimidad',
      'Hidratación profunda que previene la resequedad post-parto o hormonal',
      'Compatible con preservativos y todo tipo de métodos de barrera',
      'Fórmula discreta de rápida absorción que no deja residuos ni manchas'
    ],
    image: '/assets/products/Instantvirgin.webp',
    basePrice: 79000,
    size: '30ml',
    presentation: 'Gel / Crema',
    invima: '2021DM-0024065',
    googleCategory: 'Health & Beauty > Personal Care > Cosmetics',
    condition: 'new',
    supportImages: [
      '/assets/products/instant-virgin-apoyo-1.webp',
      '/assets/products/instant-virgin-apoyo-2.webp'
    ],
    keywords: 'confianza femenina, bienestar íntimo, salud sexual mujer, Instant Virgin, Zenhogar, firmeza vaginal natural',
    components: 'Aloe Vera, D-Pantenol y Sulfato de Aluminio',
    componentBenefits: [
    {
        'name': 'Aloe Vera y D-Pantenol',
        'benefit': 'Brindan una hidratación completa y favorecen el cuidado diario de la piel en zonas de alta sensibilidad.'
    },
    {
        'name': 'Sulfato de Aluminio',
        'benefit': 'Aporta una acción acondicionadora suave que ayuda a mantener el confort y el equilibrio natural de la piel.'
    }
],
    longTailKeywords: [
      'mejor gel para recuperar la sensación de firmeza íntima tras el parto',
      'cómo mejorar el bienestar sexual y la plenitud de la mujer naturalmente',
      'cuidado especializado para la salud sexual femenina con aloe vera',
      'beneficios de Instant Virgin para recuperar la confianza en pareja',
      'fórmula balanceada para el cuidado, tono y confort íntimo de la mujer',
      'bienestar integral y vitalidad en la vida sexual femenina madura',
      'cómo sentirse plena y segura con productos de calidad certificada INVIMA',
    ],
    seoFaqs: [
      { q: '¿Instant Virgin es de uso externo solamente?', a: 'Sí, su aplicación es tópica en la zona íntima externa para brindar bienestar integral y una sensación de firmeza.' },
      { q: '¿Cuánto tiempo dura el efecto de contracción?', a: 'El efecto es inmediato y puede durar durante todo el encuentro íntimo, brindando vitalidad y seguridad.' },
      { q: '¿Es compatible con el uso de preservativos?', a: 'Sí, su fórmula a base de agua es compatible con el látex y otros métodos de barrera.' },
      { q: '¿Se puede usar todos los días?', a: 'Su fórmula es gentil, pero está diseñado principalmente para momentos específicos de intimidad donde se desee mayor tono.' }
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
    masterId: '11360',
    name: 'Mammoth (Crema Voluminizante)',
    category: 'salud-sexual',
    shortDescription: 'Firmeza, Elasticidad y Apariencia Saludable para tu Piel.',
    description: `Mammoth es una crema corporal de alto desempeño diseñada para mejorar visiblemente la apariencia y elasticidad de la piel en zonas que requieren mayor firmeza. Su fórmula avanzada combina el efecto tensor del extracto de Acmella Oleracea con la nutrición profunda de la Vitamina E y el aceite de parafina USP, creando un cuidado que suaviza irregularidades y devuelve la lozanía a la piel.

Ideal para masajes tonificantes, Mammoth ayuda a mejorar el contorno y la textura cutánea, proporcionando una hidratación extrema que evita la resequedad y el aspecto opaco. Su consistencia profesional permite una aplicación fluida y una absorción completa sin dejar residuos grasos, haciendo que tu piel luzca y se sienta más fuerte y revitalizada.

✔️ Efecto Volumen y Firmeza: Mejora la textura y el tono de la piel en zonas críticas con uso constante.
✔️ Hidratación Extrema: Nutre las capas profundas de la piel, manteniéndola elástica y flexible.
✔️ Rápida Absorción: Fórmula de grado profesional que actúa desde la primera aplicación con suavidad.`,
    seoTitle: 'Mammoth Crema reafirmante y voluminizante natural | Zenhogar',
    seoDescription: 'Mejora la textura y firmeza de tu piel con Mammoth. Crema con Acmella Oleracea y Vitamina E para una hidratación profunda y efecto volumen. ¡Registro INVIMA!',
    benefits: [
      'Textura cutánea renovada, más suave y uniforme al tacto',
      'Elasticidad y nutrición profunda que previene la flacidez',
      'Fórmula profesional no grasa de rápida penetración dérmica',
      'Ideal para masajes en zonas que requieren mayor tono y vigor',
      'Protección contra radicales libres gracias a su alto contenido de Vitamina E'
    ],
    image: '/assets/products/Mammoth.webp',
    basePrice: 59900,
    size: '30ml',
    presentation: 'Crema',
    invima: 'NSOC19282-23CO',
    googleCategory: 'Health & Beauty > Personal Care > Cosmetics',
    condition: 'new',
    supportImages: [
      '/assets/products/mammoth-apoyo-2.webp',
      '/assets/products/mammoth-apoyo-3.webp',
      '/assets/products/mammoth-apoyo-4.webp'
    ],
    keywords: 'fuerza masculina, rendimiento, vitalidad, Mamooth, Zenhogar',
    components: 'Acmella Oleracea, Aceite de Parafina USP y Vitamina E',
    componentBenefits: [
    {
        'name': 'Acmella Oleracea',
        'benefit': 'Reconocida por su capacidad para reafirmar y tensar la apariencia visual de la piel.'
    },
    {
        'name': 'Aceite de Parafina USP y Vitamina E',
        'benefit': 'Forman una barrera altamente hidratante que mejora progresivamente la tersura de las áreas deseadas.'
    }
],
    longTailKeywords: [
      'mejor crema reafirmante para mejorar el volumen y textura de la piel',
      'cómo lograr una piel más firme y elástica con vitamina E y maca',
      'crema hidratante profesional para tonificar zonas críticas del cuerpo',
      'beneficios de Mammoth para el bienestar integral y firmeza cutánea',
      'fórmula avanzada para una piel con más volumen, suavidad y salud',
      'bienestar integral y vitalidad dérmica con registro INVIMA certificado',
      'cómo evitar la flacidez y resequedad de la piel de forma natural',
      'crema para el cuidado corporal con ingredientes de alta potencia botánica',
      'solución efectiva para las irregularidades de la piel y falta de elasticidad',
      'suavidad y firmeza segura con ingredientes de alta pureza y rápida absorción'
    ],
    seoFaqs: [
      { q: '¿Cómo funciona el efecto volumen de Mammoth?', a: 'Su fórmula con Acmella Oleracea mejora la estructura elástica de la dermis, promoviendo una apariencia más firme y un bienestar integral.' },
      { q: '¿Mammoth deja la piel con sensación pegajosa?', a: 'No, es una crema de grado profesional de rápida absorción que hidrata profundamente sin dejar residuos grasos certificados.' },
      { q: '¿Se puede usar Mammoth en todo el cuerpo?', a: 'Sí, es excelente para masajes en piernas, brazos y cualquier zona donde desees recuperar la vitalidad y tono natural.' },
      { q: '¿Es segura para pieles muy secas?', a: 'Absolutamente, su alto contenido de Vitamina E y aceites nutritivos reconforta la piel seca brindando elasticidad inmediata.' }
    ],
    promos: [
      { id: '1u', label: '1 Unidad', units: 1, price: 59900 },
      { id: '2u', label: '2 Unidades', units: 2, price: 89850 },
      { id: '2x3', label: 'Pague 2 Lleve 3', units: 3, price: 119800, badge: '⭐ Recomendado' },
      { id: '3x5', label: 'Pague 3 Lleve 5', units: 5, price: 179700, badge: '🔥 Mejor Oferta' }
    ],
    testimonials: [
      { name: 'Ricardo H.', text: 'Siento una fuerza y potencia que no tenía antes. Muy efectivo para mis entrenamientos.', rating: 5 },
      { name: 'Andrés V.', text: 'Excelente para mejorar el rendimiento en todo sentido. Me siento con mucha más vitalidad.', rating: 5 }
    ],
    whyChoose: {
      title: 'Cuidado corporal avanzado',
      description: 'En ZENHOGAR estamos comprometidos con tu salud, ofrecemos productos con registro INVIMA de alto desempeño. Mammoth ayuda a mejorar la apariencia de la piel mediante extractos botánicos seleccionados. Calidad certificada para tu cuidado diario.'
    }
  },
  {
    id: 'tyruss-full',
    masterId: '52600',
    name: 'Tyruss Full',
    category: 'salud-bienestar',
    shortDescription: 'Nutrición Verde Avanzada y Apoyo al Equilibrio Femenino.',
    description: `Tyruss Full es una mezcla nutricional premium en polvo diseñada para quienes buscan una purificación profunda, mantener su energía, es un excelente coadyudante para las mujeres que se encuentran en etapas de transición y cambio biologico. Su fórmula combina la proteína de arveja con el poder de los superalimentos verdes: Clorofila, Espirulina y Chlorella. Esta sinergia vegetal actúa como un potente agente oxigenador y depurativo que ayuda a liberar el cuerpo de toxinas acumuladas, mejorando la digestión y fortaleciendo el sistema inmunológico.

Enriquecido con Omega 3 proveniente de chía y linaza, además de vitaminas esenciales, Tyruss Full no solo limpia tu organismo, sino que nutre tus células para combatir la fatiga y promover un metabolismo saludable. Su alto contenido de fibra asegura un tránsito intestinal fluido, brindando una sensación de ligereza y bienestar abdominal desde la primera semana de uso.

✔️ Desintoxicación Profunda: Ayuda a depurar impurezas del organismo.
✔️ Digestión y Tránsito: Fibra natural que optimiza el movimiento intestinal y reduce la inflamación.
✔️ Energía y Saciedad: Aporta proteínas y grasas saludables que mantienen tu energía constante y controlan el apetito.`,
    seoTitle: 'Tyruss Full Nutrición Verde | Detox con Clorofila y Espirulina',
    seoDescription: 'Desintoxica tu cuerpo y recupera tu energía con Tyruss Full. Mezcla con Clorofila, Espirulina y Proteína de Arveja para un equilibrio digestivo. ¡Registro INVIMA!',
    benefits: [
      'Depura y desintoxica el organismo de forma suave y efectiva',
      'Promueve un vientre plano al mejorar el tránsito intestinal',
      'Aporte significativo de proteínas vegetales y Omega 3 esencial',
      'Oxigena las células y combate el cansancio crónico naturalmente',
      'Fórmula con ingredientes de alta pureza para el equilibrio diario'
    ],
    image: '/assets/products/Tyrussfull.webp',
    basePrice: 89900,
    size: '500g',
    presentation: 'Polvo',
    invima: 'RSA-0021928-2022',
    googleCategory: 'Health & Beauty > Health Care > Fitness & Nutrition',
    condition: 'new',
    supportImages: [
      '/assets/products/tyrussfull-apoyo-2.webp',
      '/assets/products/tyrussfull-apoyo-3.webp',
      '/assets/products/tyrussfull-apoyo-4.webp'
    ],
    keywords: 'equilibrio hormonal femenino, salud metabólica, tiroides, menopausia, sofocos, energía estable, Tyruss Full, Zenhogar',
    components: 'Clorofila, Espirulina, Chlorella, Proteína de Arveja, Almendras y Omega 3',
    componentBenefits: [
    {
        'name': 'Clorofila, Espirulina y Chlorella',
        'benefit': 'Microalgas y extractos verdes que promueven la limpieza natural del organismo y aportan un extra de vitalidad.'
    },
    {
        'name': 'Proteína de Arveja y Almendras',
        'benefit': 'Nutrición vegetal limpia.'
    },
    {
        'name': 'Omega 3',
        'benefit': 'Apoya la elasticidad y el cuidado de la piel.'
    }
],
    longTailKeywords: [
      'mejor batido verde detox para depurar el colon y reconfortar el cuerpo',
      'cómo oxigenar la sangre y mejorar la digestión con clorofila y espirulina',
      'suplemento de proteína de arveja con verdes para energía y desintoxicación',
      'beneficios de Tyruss Full para el bienestar integral y tránsito intestinal',
      'fórmula balanceada para una limpieza orgánica profunda y nutrición celular',
      'bienestar integral y vitalidad rejuvenecida con superalimentos certificados',
      'cómo mantener un vientre plano y digestión ligera de forma natural',
      'suplemento para la depuración del organismo con omega 3 y vitaminas',
      'alternativa natural para la pesadez estomacal y falta de nutrientes verdes',
      'nutrición verde segura con ingredientes de alta pureza y registro INVIMA'
    ],
    seoFaqs: [
      { q: '¿Tyruss Full ayuda realmente a bajar la inflamación del vientre?', a: 'Sí, su alto contenido de fibra y clorofila optimiza el tránsito intestinal y libera toxinas, promoviendo bienestar integral.' },
      { q: '¿A qué sabe Tyruss Full?', a: 'Tiene un sabor herbal muy suave y refrescante, ideal para combinar con agua o jugos naturales en tu rutina de equilibrio natural.' },
      { q: '¿Pueden tomarlo personas con dietas veganas?', a: 'Totalmente, su fuente de proteína es la arveja y sus componentes son 100% vegetales con calidad certificada.' },
      { q: '¿Se puede reemplazar una comida con Tyruss Full?', a: 'Se recomienda como un complemento nutricional avanzado para potenciar tu salud y vitalidad, no como sustituto total.' }
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
    masterId: '166802',
    name: 'Zafir Bebida Energizante',
    category: 'salud-sexual',
    shortDescription: 'Energía Natural Inmediata y Enfoque Mental Superior.',
    description: `Zafir es una bebida energizante de última generación, formulada con extractos puros de Maca, Borojó y Guaraná para ofrecerte un impulso de vitalidad real sin los picos de ansiedad de las bebidas tradicionales. Su deliciosa mezcla de frutos rojos no solo deleita tu paladar, sino que activa tu metabolismo con Vitaminas del Complejo B (B3, B6, B12) y Zinc, minerales clave para el rendimiento físico y la claridad cognitiva.

Diseñada para acompañarte en jornadas exigentes, Zafir te ayuda a mantener el enfoque y la resistencia necesaria para superar tus retos diarios. Su fórmula equilibrada respeta tu cuerpo mientras te proporciona esa dosis extra de ánimo y fuerza que necesitas en momentos críticos de fatiga o baja energía.

✔️ Vitalidad Inmediata: Activa tu cuerpo con extractos naturales que potencian el vigor y la fuerza física.
✔️ Enfoque de Hierro: Nutrientes cerebrales que mantienen tu mente alerta, concentrada y despejada.
✔️ Sabor Refrescante: Una explosión de sabor a frutos rojos y arándanos para refrescar tus sentidos.`,
    seoTitle: 'Zafir Bebida Energizante | Impulso Natural con Maca y Borojó',
    seoDescription: 'Recarga tu energía con Zafir. Bebida funcional con Borojó, Maca y Vitaminas B para un enfoque mental claro y vitalidad inmediata. ¡Registro INVIMA!',
    benefits: [
      'Rendimiento físico optimizado para actividades de alta exigencia',
      'Mantiene la alerta mental constante sin generar nerviosismo o taquicardia',
      'Aporte de vitaminas hidrosolubles y Zinc para el sistema inmune',
      'Delicioso sabor frutal sin necesidad de aditivos químicos agresivos',
      'Energía sostenida ideal para el estudio, el trabajo o el deporte'
    ],
    image: '/assets/products/Zafir.webp',
    basePrice: 73500,
    size: '500ml',
    presentation: 'Líquido',
    invima: 'RSA-3599-2025',
    googleCategory: 'Health & Beauty > Health Care > Fitness & Nutrition',
    condition: 'new',
    supportImages: [
      '/assets/products/zafir-apoyo-2.webp',
      '/assets/products/zafir-apoyo-3.webp',
      '/assets/products/zafir-apoyo-4.webp'
    ],
    keywords: 'energía inmediata, impulso natural, enfoque mental, vitalidad, Zafir, Zenhogar, bebida energizante',
    components: 'Borojó, Maca, Taurina, Cafeína y Vitaminas B3, B6, B12 y Biotina',
    componentBenefits: [
    {
        'name': 'Taurina y Cafeína',
        'benefit': 'Reducen la fatiga mental y física, favoreciendo un mejor rendimiento'
    },
    {
        'name': 'Borojó y Maca',
        'benefit': 'Entregan vitalidad constante sin bajones.'
    },
    {
        'name': 'Vitaminas B y Biotina',
        'benefit': 'Apoyan la transformación de los nutrientes en energía activa para el día a día.'
    }
],
    longTailKeywords: [
      'mejor bebida energizante con frutos rojos para vitalidad y enfoque',
      'cómo recargar energía de forma natural con maca borojó y guaraná',
      'energizante con vitaminas del complejo B para estudiar y trabajar mejor',
      'beneficios de Zafir para el bienestar integral y rendimiento físico extremo',
      'fórmula natural para un impulso de ánimo inmediato y resistencia física',
      'bienestar integral y energía renovada con bebidas funcionales certificadas',
      'cómo mejorar la concentración y enfoque con ingredientes de alta pureza',
      'bebida saludable para la vitalidad diaria del hombre y la mujer activos',
      'solución efectiva para el agotamiento mental y falta de vigor orgánico',
      'energía inmediata segura con registro INVIMA y sin efectos secundarios'
    ],
    seoFaqs: [
      { q: '¿Zafir quita el sueño si se toma en la noche?', a: 'Al ser un energizante natural, se recomienda consumirlo durante el día para potenciar tu vitalidad y bienestar integral sin afectar el ciclo circadiano.' },
      { q: '¿Contiene azúcares refinados en exceso?', a: 'Zafir está formulado para brindar energía limpia, equilibrando el sabor con un aporte nutricional de calidad certificada.' },
      { q: '¿Es apto para tomarlo durante una larga jornada de manejo?', a: 'Es excelente para mantener la alerta y el enfoque necesarios en actividades que requieren concentración y equilibrio natural.' },
      { q: '¿En cuánto tiempo se siente el efecto de Zafir?', a: 'Su absorción líquida permite que sientas el impulso de los extractos de maca y borojó rápidamente, optimizando tu rendimiento.' }
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
    id: 'guanda-mix',
    masterId: '129302',
    name: 'Guanda Mix',
    category: 'salud-bienestar',
    shortDescription: 'Apoyo Digestivo, Energía Diaria y Sensación de Frescura.',
    description: `Disfruta de una profunda ligereza y vitalidad con Guanda Mix, el alimento en polvo prémium diseñado específicamente para preparar una deliciosa bebida a base de hierbas aromáticas. Su fórmula avanzada está fortificada con una completa combinación de vitaminas y minerales esenciales, teniendo como ingrediente destacado la Flor de Jamaica y el Té Verde, reconocidos dinamizadores de la digestión y el bienestar integral de tu organismo.

Ideada para resolver problemas relacionados con el cansancio físico y mental por deficiencias nutricionales, Guanda Mix actúa como un apoyo digestivo superior gracias a la selección pura de sus hierbas naturales, maca y complejos de magnesio (citrato y bisglicinato). Con un sabor artificial a cereza exquisito, este polvo fino de color rojo se disuelve al instante sin azúcares añadidos ni partículas extrañas; es la opción de hidratación ligera y saludable perfecta para estudiantes, deportistas, profesionales o personas comprometidas con el control de peso.

✔️ Digestión Saludable: Combinación botánica que apoya el correcto tránsito y brinda una reconfortante sensación de alivio y frescura.
✔️ Dinamismo Libre de Fatiga: La maca y la flor de jamaica aportan nutrientes clave para optimizar tu energía sin causar ansiedad ni nerviosismo.
✔️ Máxima Pureza: Alimento sin azúcares añadidos, libre de partículas extrañas, garantizando una bebida ligera y de un sabor excepcional.`,
    seoTitle: 'Guanda Mix Hierbas Aromáticas y Flor de Jamaica | Zenhogar',
    seoDescription: 'Estrena bienestar digestivo y vitalidad con Guanda Mix. Bebida en polvo con té verde, maca, magnesio y delicioso sabor cereza. ¡Registro INVIMA IRSA-0245-2025!',
    benefits: [
      'Aporta vitaminas y minerales esenciales que completan y fortalecen la nutrición diaria',
      'Contiene maca, reconocida por su gran capacidad para favorecer la energía física y mental',
      'Rico en hierbas aromáticas seleccionadas que alivian la pesadez y optimizan la digestión',
      'Incluye flor de jamaica y magnesio (citrato y bisglicinato) para un balance celular completo',
      'Alimento bajo en calorías y libre de azúcares añadidos, ideal para dietas de control de peso',
      'Polvo fino rojo sin partículas extrañas con un agradable y refrescante sabor a cereza'
    ],
    image: '/assets/products/guanda-mix.webp',
    basePrice: 79900,
    size: '350g',
    presentation: 'Polvo',
    invima: 'IRSA-0245-2025',
    googleCategory: 'Health & Beauty > Health Care > Fitness & Nutrition',
    condition: 'new',
    supportImages: [
      '/assets/products/guanda-mix-apoyo-1.webp',
      '/assets/products/guanda-mix-apoyo-2.webp',
      '/assets/products/guanda-mix-apoyo-3.webp'
    ],
    keywords: 'guanda mix, hierbas aromaticas, flor de jamaica, digestion ligera, energia natural, cereza, maca, dolor estomacal, bienestar digestivo, zenhogar',
    components: 'Hierbas aromáticas en polvo, Té verde, Flor de jamaica, Citrato de magnesio, Bisglicinato de magnesio, Carbonato de calcio, Fumarato ferroso, Vitaminas y Minerales',
    componentBenefits: [
      {
        'name': 'Hierbas Aromáticas y Té Verde',
        'benefit': 'Mezcla botánica que estimula el correcto funcionamiento gástrico, aliviando la hinchazón y la pesadez estomacal.'
      },
      {
        'name': 'Flor de Jamaica y Maca',
        'benefit': 'Excelentes fuentes de antioxidantes y compuestos activos que promueven la energía sostenida sin estimulantes nocivos.'
      },
      {
        'name': 'Magnesio Dinámico y Vitaminas',
        'benefit': 'Complejo de asimilación rápida (citrato, bisglicinato, cloruro) que ayuda al tono muscular y bienestar del sistema nervioso.'
      }
    ],
    longTailKeywords: [
      'mejor bebida de hierbas aromaticas con flor de jamaica y maca',
      'cómo desinflamar la digestión y sentir mayor ligereza estomacal',
      'alimento en polvo sabor cereza para energía limpia y diaria',
      'beneficios de guanda mix para mejorar el cansancio fisico y mental',
      'suplemento con citrato y bisglicinato de magnesio para digestión',
      'té verde y flor de jamaica para mantener un metabolismo saludable',
      'cómo evitar la fatiga y pesadez estomacal con productos naturales',
      'suplemento para deportistas y personas activas con registro INVIMA',
      'bebida hidratante ligera y baja en calorías sabor cereza'
    ],
    seoFaqs: [
      { q: '¿Cómo se prepara el Guanda Mix?', a: 'Mezclar 1 y media cucharadas (30g) in un vaso de agua, leche o bebida vegetal (240ml); se puede preparar en licuadora o agitando manualmente.' },
      { q: '¿Contiene alérgenos o advertencias?', a: 'Contiene derivados lácteos (no apto para personas con alergia al suero de leche) y no se recomienda ante hipersensibilidad a alguno de sus componentes.' },
      { q: '¿Cuál es la vida útil de Guanda Mix?', a: 'Bajo condiciones adecuadas de almacenamiento y manipulación controlada, conserva todas sus propiedades durante 24 meses.' }
    ],
    promos: [
      { id: '1u', label: '1 Unidad', units: 1, price: 79900 },
      { id: '2u', label: '2 Unidades', units: 2, price: 119850 },
      { id: '2x3', label: 'Pague 2 Lleve 3', units: 3, price: 159800, badge: '⭐ Recomendado' },
      { id: '3x5', label: 'Pague 3 Lleve 5', units: 5, price: 239700, badge: '🔥 Mejor Oferta' }
    ],
    testimonials: [
      { name: 'Saray Lorena', text: 'Me ha ayudado muchísimo con la digestión pesada, me siento súper ligera y el sabor a cereza es riquísimo.', rating: 5 },
      { name: 'Gustavo Adolfo', text: 'Excelente para tomar frío por las tardes, me da una energía deliciosa sin ponerme ansioso.', rating: 5 }
    ],
    whyChoose: {
      title: 'Frescura y Alivio Digestivo Natural',
      description: 'En ZENHOGAR creamos bienestar natural para tu día a día. Guanda Mix une los secretos digestivos de la Flor de Jamaica, el té verde y el magnesio de máxima asimilación para brindarte un vientre plano y una energía brillante con registro INVIMA garantizado.'
    }
  },
  {
    id: 'nad-1',
    masterId: '129308',
    name: '+NAD',
    category: 'salud-bienestar',
    shortDescription: 'Soporte Avanzado para la Vitalidad y el Bienestar Celular.',
    description: `+NAD es la fórmula de vanguardia en nutrición para el bienestar celular, diseñada para revitalizar tu organismo desde lo más profundo. Combinando Nicotinamida (un precursor directo del NAD+) con el poder antioxidante del Resveratrol y el Calostro Bovino, este suplemento ayuda a proteger las células y optimizar la producción de energía contra el daño oxidativo.

Su base cremosa de coco no solo le otorga un sabor exquisito, sino que facilita una absorción superior de sus ingredientes clave como la Quercetina y la Lactoferrina. +NAD es el aliado perfecto para quienes desean mantener una mente clara, una piel firme y un cuerpo lleno de energía vital a pesar del paso de los años, proporcionando un soporte inmunológico y regenerativo sin precedentes.

✔️ Rejuvenecimiento Celular: Protege las mitocondrias y promueve la reparación biológica natural.
✔️ Energía Metabólica: Transforma los nutrientes en energía vital de forma más eficiente y duradera.
✔️ Soporte Inmunológico: Alimento enriquecido para fortalecer las defensas y la vitalidad diaria.`,
    seoTitle: '+NAD Suplemento para Bienestar Celular | Vitalidad Celular y Resveratrol',
    seoDescription: 'Apoya el bienestar de tus células con +NAD. Suplemento con Resveratrol y NAD+ para una piel firme y energía vital renovada. ¡Registro INVIMA!',
    benefits: [
      'Apoyo en la protección celular avanzada contra agentes oxidantes',
      'Aumento significativo en la producción de energía y claridad mental',
      'Digestión óptima y absorción rápida gracias a su base de coco',
      'Fortalece la respuesta inmunológica ante desafíos del entorno',
      'Promueve una piel de apariencia saludable y un metabolismo celular revitalizado'
    ],
    image: '/assets/products/+nad.webp',
    basePrice: 79900,
    size: '350g',
    presentation: 'Polvo',
    invima:'2018DM-0018869',
    googleCategory: 'Health & Beauty > Health Care > Fitness & Nutrition',
    condition: 'new',
    supportImages: [
      '/assets/products/nad-1-apoyo-2.webp',
      '/assets/products/nad-1-apoyo-3.webp',
      '/assets/products/nad-1-apoyo-4.webp'
    ],
    keywords: 'energía natural, antiedad, vitalidad celular, piel firme, cansancio, +NAD, Zenhogar',
    components: 'Colágeno (10g), Crema de Coco, NAD, Vitaminas A, C, D, E y complejo B',
    componentBenefits: [
    {
        'name': 'NAD',
        'benefit': 'Favorece la renovación natural y el correcto funcionamiento de las células, devolviendo una profunda vitalidad al organismo.'
    },
    {
        'name': '10g de Colágeno y Crema de Coco',
        'benefit': 'Aportan una profunda nutrición que favorece la firmeza y la apariencia saludable de la piel.'
    },
    {
        'name': 'Vitaminas',
        'benefit': 'Aportan antioxidantes esenciales que ayudan a proteger las células contra el daño oxidativo diario.'
    }
],
    longTailKeywords: [
      'mejor suplemento para bienestar celular con NAD+ y resveratrol',
      'cómo nutrir las células y aumentar la energía vital naturalmente',
      'suplemento con calostro bovino y lactoferrina para defensas y longevidad',
      'beneficios de +NAD para el bienestar integral y salud mitocondrial',
      'fórmula avanzada para bienestar celular con quercetina y base de coco',
      'bienestar integral y vitalidad celular renovada con registro INVIMA',
      'cómo mantener la piel firme y el cerebro activo con NAD de alta pureza',
      'suplemento nutricional avanzado para una longevidad saludable y activa',
      'solución natural para la fatiga celular y el bienestar biológico',
      'energía y vitalidad segura con ingredientes certificados de máxima absorción'
    ],
    seoFaqs: [
      { q: '¿Qué diferencia a +NAD de otros colágenos?', a: 'Este es un sistema celular que añade Nicotinamida y Resveratrol para apoyar el bienestar desde el núcleo.' },
      { q: '¿Cómo ayuda el calostro bovino en este producto?', a: 'Aporta factores de transferencia que blindan tu sistema inmune para que tu vitalidad y equilibrio natural sean inquebrantables.' },
      { q: '¿Se puede mezclar con bebidas calientes?', a: 'Es preferible consumirlo en jugos o agua a temperatura ambiente para preservar la calidad certificada de sus micronutrientes.' },
      { q: '¿Ayuda con la memoria y la claridad mental?', a: 'Sí, al optimizar la energía celular, favorece el rendimiento cognitivo y el enfoque diario con total seguridad.' }
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
      description: 'En ZENHOGAR estamos comprometidos con tu salud, ofrecemos productos con registro INVIMA con ciencia avanzada. +NAD apoya tu bienestar celular con Resveratrol y Quercetina. Fórmula balanceada para una vida saludable con calidad certificada.'
    }
  },
  {
    id: 'titan-coffee',
    masterId: '23013',
    name: 'Titan Coffee',
    category: 'salud-sexual',
    shortDescription: 'Café de Alto Rendimiento para una Energía Inagotable.',
    description: `Titan Coffee no es solo un café; es un combustible de alto desempeño diseñado para transformar tu mañana en un arranque de potencia total. Fusionando granos de café premium con los extractos más energizantes de la naturaleza (Borojó, Maca y Chontaduro), este café funcional proporciona una liberación sostenida de energía que evita los bajones repentinos y mejora el enfoque mental durante todo el día.

Su base cremosa de coco lo hace una opción deliciosa y saludable, libre de lácteos y fácil de digerir. Ideal para profesionales, deportistas y cualquier persona que necesite un extra de vigor físico y claridad cognitiva para conquistar sus metas diarias. Empieza tu día con la fuerza de un titán y disfruta de un sabor gourmet con beneficios nutricionales reales.

✔️ Ritual de Potencia: El sabor del café colombiano potenciado con Maca y Chontaduro para el vigor.
✔️ Vigor Mental: Mejora la concentración y reduce la fatiga intelectual en jornadas de alta presión.
✔️ Fórmula Nutritiva: Base de coco que aporta grasas saludables y una textura cremosa inigualable.`,
    seoTitle: 'Titan Coffee Café Energizante | Café Maduro con Maca y Borojó',
    seoDescription: 'Despierta tu máximo potencial con Titan Coffee. Café funcional con extractos naturales para energía física y enfoque mental superior. ¡Registro INVIMA!',
    benefits: [
      'Desayuno de alto rendimiento para días de extrema exigencia física',
      'Combate el agotamiento laboral y mejora la agudeza mental diaria',
      'Totalmente libre de lácteos con una base nutritiva de crema de coco',
      'Energía prolongada sin generar picos de ansiedad o nerviosismo',
      'Sabor delicioso y textura cremosa de calidad gourmet certificada'
    ],
    image: '/assets/products/Titancoffee.webp',
    basePrice: 69900,
    size: '400g',
    presentation: 'Polvo',
    invima: 'PSA-000982-2018',
    googleCategory: 'Health & Beauty > Health Care > Fitness & Nutrition',
    condition: 'new',
    supportImages: [
      '/assets/products/titancoffee-apoyo-1.webp',
      '/assets/products/titancoffee-apoyo-2.webp',
      '/assets/products/titancoffee-apoyo-3.webp',
      '/assets/products/titancoffee-apoyo-4.webp'
    ],
    keywords: 'café energizante, potencia masculina, vitalidad, Titan Coffee, Zenhogar, vigor natural',
    components: 'Maca, Chontaduro, Borojó, Café soluble y Crema de Coco',
    componentBenefits: [
    {
        'name':'Café Soluble y Crema de Coco',
        'benefit': 'Elevan el estado de alerta mental y el enfoque sin generar picos de nerviosismo o agitación.'
    },
    {
        'name': 'Maca, Chontaduro y Borojó',
        'benefit': 'Mantienen al cuerpo activo y previenen el agotamiento físico durante el día.'
    }
],
    longTailKeywords: [
      'mejor café funcional con maca y borojó para rendimiento máximo',
      'cómo tener energía física y mental constante con café de alta potencia',
      'café con chontaduro y crema de coco para un desayuno de campeones',
      'beneficios de Titan Coffee para el bienestar integral y vigor masculino',
      'fórmula avanzada para potenciar la fuerza y el enfoque con una taza de café',
      'bienestar integral y vitalidad renovada con nutrición gourmet certificada',
      'cómo combatir el cansancio crónico laboral con extractos naturales puros',
      'café saludable sin lácteos para mejorar el desempeño físico diario',
      'solución natural para la falta de vitalidad matutina y pesadez mental',
      'energía y potencia segura con ingredientes de alta pureza y registro INVIMA'
    ],
    seoFaqs: [
      { q: '¿Titan Coffee es apto para personas con intolerancia a la lactosa?', a: 'Sí, su base es Crema de Coco, lo que lo hace gentil con tu estómago y promueve un bienestar integral sin lácteos.' },
      { q: '¿Puedo tomarlo si hago ayuno intermitente?', a: 'Sí, es una excelente opción para brindar vitalidad y energía limpia sin romper tu equilibrio natural metabólico drásticamente.' },
      { q: '¿Se siente el sabor a los extractos de maca y borojó?', a: 'No, su formulación gourmet equilibra perfectamente el sabor del café premium con el beneficio de vigor y calidad certificada.' },
      { q: '¿Contiene azúcar añadida?', a: 'Titan Coffee está diseñado para ser una fuente de energía saludable, permitiéndote disfrutar de tu vitalidad diaria con total confianza.' }
    ],
    promos: [
      { id: '1u', label: '1 Unidad', units: 1, price: 69900 },
      { id: '2u', label: '2 Unidades', units: 2, price: 104850 },
      { id: '2x3', label: 'Pague 2 Lleve 3', units: 3, price: 139800, badge: '⭐ Recomendado' },
      { id: '3x5', label: 'Pague 3 Lleve 5', units: 5, price: 209700, badge: '🔥 Mejor Oferta' }
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
    masterId: '58626',
    name: 'Hemocream',
    category: 'salud-bienestar',
    shortDescription: 'Cuidado Botánico Avanzado en Zonas Sensibles.',
    description: `Recupera tu comodidad diaria con este cuidado botánico avanzado, la solución magistral diseñada para brindar alivio profundo y protección a la zona íntima. Su fórmula intégra el poder de la fitoterapia moderna mediante una sinergia de 11 extractos botánicos premium, liderados por el Castaño de Indias, la Caléndula y el Hamamelis. Estos ingredientes actúan en conjunto para reducir la incomodidad, calmar el ardor persistente y favorecer la microcirculación, proporcionando una barrera refrescante que mitiga el malestar desde la primera aplicación.

Especialmente formulada para pieles frágiles, esta solución botánica esencial ayuda a regenerar los tejidos irritados en las zonas íntimas más sensibles, aportando suavidad y reduciendo la fricción en los momentos de mayor sensibilidad. Su textura ligera y sedosa se absorbe sin dejar residuos grasos, permitiéndote retomar tus actividades con total confort y la seguridad de un cuidado 100% natural, certificado por expertos.

✔️ Alivio Antiinflamatorio: Calma instantáneamente el dolor, el ardor y la picazón en zonas sensibles.
✔️ Regeneración Celular: La caléndula y el aloe vera aceleran la recuperación natural de los tejidos afectados.
✔️ Facilidad y Confort: Mejora la suavidad de la zona para permitir una evacuación sin traumas ni dolor excesivo.`,
    seoTitle: 'Alivio natural para hemorroides y ardor con Cuidado Botánico Avanzado | Zenhogar',
    seoDescription: 'Reduce la inflamación y calma el dolor anal con nuestro cuidado botánico. Combinación de 11 extractos naturales para un alivio suave y efectivo. ¡Calidad INVIMA!',
    benefits: [
      'Calma de forma inmediata el ardor y la sensación de pesadez local',
      'Favorece la microcirculación gracias al extracto de Castaño de Indias',
      'Facilita el tránsito intestinal y reduce la fricción durante la evacuación',
      'Favorece el bienestar y reconforta los tejidos sensibles',
      'Fórmula botánica fluida, discreta y de rápida absorción sin manchas'
    ],
    image: '/assets/products/Hemocream.webp',
    basePrice: 59900,
    size: '30ml',
    presentation: 'Crema',
    invima: 'NSOC15678-23CO',
    googleCategory: 'Health & Beauty > Health Care',
    condition: 'new',
    supportImages: [
      '/assets/products/hemocream-apoyo-1.webp',
      '/assets/products/hemocream-apoyo-2.webp',
      '/assets/products/hemocream-apoyo-3.webp',
      '/assets/products/hemocream-apoyo-4.png'
    ],
    keywords: 'hemorroides, ardor anal, picazón, caléndula, aloe vera, plantas medicinales, alivio natural, cuidado botánico, Zenhogar, fisura anal',
    components: 'Caléndula, Castaño de Indias, Aloe Vera, Avena, Manzanilla y Centella Asiática',
    componentBenefits: [
    {
        'name': 'Caléndula, Manzanilla y Aloe Vera',
        'benefit': 'Calman el ardor y la sensibilidad cutánea aportando un alivio rápido y reconfortante.'
    },
    {
        'name': 'Castaño de Indias y Centella Asiática',
        'benefit': 'Favorecen la microcirculación y ayudan a disminuir la sensación de pesadez e inflamación.'
    },
    {
        'name': 'Avena',
        'benefit': 'Humecta y protege la barrera natural.'
    }
],
    longTailKeywords: [
      'mejor crema botánica para calmar el ardor anal rápidamente',
      'cómo favorecer el bienestar ante las hemorroides de forma natural y con facilidad',
      'crema de caléndula y aloe vera para inflamación hemorroidal persistente',
      'beneficios de las plantas medicinales para el cuidado anal sensible',
      'fórmula botánica suave para alivio inmediato del malestar diario',
      'bienestar integral y cuidado anal delicado con registro INVIMA certificado',
      'solución natural para fisuras anales y picazón sin químicos',
    ],
    seoFaqs: [
      { q: '¿Cómo debo aplicar este producto para obtener mejores resultados?', a: 'Se recomienda aplicar una pequeña cantidad en la zona afectada 2 o 3 veces al día, preferiblemente después de ir al baño.' },
      { q: '¿Este producto brinda alivio de inmediato?', a: 'Sí, sus extractos de menta y manzanilla brindan una calma refrescante que mejora tu bienestar desde el primer uso.' },
      { q: '¿Contiene corticoides?', a: 'No, es una fórmula 100% botánica, lo que permite un uso prolongado y seguro sin efectos secundarios hormonales.' },
      { q: '¿Es segura durante el embarazo?', a: 'Al ser natural con calidad certificada es generalmente segura, pero siempre recomendamos consultar a su profesional de salud.' }
    ],
    promos: [
      { id: '1u', label: '1 Unidad', units: 1, price: 59900 },
      { id: '2u', label: '2 Unidades', units: 2, price: 89850 },
      { id: '2x3', label: 'Pague 2 Lleve 3', units: 3, price: 119850, badge: '⭐ Recomendado' },
      { id: '3x5', label: 'Pague 3 Lleve 5', units: 5, price: 179700, badge: '🔥 Mejor Oferta' }
    ],
    testimonials: [
      { name: 'Jorge T.', text: 'Me ha aliviado mucho el malestar y la inflamación. Muy efectiva.', rating: 5 },
      { name: 'Marta S.', text: 'Excelente crema, brinda un alivio rápido y duradero. Calidad certificada.', rating: 5 }
    ],
    whyChoose: {
      title: 'Alivio y confort inmediato',
      description: 'En ZENHOGAR estamos comprometidos con tu salud, ofrecemos productos con registro INVIMA de alivio suave. Este cuidado botánico ayuda a calmar el ardor y la pesadez gracias a la Caléndula y el Aloe Vera. Recupera tu confort con calidad certificada.'
    }
  },
  {
    id: 'ashwagandha',
    masterId: '231797',
    name: 'Ashwagandha',
    category: 'salud-bienestar',
    shortDescription: 'Equilibrio Emocional, Alivio del Estrés y Descanso Reparador.',
    description: `Encuentra la paz mental y la serenidad física con Ashwagandha de ZENHOGAR, el poderoso suplemento adaptógeno ancestral diseñado para equilibrar tu sistema nervioso frente a las demandas cotidianas y rejuvenecer tu mente desde el interior. Esta fórmula premium aprovecha las propiedades milenarias de la Withania somnifera en un formato de cápsulas blandas de fácil absorción, creando un sistema de soporte completo para tu mente, tu estado de ánimo y tu descanso. Enriquecido con sus compuestos activos de alta pureza, este extracto combate el desgaste celular provocado por el estrés crónico, promoviendo una resistencia superior en todo tu organismo.
  Complementado con una excelente biodisponibilidad gracias a su presentación en gel suave (softgel), este suplemento es el aliado perfecto para personas activas que sufren de insomnio o fatiga mental y no desean que el ritmo diario limite su bienestar. Su acción reguladora actúa profundamente en el cuerpo, ayudándote a modular la respuesta ante las tensiones del día a día, devolviéndole la luminosidad a tu energía vital y la firmeza a tu equilibrio emocional de manera segura.

✔️ Control del Estrés: Regula el cortisol, reduce la ansiedad y promueve la calma.
✔️ Sueño Reparador: Combate el insomnio y relaja el sistema nervioso sin causar somnolencia diurna.
✔️ Resiliencia Natural: Optimiza el rendimiento mental y aporta un estado de ánimo positivo.`,
    seoTitle: 'Ashwagandha Suplemento Adaptógeno Natural para Estrés y Sueño | Zenhogar',
    seoDescription: 'Reduce el estrés y mejora tu calidad de sueño de forma natural con Ashwagandha de ZENHOGAR. Suplemento adaptógeno premium con Registro INVIMA.',
    benefits: [
      'Ayuda a regular los niveles de ansiedad y aliviar el estrés',
      'Promueve un descanso profundo, reparador y combate el insomnio',
      'Favorece el enfoque mental, la concentración y la claridad cognitiva',
      'Apoya el sistema inmunológico y la vitalidad física general',
      'Fórmula adaptógena natural de alta pureza y asimilación'
    ],
    image: '/assets/products/ashwagandha.webp',
    basePrice: 79900,
    size: '60 Unidades',
    presentation: 'Capsulas Blandas',
    invima: 'NSA-2948-2026',
    googleCategory: 'Health & Beauty > Health Care > Fitness & Nutrition',
    condition: 'new',
    supportImages: [
      '/assets/products/ashwagandha-apoyo-1.webp',
      '/assets/products/ashwagandha-apoyo-2.webp',
      '/assets/products/ashwagandha-apoyo-3.webp'
    ],
    keywords: 'ashwagandha, estrés, ansiedad, insomnio, adaptógeno, sueño profundo, bienestar emocional',
    components: 'Ashwagandha, Gelatina, Glicerina, Sorbato de Potasio, Aceite Vegetal, Lecitina de Soya, Dioxido de Silicio',
    componentBenefits: [
      { name: 'Ashwagandha', benefit: 'Regula el sistema nervioso y controla el cortisol.' },
      { name: 'Aceite Vegetal y Lecitina de Soya', benefit: 'Optimizan la biodisponibilidad de la fórmula para que tu cuerpo asimile los nutrientes de manera inmediata y eficiente.' }
    ],
    longTailKeywords: [
      'mejor suplemento de ashwagandha para el estrés en Colombia',
      'cómo bajar el cortisol de forma natural y efectiva',
      'ashwagandha para mejorar la calidad del sueño y dormir mejor',
      'beneficios de los adaptógenos naturales para la salud mental',
      'algo para bajar el stress y la ansiedad',
      'cómo combatir la fatiga mental y el insomnio sin fármacos'
    ],
    seoFaqs: [
      { q: '¿En cuánto tiempo se sienten los efectos de la Ashwagandha?', a: 'Muchos usuarios sienten un alivio de la tensión nerviosa y una mejor calidad del sueño desde la primera semana de uso constante.' },
      { q: '¿Produce somnolencia durante el día?', a: 'No, como adaptógeno ayuda a equilibrar tu cuerpo, dándote energía por el día y promoviendo el descanso reparador en la noche.' }
    ],
    promos: [
      { id: '1u', label: '1 Unidad', units: 1, price: 79900 },
      { id: '2u', label: '2 Unidades', units: 2, price: 119850 },
      { id: '2x3', label: 'Pague 2 Lleve 3', units: 3, price: 159800, badge: '⭐ Recomendado' },
      { id: '3x5', label: 'Pague 3 Lleve 5', units: 5, price: 239700, badge: '🔥 Mejor Oferta' }
    ],
    testimonials: [
      { name: 'Camila V.', text: 'Sufría de mucho insomnio por el trabajo y la ashwagandha me ha devuelto el sueño profundo. Me despierto renovada.', rating: 5 },
      { name: 'Felipe M.', text: 'Excelente para el estrés del día a día, me siento mucho más tranquilo y enfocado.', rating: 5 }
    ],
    whyChoose: {
      title: 'Serenidad y Resiliencia Natural',
      description: 'En ZENHOGAR impulsamos tu bienestar con extractos adaptógenos de alta pureza. Nuestra Ashwagandha ayuda a regular el cortisol para brindarte paz mental y un descanso profundo con registro sanitario oficial.'
    }
  },
  {
    id: 'resveratrol-nad',
    masterId: '232077',
    name: 'Resveratrol y Vitamina B3 (NAD)',
    category: 'salud-bienestar',
    shortDescription: 'Energía y vitalidad Celular, Protección Antienvejecimiento.',
    description: `Revitaliza tu cuerpo desde el núcleo celular con el complejo de Resveratrol y Vitamina B3 (NAD), la fórmula avanzada diseñada para rejuvenecer tus células y proteger tu organismo desde el interior. Esta combinación premium une dos de los precursores de longevidad más potentes de la ciencia moderna, creando un sistema de soporte completo que combate el desgaste oxidativo, promueve la reparación del ADN y actúa directamente en las mitocondrias para optimizar la conversión de alimentos en energía vital.
    
 Con una excelente biodisponibilidad en formato de cápsulas blandas (softgel), es el aliado perfecto contra el envejecimiento prematuro, la fatiga y la pérdida de firmeza. Su acción protectora actúa profundamente para combatir el desgaste celular, devolviendo a tu piel, mente y cuerpo una profunda turgencia, luminosidad y juventud.

✔️ Longevidad Celular: Activa los genes de la juventud y promueve de forma segura la reparación del ADN.
✔️ Energía Mitocondrial: La vitamina B3 y el NAD+ optimizan la energía celular, reduciendo eficazmente el cansancio.
✔️ Firmeza y Elasticidad: Combate los radicales libres para restaurar la turgencia natural de la piel y los tejidos.`,

    seoTitle: 'Resveratrol y Vitamina B3 (NAD): Rejuvenecimiento Celular | Zenhogar',
    seoDescription: 'Potencia tu vitalidad y rejuvenece desde adentro con Resveratrol y Vitamina B3 (NAD). Fórmula de longevidad celular con Registro INVIMA y alta absorción.',
    benefits: [
      'Apoya la producción de energía celular y combate la fatiga',
      'Potente acción antioxidante contra el envejecimiento de las células',
      'Ayuda a unificar el tono de la piel y devolverle su firmeza natural',
      'Favorece el bienestar cardiovascular y la microcirculación cerebral',
      'Fórmula enriquecida con precursores de NAD+ de máxima absorción'
    ],
    image: '/assets/products/resveratrol-nad.webp',
    basePrice: 79900,
    size: '60 Unidades',
    presentation: 'Capsulas Blandas',
    invima: 'NSA-2948-2026',
    googleCategory: 'Health & Beauty > Health Care > Fitness & Nutrition',
    condition: 'new',
    supportImages: [
      '/assets/products/resveratrol-nad-apoyo-1.webp',
      '/assets/products/resveratrol-nad-apoyo-2.webp',
      '/assets/products/resveratrol-nad-apoyo-3.webp'
    ],
    keywords: 'resveratrol nad, vitamina b3, antiedad celular, longevidad, colágeno, arrugas, piel firme, ZENHOGAR',
    components: 'Resveratrol, Vitamina B3 (Nicotinamida), precursores de NAD+, Glicerina, Sorbato de Potasio, Aceite Vegetal',
    componentBenefits: [
      { name: 'Resveratrol y Vitamina B3', benefit: 'Estimulan la función del NAD+ celular y defienden la piel y órganos contra radicales libres.' },
      { name: 'Aceite Vegetal y Lecitina de Soya', benefit: 'Optimizan la biodisponibilidad de la fórmula para que tu cuerpo asimile los nutrientes de manera inmediata y eficiente.' }
    ],
    longTailKeywords: [
      'mejor suplemento de resveratrol y nad en Colombia para la vejez',
      'cómo aumentar el NAD+ en el cuerpo de manera natural',
      'beneficios del resveratrol con vitamina b3 para la piel y energía',
      'antioxidantes de grado clínico para retardar el envejecimiento',
      'suplementos de longevidad celular and energía mitocondrial'
    ],
    seoFaqs: [
      { q: '¿Qué es el NAD y cómo ayuda con el envejecimiento?', a: 'El NAD+ es una coenzima celular indispensable para la producción de energía y la reparación del ADN. Sus niveles disminuyen con la edad, y precursores como la Vitamina B3 ayudan a restaurarlos.' },
      { q: '¿Cómo se debe consumir?', a: 'Debe tomarse por via oral acompañado de agua o preferiblemente de alimentos.' },
      { q: '¿Es apto para adultos mayores?', a: 'Absolutamente, es ideal para personas que buscan mantener la agilidad mental, la firmeza cutánea y la energía celular.' }
    ],
    promos: [
      { id: '1u', label: '1 Unidad', units: 1, price: 79900 },
      { id: '2u', label: '2 Unidades', units: 2, price: 119850 },
      { id: '2x3', label: 'Pague 2 Lleve 3', units: 3, price: 159800, badge: '⭐ Recomendado' },
      { id: '3x5', label: 'Pague 3 Lleve 5', units: 5, price: 239700, badge: '🔥 Mejor Oferta' }
    ],
    testimonials: [
      { name: 'Diana R.', text: 'He sentido un cambio enorme en mi piel y mi nivel de energía. Se siente la diferencia en la vitalidad diaria.', rating: 5 },
      { name: 'Carlos T.', text: 'Es un excelente producto antienvejecimiento, me siento menos cansado por las tardes.', rating: 5 }
    ],
    whyChoose: {
      title: 'Ciencia Celular y Rejuvenecimiento',
      description: 'En ZENHOGAR comprometidos con tu longevidad. Resveratrol y Vitamina B3 (NAD) une ciencia mitocondrial con pureza antioxidante para reactivar tus niveles de energía y elasticidad celular de forma certificada.'
    }
  },
  {
    id: 'vinagre-manzana',
    masterId: '232090',
    name: 'Vinagre de Manzana',
    category: 'salud-bienestar',
    shortDescription: 'Equilibrio Digestivo, Control de Ansiedad y Metabolismo Activo.',
    description: `Optimiza tu digestión, activa tu energía y acelera tu metabolismo de forma natural con el Vinagre de Manzana, la solución avanzada diseñada para purificar tu cuerpo y potenciar tu rendimiento diario desde el interior. Esta fórmula premium ofrece todos los beneficios del vinagre de sidra de manzana de manera práctica y sin el sabor ácido tradicional, creando un sistema de soporte completo que apoya la salud digestiva y evita la acumulación de grasa corporal de forma cómoda y segura.
    
  Con una excelente biodisponibilidad en formato de cápsulas blandas (softgel), es el aliado perfecto para mantener tus metas de peso saludable, regular la glucosa y controlar los antojos. Su acción purificadora actúa profundamente en el organismo, transformando los nutrientes en vitalidad constante y protegiendo tu equilibrio corporal de manera natural y duradera.
  
✔️ Activación de Energía: Transforma los alimentos en combustible celular para apoyar un rendimiento físico y mental superior.
✔️ Metabolismo y Control: Acelera el metabolismo de forma natural y ayuda a evitar que el cuerpo acumule grasa.
✔️ Salud Digestiva: Disminuye la inflamación abdominal, controla los antojos de dulce y promueve una digestión ligera. `,
    seoTitle: 'Vinagre de Manzana para Metabolismo y Digestión | Zenhogar',
    seoDescription: 'Regula tu digestión y controla los antojos con el Vinagre de Manzana de ZENHOGAR. Suplemento natural para un vientre plano y metabolismo activo. ¡Registro INVIMA!',
    benefits: [
      'Apoya el control de peso y disminuye la ansiedad por comer dulce',
      'Mejora la digestión y ayuda a reducir el reflujo y la pesadez',
      'Favorece la desintoxicación natural del colon y el abdomen plano',
      'Ayuda a mantener estables los niveles de azúcar en la sangre',
      'Fórmula balanceada de alta asimilación con agradable consistencia'
    ],
    image: '/assets/products/vinagre-manzana.webp',
    basePrice: 79900,
    size: '60 Unidades',
    presentation: 'Capsulas Blandas',
    invima: 'NSA-2948-2026',
    googleCategory: 'Health & Beauty > Health Care > Fitness & Nutrition',
    condition: 'new',
    supportImages: [
      '/assets/products/vinagre-manzana-apoyo-1.webp',
      '/assets/products/vinagre-manzana-apoyo-2.webp',
      '/assets/products/vinagre-manzana-apoyo-3.webp',
      '/assets/products/vinagre-manzana-apoyo-4.webp'
    ],
    keywords: 'vinagre de sidra de manzana, detox, metabolismo, vientre plano, digestión ligera, glucosa, ZENHOGAR',
    components: 'Vinagre de Sidra de Manzana, Aceite Vegetal y Lecitina de Soya',
    componentBenefits: [
      { name: 'Vinagre de Sidra de Manzana', benefit: 'Favorece la reducción del pH gástrico optimizando la asimilación de alimentos y controlando la glucemia.' },
      { name: 'Aceite Vegetal y Lecitina de Soya', benefit: 'Optimizan la biodisponibilidad de la fórmula para que tu cuerpo asimile los nutrientes de manera inmediata y eficiente.' }    ],
    longTailKeywords: [
      'mejor vinagre de manzana capsulas en Colombia para adelgazar',
      'cómo tomar vinagre de manzana sin dañar el esmalte dental',
      'vinagre de manzana para la digestión pesada e inflamación',
      'suplementos naturales para controlar el azúcar y la ansiedad',
      'detox de colon y abdomen plano con vinagre de manzana'
    ],
    seoFaqs: [
      { q: '¿Daña este vinagre el esmalte de los dientes?', a: 'No, al estar formulado en una mezcla en polvo balanceada para diluir, no entra en contacto ácido directo con el esmalte como el vinagre líquido puro.' },
      { q: '¿Cómo se debe Consumir?', a: 'Debe tomarse por via oral con un vaso de agua, preferiblemente antes de la comida principal para optimizar la digestión y controlar saciedad.' },
      { q: '¿Es apto para personas con gastritis?', a: 'Sí, su fórmula amortiguada y balanceada ayuda a regular la acidez de forma natural sin agredir las mucosas.' }
    ],
    promos: [
      { id: '1u', label: '1 Unidad', units: 1, price: 79900 },
      { id: '2u', label: '2 Unidades', units: 2, price: 119850 },
      { id: '2x3', label: 'Pague 2 Lleve 3', units: 3, price: 159800, badge: '⭐ Recomendado' },
      { id: '3x5', label: 'Pague 3 Lleve 5', units: 5, price: 239700, badge: '🔥 Mejor Oferta' }
    ],
    testimonials: [
      { name: 'Isabela M.', text: 'Me ha ayudado muchísimo a desinflamarme el estómago y a controlar la ansiedad por las tardes. Súper recomendado.', rating: 5 },
      { name: 'Andrés Q.', text: 'Excelente opción para tener los beneficios del vinagre de manzana sin su sabor fuerte.', rating: 5 }
    ],
    whyChoose: {
      title: 'Ligereza y Equilibrio Metabólico',
      description: 'En ZENHOGAR te ofrecemos soluciones de salud digestiva seguras. Nuestro Vinagre de Manzana estimula la buena digestión y el balance metabólico con una fórmula gentil y registro INVIMA garantizado.'
    }
  },
  {
    id: 'citrato-potasio-magnesio',
    masterId: '232080',
    name: 'Citrato de Potasio y Magnesio',
    category: 'salud-bienestar',
    shortDescription: 'Equilibrio Electrolítico, Bienestar Muscular, Sistema Nervioso y Salud Cardiovascular.',
    description: `Recupera el equilibrio mineral de tu cuerpo con el complejo de Citrato de Potasio y Citrato de Magnesio, la fórmula avanzada diseñada para restaurar tu vitalidad y proteger tu sistema muscular desde el interior. Esta combinación premium une las dos formas de mayor absorción de estos minerales esenciales, creando un sistema de soporte completo que combate los calambres, reduce la fatiga crónica y promueve un correcto balance electrolítico en todo tu organismo.
  
  Con una excelente biodisponibilidad en formato de cápsulas blandas (softgel), es el aliado perfecto para personas activas que buscan aliviar la tensión acumulada, regular la presión arterial y mejorar la relajación nocturna. Su acción sinérgica actúa profundamente en el cuerpo, transformando el descanso en energía vital y apoyando el buen funcionamiento del sistema nervioso de forma segura y natural.

✔️ Bienestar Muscular: Alivia la tensión, previene calambres y espasmos, y acelera la recuperación física.
✔️ Sistema Nervioso y Sueño: Promueve una relajación profunda, ayuda a controlar el estrés y mejora la calidad del descanso.
✔️ Balance y Energía: Optimiza el equilibrio de líquidos en el cuerpo, regula la presión y combate el cansancio crónico.`,
    seoTitle: 'Citrato de Potasio y Magnesio Suplemento Mineral | Zenhogar',
    seoDescription: 'Evita los calambres y mejora tu salud cardiovascular con Citrato de Potasio y Magnesio de ZENHOGAR. Citratos de alta disponibilidad con Registro INVIMA.',
    benefits: [
      'Combate eficazmente los calambres y la rigidez muscular de forma estable',
      'Ayuda a unificar el ritmo muscular cardíaco y apoya el sistema cardiovascular',
      'Favorece el pH del organismo, reduciendo la retención de líquidos',
      'Optimiza la función del sistema nervioso y promueve la relajación',
      'Fórmula en citratos altamente asimilables por el organismo',
      'Ayuda a regular la presión arterial y reduce los efectos del sodio en el cuerpo'
    ],
    image: '/assets/products/citrato-potasio-magnesio.webp',
    basePrice: 79900,
    size: '60 Unidades',
    presentation: 'Capsulas Blandas',
    invima: 'NSA-2948-2026',
    googleCategory: 'Health & Beauty > Health Care > Fitness & Nutrition',
    condition: 'new',
    supportImages: [
      '/assets/products/citrato-potasio-magnesio-apoyo-1.webp',
      '/assets/products/citrato-potasio-magnesio-apoyo-2.webp',
      '/assets/products/citrato-potasio-magnesio-apoyo-3.webp'
    ],
    keywords: 'citrato de potasio, citrato de magnesio, calambres, presión arterial, retención líquidos, ZENHOGAR',
    components: 'Citrato de Potasio, Citrato de Magnesio',
    componentBenefits: [
      { name: 'Citrato de Potasio', benefit: 'Ayuda a la correcta función celular y muscular, combatiendo el sodio y la retención de liquidos, ayuda a prevenir la formacion de nuevos calculos renales.' },
      { name: 'Citrato de Magnesio', benefit: 'Favorece la relajación neuromuscular reduciendo el cansancio y calambres.' },
      { name: 'Aceite Vegetal y Lecitina de Soya', benefit: 'Optimizan la biodisponibilidad de la fórmula para que tu cuerpo asimile los nutrientes de manera inmediata y eficiente.' }
    ],
    longTailKeywords: [
      'mejor citrato de potasio y magnesio Colombia',
      'cómo quitar los calambres en las piernas por las noches',
      'beneficios del magnesio y potasio para la presion arterial',
      'suplementos de citrato para retención de líquidos y riñones',
      'minerales esenciales para evitar la fatiga muscular diaria'
    ],
    seoFaqs: [
      { q: '¿Por qué son mejores los citratos?', a: 'Los citratos son formas orgánicas que el cuerpo humano absorbe y asimila con un 90% más de efectividad que los óxidos o carbonatos de magnesio y potasio.' },
      { q: '¿Ayuda con la retención de líquidos?', a: 'Sí, el potasio actúa como un regulador natural que facilita la expulsión del exceso de sodio a través de los riñones.' },
      { q: '¿Tiene alguna contraindicación?', a: 'Personas con insuficiencia renal severa o afecciones cardíacas graves deben consultar a su médico antes de consumir.' }
    ],
    promos: [
      { id: '1u', label: '1 Unidad', units: 1, price: 79900 },
      { id: '2u', label: '2 Unidades', units: 2, price: 119850 },
      { id: '2x3', label: 'Pague 2 Lleve 3', units: 3, price: 159800, badge: '⭐ Recomendado' },
      { id: '3x5', label: 'Pague 3 Lleve 5', units: 5, price: 239700, badge: '🔥 Mejor Oferta' }
    ],
    testimonials: [
      { name: 'Sonia P.', text: 'Sufría de calambres todas las noches y desde la primera semana que tomé el citrato de potasio y magnesio desaparecieron. Increíble.', rating: 5 },
      { name: 'Ricardo G.', text: 'Excelente para recuperar electrolitos después de mis entrenamientos en bicicleta. No me volví a fatigar.', rating: 5 }
    ],
    whyChoose: {
      title: 'Balance Mineral y Alivio Neuromuscular',
      description: 'En ZENHOGAR garantizamos tu bienestar con formulaciones de alta biodisponibilidad. Nuestro Citrato de Potasio y Magnesio relaja el sistema muscular y protege tus articulaciones y corazón con calidad certificada.'
    }
  },
  {
    id: 'oregano',
    masterId: '231795',
    name: 'Orégano',
    category: 'salud-bienestar',
    shortDescription: 'Inmunidad Avanzada, Antiparasitario y Balance Digestivo.',
    description: `Descubre el poder purificador del Orégano, una de las soluciones botánicas más potentes de la naturaleza para blindar tus defensas, proteger tus células y limpiar tu sistema digestivo de forma profunda. Esta fórmula premium de alta pureza es excepcionalmente rica en carvacrol, creando un sistema de soporte completo que actúa como un escudo natural, combate el daño oxidativo, ayuda a equilibrar la microbiota intestinal, alivia la candidiasis y mitiga los gases o la inflamación estomacal de manera segura.

Con una excelente biodisponibilidad en formato de cápsulas blandas (softgel), es el aliado perfecto para quienes buscan un apoyo integral al bienestar digestivo, eliminar toxinas y fortalecer su sistema inmune sin sufrir el fuerte sabor del extracto tradicional. Su acción protectora y antioxidante actúa profundamente en el organismo, combatiendo bacterias y parásitos perjudiciales para devolverle el equilibrio, la ligereza y una vitalidad saludable a tu día a día.

✔️ Escudo e Inmunidad: Potente protector natural que fortalece las defensas y combate amenazas externas gracias a su acción antioxidante.
✔️ Bienestar Digestivo: Alivia los gases, reduce la inflamación estomacal y apoya el funcionamiento correcto y ligero de todo el sistema digestivo.
✔️ Limpieza Profunda: Ayuda a regular la microbiota intestinal, mitiga la candidiasis y depura el organismo de manera segura.`,
    seoTitle: 'Orégano Concentrado Suplemento Natural Antimicrobiano | Zenhogar',
    seoDescription: 'Fortalece tus defensas y limpia tu sistema digestivo con el Orégano de ZENHOGAR. Suplemento natural rico en carvacrol con Registro INVIMA.',
    benefits: [
      'Potente antiparasitario y antibacteriano natural',
      'Ayuda a combatir el envejecimiento prematuro',
      'Ayuda a combatir la cándida y apoya la salud de la microbiota',
      'Alivia la inflamación abdominal, los gases y pesadez digestiva',
      'Fortalece de manera notable el sistema inmunológico activo',
      'Ayuda a aliviar dolores musculares y articulares'
    ],
    image: '/assets/products/oregano.webp',
    basePrice: 79900,
    size: '60 Unidades',
    presentation: 'Capsulas Blandas',
    invima: 'NSA-2948-2026',
    googleCategory: 'Health & Beauty > Health Care > Fitness & Nutrition',
    condition: 'new',
    supportImages: [
      '/assets/products/oregano-apoyo-1.webp',
      '/assets/products/oregano-apoyo-2.webp',
      '/assets/products/oregano-apoyo-3.webp',
      '/assets/products/oregano-apoyo-4.webp'
    ],
    keywords: 'oregano, carvacrol, antiparasitario natural, candida, digestión ligera, defensas, ZENHOGAR',
    components: 'Orégano, Glicerina, Sorbato de Potasio, aceite Vegetal, Lecitina de Soya, Dioxido de Silicio',
    componentBenefits: [
      { name: 'Extracto de Orégano', benefit: 'Aporta una alta concentración de carvacrol para combatir agentes infecciosos e hinchazón.' },
      { name: 'Aceite Vegetal y Lecitina de Soya', benefit: 'Optimizan la biodisponibilidad de la fórmula para que tu cuerpo asimile los nutrientes de manera inmediata y eficiente.' }
    ],
    longTailKeywords: [
      'mejor suplemento de orégano con carvacrol en Colombia',
      'cómo limpiar el colon y eliminar parásitos naturalmente',
      'beneficios del extracto de orégano para la candidiasis',
      'suplementos antimicrobianos naturales para el estómago',
      'cómo subir las defensas rápido con extractos de plantas'
    ],
    seoFaqs: [
      { q: '¿Qué es el carvacrol y por qué es importante?', a: 'El carvacrol es el compuesto activo principal del orégano, reconocido científicamente por sus potentes propiedades antiparasitarias y fungicidas.' },
      { q: '¿Cómo ayuda en la digestión?', a: 'Elimina las bacterias nocivas en el colon que provocan fermentación y gases, permitiendo que la flora saludable se restablezca.' },
      { q: '¿Es seguro para uso continuo?', a: 'Se recomienda consumirlo en ciclos de detox (15 a 30 días) para realizar una depuración digestiva profunda y segura.' }
    ],
    promos: [
      { id: '1u', label: '1 Unidad', units: 1, price: 79900 },
      { id: '2u', label: '2 Unidades', units: 2, price: 119850 },
      { id: '2x3', label: 'Pague 2 Lleve 3', units: 3, price: 159800, badge: '⭐ Recomendado' },
      { id: '3x5', label: 'Pague 3 Lleve 5', units: 5, price: 239700, badge: '🔥 Mejor Oferta' }
    ],
    testimonials: [
      { name: 'Lorena B.', text: 'Un suplemento increíble para el sistema digestivo. Me ayudó a limpiar mi colon y la inflamación desapareció.', rating: 5 },
      { name: 'Juan P.', text: 'Excelente para las defensas. He notado que ya no me enfermo tan seguido desde que lo tomo.', rating: 5 }
    ],
    whyChoose: {
      title: 'Purificación e Inmunidad Botánica',
      description: 'En ZENHOGAR creemos en el poder curativo de la fitoterapia. Nuestro suplemento de Orégano ofrece una concentración óptima de carvacrol para restaurar tu armonía digestiva de manera certificada.'
    }
  },
  {
    id: 'bisglicinato-magnesio',
    masterId: '232091',
    name: 'Bisglicinato de Magnesio',
    category: 'salud-bienestar',
    shortDescription: 'Relajación Profunda, Descanso Reparador y Alivio del Estrés.',
    description: `Mejora tu rutina de energía y equilibrio y recupera el bienestar de tu cuerpo con el Bisglicinato de Magnesio, la fórmula avanzada diseñada para combatir el estrés, restaurar tu tranquilidad y proteger tu sistema muscular desde el interior. Esta fórmula premium aprovecha la forma más pura y de mayor biodisponibilidad de este mineral esencial, actuando como un bálsamo natural que reduce la fatiga mental y ayuda al organismo a adaptarse y recuperarse del desgaste diario en todo tu organismo.
    
  Con una excelente biodisponibilidad en formato de cápsulas blandas (softgel), es el aliado perfecto para cualquier persona que busque aliviar el estrés acumulado, calmar la mente y favorecer un enfoque nítido durante el día. Su acción sinérgica actúa profundamente en el cuerpo, disminuyendo la tensión nerviosa, mejorando la concentración y apoyando la relajación nocturna de forma segura y natural.
    
 ✔️ Alivio del Estrés y Ansiedad: Equilibra el sistema nervioso, reduce los niveles de cortisol y ayuda a mantener la calma en días exigentes.
 ✔️ Calma Mental y Enfoque: Disminuye la fatiga mental, promueve la claridad cognitiva y mejora la concentración diaria.
 ✔️ Descanso y Alivio Muscular: Promueve una relajación profunda, previene espasmos y optimiza la calidad del sueño reparador.`,
    seoTitle: 'Bisglicinato de Magnesio Quelado para Sueño y Relax | Zenhogar',
    seoDescription: 'Concilia un sueño profundo y relaja tus músculos con Bisglicinato de Magnesio de ZENHOGAR. Magnesio quelado de máxima absorción con Registro INVIMA.',
    benefits: [
      'Promueve un sueño profundo, reparador y combate el insomnio crónico',
      'Alivia la tensión muscular acumulada, calambres y espasmos',
      'Disminuye el estrés, la ansiedad diaria y calma la mente activa',
      'Forma mineral quelada extremadamente gentil con el estómago (sin efecto laxante)',
      'Fórmula balanceada de altísima biodisponibilidad certificada'
    ],
    image: '/assets/products/bisglicinato-magnesio.webp',
    basePrice: 79900,
    size: '60 Unidades',
    presentation: 'Capsulas Blandas',
    invima: 'NSA-2948-2026',
    googleCategory: 'Health & Beauty > Health Care > Fitness & Nutrition',
    condition: 'new',
    supportImages: [
      '/assets/products/bisglicinato-magnesio-apoyo-1.webp',
      '/assets/products/bisglicinato-magnesio-apoyo-2.webp',
      '/assets/products/bisglicinato-magnesio-apoyo-3.webp'
    ],
    keywords: 'bisglicinato de magnesio, magnesio quelado, insomnio, relajante muscular, estrés, dormir bien, ZENHOGAR',
    components: 'Bisglicinato de Magnesio, Glicina, Vitaminas del grupo B',
    componentBenefits: [
      { name: 'Bisglicinato de Magnesio', benefit: 'Magnesio unido a glicina que favorece la relajación del sistema nervioso sin alterar el tránsito gástrico.' },
      { name: 'Glicina y Complejo B', benefit: 'Aminoácido y neurotransmisor que induce de forma natural a estados de calma y descanso.' }
    ],
    longTailKeywords: [
      'mejor bisglicinato de magnesio quelado en Colombia para dormir',
      'magnesio que no suelte el estómago y ayude a relajar la mente',
      'suplementos de magnesio con glicina para el descanso y estres',
      'cómo relajar el sistema nervioso para dormir mejor naturalmente',
      'beneficios del bisglicinato de magnesio en polvo biodisponible'
    ],
    seoFaqs: [
      { q: '¿Qué diferencia al Bisglicinato de otras formas de magnesio?', a: 'Es un magnesio quelado (unido a glicina) que se absorbe al máximo en las células cerebrales y nerviosas, y al no competir por el agua gástrica, no produce el efecto laxante del cloruro o sulfato de magnesio.' },
      { q: '¿Ayuda a controlar la ansiedad?', a: 'Sí, la glicina actúa en conjunto con el magnesio estimulando los receptores GABA que disminuyen la sobreexcitación cerebral, induciendo serenidad.' },
      { q: '¿En qué momento del día es mejor tomarlo?', a: 'Se recomienda consumirlo de 30 a 45 minutos antes de acostarse para preparar el cuerpo y la mente para un sueño profundo.' }
    ],
    promos: [
      { id: '1u', label: '1 Unidad', units: 1, price: 79900 },
      { id: '2u', label: '2 Unidades', units: 2, price: 119850 },
      { id: '2x3', label: 'Pague 2 Lleve 3', units: 3, price: 159800, badge: '⭐ Recomendado' },
      { id: '3x5', label: 'Pague 3 Lleve 5', units: 5, price: 239700, badge: '🔥 Mejor Oferta' }
    ],
    testimonials: [
      { name: 'Marta L.', text: 'El mejor descubrimiento para mis noches. Concilio el sueño súper rápido y amanezco con una energía maravillosa.', rating: 5 },
      { name: 'Fernando S.', text: 'Mis piernas y mi espalda se relajan por completo. No he vuelto a tener tensiones musculares al dormir.', rating: 5 }
    ],
    whyChoose: {
      title: 'Descanso y Confort Neuromuscular Superior',
      description: 'En ZENHOGAR estamos comprometidos con tu descanso. Nuestro Bisglicinato de Magnesio de grado farmacológico ofrece la máxima asimilación relajante para restaurar tu ritmo biológico de forma segura.'
    }
  },
  {
    id: 'tonico-capilar-folivance',
    masterId: '11261',
    name: 'Tónico Capilar Folivance',
    category: 'belleza-integral',
    shortDescription: 'Densificador Capilar y Ritual de Crecimiento Acelerado.',
    description: `Eleva tu rutina de cuidado capilar y recupera la vitalidad de tu fibra del cabello con el complejo de Aminoácidos, Biotina y Niacinamida (Vitamina B3), la fórmula avanzada diseñada para transformar tu cabello y proteger tu cuero cabelludo desde el interior. Esta combinación premium une tres de los nutrientes más potentes de la ciencia cosmética y nutricional, creando un sistema de soporte completo que de manera natural estimula el nacimiento de nuevas hebras, frena la caída y devuelve el volumen y la salud a tu melena de forma segura.
    
  Con una excelente biodisponibilidad en formato de cápsulas blandas (softgel), es el aliado perfecto para cualquier persona que busque combatir el adelgazamiento capilar, la debilidad y el desgaste diario. Su acción sinérgica actúa profundamente en el organismo, optimizando la oxigenación de los folículos y restaurando un cabello visiblemente más grueso, resistente y radiante.
  
✔️ Estructura y Reparación: Los aminoácidos fortalecen la fibra capilar, reparan el cabello existente y previenen la rotura.
✔️ Crecimiento y Grosor: La biotina estimula la aparición de nuevas hebras, mejora la oxigenación y engrosa el cabello de raíz a puntas.
✔️ Circulación y Control: La niacinamida mejora el flujo sanguíneo en el cuero cabelludo, calma la irritación y controla el exceso de grasa.`,
    seoTitle: 'Tónico Capilar Folivance para Caída, Crecimiento y mejora de apariencia | Zenhogar',
    seoDescription: 'Frena la caída y duplica el crecimiento capilar con Folivance de ZENHOGAR. Tónico folicular de alto impacto Biotina, Aminoácidos y Niacinamida.',
    benefits: [
      'Frena la caída del cabello de forma visible desde la segunda semana',
      'Estimula la fase de crecimiento activo (anágena) para nuevas hebras',
      'Engrosa y fortalece la fibra capilar reduciendo el quiebre y puntas abiertas',
      'Fórmula ligera en spray de rápida absorción que no deja el cabello grasoso',
      'Nutre a profundidad cejas, barra y cuero cabelludo debilitado'
    ],
    image: '/assets/products/folivance.webp',
    basePrice: 69900,
    size: '120g',
    presentation: 'Líquido (Spray)',
    googleCategory: 'Health & Beauty > Personal Care > Hair Care > Hair Loss Treatments',
    condition: 'new',
    supportImages: [
      '/assets/products/folivance-apoyo-1.webp',
      '/assets/products/folivance-apoyo-2.webp'
    ],
    keywords: 'Folivance, tonico capilar, caida cabello, crecimiento pelo, aminoácidos, niacinamida, biotina, romero, Zenhogar',
    components: 'Biotina, Aminoácidos, niacinamida',
    componentBenefits: [
      { name: 'Aminoácidos', benefit: 'fortalece, da estructura y repara el cabello existente.' },
      { name: 'Biotina', benefit: 'Estimulan el crecimiento de hebras de cabello, mejoran la oxigenación y engrosan el cabello.' },
      { name: 'Niacinamida (vitamina B3)', benefit: 'Mejora la circulación, calma la irritación y controla el exceso de grasa en el cuero cabelludo .' }

    ],
    longTailKeywords: [
      'mejor tonico para el crecimiento acelerado del cabello Colombia',
      'cómo detener la caida del pelo en hombres y mujeres',
      'tonico capilar folivance con trichogen al 8 por ciento',
      'productos naturales para engrosar el cabello fino y debil',
      'crecimiento de barba y cejas con tonicos capilares folivance'
    ],
    seoFaqs: [
      { q: '¿Cómo se debe aplicar Folivance?', a: 'Aplicar directamente sobre el cuero cabelludo limpio en las zonas deseadas, masajear suavemente con la yema de los dedos por 2 minutos para activar la absorción. No requiere enjuague.' },
      { q: '¿Deja el cabello pesado o con mal olor?', a: 'No, Folivance posee una textura líquida ultra-ligera y de rápida absorción con un aroma herbal muy refrescante que deja el cabello suelto.' },
      { q: '¿Sirve para rellenar la barba y cejas?', a: 'Sí, es sumamente efectivo para estimular el volumen y densidad de los folículos en barba y cejas de forma segura.' }
    ],
    promos: [
      { id: '1u', label: '1 Unidad', units: 1, price: 69900 },
      { id: '2u', label: '2 Unidades', units: 2, price: 104850 },
      { id: '2x3', label: 'Pague 2 Lleve 3', units: 3, price: 139800, badge: '⭐ Recomendado' },
      { id: '3x5', label: 'Pague 3 Lleve 5', units: 5, price: 209700, badge: '🔥 Mejor Oferta' }
    ],
    testimonials: [
      { name: 'Liliana M.', text: 'Llevo 3 semanas usando el tónico Folivance y la caída se detuvo casi por completo. Siento el cabello mucho más abundante y con brillo.', rating: 5 },
      { name: 'Andrés S.', text: 'Excelente producto. Lo usé para rellenar zonas de la barba y los resultados son sorprendentes. Se siente súper fresca la aplicación.', rating: 5 }
    ],
    whyChoose: {
      title: 'Densidad y Fuerza Capilar Certificada',
      description: 'En ZENHOGAR redefinimos el cuidado capilar con soluciones científicas de alto impacto. FOLIvance une el poder del Trichogen y extractos herbales para devolver la vitalidad y el volumen a tu cabello de manera segura.'
    }
  },
  {
    id: 'shampoo-intensivo',
    masterId: '232077',
    name: 'Shampoo Intensivo',
    category: 'belleza-integral',
    shortDescription: 'Limpieza Profunda, Control Grasa y Fortalecimiento Folicular.',
    description: `Transforma tu rutina de cuidado capilar y recupera la vitalidad de tu fibra del cabello con el Shampoo Intensivo de Biotina, Aminoácidos y Niacinamida (Vitamina B3), la fórmula avanzada diseñada para restaurar tu melena, devolverle su brillo natural y proteger tu cuero cabelludo desde la raíz. Esta combinación premium une tres de los nutrientes más potentes de la ciencia cosmética, creando un sistema de limpieza y reparación profundo que de manera natural disminuye la caída, estimula el nacimiento de nuevo cabello y devuelve el volumen perdido.
    
    Con una fórmula de acción directa e intensiva, es el aliado perfecto para cualquier persona que busque combatir el adelgazamiento capilar, la opacidad, la debilidad y el desgaste diario. Su acción sinérgica actúa eficazmente en cada lavado, optimizando la oxigenación de los folículos, purificando el cuero cabelludo y restaurando un cabello visiblemente más grueso, luminoso, resistente y radiante.
    
✔️ Estructura y Brillo: Los aminoácidos fortalecen la fibra capilar, reparan el cabello existente, previenen la rotura y restauran un brillo saludable desde el primer uso.
✔️ Crecimiento y Grosor: La biotina estimula la aparición de nuevo cabello, mejora la oxigenación folicular y lo engrosa de raíz a puntas.
✔️ Circulación y Control: La niacinamida mejora el flujo sanguíneo en el cuero cabelludo, calma la irritación y controla el exceso de grasa de forma duradera.`,
    seoTitle: 'Shampoo Intensivo Anticaída y Brillo Sin Sal | Zenhogar',
    seoDescription: 'Limpia con suavidad y fortalece tu cabello con el Shampoo Intensivo de ZENHOGAR. Fórmula profesional con Romero y Biotina libre de sal. ¡INVIMA!',
    benefits: [
      'Limpia de manera profunda y regula el exceso de grasa en la raíz',
      'Previene la caída del cabello fortaleciendo la fibra capilar',
      'Fórmula profesional libre de sal y parabenos que protege el color',
      'Devuelve el brillo natural y aporta una sedosidad extraordinaria',
      'Enriquecido con Biotina para reparar el cabello dañado'
    ],
    image: '/assets/products/shampoo-intensivo.webp',
    basePrice: 69900,
    size: '450ml',
    presentation: 'Líquido',
    googleCategory: 'Health & Beauty > Personal Care > Hair Care > Shampoo',
    condition: 'new',
    supportImages: [
      '/assets/products/shampoo-intensivo-apoyo-1.webp',
      '/assets/products/shampoo-intensivo-apoyo-2.webp',
      '/assets/products/shampoo-intensivo-apoyo-3.webp',
      '/assets/products/shampoo-intensivo-apoyo-4.webp'
    ],
    keywords: 'shampoo intensivo, sin sal, anticaida, biotina, Aminoácidos, niacinamida, cabello fuerte, Zenhogar',
    components: 'Biotina, aminoácidos y niacinamida',
    componentBenefits: [
      { name: 'Aminoácidos', benefit: 'fortalece, da estructura y repara el cabello existente.' },
      { name: 'Biotina', benefit: 'Estimulan el crecimiento de hebras de cabello, mejoran la oxigenación y engrosan el cabello.' },
      { name: 'Niacinamida (vitamina B3)', benefit: 'Mejora la circulación, calma la irritación y controla el exceso de grasa en el cuero cabelludo .' }
    ],
    longTailKeywords: [
      'mejor shampoo intensivo sin sal para la caida Colombia',
      'shampoo profesional con romero y biotina para dar brillo',
      'shampoo restaurador para cabellos debiles y quebradizos',
      'como lavar el pelo maltratado por tintes o quimicos',
      'shampoo anticaida y fortalecedor capilar de alta pureza'
    ],
    seoFaqs: [
      { q: '¿Contiene sal o sulfatos?', a: 'No, es un shampoo formulado 100% libre de sal (cloruro de sodio) y sulfatos agresivos, ideal para cuidar queratinas y tintes.' },
      { q: '¿Se puede utilizar en cabellos grasos?', a: 'Sí, equilibra la producción de sebo sin resecar las puntas, promoviendo vitalidad.' },
      { q: '¿Con qué frecuencia se debe lavar?', a: 'Se puede usar diariamente o según tu rutina habitual, ya que su base limpiadora es extremadamente gentil.' }
    ],
    promos: [
      { id: '1u', label: '1 Unidad', units: 1, price: 69900 },
      { id: '2u', label: '2 Unidades', units: 2, price: 104850 },
      { id: '2x3', label: 'Pague 2 Lleve 3', units: 3, price: 139800, badge: '⭐ Recomendado' },
      { id: '3x5', label: 'Pague 3 Lleve 5', units: 5, price: 209700, badge: '🔥 Mejor Oferta' }
    ],
    testimonials: [
      { name: 'Verónica P.', text: 'Me encanta este shampoo. Siento mi cabello súper limpio, sedoso y con un brillo espectacular. La caída disminuyó un montón.', rating: 5 },
      { name: 'Mario J.', text: 'Excelente fragancia y consistencia. Deja el pelo muy manejable y nada reseco.', rating: 5 }
    ],
    whyChoose: {
      title: 'Fortaleza y Brillo de Salón',
      description: 'En ZENHOGAR comprometidos con tu salud capilar. Nuestro Shampoo Intensivo repara la fibra capilar y nutre tu cabello desde la raíz con una fórmula profesional libre de químicos agresivos y registro INVIMA garantizado.'
    }
  },
  {
    id: 'aceite-relajante',
    masterId: '232077',
    name: 'Aceite Relajante',
    category: 'belleza-integral',
    shortDescription: 'Alivio de Tensiones, Masaje Terapéutico, Descanso Corporal, Fortalecimiento de la Piel.',
    description: `Renueva la ligereza de tus piernas y optimiza tu bienestar corporal con el Aceite de Castaño de Indias y Centella Asiática, una fórmula avanzada diseñada para mejorar la microcirculación local y proteger la elasticidad de tu piel desde el exterior. Esta combinación premium une dos de los extractos botánicos más potentes de la naturaleza, creando un sistema de cuidado completo que a través del masaje disminuye la pesadez, estimula el flujo sanguíneo y devuelve el descanso a tu cuerpo.
    
Desarrollado con una textura ideal para masajes y una absorción profunda, este producto es el aliado perfecto para cualquier persona que busque combatir la retención de líquidos, la hinchazón local y la fatiga diaria acumulada por pasar mucho tiempo de pie o sentado. Su acción sinérgica actúa directamente sobre las zonas afectadas, promoviendo la relajación de los tejidos musculares y restaurando una sensación de ligereza duradera.
    
✔️ Circulación y Alivio: El castaño de indias ayuda a tonificar la piel, disminuye la pesadez y reduce notablemente la tensión en las piernas cansadas mediante el masaje.
✔️ Elasticidad y Firmeza: La centella asiática favorece la firmeza de la piel estimulando de forma natural los tejidos, mejora su aspecto y atenúa la apariencia de las várices y líneas superficiales.
✔️ Acción Protectora y Nutrición: Su base aceitosa humecta profundamente la piel, mientras que sus antioxidantes naturales protegen las células contra el desgaste y la resequedad diaria.`,
    seoTitle: 'Aceite Relajante para Masajes y Tensión Muscular | Zenhogar',
    seoDescription: 'Relaja tus músculos y mitiga el estrés con el Aceite Relajante de ZENHOGAR. Combinación de Castaño de Indias y Centella Asiática. ¡INVIMA!',
    benefits: [
      'Disuelve el estrés y libera la rigidez de tus músculos',
      'Desliza suavemente sobre la piel facilitando masajes profundos',
      'Calma la pesadez muscular y promueve una óptima circulación',
      'Mejora la apariencia de la piel aportando nutrición y suavidad',
      'Genera una inmediata sensación de alivio y descanso corporal absoluto'
    ],
    image: '/assets/products/aceite-relajante.webp',
    basePrice: 69900,
    size: '60g',
    presentation: 'Aceite',
    googleCategory: 'Health & Beauty > Personal Care > Cosmetics > Skin Care > Massage Oil',
    condition: 'new',
    supportImages: [
      '/assets/products/aceite-relajante-apoyo-1.webp',
      '/assets/products/aceite-relajante-apoyo-2.webp',
      '/assets/products/aceite-relajante-apoyo-3.webp'
    ],
    keywords: 'aceite relajante, masajes, tension muscular, descontracturante, estres, Zenhogar',
    components: 'Aceite de Castaño de Indias, Centella Asiática, Extracto de Uva',
    componentBenefits: [
      { name: 'Castaño de Indias', benefit: 'Desinflama las venas, alivia la pesadez en las piernas y combate la retención de líquidos (ideal para várices).' },
      { name: 'Centella Asiática', benefit: 'Estimula la producción de colágeno, repara los tejidos de la piel y mejora la elasticidad de los vasos sanguíneos.' },
      { name: 'extracto de Uva', benefit: 'Aporta potentes antioxidantes que protegen las venas del envejecimiento y refuerzan la circulación general.' }
    ],
    longTailKeywords: [
      'mejor aceite relajante para masajes musculares en Colombia',
      'aceites corporales para piernas cansadas',
      'tratamiento natural para venas varices con extracto de uva',
      'aceite descontracturante para espalda y cuello adoloridos',
      'masajes de relajacion con aceites naturales de almendras',
      'como relajar el cuerpo cansado despues del trabajo con aceites'
    ],
    seoFaqs: [
      { q: '¿Deja la piel pegajosa o grasosa?', a: 'No, su fórmula está balanceada con aceites ligeros de almendras que se absorben paulatinamente nutriendo la piel sin dejar residuo pesado.' },
      { q: '¿Se puede aplicar en niños?', a: 'Sí, al ser una mezcla botánica gentil de lavanda y caléndula, es excelente para realizar masajes relajantes antes de dormir.' },
      { q: '¿Ayuda con la fatiga tras hacer ejercicio?', a: 'Absolutamente, es ideal para masajear las zonas tensionadas, promoviendo una excelente recuperación muscular.' }
    ],
    promos: [
      { id: '1u', label: '1 Unidad', units: 1, price: 69900 },
      { id: '2u', label: '2 Unidades', units: 2, price: 104850 },
      { id: '2x3', label: 'Pague 2 Lleve 3', units: 3, price: 139800, badge: '⭐ Recomendado' },
      { id: '3x5', label: 'Pague 3 Lleve 5', units: 5, price: 209700, badge: '🔥 Mejor Oferta' }
    ],
    testimonials: [
      { name: 'Guillermo F.', text: 'El aroma a lavanda es súper relajante y es perfecto para masajear la espalda después de un día estresante. Deja la piel muy suave.', rating: 5 },
      { name: 'Patricia L.', text: 'Excelente calidad, hidrata muy bien y quita toda la tensión del cuello de inmediato. Lo uso todas las noches.', rating: 5 }
    ],
    whyChoose: {
      title: 'Alivio Terapéutico y Paz Sensorial',
      description: 'En ZENHOGAR fusionamos naturaleza y bienestar. Nuestro Aceite Relajante combina aceites florales y botánicos que desinflaman tus músculos y calman tu mente con calidad certificada oficial.'
    }
  },
  {
    id: 'gel-frio-relajante',
    masterId: '232079',
    name: 'Gel Frío Relajante',
    category: 'belleza-integral',
    shortDescription: 'Efecto Criogénico, Alivio Muscular y Piernas Cansadas.',
    description: `Siente un alivio refrescante inmediato con este Gel Frío Relajante, una propuesta avanzada diseñada específicamente para desinflamar las piernas, reactivar la circulación periférica y tonificar la piel desde la primera aplicación. Su poderosa fórmula criogénica aprovecha los beneficios naturales del castaño de indias y la centella asiática, fusionándolas con el mentol para generar una intensa sensación de frío localizado que disminuye la inflamación y devuelve la vitalidad a tu caminar.
    
Diseñado con una textura ligera de rápida absorción y efecto no graso, este producto estimula la circulación en la zona aplicada y en toda la pierna, convirtiéndose en el aliado perfecto para aliviar la pesadez, mitigar las molestias por várices o reducir la fatiga muscular tras una intensa sesión de ejercicio y largas jornadas de pie. Su acción térmica actúa directamente sobre el área afectada, ayudando a deshinchar los tobillos, relajar los músculos adoloridos y restaurar una agradable sensación de ligereza y confort duradero en tus piernas.
  
✔️ Efecto Frío: El mentol aporta una sensación de frescura calmante inmediata que disminuye la pesadez, alivia el dolor local y descansa las piernas de forma instantánea.
✔️ Tonificación y Circulación Ampliada: El castaño de indias activa el flujo sanguíneo de forma localizada, estimula la circulación en la zona aplicada y en toda la pierna, y previene eficazmente la hinchazón diaria.
✔️ Firmeza y Reparación: La centella asiática mejora la consistencia de los tejidos cutáneos de las piernas, disminuye la flacidez y ayuda a desvanecer visualmente las várices.`,
    seoTitle: 'Gel Frío Criogénico para Piernas Cansadas y Alivio | Zenhogar',
    seoDescription: 'Alivia la fatiga muscular y la pesadez de tus piernas con el Gel Frío Relajante de ZENHOGAR. Efecto criogénico con Castaño de Indias. ¡INVIMA!',
    benefits: [
      'Efecto frío criogénico inmediato que reduce la inflamación local',
      'Alivia de forma efectiva la pesadez y cansancio en piernas y pies',
      'Favorece la circulación sanguínea ideal para el cuidado de varices',
      'Relaja la tensión muscular tras el deporte o trabajo pesado',
      'Textura en gel ligera, no grasosa y de rápida absorción'
    ],
    image: '/assets/products/gel-frio.webp',
    basePrice: 59900,
    size: '60g',
    presentation: 'Gel',
    googleCategory: 'Health & Beauty > Personal Care > Cosmetics > Skin Care',
    condition: 'new',
    supportImages: [
      '/assets/products/gel-frio-apoyo-1.webp',
      '/assets/products/gel-frio-apoyo-2.webp'
    ],
    keywords: 'gel frio, criogenico, piernas cansadas, varices, mentol, castaño de indias, Zenhogar, fatiga muscular',
    components: 'Mentol, Castaño de Indias, Centella Asiática',
    componentBenefits: [
      { name: 'Mentol', benefit: 'Proporcionan un efecto frío inmediato que insensibiliza la molestia y desinflama.' },
      { name: 'Castaño de Indias', benefit: 'Estimulan la circulación periférica reduciendo la retención y la hinchazón.' },
      { name: 'Centella Asiática', benefit: 'Estimula la producción de colágeno, repara los tejidos de la piel y mejora la elasticidad de los vasos sanguíneos.' }
    ],
    longTailKeywords: [
      'mejor gel frio criogenico para piernas cansadas Colombia',
      'gel desinflamatorio para golpes y tension muscular',
      'aliviar dolor de pies y piernas varicosas con gel frio',
      'gel de mentol y castaño de indias para deportistas',
      'como deshinchar las piernas despues de estar de pie todo el dia'
    ],
    seoFaqs: [
      { q: '¿Cómo se debe aplicar el gel frío?', a: 'Aplicar sobre la zona afectada con masajes ascendentes (de abajo hacia arriba) hasta que se absorba. Se sentirá una oleada de frío que relaja de inmediato.' },
      { q: '¿Sirve para golpes o esguinces?', a: 'Sí, su efecto frío y desinflamatorio ayuda a mitigar la inflamación y dolor de contusiones ligeras.' },
      { q: '¿Mancha la ropa?', a: 'No, su consistencia en gel de grado profesional penetra al instante sin dejar humedad ni manchas en tus prendas.' }
    ],
    promos: [
      { id: '1u', label: '1 Unidad', units: 1, price: 69900 },
      { id: '2u', label: '2 Unidades', units: 2, price: 104850 },
      { id: '2x3', label: 'Pague 2 Lleve 3', units: 3, price: 139800, badge: '⭐ Recomendado' },
      { id: '3x5', label: 'Pague 3 Lleve 5', units: 5, price: 209700, badge: '🔥 Mejor Oferta' }
    ],
    testimonials: [
      { name: 'Mónica T.', text: 'Trabajo de pie todo el día y este gel frío ha sido mi salvación. Me quita todo el dolor y pesadez en las piernas al instante.', rating: 5 },
      { name: 'Gustavo R.', text: 'Es excelente para después de correr, relaja los gemelos de inmediato con un frío muy refrescante.', rating: 5 }
    ],
    whyChoose: {
      title: 'Efecto Criogénico y Alivio de Circulación',
      description: 'En ZENHOGAR estamos comprometidos con tu movilidad activa. Nuestro Gel Frío combina mentol y extractos circulatorios para deshinchar y aliviar tu cansancio de forma rápida y certificada.'
    }
  }
];

// Reordenar dinámicamente el array PRODUCTS para que la declaración expuesta coincida
// exactamente con la estructura de categorías de la tienda, optimizando la navegación de carrusel (adelante/atrás)
(function() {
  const categoryOrder = ['salud-bienestar', 'belleza-integral', 'salud-sexual'];
  PRODUCTS.sort((a, b) => {
    const idxA = categoryOrder.indexOf(a.category);
    const idxB = categoryOrder.indexOf(b.category);
    if (idxA !== idxB) {
      return idxA - idxB;
    }
    return 0; // Orden relativo estable dentro de la misma categoría
  });
})();

export interface Promotion {
  id: string;
  name: string;
  description: string;
  image: string;
  price: number;
  originalPrice: number;
  products: string[];
  videoUrl?: string;
  videoUrlMp4?: string;
  videoPoster?: string;
  seoTitle?: string;
  seoDescription?: string;
  whyChoose?: {
    title: string;
    description: string;
  };
  badge?: string;
  keywords?: string;
  components?: string;
  componentBenefits?: ComponentBenefit[];
  longTailKeywords?: string[];
  seoFaqs?: { q: string; a: string }[];
  benefits?: string[];
  testimonials?: {
    name: string;
    text: string;
    rating: number;
  }[];
  peso_adicional?: number;
  googleCategory?: string;
  condition?: 'new' | 'used' | 'refurbished';
}

export const COMBO_OF_THE_MONTH: Promotion = {
  id: 'combo-inmunidad-dual',
  name: 'Combo Futbolero',
  description: 'El Combo Futbolero es la selección definitiva de alto rendimiento diseñada para potenciar la fuerza, el vigor y la recuperación masculina. Al reunir la acción termoactiva para el alivio muscular, la energía pura de Titan Coffee, la depuración intensa de Rtafull, y el cuidado especializado de Hemocream y Mammoth, este kit robustece tu vitalidad integral frente a la rutina diaria de alta exigencia física.',
  image: '/assets/combos/Combo Futbolero.webp',
  price: 247700,
  originalPrice: 329500,
  peso_adicional: 0,
  googleCategory: 'Health & Beauty > Health Care > Fitness & Nutrition',
  condition: 'new',
  products: ['termoactiva', 'rtafull', 'hemocream', 'titan-coffee', 'mammoth'],
  seoTitle: 'Combo Futbolero para el Alto Rendimiento y Vigor Masculino | ZENHOGAR',
  seoDescription: 'Potencia tu vigor y acelera tu recuperación con el Combo Futbolero. Energía pura, desintoxicación y alivio físico en un solo pack diario. ¡Ahorra $81.800 con envío gratis!',
  whyChoose: {
    title: 'Rendimiento y Vigor Masculino Absoluto',
    description: 'El Combo Futbolero combina energía extrema, desintoxicación hepática y recuperación muscular de grado profesional. Un sistema completo diseñado para el hombre de alta exigencia que busca mantener su vitalidad y fuerza todos los días.'
  },
  badge: 'OFERTA DEL MES',
  benefits: [
    'Energía y enfoque extremo con Titan Coffee',
    'Recuperación y alivio con Termoactiva',
    'Depuración interna y hepática con Rtafull',
    'Firmeza y cuidado con Mammoth y Hemocream'
  ],
  keywords: 'vigor masculino, rendimiento de élite, energía, recuperación muscular, desintoxicación hepática, Titan Coffee, Rtafull, Termoactiva, Hemocream, Mammoth, Zenhogar, combo futbolero',
  components: 'Titan Coffee, RtaFull, Loción Termoactiva, Hemocream y Crema Mammoth',
    componentBenefits: [
    {
        'name': 'Titan Coffee y RtaFull',
        'benefit': 'Brindan energía mental y física sostenida mientras limpian y desintoxican el hígado de forma profunda.'
    },
    {
        'name': 'Loción Termoactiva y Hemocream',
        'benefit': 'Alivian la fatiga y tensión muscular localizada al tiempo que brindan cuidado de alta protección.'
    },
    {
        'name': 'Crema Mammoth',
        'benefit': 'Mejora notablemente la firmeza, elasticidad y tono de la piel en áreas de mayor exigencia física.'
    }
],
  longTailKeywords: [
    'mejor combo de rendimiento y vigor para hombres Colombia',
    'cómo recuperar los músculos después del fútbol o ejercicio',
    'café energizante con maca y borojó para energía diaria',
    'limpieza hepática natural y aumento de vitalidad masculina',
    'crema corporal para masajes y firmeza muscular masculina',
    'los mejores suplementos naturales para el vigor del hombre',
    'loción termoactiva de árnica para deportistas y fatiga muscular',
    'pack de bienestar integral y rendimiento físico masculino',
    'suplementación natural premium de alto rendimiento para hombres',
    'cómo estar más activo y con más energía todo el día'
  ],
  seoFaqs: [
    { q: '¿Cómo debo consumir y aplicar los productos del combo?', a: 'Disfruta de Titan Coffee por la mañana para iniciar con energía y toma Rtafull para tu purificación. Aplica la Loción Termoactiva antes o después de la actividad muscular, y usa las cremas Mammoth y Hemocream en tus rutinas de masaje y cuidado de la piel.' },
    { q: '¿En cuánto tiempo se sienten los efectos de energía y alivio?', a: 'El enfoque y la energía de Titan Coffee son inmediatos, así como el alivio térmico de la Loción Termoactiva. Los beneficios de desintoxicación y firmeza se consolidan con el uso diario continuo.' },
    { q: '¿Todos los productos del Combo Futbolero tienen registro oficial?', a: 'Sí, absolutamente todos los componentes cuentan con sus respectivos registros INVIMA vigentes, garantizando pureza de grado profesional.' }
  ],
  testimonials: [
    { name: 'Carlos Mario G.', text: 'El Titan Coffee me da una energía increíble para entrenar y la loción me quita todo el cansancio de las piernas. Recomendado 100%.', rating: 5 },
    { name: 'Juan Fernando R.', text: 'Excelente combinación de productos. Me siento mucho más activo, ligero y con mejor rendimiento en mis partidos de fútbol.', rating: 5 }
  ]
};

export const PROMOTIONS: Promotion[] = [
  {
    id: 'promo-1',
    name: 'Combo Piel Radiante',
    description: 'El Combo Piel Radiante es un cuidado integral de doble acción diseñado para renovar la luminosidad, uniformidad y salud de tu piel desde el nivel celular hacia el exterior. Esta potente combinación une la eficacia de la crema Miskinne, que actúa directamente sobre la suavidad e hidratación externa con Caléndula y Avena, con el poder del Resveratrol líquido, que aporta una carga masiva de antioxidantes para proteger las células del daño oxidativo. Es el ritual perfecto para quienes buscan una piel visiblemente más joven, elástica y radiante, favoreciendo la vitalidad desde adentro.',
    image: '/assets/combos/promo-1.webp',
    price: 104850,
    originalPrice: 139800,
    googleCategory: 'Health & Beauty > Health Care > Fitness & Nutrition',
    condition: 'new',
    products: ['resveratrol', 'miskinne'],
    seoTitle: 'Cómo mejorar la apariencia ante la piel opaca y falta de elasticidad con Combo Piel Radiante',
    seoDescription: 'Luce una piel radiante con nuestro Combo Piel Radiante. Fórmula balanceada para bienestar integral, nutrición celular y calidad certificada. ¡Ahorra hoy!',
    whyChoose: {
      title: 'Tu ritual de belleza integral',
      description: 'En ZENHOGAR estamos comprometidos con tu salud, ofrecemos productos con registro INVIMA. El Combo Piel Radiante une nutrición celular y cuidado cutáneo extremo con Resveratrol y Miskinne (Avena y Caléndula). Calidad certificada para una piel luminosa desde el interior.'
    },
    badge: 'COMBO N°1',
    keywords: 'Resveratrol, Miskinne, antioxidante, cuidado de la piel, rejuvenecimiento, bienestar, Zenhogar, combo belleza',
    components: 'Arbutina (5%), Resveratrol, Colágeno Hidrolizado (10.000mg), Crema de Coco, Arándano y Uva liofilizada',
    componentBenefits: [
    {
        'name': 'Arbutina (5%)',
        'benefit': 'Trabaja atenuando la apariencia de manchas superficiales externas y pecas.'
    },
    {
        'name': 'Resveratrol, Arándano y Uva',
        'benefit': 'Protegen la estructura cutánea frente al daño oxidativo y los radicales libres.'
    },
    {
        'name': '10.000mg de Colágeno y Crema de Coco',
        'benefit': 'Favorecen la elasticidad, firmeza y nutrición natural de la piel, uñas y cabello.'
    }
],
    longTailKeywords: [
      'mejor combo para revitalizar la piel y dar luminosidad natural',
      'cómo proteger las células y suavizar la piel al mismo tiempo',
      'cuidado para una piel radiante desde el interior y exterior',
      'beneficios del combo Piel Radiante para el bienestar integral',
      'fórmula balanceada para la elasticidad y firmeza cutánea',
      'bienestar integral y vitalidad con belleza',
      'cómo mejorar la salud de la piel con calidad certificada',
      'combo para el cuidado facial y corporal',
      'apoyo natural para la piel seca y falta de brillo celular',
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
    description: 'Belleza Eterna es el sistema antiedad definitivo, formulado para combatir los signos del paso del tiempo y devolver la lozanía a tu rostro de manera integral. Este kit combina la acción avanzada del suero Eventone, enriquecido con Bio Retinol y Ácido Hialurónico para rellenar arrugas y unificar el tono cutáneo, con la regeneración celular profunda que proporciona el Resveratrol. Al nutrir tus células con colágeno hidrolizado y antioxidantes premium, este combo no solo mejora la apariencia externa, sino que fortalece la estructura de la dermis, uñas y cabello para una belleza que trasciende.',
    image: '/assets/combos/promo-2.webp',
    price: 123675,
    originalPrice: 164900,
    googleCategory: 'Health & Beauty > Health Care > Fitness & Nutrition',
    condition: 'new',
    products: ['resveratrol', 'eventone'],
    seoTitle: 'Cómo atenuar la apariencia de manchas y el tono desigual con Combo Belleza Eterna',
    seoDescription: 'Unifica tu tono de piel y protege tus células con el Combo Belleza Eterna. Fórmula balanceada para bienestar integral y calidad certificada. ¡Compra ya!',
    whyChoose: {
      title: 'Belleza que trasciende el tiempo',
      description: 'En ZENHOGAR estamos comprometidos con tu salud, ofrecemos productos con registro INVIMA. Belleza Eterna combate las manchas y el tono desigual combinando el poder aclarante de Eventone con la regeneración del Resveratrol. Calidad certificada para un rostro renovado.'
    },
    badge: 'COMBO N°2',
    keywords: 'Resveratrol, Eventone, belleza interior, antioxidante, tono de piel, nutrición celular, Zenhogar, combo belleza',
    components: 'Bio Retinol, Ácido Hialurónico, Resveratrol, Colágeno Hidrolizado, Vitamina B5 y extractos de Uva y Arándano',
    componentBenefits: [
    {
        'name': 'Bio Retinol y Ácido Hialurónico',
        'benefit': 'Aclaran y aceleran la renovación de las capas de la piel externa rellenando líneas de expresión.'
    },
    {
        'name': 'Resveratrol, extractos de Uva y Arándano',
        'benefit': 'Combaten el daño oxidativo y ayudan a disminuir los signos del envejecimiento prematuro.'
    },
    {
        'name': 'Colágeno Hidrolizado y B5',
        'benefit': 'Hidratan profundamente y promueven la firmeza y elasticidad natural.'
    }
],
    longTailKeywords: [
      'mejor combo para atenuar irregularidades de tono y unificar el tono de la piel',
      'cómo nutrir las células y favorecer el bienestar cutáneo de forma segura',
      'cuidado para una belleza natural y piel con tono uniforme',
      'beneficios del combo Belleza Eterna para el bienestar integral',
      'fórmula balanceada para una piel clara y vitalidad celular',
      'bienestar integral y claridad cutánea',
      'cómo recuperar la luminosidad del rostro con calidad certificada',
      'combo para el cuidado de la piel y apariencia de manchas',
      'alternativa natural para la hiperpigmentación y envejecimiento',
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
    description: 'El Combo Detox Digestivo es un sistema integral de limpieza diseñado para restaurar el equilibrio de tu organismo y depurar tu cuerpo de toxinas acumuladas. Esta sinergia une la potencia de la fibra Coliplus, que regula el tránsito intestinal y reconforta el colon de manera natural, con la acción depurativa del concentrado Rtafull, que estimula la función desintoxicante del hígado y los riñones. Ideal para ayudar a reducir la pesadez, favorecer el tránsito y mejorar la digestión de las grasas, permitiéndote sentirte ligero, activo y renovado desde la primera semana.',
    image: '/assets/combos/promo-3.webp',
    price: 116850,
    originalPrice: 155000,
    googleCategory: 'Health & Beauty > Health Care > Fitness & Nutrition',
    condition: 'new',
    products: ['coliplus', 'rtafull'],
    seoTitle: 'Cómo apoyar el bienestar digestivo ante el estreñimiento y pesadez con Combo Detox Digestivo',
    seoDescription: 'Limpia tu organismo y regula tu digestión con el Combo Detox Digestivo. Fórmula balanceada para bienestar integral y calidad certificada. ¡Siéntete ligero!',
    whyChoose: {
      title: 'Renovación total desde el interior',
      description: 'En ZENHOGAR estamos comprometidos con tu salud, ofrecemos productos con registro INVIMA. Este Combo Detox une Rtafull y Coliplus para limpiar el hígado y colon de forma profunda pero gentil. Despídete de la pesadez y el estreñimiento con calidad certificada.'
    },
    badge: 'COMBO N°3',
    keywords: 'Coliplus, Rtafull, desintoxicación, colon, hígado, digestión, limpieza natural, Zenhogar, combo salud',
    components: 'Linaza, Pitaya, Flor de Jamaica, Alcachofa, Semillas de Chía, Espirulina, Té Verde y Perejil',
    componentBenefits: [
    {
        'name': 'Linaza, Chía y Pitaya',
        'benefit': 'Promueven el tránsito intestinal de forma suave y natural, favoreciendo una digestión ligera y constante.'
    },
    {
        'name': 'Alcachofa, Té Verde y Perejil',
        'benefit': 'Apoyan la eliminación natural de líquidos y favorecen el correcto funcionamiento del metabolismo diario.'
    },
    {
        'name': 'Flor de Jamaica y Espirulina',
        'benefit': 'Ayudan a disminuir la sensación de pesadez o hinchazón en la zona abdominal y protegen la digestión.'
    }
],
    longTailKeywords: [
      'mejor combo detox para depurar el colon y el hígado naturalmente',
      'cómo reducir la sensación de pesadez abdominal y favorecer la digestión',
      'cuidado para una renovación total y bienestar digestivo',
      'beneficios del combo Detox Digestivo para la vitalidad diaria',
      'fórmula balanceada para una limpieza orgánica profunda y suave',
      'bienestar integral y ligereza con nutrición',
      'cómo mejorar el tránsito intestinal con calidad certificada',
      'combo para la desintoxicación periódica',
      'apoyo natural para el estreñimiento y toxinas acumuladas',
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
    description: 'Control & Detox es el sistema avanzado para quienes buscan recuperar su equilibrio metabólico y combatir la inflamación digestiva de forma natural. Este combo fusiona la acción reconfortante de Liteplex, ideal para equilibrar la flora y reducir la pesadez estomacal, con la potencia depurativa de Rtafull, que actúa directamente en la limpieza hepática para optimizar el procesamiento de nutrientes. Es la solución perfecta para deshinchar el cuerpo, mejorar la absorción de alimentos y potenciar tu bienestar digestivo con una fórmula balanceada y segura.',
    image: '/assets/combos/promo-4.webp',
    price: 119850,
    originalPrice: 159800,
    googleCategory: 'Health & Beauty > Health Care > Fitness & Nutrition',
    condition: 'new',
    products: ['liteplex', 'rtafull'],
    seoTitle: 'Cómo apoyar el bienestar metabólico con Combo Control & Detox',
    seoDescription: 'Apoya tu proceso de bienestar metabólico con el Combo Control & Detox. Fórmula balanceada para bienestar integral, energía y calidad certificada. ¡Ahorra hoy!',
    whyChoose: {
      title: 'Tu aliado en el control consciente',
      description: 'En ZENHOGAR estamos comprometidos con tu salud, ofrecemos productos con registro INVIMA. Control & Detox integra Liteplex y Rtafull para acelerar tu metabolismo y liberar toxinas acumuladas. Fórmula balanceada y certificada para tu proceso de bienestar.'
    },
    badge: 'COMBO N°4',
    keywords: 'Liteplex, Rtafull, control de peso, controlar medidas, desintoxicación, metabolism, Zenhogar, combo salud',
    components: 'Té Verde, Jengibre, Alcachofa, Flor de Jamaica, Perejil, Berenjena, Apio y Albahaca',
    componentBenefits: [
    {
        'name': 'Jengibre y Albahaca',
        'benefit': 'Disminuyen la sensación de pesadez, la acidez y aportan un alivio reconfortante al sistema digestivo.'
    },
    {
        'name': 'Alcachofa, Berenjena, Apio y Té Verde',
        'benefit': 'Optimizan el procesamiento de alimentos pesados y favorecen la eliminación natural de toxinas y líquidos.'
    },
    {
        'name': 'Flor de Jamaica y Perejil',
        'benefit': 'Ayudan a eliminar líquidos acumulados.'
    }
],
    longTailKeywords: [
      'mejor combo para moldear la figura y depurar el cuerpo',
      'cómo favorecer el metabolismo y liberar toxinas naturalmente',
      'cuidado para el control de peso consciente y vitalidad',
      'beneficios del combo Control & Detox para el bienestar integral',
      'fórmula balanceada para reducir medidas y limpiar el organismo',
      'bienestar integral y ligereza con suplementos',
      'cómo mejorar la quema de grasa con calidad certificada',
      'combo para el control de peso saludable',
      'apoyo natural para la ansiedad de comer y metabolismo lento',
      'control de peso seguro con ingredientes de alta pureza'
    ],
    seoFaqs: [
      { q: '¿Liteplex quita el hambre?', a: 'Ayuda a controlar la ansiedad, promoviendo un bienestar integral y control consciente.' },
      { q: '¿Rtafull ayuda a moldear la figura?', a: 'Al limpiar el hígado y colon, mejora el metabolismo y la vitalidad para tu equilibrio natural.' },
      { q: '¿Tiene efecto rebote?', a: 'Nuestra fórmula balanceada prioriza la salud, evitando efectos negativos con calidad certificada.' }
    ],
    benefits: [
      'Apoyo en el control de peso',
      'Depuración de toxinas acumuladas',
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
    description: 'Protección Total es el dúo esencial para quienes priorizan la higiene profunda y la pureza de su organismo. Este combo combina la innovación de Tufoff, dulces naturales sin azúcar que neutralizan olores y refrescan el aliento instantáneamente, con la capacidad purificadora de Rtafull, que desintoxica los órganos internos encargados de filtrar impurezas. Juntos, crean una barrera de protección que se refleja en una sensación de frescura total, depurando toxinas y promoviendo un aliento puro desde el interior del cuerpo.',
    image: '/assets/combos/promo-5.webp',
    price: 123675,
    originalPrice: 164900,
    googleCategory: 'Health & Beauty > Health Care > Fitness & Nutrition',
    condition: 'new',
    products: ['tufoff', 'rtafull'],
    seoTitle: 'Cómo favorecer el bienestar ante el mal olor y toxinas con Combo Protección Total',
    seoDescription: 'Protección y limpieza profunda para tu organismo con el Combo Protección Total. Fórmula balanceada para bienestar integral y calidad certificada. ¡Compra ahora!',
    whyChoose: {
      title: 'Protección que nace del equilibrio',
      description: 'En ZENHOGAR estamos comprometidos con tu salud, ofrecemos productos con registro INVIMA. Protección Total une la higiene profunda de Tufoff con la depuración hepática de Rtafull. Una barrera segura contra toxinas y mal olor con calidad certificada.'
    },
    badge: 'COMBO N°5',
    keywords: 'Tufoff, Rtafull, protección, limpieza profunda, defensas, bienestar, Zenhogar, combo salud',
    components: 'Flor de Jamaica, Alcachofa, Perejil, Berenjena, Eritritol, Inulina, Aceite de Menta y Bicarbonato de Sodio',
    componentBenefits: [
    {
        'name': 'Alcachofa, Berenjena y Perejil',
        'benefit': 'Favorecen el procesamiento de las comidas pesadas y apoyan la eliminación natural de líquidos y toxinas del organismo.'
    },
    {
        'name': 'Bicarbonato de Sodio y Aceite de Menta',
        'benefit': 'Neutralizan los ácidos y componentes que causan el mal aliento, aportando un alivio fresco y rápido.'
    },
    {
        'name': 'Inulina y Eritritol',
        'benefit': 'Brindan una protección bucal e higiene bucal duradera.'
    }
],
    longTailKeywords: [
      'mejor combo para controlar el olor y depurar el cuerpo',
      'cómo fortalecer las defensas y limpiar impurezas naturalmente',
      'cuidado para una protección integral y bienestar orgánico',
      'beneficios del combo Protección Total para la vitalidad diaria',
      'fórmula balanceada para una higiene profunda y detox hepático',
      'bienestar integral y frescura con productos',
      'cómo mejorar la salud general con calidad certificada',
      'combo para la limpieza interna y externa',
      'apoyo natural para las toxinas y falta de protección orgánica',
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
    description: 'Alivio Muscular es el sistema integral definitivo para el cuidado de tu cuerpo activo, combinando alivio externo reconfortante con nutrición interna de alta calidad. Este combo une la acción de la Loción Termoactiva, que proporciona calor localizado para relajar tensiones y calmar molestias musculares, con el Colágeno con Citrato de Magnesio, que regenera los tejidos conectivos y mejora la salud de articulaciones y huesos. Es el aliado perfecto para recuperar la movilidad, prevenir el desgaste y disfrutar de cada movimiento con total libertad.',
    image: '/assets/combos/promo-6.webp',
    price: 123675,
    originalPrice: 164900,
    googleCategory: 'Health & Beauty > Health Care > Fitness & Nutrition',
    condition: 'new',
    products: ['locion', 'colageno'],
    seoTitle: 'Cómo ayudar con la incomodidad muscular y articular con Combo Alivio Muscular',
    seoDescription: 'Apoya tu movilidad con el Combo Alivio Muscular. Fórmula balanceada para bienestar integral y calidad certificada. ¡Pídelo hoy!',
    whyChoose: {
      title: 'Bienestar en movimiento',
      description: 'En ZENHOGAR estamos comprometidos con tu salud, ofrecemos productos con registro INVIMA. Este combo apoya tus articulaciones con Colágeno y favorece el bienestar muscular con la Loción Termoactiva (Salicilato de Metilo). Calidad certificada para tu movilidad.'
    },
    badge: 'COMBO N°6',
    keywords: 'Loción Termoactiva, Colágeno, dolor muscular, articulaciones, recuperación, alivio, Zenhogar, combo bienestar',
    components: 'Extractos naturales relajantes, Colágeno Hidrolizado y Citrato de Magnesio',
    componentBenefits: [
    {
        'name': 'Extractos Naturales Relajantes',
        'benefit': 'Proveen acción térmica localizada externa para disminuir la rigidez y liberar la tensión muscular acumulada.'
    },
    {
        'name': 'Colágeno Hidrolizado y Citrato de Magnesio',
        'benefit': 'Apoyan el bienestar de las articulaciones, favoreciendo la flexibilidad y el correcto descanso muscular.'
    }
],
    longTailKeywords: [
      'mejor combo para el molestias articulares y espalda naturalmente',
      'cómo mejorar la movilidad articular y favorecer el bienestar muscular',
      'cuidado para la recuperación física y elasticidad corporal',
      'beneficios del combo Alivio Muscular para el bienestar integral',
      'fórmula balanceada para nutrir cartílagos y relajar músculos',
      'bienestar integral y vitalidad en movimiento',
      'cómo recuperar la movilidad diaria con calidad certificada',
      'combo para deportistas y adultos activos',
      'soporte natural para la artritis y contracturas musculares',
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
    id: 'promo-8',
    name: 'Combo Vitalidad & Limpieza',
    description: 'Vitalidad & Limpieza es el sistema integral de renovación diseñado para purificar tu cuerpo mientras recuperas tu fuerza vital de forma armoniosa. Este combo une el poder de Tyruss Full, un superalimento verde que oxigena tu organismo y nutre tu sangre con clorofila y algas, con la eficacia depurativa de Rtafull, que facilita la eliminación de impurezas hepáticas y renales. Es la combinación balanceada ideal para desinflamar el abdomen, mejorar la energía diaria y permitir que tu cuerpo funcione con la ligereza y pureza que merece.',
    image: '/assets/combos/promo-8.webp',
    price: 127350,
    originalPrice: 169800,
    googleCategory: 'Health & Beauty > Health Care > Fitness & Nutrition',
    condition: 'new',
    products: ['tyruss-full', 'rtafull'],
    seoTitle: 'Cómo favorecer la vitalidad y reducir la pesadez con Combo Vitalidad & Limpieza',
    seoDescription: 'Siéntete imparable con el Combo Vitalidad & Limpieza. Fórmula balanceada para depuración natural, bienestar integral y calidad certificada. ¡Pídelo hoy!',
    whyChoose: {
      title: 'Vitalidad renovada cada mañana',
      description: 'En ZENHOGAR estamos comprometidos con tu salud, ofrecemos productos con registro INVIMA. Vitalidad & Limpieza une a Tyruss Full y Rtafull para una limpieza orgánica profunda y energía total sin complicaciones. Calidad y seguridad certificada.'
    },
    badge: 'COMBO N°8',
    keywords: 'Tyruss-Full, Rtafull, vitalidad, limpieza, energía, bienestar, Zenhogar, combo salud',
    components: 'Clorofila, Espirulina, Chlorella, Alcachofa, Flor de Jamaica, Omega 3, Espinaca, Aguacate y Té Verde',
    componentBenefits: [
    {
        'name': 'Clorofila, Espirulina y Chlorella',
        'benefit': 'Aportan una potente acción antioxidante que promueve el balance natural y la vitalidad del organismo.'
    },
    {
        'name': 'Alcachofa, Flor de Jamaica y Té Verde',
        'benefit': 'Favorecen una digestión ligera y apoyan la eliminación natural de toxinas y líquidos acumulados.'
    },
    {
        'name': 'Espinaca, Aguacate y Omega 3',
        'benefit': 'Aportan nutrientes vitales y protegen la salud de los tejidos.'
    }
],
    longTailKeywords: [
      'mejor combo para depurar el cuerpo y recuperar la energía total',
      'cómo mejorar el desempeño diario y la depuración orgánica',
      'cuidado para una vitalidad renovada y equilibrio natural',
      'beneficios del combo Vitalidad & Limpieza para el bienestar integral',
      'fórmula balanceada para depurar el hígado y potenciar la fuerza',
      'bienestar integral y ligereza con nutrición',
      'cómo mantener el ritmo de vida activo con calidad certificada',
      'combo para la salud y rendimiento masculino',
      'apoyo natural para la pesadez y falta de vitalidad extrema',
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
  },
  {
    id: 'promo-9',
    name: 'Inmunidad Dual',
    description: 'Inmunidad Dual es el sistema de protección definitiva, diseñado científicamente para fortalecer las defensas naturales y optimizar la salud intestinal de manera simultánea. Este combo une la nutrición de alto impacto de Resvisfactor, que aprovecha el calostro bovino y el hongo shiitake para blindar el sistema inmune, con la acción depurativa de Coliplus, que garantiza un colon limpio y un tránsito intestinal regular. Al trabajar en conjunto, ayudan a reducir la pesadez abdominal y permiten que el organismo absorba con eficiencia los nutrientes esenciales para una vida vital.',
    image: '/assets/combos/combo-bienestar.webp',
    price: 129900,
    originalPrice: 165800,
    products: ['resvis', 'coliplus'],
    seoTitle: 'Cómo favorecer el bienestar ante la pesadez abdominal y defensas bajas con Inmunidad Dual',
    seoDescription: 'Reconforta tu vientre y fortalece tu sistema inmune con el combo Inmunidad Dual. Fórmula balanceada para bienestar integral y calidad certificada. ¡Ahorra $35.900!',
    whyChoose: {
      title: 'El dúo dinámico de tu bienestar',
      description: 'En ZENHOGAR estamos comprometidos con tu salud, ofrecemos productos con registro INVIMA. Este combo une la acción reconfortante de Coliplus con el escudo antioxidante de Resvisfactor. Solución certificada para confortar tu vientre y fortalecer tus defensas con calidad garantizada.'
    },
    badge: 'COMBO N°9',
    benefits: [
      'Escudo natural contra virus',
      'Tránsito intestinal regulado',
      'Vientre plano y sin pesadez',
      'Protección antioxidante total'
    ],
    keywords: 'bienestar total, desintoxicación, limpieza hepática, colon irritable, digestión, Rtafull, Coliplus, Zenhogar, combo salud',
    components: 'Calostro Bovino, Hongo Shiitake, Resveratrol, Linaza, Pitaya, Flor de Jamaica, Alcachofa, Betaglucanos y Vitaminas',
    componentBenefits: [
      {
        name: 'Calostro, Shiitake y Betaglucanos',
        benefit: 'Fortalecen el sistema inmunológico, apoyando las defensas naturales del organismo.'
      },
      {
        name: 'Linaza, Pitaya y Alcachofa',
        benefit: 'Promueven el tránsito intestinal regular y favorecen la digestión saludable de forma natural.'
      },
      {
        name: 'Resveratrol y Vitaminas',
        benefit: 'Aportan soporte antioxidante y celular.'
      }
    ],
    longTailKeywords: [
      'mejor combo natural para reconfortar el vientre y subir defensas',
      'cómo depurar el colon y el hígado de forma efectiva y segura',
      'cuidado para el bienestar integral digestivo e inmune',
      'beneficios de Inmunidad Dual para la vitalidad y equilibrio natural',
      'fórmula balanceada para desintoxicación profunda y energía',
      'bienestar integral y salud con calidad certificada premium',
      'cómo mejorar la digestión y absorción de nutrientes con combos',
      'combo para el cuidado de la salud diaria',
      'apoyo natural para el colon irritable y pesadez abdominal',
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
  }
];


export interface GiftProduct {
  id: string;
  masterId: string;
  name: string;
}

export const GIFT_PRODUCTS: GiftProduct[] = [
  { id: 'gift-coli', masterId: '49603', name: 'Obsequio Coliplus' },
  { id: 'gift-titan', masterId: '26846', name: 'Obsequio Titan Coffe' },
  { id: 'gift-coffee-col', masterId: '26845', name: 'Obsequio Coffe Colageno' },
  { id: 'gift-dampy', masterId: '76365', name: 'Obsequio Pañitos Dampy' },
  { id: 'gift-repo', masterId: '11301', name: 'Obsequio Gratis Repolarizador' },
  { id: 'gift-shampoo', masterId: '11270', name: 'Obsequio Shampoo Sin sal' },
  { id: 'gift-termo', masterId: '11253', name: 'Obsequio termoactiva' },
];

export const COLOMBIA_DATA = {
  'Amazonas': ['Leticia', 'Puerto Nariño', 'El Encanto', 'La Chorrera', 'La Pedrera', 'La Victoria', 'Mirití - Paraná', 'Puerto Alegría', 'Puerto Arica', 'Puerto Santander', 'Tarapacá'],
  'Antioquia': ['Medellín', 'Abejorral', 'Abriaquí', 'Alejandría', 'Amagá', 'Amalfi', 'Andes', 'Angelópolis', 'Angostura', 'Anorí', 'Santa Fé De Antioquia', 'Anzá', 'Apartadó', 'Arboletes', 'Argelia', 'Armenia', 'Barbosa', 'Belmira', 'Bello', 'Betania', 'Betulia', 'Ciudad Bolívar', 'Briceño', 'Buriticá', 'Cáceres', 'Caicedo', 'Caldas', 'Campamento', 'Cañasgordas', 'Caracolí', 'Caramanta', 'Carepa', 'El Carmen De Viboral', 'Carolina', 'Caucasia', 'Chigorodó', 'Cisneros', 'Cocorná', 'Concepción', 'Concordia', 'Copacabana', 'Dabeiba', 'Donmatías', 'Ebéjico', 'El Bagre', 'Entrerríos', 'Envigado', 'Fredonia', 'Frontino', 'Giraldo', 'Girardota', 'Gómez Plata', 'Granada', 'Guadalupe', 'Guarne', 'Guatapé', 'Heliconia', 'Hispania', 'Itagüí', 'Ituango', 'Jardín', 'Jericó', 'La Ceja', 'La Estrella', 'La Pintada', 'La Unión', 'Liborina', 'Maceo', 'Marinilla', 'Montebello', 'Murindó', 'Mutatá', 'Nariño', 'Necoclí', 'Nechí', 'Olaya', 'Peñol', 'Peque', 'Pueblorrico', 'Puerto Berrío', 'Puerto Nare', 'Puerto Triunfo', 'Remedios', 'Retiro', 'Rionegro', 'Sabanalarga', 'Sabaneta', 'Salgar', 'San Andrés De Cuerquía', 'San Carlos', 'San Francisco', 'San Jerónimo', 'San José De La Montaña', 'San Juan De Urabá', 'San Luis', 'San Pedro De Los Milagros', 'San Pedro De Urabá', 'San Rafael', 'San Roque', 'San Vicente Ferrer', 'Santa Bárbara', 'Santa Rosa De Osos', 'Santo Domingo', 'El Santuario', 'Segovia', 'Sonsón', 'Sopetrán', 'Támesis', 'Tarazá', 'Tarso', 'Titiribí', 'Toledo', 'Turbo', 'Uramita', 'Urrao', 'Valdivia', 'Valparaíso', 'Vegachí', 'Venecia', 'Vigía Del Fuerte', 'Yalí', 'Yarumal', 'Yolombó', 'Yondó', 'Zaragoza'],
  'Arauca': ['Arauca', 'Arauquita', 'Cravo Norte', 'Fortul', 'Puerto Rondón', 'Saravena', 'Tame'],
  'Atlántico': ['Barranquilla', 'Baranoa', 'Campo De La Cruz', 'Candelaria', 'Galapa', 'Juan De Acosta', 'Luruaco', 'Malambo', 'Manatí', 'Palmar De Varela', 'Piojó', 'Polonuevo', 'Ponedera', 'Puerto Colombia', 'Repelón', 'Sabanagrande', 'Sabanalarga', 'Santa Lucía', 'Santo Tomás', 'Soledad', 'Suan', 'Tubará', 'Usiacurí'],
  'Bogotá D.C.': ['Bogotá, D.C.'],
  'Bolívar': ['Cartagena De Indias', 'Achí', 'Altos Del Rosario', 'Arenal', 'Arjona', 'Arroyohondo', 'Barranco De Loba', 'Calamar', 'Cantagallo', 'Cicuco', 'Córdoba', 'Clemencia', 'El Carmen De Bolívar', 'El Guamo', 'El Peñón', 'Hatillo De Loba', 'Magangué', 'Mahates', 'Margarita', 'María La Baja', 'Montecristo', 'Santa Cruz De Mompox', 'Morales', 'Norosí', 'Pinillos', 'Regidor', 'Río Viejo', 'San Cristóbal', 'San Estanislao', 'San Fernando', 'San Jacinto', 'San Jacinto Del Cauca', 'San Juan Nepomuceno', 'San Martín De Loba', 'San Pablo', 'Santa Catalina', 'Santa Rosa', 'Santa Rosa Del Sur', 'Simití', 'Soplaviento', 'Talaigua Nuevo', 'Tiquisio', 'Turbaco', 'Turbaná', 'Villanueva', 'Zambrano'],
  'Boyacá': ['Tunja', 'Almeida', 'Aquitania', 'Arcabuco', 'Belén', 'Berbeo', 'Betéitiva', 'Boavita', 'Boyacá', 'Briceño', 'Buenavista', 'Busbanzá', 'Caldas', 'Campohermoso', 'Cerinza', 'Chinavita', 'Chiquinquirá', 'Chiscas', 'Chita', 'Chitaraque', 'Chivatá', 'Ciénega', 'Cómbita', 'Coper', 'Corrales', 'Covarachía', 'Cubará', 'Cucaita', 'Cuítiva', 'Chíquiza', 'Chivor', 'Duitama', 'El Cocuy', 'El Espino', 'Firavitoba', 'Floresta', 'Gachantivá', 'Gámeza', 'Garagoa', 'Guacamayas', 'Guateque', 'Guayatá', 'Güicán De La Sierra', 'Iza', 'Jenesano', 'Jericó', 'Labranzagrande', 'La Capilla', 'La Victoria', 'La Uvita', 'Villa De Leyva', 'Macanal', 'Maripí', 'Miraflores', 'Mongua', 'Monguí', 'Moniquirá', 'Motavita', 'Muzo', 'Nobsa', 'Nuevo Colón', 'Oicatá', 'Otanche', 'Pachavita', 'Páez', 'Paipa', 'Pajarito', 'Panqueba', 'Pauna', 'Paya', 'Paz De Río', 'Pesca', 'Pisba', 'Puerto Boyacá', 'Quípama', 'Ramiriquí', 'Ráquira', 'Rondón', 'Saboyá', 'Sáchica', 'Samacá', 'San Eduardo', 'San José De Pare', 'San Luis De Gaceno', 'San Mateo', 'San Miguel De Sema', 'San Pablo De Borbur', 'Santana', 'Santa María', 'Santa Rosa De Viterbo', 'Santa Sofía', 'Sativanorte', 'Sativasur', 'Siachoque', 'Soatá', 'Socotá', 'Socha', 'Sogamoso', 'Somondoco', 'Sora', 'Sotaquirá', 'Soracá', 'Susacón', 'Sutamarchán', 'Sutatenza', 'Tasco', 'Tenza', 'Tibaná', 'Tibasosa', 'Tinjacá', 'Tipacoque', 'Toca', 'Togüí', 'Tópaga', 'Tota', 'Tununguá', 'Turmequé', 'Tuta', 'Tutazá', 'Úmbita', 'Ventaquemada', 'Viracachá', 'Zetaquira'],
  'Caldas': ['Manizales', 'Aguadas', 'Anserma', 'Aranzazu', 'Belalcázar', 'Chinchiná', 'Filadelfia', 'La Dorada', 'La Merced', 'Manzanares', 'Marmato', 'Marquetalia', 'Marulanda', 'Neira', 'Norcasia', 'Pácora', 'Palestina', 'Pensilvania', 'Riosucio', 'Risaralda', 'Salamina', 'Samaná', 'San José', 'Supía', 'Victoria', 'Villamaría', 'Viterbo'],
  'Caquetá': ['Florencia', 'Albania', 'Belén De Los Andaquíes', 'Cartagena Del Chairá', 'Curillo', 'El Doncello', 'El Paujíl', 'La Montañita', 'Milán', 'Morelia', 'Puerto Rico', 'San José Del Fragua', 'San Vicente Del Caguán', 'Solano', 'Solita', 'Valparaíso'],
  'Casanare': ['Yopal', 'Aguazul', 'Chámeza', 'Hato Corozal', 'La Salina', 'Maní', 'Monterrey', 'Nunchía', 'Orocué', 'Paz De Ariporo', 'Pore', 'Recetor', 'Sabanalarga', 'Sácama', 'San Luis De Palenque', 'Támara', 'Tauramena', 'Trinidad', 'Villanueva'],
  'Cauca': ['Popayán', 'Almaguer', 'Argelia', 'Balboa', 'Bolívar', 'Buenos Aires', 'Cajibío', 'Caldono', 'Caloto', 'Corinto', 'El Tambo', 'Florencia', 'Guachené', 'Guapi', 'Inzá', 'Jambaló', 'La Sierra', 'La Vega', 'López De Micay', 'Mercaderes', 'Miranda', 'Morales', 'Padilla', 'Páez', 'Patía', 'Piamonte', 'Piendamó - Tunía', 'Puerto Tejada', 'Puracé', 'Rosas', 'San Sebastián', 'Santander De Quilichao', 'Santa Rosa', 'Silvia', 'Sotará - Paispamba', 'Suárez', 'Sucre', 'Timbío', 'Timbiquí', 'Toribío', 'Totoró', 'Villa Rica'],
  'Cesar': ['Valledupar', 'Aguachica', 'Agustín Codazzi', 'Astrea', 'Becerril', 'Bosconia', 'Chimichagua', 'Chiriguaná', 'Curumaní', 'El Copey', 'El Paso', 'Gamarra', 'González', 'La Gloria', 'La Jagua De Ibirico', 'Manaure Balcón Del Cesar', 'Pailitas', 'Pelaya', 'Pueblo Bello', 'Río De Oro', 'La Paz', 'San Alberto', 'San Diego', 'San Martín', 'Tamalameque'],
  'Chocó': ['Quibdó', 'Acandí', 'Alto Baudó', 'Atrato', 'Bagadó', 'Bahía Solano', 'Bajo Baudó', 'Bojayá', 'El Cantón Del San Pablo', 'Carmen Del Darién', 'Cértegui', 'Condoto', 'El Carmen De Atrato', 'El Litoral Del San Juan', 'Istmina', 'Juradó', 'Lloró', 'Medio Atrato', 'Medio Baudó', 'Medio San Juan', 'Nóvita', 'Nuevo Belén De Bajirá', 'Nuquí', 'Río Iró', 'Río Quito', 'Riosucio', 'San José Del Palmar', 'Sipí', 'Tadó', 'Unguía', 'Unión Panamericana'],
  'Córdoba': ['Montería', 'Ayapel', 'Buenavista', 'Canalete', 'Cereté', 'Chimá', 'Chinú', 'Ciénaga De Oro', 'Cotorra', 'La Apartada', 'Lorica', 'Los Córdobas', 'Momil', 'Montelíbano', 'Moñitos', 'Planeta Rica', 'Pueblo Nuevo', 'Puerto Escondido', 'Puerto Libertador', 'Purísima De La Concepción', 'Sahagún', 'San Andrés De Sotavento', 'San Antero', 'San Bernardo Del Viento', 'San Carlos', 'San José De Uré', 'San Pelayo', 'Tierralta', 'Tuchín', 'Valencia'],
  'Cundinamarca': ['Agua De Dios', 'Albán', 'Anapoima', 'Anolaima', 'Arbeláez', 'Beltrán', 'Bituima', 'Bojacá', 'Cabrera', 'Cachipay', 'Cajicá', 'Caparrapí', 'Cáqueza', 'Carmen De Carupa', 'Chaguaní', 'Chía', 'Chipaque', 'Choachí', 'Chocontá', 'Cogua', 'Cota', 'Cucunubá', 'El Colegio', 'El Peñón', 'El Rosal', 'Facatativá', 'Fómeque', 'Fosca', 'Funza', 'Fúquene', 'Fusagasugá', 'Gachalá', 'Gachancipá', 'Gachetá', 'Gama', 'Girardot', 'Granada', 'Guachetá', 'Guaduas', 'Guasca', 'Guataquí', 'Guatavita', 'Guayabal De Síquima', 'Guayabetal', 'Gutiérrez', 'Jerusalén', 'Junín', 'La Calera', 'La Mesa', 'La Palma', 'La Peña', 'La Vega', 'Lenguazaque', 'Machetá', 'Madrid', 'Manta', 'Medina', 'Mosquera', 'Nariño', 'Nemocón', 'Nilo', 'Nimaima', 'Nocaima', 'Venecia', 'Pacho', 'Paime', 'Pandi', 'Paratebueno', 'Pasca', 'Puerto Salgar', 'Pulí', 'Quebradanegra', 'Quetame', 'Quipile', 'Apulo', 'Ricaurte', 'San Antonio Del Tequendama', 'San Bernardo', 'San Cayetano', 'San Francisco', 'San Juan De Rioseco', 'Sasaima', 'Sesquilé', 'Sibaté', 'Silvania', 'Simijaca', 'Soacha', 'Sopó', 'Subachoque', 'Suesca', 'Supatá', 'Susa', 'Sutatausa', 'Tabio', 'Tausa', 'Tena', 'Tenjo', 'Tibacuy', 'Tibirita', 'Tocaima', 'Tocancipá', 'Topaipí', 'Ubalá', 'Ubaque', 'Villa De San Diego De Ubaté', 'Une', 'Útica', 'Vergara', 'Vianí', 'Villagómez', 'Villapinzón', 'Villeta', 'Viotá', 'Yacopí', 'Zipacón', 'Zipaquirá'],
  'Guainía': ['Inírida', 'Barrancominas', 'San Felipe', 'Puerto Colombia', 'La Guadalupe', 'Cacahual', 'Pana Pana', 'Morichal'],
  'Guaviare': ['San José Del Guaviare', 'Calamar', 'El Retorno', 'Miraflores'],
  'Huila': ['Neiva', 'Acevedo', 'Agrado', 'Aipe', 'Algeciras', 'Altamira', 'Baraya', 'Campoalegre', 'Colombia', 'Elías', 'Garzón', 'Gigante', 'Guadalupe', 'Hobo', 'Íquira', 'Isnos', 'La Argentina', 'La Plata', 'Nátaga', 'Oporapa', 'Paicol', 'Palermo', 'Palestina', 'Pital', 'Pitalito', 'Rivera', 'Saladoblanco', 'San Agustín', 'Santa María', 'Suaza', 'Tarqui', 'Tesalia', 'Tello', 'Teruel', 'Timaná', 'Villavieja', 'Yaguará'],
  'La Guajira': ['Riohacha', 'Albania', 'Barrancas', 'Dibulla', 'Distracción', 'El Molino', 'Fonseca', 'Hatonuevo', 'La Jagua Del Pilar', 'Maicao', 'Manaure', 'San Juan Del Cesar', 'Uribia', 'Urumita', 'Villanueva'],
  'Magdalena': ['Santa Marta', 'Algarrobo', 'Aracataca', 'Ariguaní', 'Cerro De San Antonio', 'Chivolo', 'Ciénaga', 'Concordia', 'El Banco', 'El Piñón', 'El Retén', 'Fundación', 'Guamal', 'Nueva Granada', 'Pedraza', 'Pijiño Del Carmen', 'Pivijay', 'Plato', 'Puebloviejo', 'Remolino', 'Sabanas De San Ángel', 'Salamina', 'San Sebastián De Buenavista', 'San Zenón', 'Santa Ana', 'Santa Bárbara De Pinto', 'Sitionuevo', 'Tenerife', 'Zapayán', 'Zona Bananera'],
  'Meta': ['Villavicencio', 'Acacías', 'Barranca De Upía', 'Cabuyaro', 'Castilla La Nueva', 'Cubarral', 'Cumaral', 'El Calvario', 'El Castillo', 'El Dorado', 'Fuente De Oro', 'Granada', 'Guamal', 'Mapiripán', 'Mesetas', 'La Macarena', 'Uribe', 'Lejanías', 'Puerto Concordia', 'Puerto Gaitán', 'Puerto López', 'Puerto Lleras', 'Puerto Rico', 'Restrepo', 'San Carlos De Guaroa', 'San Juan De Arama', 'San Juanito', 'San Martín', 'Vistahermosa'],
  'Nariño': ['Pasto', 'Albán', 'Aldana', 'Ancuya', 'Arboleda', 'Barbacoas', 'Belén', 'Buesaco', 'Colón', 'Consacá', 'Contadero', 'Córdoba', 'Cuaspud Carlosama', 'Cumbal', 'Cumbitara', 'Chachagüí', 'El Charco', 'El Peñol', 'El Rosario', 'El Tablón De Gómez', 'El Tambo', 'Funes', 'Guachucal', 'Guaitarilla', 'Gualmatán', 'Iles', 'Imués', 'Ipiales', 'La Cruz', 'La Florida', 'La Llanada', 'La Tola', 'La Unión', 'Leiva', 'Linares', 'Los Andes', 'Magüí', 'Mallama', 'Mosquera', 'Nariño', 'Olaya Herrera', 'Ospina', 'Francisco Pizarro', 'Policarpa', 'Potosí', 'Providencia', 'Puerres', 'Pupiales', 'Ricaurte', 'Roberto Payán', 'Samaniego', 'Sandoná', 'San Bernardo', 'San Lorenzo', 'San Pablo', 'San Pedro De Cartago', 'Santa Bárbara', 'Santacruz', 'Sapuyes', 'Taminango', 'Tangua', 'San Andrés De Tumaco', 'Túquerres', 'Yacuanquer'],
  'Norte de Santander': ['San José De Cúcuta', 'Ábrego', 'Arboledas', 'Bochalema', 'Bucarasica', 'Cácota', 'Cáchira', 'Chinácota', 'Chitagá', 'Convención', 'Cucutilla', 'Durania', 'El Carmen', 'El Tarra', 'El Zulia', 'Gramalote', 'Hacarí', 'Herrán', 'Labateca', 'La Esperanza', 'La Playa', 'Los Patios', 'Lourdes', 'Mutiscua', 'Ocaña', 'Pamplona', 'Pamplonita', 'Puerto Santander', 'Ragonvalia', 'Salazar', 'San Calixto', 'San Cayetano', 'Santiago', 'Sardinata', 'Silos', 'Teorama', 'Tibú', 'Toledo', 'Villa Caro', 'Villa Del Rosario'],
  'Putumayo': ['Mocoa', 'Colón', 'Orito', 'Puerto Asís', 'Puerto Caicedo', 'Puerto Guzmán', 'Puerto Leguízamo', 'Sibundoy', 'San Francisco', 'San Miguel', 'Santiago', 'Valle Del Guamuez', 'Villagarzón'],
  'Quindío': ['Armenia', 'Buenavista', 'Calarcá', 'Circasia', 'Córdoba', 'Filandia', 'Génova', 'La Tebaida', 'Montenegro', 'Pijao', 'Quimbaya', 'Salento'],
  'Risaralda': ['Pereira', 'Apía', 'Balboa', 'Belén De Umbría', 'Dosquebradas', 'Guática', 'La Celia', 'La Virginia', 'Marsella', 'Mistrató', 'Pueblo Rico', 'Quinchía', 'Santa Rosa De Cabal', 'Santuario'],
  'San Andrés y Providencia': ['San Andrés', 'Providencia'],
  'Santander': ['Bucaramanga', 'Aguada', 'Albania', 'Aratoca', 'Barbosa', 'Barichara', 'Barrancabermeja', 'Betulia', 'Bolívar', 'Cabrera', 'California', 'Capitanejo', 'Carcasí', 'Cepitá', 'Cerrito', 'Charalá', 'Charta', 'Chima', 'Chipatá', 'Cimitarra', 'Concepción', 'Confines', 'Contratación', 'Coromoro', 'Curití', 'El Carmen De Chucurí', 'El Guacamayo', 'El Peñón', 'El Playón', 'Encino', 'Enciso', 'Florián', 'Floridablanca', 'Galán', 'Gámbita', 'Girón', 'Guaca', 'Guadalupe', 'Guapotá', 'Guavatá', 'Güepsa', 'Hato', 'Jesús María', 'Jordán', 'La Belleza', 'Landázuri', 'La Paz', 'Lebrija', 'Los Santos', 'Macaravita', 'Málaga', 'Matanza', 'Mogotes', 'Molagavita', 'Ocamonte', 'Oiba', 'Onzaga', 'Palmar', 'Palmas Del Socorro', 'Páramo', 'Piedecuesta', 'Pinchote', 'Puente Nacional', 'Puerto Parra', 'Puerto Wilches', 'Rionegro', 'Sabana De Torres', 'San Andrés', 'San Benito', 'San Gil', 'San Joaquín', 'San José De Miranda', 'San Miguel', 'San Vicente De Chucurí', 'Santa Bárbara', 'Santa Helena Del Opón', 'Simacota', 'Socorro', 'Suaita', 'Sucre', 'Suratá', 'Tona', 'Valle De San José', 'Vélez', 'Vetas', 'Villanueva', 'Zapatoca'],
  'Sucre': ['Sincelejo', 'Buenavista', 'Caimito', 'Colosó', 'Corozal', 'Coveñas', 'Chalán', 'El Roble', 'Galeras', 'Guaranda', 'La Unión', 'Los Palmitos', 'Majagual', 'Morroa', 'Ovejas', 'Palmito', 'Sampués', 'San Benito Abad', 'San Juan De Betulia', 'San Marcos', 'San Onofre', 'San Pedro', 'San Luis De Sincé', 'Sucre', 'Santiago De Tolú', 'San José De Toluviejo'],
  'Tolima': ['Ibagué', 'Alpujarra', 'Alvarado', 'Ambalema', 'Anzoátegui', 'Armero', 'Ataco', 'Cajamarca', 'Carmen De Apicalá', 'Casabianca', 'Chaparral', 'Coello', 'Coyaima', 'Cunday', 'Dolores', 'Espinal', 'Falan', 'Flandes', 'Fresno', 'Guamo', 'Herveo', 'Honda', 'Icononzo', 'Lérida', 'Líbano', 'San Sebastián De Mariquita', 'Melgar', 'Murillo', 'Natagaima', 'Ortega', 'Palocabildo', 'Piedras', 'Planadas', 'Prado', 'Purificación', 'Rioblanco', 'Roncesvalles', 'Rovira', 'Saldaña', 'San Antonio', 'San Luis', 'Santa Isabel', 'Suárez', 'Valle De San Juan', 'Venadillo', 'Villahermosa', 'Villarrica'],
  'Valle del Cauca': ['Cali', 'Alcalá', 'Andalucía', 'Ansermanuevo', 'Argelia', 'Bolívar', 'Buenaventura', 'Guadalajara De Buga', 'Bugalagrande', 'Caicedonia', 'Calima', 'Candelaria', 'Cartago', 'Dagua', 'El Águila', 'El Cairo', 'El Cerrito', 'El Dovio', 'Florida', 'Ginebra', 'Guacarí', 'Jamundí', 'La Cumbre', 'La Unión', 'La Victoria', 'Obando', 'Palmira', 'Pradera', 'Restrepo', 'Riofrío', 'Roldanillo', 'San Pedro', 'Sevilla', 'Toro', 'Trujillo', 'Tuluá', 'Ulloa', 'Versalles', 'Vijes', 'Yotoco', 'Yumbo', 'Zarzal'],
  'Vaupés': ['Mitú', 'Carurú', 'Pacoa', 'Taraira', 'Papunahua', 'Yavaraté'],
  'Vichada': ['Puerto Carreño', 'La Primavera', 'Santa Rosalía', 'Cumaribo']
};

export const GENERAL_FAQS = [
  {
    q: "¿Cómo es el proceso de envío?",
    a: "Realizamos envíos a todo el país. El tiempo estimado es de 2 a 5 días hábiles dependiendo de tu ubicación. Recibirás un número de guía para rastrear tu pedido."
  },
  {
    q: "¿Tienen registro y certificaciones sanitarias?",
    a: "Sí, todos nuestros productos son 100% originales y cuentan con sus correspondientes registros de calidad y certificados sanitarios vigentes."
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

// ECUADOR CONFIGURATION & PRODUCT LIST
export const ECUADOR_PRODUCT_IDS = [
  'coliplus',
  'hemocream',
  'tonico-capilar',
  'colageno',
  'rtafull',
  'derman',
  'locion',
  'mamooth',
  'titan-coffee',
  'instant-virgin'
];

export interface EcuadorPricing {
  basePrice: number;
  promos: {
    id: string;
    label: string;
    units: number;
    price: number;
    badge?: string;
  }[];
}

export const ECUADOR_PRICING: Record<string, EcuadorPricing> = {
  'coliplus': {
    basePrice: 37.00,
    promos: [
      { id: '1u', label: '1 Unidad', units: 1, price: 37.00 },
      { id: '2u', label: '2 Unidades', units: 2, price: 55.50 },
      { id: '2x3', label: 'Pague 2 Lleve 3', units: 3, price: 74.00, badge: '⭐ Recomendado' }
    ]
  },
  'hemocream': {
    basePrice: 34.99,
    promos: [
      { id: '1u', label: '1 Unidad', units: 1, price: 34.99 },
      { id: '2u', label: '2 Unidades', units: 2, price: 52.49 },
      { id: '2x3', label: 'Pague 2 Lleve 3', units: 3, price: 69.98, badge: '⭐ Recomendado' }
    ]
  },
  'tonico-capilar': {
    basePrice: 34.99,
    promos: [
      { id: '1u', label: '1 Unidad', units: 1, price: 34.99 },
      { id: '2u', label: '2 Unidades', units: 2, price: 52.49 },
      { id: '2x3', label: 'Pague 2 Lleve 3', units: 3, price: 69.98, badge: '⭐ Recomendado' }
    ]
  },
  'colageno': {
    basePrice: 37.00,
    promos: [
      { id: '1u', label: '1 Unidad', units: 1, price: 37.00 },
      { id: '2u', label: '2 Unidades', units: 2, price: 55.50 },
      { id: '2x3', label: 'Pague 2 Lleve 3', units: 3, price: 74.00, badge: '⭐ Recomendado' }
    ]
  },
  'rtafull': {
    basePrice: 34.99,
    promos: [
      { id: '1u', label: '1 Unidad', units: 1, price: 34.99 },
      { id: '2u', label: '2 Unidades', units: 2, price: 52.49 },
      { id: '2x3', label: 'Pague 2 Lleve 3', units: 3, price: 69.98, badge: '⭐ Recomendado' }
    ]
  },
  'derman': {
    basePrice: 34.99,
    promos: [
      { id: '1u', label: '1 Unidad', units: 1, price: 34.99 },
      { id: '2u', label: '2 Unidades', units: 2, price: 52.49 },
      { id: '2x3', label: 'Pague 2 Lleve 3', units: 3, price: 69.98, badge: '⭐ Recomendado' }
    ]
  },
  'locion': {
    basePrice: 32.99,
    promos: [
      { id: '1u', label: '1 Unidad', units: 1, price: 32.99 },
      { id: '2u', label: '2 Unidades', units: 2, price: 49.49 },
      { id: '2x3', label: 'Pague 2 Lleve 3', units: 3, price: 65.98, badge: '⭐ Recomendado' }
    ]
  },
  'mamooth': {
    basePrice: 33.99,
    promos: [
      { id: '1u', label: '1 Unidad', units: 1, price: 33.99 },
      { id: '2u', label: '2 Unidades', units: 2, price: 50.99 },
      { id: '2x3', label: 'Pague 2 Lleve 3', units: 3, price: 67.98, badge: '⭐ Recomendado' }
    ]
  },
  'titan-coffee': {
    basePrice: 37.00,
    promos: [
      { id: '1u', label: '1 Unidad', units: 1, price: 37.00 },
      { id: '2u', label: '2 Unidades', units: 2, price: 55.50 },
      { id: '2x3', label: 'Pague 2 Lleve 3', units: 3, price: 74.00, badge: '⭐ Recomendado' }
    ]
  },
  'instant-virgin': {
    basePrice: 34.99,
    promos: [
      { id: '1u', label: '1 Unidad', units: 1, price: 34.99 },
      { id: '2u', label: '2 Unidades', units: 2, price: 52.49 },
      { id: '2x3', label: 'Pague 2 Lleve 3', units: 3, price: 69.98, badge: '⭐ Recomendado' }
    ]
  }
};

export const ECUADOR_DATA: Record<string, string[]> = {
  'Azuay': ['Cuenca', 'Gualaceo', 'Paute', 'Santa Isabel', 'Sigsig', 'Girón', 'Chordeleg', 'Camilo Ponce Enríquez'],
  'Bolívar': ['Guaranda', 'Chimbo', 'San Miguel', 'Caluma', 'Echeandía', 'Las Naves'],
  'Cañar': ['Azogues', 'La Troncal', 'Cañar', 'Biblián', 'El Tambo'],
  'Carchi': ['Tulcán', 'San Gabriel (Montúfar)', 'Bolívar', 'Espejo (El Ángel)', 'Mira'],
  'Chimborazo': ['Riobamba', 'Alausí', 'Guano', 'Chambo', 'Colta', 'Cumandá', 'Pallatanga'],
  'Cotopaxi': ['Latacunga', 'Salcedo', 'Pujilí', 'La Maná', 'Saquisilí', 'Sigchos'],
  'El Oro': ['Machala', 'Pasaje', 'Santa Rosa', 'Arenillas', 'Huaquillas', 'Piñas', 'Zaruma', 'El Guabo'],
  'Esmeraldas': ['Esmeraldas', 'Quinindé', 'Atacames', 'San Lorenzo', 'Muisne', 'Rioverde'],
  'Galápagos': ['Puerto Baquerizo Moreno', 'Puerto Ayora', 'Puerto Villamil'],
  'Guayas': ['Guayaquil', 'Durán', 'Samborondón', 'Daule', 'Milagro', 'Salitre', 'Balzar', 'El Triunfo', 'Naranjal', 'Pedro Carbo', 'Playas (General Villamil)'],
  'Imbabura': ['Ibarra', 'Otavalo', 'Cotacachi', 'Antonio Ante (Atuntaqui)', 'Pimampiro', 'Urcuquí'],
  'Loja': ['Loja', 'Catamayo', 'Calvas (Cariamanga)', 'Macará', 'Paltas (Catacocha)', 'Saraguro'],
  'Los Ríos': ['Babahoyo', 'Quevedo', 'Ventanas', 'Vinces', 'Buena Fe', 'Puebloviejo', 'Valencia'],
  'Manabí': ['Portoviejo', 'Manta', 'Chone', 'Montecristi', 'Jipijapa', 'Bahía de Caráquez (Sucre)', 'El Carmen', 'Pedernales', 'Rocafuerte'],
  'Morona Santiago': ['Macas', 'Gualaquiza', 'Sucúa'],
  'Napo': ['Tena', 'Archidona', 'El Chaqui'],
  'Orellana': ['Puerto Francisco de Orellana (El Coca)', 'La Joya de los Sachas'],
  'Pastaza': ['Puyo', 'Mera', 'Santa Clara'],
  'Pichincha': ['Quito', 'Rumiñahui (Sangolquí)', 'Mejía (Machachi)', 'Cayambe', 'Puerto Quito', 'Pedro Moncayo (Tabacundo)', 'San Miguel de los Bancos'],
  'Santa Elena': ['Santa Elena', 'La Libertad', 'Salinas'],
  'Santo Domingo de los Tsáchilas': ['Santo Domingo', 'La Concordia'],
  'Sucumbíos': ['Nueva Loja (Lago Agrio)', 'Shushufindi'],
  'Tungurahua': ['Ambato', 'Baños de Agua Santa', 'Pelileo', 'Píllaro', 'Cevallos', 'Tisaleo'],
  'Zamora Chinchipe': ['Zamora', 'Yantzaza']
};

let cachedEcuadorProducts: Product[] | null = null;
let cachedEcuadorCategories: Category[] | null = null;
let cachedColombiaCategories: Category[] | null = null;

export function getProductsForCountry(country: 'CO' | 'EC' = 'CO'): Product[] {
  if (country === 'EC') {
    if (!cachedEcuadorProducts) {
      cachedEcuadorProducts = PRODUCTS
        .filter(p => ECUADOR_PRODUCT_IDS.includes(p.id))
        .map(p => {
          const ecPricing = ECUADOR_PRICING[p.id];
          if (!ecPricing) return p;
          return {
            ...p,
            basePrice: ecPricing.basePrice,
            promos: ecPricing.promos
          };
        });
    }
    return cachedEcuadorProducts;
  }
  return PRODUCTS;
}

export function getProductForCountry(productId: string, country: 'CO' | 'EC' = 'CO'): Product | undefined {
  const allProds = getProductsForCountry(country);
  return allProds.find(p => p.id === productId);
}

export function getCategoriesForCountry(country: 'CO' | 'EC' = 'CO'): Category[] {
  if (country === 'EC') {
    if (!cachedEcuadorCategories) {
      const prods = getProductsForCountry('EC');
      cachedEcuadorCategories = CATEGORIES.filter(cat => {
        if (cat.id === 'combos') {
          return false;
        }
        if (cat.id === 'belleza-integral') {
          return false;
        }
        return prods.some(p => p.category === cat.id);
      });
    }
    return cachedEcuadorCategories;
  }
  if (!cachedColombiaCategories) {
    cachedColombiaCategories = CATEGORIES;
  }
  return cachedColombiaCategories;
}


