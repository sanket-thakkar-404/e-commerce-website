import { create } from "zustand";

export const useWishlistStore = create((set, get) => ({
  items: [],

  addToWishlist: (product) => {
    set((state) => {
      if (state.items.some((i) => i.productId === product.id)) return state;
      return {
        items: [
          ...state.items,
          {
            productId: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            discount: product.discount,
            bgColor: product.bgColor,
          },
        ],
      };
    });
  },

  removeFromWishlist: (productId) => {
    set((state) => ({
      items: state.items.filter((i) => i.productId !== productId),
    }));
  },

  isInWishlist: (productId) => {
    return get().items.some((i) => i.productId === productId);
  },

  toggleWishlist: (product) => {
    const inList = get().isInWishlist(product.id);
    if (inList) get().removeFromWishlist(product.id);
    else get().addToWishlist(product);
    return !inList;
  },
}));
