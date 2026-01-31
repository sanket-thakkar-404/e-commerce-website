import { Link } from "react-router-dom";
import { useWishlistStore } from "../store/useWishlistStore";
import { useCartStore } from "../store/useCartStore";

const WishList = () => {
  const { items, removeFromWishlist } = useWishlistStore();
  const addToCart = useCartStore((s) => s.addToCart);

  if (items.length === 0) {
    return (
      <div className="max-w-2xl mx-auto p-6 md:p-8 text-center">
        <div className="py-16">
          <i className="ri-heart-line text-6xl text-gray-300 dark:text-gray-600 mb-4 block"></i>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
            Your wishlist is empty
          </h2>
          <p className="text-gray-500 dark:text-gray-400 mb-6">
            Save items you like by adding them to your wishlist.
          </p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 font-medium hover:bg-gray-700 dark:hover:bg-gray-200"
          >
            <i className="ri-shopping-bag-line"></i>
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-4 md:p-8">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
        Wishlist
      </h1>
      <p className="text-gray-500 dark:text-gray-400 mb-6">
        {items.length} {items.length === 1 ? "item" : "items"} saved
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {items.map((item) => (
          <div
            key={item.productId}
            className="group rounded-xl overflow-hidden shadow-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 flex flex-col hover:shadow-lg transition-all"
          >
            <Link
              to={`/product/${item.productId}`}
              className="relative aspect-square p-4 flex items-center justify-center"
              style={{ backgroundColor: item.bgColor || "#f5f5f5" }}
            >
              {item.discount != null && (
                <span className="absolute top-3 right-3 bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded">
                  -{item.discount}%
                </span>
              )}
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-full object-contain"
              />
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  removeFromWishlist(item.productId);
                }}
                className="absolute top-3 left-3 w-10 h-10 rounded-full bg-white/90 dark:bg-gray-800/90 flex items-center justify-center text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors opacity-0 group-hover:opacity-100"
                aria-label="Remove from wishlist"
              >
                <i className="ri-heart-fill text-xl"></i>
              </button>
            </Link>
            <div className="p-4 flex-1 flex flex-col">
              <Link
                to={`/product/${item.productId}`}
                className="font-semibold text-gray-900 dark:text-gray-100 truncate block hover:underline"
              >
                {item.name}
              </Link>
              <p className="text-lg font-bold text-gray-900 dark:text-gray-100 mt-1">
                ₹{item.price}
              </p>
              <div className="flex gap-2 mt-3">
                <button
                  type="button"
                  onClick={() => addToCart({ ...item, id: item.productId })}
                  className="flex-1 py-2.5 rounded-lg bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 text-sm font-medium hover:bg-gray-700 dark:hover:bg-gray-200 transition-colors flex items-center justify-center gap-1.5"
                >
                  <i className="ri-shopping-cart-line"></i>
                  Add to Cart
                </button>
                <button
                  type="button"
                  onClick={() => removeFromWishlist(item.productId)}
                  className="p-2.5 rounded-lg border border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-400 hover:border-red-300 hover:text-red-500 dark:hover:text-red-400 transition-colors"
                  aria-label="Remove from wishlist"
                >
                  <i className="ri-delete-bin-line text-lg"></i>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WishList;
