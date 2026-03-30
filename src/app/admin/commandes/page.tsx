"use client";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useAdminStore } from "@/store/admin";

const statusLabels: Record<string, string> = {
  pending: "En attente",
  processing: "En cours",
  shipped: "Expédié",
  delivered: "Livré",
  cancelled: "Annulé",
};

const statusColors: Record<string, string> = {
  pending: "bg-yellow-500/10 text-yellow-400",
  processing: "bg-blue-500/10 text-blue-400",
  shipped: "bg-purple-500/10 text-purple-400",
  delivered: "bg-green-500/10 text-green-400",
  cancelled: "bg-red-500/10 text-red-400",
};

export default function AdminCommandesPage() {
  const { orders, updateOrderStatus, isAuthenticated } = useAdminStore();

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-cream/60 mb-4">Accès non autorisé</p>
          <Link href="/admin" className="btn-gold">Se connecter</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <Link href="/admin" className="text-cream/60 hover:text-gold transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <h1 className="text-2xl font-bold gold-gradient font-[family-name:var(--font-heading)]">
            Gestion des Commandes
          </h1>
        </div>

        <div className="space-y-4">
          {orders.map((order) => (
            <div key={order.id} className="p-6 rounded-xl bg-dark-card border border-dark-border">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                <div>
                  <p className="text-cream font-mono text-sm">{order.id}</p>
                  <p className="text-cream/60 text-sm">{order.customerName} - {order.customerEmail}</p>
                  <p className="text-cream/40 text-xs">{order.address}</p>
                </div>
                <div className="text-right">
                  <p className="text-gold font-bold text-lg">{order.total.toFixed(2)} &euro;</p>
                  <p className="text-cream/50 text-xs">{order.createdAt}</p>
                </div>
              </div>

              <div className="mb-4">
                <h4 className="text-xs text-cream/50 uppercase mb-2">Articles</h4>
                {order.items.map((item, i) => (
                  <div key={i} className="flex justify-between text-sm text-cream/70 py-1">
                    <span>{item.name} x{item.quantity}</span>
                    <span>{(item.price * item.quantity).toFixed(2)} &euro;</span>
                  </div>
                ))}
              </div>

              <div className="flex items-center gap-3">
                <span className="text-xs text-cream/50">Statut :</span>
                <div className="flex gap-2 flex-wrap">
                  {(["pending", "processing", "shipped", "delivered", "cancelled"] as const).map((status) => (
                    <button
                      key={status}
                      onClick={() => updateOrderStatus(order.id, status)}
                      className={`text-xs px-3 py-1 rounded-full transition-all ${
                        order.status === status
                          ? statusColors[status]
                          : "bg-dark border border-dark-border text-cream/40 hover:text-cream/70"
                      }`}
                    >
                      {statusLabels[status]}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ))}
          {orders.length === 0 && (
            <p className="text-center text-cream/50 py-10">Aucune commande</p>
          )}
        </div>
      </div>
    </div>
  );
}
