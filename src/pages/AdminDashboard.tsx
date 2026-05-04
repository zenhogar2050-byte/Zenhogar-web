import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
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
  Activity
} from 'lucide-react';
import { formatCurrency, cn } from '../utils';
import { getOrdersFromFirebase, updateOrderStatusInFirebase, deleteOrderFromFirebase, clearAllOrdersFromFirebase, db } from '../lib/firebase';
import { doc, updateDoc, collection, getDocs, deleteDoc } from 'firebase/firestore';
import { useInventory } from '../hooks/useInventory';
import { PRODUCTS, GIFT_PRODUCTS, PROMOTIONS, COMBO_OF_THE_MONTH } from '../constants';
import * as XLSX from 'xlsx';

interface Order {
  id: string;
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
  };
  cart?: {
    items: any[];
    total: number;
  };
  order_details?: string;
  tracking_guide?: string;
  ticket_number?: string;
  total?: number;
  status: 'pending' | 'confirmed' | 'sent' | 'delivered' | 'cancelled' | 'shipped_with_guide' | 'withdrawn';
  type: 'order' | 'abandoned';
  created_at: string;
  ms_sync_status?: 'synced' | 'failed';
  ms_sync_error?: string;
  ms_status?: string;
  ms_alerts?: string[];
  ms_carrier?: string;
  ms_tracking?: string;
}

export default function AdminDashboard() {
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
  const [activeTab, setActiveTab] = useState<'orders' | 'analytics' | 'inventory' | 'webhooks'>('orders');
  const [webhookLogs, setWebhookLogs] = useState<any[]>([]);
  const [isEditingCustomer, setIsEditingCustomer] = useState(false);
  const [editedCustomer, setEditedCustomer] = useState<any>(null);
  const { inventory, loading: loadingInventory, getStockStatus, refetch: refetchInventory } = useInventory();

  const fetchOrders = async () => {
    setLoading(true);
    setError(null);
    try {
      const savedPass = password || localStorage.getItem('admin_pass');
      const expectedPass = "Jacobo0812"; 

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

      const data = await getOrdersFromFirebase();
      setOrders(data as any);
      setIsAuthenticated(true);
      localStorage.setItem('admin_pass', savedPass);
    } catch (err: any) {
      setError(err.message || 'Error al conectar con la base de datos de Firebase.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (orderId: string, status: string) => {
    try {
      const success = await updateOrderStatusInFirebase(orderId, status);
      if (success) fetchOrders();
    } catch (err) {
      console.error(err);
    }
  };

  const handleSaveCell = async (orderId: string, field: string, value: string) => {
    try {
      const orderRef = doc(db, 'orders', orderId);
      let updateData: any = {};
      
      if (field.startsWith('customer.')) {
        updateData[field] = value;
      } else if (field === 'total') {
        updateData[field] = parseFloat(value);
      } else {
        updateData[field] = value;
      }

      await updateDoc(orderRef, updateData);
      setEditingCell(null);
      fetchOrders();
    } catch (err) {
      console.error('Error saving cell:', err);
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
    try {
      const orderRef = doc(db, 'orders', orderId);
      const newStatus = customStatus || (trackingInput ? 'shipped_with_guide' : undefined);
      
      const updateData: any = { tracking_guide: trackingInput };
      if (newStatus) {
        updateData.status = newStatus;
      }
      
      await updateDoc(orderRef, updateData);
      setSelectedOrder(prev => prev ? { 
        ...prev, 
        tracking_guide: trackingInput,
        status: newStatus || prev.status
      } : null);
      fetchOrders();
    } catch (err) {
      console.error(err);
    }
  };

  const handleManualSync = async (order: any) => {
    if (order.ms_sync_status === 'synced') {
      if (!confirm('Este pedido ya aparece como SINCRONIZADO. ¿Deseas forzar un REENVÍO a Mastershop?')) return;
    } else {
      if (!confirm('¿Deseas forzar la sincronización de este pedido con Mastershop?')) return;
    }
    
    try {
      const res = await fetch('/api/mastershop/order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ticket: order.ticket_number,
          formData: order.customer,
          items: order.cart?.items || [],
          total: order.total || order.cart?.total || 0,
          force: true
        })
      });
      const result: any = await res.json();
      if (result.status === 'error' || result.error) {
        alert('Error: ' + (result.message || result.error || 'Error desconocido'));
      } else {
        // Actualizar en Firebase para marcar como sincronizado inmediatamente
        const orderRef = doc(db, 'orders', order.id);
        const updateData: any = { 
          ms_sync_status: 'synced',
          updated_at: new Date().toISOString()
        };
        
        // Si Mastershop nos devolvió un ID de pedido nuevo y no teníamos uno
        if ((result.id_order || result.id) && !order.ticket_number) {
          updateData.ticket_number = String(result.id_order || result.id);
        }

        await updateDoc(orderRef, updateData);
        alert('Sincronización forzada con éxito.');
        fetchOrders();
        
        if (selectedOrder && selectedOrder.id === order.id) {
          setSelectedOrder(prev => prev ? { ...prev, ...updateData } : null);
        }
      }
    } catch (e) {
      console.error(e);
      alert('Error de conexión.');
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopying(true);
    setTimeout(() => setCopying(false), 2000);
  };

  const generateClientMessage = (order: Order) => {
    const customer = order.customer || {};
    const name = customer.nombre || customer.fullName || 'Cliente';
    const items = order.cart?.items?.map((i: any) => {
      const q = i.quantity || i.qty || 1;
      const label = i.promoLabel || i.label || '';
      return `- ${q}x ${i.name || i.productName}${label ? ` (${label})` : ''}`;
    }).join('\n') || order.order_details || '';
    
    const address = customer.direccion || customer.address || 'N/A';
    const city = customer.ciudad || customer.city || 'N/A';
    const dept = customer.departamento || customer.department || '';
    const fullLocation = dept ? `${city} • ${dept}` : city;
    
    const guide = order.tracking_guide ? `🚚 Tu número de guía es: *${order.tracking_guide}*\nPuedes rastrearlo en la transportadora correspondiente.\n` : '';
    const ticket = order.ticket_number ? `🔖 Ticket: *#${order.ticket_number}*\n` : '';
    
    return `Hola *${name}*! 👋\n\nTe hablamos de *ZENHOGAR*. Queremos informarte que tu pedido ha sido procesado con éxito.\n\n${ticket}*Detalles del pedido:*\n${items}\n\n*Datos de envío:*\n📍 Dirección: ${address}\n🏙️ Ciudad: ${fullLocation}\n\n${guide}\n¡Gracias por tu compra! ✨\n\n_ZENHOGAR - Salud y Bienestar_`;
  };

  const fetchWebhookLogs = async () => {
    try {
      const res = await fetch('/api/mastershop/webhook-logs');
      if (res.ok) {
        setWebhookLogs(await res.json());
      }
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    if (activeTab === 'webhooks') {
      fetchWebhookLogs();
      const interval = setInterval(fetchWebhookLogs, 10000);
      return () => clearInterval(interval);
    }
  }, [activeTab]);

  const handleDeleteOrder = async (orderId: string) => {
    if (!window.confirm('¿Estás seguro de que deseas eliminar este cliente/pedido? Esta acción no se puede deshacer.')) return;
    try {
      const success = await deleteOrderFromFirebase(orderId);
      if (success) fetchOrders();
    } catch (err) {
      console.error(err);
    }
  };

  const handleClearAllOrders = async () => {
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
    if (!window.confirm('¿Deseas eliminar todos los pedidos y carritos DE MUESTRA y anteriores a los últimos 10 días?')) return;
    
    setLoading(true);
    try {
      const tenDaysAgo = new Date();
      tenDaysAgo.setDate(tenDaysAgo.getDate() - 10);
      
      const ordersRef = collection(db, 'orders');
      const querySnapshot = await getDocs(ordersRef);
      
      let deletedCount = 0;
      const deletePromises = querySnapshot.docs.filter(docSnap => {
        const data = docSnap.data();
        const createdAt = data.created_at?.toDate ? data.created_at.toDate() : new Date(data.created_at);
        // Delete if older than 10 days OR if it identifies as "Prueba" or "Test"
        const isTest = (data.customer?.fullName || '').toLowerCase().includes('prueba') || 
                       (data.order_details || '').toLowerCase().includes('test');
        
        return createdAt < tenDaysAgo || isTest;
      }).map(docSnap => {
        deletedCount++;
        return deleteDoc(docSnap.ref);
      });

      await Promise.all(deletePromises);
      alert(`Limpieza completada. Se eliminaron ${deletedCount} registros antiguos o de prueba.`);
      fetchOrders();
    } catch (err) {
      console.error(err);
      alert('Error al realizar la limpieza selectiva.');
    } finally {
      setLoading(false);
    }
  };

  const downloadExcel = () => {
    // MasterShop Template Headers (17 columns) - Exact match for the template provided in screenshots
    const headers = [
      "IDENTIFICADOR",
      "NOMBRES",
      "APELLIDOS",
      "CEDULA (OPCIONAL)",
      "TELÉFONO",
      "DIRECCIÓN Y BARRIO",
      "DEPARTAMENTO",
      "CIUDAD",
      "ID DE PRODUCTO",
      "ID DE VARIACION",
      "CANTIDAD",
      "PRECIO UNITARIO (SIN PUNTOS NI COMAS)",
      "OTROS CARGOS",
      "VALOR OTROS CARGOS",
      "CON RECAUDO (SI/NO)",
      "NOTA",
      "EMAIL (OPCIONAL)"
    ];

    const rows: any[] = [];

    filteredOrders.forEach(o => {
      const customer = o.customer || {};
      
      // Clean and split names
      const fullName = (customer.nombre ? `${customer.nombre} ${customer.apellido || ''}` : (customer.fullName || '')).trim();
      const nameParts = fullName.split(' ');
      const firstName = nameParts[0] || 'Cliente';
      const lastName = nameParts.slice(1).join(' ') || 'N/A';

      // Clean phone
      const phone = (customer.telefono || customer.phone || '').replace(/\s/g, '');

      // Content for Nota
      const orderNote = o.order_details || '';

      // Iterate through items to create one row per product
      const items = o.cart?.items || [];
      
      if (items.length === 0) {
        // Fallback for abandoned carts or simplified orders
        rows.push([
          o.ticket_number || o.id.slice(0, 8),
          firstName,
          lastName,
          customer.identification || '',
          phone,
          customer.direccion || customer.address || 'Pendiente',
          customer.department || 'Pendiente',
          customer.ciudad || customer.city || 'Pendiente',
          'PRODUCTO', // Default ref
          '', 
          1,
          Math.round(o.total || o.cart?.total || 0).toString().replace(/\D/g, ''),
          '',
          0,
          'SI',
          orderNote,
          customer.email || ''
        ]);
      } else {
        items.forEach((item: any) => {
          const quantityInCart = item.quantity || 1;
          const unitsPerItem = item.units || 1;
          const totalPhysicalUnits = unitsPerItem * quantityInCart;
          
          const totalPriceForItem = (item.price || 0) * quantityInCart;
          const calculatedUnitPrice = totalPhysicalUnits > 0 ? Math.round(totalPriceForItem / totalPhysicalUnits) : (item.price || 0);

          let finalProductId = item.mastershopId || item.productId || item.id;
          
          if (!finalProductId || (typeof finalProductId === 'string' && isNaN(Number(finalProductId)))) {
             const prod = PRODUCTS.find(p => p.id === item.productId);
             if (prod?.mastershopId) {
               finalProductId = prod.mastershopId;
             } else if (item.productId === COMBO_OF_THE_MONTH.id) {
               finalProductId = COMBO_OF_THE_MONTH.mastershopId;
             } else {
               const promo = PROMOTIONS.find(p => p.id === item.productId);
               if (promo && (promo as any).mastershopId) {
                 finalProductId = (promo as any).mastershopId;
               }
             }
          }

          rows.push([
            o.ticket_number || o.id.slice(0, 8),
            firstName,
            lastName,
            customer.identification || '',
            phone,
            customer.direccion || customer.address || 'Pendiente',
            customer.department || 'Pendiente',
            customer.ciudad || customer.city || 'Pendiente',
            finalProductId || 'PRODUCTO',
            item.variantId || '', 
            totalPhysicalUnits,
            calculatedUnitPrice.toString().replace(/\D/g, ''),
            '', 
            0,
            'SI', 
            orderNote,
            customer.email || ''
          ]);
        });
      }
    });

    const now = new Date();
    const dateFormatted = `${String(now.getDate()).padStart(2, '0')}-${String(now.getMonth() + 1).padStart(2, '0')}-${now.getFullYear()}`;

    // Create Excel workbook and sheet
    const ws = XLSX.utils.aoa_to_sheet([headers, ...rows]);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Pedidos");

    // Write file as .xlsm
    XLSX.writeFile(wb, `Plantilla-de-carga-Master-Shop-${dateFormatted}.xlsm`, { bookType: 'xlsm' });
  };

  useEffect(() => {
    const savedPass = localStorage.getItem('admin_pass');
    if (savedPass) {
      fetchOrders();
    }
  }, []);

  const filteredOrders = useMemo(() => (orders || [])
    .filter(o => o && (filter === 'all' || o.type === filter))
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
    }), [orders, filter, searchTerm, startDate, endDate, selectedStatuses]);

  const stats = useMemo(() => {
    const ordersOnly = filteredOrders.filter(o => o.type === 'order');
    const checkoutsOnly = filteredOrders.filter(o => o.type === 'checkout');
    
    return {
      ingresosEstimados: ordersOnly.reduce((acc, curr) => acc + (Number(curr?.total) || Number(curr?.cart?.total) || 0), 0),
      pedidosTotales: ordersOnly.length,
      carritosAbandonados: checkoutsOnly.length,
      pendientesEnvio: ordersOnly.filter(o => ['pending', 'pending_validation'].includes(o.status) || o.ms_sync_status !== 'synced').length
    };
  }, [filteredOrders]);

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

  const filteredWebhookLogs = useMemo(() => {
    return webhookLogs.filter(log => {
      if (!startDate && !endDate) return true;
      const logDate = new Date(log.receivedAt);
      logDate.setHours(0, 0, 0, 0);
      
      if (startDate) {
        const start = new Date(startDate);
        start.setHours(0, 0, 0, 0);
        if (logDate < start) return false;
      }
      
      if (endDate) {
        const end = new Date(endDate);
        end.setHours(23, 59, 59, 999);
        if (logDate > end) return false;
      }
      
      return true;
    });
  }, [webhookLogs, startDate, endDate]);

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-stone-900 flex items-center justify-center p-4">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white p-8 rounded-[2.5rem] shadow-2xl w-full max-w-md text-center"
        >
          <div className="flex justify-center mb-8">
            <div className="w-16 h-16 bg-emerald-100 rounded-2xl flex items-center justify-center">
              <Lock className="w-8 h-8 text-emerald-600" />
            </div>
          </div>
          <h1 className="text-2xl font-bold text-center mb-1">Panel de Administración</h1>
          <p className="text-[9px] text-center text-stone-400 font-bold uppercase tracking-[0.2em] mb-6">v1.2.0 - Inventory Smartv2</p>
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-stone-500 uppercase tracking-widest mb-2 px-1">Contraseña de acceso</label>
              <div className="relative">
                <input 
                  type={showPassword ? "text" : "password"} 
                  value={password}
                  onChange={(e) => { setPassword(e.target.value); setError(null); }}
                  onKeyPress={(e) => e.key === 'Enter' && fetchOrders()}
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
              onClick={fetchOrders}
              disabled={loading}
              className="w-full py-4 bg-emerald-600 text-white rounded-2xl font-black shadow-lg shadow-emerald-600/20 hover:bg-emerald-700 transition-all disabled:opacity-50"
            >
              {loading ? 'Verificando...' : 'Entrar al Panel'}
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-50 pb-20 lg:pb-0">
      {/* Mobile Header */}
      <div className="lg:hidden bg-stone-900 text-white p-4 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <img src="/favicon.png" className="w-6 h-6 object-contain" alt="Logo" />
          <span className="font-bold text-sm tracking-tight">ZENHOGAR Admin</span>
        </div>
        <button 
          onClick={() => { localStorage.removeItem('admin_pass'); window.location.reload(); }}
          className="text-[10px] font-black uppercase text-stone-400"
        >
          Salir
        </button>
      </div>

      {/* Sidebar Desktop */}
      <aside className="fixed left-0 top-0 bottom-0 w-20 bg-stone-900 text-white p-4 hidden lg:flex flex-col items-center z-50 transition-all duration-300">
        <div className="mb-8 p-1">
          <img src="/favicon.png" className="w-10 h-10 object-contain mx-auto" alt="Logo" />
        </div>
        
        <nav className="space-y-4 flex flex-col items-center">
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

          <div className="pt-4 border-t border-stone-800 w-full flex justify-center">
             <button 
              onClick={() => setActiveTab('webhooks')}
              className={cn(
                "p-3 rounded-2xl transition-all duration-300 w-full flex justify-center",
                activeTab === 'webhooks' ? "bg-emerald-500 text-white shadow-lg shadow-emerald-500/20" : "text-stone-400 hover:bg-white/10"
              )}
              title="Webhooks"
            >
              <Activity className="w-6 h-6" />
            </button>
          </div>
        </nav>

        <div className="absolute bottom-6 left-2 right-2 p-2 bg-white/5 rounded-xl border border-white/10 text-center">
          <p className="text-[7px] uppercase font-black text-stone-500 tracking-tighter">v2.1.0 (Stable)</p>
        </div>
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
          onClick={() => setActiveTab('webhooks')}
          className={cn(
            "p-3 rounded-xl transition-all flex flex-col items-center gap-1",
            activeTab === 'webhooks' ? "text-emerald-400 bg-white/10" : "text-stone-500"
          )}
        >
          <Activity className="w-5 h-5" />
          <span className="text-[8px] font-black uppercase">MS</span>
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
      </nav>

      {/* Main Content */}
      <main className="lg:pl-20 min-h-screen">
        <header className="bg-white border-b border-stone-200 p-4 lg:px-8 py-4 flex flex-col sm:flex-row justify-between items-center gap-4 sticky top-0 z-40">
          <div className="flex items-center gap-4">
            <h1 className="text-xl font-bold text-stone-900 tracking-tight">
              {activeTab === 'orders' ? 'Pedidos' : 
               activeTab === 'analytics' ? 'Analítica' : 
               activeTab === 'inventory' ? 'Inventario' : 'Webhooks'}
            </h1>
            <div className="h-4 w-px bg-stone-200 hidden sm:block" />
            <p className="text-[10px] font-black text-stone-400 uppercase tracking-widest hidden sm:block">Zenhogar v2.1.0</p>
          </div>
          <button 
            onClick={() => { localStorage.removeItem('admin_pass'); window.location.reload(); }}
            className="px-4 py-2 text-stone-400 hover:text-red-500 font-bold text-[10px] uppercase tracking-widest transition-colors"
          >
            Cerrar Sesión
          </button>
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
                    value={formatCurrency(stats.ingresosEstimados)} 
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
                    label="Pendientes de Envío" 
                    value={stats.pendientesEnvio.toString()} 
                    icon={<Clock className="w-5 h-5" />}
                    color="amber"
                  />
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
                        onClick={downloadExcel}
                        className="px-3 py-1.5 bg-emerald-50 text-emerald-600 rounded-lg font-bold text-[10px] uppercase hover:bg-emerald-100 transition-all flex items-center gap-1.5"
                      >
                        <Download className="w-3 h-3" /> Exportar
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
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="bg-[#e2efda] border-b border-stone-300">
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
                            <td colSpan={14} className="px-6 py-20 text-center text-stone-400 italic">No hay pedidos registrados todavía.</td>
                          </tr>
                        ) : (
                          filteredOrders.map((order) => {
                            const customer = order.customer || {};
                            const displayName = customer.nombre 
                              ? `${customer.nombre} ${customer.apellido || ''}`
                              : (customer.fullName || 'Cliente sin nombre');
                            const displayPhone = customer.telefono || customer.phone || '---';
                            const displayEmail = customer.email || '---';
                            const hasAlerts = order.ms_sync_status === 'failed' || order.status === 'with_issue' || (order.ms_alerts && order.ms_alerts.length > 0);

                            return (
                              <tr 
                                key={order.id} 
                                className="hover:bg-stone-50 transition-colors group cursor-pointer border-b border-stone-200"
                                onClick={() => { setSelectedOrder(order); setTrackingInput(order.tracking_guide || order.ms_tracking || ''); }}
                              >
                                <td className="px-2 py-1.5 border-r border-stone-200">
                                  <span className={cn(
                                    "text-[10px] font-mono font-black border px-1.5 py-0.5 rounded transition-all block text-center",
                                    (order.ms_sync_status === 'synced' || order.tracking_guide) 
                                      ? "bg-emerald-500 border-emerald-600 text-white" 
                                      : order.ms_sync_status === 'failed'
                                        ? "bg-red-50 border-red-200 text-red-600"
                                        : "bg-white border-stone-100 text-stone-400"
                                  )}>
                                    {order.ticket_number || '---'}
                                  </span>
                                </td>
                                <td className="px-2 py-1.5 border-r border-stone-200">
                                  <span className="text-[11px] font-normal text-black whitespace-nowrap">
                                    {order.created_at ? new Date(order.created_at).toLocaleDateString() : 'Hoy'}
                                  </span>
                                </td>
                                <td className="px-2 py-1.5 text-center border-r border-stone-200">
                                  <span className="text-[10px] font-bold text-stone-500 uppercase tracking-tighter">
                                    {order.type === 'order' ? 'Venta' : 'Abnd'}
                                  </span>
                                </td>
                                <td className="px-2 py-1.5 border-r border-stone-200">
                                  <span className="text-[11px] font-normal text-black leading-tight block line-clamp-2 max-w-[150px]">
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
                                        value={order.tracking_guide || ''}
                                        onChange={(e) => {
                                          e.stopPropagation();
                                          handleSaveCell(order.id, 'tracking_guide', e.target.value);
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
                                    {formatCurrency(order.total || order.cart?.total || 0)}
                                  </span>
                                </td>
                                <td className="px-2 py-1.5 border-r border-stone-200">
                                  <div className="flex items-center justify-center min-h-[40px]" onClick={(e) => e.stopPropagation()}>
                                    <select 
                                      value={order.status}
                                      onChange={(e) => updateStatus(order.id, e.target.value)}
                                      className={cn(
                                        "appearance-none bg-transparent border-0 text-center cursor-pointer outline-none focus:ring-0",
                                        "text-[10px] font-black w-full h-full py-1 text-black whitespace-normal leading-tight"
                                      )}
                                    >
                                      <option value="pending">Pendiente</option>
                                      <option value="confirmed">Confirmado</option>
                                      <option value="ready_to_ship">Por Alistar</option>
                                      <option value="shipped_with_guide">Guía Generada</option>
                                      <option value="in_transit">En Tránsito</option>
                                      <option value="delivered">Entregado</option>
                                      <option value="completed">Cumplida</option>
                                      <option value="waiting_delivery">Espera Entrega</option>
                                      <option value="declined">Declinada</option>
                                      <option value="cancelled">Cancelado</option>
                                      <option value="with_issue">Con Novedad</option>
                                    </select>
                                  </div>
                                  {hasAlerts && (
                                     <div className="text-center mt-0.5">
                                       <span className="text-[8px] font-black text-white bg-red-500 px-1 rounded animate-pulse">ALERTA MS</span>
                                     </div>
                                  )}
                                </td>
                                <td className="px-2 py-1.5 text-right">
                                   <div className="flex justify-end gap-1">
                                      <button 
                                        onClick={(e) => { e.stopPropagation(); setSelectedOrder(order); }}
                                        className="w-6 h-6 rounded bg-stone-100 text-stone-400 flex items-center justify-center hover:bg-emerald-50 hover:text-emerald-600 transition-all"
                                        title="Ver Detalles"
                                      >
                                        <Eye className="w-3 h-3" />
                                      </button>
                                      {order.status !== 'success' && (
                                        <button 
                                          onClick={(e) => { e.stopPropagation(); handleManualSync(order); }}
                                          className="w-6 h-6 rounded bg-emerald-100 text-emerald-600 flex items-center justify-center hover:bg-emerald-200 transition-all"
                                          title="Forzar Sincronización"
                                        >
                                          <RefreshCw className="w-3 h-3" />
                                        </button>
                                      )}
                                      <button 
                                        onClick={(e) => { e.stopPropagation(); handleDeleteOrder(order.id); }}
                                        className="w-6 h-6 rounded bg-stone-50 text-stone-300 flex items-center justify-center hover:bg-red-50 hover:text-red-500 transition-all"
                                        title="Borrar"
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
                    value={formatCurrency(stats.ingresosEstimados)} 
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
                            contentStyle={{ borderRadius: '1rem', border: 'none', shadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                            formatter={(value: any) => typeof value === 'number' ? formatCurrency(value) : value}
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
                            <span className="text-xs font-bold text-stone-600 uppercase tracking-widest">{entry.name}: {entry.value}</span>
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
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-6"
              >
                <div className="bg-white rounded-[2rem] border border-stone-200 shadow-sm p-6">
                  <div className="flex justify-between items-center mb-6">
                    <div className="flex items-center gap-4">
                      <h2 className="text-xl font-bold">Estado del Inventario</h2>
                      {loadingInventory && <span className="text-[10px] font-black text-blue-500 animate-pulse bg-blue-50 px-2 py-1 rounded-md uppercase tracking-widest">Sincronizando...</span>}
                    </div>
                    <button 
                      onClick={() => refetchInventory()}
                      disabled={loadingInventory}
                      className="flex items-center gap-2 px-4 py-2 bg-stone-100 hover:bg-stone-200 text-stone-600 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all disabled:opacity-50"
                    >
                      <Activity className={cn("w-3 h-3", loadingInventory && "animate-spin")} />
                      Actualizar Stock
                    </button>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left">
                      <thead className="bg-stone-50 border-b border-stone-100">
                        <tr>
                          <th className="px-6 py-4 text-left text-[10px] font-black text-stone-400 uppercase tracking-widest">ID MS</th>
                          <th className="px-6 py-4 text-left text-[10px] font-black text-stone-400 uppercase tracking-widest">Producto</th>
                          <th className="px-6 py-4 text-left text-[10px] font-black text-stone-400 uppercase tracking-widest">Inventario</th>
                          <th className="px-6 py-4 text-left text-[10px] font-black text-stone-400 uppercase tracking-widest">Estado</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-stone-100">
                        {PRODUCTS.map(product => {
                           const status = getStockStatus(product.mastershopId);
                           const stockValue = status?.stock;
                           const stockStr = (status && typeof stockValue === 'number') ? `${stockValue.toLocaleString('es-CO')} unds.` : '---';
                           
                           return (
                             <tr key={product.id} className="hover:bg-stone-50/50 transition-colors">
                                <td className="px-6 py-4 text-xs font-mono text-stone-400">#{product.mastershopId}</td>
                                <td className="px-6 py-4 font-bold text-sm text-stone-800 flex items-center gap-2">
                                  <Package className="w-3 h-3 text-stone-400" />
                                  {product.name}
                                </td>
                                <td className="px-6 py-4 font-mono text-xs text-stone-500 font-medium">
                                  <div className="flex items-center gap-1">
                                    <Package className="w-3 h-3 text-stone-300" />
                                    {stockStr}
                                  </div>
                                </td>
                                <td className="px-6 py-4">
                                  {status ? (
                                    <span className={cn(
                                      "text-[10px] font-black px-2 py-1 rounded-md uppercase tracking-widest",
                                      status.color === 'green' && "bg-emerald-100 text-emerald-700",
                                      status.color === 'orange' && "bg-orange-100 text-orange-700",
                                      status.color === 'red' && "bg-red-100 text-red-700"
                                    )}>
                                      {status.label}
                                    </span>
                                  ) : (
                                    <span className="text-[10px] text-stone-400">CARGANDO</span>
                                  )}
                                </td>
                             </tr>
                           )
                        })}

                        {/* Divider for Gifts */}
                        <tr className="bg-stone-100/50">
                          <td colSpan={4} className="px-6 py-2 text-[9px] font-black text-stone-500 uppercase tracking-[0.3em]">Sección de Obsequios</td>
                        </tr>

                        {/* Render Gifts */}
                        {GIFT_PRODUCTS.map(gift => {
                           const status = getStockStatus(gift.mastershopId);
                           const stockValue = status?.stock;
                           const stockStr = (status && typeof stockValue === 'number') ? `${stockValue.toLocaleString('es-CO')} unds.` : '---';

                           return (
                             <tr key={gift.id} className="hover:bg-amber-50/30 transition-colors bg-amber-50/10">
                                <td className="px-6 py-4 text-xs font-mono text-amber-600/70">#{gift.mastershopId}</td>
                                <td className="px-6 py-4 font-bold text-sm text-stone-800 flex items-center gap-2">
                                  <ShoppingBag className="w-3 h-3 text-amber-500" />
                                  {gift.name}
                                </td>
                                <td className="px-6 py-4 font-mono text-xs text-amber-900/40 font-medium">
                                  <div className="flex items-center gap-1">
                                    <Package className="w-3 h-3 text-amber-200" />
                                    {stockStr}
                                  </div>
                                </td>
                                <td className="px-6 py-4">
                                  {status ? (
                                    <span className={cn(
                                      "text-[10px] font-black px-2 py-1 rounded-md uppercase tracking-widest",
                                      status.color === 'green' && "bg-emerald-100 text-emerald-700",
                                      status.color === 'orange' && "bg-orange-100 text-orange-700",
                                      status.color === 'red' && "bg-red-100 text-red-700"
                                    )}>
                                      {status.label}
                                    </span>
                                  ) : (
                                    <span className="text-[10px] text-stone-400">CARGANDO</span>
                                  )}
                                </td>
                             </tr>
                           )
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              </motion.div>
            ) : activeTab === 'webhooks' ? (
              <motion.div
                key="webhooks"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-6"
              >
                <div className="bg-white rounded-[2rem] border border-stone-200 shadow-sm p-6">
                  <div className="flex justify-between items-center mb-6">
                    <div>
                      <h2 className="text-xl font-bold flex items-center gap-2 text-stone-900">
                        <Activity className="w-6 h-6 text-emerald-500" />
                        Webhooks de Mastershop
                      </h2>
                      <p className="text-[10px] text-stone-400 mt-1 uppercase font-black tracking-widest">
                        {filteredWebhookLogs.length} eventos en el periodo seleccionado
                      </p>
                    </div>
                    <button 
                      onClick={fetchWebhookLogs}
                      className="px-4 py-2 bg-stone-100 text-stone-600 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-stone-200 transition-colors flex items-center gap-2"
                    >
                      <RefreshCw className="w-3.5 h-3.5" /> Actualizar
                    </button>
                  </div>
                  
                  {filteredWebhookLogs.length === 0 ? (
                    <div className="text-center py-16 bg-stone-50/50 rounded-3xl border border-dashed border-stone-200">
                      <p className="text-stone-400 text-sm">No se encontraron eventos para los filtros seleccionados.</p>
                      {webhookLogs.length === 0 && (
                        <div className="mt-4">
                          <p className="text-[10px] font-mono text-stone-400 uppercase tracking-widest font-black">Endpoint Mastershop</p>
                          <p className="text-[11px] font-mono text-emerald-600 bg-emerald-50 px-3 py-1 rounded inline-block mt-1">https://zenhogar.live/api/mastershop/webhook</p>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="grid gap-4">
                      {filteredWebhookLogs.map((log, index) => (
                        <div key={index} className="bg-stone-50 border border-stone-200 rounded-2xl p-4">
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-xs font-black text-stone-500 uppercase tracking-widest">{new Date(log.receivedAt).toLocaleString('es-CO')}</span>
                            <div className="flex items-center gap-2">
                               <span className="text-[9px] font-mono text-stone-400 bg-stone-100 px-2 py-0.5 rounded uppercase">ID: {log.orderId}</span>
                               <span className="text-[10px] bg-emerald-100 text-emerald-700 px-2 py-1 rounded-lg font-bold">RECIBIDO</span>
                            </div>
                          </div>
                          <pre className="bg-stone-900 text-emerald-400 p-4 rounded-xl text-xs overflow-x-auto">
                            {JSON.stringify(log.payload, null, 2)}
                          </pre>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>
      </main>

      {/* Detail Modal */}
      {selectedOrder && (
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
                          <><Edit className="w-3 h-3" /> Editar</>
                        )}
                      </button>
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
                              <label className="text-[9px] font-black text-stone-400 uppercase tracking-widest mb-1 block">Ciudad</label>
                              <input 
                                type="text"
                                value={editedCustomer.ciudad || editedCustomer.city || ''}
                                onChange={(e) => setEditedCustomer({ ...editedCustomer, ciudad: e.target.value, city: e.target.value })}
                                className="w-full px-3 py-2 bg-white border border-stone-200 rounded-xl text-xs outline-none focus:ring-1 focus:ring-emerald-500"
                              />
                            </div>
                            <div>
                              <label className="text-[9px] font-black text-stone-400 uppercase tracking-widest mb-1 block">Departamento</label>
                              <input 
                                type="text"
                                value={editedCustomer.department || ''}
                                onChange={(e) => setEditedCustomer({ ...editedCustomer, department: e.target.value })}
                                className="w-full px-3 py-2 bg-white border border-stone-200 rounded-xl text-xs outline-none focus:ring-1 focus:ring-emerald-500"
                              />
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
                        <StatusBadge status={selectedOrder.status} type={selectedOrder.type} msStatus={selectedOrder.ms_status} />
                      </div>
                    </div>
                  </section>

                  {selectedOrder.status !== 'success' && (
                    <section className="bg-emerald-50 p-6 rounded-[2rem] border-2 border-emerald-200 border-dashed">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center">
                          <RefreshCw className="w-6 h-6" />
                        </div>
                        <div>
                          <h4 className="text-sm font-black text-emerald-700 uppercase">Sincronización Manual</h4>
                          <p className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest">Forzar envío a Mastershop después de corregir datos</p>
                        </div>
                      </div>
                      {selectedOrder.ms_sync_status === 'failed' && (
                        <div className="bg-white/50 p-3 rounded-xl text-xs font-mono text-red-800 mb-4 overflow-x-auto border border-red-100">
                          Error previo: {selectedOrder.ms_sync_error || "Desconocido"}
                        </div>
                      )}
                      <button 
                        onClick={() => handleManualSync(selectedOrder)}
                        disabled={selectedOrder.ms_sync_status === 'synced'}
                        className={cn(
                          "w-full py-3 rounded-xl font-bold text-xs uppercase tracking-widest transition-all flex items-center justify-center gap-2 shadow-lg",
                          selectedOrder.ms_sync_status === 'synced'
                            ? "bg-stone-100 text-stone-400 cursor-not-allowed border border-stone-200"
                            : "bg-emerald-600 text-white hover:bg-emerald-700 active:scale-[0.98]"
                        )}
                      >
                         {selectedOrder.ms_sync_status === 'synced' ? (
                           <> <CheckCircle2 className="w-4 h-4" /> Pedido Ya Generado</>
                         ) : (
                           <> <Activity className="w-4 h-4" /> Forzar Envío Mastershop </>
                         )}
                      </button>
                    </section>
                  )}

                  {selectedOrder.ms_status && (
                    <section className="bg-blue-50 p-6 rounded-[2rem] border border-blue-100">
                      <h4 className="text-[10px] font-black text-blue-700 uppercase tracking-widest mb-4 flex items-center gap-2">
                        <Activity className="w-3 h-3" /> Estado Logístico (Mastershop)
                      </h4>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center bg-white p-3 rounded-xl border border-blue-100">
                          <span className="text-xs font-bold text-stone-500 uppercase">Estado MS</span>
                          <StatusBadge status={selectedOrder.status} type={selectedOrder.type} msStatus={selectedOrder.ms_status} />
                        </div>
                        {selectedOrder.ms_carrier && (
                          <div className="flex justify-between items-center bg-white p-3 rounded-xl border border-blue-100">
                            <span className="text-xs font-bold text-stone-500 uppercase">Transportadora</span>
                            <span className="text-xs font-black text-blue-700">{selectedOrder.ms_carrier}</span>
                          </div>
                        )}
                        {(selectedOrder.ms_tracking || selectedOrder.tracking_guide) && (
                          <div className="flex justify-between items-center bg-white p-3 rounded-xl border border-blue-100">
                            <span className="text-xs font-bold text-stone-500 uppercase">Número de Guía</span>
                            <span className="text-xs font-mono font-black text-blue-700">{selectedOrder.ms_tracking || selectedOrder.tracking_guide}</span>
                          </div>
                        )}
                        {selectedOrder.ms_alerts && selectedOrder.ms_alerts.length > 0 && (
                          <div className="bg-red-50 p-3 rounded-xl border border-red-200">
                             <span className="text-[10px] font-black text-red-700 uppercase tracking-widest mb-2 block">Alertas de Novedad</span>
                             <ul className="space-y-1">
                               {selectedOrder.ms_alerts.map((alert, idx) => (
                                 <li key={idx} className="text-[10px] text-red-600 font-bold flex items-center gap-2">
                                   <XCircle className="w-3 h-3" /> {alert}
                                 </li>
                               ))}
                             </ul>
                          </div>
                        )}
                      </div>
                    </section>
                  )}

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
                                 <span className="font-black text-emerald-600">{formatCurrency(item.price ? (item.price * q) : 0)}</span>
                               </li>
                             );
                          })}
                        </ul>
                      ) : (
                        <div className="whitespace-pre-wrap">{selectedOrder.order_details || 'Sin detalles registrados'}</div>
                      )}
                      <div className="mt-4 pt-4 border-t-2 border-dashed border-stone-200 flex justify-between items-center font-black text-lg text-stone-900">
                        <span>TOTAL</span>
                        <span className="text-emerald-600">{formatCurrency(selectedOrder.total || selectedOrder.cart?.total || 0)}</span>
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

function StatusBadge({ status, type, msStatus, syncStatus }: { status: string, type: string, msStatus?: string, syncStatus?: string }) {
  if (type === 'abandoned') return (
    <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-orange-50 border border-orange-100">
      <span className="text-[11px] font-normal uppercase text-black">Abandono</span>
    </div>
  );

  if (syncStatus === 'failed') return (
    <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-red-50 border border-red-100">
      <span className="text-[11px] font-normal uppercase text-black">SUBIR MANUAL</span>
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

  const c = config[msStatus || status] || config[status] || config.pending;
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
