# ZENHOGAR - Registro de Tareas y Auditoría (Mayo 2026)

## 🔍 Resumen de Auditoría Técnica

### 1. SEO & Estructura de Datos
- **JSON-LD (Schema.org):** Implementación completa en `seo-logic.ts`.
    - `Product`: Incluye precios, disponibilidad, envío (CO) y políticas de devolución.
    - `AggregateRating`: Generación dinámica basada en testimonios reales. 
    - `Merchant Center`: Esquema atómico cumplido para aprobación de Google Shopping.
- **Indexación:** Meta tags dinámicos por página (Title/Description) ajustados para keywords transaccionales (ej. "Pago contra entrega", "Original").

### 2. Rendimiento (Web Core Vitals)
- **LCP (Largest Contentful Paint):** 
    - Uso mandatorio de `.webp` optimizado.
    - `fetchPriority="high"` en la imagen principal de `ProductLanding` y `Home`.
    - Recorte de tiempos de renderizado mediante carga diferida (4s) de scripts pesados (GA4, FB Pixel).
- **CLS (Cumulative Layout Shift):** Reservas de espacio para imágenes y tipografías `display=swap`.

### 3. Políticas de Google & Conversión
- **Transparencia:** Páginas de Garantía, Privacidad y Condiciones de Envío operativas.
- **Confianza:** Visualización de registros INVIMA y sellos de calidad en el primer scroll.

---

## 📝 Estado de Tareas (Cerradas & Pendientes)

### ✅ Tareas Completadas (Recientes)
- [x] Integración de **supportImages** en todos los productos de `constants.ts`.
- [x] Galería de miniaturas funcional en `ProductLanding.tsx`.
- [x] Corrección de assets para **+NAD** (uso de `nad-1-apoyo`).
- [x] Optimización de miniaturas para **Instant Virgin** (reducción a 3 imágenes clave).

### 🚀 Próximas Tareas (Propuestas por Auditoría)
1. **Optimización de Fuentes:** Evaluar inlining de la fuente "Outfit" para el H1 principal para reducir el tiempo de primer pintado con contenido.
2. **PWA Check:** Verificar que el `manifest.json` y los iconos (Apple Touch) estén siendo servidos correctamente para "Add to Home Screen".
3. **Caché de Imágenes:** Implementar política de caché agresiva en `server.ts` para assets en `/assets/`.
4. **Validación de Enlaces:** Auditoría de enlaces rotos en el Footer hacia las nuevas páginas de política.

---
*Este archivo es una guía viva para el mantenimiento del blindaje SEO y técnico de Zenhogar.*
