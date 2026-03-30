"use client";
import { useState } from "react";
import { Calendar, Clock, Check, ArrowRight } from "lucide-react";
import { services } from "@/lib/data";
import { useAdminStore } from "@/store/admin";

export default function RendezVousPage() {
  const addAppointment = useAdminStore((s) => s.addAppointment);
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    service: "",
    date: "",
    time: "",
    name: "",
    email: "",
    phone: "",
  });
  const [confirmed, setConfirmed] = useState(false);

  const timeSlots = [
    "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
    "13:00", "13:30", "14:00", "14:30", "15:00", "15:30", "16:00", "16:30", "17:00",
  ];

  const selectedService = services.find((s) => s.id === form.service);

  const handleSubmit = () => {
    const appointment = {
      id: `RDV-${Date.now()}`,
      name: form.name,
      email: form.email,
      phone: form.phone,
      service: form.service,
      date: form.date,
      time: form.time,
      status: "pending" as const,
    };
    addAppointment(appointment);
    setConfirmed(true);
  };

  if (confirmed) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-500/20 flex items-center justify-center">
            <Check className="w-8 h-8 text-green-400" />
          </div>
          <h1 className="text-2xl font-bold text-cream mb-2">Rendez-vous Confirmé !</h1>
          <p className="text-cream/60 mb-2">
            <strong className="text-cream">{selectedService?.name}</strong>
          </p>
          <p className="text-cream/60 mb-6">
            Le {form.date} à {form.time}
          </p>
          <p className="text-cream/50 text-sm mb-6">Un email de confirmation sera envoyé à {form.email}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold gold-gradient mb-3 font-[family-name:var(--font-heading)]">
            Prendre Rendez-vous
          </h1>
          <p className="text-cream/60">Réservez votre créneau en quelques clics</p>
        </div>

        {/* Steps indicator */}
        <div className="flex items-center justify-center gap-4 mb-10">
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex items-center gap-2">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                step >= s ? "bg-gold text-dark" : "bg-dark-border text-cream/40"
              }`}>
                {step > s ? <Check className="w-4 h-4" /> : s}
              </div>
              {s < 3 && <div className={`w-12 h-0.5 ${step > s ? "bg-gold" : "bg-dark-border"}`} />}
            </div>
          ))}
        </div>

        <div className="bg-dark-card border border-dark-border rounded-2xl p-6 sm:p-8">
          {/* Step 1: Service */}
          {step === 1 && (
            <div>
              <h2 className="text-xl font-bold text-cream mb-6">Choisir une prestation</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {services.map((service) => (
                  <button
                    key={service.id}
                    onClick={() => setForm({ ...form, service: service.id })}
                    className={`text-left p-4 rounded-xl border transition-all ${
                      form.service === service.id
                        ? "border-gold bg-gold/10"
                        : "border-dark-border hover:border-cream/30"
                    }`}
                  >
                    <h3 className="font-semibold text-cream text-sm">{service.name}</h3>
                    <div className="flex items-center gap-3 mt-2 text-xs text-cream/50">
                      <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {service.duration}</span>
                      <span className="text-gold font-bold">{service.price} &euro;</span>
                    </div>
                  </button>
                ))}
              </div>
              <div className="flex justify-end mt-6">
                <button
                  onClick={() => setStep(2)}
                  disabled={!form.service}
                  className="btn-gold flex items-center gap-2 disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  Suivant <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* Step 2: Date & Time */}
          {step === 2 && (
            <div>
              <h2 className="text-xl font-bold text-cream mb-6">Choisir une date et un horaire</h2>
              <div className="mb-6">
                <label className="block text-sm text-cream/70 mb-2">
                  <Calendar className="w-4 h-4 inline mr-1" /> Date
                </label>
                <input
                  type="date"
                  value={form.date}
                  min={new Date().toISOString().split("T")[0]}
                  onChange={(e) => setForm({ ...form, date: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg bg-dark border border-dark-border text-cream focus:border-gold focus:outline-none"
                />
              </div>
              {form.date && (
                <div>
                  <label className="block text-sm text-cream/70 mb-2">
                    <Clock className="w-4 h-4 inline mr-1" /> Horaire
                  </label>
                  <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                    {timeSlots.map((time) => (
                      <button
                        key={time}
                        onClick={() => setForm({ ...form, time })}
                        className={`px-3 py-2 rounded-lg text-sm text-center transition-all ${
                          form.time === time
                            ? "bg-gold text-dark font-bold"
                            : "bg-dark border border-dark-border text-cream/60 hover:border-cream/30"
                        }`}
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                </div>
              )}
              <div className="flex justify-between mt-6">
                <button onClick={() => setStep(1)} className="text-cream/60 hover:text-cream text-sm">Précédent</button>
                <button
                  onClick={() => setStep(3)}
                  disabled={!form.date || !form.time}
                  className="btn-gold flex items-center gap-2 disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  Suivant <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Contact */}
          {step === 3 && (
            <div>
              <h2 className="text-xl font-bold text-cream mb-6">Vos informations</h2>
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Nom complet *"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg bg-dark border border-dark-border text-cream placeholder-cream/30 focus:border-gold focus:outline-none"
                />
                <input
                  type="email"
                  placeholder="Email *"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg bg-dark border border-dark-border text-cream placeholder-cream/30 focus:border-gold focus:outline-none"
                />
                <input
                  type="tel"
                  placeholder="Téléphone *"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg bg-dark border border-dark-border text-cream placeholder-cream/30 focus:border-gold focus:outline-none"
                />
              </div>

              {/* Summary */}
              <div className="mt-6 p-4 rounded-xl bg-dark border border-dark-border">
                <h3 className="text-sm font-semibold text-gold mb-2">Récapitulatif</h3>
                <p className="text-cream text-sm">{selectedService?.name}</p>
                <p className="text-cream/60 text-sm">{form.date} à {form.time}</p>
                <p className="text-gold font-bold mt-1">{selectedService?.price} &euro;</p>
              </div>

              <div className="flex justify-between mt-6">
                <button onClick={() => setStep(2)} className="text-cream/60 hover:text-cream text-sm">Précédent</button>
                <button
                  onClick={handleSubmit}
                  disabled={!form.name || !form.email || !form.phone}
                  className="btn-gold flex items-center gap-2 disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  Confirmer le rendez-vous <Check className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
