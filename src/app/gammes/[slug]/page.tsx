import Link from "next/link";
import { ArrowLeft, Check } from "lucide-react";
import { gammes, defaultProducts } from "@/lib/data";
import { ingredientIcons, gammeColors } from "@/components/FruitIcons";
import ProductIllustration from "@/components/ProductIllustration";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return gammes.map((g) => ({ slug: g.slug }));
}

export default async function GammeDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const gamme = gammes.find((g) => g.slug === slug);
  if (!gamme) notFound();

  const products = defaultProducts.filter((p) => p.gamme === gamme.id);
  const colors = gammeColors[gamme.id];

  return (
    <div className="min-h-screen">
      {/* Hero header */}
      <div
        className="relative py-20 px-4 overflow-hidden"
        style={{ background: `linear-gradient(135deg, ${colors.from}12, ${colors.to}06, #0a0a0a)` }}
      >
        <div className="absolute inset-0 opacity-[0.03]" style={{ background: `radial-gradient(circle at 50% 50%, ${colors.accent}, transparent 50%)` }} />
        <div className="max-w-5xl mx-auto relative z-10">
          <Link href="/gammes" className="inline-flex items-center gap-2 text-cream/40 hover:text-gold mb-8 transition-colors text-sm">
            <ArrowLeft className="w-4 h-4" /> Retour aux gammes
          </Link>
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="flex gap-4">
              {gamme.ingredients.map((ing) => {
                const IconComp = ingredientIcons[ing.name];
                return IconComp ? <IconComp key={ing.name} className="w-28 h-28 sm:w-32 sm:h-32" /> : null;
              })}
            </div>
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold gold-gradient mb-3 font-[family-name:var(--font-heading)]">
                {gamme.name}
              </h1>
              <p className="text-cream/50 max-w-xl leading-relaxed">{gamme.description}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-12">
        {/* Ingrédients */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-cream mb-8 font-[family-name:var(--font-heading)]">
            Ingrédients & Bienfaits
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 stagger-children">
            {gamme.ingredients.map((ing) => {
              const IconComp = ingredientIcons[ing.name];
              const cardSlug = ing.name.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/\s+/g, "-").replace(/[^a-z-]/g, "");
              return (
                <div key={ing.name} className={`p-6 rounded-2xl border border-dark-border card-hover fruit-card-${cardSlug}`}>
                  <div className="flex items-center gap-4 mb-5">
                    {IconComp && <IconComp className="w-16 h-16" />}
                    <h3 className="text-xl font-bold text-gold">{ing.name}</h3>
                  </div>
                  <ul className="space-y-2.5">
                    {ing.benefits.map((benefit, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-cream/60 text-sm">
                        <Check className="w-4 h-4 text-gold/60 mt-0.5 shrink-0" />
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>

        {/* Produits de cette gamme */}
        {products.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold text-cream mb-8 font-[family-name:var(--font-heading)]">
              Produits de cette gamme
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 stagger-children">
              {products.map((product) => {
                return (
                  <Link
                    key={product.id}
                    href={`/boutique/${product.slug}`}
                    className="group rounded-2xl bg-dark-card border border-dark-border hover:border-gold/20 overflow-hidden card-hover"
                  >
                    <ProductIllustration ingredients={product.ingredients} gammeId={product.gamme} size="lg" />
                    <div className="p-5">
                      <h3 className="font-semibold text-cream text-sm mb-2 group-hover:text-gold transition-colors line-clamp-2">
                        {product.name}
                      </h3>
                      <p className="text-gold font-bold text-lg">{product.price.toFixed(2)} &euro;</p>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
