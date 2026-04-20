import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { Product } from './constants';

interface CartItem {
  productId: string;
  productName: string;
  promoId: string;
  promoLabel: string;
  price: number;
  units: number;
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (product: Product, promoId: string) => void;
  addComboToCart: (combo: any) => void;
  removeFromCart: (productId: string, promoId: string) => void;
  updateQuantity: (productId: string, promoId: string, quantity: number) => void;
  clearCart: () => void;
  total: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('zenhogar_cart');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('zenhogar_cart', JSON.stringify(items));
  }, [items]);

  const addToCart = (product: Product, promoId: string) => {
    const promo = product.promos.find(p => p.id === promoId);
    if (!promo) return;

    setItems(prev => {
      const existingIndex = prev.findIndex(
        item => item.productId === product.id && item.promoId === promoId
      );

      if (existingIndex > -1) {
        const newItems = [...prev];
        newItems[existingIndex].quantity += 1;
        return newItems;
      }

      return [
        ...prev,
        {
          productId: product.id,
          productName: product.name,
          promoId: promoId,
          promoLabel: promo.label,
          price: promo.price,
          units: promo.units,
          quantity: 1,
        },
      ];
    });
  };

  const addComboToCart = (combo: any) => {
    setItems(prev => {
      const existingIndex = prev.findIndex(
        item => item.productId === combo.id && item.promoId === 'combo'
      );

      if (existingIndex > -1) {
        const newItems = [...prev];
        newItems[existingIndex].quantity += 1;
        return newItems;
      }

      return [
        ...prev,
        {
          productId: combo.id,
          productName: combo.name,
          promoId: 'combo',
          promoLabel: combo.badge,
          price: combo.price,
          units: combo.products.length,
          quantity: 1,
        },
      ];
    });
  };

  const removeFromCart = (productId: string, promoId: string) => {
    setItems(prev => prev.filter(item => !(item.productId === productId && item.promoId === promoId)));
  };

  const updateQuantity = (productId: string, promoId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId, promoId);
      return;
    }
    setItems(prev =>
      prev.map(item =>
        item.productId === productId && item.promoId === promoId
          ? { ...item, quantity }
          : item
      )
    );
  };

  const clearCart = () => setItems([]);

  const total = items.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <CartContext.Provider value={{ items, addToCart, addComboToCart, removeFromCart, updateQuantity, clearCart, total }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
