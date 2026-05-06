import { MASTER_PRODUCTS } from '../constants/mastershop_products';

export function useInventory() {
  const inventory = MASTER_PRODUCTS.map(p => ({
    idProduct: p.id,
    internalId: p.internalId,
    name: p.name,
    category: p.category,
    basePrice: 0,
    suggestedPrice: 0,
    stock: '--',
    prodFormatName: p.category || 'ZenHogar Portfolio'
  }));

  const getStockStatus = (productId: number | string) => {
    return { label: 'Sin Sincronizar', color: 'gray', stock: 0 };
  };

  return { 
    inventory, 
    loading: false, 
    error: null, 
    getStockStatus, 
    refetch: () => {} 
  };
}
