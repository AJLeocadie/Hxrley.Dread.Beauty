import Link from "next/link";
import { ArrowRight, Leaf } from "lucide-react";
import { gammes } from "@/lib/data";

export default function GammesPage() {
  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold gold-gradient mb-3 font-[family-name:var(--font-heading)]">
            Nos Gammes
          </h1>
          <p className="text-cream/60 max-w-xl mx-auto">
            Découvrez nos gammes de soins capillaires aux actifs naturels, conçues pour répondre à tous vos besoins.
          </p>
        </div>

        <div className="space-y-8">
          {gammes.map((gamme, index) => (
            <Link
              key={gamme.id}
              href={`/gammes/${gamme.slug}`}
              className="block group"
            >
              <div className={`flex flex-col ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"} gap-6 p-6 sm:p-8 rounded-2xl bg-dark-card border border-dark-border hover:border-gold/30 transition-all`}>
                {/* Image placeholder */}
                <div className="w-full md:w-1/3 aspect-video md:aspect-square rounded-xl bg-gradient-to-br from-gold/10 to-gold/5 flex items-center justify-center shrink-0">
                  <Leaf className="w-16 h-16 text-gold/40" />
                </div>

                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-gold mb-3">{gamme.name}</h2>
                  <p className="text-cream/70 mb-4">{gamme.description}</p>

                  <h3 className="text-sm font-semibold text-cream/80 mb-3 uppercase tracking-wider">Ingrédients clés</h3>
                  <div className="space-y-4 mb-6">
                    {gamme.ingredients.map((ing) => (
                      <div key={ing.name}>
                        <h4 className="font-semibold text-cream mb-1">{ing.name}</h4>
                        <ul className="space-y-1">
                          {ing.benefits.map((b, i) => (
                            <li key={i} className="flex items-start gap-2 text-sm text-cream/60">
                              <span className="text-gold mt-1">&#8226;</span>
                              {b}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>

                  <span className="inline-flex items-center gap-1 text-sm text-gold group-hover:gap-2 transition-all">
                    Découvrir cette gamme <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
