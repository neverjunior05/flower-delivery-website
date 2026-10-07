import { getSameDayInfo } from "../utils/delivery";
import { ArrowRightIcon, LeafIcon, StarIcon, TruckIcon } from "./icons";

interface HeroProps {
  onShop: () => void;
  onOccasions: () => void;
}

export default function Hero({ onShop, onOccasions }: HeroProps) {
  // Live same-day cutoff message, e.g. "Order by 2:00 PM for same-day delivery".
  const sameDay = getSameDayInfo();

  return (
    <section id="home" className="relative overflow-hidden">
      {/* Soft, romantic backdrop of fresh flowers with a warm cream wash. */}
      <div className="absolute inset-0">
        <img
          src="https://images.pexels.com/photos/17006302/pexels-photo-17006302.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=1600"
          alt="A colorful market stall full of fresh flower bouquets"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-cream via-cream/95 to-cream/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-cream/70 via-transparent to-transparent" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 md:py-28 lg:px-8 lg:py-36">
        <div className="max-w-xl space-y-6 animate-fade-up">
          <span className="inline-flex items-center gap-2 rounded-full border border-line bg-white/90 px-4 py-1.5 text-xs font-medium text-sage-deep shadow-soft">
            <TruckIcon className="h-3.5 w-3.5" />
            {sameDay.message}
          </span>
          <h1 className="font-serif text-4xl font-medium leading-[1.08] text-ink sm:text-5xl lg:text-6xl">
            Fresh flowers, <em className="italic text-terracotta">delivered</em> with love
          </h1>
          <p className="max-w-md text-[17px] leading-relaxed text-warm">
            Hand-tied bouquets from our studio, cut to order and delivered to their door —
            often on the very same day.
          </p>
          <div className="flex flex-wrap gap-3">
            <button className="btn btn-primary" onClick={onShop}>
              Shop the collection <ArrowRightIcon className="h-4 w-4" />
            </button>
            <button className="btn btn-ghost" onClick={onOccasions}>
              Browse occasions
            </button>
          </div>
          <div className="flex flex-wrap gap-x-8 gap-y-3 pt-4 text-sm text-warm">
            <span className="inline-flex items-center gap-2">
              <StarIcon className="h-4 w-4 text-[#D9A441]" /> 4.9 · 2,300+ reviews
            </span>
            <span className="inline-flex items-center gap-2">
              <TruckIcon className="h-4 w-4 text-sage" /> Same-day delivery, 7 days a week
            </span>
            <span className="inline-flex items-center gap-2">
              <LeafIcon className="h-4 w-4 text-sage" /> Cut to order, never stored
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
