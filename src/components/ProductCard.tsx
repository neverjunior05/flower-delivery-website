import { useState, type MouseEvent } from "react";
import { occasionMeta } from "../data/products";
import type { Product } from "../types";
import { formatPrice } from "../utils/pricing";
import { useCart } from "../context/CartContext";
import { CheckIcon, StarIcon } from "./icons";

interface ProductCardProps {
  product: Product;
  onOpen: (id: string) => void;
}

export default function ProductCard({ product, onOpen }: ProductCardProps) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);
  const fromPrice = Math.min(...Object.values(product.prices));

  function quickAdd(e: MouseEvent<HTMLButtonElement>) {
    e.stopPropagation();
    // Quick add uses the medium bouquet with no add-ons; the full configuration
    // (size, add-ons, quantity) lives on the product page.
    addItem({
      productId: product.id,
      productName: product.name,
      image: product.image,
      size: "medium",
      sizePrice: product.prices.medium,
      addOns: [],
      quantity: 1,
    });
    // Gentle "added" micro-feedback (soft, not a sharp bounce).
    setAdded(true);
    setTimeout(() => setAdded(false), 1400);
  }

  return (
    <article
      onClick={() => onOpen(product.id)}
      className="card group cursor-pointer overflow-hidden p-3 transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_14px_34px_rgba(58,51,46,0.12)]"
    >
      <div className="relative aspect-[4/5] overflow-hidden rounded-[12px] bg-ivory">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
        />
        {product.badge && (
          <span className="absolute left-3 top-3 rounded-full bg-white/95 px-3 py-1 text-[11px] font-semibold text-terracotta-deep shadow-soft">
            {product.badge}
          </span>
        )}
        <button
          onClick={quickAdd}
          className={`absolute bottom-3 right-3 inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-semibold shadow-soft transition-all duration-200 ${
            added ? "bg-sage text-white" : "bg-white text-ink hover:bg-terracotta hover:text-white"
          }`}
        >
          {added ? (
            <>
              <CheckIcon className="h-3.5 w-3.5" /> Added
            </>
          ) : (
            "Add to cart"
          )}
        </button>
      </div>
      <div className="space-y-2 p-2.5">
        <div className="flex flex-wrap gap-1.5">
          {product.occasions.slice(0, 2).map((id) => {
            const m = occasionMeta(id);
            return (
              <span key={id} className={`tag ${m.chip}`}>
                {m.label}
              </span>
            );
          })}
        </div>
        <h3 className="font-serif text-[19px] text-ink">{product.name}</h3>
        <p className="line-clamp-2 text-[13px] leading-relaxed text-warm">
          {product.description}
        </p>
        <div className="flex items-center justify-between pt-1">
          <span className="inline-flex items-center gap-1 text-xs text-warm">
            <StarIcon className="h-3.5 w-3.5 text-[#D9A441]" /> {product.rating}{" "}
            <span className="text-warm/70">({product.reviewCount})</span>
          </span>
          <span className="text-sm font-semibold text-ink">From {formatPrice(fromPrice)}</span>
        </div>
      </div>
    </article>
  );
}
