export type OccasionId =
  | "birthday"
  | "anniversary"
  | "sympathy"
  | "get-well"
  | "congratulations"
  | "just-because";

export type FlowerType =
  | "roses"
  | "peonies"
  | "tulips"
  | "sunflowers"
  | "orchids"
  | "mixed";

export type BouquetSize = "small" | "medium" | "large";

export interface Product {
  id: string;
  name: string;
  /** One-line description shown on cards. */
  description: string;
  /** Full description shown on the product page. */
  longDescription: string;
  flowerTypes: FlowerType[];
  occasions: OccasionId[];
  /** Price per bouquet size. `medium` is treated as the base price. */
  prices: Record<BouquetSize, number>;
  image: string;
  rating: number;
  reviewCount: number;
  badge?: string;
  /** Short freshness/care note shown on the product page. */
  care: string;
}

export interface AddOn {
  id: string;
  name: string;
  description: string;
  price: number;
}

export interface CartAddOn {
  id: string;
  name: string;
  price: number;
}

export interface CartItem {
  /** Deterministic key: product + size + add-ons (used to merge identical lines). */
  lineId: string;
  productId: string;
  productName: string;
  image: string;
  size: BouquetSize;
  /** unitPrice = size price + sum of add-on prices (see utils/pricing.ts). */
  unitPrice: number;
  addOns: CartAddOn[];
  quantity: number;
  /** lineTotal = unitPrice × quantity. */
  lineTotal: number;
}

export interface PlacedOrder {
  orderNumber: string;
  placedAt: string;
  total: number;
  recipientName: string;
  /** e.g. "Today · 12:00 – 3:00 PM" */
  deliveryLabel: string;
  itemCount: number;
}
