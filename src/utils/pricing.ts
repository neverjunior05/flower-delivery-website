import type { AddOn, BouquetSize, CartAddOn, CartItem } from "../types";

/*
 * Pricing helpers.
 *
 * Add-on pricing calculation:
 *  - Each bouquet has a price per size (small / medium / large).
 *  - Add-ons (chocolates, teddy bear, greeting card) each carry their own price.
 *  - A cart line's UNIT price = the chosen size's price PLUS the sum of every
 *    selected add-on's price:
 *
 *        unitPrice = sizePrice + Σ addOn.price
 *
 *  - The LINE total then multiplies that unit price by the quantity:
 *
 *        lineTotal = unitPrice × quantity
 *
 *    (implemented in computeUnitPrice / computeLineTotal / buildCartLine below)
 */

export const ADD_ONS: AddOn[] = [
  { id: "chocolates", name: "Belgian Chocolates", description: "A box of 12 pralines", price: 14 },
  { id: "teddy", name: "Cuddly Teddy Bear", description: "Soft 25 cm plush, ribbon-tied", price: 18 },
  { id: "card", name: "Handwritten Card", description: "Your message, written by hand", price: 6 },
];

export const SIZE_LABELS: Record<BouquetSize, string> = {
  small: "Small",
  medium: "Medium",
  large: "Large",
};

export function formatPrice(value: number): string {
  return `$${value.toFixed(2)}`;
}

/** unitPrice = sizePrice + Σ addOn.price */
export function computeUnitPrice(sizePrice: number, addOns: { price: number }[]): number {
  return sizePrice + addOns.reduce((sum, addOn) => sum + addOn.price, 0);
}

/** lineTotal = unitPrice × quantity (unitPrice already includes the add-ons) */
export function computeLineTotal(unitPrice: number, quantity: number): number {
  return unitPrice * quantity;
}

/**
 * Build a fully-priced cart line. The lineId is deterministic on
 * (product, size, add-ons) so adding the same configuration twice merges into
 * one line with a bumped quantity instead of creating a duplicate.
 */
export function buildCartLine(args: {
  productId: string;
  productName: string;
  image: string;
  size: BouquetSize;
  sizePrice: number;
  addOns: CartAddOn[];
  quantity: number;
}): CartItem {
  const unitPrice = computeUnitPrice(args.sizePrice, args.addOns);
  const addOnKey = args.addOns.map((a) => a.id).sort().join("+") || "none";
  return {
    lineId: `${args.productId}__${args.size}__${addOnKey}`,
    productId: args.productId,
    productName: args.productName,
    image: args.image,
    size: args.size,
    unitPrice,
    addOns: args.addOns,
    quantity: args.quantity,
    lineTotal: computeLineTotal(unitPrice, args.quantity),
  };
}

export const DELIVERY_FEE = 8.95;
export const FREE_DELIVERY_THRESHOLD = 85;

/** Delivery is free once the subtotal (bouquets + add-ons) reaches the threshold. */
export function deliveryFeeFor(subtotal: number): number {
  return subtotal >= FREE_DELIVERY_THRESHOLD ? 0 : DELIVERY_FEE;
}
