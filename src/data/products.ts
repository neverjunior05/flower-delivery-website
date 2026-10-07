import type { FlowerType, OccasionId, Product } from "../types";

export interface OccasionMeta {
  id: OccasionId;
  label: string;
  blurb: string;
  icon: "cake" | "rings" | "sprig" | "sun" | "trophy" | "heart";
  /** Tailwind classes for the occasion's tinted chip (curated warm palette). */
  chip: string;
}

export const OCCASIONS: OccasionMeta[] = [
  { id: "birthday", label: "Birthday", blurb: "Make their day bloom", icon: "cake", chip: "bg-[#F2DCD4] text-[#A05C4E]" },
  { id: "anniversary", label: "Anniversary", blurb: "Celebrate love that lasts", icon: "rings", chip: "bg-[#F3D3C8] text-[#A04B3A]" },
  { id: "sympathy", label: "Sympathy", blurb: "Say it gently, with flowers", icon: "sprig", chip: "bg-[#E4E9DC] text-[#4C5C42]" },
  { id: "get-well", label: "Get Well", blurb: "A little sunshine, sent fast", icon: "sun", chip: "bg-[#FBE4D0] text-[#B06A3B]" },
  { id: "congratulations", label: "Congratulations", blurb: "Cheers to their big moment", icon: "trophy", chip: "bg-[#F4E5C2] text-[#8F6F2A]" },
  { id: "just-because", label: "Just Because", blurb: "No occasion needed", icon: "heart", chip: "bg-[#F1EAE0] text-[#7A6A58]" },
];

export const FLOWER_TYPES: { id: FlowerType; label: string }[] = [
  { id: "roses", label: "Roses" },
  { id: "peonies", label: "Peonies" },
  { id: "tulips", label: "Tulips" },
  { id: "sunflowers", label: "Sunflowers" },
  { id: "orchids", label: "Orchids" },
  { id: "mixed", label: "Mixed blooms" },
];

export function occasionMeta(id: OccasionId): OccasionMeta {
  return OCCASIONS.find((o) => o.id === id) ?? OCCASIONS[OCCASIONS.length - 1];
}

/** Pexels CDN helper — square-cropped product shots. */
const IMG = (id: number) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=800&w=800`;

/**
 * The static product catalog. No backend — this array is the whole shop.
 */
export const PRODUCTS: Product[] = [
  {
    id: "crimson-romance",
    name: "Crimson Romance",
    description: "A dozen velvety red roses with delicate baby's breath.",
    longDescription:
      "Our signature dozen: deep, velvety red roses wrapped around clouds of baby's breath and finished with eucalyptus. Hand-tied in the studio the morning it travels, it arrives ready for the vase — no arranging required.",
    flowerTypes: ["roses"],
    occasions: ["anniversary", "birthday", "congratulations"],
    prices: { small: 45, medium: 65, large: 95 },
    image: IMG(32105918),
    rating: 4.9,
    reviewCount: 212,
    badge: "Bestseller",
    care: "Roses drink a lot — top the vase up every day and recut the stems every two days.",
  },
  {
    id: "peony-blush",
    name: "Peony Blush",
    description: "Lush pink peonies and soft ranunculus in blush tones.",
    longDescription:
      "Big, cloud-like peonies in the softest blush, layered with ranunculus and trailing greenery. A favourite for birthdays and anniversaries — generous, romantic and impossible not to photograph.",
    flowerTypes: ["peonies"],
    occasions: ["birthday", "anniversary", "just-because"],
    prices: { small: 58, medium: 82, large: 120 },
    image: IMG(11426824),
    rating: 4.8,
    reviewCount: 164,
    badge: "Seasonal",
    care: "Peonies open quickly in warmth — keep them cool and out of direct sun for the first day.",
  },
  {
    id: "sunlit-meadow",
    name: "Sunlit Meadow",
    description: "Sunflowers and meadow blooms wrapped in kraft paper.",
    longDescription:
      "Three cheerful sunflowers stand tall above a meadow mix of snapdragons, statice and grasses. Wrapped in kraft paper and twine, it's the bouquet that makes people smile at the door.",
    flowerTypes: ["sunflowers", "mixed"],
    occasions: ["get-well", "congratulations", "just-because"],
    prices: { small: 40, medium: 58, large: 85 },
    image: IMG(8737344),
    rating: 4.9,
    reviewCount: 198,
    care: "Sunflowers are thirsty — check the water level morning and night.",
  },
  {
    id: "ivory-serenity",
    name: "Ivory Serenity",
    description: "White roses and eucalyptus — a quiet, graceful gesture.",
    longDescription:
      "Pure white roses with silvery eucalyptus and the softest cream accents. Understated and elegant, it says exactly what words sometimes can't — a go-to for sympathy, anniversaries and thinking-of-you moments.",
    flowerTypes: ["roses"],
    occasions: ["sympathy", "anniversary", "get-well"],
    prices: { small: 50, medium: 72, large: 105 },
    image: IMG(5754150),
    rating: 5.0,
    reviewCount: 143,
    badge: "Studio favourite",
    care: "Eucalyptus lasts beautifully — strip any leaves below the waterline and recut every two days.",
  },
  {
    id: "tulip-treasure",
    name: "Tulip Treasure",
    description: "Fresh-cut tulips in candy-bright colours, French-tied.",
    longDescription:
      "A generous armful of fresh-cut tulips in candy-bright colours, French-tied with twine and wrapped for the walk home. Tulips keep growing in the vase — a little quirk their fans adore.",
    flowerTypes: ["tulips"],
    occasions: ["just-because", "birthday", "get-well"],
    prices: { small: 34, medium: 48, large: 72 },
    image: IMG(31371996),
    rating: 4.7,
    reviewCount: 121,
    care: "Tulips keep growing toward the light — turn the vase a quarter-turn every day for straight stems.",
  },
  {
    id: "wild-garden",
    name: "Wild Garden",
    description: "The florist's mix of the season's best blooms.",
    longDescription:
      "Whatever is best at the market this morning — roses, dahlias, eucalyptus and more — gathered into a lush, picked-this-morning arrangement. No two are ever quite alike, and that's rather the point.",
    flowerTypes: ["mixed"],
    occasions: ["just-because", "birthday", "congratulations"],
    prices: { small: 48, medium: 68, large: 98 },
    image: IMG(30191049),
    rating: 4.8,
    reviewCount: 176,
    badge: "Florist's pick",
    care: "Mixed bouquets love a cool spot — a hallway or kitchen table is ideal.",
  },
  {
    id: "orchid-grace",
    name: "Orchid Grace",
    description: "A graceful pink orchid spray that blooms for weeks.",
    longDescription:
      "Elegant pink orchid stems arranged with soft foliage — a gift that keeps giving, blooming for weeks with almost no care. A refined thank-you, congratulations or get-well gesture.",
    flowerTypes: ["orchids"],
    occasions: ["congratulations", "anniversary", "sympathy"],
    prices: { small: 60, medium: 85, large: 120 },
    image: IMG(40082219),
    rating: 4.9,
    reviewCount: 98,
    care: "Water orchids with three ice cubes once a week — that's genuinely all they want.",
  },
  {
    id: "golden-hour",
    name: "Golden Hour",
    description: "White chrysanthemums and golden roses — warm and sunny.",
    longDescription:
      "Creamy white chrysanthemums threaded with golden roses and warm amber tones. Like late-afternoon light in bouquet form — cheerful without trying too hard, and wonderful for get-well wishes.",
    flowerTypes: ["mixed"],
    occasions: ["get-well", "just-because", "birthday"],
    prices: { small: 42, medium: 62, large: 90 },
    image: IMG(39175388),
    rating: 4.8,
    reviewCount: 154,
    badge: "New",
    care: "Chrysanthemums are long-lived — fresh water every two days keeps them perky for a fortnight.",
  },
];
