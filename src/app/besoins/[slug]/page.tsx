"use client";
import { use } from "react";
import Link from "next/link";
import { ArrowLeft, ShoppingCart, Check, Lightbulb, Droplets, Heart, Scissors, Sparkles, TrendingUp } from "lucide-react";
import { needs } from "@/lib/data";
import { useAdminStore } from "@/store/admin";
import { useCartStore } from "@/store/cart";
import ProductIllustration from "@/components/ProductIllustration";
import { useState } from "react";

const iconComponents: Record<string, React.ReactNode> = {
  droplets: <Droplets className="w-10 h-10" />,
  heart: <Heart className="w-10 h-10" />,
  scissors: <Scissors className="w-10 h-10" />,
  sparkles: <Sparkles className="w-10 h-10" />,
  "trending-up": <TrendingUp className="w-10 h-10" />,
};

const needColors: Record<string, { from: string; to: string }> = {
  laver: { from: "#5dade2", to: "#3498db" },
  soigner: { from: "#e74c3c", to: "#c0392b" },
  coiffer: { from: "#9b59b6", to: "#8e44ad" },
  brillance: { from: "#f1c40f", to: "#f39c12" },
  pousse: { from: "#2ecc71", to: "#27ae60" },
};

export default function BesoinPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const storeProducts = useAdminStore((s) => s.products);
  const addItem = useCartStore((s) => s.addItem);
  const [addedId, setAddedId] = useState<string | null>(null);

  const need = needs.find((n) => n.id === slug);

  if (!need) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-cream/50 mb-4">Besoin non trouvé</p>
          <Link href="/" className="btn-gold inline-block">Retour à l&apos;accueil</Link>
        </div>
      </div>
    );
  }

  const products = storeProducts.filter((p) => p.needs.includes(slug));
  const colors = needColors[slug] || { from: "#c9a84c", to: "#e0c76a" };

  const handleAdd = (product: typeof storeProducts[0]) => {
    addItem(product);
    setAddedId(product.id);
    setTimeout(() => setAddedId(null), 1500);
  };

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <div
        className="relative py-20 px-4 overflow-hidden"
        style={{ background: `linear-gradient(135deg, ${colors.from}10, ${colors.to}05, #0a0a0a)` }}
      >
        <div className="absolute inset-0 opacity-[0.04]" style={{ background: `radial-gradient(circle at 50% 50%, ${colors.from}, transparent 60%)` }} />
        <div className="max-w-5xl mx-auto relative z-10">
          <Link href="/" className="inline-flex items-center gap-2 text-cream/40 hover:text-gold mb-8 transition-colors text-sm">
            <ArrowLeft className="w-4 h-4" /> Retour
          </Link>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
            <div
              className="w-20 h-20 rounded-2xl flex items-center justify-center text-gold"
              style={{ background: `linear-gradient(135deg, ${colors.from}20, ${colors.to}10)` }}
            >
              {iconComponents[need.icon]}
            </div>
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold gold-gradient mb-3 font-[family-name:var(--font-heading)]">
                {need.name}
              </h1>
              <p className="text-cream/50 max-w-2xl leading-relaxed">
                {need.longDescription}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Conseils */}
        {need.tips && need.tips.length > 0 && (
          <div className="mb-14">
            <h2 className="text-xl font-bold text-cream mb-5 flex items-center gap-2 font-[family-name:var(--font-heading)]">
              <Lightbulb className="w-5 h-5 text-gold" /> Nos Conseils
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 stagger-children">
              {need.tips.map((tip, i) => (
                <div key={i} className="flex items-start gap-3 p-5 rounded-2xl bg-dark-card border border-dark-border">
                  <span className="w-7 h-7 rounded-full bg-gold/10 flex items-center justify-center text-gold text-xs font-bold shrink-0 mt-0.5">
                    {i + 1}
                  </span>
                  <p className="text-cream/60 text-sm leading-relaxed">{tip}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Produits */}
        <div>
          <h2 className="text-xl font-bold text-cream mb-2 font-[family-name:var(--font-heading)]">
            Produits pour <span className="text-gold">{need.name.toLowerCase()}</span>
          </h2>
          <p className="text-cream/40 text-sm mb-8">{products.length} produit{products.length > 1 ? "s" : ""} disponible{products.length > 1 ? "s" : ""}</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 stagger-children">
            {products.map((product) => {
              return (
                <div key={product.id} className="group rounded-2xl bg-dark-card border border-dark-border hover:border-gold/20 overflow-hidden card-hover">
                  <Link href={`/boutique/${product.slug}`}>
                    <ProductIllustration ingredients={product.ingredients} gammeId={product.gamme} size="md" />
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
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <Link href="/boutique" className="btn-outline-gold inline-block">Voir toute la boutique</Link>
        </div>
      </div>
    </div>
  );
}
