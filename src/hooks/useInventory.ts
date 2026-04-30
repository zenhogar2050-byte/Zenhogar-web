import { useState, useEffect } from 'react';

export function useInventory() {
  const [inventory, setInventory] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchInventory() {
      try {
        const response = await fetch('/api/mastershop/inventory');
        if (!response.ok) {
          throw new Error('Failed to fetch inventory');
        }
        const data = await response.json();
        setInventory(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchInventory();
  }, []);

  const getStock = (mastershopId?: number) => {
    if (!mastershopId || inventory[mastershopId.toString()] === undefined) return null;
    return inventory[mastershopId.toString()];
  };

  const getStockStatus = (mastershopId?: number) => {
    const stock = getStock(mastershopId);
    if (stock === null) return null; // No data yet or no mastershopId
    
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

  return { inventory, loading, error, getStock, getStockStatus, getClientStockStatus };
}
