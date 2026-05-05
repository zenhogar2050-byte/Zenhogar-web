/**
 * ZENHOGAR - GOOGLE SHEETS CONNECTOR (v2.1)
 * 
 * INSTRUCCIONES:
 * 1. Crea una nueva Hoja de Cálculo de Google.
 * 2. Ve a 'Extensiones' > 'Apps Script'.
 * 3. Borra todo el código y pega este script.
 * 4. Cambia el SECURITY_TOKEN si lo deseas (debe coincidir con la config en AI Studio).
 * 5. Haz clic en 'Implementar' > 'Nueva implementación'.
 * 6. Selecciona 'Aplicación web'.
 * 7. Configura:
 *    - Ejecutar como: 'Yo' (tu cuenta).
 *    - Quién tiene acceso: 'Cualquier persona'.
 * 8. Copia la URL de la aplicación web y pégala en GOOGLE_SHEETS_ORDERS_WEBHOOK en los Ajustes de AI Studio.
 */

const SECURITY_TOKEN = "zenhogar_secret_2026";
const ADMIN_EMAIL = "zenhogar2050@gmail.com";

function doPost(e) {
  try {
    const contents = JSON.parse(e.postData.contents);
    
    // Verificación de seguridad
    if (contents.token !== SECURITY_TOKEN) {
      return response({ status: "error", message: "No autorizado" });
    }
    
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const timestamp = new Date().toLocaleString("es-CO", { timeZone: "America/Bogota" });
    const customer = contents.customer || {};
    
    if (contents.type === "order") {
      let orderSheet = ss.getSheetByName("Pedidos") || ss.insertSheet("Pedidos");
      
      // Si la hoja es nueva, colocamos los encabezados exactos
      if (orderSheet.getLastRow() === 0) {
        const headers = ["Ticket N°", "Fecha y Hora", "Nombre", "Celular", "Email", "Direccion", "Ciudad", "Departamento", "Producto", "Valor", "Guia", "Estado"];
        orderSheet.appendRow(headers);
        orderSheet.getRange(1, 1, 1, headers.length).setFontWeight("bold").setBackground("#dcfce7");
      }

      // Generar Ticket (PO-1000+)
      let scriptProperties = PropertiesService.getScriptProperties();
      let lastTicketNum = scriptProperties.getProperty('LAST_TICKET_NUM');
      let nextNum = lastTicketNum ? parseInt(lastTicketNum) + 1 : 1001;
      scriptProperties.setProperty('LAST_TICKET_NUM', nextNum.toString());
      const ticket = "PO-" + nextNum;
      
      const rowData = [
        ticket,
        timestamp,
        customer.fullName || "Cliente",
        customer.phone || customer.celular || "",
        customer.email || "",
        customer.address || customer.direccion || "",
        customer.city || customer.ciudad || "",
        customer.department || customer.departamento || "",
        contents.order_details || "Sin detalles",
        contents.total || 0,
        "", // Guia
        "Nuevo" // Estado
      ];

      orderSheet.appendRow(rowData);

      // NOTIFICACIÓN POR EMAIL
      try {
        const subject = "🚀 NUEVO PEDIDO #" + ticket + " - " + (customer.fullName || "Cliente");
        const body = "¡Hola! Tienes un nuevo pedido en ZENHOGAR.\n\n" +
                     "RESUMEN DEL PEDIDO:\n" +
                     "----------------------------------\n" +
                     "Ticket: " + ticket + "\n" +
                     "Fecha: " + timestamp + "\n\n" +
                     "DATOS DEL CLIENTE:\n" +
                     "Nombre: " + (customer.fullName || "N/A") + "\n" +
                     "Celular: " + (customer.phone || customer.celular || "N/A") + "\n" +
                     "Email: " + (customer.email || "N/A") + "\n" +
                     "Ciudad: " + (customer.city || customer.ciudad || "N/A") + " (" + (customer.department || customer.departamento || "N/A") + ")\n" +
                     "Dirección: " + (customer.address || customer.direccion || "N/A") + "\n\n" +
                     "PRODUCTOS:\n" + (contents.order_details || "N/A") + "\n\n" +
                     "VALOR TOTAL: " + (contents.total || "0") + "\n" +
                     "----------------------------------\n\n" +
                     "Revisa el Admin Dashboard para gestionar el envío.";
        
        MailApp.sendEmail(ADMIN_EMAIL, subject, body);
      } catch (mailError) {
        console.warn("No se pudo enviar el correo: " + mailError.toString());
      }

      return response({ status: "success", ticket: ticket });

    } else if (contents.type === "abandoned") {
      let abandonedSheet = ss.getSheetByName("Abandonos") || ss.insertSheet("Abandonos");
      
      if (abandonedSheet.getLastRow() === 0) {
        abandonedSheet.appendRow(["Fecha y Hora", "Nombre", "Celular", "Email", "Direccion", "Ciudad", "Departamento", "Producto", "Valor"]);
        abandonedSheet.getRange(1, 1, 1, 9).setFontWeight("bold").setBackground("#fef3c7");
      }
      
      abandonedSheet.appendRow([
        timestamp,
        customer.fullName || "Prospecto",
        customer.phone || customer.celular || "",
        customer.email || "",
        customer.address || "",
        customer.city || "",
        customer.department || "",
        contents.order_details || "N/A",
        contents.total || 0
      ]);

      return response({ status: "success" });
    }
    
    return response({ status: "error", message: "Tipo no soportado" });
      
  } catch (error) {
    return response({ status: "error", message: error.toString() });
  }
}

function response(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}
