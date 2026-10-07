import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { BouquetSize, CartAddOn, CartItem } from "../types";
import { buildCartLine, computeLineTotal } from "../utils/pricing";
import { loadCart, saveCart } from "../utils/cartStorage";

export interface AddItemInput {
  productId: string;
  productName: string;
  image: string;
  size: BouquetSize;
  sizePrice: number;
  addOns: CartAddOn[];
  quantity: number;
}

interface CartContextValue {
  items: CartItem[];
  itemCount: number;
  subtotal: number;
  addItem: (input: AddItemInput) => void;
  updateQuantity: (lineId: string, quantity: number) => void;
  removeItem: (lineId: string) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  // Hydrate from localStorage on first render, then persist on every change.
  const [items, setItems] = useState<CartItem[]>(() => loadCart());

  useEffect(() => {
    saveCart(items);
  }, [items]);

  const value = useMemo<CartContextValue>(() => {
    const addItem = (input: AddItemInput) => {
      const line = buildCartLine(input);
      setItems((prev) => {
        const existing = prev.find((i) => i.lineId === line.lineId);
        if (existing) {
          // Same bouquet + size + add-ons → merge by increasing the quantity
          // and recomputing the line total (unitPrice × new quantity).
          const quantity = existing.quantity + line.quantity;
          return prev.map((i) =>
            i.lineId === line.lineId
              ? { ...i, quantity, lineTotal: computeLineTotal(i.unitPrice, quantity) }
              : i,
          );
        }
        return [...prev, line];
      });
    };

    const updateQuantity = (lineId: string, quantity: number) => {
      setItems((prev) => {
        // Stepping down to zero removes the line entirely.
        if (quantity <= 0) return prev.filter((i) => i.lineId !== lineId);
        return prev.map((i) =>
          i.lineId === lineId
            ? { ...i, quantity, lineTotal: computeLineTotal(i.unitPrice, quantity) }
            : i,
        );
      });
    };

    const removeItem = (lineId: string) =>
      setItems((prev) => prev.filter((i) => i.lineId !== lineId));

    const clearCart = () => setItems([]);

    const itemCount = items.reduce((sum, i) => sum + i.quantity, 0);
    const subtotal = items.reduce((sum, i) => sum + i.lineTotal, 0);

    return { items, itemCount, subtotal, addItem, updateQuantity, removeItem, clearCart };
  }, [items]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within a CartProvider");
  return ctx;
}
