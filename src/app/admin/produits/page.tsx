"use client";
import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Plus, Pencil, Trash2, X, Save } from "lucide-react";
import { useAdminStore } from "@/store/admin";
import { gammes, categories } from "@/lib/data";
import type { Product } from "@/lib/data";

export default function AdminProduitsPage() {
  const { products, addProduct, updateProduct, deleteProduct, isAuthenticated } = useAdminStore();
  const [editing, setEditing] = useState<string | null>(null);
  const [showAdd, setShowAdd] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);

  const emptyProduct: Omit<Product, "id"> = {
    name: "",
    slug: "",
    description: "",
    price: 0,
    category: "huile",
    gamme: "performance-volume",
    needs: [],
    ingredients: [],
    images: [],
    stock: 0,
    featured: false,
  };

  const [form, setForm] = useState(emptyProduct);
  const [editForm, setEditForm] = useState<Partial<Product>>({});

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

  const handleAdd = () => {
    const id = `${Date.now()}`;
    const slug = form.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
    addProduct({ ...form, id, slug, images: ["/images/product-default.jpg"] } as Product);
    setForm(emptyProduct);
    setShowAdd(false);
  };

  const handleUpdate = (id: string) => {
    updateProduct(id, editForm);
    setEditing(null);
    setEditForm({});
  };

  const handleDelete = (id: string) => {
    deleteProduct(id);
    setConfirmDelete(null);
  };

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Link href="/admin" className="text-cream/60 hover:text-gold transition-colors">
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <h1 className="text-2xl font-bold gold-gradient font-[family-name:var(--font-heading)]">
              Gestion des Produits
            </h1>
          </div>
          <button
            onClick={() => setShowAdd(!showAdd)}
            className="btn-gold flex items-center gap-2 text-sm"
          >
            {showAdd ? <X className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
            {showAdd ? "Annuler" : "Ajouter"}
          </button>
        </div>

        {/* Add form */}
        {showAdd && (
          <div className="mb-8 p-6 rounded-xl bg-dark-card border border-dark-border">
            <h2 className="text-lg font-semibold text-cream mb-4">Nouveau Produit</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                placeholder="Nom du produit *"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="px-4 py-2 rounded-lg bg-dark border border-dark-border text-cream text-sm placeholder-cream/30 focus:border-gold focus:outline-none"
              />
              <input
                type="number"
                step="0.01"
                placeholder="Prix *"
                value={form.price || ""}
                onChange={(e) => setForm({ ...form, price: parseFloat(e.target.value) || 0 })}
                className="px-4 py-2 rounded-lg bg-dark border border-dark-border text-cream text-sm placeholder-cream/30 focus:border-gold focus:outline-none"
              />
              <select
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value as Product["category"] })}
                className="px-4 py-2 rounded-lg bg-dark border border-dark-border text-cream text-sm focus:border-gold focus:outline-none"
              >
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
              <select
                value={form.gamme}
                onChange={(e) => setForm({ ...form, gamme: e.target.value })}
                className="px-4 py-2 rounded-lg bg-dark border border-dark-border text-cream text-sm focus:border-gold focus:outline-none"
              >
                {gammes.map((g) => (
                  <option key={g.id} value={g.id}>{g.name}</option>
                ))}
              </select>
              <input
                type="number"
                placeholder="Stock"
                value={form.stock || ""}
                onChange={(e) => setForm({ ...form, stock: parseInt(e.target.value) || 0 })}
                className="px-4 py-2 rounded-lg bg-dark border border-dark-border text-cream text-sm placeholder-cream/30 focus:border-gold focus:outline-none"
              />
              <input
                placeholder="Ingrédients (séparés par des virgules)"
                onChange={(e) => setForm({ ...form, ingredients: e.target.value.split(",").map((s) => s.trim()).filter(Boolean) })}
                className="px-4 py-2 rounded-lg bg-dark border border-dark-border text-cream text-sm placeholder-cream/30 focus:border-gold focus:outline-none"
              />
              <textarea
                placeholder="Description *"
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                className="md:col-span-2 px-4 py-2 rounded-lg bg-dark border border-dark-border text-cream text-sm placeholder-cream/30 focus:border-gold focus:outline-none resize-none"
                rows={3}
              />
            </div>
            <button
              onClick={handleAdd}
              disabled={!form.name || !form.price}
              className="btn-gold mt-4 flex items-center gap-2 text-sm disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <Save className="w-4 h-4" /> Enregistrer
            </button>
          </div>
        )}

        {/* Products table */}
        <div className="bg-dark-card border border-dark-border rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-dark-border">
                  <th className="text-left px-4 py-3 text-xs text-cream/50 uppercase">Produit</th>
                  <th className="text-left px-4 py-3 text-xs text-cream/50 uppercase">Catégorie</th>
                  <th className="text-left px-4 py-3 text-xs text-cream/50 uppercase">Gamme</th>
                  <th className="text-left px-4 py-3 text-xs text-cream/50 uppercase">Prix</th>
                  <th className="text-left px-4 py-3 text-xs text-cream/50 uppercase">Stock</th>
                  <th className="text-right px-4 py-3 text-xs text-cream/50 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product.id} className="border-b border-dark-border/50">
                    {editing === product.id ? (
                      <>
                        <td className="px-4 py-3">
                          <input
                            value={editForm.name ?? product.name}
                            onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                            className="px-2 py-1 rounded bg-dark border border-dark-border text-cream text-sm w-full focus:border-gold focus:outline-none"
                          />
                        </td>
                        <td className="px-4 py-3 text-sm text-cream/70">
                          {categories.find((c) => c.id === product.category)?.name}
                        </td>
                        <td className="px-4 py-3 text-sm text-cream/70">
                          {gammes.find((g) => g.id === product.gamme)?.name}
                        </td>
                        <td className="px-4 py-3">
                          <input
                            type="number"
                            step="0.01"
                            value={editForm.price ?? product.price}
                            onChange={(e) => setEditForm({ ...editForm, price: parseFloat(e.target.value) })}
                            className="px-2 py-1 rounded bg-dark border border-dark-border text-cream text-sm w-20 focus:border-gold focus:outline-none"
                          />
                        </td>
                        <td className="px-4 py-3">
                          <input
                            type="number"
                            value={editForm.stock ?? product.stock}
                            onChange={(e) => setEditForm({ ...editForm, stock: parseInt(e.target.value) })}
                            className="px-2 py-1 rounded bg-dark border border-dark-border text-cream text-sm w-16 focus:border-gold focus:outline-none"
                          />
                        </td>
                        <td className="px-4 py-3 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <button onClick={() => handleUpdate(product.id)} className="text-green-400 hover:text-green-300">
                              <Save className="w-4 h-4" />
                            </button>
                            <button onClick={() => { setEditing(null); setEditForm({}); }} className="text-cream/40 hover:text-cream">
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </>
                    ) : (
                      <>
                        <td className="px-4 py-3 text-sm text-cream">{product.name}</td>
                        <td className="px-4 py-3 text-sm text-cream/70">
                          {categories.find((c) => c.id === product.category)?.name}
                        </td>
                        <td className="px-4 py-3 text-sm text-cream/70">
                          {gammes.find((g) => g.id === product.gamme)?.name}
                        </td>
                        <td className="px-4 py-3 text-sm text-gold font-bold">{product.price.toFixed(2)} &euro;</td>
                        <td className="px-4 py-3 text-sm text-cream/70">{product.stock}</td>
                        <td className="px-4 py-3 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() => { setEditing(product.id); setEditForm({}); }}
                              className="text-cream/40 hover:text-gold"
                            >
                              <Pencil className="w-4 h-4" />
                            </button>
                            {confirmDelete === product.id ? (
                              <div className="flex items-center gap-1">
                                <button onClick={() => handleDelete(product.id)} className="text-xs text-red-400 hover:text-red-300">Oui</button>
                                <button onClick={() => setConfirmDelete(null)} className="text-xs text-cream/40 hover:text-cream">Non</button>
                              </div>
                            ) : (
                              <button
                                onClick={() => setConfirmDelete(product.id)}
                                className="text-cream/40 hover:text-red-400"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            )}
                          </div>
                        </td>
                      </>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
