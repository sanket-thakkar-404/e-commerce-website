import { useState } from "react";
import { Link } from "react-router-dom";
import { useAdminStore } from "../store/useAdminStore";
import {
  products,
  menClothes,
  womenClothes,
} from "../config/productsData";

const CATEGORIES = [
  { value: "leather", label: "Leather Bags" },
  { value: "men", label: "Men's Collection" },
  { value: "women", label: "Women's Collection" },
];

const defaultForm = {
  name: "",
  price: "",
  image: "",
  discount: "",
  bgColor: "#f5f5f5",
  category: "leather",
};

const Admin = () => {
  const { adminProducts, addProduct, removeProduct, deleteAll } = useAdminStore();
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(defaultForm);

  const staticProducts = [
    ...products.map((p) => ({ ...p, category: "leather", isAdmin: false })),
    ...menClothes.map((p) => ({ ...p, category: "men", isAdmin: false })),
    ...womenClothes.map((p) => ({ ...p, category: "women", isAdmin: false })),
  ];
  const adminList = adminProducts.map((p) => ({ ...p, isAdmin: true }));
  const allProducts = [...staticProducts, ...adminList];

  const handleSubmit = (e) => {
    e.preventDefault();
    const price = Number(form.price) || 0;
    const discount = form.discount === "" ? null : Number(form.discount);
    addProduct({
      name: form.name.trim(),
      price,
      image: form.image.trim() || "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400&h=400&fit=crop",
      discount,
      bgColor: form.bgColor.trim() || "#f5f5f5",
      category: form.category,
    });
    setForm(defaultForm);
    setShowForm(false);
  };

  const handleDeleteAll = () => {
    if (window.confirm("Delete all products you added? This cannot be undone.")) {
      deleteAll();
    }
  };

  return (
    <div className="flex min-h-[calc(100vh-3.5rem)]">
      {/* Left Sidebar - image jaisa: All Products, Create New Product, Delete All */}
      <aside className="w-56 shrink-0 border-r border-gray-200 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-900/50 p-6 hidden lg:block">
        <div className="space-y-3">
          <div className="flex items-center justify-between gap-2 flex-wrap">
            <span className="font-semibold text-gray-900 dark:text-gray-100">
              All Products
            </span>
            {adminProducts.length > 0 && (
              <button
                type="button"
                onClick={handleDeleteAll}
                className="text-sm text-red-600 dark:text-red-400 hover:underline"
              >
                Delete All
              </button>
            )}
          </div>
          <button
            type="button"
            onClick={() => setShowForm(true)}
            className="w-full text-left px-3 py-2.5 rounded-lg font-medium text-gray-900 dark:text-gray-100 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors flex items-center gap-2 border border-gray-300 dark:border-gray-600"
          >
            <i className="ri-add-line text-lg"></i>
            Create New Product
          </button>
        </div>
      </aside>

      {/* Main - Admin Panel title + product grid (home jaisa cards) */}
      <main className="flex-1 p-6 md:p-8 overflow-auto">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">
          Admin Panel.
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {allProducts.map((p) => (
            <div
              key={`${p.id}-${p.isAdmin}`}
              className="rounded-xl overflow-hidden shadow-md flex flex-col transition-transform duration-200 hover:scale-[1.02]"
              style={{ backgroundColor: p.bgColor || "#f5f5f5" }}
            >
              <div className="relative aspect-square p-4 flex items-center justify-center">
                {p.discount != null && (
                  <span className="absolute top-3 right-3 bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded">
                    -{p.discount}%
                  </span>
                )}
                <img
                  src={p.image}
                  alt={p.name}
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="p-4 bg-white/90 dark:bg-gray-900/90 flex-1 flex flex-col justify-between">
                <p className="font-semibold text-gray-900 dark:text-gray-100 truncate">
                  {p.name}
                </p>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-lg font-bold text-gray-900 dark:text-gray-100">
                    ₹{p.price}
                  </span>
                  {p.isAdmin ? (
                    <button
                      type="button"
                      onClick={() => removeProduct(p.id)}
                      className="w-10 h-10 rounded-full bg-red-500 text-white flex items-center justify-center hover:bg-red-600 transition-colors"
                      aria-label="Remove product"
                    >
                      <i className="ri-delete-bin-line text-xl"></i>
                    </button>
                  ) : (
                    <span className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-gray-400 text-xs">
                      –
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Create New Product - Modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto p-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              Create New Product
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Product Name
                </label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="e.g. Classic Bag"
                  className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-3 py-2 text-gray-900 dark:text-gray-100 outline-none focus:ring-2 focus:ring-green-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Category
                </label>
                <select
                  value={form.category}
                  onChange={(e) => setForm({ ...form, category: e.target.value })}
                  className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-3 py-2 text-gray-900 dark:text-gray-100 outline-none focus:ring-2 focus:ring-green-500"
                >
                  {CATEGORIES.map((c) => (
                    <option key={c.value} value={c.value}>
                      {c.label}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Price (₹)
                </label>
                <input
                  type="number"
                  min="0"
                  value={form.price}
                  onChange={(e) => setForm({ ...form, price: e.target.value })}
                  placeholder="999"
                  className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-3 py-2 text-gray-900 dark:text-gray-100 outline-none focus:ring-2 focus:ring-green-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Image URL
                </label>
                <input
                  type="url"
                  value={form.image}
                  onChange={(e) => setForm({ ...form, image: e.target.value })}
                  placeholder="https://..."
                  className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-3 py-2 text-gray-900 dark:text-gray-100 outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Discount % (optional)
                </label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={form.discount}
                  onChange={(e) => setForm({ ...form, discount: e.target.value })}
                  placeholder="e.g. 25"
                  className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-3 py-2 text-gray-900 dark:text-gray-100 outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Card background color
                </label>
                <input
                  type="text"
                  value={form.bgColor}
                  onChange={(e) => setForm({ ...form, bgColor: e.target.value })}
                  placeholder="#f5f5f5"
                  className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-3 py-2 text-gray-900 dark:text-gray-100 outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
              <div className="flex gap-3 pt-2">
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-green-600 text-white font-medium hover:bg-green-700"
                >
                  Add Product
                </button>
                <button
                  type="button"
                  onClick={() => { setShowForm(false); setForm(defaultForm); }}
                  className="px-5 py-2.5 rounded-xl border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100 font-medium"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Admin;
