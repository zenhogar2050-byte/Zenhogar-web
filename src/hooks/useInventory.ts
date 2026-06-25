import { useState, useEffect } from 'react';
import { MASTER_PRODUCTS } from '../constants/mastershop_products';

export interface Product {
  idProduct: number | null;
  internalId: string;
  name: string;
  category: string;
  basePrice: number;
  stock: string | number;
}

export function useInventory() {
  const [inventory, setInventory] = useState<Product[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('zh_inventory_design');
    const masterMapped = MASTER_PRODUCTS.map((p, index) => ({
      idProduct: p.id,
      internalId: p.internalId,
      name: p.name,
      category: p.category,
      basePrice: (p as any).basePrice || 0,
      stock: index % 5 === 0 ? 0 : index % 3 === 0 ? 450 : 2500
    }));

    if (saved) {
      const parsed: Product[] = JSON.parse(saved);
      // Combinar para asegurar que si hay nuevos productos se incluyan en el inventario
      const existingInternalIds = new Set(parsed.map(p => p.internalId));
      const missingProducts = masterMapped.filter(p => !existingInternalIds.has(p.internalId));
      if (missingProducts.length > 0) {
        const merged = [...parsed, ...missingProducts];
        setInventory(merged);
        localStorage.setItem('zh_inventory_design', JSON.stringify(merged));
      } else {
        setInventory(parsed);
      }
    } else {
      setInventory(masterMapped);
    }
  }, []);

  const saveToStorage = (newInventory: Product[]) => {
    setInventory(newInventory);
    localStorage.setItem('zh_inventory_design', JSON.stringify(newInventory));
  };

  const addProduct = (product: Product) => {
    saveToStorage([product, ...inventory]);
  };

  const removeProduct = (internalId: string) => {
    saveToStorage(inventory.filter(p => p.internalId !== internalId));
  };

  const updateProduct = (internalId: string, updates: Partial<Product>) => {
    setInventory(prev => {
      const next = prev.map(p => p.internalId === internalId ? { ...p, ...updates } : p);
      localStorage.setItem('zh_inventory_design', JSON.stringify(next));
      return next;
    });
  };

  const updateMultipleProducts = (updates: Record<string, Partial<Product>>) => {
    setInventory(prev => {
      const next = prev.map(p => updates[p.internalId] ? { ...p, ...updates[p.internalId] } : p);
      localStorage.setItem('zh_inventory_design', JSON.stringify(next));
      return next;
    });
  };

  const getStockStatus = (productId: number | string) => {
    return { label: 'Activo', color: 'emerald', stock: 0 };
  };

  return { 
    inventory, 
    loading: false, 
    error: null, 
    getStockStatus, 
    addProduct,
    removeProduct,
    updateProduct,
    updateMultipleProducts,
    refetch: () => {} 
  };
}
