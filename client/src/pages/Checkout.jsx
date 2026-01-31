import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useCartStore } from "../store/useCartStore";

const PAYMENT_METHODS = [
  { id: "cod", name: "Cash on Delivery", icon: "ri-bank-card-line", desc: "Pay when you receive" },
  { id: "card", name: "Credit / Debit Card", icon: "ri-bank-card-2-line", desc: "Visa, Mastercard, RuPay" },
  { id: "netbanking", name: "Net Banking", icon: "ri-building-line", desc: "All major banks" },
  { id: "upi", name: "UPI", icon: "ri-smartphone-line", desc: "GPay, PhonePe, Paytm" },
  { id: "wallet", name: "Wallet", icon: "ri-wallet-3-line", desc: "Paytm, Amazon Pay, etc." },
];

const Checkout = () => {
  const navigate = useNavigate();
  const { items, getSubtotal, getDeliveryFee, getPlatformFee, getCouponDiscount, getTotal, appliedCoupon, clearCart } = useCartStore();
  const [paymentMethod, setPaymentMethod] = useState("cod");

  const subtotal = getSubtotal();
  const deliveryFee = getDeliveryFee();
  const platformFee = getPlatformFee();
  const couponDiscount = getCouponDiscount();
  const total = getTotal();

  const handlePlaceOrder = () => {
    const orderId = `ORD-${Date.now().toString(36).toUpperCase()}`;
    const orderData = { orderId, total, date: new Date().toISOString() };
    try {
      localStorage.setItem("shop_recent_order", JSON.stringify(orderData));
    } catch (_) {}
    console.log("Place order", { paymentMethod, total, orderId });
    clearCart();
    navigate("/order-confirmed", { state: { orderId, total } });
  };

  if (items.length === 0) {
    return (
      <div className="max-w-2xl mx-auto p-6 text-center">
        <p className="text-gray-500 dark:text-gray-400 mb-4">Your cart is empty.</p>
        <Link to="/cart" className="text-gray-900 dark:text-gray-100 underline">
          Go to Cart
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8">
      <Link
        to="/cart"
        className="inline-flex items-center gap-1 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 mb-6"
      >
        <i className="ri-arrow-left-line"></i> Back to Cart
      </Link>

      <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">
        Payment
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Payment methods */}
        <div className="lg:col-span-2 space-y-4">
          <h2 className="font-semibold text-gray-900 dark:text-gray-100 text-lg mb-4">
            Select Payment Method
          </h2>
          {PAYMENT_METHODS.map((method) => (
            <label
              key={method.id}
              className={`flex items-start gap-4 p-4 rounded-xl border-2 cursor-pointer transition-colors ${
                paymentMethod === method.id
                  ? "border-gray-900 dark:border-gray-100 bg-gray-50 dark:bg-gray-800/50"
                  : "border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600"
              }`}
            >
              <input
                type="radio"
                name="payment"
                value={method.id}
                checked={paymentMethod === method.id}
                onChange={() => setPaymentMethod(method.id)}
                className="mt-1"
              />
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <i className={`${method.icon} text-xl text-gray-600 dark:text-gray-400`}></i>
                  <span className="font-medium text-gray-900 dark:text-gray-100">
                    {method.name}
                  </span>
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
                  {method.desc}
                </p>
              </div>
            </label>
          ))}
        </div>

        {/* Order summary */}
        <div className="lg:col-span-1">
          <div className="sticky top-4 p-6 rounded-xl bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700">
            <h2 className="font-bold text-gray-900 dark:text-gray-100 text-lg mb-4">
              Order Summary
            </h2>
            <div className="space-y-2 text-sm mb-4">
              {items.map((item) => (
                <div key={item.cartId} className="flex justify-between gap-2">
                  <span className="text-gray-600 dark:text-gray-400 truncate">
                    {item.name} × {item.quantity}
                  </span>
                  <span className="font-medium shrink-0">₹{item.price * item.quantity}</span>
                </div>
              ))}
            </div>
            <div className="space-y-2 text-sm pt-4 border-t border-gray-200 dark:border-gray-600">
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Subtotal</span>
                <span>₹{subtotal}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Platform fee</span>
                <span>₹{platformFee}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Delivery</span>
                <span>{deliveryFee === 0 ? "FREE" : `₹${deliveryFee}`}</span>
              </div>
              {appliedCoupon && (
                <div className="flex justify-between text-green-600 dark:text-green-400">
                  <span>Coupon ({appliedCoupon.code})</span>
                  <span>{couponDiscount > 0 ? `-₹${couponDiscount}` : "Applied"}</span>
                </div>
              )}
            </div>
            <div className="flex justify-between text-lg font-bold pt-4 mt-4 border-t border-gray-200 dark:border-gray-600">
              <span>Total</span>
              <span>₹{total}</span>
            </div>
            <button
              type="button"
              onClick={handlePlaceOrder}
              className="w-full mt-6 py-3 rounded-xl bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 font-semibold hover:bg-gray-700 dark:hover:bg-gray-200 transition-colors"
            >
              Place Order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
