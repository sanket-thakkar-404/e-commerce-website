import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const ORDER_STEPS = [
  { id: "placed", label: "Order Placed", icon: "ri-shopping-bag-line", desc: "Your order has been received" },
  { id: "confirmed", label: "Confirmed", icon: "ri-checkbox-circle-line", desc: "Order confirmed by seller" },
  { id: "shipped", label: "Shipped", icon: "ri-truck-line", desc: "Order is on the way" },
  { id: "out_for_delivery", label: "Out for Delivery", icon: "ri-map-pin-user-line", desc: "Delivery partner is nearby" },
  { id: "delivered", label: "Delivered", icon: "ri-home-heart-line", desc: "Order delivered successfully" },
];

const STORAGE_KEY = "shop_recent_order";

function getOrderFromStorage() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function getStatusIndex(status) {
  const i = ORDER_STEPS.findIndex((s) => s.id === status);
  return i >= 0 ? i : 0;
}

// Demo: progress status based on order date (for frontend demo only)
function getDemoStatus(orderDate) {
  if (!orderDate) return "placed";
  const diff = Date.now() - new Date(orderDate).getTime();
  const mins = diff / (60 * 1000);
  if (mins < 2) return "placed";
  if (mins < 5) return "confirmed";
  if (mins < 15) return "shipped";
  if (mins < 25) return "out_for_delivery";
  return "delivered";
}

const TrackOrder = () => {
  const [orderId, setOrderId] = useState("");
  const [trackedOrder, setTrackedOrder] = useState(null);
  const [error, setError] = useState("");
  const [recentOrder, setRecentOrder] = useState(null);

  useEffect(() => {
    setRecentOrder(getOrderFromStorage());
  }, []);

  const handleTrack = (idToTrack) => {
    const id = (idToTrack || orderId || "").trim().toUpperCase();
    setError("");
    setTrackedOrder(null);

    if (!id) {
      setError("Please enter an Order ID");
      return;
    }

    const fromStorage = getOrderFromStorage();
    if (fromStorage && fromStorage.orderId.toUpperCase() === id) {
      const status = getDemoStatus(fromStorage.date);
      setTrackedOrder({
        orderId: fromStorage.orderId,
        total: fromStorage.total,
        date: fromStorage.date,
        status,
      });
      return;
    }

    // Demo: any order ID starting with ORD- shows simulated tracking
    if (id.startsWith("ORD-")) {
      setTrackedOrder({
        orderId: id,
        total: 0,
        date: new Date().toISOString(),
        status: "shipped",
      });
      return;
    }

    setError("Order not found. Please check your Order ID.");
  };

  const currentStepIndex = trackedOrder ? getStatusIndex(trackedOrder.status) : -1;

  return (
    <div className="max-w-2xl mx-auto p-4 md:p-8">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
        Track Your Order
      </h1>
      <p className="text-gray-500 dark:text-gray-400 mb-6">
        Enter your Order ID to see the current status and delivery timeline.
      </p>

      {/* Recent order */}
      {recentOrder && !trackedOrder && (
        <div className="mb-6 p-4 rounded-xl bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700">
          <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Your recent order
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <span className="font-mono font-semibold text-gray-900 dark:text-gray-100">
              {recentOrder.orderId}
            </span>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              ₹{recentOrder.total} · {new Date(recentOrder.date).toLocaleDateString()}
            </span>
            <button
              type="button"
              onClick={() => handleTrack(recentOrder.orderId)}
              className="px-4 py-2 rounded-lg bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 text-sm font-medium hover:bg-gray-700 dark:hover:bg-gray-200"
            >
              Track
            </button>
          </div>
        </div>
      )}

      {/* Track by Order ID */}
      <div className="mb-8">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Order ID
        </label>
        <div className="flex gap-2">
          <input
            type="text"
            value={orderId}
            onChange={(e) => setOrderId(e.target.value)}
            placeholder="e.g. ORD-ABC123"
            className="flex-1 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-4 py-3 text-gray-900 dark:text-gray-100 placeholder-gray-400 outline-none focus:ring-2 focus:ring-gray-400"
          />
          <button
            type="button"
            onClick={() => handleTrack()}
            className="px-6 py-3 rounded-lg bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 font-semibold hover:bg-gray-700 dark:hover:bg-gray-200"
          >
            Track
          </button>
        </div>
        {error && (
          <p className="mt-2 text-sm text-red-600 dark:text-red-400">{error}</p>
        )}
      </div>

      {/* Order status timeline */}
      {trackedOrder && (
        <div className="space-y-6">
          <div className="p-4 rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 shadow-sm">
            <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Order ID</p>
                <p className="font-mono font-bold text-gray-900 dark:text-gray-100">
                  {trackedOrder.orderId}
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-500 dark:text-gray-400">Order total</p>
                <p className="font-bold text-gray-900 dark:text-gray-100">
                  ₹{trackedOrder.total}
                </p>
              </div>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Placed on {new Date(trackedOrder.date).toLocaleString()}
            </p>
          </div>

          <div>
            <h2 className="font-semibold text-gray-900 dark:text-gray-100 mb-4">
              Order Status
            </h2>
            <div className="relative">
              {/* Vertical line */}
              <div className="absolute left-5 top-5 bottom-2 w-0.5 bg-gray-200 dark:bg-gray-700 rounded-full" />
              <div
                className="absolute left-5 top-5 w-0.5 bg-green-500 dark:bg-green-400 rounded-full transition-all duration-500 origin-top"
                style={{
                  height: currentStepIndex > 0 ? `${(currentStepIndex / (ORDER_STEPS.length - 1)) * 100}%` : "0",
                }}
              />

              {ORDER_STEPS.map((step, index) => {
                const isCompleted = index <= currentStepIndex;
                const isCurrent = index === currentStepIndex;
                return (
                  <div
                    key={step.id}
                    className="relative flex gap-4 pb-8 last:pb-0"
                  >
                    <div
                      className={`relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 transition-colors ${
                        isCompleted
                          ? "border-green-500 bg-green-500 text-white dark:border-green-400 dark:bg-green-400"
                          : "border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-400"
                      }`}
                    >
                      <i className={`${step.icon} text-lg`}></i>
                    </div>
                    <div className="flex-1 min-w-0 pt-0.5">
                      <p
                        className={`font-medium ${
                          isCompleted
                            ? "text-gray-900 dark:text-gray-100"
                            : "text-gray-500 dark:text-gray-400"
                        }`}
                      >
                        {step.label}
                        {isCurrent && (
                          <span className="ml-2 text-xs font-normal text-green-600 dark:text-green-400">
                            Current
                          </span>
                        )}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
                        {step.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <Link
              to="/"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 font-medium hover:bg-gray-700 dark:hover:bg-gray-200"
            >
              <i className="ri-shopping-bag-line"></i>
              Continue Shopping
            </Link>
            <Link
              to="/"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100 font-medium hover:border-gray-500"
            >
              <i className="ri-home-line"></i>
              Back to Home
            </Link>
          </div>
        </div>
      )}

      {!trackedOrder && !error && (
        <div className="text-center py-12 text-gray-500 dark:text-gray-400">
          <i className="ri-map-pin-line text-5xl mb-4 block opacity-50"></i>
          <p>Enter your Order ID above to track your order.</p>
          <p className="text-sm mt-2">
            You can find your Order ID in the confirmation email or on the order confirmed page.
          </p>
        </div>
      )}
    </div>
  );
};

export default TrackOrder;
