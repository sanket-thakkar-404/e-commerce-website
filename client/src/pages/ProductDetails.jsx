import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { getProductByIdWithAdmin } from "../config/productsData";
import { getProductDetails } from "../config/productDetailsData";
import { useCartStore } from "../store/useCartStore";
import { useWishlistStore } from "../store/useWishlistStore";
import { useAdminStore } from "../store/useAdminStore";

const StarRating = ({ rating }) => {
  const full = Math.floor(rating);
  const half = rating % 1 >= 0.5;
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <i
          key={i}
          className={`text-lg ${
            i <= full ? "ri-star-fill text-amber-400" : i === full + 1 && half ? "ri-star-half-fill text-amber-400" : "ri-star-line text-gray-300"
          }`}
        />
      ))}
    </div>
  );
};

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const adminProducts = useAdminStore((s) => s.adminProducts);
  const product = getProductByIdWithAdmin(id, adminProducts);
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [quantity, setQuantity] = useState(1);

  if (!product) {
    return (
      <div className="p-8 text-center">
        <p className="text-gray-500 dark:text-gray-400 mb-4">Product not found.</p>
        <button
          type="button"
          onClick={() => navigate("/")}
          className="text-gray-900 dark:text-gray-100 underline"
        >
          Back to Home
        </button>
      </div>
    );
  }

  const addToCart = useCartStore((s) => s.addToCart);
  const { isInWishlist, toggleWishlist } = useWishlistStore();
  const details = getProductDetails(product.id, product.category);
  const { name, price, image, discount, bgColor } = product;
  const { description, fabric, colors, sizes, rating, reviewCount, reviews } = details;
  const inWishlist = isInWishlist(product.id);

  const handleAddToCart = () => {
    addToCart(product, quantity);
  };

  const handleBuyNow = () => {
    addToCart(product, quantity);
    navigate("/checkout");
  };

  const handleWishlist = () => {
    toggleWishlist(product);
  };

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-8">
      <button
        type="button"
        onClick={() => navigate(-1)}
        className="flex items-center gap-1 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 mb-6"
      >
        <i className="ri-arrow-left-line"></i> Back
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
        {/* Image */}
        <div
          className="rounded-2xl overflow-hidden aspect-square flex items-center justify-center"
          style={{ backgroundColor: bgColor || "#f5f5f5" }}
        >
          <img src={image} alt={name} className="w-full h-full object-contain p-4" />
        </div>

        {/* Info */}
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
            {name}
          </h1>

          <div className="flex items-center gap-3 mb-4">
            <StarRating rating={rating} />
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {rating} ({reviewCount} reviews)
            </span>
          </div>

          <div className="flex items-center gap-3 mb-6">
            <span className="text-2xl font-bold text-gray-900 dark:text-gray-100">₹{price}</span>
            {discount != null && (
              <span className="bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 text-sm font-semibold px-2 py-0.5 rounded">
                -{discount}% off
              </span>
            )}
          </div>

          <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">{description}</p>

          {/* Product details */}
          <div className="space-y-4 mb-6 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl">
            <h3 className="font-semibold text-gray-900 dark:text-gray-100">Product Details</h3>
            <dl className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
              <div>
                <dt className="text-gray-500 dark:text-gray-400">Fabric</dt>
                <dd className="font-medium text-gray-900 dark:text-gray-100">{fabric}</dd>
              </div>
              <div>
                <dt className="text-gray-500 dark:text-gray-400">Color</dt>
                <dd className="font-medium text-gray-900 dark:text-gray-100">
                  {colors.join(", ")}
                </dd>
              </div>
              <div>
                <dt className="text-gray-500 dark:text-gray-400">Size</dt>
                <dd className="font-medium text-gray-900 dark:text-gray-100">
                  {sizes.join(", ")}
                </dd>
              </div>
            </dl>
          </div>

          {/* Color */}
          <div className="mb-4">
            <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Color</p>
            <div className="flex flex-wrap gap-2">
              {colors.map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setSelectedColor(c)}
                  className={`px-4 py-2 rounded-lg border text-sm transition-colors ${
                    selectedColor === c
                      ? "border-gray-900 dark:border-gray-100 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900"
                      : "border-gray-300 dark:border-gray-600 hover:border-gray-500"
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          {/* Size */}
          <div className="mb-4">
            <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Size</p>
            <div className="flex flex-wrap gap-2">
              {sizes.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setSelectedSize(s)}
                  className={`px-4 py-2 rounded-lg border text-sm transition-colors ${
                    selectedSize === s
                      ? "border-gray-900 dark:border-gray-100 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900"
                      : "border-gray-300 dark:border-gray-600 hover:border-gray-500"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity */}
          <div className="mb-6">
            <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Quantity</p>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="w-10 h-10 rounded-lg border border-gray-300 dark:border-gray-600 flex items-center justify-center"
              >
                <i className="ri-subtract-line"></i>
              </button>
              <span className="w-12 text-center font-medium">{quantity}</span>
              <button
                type="button"
                onClick={() => setQuantity((q) => q + 1)}
                className="w-10 h-10 rounded-lg border border-gray-300 dark:border-gray-600 flex items-center justify-center"
              >
                <i className="ri-add-line"></i>
              </button>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-wrap gap-3 items-center">
            <button
              type="button"
              onClick={handleAddToCart}
              className="flex-1 min-w-[140px] px-6 py-3 rounded-xl border-2 border-gray-900 dark:border-gray-100 text-gray-900 dark:text-gray-100 font-semibold hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors flex items-center justify-center gap-2"
            >
              <i className="ri-shopping-cart-line"></i> Add to Cart
            </button>
            <button
              type="button"
              onClick={handleBuyNow}
              className="flex-1 min-w-[140px] px-6 py-3 rounded-xl bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 font-semibold hover:bg-gray-700 dark:hover:bg-gray-200 transition-colors flex items-center justify-center gap-2"
            >
              <i className="ri-shopping-bag-line"></i> Buy Now
            </button>
            <button
              type="button"
              onClick={handleWishlist}
              className={`w-12 h-12 shrink-0 rounded-xl border-2 flex items-center justify-center transition-colors ${
                inWishlist
                  ? "border-red-500 bg-red-50 dark:bg-red-900/20 text-red-500 dark:text-red-400"
                  : "border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-400 hover:border-red-300 hover:text-red-500 dark:hover:text-red-400"
              }`}
              aria-label={inWishlist ? "Remove from wishlist" : "Add to wishlist"}
            >
              <i className={inWishlist ? "ri-heart-fill text-xl" : "ri-heart-line text-xl"}></i>
            </button>
          </div>
        </div>
      </div>

      {/* Reviews */}
      <section className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
        <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">Customer Reviews</h2>
        <div className="space-y-4">
          {reviews.map((rev, i) => (
            <div
              key={i}
              className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium text-gray-900 dark:text-gray-100">{rev.user}</span>
                <div className="flex items-center gap-2">
                  <StarRating rating={rev.rating} />
                  <span className="text-xs text-gray-500 dark:text-gray-400">{rev.date}</span>
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-300 text-sm">{rev.text}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default ProductDetails;
