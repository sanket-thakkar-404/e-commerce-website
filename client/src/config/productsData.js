export const products = [
  { id: 1, name: "Clinge Bag", price: 1200, image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400&h=400&fit=crop", discount: null, bgColor: "#c4a484" },
  { id: 2, name: "Backpack", price: 1100, image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop", discount: null, bgColor: "#a8c5e0" },
  { id: 3, name: "Multipurpose", price: 100, image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=400&h=400&fit=crop", discount: null, bgColor: "#d4b896" },
  { id: 4, name: "Pink Attack", price: 1400, image: "https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?w=400&h=400&fit=crop", discount: 25, bgColor: "#f0c8d0" },
  { id: 5, name: "The Stud", price: 1100, image: "https://images.unsplash.com/photo-1577733960693-5e0aadcb6f6b?w=400&h=400&fit=crop", discount: null, bgColor: "#e5e5e5" },
  { id: 6, name: "Surprise", price: 1100, image: "https://images.unsplash.com/photo-1591561954557-26941169b49e?w=400&h=400&fit=crop", discount: null, bgColor: "#f5f0d8" },
  { id: 7, name: "Supreme", price: 1800, image: "https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?w=400&h=400&fit=crop&sat=-20", discount: null, bgColor: "#d8d8d8" },
  { id: 8, name: "The Daily", price: 100, image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=400&h=400&fit=crop&brightness=1.1", discount: null, bgColor: "#e8e8e8" },
];

// Men's clothing collection
export const menClothes = [
  { id: 101, name: "Classic Oxford Shirt", price: 1899, image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400&h=400&fit=crop", discount: null, bgColor: "#e8e4df" },
  { id: 102, name: "Slim Fit T-Shirt", price: 799, image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop", discount: 15, bgColor: "#d1d5db" },
  { id: 103, name: "Denim Jacket", price: 2499, image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&h=400&fit=crop", discount: null, bgColor: "#b8c4d4" },
  { id: 104, name: "Chino Trousers", price: 1699, image: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=400&h=400&fit=crop", discount: null, bgColor: "#c9b896" },
  { id: 105, name: "Polo Neck Sweater", price: 2199, image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=400&h=400&fit=crop", discount: 20, bgColor: "#4a5568" },
  { id: 106, name: "Casual Blazer", price: 3499, image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=400&h=400&fit=crop", discount: null, bgColor: "#2d3748" },
  { id: 107, name: "Linen Shirt", price: 1399, image: "https://images.unsplash.com/photo-1598033129183-c4f50c736f10?w=400&h=400&fit=crop", discount: null, bgColor: "#e2d5c4" },
  { id: 108, name: "Jogger Pants", price: 1299, image: "https://images.unsplash.com/photo-1552902865-b72c031ac5ea?w=400&h=400&fit=crop", discount: null, bgColor: "#1a202c" },
];

// Women's clothing collection
export const womenClothes = [
  { id: 201, name: "Floral Midi Dress", price: 2299, image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400&h=400&fit=crop", discount: 25, bgColor: "#fce7f3" },
  { id: 202, name: "Crop Top", price: 899, image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400&h=400&fit=crop", discount: null, bgColor: "#fef3c7" },
  { id: 203, name: "High-Waist Jeans", price: 1999, image: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=400&h=400&fit=crop", discount: null, bgColor: "#c4b5fd" },
  { id: 204, name: "Knit Cardigan", price: 1899, image: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=400&h=400&fit=crop", discount: null, bgColor: "#d6d3e0" },
  { id: 205, name: "Silk Blouse", price: 2599, image: "https://images.unsplash.com/photo-1564257631407-2f31d66d306f?w=400&h=400&fit=crop", discount: 15, bgColor: "#f5f0e6" },
  { id: 206, name: "Wrap Skirt", price: 1499, image: "https://images.unsplash.com/photo-1583496661160-fb5886a01j8?w=400&h=400&fit=crop", discount: null, bgColor: "#e8e0d5" },
  { id: 207, name: "Off-Shoulder Top", price: 1199, image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400&h=400&fit=crop&sat=10", discount: null, bgColor: "#fdf2f8" },
  { id: 208, name: "Tailored Trousers", price: 1799, image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=400&h=400&fit=crop", discount: null, bgColor: "#e5e7eb" },
];

// All categories combined (for Categories page) - with category for filtering
export const allCategoriesProducts = [
  ...products.map((p) => ({ ...p, category: "leather" })),
  ...menClothes.map((p) => ({ ...p, category: "men" })),
  ...womenClothes.map((p) => ({ ...p, category: "women" })),
];

// Get product by id from any category (static only)
export function getProductById(id) {
  const numId = Number(id);
  const p = products.find((x) => x.id === numId);
  if (p) return { ...p, category: "leather" };
  const m = menClothes.find((x) => x.id === numId);
  if (m) return { ...m, category: "men" };
  const w = womenClothes.find((x) => x.id === numId);
  if (w) return { ...w, category: "women" };
  return null;
}

// Get product by id including admin-added products (pass adminProducts from useAdminStore)
export function getProductByIdWithAdmin(id, adminProducts = []) {
  const staticProduct = getProductById(id);
  if (staticProduct) return staticProduct;
  const numId = Number(id);
  const adminProduct = adminProducts.find((p) => p.id === numId);
  return adminProduct ? { ...adminProduct } : null;
}
