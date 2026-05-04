import { useState, useEffect } from 'react';

export function useInventory() {
  const [inventory, setInventory] = useState<Record<string, { stock: number }>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchInventory = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/mastershop/inventory');
      if (!response.ok) {
        try {
          const errorData: any = await response.json();
          throw new Error(errorData.error || 'Error al conectar con Mastershop');
        } catch (e: any) {
          if (e.message.includes('JSON')) {
            throw new Error('Error en el servidor de inventario');
          }
          throw e;
        }
      }
      const data = await response.json();
      setInventory(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInventory();
  }, []);

  const getStockData = (mastershopId?: number) => {
    if (!mastershopId || !inventory[mastershopId.toString()]) return null;
    return inventory[mastershopId.toString()];
  };

  const getStock = (mastershopId?: number) => {
    return getStockData(mastershopId)?.stock ?? null;
  };

  const getStockStatus = (mastershopId?: number) => {
    const data = getStockData(mastershopId);
    if (!data) return null;
    
    const stock = Number(data.stock) || 0;
    
    if (stock < 0) return { label: 'Negativo', color: 'red', stock };
    if (stock === 0) return { label: 'Agotado', color: 'red', stock };
    if (stock < 100) return { label: 'Pocas unidades', color: 'orange', stock };
    return { label: 'Disponible', color: 'green', stock };
  };

  const getClientStockStatus = (mastershopId?: number) => {
    const stock = getStock(mastershopId);
    if (stock === null) return null;
    
    if (stock <= 0) return { label: 'Agotado', color: 'red' };
    if (stock < 500) return { label: 'Pocas unidades', color: 'orange' };
    return { label: 'Disponible', color: 'green' };
  };

  return { inventory, loading, error, getStock, getStockStatus, getClientStockStatus, refetch: fetchInventory };
}
