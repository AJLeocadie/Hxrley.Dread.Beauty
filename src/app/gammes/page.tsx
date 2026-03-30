import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { gammes } from "@/lib/data";
import { ingredientIcons, gammeColors } from "@/components/FruitIcons";

export default function GammesPage() {
  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14 animate-fade-in-up">
          <h1 className="text-4xl sm:text-5xl font-bold gold-gradient mb-4 font-[family-name:var(--font-heading)]">
            Nos Gammes
          </h1>
          <p className="text-cream/50 max-w-xl mx-auto leading-relaxed">
            Découvrez nos gammes de soins capillaires aux actifs naturels, conçues pour répondre à tous vos besoins.
          </p>
        </div>

        <div className="space-y-10 stagger-children">
          {gammes.map((gamme, index) => {
            const colors = gammeColors[gamme.id];
            return (
              <Link key={gamme.id} href={`/gammes/${gamme.slug}`} className="block group">
                <div className={`flex flex-col ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"} gap-0 rounded-2xl bg-dark-card border border-dark-border hover:border-gold/20 transition-all overflow-hidden`}>
                  {/* Illustration */}
                  <div
                    className="w-full md:w-2/5 min-h-[220px] flex items-center justify-center gap-4 p-8 relative overflow-hidden"
                    style={{ background: `linear-gradient(135deg, ${colors.from}18, ${colors.to}08)` }}
                  >
                    <div className="absolute inset-0 opacity-[0.04]" style={{ background: `radial-gradient(circle at 50% 50%, ${colors.accent}, transparent 60%)` }} />
                    {gamme.ingredients.map((ing) => {
                      const IconComp = ingredientIcons[ing.name];
                      return IconComp ? (
                        <div key={ing.name} className="relative z-10 group-hover:scale-110 transition-transform duration-700">
                          <IconComp className="w-24 h-24 sm:w-28 sm:h-28" />
                        </div>
                      ) : null;
                    })}
                  </div>

                  {/* Content */}
                  <div className="flex-1 p-6 sm:p-8">
                    <h2 className="text-2xl font-bold text-gold mb-3">{gamme.name}</h2>
                    <p className="text-cream/60 mb-5 leading-relaxed">{gamme.description}</p>

                    <h3 className="text-xs font-semibold text-cream/40 mb-3 uppercase tracking-widest">Ingrédients clés</h3>
                    <div className="space-y-4 mb-6">
                      {gamme.ingredients.map((ing) => (
                        <div key={ing.name}>
                          <h4 className="font-semibold text-cream mb-1.5 text-sm">{ing.name}</h4>
                          <ul className="space-y-1">
                            {ing.benefits.slice(0, 3).map((b, i) => (
                              <li key={i} className="flex items-start gap-2 text-sm text-cream/50">
                                <Check className="w-3.5 h-3.5 text-gold/60 mt-0.5 shrink-0" />
                                {b}
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>

                    <span className="inline-flex items-center gap-1.5 text-sm text-gold group-hover:gap-3 transition-all font-medium">
                      Découvrir cette gamme <ArrowRight className="w-4 h-4" />
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
