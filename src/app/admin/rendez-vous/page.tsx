"use client";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useAdminStore } from "@/store/admin";
import { services } from "@/lib/data";

export default function AdminRendezVousPage() {
  const { appointments, updateAppointmentStatus, isAuthenticated } = useAdminStore();

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
            Gestion des Rendez-vous
          </h1>
        </div>

        <div className="bg-dark-card border border-dark-border rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-dark-border">
                  <th className="text-left px-4 py-3 text-xs text-cream/50 uppercase">Client</th>
                  <th className="text-left px-4 py-3 text-xs text-cream/50 uppercase">Contact</th>
                  <th className="text-left px-4 py-3 text-xs text-cream/50 uppercase">Service</th>
                  <th className="text-left px-4 py-3 text-xs text-cream/50 uppercase">Date & Heure</th>
                  <th className="text-left px-4 py-3 text-xs text-cream/50 uppercase">Statut</th>
                </tr>
              </thead>
              <tbody>
                {appointments.map((apt) => {
                  const service = services.find((s) => s.id === apt.service);
                  return (
                    <tr key={apt.id} className="border-b border-dark-border/50">
                      <td className="px-4 py-3 text-sm text-cream">{apt.name}</td>
                      <td className="px-4 py-3">
                        <p className="text-sm text-cream/70">{apt.email}</p>
                        <p className="text-xs text-cream/50">{apt.phone}</p>
                      </td>
                      <td className="px-4 py-3 text-sm text-cream/70">{service?.name || apt.service}</td>
                      <td className="px-4 py-3 text-sm text-cream/70">{apt.date} à {apt.time}</td>
                      <td className="px-4 py-3">
                        <div className="flex gap-2">
                          {(["pending", "confirmed", "cancelled"] as const).map((status) => (
                            <button
                              key={status}
                              onClick={() => updateAppointmentStatus(apt.id, status)}
                              className={`text-xs px-2 py-1 rounded-full transition-all ${
                                apt.status === status
                                  ? status === "pending" ? "bg-yellow-500/10 text-yellow-400" :
                                    status === "confirmed" ? "bg-green-500/10 text-green-400" :
                                    "bg-red-500/10 text-red-400"
                                  : "bg-dark border border-dark-border text-cream/40 hover:text-cream/70"
                              }`}
                            >
                              {status === "pending" ? "En attente" :
                               status === "confirmed" ? "Confirmé" :
                               "Annulé"}
                            </button>
                          ))}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          {appointments.length === 0 && (
            <p className="text-center text-cream/50 py-10">Aucun rendez-vous</p>
          )}
        </div>
      </div>
    </div>
  );
}
