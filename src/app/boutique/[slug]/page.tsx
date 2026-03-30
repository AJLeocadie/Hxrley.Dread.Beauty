"use client";
import { use } from "react";
import Link from "next/link";
import { ArrowLeft, ShoppingCart, Check, Leaf, ShoppingBag } from "lucide-react";
import { useAdminStore } from "@/store/admin";
import { useCartStore } from "@/store/cart";
import { gammes } from "@/lib/data";
import { useState } from "react";

export default function ProductDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const products = useAdminStore((s) => s.products);
  const addItem = useCartStore((s) => s.addItem);
  const [added, setAdded] = useState(false);

  const product = products.find((p) => p.slug === slug);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <ShoppingBag className="w-16 h-16 text-cream/20 mx-auto mb-4" />
          <h1 className="text-xl text-cream/60 mb-4">Produit non trouvé</h1>
          <Link href="/boutique" className="btn-gold inline-block">Retour à la boutique</Link>
        </div>
      </div>
    );
  }

  const gamme = gammes.find((g) => g.id === product.gamme);

  const handleAdd = () => {
    addItem(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-5xl mx-auto">
        <Link href="/boutique" className="inline-flex items-center gap-2 text-cream/60 hover:text-gold mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Retour à la boutique
        </Link>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Image */}
          <div className="aspect-square rounded-2xl bg-gradient-to-br from-gold/10 to-gold/5 flex items-center justify-center">
            <ShoppingBag className="w-24 h-24 text-gold/30" />
          </div>

          {/* Info */}
          <div>
            {gamme && (
              <Link href={`/gammes/${gamme.slug}`} className="text-sm text-gold/70 hover:text-gold mb-2 inline-block">
                {gamme.name}
              </Link>
            )}
            <h1 className="text-2xl sm:text-3xl font-bold text-cream mb-4 font-[family-name:var(--font-heading)]">
              {product.name}
            </h1>
            <p className="text-3xl font-bold text-gold mb-6">{product.price.toFixed(2)} &euro;</p>
            <p className="text-cream/70 mb-6 leading-relaxed">{product.description}</p>

            {/* Ingrédients */}
            <div className="mb-6">
              <h3 className="text-sm font-semibold text-cream uppercase tracking-wider mb-2">Ingrédients</h3>
              <div className="flex flex-wrap gap-2">
                {product.ingredients.map((ing) => (
                  <span key={ing} className="inline-flex items-center gap-1 text-xs px-3 py-1.5 rounded-full bg-gold/10 text-gold/80">
                    <Leaf className="w-3 h-3" /> {ing}
                  </span>
                ))}
              </div>
            </div>

            {/* Stock */}
            <p className="text-sm text-cream/50 mb-6">
              {product.stock > 0 ? (
                <span className="text-green-400">En stock ({product.stock} disponibles)</span>
              ) : (
                <span className="text-red-400">Rupture de stock</span>
              )}
            </p>

            {/* Add to cart */}
            <button
              onClick={handleAdd}
              disabled={product.stock === 0}
              className={`w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-3 rounded-full font-semibold transition-all ${
                added
                  ? "bg-green-500/20 text-green-400 border border-green-500/30"
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
  );
}
