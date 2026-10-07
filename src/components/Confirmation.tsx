import type { PlacedOrder } from "../types";
import { formatPrice } from "../utils/pricing";
import { CheckIcon, LeafIcon, TruckIcon } from "./icons";

interface ConfirmationProps {
  order: PlacedOrder;
  onContinue: () => void;
}

const STEPS = [
  {
    icon: CheckIcon,
    title: "Order confirmed",
    text: "We've emailed your receipt and the florist has your note.",
  },
  {
    icon: LeafIcon,
    title: "Arranged fresh",
    text: "Your bouquet is tied to order today — never pulled from a cooler.",
  },
  {
    icon: TruckIcon,
    title: "Out for delivery",
    text: "It arrives in the window you selected, with your handwritten card.",
  },
];

export default function Confirmation({ order, onContinue }: ConfirmationProps) {
  return (
    <section className="mx-auto max-w-2xl px-4 py-14 sm:px-6 lg:px-8">
      <div className="card space-y-8 p-8 text-center md:p-12">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-sage-soft animate-soft-pop">
          <CheckIcon className="h-10 w-10 text-sage-deep" />
        </div>
        <div className="space-y-3">
          <p className="eyebrow">Order confirmed</p>
          <h2 className="font-serif text-3xl md:text-4xl">
            Your flowers are being tied as we speak
          </h2>
          <p className="text-warm">
            Order <span className="font-semibold text-ink">{order.orderNumber}</span> ·{" "}
            {order.itemCount} item{order.itemCount !== 1 ? "s" : ""} · a receipt is on its way
            to your inbox.
          </p>
        </div>
        <div className="space-y-3 rounded-2xl border border-line bg-ivory p-5 text-left">
          <div className="flex justify-between text-sm">
            <span className="text-warm">Delivering to</span>
            <span className="font-medium">{order.recipientName}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-warm">When</span>
            <span className="font-medium">{order.deliveryLabel}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-warm">Total paid</span>
            <span className="font-semibold text-terracotta-deep">{formatPrice(order.total)}</span>
          </div>
        </div>
        <ol className="grid gap-4 text-left sm:grid-cols-3">
          {STEPS.map((s) => (
            <li key={s.title} className="space-y-1.5 rounded-2xl border border-line bg-white p-4">
              <s.icon className="h-5 w-5 text-terracotta" />
              <p className="text-sm font-semibold">{s.title}</p>
              <p className="text-xs leading-relaxed text-warm">{s.text}</p>
            </li>
          ))}
        </ol>
        <button className="btn btn-primary" onClick={onContinue}>
          Continue shopping
        </button>
      </div>
    </section>
  );
}
