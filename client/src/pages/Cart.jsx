import { Link } from "react-router-dom";
import { useState } from "react";
import {
  useCartStore,
  PLATFORM_FEE,
  DELIVERY_FEE,
  FREE_DELIVERY_MIN,
} from "../store/useCartStore";
import Coupons from "./Coupons";

const Cart = () => {
  const {
    items,
    appliedCoupon,
    couponError,
    applyCoupon,
    removeCoupon,
    removeFromCart,
    updateQuantity,
    getSubtotal,
    getDeliveryFee,
    getPlatformFee,
    getCouponDiscount,
    getTotal,
  } = useCartStore();

  const [couponCode, setCouponCode] = useState("");
  const [open, setOpen] = useState(false);

  const subtotal = getSubtotal();
  const deliveryFee = getDeliveryFee();
  const platformFee = getPlatformFee();
  const couponDiscount = getCouponDiscount();
  const total = getTotal();
  const showCouponSection = subtotal >= FREE_DELIVERY_MIN;

  const handleApplyCoupon = () => {
    applyCoupon(couponCode);
  };

  if (items.length === 0) {
    return (
      <div className="max-w-2xl mx-auto p-6 md:p-8 text-center">
        <div className="py-12">
          <i className="ri-shopping-cart-line text-6xl text-gray-300 dark:text-gray-600 mb-4 block"></i>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
            Your cart is empty
          </h2>
          <p className="text-gray-500 dark:text-gray-400 mb-6">
            Add items from the shop to get started.
          </p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 font-medium"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-4 md:p-8">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">
        Shopping Cart ({items.length} {items.length === 1 ? "item" : "items"})
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart items */}
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => (
            <div
              key={item.cartId}
              className="flex gap-4 p-4 rounded-xl bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700"
            >
              <div className="w-24 h-24 shrink-0 rounded-lg overflow-hidden bg-white dark:bg-gray-800">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="flex-1 min-w-0">
                <Link
                  to={`/product/${item.productId}`}
                  className="font-semibold text-gray-900 dark:text-gray-100 hover:underline truncate block"
                >
                  {item.name}
                </Link>
                <p className="text-gray-600 dark:text-gray-400 mt-0.5">
                  ₹{item.price}
                </p>
                <div className="flex items-center gap-2 mt-2">
                  <button
                    type="button"
                    onClick={() =>
                      updateQuantity(item.productId, item.quantity - 1)
                    }
                    className="w-8 h-8 rounded border border-gray-300 dark:border-gray-600 flex items-center justify-center"
                  >
                    <i className="ri-subtract-line text-sm"></i>
                  </button>
                  <span className="w-8 text-center text-sm font-medium">
                    {item.quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() =>
                      updateQuantity(item.productId, item.quantity + 1)
                    }
                    className="w-8 h-8 rounded border border-gray-300 dark:border-gray-600 flex items-center justify-center"
                  >
                    <i className="ri-add-line text-sm"></i>
                  </button>
                </div>
              </div>
              <div className="text-right shrink-0">
                <p className="font-bold text-gray-900 dark:text-gray-100">
                  ₹{item.price * item.quantity}
                </p>
                <button
                  type="button"
                  onClick={() => removeFromCart(item.productId)}
                  className="mt-2 text-sm text-red-600 dark:text-red-400 hover:underline"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Order summary */}
        <div className="lg:col-span-1">
          <div className="sticky top-4 p-6 rounded-xl bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 space-y-4">
            <h2 className="font-bold text-gray-900 dark:text-gray-100 text-lg">
              Order Summary
            </h2>

            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">
                  Subtotal
                </span>
                <span className="font-medium">₹{subtotal}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">
                  Platform fee
                </span>
                <span className="font-medium">₹{platformFee}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">
                  Delivery
                </span>
                <span className="font-medium">
                  {deliveryFee === 0 ? (
                    <span className="text-green-600 dark:text-green-400">
                      FREE
                    </span>
                  ) : (
                    `₹${deliveryFee}`
                  )}
                </span>
              </div>
              {subtotal < FREE_DELIVERY_MIN && (
                <p className="text-amber-600 dark:text-amber-400 text-xs">
                  Add ₹{FREE_DELIVERY_MIN - subtotal} more for free delivery
                </p>
              )}
              {/* {appliedCoupon && (
                <div className="flex justify-between text-green-600 dark:text-green-400">
                  <span>Coupon ({appliedCoupon.code})</span>
                  <span>
                    {appliedCoupon.type === "free_delivery"
                      ? "Free delivery"
                      : `-₹${couponDiscount}`}
                  </span>
                </div>
              )} */}
              {couponDiscount > 0 && (
                <div className="flex justify-between text-green-600 dark:text-green-400">
                  <span>Coupon discount</span>
                  <span>-₹{couponDiscount}</span>
                </div>
              )}
            </div>

            {/* Apply coupon - show when order >= 500 */}
            {showCouponSection && (
              <div  className="pt-2 border-t border-gray-200 dark:border-gray-600">
                <div onClick={() => setOpen(true)} className="h-12 flex items-center justify-between gap-2 cursor-pointer ">
                  <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Apply Coupon
                  </p>
                  <i className="ri-arrow-drop-right-line text-2xl"></i>
                </div>
                

                {appliedCoupon ? (
                  <div className="flex items-center justify-between py-2 px-3 rounded-lg bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 text-sm">
                    <span>{appliedCoupon.code} applied</span>
                    <button
                      type="button"
                      onClick={removeCoupon}
                      className="underline hover:no-underline"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      placeholder="e.g. FREEDEL"
                      className="flex-1 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-gray-400"
                    />
                    <button
                      type="button"
                      onClick={handleApplyCoupon}
                      className="px-4 py-2 rounded-lg bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 text-sm font-medium hover:bg-gray-700 dark:hover:bg-gray-200"
                    >
                      Apply
                    </button>
                  </div>
                )}
                {couponError && (
                  <p className="text-red-600 dark:text-red-400 text-xs mt-1">
                    {couponError}
                  </p>
                )}
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                  FREEDEL: Free delivery • SAVE50: ₹50 off on ₹999+
                </p>
              </div>
            )}
            {open && (
                  <div
                   
                    className="flex fixed items-center justify-center inset-0 bg-black/40 backdrop-blur-sm z-40 overflow-auto"
                  >
                     
                <button onClick={()=> setOpen(false)} className="bg-red-500 text-xl absolute top-10 p-3 rounded-lg right-120">X</button>
                     <Coupons/>
                     </div>
                )}

            <div className="pt-4 border-t border-gray-200 dark:border-gray-600 flex justify-between text-lg font-bold">
              <span>Total</span>
              <span>₹{total}</span>
            </div>

            <Link
              to="/checkout-address"
              className="block w-full py-3 rounded-xl bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 font-semibold text-center hover:bg-gray-700 dark:hover:bg-gray-200 transition-colors"
            >
              Proceed to Payment
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
