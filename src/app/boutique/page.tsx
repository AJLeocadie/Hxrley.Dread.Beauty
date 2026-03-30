"use client";
import { useState, useMemo } from "react";
import Link from "next/link";
import { ShoppingBag, ShoppingCart, Filter, X, Check } from "lucide-react";
import { useAdminStore } from "@/store/admin";
import { useCartStore } from "@/store/cart";
import { categories, needs, gammes } from "@/lib/data";
import { ingredientIcons, gammeColors } from "@/components/FruitIcons";
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
        <div className="text-center mb-12 animate-fade-in-up">
          <h1 className="text-4xl sm:text-5xl font-bold gold-gradient mb-3 font-[family-name:var(--font-heading)]">
            Boutique
          </h1>
          <p className="text-cream/50">Découvrez tous nos produits de soins capillaires</p>
        </div>

        {/* Filters toggle mobile */}
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="md:hidden flex items-center gap-2 mb-4 text-sm text-gold border border-gold/30 px-4 py-2.5 rounded-xl hover:bg-gold/5 transition-colors"
        >
          <Filter className="w-4 h-4" /> {showFilters ? "Masquer les filtres" : "Afficher les filtres"}
        </button>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar filters */}
          <aside className={`${showFilters ? "block" : "hidden"} md:block w-full md:w-60 shrink-0`}>
            <div className="sticky top-20 space-y-6 p-5 rounded-2xl bg-dark-card border border-dark-border md:p-0 md:bg-transparent md:border-0">
              {hasFilters && (
                <button
                  onClick={() => { setFilterCat(""); setFilterNeed(""); setFilterGamme(""); }}
                  className="flex items-center gap-1.5 text-xs text-red-400/80 hover:text-red-400 transition-colors"
                >
                  <X className="w-3 h-3" /> Réinitialiser les filtres
                </button>
              )}

              <div>
                <h3 className="text-xs font-semibold text-gold/80 uppercase tracking-widest mb-3">Type de produit</h3>
                <div className="space-y-0.5">
                  {categories.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => setFilterCat(filterCat === cat.id ? "" : cat.id)}
                      className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all ${
                        filterCat === cat.id ? "bg-gold/10 text-gold font-medium" : "text-cream/50 hover:text-cream hover:bg-dark-card"
                      }`}
                    >
                      {cat.name}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-xs font-semibold text-gold/80 uppercase tracking-widest mb-3">Par besoin</h3>
                <div className="space-y-0.5">
                  {needs.map((need) => (
                    <button
                      key={need.id}
                      onClick={() => setFilterNeed(filterNeed === need.id ? "" : need.id)}
                      className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all ${
                        filterNeed === need.id ? "bg-gold/10 text-gold font-medium" : "text-cream/50 hover:text-cream hover:bg-dark-card"
                      }`}
                    >
                      {need.name}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-xs font-semibold text-gold/80 uppercase tracking-widest mb-3">Par gamme</h3>
                <div className="space-y-0.5">
                  {gammes.map((gamme) => (
                    <button
                      key={gamme.id}
                      onClick={() => setFilterGamme(filterGamme === gamme.id ? "" : gamme.id)}
                      className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all ${
                        filterGamme === gamme.id ? "bg-gold/10 text-gold font-medium" : "text-cream/50 hover:text-cream hover:bg-dark-card"
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
            <p className="text-sm text-cream/40 mb-6">{filtered.length} produit{filtered.length > 1 ? "s" : ""}</p>
            {filtered.length === 0 ? (
              <div className="text-center py-24">
                <ShoppingBag className="w-14 h-14 text-cream/10 mx-auto mb-4" />
                <p className="text-cream/40">Aucun produit ne correspond à vos filtres</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 stagger-children">
                {filtered.map((product) => {
                  const colors = gammeColors[product.gamme] || { from: "#c9a84c", to: "#e0c76a" };
                  const mainIngredient = product.ingredients[0];
                  const IconComp = mainIngredient ? ingredientIcons[mainIngredient] : null;
                  return (
                    <div key={product.id} className="group rounded-2xl bg-dark-card border border-dark-border hover:border-gold/20 overflow-hidden card-hover">
                      <Link href={`/boutique/${product.slug}`}>
                        <div
                          className="aspect-[4/3] flex items-center justify-center relative overflow-hidden"
                          style={{ background: `linear-gradient(135deg, ${colors.from}12, ${colors.to}06)` }}
                        >
                          {IconComp ? (
                            <div className="group-hover:scale-110 transition-transform duration-500">
                              <IconComp className="w-24 h-24" />
                            </div>
                          ) : (
                            <ShoppingBag className="w-12 h-12 text-gold/15" />
                          )}
                        </div>
                      </Link>
                      <div className="p-5">
                        <Link href={`/boutique/${product.slug}`}>
                          <h3 className="font-semibold text-cream text-sm mb-1.5 group-hover:text-gold transition-colors line-clamp-2">
                            {product.name}
                          </h3>
                        </Link>
                        <p className="text-cream/40 text-xs mb-3 line-clamp-2 leading-relaxed">{product.description}</p>
                        <div className="flex items-center justify-between">
                          <span className="text-gold font-bold text-lg">{product.price.toFixed(2)} &euro;</span>
                          <button
                            onClick={() => handleAdd(product)}
                            className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                              addedId === product.id
                                ? "bg-green-500/10 text-green-400 border border-green-500/20"
                                : "bg-gold/10 text-gold hover:bg-gold/20 border border-gold/10"
                            }`}
                          >
                            {addedId === product.id ? (
                              <><Check className="w-3.5 h-3.5" /> Ajouté</>
                            ) : (
                              <><ShoppingCart className="w-3.5 h-3.5" /> Ajouter</>
                            )}
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
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
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center text-cream/40">Chargement...</div>}>
      <BoutiqueContent />
    </Suspense>
  );
}
