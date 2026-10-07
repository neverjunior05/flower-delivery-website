import { useState, type FormEvent } from "react";
import {
  FacebookIcon,
  FlowerMark,
  InstagramIcon,
  MailIcon,
  SendIcon,
  TruckIcon,
  XIcon,
} from "./icons";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  function subscribe(e: FormEvent) {
    e.preventDefault();
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) return;
    setDone(true);
  }

  return (
    <footer id="contact" className="scroll-mt-24 bg-ink text-cream">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-4">
            <span className="flex items-center gap-2.5">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-terracotta text-white">
                <FlowerMark className="h-5 w-5" />
              </span>
              <span className="font-serif text-xl">Petal &amp; Stem</span>
            </span>
            <p className="text-sm leading-relaxed text-cream/70">
              A small studio florist tying seasonal bouquets and delivering them across the
              city — often on the same day they're cut.
            </p>
            <div className="flex gap-2">
              {[InstagramIcon, FacebookIcon, XIcon, MailIcon].map((Icon, i) => (
                <a
                  key={i}
                  href="#contact"
                  aria-label="Social link"
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-cream/20 text-cream/80 transition-all duration-200 hover:border-terracotta hover:bg-terracotta hover:text-white"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.16em] text-cream/60">
              Explore
            </p>
            <ul className="space-y-2.5 text-sm text-cream/80">
              <li><a href="#shop" className="transition-colors duration-200 hover:text-terracotta">The shop</a></li>
              <li><a href="#occasions" className="transition-colors duration-200 hover:text-terracotta">Occasions</a></li>
              <li><a href="#journal" className="transition-colors duration-200 hover:text-terracotta">Flower journal</a></li>
              <li><a href="#contact" className="transition-colors duration-200 hover:text-terracotta">Delivery &amp; contact</a></li>
            </ul>
          </div>

          <div>
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.16em] text-cream/60">
              Delivery areas
            </p>
            <ul className="space-y-2 text-sm text-cream/80">
              <li>Downtown &amp; Old Town</li>
              <li>Riverside &amp; Northgate</li>
              <li>Harbor District</li>
              <li>The University Quarter</li>
            </ul>
            <p className="mt-4 inline-flex items-start gap-2 rounded-xl bg-cream/8 px-3 py-2 text-xs text-cream/80">
              <TruckIcon className="mt-0.5 h-4 w-4 shrink-0 text-terracotta" />
              Same-day delivery, 7 days a week — order by 2:00 PM.
            </p>
          </div>

          <div>
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.16em] text-cream/60">
              The Sunday Stems newsletter
            </p>
            <p className="mb-4 text-sm leading-relaxed text-cream/70">
              One arrangement, one care tip, once a week. No noise.
            </p>
            {done ? (
              <p className="rounded-xl bg-sage/20 px-4 py-3 text-sm text-cream">
                Lovely — you're on the list. See you Sunday.
              </p>
            ) : (
              <form onSubmit={subscribe} className="flex gap-2">
                <input
                  type="email"
                  required
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-full border border-cream/20 bg-cream/8 px-4 py-2.5 text-sm text-cream placeholder:text-cream/50 transition-colors duration-200 focus:border-terracotta focus:outline-none"
                />
                <button
                  type="submit"
                  aria-label="Subscribe"
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-terracotta text-white transition-colors duration-200 hover:bg-terracotta-deep"
                >
                  <SendIcon className="h-4 w-4" />
                </button>
              </form>
            )}
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-cream/15 pt-6 text-xs text-cream/60 sm:flex-row">
          <p>© 2026 Petal &amp; Stem. All stems reserved.</p>
          <p>Open Mon–Sat 8 AM–6 PM · Sun 9 AM–4 PM</p>
        </div>
      </div>
    </footer>
  );
}
