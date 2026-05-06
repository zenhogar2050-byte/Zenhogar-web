import React, { useState, useMemo } from 'react';
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
  Clock,
  X,
  Plus,
  Trash2
} from 'lucide-react';
import { useInventory } from '../hooks/useInventory';
import { cn, formatCurrency } from '../utils';
import { MASTER_PRODUCTS } from '../constants/mastershop_products';

export default function InventoryManager() {
  const { inventory, addProduct, removeProduct, updateProduct, updateMultipleProducts } = useInventory();
  const [searchTerm, setSearchTerm] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncProgress, setSyncProgress] = useState(0);
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);
  const [editingPrice, setEditingPrice] = useState<string | null>(null);
  const [tempPrice, setTempPrice] = useState('');
  const [newProduct, setNewProduct] = useState({
    name: '',
    idProduct: '',
    basePrice: '',
    stock: '5000',
    category: 'Salud y Bienestar'
  });

  const [expandedId, setExpandedId] = useState<string | null>(null);

  const filteredInventory = useMemo(() => {
    return inventory.filter(p => 
      p.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.idProduct?.toString().includes(searchTerm) ||
      p.internalId?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [inventory, searchTerm]);

  const handleSyncCatalog = async () => {
    if (isSyncing || inventory.length === 0) return;
    
    setIsSyncing(true);
    setSyncProgress(0);
    const total = inventory.length;
    let successCount = 0;
    let failCount = 0;

    console.log(`[AUDITORÍA] Iniciando ciclo de sincronización para ${total} productos.`);

    try {
      for (let i = 0; i < inventory.length; i++) {
        const product = inventory[i];
        const cleanId = product.idProduct?.toString().replace(/[^0-9]/g, '');
        
        if (!cleanId) {
          console.warn(`[AUDITORÍA] Saltando producto ${product.name}: ID inválido.`);
          setSyncProgress(Math.round(((i + 1) / total) * 100));
          continue;
        }

        let retryCount = 0;
        const maxRetries = 2;
        let success = false;

        while (retryCount <= maxRetries && !success) {
          try {
            const urlCompleta = `https://zenhogar-inventory.zenhogar2050.workers.dev?id=${cleanId}`;
            
            const response = await fetch(urlCompleta, {
              method: 'GET',
              mode: 'cors',
              headers: { 
                'Accept': 'application/json',
                'Cache-Control': 'no-cache'
              }
            });

            if (response.ok) {
              const data = await response.json() as any;
              const valorStock = data.stock !== undefined ? data.stock : 
                                (data.stockTotal !== undefined ? data.stockTotal : 
                                (data.results?.[0]?.stockTotal));

              if (valorStock !== undefined) {
                const nuevoStock = typeof valorStock === 'string' ? parseInt(valorStock) : valorStock;
                if (!isNaN(nuevoStock)) {
                  updateProduct(product.internalId, { stock: nuevoStock });
                  console.log(`[OK] ${cleanId}: ${nuevoStock} unidades.`);
                  successCount++;
                  success = true;
                }
              }
            } else {
              throw new Error(`Status ${response.status}`);
            }
          } catch (err: any) {
            retryCount++;
            if (retryCount <= maxRetries) {
              console.warn(`[REINTENTO ${retryCount}] ${cleanId}: ${err.message}. Reintentando en 1s...`);
              await new Promise(r => setTimeout(r, 1000));
            } else {
              console.error(`[ERROR FINAL] ${cleanId}: Fallo crítico tras reintentos.`);
              failCount++;
            }
          }
        }

        setSyncProgress(Math.round(((i + 1) / total) * 100));
        // Control de flujo para evitar Throttling (400ms de ventana)
        await new Promise(resolve => setTimeout(resolve, 400));
      }

      const summary = `Sincronización finalizada: ${successCount} exitosos, ${failCount} fallidos.`;
      console.log(`[AUDITORÍA] ${summary}`);
      alert(summary);
      
    } catch (err) {
      console.error('[AUDITORÍA] Error sistémico en el loop de sincronización:', err);
      alert('Error crítico en el proceso de auditoría de stock.');
    } finally {
      setIsSyncing(false);
      setSyncProgress(0);
    }
  };

  const toggleRow = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProduct.name || !newProduct.basePrice) return;

    addProduct({
      idProduct: newProduct.idProduct ? parseInt(newProduct.idProduct) : null,
      internalId: `custom-${Date.now()}`,
      name: newProduct.name,
      category: newProduct.category,
      basePrice: parseFloat(newProduct.basePrice),
      stock: parseInt(newProduct.stock) || 0
    });

    setNewProduct({ name: '', idProduct: '', basePrice: '', stock: '5000', category: 'Salud y Bienestar' });
    setShowForm(false);
  };

  const handlePriceUpdate = (internalId: string) => {
    const price = parseFloat(tempPrice);
    if (!isNaN(price)) {
      updateProduct(internalId, { basePrice: price });
    }
    setEditingPrice(null);
  };

  return (
    <div className="space-y-4">
      {/* Header & Controls */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="flex items-center gap-2 flex-grow max-w-md w-full">
          <div className="relative flex-grow group">
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400 group-focus-within:text-emerald-500 transition-colors">
              <Search className="w-4 h-4" />
            </div>
            <input 
              type="text" 
              placeholder="Buscar por ID o Producto..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-12 py-1.5 bg-white border border-stone-200 rounded-lg text-sm focus:ring-1 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all shadow-sm font-normal"
            />
            {searchTerm && (
              <button 
                onClick={() => setSearchTerm('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-stone-400 hover:text-stone-900 transition-colors"
              >
                <X className="w-3 h-3" />
              </button>
            )}
          </div>
          <button className="p-2 bg-emerald-50 text-emerald-600 rounded-lg border border-emerald-100 hover:bg-emerald-100 transition-colors">
            <Search className="w-4 h-4" />
          </button>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setShowForm(!showForm)}
            className="flex items-center gap-2 px-3 py-1.5 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors text-xs font-medium shadow-sm"
          >
            <Plus className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Nuevo Producto</span>
          </button>
          <button 
            onClick={handleSyncCatalog}
            disabled={isSyncing}
            className={cn(
              "flex items-center gap-2 px-3 py-1.5 rounded-lg border transition-all text-xs font-medium shadow-sm relative overflow-hidden",
              isSyncing 
                ? "bg-stone-50 border-stone-200 text-stone-500 cursor-wait" 
                : "bg-white border-emerald-200 text-emerald-600 hover:bg-emerald-50 hover:border-emerald-300"
            )}
          >
            <RefreshCw className={cn("w-3.5 h-3.5", isSyncing && "animate-spin")} />
            <span>{isSyncing ? `Actualizando ${syncProgress}%` : 'Actualizar Catálogo'}</span>
            {isSyncing && (
              <div 
                className="absolute bottom-0 left-0 h-0.5 bg-emerald-500 transition-all duration-300" 
                style={{ width: `${syncProgress}%` }}
              />
            )}
          </button>
          <span className="text-[10px] font-bold uppercase text-stone-900 tracking-wider bg-stone-50 px-3 py-1 rounded-md border border-stone-200">
            {filteredInventory.length} Productos
          </span>
        </div>
      </div>

      {showForm && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white p-6 rounded-xl border-2 border-emerald-100 shadow-sm"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-semibold text-stone-900 flex items-center gap-2">
              <Plus className="w-4 h-4 text-emerald-500" />
              Añadir Nuevo Producto
            </h3>
            <button onClick={() => setShowForm(false)} className="text-stone-400 hover:text-stone-600">
              <X className="w-4 h-4" />
            </button>
          </div>
          <form onSubmit={handleAddProduct} className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="space-y-1">
              <label className="text-[10px] font-bold uppercase text-stone-500 ml-1">Nombre</label>
              <input 
                type="text" 
                required
                value={newProduct.name}
                onChange={e => setNewProduct({...newProduct, name: e.target.value})}
                className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-lg text-sm focus:ring-1 focus:ring-emerald-500 outline-none"
                placeholder="Ej: Coliplus"
              />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-bold uppercase text-stone-500 ml-1">ID Mastershop (Opcional)</label>
              <input 
                type="text" 
                value={newProduct.idProduct}
                onChange={e => setNewProduct({...newProduct, idProduct: e.target.value})}
                className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-lg text-sm focus:ring-1 focus:ring-emerald-500 outline-none"
                placeholder="Ej: 112114"
              />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-bold uppercase text-stone-500 ml-1">Precio Proveedor</label>
              <input 
                type="number" 
                required
                value={newProduct.basePrice}
                onChange={e => setNewProduct({...newProduct, basePrice: e.target.value})}
                className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-lg text-sm focus:ring-1 focus:ring-emerald-500 outline-none"
                placeholder="Ej: 45000"
              />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-bold uppercase text-stone-500 ml-1">Stock Inicial</label>
              <input 
                type="number" 
                value={newProduct.stock}
                onChange={e => setNewProduct({...newProduct, stock: e.target.value})}
                className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-lg text-sm focus:ring-1 focus:ring-emerald-500 outline-none"
                placeholder="Ej: 1500"
              />
            </div>
            <div className="flex items-end md:col-span-4">
              <button 
                type="submit"
                className="w-full py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors text-sm font-medium shadow-md"
              >
                Guardar Producto en Catálogo
              </button>
            </div>
          </form>
        </motion.div>
      )}

      {/* Stats Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="bg-white p-4 rounded-lg border border-stone-200 shadow-sm flex items-center gap-4">
          <div className="p-2 bg-stone-100 rounded-lg">
            <Package className="w-5 h-5 text-stone-600" />
          </div>
          <div>
            <p className="text-[10px] font-bold uppercase text-stone-500 tracking-wider">Catálogo Total</p>
            <p className="text-2xl font-normal text-stone-900 leading-none">{inventory.length}</p>
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-lg border border-stone-200 shadow-sm flex items-center gap-4 border-l-4 border-l-emerald-500">
          <div className="p-2 bg-emerald-50 rounded-lg">
            <Info className="w-5 h-5 text-emerald-600" />
          </div>
          <div>
            <p className="text-[10px] font-bold uppercase text-stone-500 tracking-wider">Productos Filtrados</p>
            <p className="text-2xl font-normal text-emerald-600 leading-none">{filteredInventory.length}</p>
          </div>
        </div>
      </div>

      {/* Catalog Grid/List - Excel Style */}
      <div className="bg-white rounded-lg border border-stone-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse table-fixed min-w-[850px]">
            <thead>
              <tr className="bg-stone-50 border-b border-stone-200">
                <th className="w-[45%] px-3 py-2 text-[11px] font-bold uppercase text-stone-900 tracking-wider border-r border-stone-200">Producto / Nombre en Catálogo</th>
                <th className="w-32 px-3 py-2 text-[11px] font-bold uppercase text-stone-900 tracking-wider border-r border-stone-200 text-center">ID Master</th>
                <th className="w-32 px-3 py-2 text-[11px] font-bold uppercase text-stone-900 tracking-wider border-r border-stone-200 text-center">P. Proveedor</th>
                <th className="w-24 px-3 py-2 text-[11px] font-bold uppercase text-stone-900 tracking-wider border-r border-stone-200 text-center">Stock</th>
                <th className="w-28 px-3 py-2 text-[11px] font-bold uppercase text-stone-900 tracking-wider border-r border-stone-200 text-center">Estado</th>
                <th className="w-16 px-3 py-2 text-[11px] font-bold uppercase text-red-600 tracking-wider text-center">Borrar</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {filteredInventory.map((product) => (
                <React.Fragment key={product.internalId || product.idProduct}>
                  <tr 
                    onClick={() => toggleRow(product.internalId)}
                    className="hover:bg-emerald-50/30 transition-colors group cursor-pointer lg:cursor-default"
                  >
                    <td className="px-3 py-1.5 lg:py-1 border-r border-stone-100">
                      <div className="flex items-center justify-between">
                        <p className="text-[13px] font-normal text-stone-900 truncate" title={product.name}>
                          {product.name}
                        </p>
                        <ChevronRight className={cn(
                          "w-3 h-3 text-stone-400 transition-transform lg:hidden",
                          expandedId === product.internalId && "rotate-90"
                        )} />
                      </div>
                    </td>
                    <td className="hidden lg:table-cell px-3 py-1 border-r border-stone-100 text-center">
                      <span className="text-base font-normal text-stone-900 font-mono tracking-tight">
                        {product.idProduct || <span className="text-[10px] text-stone-400 italic">No ID</span>}
                      </span>
                    </td>
                    <td className="hidden lg:table-cell px-3 py-1 border-r border-stone-100 text-center">
                      {editingPrice === product.internalId ? (
                        <div className="flex items-center gap-1 px-2">
                          <input 
                            autoFocus
                            type="number"
                            value={tempPrice}
                            onChange={(e) => setTempPrice(e.target.value)}
                            onBlur={() => handlePriceUpdate(product.internalId)}
                            onKeyDown={(e) => e.key === 'Enter' && handlePriceUpdate(product.internalId)}
                            className="w-full bg-white border border-emerald-500 rounded px-1 py-0.5 text-[13px] font-mono outline-none text-center"
                          />
                        </div>
                      ) : (
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            setEditingPrice(product.internalId);
                            setTempPrice(product.basePrice.toString());
                          }}
                          className="w-full text-[13px] font-normal text-stone-900 hover:text-emerald-600 transition-colors group/price"
                        >
                          <span className="font-mono">$ {product.basePrice.toLocaleString()}</span>
                        </button>
                      )}
                    </td>
                    <td className="hidden lg:table-cell px-3 py-1 border-r border-stone-100 text-center">
                      <div className="flex items-center justify-center gap-2">
                        <span className="text-base font-normal text-stone-900 font-mono tracking-tight">
                          {typeof product.stock === 'number' ? product.stock.toLocaleString() : product.stock}
                        </span>
                        {typeof product.stock === 'number' && (
                          <div className={cn(
                            "w-2 h-2 rounded-full shrink-0",
                            product.stock === 0 ? "bg-red-500 animate-pulse" : 
                            product.stock < 1000 ? "bg-yellow-400" : "bg-emerald-400"
                          )} title={product.stock === 0 ? 'Agotado' : product.stock < 1000 ? 'Bajo Stock' : 'Stock OK'} />
                        )}
                      </div>
                    </td>
                    <td className="hidden lg:table-cell px-3 py-1 border-r border-stone-100 text-center">
                      <span className="text-[10px] font-normal text-blue-600 bg-blue-50 px-2 py-0.5 rounded border border-blue-100">
                        Activo
                      </span>
                    </td>
                    <td className="hidden lg:table-cell px-3 py-1 text-center">
                      {confirmDelete === product.internalId ? (
                        <div className="flex items-center justify-center gap-1" onClick={(e) => e.stopPropagation()}>
                          <button 
                            onClick={() => {
                              removeProduct(product.internalId);
                              setConfirmDelete(null);
                            }}
                            className="text-[9px] font-bold bg-red-600 text-white px-2 py-0.5 rounded hover:bg-red-700 transition-colors"
                          >
                            SI
                          </button>
                          <button 
                            onClick={() => setConfirmDelete(null)}
                            className="text-[9px] font-bold bg-stone-100 text-stone-600 px-2 py-0.5 rounded hover:bg-stone-200 transition-colors"
                          >
                            NO
                          </button>
                        </div>
                      ) : (
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            setConfirmDelete(product.internalId);
                          }}
                          className="p-1.5 text-stone-300 hover:text-red-500 transition-colors"
                          title="Eliminar producto"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </td>
                  </tr>

                  {/* Mobile Mobile Expanded View */}
                  {expandedId === product.internalId && (
                    <tr className="lg:hidden bg-stone-50/50">
                      <td colSpan={1} className="px-4 py-4 space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-1">
                            <p className="text-[10px] font-bold uppercase text-stone-400">ID Mastershop</p>
                            <p className="text-sm font-mono text-stone-900">{product.idProduct || 'N/A'}</p>
                          </div>
                          <div className="space-y-1">
                            <p className="text-[10px] font-bold uppercase text-stone-400">Precio</p>
                            <div className="flex items-center gap-2">
                              <p className="text-sm font-medium text-emerald-600">$ {product.basePrice.toLocaleString()}</p>
                              <button 
                                onClick={(e) => {
                                  e.stopPropagation();
                                  const newPrice = prompt('Ingresa el nuevo precio:', product.basePrice.toString());
                                  if (newPrice !== null && !isNaN(parseFloat(newPrice))) {
                                    updateProduct(product.internalId, { basePrice: parseFloat(newPrice) });
                                  }
                                }}
                                className="text-[10px] text-stone-400 hover:text-emerald-500 underline"
                              >
                                Editar
                              </button>
                            </div>
                          </div>
                          <div className="space-y-1">
                            <p className="text-[10px] font-bold uppercase text-stone-400">Categoría</p>
                            <p className="text-sm text-stone-600">{product.category}</p>
                          </div>
                          <div className="space-y-1">
                            <p className="text-[10px] font-bold uppercase text-stone-400">Stock Actual</p>
                            <div className="flex items-center gap-2">
                              <p className="text-sm font-mono text-stone-900">
                                {typeof product.stock === 'number' ? product.stock.toLocaleString() : product.stock}
                              </p>
                              {typeof product.stock === 'number' && (
                                <div className={cn(
                                  "w-2 h-2 rounded-full",
                                  product.stock === 0 ? "bg-red-500 animate-pulse" : 
                                  product.stock < 1000 ? "bg-yellow-400" : "bg-emerald-400"
                                )} />
                              )}
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-3 pt-2">
                          <div className="flex-grow flex items-center justify-center gap-3 py-2 bg-stone-100 border border-stone-200 rounded-lg text-xs font-medium text-stone-900">
                            <Package className="w-3.5 h-3.5 text-stone-400" />
                            <span>Stock disponible:</span>
                            <span className="font-mono text-sm underline decoration-emerald-500/30 underline-offset-4">
                              {typeof product.stock === 'number' ? product.stock.toLocaleString() : product.stock}
                            </span>
                            {typeof product.stock === 'number' && (
                              <div className={cn(
                                "w-2.5 h-2.5 rounded-full shrink-0",
                                product.stock === 0 ? "bg-red-500 animate-pulse" : 
                                product.stock < 1000 ? "bg-yellow-400" : "bg-emerald-400"
                              )} />
                            )}
                          </div>
                          <button 
                            onClick={() => {
                              if(confirm('¿Seguro que deseas eliminar este producto?')) {
                                removeProduct(product.internalId);
                              }
                            }}
                            className="flex items-center justify-center p-2 bg-red-50 text-red-600 border border-red-100 rounded-lg hover:bg-red-100 transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
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
            <h4 className="text-xl font-normal tracking-tight mb-2 italic">Sincronización de Inventario Activa</h4>
            <p className="text-stone-300 text-sm font-normal leading-relaxed max-w-2xl">
              El botón de actualización conecta directamente con el Worker de Cloudflare para obtener el stock en tiempo real desde Mastershop. Se aplica un control de flujo de 400ms entre peticiones para garantizar el cumplimiento de los límites de la API.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
