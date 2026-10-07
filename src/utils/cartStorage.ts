import type { CartItem } from "../types";

/*
 * Cart persistence. The cart is serialized to localStorage on every change
 * (see context/CartContext.tsx) so a refresh or a closed tab never loses a
 * bouquet. All access is wrapped in try/catch so private browsing modes or
 * disabled storage degrade gracefully to an in-memory cart.
 */

const CART_KEY = "petal-and-stem:cart:v1";

export function loadCart(): CartItem[] {
  try {
    const raw = localStorage.getItem(CART_KEY);
    if (!raw) return [];
    const parsed: unknown = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as CartItem[]) : [];
  } catch {
    return [];
  }
}

export function saveCart(items: CartItem[]): void {
  try {
    localStorage.setItem(CART_KEY, JSON.stringify(items));
  } catch {
    // Storage unavailable (private mode, quota) — the cart simply won't persist.
  }
}
