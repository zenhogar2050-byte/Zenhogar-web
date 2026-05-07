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

## 3. Checkout y Pedidos (Blindado)
- **Integraciones Activas (INAMOVIBLES):**
  1. **Google Sheets:** Registro de pedidos mediante el endpoint `/api/orders`. No modificar flujos ni validaciones de servidor.
  2. **WhatsApp:** Redirección final para confirmación del cliente tras el checkout exitoso.
  3. **Carritos Abandonados:** Registro automático en Google Sheets cuando el usuario llena datos básicos pero no finaliza.
- **Funcionalidades Eliminadas (NO REINSTALAR):**
  - EmailJS (envío de correos desde el cliente).
- **Google Sheets (v2.1):** Orden de columnas: Ticket N°, Fecha y Hora, Nombre, Celular, Email, Direccion, Ciudad, Departamento, Producto, Valor, Guia, Estado.

## 4. Exportación MasterShop (Botón "Generar Plantilla") (Blindado)
- **Integración INAMOVIBLE:** No modificar la lógica de transformación de datos sin autorización expresa.
- **Nombre de Archivo:** `plantilla-importacion-pedidos-[FECHA].xlsm` (Formato .xlsm mandatorio).
- **Columnas y Orden Estricto:** 
  1. IDENTIFICADOR
  2. NOMBRES*
  3. APELLIDOS
  4. CEDULA (OPCIONAL)
  5. TELÉFONO
  6. DIRECCIÓN Y BARRIO*
  7. DEPARTAMENTO*
  8. CIUDAD*
  9. ID DE PRODUCTO*
  10. ID DE VARIACION*
  11. CANTIDAD*
  12. PRECIO UNITARIO (SIN PUNTOS NI COMAS)*
  13. OTROS CARGOS
  14. VALOR OTROS CARGOS
  15. CON RECAUDO (SI/NO)*
  16. NOTA
  17. EMAIL (OPCIONAL)
- **Lógica de Datos:**
  - Valores faltantes o no proporcionados por el cliente deben ser **0**.
  - `CON RECAUDO` siempre es "SI".
  - **Nombres y Apellidos:** Se extraen del nombre completo del checkout; la primera palabra va a `NOMBRES*` y el resto a `APELLIDOS`. Si no hay datos, se usa **0**.
  - **ID DE PRODUCTO*:** Debe reflejar el ID Master numérico del producto (ej. '11323', '11341') y no su nombre comercial ni su ID interno de texto.
- **Lógica de Productos (Desglose):**
  - **Combos (ej. Inmunidad Dual):** Se desglosan en sus productos individuales (Resvisfactor, Coliplus). Cada producto mantiene la cantidad del combo solicitada. El precio unitario es el total pagado dividido por el total de unidades resultantes.
  - **Promociones Multianidad (ej. Pague 2 Lleve 3):** Se agrupan en una sola fila. La columna `CANTIDAD*` debe reflejar el total de unidades (ej. 5 o 3) y el `PRECIO UNITARIO*` debe ser el cálculo proporcional.

## 5. Panel de Administración - Selección (Blindado)
- **Funcionalidad INAMOVIBLE:** Implementar checkboxes al lado izquierdo de cada pedido en la tabla de órdenes.
- **Exportación Selectiva:** El botón de "Generar Plantilla para Pedidos a Master Shop" solo debe exportar las órdenes seleccionadas si existe una selección activa; de lo contrario, exporta la vista filtrada actual.

## 7. Sticky Bar Movil (CTA Flotante) (Blindado)
- **Componente:** `src/components/StickyCTA.tsx`.
- **Comportamiento:** 
  - **Móvil:** Siempre visible en la parte inferior de la pantalla.
  - **Escritorio:** Aparece automáticamente cuando el botón de compra principal sale de la vista (desaparece por el borde superior).
- **Integración:** Debe estar presente en:
  - `Home.tsx` (Vinculado a la Oferta del Mes).
  - `ProductLanding.tsx` (Vinculado al producto actual).
  - `ComboLanding.tsx` (Vinculado al combo actual).
- **Funcionalidad:** Permite cambiar la promoción/variación directamente desde la barra y redirige al checkout.

## 8. Prueba Social y Urgencia (Blindado)
- **Concepto:** Basado estrictamente en "Gente Viendo" para evitar falsas promesas de compra.
- **Componentes:** `SocialProof.tsx` (flotante) e indicadores "Viviendo ahora" en `Checkout.tsx`, `Home.tsx` y `ProductLanding.tsx`.
- **Regla:** Queda prohibido implementar notificaciones de "Alguien compró recientemente" si no es una integración real con la base de datos de pedidos verificados.

## 9. Captura de Leads (Carritos Abandonados) (Blindado)
- **Trigger:** Se activa automáticamente a los 10 minutos de inactividad si el usuario ha ingresado al menos el Nombre y el Celular.
- **Email:** El campo de correo es **OPCIONAL** y no debe bloquear el registro del pedido ni del carrito abandonado.
- **Destinos:** Registro en Firebase (Base de Datos) y Google Sheets vía Cloudflare Worker.

## 10. Diseño y Estética
- **Tipografía:** Inter (UI) y Outfit (Títulos).
- **Colores:** Emerald (Acentos), Stone (Fondos/Texto), Blue (Banner).
- **Estilo:** Limpio, profesional, enfocada en la conversión y la confianza del cliente.

## 11. Blindaje de Moneda y Localización (INAMOVIBLE)
- **Moneda:** Todos los valores deben expresarse en Pesos Colombianos (COP) utilizando el formato `es-CO`.
- **Precios:** No usar decimales en los precios finales de cara al cliente ni en los envíos de datos a API/Tracking (MasterShop requiere enteros).
- **Símbolo:** Usar el signo '$' antepuesto al valor.

## 12. Estándares de Accesibilidad (WCAG 2.1)
- **Ratio de Contraste:** Mínimo 4.5:1 para texto normal.
- **Interactividad:** Todos los botones deben tener `aria-label` y estados de foco claros.
- **Navegación:** Uso correcto de etiquetas semánticas (`main`, `nav`, `footer`, `section`) y jerarquía de títulos.

## 13. Política de Blindaje General
- **Información Previa:** Queda prohibido realizar cambios estructurales, de lógica de negocio o de diseño crítico sin informar previamente al usuario sobre qué se va a modificar y qué impacto tendrá (pérdida de funcionalidades previas, cambios en flujo, etc.).
- **No Automatización:** Nada sucede en automático si contraviene las reglas establecidas en este archivo.

## 7. Estructura de Archivos y Activos
- Mantener la estructura minimalista.
- **Activos de Imagen:** Todas las imágenes deben estar en formato WebP y organizadas en:
  - `/public/assets/products/` para productos individuales.
  - `/public/assets/combos/` para combos y promociones.
  - `/public/assets/logo/` para el logo de la marca.
- No crear archivos de servicio innecesarios.
- Priorizar la velocidad de carga y la simplicidad del código.
