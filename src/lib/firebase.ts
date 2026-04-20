import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, serverTimestamp, query, orderBy, getDocs, doc, updateDoc } from 'firebase/firestore';
import firebaseConfig from '../../firebase-applet-config.json';

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app, firebaseConfig.firestoreDatabaseId);

export const collections = {
  ORDERS: 'orders'
};

export async function saveOrderToFirebase(orderData: any) {
  try {
    const ordersRef = collection(db, collections.ORDERS);
    await addDoc(ordersRef, {
      ...orderData,
      status: 'pending',
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
    const q = query(ordersRef, orderBy('created_at', 'desc'));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      ...doc.data(),
      id: doc.id,
      // Convert serverTimestamp to ISO string for consistency
      created_at: doc.data().created_at?.toDate?.()?.toISOString() || new Date().toISOString()
    }));
  } catch (error) {
    console.error('Error fetching from Firebase:', error);
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
    console.error('Error updating order:', error);
    return false;
  }
}
