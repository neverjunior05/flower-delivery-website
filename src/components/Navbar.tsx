import { useState } from "react";
import { CartIcon, CloseIcon, FlowerMark, MenuIcon } from "./icons";

interface NavbarProps {
  cartCount: number;
  onOpenCart: () => void;
  onNavigate: (section: string) => void;
  onGoHome: () => void;
}

export default function Navbar({ cartCount, onOpenCart, onNavigate, onGoHome }: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  const links = [
    { label: "Home", onClick: onGoHome },
    { label: "Shop", onClick: () => onNavigate("shop") },
    { label: "Occasions", onClick: () => onNavigate("occasions") },
    { label: "Journal", onClick: () => onNavigate("journal") },
    { label: "Contact", onClick: () => onNavigate("contact") },
  ];

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-cream/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <button onClick={onGoHome} className="flex items-center gap-2.5">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-terracotta text-white">
            <FlowerMark className="h-5 w-5" />
          </span>
          <span className="font-serif text-xl font-medium">Petal &amp; Stem</span>
        </button>

        <nav className="hidden items-center gap-1 md:flex">
          {links.map((link) => (
            <button
              key={link.label}
              onClick={link.onClick}
              className="rounded-full px-3.5 py-2 text-sm font-medium text-warm transition-colors duration-200 hover:text-terracotta"
            >
              {link.label}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button
            onClick={onOpenCart}
            aria-label="Open cart"
            className="relative flex h-10 w-10 items-center justify-center rounded-full border border-line bg-white text-ink transition-colors duration-200 hover:border-terracotta hover:text-terracotta"
          >
            <CartIcon className="h-5 w-5" />
            {cartCount > 0 && (
              // key={cartCount} re-triggers the soft pop each time the count changes
              <span
                key={cartCount}
                className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-terracotta px-1 text-[10px] font-bold text-white animate-soft-pop"
              >
                {cartCount}
              </span>
            )}
          </button>
          <button
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Toggle menu"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-line bg-white text-ink transition-colors duration-200 hover:border-terracotta hover:text-terracotta md:hidden"
          >
            {menuOpen ? <CloseIcon className="h-5 w-5" /> : <MenuIcon className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <nav className="border-t border-line bg-cream px-4 py-3 md:hidden">
          {links.map((link) => (
            <button
              key={link.label}
              onClick={() => {
                setMenuOpen(false);
                link.onClick();
              }}
              className="block w-full rounded-xl px-3 py-2.5 text-left text-sm font-medium text-ink transition-colors duration-200 hover:bg-ivory hover:text-terracotta"
            >
              {link.label}
            </button>
          ))}
        </nav>
      )}
    </header>
  );
}
