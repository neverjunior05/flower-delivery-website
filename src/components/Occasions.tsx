import { OCCASIONS, PRODUCTS } from "../data/products";
import type { OccasionId } from "../types";
import {
  ArrowRightIcon,
  CakeIcon,
  HeartIcon,
  RingsIcon,
  SprigIcon,
  SunIcon,
  TrophyIcon,
} from "./icons";

const ICONS = {
  cake: CakeIcon,
  rings: RingsIcon,
  sprig: SprigIcon,
  sun: SunIcon,
  trophy: TrophyIcon,
  heart: HeartIcon,
};

interface OccasionsProps {
  onSelect: (id: OccasionId) => void;
}

export default function Occasions({ onSelect }: OccasionsProps) {
  return (
    <section id="occasions" className="scroll-mt-24 mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-2xl space-y-3 text-center">
        <p className="eyebrow">Shop by occasion</p>
        <h2 className="section-heading">
          Every moment, <em className="italic text-terracotta">in bloom</em>
        </h2>
        <p className="section-sub">
          Tell us what you're celebrating — we'll match the bouquet to the moment.
        </p>
      </div>
      <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
        {OCCASIONS.map((o) => {
          const Icon = ICONS[o.icon];
          const count = PRODUCTS.filter((p) => p.occasions.includes(o.id)).length;
          return (
            <button
              key={o.id}
              onClick={() => onSelect(o.id)}
              className="card group flex flex-col items-center gap-3 p-5 text-center transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_14px_34px_rgba(58,51,46,0.12)]"
            >
              <span
                className={`flex h-12 w-12 items-center justify-center rounded-2xl transition-transform duration-200 group-hover:scale-110 ${o.chip}`}
              >
                <Icon className="h-6 w-6" />
              </span>
              <span className="font-serif text-[17px] text-ink">{o.label}</span>
              <span className="text-xs text-warm">{o.blurb}</span>
              <span className="mt-auto inline-flex items-center gap-1 text-[11px] font-semibold text-terracotta opacity-0 -translate-y-1 transition-all duration-200 group-hover:translate-y-0 group-hover:opacity-100">
                {count} arrangement{count !== 1 ? "s" : ""} <ArrowRightIcon className="h-3 w-3" />
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
}
