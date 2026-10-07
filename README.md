# Petal & Stem — Fresh Flowers, Delivered With Love

A modern, elegant flower delivery storefront. Browse bouquets by occasion, configure
size and add-ons, and check out through a recipient-first flow — entirely client-side,
no backend required.

## Tech stack

- **React 19** + **TypeScript**
- **Vite** (build tooling)
- **Tailwind CSS v4** (utility styling + design tokens via `@theme`)
- Hand-drawn **inline SVG icons** (no icon library)
- **localStorage** for cart persistence
- Product photography via Pexels CDN image URLs

## Fonts & color palette

**Fonts** (loaded from Google Fonts):

- Headings: **Fraunces** — soft, romantic, editorial serif
- Body: **Inter**

**Palette** (warm, organic — deliberately no purple/blue):

| Token | Hex | Usage |
| --- | --- | --- |
| `cream` | `#FDF6F3` | page background (warm blush-cream) |
| `ivory` | `#FAF7F2` | alternating section background |
| `terracotta` | `#C96B5C` | primary accent (buttons, highlights) |
| `terracotta-deep` | `#A9503F` | hover states, prices |
| `sage` / `sage-deep` | `#5A6E4F` / `#47573E` | secondary accent, success states |
| `sage-soft` | `#E4E9DC` | recipient section tint, tags |
| `ink` | `#3A332E` | primary text (warm dark brown-gray) |
| `warm` | `#8A8178` | secondary text (muted warm gray) |
| `line` | `#EBDFD6` | borders |

Occasion chips use a curated warm set: dusty rose (`#F2DCD4`/`#A05C4E`), terracotta
(`#F3D3C8`/`#A04B3A`), sage (`#E4E9DC`/`#4C5C42`), peach (`#FBE4D0`/`#B06A3B`),
warm gold (`#F4E5C2`/`#8F6F2A`), and cream (`#F1EAE0`/`#7A6A58`).

Cards are white with `border-radius: 16px` and a soft shadow
(`0 2px 10px rgba(58,51,46,0.05)`). All tokens are defined once in `src/index.css`
under `@theme` for reuse. Motion is kept gentle (150–200 ms transitions, soft pop
micro-animation on add-to-cart).

## Project structure

```
├── index.html                  # entry HTML, fonts, title
├── src/
│   ├── main.tsx                # React entry
│   ├── App.tsx                 # view routing (home / product / checkout) + layout
│   ├── index.css               # Tailwind import + design tokens + component classes
│   ├── types.ts                # shared TypeScript types
│   ├── data/
│   │   └── products.ts         # static catalog, occasions, flower types
│   ├── utils/
│   │   ├── pricing.ts          # add-on pricing: unit = size + Σ add-ons; line = unit × qty
│   │   ├── delivery.ts         # same-day cutoff logic, bookable dates & time windows
│   │   └── cartStorage.ts      # localStorage persistence helpers
│   ├── context/
│   │   └── CartContext.tsx     # cart state, merging, persistence
│   └── components/
│       ├── Navbar.tsx          # sticky nav, cart badge, mobile hamburger menu
│       ├── Hero.tsx            # romantic hero with live same-day cutoff message
│       ├── Occasions.tsx       # occasion shortcut cards (filter the shop grid)
│       ├── ShopSection.tsx     # filterable product grid (occasion/type/price/sort)
│       ├── ProductCard.tsx     # card with hover zoom + quick add-to-cart
│       ├── ProductDetail.tsx   # size selector, add-ons, quantity, delivery picker
│       ├── DeliveryPicker.tsx  # date + time-window selector with cutoff banner
│       ├── CartDrawer.tsx      # slide-in cart with add-on breakdown & totals
│       ├── Checkout.tsx        # buyer vs recipient sections, gift note, simulated payment
│       ├── Confirmation.tsx    # order confirmation screen
│       ├── CareGuide.tsx       # flower-care journal section
│       ├── Footer.tsx          # delivery areas, socials, newsletter signup
│       └── icons.tsx           # inline SVG icon set
```

## How to run locally

```bash
npm install
npm run dev      # start the dev server
npm run build    # production build (single-file output in dist/)
npm run preview  # preview the production build
```

## Screenshots

> Placeholder — add screenshots here.
>
> 1. `screenshots/home.png` — hero, occasion shortcuts, shop grid
> 2. `screenshots/product.png` — product page with size/add-on/delivery selectors
> 3. `screenshots/checkout.png` — recipient-vs-buyer checkout with gift message

## Key implementation notes

- **Same-day delivery cutoff** (`src/utils/delivery.ts`): orders are accepted for
  same-day delivery until **2:00 PM** local time. `getSameDayInfo()` compares the
  current time against today's cutoff — before it, same-day is offered; after it has
  passed, the earliest bookable date rolls over to tomorrow. `getAvailableWindows()`
  additionally hides time windows that would start less than one hour (prep + travel)
  from now.
- **Add-on pricing** (`src/utils/pricing.ts`): a cart line's unit price is the chosen
  size's price **plus the sum of all selected add-on prices**
  (`unitPrice = sizePrice + Σ addOn.price`), and the line total is
  `unitPrice × quantity`. Identical configurations merge into one line.
- **Recipient vs buyer**: checkout keeps the sender's details and the recipient's
  details as two separate, clearly labelled (and independently validated) sections,
  since flowers are usually bought by one person for another.
- **Cart persistence**: the cart is serialized to `localStorage` on every change.

## Future improvements

- Add real payment gateway integration (Stripe, etc.)
- Add subscription flower delivery (weekly/monthly bouquets)
- Connect to a backend for real-time delivery zone & availability checking
- Add a real order-tracking page with driver location
- Add user accounts, order history, and saved addresses
- Add a florist dashboard for managing the catalog and delivery slots
- Add SMS notifications for the recipient on delivery day
