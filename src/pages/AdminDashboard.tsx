import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
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
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editValue, setEditValue] = useState('');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [trackingInput, setTrackingInput] = useState('');
  const [copying, setCopying] = useState(false);

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

  const handleUpdateContent = async (orderId: string) => {
    try {
      const orderRef = doc(db, 'orders', orderId);
      await updateDoc(orderRef, { order_details: editValue });
      setEditingId(null);
      fetchOrders();
    } catch (err) {
      console.error(err);
    }
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
    
    return `Hola *${name}*! 👋\n\nTe hablamos de *ZENHOGAR*. Queremos informarte que tu pedido ha sido procesado con éxito.\n\n*Detalles del pedido:*\n${items}\n\n*Datos de envío:*\n📍 Dirección: ${customer.direccion || 'N/A'}\n🏙️ Ciudad: ${customer.ciudad || 'N/A'}\n\n${guide}\n¡Gracias por tu compra! ✨\n\n_ZENHOGAR - Salud y Bienestar_`;
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
    const headers = ['Fecha', 'Tipo', 'Cliente', 'WhatsApp', 'Email', 'Contenido', 'Monto', 'Estado'];
    const rows = filteredOrders.map(o => {
      const customer = o.customer || {};
      const items = o.cart?.items?.map((i: any) => `${i.quantity}x ${i.name}`).join(', ') || o.order_details || 'N/A';
      return [
        o.created_at ? new Date(o.created_at).toLocaleString() : 'N/A',
        o.type === 'order' ? 'PEDIDO' : 'ABANDONADO',
        customer.nombre ? `${customer.nombre} ${customer.apellido || ''}` : (customer.fullName || 'N/A'),
        customer.telefono || customer.phone || 'N/A',
        customer.email || 'N/A',
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

  const totalRevenue = (orders || [])
    .filter(o => o && (o.status === 'delivered' || (o.status === 'pending' && o.type === 'order')))
    .reduce((acc, curr) => acc + (Number(curr?.total) || Number(curr?.cart?.total) || 0), 0);

  const filteredOrders = (orders || [])
    .filter(o => o && (filter === 'all' || o.type === filter))
    .filter(o => {
      const search = (searchTerm || '').toLowerCase();
      if (!search) return true;
      const customer = o.customer || {};
      const name = (customer.nombre || customer.fullName || '').toLowerCase();
      const surname = (customer.apellido || '').toLowerCase();
      const phone = customer.telefono || customer.phone || '';
      const email = (customer.email || '').toLowerCase();

      return (
        name.includes(search) ||
        surname.includes(search) ||
        phone.includes(search) ||
        email.includes(search)
      );
    });

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
          <button className="w-full flex items-center gap-3 p-3 bg-white/10 rounded-xl font-medium text-emerald-400">
            <LayoutDashboard className="w-5 h-5" /> Dashboard
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
                    <th className="px-6 py-4 text-[10px] font-black text-stone-400 uppercase tracking-widest">Cliente</th>
                    <th className="px-6 py-4 text-[10px] font-black text-stone-400 uppercase tracking-widest">WhatsApp</th>
                    <th className="px-6 py-4 text-[10px] font-black text-stone-400 uppercase tracking-widest">Contenido</th>
                    <th className="px-6 py-4 text-[10px] font-black text-stone-400 uppercase tracking-widest">Monto</th>
                    <th className="px-6 py-4 text-[10px] font-black text-stone-400 uppercase tracking-widest">Estado</th>
                    <th className="px-6 py-4 text-[10px] font-black text-stone-400 uppercase tracking-widest text-right">Acciones</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100">
                  {filteredOrders.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="px-6 py-20 text-center text-stone-400 italic">No hay pedidos registrados todavía.</td>
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
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-full bg-stone-100 flex items-center justify-center text-stone-500 font-bold group-hover:bg-emerald-50 group-hover:text-emerald-600 transition-colors">
                                {initial}
                              </div>
                              <div>
                                <div className="font-bold text-stone-900 leading-tight">{displayName}</div>
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
                            <span className="text-sm font-mono text-stone-600 bg-stone-100 px-2 py-1 rounded-lg">
                              {displayPhone}
                            </span>
                          </td>
                          <td className="px-6 py-5">
                            <div className="max-w-xs relative group/edit">
                              {editingId === order.id ? (
                                <div className="flex items-center gap-2">
                                  <textarea 
                                    className="text-xs bg-stone-50 border border-emerald-500 rounded-lg p-2 flex-grow outline-none"
                                    value={editValue}
                                    onChange={(e) => setEditValue(e.target.value)}
                                  />
                                  <button onClick={() => handleUpdateContent(order.id)} className="p-1 text-emerald-600 hover:scale-110">
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
                                    onClick={() => {
                                      setEditingId(order.id);
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
                          <td className="px-6 py-5 text-sm font-black text-stone-900">
                            {formatCurrency(order.total || order.cart?.total || 0)}
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
                  <h3 className="font-black text-stone-900 tracking-tight">Detalles del Pedido</h3>
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
                      <p className="font-bold text-stone-900 truncate">{selectedOrder.customer.nombre || selectedOrder.customer.fullName} {selectedOrder.customer.apellido}</p>
                      <div className="flex items-center gap-2 text-stone-600 text-sm">
                        <Mail className="w-4 h-4 text-stone-400" /> {selectedOrder.customer.email || 'N/A'}
                      </div>
                      <div className="flex items-center gap-2 text-stone-600 text-sm">
                        <Phone className="w-4 h-4 text-stone-400" /> {selectedOrder.customer.telefono || selectedOrder.customer.phone || 'N/A'}
                      </div>
                      <div className="flex items-start gap-2 text-stone-600 text-sm">
                        <MapPin className="w-4 h-4 text-stone-400 mt-0.5" /> 
                        <div>
                          <p>{selectedOrder.customer.direccion || 'Sin dirección'}</p>
                          <p className="font-bold text-stone-400">{selectedOrder.customer.ciudad} {selectedOrder.customer.department && `• ${selectedOrder.customer.department}`}</p>
                        </div>
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
