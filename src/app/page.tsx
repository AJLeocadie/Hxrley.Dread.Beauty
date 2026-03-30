import Link from "next/link";
import { Sparkles, Leaf, ShieldCheck, TrendingUp, Heart, Droplets, Scissors, ArrowRight, Star } from "lucide-react";
import { gammes, needs } from "@/lib/data";
import {
  GroseilleIcon, GrenadeIcon, PassionIcon, PapayeIcon,
  MangueIcon, GingembreIcon, MentheIcon, CitronIcon, AloeIcon, CharbonIcon,
  ingredientIcons, gammeColors,
} from "@/components/FruitIcons";

const iconMap: Record<string, React.ReactNode> = {
  droplets: <Droplets className="w-6 h-6" />,
  heart: <Heart className="w-6 h-6" />,
  scissors: <Scissors className="w-6 h-6" />,
  sparkles: <Sparkles className="w-6 h-6" />,
  "trending-up": <TrendingUp className="w-6 h-6" />,
};

const ingredientShowcase = [
  { name: "Groseille", benefit: "Vitamine C & Pousse", Icon: GroseilleIcon, cardClass: "fruit-card-groseille" },
  { name: "Grenade", benefit: "Hydratation Profonde", Icon: GrenadeIcon, cardClass: "fruit-card-grenade" },
  { name: "Fruit de la Passion", benefit: "Oméga-6 & Brillance", Icon: PassionIcon, cardClass: "fruit-card-passion" },
  { name: "Papaye", benefit: "Réparation & Éclat", Icon: PapayeIcon, cardClass: "fruit-card-papaye" },
  { name: "Mangue", benefit: "Force & Nutrition", Icon: MangueIcon, cardClass: "fruit-card-mangue" },
  { name: "Gingembre", benefit: "Anti-chute & Pousse", Icon: GingembreIcon, cardClass: "fruit-card-gingembre" },
  { name: "Menthe Poivrée", benefit: "Fraîcheur & Pureté", Icon: MentheIcon, cardClass: "fruit-card-menthe" },
  { name: "Aloe Vera", benefit: "Apaisement & Hydratation", Icon: AloeIcon, cardClass: "fruit-card-aloe" },
];

export default function HomePage() {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative min-h-[92vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-dark via-dark/90 to-dark" />
        {/* Decorative blobs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/6 w-80 h-80 rounded-full bg-gold/[0.04] blur-[100px]" />
          <div className="absolute bottom-1/3 right-1/5 w-96 h-96 rounded-full bg-gold/[0.03] blur-[120px]" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border border-gold/[0.05]" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full border border-gold/[0.08]" />
        </div>
        {/* Floating fruit decorations */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-[0.12]">
          <div className="absolute top-[15%] left-[8%] animate-float"><MangueIcon className="w-20 h-20" /></div>
          <div className="absolute top-[20%] right-[10%] animate-float delay-300"><GroseilleIcon className="w-16 h-16" /></div>
          <div className="absolute bottom-[25%] left-[12%] animate-float delay-200"><PassionIcon className="w-14 h-14" /></div>
          <div className="absolute bottom-[20%] right-[15%] animate-float delay-500"><MentheIcon className="w-18 h-18" /></div>
        </div>

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto animate-fade-in-up">
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-gold/20 bg-gold/[0.05] text-gold text-sm mb-8">
            <Leaf className="w-4 h-4" />
            100% Ingrédients Naturels
          </div>
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold mb-6 leading-tight font-[family-name:var(--font-heading)]">
            <span className="gold-gradient">Hxrley.Dread.Beauty</span>
          </h1>
          <p className="text-lg sm:text-xl text-cream/60 mb-3 max-w-2xl mx-auto leading-relaxed">
            Des soins capillaires premium formulés à partir des plus belles plantes et fruits tropicaux.
          </p>
          <p className="text-cream/40 mb-10 text-sm tracking-widest uppercase">
            Huiles &bull; Shampooings &bull; Après-Shampooings &bull; Brillantines &bull; Sprays
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/boutique" className="btn-gold text-center text-base">
              Découvrir la Boutique
            </Link>
            <Link href="/diagnostic" className="btn-outline-gold text-center text-base">
              Diagnostic Capillaire Gratuit
            </Link>
          </div>

          {/* Trust badges */}
          <div className="flex items-center justify-center gap-6 mt-12 text-cream/30 text-xs">
            <span className="flex items-center gap-1.5"><Star className="w-3.5 h-3.5 text-gold/50" /> Qualité Premium</span>
            <span className="hidden sm:block w-1 h-1 rounded-full bg-cream/20" />
            <span className="flex items-center gap-1.5"><Leaf className="w-3.5 h-3.5 text-gold/50" /> Naturel</span>
            <span className="hidden sm:block w-1 h-1 rounded-full bg-cream/20" />
            <span className="flex items-center gap-1.5"><ShieldCheck className="w-3.5 h-3.5 text-gold/50" /> Paiement Sécurisé</span>
          </div>
        </div>
      </section>

      {/* Valeurs */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 stagger-children">
          {[
            { icon: <Leaf className="w-7 h-7 text-gold" />, title: "Naturel", desc: "Des ingrédients naturels soigneusement sélectionnés pour prendre soin de vos cheveux." },
            { icon: <ShieldCheck className="w-7 h-7 text-gold" />, title: "Qualité Premium", desc: "Des formulations rigoureuses pour des résultats visibles dès les premières applications." },
            { icon: <Sparkles className="w-7 h-7 text-gold" />, title: "Sur Mesure", desc: "Un diagnostic capillaire personnalisé pour trouver les produits adaptés à vos besoins." },
          ].map((item) => (
            <div key={item.title} className="text-center p-8 rounded-2xl bg-dark-card border border-dark-border card-hover group">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gold/10 mb-5 group-hover:bg-gold/20 transition-colors">
                {item.icon}
              </div>
              <h3 className="text-lg font-semibold text-cream mb-2">{item.title}</h3>
              <p className="text-cream/50 text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Vos Besoins */}
      <section className="py-20 px-4 bg-dark-card/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-3 font-[family-name:var(--font-heading)]">
              <span className="gold-gradient">Vos Besoins</span>
            </h2>
            <p className="text-cream/50 max-w-md mx-auto">Trouvez les produits adaptés à vos objectifs capillaires</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 stagger-children">
            {needs.map((need) => (
              <Link
                key={need.id}
                href={`/besoins/${need.id}`}
                className="flex flex-col items-center p-6 rounded-2xl bg-dark border border-dark-border hover:border-gold/40 card-hover text-center group"
              >
                <div className="text-gold mb-3 group-hover:scale-110 transition-transform duration-300">{iconMap[need.icon]}</div>
                <h3 className="font-semibold text-cream text-sm mb-1">{need.name}</h3>
                <p className="text-cream/40 text-xs leading-relaxed">{need.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Nos Gammes */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-3 font-[family-name:var(--font-heading)]">
              <span className="gold-gradient">Nos Gammes</span>
            </h2>
            <p className="text-cream/50 max-w-md mx-auto">Des formules uniques aux actifs naturels puissants</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 stagger-children">
            {gammes.map((gamme) => {
              const colors = gammeColors[gamme.id];
              return (
                <Link
                  key={gamme.id}
                  href={`/gammes/${gamme.slug}`}
                  className="group relative overflow-hidden rounded-2xl bg-dark-card border border-dark-border card-hover"
                >
                  {/* Gamme illustration header */}
                  <div
                    className="relative h-40 flex items-center justify-center gap-3 overflow-hidden"
                    style={{ background: `linear-gradient(135deg, ${colors.from}15, ${colors.to}08)` }}
                  >
                    <div className="absolute inset-0 opacity-[0.03]" style={{ background: `radial-gradient(circle at 30% 50%, ${colors.accent}, transparent 70%)` }} />
                    {gamme.ingredients.map((ing) => {
                      const IconComp = ingredientIcons[ing.name];
                      return IconComp ? (
                        <div key={ing.name} className="relative z-10 group-hover:scale-110 transition-transform duration-500">
                          <IconComp className="w-20 h-20" />
                        </div>
                      ) : null;
                    })}
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-bold text-gold mb-2">{gamme.name}</h3>
                    <p className="text-cream/50 text-sm mb-4 line-clamp-2 leading-relaxed">{gamme.description}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {gamme.ingredients.map((ing) => (
                        <span key={ing.name} className="text-xs px-2.5 py-1 rounded-full bg-gold/10 text-gold/70 border border-gold/10">
                          {ing.name}
                        </span>
                      ))}
                    </div>
                    <span className="inline-flex items-center gap-1 text-sm text-gold group-hover:gap-2 transition-all">
                      Découvrir <ArrowRight className="w-4 h-4" />
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Ingrédients Naturels */}
      <section className="py-20 px-4 bg-dark-card/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-3 font-[family-name:var(--font-heading)]">
              <span className="gold-gradient">Nos Ingrédients</span>
            </h2>
            <p className="text-cream/50 max-w-md mx-auto">Des trésors de la nature pour vos cheveux</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 stagger-children">
            {ingredientShowcase.map((ing) => (
              <div key={ing.name} className={`text-center p-6 rounded-2xl border border-dark-border card-hover group ${ing.cardClass}`}>
                <div className="mb-4 group-hover:scale-110 transition-transform duration-500 flex justify-center">
                  <ing.Icon className="w-20 h-20" />
                </div>
                <h4 className="font-semibold text-cream text-sm">{ing.name}</h4>
                <p className="text-cream/40 text-xs mt-1">{ing.benefit}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Diagnostic */}
      <section className="py-24 px-4 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-gold/[0.03] blur-[80px]" />
        </div>
        <div className="max-w-3xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gold/10 mb-6 animate-pulse-gold">
            <Sparkles className="w-7 h-7 text-gold" />
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 font-[family-name:var(--font-heading)]">
            <span className="gold-gradient">Diagnostic Capillaire Gratuit</span>
          </h2>
          <p className="text-cream/50 mb-10 max-w-xl mx-auto leading-relaxed">
            Répondez à quelques questions et recevez des recommandations personnalisées
            adaptées à votre type de cheveux et vos objectifs.
          </p>
          <Link href="/diagnostic" className="btn-gold inline-block text-base">
            Commencer le Diagnostic
          </Link>
        </div>
      </section>

      {/* Contact */}
      <section className="py-10 px-4 bg-dark-card/50 border-t border-dark-border">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-cream/50 text-sm">
            CONTACTEZ-NOUS DU LUNDI AU VENDREDI DE 9H À 18H AU{" "}
            <a href="tel:0696657707" className="text-gold hover:text-gold-light font-semibold transition-colors">06 96 65 77 07</a>
          </p>
        </div>
      </section>
    </div>
  );
}
