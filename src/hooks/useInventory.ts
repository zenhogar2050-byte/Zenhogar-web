import { useState, useEffect } from 'react';

export function useInventory() {
  const [inventory] = useState<Record<string, { stock: number }>>({});
  const [loading] = useState(false);
  const [error] = useState<string | null>(null);

  const fetchInventory = async () => {};

  const getStockData = () => null;
  const getStock = () => null;

  const getStockStatus = () => {
    return { label: 'Disponible', color: 'green', stock: 1000 };
  };

  const getClientStockStatus = () => {
    return { label: 'Disponible', color: 'green' };
  };

  return { inventory, loading, error, getStock, getStockStatus, getClientStockStatus, refetch: fetchInventory };
}
