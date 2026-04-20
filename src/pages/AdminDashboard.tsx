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
  EyeOff
} from 'lucide-react';
import { formatCurrency, cn } from '../utils';
import { getOrdersFromFirebase, updateOrderStatusInFirebase } from '../lib/firebase';

interface Order {
  id: string;
  customer: {
    nombre: string;
    apellido: string;
    email: string;
    telefono: string;
    ciudad: string;
    direccion: string;
  };
  cart?: {
    items: any[];
    total: number;
  };
  total?: number;
  status: 'pending' | 'sent' | 'delivered' | 'cancelled';
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
            <button 
              onClick={fetchOrders}
              className="p-3 bg-stone-100 text-stone-600 rounded-2xl hover:bg-emerald-50 hover:text-emerald-600 transition-all flex-shrink-0"
              title="Actualizar datos"
            >
              <TrendingUp className="w-5 h-5" />
            </button>
          </div>

          {/* Orders Table */}
          <div className="bg-white rounded-[2rem] border border-stone-200 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-stone-50/50 border-b border-stone-100">
                    <th className="px-6 py-4 text-[10px] font-black text-stone-400 uppercase tracking-widest">Cliente</th>
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
                        <tr key={order.id} className="hover:bg-stone-50/50 transition-colors group">
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
                            <div className="max-w-xs">
                              {order.type === 'order' ? (
                                <p className="text-xs text-stone-600 line-clamp-2">
                                  {order.cart?.items?.map((i: any) => `${i.quantity}x ${i.name}`).join(', ') || order.order_details || 'Detalles en WhatsApp'}
                                </p>
                              ) : (
                                <p className="text-xs text-orange-600 font-medium italic">Carrito no finalizado</p>
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
                               <a 
                                href={`https://wa.me/${displayPhone.replace(/\+/g, '').replace(/\s/g, '')}`} 
                                target="_blank" 
                                rel="noreferrer"
                                className="w-9 h-9 rounded-xl bg-stone-100 text-stone-500 flex items-center justify-center hover:bg-emerald-500 hover:text-white transition-all shadow-sm"
                                title="Contactar WhatsApp"
                              >
                                <Phone className="w-4 h-4" />
                              </a>
                              {order.type === 'order' && (
                                <StatusActions 
                                  currentStatus={order.status} 
                                  onUpdate={(s) => updateStatus(order.id, s)} 
                                />
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
  if (type === 'abandoned') return null;

  const config: any = {
    pending: { label: "Pendiente", bg: "bg-amber-100", text: "text-amber-700", dot: "bg-amber-500" },
    sent: { label: "Enviado", bg: "bg-blue-100", text: "text-blue-700", dot: "bg-blue-500" },
    delivered: { label: "Entregado", bg: "bg-emerald-100", text: "text-emerald-700", dot: "bg-emerald-500" },
    cancelled: { label: "Cancelado", bg: "bg-red-100", text: "text-red-700", dot: "bg-red-500" },
  };

  const c = config[status] || config.pending;
  return (
    <div className={cn("inline-flex items-center gap-2 px-3 py-1 rounded-full", c.bg)}>
      <div className={cn("w-1.5 h-1.5 rounded-full", c.dot, "animate-pulse")} />
      <span className={cn("text-[10px] font-black uppercase tracking-widest", c.text)}>{c.label}</span>
    </div>
  );
}

function StatusActions({ currentStatus, onUpdate }: { currentStatus: string, onUpdate: (s: string) => void }) {
  const [isOpen, setIsOpen] = useState(false);

  const options = [
    { id: 'pending', label: 'Pendiente', icon: Clock },
    { id: 'sent', label: 'Enviado', icon: TrendingUp },
    { id: 'delivered', label: 'Entregado', icon: CheckCircle2 },
    { id: 'cancelled', label: 'Cancelado', icon: XCircle },
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
          <div className="absolute right-0 mt-2 w-48 bg-white rounded-2xl shadow-2xl border border-stone-100 py-2 z-[70] overflow-hidden">
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
          </div>
        </>
      )}
    </div>
  );
}
