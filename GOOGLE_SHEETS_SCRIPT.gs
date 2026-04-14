/**
 * ZENHOGAR - GOOGLE SHEETS CONNECTOR (v2)
 * 
 * INSTRUCCIONES:
 * 1. Crea una nueva Hoja de Cálculo de Google.
 * 2. Ve a 'Extensiones' > 'Apps Script'.
 * 3. Borra todo el código y pega este script.
 * 4. Cambia 'TU_TOKEN_AQUI' por el valor de SHEETS_SECURITY_TOKEN de tu configuración (ej: zenhogar_secret_2026).
 * 5. Haz clic en 'Implementar' > 'Nueva implementación'.
 * 6. Selecciona 'Aplicación web'.
 * 7. Configura:
 *    - Ejecutar como: 'Yo' (tu cuenta).
 *    - Quién tiene acceso: 'Cualquier persona'.
 * 8. Copia la URL de la aplicación web y pégala en GOOGLE_SHEETS_ORDERS_WEBHOOK en tus ajustes de AI Studio.
 */

const SECURITY_TOKEN = "zenhogar_secret_2026"; // Debe coincidir con SHEETS_SECURITY_TOKEN en .env

function doPost(e) {
  try {
    const contents = JSON.parse(e.postData.contents);
    
    // Verificación de seguridad (PASSWORD)
    if (contents.token !== SECURITY_TOKEN) {
      return ContentService.createTextOutput(JSON.stringify({ status: "error", message: "No autorizado" }))
        .setMimeType(ContentService.MimeType.JSON);
    }
    
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const timestamp = contents.timestamp || new Date().toLocaleString();
    
    if (contents.type === "order") {
      // Hoja de Pedidos
      let orderSheet = ss.getSheetByName("Pedidos") || ss.insertSheet("Pedidos");
      
      // Si la hoja está vacía, añadir encabezados
      if (orderSheet.getLastRow() === 0) {
        orderSheet.appendRow(["Fecha/Hora", "Nombre", "Email", "Teléfono", "Dirección", "Ciudad", "Departamento", "Detalles del Pedido", "Total"]);
        orderSheet.getRange(1, 1, 1, 9).setFontWeight("bold").setBackground("#dcfce7");
      }
      
      const customer = contents.customer || {};
      orderSheet.appendRow([
        timestamp,
        customer.fullName,
        customer.email,
        customer.phone,
        customer.address,
        customer.city,
        customer.department,
        contents.order_details,
        contents.total
      ]);
    }
    
    return ContentService.createTextOutput(JSON.stringify({ status: "success" }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({ status: "error", message: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
