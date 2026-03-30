"use client";
import { create } from "zustand";
import type { Product, Appointment } from "@/lib/data";
import { defaultProducts } from "@/lib/data";

interface Order {
  id: string;
  items: { productId: string; name: string; quantity: number; price: number }[];
  total: number;
  customerEmail: string;
  customerName: string;
  address: string;
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled";
  createdAt: string;
}

interface DiagnosticEntry {
  id: string;
  email: string;
  telephone?: string;
  commune?: string;
  result: Record<string, unknown>;
  recommendations: Record<string, unknown>;
  createdAt: string;
}

interface AdminState {
  products: Product[];
  orders: Order[];
  appointments: Appointment[];
  diagnostics: DiagnosticEntry[];
  isAuthenticated: boolean;
  login: (password: string) => boolean;
  logout: () => void;
  addProduct: (product: Product) => void;
  updateProduct: (id: string, product: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  addOrder: (order: Order) => void;
  updateOrderStatus: (id: string, status: Order["status"]) => void;
  addAppointment: (appointment: Appointment) => void;
  updateAppointmentStatus: (id: string, status: Appointment["status"]) => void;
  addDiagnostic: (entry: DiagnosticEntry) => void;
}

export const useAdminStore = create<AdminState>((set) => ({
  products: defaultProducts,
  orders: [
    {
      id: "CMD-001",
      items: [{ productId: "1", name: "Huile Capillaire Groseille & Grenade", quantity: 2, price: 24.90 }],
      total: 49.80,
      customerEmail: "client@example.com",
      customerName: "Marie Dupont",
      address: "12 Rue des Fleurs, 97200 Fort-de-France",
      status: "processing",
      createdAt: "2026-03-28",
    },
    {
      id: "CMD-002",
      items: [
        { productId: "2", name: "Shampooing Purifiant Détox", quantity: 1, price: 18.90 },
        { productId: "3", name: "Après-Shampooing Bonne Mine", quantity: 1, price: 19.90 },
      ],
      total: 38.80,
      customerEmail: "jean@example.com",
      customerName: "Jean Pierre",
      address: "5 Rue du Marché, 97200 Fort-de-France",
      status: "pending",
      createdAt: "2026-03-29",
    },
  ],
  appointments: [
    {
      id: "RDV-001",
      name: "Sophie Martin",
      email: "sophie@example.com",
      phone: "0696 12 34 56",
      service: "retwist",
      date: "2026-04-02",
      time: "10:00",
      status: "confirmed",
    },
  ],
  diagnostics: [],
  isAuthenticated: false,
  login: (password) => {
    if (password === "admin2026") {
      set({ isAuthenticated: true });
      return true;
    }
    return false;
  },
  logout: () => set({ isAuthenticated: false }),
  addProduct: (product) =>
    set((state) => ({ products: [...state.products, product] })),
  updateProduct: (id, updates) =>
    set((state) => ({
      products: state.products.map((p) =>
        p.id === id ? { ...p, ...updates } : p
      ),
    })),
  deleteProduct: (id) =>
    set((state) => ({ products: state.products.filter((p) => p.id !== id) })),
  addOrder: (order) =>
    set((state) => ({ orders: [...state.orders, order] })),
  updateOrderStatus: (id, status) =>
    set((state) => ({
      orders: state.orders.map((o) => (o.id === id ? { ...o, status } : o)),
    })),
  addAppointment: (appointment) =>
    set((state) => ({ appointments: [...state.appointments, appointment] })),
  updateAppointmentStatus: (id, status) =>
    set((state) => ({
      appointments: state.appointments.map((a) =>
        a.id === id ? { ...a, status } : a
      ),
    })),
  addDiagnostic: (entry) =>
    set((state) => ({ diagnostics: [...state.diagnostics, entry] })),
}));
