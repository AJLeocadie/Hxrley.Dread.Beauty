"use client";
import { useState, useMemo } from "react";
import Link from "next/link";
import { ShoppingBag, ShoppingCart, Filter, X } from "lucide-react";
import { useAdminStore } from "@/store/admin";
import { useCartStore } from "@/store/cart";
import { categories, needs, gammes } from "@/lib/data";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

function BoutiqueContent() {
  const searchParams = useSearchParams();
  const products = useAdminStore((s) => s.products);
  const addItem = useCartStore((s) => s.addItem);

  const initialCat = searchParams.get("cat") || "";
  const initialNeed = searchParams.get("need") || "";

  const [filterCat, setFilterCat] = useState(initialCat);
  const [filterNeed, setFilterNeed] = useState(initialNeed);
  const [filterGamme, setFilterGamme] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [addedId, setAddedId] = useState<string | null>(null);

  const filtered = useMemo(() => {
    return products.filter((p) => {
      if (filterCat && p.category !== filterCat) return false;
      if (filterNeed && !p.needs.includes(filterNeed)) return false;
      if (filterGamme && p.gamme !== filterGamme) return false;
      return true;
    });
  }, [products, filterCat, filterNeed, filterGamme]);

  const hasFilters = filterCat || filterNeed || filterGamme;

  const handleAdd = (product: typeof products[0]) => {
    addItem(product);
    setAddedId(product.id);
    setTimeout(() => setAddedId(null), 1500);
  };

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold gold-gradient mb-3 font-[family-name:var(--font-heading)]">
            Boutique
          </h1>
          <p className="text-cream/60">Découvrez tous nos produits de soins capillaires</p>
        </div>

        {/* Filters toggle mobile */}
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="md:hidden flex items-center gap-2 mb-4 text-sm text-gold border border-gold/30 px-4 py-2 rounded-lg"
        >
          <Filter className="w-4 h-4" /> Filtres
        </button>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar filters */}
          <aside className={`${showFilters ? "block" : "hidden"} md:block w-full md:w-64 shrink-0`}>
            <div className="sticky top-20 space-y-6">
              {hasFilters && (
                <button
                  onClick={() => { setFilterCat(""); setFilterNeed(""); setFilterGamme(""); }}
                  className="flex items-center gap-1 text-xs text-red-400 hover:text-red-300"
                >
                  <X className="w-3 h-3" /> Réinitialiser les filtres
                </button>
              )}

              {/* Par type */}
              <div>
                <h3 className="text-sm font-semibold text-gold uppercase tracking-wider mb-3">Type de produit</h3>
                <div className="space-y-1">
                  {categories.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => setFilterCat(filterCat === cat.id ? "" : cat.id)}
                      className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                        filterCat === cat.id ? "bg-gold/10 text-gold" : "text-cream/60 hover:text-cream hover:bg-dark-card"
                      }`}
                    >
                      {cat.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Par besoin */}
              <div>
                <h3 className="text-sm font-semibold text-gold uppercase tracking-wider mb-3">Par besoin</h3>
                <div className="space-y-1">
                  {needs.map((need) => (
                    <button
                      key={need.id}
                      onClick={() => setFilterNeed(filterNeed === need.id ? "" : need.id)}
                      className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                        filterNeed === need.id ? "bg-gold/10 text-gold" : "text-cream/60 hover:text-cream hover:bg-dark-card"
                      }`}
                    >
                      {need.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Par gamme */}
              <div>
                <h3 className="text-sm font-semibold text-gold uppercase tracking-wider mb-3">Par gamme</h3>
                <div className="space-y-1">
                  {gammes.map((gamme) => (
                    <button
                      key={gamme.id}
                      onClick={() => setFilterGamme(filterGamme === gamme.id ? "" : gamme.id)}
                      className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                        filterGamme === gamme.id ? "bg-gold/10 text-gold" : "text-cream/60 hover:text-cream hover:bg-dark-card"
                      }`}
                    >
                      {gamme.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          {/* Products grid */}
          <div className="flex-1">
            <p className="text-sm text-cream/50 mb-4">{filtered.length} produit{filtered.length > 1 ? "s" : ""}</p>
            {filtered.length === 0 ? (
              <div className="text-center py-20">
                <ShoppingBag className="w-12 h-12 text-cream/20 mx-auto mb-4" />
                <p className="text-cream/50">Aucun produit ne correspond à vos filtres</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filtered.map((product) => (
                  <div key={product.id} className="group rounded-xl bg-dark-card border border-dark-border hover:border-gold/30 overflow-hidden card-hover">
                    <Link href={`/boutique/${product.slug}`}>
                      <div className="aspect-square bg-gradient-to-br from-gold/10 to-gold/5 flex items-center justify-center">
                        <ShoppingBag className="w-12 h-12 text-gold/30 group-hover:text-gold/50 transition-colors" />
                      </div>
                    </Link>
                    <div className="p-4">
                      <Link href={`/boutique/${product.slug}`}>
                        <h3 className="font-semibold text-cream text-sm mb-1 group-hover:text-gold transition-colors line-clamp-2">
                          {product.name}
                        </h3>
                      </Link>
                      <p className="text-cream/50 text-xs mb-2 line-clamp-2">{product.description}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-gold font-bold">{product.price.toFixed(2)} &euro;</span>
                        <button
                          onClick={() => handleAdd(product)}
                          className={`p-2 rounded-lg transition-all ${
                            addedId === product.id
                              ? "bg-green-500/20 text-green-400"
                              : "bg-gold/10 text-gold hover:bg-gold/20"
                          }`}
                        >
                          <ShoppingCart className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function BoutiquePage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center text-cream/50">Chargement...</div>}>
      <BoutiqueContent />
    </Suspense>
  );
}
