/**
 * ZENHOGAR - CONECTOR GOOGLE SHEETS (v2.4) - ROBUSTO Y PRO
 * 
 * INSTRUCCIONES:
 * 1. Pega este código completo en tu Apps Script.
 * 2. Haz clic en el icono de Disquete (Guardar).
 * 3. Haz clic en 'Implementar' > 'Nueva implementación'.
 * 4. Tipo: 'Aplicación web'.
 * 5. Ejecutar como: 'Yo' (zenhogar2050@gmail.com).
 * 6. Acceso: 'Cualquier persona'.
 * 7. RECOPIA LA URL: Asegúrate de que esta URL sea la que está configurada como GOOGLE_SHEETS_ORDERS_WEBHOOK.
 */

const SECURITY_TOKEN = "zenhogar_secret_2026"; 
const ADMIN_EMAIL = "zenhogar2050@gmail.com";

function doPost(e) {
  try {
    const contents = JSON.parse(e.postData.contents);
    
    // 1. SEGURIDAD: Validar Token (Limpieza de espacios por si acaso)
    const receivedToken = (contents.token || "").toString().trim();
    if (receivedToken !== SECURITY_TOKEN) {
      console.error("Acceso denegado: Token recibido [" + receivedToken + "] no coincide con el esperado.");
      return response({ 
        status: "error", 
        message: "No autorizado", 
        debug: "Token mismatch" 
      });
    }
    
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    // Forzamos zona horaria de Colombia
    const timestamp = Utilities.formatDate(new Date(), "GMT-5", "dd/MM/yyyy HH:mm:ss");
    const customer = contents.customer || {};
    
    // --- CASO: NUEVO PEDIDO ---
    if (contents.type === "order") {
      let orderSheet = ss.getSheetByName("Pedidos") || ss.insertSheet("Pedidos");
      
      if (orderSheet.getLastRow() === 0) {
        const headers = ["Ticket N°", "Fecha y Hora", "Nombre", "Celular", "Email", "Direccion", "Ciudad", "Departamento", "Producto", "Valor", "Guia", "Estado", "GCLID"];
        orderSheet.appendRow(headers);
        orderSheet.getRange(1, 1, 1, 13).setFontWeight("bold").setBackground("#dcfce7");
      }

      // Generar Ticket Correlativo
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
        "Nuevo", // Estado
        contents.gclid || customer.gclid || "" // GCLID (Columna M)
      ];

      orderSheet.appendRow(rowData);

      // --- ENVÍO DE EMAIL ---
      try {
        const subject = "🚀 NUEVO PEDIDO #" + ticket + " - " + (customer.fullName || "Cliente");
        let body = "¡Hola! Tienes un nuevo pedido en ZENHOGAR.\n\n" +
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
                     "PRODUCTOS:\n" + (contents.order_details || "") + "\n\n" +
                     "VALOR TOTAL: $" + (contents.total || "0") + "\n" +
                     "----------------------------------\n\n" +
                     "Revisa la hoja de cálculo 'Pedidos' para gestionar el envío.";
        
        GmailApp.sendEmail(ADMIN_EMAIL, subject, body);
      } catch (mailError) {
        console.warn("Error enviando correo: " + mailError.toString());
      }

      return response({ status: "success", ticket: ticket });

    // --- CASO: CARRITO ABANDONADO ---
    } else if (contents.type === "abandoned") {
      let abandonoSheet = ss.getSheetByName("Abandonos") || ss.insertSheet("Abandonos");
      if (abandonoSheet.getLastRow() === 0) {
        abandonoSheet.appendRow(["Fecha y Hora", "Nombre", "Celular", "Email", "Direccion", "Ciudad", "Departamento", "Producto", "Valor", "GCLID"]);
        abandonoSheet.getRange(1, 1, 1, 10).setFontWeight("bold").setBackground("#fef3c7");
      }
      abandonoSheet.appendRow([
        timestamp,
        customer.fullName || "Prospecto",
        customer.phone || customer.celular || "",
        customer.email || "",
        customer.address || "",
        customer.city || "",
        customer.department || "",
        contents.order_details || "N/A",
        contents.total || 0,
        contents.gclid || customer.gclid || "" // GCLID (Columna J)
      ]);
      return response({ status: "success" });
    }

    // --- CASO: ACTUALIZACIÓN DE ESTADO ---
    else if (contents.type === "update_status") {
      let orderSheet = ss.getSheetByName("Pedidos");
      if (!orderSheet) return response({ status: "error", message: "Hoja de Pedidos no encontrada" });
      
      const ticketToFind = contents.ticket;
      const newStatus = contents.status;
      const data = orderSheet.getDataRange().getValues();
      const ticketCol = 0; // Columna A
      const statusCol = 11; // Columna L (1-indexed es 12)
      
      for (let i = 1; i < data.length; i++) {
        if (data[i][ticketCol] === ticketToFind) {
          orderSheet.getRange(i + 1, statusCol + 1).setValue(newStatus);
          return response({ status: "success", message: "Estado actualizado en Sheets" });
        }
      }
      return response({ status: "error", message: "Ticket no encontrado en Sheets" });
    }
    
    return response({ status: "error", message: "Tipo de contenido no soportado" });
      
  } catch (error) {
    console.error("Error crítico: " + error.toString());
    return response({ status: "error", message: error.toString() });
  }
}

function response(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}

function autorizarServicios() {
  GmailApp.sendEmail(Session.getActiveUser().getEmail(), "Autorización ZENHOGAR", "Servicios autorizados correctamente para " + Session.getActiveUser().getEmail());
}
