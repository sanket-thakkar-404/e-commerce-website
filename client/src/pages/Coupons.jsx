import { useState } from "react";
import { Link } from "react-router-dom";
import { AVAILABLE_COUPONS } from "../config/couponsConfig";

const Coupons = () => {
  const [copiedCode, setCopiedCode] = useState(null);

  const copyCode = (code) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const getDiscountText = (c) => {
    if (c.type === "free_delivery") return "Free Delivery";
    if (c.type === "percent") return `${c.discount}% Off`;
    return `₹${c.discount} Off`;
  };

  return (
    <div className="max-w-3xl mx-auto p-4 md:p-8">
      <Link
        to="/profile"
        className="inline-flex items-center gap-1 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 mb-6"
      >
        <i className="ri-arrow-left-line"></i> Back to Profile
      </Link>

      <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
        Available Coupons
      </h1>
      <p className="text-gray-500 dark:text-gray-400 mb-6">
        Copy a coupon code and apply it at checkout to get the discount.
      </p>

      <div className="space-y-4">
        {AVAILABLE_COUPONS.map((coupon) => (
          <div
            key={coupon.code}
            className="rounded-2xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 overflow-hidden hover:border-green-500 dark:hover:border-green-500 transition-colors"
          >
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 p-5">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap mb-1">
                  <span className="inline-block px-3 py-1 rounded-full bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 font-semibold text-sm">
                    {getDiscountText(coupon)}
                  </span>
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    {coupon.validity}
                  </span>
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-gray-100">
                  {coupon.label}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-0.5">
                  {coupon.description}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                  Min order ₹{coupon.minOrder.toLocaleString()}
                  {coupon.maxDiscount != null && ` · Max discount ₹${coupon.maxDiscount}`}
                </p>
                <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                  {coupon.terms}
                </p>
              </div>
              <div className="flex items-center gap-3 shrink-0">
                <div className="font-mono font-bold text-gray-900 dark:text-gray-100 bg-gray-100 dark:bg-gray-800 px-4 py-2 rounded-lg border border-dashed border-gray-300 dark:border-gray-600">
                  {coupon.code}
                </div>
                <button
                  type="button"
                  onClick={() => copyCode(coupon.code)}
                  className="px-4 py-2.5 rounded-xl bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 font-medium hover:bg-gray-700 dark:hover:bg-gray-200 transition-colors flex items-center gap-2 whitespace-nowrap"
                >
                  {copiedCode === coupon.code ? (
                    <>
                      <i className="ri-check-line text-lg"></i> Copied!
                    </>
                  ) : (
                    <>
                      <i className="ri-file-copy-line text-lg"></i> Copy
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <p className="text-sm text-gray-500 dark:text-gray-400 mt-6 text-center">
        Apply these codes on the cart page when your order meets the minimum value.
      </p>
      <div className="text-center mt-3">
        <Link
          to="/cart"
          className="inline-flex items-center gap-2 text-green-600 dark:text-green-400 font-medium hover:underline"
        >
          <i className="ri-shopping-cart-line"></i> Go to Cart
        </Link>
      </div>
    </div>
  );
};

export default Coupons;
