# Especificación de Seguridad de Firestore - ZENHOGAR

## 1. Invariantes de Datos
- **Entidad Order:**
    - Debe contener un objeto `customer` con `fullName` (o `nombre`) y `phone` (o `telefono`).
    - El campo `type` es obligatorio y debe ser 'order' o 'abandoned'.
    - El campo `status` es obligatorio.
    - Los IDs de los documentos deben ser alfanuméricos y no exceder los 128 caracteres.
    - El campo `created_at` debe ser un timestamp del servidor.

## 2. Las 12 Cargas Útiles "Sucias" (Dirty Dozen Payloads)
Intentos de ataque que las reglas deben bloquear:
1.  **Suplantación de ID:** Crear un pedido con un ID de documento que contenga caracteres de escape o sea gigante (>1MB).
2.  **Inyección de Campo Fantasma:** Añadir `isAdmin: true` dentro de un pedido.
3.  **Estado Falso:** Crear un pedido directamente con `status: 'delivered'`.
4.  **Lectura Masiva:** Intentar listar todos los pedidos sin estar autenticado.
5.  **Edición de Terceros:** Intentar cambiar el teléfono de un pedido que no me pertenece.
6.  **Eliminación Maliciosa:** Intentar borrar la base de datos de pedidos.
7.  **Tipo Inválido:** Enviar un `total` que sea un string en lugar de un número.
8.  **Campos Faltantes:** Crear un pedido sin el campo `customer`.
9.  **Timestamp Falso:** Enviar una fecha de creación del pasado o futuro desde el cliente.
10. **Ataque de Tamaño:** Enviar un nombre de cliente de 1MB de longitud.
11. **Cambio de Tipo:** Intentar convertir un 'abandoned' en 'order' sin autorización.
12. **Acceso a PII:** Intentar obtener un pedido específico por ID (get) sin ser el dueño o admin.

## 3. Test Runner (Plan de Pruebas)
Se verificará que:
- `allow create`: Funciona si y solo si el esquema es perfecto.
- `allow list`: Denegado para público.
- `allow get`: Denegado para público.
- `allow update`: Denegado para público.
- `allow delete`: Denegado para público.
