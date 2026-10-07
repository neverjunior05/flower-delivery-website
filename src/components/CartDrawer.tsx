import { useEffect } from "react";
import { useCart } from "../context/CartContext";
import {
  FREE_DELIVERY_THRESHOLD,
  SIZE_LABELS,
  deliveryFeeFor,
  formatPrice,
} from "../utils/pricing";
import { CloseIcon, LeafIcon, MinusIcon, PlusIcon, TrashIcon } from "./icons";

interface CartDrawerProps {
  open: boolean;
  onClose: () => void;
  onCheckout: () => void;
}

export default function CartDrawer({ open, onClose, onCheckout }: CartDrawerProps) {
  const { items, itemCount, subtotal, updateQuantity, removeItem } = useCart();

  // Lock body scroll while the drawer is open.
  useEffect(() => {
    if (!open) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = original;
    };
  }, [open]);

  if (!open) return null;

  const fee = deliveryFeeFor(subtotal);
  const total = subtotal + fee;
  const remaining = Math.max(0, FREE_DELIVERY_THRESHOLD - subtotal);
  const pct = Math.min(100, (subtotal / FREE_DELIVERY_THRESHOLD) * 100);

  return (
    <div className="fixed inset-0 z-50" role="dialog" aria-label="Shopping cart">
      <div
        className="absolute inset-0 bg-ink/35 backdrop-blur-[2px] animate-overlay-in"
        onClick={onClose}
      />
      <aside className="absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-cream shadow-[0_14px_34px_rgba(58,51,46,0.12)] animate-drawer-in">
        <div className="flex items-center justify-between border-b border-line px-5 py-4">
          <h2 className="font-serif text-xl">
            Your basket{" "}
            <span className="font-sans text-sm font-normal text-warm">
              ({itemCount} item{itemCount !== 1 ? "s" : ""})
            </span>
          </h2>
          <button
            onClick={onClose}
            aria-label="Close cart"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-line bg-white text-warm transition-colors duration-200 hover:border-terracotta hover:text-terracotta"
          >
            <CloseIcon className="h-4.5 w-4.5" />
          </button>
        </div>

        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 p-8 text-center">
            <span className="flex h-16 w-16 items-center justify-center rounded-full bg-ivory text-terracotta">
              <LeafIcon className="h-7 w-7" />
            </span>
            <p className="font-serif text-xl">Your basket is empty</p>
            <p className="max-w-xs text-sm text-warm">
              Fresh bouquets are waiting — add one and it will be here in a moment.
            </p>
            <button className="btn btn-primary" onClick={onClose}>
              Browse the shop
            </button>
          </div>
        ) : (
          <>
            <div className="flex-1 space-y-4 overflow-y-auto px-5 py-4">
              {items.map((item) => (
                <div key={item.lineId} className="flex gap-3 rounded-2xl border border-line bg-white p-3">
                  <img
                    src={item.image}
                    alt={item.productName}
                    className="h-20 w-20 rounded-xl object-cover"
                  />
                  <div className="flex-1 space-y-1 text-sm">
                    <div className="flex items-start justify-between gap-2">
                      <p className="font-medium">{item.productName}</p>
                      <p className="font-semibold">{formatPrice(item.lineTotal)}</p>
                    </div>
                    <p className="text-xs text-warm">{SIZE_LABELS[item.size]} bouquet</p>
                    {/* Add-on breakdown for this line */}
                    {item.addOns.map((a) => (
                      <p key={a.id} className="text-xs text-warm">
                        + {a.name} · {formatPrice(a.price)}
                      </p>
                    ))}
                    <div className="flex items-center justify-between pt-1">
                      <div className="inline-flex items-center rounded-full border border-line">
                        <button
                          onClick={() => updateQuantity(item.lineId, item.quantity - 1)}
                          aria-label="Decrease quantity"
                          className="flex h-7 w-7 items-center justify-center text-warm transition-colors duration-200 hover:text-terracotta"
                        >
                          <MinusIcon className="h-3.5 w-3.5" />
                        </button>
                        <span className="w-7 text-center text-xs font-semibold">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.lineId, item.quantity + 1)}
                          aria-label="Increase quantity"
                          className="flex h-7 w-7 items-center justify-center text-warm transition-colors duration-200 hover:text-terracotta"
                        >
                          <PlusIcon className="h-3.5 w-3.5" />
                        </button>
                      </div>
                      <button
                        onClick={() => removeItem(item.lineId)}
                        aria-label="Remove item"
                        className="text-warm/70 transition-colors duration-200 hover:text-[#B03A2E]"
                      >
                        <TrashIcon className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-3 border-t border-line bg-ivory px-5 py-4">
              <div className="space-y-1.5">
                <p className="text-xs text-warm">
                  {remaining > 0
                    ? `Add ${formatPrice(remaining)} more for free delivery`
                    : "You've unlocked free delivery"}
                </p>
                <div className="h-1.5 overflow-hidden rounded-full bg-line">
                  <div
                    className="h-full rounded-full bg-sage transition-all duration-500"
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-warm">Subtotal</span>
                <span>{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-warm">Delivery</span>
                {fee === 0 ? (
                  <span className="font-semibold text-sage-deep">Free</span>
                ) : (
                  <span>{formatPrice(fee)}</span>
                )}
              </div>
              <div className="flex justify-between border-t border-line pt-3 text-base font-semibold">
                <span>Total</span>
                <span className="text-terracotta-deep">{formatPrice(total)}</span>
              </div>
              <button className="btn btn-primary w-full" onClick={onCheckout}>
                Checkout
              </button>
              <button
                className="w-full text-center text-sm font-medium text-warm transition-colors duration-200 hover:text-terracotta"
                onClick={onClose}
              >
                Continue shopping
              </button>
            </div>
          </>
        )}
      </aside>
    </div>
  );
}
