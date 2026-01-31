import { create } from "zustand";

const PLATFORM_FEE = 20;
const DELIVERY_FEE = 40;
const FREE_DELIVERY_MIN = 500;

const COUPONS = {
  BIG50: {
    code: "BIG50",
    type: "flat",
    discount: 50,
    minOrder: 500,
    label: "50 Off on orders above ₹500",
  },
  BIG250: {
    code: "BIG250",
    type: "flat",
    discount: 250,
    minOrder: 2499,
    label: "₹250 off on orders above ₹2999",
  },
  SAVE50: {
    code: "SAVE50",
    type: "flat",
    discount: 50,
    minOrder: 999,
    label: "₹50 off on orders above ₹999",
  },
  WELCOME100: {
    code: "WELCOME100",
    type: "flat",
    discount: 100,
    minOrder: 1499,
    label: "₹100 off on orders above ₹1499",
  },
  FLAT20: {
    code: "FLAT20",
    type: "percent",
    discount: 20,
    maxDiscount: 500,
    minOrder: 799,
    label: "20% off, max ₹500",
  },
  BIG500: {
    code: "BIG500",
    type: "flat",
    discount: 500,
    minOrder: 2999,
    label: "₹500 off on orders above ₹2999",
  },
};

export const useCartStore = create((set, get) => ({
  items: [],
  appliedCoupon: null,
  couponError: null,

  addToCart: (product, quantity = 1) => {
    set((state) => {
      const existing = state.items.find((i) => i.productId === product.id);
      let next;
      if (existing) {
        next = state.items.map((i) =>
          i.productId === product.id ? { ...i, quantity: i.quantity + quantity } : i
        );
      } else {
        next = [
          ...state.items,
          {
            cartId: `${product.id}-${Date.now()}`,
            productId: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity,
          },
        ];
      }
      return { items: next, couponError: null };
    });
  },

  removeFromCart: (productId) => {
    set((state) => ({
      items: state.items.filter((i) => i.productId !== productId),
      couponError: null,
    }));
  },

  updateQuantity: (productId, quantity) => {
    if (quantity < 1) {
      get().removeFromCart(productId);
      return;
    }
    set((state) => ({
      items: state.items.map((i) =>
        i.productId === productId ? { ...i, quantity } : i
      ),
      couponError: null,
    }));
  },

  applyCoupon: (code) => {
    const coupon = Object.values(COUPONS).find((c) => c.code.toUpperCase() === code?.toUpperCase?.()?.trim());
    const { items } = get();
    const subtotal = items.reduce((s, i) => s + i.price * i.quantity, 0);
    if(!coupon.type === "free_delivery" && subtotal >= FREE_DELIVERY_MIN) {
      return false; // useless coupon, hide it
    }
    
    if (!coupon) {
      set({ appliedCoupon: null, couponError: "Invalid coupon code" });
      return false;
    }
    if (coupon.minOrder && subtotal < coupon.minOrder) {
      set({ appliedCoupon: null, couponError: `Order above ₹${coupon.minOrder} required` });
      return false;
    }
    
    set({ appliedCoupon: coupon, couponError: null });
    return true;
  },

  removeCoupon: () => set({ appliedCoupon: null, couponError: null }),

  clearCart: () => set({ items: [], appliedCoupon: null, couponError: null }),

  getSubtotal: () => {
    return get().items.reduce((s, i) => s + i.price * i.quantity, 0);
  },

  getDeliveryFee: () => {
    const subtotal = get().getSubtotal();
    if (subtotal >= FREE_DELIVERY_MIN) return 0;
    const coupon = get().appliedCoupon;
    if (coupon?.type === "free_delivery") return 0;
    return DELIVERY_FEE;
  },

  getPlatformFee: () => PLATFORM_FEE,

  getCouponDiscount: () => {
    const coupon = get().appliedCoupon;
    if (!coupon) return 0;
    if (coupon.type === "free_delivery") return 0; // already applied via delivery = 0
    if (coupon.type === "flat" && coupon.discount) return coupon.discount;
    if (coupon.type === "percent" && coupon.discount) {
      const subtotal = get().getSubtotal();
      const discount = Math.round((subtotal * coupon.discount) / 100);
      const max = coupon.maxDiscount ?? discount;
      return Math.min(discount, max);
    }
    return 0;
  },

  getTotal: () => {
    const subtotal = get().getSubtotal();
    const delivery = get().getDeliveryFee();
    const platform = get().getPlatformFee();
    const couponDiscount = get().getCouponDiscount();
    return Math.max(0, subtotal + delivery + platform - couponDiscount);
  },
}));

export { PLATFORM_FEE, DELIVERY_FEE, FREE_DELIVERY_MIN, COUPONS };
