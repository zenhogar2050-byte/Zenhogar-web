import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar
} from 'recharts';
import { 
  LayoutDashboard, 
  Package, 
  Clock, 
  CheckCircle2, 
  XCircle, 
  Trash2, 
  Search, 
  Filter, 
  MoreVertical, 
  RefreshCw,
  DollarSign, 
  TrendingUp,
  User,
  Phone,
  Mail,
  ExternalLink,
  Info,
  Lock,
  Eye,
  EyeOff,
  Download,
  FileSpreadsheet,
  Edit,
  Save,
  Truck,
  ShoppingBag,
  X,
  ClipboardCheck,
  Clipboard,
  FileText,
  MapPin,
  Calendar,
  Activity,
  Settings,
  Hash,
  Home
} from 'lucide-react';
import { formatCurrency, cn } from '../utils';
import { getOrdersFromFirebase, updateOrderStatusInFirebase, deleteOrderFromFirebase, clearAllOrdersFromFirebase, db, getCurrentCounterValue, updateCounterValue, getNextOrderTicket, saveOrderToFirebase } from '../lib/firebase';
import InventoryManager from '../components/InventoryManager';
import { useInventory } from '../hooks/useInventory';
import { doc, updateDoc, collection, getDocs, deleteDoc, serverTimestamp } from 'firebase/firestore';
import { PRODUCTS, GIFT_PRODUCTS, PROMOTIONS, COMBO_OF_THE_MONTH, CATEGORIES, COLOMBIA_DATA, ECUADOR_DATA } from '../constants';
import * as XLSX from 'xlsx';

interface Order {
  id: string;
  gclid?: string;
  customer: {
    nombre?: string;
    apellido?: string;
    fullName?: string;
    email?: string;
    telefono?: string;
    phone?: string;
    identification?: string;
    ciudad?: string;
    city?: string;
    direccion?: string;
    address?: string;
    department?: string;
    departamento?: string;
    gclid?: string;
  };
  cart?: {
    items: any[];
    total: number;
  };
  order_details?: string;
  tracking_guide?: string;
  ticket_number?: string;
  mastershop_status?: 'sync_success' | 'pending_manual';
  total?: number;
  status: 'pending' | 'confirmed' | 'ready_to_ship' | 'shipped_with_guide' | 'in_transit' | 'delivered' | 'completed' | 'finalizada' | 'waiting_delivery' | 'declined' | 'cancelled' | 'with_issue';
  type: 'order' | 'abandoned';
  created_at: string;
}

const formatDuration = (ms: number) => {
  if (ms <= 0) return 'N/A';
  const mins = Math.floor(ms / (1000 * 60));
  const hours = Math.floor(ms / (1000 * 60 * 60));
  const days = Math.floor(ms / (1000 * 60 * 60 * 24));

  if (days > 0) {
    const remainingHours = hours % 24;
    return `${days}d ${remainingHours}h`;
  }
  if (hours > 0) {
    const remainingMins = mins % 60;
    return `${hours}h ${remainingMins}m`;
  }
  return `${mins}m`;
};

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [selectedCountry, setSelectedCountry] = useState<'CO' | 'EC'>(() => {
    return (localStorage.getItem('admin_selected_country') as 'CO' | 'EC') || 'CO';
  });

  const handleCountryChange = (country: 'CO' | 'EC') => {
    setSelectedCountry(country);
    localStorage.setItem('admin_selected_country', country);
  };

  const getOrderCountry = (o: any): 'CO' | 'EC' => {
    if (!o) return selectedCountry;

    // 1. Explicit country property
    const c = (o.country || o.customer?.country || '').toString().trim().toUpperCase();
    if (c === 'EC' || c === 'ECUADOR') return 'EC';
    if (c === 'CO' || c === 'COLOMBIA') return 'CO';

    // 2. Explicit currency property
    const curr = (o.currency || o.cart?.currency || '').toString().trim().toUpperCase();
    if (curr === 'USD') return 'EC';
    if (curr === 'COP') return 'CO';

    // 3. Total monetary value threshold (COP orders are > $1,000 COP, USD orders in Ecuador are $20-$150)
    const val = Number(o.total) || Number(o.cart?.total) || 0;
    if (val > 1000) return 'CO';

    // 4. Phone prefix or structure check
    const phone = (o.customer?.phone || o.customer?.telefono || '').toString().trim();
    if (phone.startsWith('+593') || phone.startsWith('593')) return 'EC';
    if (phone.startsWith('+57') || phone.startsWith('57') || (phone.length === 10 && phone.startsWith('3'))) return 'CO';

    // 5. City exact match in COLOMBIA_DATA vs ECUADOR_DATA
    const dept = (o.customer?.department || o.customer?.departamento || '').trim().toLowerCase();
    const city = (o.customer?.city || o.customer?.ciudad || '').trim().toLowerCase();

    if (city) {
      for (const cities of Object.values(COLOMBIA_DATA)) {
        if (cities.some(cit => cit.toLowerCase() === city)) return 'CO';
      }
      for (const cities of Object.values(ECUADOR_DATA)) {
        if (cities.some(cit => cit.toLowerCase() === city)) return 'EC';
      }
    }

    // 6. Department vs Province unique match
    if (dept) {
      const colombiaDepts = Object.keys(COLOMBIA_DATA).map(d => d.toLowerCase());
      const ecuadorProvinces = Object.keys(ECUADOR_DATA).map(p => p.toLowerCase());

      const inCo = colombiaDepts.some(d => d === dept || dept.includes(d));
      const inEc = ecuadorProvinces.some(p => p === dept || dept.includes(p));

      if (inCo && !inEc) return 'CO';
      if (inEc && !inCo) return 'EC';
    }

    return 'CO';
  };

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<'all' | 'order' | 'abandoned'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [editingCell, setEditingCell] = useState<{ id: string, field: string } | null>(null);
  const [editValue, setEditValue] = useState('');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [trackingInput, setTrackingInput] = useState('');
  const [copying, setCopying] = useState(false);
  const [activeTab, setActiveTab] = useState<'orders' | 'analytics' | 'inventory' | 'settings' | 'routes'>('orders');
  const [copiedRouteId, setCopiedRouteId] = useState<string | null>(null);
  const [systemCounter, setSystemCounter] = useState<number>(1000);

  const handleCopyRouteLink = (path: string, routeId: string) => {
    const fullUrl = `https://zenhogar.live${path}`;
    navigator.clipboard.writeText(fullUrl).then(() => {
      setCopiedRouteId(routeId);
      setTimeout(() => setCopiedRouteId(null), 2000);
    }).catch(err => {
      console.error('Error copying link:', err);
    });
  };
  const [isUpdatingCounter, setIsUpdatingCounter] = useState(false);
  const [isEditingCustomer, setIsEditingCustomer] = useState(false);
  const [editedCustomer, setEditedCustomer] = useState<any>(null);
  const [selectedOrderIds, setSelectedOrderIds] = useState<Set<string>>(new Set());

  const [isSavingManualOrder, setIsSavingManualOrder] = useState(false);

  const { inventory } = useInventory();
  const [manualOrderItems, setManualOrderItems] = useState<any[]>([]);
  const [manualProductSearchTerm, setManualProductSearchTerm] = useState('');

  const updateManualOrderProducts = (newItems: any[], currentOrder: any) => {
    setManualOrderItems(newItems);
    if (!currentOrder) return;

    // Calculate details text
    const detailsText = newItems
      .map(item => `${item.quantity}x ${item.name} (${formatCurrency(item.price, selectedCountry)})`)
      .join(', ');

    // Calculate total price
    const totalSum = newItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);

    setSelectedOrder({
      ...currentOrder,
      order_details: detailsText,
      total: totalSum
    });
  };

  const handleToggleManualProduct = (prod: any) => {
    if (!selectedOrder) return;
    const exists = manualOrderItems.find(item => item.internalId === prod.internalId);
    if (exists) {
      const filtered = manualOrderItems.filter(item => item.internalId !== prod.internalId);
      updateManualOrderProducts(filtered, selectedOrder);
    } else {
      const newItem = {
        internalId: prod.internalId,
        idProduct: prod.idProduct || null,
        name: prod.name,
        price: prod.basePrice || 0,
        quantity: 1
      };
      updateManualOrderProducts([...manualOrderItems, newItem], selectedOrder);
    }
  };

  const handleUpdateManualProductQuantity = (internalId: string, q: number) => {
    if (!selectedOrder) return;
    const updated = manualOrderItems.map(item => {
      if (item.internalId === internalId) {
        return { ...item, quantity: Math.max(1, q) };
      }
      return item;
    });
    updateManualOrderProducts(updated, selectedOrder);
  };

  const handleUpdateManualProductPrice = (internalId: string, p: number) => {
    if (!selectedOrder) return;
    const updated = manualOrderItems.map(item => {
      if (item.internalId === internalId) {
        return { ...item, price: Math.max(0, p) };
      }
      return item;
    });
    updateManualOrderProducts(updated, selectedOrder);
  };

  const openNewManualOrderModal = () => {
    setManualOrderItems([]);
    setManualProductSearchTerm('');
    setSelectedOrder({
      id: 'draft-new',
      customer: {
        nombre: '',
        apellido: '',
        fullName: '',
        email: '',
        telefono: '',
        phone: '',
        identification: '',
        ciudad: '',
        city: '',
        direccion: '',
        address: '',
        department: '',
        departamento: ''
      },
      cart: {
        items: [],
        total: 0
      },
      order_details: '',
      tracking_guide: '',
      ticket_number: '',
      status: 'pending',
      type: 'order',
      created_at: new Date().toISOString()
    });
  };

  const handleCreateManualOrder = async () => {
    if (!selectedOrder) return;
    const { customer, order_details, total, tracking_guide, status } = selectedOrder;

    const nombreVal = (customer.nombre || customer.fullName || '').trim();
    if (!nombreVal) {
      alert('Por favor ingrese el Nombre de Cliente.');
      return;
    }

    const telefonoVal = (customer.telefono || customer.phone || '').trim();
    if (!telefonoVal) {
      alert('Por favor ingrese el Teléfono/Celular.');
      return;
    }

    const direccionVal = (customer.direccion || customer.address || '').trim();
    if (!direccionVal) {
      alert('Por favor ingrese la Dirección y Barrio.');
      return;
    }

    const ciudadVal = (customer.ciudad || customer.city || '').trim();
    if (!ciudadVal) {
      alert('Por favor ingrese la Ciudad.');
      return;
    }

    const departamentoVal = (customer.departamento || customer.department || '').trim();
    if (!departamentoVal) {
      alert('Por favor ingrese el Departamento.');
      return;
    }

    const detailsVal = (order_details || '').trim();
    if (!detailsVal) {
      alert('Por favor ingrese los detalles de los productos adquiridos.');
      return;
    }

    setIsSavingManualOrder(true);
    try {
      // 1. Obtener consecutivo
      const ticketNum = await getNextOrderTicket();
      const customerFullName = (nombreVal + (customer.apellido ? ' ' + customer.apellido : '')).trim();

      // 2. Sincronización con Google Sheets (Gateway Principal)
      const GATEWAY_URL = 'https://zenhogar-api.zenhogar2050.workers.dev';
      const sheetsPayload = {
        type: 'order',
        customer: {
          fullName: customerFullName || "Cliente",
          email: (customer.email || '').trim() || "contacto@zenhogar.live",
          phone: telefonoVal,
          identification: (customer.identification || '').trim() || "123456789",
          address: direccionVal,
          city: ciudadVal,
          department: departamentoVal,
        },
        order_details: detailsVal,
        total: Math.round(Number(total) || 0),
        ticket_number: ticketNum
      };

      try {
        const sheetsResponse = await fetch(GATEWAY_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(sheetsPayload),
        });
        const sheetsResult = await sheetsResponse.json();
        console.log("✅ Pedido manual registrado en Sheets:", sheetsResult);
      } catch (sheetsErr) {
        console.error("❌ Error silencioso registrando pedido manual en Sheets:", sheetsErr);
      }

      // 3. Sincronización con Mastershop (Mastershop Worker Tunnel)
      let mastershopStatus: 'sync_success' | 'pending_manual' = 'sync_success';
      try {
        const orderItemsForMastershop = manualOrderItems.length > 0 ? manualOrderItems : [
          {
            internalId: 'manual',
            productId: 'manual',
            productName: detailsVal,
            name: detailsVal,
            price: Number(total) || 0,
            quantity: 1
          }
        ];

        const resolvedItems = orderItemsForMastershop.flatMap(item => {
          const promo = (item.productId === COMBO_OF_THE_MONTH.id || (item.name || item.productName || '').toLowerCase().includes(COMBO_OF_THE_MONTH.name.toLowerCase()))
            ? COMBO_OF_THE_MONTH
            : PROMOTIONS.find(p => p.id === item.productId || (item.name || item.productName || '').toLowerCase().includes(p.name.toLowerCase()));

          const getMasterId = (id: string, name?: string): number => {
            const product = PRODUCTS.find(p => p.id === id) || 
                            PRODUCTS.find(p => name && p.name.toLowerCase() === name.toLowerCase());
            if (product && product.masterId) return parseInt(product.masterId, 10);
            const gift = GIFT_PRODUCTS.find(g => g.id === id) ||
                         GIFT_PRODUCTS.find(g => name && g.name.toLowerCase() === name.toLowerCase());
            if (gift && gift.masterId) return parseInt(gift.masterId, 10);
            return 0;
          };

          if (promo && (promo as any).products) {
            const promoProducts: string[] = (promo as any).products;
            const totalUnitsInCombo = promoProducts.length * item.quantity;
            const pricePerUnit = Math.round((item.price * item.quantity) / totalUnitsInCombo);
            
            return promoProducts.map(pId => {
              const product = PRODUCTS.find(p => p.id === pId);
              return {
                id_product: getMasterId(pId, product?.name),
                quantity: item.quantity,
                price: pricePerUnit
              };
            });
          } else {
            const itemUnits = (item as any).units;
            const totalUnits = (itemUnits && itemUnits > 1) ? (itemUnits * item.quantity) : item.quantity;
            const pricePerUnit = Math.round((item.price * item.quantity) / totalUnits);
            return [{
              id_product: getMasterId(item.internalId || item.productId, item.name || item.productName),
              quantity: totalUnits,
              price: pricePerUnit
            }];
          }
        });

        const mastershopData = {
          ticket: ticketNum,
          fullName: sheetsPayload.customer.fullName,
          email: sheetsPayload.customer.email,
          phone: sheetsPayload.customer.phone,
          identification: sheetsPayload.customer.identification,
          address: sheetsPayload.customer.address,
          city: sheetsPayload.customer.city,
          department: sheetsPayload.customer.department,
          details: detailsVal.replace(/\n/g, ' '),
          total: Math.round(Number(total) || 0),
          order_items: resolvedItems
        };

        const msResponse = await fetch('https://autosync-ms.zenhogar2050.workers.dev/', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(mastershopData),
          mode: 'cors'
        });

        if (!msResponse.ok) {
          throw new Error(`Mastershop Worker Error: ${msResponse.status}`);
        }
        console.log("✅ Pedido manual registrado en Mastershop");
      } catch (msErr) {
        console.error("⚠️ Sincronización automática de pedido manual con Mastershop falló:", msErr);
        mastershopStatus = 'pending_manual';
      }

      // 4. Formatear y guardar datos del pedido en Firebase
      const newOrderData = {
        customer: {
          nombre: nombreVal,
          apellido: (customer.apellido || '').trim(),
          fullName: customerFullName,
          telefono: telefonoVal,
          phone: telefonoVal,
          email: (customer.email || '').trim(),
          identification: (customer.identification || '').trim(),
          direccion: direccionVal,
          address: direccionVal,
          ciudad: ciudadVal,
          city: ciudadVal,
          departamento: departamentoVal,
          department: departamentoVal,
        },
        cart: {
          items: manualOrderItems.length > 0 ? manualOrderItems.map(item => ({
            id: item.internalId,
            productName: item.name,
            name: item.name,
            price: Number(item.price) || 0,
            quantity: Number(item.quantity) || 1
          })) : [
            {
              id: 'manual',
              productName: detailsVal,
              name: detailsVal,
              price: Number(total) || 0,
              quantity: 1
            }
          ],
          total: Number(total) || 0
        },
        order_details: detailsVal,
        tracking_guide: (tracking_guide || '').trim(),
        ticket_number: ticketNum,
        status: status || 'pending',
        type: 'order',
        mastershop_status: mastershopStatus
      };

      // 5. Guardar en Firebase
      const success = await saveOrderToFirebase(newOrderData);
      if (success) {
        alert(`Pedido manual registrado exitosamente con ticket ${ticketNum}!`);
        setSelectedOrder(null);
        fetchOrders();
      } else {
        alert('Hubo un error al guardar el pedido en base de datos.');
      }
    } catch (err: any) {
      console.error('Error al registrar pedido manual:', err);
      alert('Error técnico al registrar el pedido manual.');
    } finally {
      setIsSavingManualOrder(false);
    }
  };

  const toggleSelectOrder = (id: string) => {
    setSelectedOrderIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const toggleSelectAll = () => {
    const next = new Set<string>();
    if (selectedOrderIds.size < filteredOrders.length) {
      filteredOrders.forEach(o => next.add(o.id));
    }
    setSelectedOrderIds(next);
  };

  const isOrderSelected = (id: string) => selectedOrderIds.has(id);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopying(true);
    setTimeout(() => setCopying(false), 2000);
  };

  const generateClientMessage = (order: Order) => {
    if (!order) return '';
    const ticketStr = order.ticket_number ? `*#${order.ticket_number}*` : '';
    const guideStr = order.tracking_guide ? `\n📦 *Guía de Seguimiento:* ${order.tracking_guide}` : '';
    
    // Add product details safely
    let itemsDetails = '';
    let itemsToProcess = order.cart?.items || [];
    
    if (itemsToProcess.length === 0 && order.id === 'draft-new' && manualOrderItems.length > 0) {
      itemsToProcess = manualOrderItems.map(item => ({
        productName: item.name,
        name: item.name,
        quantity: item.quantity,
        promoLabel: item.promoLabel || item.label || '',
        units: item.units || 1
      }));
    }
    
    if (itemsToProcess.length > 0) {
      itemsDetails = '\n\n🛍️ *Detalle del pedido:* \n' + itemsToProcess.map((item: any) => {
        const name = item.productName || item.name || 'Producto';
        const promoLabelStr = item.promoLabel || item.label ? ` (${item.promoLabel || item.label})` : '';
        const qty = item.quantity || item.qty || 1;
        const units = typeof item.units === 'number' && !isNaN(item.units) && item.units > 0 ? item.units : 1;
        const totalUnits = units * qty;
        return `- ${name}${promoLabelStr} - Cantidad: ${qty} (Total unidades: ${totalUnits})`;
      }).join('\n');
    } else if (order.order_details) {
      itemsDetails = `\n\n🛍️ *Detalle del pedido:* \n- ${order.order_details}`;
    }
    
    const totalVal = order.total || order.cart?.total || 0;
    const totalStr = totalVal > 0 ? `\n💰 *Valor Total:* ${formatCurrency(totalVal, getOrderCountry(order))}` : '';
    
    return `¡Hola ${order.customer.nombre || order.customer.fullName || ''}! Te saludamos de *Zenhogar*. 🌿

Confirmamos que tu pedido ${ticketStr} ha sido procesado correctamente.${itemsDetails}${totalStr}${guideStr}

Pronto recibirás tus productos para que empieces a disfrutar de sus beneficios. Cualquier duda, estamos para ayudarte.

*¡Gracias por confiar en nosotros!*`;
  };

  const fetchOrders = async () => {
    setLoading(true);
    setError(null);
    try {
      const savedPass = password || localStorage.getItem('admin_pass');
      const expectedPass = "Jacobo0812"; // Fallback if env is not reachable on client

      if (!savedPass) {
        setError('Por favor, ingresa la contraseña.');
        setLoading(false);
        return;
      }

      if (savedPass.trim() !== expectedPass) {
        setError('Contraseña incorrecta. Acceso denegado.');
        setIsAuthenticated(false);
        localStorage.removeItem('admin_pass');
        setLoading(false);
        return;
      }

      // Fetch from Firebase (Cloud Discovery)
      const [data, counter] = await Promise.all([
        getOrdersFromFirebase(),
        getCurrentCounterValue()
      ]);
      
      const ordersData = data as any;
      setOrders(ordersData);
      setSystemCounter(counter);

      // Auto-check for counter sync
      const maxStoredTicket = ordersData.reduce((max: number, o: any) => {
        if (o.ticket_number && typeof o.ticket_number === 'string' && o.ticket_number.startsWith('PO-')) {
          const num = parseInt(o.ticket_number.split('-')[1]);
          return !isNaN(num) && num > max ? num : max;
        }
        return max;
      }, 0);

      if (maxStoredTicket > counter) {
        console.warn(`🔄 Desincronización detectada: Último pedido es PO-${maxStoredTicket} pero el contador está en ${counter}`);
        if (window.confirm(`Se ha detectado que hay pedidos registrados hasta el PO-${maxStoredTicket}, pero el contador del sistema está en ${counter}. ¿Deseas sincronizar el contador para que el próximo pedido sea el PO-${maxStoredTicket + 1}?`)) {
          await updateCounterValue(maxStoredTicket);
          setSystemCounter(maxStoredTicket);
        }
      }

      setIsAuthenticated(true);
      localStorage.setItem('admin_pass', savedPass);
      
    } catch (err: any) {
      setError(err.message || 'Error al conectar con la base de datos de Firebase.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateCounter = async (nextValue: number) => {
    const rawValue = nextValue - 1;
    if (!window.confirm(`¿Estás seguro de establecer el PRÓXIMO pedido como #${nextValue}? El sistema guardará el índice #${rawValue} internamente.`)) return;
    
    setIsUpdatingCounter(true);
    try {
      const success = await updateCounterValue(rawValue);
      if (success) {
        setSystemCounter(rawValue);
        alert(`Consecutivo actualizado. El próximo pedido será el PO-${nextValue}.`);
      }
    } catch (err) {
      console.error(err);
      alert('Error al actualizar el consecutivo.');
    } finally {
      setIsUpdatingCounter(false);
    }
  };

  const sendStatusUpdateToSheets = async (payload: { ticket: string; status?: string; tracking_guide?: string; guia?: string }) => {
    const GATEWAY_URL = 'https://zenhogar-api.zenhogar2050.workers.dev';
    
    const sheetsPayload = {
      ...payload,
      type: 'update_status'
    };

    let localApiSuccess = false;
    let fallbackSuccess = false;

    // 1. Intentar con la ruta de la API local de la app
    try {
      console.log("[Sheets Sync] Intentando sincronización mediante /api/orders/status...");
      const response = await fetch('/api/orders/status', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(sheetsPayload)
      });
      if (response.ok) {
        console.log("✅ Sincronizado con Google Sheets usando la API de la app");
        localApiSuccess = true;
      } else {
        console.warn(`[Sheets Sync] Respuesta no exitosa de /api/orders/status: ${response.status}`);
      }
    } catch (err: any) {
      console.warn("[Sheets Sync] Error conectando a la API local:", err.message);
    }

    // 2. Intentar de forma redundante / autónoma con el Cloudflare Worker directo
    try {
      console.log("[Sheets Sync] Intentando sincronización directa con Cloudflare Gateway...");
      const response = await fetch(GATEWAY_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(sheetsPayload)
      });
      if (response.ok) {
        console.log("✅ Sincronizado con Google Sheets usando Cloudflare Gateway");
        fallbackSuccess = true;
      } else {
        console.error(`[Sheets Sync] Gateway respondió con status: ${response.status}`);
      }
    } catch (err: any) {
      console.error("[Sheets Sync] Error de fallback en Cloudflare Gateway:", err.message);
    }

    return localApiSuccess || fallbackSuccess;
  };

  const updateStatus = async (orderId: string, status: string) => {
    const order = orders.find(o => o.id === orderId);
    if (!order) return;

    const originalStatus = order.status;

    // Optimistic update for better UX
    setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status: status as any } : o));
    
    try {
      // Traducir código de estado interno a etiqueta en español y legible para Sheets
      let labelSheet = status;
      if (status === 'pending') labelSheet = 'Pendiente';
      else if (status === 'confirmed') labelSheet = 'Confirmado';
      else if (status === 'ready_to_ship') labelSheet = 'Por Alistar';
      else if (status === 'shipped_with_guide') labelSheet = 'Guía Generada';
      else if (status === 'in_transit') labelSheet = 'En Tránsito';
      else if (status === 'delivered') labelSheet = 'Entregado';
      else if (status === 'finalizada') labelSheet = 'Finalizada';
      else if (status === 'waiting_delivery') labelSheet = 'Espera Entrega';
      else if (status === 'declined') labelSheet = 'Declinada';
      else if (status === 'cancelled') labelSheet = 'Cancelado';
      else if (status === 'with_issue') labelSheet = 'Con Novedad';

      // REGLA: Si el estado es "completed", "finalizada", "cancelled" o "cancelada", actualizar Google Sheets y borrar del admin
      if (status === 'completed' || status === 'finalizada' || status === 'cancelled' || status === 'cancelada') {
        const isCancel = status === 'cancelled' || status === 'cancelada';
        const labelCompleto = isCancel ? 'CANCELADO' : 'FINALIZADO';
        const labelSheetFinal = isCancel ? 'Cancelada' : 'Finalizada';

        const confirmCompleted = window.confirm(`¿Confirmas que el pedido ${order.ticket_number || order.id} está ${labelCompleto}? Se actualizará en el Google Sheet y se borrará de este panel.`);
        if (!confirmCompleted) {
          setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status: originalStatus as any } : o));
          return;
        }

        const sheetsSynced = await sendStatusUpdateToSheets({ 
          ticket: order.ticket_number || order.id, 
          status: labelSheetFinal 
        });

        if (sheetsSynced) {
          await deleteOrderFromFirebase(orderId);
          setOrders(prev => prev.filter(o => o.id !== orderId));
          if (selectedOrder?.id === orderId) setSelectedOrder(null);
          return;
        } else {
          throw new Error('Error al actualizar estado en Google Sheets (Sincronización fallida)');
        }
      }

      // Para otros estados (intermedios), actualizar en Firebase
      const success = await updateOrderStatusInFirebase(orderId, status);
      if (!success) {
        alert('Error al guardar el cambio en la base de datos. Intente de nuevo.');
        fetchOrders(); // Revert to server state
        return;
      }

      // Y también enviar la actualización del estado a Google Sheets de manera transparente
      try {
        await sendStatusUpdateToSheets({ 
          ticket: order.ticket_number || order.id, 
          status: labelSheet 
        });
      } catch (sheetErr) {
        console.error('Error synchronizing intermediate status to Google Sheets:', sheetErr);
      }

    } catch (err: any) {
      console.error('Error updating status:', err);
      alert(err.message || 'Error técnico al actualizar el estado.');
      fetchOrders(); // Revert to server state
    }
  };


  const handleSyncPendingOrders = async () => {
    console.log("Iniciando sincronización de pedidos pendientes");
    if (!window.confirm("¿Sincronizar pedidos pendientes con Google Sheets?")) return;
    const pendientes = filteredOrders.filter(o => o.type === 'order' && o.mastershop_status !== 'sync_success');
    console.log("Pedidos pendientes encontrados:", pendientes.length);
    
    for (const order of pendientes) {
        console.log("Sincronizando pedido:", order.id, order.ticket_number);
        try {
            await sendStatusUpdateToSheets({ 
                ticket: order.ticket_number || order.id, 
                tracking_guide: order.tracking_guide || '',
                guia: order.tracking_guide || '',
                status: order.status || 'shipped_with_guide'
            });
            console.log("Pedido sincronizado:", order.id);
        } catch (err) {
            console.error(`Error syncing order ${order.id}:`, err);
        }
    }
    alert("Sincronización de pedidos pendiente finalizada.");
  };

  const handleSaveCell = async (orderId: string, field: string, value: string) => {
    // Optimistic update
    if (field === 'tracking_guide') {
      setOrders(prev => prev.map(o => o.id === orderId ? { ...o, tracking_guide: value } : o));
    }

    try {
      const orderRef = doc(db, 'orders', orderId);
      let updateData: any = {
        updated_at: serverTimestamp()
      };
      
      if (field.startsWith('customer.')) {
        updateData[field] = value;
      } else if (field === 'total') {
        updateData[field] = parseFloat(value);
      } else {
        updateData[field] = value;
      }

      await updateDoc(orderRef, updateData);
      setEditingCell(null);

      // Sincronizar guía al Google Sheets si corresponde
      if (field === 'tracking_guide') {
        const order = orders.find(o => o.id === orderId);
        if (order) {
          let labelSheet: string = order.status || 'shipped_with_guide';
          if (labelSheet === 'pending') labelSheet = 'Pendiente';
          else if (labelSheet === 'confirmed') labelSheet = 'Confirmado';
          else if (labelSheet === 'ready_to_ship') labelSheet = 'Por Alistar';
          else if (labelSheet === 'shipped_with_guide') labelSheet = 'Guía Generada';
          else if (labelSheet === 'in_transit') labelSheet = 'En Tránsito';
          else if (labelSheet === 'delivered') labelSheet = 'Entregado';
          else if (labelSheet === 'finalizada') labelSheet = 'Finalizada';
          else if (labelSheet === 'waiting_delivery') labelSheet = 'Espera Entrega';
          else if (labelSheet === 'declined') labelSheet = 'Declinada';
          else if (labelSheet === 'cancelled') labelSheet = 'Cancelado';
          else if (labelSheet === 'with_issue') labelSheet = 'Con Novedad';

          try {
            await sendStatusUpdateToSheets({ 
              ticket: order.ticket_number || order.id, 
              tracking_guide: value,
              guia: value,
              status: labelSheet
            });
          } catch (sheetErr) {
            console.error('Error synchronizing guide to Google Sheets from Cell:', sheetErr);
          }
        }
      }

      // No need to fetch immediately if optimistic worked, but let's do it for consistency
      // fetchOrders(); 
    } catch (err) {
      console.error('Error saving cell:', err);
      fetchOrders(); // Rollback on error
    }
  };

  const handleUpdateContent = async (orderId: string) => {
    handleSaveCell(orderId, 'order_details', editValue);
  };

  const handleSaveCustomer = async () => {
    if (!selectedOrder || !editedCustomer) return;
    try {
      const orderRef = doc(db, 'orders', selectedOrder.id);
      await updateDoc(orderRef, { customer: editedCustomer });
      setSelectedOrder({ ...selectedOrder, customer: editedCustomer });
      setIsEditingCustomer(false);
      fetchOrders();
    } catch (err) {
      console.error('Error saving customer:', err);
      alert('Error al guardar los datos del cliente');
    }
  };

  const handleUpdateTracking = async (orderId: string, customStatus?: string) => {
    if (customStatus === 'completed' || customStatus === 'finalizada' || customStatus === 'cancelled' || customStatus === 'cancelada') {
      return updateStatus(orderId, customStatus);
    }
    try {
      const orderRef = doc(db, 'orders', orderId);
      const newStatus = customStatus || (trackingInput ? 'shipped_with_guide' : undefined);
      
      const updateData: any = { tracking_guide: trackingInput };
      if (newStatus) {
        updateData.status = newStatus;
      }
      
      await updateDoc(orderRef, updateData);

      // Sincronizar guía al Google Sheets
      const order = orders.find(o => o.id === orderId);
      if (order) {
        let labelSheet: string = newStatus || order.status || 'shipped_with_guide';
        if (labelSheet === 'pending') labelSheet = 'Pendiente';
        else if (labelSheet === 'confirmed') labelSheet = 'Confirmado';
        else if (labelSheet === 'ready_to_ship') labelSheet = 'Por Alistar';
        else if (labelSheet === 'shipped_with_guide') labelSheet = 'Guía Generada';
        else if (labelSheet === 'in_transit') labelSheet = 'En Tránsito';
        else if (labelSheet === 'delivered') labelSheet = 'Entregado';
        else if (labelSheet === 'finalizada') labelSheet = 'Finalizada';
        else if (labelSheet === 'waiting_delivery') labelSheet = 'Espera Entrega';
        else if (labelSheet === 'declined') labelSheet = 'Declinada';
        else if (labelSheet === 'cancelled') labelSheet = 'Cancelado';
        else if (labelSheet === 'with_issue') labelSheet = 'Con Novedad';

        try {
          await sendStatusUpdateToSheets({ 
            ticket: order.ticket_number || order.id, 
            tracking_guide: trackingInput,
            guia: trackingInput,
            status: labelSheet
          });
        } catch (sheetErr) {
          console.error('Error synchronizing tracking from modal to Google Sheets:', sheetErr);
        }
      }

      setSelectedOrder(prev => prev ? { 
        ...prev, 
        tracking_guide: trackingInput,
        status: (newStatus || prev.status) as Order['status']
      } : null);
      fetchOrders();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteOrder = async (orderId: string) => {
    if (!window.confirm('¿Estás seguro de que deseas eliminar este cliente/pedido? Esta acción no se puede deshacer.')) return;
    try {
      const success = await deleteOrderFromFirebase(orderId);
      if (success) fetchOrders();
    } catch (err) {
      console.error(err);
    }
  };

  const downloadAuditExcel = (dataToExport?: Order[]) => {
    const headers = [
      "Ticket N°", 
      "Fecha y Hora", 
      "Nombre", 
      "Celular", 
      "Email", 
      "Direccion", 
      "Ciudad", 
      "Departamento", 
      "Producto", 
      "Valor", 
      "Guia", 
      "Estado"
    ];

    const sourceData = dataToExport || filteredOrders;
    const rows: any[] = [];

    sourceData.forEach(o => {
      const customer = o.customer || {};
      const fullName = (customer.nombre ? `${customer.nombre} ${customer.apellido || ''}` : (customer.fullName || '')).trim();
      const phone = (customer.telefono || customer.phone || '').replace(/\s/g, '');
      const date = o.created_at ? new Date(o.created_at).toLocaleString('es-CO') : 'N/A';
      
      const items = o.cart?.items || [];
      const productStr = items.length > 0 
        ? items.map((i: any) => `${i.name || i.productName} (x${i.quantity || 1})`).join(' | ')
        : 'S/D';

      rows.push([
        o.ticket_number || o.id.slice(0, 8),
        date,
        fullName,
        phone,
        customer.email || '',
        customer.direccion || customer.address || '',
        customer.ciudad || customer.city || '',
        customer.department || customer.departamento || '',
        productStr,
        Math.round(o.total || o.cart?.total || 0),
        o.tracking_guide || '',
        o.status
      ]);
    });

    const now = new Date();
    const dateFormatted = `${String(now.getDate()).padStart(2, '0')}-${String(now.getMonth() + 1).padStart(2, '0')}-${now.getFullYear()}`;

    const ws = XLSX.utils.aoa_to_sheet([headers, ...rows]);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Backup_Auditoria");
    XLSX.writeFile(wb, `Respaldo-Zenhogar-${dateFormatted}.xlsx`);
  };

  const handleClearAllOrders = async () => {
    if (orders.length === 0) {
      alert('No hay pedidos para borrar.');
      return;
    }

    if (window.confirm('¿Deseas descargar un respaldo en Excel antes de purgar la base de datos? (Recomendado)')) {
      downloadAuditExcel();
    }

    if (!window.confirm('¡ATENCIÓN! EstÁS a punto de borrar TODOS los pedidos de la base de datos. Esta acción es definitiva. ¿Deseas continuar?')) return;
    
    setLoading(true);
    try {
      const ordersRef = collection(db, 'orders');
      const querySnapshot = await getDocs(ordersRef);
      const deletePromises = querySnapshot.docs.map(doc => deleteDoc(doc.ref));
      await Promise.all(deletePromises);
      alert('Base de datos purgada completamente.');
      fetchOrders();
    } catch (err) {
      console.error(err);
      alert('Error técnico al borrar pedidos.');
    } finally {
      setLoading(false);
    }
  };

  const cleanOldOrders = async () => {
    const tenDaysAgo = new Date();
    tenDaysAgo.setDate(tenDaysAgo.getDate() - 10);
    
    const targets = orders.filter(o => {
      const createdAt = o.created_at ? new Date(o.created_at) : new Date();
      const isTest = (o.customer?.fullName || o.customer?.nombre || '').toLowerCase().includes('prueba') || 
                     (o.order_details || '').toLowerCase().includes('test');
      return createdAt < tenDaysAgo || isTest;
    });

    if (targets.length === 0) {
      alert('No se encontraron pedidos antiguos o de prueba para limpiar.');
      return;
    }

    if (window.confirm(`Se encontraron ${targets.length} registros para limpiar. ¿Deseas descargar un respaldo de estos registros antes de eliminarlos?`)) {
      downloadAuditExcel(targets);
    }

    if (!window.confirm(`¿Confirmas la eliminación de estos ${targets.length} registros?`)) return;
    
    setLoading(true);
    try {
      const deletePromises = targets.map(o => deleteDoc(doc(db, 'orders', o.id)));
      await Promise.all(deletePromises);
      alert(`Limpieza completada. Se eliminaron ${targets.length} registros.`);
      fetchOrders();
    } catch (err) {
      console.error(err);
      alert('Error al realizar la limpieza selectiva.');
    } finally {
      setLoading(false);
    }
  };

  const downloadExcel = () => {
    // Exact column order for MasterShop as requested in rule audit
    const headers = [
      "IDENTIFICADOR", 
      "NOMBRES*", 
      "APELLIDOS", 
      "CEDULA (OPCIONAL)", 
      "TELÉFONO", 
      "DIRECCIÓN Y BARRIO*", 
      "DEPARTAMENTO*", 
      "CIUDAD*", 
      "ID DE PRODUCTO*", 
      "ID DE VARIACION*", 
      "CANTIDAD*", 
      "PRECIO UNITARIO (SIN PUNTOS NI COMAS)*", 
      "OTROS CARGOS", 
      "VALOR OTROS CARGOS", 
      "CON RECAUDO (SI/NO)*", 
      "NOTA", 
      "EMAIL (OPCIONAL)"
    ];

    const rows: any[] = [];

    const ordersToExport = (selectedOrderIds.size > 0 
      ? filteredOrders.filter(o => selectedOrderIds.has(o.id))
      : filteredOrders).filter(o => o.type === 'order');

    ordersToExport.forEach(o => {
      const customer = o.customer || {};
      const fullName = (customer.fullName || (customer.nombre ? `${customer.nombre} ${customer.apellido || ''}` : '')).trim();
      
      // REGLA 1 (Auditoría): Si no hay nombre y apellido, no se genera el pedido
      const nameParts = fullName.split(/\s+/).filter(part => part.length > 0);
      if (nameParts.length === 0) return;

      const firstName = nameParts[0];
      const lastName = nameParts.length > 1 ? nameParts.slice(1).join(' ') : '0';

      const phone = (customer.telefono || customer.phone || '0').replace(/\s/g, '');
      const items = o.cart?.items || [];
      
      const getMasterId = (id: string, name?: string): number => {
        const product = PRODUCTS.find(p => p.id === id) || 
                        PRODUCTS.find(p => name && p.name.toLowerCase() === name.toLowerCase());
        if (product && product.masterId) return parseInt(product.masterId, 10);
        
        const gift = GIFT_PRODUCTS.find(g => g.id === id) ||
                     GIFT_PRODUCTS.find(g => name && g.name.toLowerCase() === name.toLowerCase());
        if (gift && gift.masterId) return parseInt(gift.masterId, 10);
        
        return 0;
      };

      const addRow = (productInternalId: string, unitPrice: number, quantity: number, nameHint?: string) => {
        const masterIdNum = getMasterId(productInternalId, nameHint);
        rows.push([
          o.ticket_number || o.id.slice(0, 8),
          firstName || '0',
          lastName || '0',
          customer.identification || 0,
          phone,
          customer.direccion || customer.address || 0,
          customer.department || customer.departamento || 0,
          customer.ciudad || customer.city || 0,
          masterIdNum,
          0, // ID DE VARIACION siempre 0
          quantity, 
          Math.round(unitPrice), // PRECIO UNITARIO (SIN PUNTOS NI COMAS)
          0, // OTROS CARGOS
          0, // VALOR OTROS CARGOS
          "SI", // CON RECAUDO siempre SI
          (o.order_details || '').replace(/\n/g, ' ') || 0,
          customer.email || 0
        ]);
      };

      if (items.length === 0) {
        // Fallback para pedidos manuales sin estructura de carrito
        addRow('0', Math.round(o.total || o.cart?.total || 0), 1, o.order_details);
      } else {
        items.forEach((item: any) => {
          const itemName = item.name || item.productName || 'Producto';
          const itemTotal = item.price ? (item.price * (item.quantity || 1)) : 0;
          const comboQty = item.quantity || 1;
          
          // REGLA 4: Lógica de desgloses de Combos e ID Master
          const combo = (item.productId === COMBO_OF_THE_MONTH.id || itemName.toLowerCase().includes(COMBO_OF_THE_MONTH.name.toLowerCase()))
            ? COMBO_OF_THE_MONTH
            : PROMOTIONS.find(p => p.id === item.productId || itemName.toLowerCase().includes(p.name.toLowerCase()));

          if (combo && combo.products) {
            // Desglose de Combos (ej: Inmunidad Dual)
            const totalUnitsInComboResult = combo.products.length * comboQty;
            const pricePerUnitInCombo = itemTotal / totalUnitsInComboResult;
            
            combo.products.forEach(pId => {
              // Cada producto mantiene la cantidad del combo solicitada
              addRow(pId, pricePerUnitInCombo, comboQty);
            });
          } 
          // REGLA 4: Promociones Multiunidad (Pague 2 Lleve 3)
          else if (item.units && item.units > 1) {
            const totalUnits = item.units * comboQty;
            const pricePerUnit = itemTotal / totalUnits;
            addRow(item.productId || item.id || '0', pricePerUnit, totalUnits, itemName);
          }
          // Productos estándar
          else {
            const pricePerUnit = comboQty > 0 ? (itemTotal / comboQty) : 0;
            addRow(item.productId || item.id || '0', pricePerUnit, comboQty, itemName);
          }
        });
      }
    });

    if (rows.length === 0) {
      alert("No hay pedidos válidos para exportar (revisa que tengan nombre y apellido).");
      return;
    }

    const now = new Date();
    const dateFormatted = `${String(now.getDate()).padStart(2, '0')}-${String(now.getMonth() + 1).padStart(2, '0')}-${now.getFullYear()}`;

    const ws = XLSX.utils.aoa_to_sheet([headers, ...rows]);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Importacion_Mastershop");
    
    // Mandatorio .xlsm
    XLSX.writeFile(wb, `plantilla-importacion-pedidos-${dateFormatted}.xlsm`, { bookType: 'xlsm' });
  };

  useEffect(() => {
    const savedPass = localStorage.getItem('admin_pass');
    if (savedPass) {
      fetchOrders();
    }
  }, []);

  const filteredOrders = useMemo(() => (orders || [])
    .filter(o => o && getOrderCountry(o) === selectedCountry)
    .filter(o => filter === 'all' || o.type === filter)
    .filter(o => {
      if (selectedStatuses.length === 0) return true;
      return selectedStatuses.includes(o.status);
    })
    .filter(o => {
      if (!startDate && !endDate) return true;
      const orderDate = o.created_at ? new Date(o.created_at) : new Date();
      orderDate.setHours(0, 0, 0, 0);
      
      if (startDate) {
        const start = new Date(startDate);
        start.setHours(0, 0, 0, 0);
        if (orderDate < start) return false;
      }
      
      if (endDate) {
        const end = new Date(endDate);
        end.setHours(23, 59, 59, 999);
        if (orderDate > end) return false;
      }
      
      return true;
    })
    .filter(o => {
      const search = (searchTerm || '').toLowerCase();
      if (!search) return true;
      const customer = o.customer || {};
      const name = (customer.nombre || customer.fullName || '').toLowerCase();
      const surname = (customer.apellido || '').toLowerCase();
      const phone = customer.telefono || customer.phone || '';
      const email = (customer.email || '').toLowerCase();
      const ticket = (o.ticket_number || '').toLowerCase();

      return (
        name.includes(search) ||
        surname.includes(search) ||
        phone.includes(search) ||
        email.includes(search) ||
        ticket.includes(search)
      );
    }), [orders, filter, searchTerm, startDate, endDate, selectedStatuses, selectedCountry]);

  const buildMastershopPayload = (order: Order) => {
    const customer = order.customer || {};
    const items = order.cart?.items || [];
    
    // 1. Resolve IDs and Desglose here (Frontend contexts)
    const resolvedItems = items.flatMap((item: any) => {
      const itemName = item.name || item.productName || 'Producto';
      const promo = (item.productId === COMBO_OF_THE_MONTH.id || itemName.toLowerCase().includes(COMBO_OF_THE_MONTH.name.toLowerCase()))
        ? COMBO_OF_THE_MONTH
        : PROMOTIONS.find(p => p.id === item.productId || itemName.toLowerCase().includes(p.name.toLowerCase()));

      const getMasterIdNum = (id: string, name?: string): number => {
        const product = PRODUCTS.find(p => p.id === id) || 
                        PRODUCTS.find(p => name && p.name.toLowerCase() === name.toLowerCase());
        if (product && product.masterId) return parseInt(product.masterId, 10);
        const gift = GIFT_PRODUCTS.find(g => g.id === id) ||
                     GIFT_PRODUCTS.find(g => name && g.name.toLowerCase() === name.toLowerCase());
        if (gift && gift.masterId) return parseInt(gift.masterId, 10);
        return 0;
      };

      if (promo && (promo as any).products) {
        const promoProducts: string[] = (promo as any).products;
        const totalUnitsInCombo = promoProducts.length * (item.quantity || 1);
        const pricePerUnit = Math.round((item.price * (item.quantity || 1)) / totalUnitsInCombo);
        
        return promoProducts.map(pId => {
          const product = PRODUCTS.find(p => p.id === pId);
          return {
            id_product: getMasterIdNum(pId, product?.name),
            quantity: item.quantity || 1,
            price: pricePerUnit
          };
        });
      } else {
        const totalUnits = (item.units && item.units > 1) ? (item.units * (item.quantity || 1)) : (item.quantity || 1);
        const pricePerUnit = Math.round((item.price * (item.quantity || 1)) / totalUnits);
        return [{
          id_product: getMasterIdNum(item.productId || item.id, itemName),
          quantity: totalUnits,
          price: pricePerUnit
        }];
      }
    });

    return {
      ticket: order.ticket_number || order.id,
      fullName: (customer.fullName || (customer.nombre ? `${customer.nombre} ${customer.apellido || ''}` : '')).trim(),
      email: (customer.email || "").trim(),
      phone: (customer.phone || customer.telefono || "").toString().trim(),
      identification: (customer.identification || "").toString().trim(),
      address: (customer.address || customer.direccion || "").trim(),
      city: (customer.city || customer.ciudad || "").trim(),
      department: (customer.department || customer.departamento || "").trim(),
      details: (order.order_details || "").replace(/\n/g, ' '),
      total: Math.round(order.total || order.cart?.total || 0),
      order_items: resolvedItems
    };
  };

  const syncOrderWithMastershop = async (order: Order) => {
    const MASTER_TUNNEL_URL = 'https://autosync-ms.zenhogar2050.workers.dev/';
    const payload = buildMastershopPayload(order);
    
    try {
      const response = await fetch(MASTER_TUNNEL_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
        mode: 'cors'
      });
      return response.ok;
    } catch (err) {
      console.error("Error syncing with Mastershop:", err);
      return false;
    }
  };

  const stats = useMemo(() => {
    const ordersOnly = filteredOrders.filter(o => o.type === 'order');
    const checkoutsOnly = filteredOrders.filter(o => o.type === 'abandoned');
    
    return {
      ingresosEstimados: ordersOnly.reduce((acc, curr) => acc + (Number(curr?.total) || Number(curr?.cart?.total) || 0), 0),
      pedidosTotales: ordersOnly.length,
      carritosAbandonados: checkoutsOnly.length,
      pendientesEnvio: ordersOnly.filter(o => ['pending', 'pending_validation'].includes(o.status)).length
    };
  }, [filteredOrders]);

  const statusPipelineStats = useMemo(() => {
    const statsMap: Record<string, { count: number; totalMs: number; maxMs: number }> = {};
    
    const activeStatuses = [
      { id: 'pending', label: 'Pendiente', color: 'amber' },
      { id: 'confirmed', label: 'Confirmado', color: 'emerald' },
      { id: 'ready_to_ship', label: 'Por Alistar', color: 'blue' },
      { id: 'shipped_with_guide', label: 'Guía Generada', color: 'purple' },
      { id: 'in_transit', label: 'En Tránsito', color: 'indigo' },
      { id: 'waiting_delivery', label: 'Espera Entrega', color: 'amber' },
      { id: 'delivered', label: 'Entregado', color: 'emerald' },
      { id: 'with_issue', label: 'Con Novedad', color: 'red' }
    ];

    activeStatuses.forEach(s => {
      statsMap[s.id] = { count: 0, totalMs: 0, maxMs: 0 };
    });

    const now = new Date().getTime();
    const ordersOnly = filteredOrders.filter(o => o.type === 'order');

    ordersOnly.forEach(o => {
      const status = o.status;
      if (!statsMap[status]) return;

      const createdAtStr = o.created_at;
      if (!createdAtStr) {
        statsMap[status].count += 1;
        return;
      }

      const createdAt = new Date(createdAtStr).getTime();
      const ageMs = now - createdAt;
      
      statsMap[status].count += 1;
      if (ageMs > 0) {
        statsMap[status].totalMs += ageMs;
        if (ageMs > statsMap[status].maxMs) {
          statsMap[status].maxMs = ageMs;
        }
      }
    });

    return activeStatuses.map(s => {
      const data = statsMap[s.id];
      const avgMs = data.count > 0 ? (data.totalMs / data.count) : 0;
      return {
        id: s.id,
        label: s.label,
        color: s.color,
        count: data.count,
        avgMs,
        maxMs: data.maxMs
      };
    });
  }, [orders]);

  const chartData = useMemo(() => {
    let daysToDisplay: string[] = [];
    
    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      const current = new Date(start);
      
      // Limit to max 31 days to avoid chart overflow
      let count = 0;
      while (current <= end && count < 31) {
        daysToDisplay.push(current.toISOString().split('T')[0]);
        current.setDate(current.getDate() + 1);
        count++;
      }
    } else {
      daysToDisplay = [...Array(7)].map((_, i) => {
        const d = new Date();
        d.setDate(d.getDate() - i);
        return d.toISOString().split('T')[0];
      }).reverse();
    }

    return daysToDisplay.map(date => {
      const dayOrders = filteredOrders.filter(o => o.created_at?.startsWith(date) && o.type === 'order');
      return {
        name: date.split('-').slice(1).reverse().join('/'),
        ventas: dayOrders.length,
        ingresos: dayOrders.reduce((acc, curr) => acc + (Number(curr.total) || Number(curr.cart?.total) || 0), 0)
      };
    });
  }, [filteredOrders, startDate, endDate]);

  const statusDistribution = useMemo(() => {
    const stats: any = {};
    filteredOrders.filter(o => o.type === 'order').forEach(o => {
      stats[o.status] = (stats[o.status] || 0) + 1;
    });
    return Object.entries(stats).map(([name, value]) => ({ name, value }));
  }, [filteredOrders]);

  const topProducts = useMemo(() => {
    const products: any = {};
    filteredOrders.filter(o => o.type === 'order').forEach(o => {
      o.cart?.items?.forEach((item: any) => {
        const name = item.name || item.productName || 'Desconocido';
        products[name] = (products[name] || 0) + (item.quantity || 1);
      });
    });
    return Object.entries(products)
      .map(([name, sales]) => ({ name, sales: sales as number }))
      .sort((a, b) => b.sales - a.sales)
      .slice(0, 10);
  }, [filteredOrders]);

  const geoStats = useMemo(() => {
    const departments: any = {};
    const cities: any = {};
    
    filteredOrders.filter(o => o.type === 'order').forEach(o => {
      const dept = o.customer?.department || 'No especificado';
      const city = o.customer?.city || 'No especificada';
      departments[dept] = (departments[dept] || 0) + 1;
      cities[city] = (cities[city] || 0) + 1;
    });

    const sortedDepts = Object.entries(departments)
      .map(([name, count]) => ({ name, count: count as number }))
      .sort((a, b) => b.count - a.count);

    const sortedCities = Object.entries(cities)
      .map(([name, count]) => ({ name, count: count as number }))
      .sort((a, b) => b.count - a.count);

    return { departments: sortedDepts, cities: sortedCities };
  }, [filteredOrders]);

  const funnelStats = useMemo(() => {
    const totalCheckouts = filteredOrders.length;
    const completed = filteredOrders.filter(o => o.type === 'order').length;
    const abandoned = filteredOrders.filter(o => o.type === 'abandoned').length;
    
    return [
      { name: 'Checkouts Iniciados', value: totalCheckouts, fill: '#94a3b8' },
      { name: 'Ventas Finalizadas', value: completed, fill: '#10b981' },
      { name: 'Carritos Abandonados', value: abandoned, fill: '#f59e0b' }
    ];
  }, [filteredOrders]);

  const abandonedByProduct = useMemo(() => {
    const products: any = {};
    filteredOrders.filter(o => o.type === 'abandoned').forEach(o => {
      o.cart?.items?.forEach((item: any) => {
        const name = item.name || item.productName || 'Desconocido';
        products[name] = (products[name] || 0) + 1;
      });
    });
    return Object.entries(products)
      .map(([name, count]) => ({ name, count: count as number }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);
  }, [filteredOrders]);

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-stone-900 flex items-center justify-center p-4">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white p-8 rounded-[2.5rem] shadow-2xl w-full max-w-md"
        >
          <div className="flex justify-center mb-8">
            <div className="w-16 h-16 bg-emerald-100 rounded-2xl flex items-center justify-center">
              <Lock className="w-8 h-8 text-emerald-600" />
            </div>
          </div>
          <h1 className="text-2xl font-bold text-center mb-1">Panel de Administración</h1>
          <p className="text-[9px] text-center text-stone-400 font-bold uppercase tracking-[0.2em] mb-6">v1.2.0 - Inventory Smartv2</p>
          <form 
            onSubmit={(e) => { e.preventDefault(); fetchOrders(); }}
            className="space-y-4"
          >
            <div>
              <label className="block text-xs font-bold text-stone-500 uppercase tracking-widest mb-2 px-1">Contraseña de acceso</label>
              <div className="relative">
                <input 
                  type={showPassword ? "text" : "password"} 
                  value={password}
                  onChange={(e) => { setPassword(e.target.value); setError(null); }}
                  className={cn(
                    "w-full px-5 py-4 bg-stone-50 border rounded-2xl focus:ring-2 outline-none transition-all pr-14",
                    error ? "border-red-300 focus:ring-red-500" : "border-stone-200 focus:ring-emerald-500"
                  )}
                  placeholder="Introducir clave..."
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-2 text-stone-400 hover:text-stone-600 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {error && (
                <p className="mt-2 text-xs font-bold text-red-600 px-1 animate-pulse">
                  {error}
                </p>
              )}
            </div>
            <button 
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-emerald-600 text-white rounded-2xl font-black shadow-lg shadow-emerald-600/20 hover:bg-emerald-700 transition-all disabled:opacity-50"
            >
              {loading ? 'Verificando...' : 'Entrar al Panel'}
            </button>
          </form>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-50 pb-20 lg:pb-0">
      {/* Mobile Header */}
      <div className="lg:hidden bg-stone-900 text-white p-4 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <button 
            onClick={() => { localStorage.removeItem('admin_pass'); navigate('/'); }}
            className="p-1 hover:text-emerald-400 transition-colors"
          >
            <Home className="w-5 h-5" />
          </button>
          <img src="/favicon.png" className="w-6 h-6 object-contain" alt="Logo" />
          <span className="font-bold text-sm tracking-tight">ZENHOGAR Admin</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center bg-stone-800 p-0.5 rounded-lg border border-white/10">
            <button
              type="button"
              onClick={() => handleCountryChange('CO')}
              className={cn(
                "px-2 py-1 rounded-md text-[10px] font-bold transition-all flex items-center gap-1",
                selectedCountry === 'CO' ? "bg-white/20 text-white" : "text-stone-400"
              )}
            >
              <img src="/assets/logo/logo-colombia.webp" alt="Colombia" className="w-3.5 h-2.5 object-cover rounded-xs shrink-0" />
              <span>CO</span>
            </button>
            <button
              type="button"
              onClick={() => handleCountryChange('EC')}
              className={cn(
                "px-2 py-1 rounded-md text-[10px] font-bold transition-all flex items-center gap-1",
                selectedCountry === 'EC' ? "bg-white/20 text-white" : "text-stone-400"
              )}
            >
              <img src="/assets/logo/Logo-ecuador.webp" alt="Ecuador" className="w-3.5 h-2.5 object-cover rounded-xs shrink-0" />
              <span>EC</span>
            </button>
          </div>
          <button 
            onClick={() => { localStorage.removeItem('admin_pass'); window.location.reload(); }}
            className="text-[10px] font-black uppercase text-stone-400 ml-1"
          >
            Salir
          </button>
        </div>
      </div>

      {/* Sidebar Desktop */}
      <aside className="fixed left-0 top-0 bottom-0 w-20 bg-stone-900 text-white p-4 hidden lg:flex flex-col items-center z-50 transition-all duration-300">
        <div className="mb-8 p-1">
          <img src="/favicon.png" className="w-10 h-10 object-contain mx-auto" alt="Logo" />
        </div>
        
        <nav className="space-y-4 flex flex-col items-center">
          <button 
            onClick={() => {
              localStorage.removeItem('admin_pass');
              navigate('/');
            }}
            className="p-3 rounded-2xl transition-all duration-300 w-full flex justify-center text-stone-400 hover:bg-white/10"
            title="Ir a Inicio"
          >
            <Home className="w-6 h-6" />
          </button>

          <button 
            onClick={() => setActiveTab('orders')}
            className={cn(
              "p-3 rounded-2xl transition-all duration-300 w-full flex justify-center",
              activeTab === 'orders' ? "bg-emerald-500 text-white shadow-lg shadow-emerald-500/20" : "text-stone-400 hover:bg-white/10"
            )}
            title="Pedidos"
          >
            <LayoutDashboard className="w-6 h-6" />
          </button>
          
          <button 
            onClick={() => setActiveTab('analytics')}
            className={cn(
              "p-3 rounded-2xl transition-all duration-300 w-full flex justify-center",
              activeTab === 'analytics' ? "bg-emerald-500 text-white shadow-lg shadow-emerald-500/20" : "text-stone-400 hover:bg-white/10"
            )}
            title="Analítica"
          >
            <TrendingUp className="w-6 h-6" />
          </button>

          <button 
            onClick={() => setActiveTab('inventory')}
            className={cn(
              "p-3 rounded-2xl transition-all duration-300 w-full flex justify-center",
              activeTab === 'inventory' ? "bg-emerald-500 text-white shadow-lg shadow-emerald-500/20" : "text-stone-400 hover:bg-white/10"
            )}
            title="Inventario"
          >
            <Package className="w-6 h-6" />
          </button>

          <button 
            onClick={() => setActiveTab('routes')}
            className={cn(
              "p-3 rounded-2xl transition-all duration-300 w-full flex justify-center",
              activeTab === 'routes' ? "bg-emerald-500 text-white shadow-lg shadow-emerald-500/20" : "text-stone-400 hover:bg-white/10"
            )}
            title="Rutas de Campaña"
          >
            <ExternalLink className="w-6 h-6" />
          </button>

          <button 
            onClick={() => setActiveTab('settings')}
            className={cn(
              "p-3 rounded-2xl transition-all duration-300 w-full flex justify-center",
              activeTab === 'settings' ? "bg-emerald-500 text-white shadow-lg shadow-emerald-500/20" : "text-stone-400 hover:bg-white/10"
            )}
            title="Configuración"
          >
            <Settings className="w-6 h-6" />
          </button>
        </nav>
      </aside>

      {/* Mobile Nav Bar */}
      <nav className="lg:hidden fixed bottom-6 left-4 right-4 bg-stone-900 text-white rounded-2xl flex items-center justify-around p-2 z-50 shadow-2xl border border-white/10">
        <button 
          onClick={() => setActiveTab('orders')}
          className={cn(
            "p-3 rounded-xl transition-all flex flex-col items-center gap-1",
            activeTab === 'orders' ? "text-emerald-400 bg-white/10" : "text-stone-500"
          )}
        >
          <ShoppingBag className="w-5 h-5" />
          <span className="text-[8px] font-black uppercase">Pedidos</span>
        </button>
        <button 
          onClick={() => setActiveTab('analytics')}
          className={cn(
            "p-3 rounded-xl transition-all flex flex-col items-center gap-1",
            activeTab === 'analytics' ? "text-emerald-400 bg-white/10" : "text-stone-500"
          )}
        >
          <TrendingUp className="w-5 h-5" />
          <span className="text-[8px] font-black uppercase">Ventas</span>
        </button>
        <button 
          onClick={() => setActiveTab('inventory')}
          className={cn(
            "p-3 rounded-xl transition-all flex flex-col items-center gap-1",
            activeTab === 'inventory' ? "text-emerald-400 bg-white/10" : "text-stone-500"
          )}
        >
          <Package className="w-5 h-5" />
          <span className="text-[8px] font-black uppercase">Stock</span>
        </button>
        <button 
          onClick={() => setActiveTab('routes')}
          className={cn(
            "p-3 rounded-xl transition-all flex flex-col items-center gap-1",
            activeTab === 'routes' ? "text-emerald-400 bg-white/10" : "text-stone-500"
          )}
        >
          <ExternalLink className="w-5 h-5" />
          <span className="text-[8px] font-black uppercase">Rutas</span>
        </button>
        <button 
          onClick={() => setActiveTab('settings')}
          className={cn(
            "p-3 rounded-xl transition-all flex flex-col items-center gap-1",
            activeTab === 'settings' ? "text-emerald-400 bg-white/10" : "text-stone-500"
          )}
        >
          <Settings className="w-5 h-5" />
          <span className="text-[8px] font-black uppercase">Config</span>
        </button>
      </nav>

      {/* Main Content */}
      <main className="lg:pl-20 min-h-screen">
        <header className="bg-white border-b border-stone-200 p-4 lg:px-8 py-4 flex flex-col sm:flex-row justify-between items-center gap-4 sticky top-0 z-40">
          <div className="flex items-center gap-4">
            <h1 className="text-xl font-bold text-stone-900 tracking-tight">
              {activeTab === 'orders' ? 'Pedidos' : activeTab === 'analytics' ? 'Analítica' : activeTab === 'inventory' ? 'Inventario Mastershop' : activeTab === 'routes' ? 'Rutas de Campaña' : 'Configuración'}
            </h1>
            <div className="h-4 w-px bg-stone-200 hidden sm:block" />
            <p className="text-[10px] font-black text-stone-400 uppercase tracking-widest hidden sm:block">Zenhogar v2.1.2</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center bg-stone-100 p-1 rounded-xl border border-stone-200">
              <button
                type="button"
                onClick={() => handleCountryChange('CO')}
                className={cn(
                  "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all",
                  selectedCountry === 'CO' 
                    ? "bg-white text-stone-900 shadow-sm" 
                    : "text-stone-500 hover:text-stone-800"
                )}
                title="Ver pedidos de Colombia"
              >
                <img src="/assets/logo/logo-colombia.webp" alt="Colombia" className="w-4 h-3 object-cover rounded-xs shrink-0" />
                <span>Colombia</span>
              </button>
              <button
                type="button"
                onClick={() => handleCountryChange('EC')}
                className={cn(
                  "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all",
                  selectedCountry === 'EC' 
                    ? "bg-white text-stone-900 shadow-sm" 
                    : "text-stone-500 hover:text-stone-800"
                )}
                title="Ver pedidos de Ecuador"
              >
                <img src="/assets/logo/Logo-ecuador.webp" alt="Ecuador" className="w-4 h-3 object-cover rounded-xs shrink-0" />
                <span>Ecuador</span>
              </button>
            </div>

            <button 
              onClick={() => { localStorage.removeItem('admin_pass'); window.location.reload(); }}
              className="px-4 py-2 text-stone-400 hover:text-red-500 font-bold text-[10px] uppercase tracking-widest transition-colors"
            >
              Cerrar Sesión
            </button>
          </div>
        </header>

        <div className="p-4 lg:p-8">
          <AnimatePresence mode="wait">
            {activeTab === 'orders' ? (
              <motion.div
                key="orders"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                {/* Stats Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                  <StatCard 
                    label="Ingresos Estimados" 
                    value={formatCurrency(stats.ingresosEstimados, selectedCountry)} 
                    icon={<DollarSign className="w-5 h-5" />}
                    color="emerald"
                  />
                  <StatCard 
                    label="Pedidos Totales" 
                    value={stats.pedidosTotales.toString()} 
                    icon={<Package className="w-5 h-5" />}
                    color="blue"
                  />
                  <StatCard 
                    label="Carritos Abandonados" 
                    value={stats.carritosAbandonados.toString()} 
                    icon={<Trash2 className="w-5 h-5" />}
                    color="orange"
                  />
                  <StatCard 
                    label="Contador Pedidos" 
                    value={`#${systemCounter}`} 
                    icon={<Hash className="w-5 h-5" />}
                    color="amber"
                  />
                </div>

                {/* Pipeline & Real-Time Tracking Counters */}
                <div id="status-pipeline-counters" className="bg-white p-6 rounded-[2.5rem] border border-stone-100 shadow-sm mb-8">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
                    <div>
                      <h2 className="text-sm font-bold text-stone-900 tracking-tight flex items-center gap-2">
                        <Activity className="w-4 h-4 text-emerald-600 animate-pulse" />
                        Monitoreo de Tickets y Cuellos de Botella (Tiempos de Atención)
                      </h2>
                      <p className="text-[10px] text-stone-400 font-medium">
                        Promedio y antigüedad de tickets por estado. Haz clic en un estado para filtrar rápidamente la tabla.
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-8 gap-3">
                    {statusPipelineStats.map((st) => {
                      const isSelected = selectedStatuses.includes(st.id);
                      let borderClass = "border-stone-100";
                      let bgClass = "bg-stone-50 hover:bg-stone-100/70";
                      let countBadgeColor = "bg-stone-200 text-stone-700";
                      
                      if (st.count > 0) {
                        if (st.color === 'amber') {
                          borderClass = isSelected ? "border-amber-400 ring-2 ring-amber-400/20" : "border-amber-100";
                          bgClass = isSelected ? "bg-amber-50" : "bg-amber-50/40 hover:bg-amber-50/60";
                          countBadgeColor = "bg-amber-500 text-white";
                        } else if (st.color === 'emerald') {
                          borderClass = isSelected ? "border-emerald-400 ring-2 ring-emerald-400/20" : "border-emerald-100";
                          bgClass = isSelected ? "bg-emerald-50" : "bg-emerald-50/30 hover:bg-emerald-50/60";
                          countBadgeColor = "bg-emerald-600 text-white";
                        } else if (st.color === 'blue') {
                          borderClass = isSelected ? "border-blue-400 ring-2 ring-blue-400/20" : "border-blue-100";
                          bgClass = isSelected ? "bg-blue-50" : "bg-blue-50/30 hover:bg-blue-50/60";
                          countBadgeColor = "bg-blue-600 text-white";
                        } else if (st.color === 'purple') {
                          borderClass = isSelected ? "border-purple-400 ring-2 ring-purple-400/20" : "border-purple-100";
                          bgClass = isSelected ? "bg-purple-50" : "bg-purple-50/30 hover:bg-purple-50/60";
                          countBadgeColor = "bg-purple-600 text-white";
                        } else if (st.color === 'indigo') {
                          borderClass = isSelected ? "border-indigo-400 ring-2 ring-indigo-400/20" : "border-indigo-100";
                          bgClass = isSelected ? "bg-indigo-50" : "bg-indigo-50/30 hover:bg-indigo-50/60";
                          countBadgeColor = "bg-indigo-600 text-white";
                        } else if (st.color === 'red') {
                          borderClass = isSelected ? "border-red-400 ring-2 ring-red-400/20" : "border-red-100";
                          bgClass = isSelected ? "bg-red-50" : "bg-red-50/30 hover:bg-red-50/60";
                          countBadgeColor = "bg-red-500 text-white";
                        }
                      } else {
                        borderClass = isSelected ? "border-stone-400 ring-2 ring-stone-400/10" : "border-stone-100";
                        bgClass = isSelected ? "bg-stone-100" : "bg-stone-50/50 hover:bg-stone-100/30";
                        countBadgeColor = "bg-stone-200 text-stone-500";
                      }

                      const iconMap: Record<string, any> = {
                        pending: Clock,
                        confirmed: CheckCircle2,
                        ready_to_ship: Package,
                        shipped_with_guide: FileText,
                        in_transit: Truck,
                        waiting_delivery: Clock,
                        delivered: ClipboardCheck,
                        with_issue: Info
                      };
                      const IconComponent = iconMap[st.id] || Clock;
                      const hasBottleneck = st.count > 0 && st.id !== 'delivered' && st.maxMs > 24 * 60 * 60 * 1000;

                      return (
                        <button
                          key={st.id}
                          onClick={() => {
                            if (selectedStatuses.includes(st.id)) {
                              setSelectedStatuses(selectedStatuses.filter(s => s !== st.id));
                            } else {
                              setSelectedStatuses([...selectedStatuses, st.id]);
                            }
                          }}
                          className={cn(
                            "flex flex-col text-left p-3.5 rounded-2xl border transition-all relative group",
                            borderClass,
                            bgClass
                          )}
                        >
                          <div className="flex items-center justify-between mb-2">
                            <div className="p-1 rounded-lg bg-white shadow-sm border border-stone-100">
                              <IconComponent className={cn("w-3.5 h-3.5", st.count > 0 ? "text-stone-800" : "text-stone-400")} />
                            </div>
                            <span className={cn("text-[10px] font-black px-1.5 py-0.5 rounded-full transition-all", countBadgeColor)}>
                              {st.count}
                            </span>
                          </div>

                          <span className="text-[10px] font-bold text-stone-800 leading-tight uppercase truncate">
                            {st.label}
                          </span>

                          <div className="mt-2 pt-1 border-t border-stone-200/40 flex flex-col gap-0.5">
                            <div className="flex justify-between items-center text-[8px] text-stone-500 font-medium">
                              <span>Promedio:</span>
                              <span className={cn("font-bold", st.count > 0 ? "text-stone-800" : "text-stone-400")}>
                                {st.count > 0 ? formatDuration(st.avgMs) : 'N/A'}
                              </span>
                            </div>
                            <div className="flex justify-between items-center text-[8px] text-stone-500 font-medium">
                              <span>Antiguo:</span>
                              <span className={cn("font-extrabold", hasBottleneck ? "text-red-500 animate-pulse" : st.count > 0 ? "text-stone-800" : "text-stone-400")}>
                                {st.count > 0 ? formatDuration(st.maxMs) : 'N/A'}
                              </span>
                            </div>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Filters & Search - Redesigned */}
                <div className="bg-white p-3 rounded-[1.5rem] border border-stone-100 shadow-sm mb-6 flex flex-col gap-3">
                  <div className="flex flex-wrap items-center gap-3">
                    {/* Search - Compact */}
                    <div className="relative flex-grow min-w-[200px] max-w-sm">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
                      <input 
                        type="text" 
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Buscar cliente o ticket..."
                        className="w-full pl-9 pr-4 py-1.5 bg-stone-50 border border-stone-100 rounded-xl text-[11px] focus:ring-2 focus:ring-emerald-500 outline-none"
                      />
                    </div>

                    {/* Filter Dropdown with Checkboxes */}
                    <div className="relative">
                      <button 
                        onClick={() => setIsFilterOpen(!isFilterOpen)}
                        className={cn(
                          "px-3 py-1.5 bg-stone-50 border border-stone-100 rounded-xl text-[11px] font-bold uppercase flex items-center gap-2 hover:bg-stone-100 transition-all",
                          selectedStatuses.length > 0 ? "text-emerald-600 border-emerald-100 bg-emerald-50" : "text-stone-500"
                        )}
                      >
                        <Filter className="w-3.5 h-3.5" />
                        {selectedStatuses.length > 0 ? `Estatus (${selectedStatuses.length})` : 'Estatus'}
                      </button>

                      <AnimatePresence>
                        {isFilterOpen && (
                          <>
                            <div className="fixed inset-0 z-10" onClick={() => setIsFilterOpen(false)} />
                            <motion.div 
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: 10 }}
                              className="absolute left-0 mt-2 w-64 bg-white border border-stone-100 rounded-2xl shadow-xl z-20 p-2 max-h-80 overflow-y-auto"
                            >
                              <div className="flex items-center justify-between mb-2 p-2 border-b border-stone-50">
                                <span className="text-[10px] font-black uppercase text-stone-400 tracking-widest">Estatus</span>
                                <button 
                                  onClick={() => setSelectedStatuses([])}
                                  className="text-[9px] font-black uppercase text-red-500 hover:underline"
                                >
                                  Borrar Filtros
                                </button>
                              </div>
                              <div className="grid grid-cols-1 gap-1">
                                {[
                                  { id: 'pending', label: 'Pendiente' },
                                  { id: 'confirmed', label: 'Confirmado' },
                                  { id: 'ready_to_ship', label: 'Por Alistar' },
                                  { id: 'shipped_with_guide', label: 'Guía Generada' },
                                  { id: 'in_transit', label: 'En Tránsito' },
                                  { id: 'delivered', label: 'Entregado' },
                                  { id: 'completed', label: 'Cumplida' },
                                  { id: 'waiting_delivery', label: 'Esperando Entrega' },
                                  { id: 'declined', label: 'Declinada' },
                                  { id: 'with_issue', label: 'Novedad' },
                                  { id: 'cancelled', label: 'Cancelado' }
                                ].map((status) => (
                                  <label key={status.id} className="flex items-center gap-2 p-2 hover:bg-stone-50 rounded-lg cursor-pointer transition-colors">
                                    <div className={cn(
                                      "w-4 h-4 rounded border flex items-center justify-center transition-colors",
                                      selectedStatuses.includes(status.id) ? "bg-emerald-500 border-emerald-500" : "border-stone-300 bg-white"
                                    )}>
                                      {selectedStatuses.includes(status.id) && <CheckCircle2 className="w-3 h-3 text-white" />}
                                    </div>
                                    <input 
                                      type="checkbox"
                                      className="hidden"
                                      checked={selectedStatuses.includes(status.id)}
                                      onChange={() => {
                                        if (selectedStatuses.includes(status.id)) {
                                          setSelectedStatuses(selectedStatuses.filter(s => s !== status.id));
                                        } else {
                                          setSelectedStatuses([...selectedStatuses, status.id]);
                                        }
                                      }}
                                    />
                                    <span className="text-[11px] font-normal text-stone-600">{status.label}</span>
                                  </label>
                                ))}
                              </div>
                            </motion.div>
                          </>
                        )}
                      </AnimatePresence>
                    </div>

                    <div className="flex items-center gap-2 bg-stone-50 border border-stone-100 px-3 py-1.5 rounded-xl">
                      <Calendar className="w-3.5 h-3.5 text-stone-400" />
                      <div className="flex items-center gap-1.5">
                        <input 
                          type="date" 
                          value={startDate}
                          onChange={(e) => setStartDate(e.target.value)}
                          className="bg-transparent text-[11px] font-normal text-black outline-none w-28 cursor-pointer"
                        />
                        <span className="text-stone-300">/</span>
                        <input 
                          type="date" 
                          value={endDate}
                          onChange={(e) => setEndDate(e.target.value)}
                          className="bg-transparent text-[11px] font-normal text-black outline-none w-28 cursor-pointer"
                        />
                      </div>
                      {(startDate || endDate) && (
                        <button 
                          onClick={() => { setStartDate(''); setEndDate(''); }}
                          className="p-1 hover:text-red-500 transition-colors"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      )}
                    </div>

                    <button 
                      onClick={() => {
                        setStartDate('');
                        setEndDate('');
                        setSelectedStatuses([]);
                        setSearchTerm('');
                      }}
                      className="px-3 py-1.5 text-stone-400 hover:text-red-500 transition-colors"
                      title="Limpiar todos los filtros"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-stone-50">
                    <div className="flex gap-1.5">
                      <button 
                        onClick={() => setFilter('all')}
                        className={cn("px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-tighter transition-all", filter === 'all' ? "bg-stone-900 text-white" : "bg-stone-100 text-stone-500 hover:bg-stone-200")}
                      >Todo</button>
                      <button 
                        onClick={() => setFilter('order')}
                        className={cn("px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-tighter transition-all", filter === 'order' ? "bg-stone-900 text-white" : "bg-stone-100 text-stone-500 hover:bg-stone-200")}
                      >Ventas</button>
                      <button 
                        onClick={() => setFilter('abandoned')}
                        className={cn("px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-tighter transition-all", filter === 'abandoned' ? "bg-stone-900 text-white" : "bg-stone-100 text-stone-500 hover:bg-stone-200")}
                      >Abandonos</button>
                    </div>

                    <div className="flex gap-2">
                       <button 
                        onClick={fetchOrders}
                        className="px-3 py-1.5 bg-stone-100 text-stone-600 rounded-lg font-bold text-[10px] uppercase hover:bg-emerald-50 hover:text-emerald-600 transition-all flex items-center gap-1.5"
                        title="Actualizar datos"
                      >
                        <RefreshCw className="w-3 h-3" />
                      </button>

                      <button 
                        onClick={openNewManualOrderModal}
                        className="px-3 py-1.5 bg-emerald-600 text-white rounded-lg font-bold text-[10px] uppercase hover:bg-emerald-700 transition-all flex items-center gap-1.5 shadow-sm shadow-emerald-600/10"
                        title="Registrar un nuevo pedido recibido manualmente (WhatsApp)"
                      >
                        <ShoppingBag className="w-3.5 h-3.5" />
                        <span>Nuevo Pedido Manual</span>
                      </button>

                      
                      <button 
                        onClick={handleSyncPendingOrders}
                        className="px-3 py-1.5 bg-blue-600 text-white rounded-lg font-bold text-[10px] uppercase hover:bg-blue-700 transition-all flex items-center gap-1.5 shadow-sm shadow-blue-600/10"
                        title="Sincronizar pedidos pendientes con Google Sheets"
                      >
                        <RefreshCw className="w-3.5 h-3.5" />
                        <span>Sincronizar</span>
                      </button>
                      
                      {/* Botón de Sincronización Masiva Pedido -> Logística (Solo si hay pendientes) */}
                      {filteredOrders.some(o => 
                        o.type === 'order' && 
                        o.mastershop_status !== 'sync_success' && 
                        (!o.tracking_guide || o.tracking_guide.trim() === '')
                      ) && (
                        <button 
                          onClick={async () => {
                            const pendientes = filteredOrders.filter(o => 
                              o.type === 'order' && 
                              o.mastershop_status !== 'sync_success' && 
                              (!o.tracking_guide || o.tracking_guide.trim() === '')
                            );

                            if (!window.confirm(`Se intentarán sincronizar ${pendientes.length} pedidos. ¿Continuar?`)) return;

                            let successCount = 0;
                            let failCount = 0;

                            for (const order of pendientes) {
                              const success = await syncOrderWithMastershop(order);
                              if (success) {
                                const orderRef = doc(db, 'orders', order.id);
                                await updateDoc(orderRef, { mastershop_status: 'sync_success' });
                                successCount++;
                              } else {
                                failCount++;
                              }
                            }

                            alert(`Proceso finalizado.\n✅ Sincronizados: ${successCount}\n❌ Fallidos: ${failCount}`);
                            fetchOrders();
                          }}
                          className="px-6 py-3 bg-red-600 text-white rounded-xl font-black text-[12px] uppercase hover:bg-red-700 transition-all flex items-center gap-3 shadow-lg shadow-red-200/50 hover:scale-105 active:scale-95"
                          title="Actualización pedidos en base de datos"
                        >
                          <RefreshCw className="w-6 h-6" /> 
                          <div className="flex flex-col items-start leading-none">
                            <span className="text-[9px] opacity-80 font-normal">Sincronización Masiva</span>
                            <span>Actualización pedidos en base de datos ({filteredOrders.filter(o => o.type === 'order' && o.mastershop_status !== 'sync_success' && (!o.tracking_guide || o.tracking_guide.trim() === '')).length})</span>
                          </div>
                        </button>
                      )}

                      <button 
                        onClick={downloadExcel}
                        className="px-4 py-2 bg-emerald-50 text-emerald-600 rounded-xl font-bold text-[10px] uppercase hover:bg-emerald-100 transition-all flex items-center gap-2 border border-emerald-100 shadow-sm"
                        aria-label={selectedOrderIds.size > 0 ? `Generar Plantilla para ${selectedOrderIds.size} pedidos seleccionados` : "Generar Plantilla completa para Master Shop"}
                      >
                        <Download className="w-3.5 h-3.5" /> 
                        {selectedOrderIds.size > 0 
                          ? `Generar Plantilla (${selectedOrderIds.size})` 
                          : "Generar Plantilla para Pedidos a Master Shop"
                        }
                      </button>
                      <button 
                        onClick={cleanOldOrders}
                        className="px-3 py-1.5 bg-amber-50 text-amber-600 rounded-lg font-bold text-[10px] uppercase hover:bg-amber-100 transition-all flex items-center gap-1.5"
                      >
                        <Trash2 className="w-3 h-3" /> Limpiar
                      </button>
                      <button 
                        onClick={handleClearAllOrders}
                        className="px-3 py-1.5 bg-red-50 text-red-600 rounded-lg font-bold text-[10px] uppercase hover:bg-red-100 transition-all flex items-center gap-1.5"
                      >
                        <XCircle className="w-3 h-3" /> Purgar Todo
                      </button>
                    </div>
                  </div>
                </div>


                {/* Orders Table */}
                <div className="bg-white rounded-xl border border-stone-200 shadow-sm overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse" role="grid">
                      <thead>
                        <tr className="bg-[#e2efda] border-b border-stone-300">
                          <th className="px-2 py-1.5 w-8 text-center border-r border-stone-300">
                            <input 
                              type="checkbox" 
                              checked={selectedOrderIds.size === filteredOrders.length && filteredOrders.length > 0}
                              onChange={toggleSelectAll}
                              className="w-3.5 h-3.5 rounded border-stone-300 text-emerald-600 focus:ring-emerald-500 cursor-pointer"
                              aria-label="Seleccionar todos los pedidos"
                            />
                          </th>
                          <th className="px-2 py-1.5 text-[10px] font-bold text-black uppercase tracking-tight w-12 border-r border-stone-300">Ticket N°</th>
                          <th className="px-2 py-1.5 text-[10px] font-bold text-black uppercase tracking-tight w-24 border-r border-stone-300">Fecha y Hora</th>
                          <th className="px-2 py-1.5 text-[10px] font-bold text-black uppercase tracking-tight w-12 text-center border-r border-stone-300">Tipo</th>
                          <th className="px-2 py-1.5 text-[10px] font-bold text-black uppercase tracking-tight min-w-[120px] border-r border-stone-300">Nombre</th>
                          <th className="px-2 py-1.5 text-[10px] font-bold text-black uppercase tracking-tight w-20 text-center border-r border-stone-300">Celular</th>
                          <th className="px-2 py-1.5 text-[10px] font-bold text-black uppercase tracking-tight min-w-[120px] border-r border-stone-300 text-center">Email</th>
                          <th className="px-2 py-1.5 text-[10px] font-bold text-black uppercase tracking-tight border-r border-stone-300">Dirección</th>
                          <th className="px-2 py-1.5 text-[10px] font-bold text-black uppercase tracking-tight w-20 text-center border-r border-stone-300">Ciudad</th>
                          <th className="px-2 py-1.5 text-[10px] font-bold text-black uppercase tracking-tight w-20 text-center border-r border-stone-300">Departamento</th>
                          <th className="px-2 py-1.5 text-[10px] font-bold text-black uppercase tracking-tight w-24 border-r border-stone-300">Guía</th>
                          <th className="px-2 py-1.5 text-[10px] font-bold text-black uppercase tracking-tight border-r border-stone-300">Producto</th>
                          <th className="px-2 py-1.5 text-[10px] font-bold text-black uppercase tracking-tight w-20 border-r border-stone-300">Valor</th>
                          <th className="px-2 py-1.5 text-[10px] font-bold text-black uppercase tracking-tight text-center w-24 border-r border-stone-300">Estado</th>
                          <th className="px-2 py-1.5 text-[10px] font-bold text-black uppercase tracking-tight text-right w-20">Acciones</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredOrders.length === 0 ? (
                          <tr>
                            <td colSpan={15} className="px-6 py-20 text-center text-stone-400 italic">No hay pedidos registrados todavía.</td>
                          </tr>
                        ) : (
                          filteredOrders.map((order) => {
                            const customer = order.customer || {};
                            const displayName = customer.nombre 
                              ? `${customer.nombre} ${customer.apellido || ''}`
                              : (customer.fullName || 'Cliente sin nombre');
                            const displayPhone = customer.telefono || customer.phone || '---';
                            const displayEmail = customer.email || '---';
                            const hasAlerts = order.status === 'with_issue';

                            return (
                              <tr 
                                key={order.id} 
                                className={cn(
                                  "hover:bg-stone-50 transition-colors group cursor-pointer border-b border-stone-200",
                                  isOrderSelected(order.id) && "bg-emerald-50/50"
                                )}
                                onClick={() => { setSelectedOrder(order); setTrackingInput(order.tracking_guide || ''); }}
                              >
                                <td 
                                  className="px-2 py-1.5 border-r border-stone-200 text-center"
                                  onClick={(e) => { e.stopPropagation(); toggleSelectOrder(order.id); }}
                                >
                                  <input 
                                    type="checkbox" 
                                    checked={isOrderSelected(order.id)}
                                    readOnly
                                    className="w-3.5 h-3.5 rounded border-stone-300 text-emerald-600 focus:ring-emerald-500 cursor-pointer"
                                  />
                                </td>
                                <td className="px-2 py-1.5 border-r border-stone-200" onClick={() => { setSelectedOrder(order); setTrackingInput(order.tracking_guide || ''); }}>
                                  <span className={cn(
                                    "text-[10px] font-mono font-black border px-1.5 py-0.5 rounded transition-all block text-center cursor-pointer hover:scale-105",
                                    order.tracking_guide
                                      ? "bg-emerald-500 border-emerald-600 text-white" 
                                      : "bg-white border-stone-100 text-stone-400"
                                  )}>
                                    {order.ticket_number || '---'}
                                  </span>
                                </td>
                                <td className="px-2 py-1.5 border-r border-stone-200">
                                  <span className="text-[11px] font-normal text-black whitespace-nowrap">
                                    {order.created_at ? new Date(order.created_at).toLocaleString() : 'Hoy'}
                                  </span>
                                </td>
                                <td className="px-2 py-1.5 text-center border-r border-stone-200">
                                  <span className="text-[10px] font-bold text-stone-500 uppercase tracking-tighter">
                                    {order.type === 'order' ? 'Venta' : 'Abnd'}
                                  </span>
                                </td>
                                <td className="px-2 py-1.5 border-r border-stone-200" onClick={() => { setSelectedOrder(order); setTrackingInput(order.tracking_guide || ''); }}>
                                  <span className="text-[11px] font-normal text-black leading-tight block line-clamp-2 max-w-[150px] cursor-pointer hover:text-emerald-600 decoration-emerald-500/30 underline-offset-2">
                                    {displayName}
                                  </span>
                                </td>
                                <td className="px-2 py-1.5 text-center border-r border-stone-200">
                                  <span className="text-[11px] font-normal text-black">
                                    {displayPhone}
                                  </span>
                                </td>
                                <td className="px-2 py-1.5 text-center border-r border-stone-200">
                                  <span className="text-[10px] font-normal text-stone-500 line-clamp-2 max-w-[120px] block break-all">
                                    {displayEmail}
                                  </span>
                                </td>
                                <td className="px-2 py-1.5 border-r border-stone-200">
                                  <span className="text-[11px] font-normal text-black leading-tight block line-clamp-2 max-w-[180px]">
                                    {customer.address || customer.direccion || '---'}
                                  </span>
                                </td>
                                <td className="px-2 py-1.5 text-center border-r border-stone-200">
                                  <span className="text-[11px] font-normal text-black line-clamp-2 max-w-[80px] block">
                                    {customer.city || customer.ciudad || '---'}
                                  </span>
                                </td>
                                <td className="px-2 py-1.5 text-center border-r border-stone-200">
                                  <span className="text-[11px] font-normal text-black line-clamp-2 max-w-[80px] block">
                                    {customer.department || customer.departamento || '---'}
                                  </span>
                                </td>
                                <td className="px-2 py-1.5 border-r border-stone-200 min-w-[120px]">
                                   <div className="relative group/guide">
                                      <input 
                                        type="text"
                                        defaultValue={order.tracking_guide || ''}
                                        onBlur={(e) => {
                                          if (e.target.value !== (order.tracking_guide || '')) {
                                            handleSaveCell(order.id, 'tracking_guide', e.target.value);
                                          }
                                        }}
                                        onKeyDown={(e) => {
                                          if (e.key === 'Enter') {
                                            handleSaveCell(order.id, 'tracking_guide', (e.target as HTMLInputElement).value);
                                            (e.target as HTMLInputElement).blur();
                                          }
                                        }}
                                        onClick={(e) => e.stopPropagation()}
                                        placeholder="Pegar guía..."
                                        className="w-full bg-stone-50 border border-stone-200 hover:border-emerald-300 focus:bg-white focus:border-emerald-500 rounded px-2 py-1 text-[10px] font-mono outline-none transition-all shadow-sm"
                                      />
                                   </div>
                                </td>
                                <td className="px-2 py-1.5 border-r border-stone-200">
                                  <span className="text-[11px] font-normal text-black leading-tight block line-clamp-2 max-w-[200px]">
                                    {order.cart?.items?.length 
                                      ? order.cart.items.map((i: any) => {
                                          const q = i.quantity || i.qty || 1;
                                          const name = i.name || i.productName || 'Producto';
                                          const label = i.promoLabel || i.label || '';
                                          return `${q}x ${name}${label ? ` (${label})` : ''}`;
                                        }).join(', ') 
                                      : (order.order_details || '---')
                                    }
                                  </span>
                                </td>
                                <td className="px-2 py-1.5 border-r border-stone-200">
                                  <span className="text-[11px] font-normal text-black whitespace-nowrap">
                                    {formatCurrency(order.total || order.cart?.total || 0, getOrderCountry(order))}
                                  </span>
                                </td>
                                <td className="px-2 py-1.5 border-r border-stone-200">
                                  <div className="flex items-center justify-center h-full" onClick={(e) => e.stopPropagation()}>
                                    <select 
                                      value={order.status}
                                      onChange={(e) => updateStatus(order.id, e.target.value)}
                                      aria-label={`Cambiar estado del pedido ${order.ticket_number || order.id}`}
                                      className={cn(
                                        "appearance-none bg-transparent border-0 text-center cursor-pointer outline-none focus:ring-0",
                                        "text-[10px] font-black w-full h-full py-1",
                                        order.status === 'delivered' || order.status === 'completed' ? "text-emerald-600" :
                                        order.status === 'cancelled' || order.status === 'declined' ? "text-red-600" :
                                        order.status === 'shipped_with_guide' ? "text-purple-600" :
                                        "text-stone-800"
                                      )}
                                    >
                                      <option value="pending">Pendiente</option>
                                      <option value="confirmed">Confirmado</option>
                                      <option value="ready_to_ship">Por Alistar</option>
                                      <option value="shipped_with_guide">Guía Generada</option>
                                      <option value="in_transit">En Tránsito</option>
                                      <option value="delivered">Entregado</option>
                                      <option value="finalizada">Finalizada</option>
                                      <option value="waiting_delivery">Espera Entrega</option>
                                      <option value="declined">Declinada</option>
                                      <option value="cancelled">Cancelado</option>
                                      <option value="with_issue">Con Novedad</option>
                                    </select>
                                  </div>
                                  {hasAlerts && (
                                     <div className="text-center mt-0.5">
                                       <span className="text-[8px] font-black text-white bg-red-500 px-1 rounded animate-pulse">NOVEDAD</span>
                                     </div>
                                  )}
                                </td>
                                <td className="px-2 py-1.5 text-right">
                                   <div className="flex justify-end gap-1">
                                      {/* Icono de Estado de Sincronización - Clickable para Re-Sincronizar */}
                                      {order.type === 'order' && (
                                        <button 
                                          onClick={async (e) => {
                                            e.stopPropagation();
                                            if (order.mastershop_status === 'sync_success') return;
                                            
                                            const success = await syncOrderWithMastershop(order);
                                            if (success) {
                                              const orderRef = doc(db, 'orders', order.id);
                                              await updateDoc(orderRef, { mastershop_status: 'sync_success' });
                                              fetchOrders();
                                            } else {
                                              alert("Error al intentar sincronizar el pedido.");
                                            }
                                          }}
                                          className={cn(
                                            "w-6 h-6 rounded flex items-center justify-center transition-all",
                                            (order.mastershop_status === 'sync_success' || order.tracking_guide) 
                                              ? "text-emerald-600 bg-emerald-50 cursor-default" 
                                              : "text-red-500 bg-red-50 hover:bg-red-100"
                                          )}
                                          title={ (order.mastershop_status === 'sync_success' || order.tracking_guide) ? "Sincronizado con Mastershop" : "Pendiente de Sincronización (Click para re-intentar)" }
                                        >
                                          <CheckCircle2 className="w-4 h-4" />
                                        </button>
                                      )}
                                      
                                      <button 
                                        onClick={(e) => { e.stopPropagation(); handleDeleteOrder(order.id); }}
                                        className="w-6 h-6 rounded bg-stone-50 text-stone-300 flex items-center justify-center hover:bg-red-50 hover:text-red-500 transition-all font-bold"
                                        title="Borrar Registro"
                                      >
                                        <Trash2 className="w-3 h-3" />
                                      </button>
                                    </div>
                                 </td>
                              </tr>
                            );
                          })
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </motion.div>
            ) : activeTab === 'analytics' ? (
              <motion.div
                key="analytics"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-8"
              >
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                  <div>
                    <h2 className="text-2xl font-black text-stone-900 tracking-tight flex items-center gap-3">
                      <TrendingUp className="w-8 h-8 text-emerald-500" />
                      Analítica de Negocio
                    </h2>
                    <p className="text-sm text-stone-500 mt-1 uppercase font-black tracking-widest text-[10px]">
                      {startDate && endDate ? `Datos del ${startDate} al ${endDate}` : 'Últimos 7 días activos'}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 bg-white border border-stone-100 px-4 py-2 rounded-2xl shadow-sm">
                    <Calendar className="w-4 h-4 text-stone-400" />
                    <div className="flex items-center gap-2">
                       <input 
                         type="date" 
                         value={startDate}
                         onChange={(e) => setStartDate(e.target.value)}
                         className="bg-transparent text-[11px] font-black text-stone-800 outline-none w-28 cursor-pointer uppercase"
                       />
                       <span className="text-stone-200">/</span>
                       <input 
                         type="date" 
                         value={endDate}
                         onChange={(e) => setEndDate(e.target.value)}
                         className="bg-transparent text-[11px] font-black text-stone-800 outline-none w-28 cursor-pointer uppercase"
                       />
                    </div>
                    {(startDate || endDate) && (
                      <button 
                        onClick={() => { setStartDate(''); setEndDate(''); }}
                        className="p-1 hover:text-red-500 transition-colors ml-2"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  <StatCard 
                    label="Ingresos Estimados" 
                    value={formatCurrency(stats.ingresosEstimados, selectedCountry)} 
                    icon={<DollarSign className="w-5 h-5" />}
                    color="emerald"
                  />
                  <StatCard 
                    label="Pedidos Totales" 
                    value={stats.pedidosTotales.toString()} 
                    icon={<ShoppingBag className="w-5 h-5" />}
                    color="blue"
                  />
                  <StatCard 
                    label="Carritos Abandonados" 
                    value={stats.carritosAbandonados.toString()} 
                    icon={<Trash2 className="w-5 h-5" />}
                    color="orange"
                  />
                  <StatCard 
                    label="Pendientes de Envío" 
                    value={stats.pendientesEnvio.toString()} 
                    icon={<Clock className="w-5 h-5" />}
                    color="amber"
                  />
                </div>

                {/* Analytics Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Revenue Chart */}
                  <div className="bg-white p-8 rounded-[2.5rem] border border-stone-200 shadow-sm">
                    <div className="flex justify-between items-center mb-6">
                      <div>
                        <h3 className="text-xl font-bold text-stone-900">
                          {startDate && endDate ? 'Ventas e Ingresos (Periodo)' : 'Ventas e Ingresos (7 días)'}
                        </h3>
                        <p className="text-sm text-stone-500">Tendencia de ingresos y volumen de pedidos</p>
                      </div>
                      <div className="p-3 bg-emerald-50 text-emerald-600 rounded-2xl">
                        <TrendingUp className="w-6 h-6" />
                      </div>
                    </div>
                    <div className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={chartData}>
                          <defs>
                            <linearGradient id="colorIngresos" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#10b981" stopOpacity={0.1}/>
                              <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                            </linearGradient>
                          </defs>
                          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                          <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#94a3b8' }} />
                          <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#94a3b8' }} />
                          <Tooltip 
                            contentStyle={{ borderRadius: '1rem', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                            formatter={(value: any) => typeof value === 'number' ? formatCurrency(value, selectedCountry) : value}
                          />
                          <Area type="monotone" dataKey="ingresos" stroke="#10b981" strokeWidth={3} fillOpacity={1} fill="url(#colorIngresos)" />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                  </div>

                  {/* Status Distribution */}
                  <div className="bg-white p-8 rounded-[2.5rem] border border-stone-200 shadow-sm">
                    <h3 className="text-xl font-bold text-stone-900 mb-6">Distribución por Estado</h3>
                    <div className="h-64 flex flex-col items-center">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={statusDistribution}
                            cx="50%"
                            cy="50%"
                            innerRadius={60}
                            outerRadius={80}
                            paddingAngle={5}
                            dataKey="value"
                          >
                            {statusDistribution.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={['#10b981', '#3b82f6', '#f59e0b', '#ef4444', '#8b5cf6'][index % 5]} />
                            ))}
                          </Pie>
                          <Tooltip />
                        </PieChart>
                      </ResponsiveContainer>
                      <div className="grid grid-cols-2 gap-x-8 gap-y-2 mt-4">
                        {statusDistribution.map((entry, index) => (
                          <div key={index} className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: ['#10b981', '#3b82f6', '#f59e0b', '#ef4444', '#8b5cf6'][index % 5] }} />
                            <span className="text-xs font-bold text-stone-600 uppercase tracking-widest">{(entry.name as string)}: {(entry.value as number)}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Funnel Chart */}
                  <div className="bg-white p-8 rounded-[2.5rem] border border-stone-200 shadow-sm">
                    <h3 className="text-xl font-bold text-stone-900 mb-6 flex items-center gap-2">
                       <TrendingUp className="w-5 h-5 text-emerald-500" /> Conversión de Carrito
                    </h3>
                    <div className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={funnelStats} layout="vertical" margin={{ left: 20 }}>
                          <XAxis type="number" hide />
                          <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} width={150} tick={{ fontSize: 11, fontWeight: 'bold', fill: '#64748b' }} />
                          <Tooltip cursor={{ fill: 'transparent' }} />
                          <Bar dataKey="value" radius={[0, 10, 10, 0]} barSize={40}>
                            {funnelStats.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.fill} />
                            ))}
                          </Bar>
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>

                  {/* Top Locations */}
                  <div className="bg-white p-8 rounded-[2.5rem] border border-stone-200 shadow-sm">
                    <h3 className="text-xl font-bold text-stone-900 mb-6 flex items-center gap-2">
                       <MapPin className="w-5 h-5 text-emerald-500" /> Geografía (Ventas por Dpto)
                    </h3>
                    <div className="space-y-4 max-h-[250px] overflow-y-auto pr-2 custom-scrollbar">
                      {geoStats.departments.length > 0 ? geoStats.departments.map((dept, i) => (
                        <div key={i} className="flex items-center justify-between p-3 bg-stone-50 rounded-2xl hover:bg-emerald-50 transition-colors border border-transparent hover:border-emerald-100">
                          <div className="flex items-center gap-3">
                            <span className="w-6 h-6 rounded-lg bg-white flex items-center justify-center text-[10px] font-black text-stone-400 border border-stone-100">{i + 1}</span>
                            <span className="font-bold text-stone-700 text-sm uppercase">{dept.name}</span>
                          </div>
                          <span className="px-3 py-1 bg-white rounded-full text-xs font-black text-emerald-600 border border-emerald-100">{dept.count} <span className="text-[10px] text-stone-400">Peds</span></span>
                        </div>
                      )) : <p className="text-stone-400 italic text-center py-10">Sin datos geográficos aún</p>}
                    </div>
                  </div>

                  {/* Abandoned Products Analysis */}
                  <div className="bg-white p-8 rounded-[2.5rem] border border-stone-200 shadow-sm">
                    <h3 className="text-xl font-bold text-stone-900 mb-6 flex items-center gap-2">
                       <Package className="w-5 h-5 text-orange-500" /> ¿Dónde se quedan? (Mayores Abandonos)
                    </h3>
                    <div className="space-y-4">
                      {abandonedByProduct.length > 0 ? abandonedByProduct.map((prod, i) => (
                        <div key={i} className="flex items-center gap-4">
                          <div className="flex-grow">
                            <div className="flex justify-between mb-1">
                              <span className="font-bold text-stone-700 text-xs truncate max-w-[200px]">{prod.name}</span>
                              <span className="text-[10px] font-black text-orange-600">{prod.count} abandonos</span>
                            </div>
                            <div className="w-full bg-stone-100 h-2 rounded-full overflow-hidden">
                              <motion.div 
                                initial={{ width: 0 }}
                                animate={{ width: `${(prod.count / (abandonedByProduct[0].count || 1)) * 100}%` }}
                                className="h-full bg-orange-400" 
                              />
                            </div>
                          </div>
                        </div>
                      )) : <p className="text-stone-400 italic text-center py-10">Sin registros de abandonos</p>}
                    </div>
                  </div>

                  {/* Top Products */}
                  <div className="bg-white p-8 rounded-[2.5rem] border border-stone-200 shadow-sm">
                    <h3 className="text-xl font-bold text-stone-900 mb-6">Top 5 Productos Más Vendidos</h3>
                    <div className="space-y-4">
                      {topProducts.map((prod, i) => (
                        <div key={i} className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-xl bg-stone-100 flex items-center justify-center font-bold text-stone-500">
                            {i + 1}
                          </div>
                          <div className="flex-grow">
                            <div className="flex justify-between mb-1">
                              <span className="font-bold text-stone-900">{prod.name}</span>
                              <span className="text-sm font-bold text-stone-500">{prod.sales} unidades</span>
                            </div>
                            <div className="w-full bg-stone-100 h-2 rounded-full overflow-hidden">
                              <motion.div 
                                initial={{ width: 0 }}
                                animate={{ width: `${(prod.sales / topProducts[0].sales) * 100}%` }}
                                className="h-full bg-emerald-500" 
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ) : activeTab === 'inventory' ? (
              <motion.div
                key="inventory"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <InventoryManager />
              </motion.div>
            ) : activeTab === 'routes' ? (
              <motion.div
                key="routes"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <div className="bg-white rounded-[2rem] p-6 lg:p-8 border border-stone-100 shadow-sm max-w-5xl mx-auto">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 pb-4 border-b border-stone-50">
                    <div>
                      <h2 className="text-xl font-bold text-stone-900">Rutas de Campaña y Enlaces</h2>
                      <p className="text-[10px] font-black text-stone-400 uppercase tracking-widest text-left">Listado Completo de Enlaces para Facebook & Google Ads</p>
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 border border-emerald-100 px-3 py-1.5 rounded-xl uppercase tracking-wider block md:inline-block">
                        Soporte Multicaso Activo (Case-Insensitive)
                      </span>
                    </div>
                  </div>

                  <div className="mb-6 bg-blue-50/50 border border-blue-100 p-4 rounded-2xl flex items-start gap-3 text-left">
                    <Info className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs font-bold text-blue-900">¿Por qué es importante esta sección?</p>
                      <p className="text-[11px] text-blue-700 mt-1 leading-relaxed">
                        Aquí puedes visualizar, copiar y probar de manera directa la ruta exacta de cualquier producto o combo de ZENHOGAR al rellenar tus campañas. 
                        <strong> Nota de Robustez:</strong> El sistema ha sido blindado para que las rutas sean completamente insensibles a mayúsculas/minúsculas (ej: <code className="bg-white px-1 py-0.5 rounded text-blue-800 font-mono">/producto/RtaFull</code>, <code className="bg-white px-1 py-0.5 rounded text-blue-800 font-mono">/producto/rtafull</code> o <code className="bg-white px-1 py-0.5 rounded text-blue-800 font-mono">/producto/RTAFULL</code> funcionarán de manera idéntica sin páginas caídas ni errores).
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
                    {/* Column Left: Products */}
                    <div className="space-y-6">
                      <div className="flex items-center gap-2 pb-2 border-b border-stone-100">
                        <Package className="w-5 h-5 text-emerald-600" />
                        <h3 className="font-bold text-stone-900 text-sm">Productos Individuales ({PRODUCTS.length})</h3>
                      </div>
                      
                      <div className="space-y-3 max-h-[550px] overflow-y-auto pr-2 custom-scrollbar">
                        {PRODUCTS.map(p => {
                          const path = `/producto/${p.id}`;
                          const routeId = `prod-${p.id}`;
                          const isCopied = copiedRouteId === routeId;
                          return (
                            <div key={p.id} className="p-4 bg-stone-50 hover:bg-stone-100/60 border border-stone-100 rounded-2xl transition-all">
                              <div className="flex justify-between items-start gap-2 mb-2">
                                <div>
                                  <h4 className="font-bold text-sm text-stone-900">{p.name}</h4>
                                  <p className="text-[10px] text-stone-400">ID Master: <span className="font-mono">{p.masterId}</span> | Categoría: <span className="font-semibold">{p.category}</span></p>
                                </div>
                                <span className="text-[9px] font-mono bg-stone-200/60 text-stone-600 px-1.5 py-0.5 rounded">
                                  {p.id}
                                </span>
                              </div>
                              
                              <div className="flex items-center gap-2 mt-3 pt-2.5 border-t border-stone-200/50">
                                <input 
                                  type="text" 
                                  readOnly 
                                  value={`https://zenhogar.live${path}`} 
                                  className="flex-grow bg-white border border-stone-200 rounded-lg px-2.5 py-2 text-[11px] font-mono text-stone-600 select-all outline-none"
                                />
                                <button
                                  onClick={() => handleCopyRouteLink(path, routeId)}
                                  className={cn(
                                    "px-3 py-2 rounded-lg font-bold text-xs flex items-center justify-center gap-1 transition-all active:scale-95 shrink-0",
                                    isCopied 
                                      ? "bg-emerald-600 text-white" 
                                      : "bg-white hover:bg-stone-50 border border-stone-200 text-stone-700"
                                  )}
                                >
                                  {isCopied ? <ClipboardCheck className="w-3.5 h-3.5" /> : <Clipboard className="w-3.5 h-3.5" />}
                                  {isCopied ? 'Copiado' : 'Copiar'}
                                </button>
                                <a 
                                  href={`https://zenhogar.live${path}`} 
                                  target="_blank" 
                                  rel="noopener noreferrer" 
                                  className="p-2 bg-white hover:bg-stone-50 border border-stone-200 rounded-lg text-stone-500 transition-colors shrink-0"
                                  title="Abrir en pestaña nueva"
                                >
                                  <ExternalLink className="w-4 h-4" />
                                </a>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Column Right: Combos, Categories & Global */}
                    <div className="space-y-8">
                      {/* Combos & Promotions */}
                      <div>
                        <div className="flex items-center gap-2 pb-2 border-b border-stone-100 mb-4">
                          <ShoppingBag className="w-5 h-5 text-emerald-600" />
                          <h3 className="font-bold text-stone-900 text-sm">Combos y Promociones ({PROMOTIONS.length + 1})</h3>
                        </div>

                        <div className="space-y-3 max-h-[290px] overflow-y-auto pr-2 custom-scrollbar">
                          {/* Combo of the Month */}
                          {COMBO_OF_THE_MONTH && (() => {
                            const path = `/combo/${COMBO_OF_THE_MONTH.id}`;
                            const routeId = `combo-${COMBO_OF_THE_MONTH.id}`;
                            const isCopied = copiedRouteId === routeId;
                            return (
                              <div className="p-4 bg-emerald-50/40 hover:bg-emerald-50/60 border border-emerald-100/50 rounded-2xl transition-all">
                                <div className="flex justify-between items-start gap-2 mb-2">
                                  <div>
                                    <div className="flex items-center gap-1.5">
                                      <h4 className="font-bold text-sm text-stone-950">{COMBO_OF_THE_MONTH.name}</h4>
                                      <span className="text-[9px] font-black uppercase text-emerald-700 bg-emerald-100 px-1.5 py-0.5 rounded-full">
                                        Combo del Mes (Oferta)
                                      </span>
                                    </div>
                                    <p className="text-[10px] text-stone-400">Oferta principal: <span className="font-semibold">${COMBO_OF_THE_MONTH.price?.toLocaleString('es-CO')}</span></p>
                                  </div>
                                  <span className="text-[9px] font-mono bg-emerald-100 text-emerald-800 px-1.5 py-0.5 rounded">
                                    {COMBO_OF_THE_MONTH.id}
                                  </span>
                                </div>
                                
                                <div className="flex items-center gap-2 mt-3 pt-2.5 border-t border-emerald-100/60">
                                  <input 
                                    type="text" 
                                    readOnly 
                                    value={`https://zenhogar.live${path}`} 
                                    className="flex-grow bg-white border border-stone-200 rounded-lg px-2.5 py-2 text-[11px] font-mono text-stone-600 select-all outline-none"
                                  />
                                  <button
                                    onClick={() => handleCopyRouteLink(path, routeId)}
                                    className={cn(
                                      "px-3 py-2 rounded-lg font-bold text-xs flex items-center justify-center gap-1 transition-all active:scale-95 shrink-0",
                                      isCopied 
                                        ? "bg-emerald-600 text-white" 
                                        : "bg-white hover:bg-stone-50 border border-stone-200 text-stone-700"
                                    )}
                                  >
                                    {isCopied ? <ClipboardCheck className="w-3.5 h-3.5" /> : <Clipboard className="w-3.5 h-3.5" />}
                                    {isCopied ? 'Copiado' : 'Copiar'}
                                  </button>
                                  <a 
                                    href={`https://zenhogar.live${path}`} 
                                    target="_blank" 
                                    rel="noopener noreferrer" 
                                    className="p-2 bg-white hover:bg-stone-50 border border-stone-200 rounded-lg text-stone-500 transition-colors shrink-0"
                                    title="Abrir en pestaña nueva"
                                  >
                                    <ExternalLink className="w-4 h-4" />
                                  </a>
                                </div>
                              </div>
                            );
                          })()}

                          {/* Regular promotions */}
                          {PROMOTIONS.map(promo => {
                            const path = `/combo/${promo.id}`;
                            const routeId = `combo-${promo.id}`;
                            const isCopied = copiedRouteId === routeId;
                            return (
                              <div key={promo.id} className="p-4 bg-stone-50 hover:bg-stone-100/60 border border-stone-100 rounded-2xl transition-all">
                                <div className="flex justify-between items-start gap-2 mb-2">
                                  <div>
                                    <h4 className="font-bold text-sm text-stone-900">{promo.name}</h4>
                                    <p className="text-[10px] text-stone-400">Total: <span className="font-semibold">${promo.price?.toLocaleString('es-CO')}</span></p>
                                  </div>
                                  <span className="text-[9px] font-mono bg-stone-200/60 text-stone-600 px-1.5 py-0.5 rounded">
                                    {promo.id}
                                  </span>
                                </div>
                                
                                <div className="flex items-center gap-2 mt-3 pt-2.5 border-t border-stone-200/50">
                                  <input 
                                    type="text" 
                                    readOnly 
                                    value={`https://zenhogar.live${path}`} 
                                    className="flex-grow bg-white border border-stone-200 rounded-lg px-2.5 py-2 text-[11px] font-mono text-stone-600 select-all outline-none"
                                  />
                                  <button
                                    onClick={() => handleCopyRouteLink(path, routeId)}
                                    className={cn(
                                      "px-3 py-2 rounded-lg font-bold text-xs flex items-center justify-center gap-1 transition-all active:scale-95 shrink-0",
                                      isCopied 
                                        ? "bg-emerald-600 text-white" 
                                        : "bg-white hover:bg-stone-50 border border-stone-200 text-stone-700"
                                    )}
                                  >
                                    {isCopied ? <ClipboardCheck className="w-3.5 h-3.5" /> : <Clipboard className="w-3.5 h-3.5" />}
                                    {isCopied ? 'Copiado' : 'Copiar'}
                                  </button>
                                  <a 
                                    href={`https://zenhogar.live${path}`} 
                                    target="_blank" 
                                    rel="noopener noreferrer" 
                                    className="p-2 bg-white hover:bg-stone-50 border border-stone-200 rounded-lg text-stone-500 transition-colors shrink-0"
                                    title="Abrir en pestaña nueva"
                                  >
                                    <ExternalLink className="w-4 h-4" />
                                  </a>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>

                      {/* Categories & Global Pages */}
                      <div>
                        <div className="flex items-center gap-2 pb-2 border-b border-stone-100 mb-4">
                          <Home className="w-5 h-5 text-emerald-600" />
                          <h3 className="font-bold text-stone-900 text-sm">Categorías y Páginas Globales</h3>
                        </div>

                        <div className="space-y-3 max-h-[290px] overflow-y-auto pr-2 custom-scrollbar">
                          {/* Categories */}
                          {CATEGORIES.map(cat => {
                            const path = `/categoria/${cat.id}`;
                            const routeId = `cat-${cat.id}`;
                            const isCopied = copiedRouteId === routeId;
                            return (
                              <div key={cat.id} className="p-3 bg-stone-50 hover:bg-stone-100/60 border border-stone-100 rounded-2xl transition-all">
                                <div className="flex justify-between items-center mb-1">
                                  <span className="text-xs font-bold text-stone-800">{cat.name}</span>
                                  <span className="text-[9px] font-mono bg-stone-200 text-stone-500 px-1.5 py-0.5 rounded">
                                    {cat.id}
                                  </span>
                                </div>
                                <div className="flex items-center gap-2 mt-2">
                                  <input 
                                    type="text" 
                                    readOnly 
                                    value={`https://zenhogar.live${path}`} 
                                    className="flex-grow bg-white border border-stone-200 rounded-lg px-2 py-1 text-[10px] font-mono text-stone-500 outline-none"
                                  />
                                  <button
                                    onClick={() => handleCopyRouteLink(path, routeId)}
                                    className="text-[11px] font-bold text-emerald-600 hover:text-emerald-700 transition-colors shrink-0 px-2"
                                  >
                                    {isCopied ? '¡Copiado!' : 'Copiar'}
                                  </button>
                                </div>
                              </div>
                            );
                          })}

                          {/* Global pages */}
                          {[
                            { name: 'Página de Inicio / Home', path: '/' },
                            { name: 'Quiénes Somos', path: '/quienes-somos' },
                            { name: 'Política de Privacidad', path: '/politica-privacidad' },
                            { name: 'Condiciones de Entrega', path: '/condiciones-entrega' },
                            { name: 'Devoluciones y Garantía', path: '/devoluciones-garantia' },
                          ].map(page => {
                            const routeId = `page-${page.path}`;
                            const isCopied = copiedRouteId === routeId;
                            return (
                              <div key={page.path} className="p-3 bg-stone-50 hover:bg-stone-100/60 border border-stone-100 rounded-2xl transition-all">
                                <div className="flex justify-between items-center mb-1">
                                  <span className="text-xs font-bold text-stone-800">{page.name}</span>
                                  <span className="text-[9px] font-mono bg-stone-200 text-stone-500 px-1.5 py-0.5 rounded">
                                    {page.path === '/' ? 'home' : page.path.slice(1)}
                                  </span>
                                </div>
                                <div className="flex items-center gap-2 mt-2">
                                  <input 
                                    type="text" 
                                    readOnly 
                                    value={`https://zenhogar.live${page.path}`} 
                                    className="flex-grow bg-white border border-stone-200 rounded-lg px-2 py-1 text-[10px] font-mono text-stone-500 outline-none"
                                  />
                                  <button
                                    onClick={() => handleCopyRouteLink(page.path, routeId)}
                                    className="text-[11px] font-bold text-emerald-600 hover:text-emerald-700 transition-colors shrink-0 px-2"
                                  >
                                    {isCopied ? '¡Copiado!' : 'Copiar'}
                                  </button>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="settings"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="max-w-4xl mx-auto"
              >
                <div className="bg-white rounded-[2rem] p-6 lg:p-8 border border-stone-100 shadow-sm max-w-3xl mx-auto">
                  <div className="flex items-center justify-between mb-8 pb-4 border-b border-stone-50">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-emerald-100 rounded-xl flex items-center justify-center">
                        <Settings className="w-5 h-5 text-emerald-600" />
                      </div>
                      <div>
                        <h2 className="text-xl font-bold text-stone-900">Configuración</h2>
                        <p className="text-[10px] font-black text-stone-400 uppercase tracking-widest">Ajustes del Sistema</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-6">
                    {/* Order Counter Setting */}
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-5 bg-stone-50 rounded-2xl border border-stone-100">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <Hash className="w-4 h-4 text-emerald-600" />
                          <h3 className="font-bold text-stone-900 text-sm">Próximo Ticket (PO)</h3>
                        </div>
                        <p className="text-[10px] text-stone-400 font-medium">Define el número que tendrá el SIGUIENTE pedido realizado.</p>
                      </div>
                      
                      <div className="flex items-center gap-3">
                        <input 
                          type="number" 
                          value={systemCounter + 1}
                          onChange={(e) => setSystemCounter(parseInt(e.target.value) - 1)}
                          className="w-24 px-3 py-2 bg-white border border-stone-200 rounded-xl font-bold text-sm text-emerald-700 outline-none focus:ring-1 focus:ring-emerald-500"
                        />
                        <button 
                          onClick={() => handleUpdateCounter(systemCounter + 1)}
                          disabled={isUpdatingCounter}
                          className="px-4 py-2 bg-emerald-600 text-white rounded-xl font-bold text-xs hover:bg-emerald-700 transition-all disabled:opacity-50 flex items-center gap-2"
                        >
                          <Save className="w-3.5 h-3.5" />
                          {isUpdatingCounter ? '...' : 'Fijar Próximo'}
                        </button>
                      </div>
                    </div>

                    {/* Maintenance / Cleaning */}
                    <div className="p-5 bg-stone-50 rounded-2xl border border-stone-100">
                      <div className="flex items-center gap-2 mb-4">
                        <Trash2 className="w-4 h-4 text-red-600" />
                        <h3 className="font-bold text-stone-900 text-sm">Base de Datos</h3>
                      </div>
                      
                      <div className="flex flex-wrap gap-3">
                        <button 
                          onClick={cleanOldOrders}
                          className="px-4 py-2 bg-white border border-stone-200 text-stone-600 rounded-xl font-bold text-[10px] uppercase tracking-wider hover:bg-stone-100 transition-all flex items-center gap-2"
                        >
                          <RefreshCw className="w-3.5 h-3.5" />
                          Limpiar Pruebas
                        </button>
                        <button 
                          onClick={handleClearAllOrders}
                          className="px-4 py-2 bg-red-50 border border-red-100 text-red-600 rounded-xl font-bold text-[10px] uppercase tracking-wider hover:bg-red-100 transition-all flex items-center gap-2"
                        >
                          <XCircle className="w-3.5 h-3.5" />
                          Purgar Todo
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>

       {/* Detail Modal */}
      {selectedOrder && selectedOrder.id === 'draft-new' && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 lg:p-10">
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            onClick={() => setSelectedOrder(null)}
            className="absolute inset-0 bg-stone-900/60 backdrop-blur-sm" 
          />
          <motion.div 
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            className="bg-white w-full max-w-4xl max-h-[90vh] rounded-[2.5rem] shadow-2xl relative overflow-hidden flex flex-col"
          >
            {/* Modal Header */}
            <div className="p-6 border-b border-stone-100 flex justify-between items-center bg-stone-50">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center">
                  <ShoppingBag className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-black text-stone-900 tracking-tight font-outfit">Registrar Pedido Manual (WhatsApp)</h3>
                  <p className="text-[10px] uppercase font-black text-stone-400 tracking-widest font-outfit">Nuevo registro en base de datos</p>
                </div>
              </div>
              <button 
                onClick={() => setSelectedOrder(null)}
                className="w-10 h-10 rounded-xl bg-stone-200 text-stone-500 flex items-center justify-center hover:bg-stone-300 transition-all"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="flex-grow overflow-y-auto p-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                {/* Left Column: Customer Form */}
                <div className="space-y-6">
                  <h4 className="text-[10px] font-black text-stone-400 uppercase tracking-widest flex items-center gap-2">
                    <User className="w-3 h-3" /> Datos del Cliente
                  </h4>

                  <div className="bg-stone-50 p-6 rounded-3xl border border-stone-100 space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-[9px] font-black text-stone-400 uppercase tracking-widest mb-1 block">Nombres*</label>
                        <input 
                          type="text"
                          required
                          value={selectedOrder.customer.nombre || ''}
                          onChange={(e) => {
                            const updatedCust = { ...selectedOrder.customer, nombre: e.target.value };
                            setSelectedOrder({ ...selectedOrder, customer: updatedCust });
                          }}
                          placeholder="Ej: Juan Jacobo"
                          className="w-full px-4 py-2 bg-white border border-stone-200 rounded-xl text-xs outline-none focus:ring-1 focus:ring-emerald-500 font-sans text-stone-800"
                        />
                      </div>
                      <div>
                        <label className="text-[9px] font-black text-stone-400 uppercase tracking-widest mb-1 block">Apellidos</label>
                        <input 
                          type="text"
                          value={selectedOrder.customer.apellido || ''}
                          onChange={(e) => {
                            const updatedCust = { ...selectedOrder.customer, apellido: e.target.value };
                            setSelectedOrder({ ...selectedOrder, customer: updatedCust });
                          }}
                          placeholder="Ej: Giraldo Restrepo"
                          className="w-full px-4 py-2 bg-white border border-stone-200 rounded-xl text-xs outline-none focus:ring-1 focus:ring-emerald-500 font-sans text-stone-800"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-[9px] font-black text-stone-400 uppercase tracking-widest mb-1 block">Teléfono / Celular*</label>
                        <input 
                          type="text"
                          required
                          value={selectedOrder.customer.telefono || ''}
                          onChange={(e) => {
                            const updatedCust = { ...selectedOrder.customer, telefono: e.target.value, phone: e.target.value };
                            setSelectedOrder({ ...selectedOrder, customer: updatedCust });
                          }}
                          placeholder="Ej: 3024102568"
                          className="w-full px-4 py-2 bg-white border border-stone-200 rounded-xl text-xs outline-none focus:ring-1 focus:ring-emerald-500 font-mono text-stone-800"
                        />
                      </div>
                      <div>
                        <label className="text-[9px] font-black text-stone-400 uppercase tracking-widest mb-1 block">Cédula / NIT</label>
                        <input 
                          type="text"
                          value={selectedOrder.customer.identification || ''}
                          onChange={(e) => {
                            const updatedCust = { ...selectedOrder.customer, identification: e.target.value };
                            setSelectedOrder({ ...selectedOrder, customer: updatedCust });
                          }}
                          placeholder="Opcional"
                          className="w-full px-4 py-2 bg-white border border-stone-200 rounded-xl text-xs outline-none focus:ring-1 focus:ring-emerald-500 font-sans text-stone-800"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-[9px] font-black text-stone-400 uppercase tracking-widest mb-1 block">Email (Opcional)</label>
                      <input 
                        type="email"
                        value={selectedOrder.customer.email || ''}
                        onChange={(e) => {
                          const updatedCust = { ...selectedOrder.customer, email: e.target.value };
                          setSelectedOrder({ ...selectedOrder, customer: updatedCust });
                        }}
                        placeholder="Ej: cliente@correo.com"
                        className="w-full px-4 py-2 bg-white border border-stone-200 rounded-xl text-xs outline-none focus:ring-1 focus:ring-emerald-500 font-sans text-stone-800"
                      />
                    </div>

                    <div>
                      <label className="text-[9px] font-black text-stone-400 uppercase tracking-widest mb-1 block">Dirección y Barrio*</label>
                      <input 
                        type="text"
                        required
                        value={selectedOrder.customer.direccion || ''}
                        onChange={(e) => {
                          const updatedCust = { ...selectedOrder.customer, direccion: e.target.value, address: e.target.value };
                          setSelectedOrder({ ...selectedOrder, customer: updatedCust });
                        }}
                        placeholder="Ej: Calle 45 # 12 - 34, Apt 402, Barrio Belén"
                        className="w-full px-4 py-2 bg-white border border-stone-200 rounded-xl text-xs outline-none focus:ring-1 focus:ring-emerald-500 font-sans text-stone-800"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-[9px] font-black text-stone-400 uppercase tracking-widest mb-1 block">Departamento*</label>
                        <select 
                          required
                          value={selectedOrder.customer.departamento || selectedOrder.customer.department || ''}
                          onChange={(e) => {
                            const val = e.target.value;
                            const updatedCust = { 
                              ...selectedOrder.customer, 
                              departamento: val, 
                              department: val,
                              ciudad: '', 
                              city: '' 
                            };
                            setSelectedOrder({ ...selectedOrder, customer: updatedCust });
                          }}
                          className="w-full px-4 py-2 bg-white border border-stone-200 rounded-xl text-xs outline-none focus:ring-1 focus:ring-emerald-500 font-sans text-stone-800 appearance-none"
                        >
                          <option value="">Seleccione Departamento</option>
                          {Object.keys(COLOMBIA_DATA || {}).map(d => (
                            <option key={d} value={d}>{d}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="text-[9px] font-black text-stone-400 uppercase tracking-widest mb-1 block">Ciudad*</label>
                        <select 
                          required
                          disabled={!(selectedOrder.customer.departamento || selectedOrder.customer.department)}
                          value={selectedOrder.customer.ciudad || selectedOrder.customer.city || ''}
                          onChange={(e) => {
                            const val = e.target.value;
                            const updatedCust = { 
                              ...selectedOrder.customer, 
                              ciudad: val, 
                              city: val 
                            };
                            setSelectedOrder({ ...selectedOrder, customer: updatedCust });
                          }}
                          className="w-full px-4 py-2 bg-white border border-stone-200 rounded-xl text-xs outline-none focus:ring-1 focus:ring-emerald-500 font-sans text-stone-800 disabled:opacity-50 appearance-none"
                        >
                          <option value="">Seleccione Ciudad</option>
                          {((selectedOrder.customer.departamento || selectedOrder.customer.department) ? (COLOMBIA_DATA as any)[selectedOrder.customer.departamento || selectedOrder.customer.department || ''] || [] : []).map((c: string) => (
                            <option key={c} value={c}>{c}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Column: Order Details, Total & Logistics */}
                <div className="space-y-6">
                  <h4 className="text-[10px] font-black text-stone-400 uppercase tracking-widest flex items-center gap-2">
                    <Package className="w-3 h-3" /> Detalles de Compra
                  </h4>

                  <div className="bg-stone-50 p-6 rounded-3xl border border-stone-100 space-y-4">
                    <div>
                      <label className="text-[9px] font-black text-stone-400 uppercase tracking-widest mb-1 block">Seleccionar del Inventario</label>
                      
                      {/* Search Products */}
                      <div className="relative mb-3">
                        <input
                          type="text"
                          placeholder="Buscar producto en inventario..."
                          value={manualProductSearchTerm}
                          onChange={(e) => setManualProductSearchTerm(e.target.value)}
                          className="w-full px-3 py-2 bg-white border border-stone-200 rounded-xl text-xs outline-none focus:ring-1 focus:ring-emerald-500 font-sans text-stone-800"
                        />
                        {manualProductSearchTerm && (
                          <button
                            type="button"
                            onClick={() => setManualProductSearchTerm('')}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600 text-xs"
                          >
                            ×
                          </button>
                        )}
                      </div>

                      {/* Scrollable list of products */}
                      <div className="max-h-48 overflow-y-auto bg-white border border-stone-200 rounded-xl p-2.5 space-y-2 mb-4 scrollbar-thin scrollbar-thumb-stone-200">
                        {inventory
                          .filter((p: any) => 
                            p.name?.toLowerCase().includes(manualProductSearchTerm.toLowerCase()) ||
                            p.idProduct?.toString().includes(manualProductSearchTerm) ||
                            p.internalId?.toLowerCase().includes(manualProductSearchTerm.toLowerCase())
                          )
                          .map((prod: any) => {
                            const selectedItem = manualOrderItems.find(item => item.internalId === prod.internalId);
                            const isChecked = !!selectedItem;
                            return (
                              <div key={prod.internalId} className={cn(
                                "p-2 rounded-lg border transition-all flex flex-col gap-2",
                                isChecked ? "bg-emerald-50/50 border-emerald-200" : "bg-stone-50/50 border-stone-100 hover:bg-stone-50"
                              )}>
                                <div className="flex items-start gap-2.5">
                                  <input
                                    type="checkbox"
                                    id={`check-${prod.internalId}`}
                                    checked={isChecked}
                                    onChange={() => handleToggleManualProduct(prod)}
                                    className="mt-0.5 rounded border-stone-300 text-emerald-600 focus:ring-emerald-500 h-3.5 w-3.5 cursor-pointer"
                                  />
                                  <label htmlFor={`check-${prod.internalId}`} className="flex-grow text-xs leading-tight font-medium text-stone-800 cursor-pointer">
                                    <span className="font-semibold">{prod.name}</span>
                                    <span className="text-[10px] text-stone-400 block font-mono">ID: {prod.idProduct || prod.internalId} — Precio Base: {formatCurrency(prod.basePrice, selectedCountry)}</span>
                                  </label>
                                </div>

                                {isChecked && (
                                  <div className="flex items-center justify-between gap-4 pl-6 pt-1 border-t border-emerald-100/50 mt-1">
                                    {/* Quantity controller */}
                                    <div className="flex items-center gap-1.5 bg-white border border-stone-200 rounded-lg p-0.5 shadow-sm">
                                      <button
                                        type="button"
                                        onClick={() => handleUpdateManualProductQuantity(prod.internalId, (selectedItem.quantity || 1) - 1)}
                                        className="w-5 h-5 flex items-center justify-center text-xs font-bold text-stone-500 hover:text-stone-800 hover:bg-stone-100 rounded"
                                      >
                                        -
                                      </button>
                                      <span className="text-xs font-mono font-bold w-6 text-center text-stone-800">
                                        {selectedItem.quantity}
                                      </span>
                                      <button
                                        type="button"
                                        onClick={() => handleUpdateManualProductQuantity(prod.internalId, (selectedItem.quantity || 1) + 1)}
                                        className="w-5 h-5 flex items-center justify-center text-xs font-bold text-stone-500 hover:text-stone-800 hover:bg-stone-100 rounded"
                                      >
                                        +
                                      </button>
                                    </div>

                                    {/* Sale Price input */}
                                    <div className="flex items-center gap-1.5">
                                      <span className="text-[9px] font-black text-stone-400 uppercase tracking-wider">Precio COP</span>
                                      <div className="relative max-w-[100px]">
                                        <span className="absolute left-2 top-1.5 text-stone-400 text-[10px] font-bold font-mono">$</span>
                                        <input
                                          type="number"
                                          min={0}
                                          value={selectedItem.price}
                                          onChange={(e) => handleUpdateManualProductPrice(prod.internalId, parseFloat(e.target.value) || 0)}
                                          className="w-full pl-4 pr-1.5 py-1 bg-white border border-stone-200 rounded-lg text-xs font-mono font-bold text-stone-800 outline-none focus:ring-1 focus:ring-emerald-500"
                                        />
                                      </div>
                                    </div>
                                  </div>
                                )}
                              </div>
                            );
                          })}
                        {inventory.length === 0 && (
                          <div className="text-center py-4 text-xs text-stone-400 italic">No hay productos en inventario</div>
                        )}
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <label className="text-[9px] font-black text-stone-400 uppercase tracking-widest block font-sans">Resumen de Productos Adquiridos*</label>
                        <span className="text-[8px] font-bold bg-emerald-100 text-emerald-700 px-1.5 py-0.5 rounded uppercase tracking-wider">Auto-Construido</span>
                      </div>
                      <textarea 
                        required
                        rows={2}
                        value={selectedOrder.order_details || ''}
                        onChange={(e) => {
                          setSelectedOrder({ ...selectedOrder, order_details: e.target.value });
                        }}
                        placeholder="Ej: 1x Inmunidad Dual (Resvisfactor + Coliplus)"
                        className="w-full px-4 py-2.5 bg-white border border-stone-200 rounded-xl text-xs outline-none focus:ring-1 focus:ring-emerald-500 font-sans text-stone-800 resize-none animate-none font-medium text-stone-600"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-[9px] font-black text-stone-400 uppercase tracking-widest mb-1 block">Valor Total COP*</label>
                        <div className="relative">
                          <span className="absolute left-3.5 top-2.5 text-stone-400 text-xs font-bold font-mono">$</span>
                          <input 
                            type="number"
                            required
                            min={0}
                            value={selectedOrder.total || ''}
                            onChange={(e) => {
                              setSelectedOrder({ ...selectedOrder, total: parseFloat(e.target.value) || 0 });
                            }}
                            placeholder="Ej: 129900"
                            className="w-full pl-7 pr-3 py-2 bg-white border border-stone-200 rounded-xl text-xs outline-none focus:ring-1 focus:ring-emerald-500 font-mono font-bold text-stone-800"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="text-[9px] font-black text-stone-400 uppercase tracking-widest mb-1 block">Estado Inicial del Pedido</label>
                        <select 
                          value={selectedOrder.status}
                          onChange={(e) => {
                            setSelectedOrder({ ...selectedOrder, status: e.target.value as any });
                          }}
                          className="w-full px-3 py-2 bg-white border border-stone-200 rounded-xl text-xs outline-none focus:ring-1 focus:ring-emerald-500 font-sans text-stone-800 cursor-pointer"
                        >
                          <option value="pending">Pendiente de Confirmar</option>
                          <option value="confirmed">Confirmado (Por Alistar)</option>
                          <option value="ready_to_ship">Listo para Despacho</option>
                          <option value="shipped_with_guide">Despachado (Con Guía)</option>
                          <option value="completed">Completada (Entregada)</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="text-[9px] font-black text-stone-400 uppercase tracking-widest mb-1 block">Guía de Transporte (Opcional)</label>
                      <input 
                        type="text"
                        value={selectedOrder.tracking_guide || ''}
                        onChange={(e) => {
                          setSelectedOrder({ ...selectedOrder, tracking_guide: e.target.value });
                        }}
                        placeholder="Ingresa la guía si ya la tienes..."
                        className="w-full px-4 py-2 bg-white border border-stone-200 rounded-xl text-xs outline-none focus:ring-1 focus:ring-emerald-500 font-mono text-stone-800"
                      />
                    </div>
                  </div>

                  {/* Realtime WhatsApp Message Generator */}
                  <section className="bg-emerald-50 p-6 rounded-[2rem] border border-emerald-100 space-y-3">
                    <div className="flex justify-between items-center">
                      <h4 className="text-[10px] font-black text-emerald-700 uppercase tracking-widest flex items-center gap-2">
                        <Phone className="w-3 h-3" /> Generador de WhatsApp
                      </h4>
                      {selectedOrder.customer.telefono && (
                        <a 
                          href={`https://wa.me/${(selectedOrder.customer.telefono || '').replace(/\+/g, '').replace(/\s/g, '').replace(/^0+/, '')}?text=${encodeURIComponent(generateClientMessage({
                            ...selectedOrder,
                            ticket_number: 'N_SISTEMA'
                          }))}`}
                          target="_blank"
                          rel="noreferrer"
                          className="px-3 py-1 bg-emerald-600 text-white rounded-lg text-[9px] font-black uppercase tracking-widest hover:bg-emerald-700 transition-all flex items-center gap-1.5"
                        >
                          <Phone className="w-3 h-3" /> Abrir WhatsApp
                        </a>
                      )}
                    </div>
                    <div className="bg-white/80 p-3.5 rounded-xl text-[11px] leading-relaxed text-emerald-950 border border-emerald-100 whitespace-pre-wrap font-medium h-24 overflow-y-auto">
                      {selectedOrder.customer.nombre ? (
                        generateClientMessage({
                          ...selectedOrder,
                          ticket_number: 'N_SISTEMA'
                        })
                      ) : (
                        <span className="text-stone-400 italic">Completa el nombre para generar la plantilla de WhatsApp...</span>
                      )}
                    </div>
                  </section>

                  {/* Submit Button */}
                  <div className="pt-2">
                    <button 
                      onClick={handleCreateManualOrder}
                      disabled={isSavingManualOrder}
                      className="w-full py-4 bg-emerald-600 hover:bg-emerald-700 disabled:bg-emerald-600/50 text-white font-black uppercase tracking-widest rounded-3xl shadow-xl shadow-emerald-500/10 hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-2 text-xs"
                    >
                      {isSavingManualOrder ? (
                        <>
                          <RefreshCw className="w-4 h-4 animate-spin" />
                          <span>Registrando Pedido...</span>
                        </>
                      ) : (
                        <>
                          <ClipboardCheck className="w-4 h-4" />
                          <span>Guardar Pedido Manual</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}

      {selectedOrder && selectedOrder.id !== 'draft-new' && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 lg:p-10">
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            onClick={() => { setSelectedOrder(null); setIsEditingCustomer(false); }}
            className="absolute inset-0 bg-stone-900/60 backdrop-blur-sm" 
          />
          <motion.div 
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            className="bg-white w-full max-w-4xl max-h-[90vh] rounded-[2.5rem] shadow-2xl relative overflow-hidden flex flex-col"
          >
            {/* Modal Header */}
            <div className="p-6 border-b border-stone-100 flex justify-between items-center bg-stone-50">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center">
                  <FileText className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-black text-stone-900 tracking-tight">Detalles del Pedido {selectedOrder.ticket_number && `#${selectedOrder.ticket_number}`}</h3>
                  <p className="text-[10px] uppercase font-black text-stone-400 tracking-widest">{selectedOrder.id.slice(-8)} • {selectedOrder.type === 'order' ? 'Venta Directa' : 'Abandono'}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => {
                    handleDeleteOrder(selectedOrder.id);
                    setSelectedOrder(null);
                    setIsEditingCustomer(false);
                  }}
                  title="Eliminar Pedido"
                  className="w-10 h-10 rounded-xl bg-red-100 text-red-500 flex items-center justify-center hover:bg-red-200 transition-all group"
                >
                  <Trash2 className="w-5 h-5 group-hover:scale-110 transition-transform" />
                </button>
                <button 
                  onClick={() => { setSelectedOrder(null); setIsEditingCustomer(false); }}
                  className="w-10 h-10 rounded-xl bg-stone-200 text-stone-500 flex items-center justify-center hover:bg-stone-300 transition-all"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Modal Body */}
            <div className="flex-grow overflow-y-auto p-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                {/* Info Column */}
                <div className="space-y-8">
                  <section>
                    <div className="flex justify-between items-center mb-4">
                      <h4 className="text-[10px] font-black text-stone-400 uppercase tracking-widest flex items-center gap-2">
                        <User className="w-3 h-3" /> Información del Cliente
                      </h4>
                      {selectedOrder && (selectedOrder.mastershop_status !== 'sync_success' || selectedOrder.status === 'declined' || ['shipped_with_guide', 'in_transit', 'delivered', 'completed'].includes(selectedOrder.status)) && (
                        <button 
                          onClick={() => {
                            if (isEditingCustomer) {
                              setIsEditingCustomer(false);
                            } else {
                              setEditedCustomer({ ...selectedOrder.customer });
                              setIsEditingCustomer(true);
                            }
                          }}
                          className="text-[10px] font-black uppercase text-emerald-600 hover:text-emerald-700 transition-colors flex items-center gap-1"
                        >
                          {isEditingCustomer ? (
                            <><X className="w-3 h-3" /> Cancelar</>
                          ) : (
                            <><Edit className="w-3 h-3" /> Editar Datos</>
                          )}
                        </button>
                      )}
                    </div>

                    <div className="bg-stone-50 p-6 rounded-3xl border border-stone-100 space-y-3">
                      {isEditingCustomer ? (
                        <div className="space-y-4">
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <label className="text-[9px] font-black text-stone-400 uppercase tracking-widest mb-1 block">Nombre/Razón Social</label>
                              <input 
                                type="text"
                                value={editedCustomer.nombre || editedCustomer.fullName || ''}
                                onChange={(e) => setEditedCustomer({ ...editedCustomer, nombre: e.target.value, fullName: e.target.value })}
                                className="w-full px-3 py-2 bg-white border border-stone-200 rounded-xl text-xs outline-none focus:ring-1 focus:ring-emerald-500"
                              />
                            </div>
                            <div>
                              <label className="text-[9px] font-black text-stone-400 uppercase tracking-widest mb-1 block">Identificación (CC/NIT)</label>
                              <input 
                                type="text"
                                value={editedCustomer.identification || ''}
                                onChange={(e) => setEditedCustomer({ ...editedCustomer, identification: e.target.value })}
                                className="w-full px-3 py-2 bg-white border border-stone-200 rounded-xl text-xs outline-none focus:ring-1 focus:ring-emerald-500"
                              />
                            </div>
                          </div>
                          
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <label className="text-[9px] font-black text-stone-400 uppercase tracking-widest mb-1 block">Teléfono</label>
                              <input 
                                type="text"
                                value={editedCustomer.telefono || editedCustomer.phone || ''}
                                onChange={(e) => setEditedCustomer({ ...editedCustomer, telefono: e.target.value, phone: e.target.value })}
                                className="w-full px-3 py-2 bg-white border border-stone-200 rounded-xl text-xs outline-none focus:ring-1 focus:ring-emerald-500"
                              />
                            </div>
                            <div>
                              <label className="text-[9px] font-black text-stone-400 uppercase tracking-widest mb-1 block">Email</label>
                              <input 
                                type="email"
                                value={editedCustomer.email || ''}
                                onChange={(e) => setEditedCustomer({ ...editedCustomer, email: e.target.value })}
                                className="w-full px-3 py-2 bg-white border border-stone-200 rounded-xl text-xs outline-none focus:ring-1 focus:ring-emerald-500"
                              />
                            </div>
                          </div>

                          <div>
                            <label className="text-[9px] font-black text-stone-400 uppercase tracking-widest mb-1 block">Dirección</label>
                            <input 
                              type="text"
                              value={editedCustomer.direccion || editedCustomer.address || ''}
                              onChange={(e) => setEditedCustomer({ ...editedCustomer, direccion: e.target.value, address: e.target.value })}
                              className="w-full px-3 py-2 bg-white border border-stone-200 rounded-xl text-xs outline-none focus:ring-1 focus:ring-emerald-500"
                            />
                          </div>

                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <label className="text-[9px] font-black text-stone-400 uppercase tracking-widest mb-1 block">Departamento</label>
                              <select 
                                value={editedCustomer.department || editedCustomer.departamento || ''}
                                onChange={(e) => {
                                  const val = e.target.value;
                                  setEditedCustomer({ 
                                    ...editedCustomer, 
                                    department: val, 
                                    departamento: val,
                                    ciudad: '', 
                                    city: '' 
                                  });
                                }}
                                className="w-full px-3 py-2 bg-white border border-stone-200 rounded-xl text-xs outline-none focus:ring-1 focus:ring-emerald-500 appearance-none"
                              >
                                <option value="">Seleccione Departamento</option>
                                {Object.keys(COLOMBIA_DATA || {}).map(d => (
                                  <option key={d} value={d}>{d}</option>
                                ))}
                              </select>
                            </div>
                            <div>
                              <label className="text-[9px] font-black text-stone-400 uppercase tracking-widest mb-1 block">Ciudad</label>
                              <select 
                                disabled={!(editedCustomer.department || editedCustomer.departamento)}
                                value={editedCustomer.ciudad || editedCustomer.city || ''}
                                onChange={(e) => {
                                  const val = e.target.value;
                                  setEditedCustomer({ 
                                    ...editedCustomer, 
                                    ciudad: val, 
                                    city: val 
                                  });
                                }}
                                className="w-full px-3 py-2 bg-white border border-stone-200 rounded-xl text-xs outline-none focus:ring-1 focus:ring-emerald-500 disabled:opacity-50 appearance-none"
                              >
                                <option value="">Seleccione Ciudad</option>
                                {((editedCustomer.department || editedCustomer.departamento) ? (COLOMBIA_DATA as any)[editedCustomer.department || editedCustomer.departamento || ''] || [] : []).map((c: string) => (
                                  <option key={c} value={c}>{c}</option>
                                ))}
                              </select>
                            </div>
                          </div>

                          <button 
                            onClick={handleSaveCustomer}
                            className="w-full py-2.5 bg-emerald-600 text-white rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-emerald-700 transition-all flex items-center justify-center gap-2"
                          >
                            <Save className="w-3 h-3" /> Guardar Cambios
                          </button>
                        </div>
                      ) : (
                        <>
                          <div className="flex items-center gap-2">
                            <div className="font-bold text-stone-900 leading-tight">
                              {selectedOrder.customer.nombre || selectedOrder.customer.fullName ? (
                                `${selectedOrder.customer.nombre || ''} ${selectedOrder.customer.apellido || ''} ${selectedOrder.customer.fullName || ''}`.trim()
                              ) : 'Cliente sin nombre'}
                            </div>
                          </div>
                          <div className="flex items-center gap-2 text-stone-600 text-sm">
                            <Mail className="w-4 h-4 text-stone-400" /> {selectedOrder.customer.email || 'No proporcionado'}
                          </div>
                          <div className="flex items-center gap-2 text-stone-600 text-sm">
                            <span className="text-[10px] font-black text-stone-400">CC:</span> {selectedOrder.customer.identification || 'No proporcionada'}
                          </div>
                          <div className="flex items-center gap-2 text-stone-600 text-sm">
                            <Phone className="w-4 h-4 text-stone-400" /> {selectedOrder.customer.telefono || selectedOrder.customer.phone || 'No proporcionado'}
                          </div>
                          <div className="flex items-start gap-2 text-stone-600 text-sm">
                            <MapPin className="w-4 h-4 text-stone-400 mt-0.5" /> 
                            <div className="space-y-1">
                              <p className="font-medium">{selectedOrder.customer.direccion || selectedOrder.customer.address || 'Sin dirección registrada'}</p>
                              <div className="flex flex-wrap gap-2">
                                <span className="px-2 py-0.5 bg-stone-100 rounded text-[10px] font-bold uppercase text-stone-500">
                                  🏠 {selectedOrder.customer.ciudad || selectedOrder.customer.city || 'Ciudad N/A'}
                                </span>
                                <span className="px-2 py-0.5 bg-emerald-50 rounded text-[10px] font-bold uppercase text-emerald-600">
                                  📍 {selectedOrder.customer.department || selectedOrder.customer.departamento || 'Departamento N/A'}
                                </span>
                              </div>
                            </div>
                          </div>
                          {(selectedOrder.gclid || selectedOrder.customer.gclid) && (
                            <div className="flex items-center gap-2 pt-2 border-t border-stone-100 text-stone-600 text-sm">
                              <span className="text-[10px] font-black text-stone-400">GCLID:</span>
                              <span className="font-mono text-[10px] bg-emerald-50 text-emerald-800 px-2 py-0.5 rounded border border-emerald-100 flex items-center select-all break-all">
                                {selectedOrder.gclid || selectedOrder.customer.gclid}
                              </span>
                            </div>
                          )}
                        </>
                      )}
                    </div>
                  </section>

                  <section>
                    <h4 className="text-[10px] font-black text-stone-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                       <Clock className="w-3 h-3" /> Metadatos del Registro
                    </h4>
                    <div className="bg-stone-50 p-4 rounded-3xl border border-stone-100 grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-[9px] uppercase font-black text-stone-400 tracking-tighter mb-1">Fecha de Registro</p>
                        <p className="text-xs font-bold text-stone-700">
                          {selectedOrder.created_at ? new Date(selectedOrder.created_at).toLocaleString('es-CO') : 'No disponible'}
                        </p>
                      </div>
                      <div>
                        <p className="text-[9px] uppercase font-black text-stone-400 tracking-tighter mb-1">Estado Actual</p>
                        <StatusBadge status={selectedOrder.status} type={selectedOrder.type} />
                      </div>
                      <div className="col-span-2 pt-2 border-t border-stone-100">
                        <p className="text-[9px] uppercase font-black text-stone-400 tracking-tighter mb-1">Sincronización Logística (Mastershop)</p>
                        {selectedOrder.mastershop_status !== 'sync_success' && !selectedOrder.tracking_guide ? (
                          <div className="flex flex-col gap-2">
                            <div className="flex items-center gap-2 text-red-600">
                              <XCircle className="w-4 h-4" />
                              <span className="text-[11px] font-bold">Pendiente de sincronización manual</span>
                            </div>
                            <button 
                              onClick={async (e) => {
                                try {
                                  const btn = e.currentTarget as HTMLButtonElement;
                                  if (btn) btn.disabled = true;
                                  
                                  const success = await syncOrderWithMastershop(selectedOrder);

                                  if (success) {
                                    const orderRef = doc(db, 'orders', selectedOrder.id);
                                    await updateDoc(orderRef, { mastershop_status: 'sync_success' });
                                    alert("✅ Pedido sincronizado con éxito en Mastershop.");
                                    setSelectedOrder({ ...selectedOrder, mastershop_status: 'sync_success' });
                                  } else {
                                    alert("❌ Error al sincronizar. El túnel respondió con error.");
                                  }
                                } catch (err) {
                                  console.error("Error manual sync:", err);
                                  alert("❌ Fallo de conexión con el túnel de Mastershop.");
                                } finally {
                                  fetchOrders();
                                }
                              }}
                              className="w-full py-2 bg-red-600 text-white text-[10px] font-bold rounded hover:bg-black transition-colors flex items-center justify-center gap-2"
                            >
                              <RefreshCw className="w-3 h-3" />
                              SINCRONIZAR AHORA CON MASTERSHOP
                            </button>
                          </div>
                        ) : (
                          <div className="flex items-center gap-2 text-emerald-600">
                            <CheckCircle2 className="w-4 h-4" />
                            <span className="text-[11px] font-bold">
                              {selectedOrder.tracking_guide ? "Sincronizado vía Guía de Transporte" : "Sincronizado exitosamente"}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </section>

                  <section>
                    <h4 className="text-[10px] font-black text-stone-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                       <Package className="w-3 h-3" /> Productos y Monto
                    </h4>
                    <div className="bg-stone-50 p-6 rounded-3xl border border-stone-100 italic text-sm text-stone-600">
                      {selectedOrder.cart?.items?.length ? (
                        <ul className="space-y-2">
                          {selectedOrder.cart.items.map((item: any, idx: number) => {
                             const q = item.quantity || item.qty || 1;
                             const label = item.promoLabel || item.label || '';
                             return (
                               <li key={idx} className="flex justify-between border-b border-stone-200/50 pb-2 last:border-0 last:pb-0">
                                 <div className="flex flex-col">
                                   <span className="font-bold text-stone-800">{q}x {item.name || item.productName}</span>
                                   {label && <span className="text-[10px] text-stone-500 font-medium uppercase tracking-wider">{label}</span>}
                                 </div>
                                 <span className="font-black text-emerald-600">{formatCurrency(item.price ? (item.price * q) : 0, getOrderCountry(selectedOrder))}</span>
                               </li>
                             );
                          })}
                        </ul>
                      ) : (
                        <div className="whitespace-pre-wrap">{selectedOrder.order_details || 'Sin detalles registrados'}</div>
                      )}
                      <div className="mt-4 pt-4 border-t-2 border-dashed border-stone-200 flex justify-between items-center font-black text-lg text-stone-900">
                        <span>TOTAL</span>
                        <span className="text-emerald-600">{formatCurrency(selectedOrder.total || selectedOrder.cart?.total || 0, getOrderCountry(selectedOrder))}</span>
                      </div>
                    </div>
                  </section>
                </div>

                {/* Management Column */}
                <div className="space-y-8">
                  <section>
                    <h4 className="text-[10px] font-black text-stone-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                       <Truck className="w-3 h-3" /> Seguimiento y Guía
                    </h4>
    <div className="space-y-3">
                      <div className="relative">
                        <input 
                          type="text" 
                          value={trackingInput}
                          onChange={(e) => setTrackingInput(e.target.value)}
                          placeholder="Número de guía..."
                          className="w-full px-5 py-4 bg-stone-50 border border-stone-200 rounded-2xl outline-none focus:ring-2 focus:ring-purple-500 transition-all font-mono text-sm"
                        />
                      </div>
                      
                      <div className="grid grid-cols-2 gap-2">
                        <select 
                          value={selectedOrder.status}
                          onChange={(e) => handleUpdateTracking(selectedOrder.id, e.target.value)}
                          className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl outline-none focus:ring-2 focus:ring-purple-500 transition-all text-xs font-bold uppercase tracking-wider text-stone-600 appearance-none cursor-pointer"
                        >
                          <option value="pending">Pendiente</option>
                          <option value="confirmed">Confirmado</option>
                          <option value="ready_to_ship">Por Alistar</option>
                          <option value="waiting_collection">Por Recolectar</option>
                          <option value="in_transit">En Tránsito</option>
                          <option value="shipped_with_guide">Guía Asignada</option>
                          <option value="delivered">Entregado</option>
                          <option value="with_issue">Con Novedad</option>
                          <option value="cancelled">Cancelado</option>
                          <option value="withdrawn">Desistió</option>
                        </select>
                        <button 
                          onClick={() => handleUpdateTracking(selectedOrder.id)}
                          className="w-full py-4 bg-purple-600 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-purple-700 transition-all shadow-lg shadow-purple-600/20"
                        >
                           Actualizar
                        </button>
                      </div>
                    </div>
                  </section>

                  <section className="bg-emerald-50 p-6 rounded-[2rem] border border-emerald-100">
                    <div className="flex justify-between items-center mb-4">
                      <h4 className="text-[10px] font-black text-emerald-700 uppercase tracking-widest flex items-center gap-2">
                        <Mail className="w-3 h-3" /> Mensaje para Cliente
                      </h4>
                      <div className="flex gap-2">
                        <button 
                          onClick={() => copyToClipboard(generateClientMessage(selectedOrder))}
                          className={cn(
                            "px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest flex items-center gap-2 transition-all",
                            copying ? "bg-emerald-600 text-white" : "bg-white text-emerald-600 hover:bg-emerald-100"
                          )}
                        >
                          {copying ? <ClipboardCheck className="w-3 h-3" /> : <Clipboard className="w-3 h-3" />}
                          {copying ? 'Copiado' : 'Copiar'}
                        </button>
                        <a 
                          href={`https://wa.me/${(selectedOrder.customer.telefono || selectedOrder.customer.phone || '').replace(/\+/g, '').replace(/\s/g, '').replace(/^0+/, '')}?text=${encodeURIComponent(generateClientMessage(selectedOrder))}`}
                          target="_blank"
                          rel="noreferrer"
                          className="px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest bg-emerald-600 text-white hover:bg-emerald-700 transition-all flex items-center gap-2"
                        >
                          <Phone className="w-3 h-3" /> Enviar WhatsApp
                        </a>
                      </div>
                    </div>
                    <div className="bg-white/80 p-4 rounded-xl text-[11px] leading-relaxed text-emerald-900 border border-emerald-100 whitespace-pre-wrap font-medium h-40 overflow-y-auto">
                      {generateClientMessage(selectedOrder)}
                    </div>
                    <p className="mt-3 text-[9px] text-emerald-700/60 font-medium italic text-center">Puedes adjuntar el PDF de la guía manualmente en WhatsApp junto a este mensaje.</p>
                  </section>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}

function StatCard({ label, value, icon, color }: { label: string, value: string | number, icon: any, color: string }) {
  const colors: any = {
    emerald: "bg-emerald-50 text-emerald-600 border-emerald-100",
    blue: "bg-blue-50 text-blue-600 border-blue-100",
    orange: "bg-orange-50 text-orange-600 border-orange-100",
    amber: "bg-amber-50 text-amber-600 border-amber-100",
  };
  return (
    <div className="bg-white p-3.5 rounded-[1.5rem] border border-stone-100 shadow-sm flex items-center gap-3">
      <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center border shrink-0", colors[color])}>
        {icon}
      </div>
      <div className="flex flex-col min-w-0">
        <div className="text-[10px] font-normal text-black uppercase tracking-tighter truncate opacity-70">{label}</div>
        <div className="text-sm font-normal text-black truncate">{value}</div>
      </div>
    </div>
  );
}

function FilterTab({ active, label, onClick }: { active: boolean, label: string, onClick: () => void }) {
  return (
    <button 
      onClick={onClick}
      className={cn(
        "px-6 py-2.5 rounded-xl font-bold text-xs uppercase tracking-widest border transition-all whitespace-nowrap",
        active 
          ? "bg-stone-900 text-white border-stone-900 shadow-lg shadow-stone-900/10" 
          : "bg-white text-stone-500 border-stone-100 hover:bg-stone-50"
      )}
    >
      {label}
    </button>
  );
}

function StatusBadge({ status, type }: { status: string, type: string }) {
  if (type === 'abandoned') return (
    <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-orange-50 border border-orange-100">
      <span className="text-[11px] font-normal uppercase text-black">Abandono</span>
    </div>
  );

  const config: any = {
    pending: { label: "PENDIENTE", bg: "bg-amber-50", border: "border-amber-100" },
    confirmed: { label: "CONFIRMADO", bg: "bg-emerald-50", border: "border-emerald-100" },
    ready_to_ship: { label: "POR ALISTAR", bg: "bg-blue-50", border: "border-blue-100" },
    waiting_collection: { label: "POR RECOLECTAR", bg: "bg-indigo-50", border: "border-indigo-100" },
    collected: { label: "RECOLECTADO", bg: "bg-indigo-50", border: "border-indigo-100" },
    in_transit: { label: "EN TRÁNSITO", bg: "bg-purple-50", border: "border-purple-100" },
    out_for_delivery: { label: "EN REPARTO", bg: "bg-emerald-50", border: "border-emerald-100" },
    at_office: { label: "EN OFICINA", bg: "bg-stone-50", border: "border-stone-100" },
    delivered: { label: "ENTREGADO", bg: "bg-emerald-100", border: "border-emerald-200" },
    completed: { label: "CUMPLIDA", bg: "bg-blue-100", border: "border-blue-200" },
    waiting_delivery: { label: "ESPERA ENTREGA", bg: "bg-amber-100", border: "border-amber-200" },
    declined: { label: "DECLINADA", bg: "bg-red-100", border: "border-red-200" },
    with_issue: { label: "CON NOVEDAD", bg: "bg-red-50", border: "border-red-100" },
    cancelled: { label: "CANCELADO", bg: "bg-red-50", border: "border-red-100" },
    withdrawn: { label: "DESISTIÓ", bg: "bg-stone-100", border: "border-stone-200" },
    shipped_with_guide: { label: "GUÍA GENERADA", bg: "bg-purple-50", border: "border-purple-100" },
  };

  const c = config[status] || config.pending;
  return (
    <div className={cn("inline-flex items-center px-2 py-0.5 rounded-md border", c.bg, c.border)}>
      <span className="text-[11px] font-normal uppercase text-black">{c.label}</span>
    </div>
  );
}

function StatusActions({ currentStatus, onUpdate, onDelete }: { currentStatus: string, onUpdate: (s: string) => void, onDelete: () => void }) {
  const [isOpen, setIsOpen] = useState(false);

  const options = [
    { id: 'pending', label: 'Pend. Conf.', icon: Clock },
    { id: 'confirmed', label: 'Por Alistar', icon: FileText },
    { id: 'waiting_collection', label: 'Por Recolectar', icon: Package },
    { id: 'in_transit', label: 'En Tránsito', icon: Truck },
    { id: 'out_for_delivery', label: 'En Reparto', icon: Activity },
    { id: 'delivered', label: 'Entregado', icon: CheckCircle2 },
    { id: 'with_issue', label: 'Novedad', icon: XCircle },
    { id: 'cancelled', label: 'Cancelado', icon: XCircle },
    { id: 'withdrawn', label: 'Desistió', icon: Trash2 },
  ];

  return (
    <div className="relative">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-9 h-9 rounded-xl bg-stone-100 text-stone-500 flex items-center justify-center hover:bg-stone-200 transition-all font-bold"
      >
        <MoreVertical className="w-4 h-4" />
      </button>
      
      {isOpen && (
        <>
          <div className="fixed inset-0 z-[60]" onClick={() => setIsOpen(false)} />
          <div className="absolute right-0 bottom-full mb-2 w-48 bg-white rounded-2xl shadow-2xl border border-stone-100 py-2 z-[70] overflow-hidden">
            {options.map((opt) => (
              <button
                key={opt.id}
                onClick={() => { onUpdate(opt.id); setIsOpen(false); }}
                className={cn(
                  "w-full flex items-center gap-3 px-4 py-3 text-sm text-left hover:bg-stone-50 transition-colors",
                  currentStatus === opt.id ? "text-emerald-600 bg-emerald-50/50" : "text-stone-700"
                )}
              >
                <opt.icon className="w-4 h-4" />
                <span className="font-medium">{opt.label}</span>
              </button>
            ))}
            <div className="border-t border-stone-100 my-1"></div>
            <button
              onClick={() => { onDelete(); setIsOpen(false); }}
              className="w-full flex items-center gap-3 px-4 py-3 text-sm text-left hover:bg-red-50 text-red-600 transition-colors"
            >
              <Trash2 className="w-4 h-4" />
              <span className="font-bold">Eliminar de la Base</span>
            </button>
          </div>
        </>
      )}
    </div>
  );
}
