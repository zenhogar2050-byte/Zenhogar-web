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
  X,
  ClipboardCheck,
  Clipboard,
  FileText,
  MapPin,
  Calendar
} from 'lucide-react';
import { formatCurrency, cn } from '../utils';
import { getOrdersFromFirebase, updateOrderStatusInFirebase, deleteOrderFromFirebase, db } from '../lib/firebase';
import { doc, updateDoc } from 'firebase/firestore';

interface Order {
  id: string;
  customer: {
    nombre?: string;
    apellido?: string;
    fullName?: string;
    email?: string;
    telefono?: string;
    phone?: string;
    ciudad?: string;
    direccion?: string;
    department?: string;
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
  const [editingCell, setEditingCell] = useState<{ id: string, field: string } | null>(null);
  const [editValue, setEditValue] = useState('');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [trackingInput, setTrackingInput] = useState('');
  const [copying, setCopying] = useState(false);
  const [activeTab, setActiveTab] = useState<'orders' | 'analytics'>('orders');

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

  const handleUpdateTracking = async (orderId: string) => {
    try {
      const orderRef = doc(db, 'orders', orderId);
      await updateDoc(orderRef, { tracking_guide: trackingInput });
      setSelectedOrder(prev => prev ? { ...prev, tracking_guide: trackingInput } : null);
      fetchOrders();
    } catch (err) {
      console.error(err);
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
    const items = order.cart?.items?.map((i: any) => `- ${i.quantity || 1}x ${i.name || i.productName}`).join('\n') || order.order_details || '';
    const guide = order.tracking_guide ? `🚚 Tu número de guía es: *${order.tracking_guide}*\nPuedes rastrearlo en la transportadora correspondiente.\n` : '';
    const ticket = order.ticket_number ? `🔖 Ticket: *#${order.ticket_number}*\n` : '';
    
    return `Hola *${name}*! 👋\n\nTe hablamos de *ZENHOGAR*. Queremos informarte que tu pedido ha sido procesado con éxito.\n\n${ticket}*Detalles del pedido:*\n${items}\n\n*Datos de envío:*\n📍 Dirección: ${customer.direccion || 'N/A'}\n🏙️ Ciudad: ${customer.ciudad || 'N/A'}\n\n${guide}\n¡Gracias por tu compra! ✨\n\n_ZENHOGAR - Salud y Bienestar_`;
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

  const downloadExcel = () => {
    const headers = ['Ticket', 'Fecha', 'Tipo', 'Cliente', 'WhatsApp', 'Email', 'Dirección', 'Ciudad', 'Departamento', 'Contenido', 'Monto', 'Estado'];
    const rows = filteredOrders.map(o => {
      const customer = o.customer || {};
      const items = o.cart?.items?.map((i: any) => `${i.quantity}x ${i.name}`).join(', ') || o.order_details || 'N/A';
      return [
        o.ticket_number || 'N/A',
        o.created_at ? new Date(o.created_at).toLocaleString() : 'N/A',
        o.type === 'order' ? 'PEDIDO' : 'ABANDONADO',
        customer.nombre ? `${customer.nombre} ${customer.apellido || ''}` : (customer.fullName || 'N/A'),
        customer.telefono || customer.phone || 'N/A',
        customer.email || 'N/A',
        customer.direccion || 'N/A',
        customer.ciudad || 'N/A',
        customer.department || 'N/A',
        items,
        o.total || o.cart?.total || 0,
        o.status || 'N/A'
      ];
    });

    const csvContent = [headers, ...rows].map(e => e.join(",")).join("\n");
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", `pedidos_zenhogar_${new Date().toISOString().slice(0,10)}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  useEffect(() => {
    const savedPass = localStorage.getItem('admin_pass');
    if (savedPass) {
      fetchOrders();
    }
  }, []);

  const totalRevenue = useMemo(() => (orders || [])
    .filter(o => o && (o.status === 'delivered' || (o.status === 'pending' && o.type === 'order')))
    .reduce((acc, curr) => acc + (Number(curr?.total) || Number(curr?.cart?.total) || 0), 0), [orders]);

  const chartData = useMemo(() => {
    const last7Days = [...Array(7)].map((_, i) => {
      const d = new Date();
      d.setDate(d.getDate() - i);
      return d.toISOString().split('T')[0];
    }).reverse();

    return last7Days.map(date => {
      const dayOrders = orders.filter(o => o.created_at?.startsWith(date) && o.type === 'order');
      return {
        name: date.split('-').slice(1).reverse().join('/'),
        ventas: dayOrders.length,
        ingresos: dayOrders.reduce((acc, curr) => acc + (Number(curr.total) || Number(curr.cart?.total) || 0), 0)
      };
    });
  }, [orders]);

  const statusDistribution = useMemo(() => {
    const stats: any = {};
    orders.filter(o => o.type === 'order').forEach(o => {
      stats[o.status] = (stats[o.status] || 0) + 1;
    });
    return Object.entries(stats).map(([name, value]) => ({ name, value }));
  }, [orders]);

  const topProducts = useMemo(() => {
    const products: any = {};
    orders.filter(o => o.type === 'order').forEach(o => {
      o.cart?.items?.forEach((item: any) => {
        const name = item.name || item.productName || 'Desconocido';
        products[name] = (products[name] || 0) + (item.quantity || 1);
      });
    });
    return Object.entries(products)
      .map(([name, sales]) => ({ name, sales: sales as number }))
      .sort((a, b) => b.sales - a.sales)
      .slice(0, 10);
  }, [orders]);

  const geoStats = useMemo(() => {
    const departments: any = {};
    const cities: any = {};
    
    orders.filter(o => o.type === 'order').forEach(o => {
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
  }, [orders]);

  const funnelStats = useMemo(() => {
    const totalCheckouts = orders.length;
    const completed = orders.filter(o => o.type === 'order').length;
    const abandoned = orders.filter(o => o.type === 'abandoned').length;
    const conversionRate = totalCheckouts > 0 ? (completed / totalCheckouts) * 100 : 0;

    return [
      { name: 'Checkouts Iniciados', value: totalCheckouts, fill: '#94a3b8' },
      { name: 'Ventas Finalizadas', value: completed, fill: '#10b981' },
      { name: 'Carritos Abandonados', value: abandoned, fill: '#f59e0b' }
    ];
  }, [orders]);

  const abandonedByProduct = useMemo(() => {
    const products: any = {};
    orders.filter(o => o.type === 'abandoned').forEach(o => {
      o.cart?.items?.forEach((item: any) => {
        const name = item.name || item.productName || 'Desconocido';
        products[name] = (products[name] || 0) + 1;
      });
    });
    return Object.entries(products)
      .map(([name, count]) => ({ name, count: count as number }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);
  }, [orders]);

  const filteredOrders = useMemo(() => (orders || [])
    .filter(o => o && (filter === 'all' || o.type === filter))
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
    }), [orders, filter, searchTerm]);

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
          <h1 className="text-2xl font-bold text-center mb-6">Panel de Administración</h1>
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
    <div className="min-h-screen bg-stone-50">
      {/* Sidebar Desktop */}
      <aside className="fixed left-0 top-0 bottom-0 w-64 bg-stone-900 text-white p-6 hidden lg:block z-50">
        <div className="flex items-center gap-3 mb-10">
          <img src="/favicon.png" className="w-8 h-8 object-contain" alt="Logo" />
          <span className="font-bold tracking-tight text-xl">ZENHOGAR Admin</span>
        </div>
        
        <nav className="space-y-2">
          <button 
            onClick={() => setActiveTab('orders')}
            className={cn(
              "w-full flex items-center gap-3 p-3 rounded-xl font-medium transition-all",
              activeTab === 'orders' ? "bg-white/10 text-emerald-400" : "hover:bg-white/5 text-stone-400"
            )}
          >
            <LayoutDashboard className="w-5 h-5" /> Pedidos
          </button>
          <button 
            onClick={() => setActiveTab('analytics')}
            className={cn(
              "w-full flex items-center gap-3 p-3 rounded-xl font-medium transition-all",
              activeTab === 'analytics' ? "bg-white/10 text-emerald-400" : "hover:bg-white/5 text-stone-400"
            )}
          >
            <TrendingUp className="w-5 h-5" /> Analítica
          </button>
        </nav>

        <div className="absolute bottom-6 left-6 right-6 p-4 bg-white/5 rounded-2xl border border-white/10">
          <p className="text-[10px] uppercase font-black text-stone-500 tracking-widest mb-1">Versión</p>
          <p className="text-xs font-bold">2.0.0 (Automation)</p>
        </div>
      </aside>

      {/* Main Content */}
      <main className="lg:pl-64 min-h-screen">
        <header className="bg-white border-b border-stone-200 p-4 lg:p-6 flex flex-col sm:flex-row justify-between items-center gap-4 sticky top-0 z-40">
          <div>
            <h1 className="text-2xl font-bold text-stone-900">Gestión de Pedidos</h1>
            <p className="text-sm text-stone-500">Supervisa tus ventas y carritos abandonados</p>
          </div>
          <button 
            onClick={() => { localStorage.removeItem('admin_pass'); window.location.reload(); }}
            className="px-4 py-2 text-stone-500 hover:text-red-600 font-bold text-xs uppercase tracking-widest"
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
                    value={formatCurrency(totalRevenue)} 
                    icon={<DollarSign className="w-6 h-6" />}
                    color="emerald"
                  />
                  <StatCard 
                    label="Pedidos Totales" 
                    value={(orders || []).filter(o => o && o.type === 'order').length} 
                    icon={<Package className="w-6 h-6" />}
                    color="blue"
                  />
                  <StatCard 
                    label="Carritos Abandonados" 
                    value={(orders || []).filter(o => o && o.type === 'abandoned').length} 
                    icon={<Trash2 className="w-6 h-6" />}
                    color="orange"
                  />
                  <StatCard 
                    label="Pendientes de Envío" 
                    value={(orders || []).filter(o => o && o.status === 'pending' && o.type === 'order').length} 
                    icon={<Clock className="w-6 h-6" />}
                    color="amber"
                  />
                </div>

                {/* Filters & Search */}
                <div className="bg-white p-4 rounded-[2rem] border border-stone-200 shadow-sm mb-6 flex flex-col lg:flex-row gap-4 items-center">
                  <div className="relative flex-grow w-full">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-400" />
                    <input 
                      type="text" 
                      placeholder="Buscar por nombre, correo o teléfono..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-12 pr-4 py-3 bg-stone-50 border border-stone-100 rounded-2xl outline-none focus:ring-2 focus:ring-emerald-500 transition-all font-medium text-sm"
                    />
                  </div>
                  <div className="flex gap-2 w-full lg:w-auto overflow-x-auto pb-1 lg:pb-0">
                    <FilterTab active={filter === 'all'} label="Todos" onClick={() => setFilter('all')} />
                    <FilterTab active={filter === 'order'} label="Ventas" onClick={() => setFilter('order')} />
                    <FilterTab active={filter === 'abandoned'} label="Abandonados" onClick={() => setFilter('abandoned')} />
                  </div>
                  <div className="flex gap-2">
                    <button 
                      onClick={downloadExcel}
                      className="p-3 bg-emerald-50 text-emerald-600 rounded-2xl hover:bg-emerald-100 transition-all flex items-center gap-2 font-bold text-xs uppercase tracking-widest"
                      title="Descargar Excel"
                    >
                      <FileSpreadsheet className="w-5 h-5" />
                      <span className="hidden sm:inline">Exportar</span>
                    </button>
                    <button 
                      onClick={fetchOrders}
                      className="p-3 bg-stone-100 text-stone-600 rounded-2xl hover:bg-emerald-50 hover:text-emerald-600 transition-all flex-shrink-0"
                      title="Actualizar datos"
                    >
                      <TrendingUp className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                {/* Orders Table */}
                <div className="bg-white rounded-[2rem] border border-stone-200 shadow-sm overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left">
                      <thead>
                        <tr className="bg-stone-50/50 border-b border-stone-100">
                          <th className="px-6 py-4 text-[10px] font-black text-stone-400 uppercase tracking-widest">Ticket</th>
                          <th className="px-6 py-4 text-[10px] font-black text-stone-400 uppercase tracking-widest">Cliente</th>
                          <th className="px-6 py-4 text-[10px] font-black text-stone-400 uppercase tracking-widest">WhatsApp</th>
                          <th className="px-6 py-4 text-[10px] font-black text-stone-400 uppercase tracking-widest">Dirección</th>
                          <th className="px-6 py-4 text-[10px] font-black text-stone-400 uppercase tracking-widest">Ciudad</th>
                          <th className="px-6 py-4 text-[10px] font-black text-stone-400 uppercase tracking-widest">Departamento</th>
                          <th className="px-6 py-4 text-[10px] font-black text-stone-400 uppercase tracking-widest">Contenido</th>
                          <th className="px-6 py-4 text-[10px] font-black text-stone-400 uppercase tracking-widest">Monto</th>
                          <th className="px-6 py-4 text-[10px] font-black text-stone-400 uppercase tracking-widest">Estado</th>
                          <th className="px-6 py-4 text-[10px] font-black text-stone-400 uppercase tracking-widest text-right">Acciones</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-stone-100">
                        {filteredOrders.length === 0 ? (
                          <tr>
                            <td colSpan={10} className="px-6 py-20 text-center text-stone-400 italic">No hay pedidos registrados todavía.</td>
                          </tr>
                        ) : (
                          filteredOrders.map((order) => {
                            const customer = order.customer || {};
                            const displayName = customer.nombre 
                              ? `${customer.nombre} ${customer.apellido || ''}`
                              : (customer.fullName || 'Cliente sin nombre');
                            const displayPhone = customer.telefono || customer.phone || 'N/A';
                            const initial = (customer.nombre?.[0] || customer.fullName?.[0] || '?').toUpperCase();

                            return (
                              <tr 
                                key={order.id} 
                                className="hover:bg-stone-50/50 transition-colors group cursor-pointer"
                                onClick={() => { setSelectedOrder(order); setTrackingInput(order.tracking_guide || ''); }}
                              >
                                <td className="px-6 py-5">
                                  <span className="text-[10px] font-black text-emerald-600 bg-emerald-50 px-2 py-1 rounded-md">
                                    #{order.ticket_number || '---'}
                                  </span>
                                </td>
                                <td className="px-6 py-5">
                                  <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-stone-100 flex items-center justify-center text-stone-500 font-bold group-hover:bg-emerald-50 group-hover:text-emerald-600 transition-colors">
                                      {initial}
                                    </div>
                                    <div className="group/edit relative">
                                      {editingCell?.id === order.id && editingCell?.field === 'customer.fullName' ? (
                                        <div className="flex items-center gap-2">
                                          <input 
                                            className="text-sm font-bold text-stone-900 bg-emerald-50 border border-emerald-500 rounded p-1 outline-none w-32"
                                            value={editValue}
                                            autoFocus
                                            onChange={(e) => setEditValue(e.target.value)}
                                            onKeyDown={(e) => e.key === 'Enter' && handleSaveCell(order.id, 'customer.fullName', editValue)}
                                          />
                                          <button onClick={() => handleSaveCell(order.id, 'customer.fullName', editValue)} className="text-emerald-600"><Save className="w-3 h-3"/></button>
                                        </div>
                                      ) : (
                                        <div className="flex items-center gap-2">
                                          <div className="font-bold text-stone-900 leading-tight">{displayName}</div>
                                          <button 
                                            onClick={(e) => { e.stopPropagation(); setEditingCell({ id: order.id, field: 'customer.fullName' }); setEditValue(customer.fullName || customer.nombre || ''); }}
                                            className="opacity-0 group-hover/edit:opacity-100 p-1 text-stone-400 hover:text-emerald-600"
                                          >
                                            <Edit className="w-3 h-3" />
                                          </button>
                                        </div>
                                      )}
                                      <div className="flex items-center gap-2 mt-1">
                                        <span className={cn(
                                          "text-[10px] font-black px-1.5 py-0.5 rounded uppercase tracking-widest",
                                          order.type === 'order' ? "bg-emerald-100 text-emerald-700" : "bg-orange-100 text-orange-700"
                                        )}>
                                          {order.type === 'order' ? 'PEDIDO' : 'ABANDONADO'}
                                        </span>
                                        <span className="text-[10px] font-bold text-stone-400">
                                          {order.created_at ? new Date(order.created_at).toLocaleDateString('es-CO') : 'Reciente'}
                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                </td>
                                <td className="px-6 py-5">
                                  <div className="group/edit relative">
                                    {editingCell?.id === order.id && editingCell?.field === 'customer.phone' ? (
                                      <div className="flex items-center gap-2">
                                        <input 
                                          className="text-xs font-mono bg-emerald-50 border border-emerald-500 rounded p-1 outline-none w-28"
                                          value={editValue}
                                          autoFocus
                                          onChange={(e) => setEditValue(e.target.value)}
                                          onKeyDown={(e) => e.key === 'Enter' && handleSaveCell(order.id, 'customer.phone', editValue)}
                                        />
                                        <button onClick={() => handleSaveCell(order.id, 'customer.phone', editValue)} className="text-emerald-600"><Save className="w-3 h-3"/></button>
                                      </div>
                                    ) : (
                                      <div className="flex items-center gap-2">
                                        <span className="text-sm font-mono text-stone-600 bg-stone-100 px-2 py-1 rounded-lg">
                                          {displayPhone}
                                        </span>
                                        <button 
                                          onClick={(e) => { e.stopPropagation(); setEditingCell({ id: order.id, field: 'customer.phone' }); setEditValue(customer.phone || customer.telefono || ''); }}
                                          className="opacity-0 group-hover/edit:opacity-100 p-1 text-stone-400 hover:text-emerald-600"
                                        >
                                          <Edit className="w-3 h-3" />
                                        </button>
                                      </div>
                                    )}
                                  </div>
                                </td>
                                <td className="px-6 py-5">
                                  <div className="group/edit relative">
                                    {editingCell?.id === order.id && editingCell?.field === 'customer.address' ? (
                                      <div className="flex items-center gap-2">
                                        <input 
                                          className="text-xs bg-emerald-50 border border-emerald-500 rounded p-1 outline-none w-32"
                                          value={editValue}
                                          autoFocus
                                          onChange={(e) => setEditValue(e.target.value)}
                                          onKeyDown={(e) => e.key === 'Enter' && handleSaveCell(order.id, 'customer.address', editValue)}
                                        />
                                        <button onClick={() => handleSaveCell(order.id, 'customer.address', editValue)} className="text-emerald-600"><Save className="w-3 h-3"/></button>
                                      </div>
                                    ) : (
                                      <div className="flex items-center gap-2">
                                        <p className="text-xs text-stone-600">{customer.address || customer.direccion || 'N/A'}</p>
                                        <button 
                                          onClick={(e) => { e.stopPropagation(); setEditingCell({ id: order.id, field: 'customer.address' }); setEditValue(customer.address || customer.direccion || ''); }}
                                          className="opacity-0 group-hover/edit:opacity-100 p-1 text-stone-400 hover:text-emerald-600"
                                        >
                                          <Edit className="w-3 h-3" />
                                        </button>
                                      </div>
                                    )}
                                  </div>
                                </td>
                                <td className="px-6 py-5">
                                  <div className="group/edit relative">
                                    {editingCell?.id === order.id && editingCell?.field === 'customer.city' ? (
                                      <div className="flex items-center gap-2">
                                        <input 
                                          className="text-xs bg-emerald-50 border border-emerald-500 rounded p-1 outline-none w-24"
                                          value={editValue}
                                          autoFocus
                                          onChange={(e) => setEditValue(e.target.value)}
                                          onKeyDown={(e) => e.key === 'Enter' && handleSaveCell(order.id, 'customer.city', editValue)}
                                        />
                                        <button onClick={() => handleSaveCell(order.id, 'customer.city', editValue)} className="text-emerald-600"><Save className="w-3 h-3"/></button>
                                      </div>
                                    ) : (
                                      <div className="flex items-center gap-2">
                                        <p className="text-xs text-stone-600">{customer.city || customer.ciudad || 'N/A'}</p>
                                        <button 
                                          onClick={(e) => { e.stopPropagation(); setEditingCell({ id: order.id, field: 'customer.city' }); setEditValue(customer.city || customer.ciudad || ''); }}
                                          className="opacity-0 group-hover/edit:opacity-100 p-1 text-stone-400 hover:text-emerald-600"
                                        >
                                          <Edit className="w-3 h-3" />
                                        </button>
                                      </div>
                                    )}
                                  </div>
                                </td>
                                <td className="px-6 py-5">
                                  <div className="group/edit relative">
                                    {editingCell?.id === order.id && editingCell?.field === 'customer.department' ? (
                                      <div className="flex items-center gap-2">
                                        <input 
                                          className="text-xs bg-emerald-50 border border-emerald-500 rounded p-1 outline-none w-24"
                                          value={editValue}
                                          autoFocus
                                          onChange={(e) => setEditValue(e.target.value)}
                                          onKeyDown={(e) => e.key === 'Enter' && handleSaveCell(order.id, 'customer.department', editValue)}
                                        />
                                        <button onClick={() => handleSaveCell(order.id, 'customer.department', editValue)} className="text-emerald-600"><Save className="w-3 h-3"/></button>
                                      </div>
                                    ) : (
                                      <div className="flex items-center gap-2">
                                        <p className="text-xs text-stone-600">{customer.department || 'N/A'}</p>
                                        <button 
                                          onClick={(e) => { e.stopPropagation(); setEditingCell({ id: order.id, field: 'customer.department' }); setEditValue(customer.department || ''); }}
                                          className="opacity-0 group-hover/edit:opacity-100 p-1 text-stone-400 hover:text-emerald-600"
                                        >
                                          <Edit className="w-3 h-3" />
                                        </button>
                                      </div>
                                    )}
                                  </div>
                                </td>
                                <td className="px-6 py-5">
                                  <div className="max-w-xs relative group/edit">
                                    {editingCell?.id === order.id && editingCell?.field === 'order_details' ? (
                                      <div className="flex items-center gap-2">
                                        <textarea 
                                          className="text-xs bg-emerald-50 border border-emerald-500 rounded-lg p-2 flex-grow outline-none w-48"
                                          value={editValue}
                                          autoFocus
                                          onChange={(e) => setEditValue(e.target.value)}
                                        />
                                        <button onClick={() => handleSaveCell(order.id, 'order_details', editValue)} className="p-1 text-emerald-600 hover:scale-110">
                                          <Save className="w-4 h-4" />
                                        </button>
                                      </div>
                                    ) : (
                                      <div className="flex justify-between items-start">
                                        <p className="text-xs text-stone-600 line-clamp-2">
                                          {order.cart?.items?.length 
                                            ? order.cart.items.map((i: any) => `${i.quantity || i.qty || 1}x ${i.name || i.productName || 'Producto'}`).join(', ') 
                                            : order.order_details || 'Sin detalles'
                                          }
                                        </p>
                                        <button 
                                          onClick={(e) => {
                                            e.stopPropagation();
                                            setEditingCell({ id: order.id, field: 'order_details' });
                                            setEditValue(order.cart?.items?.length 
                                              ? order.cart.items.map((i: any) => `${i.quantity || i.qty || 1}x ${i.name || i.productName || 'Producto'}`).join(', ') 
                                              : order.order_details || ''
                                            );
                                          }} 
                                          className="opacity-0 group-hover/edit:opacity-100 p-1 text-stone-400 hover:text-emerald-600 transition-all"
                                        >
                                          <Edit className="w-3 h-3" />
                                        </button>
                                      </div>
                                    )}
                                  </div>
                                </td>
                                <td className="px-6 py-5">
                                  <div className="group/edit relative">
                                    {editingCell?.id === order.id && editingCell?.field === 'total' ? (
                                      <div className="flex items-center gap-2">
                                        <input 
                                          type="number"
                                          className="text-sm font-black text-stone-900 bg-emerald-50 border border-emerald-500 rounded p-1 outline-none w-24"
                                          value={editValue}
                                          autoFocus
                                          onChange={(e) => setEditValue(e.target.value)}
                                          onKeyDown={(e) => e.key === 'Enter' && handleSaveCell(order.id, 'total', editValue)}
                                        />
                                        <button onClick={() => handleSaveCell(order.id, 'total', editValue)} className="text-emerald-600"><Save className="w-3 h-3"/></button>
                                      </div>
                                    ) : (
                                      <div className="flex items-center gap-2">
                                        <span className="text-sm font-black text-stone-900">
                                          {formatCurrency(order.total || order.cart?.total || 0)}
                                        </span>
                                        <button 
                                          onClick={(e) => { e.stopPropagation(); setEditingCell({ id: order.id, field: 'total' }); setEditValue((order.total || order.cart?.total || 0).toString()); }}
                                          className="opacity-0 group-hover/edit:opacity-100 p-1 text-stone-400 hover:text-emerald-600"
                                        >
                                          <Edit className="w-3 h-3" />
                                        </button>
                                      </div>
                                    )}
                                  </div>
                                </td>
                                <td className="px-6 py-5">
                                  <StatusBadge status={order.status} type={order.type} />
                                </td>
                                <td className="px-6 py-5 text-right">
                                   <div className="flex justify-end gap-2">
                                      <button 
                                        onClick={(e) => { e.stopPropagation(); setSelectedOrder(order); setTrackingInput(order.tracking_guide || ''); }}
                                        className="w-9 h-9 rounded-xl bg-stone-100 text-stone-500 flex items-center justify-center hover:bg-emerald-50 hover:text-emerald-600 transition-all shadow-sm"
                                        title="Ver Detalles"
                                      >
                                        <Eye className="w-4 h-4" />
                                      </button>
                                      <a 
                                        href={`https://wa.me/${displayPhone.replace(/\+/g, '').replace(/\s/g, '').replace(/^0+/, '')}?text=${encodeURIComponent(generateClientMessage(order))}`} 
                                        target="_blank" 
                                        rel="noreferrer"
                                        className="w-9 h-9 rounded-xl bg-stone-100 text-stone-500 flex items-center justify-center hover:bg-emerald-500 hover:text-white transition-all shadow-sm"
                                        title="Enviar Mensaje Confirmación"
                                        onClick={(e) => e.stopPropagation()}
                                      >
                                        <Phone className="w-4 h-4" />
                                      </a>
                                      {order.type === 'order' && (
                                        <StatusActions 
                                          currentStatus={order.status} 
                                          onUpdate={(s) => updateStatus(order.id, s)} 
                                          onDelete={() => handleDeleteOrder(order.id)}
                                        />
                                      )}
                                      {order.type === 'abandoned' && (
                                        <button 
                                          onClick={(e) => { e.stopPropagation(); handleDeleteOrder(order.id); }}
                                          className="w-9 h-9 rounded-xl bg-stone-100 text-stone-400 flex items-center justify-center hover:bg-red-50 hover:text-red-600 transition-all"
                                          title="Eliminar registro"
                                        >
                                          <Trash2 className="w-4 h-4" />
                                        </button>
                                      )}
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
            ) : (
              <motion.div
                key="analytics"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-8"
              >
                {/* Analytics Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Revenue Chart */}
                  <div className="bg-white p-8 rounded-[2.5rem] border border-stone-200 shadow-sm">
                    <div className="flex justify-between items-center mb-6">
                      <div>
                        <h3 className="text-xl font-bold text-stone-900">Ventas e Ingresos (7 días)</h3>
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
            )}
          </AnimatePresence>
        </div>
      </main>

      {/* Detail Modal */}
      {selectedOrder && (
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
                  <FileText className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-black text-stone-900 tracking-tight">Detalles del Pedido {selectedOrder.ticket_number && `#${selectedOrder.ticket_number}`}</h3>
                  <p className="text-[10px] uppercase font-black text-stone-400 tracking-widest">{selectedOrder.id.slice(-8)} • {selectedOrder.type === 'order' ? 'Venta Directa' : 'Abandono'}</p>
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
                {/* Info Column */}
                <div className="space-y-8">
                  <section>
                    <h4 className="text-[10px] font-black text-stone-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                       <User className="w-3 h-3" /> Información del Cliente
                    </h4>
                    <div className="bg-stone-50 p-6 rounded-3xl border border-stone-100 space-y-3">
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
                              📍 {selectedOrder.customer.department || 'Departamento N/A'}
                            </span>
                          </div>
                        </div>
                      </div>
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
                    </div>
                  </section>

                  <section>
                    <h4 className="text-[10px] font-black text-stone-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                       <Package className="w-3 h-3" /> Productos y Monto
                    </h4>
                    <div className="bg-stone-50 p-6 rounded-3xl border border-stone-100 italic text-sm text-stone-600">
                      {selectedOrder.cart?.items?.length ? (
                        <ul className="space-y-2">
                          {selectedOrder.cart.items.map((item, idx) => (
                            <li key={idx} className="flex justify-between border-b border-stone-200/50 pb-2 last:border-0 last:pb-0">
                              <span>{item.quantity || 1}x {item.name || item.productName}</span>
                              <span className="font-black text-stone-400">{formatCurrency(item.price || 0)}</span>
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p>{selectedOrder.order_details || 'Sin detalles registrados'}</p>
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
                      <button 
                        onClick={() => handleUpdateTracking(selectedOrder.id)}
                        className="w-full py-4 bg-purple-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-purple-700 transition-all shadow-lg shadow-purple-600/20"
                      >
                         Guardar Número de Guía
                      </button>
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
    <div className="bg-white p-6 rounded-[2.5rem] border border-stone-200 shadow-sm">
      <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center mb-4 border transition-transform hover:scale-110", colors[color])}>
        {icon}
      </div>
      <div className="text-[10px] font-black text-stone-400 uppercase tracking-widest mb-1">{label}</div>
      <div className="text-2xl font-black text-stone-900">{value}</div>
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
    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-100">
      <div className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse" />
      <span className="text-[10px] font-black uppercase tracking-widest text-orange-700">Abandono</span>
    </div>
  );

  const config: any = {
    pending: { label: "PEDIDO PENDIENTE DE CONFIRMACIÓN", bg: "bg-amber-100", text: "text-amber-700", dot: "bg-amber-500" },
    confirmed: { label: "PEDIDO CONFIRMADO", bg: "bg-emerald-50", text: "text-emerald-700", dot: "bg-emerald-500" },
    sent: { label: "Enviado", bg: "bg-blue-100", text: "text-blue-700", dot: "bg-blue-500" },
    shipped_with_guide: { label: "Guía Asignada", bg: "bg-purple-100", text: "text-purple-700", dot: "bg-purple-500" },
    delivered: { label: "Entregado", bg: "bg-emerald-600 text-white", text: "text-white", dot: "bg-white" },
    cancelled: { label: "Cancelado", bg: "bg-red-100", text: "text-red-700", dot: "bg-red-500" },
    withdrawn: { label: "Desistió", bg: "bg-stone-200", text: "text-stone-700", dot: "bg-stone-500" },
  };

  const c = config[status] || config.pending;
  return (
    <div className={cn("inline-flex items-center gap-2 px-3 py-1 rounded-full", c.bg)}>
      <div className={cn("w-1.5 h-1.5 rounded-full", c.dot, "animate-pulse")} />
      <span className={cn("text-[10px] font-black uppercase tracking-widest", c.text)}>{c.label}</span>
    </div>
  );
}

function StatusActions({ currentStatus, onUpdate, onDelete }: { currentStatus: string, onUpdate: (s: string) => void, onDelete: () => void }) {
  const [isOpen, setIsOpen] = useState(false);

  const options = [
    { id: 'pending', label: 'Pend. Conf.', icon: Clock },
    { id: 'confirmed', label: 'Confirmado', icon: CheckCircle2 },
    { id: 'sent', label: 'Enviado', icon: TrendingUp },
    { id: 'shipped_with_guide', label: 'Guía Asignada', icon: Truck },
    { id: 'delivered', label: 'Entregado', icon: CheckCircle2 },
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
