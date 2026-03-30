"use client";
import { useState } from "react";
import Link from "next/link";
import { Lock, Package, ShoppingCart, Users, BarChart3, LogOut } from "lucide-react";
import { useAdminStore } from "@/store/admin";

export default function AdminPage() {
  const { isAuthenticated, login, logout, products, orders, diagnostics } = useAdminStore();
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="w-full max-w-sm">
          <div className="text-center mb-8">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gold/10 flex items-center justify-center">
              <Lock className="w-8 h-8 text-gold" />
            </div>
            <h1 className="text-2xl font-bold text-cream">Administration</h1>
            <p className="text-cream/50 text-sm mt-1">Connectez-vous pour accéder au tableau de bord</p>
          </div>
          <div className="bg-dark-card border border-dark-border rounded-2xl p-6">
            <input
              type="password"
              placeholder="Mot de passe"
              value={password}
              onChange={(e) => { setPassword(e.target.value); setError(false); }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  if (!login(password)) setError(true);
                }
              }}
              className="w-full px-4 py-3 rounded-lg bg-dark border border-dark-border text-cream placeholder-cream/30 focus:border-gold focus:outline-none mb-4"
            />
            {error && <p className="text-red-400 text-sm mb-4">Mot de passe incorrect</p>}
            <button
              onClick={() => { if (!login(password)) setError(true); }}
              className="btn-gold w-full text-center"
            >
              Se connecter
            </button>
          </div>
        </div>
      </div>
    );
  }

  const stats = [
    { label: "Produits", value: products.length, icon: <Package className="w-5 h-5" />, href: "/admin/produits" },
    { label: "Commandes", value: orders.length, icon: <ShoppingCart className="w-5 h-5" />, href: "/admin/commandes" },
    { label: "Diagnostics", value: diagnostics.length, icon: <Users className="w-5 h-5" />, href: "#" },
  ];

  const revenue = orders.reduce((sum, o) => sum + o.total, 0);

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-10">
          <div>
            <h1 className="text-3xl font-bold gold-gradient font-[family-name:var(--font-heading)]">
              Tableau de Bord
            </h1>
            <p className="text-cream/50 text-sm mt-1">Administration Hxrley.Dread.Beauty</p>
          </div>
          <button onClick={logout} className="flex items-center gap-2 text-sm text-cream/50 hover:text-red-400 transition-colors">
            <LogOut className="w-4 h-4" /> Déconnexion
          </button>
        </div>

        {/* Revenue card */}
        <div className="mb-8 p-6 rounded-2xl bg-gradient-to-r from-gold/10 to-gold/5 border border-gold/20">
          <div className="flex items-center gap-3">
            <BarChart3 className="w-6 h-6 text-gold" />
            <div>
              <p className="text-sm text-cream/60">Chiffre d&apos;affaires total</p>
              <p className="text-2xl font-bold text-gold">{revenue.toFixed(2)} &euro;</p>
            </div>
          </div>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          {stats.map((stat) => (
            <Link
              key={stat.label}
              href={stat.href}
              className="p-6 rounded-xl bg-dark-card border border-dark-border hover:border-gold/30 transition-colors card-hover"
            >
              <div className="text-gold mb-2">{stat.icon}</div>
              <p className="text-2xl font-bold text-cream">{stat.value}</p>
              <p className="text-sm text-cream/50">{stat.label}</p>
            </Link>
          ))}
        </div>

        {/* Recent orders */}
        <div className="mb-10">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-cream">Commandes récentes</h2>
            <Link href="/admin/commandes" className="text-sm text-gold hover:text-gold-light">Voir tout</Link>
          </div>
          <div className="bg-dark-card border border-dark-border rounded-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-dark-border">
                    <th className="text-left px-4 py-3 text-xs text-cream/50 uppercase">ID</th>
                    <th className="text-left px-4 py-3 text-xs text-cream/50 uppercase">Client</th>
                    <th className="text-left px-4 py-3 text-xs text-cream/50 uppercase">Total</th>
                    <th className="text-left px-4 py-3 text-xs text-cream/50 uppercase">Statut</th>
                    <th className="text-left px-4 py-3 text-xs text-cream/50 uppercase">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.slice(0, 5).map((order) => (
                    <tr key={order.id} className="border-b border-dark-border/50">
                      <td className="px-4 py-3 text-sm text-cream font-mono">{order.id}</td>
                      <td className="px-4 py-3 text-sm text-cream/70">{order.customerName}</td>
                      <td className="px-4 py-3 text-sm text-gold font-bold">{order.total.toFixed(2)} &euro;</td>
                      <td className="px-4 py-3">
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          order.status === "pending" ? "bg-yellow-500/10 text-yellow-400" :
                          order.status === "processing" ? "bg-blue-500/10 text-blue-400" :
                          order.status === "shipped" ? "bg-purple-500/10 text-purple-400" :
                          order.status === "delivered" ? "bg-green-500/10 text-green-400" :
                          "bg-red-500/10 text-red-400"
                        }`}>
                          {order.status === "pending" ? "En attente" :
                           order.status === "processing" ? "En cours" :
                           order.status === "shipped" ? "Expédié" :
                           order.status === "delivered" ? "Livré" :
                           "Annulé"}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm text-cream/50">{order.createdAt}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
