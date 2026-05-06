import { useState, useMemo } from 'react';
import { motion } from 'motion/react';
import { 
  Package, 
  Search, 
  ExternalLink, 
  AlertCircle, 
  CheckCircle2, 
  RefreshCw,
  AlertTriangle,
  Info,
  ChevronRight,
  Clock
} from 'lucide-react';
import { useInventory } from '../hooks/useInventory';
import { cn, formatCurrency } from '../utils';
import { MASTER_PRODUCTS } from '../constants/mastershop_products';

export default function InventoryManager() {
  const { inventory } = useInventory();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredInventory = useMemo(() => {
    return inventory.filter(p => 
      p.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.idProduct?.toString().includes(searchTerm)
    );
  }, [inventory, searchTerm]);

  return (
    <div className="space-y-6">
      {/* Header & Controls */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative flex-grow max-w-md w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
          <input 
            type="text" 
            placeholder="Buscar en el catálogo ZenHogar..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-stone-200 rounded-2xl text-sm focus:ring-2 focus:ring-emerald-500 outline-none transition-all shadow-sm"
          />
        </div>
      </div>

      {/* Stats Summary - Static Design */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="bg-white p-5 rounded-[2rem] border border-stone-100 shadow-sm relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:scale-110 transition-transform">
            <Package className="w-12 h-12" />
          </div>
          <p className="text-[10px] font-black uppercase text-stone-900 tracking-[0.15em] mb-1">Catálogo ZenHogar</p>
          <p className="text-3xl font-normal text-stone-900">{inventory.length}</p>
        </div>
        
        <div className="bg-white p-5 rounded-[2rem] border border-stone-100 shadow-sm relative overflow-hidden group border-l-4 border-l-blue-500">
          <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:scale-110 transition-transform">
            <Info className="w-12 h-12 text-blue-500" />
          </div>
          <p className="text-[10px] font-black uppercase text-stone-900 tracking-[0.15em] mb-1">Estado del Sistema</p>
          <p className="text-xl font-normal text-blue-600">Modo Diseño Activo</p>
        </div>
      </div>

      {/* Catalog Grid/List - Excel Style */}
      <div className="bg-white rounded-xl border border-stone-200 shadow-sm overflow-hidden mb-8">
        <div className="overflow-x-auto min-h-[400px]">
          <table className="w-full text-left border-collapse table-fixed min-w-[850px]">
            <thead>
              <tr className="bg-stone-50 border-b border-stone-200">
                <th className="w-[45%] px-4 py-2 text-[10px] font-black uppercase text-stone-900 tracking-wider border-r border-stone-200">Producto / Nombre en Catálogo</th>
                <th className="w-24 px-4 py-2 text-[10px] font-black uppercase text-stone-900 tracking-wider border-r border-stone-200 text-center">ID Master</th>
                <th className="w-28 px-4 py-2 text-[10px] font-black uppercase text-stone-900 tracking-wider border-r border-stone-200 text-center">Stock Act.</th>
                <th className="w-32 px-4 py-2 text-[10px] font-black uppercase text-stone-500 tracking-wider border-r border-stone-200 text-center">Estado</th>
                <th className="w-24 px-4 py-2 text-[10px] font-black uppercase text-stone-500 tracking-wider text-center">Vínculo</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {filteredInventory.map((product) => (
                <tr key={product.internalId || product.idProduct} className="hover:bg-emerald-50/40 transition-colors group">
                  <td className="px-4 py-1.5 border-r border-stone-200">
                    <p className="text-sm font-normal text-stone-900 line-clamp-1" title={product.name}>
                      {product.name}
                    </p>
                  </td>
                  <td className="px-4 py-1.5 border-r border-stone-200 text-center font-mono text-sm text-stone-900 font-medium">
                    {product.idProduct || <span className="text-[9px] text-stone-300 italic font-normal">Sin Vincular</span>}
                  </td>
                  <td className="px-4 py-1.5 border-r border-stone-200 text-center">
                    <span className="text-[11px] font-normal text-stone-300 italic">--</span>
                  </td>
                  <td className="px-4 py-1.5 border-r border-stone-200 text-center">
                    <div className="inline-flex items-center gap-1.5 text-[10px] font-normal uppercase tracking-tight text-stone-400 bg-stone-50/50 px-2 py-0.5 rounded-full border border-stone-100">
                      <Clock className="w-2.5 h-2.5" />
                      Pendiente
                    </div>
                  </td>
                  <td className="px-4 py-1.5 text-center">
                    {product.idProduct ? (
                      <a 
                        href={`https://app.mastershop.com/market/product/${product.idProduct}`} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-[10px] font-normal text-emerald-600 hover:text-emerald-700 hover:underline inline-flex items-center gap-1"
                      >
                        Abrir
                        <ExternalLink className="w-2.5 h-2.5 opacity-50" />
                      </a>
                    ) : (
                      <span className="text-[9px] text-stone-300 italic">N/A</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="bg-stone-900 p-8 rounded-[3rem] text-white relative overflow-hidden shadow-2xl shadow-stone-400/20">
        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl" />
        <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
          <div className="p-4 bg-white/5 rounded-3xl border border-white/10">
            <Info className="w-8 h-8 text-emerald-400" />
          </div>
          <div>
            <h4 className="text-xl font-normal tracking-tight mb-2 italic">Control Visual de Catálogo</h4>
            <p className="text-stone-900 text-sm font-normal leading-relaxed max-w-2xl">
              Este módulo muestra la estructura de tu catálogo actual. La sincronización automática está deshabilitada por ahora para priorizar el diseño de la interfaz y la estabilidad de los IDs.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
