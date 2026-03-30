"use client";
import { useState } from "react";
import Link from "next/link";
import { ShoppingCart, Menu, X, ChevronDown } from "lucide-react";
import { useCartStore } from "@/store/cart";

const menuItems = [
  {
    label: "Vos Besoins",
    href: "/boutique",
    submenu: [
      { label: "Laver", href: "/boutique?need=laver" },
      { label: "Soigner", href: "/boutique?need=soigner" },
      { label: "Coiffer", href: "/boutique?need=coiffer" },
      { label: "Brillance", href: "/boutique?need=brillance" },
      { label: "Pousse", href: "/boutique?need=pousse" },
    ],
  },
  {
    label: "Nos Produits",
    href: "/boutique",
    submenu: [
      { label: "Huiles", href: "/boutique?cat=huile" },
      { label: "Shampooings", href: "/boutique?cat=shampooing" },
      { label: "Après-Shampooings", href: "/boutique?cat=apres-shampooing" },
      { label: "Brillantines", href: "/boutique?cat=brillantine" },
      { label: "Sprays", href: "/boutique?cat=spray" },
    ],
  },
  {
    label: "Nos Gammes",
    href: "/gammes",
    submenu: [
      { label: "Performance et Volume", href: "/gammes/performance-et-volume" },
      { label: "Bonne Mine", href: "/gammes/bonne-mine" },
      { label: "Force et Croissance", href: "/gammes/force-et-croissance" },
      { label: "Purifiant Détox", href: "/gammes/purifiant-detox" },
      { label: "Fraîcheur et Clarification", href: "/gammes/fraicheur-et-clarification" },
    ],
  },
  { label: "Diagnostic", href: "/diagnostic" },
  { label: "Rendez-vous", href: "/rendez-vous" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);
  const count = useCartStore((s) => s.count());

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-dark/95 backdrop-blur-md border-b border-dark-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="text-xl font-bold gold-gradient tracking-wide font-[family-name:var(--font-heading)]">
            Hxrley.Dread.Beauty
          </Link>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center gap-1">
            {menuItems.map((item) => (
              <div
                key={item.label}
                className="relative group"
                onMouseEnter={() => setOpenSubmenu(item.label)}
                onMouseLeave={() => setOpenSubmenu(null)}
              >
                <Link
                  href={item.href}
                  className="flex items-center gap-1 px-3 py-2 text-sm text-cream/80 hover:text-gold transition-colors"
                >
                  {item.label}
                  {item.submenu && <ChevronDown className="w-3 h-3" />}
                </Link>
                {item.submenu && openSubmenu === item.label && (
                  <div className="absolute top-full left-0 bg-dark-card border border-dark-border rounded-lg shadow-xl min-w-[220px] py-2">
                    {item.submenu.map((sub) => (
                      <Link
                        key={sub.label}
                        href={sub.href}
                        className="block px-4 py-2 text-sm text-cream/70 hover:text-gold hover:bg-dark/50 transition-colors"
                      >
                        {sub.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <Link href="/boutique/panier" className="relative text-cream/80 hover:text-gold transition-colors">
              <ShoppingCart className="w-5 h-5" />
              {count > 0 && (
                <span className="absolute -top-2 -right-2 bg-gold text-dark text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
                  {count}
                </span>
              )}
            </Link>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden text-cream/80 hover:text-gold"
            >
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-dark-card border-t border-dark-border max-h-[80vh] overflow-y-auto">
          {menuItems.map((item) => (
            <div key={item.label}>
              <button
                onClick={() => {
                  if (item.submenu) {
                    setOpenSubmenu(openSubmenu === item.label ? null : item.label);
                  } else {
                    setMobileOpen(false);
                  }
                }}
                className="w-full flex items-center justify-between px-4 py-3 text-cream/80 hover:text-gold border-b border-dark-border/50"
              >
                {item.submenu ? (
                  <>
                    {item.label}
                    <ChevronDown className={`w-4 h-4 transition-transform ${openSubmenu === item.label ? "rotate-180" : ""}`} />
                  </>
                ) : (
                  <Link href={item.href} onClick={() => setMobileOpen(false)} className="w-full text-left">
                    {item.label}
                  </Link>
                )}
              </button>
              {item.submenu && openSubmenu === item.label && (
                <div className="bg-dark/50">
                  {item.submenu.map((sub) => (
                    <Link
                      key={sub.label}
                      href={sub.href}
                      onClick={() => setMobileOpen(false)}
                      className="block px-8 py-2 text-sm text-cream/60 hover:text-gold"
                    >
                      {sub.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </nav>
  );
}
