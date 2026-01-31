import { useState, useMemo } from "react";
import ProductCard from "./ProductCard";

const SORT_OPTIONS = ["Popular", "Price: Low to High", "Price: High to Low", "Newest"];
const DEFAULT_CATEGORY_FILTERS = [
  { key: "all", label: "All Products" },
  { key: "new", label: "New Collection" },
  { key: "discounted", label: "Discounted Products" },
];

// // For Categories page: Men's, Women's, Leather
// export const CATEGORY_PAGE_FILTERS = [
//   { key: "all", label: "All" },
//   { key: "men", label: "Men's" },
//   { key: "women", label: "Women's" },
//   { key: "leather", label: "Leather Bags" },
// ];

const CollectionLayout = ({ products = [], title, onAddToCart, categoryFilters: customCategoryFilters }) => {
  const [sortBy, setSortBy] = useState("Popular");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [availabilityFilter, setAvailabilityFilter] = useState(false);
  const [discountFilter, setDiscountFilter] = useState(false);

  const categoryFilters = customCategoryFilters ?? DEFAULT_CATEGORY_FILTERS;
  const isCategoryPageFilters = customCategoryFilters != null;

  const filteredAndSortedProducts = useMemo(() => {
    let list = [...products];

    // Category page: filter by Men's / Women's / Leather
    if (isCategoryPageFilters && categoryFilter !== "all") {
      list = list.filter((p) => p.category === categoryFilter);
    }
    // Default filters
    if (!isCategoryPageFilters) {
      if (categoryFilter === "discounted") {
        list = list.filter((p) => p.discount != null);
      }
      if (categoryFilter === "new") {
        list = list.slice(0, 4);
      }
    }
    if (discountFilter) {
      list = list.filter((p) => p.discount != null);
    }

    if (sortBy === "Price: Low to High") {
      list.sort((a, b) => a.price - b.price);
    } else if (sortBy === "Price: High to Low") {
      list.sort((a, b) => b.price - a.price);
    } else if (sortBy === "Newest") {
      list = [...list].reverse();
    }

    return list;
  }, [products, sortBy, categoryFilter, availabilityFilter, discountFilter, isCategoryPageFilters]);

  return (
    <div className="flex min-h-[calc(100vh-3.5rem)]">
      {/* Left Sidebar */}
      <aside className="w-56 shrink-0 border-r border-gray-200 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-900/50 p-6 hidden lg:block">
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Sort by:
            </label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-gray-400"
            >
              {SORT_OPTIONS.map((opt) => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
          </div>

          <div>
            <div className="space-y-1">
              {categoryFilters.map(({ key, label }) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => setCategoryFilter(key)}
                  className={`block w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                    categoryFilter === key
                      ? "bg-gray-200 dark:bg-gray-700 font-medium text-gray-900 dark:text-gray-100"
                      : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
              Filter by:
            </h3>
            <label className="flex items-center gap-2 cursor-pointer mb-2">
              <input
                type="checkbox"
                checked={availabilityFilter}
                onChange={(e) => setAvailabilityFilter(e.target.checked)}
                className="rounded border-gray-300 dark:border-gray-600"
              />
              <span className="text-sm text-gray-600 dark:text-gray-400">Availability</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={discountFilter}
                onChange={(e) => setDiscountFilter(e.target.checked)}
                className="rounded border-gray-300 dark:border-gray-600"
              />
              <span className="text-sm text-gray-600 dark:text-gray-400">Discount</span>
            </label>
          </div>
        </div>
      </aside>

      <main className="flex-1 p-6 md:p-8 overflow-auto ">
        {title && (
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">
            {title}
          </h1>
        )}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredAndSortedProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={onAddToCart}
            />
          ))}
        </div>
        {filteredAndSortedProducts.length === 0 && (
          <p className="text-center text-gray-500 dark:text-gray-400 py-12">
            No products match your filters.
          </p>
        )}
      </main>
    </div>
  );
};

export default CollectionLayout;
