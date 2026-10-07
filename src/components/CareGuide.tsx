import { ArrowRightIcon, CheckIcon } from "./icons";

const CARE_TIPS = [
  "Trim 1–2 cm off every stem at a 45° angle before the bouquet goes into water.",
  "Use the flower-food sachet — or a teaspoon of sugar and a single drop of bleach.",
  "Change the water every two days, and rinse the vase each time.",
  "Keep bouquets away from direct sun, radiators and bowls of ripening fruit.",
  "Remove any leaves that sit below the waterline — they invite bacteria.",
];

export default function CareGuide() {
  return (
    <section id="journal" className="scroll-mt-24 border-t border-line bg-ivory/60">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="max-w-2xl space-y-3">
          <p className="eyebrow">From the journal</p>
          <h2 className="section-heading">
            Helping your bouquet <em className="italic text-terracotta">last longer</em>
          </h2>
          <p className="section-sub">
            A little care goes a long way — most bouquets can shine for a week or more.
          </p>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-5">
          <article className="card overflow-hidden lg:col-span-3">
            <div className="h-56 overflow-hidden">
              <img
                src="https://images.pexels.com/photos/5894057/pexels-photo-5894057.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=800&w=1200"
                alt="A florist hand-tying a fresh bouquet at a workbench"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="space-y-4 p-6">
              <span className="tag bg-sage-soft text-sage-deep">Flower care</span>
              <h3 className="font-serif text-2xl">How to make your bouquet last longer</h3>
              <ul className="space-y-2.5">
                {CARE_TIPS.map((tip) => (
                  <li key={tip} className="flex items-start gap-2.5 text-[14px] leading-relaxed text-ink/85">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-sage-soft text-sage-deep">
                      <CheckIcon className="h-3 w-3" />
                    </span>
                    {tip}
                  </li>
                ))}
              </ul>
            </div>
          </article>

          <div className="space-y-6 lg:col-span-2">
            <article className="card h-full space-y-3 p-6">
              <span className="tag bg-[#F2DCD4] text-[#A05C4E]">Flower meanings</span>
              <h3 className="font-serif text-xl">The quiet language of flowers</h3>
              <p className="text-[14px] leading-relaxed text-warm">
                Roses for love, lilies for sympathy, sunflowers for adoration — a short guide
                to saying it with stems.
              </p>
              <a
                href="#journal"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-terracotta"
              >
                Read the guide <ArrowRightIcon className="h-4 w-4" />
              </a>
            </article>
            <article className="card h-full space-y-3 p-6">
              <span className="tag bg-[#F4E5C2] text-[#8F6F2A]">Behind the bouquet</span>
              <h3 className="font-serif text-xl">Why we deliver the same day</h3>
              <p className="text-[14px] leading-relaxed text-warm">
                The sooner a bouquet travels from our workbench to their hands, the longer it
                blooms. We cut to order — never to stock.
              </p>
              <a
                href="#journal"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-terracotta"
              >
                How it works <ArrowRightIcon className="h-4 w-4" />
              </a>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
}
