import { useState } from "react";
import { CartProvider, useCart } from "./context/CartContext";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Occasions from "./components/Occasions";
import ShopSection from "./components/ShopSection";
import ProductDetail from "./components/ProductDetail";
import CartDrawer from "./components/CartDrawer";
import Checkout from "./components/Checkout";
import Confirmation from "./components/Confirmation";
import CareGuide from "./components/CareGuide";
import Footer from "./components/Footer";
import { PRODUCTS } from "./data/products";
import type { OccasionId, PlacedOrder } from "./types";

/** Simple view-based routing — no router library needed for this scope. */
type View = { name: "home" } | { name: "product"; id: string } | { name: "checkout" };

function scrollToSection(id: string) {
  // Small delay so a view switch (e.g. leaving the product page) renders first.
  setTimeout(() => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, 100);
}

function AppShell() {
  const { itemCount } = useCart();
  const [view, setView] = useState<View>({ name: "home" });
  const [occasionFilter, setOccasionFilter] = useState<OccasionId | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [order, setOrder] = useState<PlacedOrder | null>(null);

  const product = view.name === "product" ? PRODUCTS.find((p) => p.id === view.id) ?? null : null;

  const goHome = () => {
    setOrder(null);
    setView({ name: "home" });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const navigate = (section: string) => {
    setOrder(null);
    setView({ name: "home" });
    scrollToSection(section);
  };
  const openProduct = (id: string) => {
    setView({ name: "product", id });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const selectOccasion = (id: OccasionId) => {
    setOccasionFilter(id);
    setView({ name: "home" });
    scrollToSection("shop");
  };
  const goToCheckout = () => {
    setDrawerOpen(false);
    setOrder(null);
    setView({ name: "checkout" });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-cream text-ink">
      <Navbar
        cartCount={itemCount}
        onOpenCart={() => setDrawerOpen(true)}
        onNavigate={navigate}
        onGoHome={goHome}
      />
      <main>
        {view.name === "home" && (
          <>
            <Hero
              onShop={() => scrollToSection("shop")}
              onOccasions={() => scrollToSection("occasions")}
            />
            <Occasions onSelect={selectOccasion} />
            <ShopSection
              occasionFilter={occasionFilter}
              onSelectOccasion={selectOccasion}
              onClearOccasion={() => setOccasionFilter(null)}
              onOpenProduct={openProduct}
            />
            <CareGuide />
          </>
        )}

        {view.name === "product" &&
          (product ? (
            <ProductDetail
              product={product}
              onBack={() => setView({ name: "home" })}
              onAddedToCart={() => setDrawerOpen(true)}
            />
          ) : (
            <div className="mx-auto max-w-xl space-y-4 px-4 py-24 text-center">
              <p className="font-serif text-2xl">That arrangement isn't in the shop right now.</p>
              <button className="btn btn-primary mx-auto" onClick={goHome}>
                Back to the shop
              </button>
            </div>
          ))}

        {view.name === "checkout" &&
          (order ? (
            <Confirmation order={order} onContinue={goHome} />
          ) : (
            <Checkout onPlaced={setOrder} onBackToShop={goHome} />
          ))}
      </main>
      <Footer />
      <CartDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        onCheckout={goToCheckout}
      />
    </div>
  );
}

export default function App() {
  return (
    <CartProvider>
      <AppShell />
    </CartProvider>
  );
}
