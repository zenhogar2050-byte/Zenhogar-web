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
  seoFaqs?: { q: string; a: string }[];
  longTailKeywords?: string[];
}

export const CATEGORIES = [
  { 
    id: 'salud-bienestar', 
    name: 'Salud y Bienestar', 
    icon: 'Sparkles',
    color: 'emerald',
    description: 'Encuentra el equilibrio perfecto para tu cuerpo con nuestra selección de suplementos naturales y vitaminas de alta calidad.'
  },
  { 
    id: 'belleza-integral', 
    name: 'Belleza Integral', 
    icon: 'Heart',
    color: 'rose',
    description: 'Potencia tu belleza desde el interior con productos diseñados para nutrir tu piel, fortalecer tu cabello y revitalizar tu apariencia.'
  },
  { 
    id: 'salud-sexual', 
    name: 'Salud Sexual', 
    icon: 'Zap',
    color: 'purple',
    description: 'Mejora tu vitalidad y rendimiento con soluciones naturales diseñadas para tu bienestar íntimo y energía diaria.'
  }
];

export const PRODUCTS: Product[] = [
  {
    id: 'rtafull',
    name: 'Rtafull',
    category: 'salud-bienestar',
    shortDescription: 'Depuración y bienestar hepático natural.',
    description: 'Rtafull es un suplemento natural diseñado para apoyar la función hepática y promover la desintoxicación del organismo de manera suave y efectiva.',
    seoTitle: 'Cómo solucionar el estreñimiento y colon irritable con Rtafull',
    seoDescription: 'Recupera tu equilibrio digestivo con nuestra fórmula balanceada de Rtafull. Desintoxicación profunda y bienestar integral con calidad certificada. ¡Ahorra hoy!',
    benefits: [
      'Apoya la salud del hígado',
      'Promueve la eliminación de toxinas',
      'Mejora la digestión de grasas',
      'Ingredientes 100% naturales'
    ],
    image: '/assets/products/rtafull.webp',
    basePrice: 79900,
    size: '500 ml',
    keywords: 'hígado graso, cirrosis, desintoxicación hepática, digestión pesada, toxinas, limpieza natural, salud hepática, Unmerco, Rtafull',
    longTailKeywords: [
      'suplemento natural para limpiar el colon profundamente',
      'cómo desintoxicar el hígado de forma natural y segura',
      'remedio para el estreñimiento crónico con ingredientes naturales',
      'mejor depurativo natural para mejorar la digestión diaria',
      'cómo eliminar toxinas del cuerpo con bienestar integral',
      'suplemento para colon irritable con calidad certificada',
      'limpieza hepática natural para aumentar la vitalidad',
      'fórmula balanceada para regular el tránsito intestinal',
      'bienestar digestivo con productos naturales de alta autoridad',
      'cómo mejorar la microbiota intestinal con Rtafull'
    ],
    seoFaqs: [
      { q: '¿Cómo ayuda Rtafull a limpiar el colon?', a: 'Rtafull utiliza una fórmula balanceada de extractos naturales que promueven la eliminación de toxinas acumuladas, mejorando el tránsito intestinal.' },
      { q: '¿Es seguro para uso diario?', a: 'Sí, es un producto de bienestar integral con calidad certificada, diseñado para ser parte de tu rutina de salud natural.' },
      { q: '¿En cuánto tiempo se ven resultados?', a: 'Muchos usuarios reportan una sensación de ligereza y mejor digestión desde la primera semana de uso constante.' }
    ],
    promos: [
      { id: '1u', label: '1 Unidad', units: 1, price: 79900 },
      { id: '2u', label: '2 Unidades', units: 2, price: 119850 },
      { id: '2x3', label: 'Pague 2 Lleve 3', units: 3, price: 159800, badge: '⭐ Recomendado' },
      { id: '3x5', label: 'Pague 3 Lleve 5', units: 5, price: 239700, badge: '🔥 Mejor Oferta' }
    ],
    testimonials: [
      { name: 'Carlos Mendoza', text: 'Me siento mucho más ligero desde que empecé a tomar Rtafull. Mi digestión ha mejorado notablemente.', rating: 5 },
      { name: 'Elena Rodríguez', text: 'Excelente producto para desintoxicar. Lo tomo cada 6 meses y los resultados son increíbles.', rating: 5 },
      { name: 'Andrés Silva', text: 'Sentía mucha pesadez después de comer, pero con Rtafull eso desapareció por completo.', rating: 4 }
    ],
    whyChoose: {
      title: 'Limpia tu interior, renueva tu energía',
      description: 'A veces el cuerpo se siente pesado por el ritmo del día a día. Rtafull es como un reseteo natural para tu sistema, ayudando a tu hígado a procesar lo que ya no necesitas para que recuperes esa ligereza y vitalidad que te permite moverte con libertad.'
    }
  },
  {
    id: 'coliplus',
    name: 'Coliplus',
    category: 'salud-bienestar',
    shortDescription: 'Equilibrio digestivo y confort intestinal.',
    description: 'Coliplus ayuda a mantener el equilibrio de la flora intestinal y mejora los procesos digestivos, reduciendo la pesadez y el malestar.',
    seoTitle: 'Cómo solucionar la inflamación abdominal y gases con Coliplus',
    seoDescription: 'Dile adiós a la pesadez con Coliplus. Bienestar integral para tu microbiota con fórmula balanceada y calidad certificada. ¡Aprovecha el descuento!',
    benefits: [
      'Regula el tránsito intestinal',
      'Reduce la inflamación abdominal',
      'Fortalece la flora bacteriana',
      'Alivia la pesadez después de comer'
    ],
    image: '/assets/products/coliplus.webp',
    basePrice: 75900,
    size: '500 ml',
    keywords: 'estreñimiento, colon irritable, inflamación abdominal, pesadez estomacal, limpieza de colon, fibra natural, tránsito intestinal, Coliplus, Unmerco',
    longTailKeywords: [
      'cómo desinflamar el vientre de forma natural y rápida',
      'mejor suplemento para eliminar gases y pesadez estomacal',
      'suplemento natural para mejorar la microbiota intestinal',
      'cómo tener una digestión ligera después de las comidas',
      'remedio natural para la pesadez abdominal crónica',
      'bienestar integral para el sistema digestivo con Coliplus',
      'fórmula balanceada para reducir la hinchazón del estómago',
      'suplemento con calidad certificada para salud intestinal',
      'cómo mejorar el equilibrio natural de la flora intestinal',
      'vitalidad digestiva con ingredientes naturales de alta autoridad'
    ],
    seoFaqs: [
      { q: '¿Coliplus ayuda con la inflamación abdominal?', a: 'Absolutamente. Está diseñado para reducir la producción de gases y promover una digestión ligera y sin molestias.' },
      { q: '¿Puedo tomarlo si tengo colon sensible?', a: 'Sí, su fórmula balanceada es gentil con el sistema digestivo y busca restaurar el equilibrio natural.' },
      { q: '¿Contiene ingredientes artificiales?', a: 'No, Coliplus se enfoca en el bienestar integral con ingredientes de origen natural y calidad certificada.' }
    ],
    promos: [
      { id: '1u', label: '1 Unidad', units: 1, price: 75900 },
      { id: '2u', label: '2 Unidades', units: 2, price: 113850 },
      { id: '2x3', label: 'Pague 2 Lleve 3', units: 3, price: 151800, badge: '⭐ Recomendado' },
      { id: '3x5', label: 'Pague 3 Lleve 5', units: 5, price: 227700, badge: '🔥 Mejor Oferta' }
    ],
    testimonials: [
      { name: 'Marta Lucía', text: 'Sufría de colon irritable y Coliplus ha sido mi salvación. Ya no me inflamo como antes.', rating: 5 },
      { name: 'Jorge Iván', text: 'Muy efectivo para regular el tránsito intestinal. Lo recomiendo totalmente.', rating: 5 },
      { name: 'Sofía Castro', text: 'Me gusta porque es natural y realmente se siente la diferencia en pocos días.', rating: 4 }
    ],
    whyChoose: {
      title: 'Recupera tu ritmo y ligereza',
      description: 'Sentirse inflamado puede arruinar cualquier plan. Coliplus cuida tu microbiota de forma gentil, ayudando a que tu digestión fluya sin molestias para que vuelvas a disfrutar de tus comidas favoritas y recuperes tu equilibrio natural.'
    }
  },
  {
    id: 'colageno',
    name: 'Colágeno con Citrato de Magnesio',
    category: 'salud-bienestar',
    shortDescription: 'Fortaleza para tus articulaciones y vitalidad.',
    description: 'Una combinación poderosa para la salud articular, ósea y muscular. El citrato de magnesio potencia la absorción del colágeno.',
    seoTitle: 'Cómo solucionar la falta de colágeno y fatiga con Colágeno + Citrato de Magnesio',
    seoDescription: 'Fortalece tus articulaciones y recupera tu energía con nuestra fórmula balanceada. Bienestar integral con calidad certificada. ¡Compra y ahorra!',
    benefits: [
      'Mejora la movilidad articular',
      'Fortalece huesos y tendones',
      'Promueve la salud de piel, cabello y uñas',
      'Reduce el cansancio y la fatiga muscular'
    ],
    image: '/assets/products/Colagenocitratodemagnesio.webp',
    basePrice: 85000,
    size: '700 g',
    keywords: 'dolor articular, calambres, caída de cabello, uñas quebradizas, piel seca, artritis, magnesio, colágeno hidrolizado, vitalidad, Unmerco',
    longTailKeywords: [
      'mejor colágeno con magnesio para fortalecer articulaciones',
      'suplemento natural para evitar el cansancio físico diario',
      'cómo mejorar la elasticidad de la piel con colágeno natural',
      'beneficios del citrato de magnesio para el sistema muscular',
      'fórmula balanceada para salud ósea y articular en adultos',
      'bienestar integral para personas activas con magnesio',
      'cómo recuperar la vitalidad muscular con calidad certificada',
      'suplemento de alta autoridad para el cuidado de los huesos',
      'mejorar el sueño y la relajación muscular con magnesio',
      'colágeno hidrolizado para mantener la juventud celular'
    ],
    seoFaqs: [
      { q: '¿Por qué combinar colágeno con magnesio?', a: 'El magnesio potencia la absorción del colágeno y ayuda a la relajación muscular, ofreciendo un bienestar integral.' },
      { q: '¿Ayuda con el dolor articular?', a: 'Sí, nuestra fórmula balanceada nutre los tejidos conectivos, ayudando a reducir molestias por desgaste.' },
      { q: '¿Cuál es la mejor hora para tomarlo?', a: 'Se recomienda tomarlo por la mañana para energía o por la noche para recuperación muscular.' }
    ],
    promos: [
      { id: '1u', label: '1 Unidad', units: 1, price: 85000 },
      { id: '2u', label: '2 Unidades', units: 2, price: 127500 },
      { id: '2x3', label: 'Pague 2 Lleve 3', units: 3, price: 170000, badge: '⭐ Recomendado' },
      { id: '3x5', label: 'Pague 3 Lleve 5', units: 5, price: 255000, badge: '🔥 Mejor Oferta' }
    ],
    testimonials: [
      { name: 'Beatriz Gómez', text: 'Mis rodillas ya no suenan al caminar. El magnesio hace que se sienta el efecto más rápido.', rating: 5 },
      { name: 'Ricardo Peña', text: 'He notado mi piel más firme y mis uñas mucho más fuertes. Excelente combinación.', rating: 5 },
      { name: 'Patricia Ruiz', text: 'Me ayuda mucho con los calambres nocturnos gracias al magnesio. Muy buen producto.', rating: 5 }
    ],
    whyChoose: {
      title: 'Muévete con total libertad',
      description: 'Tus articulaciones son el motor de tu movimiento. Esta combinación de colágeno y magnesio nutre tus tejidos desde adentro, dándote la elasticidad y vitalidad necesaria para seguir activo y en equilibrio natural.'
    }
  },
  {
    id: 'resvis',
    name: 'Resvis Factor',
    category: 'salud-bienestar',
    shortDescription: 'Refuerzo inmunológico y antioxidante.',
    description: 'Resvis Factor combina potentes antioxidantes para proteger tus células y fortalecer el sistema de defensa natural del cuerpo.',
    seoTitle: 'Cómo solucionar las defensas bajas y envejecimiento con Resvis Factor',
    seoDescription: 'Potencia tu sistema inmune con el poder del Resveratrol. Bienestar integral y vitalidad con calidad certificada. ¡Protección total al mejor precio!',
    benefits: [
      'Potente acción antioxidante',
      'Refuerza el sistema inmunológico',
      'Protege contra el daño oxidativo',
      'Aporta vitalidad diaria'
    ],
    image: '/assets/products/Resvisfactor.webp',
    basePrice: 89900,
    size: '500 ml',
    keywords: 'defensas bajas, gripe frecuente, sistema inmune, antioxidantes, fatiga crónica, cansancio, Resvis Factor, Unmerco',
    longTailKeywords: [
      'mejor antioxidante natural para prevenir el envejecimiento',
      'cómo fortalecer el sistema inmunológico con resveratrol',
      'suplemento natural para proteger las células del daño oxidativo',
      'beneficios del resveratrol para la salud cardiovascular integral',
      'fórmula balanceada para mantener la vitalidad después de los 40',
      'bienestar integral con potentes antioxidantes de alta autoridad',
      'cómo mejorar la respuesta inmune con calidad certificada',
      'suplemento para longevidad y salud celular comprobada',
      'protección natural contra los radicales libres con Resvis Factor',
      'vitalidad diaria con ingredientes naturales de alta pureza'
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
      { name: 'Fernando S.', text: 'Desde que lo tomo no me he vuelto a resfriar. Siento mis defensas al máximo.', rating: 5 },
      { name: 'Gloria Estela', text: 'Me da mucha energía para el día a día. Es un excelente antioxidante.', rating: 5 },
      { name: 'Luis Miguel', text: 'Lo tomo preventivamente y me siento muy bien. Calidad garantizada.', rating: 4 }
    ],
    whyChoose: {
      title: 'Tu escudo natural diario',
      description: 'En un mundo que no se detiene, tu sistema de defensa es tu mejor aliado. Resvis Factor te brinda ese apoyo antioxidante extra que necesitas para mantener tu vitalidad al máximo y proteger tu equilibrio natural.'
    }
  },
  {
    id: 'cla500',
    name: 'CLA 500',
    category: 'salud-bienestar',
    shortDescription: 'Control de peso y definición muscular.',
    description: 'El CLA (Ácido Linoleico Conjugado) es un aliado ideal para quienes buscan mejorar su composición corporal de forma natural.',
    seoTitle: 'Cómo solucionar el exceso de grasa y falta de tono con CLA 500',
    seoDescription: 'Optimiza tu metabolismo con CLA 500. Fórmula balanceada para reducir grasa y tonificar con calidad certificada. ¡Ahorra en tu compra!',
    benefits: [
      'Ayuda a reducir la grasa corporal',
      'Favorece la tonificación muscular',
      'Apoya el metabolismo energético',
      'Ideal para acompañar tu rutina de ejercicio'
    ],
    image: '/assets/products/CLA500_.webp',
    basePrice: 75900,
    size: '60 Cápsulas',
    keywords: 'quemar grasa, bajar de peso, definición muscular, metabolismo lento, sobrepeso, CLA 500, Unmerco, adelgazar natural',
    longTailKeywords: [
      'mejor suplemento de CLA para quemar grasa abdominal',
      'cómo tonificar los músculos de forma natural con CLA 500',
      'suplemento para acelerar el metabolismo de las grasas',
      'beneficios del ácido linoleico conjugado para deportistas',
      'fórmula balanceada para control de peso y definición muscular',
      'bienestar integral y reducción de medidas con calidad certificada',
      'cómo mejorar la composición corporal con suplementos naturales',
      'CLA 500 de alta autoridad para pérdida de grasa saludable',
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
      { name: 'Paola V.', text: 'Me ayuda a marcar más los músculos y a quemar esa grasita difícil del abdomen.', rating: 5 },
      { name: 'Mateo G.', text: 'Buen complemento para el gimnasio. Siento que sudo más y quemo más grasa.', rating: 4 }
    ],
    whyChoose: {
      title: 'Esculpe tu mejor versión',
      description: 'Acompañar tu esfuerzo físico con lo mejor de la naturaleza marca la diferencia. CLA 500 te ayuda a optimizar tu metabolismo de forma honesta, apoyando tu vitalidad y proceso de tonificación natural.'
    }
  },
  {
    id: 'cafetolio',
    name: 'Café Verde Cafetolio',
    category: 'salud-bienestar',
    shortDescription: 'Energía natural y apoyo metabólico.',
    description: 'Disfruta de los beneficios del café verde en una bebida deliciosa que te ayuda a mantenerte activo y apoya tu metabolismo.',
    seoTitle: 'Cómo solucionar el metabolismo lento y falta de energía con Cafetolio',
    seoDescription: 'Activa tu metabolismo con el poder del Café Verde Cafetolio. Fórmula balanceada para energía natural y bienestar integral con calidad certificada. ¡Compra ahora!',
    benefits: [
      'Aumenta los niveles de energía',
      'Efecto termogénico natural',
      'Rico en antioxidantes (ácido clorogénico)',
      'Ayuda a controlar el apetito'
    ],
    image: '/assets/products/Cafetolio.webp',
    basePrice: 99900,
    size: '500 g',
    keywords: 'ansiedad por comer, falta de energía, metabolismo lento, café verde, adelgazar, energía natural, Cafetolio, Unmerco',
    longTailKeywords: [
      'mejor café verde para acelerar el metabolismo naturalmente',
      'cómo controlar la ansiedad por comer con café verde',
      'suplemento natural para aumentar la energía sin nerviosismo',
      'beneficios del ácido clorogénico para la pérdida de peso',
      'fórmula balanceada para quemar grasa con café verde premium',
      'bienestar integral y vitalidad diaria con Cafetolio Unmerco',
      'cómo mejorar la quema de calorías con calidad certificada',
      'bebida natural para mantenerse activo y saludable todo el día',
      'café verde de alta autoridad para control de peso efectivo',
      'energía metabólica segura con ingredientes de origen natural'
    ],
    seoFaqs: [
      { q: '¿El café verde Cafetolio ayuda a bajar de peso?', a: 'Sí, su efecto termogénico natural ayuda a acelerar el metabolismo y a utilizar las grasas como fuente de energía.' },
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
      description: 'Olvídate de los picos de energía seguidos de cansancio. Cafetolio te ofrece un impulso natural y constante, activando tu vitalidad y metabolismo mientras disfrutas de un sabor delicioso.'
    }
  },
  {
    id: 'locion',
    name: 'Loción Termoactiva',
    category: 'salud-bienestar',
    shortDescription: 'Alivio muscular y bienestar corporal.',
    description: 'Loción diseñada para proporcionar un efecto de calor reconfortante, ideal para masajes después de la actividad física o para aliviar tensiones.',
    seoTitle: 'Cómo solucionar dolores musculares y tensiones con Loción Termoactiva',
    seoDescription: 'Alivio rápido y profundo con nuestra Loción Termoactiva. Fórmula balanceada con efecto calor para bienestar integral y calidad certificada. ¡Pídela hoy!',
    benefits: [
      'Efecto calor inmediato',
      'Relaja los músculos tensionados',
      'Mejora la circulación local',
      'Ideal para masajes terapéuticos'
    ],
    image: '/assets/products/Termoactiva.webp',
    basePrice: 79900,
    size: '120 ml',
    keywords: 'dolor muscular, tensión cuello, mala circulación, fatiga muscular, masajes, alivio rápido, loción termoactiva, Unmerco',
    longTailKeywords: [
      'mejor loción con efecto calor para dolores de espalda',
      'cómo aliviar la tensión muscular en el cuello rápidamente',
      'remedio natural para mejorar la circulación en las piernas',
      'loción termoactiva para masajes deportivos y recuperación',
      'fórmula balanceada para alivio de contracturas musculares',
      'bienestar integral corporal con masajes de calor profundo',
      'cómo reducir la fatiga muscular después del ejercicio intenso',
      'loción de alta autoridad para el cuidado muscular diario',
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
      { name: 'Roberto J.', text: 'El calor que genera es perfecto para mis dolores de espalda. Alivio inmediato.', rating: 5 },
      { name: 'Sandra Milena', text: 'La uso después de entrenar y mis músculos se recuperan mucho más rápido.', rating: 5 }
    ],
    whyChoose: {
      title: 'Alivio que reconforta tu cuerpo',
      description: 'Después de un día largo o una rutina intensa, tus músculos merecen un descanso. Esta loción termoactiva actúa profundamente con un calor gentil que relaja las tensiones y te ayuda a recuperar tu equilibrio natural para seguir adelante.'
    }
  },
  // New products for Salud y Bienestar
  {
    id: 'c-lagen',
    name: 'C-Lagen',
    category: 'salud-bienestar',
    shortDescription: 'Colágeno especializado para piel y articulaciones.',
    description: 'C-Lagen es una fórmula avanzada de colágeno hidrolizado diseñada para nutrir tu cuerpo desde adentro.',
    seoTitle: 'Cómo solucionar la flacidez y desgaste articular con C-Lagen',
    seoDescription: 'Nutrición celular profunda con C-Lagen. Fórmula balanceada de colágeno hidrolizado para bienestar integral y calidad certificada. ¡Ahorra ahora!',
    benefits: ['Piel más firme', 'Articulaciones saludables', 'Uñas fuertes'],
    image: '/assets/products/C-lagen.webp',
    basePrice: 93500,
    size: '500 g',
    keywords: 'colágeno hidrolizado, piel firme, arrugas, articulaciones, uñas fuertes, C-Lagen, Unmerco',
    longTailKeywords: [
      'mejor colágeno hidrolizado para eliminar arrugas finas',
      'cómo mejorar la firmeza de la piel de forma natural',
      'suplemento para fortalecer articulaciones y evitar desgaste',
      'beneficios del colágeno especializado para uñas y cabello',
      'fórmula balanceada para nutrición celular y belleza integral',
      'bienestar integral y salud articular con C-Lagen premium',
      'cómo recuperar la elasticidad de la piel con calidad certificada',
      'colágeno de alta autoridad para el cuidado de los tejidos',
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
    testimonials: [],
    whyChoose: {
      title: 'Tu aliado en el equilibrio diario',
      description: 'Mantener tu cuerpo en armonía es la clave para una vida activa. Nuestros productos de salud y bienestar están formulados para apoyar tus funciones vitales de forma natural, ayudándote a recuperar ese equilibrio que te hace sentir bien cada día.'
    }
  },
  {
    id: 'citramix',
    name: 'Citramix',
    category: 'salud-bienestar',
    shortDescription: 'Mezcla cítrica antioxidante y revitalizante.',
    description: 'Citramix combina lo mejor de los cítricos para darte una dosis diaria de vitamina C y energía.',
    seoTitle: 'Cómo solucionar las defensas bajas y falta de energía con Citramix',
    seoDescription: 'Refuerza tu sistema inmune con Citramix. Mezcla cítrica con fórmula balanceada para bienestar integral y calidad certificada. ¡Compra y ahorra!',
    benefits: ['Refuerza defensas', 'Energía natural', 'Antioxidante'],
    image: '/assets/products/Citramix.webp',
    basePrice: 79900,
    size: '300 g',
    keywords: 'vitamina C, defensas, energía cítrica, antioxidante, Citramix, Unmerco',
    longTailKeywords: [
      'mejor suplemento de vitamina C natural para defensas',
      'cómo aumentar la energía diaria con extractos cítricos',
      'mezcla antioxidante natural para prevenir resfriados',
      'beneficios de los cítricos para el bienestar integral diario',
      'fórmula balanceada para fortalecer el sistema inmunológico',
      'vitalidad y protección natural con Citramix Unmerco',
      'cómo mejorar la absorción de hierro con vitamina C cítrica',
      'suplemento de alta autoridad para energía y salud celular',
      'bebida revitalizante natural con calidad certificada',
      'protección contra radicales libres con antioxidantes cítricos'
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
    testimonials: [],
    whyChoose: {
      title: 'Tu aliado en el equilibrio diario',
      description: 'Mantener tu cuerpo en armonía es la clave para una vida activa. Nuestros productos de salud y bienestar están formulados para apoyar tus funciones vitales de forma natural, ayudándote a recuperar ese equilibrio que te hace sentir bien cada día.'
    }
  },
  {
    id: 'coffee-colageno',
    name: 'Coffee + Colágeno',
    category: 'salud-bienestar',
    shortDescription: 'Tu café matutino con beneficios extra.',
    description: 'Disfruta del mejor café colombiano enriquecido con colágeno para tu rutina diaria de belleza.',
    seoTitle: 'Cómo solucionar la piel opaca y falta de vitalidad con Coffee + Colágeno',
    seoDescription: 'Tu ritual de belleza matutino con Coffee + Colágeno. Fórmula balanceada para bienestar integral y calidad certificada. ¡Aprovecha la oferta!',
    benefits: ['Sabor premium', 'Cuidado de la piel', 'Energía matutina'],
    image: '/assets/products/Coffe+colageno.webp',
    basePrice: 75900,
    size: '400 g',
    keywords: 'café con colágeno, belleza matutina, energía y piel, Coffee Colágeno, Unmerco',
    longTailKeywords: [
      'mejor café colombiano con colágeno para la piel',
      'cómo cuidar la piel mientras tomas café por la mañana',
      'suplemento de café con colágeno para vitalidad diaria',
      'beneficios del colágeno hidrolizado en el café matutino',
      'fórmula balanceada para belleza y energía en una taza',
      'bienestar integral y nutrición cutánea con Coffee Colágeno',
      'cómo mejorar el aspecto de la piel con calidad certificada',
      'café funcional de alta autoridad para el cuidado personal',
      'ritual de belleza natural con ingredientes de alta pureza',
      'energía y rejuvenecimiento celular en tu desayuno diario'
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
    testimonials: [],
    whyChoose: {
      title: 'Tu aliado en el equilibrio diario',
      description: 'Mantener tu cuerpo en armonía es la clave para una vida activa. Nuestros productos de salud y bienestar están formulados para apoyar tus funciones vitales de forma natural, ayudándote a recuperar ese equilibrio que te hace sentir bien cada día.'
    }
  },
  {
    id: 'creatina',
    name: 'Creatina 100%',
    category: 'salud-bienestar',
    shortDescription: 'Potencia tu rendimiento físico.',
    description: 'Creatina de alta pureza para mejorar tu fuerza y recuperación muscular.',
    seoTitle: 'Cómo solucionar la falta de fuerza y lenta recuperación con Creatina 100%',
    seoDescription: 'Maximiza tu rendimiento deportivo con Creatina 100% pura. Fórmula balanceada para fuerza y bienestar integral con calidad certificada. ¡Compra y ahorra!',
    benefits: ['Mayor fuerza', 'Recuperación rápida', 'Rendimiento deportivo'],
    image: '/assets/products/creatina100.webp',
    basePrice: 105000,
    size: '500 g',
    keywords: 'creatina pura, fuerza muscular, rendimiento deportivo, recuperación, Unmerco',
    longTailKeywords: [
      'mejor creatina monohidratada para ganar fuerza muscular',
      'cómo mejorar la recuperación muscular después del gimnasio',
      'suplemento de creatina pura para rendimiento deportivo',
      'beneficios de la creatina para el bienestar integral físico',
      'fórmula balanceada para aumentar la potencia en el entrenamiento',
      'creatina de alta autoridad para atletas y deportistas',
      'cómo tomar creatina de forma segura con calidad certificada',
      'suplemento natural para evitar la fatiga muscular intensa',
      'mejorar el rendimiento físico con ingredientes de alta pureza',
      'creatina 100% para optimizar la síntesis de proteína muscular'
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
    testimonials: [],
    whyChoose: {
      title: 'Tu aliado en el equilibrio diario',
      description: 'Mantener tu cuerpo en armonía es la clave para una vida activa. Nuestros productos de salud y bienestar están formulados para apoyar tus funciones vitales de forma natural, ayudándote a recuperar ese equilibrio que te hace sentir bien cada día.'
    }
  },
  {
    id: 'iprossmen',
    name: 'Iprossmen',
    category: 'salud-bienestar',
    shortDescription: 'Bienestar integral y equilibrio.',
    description: 'Suplemento diseñado para el equilibrio diario de tu organismo.',
    seoTitle: 'Cómo solucionar el desequilibrio hormonal y falta de vitalidad con Iprossmen',
    seoDescription: 'Recupera tu equilibrio natural con Iprossmen. Fórmula balanceada para el bienestar integral masculino con calidad certificada. ¡Aprovecha el descuento!',
    benefits: ['Equilibrio natural', 'Bienestar general', 'Fácil consumo'],
    image: '/assets/products/Iprossmen.webp',
    basePrice: 79900,
    size: '500 ml',
    keywords: 'salud masculina, próstata, vitalidad, equilibrio hormonal, bienestar integral, Iprossmen, Unmerco',
    longTailKeywords: [
      'mejor suplemento natural para la salud de la próstata',
      'cómo mejorar la vitalidad masculina de forma natural',
      'suplemento para el equilibrio hormonal en hombres adultos',
      'beneficios de Iprossmen para el bienestar integral diario',
      'fórmula balanceada para mantener la salud urinaria masculina',
      'bienestar integral y energía para el hombre moderno',
      'cómo recuperar el equilibrio natural con calidad certificada',
      'suplemento de alta autoridad para el cuidado masculino',
      'remedio natural para la inflamación de próstata leve',
      'vitalidad y salud reproductiva con ingredientes de alta pureza'
    ],
    seoFaqs: [
      { q: '¿Iprossmen ayuda con la salud de la próstata?', a: 'Sí, su fórmula balanceada está diseñada para apoyar el bienestar integral del sistema reproductor masculino.' },
      { q: '¿A qué edad se recomienda empezar a tomarlo?', a: 'Es ideal para hombres a partir de los 40 años como parte de su rutina de salud preventiva.' },
      { q: '¿Tiene contraindicaciones?', a: 'Es un producto natural con calidad certificada; se recomienda consultar al médico si hay condiciones preexistentes.' }
    ],
    promos: [
      { id: '1u', label: '1 Unidad', units: 1, price: 75900 },
      { id: '2u', label: '2 Unidades', units: 2, price: 113850 },
      { id: '2x3', label: 'Pague 2 Lleve 3', units: 3, price: 151800, badge: '⭐ Recomendado' },
      { id: '3x5', label: 'Pague 3 Lleve 5', units: 5, price: 227700, badge: '🔥 Mejor Oferta' }
    ],
    testimonials: [],
    whyChoose: {
      title: 'Tu aliado en el equilibrio diario',
      description: 'Mantener tu cuerpo en armonía es la clave para una vida activa. Nuestros productos de salud y bienestar están formulados para apoyar tus funciones vitales de forma natural, ayudándote a recuperar ese equilibrio que te hace sentir bien cada día.'
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
    benefits: ['Multivitamínico', 'Vitalidad', 'Salud diaria'],
    image: '/assets/products/Kds10.webp',
    basePrice: 79900,
    size: '500 ml',
    keywords: 'multivitamínico, vitalidad diaria, vitaminas y minerales, KDS 10, Unmerco',
    longTailKeywords: [
      'mejor multivitamínico líquido para adultos y niños',
      'cómo asegurar la ingesta diaria de vitaminas esenciales',
      'suplemento para fortalecer las defensas de toda la familia',
      'beneficios de KDS 10 para el bienestar integral y energía',
      'fórmula balanceada de vitaminas y minerales de alta absorción',
      'bienestar integral y nutrición completa con calidad certificada',
      'cómo mejorar la vitalidad diaria con un multivitamínico natural',
      'suplemento de alta autoridad para evitar deficiencias nutricionales',
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
    testimonials: [],
    whyChoose: {
      title: 'Tu aliado en el equilibrio diario',
      description: 'Mantener tu cuerpo en armonía es la clave para una vida activa. Nuestros productos de salud y bienestar están formulados para apoyar tus funciones vitales de forma natural, ayudándote a recuperar ese equilibrio que te hace sentir bien cada día.'
    }
  },
  {
    id: 'liofhim',
    name: 'Liofhim',
    category: 'salud-bienestar',
    shortDescription: 'Extractos naturales liofilizados.',
    description: 'Tecnología de liofilización para preservar todas las propiedades de los ingredientes naturales.',
    seoTitle: 'Cómo solucionar los síntomas de la menopausia y desequilibrio femenino con Liofhim',
    seoDescription: 'Recupera tu tranquilidad con Liofhim. Fórmula balanceada para el bienestar integral femenino con calidad certificada. ¡Ahorra en tu pedido!',
    benefits: ['Alta pureza', 'Máxima absorción', 'Natural'],
    image: '/assets/products/Liofhim.webp',
    basePrice: 75900,
    size: '30 Cápsulas',
    keywords: 'liofilizado, extractos naturales, alta pureza, Liofhim, Unmerco',
    longTailKeywords: [
      'mejor suplemento natural para los síntomas de la menopausia',
      'cómo aliviar los sofocos y calores nocturnos naturalmente',
      'suplemento para el equilibrio hormonal femenino en la madurez',
      'beneficios de Liofhim para el bienestar integral de la mujer',
      'fórmula balanceada para regular el ciclo y las hormonas',
      'bienestar integral femenino y vitalidad con calidad certificada',
      'cómo mejorar el estado de ánimo durante la menopausia',
      'suplemento de alta autoridad para el cuidado hormonal natural',
      'remedio natural para la irritabilidad y cambios hormonales',
      'salud femenina integral con ingredientes de alta pureza'
    ],
    seoFaqs: [
      { q: '¿Liofhim ayuda con los calores de la menopausia?', a: 'Sí, su fórmula balanceada está diseñada para mitigar los sofocos y promover un bienestar integral femenino.' },
      { q: '¿Es un tratamiento hormonal?', a: 'No, es un suplemento natural que apoya el equilibrio hormonal de forma gentil y segura.' },
      { q: '¿Cuánto tiempo tarda en hacer efecto?', a: 'La mayoría de las mujeres notan una mejora en su tranquilidad y equilibrio natural tras las primeras semanas.' }
    ],
    promos: [
      { id: '1u', label: '1 Unidad', units: 1, price: 75900 },
      { id: '2u', label: '2 Unidades', units: 2, price: 113850 },
      { id: '2x3', label: 'Pague 2 Lleve 3', units: 3, price: 151800, badge: '⭐ Recomendado' },
      { id: '3x5', label: 'Pague 3 Lleve 5', units: 5, price: 227700, badge: '🔥 Mejor Oferta' }
    ],
    testimonials: [],
    whyChoose: {
      title: 'Tu aliado en el equilibrio diario',
      description: 'Mantener tu cuerpo en armonía es la clave para una vida activa. Nuestros productos de salud y bienestar están formulados para apoyar tus funciones vitales de forma natural, ayudándote a recuperar ese equilibrio que te hace sentir bien cada día.'
    }
  },
  {
    id: 'lipoblue',
    name: 'Lipoblue',
    category: 'salud-bienestar',
    shortDescription: 'Apoyo en tu proceso de control de peso.',
    description: 'Lipoblue es un reconocido suplemento para acompañar dietas de control de peso.',
    seoTitle: 'Cómo solucionar el sobrepeso y ansiedad por comer con Lipoblue',
    seoDescription: 'Alcanza tu peso ideal con Lipoblue. Fórmula balanceada para control de apetito y bienestar integral con calidad certificada. ¡Compra segura!',
    benefits: ['Control de apetito', 'Quema de grasa', 'Energía'],
    image: '/assets/products/Lipoblue.webp',
    basePrice: 89900,
    size: '30 Cápsulas',
    keywords: 'adelgazar, quemar grasa, control apetito, Lipoblue, Unmerco',
    longTailKeywords: [
      'mejor quemador de grasa natural para bajar de peso rápido',
      'cómo controlar la ansiedad por comer dulce y harinas',
      'suplemento para reducir medidas y tonificar el cuerpo',
      'beneficios de Lipoblue para el bienestar integral y control de peso',
      'fórmula balanceada para eliminar grasa localizada difícil',
      'bienestar integral y vitalidad durante la pérdida de peso',
      'cómo mejorar el metabolismo de las grasas con calidad certificada',
      'suplemento de alta autoridad para adelgazar de forma segura',
      'remedio natural para la retención de líquidos y sobrepeso',
      'pérdida de peso efectiva con ingredientes de alta pureza'
    ],
    seoFaqs: [
      { q: '¿Cómo ayuda Lipoblue a controlar el apetito?', a: 'Su fórmula balanceada actúa sobre los centros de saciedad, promoviendo un bienestar integral y evitando los atracones.' },
      { q: '¿Cuántas cápsulas debo tomar al día?', a: 'Se recomienda una cápsula diaria antes del desayuno para activar tu metabolismo y vitalidad.' },
      { q: '¿Tiene efecto rebote?', a: 'Al enfocarse en cambios metabólicos naturales y calidad certificada, ayuda a mantener los resultados a largo plazo.' }
    ],
    promos: [
      { id: '1u', label: '1 Unidad', units: 1, price: 89900 },
      { id: '2u', label: '2 Unidades', units: 2, price: 134850 },
      { id: '2x3', label: 'Pague 2 Lleve 3', units: 3, price: 179800, badge: '⭐ Recomendado' },
      { id: '3x5', label: 'Pague 3 Lleve 5', units: 5, price: 269700, badge: '🔥 Mejor Oferta' }
    ],
    testimonials: [],
    whyChoose: {
      title: 'Tu aliado en el equilibrio diario',
      description: 'Mantener tu cuerpo en armonía es la clave para una vida activa. Nuestros productos de salud y bienestar están formulados para apoyar tus funciones vitales de forma natural, ayudándote a recuperar ese equilibrio que te hace sentir bien cada día.'
    }
  },
  {
    id: 'lipetex',
    name: 'Liteplex',
    category: 'salud-bienestar',
    shortDescription: 'Metabolismo activo.',
    description: 'Fórmula diseñada para apoyar un metabolismo saludable.',
    seoTitle: 'Cómo solucionar el metabolismo lento y falta de vitalidad con Liteplex',
    seoDescription: 'Activa tu metabolismo de forma natural con Liteplex. Fórmula balanceada para bienestar integral y calidad certificada. ¡Pídelo ahora!',
    benefits: ['Metabolismo', 'Bienestar', 'Natural'],
    image: '/assets/products/Liteplex.webp',
    basePrice: 79900,
    size: '500 ml',
    keywords: 'metabolismo activo, bienestar natural, Liteplex, Unmerco',
    longTailKeywords: [
      'mejor suplemento líquido para acelerar el metabolismo',
      'cómo mejorar la digestión y el metabolismo naturalmente',
      'suplemento para el bienestar integral y energía metabólica',
      'beneficios de Liteplex para la quema de calorías diaria',
      'fórmula balanceada para un metabolismo activo y saludable',
      'bienestar integral y vitalidad con extractos naturales',
      'cómo recuperar el ritmo metabólico con calidad certificada',
      'suplemento de alta autoridad para el control de peso natural',
      'remedio natural para el metabolismo lento y pesadez',
      'salud metabólica integral con ingredientes de alta pureza'
    ],
    seoFaqs: [
      { q: '¿Liteplex ayuda a quemar grasa?', a: 'Sí, su fórmula balanceada apoya los procesos metabólicos naturales para una mejor utilización de las grasas.' },
      { q: '¿Cómo se debe consumir?', a: 'Se recomienda tomarlo diariamente para mantener un bienestar integral y metabolismo activo.' },
      { q: '¿Es apto para personas con diabetes?', a: 'Es un producto natural con calidad certificada, pero siempre recomendamos consultar a su médico.' }
    ],
    promos: [
      { id: '1u', label: '1 Unidad', units: 1, price: 79900 },
      { id: '2u', label: '2 Unidades', units: 2, price: 119850 },
      { id: '2x3', label: 'Pague 2 Lleve 3', units: 3, price: 159800, badge: '⭐ Recomendado' },
      { id: '3x5', label: 'Pague 3 Lleve 5', units: 5, price: 239700, badge: '🔥 Mejor Oferta' }
    ],
    testimonials: [],
    whyChoose: {
      title: 'Tu aliado en el equilibrio diario',
      description: 'Mantener tu cuerpo en armonía es la clave para una vida activa. Nuestros productos de salud y bienestar están formulados para apoyar tus funciones vitales de forma natural, ayudándote a recuperar ese equilibrio que te hace sentir bien cada día.'
    }
  },
  {
    id: 'maxlite-colageno',
    name: 'Maxlite - Colágeno',
    category: 'salud-bienestar',
    shortDescription: 'Colágeno ligero de alta absorción.',
    description: 'Maxlite offers una opción ligera y efectiva para tu suplementación de colágeno.',
    seoTitle: 'Cómo solucionar el desgaste articular y falta de firmeza con Maxlite - Colágeno',
    seoDescription: 'Nutre tus articulaciones con Maxlite - Colágeno. Fórmula balanceada de alta absorción para bienestar integral y calidad certificada. ¡Compra y ahorra!',
    benefits: ['Ligero', 'Fácil absorción', 'Efectivo'],
    image: '/assets/products/Maxlite.webp',
    basePrice: 89900,
    size: '700 g',
    keywords: 'colágeno ligero, alta absorción, articulaciones, piel, Maxlite, Unmerco',
    longTailKeywords: [
      'mejor colágeno de alta absorción para deportistas',
      'cómo fortalecer las articulaciones sin sentir pesadez',
      'suplemento de colágeno ligero para el cuidado de la piel',
      'beneficios de Maxlite para el bienestar integral articular',
      'fórmula balanceada de colágeno hidrolizado premium',
      'bienestar integral y vitalidad con nutrición de tejidos',
      'cómo mejorar la movilidad articular con calidad certificada',
      'colágeno de alta autoridad para el rendimiento físico diario',
      'suplemento natural para evitar el desgaste de cartílagos',
      'cuidado de la piel y articulaciones con ingredientes puros'
    ],
    seoFaqs: [
      { q: '¿Qué hace a Maxlite diferente de otros colágenos?', a: 'Su fórmula balanceada de alta absorción permite que los nutrientes lleguen más rápido a tus tejidos para un bienestar integral.' },
      { q: '¿Ayuda con el dolor de rodillas?', a: 'Sí, al nutrir el cartílago y las articulaciones, contribuye a una mejor movilidad y vitalidad.' },
      { q: '¿Se disuelve fácilmente?', a: 'Totalmente, está diseñado para una preparación rápida y sin grumos, garantizando calidad certificada.' }
    ],
    promos: [
      { id: '1u', label: '1 Unidad', units: 1, price: 89900 },
      { id: '2u', label: '2 Unidades', units: 2, price: 134850 },
      { id: '2x3', label: 'Pague 2 Lleve 3', units: 3, price: 179800, badge: '⭐ Recomendado' },
      { id: '3x5', label: 'Pague 3 Lleve 5', units: 5, price: 269700, badge: '🔥 Mejor Oferta' }
    ],
    testimonials: [],
    whyChoose: {
      title: 'Tu aliado en el equilibrio diario',
      description: 'Mantener tu cuerpo en armonía es la clave para una vida activa. Nuestros productos de salud y bienestar están formulados para apoyar tus funciones vitales de forma natural, ayudándote a recuperar ese equilibrio que te hace sentir bien cada día.'
    }
  },
  {
    id: 'megamac',
    name: 'Megamac',
    category: 'salud-bienestar',
    shortDescription: 'Energía y vitalidad extrema.',
    description: 'Megamac es el aliado perfecto para días exigentes.',
    seoTitle: 'Cómo solucionar el cansancio extremo y falta de rendimiento con Megamac',
    seoDescription: 'Potencia tu energía con Megamac. Fórmula balanceada para vitalidad extrema, bienestar integral y calidad certificada. ¡Pídelo hoy!',
    benefits: ['Energía', 'Vitalidad', 'Rendimiento'],
    image: '/assets/products/Megamac.webp',
    basePrice: 89900,
    size: '500 ml',
    keywords: 'energía extrema, vitalidad, rendimiento, Megamac, Unmerco',
    longTailKeywords: [
      'mejor suplemento natural para el cansancio físico y mental',
      'cómo aumentar el rendimiento en días de alta exigencia',
      'suplemento para la vitalidad extrema y energía duradera',
      'beneficios de Megamac para el bienestar integral diario',
      'fórmula balanceada para combatir la fatiga crónica naturalmente',
      'bienestar integral y potencia con extractos revitalizantes',
      'cómo recuperar la energía perdida con calidad certificada',
      'suplemento de alta autoridad para el rendimiento deportivo',
      'remedio natural para el agotamiento y falta de concentración',
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
    testimonials: [],
    whyChoose: {
      title: 'Tu aliado en el equilibrio diario',
      description: 'Mantener tu cuerpo en armonía es la clave para una vida activa. Nuestros productos de salud y bienestar están formulados para apoyar tus funciones vitales de forma natural, ayudándote a recuperar ese equilibrio que te hace sentir bien cada día.'
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
    keywords: 'resveratrol, antioxidante, antiedad, cuidado celular, Unmerco',
    longTailKeywords: [
      'mejor antioxidante natural para prevenir el envejecimiento',
      'cómo proteger las células del daño oxidativo con resveratrol',
      'suplemento de resveratrol líquido para máxima absorción',
      'beneficios del resveratrol para el bienestar integral y piel',
      'fórmula balanceada antiedad con ingredientes naturales',
      'bienestar integral y longevidad con calidad certificada',
      'cómo mejorar la salud cardiovascular con resveratrol puro',
      'suplemento de alta autoridad para el cuidado celular diario',
      'remedio natural para combatir los radicales libres efectivamente',
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
    testimonials: []
  },
  // Belleza Integral
  {
    id: 'eventone',
    name: 'Eventone',
    category: 'belleza-integral',
    shortDescription: 'Unifica el tono de tu piel.',
    description: 'Fórmula especializada para ayudar a reducir manchas y unificar el tono natural de tu piel.',
    seoTitle: 'Cómo solucionar las manchas en la piel y tono desigual con Eventone',
    seoDescription: 'Recupera la claridad de tu piel con Eventone. Fórmula balanceada para unificar el tono, bienestar integral y calidad certificada. ¡Ahorra hoy!',
    benefits: ['Unifica el tono', 'Reduce manchas', 'Piel radiante'],
    image: '/assets/products/Eventone.webp',
    basePrice: 85000,
    size: '50 ml',
    keywords: 'unificar tono piel, quitar manchas, piel radiante, Eventone, Unmerco',
    longTailKeywords: [
      'mejor crema para quitar manchas de sol en la cara',
      'cómo unificar el tono de la piel de forma natural y segura',
      'tratamiento para reducir la hiperpigmentación y pecas',
      'beneficios de Eventone para el bienestar integral de la piel',
      'fórmula balanceada para una piel radiante y sin manchas',
      'bienestar integral cutáneo con aclarantes naturales premium',
      'cómo recuperar la luminosidad del rostro con calidad certificada',
      'crema de alta autoridad para el cuidado facial diario',
      'remedio natural para manchas de acné y edad en la piel',
      'piel perfecta y tono uniforme con ingredientes de alta pureza'
    ],
    seoFaqs: [
      { q: '¿Eventone sirve para todo tipo de manchas?', a: 'Es muy efectiva para manchas solares y de edad, promoviendo un tono uniforme y bienestar integral.' },
      { q: '¿Se debe usar solo de noche?', a: 'Se recomienda su uso nocturno para que su fórmula balanceada actúe profundamente durante el descanso.' },
      { q: '¿Contiene químicos agresivos?', a: 'No, priorizamos ingredientes seguros con calidad certificada para cuidar tu equilibrio natural.' }
    ],
    promos: [
      { id: '1u', label: '1 Unidad', units: 1, price: 85000 },
      { id: '2u', label: '2 Unidades', units: 2, price: 127500 },
      { id: '2x3', label: 'Pague 2 Lleve 3', units: 3, price: 170000, badge: '⭐ Recomendado' },
      { id: '3x5', label: 'Pague 3 Lleve 5', units: 5, price: 255000, badge: '🔥 Mejor Oferta' }
    ],
    testimonials: [],
    whyChoose: {
      title: 'Belleza que nace desde tu interior',
      description: 'Cuidar tu apariencia es también cuidar tu salud. Nuestros productos de belleza integral nutren tu cuerpo desde adentro, ayudándote a proyectar esa vitalidad y equilibrio natural que te hace sentir radiante y segura en cada momento.'
    }
  },
  {
    id: 'golden-passion',
    name: 'Golden Passion',
    category: 'belleza-integral',
    shortDescription: 'Brillo y nutrición dorada.',
    description: 'Tratamiento premium para una piel nutrida con un acabado luminoso y saludable.',
    seoTitle: 'Cómo solucionar la piel opaca y falta de nutrición con Golden Passion',
    seoDescription: 'Dale a tu piel un brillo dorado y nutrición profunda con Golden Passion. Fórmula balanceada para bienestar integral y calidad certificada. ¡Compra ahora!',
    benefits: ['Nutrición profunda', 'Brillo natural', 'Textura suave'],
    image: '/assets/products/Goldenpassion.webp',
    basePrice: 79900,
    size: '100 ml',
    keywords: 'brillo piel, nutrición profunda, piel dorada, Golden Passion, Unmerco',
    longTailKeywords: [
      'mejor aceite corporal para un brillo dorado natural',
      'cómo nutrir la piel seca y darle luminosidad',
      'tratamiento premium para una piel radiante y suave',
      'beneficios de Golden Passion para el bienestar integral cutáneo',
      'fórmula balanceada para una nutrición profunda de la piel',
      'bienestar integral y vitalidad con brillo saludable',
      'cómo mejorar la textura de la piel con calidad certificada',
      'aceite de alta autoridad para el cuidado corporal diario',
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
    testimonials: [],
    whyChoose: {
      title: 'Belleza que nace desde tu interior',
      description: 'Cuidar tu apariencia es también cuidar tu salud. Nuestros productos de belleza integral nutren tu cuerpo desde adentro, ayudándote a proyectar esa vitalidad y equilibrio natural que te hace sentir radiante y segura en cada momento.'
    }
  },
  {
    id: 'hydrastrik',
    name: 'Hydrastrik',
    category: 'belleza-integral',
    shortDescription: 'Hidratación intensiva.',
    description: 'Potente hidratante diseñado para pieles que necesitan un extra de humedad y frescura.',
    seoTitle: 'Cómo solucionar la piel seca y deshidratada con Hydrastrik',
    seoDescription: 'Hidratación intensiva 24h con Hydrastrik. Fórmula balanceada para una piel elástica, bienestar integral y calidad certificada. ¡Pídela hoy!',
    benefits: ['Hidratación 24h', 'Frescura inmediata', 'Piel elástica'],
    image: '/assets/products/Hydrastrik.webp',
    basePrice: 82500,
    size: '50 ml',
    keywords: 'hidratación intensiva, piel seca, frescura, Hydrastrik, Unmerco',
    longTailKeywords: [
      'mejor crema hidratante para piel muy seca y sensible',
      'cómo mantener la piel hidratada durante 24 horas',
      'tratamiento para recuperar la elasticidad de la piel naturalmente',
      'beneficios de Hydrastrik para el bienestar integral facial',
      'fórmula balanceada para una hidratación profunda y fresca',
      'bienestar integral y vitalidad cutánea con hidratación intensa',
      'cómo calmar la sed de la piel con calidad certificada',
      'crema de alta autoridad para el cuidado de pieles secas',
      'remedio natural para la descamación y falta de humedad',
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
    testimonials: [],
    whyChoose: {
      title: 'Belleza que nace desde tu interior',
      description: 'Cuidar tu apariencia es también cuidar tu salud. Nuestros productos de belleza integral nutren tu cuerpo desde adentro, ayudándote a proyectar esa vitalidad y equilibrio natural que te hace sentir radiante y segura en cada momento.'
    }
  },
  {
    id: 'miskinne',
    name: 'Miskinne',
    category: 'belleza-integral',
    shortDescription: 'Cuidado delicado para tu piel.',
    description: 'Suavidad y protección diaria para mantener tu piel joven y saludable.',
    seoTitle: 'Cómo solucionar la irritación y falta de suavidad con Miskinne',
    seoDescription: 'Cuidado delicado y protección diaria con Miskinne. Fórmula balanceada para una piel joven, bienestar integral y calidad certificada. ¡Compra ahora!',
    benefits: ['Suavidad extrema', 'Protección diaria', 'Ingredientes naturales'],
    image: '/assets/products/Miskinne.webp',
    basePrice: 59900,
    size: '200 ml',
    keywords: 'cuidado piel, suavidad, protección diaria, Miskinne, Unmerco',
    longTailKeywords: [
      'mejor crema corporal para pieles delicadas y sensibles',
      'cómo proteger la piel de las agresiones diarias naturalmente',
      'tratamiento para mantener la suavidad extrema de la piel',
      'beneficios de Miskinne para el bienestar integral corporal',
      'fórmula balanceada con ingredientes naturales para el cuidado diario',
      'bienestar integral y vitalidad con una piel siempre joven',
      'cómo mejorar la salud cutánea con calidad certificada',
      'crema de alta autoridad para el cuidado de toda la familia',
      'remedio natural para la piel áspera y falta de frescura',
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
    testimonials: [],
    whyChoose: {
      title: 'Belleza que nace desde tu interior',
      description: 'Cuidar tu apariencia es también cuidar tu salud. Nuestros productos de belleza integral nutren tu cuerpo desde adentro, ayudándote a proyectar esa vitalidad y equilibrio natural que te hace sentir radiante y segura en cada momento.'
    }
  },
  {
    id: 'tonico-capilar',
    name: 'Tónico Capilar',
    category: 'belleza-integral',
    shortDescription: 'Fortalece tu cabello desde la raíz.',
    description: 'Tratamiento revitalizante para prevenir la caída y estimular el crecimiento saludable.',
    seoTitle: 'Cómo solucionar la caída del cabello y falta de crecimiento con Tónico Capilar',
    seoDescription: 'Fortalece tu cabello desde la raíz con nuestro Tónico Capilar. Fórmula balanceada para vitalidad, bienestar integral y calidad certificada. ¡Pídelo hoy!',
    benefits: ['Estimula el crecimiento', 'Fortalece la raíz', 'Brillo y sedosidad'],
    image: '/assets/products/Tonico.webp',
    basePrice: 89900,
    size: '120 ml',
    keywords: 'caída cabello, crecimiento capilar, fortalecer raíz, tónico capilar, Unmerco',
    longTailKeywords: [
      'mejor tónico capilar para evitar la caída del cabello',
      'cómo estimular el crecimiento del cabello de forma natural',
      'tratamiento para fortalecer la raíz del pelo y dar brillo',
      'beneficios del tónico capilar para el bienestar integral del cuero cabelludo',
      'fórmula balanceada para un cabello más fuerte y sedoso',
      'bienestar integral y vitalidad capilar con calidad certificada',
      'cómo recuperar el volumen del cabello con ingredientes naturales',
      'tónico de alta autoridad para el cuidado capilar diario',
      'remedio natural para el cabello débil y quebradizo',
      'crecimiento saludable del cabello con ingredientes de alta pureza'
    ],
    seoFaqs: [
      { q: '¿Cada cuánto debo aplicar el tónico capilar?', a: 'Se recomienda su uso diario para que la fórmula balanceada nutra la raíz y promueva el bienestar integral.' },
      { q: '¿Deja el cabello grasoso?', a: 'No, su textura ligera se absorbe rápidamente sin afectar el brillo y vitalidad natural.' },
      { q: '¿Sirve para hombres y mujeres?', a: 'Es un tratamiento de calidad certificada efectivo para cualquier persona que busque fortalecer su cabello.' }
    ],
    promos: [
      { id: '1u', label: '1 Unidad', units: 1, price: 89900 },
      { id: '2u', label: '2 Unidades', units: 2, price: 134850 },
      { id: '2x3', label: 'Pague 2 Lleve 3', units: 3, price: 179800, badge: '⭐ Recomendado' },
      { id: '3x5', label: 'Pague 3 Lleve 5', units: 5, price: 269700, badge: '🔥 Mejor Oferta' }
    ],
    testimonials: [],
    whyChoose: {
      title: 'Belleza que nace desde tu interior',
      description: 'Cuidar tu apariencia es también cuidar tu salud. Nuestros productos de belleza integral nutren tu cuerpo desde adentro, ayudándote a proyectar esa vitalidad y equilibrio natural que te hace sentir radiante y segura en cada momento.'
    }
  },
  {
    id: 'tufoff',
    name: 'Tufoff',
    category: 'belleza-integral',
    shortDescription: 'Limpieza y frescura total.',
    description: 'Producto especializado para una sensación de limpieza profunda y duradera.',
    seoTitle: 'Cómo solucionar el mal olor y falta de frescura con Tufoff',
    seoDescription: 'Limpieza y frescura total con Tufoff. Fórmula balanceada para bienestar integral y calidad certificada. ¡Siéntete seguro siempre!',
    benefits: ['Limpieza profunda', 'Frescura duradera', 'Cuidado suave'],
    image: '/assets/products/Tuffof.webp',
    basePrice: 85000,
    size: '250 ml',
    keywords: 'limpieza profunda, frescura, higiene, Tufoff, Unmerco',
    longTailKeywords: [
      'mejor producto para eliminar el mal olor corporal eficazmente',
      'cómo mantener la frescura durante todo el día naturalmente',
      'tratamiento para una limpieza profunda y cuidado suave',
      'beneficios de Tufoff para el bienestar integral e higiene',
      'fórmula balanceada para una sensación de frescura duradera',
      'bienestar integral y vitalidad con higiene de alta autoridad',
      'cómo mejorar la confianza personal con calidad certificada',
      'producto de alta autoridad para el cuidado personal diario',
      'remedio natural para el mal olor y falta de higiene',
      'frescura total y segura con ingredientes de alta pureza'
    ],
    seoFaqs: [
      { q: '¿Tufoff es un desodorante?', a: 'Es un producto de limpieza profunda que complementa tu higiene para un bienestar integral y frescura duradera.' },
      { q: '¿Se puede usar en zonas sensibles?', a: 'Su fórmula balanceada es de cuidado suave, pero siempre recomendamos probar en una pequeña zona.' },
      { q: '¿Cuánto dura el efecto?', a: 'Brinda una sensación de vitalidad y frescura que te acompaña durante tus actividades diarias.' }
    ],
    promos: [
      { id: '1u', label: '1 Unidad', units: 1, price: 85000 },
      { id: '2u', label: '2 Unidades', units: 2, price: 127500 },
      { id: '2x3', label: 'Pague 2 Lleve 3', units: 3, price: 170000, badge: '⭐ Recomendado' },
      { id: '3x5', label: 'Pague 3 Lleve 5', units: 5, price: 255000, badge: '🔥 Mejor Oferta' }
    ],
    testimonials: [],
    whyChoose: {
      title: 'Belleza que nace desde tu interior',
      description: 'Cuidar tu apariencia es también cuidar tu salud. Nuestros productos de belleza integral nutren tu cuerpo desde adentro, ayudándote a proyectar esa vitalidad y equilibrio natural que te hace sentir radiante y segura en cada momento.'
    }
  },
  // Salud Sexual
  {
    id: 'akha',
    name: 'Akha',
    category: 'salud-sexual',
    shortDescription: 'Potencia y vitalidad natural.',
    description: 'Suplemento diseñado para mejorar el rendimiento y la energía de forma natural.',
    seoTitle: 'Cómo solucionar la falta de energía y rendimiento con Akha',
    seoDescription: 'Potencia tu vitalidad natural con Akha. Fórmula balanceada para mayor rendimiento, bienestar integral y calidad certificada. ¡Compra segura!',
    benefits: ['Mayor energía', 'Rendimiento mejorado', 'Vitalidad natural'],
    image: '/assets/products/akha.webp',
    basePrice: 89900,
    size: '60 Cápsulas',
    keywords: 'potencia sexual, rendimiento, vitalidad masculina, Akha, Unmerco',
    longTailKeywords: [
      'mejor suplemento natural para la potencia y energía masculina',
      'cómo mejorar el rendimiento físico de forma natural y segura',
      'suplemento para la vitalidad natural y energía diaria',
      'beneficios de Akha para el bienestar integral masculino',
      'fórmula balanceada para potenciar el rendimiento y la fuerza',
      'bienestar integral y vitalidad con ingredientes de alta autoridad',
      'cómo recuperar la chispa natural con calidad certificada',
      'suplemento de alta autoridad para la salud sexual masculina',
      'remedio natural para la falta de energía y bajo rendimiento',
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
    testimonials: [],
    whyChoose: {
      title: 'Recupera tu vitalidad y confianza',
      description: 'El bienestar íntimo es fundamental para una vida plena. Nuestras soluciones naturales están diseñadas para potenciar tu energía y equilibrio natural, permitiéndote disfrutar de cada momento con la confianza y vitalidad que mereces.'
    }
  },
  {
    id: 'derman',
    name: 'Derman',
    category: 'salud-sexual',
    shortDescription: 'Cuidado y bienestar íntimo.',
    description: 'Producto especializado para el cuidado y la salud en momentos íntimos.',
    seoTitle: 'Cómo solucionar la falta de confianza y bienestar íntimo con Derman',
    seoDescription: 'Cuida tu salud íntima con Derman. Fórmula balanceada para un bienestar integral, frescura y calidad certificada. ¡Siéntete segura hoy!',
    benefits: ['Cuidado suave', 'Bienestar íntimo', 'Natural'],
    image: '/assets/products/Derman.webp',
    basePrice: 89900,
    size: '120 ml',
    keywords: 'bienestar íntimo, cuidado suave, salud sexual, Derman, Unmerco',
    longTailKeywords: [
      'mejor producto natural para el cuidado íntimo femenino',
      'cómo mejorar el bienestar íntimo de forma segura y suave',
      'tratamiento para mantener la frescura y salud sexual natural',
      'beneficios de Derman para el bienestar integral íntimo',
      'fórmula balanceada para el cuidado delicado de la mujer',
      'bienestar integral y vitalidad en momentos de intimidad',
      'cómo recuperar la confianza íntima con calidad certificada',
      'producto de alta autoridad para la higiene íntima diaria',
      'remedio natural para la irritación y falta de confort íntimo',
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
    testimonials: [],
    whyChoose: {
      title: 'Recupera tu vitalidad y confianza',
      description: 'El bienestar íntimo es fundamental para una vida plena. Nuestras soluciones naturales están diseñadas para potenciar tu energía y equilibrio natural, permitiéndote disfrutar de cada momento con la confianza y vitalidad que mereces.'
    }
  },
  {
    id: 'haydar',
    name: 'Haydar',
    category: 'salud-sexual',
    shortDescription: 'Energía y rendimiento superior.',
    description: 'Fórmula avanzada para potenciar tu vitalidad diaria.',
    seoTitle: 'Cómo solucionar la falta de rendimiento y energía superior con Haydar',
    seoDescription: 'Potencia tu vitalidad diaria con Haydar. Fórmula balanceada para un rendimiento superior, bienestar integral y calidad certificada. ¡Compra ahora!',
    benefits: ['Energía constante', 'Rendimiento superior', 'Natural'],
    image: '/assets/products/haydar.webp',
    basePrice: 73500,
    size: '60 Cápsulas',
    keywords: 'energía sexual, rendimiento superior, vitalidad, Haydar, Unmerco',
    longTailKeywords: [
      'mejor suplemento natural para el rendimiento superior masculino',
      'cómo mantener la energía constante durante todo el día',
      'suplemento para la vitalidad y potencia de forma natural',
      'beneficios de Haydar para el bienestar integral y rendimiento',
      'fórmula balanceada para potenciar la energía física y mental',
      'bienestar integral y vitalidad con ingredientes de alta autoridad',
      'cómo mejorar el desempeño diario con calidad certificada',
      'suplemento de alta autoridad para la salud masculina integral',
      'remedio natural para el cansancio y bajo rendimiento sexual',
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
    testimonials: [],
    whyChoose: {
      title: 'Recupera tu vitalidad y confianza',
      description: 'El bienestar íntimo es fundamental para una vida plena. Nuestras soluciones naturales están diseñadas para potenciar tu energía y equilibrio natural, permitiéndote disfrutar de cada momento con la confianza y vitalidad que mereces.'
    }
  },
  {
    id: 'instant-virgin',
    name: 'Instant Virgin',
    category: 'salud-sexual',
    shortDescription: 'Bienestar and confianza femenina.',
    description: 'Producto diseñado para la salud and el bienestar íntimo femenino.',
    seoTitle: 'Cómo solucionar la falta de plenitud y confianza femenina con Instant Virgin',
    seoDescription: 'Recupera tu bienestar íntimo con Instant Virgin. Fórmula balanceada para la confianza femenina, bienestar integral y calidad certificada. ¡Pídelo hoy!',
    benefits: ['Confianza', 'Bienestar', 'Cuidado especializado'],
    image: '/assets/products/Instantvirgin.webp',
    basePrice: 79000,
    size: '50 ml',
    keywords: 'confianza femenina, bienestar íntimo, salud sexual mujer, Instant Virgin, Unmerco',
    longTailKeywords: [
      'mejor producto para recuperar la confianza femenina naturalmente',
      'cómo mejorar el bienestar íntimo y plenitud de la mujer',
      'tratamiento especializado para la salud sexual femenina',
      'beneficios de Instant Virgin para el bienestar integral íntimo',
      'fórmula balanceada para el cuidado y confort de la mujer',
      'bienestar integral y vitalidad en la vida íntima femenina',
      'cómo sentirse plena y segura con calidad certificada',
      'producto de alta autoridad para el cuidado íntimo especializado',
      'remedio natural para la falta de confianza y bienestar sexual',
      'salud femenina segura con ingredientes de alta pureza y eficacia'
    ],
    seoFaqs: [
      { q: '¿Instant Virgin es de uso externo?', a: 'Sí, su aplicación es externa y está diseñada para brindar bienestar integral y confianza femenina.' },
      { q: '¿Cuánto tiempo dura el efecto?', a: 'Proporciona una sensación de confort y vitalidad que te permite vivir tu plenitud con seguridad.' },
      { q: '¿Es compatible con otros productos?', a: 'Su fórmula balanceada es gentil, pero siempre recomendamos consultar si usas tratamientos específicos.' }
    ],
    promos: [
      { id: '1u', label: '1 Unidad', units: 1, price: 79000 },
      { id: '2u', label: '2 Unidades', units: 2, price: 118500 },
      { id: '2x3', label: 'Pague 2 Lleve 3', units: 3, price: 158000, badge: '⭐ Recomendado' },
      { id: '3x5', label: 'Pague 3 Lleve 5', units: 5, price: 237000, badge: '🔥 Mejor Oferta' }
    ],
    testimonials: [],
    whyChoose: {
      title: 'Recupera tu vitalidad y confianza',
      description: 'El bienestar íntimo es fundamental para una vida plena. Nuestras soluciones naturales están diseñadas para potenciar tu energía y equilibrio natural, permitiéndote disfrutar de cada momento con la confianza y vitalidad que mereces.'
    }
  },
  {
    id: 'mamooth',
    name: 'Mamooth',
    category: 'salud-sexual',
    shortDescription: 'Fuerza y vitalidad masculina.',
    description: 'Suplemento potente para el rendimiento masculino.',
    seoTitle: 'Cómo solucionar la falta de fuerza y vitalidad masculina con Mamooth',
    seoDescription: 'Despierta tu fuerza interior con Mamooth. Fórmula balanceada para rendimiento masculino, bienestar integral y calidad certificada. ¡Compra ahora!',
    benefits: ['Fuerza', 'Vitalidad', 'Rendimiento'],
    image: '/assets/products/Mammoth.webp',
    basePrice: 89000,
    size: '60 Cápsulas',
    keywords: 'fuerza masculina, rendimiento, vitalidad, Mamooth, Unmerco',
    longTailKeywords: [
      'mejor suplemento para aumentar la fuerza y vitalidad masculina',
      'cómo mejorar el rendimiento físico y potencia naturalmente',
      'suplemento para la fuerza interior y energía del hombre',
      'beneficios de Mamooth para el bienestar integral masculino',
      'fórmula balanceada para potenciar el desempeño y la fuerza',
      'bienestar integral y vitalidad con ingredientes de alta potencia',
      'cómo elevar el rendimiento masculino con calidad certificada',
      'suplemento de alta autoridad para la potencia y salud sexual',
      'remedio natural para la debilidad y falta de vigor masculino',
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
    testimonials: [],
    whyChoose: {
      title: 'Recupera tu vitalidad y confianza',
      description: 'El bienestar íntimo es fundamental para una vida plena. Nuestras soluciones naturales están diseñadas para potenciar tu energía y equilibrio natural, permitiéndote disfrutar de cada momento con la confianza y vitalidad que mereces.'
    }
  },
  {
    id: 'tyruss-full',
    name: 'Tyruss Full',
    category: 'salud-sexual',
    shortDescription: 'Energía total y rendimiento.',
    description: 'Fórmula completa para la vitalidad y el desempeño diario.',
    seoTitle: 'Cómo solucionar la falta de energía total y rendimiento con Tyruss Full',
    seoDescription: 'Potencia tu desempeño diario con Tyruss Full. Fórmula balanceada para vitalidad total, bienestar integral y calidad certificada. ¡Pídelo hoy!',
    benefits: ['Energía total', 'Rendimiento', 'Vitalidad'],
    image: '/assets/products/Tyrussfull.webp',
    basePrice: 89900,
    size: '500 ml',
    keywords: 'energía total, rendimiento diario, vitalidad, Tyruss Full, Unmerco',
    longTailKeywords: [
      'mejor suplemento líquido para energía total y rendimiento',
      'cómo mejorar el desempeño diario de forma natural y efectiva',
      'suplemento para la vitalidad sin límites y energía constante',
      'beneficios de Tyruss Full para el bienestar integral diario',
      'fórmula balanceada para potenciar el ritmo de vida exigente',
      'bienestar integral y vitalidad con nutrición de alta autoridad',
      'cómo mantener el rendimiento diario con calidad certificada',
      'suplemento de alta autoridad para la energía y salud masculina',
      'remedio natural para el cansancio y falta de vitalidad diaria',
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
    testimonials: [],
    whyChoose: {
      title: 'Recupera tu vitalidad y confianza',
      description: 'El bienestar íntimo es fundamental para una vida plena. Nuestras soluciones naturales están diseñadas para potenciar tu energía y equilibrio natural, permitiéndote disfrutar de cada momento con la confianza y vitalidad que mereces.'
    }
  },
  {
    id: 'zafir-energizante',
    name: 'Zafir Energizante',
    category: 'salud-sexual',
    shortDescription: 'Impulso de energía natural.',
    description: 'Bebida energizante natural para momentos de alta exigencia.',
    seoTitle: 'Cómo solucionar la falta de impulso y energía rápida con Zafir Energizante',
    seoDescription: 'Activa tu vitalidad con Zafir Energizante. Fórmula balanceada para un impulso natural, bienestar integral y calidad certificada. ¡Compra ahora!',
    benefits: ['Impulso natural', 'Energía rápida', 'Vitalidad'],
    image: '/assets/products/Zafir.webp',
    basePrice: 73500,
    size: '500 ml',
    keywords: 'energizante natural, vitalidad, energía rápida, Zafir, Unmerco',
    longTailKeywords: [
      'mejor bebida energizante natural para momentos de exigencia',
      'cómo obtener un impulso de energía rápida de forma saludable',
      'suplemento para la vitalidad y enfoque en instantes críticos',
      'beneficios de Zafir para el bienestar integral y energía',
      'fórmula balanceada para un impulso natural sin efectos secundarios',
      'bienestar integral y vitalidad con energía de alta autoridad',
      'cómo mejorar el enfoque mental con calidad certificada',
      'bebida de alta autoridad para el rendimiento en el trabajo',
      'remedio natural para el agotamiento repentino y falta de ganas',
      'impulso de energía seguro con ingredientes de alta pureza'
    ],
    seoFaqs: [
      { q: '¿Zafir da taquicardia?', a: 'No, su fórmula balanceada brinda un impulso natural de vitalidad sin los excesos de estimulantes químicos.' },
      { q: '¿Cuánto tiempo dura el efecto de energía?', a: 'Proporciona una energía rápida y bienestar integral que te ayuda a superar momentos de alta exigencia.' },
      { q: '¿Lo pueden tomar estudiantes?', a: 'Es ideal para épocas de exámenes o trabajo intenso, apoyando tu equilibrio natural y enfoque.' }
    ],
    promos: [
      { id: '1u', label: '1 Unidad', units: 1, price: 73500 },
      { id: '2u', label: '2 Unidades', units: 2, price: 110250 },
      { id: '2x3', label: 'Pague 2 Lleve 3', units: 3, price: 147000, badge: '⭐ Recomendado' },
      { id: '3x5', label: 'Pague 3 Lleve 5', units: 5, price: 220500, badge: '🔥 Mejor Oferta' }
    ],
    testimonials: [],
    whyChoose: {
      title: 'Recupera tu vitalidad y confianza',
      description: 'El bienestar íntimo es fundamental para una vida plena. Nuestras soluciones naturales están diseñadas para potenciar tu energía y equilibrio natural, permitiéndote disfrutar de cada momento con la confianza y vitalidad que mereces.'
    }
  },
  {
    id: 'zeuss',
    name: 'Zeus',
    category: 'salud-sexual',
    shortDescription: 'Poder y vitalidad.',
    description: 'Suplemento avanzado para el rendimiento and la salud masculina.',
    seoTitle: 'Cómo solucionar el bajo rendimiento y falta de salud masculina con Zeus',
    seoDescription: 'Domina tu día con el poder de Zeus. Fórmula balanceada para vitalidad, bienestar integral y calidad certificada. ¡Aprovecha la oferta!',
    benefits: ['Poder', 'Vitalidad', 'Salud'],
    image: 'https://zenhogar.live/assets/products/Zeus.webp',
    basePrice: 85000,
    size: '60 Cápsulas',
    keywords: 'poder masculino, vitalidad, salud sexual, Zeus, Unmerco',
    longTailKeywords: [
      'mejor suplemento avanzado para la salud masculina integral',
      'cómo potenciar el poder y vitalidad del hombre naturalmente',
      'suplemento para el rendimiento superior y salud sexual',
      'beneficios de Zeus para el bienestar integral masculino',
      'fórmula balanceada para dominar el día con energía y poder',
      'bienestar integral y vitalidad con ingredientes de alta autoridad',
      'cómo mejorar la salud masculina con calidad certificada',
      'suplemento de alta autoridad para el hombre moderno y activo',
      'remedio natural para la falta de vigor y salud reproductiva',
      'poder y vitalidad segura con ingredientes de alta pureza'
    ],
    seoFaqs: [
      { q: '¿Zeus ayuda con la salud reproductiva?', a: 'Sí, su fórmula balanceada está diseñada para apoyar el bienestar integral y salud masculina.' },
      { q: '¿Es un tratamiento de largo plazo?', a: 'Se recomienda como parte de tu rutina de vitalidad para mantener un equilibrio natural constante.' },
      { q: '¿Qué lo diferencia de otros suplementos?', a: 'Su combinación de ingredientes avanzados y calidad certificada para un rendimiento superior.' }
    ],
    promos: [
      { id: '1u', label: '1 Unidad', units: 1, price: 85000 },
      { id: '2u', label: '2 Unidades', units: 2, price: 127500 },
      { id: '2x3', label: 'Pague 2 Lleve 3', units: 3, price: 170000, badge: '⭐ Recomendado' },
      { id: '3x5', label: 'Pague 3 Lleve 5', units: 5, price: 255000, badge: '🔥 Mejor Oferta' }
    ],
    testimonials: [],
    whyChoose: {
      title: 'Recupera tu vitalidad y confianza',
      description: 'El bienestar íntimo es fundamental para una vida plena. Nuestras soluciones naturales están diseñadas para potenciar tu energía y equilibrio natural, permitiéndote disfrutar de cada momento con la confianza y vitalidad que mereces.'
    }
  },
  {
    id: 'nad-1',
    name: '+NAD',
    category: 'salud-bienestar',
    shortDescription: 'Apoyo celular y longevidad.',
    description: 'Fórmula avanzada para potenciar los niveles de NAD+ y apoyar la salud celular.',
    seoTitle: 'Cómo solucionar el envejecimiento celular y falta de energía con +NAD',
    seoDescription: 'Potencia tus niveles de NAD+ y apoya tu salud celular con +NAD. Fórmula balanceada para longevidad, bienestar integral y calidad certificada. ¡Compra ahora!',
    benefits: ['Energía celular', 'Longevidad', 'Salud cognitiva'],
    image: '/assets/products/+nad.webp',
    basePrice: 79900,
    size: '60 Cápsulas',
    keywords: 'longevidad, energía celular, salud cognitiva, +NAD, Unmerco',
    longTailKeywords: [
      'mejor suplemento para aumentar los niveles de NAD+ naturalmente',
      'cómo mejorar la energía celular y longevidad activa',
      'suplemento para la salud cognitiva y enfoque mental',
      'beneficios de +NAD para el bienestar integral celular',
      'fórmula balanceada para potenciar la juventud desde adentro',
      'bienestar integral y vitalidad con nutrición de alta autoridad',
      'cómo proteger las células del envejecimiento con calidad certificada',
      'suplemento de alta autoridad para la salud cerebral y física',
      'remedio natural para la falta de energía y deterioro cognitivo',
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
    testimonials: []
  },
  {
    id: 'titan-coffee',
    name: 'Titan Coffee',
    category: 'salud-sexual',
    shortDescription: 'Energía y potencia masculina.',
    description: 'Café enriquecido con extractos naturales para potenciar la vitalidad y el rendimiento.',
    seoTitle: 'Cómo solucionar la falta de energía y potencia masculina con Titan Coffee',
    seoDescription: 'Disfruta de tu café con un plus de vitalidad. Titan Coffee: fórmula balanceada para rendimiento, bienestar integral y calidad certificada. ¡Pruébalo hoy!',
    benefits: ['Mayor energía', 'Rendimiento mejorado', 'Sabor excepcional'],
    image: '/assets/products/Titancoffee.webp', // Placeholder
    basePrice: 89900,
    size: '200g',
    keywords: 'café energizante, potencia masculina, vitalidad, Titan Coffee, Unmerco',
    longTailKeywords: [
      'mejor café enriquecido para la potencia y energía masculina',
      'cómo mejorar el rendimiento diario con una taza de café',
      'café con extractos naturales para la vitalidad y fuerza',
      'beneficios de Titan Coffee para el bienestar integral masculino',
      'fórmula balanceada para un impulso de energía natural y sabroso',
      'bienestar integral y vitalidad con nutrición de alta autoridad',
      'cómo potenciar el rendimiento masculino con calidad certificada',
      'café de alta autoridad para el hombre activo y exigente',
      'remedio natural para la falta de vigor y energía matutina',
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
    testimonials: [],
    whyChoose: {
      title: 'Recupera tu vitalidad y confianza',
      description: 'El bienestar íntimo es fundamental para una vida plena. Nuestras soluciones naturales están diseñadas para potenciar tu energía y equilibrio natural, permitiéndote disfrutar de cada momento con la confianza y vitalidad que mereces.'
    }
  },
  {
    id: 'hemocream',
    name: 'Hemocream',
    category: 'salud-bienestar',
    shortDescription: 'Alivio y cuidado para hemorroides.',
    description: 'Hemocream es una solución calmante y lubricante diseñada para proporcionar alivio y cuidado en la zona afectada por hemorroides.',
    seoTitle: 'Cómo solucionar el dolor y molestias de hemorroides con Hemocream',
    seoDescription: 'Alivio calmante y cuidado suave con Hemocream. Fórmula balanceada para tu bienestar integral y calidad certificada. ¡Recupera tu confort!',
    benefits: ['Alivio calmante', 'Lubricación efectiva', 'Cuidado suave'],
    image: '/assets/products/Hemocream.webp',
    basePrice: 65000,
    size: '30 ml',
    keywords: 'hemorroides, alivio, cuidado íntimo, Hemocream, Unmerco',
    longTailKeywords: [
      'mejor crema natural para el alivio de las hemorroides',
      'cómo calmar el dolor y la inflamación de forma suave',
      'tratamiento para la lubricación efectiva y cuidado íntimo',
      'beneficios de Hemocream para el bienestar integral y confort',
      'fórmula balanceada para un alivio rápido y gentil',
      'bienestar integral y vitalidad sin molestias diarias',
      'cómo mejorar el confort íntimo con calidad certificada',
      'crema de alta autoridad para el cuidado de hemorroides',
      'remedio natural para el ardor y picazón en la zona afectada',
      'alivio y cuidado seguro con ingredientes de alta pureza'
    ],
    seoFaqs: [
      { q: '¿Hemocream quita el dolor de inmediato?', a: 'Brinda un alivio calmante y frescura que mejora tu bienestar integral desde la primera aplicación.' },
      { q: '¿Cuántas veces al día se puede aplicar?', a: 'Se recomienda usarla 2 o 3 veces al día para mantener el cuidado suave y confort.' },
      { q: '¿Es un producto natural?', a: 'Sí, su fórmula balanceada prioriza ingredientes seguros con calidad certificada.' }
    ],
    promos: [
      { id: '1u', label: '1 Unidad', units: 1, price: 65000 },
      { id: '2u', label: '2 Unidades', units: 2, price: 97500 }
    ],
    testimonials: []
  }
];

export const COMBO_OF_THE_MONTH = {
  id: 'combo-bienestar',
  name: 'Inmunidad Dual',
  description: 'Resvisfactor y Coliplus: la combinación perfecta para desinflamar tu vientre, sentirte mas ligero y libre de molestias.',
  image: '/assets/combos/combo-bienestar.webp',
  price: 129900,
  originalPrice: 165800,
  products: ['resvis', 'coliplus'],
  seoTitle: 'Cómo solucionar la inflamación abdominal y defensas bajas con Inmunidad Dual',
  seoDescription: 'Desinflama tu vientre y fortalece tu sistema inmune con el combo Inmunidad Dual. Fórmula balanceada para bienestar integral y calidad certificada. ¡Ahorra $35.900!',
  whyChoose: {
    title: 'El dúo dinámico de tu bienestar',
    description: 'Cuando tu sistema inmune y tu digestión trabajan en equipo, tu vitalidad se dispara. Este combo une el poder antioxidante de Resvis Factor con el confort intestinal de Coliplus, creando un equilibrio natural que se siente desde el primer día.'
  },
  badge: 'OFERTA DEL MES',
  benefits: [
    'Desintoxicación profunda del hígado',
    'Limpieza efectiva del colon',
    'Mejora la digestión y absorción',
    'Aumenta los niveles de energía'
  ],
  keywords: 'bienestar total, desintoxicación, limpieza hepática, colon irritable, digestión, Rtafull, Coliplus, Unmerco, combo salud',
  longTailKeywords: [
    'mejor combo natural para desinflamar el vientre y subir defensas',
    'cómo limpiar el colon y el hígado de forma efectiva y segura',
    'tratamiento para el bienestar integral digestivo e inmune',
    'beneficios de Inmunidad Dual para la vitalidad y equilibrio natural',
    'fórmula balanceada para desintoxicación profunda y energía',
    'bienestar integral y salud con calidad certificada premium',
    'cómo mejorar la digestión y absorción de nutrientes con combos',
    'combo de alta autoridad para el cuidado de la salud diaria',
    'remedio natural para el colon irritable y pesadez abdominal',
    'limpieza orgánica segura con ingredientes de alta pureza'
  ],
  seoFaqs: [
    { q: '¿Por qué este combo es el más recomendado?', a: 'Porque combina la desintoxicación de Rtafull con el confort de Coliplus para un bienestar integral total.' },
    { q: '¿En cuánto tiempo veré resultados?', a: 'La mayoría siente una desinflamación y mayor vitalidad desde la primera semana de uso constante.' },
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
      description: 'Cuidar tu piel por fuera y tus células por dentro es la clave de un brillo real. Este combo une la protección antioxidante del resveratrol con la suavidad de Miskinne, apoyando tu vitalidad y equilibrio natural para que luzcas radiante.'
    },
    badge: 'COMBO N°1',
    keywords: 'Resveratrol, Miskinne, antioxidante, cuidado de la piel, rejuvenecimiento, bienestar, Unmerco, combo belleza',
    longTailKeywords: [
      'mejor combo para rejuvenecer la piel y dar luminosidad natural',
      'cómo proteger las células y suavizar la piel al mismo tiempo',
      'tratamiento para una piel radiante desde el interior y exterior',
      'beneficios del combo Piel Radiante para el bienestar integral',
      'fórmula balanceada para la elasticidad y firmeza cutánea',
      'bienestar integral y vitalidad con belleza de alta autoridad',
      'cómo mejorar la salud de la piel con calidad certificada',
      'combo de alta autoridad para el cuidado facial y corporal',
      'remedio natural para la piel seca y falta de brillo celular',
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
      description: 'Unificar tu tono de piel y proteger tus células es un acto de amor propio. Este dúo antioxidante trabaja en armonía para nutrirte profundamente, devolviéndote esa vitalidad y claridad que te hace sentir eternamente bella.'
    },
    badge: 'OFERTA N° 2',
    keywords: 'Resveratrol, Eventone, belleza interior, antioxidante, tono de piel, nutrición celular, Unmerco, combo belleza',
    longTailKeywords: [
      'mejor combo para quitar manchas y unificar el tono de la piel',
      'cómo nutrir las células y aclarar la piel de forma segura',
      'tratamiento para una belleza eterna y piel sin manchas',
      'beneficios del combo Belleza Eterna para el bienestar integral',
      'fórmula balanceada para una piel clara y vitalidad celular',
      'bienestar integral y claridad cutánea con alta autoridad',
      'cómo recuperar la luminosidad del rostro con calidad certificada',
      'combo de alta autoridad para el cuidado antiedad y manchas',
      'remedio natural para la hiperpigmentación y envejecimiento',
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
      description: 'Sentirse ligero es el primer paso para una vida activa. Este combo detox limpia tu sistema de forma gentil y honesta, apoyando tu microbiota y vitalidad para que recuperes tu ritmo y equilibrio natural sin pesadez.'
    },
    badge: 'OFERTA N°3',
    keywords: 'Coliplus, Rtafull, desintoxicación, colon, hígado, digestión, limpieza natural, Unmerco, combo salud',
    longTailKeywords: [
      'mejor combo detox para limpiar el colon y el hígado naturalmente',
      'cómo eliminar la pesadez abdominal y regular la digestión',
      'tratamiento para una renovación total y bienestar digestivo',
      'beneficios del combo Detox Digestivo para la vitalidad diaria',
      'fórmula balanceada para una limpieza orgánica profunda y suave',
      'bienestar integral y ligereza con nutrición de alta autoridad',
      'cómo mejorar el tránsito intestinal con calidad certificada',
      'combo de alta autoridad para la desintoxicación periódica',
      'remedio natural para el estreñimiento y toxinas acumuladas',
      'detox seguro y efectivo con ingredientes de alta pureza'
    ],
    seoFaqs: [
      { q: '¿Este combo causa diarrea?', a: 'No, su fórmula balanceada promueve una limpieza gentil respetando tu equilibrio natural y vitalidad.' },
      { q: '¿Cuánto dura el tratamiento detox?', a: 'Se recomienda realizarlo durante un mes para un bienestar integral y resultados duraderos.' },
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
    products: ['lipetex', 'rtafull'],
    seoTitle: 'Cómo solucionar el sobrepeso y metabolismo lento con Combo Control & Detox',
    seoDescription: 'Apoya tu proceso de pérdida de peso con el Combo Control & Detox. Fórmula balanceada para bienestar integral, energía y calidad certificada. ¡Ahorra hoy!',
    whyChoose: {
      title: 'Tu aliado en el control consciente',
      description: 'Lograr tu peso ideal requiere un metabolismo activo y un cuerpo libre de toxinas. Este combo apoya tu proceso de forma honesta, ayudándote a sentirte ligero y con la vitalidad necesaria para mantener tu ritmo natural.'
    },
    badge: 'COMBO N°4',
    keywords: 'Liteplex, Rtafull, control de peso, adelgazar, desintoxicación, metabolismo, Unmerco, combo salud',
    longTailKeywords: [
      'mejor combo para bajar de peso y desintoxicar el cuerpo',
      'cómo acelerar el metabolismo y eliminar toxinas naturalmente',
      'tratamiento para el control de peso consciente y vitalidad',
      'beneficios del combo Control & Detox para el bienestar integral',
      'fórmula balanceada para reducir medidas y limpiar el organismo',
      'bienestar integral y ligereza con suplementos de alta autoridad',
      'cómo mejorar la quema de grasa con calidad certificada',
      'combo de alta autoridad para el control de peso saludable',
      'remedio natural para la ansiedad de comer y metabolismo lento',
      'control de peso seguro con ingredientes de alta pureza'
    ],
    seoFaqs: [
      { q: '¿Liteplex quita el hambre?', a: 'Ayuda a controlar la ansiedad, promoviendo un bienestar integral y control consciente.' },
      { q: '¿Rtafull ayuda a bajar de peso?', a: 'Al limpiar el hígado y colon, mejora el metabolismo y la vitalidad para tu equilibrio natural.' },
      { q: '¿Tiene efecto rebote?', a: 'Nuestra fórmula balanceada prioriza la salud, evitando efectos negativos con calidad certificada.' }
    ],
    benefits: [
      'Apoyo en el control de peso',
      'Eliminación de toxinas acumuladas',
      'Acelera el metabolismo naturalmente',
      'Mejora la absorción de nutrientes'
    ],
    testimonials: [
      { name: 'Claudia Patricia', text: 'Me ha ayudado mucho en mi proceso de bajar de peso.', rating: 5 },
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
      description: 'Un cuerpo limpio es un cuerpo protegido. Este combo combina la frescura de Tufoff con la depuración de Rtafull, brindándote una defensa integral y una vitalidad renovada para enfrentar el día a día con seguridad.'
    },
    badge: 'COMBO N°5',
    keywords: 'Tufoff, Rtafull, protección, limpieza profunda, defensas, bienestar, Unmerco, combo salud',
    longTailKeywords: [
      'mejor combo para eliminar el mal olor y desintoxicar el cuerpo',
      'cómo fortalecer las defensas y limpiar impurezas naturalmente',
      'tratamiento para una protección integral y bienestar orgánico',
      'beneficios del combo Protección Total para la vitalidad diaria',
      'fórmula balanceada para una higiene profunda y detox hepático',
      'bienestar integral y frescura con productos de alta autoridad',
      'cómo mejorar la salud general con calidad certificada',
      'combo de alta autoridad para la limpieza interna y externa',
      'remedio natural para las toxinas y falta de protección orgánica',
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
    seoTitle: 'Cómo solucionar el dolor muscular y articular con Combo Alivio Muscular',
    seoDescription: 'Recupera tu movilidad con el Combo Alivio Muscular. Fórmula balanceada para bienestar integral, nutrición articular y calidad certificada. ¡Pídelo hoy!',
    whyChoose: {
      title: 'Libertad de movimiento total',
      description: 'No dejes que las tensiones te frenen. Este combo cuida tus articulaciones desde adentro y relaja tus músculos por fuera, devolviéndote la elasticidad y el confort necesarios para vivir tu vitalidad sin límites.'
    },
    badge: 'COMBO N°6',
    keywords: 'Loción Termoactiva, Colágeno, dolor muscular, articulaciones, recuperación, alivio, Unmerco, combo bienestar',
    longTailKeywords: [
      'mejor combo para el dolor de rodillas y espalda naturalmente',
      'cómo mejorar la movilidad articular y aliviar tensiones musculares',
      'tratamiento para la recuperación física y elasticidad corporal',
      'beneficios del combo Alivio Muscular para el bienestar integral',
      'fórmula balanceada para nutrir cartílagos y relajar músculos',
      'bienestar integral y vitalidad sin dolores con alta autoridad',
      'cómo recuperar la movilidad diaria con calidad certificada',
      'combo de alta autoridad para deportistas y adultos activos',
      'remedio natural para la artritis y contracturas musculares',
      'alivio y nutrición segura con ingredientes de alta pureza'
    ],
    seoFaqs: [
      { q: '¿La loción se puede usar antes de hacer ejercicio?', a: 'Sí, su efecto termoactivo prepara los músculos para el bienestar integral y vitalidad.' },
      { q: '¿El colágeno ayuda a los huesos?', a: 'Efectivamente, nutre el sistema óseo y articular promoviendo un equilibrio natural duradero.' },
      { q: '¿Sirve para dolores crónicos?', a: 'Nuestra fórmula balanceada es un excelente apoyo para el alivio constante con calidad certificada.' }
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
      description: 'Cuando el día exige el máximo, tu cuerpo necesita combustible de calidad. Este combo potencia tu rendimiento y enfoque mental de forma natural, dándote esa vitalidad extrema que te permite superar cualquier obstáculo.'
    },
    badge: 'COMBO N°7',
    keywords: 'Cafetolio, Megamac, energía, vitalidad, nutrición, rendimiento, Unmerco, combo energía',
    longTailKeywords: [
      'mejor combo para tener energía todo el día de forma natural',
      'cómo mejorar el enfoque mental y rendimiento físico extremo',
      'tratamiento para la vitalidad máxima y nutrición avanzada',
      'beneficios del combo Energía Máxima para el bienestar integral',
      'fórmula balanceada para superar el cansancio y la fatiga diaria',
      'bienestar integral y vitalidad con suplementos de alta autoridad',
      'cómo potenciar el rendimiento intelectual con calidad certificada',
      'combo de alta autoridad para personas con alta exigencia diaria',
      'remedio natural para el agotamiento y falta de concentración',
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
      description: 'Empieza cada día con la seguridad de un cuerpo limpio y lleno de energía. Este combo apoya tu desempeño diario y depuración natural, ayudándote a mantener ese equilibrio y vitalidad que te hace sentir imparable.'
    },
    badge: 'COMBO N°8',
    keywords: 'Tyruss-Full, Rtafull, vitalidad, limpieza, energía, bienestar, Unmerco, combo salud',
    longTailKeywords: [
      'mejor combo para limpiar el cuerpo y recuperar la energía total',
      'cómo mejorar el desempeño diario y la depuración orgánica',
      'tratamiento para una vitalidad renovada y equilibrio natural',
      'beneficios del combo Vitalidad & Limpieza para el bienestar integral',
      'fórmula balanceada para depurar el hígado y potenciar la fuerza',
      'bienestar integral y ligereza con nutrición de alta autoridad',
      'cómo mantener el ritmo de vida activo con calidad certificada',
      'combo de alta autoridad para la salud y rendimiento masculino',
      'remedio natural para la pesadez y falta de vitalidad extrema',
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

export const COLOMBIA_DATA = {
  'Antioquia': ['Medellín', 'Envigado', 'Itagüí', 'Bello', 'Rionegro'],
  'Bogotá D.C.': ['Bogotá'],
  'Valle del Cauca': ['Cali', 'Palmira', 'Tuluá', 'Buenaventura'],
  'Atlántico': ['Barranquilla', 'Soledad', 'Puerto Colombia'],
  'Santander': ['Bucaramanga', 'Floridablanca', 'Girón', 'Piedecuesta'],
  'Cundinamarca': ['Soacha', 'Chía', 'Zipaquirá', 'Facatativá'],
  'Bolívar': ['Cartagena', 'Magangué', 'Turbaco'],
  'Caldas': ['Manizales', 'Villamaría', 'La Dorada'],
  'Risaralda': ['Pereira', 'Dosquebradas', 'Santa Rosa de Cabal'],
  'Quindío': ['Armenia', 'Calarcá', 'Circasia'],
  'Huila': ['Neiva', 'Pitalito', 'Garzón'],
  'Tolima': ['Ibagué', 'Espinal', 'Melgar'],
  'Norte de Santander': ['Cúcuta', 'Ocaña', 'Villa del Rosario'],
  'Meta': ['Villavicencio', 'Acacías', 'Granada'],
  'Magdalena': ['Santa Marta', 'Ciénaga', 'Fundación'],
  'Cesar': ['Valledupar', 'Aguachica', 'Codazzi'],
  'Córdoba': ['Montería', 'Cereté', 'Sahagún'],
  'Sucre': ['Sincelejo', 'Corozal', 'Sampués'],
  'La Guajira': ['Riohacha', 'Maicao', 'Uribia'],
  'Chocó': ['Quibdó', 'Istmina', 'Condoto'],
  'Cauca': ['Popayán', 'Santander de Quilichao', 'Puerto Tejada'],
  'Nariño': ['Pasto', 'Ipiales', 'Tumaco'],
  'Boyacá': ['Tunja', 'Duitama', 'Sogamoso'],
  'Casanare': ['Yopal', 'Aguazul', 'Villanueva'],
  'Arauca': ['Arauca', 'Tame', 'Saravena'],
  'Putumayo': ['Mocoa', 'Puerto Asís', 'Orito'],
  'Caquetá': ['Florencia', 'San Vicente del Caguán'],
  'Guaviare': ['San José del Guaviare'],
  'Vaupés': ['Mitú'],
  'Guainía': ['Inírida'],
  'Vichada': ['Puerto Carreño'],
  'Amazonas': ['Leticia'],
  'San Andrés y Providencia': ['San Andrés', 'Providencia']
};
