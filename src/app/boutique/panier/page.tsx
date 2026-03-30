"use client";
import Link from "next/link";
import { ShoppingBag, Minus, Plus, Trash2, ArrowLeft, CreditCard } from "lucide-react";
import { useCartStore } from "@/store/cart";
import { useState } from "react";

export default function PanierPage() {
  const { items, removeItem, updateQuantity, clearCart, total } = useCartStore();
  const [showCheckout, setShowCheckout] = useState(false);
  const [orderForm, setOrderForm] = useState({ name: "", email: "", address: "", phone: "" });
  const [orderPlaced, setOrderPlaced] = useState(false);

  if (orderPlaced) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-500/20 flex items-center justify-center">
            <CreditCard className="w-8 h-8 text-green-400" />
          </div>
          <h1 className="text-2xl font-bold text-cream mb-2">Commande Confirmée !</h1>
          <p className="text-cream/60 mb-6">
            Merci pour votre commande. Vous recevrez un email de confirmation à {orderForm.email}.
          </p>
          <Link href="/boutique" className="btn-gold inline-block">Continuer mes achats</Link>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center">
          <ShoppingBag className="w-16 h-16 text-cream/20 mx-auto mb-4" />
          <h1 className="text-xl text-cream/60 mb-4">Votre panier est vide</h1>
          <Link href="/boutique" className="btn-gold inline-block">Découvrir nos produits</Link>
        </div>
      </div>
    );
  }

  const handleOrder = () => {
    clearCart();
    setOrderPlaced(true);
  };

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <Link href="/boutique" className="inline-flex items-center gap-2 text-cream/60 hover:text-gold mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Continuer mes achats
        </Link>

        <h1 className="text-3xl font-bold gold-gradient mb-8 font-[family-name:var(--font-heading)]">
          Mon Panier
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map(({ product, quantity }) => (
              <div key={product.id} className="flex gap-4 p-4 rounded-xl bg-dark-card border border-dark-border">
                <div className="w-20 h-20 rounded-lg bg-gradient-to-br from-gold/10 to-gold/5 flex items-center justify-center shrink-0">
                  <ShoppingBag className="w-8 h-8 text-gold/30" />
                </div>
                <div className="flex-1 min-w-0">
                  <Link href={`/boutique/${product.slug}`} className="font-semibold text-cream text-sm hover:text-gold transition-colors line-clamp-1">
                    {product.name}
                  </Link>
                  <p className="text-gold font-bold mt-1">{product.price.toFixed(2)} &euro;</p>
                  <div className="flex items-center gap-3 mt-2">
                    <button
                      onClick={() => updateQuantity(product.id, quantity - 1)}
                      className="w-7 h-7 rounded-md bg-dark border border-dark-border flex items-center justify-center text-cream/60 hover:text-cream"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="text-sm text-cream w-6 text-center">{quantity}</span>
                    <button
                      onClick={() => updateQuantity(product.id, quantity + 1)}
                      className="w-7 h-7 rounded-md bg-dark border border-dark-border flex items-center justify-center text-cream/60 hover:text-cream"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                    <button
                      onClick={() => removeItem(product.id)}
                      className="ml-auto text-red-400/60 hover:text-red-400"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-20 p-6 rounded-xl bg-dark-card border border-dark-border">
              <h2 className="font-semibold text-cream mb-4">Récapitulatif</h2>
              <div className="space-y-2 text-sm mb-4">
                <div className="flex justify-between text-cream/60">
                  <span>Sous-total</span>
                  <span>{total().toFixed(2)} &euro;</span>
                </div>
                <div className="flex justify-between text-cream/60">
                  <span>Livraison</span>
                  <span>Calculée à l&apos;étape suivante</span>
                </div>
              </div>
              <div className="border-t border-dark-border pt-4 mb-6">
                <div className="flex justify-between font-bold text-lg">
                  <span className="text-cream">Total</span>
                  <span className="text-gold">{total().toFixed(2)} &euro;</span>
                </div>
              </div>

              {!showCheckout ? (
                <button onClick={() => setShowCheckout(true)} className="btn-gold w-full text-center flex items-center justify-center gap-2">
                  <CreditCard className="w-4 h-4" /> Passer commande
                </button>
              ) : (
                <div className="space-y-3">
                  <input
                    type="text"
                    placeholder="Nom complet *"
                    value={orderForm.name}
                    onChange={(e) => setOrderForm({ ...orderForm, name: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-dark border border-dark-border text-cream text-sm placeholder-cream/30 focus:border-gold focus:outline-none"
                  />
                  <input
                    type="email"
                    placeholder="Email *"
                    value={orderForm.email}
                    onChange={(e) => setOrderForm({ ...orderForm, email: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-dark border border-dark-border text-cream text-sm placeholder-cream/30 focus:border-gold focus:outline-none"
                  />
                  <input
                    type="tel"
                    placeholder="Téléphone *"
                    value={orderForm.phone}
                    onChange={(e) => setOrderForm({ ...orderForm, phone: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-dark border border-dark-border text-cream text-sm placeholder-cream/30 focus:border-gold focus:outline-none"
                  />
                  <textarea
                    placeholder="Adresse de livraison *"
                    value={orderForm.address}
                    onChange={(e) => setOrderForm({ ...orderForm, address: e.target.value })}
                    rows={3}
                    className="w-full px-3 py-2 rounded-lg bg-dark border border-dark-border text-cream text-sm placeholder-cream/30 focus:border-gold focus:outline-none resize-none"
                  />
                  <button
                    onClick={handleOrder}
                    disabled={!orderForm.name || !orderForm.email || !orderForm.address || !orderForm.phone}
                    className="btn-gold w-full text-center flex items-center justify-center gap-2 disabled:opacity-30 disabled:cursor-not-allowed"
                  >
                    <CreditCard className="w-4 h-4" /> Payer {total().toFixed(2)} &euro;
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
