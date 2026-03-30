import Link from "next/link";
import { Phone, Clock, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-dark-card border-t border-dark-border mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <h3 className="text-lg font-bold gold-gradient mb-4 font-[family-name:var(--font-heading)]">
              Hxrley.Dread.Beauty
            </h3>
            <p className="text-cream/60 text-sm leading-relaxed">
              Des soins capillaires premium aux ingrédients naturels pour sublimer vos cheveux.
            </p>
            <div className="flex items-center gap-2 mt-4 text-sm text-cream/60">
              <Phone className="w-4 h-4 text-gold" />
              <span>06 96 65 77 07</span>
            </div>
            <div className="flex items-center gap-2 mt-2 text-sm text-cream/60">
              <Clock className="w-4 h-4 text-gold" />
              <span>Lundi - Vendredi, 9h - 18h</span>
            </div>
            <a
              href="https://www.tiktok.com/@hxrley.dread.beauty"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-3 text-sm text-gold hover:text-gold-light transition-colors"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 0 0-.79-.05A6.34 6.34 0 0 0 3.15 15a6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.34-6.34V8.71a8.19 8.19 0 0 0 4.76 1.52v-3.4a4.85 4.85 0 0 1-1-.14z"/>
              </svg>
              @Hxrley.Dread.Beauty
            </a>
          </div>

          {/* Nos Services */}
          <div>
            <h4 className="text-sm font-semibold text-gold uppercase tracking-wider mb-4">Nos Services</h4>
            <ul className="space-y-2 text-sm text-cream/60">
              <li><Link href="/boutique" className="hover:text-gold transition-colors">Boutique en ligne</Link></li>
              <li><Link href="/diagnostic" className="hover:text-gold transition-colors">Diagnostic capillaire</Link></li>
              <li><Link href="/gammes" className="hover:text-gold transition-colors">Nos gammes</Link></li>
            </ul>
          </div>

          {/* FAQ */}
          <div>
            <h4 className="text-sm font-semibold text-gold uppercase tracking-wider mb-4">Questions Fréquentes</h4>
            <ul className="space-y-2 text-sm text-cream/60">
              <li>
                <details className="group">
                  <summary className="cursor-pointer hover:text-gold transition-colors">Comment choisir ma gamme ?</summary>
                  <p className="mt-1 text-cream/40 text-xs">Faites notre diagnostic capillaire gratuit pour recevoir des recommandations personnalisées.</p>
                </details>
              </li>
              <li>
                <details className="group">
                  <summary className="cursor-pointer hover:text-gold transition-colors">Quels sont les délais de livraison ?</summary>
                  <p className="mt-1 text-cream/40 text-xs">Livraison sous 3-5 jours ouvrés en Martinique, 5-7 jours en métropole.</p>
                </details>
              </li>
              <li>
                <details className="group">
                  <summary className="cursor-pointer hover:text-gold transition-colors">Les produits sont-ils naturels ?</summary>
                  <p className="mt-1 text-cream/40 text-xs">Oui, nos produits sont formulés à partir d&apos;ingrédients naturels soigneusement sélectionnés.</p>
                </details>
              </li>
            </ul>
          </div>

          {/* Infos */}
          <div>
            <h4 className="text-sm font-semibold text-gold uppercase tracking-wider mb-4">Informations</h4>
            <ul className="space-y-2 text-sm text-cream/60">
              <li className="hover:text-gold transition-colors cursor-pointer">Programme de fidélité</li>
              <li className="hover:text-gold transition-colors cursor-pointer">Livraison et retours</li>
              <li className="hover:text-gold transition-colors cursor-pointer">Conditions générales</li>
              <li className="hover:text-gold transition-colors cursor-pointer">Politique de confidentialité</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-dark-border mt-8 pt-8 text-center text-sm text-cream/40">
          <p>&copy; {new Date().getFullYear()} Hxrley.Dread.Beauty - Tous droits réservés</p>
        </div>
      </div>
    </footer>
  );
}
