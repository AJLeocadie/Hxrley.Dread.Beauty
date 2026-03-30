import Link from "next/link";
import { ArrowLeft, Leaf, ShoppingBag } from "lucide-react";
import { gammes, defaultProducts } from "@/lib/data";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return gammes.map((g) => ({ slug: g.slug }));
}

export default async function GammeDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const gamme = gammes.find((g) => g.slug === slug);
  if (!gamme) notFound();

  const products = defaultProducts.filter((p) => p.gamme === gamme.id);

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-5xl mx-auto">
        <Link href="/gammes" className="inline-flex items-center gap-2 text-cream/60 hover:text-gold mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Retour aux gammes
        </Link>

        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold gold-gradient mb-3 font-[family-name:var(--font-heading)]">
            {gamme.name}
          </h1>
          <p className="text-cream/60 max-w-xl mx-auto">{gamme.description}</p>
        </div>

        {/* Ingrédients */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-cream mb-6 font-[family-name:var(--font-heading)]">
            Ingrédients & Bienfaits
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {gamme.ingredients.map((ing) => (
              <div key={ing.name} className="p-6 rounded-2xl bg-dark-card border border-dark-border">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center">
                    <Leaf className="w-6 h-6 text-gold" />
                  </div>
                  <h3 className="text-xl font-bold text-gold">{ing.name}</h3>
                </div>
                <ul className="space-y-2">
                  {ing.benefits.map((benefit, i) => (
                    <li key={i} className="flex items-start gap-2 text-cream/70 text-sm">
                      <span className="text-gold mt-0.5 shrink-0">&#10003;</span>
                      {benefit}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Produits de cette gamme */}
        {products.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold text-cream mb-6 font-[family-name:var(--font-heading)]">
              Produits de cette gamme
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => (
                <Link
                  key={product.id}
                  href={`/boutique/${product.slug}`}
                  className="group rounded-xl bg-dark-card border border-dark-border hover:border-gold/30 overflow-hidden card-hover"
                >
                  <div className="aspect-square bg-gradient-to-br from-gold/10 to-gold/5 flex items-center justify-center">
                    <ShoppingBag className="w-12 h-12 text-gold/30" />
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-cream text-sm mb-1 group-hover:text-gold transition-colors">
                      {product.name}
                    </h3>
                    <p className="text-gold font-bold">{product.price.toFixed(2)} &euro;</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
