import { useMemo, useState } from "react";
import { FLOWER_TYPES, OCCASIONS, PRODUCTS, occasionMeta } from "../data/products";
import type { FlowerType, OccasionId } from "../types";
import ProductCard from "./ProductCard";

type PriceRange = "all" | "under50" | "50to75" | "over75";
type Sort = "featured" | "price-asc" | "price-desc" | "rating";

interface ShopSectionProps {
  occasionFilter: OccasionId | null;
  onSelectOccasion: (id: OccasionId) => void;
  onClearOccasion: () => void;
  onOpenProduct: (id: string) => void;
}

export default function ShopSection({
  occasionFilter,
  onSelectOccasion,
  onClearOccasion,
  onOpenProduct,
}: ShopSectionProps) {
  const [flowerType, setFlowerType] = useState<"all" | FlowerType>("all");
  const [priceRange, setPriceRange] = useState<PriceRange>("all");
  const [sort, setSort] = useState<Sort>("featured");

  const filtered = useMemo(() => {
    let list = PRODUCTS.filter(
      (p) =>
        // Occasion filter (set from the shortcut cards or the pills below)
        (!occasionFilter || p.occasions.includes(occasionFilter)) &&
        // Flower type filter
        (flowerType === "all" || p.flowerTypes.includes(flowerType)) &&
        // Price range filter (based on the medium/base price)
        (priceRange === "all" ||
          (priceRange === "under50" && p.prices.medium < 50) ||
          (priceRange === "50to75" && p.prices.medium >= 50 && p.prices.medium <= 75) ||
          (priceRange === "over75" && p.prices.medium > 75)),
    );
    switch (sort) {
      case "price-asc":
        list = [...list].sort((a, b) => a.prices.medium - b.prices.medium);
        break;
      case "price-desc":
        list = [...list].sort((a, b) => b.prices.medium - a.prices.medium);
        break;
      case "rating":
        list = [...list].sort((a, b) => b.rating - a.rating);
        break;
    }
    return list;
  }, [occasionFilter, flowerType, priceRange, sort]);

  function resetAll() {
    onClearOccasion();
    setFlowerType("all");
    setPriceRange("all");
    setSort("featured");
  }

  return (
    <section id="shop" className="scroll-mt-24 border-y border-line bg-ivory/60">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="max-w-xl space-y-3">
            <p className="eyebrow">The shop</p>
            <h2 className="section-heading">
              Fresh from the <em className="italic text-terracotta">studio</em>
            </h2>
            <p className="section-sub">
              Every bouquet is tied to order by our florists and on a van within hours —
              never days.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <select
              className="select"
              value={flowerType}
              onChange={(e) => setFlowerType(e.target.value as "all" | FlowerType)}
              aria-label="Filter by flower type"
            >
              <option value="all">All flower types</option>
              {FLOWER_TYPES.map((f) => (
                <option key={f.id} value={f.id}>
                  {f.label}
                </option>
              ))}
            </select>
            <select
              className="select"
              value={priceRange}
              onChange={(e) => setPriceRange(e.target.value as PriceRange)}
              aria-label="Filter by price"
            >
              <option value="all">Any price</option>
              <option value="under50">Under $50</option>
              <option value="50to75">$50 – $75</option>
              <option value="over75">Over $75</option>
            </select>
            <select
              className="select"
              value={sort}
              onChange={(e) => setSort(e.target.value as Sort)}
              aria-label="Sort products"
            >
              <option value="featured">Sort: Featured</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Top Rated</option>
            </select>
          </div>
        </div>

        {/* Occasion filter pills — reflects the shortcut cards, and is clearable here. */}
        <div className="mt-6 flex flex-wrap items-center gap-2">
          <button
            className={`pill ${!occasionFilter ? "pill-active" : ""}`}
            onClick={onClearOccasion}
          >
            All occasions
          </button>
          {OCCASIONS.map((o) => (
            <button
              key={o.id}
              className={`pill ${occasionFilter === o.id ? "pill-active" : ""}`}
              onClick={() => (occasionFilter === o.id ? onClearOccasion() : onSelectOccasion(o.id))}
            >
              {o.label}
            </button>
          ))}
        </div>

        <div className="mt-8">
          <p className="mb-4 text-xs text-warm">
            {filtered.length} arrangement{filtered.length !== 1 ? "s" : ""}
            {occasionFilter ? ` for ${occasionMeta(occasionFilter).label.toLowerCase()}` : " available"}
          </p>
          {filtered.length > 0 ? (
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filtered.map((p) => (
                <ProductCard key={p.id} product={p} onOpen={onOpenProduct} />
              ))}
            </div>
          ) : (
            <div className="card space-y-3 p-10 text-center">
              <p className="font-serif text-xl">No arrangements match those filters yet.</p>
              <p className="text-sm text-warm">
                Try a different occasion or price range — new stems arrive every morning.
              </p>
              <button className="btn btn-ghost mx-auto" onClick={resetAll}>
                Clear all filters
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
