# ZENHOGAR - Reglas de Proyecto (Versión Actual)

Este archivo contiene las directrices definitivas para el mantenimiento y evolución de la aplicación ZENHOGAR. Cualquier instrucción previa que contradiga estas reglas debe ser ignorada.

## 1. Oferta del Mes (Combo Principal)
- **Nombre:** Inmunidad Dual
- **Productos:** Resvisfactor y Coliplus.
- **Precio Oferta:** $129.900
- **Precio Original:** $165.800
- **Ahorro:** $35.900
- **Descripción:** "Resvisfactor y Coliplus: la combinación perfecta para desinflamar tu vientre, sentirte mas ligero y libre de molestias."
- **Imagen:** `/assets/combos/combo-bienestar.webp`

## 2. Comportamiento de la Banda de Productos (PromoBanner)
- **Movimiento:** Desplazamiento continuo automático hacia la izquierda.
- **Interacción:** Se detiene por completo cuando el usuario posa el ratón (hover) sobre ella.
- **Reanudación:** Vuelve a moverse automáticamente al retirar el ratón.

## 3. Checkout y Pedidos
- **Integraciones Activas:**
  1. **Google Sheets:** Registro de pedidos mediante el endpoint `/api/orders`.
  2. **WhatsApp:** Redirección final para confirmación del cliente.
  3. **Carritos Abandonados:** Registro automático en Google Sheets cuando el usuario llena datos básicos pero no finaliza.
- **Funcionalidades Eliminadas (NO REINSTALAR):**
  - EmailJS (envío de correos desde el cliente).

## 4. Diseño y Estética
- **Tipografía:** Inter (UI) y Outfit (Títulos).
- **Colores:** Emerald (Acentos), Stone (Fondos/Texto), Blue (Banner).
- **Estilo:** Limpio, profesional, enfocado en la conversión y la confianza del cliente.

## 5. Estructura de Archivos y Activos
- Mantener la estructura minimalista.
- **Activos de Imagen:** Todas las imágenes deben estar en formato WebP y organizadas en:
  - `/public/assets/products/` para productos individuales.
  - `/public/assets/combos/` para combos y promociones.
  - `/public/assets/logo/` para el logo de la marca.
- No crear archivos de servicio innecesarios.
- Priorizar la velocidad de carga y la simplicidad del código.
