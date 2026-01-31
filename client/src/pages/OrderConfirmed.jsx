import { Link, useLocation } from "react-router-dom";
import { useMemo } from "react";

const OrderConfirmed = () => {
  const location = useLocation();
  const { orderId, total } = location.state || {};

  const displayOrderId = useMemo(() => {
    if (orderId) return orderId;
    return `ORD-${Date.now().toString(36).toUpperCase()}`;
  }, [orderId]);

  const displayTotal = total != null ? total : 0;

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-4 md:p-8">
      <style>{`
        @keyframes scaleIn {
          from { opacity: 0; transform: scale(0.5); }
          to { opacity: 1; transform: scale(1); }
        }
        @keyframes checkmarkStroke {
          0% { stroke-dashoffset: 60; }
          100% { stroke-dashoffset: 0; }
        }
        @keyframes circleStroke {
          0% { stroke-dashoffset: 150; }
          100% { stroke-dashoffset: 0; }
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes confetti {
          0% { opacity: 1; transform: translateY(0) rotate(0deg); }
          100% { opacity: 0; transform: translateY(-80px) rotate(720deg); }
        }
        .order-confirmed-card {
          animation: scaleIn 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }
        .order-confirmed-check-circle {
          animation: circleStroke 0.6s ease-out 0.2s forwards;
          stroke-dasharray: 150;
          stroke-dashoffset: 150;
        }
        .order-confirmed-check-mark {
          animation: checkmarkStroke 0.4s ease-out 0.6s forwards;
          stroke-dasharray: 60;
          stroke-dashoffset: 60;
        }
        .order-confirmed-title {
          animation: fadeUp 0.5s ease-out 0.4s both;
        }
        .order-confirmed-details {
          animation: fadeUp 0.5s ease-out 0.6s both;
        }
        .order-confirmed-buttons {
          animation: fadeUp 0.5s ease-out 0.8s both;
        }
        .confetti-dot {
          position: absolute;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          animation: confetti 2s ease-out forwards;
        }
      `}</style>

      <div className="relative max-w-md w-full overflow-visible">
        {/* Confetti dots - decorative only */}
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="confetti-dot pointer-events-none z-0"
            style={{
              left: `${15 + (i * 7)}%`,
              top: "45%",
              backgroundColor: ["#22c55e", "#3b82f6", "#f59e0b", "#ec4899", "#8b5cf6"][i % 5],
              animationDelay: `${i * 0.08}s`,
            }}
          />
        ))}

        <div className="order-confirmed-card relative z-10 rounded-3xl bg-white dark:bg-gray-900 shadow-xl dark:shadow-gray-950/50 border border-gray-200 dark:border-gray-700 p-8 md:p-10 text-center overflow-hidden">
          {/* Success icon with SVG animation */}
          <div className="flex justify-center mb-6">
            <div className="relative">
              <svg
                className="w-24 h-24 text-green-500"
                viewBox="0 0 52 52"
                fill="none"
              >
                <circle
                  className="order-confirmed-check-circle text-green-500"
                  cx="26"
                  cy="26"
                  r="24"
                  stroke="currentColor"
                  strokeWidth="3"
                  fill="none"
                />
                <path
                  className="order-confirmed-check-mark text-green-500"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="none"
                  d="M14 27l8 8 16-18"
                />
              </svg>
            </div>
          </div>

          <h1 className="order-confirmed-title text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
            Order Confirmed!
          </h1>
          <p className="order-confirmed-title text-gray-500 dark:text-gray-400 mb-6">
            Thank you for your purchase.
          </p>

          <div className="order-confirmed-details space-y-2 mb-8 p-4 rounded-xl bg-gray-50 dark:bg-gray-800/50">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Order ID: <span className="font-mono font-semibold text-gray-900 dark:text-gray-100">{displayOrderId}</span>
            </p>
            <p className="text-lg font-bold text-gray-900 dark:text-gray-100">
              Total: ₹{displayTotal}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400 pt-2">
              We&apos;ll send you an email with order details and tracking info.
            </p>
          </div>

          <div className="order-confirmed-buttons flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              to="/"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 font-semibold hover:bg-gray-700 dark:hover:bg-gray-200 transition-colors"
            >
              <i className="ri-shopping-bag-line"></i>
              Continue Shopping
            </Link>
            <Link
              to="/track-order"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl border-2 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100 font-semibold hover:border-gray-500 dark:hover:border-gray-500 transition-colors"
            >
              <i className="ri-map-pin-line"></i>
              Track Order
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmed;
