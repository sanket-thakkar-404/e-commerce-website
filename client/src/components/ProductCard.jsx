import { useState } from "react";
import { Link } from "react-router-dom";
import { useCartStore } from "../store/useCartStore";
import { useWishlistStore } from "../store/useWishlistStore";

const ProductCard = ({ product, onAddToCart }) => {
  const addToCart = useCartStore((s) => s.addToCart);
  const { isInWishlist, toggleWishlist } = useWishlistStore();
  const [showQty, setShowQty] = useState(false);
  const [hover, setHover] = useState(false);
  const { id, name, price, image, discount, bgColor } = product;
  const inWishlist = isInWishlist(id);

  

  const [qty, setQty] = useState(1);
  const increase = () => {
    setQty((prev) => prev + 1);
  };
  const decrease = () => {
    setQty((prev) => (prev > 1 ? prev - 1 : 1));
  };

  const handleAddToCart = (e) => {
    e.preventDefault();
    addToCart(product);
    onAddToCart?.(product);
  };

  return (
    <div
      className="rounded-xl overflow-hidden shadow-md transition-transform duration-200 hover:scale-[1.02] flex flex-col"
      style={{ backgroundColor: bgColor || "#f5f5f5" }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <Link
        to={`/product/${id}`}
        className="relative aspect-square p-4 flex items-center justify-center"
      >
        {discount != null && (
          <span className="absolute top-3 right-3 bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded">
            -{discount}%
          </span>
        )}
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            toggleWishlist(product);
          }}
          className="absolute top-3 left-3 w-9 h-9 rounded-full bg-white/90 dark:bg-gray-800/90 flex items-center justify-center text-gray-600 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-400 transition-colors"
          aria-label={inWishlist ? "Remove from wishlist" : "Add to wishlist"}
        >
          <i
            className={
              inWishlist ? "ri-heart-fill text-lg" : "ri-heart-line text-lg"
            }
          ></i>
        </button>
        <img src={image} alt={name} className="w-full h-full object-contain" />
      </Link>
      <div className="p-4 bg-white/90 dark:bg-gray-900/90 flex-1 flex flex-col justify-between">
        <Link
          to={`/product/${id}`}
          className="font-semibold text-gray-900 dark:text-gray-100 truncate block hover:underline"
        >
          {name}
        </Link>
        <div className="flex items-center justify-between mt-2 ">
          <span className="text-lg font-bold text-gray-900 dark:text-gray-100">
            ₹{price}
          </span>

          {showQty ? (
            <div className="flex gap-3 items-center">
              <button onClick={decrease}>-</button>

              <input
                type="number"
                className="w-10 text-center"
                value={qty}
                readOnly
              />

              <button onClick={increase}>+</button>
            </div>
          ) : (
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                addToCart({ ...product, qty });
                setShowQty(true);
              }}
              className="w-10 h-10 rounded-full bg-gray-900 text-white flex items-center justify-center"
            >
              <i className="ri-add-line text-xl"></i>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
