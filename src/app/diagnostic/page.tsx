"use client";
import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Check, Send, Sparkles } from "lucide-react";
import { diagnosticOptions, getDiagnosticRecommendations, gammes, defaultProducts } from "@/lib/data";
import type { DiagnosticResult } from "@/lib/data";

const steps = [
  { key: "genre", label: "Votre genre", type: "single" },
  { key: "age", label: "Votre âge", type: "single" },
  { key: "typeCheveux", label: "Type de cheveux", type: "single" },
  { key: "longueur", label: "Longueur des cheveux", type: "single" },
  { key: "etatCuirChevelu", label: "État du cuir chevelu", type: "multi" },
  { key: "frequenceLavage", label: "Fréquence de lavage", type: "single" },
  { key: "demangeaisons", label: "Démangeaisons", type: "single" },
  { key: "objectif", label: "Vos objectifs capillaires", type: "multi" },
  { key: "contact", label: "Vos coordonnées", type: "contact" },
];

export default function DiagnosticPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string | string[]>>({
    genre: "",
    age: "",
    typeCheveux: "",
    longueur: "",
    etatCuirChevelu: [],
    frequenceLavage: "",
    demangeaisons: "",
    objectif: [],
    email: "",
    telephone: "",
    commune: "",
  });
  const [showResults, setShowResults] = useState(false);
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const step = steps[currentStep];
  const options = step.key !== "contact" ? diagnosticOptions[step.key as keyof typeof diagnosticOptions] : [];
  const progress = ((currentStep + 1) / steps.length) * 100;

  const handleSelect = (value: string) => {
    if (step.type === "multi") {
      const current = (answers[step.key] as string[]) || [];
      if (current.includes(value)) {
        setAnswers({ ...answers, [step.key]: current.filter((v) => v !== value) });
      } else {
        setAnswers({ ...answers, [step.key]: [...current, value] });
      }
    } else {
      setAnswers({ ...answers, [step.key]: value });
    }
  };

  const canProceed = () => {
    if (step.type === "contact") {
      return (answers.email as string).includes("@");
    }
    if (step.type === "multi") {
      return (answers[step.key] as string[]).length > 0;
    }
    return !!answers[step.key];
  };

  const handleSubmit = async () => {
    setSending(true);
    await new Promise((r) => setTimeout(r, 1500));
    setSending(false);
    setSent(true);
    setShowResults(true);
  };

  const result: DiagnosticResult = {
    genre: answers.genre as string,
    age: answers.age as string,
    typeCheveux: answers.typeCheveux as string,
    longueur: answers.longueur as string,
    etatCuirChevelu: answers.etatCuirChevelu as string[],
    frequenceLavage: answers.frequenceLavage as string,
    demangeaisons: answers.demangeaisons as string,
    objectif: answers.objectif as string[],
    email: answers.email as string,
    telephone: answers.telephone as string,
    commune: answers.commune as string,
  };

  const recommendations = getDiagnosticRecommendations(result);

  if (showResults) {
    const recGammes = gammes.filter((g) => recommendations.gammes.includes(g.id));
    const recProducts = defaultProducts.filter((p) => recommendations.products.includes(p.id));

    return (
      <div className="min-h-screen py-12 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gold/20 mb-4">
              <Sparkles className="w-8 h-8 text-gold" />
            </div>
            <h1 className="text-3xl font-bold gold-gradient mb-2 font-[family-name:var(--font-heading)]">
              Vos Recommandations
            </h1>
            <p className="text-cream/60">
              Basées sur votre profil capillaire, voici nos suggestions personnalisées.
            </p>
            {sent && (
              <p className="text-green-400 text-sm mt-2">
                <Check className="w-4 h-4 inline mr-1" />
                Résultats envoyés à {answers.email}
              </p>
            )}
          </div>

          {/* Gammes recommandées */}
          <div className="mb-10">
            <h2 className="text-xl font-bold text-gold mb-4">Gammes Recommandées</h2>
            <div className="grid gap-4">
              {recGammes.map((gamme) => (
                <Link
                  key={gamme.id}
                  href={`/gammes/${gamme.slug}`}
                  className="block p-6 rounded-xl bg-dark-card border border-dark-border hover:border-gold/50 transition-colors"
                >
                  <h3 className="font-semibold text-cream mb-1">{gamme.name}</h3>
                  <p className="text-cream/60 text-sm">{gamme.description}</p>
                </Link>
              ))}
            </div>
          </div>

          {/* Produits recommandés */}
          <div className="mb-10">
            <h2 className="text-xl font-bold text-gold mb-4">Produits Recommandés</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {recProducts.map((product) => (
                <Link
                  key={product.id}
                  href={`/boutique/${product.slug}`}
                  className="p-4 rounded-xl bg-dark-card border border-dark-border hover:border-gold/50 transition-colors"
                >
                  <h3 className="font-semibold text-cream text-sm mb-1">{product.name}</h3>
                  <p className="text-gold font-bold">{product.price.toFixed(2)} &euro;</p>
                </Link>
              ))}
            </div>
          </div>

          {/* Conseils */}
          {recommendations.tips.length > 0 && (
            <div className="mb-10">
              <h2 className="text-xl font-bold text-gold mb-4">Nos Conseils</h2>
              <div className="space-y-3">
                {recommendations.tips.map((tip, i) => (
                  <div key={i} className="flex items-start gap-3 p-4 rounded-xl bg-dark-card border border-dark-border">
                    <Check className="w-5 h-5 text-gold mt-0.5 shrink-0" />
                    <p className="text-cream/80 text-sm">{tip}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="text-center">
            <Link href="/boutique" className="btn-gold inline-block">
              Voir la Boutique
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold gold-gradient mb-2 font-[family-name:var(--font-heading)]">
            Diagnostic Capillaire
          </h1>
          <p className="text-cream/60">Trouvez les produits parfaits pour vos cheveux</p>
        </div>

        {/* Progress bar */}
        <div className="mb-8">
          <div className="flex justify-between text-xs text-cream/50 mb-2">
            <span>Étape {currentStep + 1} / {steps.length}</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <div className="h-1.5 bg-dark-border rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-gold-dark to-gold rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Step content */}
        <div className="bg-dark-card border border-dark-border rounded-2xl p-6 sm:p-8">
          <h2 className="text-xl font-bold text-cream mb-6">{step.label}</h2>

          {step.type === "contact" ? (
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-cream/70 mb-1">
                  Email <span className="text-red-400">*</span>
                </label>
                <input
                  type="email"
                  value={answers.email as string}
                  onChange={(e) => setAnswers({ ...answers, email: e.target.value })}
                  placeholder="votre@email.com"
                  className="w-full px-4 py-3 rounded-lg bg-dark border border-dark-border text-cream placeholder-cream/30 focus:border-gold focus:outline-none"
                  required
                />
              </div>
              <div>
                <label className="block text-sm text-cream/70 mb-1">
                  Téléphone <span className="text-cream/40">(optionnel)</span>
                </label>
                <input
                  type="tel"
                  value={answers.telephone as string}
                  onChange={(e) => setAnswers({ ...answers, telephone: e.target.value })}
                  placeholder="06 96 XX XX XX"
                  className="w-full px-4 py-3 rounded-lg bg-dark border border-dark-border text-cream placeholder-cream/30 focus:border-gold focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-sm text-cream/70 mb-1">
                  Commune <span className="text-cream/40">(optionnel)</span>
                </label>
                <input
                  type="text"
                  value={answers.commune as string}
                  onChange={(e) => setAnswers({ ...answers, commune: e.target.value })}
                  placeholder="Votre commune"
                  className="w-full px-4 py-3 rounded-lg bg-dark border border-dark-border text-cream placeholder-cream/30 focus:border-gold focus:outline-none"
                />
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {(options as string[]).map((option) => {
                const isSelected = step.type === "multi"
                  ? (answers[step.key] as string[]).includes(option)
                  : answers[step.key] === option;
                return (
                  <button
                    key={option}
                    onClick={() => handleSelect(option)}
                    className={`text-left px-4 py-3 rounded-lg border transition-all text-sm ${
                      isSelected
                        ? "border-gold bg-gold/10 text-gold"
                        : "border-dark-border text-cream/70 hover:border-cream/30"
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <span className={`w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 ${
                        isSelected ? "border-gold bg-gold" : "border-cream/30"
                      }`}>
                        {isSelected && <Check className="w-2.5 h-2.5 text-dark" />}
                      </span>
                      {option}
                    </span>
                  </button>
                );
              })}
            </div>
          )}

          {step.type === "multi" && step.key !== "contact" && (
            <p className="text-cream/40 text-xs mt-3">Vous pouvez sélectionner plusieurs réponses</p>
          )}
        </div>

        {/* Navigation */}
        <div className="flex justify-between mt-6">
          <button
            onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
            disabled={currentStep === 0}
            className="flex items-center gap-2 px-4 py-2 text-sm text-cream/60 hover:text-cream disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Précédent
          </button>
          {currentStep < steps.length - 1 ? (
            <button
              onClick={() => setCurrentStep(currentStep + 1)}
              disabled={!canProceed()}
              className="btn-gold flex items-center gap-2 disabled:opacity-30 disabled:cursor-not-allowed"
            >
              Suivant <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              disabled={!canProceed() || sending}
              className="btn-gold flex items-center gap-2 disabled:opacity-30 disabled:cursor-not-allowed"
            >
              {sending ? "Envoi en cours..." : "Voir mes résultats"}
              <Send className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
