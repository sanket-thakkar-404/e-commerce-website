// Product details (description, rating, fabric, color, size, reviews) by product id
// Fallback by category: leather, men, women

const defaultDetails = {
  leather: {
    description: "Premium quality product with durable construction. Perfect for everyday use.",
    fabric: "Leather / Synthetic",
    colors: ["Brown", "Black", "Tan", "Navy"],
    sizes: ["One Size", "Medium", "Large"],
    rating: 4.3,
    reviewCount: 128,
  },
  men: {
    description: "Comfortable and stylish. Made with quality materials for long-lasting wear.",
    fabric: "Cotton Blend",
    colors: ["White", "Black", "Navy", "Grey", "Beige"],
    sizes: ["S", "M", "L", "XL"],
    rating: 4.5,
    reviewCount: 89,
  },
  women: {
    description: "Elegant design with a perfect fit. Ideal for casual and semi-formal occasions.",
    fabric: "Polyester / Cotton",
    colors: ["Pink", "White", "Black", "Blue", "Cream"],
    sizes: ["S", "M", "L", "XL"],
    rating: 4.4,
    reviewCount: 156,
  },
};

const reviewsByCategory = {
  leather: [
    { user: "Rahul K.", rating: 5, text: "Great quality and looks exactly as shown. Very satisfied!", date: "2 days ago" },
    { user: "Priya S.", rating: 4, text: "Good product. Delivery was fast. Minor stitching issue but overall fine.", date: "1 week ago" },
    { user: "Amit V.", rating: 5, text: "Best purchase this month. Sturdy and stylish.", date: "2 weeks ago" },
  ],
  men: [
    { user: "Vikram R.", rating: 5, text: "Perfect fit and fabric. Will buy again.", date: "3 days ago" },
    { user: "Neha M.", rating: 4, text: "Good quality. Shrunk slightly after first wash.", date: "1 week ago" },
    { user: "Karan P.", rating: 5, text: "Exactly as described. Comfortable for all-day wear.", date: "10 days ago" },
  ],
  women: [
    { user: "Anjali D.", rating: 5, text: "Love it! Fabric is soft and the fit is perfect.", date: "1 day ago" },
    { user: "Sneha L.", rating: 4, text: "Beautiful design. Sizing runs a bit small.", date: "5 days ago" },
    { user: "Divya K.", rating: 5, text: "Worth every rupee. Great for office wear.", date: "2 weeks ago" },
  ],
};

// Override specific product details (optional)
const detailsOverrides = {
  1: { description: "Classic duffel in genuine leather. Spacious main compartment, multiple pockets. Ideal for travel and daily carry.", fabric: "Genuine Leather", colors: ["Brown", "Black", "Tan"] },
  4: { description: "Trendy pink backpack with laptop sleeve. Lightweight and water-resistant.", fabric: "Polyester", colors: ["Pink", "Lavender", "White"] },
  101: { description: "Crisp Oxford shirt in premium cotton. Ideal for formal and semi-formal occasions.", fabric: "100% Cotton", colors: ["White", "Light Blue", "Pink"] },
  201: { description: "Elegant floral midi dress. Breathable fabric, flattering fit. Perfect for brunch or parties.", fabric: "Cotton Blend", colors: ["Floral", "Navy", "Black"] },
};

export function getProductDetails(productId, category) {
  const cat = category || "leather";
  const base = defaultDetails[cat] || defaultDetails.leather;
  const reviews = reviewsByCategory[cat] || reviewsByCategory.leather;
  const override = detailsOverrides[productId];
  return {
    description: override?.description ?? base.description,
    fabric: override?.fabric ?? base.fabric,
    colors: override?.colors ?? base.colors,
    sizes: base.sizes,
    rating: base.rating,
    reviewCount: base.reviewCount,
    reviews,
  };
}
