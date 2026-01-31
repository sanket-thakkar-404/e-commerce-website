import { create } from "zustand";
import { persist } from "zustand/middleware";

const ADMIN_ID_START = 1000;

export const useAdminStore = create(
  persist(
    (set, get) => ({
      adminProducts: [],

      addProduct: (product) => {
        const list = get().adminProducts;
        const maxId = list.length > 0 ? Math.max(...list.map((p) => p.id)) : ADMIN_ID_START - 1;
        const newId = maxId + 1;
        set((state) => ({
          adminProducts: [
            ...state.adminProducts,
            {
              ...product,
              id: newId,
              discount: product.discount || null,
              bgColor: product.bgColor || "#f5f5f5",
            },
          ],
        }));
      },

      removeProduct: (id) => {
        set((state) => ({
          adminProducts: state.adminProducts.filter((p) => p.id !== id),
        }));
      },

      deleteAll: () => {
        set({ adminProducts: [] });
      },
    }),
    { name: "shop-admin-products" }
  )
);
