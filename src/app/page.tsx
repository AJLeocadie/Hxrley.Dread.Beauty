import Link from "next/link";
import { Sparkles, Leaf, ShieldCheck, TrendingUp, Heart, Droplets, Scissors, ArrowRight } from "lucide-react";
import { gammes, needs } from "@/lib/data";

const iconMap: Record<string, React.ReactNode> = {
  droplets: <Droplets className="w-6 h-6" />,
  heart: <Heart className="w-6 h-6" />,
  scissors: <Scissors className="w-6 h-6" />,
  sparkles: <Sparkles className="w-6 h-6" />,
  "trending-up": <TrendingUp className="w-6 h-6" />,
};

export default function HomePage() {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-dark via-dark/90 to-dark" />
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-gold/10 blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-gold/5 blur-3xl" />
        </div>
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-gold/30 text-gold text-sm mb-6">
            <Leaf className="w-4 h-4" />
            100% Ingrédients Naturels
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold mb-6 leading-tight font-[family-name:var(--font-heading)]">
            <span className="gold-gradient">Hxrley.Dread.Beauty</span>
          </h1>
          <p className="text-lg sm:text-xl text-cream/70 mb-4 max-w-2xl mx-auto leading-relaxed">
            Des soins capillaires premium formulés à partir des plus belles plantes et fruits tropicaux.
            Sublimez vos cheveux naturellement.
          </p>
          <p className="text-cream/50 mb-8 text-sm">
            Huiles &bull; Shampooings &bull; Après-Shampooings &bull; Brillantines &bull; Sprays
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/boutique" className="btn-gold text-center">
              Découvrir la Boutique
            </Link>
            <Link href="/diagnostic" className="btn-outline-gold text-center">
              Diagnostic Capillaire Gratuit
            </Link>
          </div>
        </div>
      </section>

      {/* Valeurs */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { icon: <Leaf className="w-8 h-8 text-gold" />, title: "Naturel", desc: "Des ingrédients naturels soigneusement sélectionnés pour prendre soin de vos cheveux." },
            { icon: <ShieldCheck className="w-8 h-8 text-gold" />, title: "Qualité Premium", desc: "Des formulations rigoureuses pour des résultats visibles dès les premières applications." },
            { icon: <Sparkles className="w-8 h-8 text-gold" />, title: "Sur Mesure", desc: "Un diagnostic capillaire personnalisé pour trouver les produits adaptés à vos besoins." },
          ].map((item) => (
            <div key={item.title} className="text-center p-8 rounded-2xl bg-dark-card border border-dark-border card-hover">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gold/10 mb-4">
                {item.icon}
              </div>
              <h3 className="text-lg font-semibold text-cream mb-2">{item.title}</h3>
              <p className="text-cream/60 text-sm">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Vos Besoins */}
      <section className="py-16 px-4 bg-dark-card/50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-2 font-[family-name:var(--font-heading)]">
            <span className="gold-gradient">Vos Besoins</span>
          </h2>
          <p className="text-center text-cream/60 mb-10">Trouvez les produits adaptés à vos objectifs capillaires</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
            {needs.map((need) => (
              <Link
                key={need.id}
                href={`/boutique?need=${need.id}`}
                className="flex flex-col items-center p-6 rounded-xl bg-dark border border-dark-border hover:border-gold/50 card-hover text-center"
              >
                <div className="text-gold mb-3">{iconMap[need.icon]}</div>
                <h3 className="font-semibold text-cream text-sm mb-1">{need.name}</h3>
                <p className="text-cream/50 text-xs">{need.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Nos Gammes */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-2 font-[family-name:var(--font-heading)]">
            <span className="gold-gradient">Nos Gammes</span>
          </h2>
          <p className="text-center text-cream/60 mb-10">Des formules uniques aux actifs naturels puissants</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {gammes.map((gamme) => (
              <Link
                key={gamme.id}
                href={`/gammes/${gamme.slug}`}
                className="group relative overflow-hidden rounded-2xl bg-dark-card border border-dark-border card-hover p-6"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-gold/5 rounded-full -translate-y-1/2 translate-x-1/2" />
                <h3 className="text-lg font-bold text-gold mb-2">{gamme.name}</h3>
                <p className="text-cream/60 text-sm mb-4 line-clamp-2">{gamme.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {gamme.ingredients.map((ing) => (
                    <span key={ing.name} className="text-xs px-2 py-1 rounded-full bg-gold/10 text-gold/80">
                      {ing.name}
                    </span>
                  ))}
                </div>
                <span className="inline-flex items-center gap-1 text-sm text-gold group-hover:gap-2 transition-all">
                  Découvrir <ArrowRight className="w-4 h-4" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Ingrédients Naturels */}
      <section className="py-16 px-4 bg-dark-card/50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-2 font-[family-name:var(--font-heading)]">
            <span className="gold-gradient">Nos Ingrédients</span>
          </h2>
          <p className="text-center text-cream/60 mb-10">Des trésors de la nature pour vos cheveux</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {[
              { name: "Groseille", benefit: "Vitamine C & Pousse" },
              { name: "Grenade", benefit: "Hydratation Profonde" },
              { name: "Fruit de la Passion", benefit: "Oméga-6 & Brillance" },
              { name: "Papaye", benefit: "Réparation & Éclat" },
              { name: "Mangue", benefit: "Force & Nutrition" },
              { name: "Gingembre", benefit: "Anti-chute & Pousse" },
              { name: "Menthe Poivrée", benefit: "Fraîcheur & Pureté" },
              { name: "Aloe Vera", benefit: "Apaisement & Hydratation" },
            ].map((ing) => (
              <div key={ing.name} className="text-center p-5 rounded-xl bg-dark border border-dark-border card-hover">
                <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-gradient-to-br from-gold/20 to-gold/5 flex items-center justify-center">
                  <Leaf className="w-7 h-7 text-gold" />
                </div>
                <h4 className="font-semibold text-cream text-sm">{ing.name}</h4>
                <p className="text-cream/50 text-xs mt-1">{ing.benefit}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Diagnostic */}
      <section className="py-20 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4 font-[family-name:var(--font-heading)]">
            <span className="gold-gradient">Diagnostic Capillaire Gratuit</span>
          </h2>
          <p className="text-cream/60 mb-8 max-w-xl mx-auto">
            Répondez à quelques questions et recevez des recommandations personnalisées
            adaptées à votre type de cheveux et vos objectifs.
          </p>
          <Link href="/diagnostic" className="btn-gold inline-block">
            Commencer le Diagnostic
          </Link>
        </div>
      </section>

      {/* Contact */}
      <section className="py-12 px-4 bg-dark-card/50 border-t border-dark-border">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-cream/60 text-sm">
            CONTACTEZ-NOUS DU LUNDI AU VENDREDI DE 9H À 18H AU{" "}
            <a href="tel:0696657707" className="text-gold hover:text-gold-light font-semibold">06 96 65 77 07</a>
          </p>
        </div>
      </section>
    </div>
  );
}
