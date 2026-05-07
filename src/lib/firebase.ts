import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, setDoc, serverTimestamp, query, orderBy, getDocs, doc, updateDoc, deleteDoc, limit, where, runTransaction, getDoc } from 'firebase/firestore';
import firebaseConfig from '../../firebase-applet-config.json';

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app, firebaseConfig.firestoreDatabaseId);

export const collections = {
  ORDERS: 'orders',
  SETTINGS: 'settings'
};

/**
 * Obtiene y aumenta el contador consecutivo de pedidos de forma atómica.
 */
export async function getNextOrderTicket(): Promise<string> {
  const counterRef = doc(db, collections.SETTINGS, 'counters');
  
  try {
    const nextTicket = await runTransaction(db, async (transaction) => {
      const counterDoc = await transaction.get(counterRef);
      
      let currentNumber = 1014; // Valor inicial actualizado según reporte del cliente (PO-1014)
      
      if (counterDoc.exists()) {
        currentNumber = counterDoc.data().lastOrderNumber || 1014;
      }
      
      const nextNumber = currentNumber + 1;
      transaction.set(counterRef, { lastOrderNumber: nextNumber }, { merge: true });
      
      return `PO-${nextNumber}`;
    });
    
    return nextTicket;
  } catch (error) {
    console.error('Error al generar ticket consecutivo:', error);
    // Fallback aleatorio por si falla Firebase (para no detener la venta)
    return `PO-${Math.floor(100000 + Math.random() * 900000)}`;
  }
}

/**
 * Obtiene el valor actual del contador sin incrementarlo
 */
export async function getCurrentCounterValue(): Promise<number> {
  const counterRef = doc(db, collections.SETTINGS, 'counters');
  const docSnap = await getDoc(counterRef);
  if (docSnap.exists()) {
    return docSnap.data().lastOrderNumber || 1014;
  }
  return 1014;
}

/**
 * Actualiza manualmente el valor del contador
 */
export async function updateCounterValue(newValue: number): Promise<boolean> {
  try {
    const counterRef = doc(db, collections.SETTINGS, 'counters');
    await setDoc(counterRef, { lastOrderNumber: newValue }, { merge: true });
    return true;
  } catch (error) {
    console.error('Error updating counter:', error);
    return false;
  }
}

// Función para limpiar datos antes de enviar a Firebase (Firestore no acepta undefined)
function sanitizeData(obj: any): any {
  if (Array.isArray(obj)) {
    return obj.map(v => sanitizeData(v));
  } else if (obj !== null && typeof obj === 'object') {
    return Object.fromEntries(
      Object.entries(obj)
        .filter(([_, v]) => v !== undefined)
        .map(([k, v]) => [k, sanitizeData(v)])
    );
  }
  return obj;
}

export async function saveOrderToFirebase(orderData: any) {
  try {
    const ordersRef = collection(db, collections.ORDERS);
    const sanitized = sanitizeData(orderData);
    
    // Si viene con un ID (caso carrito abandonado para evitar duplicados)
    if (sanitized.id) {
      const orderRef = doc(db, collections.ORDERS, sanitized.id);
      const { id, ...cleanData } = sanitized;
      await setDoc(orderRef, {
        ...cleanData,
        status: cleanData.status || 'abandoned',
        created_at: serverTimestamp()
      }, { merge: true });
      return true;
    }

    // Pedido normal
    await addDoc(ordersRef, {
      ...sanitized,
      status: sanitized.status || 'pending',
      created_at: serverTimestamp()
    });
    return true;
  } catch (error) {
    console.error('Error saving to Firebase:', error);
    return false;
  }
}

export async function getOrdersFromFirebase() {
  try {
    const ordersRef = collection(db, collections.ORDERS);
    // Limitamos a 500 registros para mantener fluidez (aprox 2 meses según volumen)
    const q = query(ordersRef, orderBy('created_at', 'desc'), limit(500));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => {
      const data = doc.data();
      return {
        ...data,
        id: doc.id,
        // Manejo seguro de la fecha
        created_at: data.created_at && typeof data.created_at.toDate === 'function' 
          ? data.created_at.toDate().toISOString() 
          : new Date().toISOString()
      };
    });
  } catch (error) {
    console.error('Error fetching from Firebase:', error);
    // Si el error es por falta de índice o permisos, damos una pista
    if (error instanceof Error && error.message.includes('permission-denied')) {
      throw new Error('Permisos denegados en Firebase. Verifica las reglas de seguridad.');
    }
    throw error;
  }
}

export async function updateOrderStatusInFirebase(orderId: string, status: string) {
  try {
    const orderRef = doc(db, collections.ORDERS, orderId);
    await updateDoc(orderRef, {
      status,
      updated_at: serverTimestamp()
    });
    return true;
  } catch (error) {
    return false;
  }
}

export async function deleteOrderFromFirebase(orderId: string) {
  try {
    const orderRef = doc(db, collections.ORDERS, orderId);
    await deleteDoc(orderRef);
    return true;
  } catch (error) {
    console.error('Error deleting order:', error);
    return false;
  }
}

export async function clearAllOrdersFromFirebase() {
  try {
    const ordersRef = collection(db, collections.ORDERS);
    const querySnapshot = await getDocs(ordersRef);
    const deletePromises = querySnapshot.docs.map(doc => deleteDoc(doc.ref));
    await Promise.all(deletePromises);
    return true;
  } catch (error) {
    console.error('Error clearing orders:', error);
    return false;
  }
}

export async function updateOrderByTicketNumber(ticketNumber: string, updateData: any) {
  try {
    const ordersRef = collection(db, collections.ORDERS);
    const { where, query, getDocs } = await import('firebase/firestore');
    const q = query(ordersRef, where('ticket_number', '==', ticketNumber));
    const querySnapshot = await getDocs(q);
    
    if (querySnapshot.empty) return false;
    
    const docId = querySnapshot.docs[0].id;
    const orderRef = doc(db, collections.ORDERS, docId);
    await updateDoc(orderRef, {
      ...updateData,
      updated_at: serverTimestamp()
    });
    return true;
  } catch (error) {
    console.error('Error updating by ticket number:', error);
    return false;
  }
}
