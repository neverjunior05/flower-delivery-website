import { useState, type ChangeEvent, type FormEvent, type InputHTMLAttributes } from "react";
import { useCart } from "../context/CartContext";
import { SIZE_LABELS, deliveryFeeFor, formatPrice } from "../utils/pricing";
import { getDefaultDeliverySelection } from "../utils/delivery";
import type { PlacedOrder } from "../types";
import DeliveryPicker, { type DeliveryValue } from "./DeliveryPicker";
import { LeafIcon, LockIcon } from "./icons";

interface CheckoutProps {
  onPlaced: (order: PlacedOrder) => void;
  onBackToShop: () => void;
}

type FieldProps = {
  id: string;
  label: string;
  error?: string;
  hint?: string;
} & InputHTMLAttributes<HTMLInputElement>;

function Field({ id, label, error, hint, className, ...props }: FieldProps) {
  return (
    <div className={`space-y-1.5 ${className ?? ""}`}>
      <label htmlFor={id} className="text-xs font-semibold uppercase tracking-wider text-warm">
        {label}
      </label>
      <input
        id={id}
        {...props}
        className={`input ${error ? "border-[#B03A2E] focus:border-[#B03A2E]" : ""}`}
      />
      {error ? (
        <p className="text-xs text-[#B03A2E]">{error}</p>
      ) : hint ? (
        <p className="text-xs text-warm/80">{hint}</p>
      ) : null}
    </div>
  );
}

function StepHeader({
  n,
  tone = "terracotta",
  title,
  note,
}: {
  n: number;
  tone?: "terracotta" | "sage";
  title: string;
  note: string;
}) {
  return (
    <div className="flex items-start gap-3">
      <span
        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-semibold text-white ${
          tone === "sage" ? "bg-sage" : "bg-terracotta"
        }`}
      >
        {n}
      </span>
      <div>
        <h2 className="font-serif text-xl">{title}</h2>
        <p className="text-sm text-warm">{note}</p>
      </div>
    </div>
  );
}

export default function Checkout({ onPlaced, onBackToShop }: CheckoutProps) {
  const { items, itemCount, subtotal, clearCart } = useCart();

  // Buyer = the person paying. Recipient = the person receiving the flowers.
  // They are deliberately two separate state objects — and two separate,
  // clearly labelled form sections — because with flower delivery the person
  // receiving is usually someone other than the person paying.
  const [buyer, setBuyer] = useState({ name: "", email: "", phone: "" });
  const [recipient, setRecipient] = useState({ name: "", phone: "", address: "", city: "", zip: "" });
  const [giftMessage, setGiftMessage] = useState("");
  const [delivery, setDelivery] = useState<DeliveryValue>(() => getDefaultDeliverySelection());
  const [payment, setPayment] = useState({ cardName: "", cardNumber: "", expiry: "", cvc: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [processing, setProcessing] = useState(false);

  const fee = deliveryFeeFor(subtotal);
  const total = subtotal + fee;

  const clearError = (key: string) =>
    setErrors((prev) => {
      const next = { ...prev };
      delete next[key];
      return next;
    });

  const buyerField = (name: keyof typeof buyer) => (e: ChangeEvent<HTMLInputElement>) => {
    setBuyer((prev) => ({ ...prev, [name]: e.target.value }));
    clearError(`buyer.${name}`);
  };
  const recipientField = (name: keyof typeof recipient) => (e: ChangeEvent<HTMLInputElement>) => {
    setRecipient((prev) => ({ ...prev, [name]: e.target.value }));
    clearError(`recipient.${name}`);
  };
  const paymentField = (name: keyof typeof payment) => (e: ChangeEvent<HTMLInputElement>) => {
    setPayment((prev) => ({ ...prev, [name]: e.target.value }));
    clearError(`payment.${name}`);
  };

  // Live formatting for the simulated card fields (demo only — nothing is sent anywhere).
  const onCardNumber = (e: ChangeEvent<HTMLInputElement>) => {
    const digits = e.target.value.replace(/\D/g, "").slice(0, 16);
    setPayment((prev) => ({ ...prev, cardNumber: digits.replace(/(\d{4})(?=\d)/g, "$1 ") }));
    clearError("payment.cardNumber");
  };
  const onExpiry = (e: ChangeEvent<HTMLInputElement>) => {
    const digits = e.target.value.replace(/\D/g, "").slice(0, 4);
    setPayment((prev) => ({
      ...prev,
      expiry: digits.length > 2 ? `${digits.slice(0, 2)}/${digits.slice(2)}` : digits,
    }));
    clearError("payment.expiry");
  };

  /**
   * Validation. The recipient's fields are validated separately from the
   * buyer's own details — both groups are required, but they fail (and are
   * reported) independently so the sender knows exactly which section to fix.
   */
  function validate(): Record<string, string> {
    const e: Record<string, string> = {};
    // Buyer (sender)
    if (!buyer.name.trim()) e["buyer.name"] = "Please tell us your name.";
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(buyer.email.trim()))
      e["buyer.email"] = "Enter a valid email address.";
    if (!buyer.phone.trim()) e["buyer.phone"] = "We need a phone number for delivery updates.";
    // Recipient — required, and validated independently of the buyer's fields
    if (!recipient.name.trim()) e["recipient.name"] = "The recipient's name is required.";
    if (!recipient.phone.trim())
      e["recipient.phone"] = "The recipient's phone is required for delivery updates.";
    if (!recipient.address.trim()) e["recipient.address"] = "A street address is required.";
    if (!recipient.city.trim()) e["recipient.city"] = "City is required.";
    if (!/^\d{5}(-\d{4})?$/.test(recipient.zip.trim())) e["recipient.zip"] = "Enter a valid ZIP code.";
    // Payment (simulated)
    if (!payment.cardName.trim()) e["payment.cardName"] = "Name on card is required.";
    if (payment.cardNumber.replace(/\s/g, "").length < 15)
      e["payment.cardNumber"] = "Enter a valid card number.";
    if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(payment.expiry)) e["payment.expiry"] = "Use MM/YY format.";
    if (!/^\d{3,4}$/.test(payment.cvc)) e["payment.cvc"] = "3–4 digits.";
    return e;
  }

  function submit(event: FormEvent) {
    event.preventDefault();
    const found = validate();
    setErrors(found);
    if (Object.keys(found).length > 0) {
      // Scroll the first invalid field into view.
      const firstKey = Object.keys(found)[0];
      document.getElementById(firstKey)?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }
    // Simulated payment + order processing — no network, no real charge.
    setProcessing(true);
    setTimeout(() => {
      const order: PlacedOrder = {
        orderNumber: `PS-${Math.floor(100000 + Math.random() * 900000)}`,
        placedAt: new Date().toISOString(),
        total,
        recipientName: recipient.name.trim(),
        deliveryLabel: `${delivery.dateLabel} · ${delivery.windowLabel}`,
        itemCount,
      };
      clearCart();
      onPlaced(order);
    }, 1200);
  }

  if (items.length === 0) {
    return (
      <section className="mx-auto max-w-xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="card space-y-4 p-10 text-center">
          <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-ivory text-terracotta">
            <LeafIcon className="h-6 w-6" />
          </span>
          <h1 className="font-serif text-2xl">Your basket is empty</h1>
          <p className="text-sm text-warm">
            Add a bouquet first — then we'll take you through checkout.
          </p>
          <button className="btn btn-primary mx-auto" onClick={onBackToShop}>
            Browse the shop
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <button
        onClick={onBackToShop}
        className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-warm transition-colors duration-200 hover:text-terracotta"
      >
        ← Back to the shop
      </button>
      <div className="mb-8 space-y-2">
        <p className="eyebrow">Checkout</p>
        <h1 className="section-heading">
          Almost at their <em className="italic text-terracotta">door</em>
        </h1>
      </div>

      <form
        onSubmit={submit}
        className="items-start grid gap-8 lg:grid-cols-[minmax(0,1fr)_380px]"
      >
        <div className="space-y-6">
          {/* 1 — Buyer (the sender) */}
          <div className="card space-y-5 p-6">
            <StepHeader
              n={1}
              title="Your details"
              note="You're the sender — the receipt and delivery updates come to you."
            />
            <div className="grid gap-4 sm:grid-cols-2">
              <Field
                id="buyer.name"
                label="Full name"
                placeholder="Jane Appleseed"
                value={buyer.name}
                onChange={buyerField("name")}
                error={errors["buyer.name"]}
              />
              <Field
                id="buyer.email"
                label="Email"
                type="email"
                placeholder="jane@example.com"
                value={buyer.email}
                onChange={buyerField("email")}
                error={errors["buyer.email"]}
              />
              <Field
                id="buyer.phone"
                label="Phone"
                type="tel"
                placeholder="(555) 123-4567"
                value={buyer.phone}
                onChange={buyerField("phone")}
                error={errors["buyer.phone"]}
                className="sm:col-span-2"
              />
            </div>
          </div>

          {/* 2 — Recipient (clearly separated from the buyer's own info) */}
          <div className="space-y-5 rounded-2xl border border-sage/40 bg-sage-soft/40 p-6">
            <StepHeader
              n={2}
              tone="sage"
              title="Recipient's details"
              note="Flowers are usually a gift — this is where they should go. Required, and kept separate from your own info."
            />
            <div className="grid gap-4 sm:grid-cols-2">
              <Field
                id="recipient.name"
                label="Recipient's name"
                placeholder="Sam Rivera"
                value={recipient.name}
                onChange={recipientField("name")}
                error={errors["recipient.name"]}
              />
              <Field
                id="recipient.phone"
                label="Recipient's phone"
                type="tel"
                placeholder="(555) 987-6543"
                value={recipient.phone}
                onChange={recipientField("phone")}
                error={errors["recipient.phone"]}
              />
              <Field
                id="recipient.address"
                label="Street address"
                placeholder="24 Willow Lane, Apt 3B"
                value={recipient.address}
                onChange={recipientField("address")}
                error={errors["recipient.address"]}
                className="sm:col-span-2"
              />
              <Field
                id="recipient.city"
                label="City"
                placeholder="Portland"
                value={recipient.city}
                onChange={recipientField("city")}
                error={errors["recipient.city"]}
              />
              <Field
                id="recipient.zip"
                label="ZIP code"
                placeholder="97201"
                value={recipient.zip}
                onChange={recipientField("zip")}
                error={errors["recipient.zip"]}
              />
            </div>
          </div>

          {/* 3 — Delivery date & time */}
          <div className="card p-6">
            <div className="mb-5">
              <StepHeader
                n={3}
                title="Delivery"
                note="Pick a date and a time window — same-day is available until 2:00 PM."
              />
            </div>
            <DeliveryPicker value={delivery} onChange={setDelivery} title="Date &amp; time" />
          </div>

          {/* 4 — Gift message, styled like a small handwritten note */}
          <div className="space-y-4">
            <StepHeader
              n={4}
              title="Gift message"
              note="Optional — we'll hand-write it on a card and attach it to the bouquet."
            />
            <div className="gift-note">
              <textarea
                rows={4}
                maxLength={250}
                value={giftMessage}
                onChange={(e) => setGiftMessage(e.target.value)}
                placeholder="Write your message here — it will be hand-written on a card…"
              />
              <div className="mt-3 flex items-center justify-between border-t border-dashed border-line pt-3 text-xs text-warm">
                <span>Handwritten card included free with any message</span>
                <span>{giftMessage.length}/250</span>
              </div>
            </div>
          </div>

          {/* 5 — Payment (simulated) */}
          <div className="card space-y-5 p-6">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <StepHeader n={5} title="Payment" note="Card details for the order total." />
              <span className="inline-flex items-center gap-1.5 rounded-full bg-ivory px-3 py-1 text-[11px] font-semibold text-warm">
                <LockIcon className="h-3.5 w-3.5" /> Simulated — no real charge
              </span>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field
                id="payment.cardName"
                label="Name on card"
                placeholder="Jane Appleseed"
                value={payment.cardName}
                onChange={paymentField("cardName")}
                error={errors["payment.cardName"]}
                className="sm:col-span-2"
              />
              <Field
                id="payment.cardNumber"
                label="Card number"
                inputMode="numeric"
                placeholder="4242 4242 4242 4242"
                value={payment.cardNumber}
                onChange={onCardNumber}
                error={errors["payment.cardNumber"]}
                className="sm:col-span-2"
              />
              <Field
                id="payment.expiry"
                label="Expiry"
                placeholder="MM/YY"
                value={payment.expiry}
                onChange={onExpiry}
                error={errors["payment.expiry"]}
              />
              <Field
                id="payment.cvc"
                label="CVC"
                inputMode="numeric"
                placeholder="123"
                value={payment.cvc}
                onChange={paymentField("cvc")}
                error={errors["payment.cvc"]}
              />
            </div>
            <p className="rounded-xl bg-ivory px-4 py-3 text-xs leading-relaxed text-warm">
              This is a demo checkout: any card number is accepted and nothing is sent or
              stored. In a real shop, a payment provider's secure fields would live here.
            </p>
          </div>
        </div>

        {/* Order review */}
        <aside className="card h-fit space-y-5 p-6 lg:sticky lg:top-24">
          <h2 className="font-serif text-xl">Order review</h2>
          <ul className="max-h-[300px] space-y-4 overflow-y-auto pr-1">
            {items.map((item) => (
              <li key={item.lineId} className="flex gap-3">
                <img
                  src={item.image}
                  alt={item.productName}
                  className="h-16 w-16 rounded-xl object-cover"
                />
                <div className="flex-1 text-sm">
                  <div className="flex items-start justify-between gap-2">
                    <p className="font-medium">{item.productName}</p>
                    <p className="font-semibold">{formatPrice(item.lineTotal)}</p>
                  </div>
                  <p className="text-xs text-warm">
                    {SIZE_LABELS[item.size]} · Qty {item.quantity}
                  </p>
                  {item.addOns.map((a) => (
                    <p key={a.id} className="text-xs text-warm">
                      + {a.name} · {formatPrice(a.price)}
                    </p>
                  ))}
                </div>
              </li>
            ))}
          </ul>
          <div className="space-y-2 border-t border-line pt-4 text-sm">
            <div className="flex justify-between">
              <span className="text-warm">Subtotal</span>
              <span>{formatPrice(subtotal)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-warm">Delivery</span>
              {fee === 0 ? (
                <span className="font-semibold text-sage-deep">Free</span>
              ) : (
                <span>{formatPrice(fee)}</span>
              )}
            </div>
            <div className="flex justify-between border-t border-line pt-2 text-base font-semibold">
              <span>Total</span>
              <span className="text-terracotta-deep">{formatPrice(total)}</span>
            </div>
          </div>
          <button type="submit" disabled={processing} className="btn btn-primary w-full py-3.5">
            {processing ? (
              "Placing your order…"
            ) : (
              <>
                <LockIcon className="h-4 w-4" /> Place order · {formatPrice(total)}
              </>
            )}
          </button>
          <p className="text-center text-xs text-warm">
            Demo checkout — no payment is processed and no data leaves your browser.
          </p>
        </aside>
      </form>
    </section>
  );
}
