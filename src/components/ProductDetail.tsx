import { useState } from "react";
import { occasionMeta } from "../data/products";
import type { BouquetSize, CartAddOn, Product } from "../types";
import {
  ADD_ONS,
  FREE_DELIVERY_THRESHOLD,
  SIZE_LABELS,
  computeUnitPrice,
  formatPrice,
} from "../utils/pricing";
import { getDefaultDeliverySelection } from "../utils/delivery";
import { useCart } from "../context/CartContext";
import DeliveryPicker, { type DeliveryValue } from "./DeliveryPicker";
import {
  ArrowRightIcon,
  CheckIcon,
  LeafIcon,
  MinusIcon,
  PlusIcon,
  StarIcon,
  TruckIcon,
} from "./icons";

const SIZE_STEMS: Record<BouquetSize, string> = {
  small: "6–8 stems",
  medium: "12–15 stems",
  large: "18–24 stems",
};

interface ProductDetailProps {
  product: Product;
  onBack: () => void;
  onAddedToCart: () => void;
}

export default function ProductDetail({ product, onBack, onAddedToCart }: ProductDetailProps) {
  const { addItem } = useCart();
  const [size, setSize] = useState<BouquetSize>("medium");
  const [selectedAddOns, setSelectedAddOns] = useState<CartAddOn[]>([]);
  const [quantity, setQuantity] = useState(1);
  const [delivery, setDelivery] = useState<DeliveryValue>(() => getDefaultDeliverySelection());
  const [added, setAdded] = useState(false);

  // Add-on pricing: unit price = size price + sum of selected add-on prices,
  // then the order total multiplies that by the quantity (see utils/pricing.ts).
  const unitPrice = computeUnitPrice(product.prices[size], selectedAddOns);
  const total = unitPrice * quantity;

  function toggleAddOn(id: string) {
    const addOn = ADD_ONS.find((a) => a.id === id);
    if (!addOn) return;
    setSelectedAddOns((prev) =>
      prev.some((a) => a.id === id)
        ? prev.filter((a) => a.id !== id)
        : [...prev, { id: addOn.id, name: addOn.name, price: addOn.price }],
    );
  }

  function addToCart() {
    addItem({
      productId: product.id,
      productName: product.name,
      image: product.image,
      size,
      sizePrice: product.prices[size],
      addOns: selectedAddOns,
      quantity,
    });
    // Soft "added" feedback, then open the basket so the buyer sees the result.
    setAdded(true);
    setTimeout(() => {
      setAdded(false);
      onAddedToCart();
    }, 900);
  }

  return (
    <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 md:py-12 lg:px-8">
      <button
        onClick={onBack}
        className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-warm transition-colors duration-200 hover:text-terracotta"
      >
        <ArrowRightIcon className="h-4 w-4 rotate-180" /> Back to the shop
      </button>

      <div className="grid gap-10 lg:grid-cols-2">
        {/* Left: imagery + care note */}
        <div className="space-y-4">
          <div className="card overflow-hidden p-3">
            <div className="aspect-[4/5] overflow-hidden rounded-[12px] bg-ivory">
              <img src={product.image} alt={product.name} className="h-full w-full object-cover" />
            </div>
          </div>
          <div className="card flex items-start gap-3 p-4">
            <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-sage-soft text-sage-deep">
              <LeafIcon className="h-4.5 w-4.5" />
            </span>
            <div>
              <p className="text-sm font-semibold">Freshness note</p>
              <p className="text-[13px] leading-relaxed text-warm">{product.care}</p>
            </div>
          </div>
        </div>

        {/* Right: configuration + purchase */}
        <div className="space-y-6">
          <div className="flex flex-wrap gap-1.5">
            {product.occasions.map((id) => {
              const m = occasionMeta(id);
              return (
                <span key={id} className={`tag ${m.chip}`}>
                  {m.label}
                </span>
              );
            })}
          </div>

          <div className="space-y-2">
            <h1 className="font-serif text-3xl md:text-4xl">{product.name}</h1>
            <div className="flex items-center gap-2 text-sm text-warm">
              <span className="inline-flex items-center gap-1">
                <StarIcon className="h-4 w-4 text-[#D9A441]" /> {product.rating}
              </span>
              <span>·</span>
              <span>{product.reviewCount} reviews</span>
            </div>
          </div>

          <p className="text-[15px] leading-relaxed text-ink/90">{product.longDescription}</p>

          {/* Size / variant selector */}
          <div className="space-y-2.5">
            <div className="flex items-center justify-between">
              <p className="text-xs font-semibold uppercase tracking-wider text-warm">
                Bouquet size
              </p>
              <p className="text-xs text-warm">{SIZE_STEMS[size]}</p>
            </div>
            <div className="grid grid-cols-3 gap-2.5">
              {(Object.keys(SIZE_LABELS) as BouquetSize[]).map((s) => (
                <button
                  key={s}
                  onClick={() => setSize(s)}
                  className={`rounded-2xl border p-3 text-left transition-all duration-200 ${
                    size === s
                      ? "border-terracotta bg-terracotta/5 ring-1 ring-terracotta"
                      : "border-line bg-white hover:border-terracotta/60"
                  }`}
                >
                  <span className="block text-sm font-semibold">{SIZE_LABELS[s]}</span>
                  <span className="block text-[11px] text-warm">{SIZE_STEMS[s]}</span>
                  <span className="mt-1 block font-serif text-lg">
                    {formatPrice(product.prices[s])}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Optional add-ons, each with its own small price */}
          <div className="space-y-2.5">
            <p className="text-xs font-semibold uppercase tracking-wider text-warm">
              Make it extra (optional)
            </p>
            <div className="grid gap-2.5 sm:grid-cols-3">
              {ADD_ONS.map((a) => {
                const on = selectedAddOns.some((x) => x.id === a.id);
                return (
                  <button
                    key={a.id}
                    onClick={() => toggleAddOn(a.id)}
                    className={`flex flex-col items-start gap-0.5 rounded-2xl border p-3 text-left transition-all duration-200 ${
                      on
                        ? "border-sage bg-sage-soft/50 ring-1 ring-sage"
                        : "border-line bg-white hover:border-sage/60"
                    }`}
                  >
                    <span className="flex w-full items-center justify-between gap-2">
                      <span className="text-[13px] font-semibold">{a.name}</span>
                      <span
                        className={`flex h-4.5 w-4.5 shrink-0 items-center justify-center rounded-full border ${
                          on ? "border-sage bg-sage text-white" : "border-line text-transparent"
                        }`}
                      >
                        <CheckIcon className="h-3 w-3" />
                      </span>
                    </span>
                    <span className="text-[11px] text-warm">{a.description}</span>
                    <span className="text-xs font-semibold text-sage-deep">
                      +{formatPrice(a.price)}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Quantity stepper + running total */}
          <div className="flex items-center gap-4">
            <div>
              <p className="mb-1.5 text-xs font-semibold uppercase tracking-wider text-warm">
                Quantity
              </p>
              <div className="inline-flex items-center rounded-full border border-line bg-white">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  aria-label="Decrease quantity"
                  className="flex h-10 w-10 items-center justify-center text-warm transition-colors duration-200 hover:text-terracotta"
                >
                  <MinusIcon className="h-4 w-4" />
                </button>
                <span className="w-10 text-center font-semibold">{quantity}</span>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  aria-label="Increase quantity"
                  className="flex h-10 w-10 items-center justify-center text-warm transition-colors duration-200 hover:text-terracotta"
                >
                  <PlusIcon className="h-4 w-4" />
                </button>
              </div>
            </div>
            <div className="border-l border-line pl-4">
              <p className="text-xs font-semibold uppercase tracking-wider text-warm">
                This order
              </p>
              <p className="font-serif text-2xl text-terracotta-deep">{formatPrice(total)}</p>
            </div>
          </div>

          {/* Same-day / scheduled delivery selector */}
          <div className="card p-5">
            <DeliveryPicker
              value={delivery}
              onChange={setDelivery}
              title="When should it arrive?"
            />
          </div>

          <button
            onClick={addToCart}
            disabled={added}
            className={`btn w-full py-3.5 text-base ${
              added ? "bg-sage hover:bg-sage-deep" : "btn-primary"
            }`}
          >
            {added ? (
              <>
                <CheckIcon className="h-5 w-5" /> Added to your basket
              </>
            ) : (
              <>Add to basket · {formatPrice(total)}</>
            )}
          </button>
          <p className="flex items-center gap-2 text-xs text-warm">
            <TruckIcon className="h-4 w-4 text-sage" />
            Free delivery over {formatPrice(FREE_DELIVERY_THRESHOLD)} · same-day until 2:00 PM
          </p>
        </div>
      </div>
    </section>
  );
}
