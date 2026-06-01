/**
 * ZENHOGAR - CONECTOR GOOGLE SHEETS (v2.5) - ROBUSTO Y PRO
 */

const SECURITY_TOKEN = "zenhogar_secret_2026"; 
const ADMIN_EMAIL = "zenhogar2050@gmail.com";

function doPost(e) {
  // --- SEGURIDAD: Evitar error de ejecución manual ---
  if (!e || !e.postData) {
    return response({ 
      status: "error", 
      message: "⚠️ NO EJECUTAR MANUALMENTE. Use la URL de implementación del Web App." 
    });
  }

  try {
    const contents = JSON.parse(e.postData.contents);
    
    // 1. Validar Token
    const receivedToken = (contents.token || "").toString().trim();
    if (receivedToken !== SECURITY_TOKEN) {
      console.error("Acceso denegado: Token incorrecto");
      return response({ status: "error", message: "No autorizado" });
    }
    
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const timestamp = Utilities.formatDate(new Date(), "GMT-5", "dd/MM/yyyy HH:mm:ss");
    const customer = contents.customer || {};
    
    // --- CASO: NUEVO PEDIDO ---
    if (contents.type === "order") {
      let orderSheet = ss.getSheetByName("Pedidos") || ss.insertSheet("Pedidos");
      
      if (orderSheet.getLastRow() === 0) {
        const headers = ["Ticket N°", "Fecha y Hora", "Nombre", "Celular", "Email", "Direccion", "Ciudad", "Departamento", "Producto", "Valor", "Guia", "Estado", "Google ID"];
        orderSheet.appendRow(headers);
        orderSheet.getRange(1, 1, 1, 13).setFontWeight("bold").setBackground("#dcfce7");
      }

      let scriptProperties = PropertiesService.getScriptProperties();
      let lastTicketNum = scriptProperties.getProperty('LAST_TICKET_NUM');
      let nextNum = lastTicketNum ? parseInt(lastTicketNum) + 1 : 1001;
      scriptProperties.setProperty('LAST_TICKET_NUM', nextNum.toString());
      const ticket = "PO-" + nextNum;
      
      const googleId = customer.gclid || contents.gclid || customer.google_id || contents.google_id || "";

      orderSheet.appendRow([
        ticket, timestamp, customer.fullName || "Cliente",
        customer.phone || customer.celular || "", customer.email || "",
        customer.address || customer.direccion || "", customer.city || customer.ciudad || "",
        customer.department || customer.departamento || "", contents.order_details || "",
        contents.total || 0, "", "Nuevo", googleId
      ]);

      // Enviar Email
      try {
        const subject = "🚀 NUEVO PEDIDO #" + ticket + " - " + (customer.fullName || "Cliente");
        MailApp.sendEmail(ADMIN_EMAIL, subject, "Detalles en la hoja de Pedidos. Total: $" + (contents.total || "0"));
      } catch(m) { console.warn("Error Mail: " + m); }

      return response({ status: "success", ticket: ticket });

    // --- CASO: CARRITO ABANDONADO ---
    } else if (contents.type === "abandoned") {
      let sheet = ss.getSheetByName("Abandonos") || ss.insertSheet("Abandonos");
      if (sheet.getLastRow() === 0) {
        sheet.appendRow(["Fecha y Hora", "Nombre", "Celular", "Email", "Direccion", "Ciudad", "Departamento", "Producto", "Valor"]);
        sheet.getRange(1, 1, 1, 9).setFontWeight("bold").setBackground("#fef3c7");
      }
      sheet.appendRow([
        timestamp, customer.fullName || "Prospecto", customer.phone || "", 
        customer.email || "", customer.address || "", customer.city || "", 
        customer.department || "", contents.order_details || "N/A", contents.total || 0
      ]);
      return response({ status: "success" });
    }

    // --- CASO: ACTUALIZACIÓN DE ESTADO O GUÍA ---
    else if (contents.type === "update_status") {
      let orderSheet = ss.getSheetByName("Pedidos");
      if (!orderSheet) return response({ status: "error", message: "Hoja de Pedidos no encontrada" });
      
      const ticketToFind = contents.ticket;
      const newStatus = contents.status;
      const newGuia = contents.tracking_guide || contents.guia;
      const data = orderSheet.getDataRange().getValues();
      const ticketCol = 0; // Columna A
      const guiaCol = 10; // Columna K (1-indexed es 11)
      const statusCol = 11; // Columna L (1-indexed es 12)
      
      for (let i = 1; i < data.length; i++) {
        if (data[i][ticketCol].toString() === ticketToFind.toString()) {
          if (newStatus !== undefined && newStatus !== null) {
            orderSheet.getRange(i + 1, statusCol + 1).setValue(newStatus);
          }
          if (newGuia !== undefined && newGuia !== null) {
            orderSheet.getRange(i + 1, guiaCol + 1).setValue(newGuia);
          }
          return response({ status: "success", message: "Estado/Guía actualizado en Sheets" });
        }
      }
      return response({ status: "error", message: "Ticket no encontrado en Sheets" });
    }
    
    return response({ status: "error", message: "Tipo independiente o desconocido" });
      
  } catch (error) {
    return response({ status: "error", message: "Error crítico: " + error.toString() });
  }
}

// Función para habilitar GET y ver que el script está vivo
function doGet() {
  return HtmlService.createHtmlOutput("<h1>ZENHOGAR API ACTIVE 🚀</h1><p>El script está listo para recibir pedidos vía POST.</p>");
}

function response(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}
