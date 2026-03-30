"use client";
import { use, useState } from "react";
import Link from "next/link";
import { ArrowLeft, ShoppingCart, Check, ShoppingBag } from "lucide-react";
import { useAdminStore } from "@/store/admin";
import { useCartStore } from "@/store/cart";
import { gammes } from "@/lib/data";
import { ingredientIcons, gammeColors } from "@/components/FruitIcons";

export default function ProductDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const products = useAdminStore((s) => s.products);
  const addItem = useCartStore((s) => s.addItem);
  const [added, setAdded] = useState(false);
  const [qty, setQty] = useState(1);

  const product = products.find((p) => p.slug === slug);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <ShoppingBag className="w-16 h-16 text-cream/10 mx-auto mb-4" />
          <h1 className="text-xl text-cream/50 mb-4">Produit non trouvé</h1>
          <Link href="/boutique" className="btn-gold inline-block">Retour à la boutique</Link>
        </div>
      </div>
    );
  }

  const gamme = gammes.find((g) => g.id === product.gamme);
  const colors = gammeColors[product.gamme] || { from: "#c9a84c", to: "#e0c76a", accent: "#e0c76a" };
  const mainIngredient = product.ingredients[0];
  const IconComp = mainIngredient ? ingredientIcons[mainIngredient] : null;

  const handleAdd = () => {
    for (let i = 0; i < qty; i++) addItem(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-5xl mx-auto">
        <Link href="/boutique" className="inline-flex items-center gap-2 text-cream/40 hover:text-gold mb-8 transition-colors text-sm">
          <ArrowLeft className="w-4 h-4" /> Retour à la boutique
        </Link>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 animate-fade-in-up">
          {/* Image */}
          <div
            className="aspect-square rounded-2xl flex items-center justify-center relative overflow-hidden"
            style={{ background: `linear-gradient(135deg, ${colors.from}12, ${colors.to}06)` }}
          >
            <div className="absolute inset-0 opacity-[0.03]" style={{ background: `radial-gradient(circle at 50% 50%, ${colors.accent}, transparent 60%)` }} />
            {IconComp ? (
              <div className="relative z-10">
                <IconComp className="w-44 h-44 sm:w-56 sm:h-56" />
              </div>
            ) : (
              <ShoppingBag className="w-24 h-24 text-gold/15" />
            )}
            {/* Secondary ingredients */}
            <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-3">
              {product.ingredients.slice(1, 4).map((ing) => {
                const SecIcon = ingredientIcons[ing];
                return SecIcon ? (
                  <div key={ing} className="w-10 h-10 rounded-full bg-dark/60 backdrop-blur-sm flex items-center justify-center border border-dark-border/50">
                    <SecIcon className="w-7 h-7" />
                  </div>
                ) : null;
              })}
            </div>
          </div>

          {/* Info */}
          <div>
            {gamme && (
              <Link href={`/gammes/${gamme.slug}`} className="inline-block text-xs uppercase tracking-widest text-gold/60 hover:text-gold mb-3 transition-colors">
                {gamme.name}
              </Link>
            )}
            <h1 className="text-2xl sm:text-3xl font-bold text-cream mb-4 font-[family-name:var(--font-heading)] leading-tight">
              {product.name}
            </h1>
            <p className="text-3xl font-bold text-gold mb-6">{product.price.toFixed(2)} &euro;</p>
            <p className="text-cream/60 mb-8 leading-relaxed">{product.description}</p>

            {/* Ingrédients */}
            <div className="mb-6">
              <h3 className="text-xs font-semibold text-cream/40 uppercase tracking-widest mb-3">Ingrédients</h3>
              <div className="flex flex-wrap gap-2">
                {product.ingredients.map((ing) => {
                  const IngIcon = ingredientIcons[ing];
                  return (
                    <span key={ing} className="inline-flex items-center gap-1.5 text-xs px-3 py-2 rounded-xl bg-gold/[0.06] text-gold/70 border border-gold/10">
                      {IngIcon && <IngIcon className="w-4 h-4" />}
                      {ing}
                    </span>
                  );
                })}
              </div>
            </div>

            {/* Stock */}
            <p className="text-sm mb-6">
              {product.stock > 0 ? (
                <span className="text-green-400/80 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                  En stock ({product.stock} disponibles)
                </span>
              ) : (
                <span className="text-red-400/80 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-red-400" />
                  Rupture de stock
                </span>
              )}
            </p>

            {/* Quantity + Add to cart */}
            <div className="flex items-center gap-4">
              <div className="flex items-center border border-dark-border rounded-xl overflow-hidden">
                <button
                  onClick={() => setQty(Math.max(1, qty - 1))}
                  className="px-4 py-3 text-cream/50 hover:text-cream hover:bg-dark-border/30 transition-colors"
                >
                  -
                </button>
                <span className="px-4 py-3 text-cream font-medium min-w-[40px] text-center">{qty}</span>
                <button
                  onClick={() => setQty(qty + 1)}
                  className="px-4 py-3 text-cream/50 hover:text-cream hover:bg-dark-border/30 transition-colors"
                >
                  +
                </button>
              </div>
              <button
                onClick={handleAdd}
                disabled={product.stock === 0}
                className={`flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-full font-semibold transition-all ${
                  added
                    ? "bg-green-500/10 text-green-400 border border-green-500/20"
                    : "btn-gold"
                } disabled:opacity-30 disabled:cursor-not-allowed`}
              >
                {added ? (
                  <><Check className="w-5 h-5" /> Ajouté au panier</>
                ) : (
                  <><ShoppingCart className="w-5 h-5" /> Ajouter au panier</>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
