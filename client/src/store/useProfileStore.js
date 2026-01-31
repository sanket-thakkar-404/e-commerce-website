import { create } from "zustand";
import { persist } from "zustand/middleware";

const defaultUser = {
  name: "Guest User",
  email: "guest@example.com",
  phone: "+91 98765 43210",
  joinDate: "January 2025",
};

const defaultAddresses = [
  {
    id: "addr-1",
    name: "Home",
    phone: "+91 98765 43210",
    addressLine1: "123, Main Street",
    addressLine2: "Near City Mall",
    city: "Mumbai",
    state: "Maharashtra",
    pincode: "400001",
    isDefault: true,
  },
];

export const useProfileStore = create(
  persist(
    (set, get) => ({
      user: defaultUser,
      addresses: defaultAddresses,

      updateUser: (data) => {
        set((state) => ({
          user: { ...state.user, ...data },
        }));
      },

      addAddress: (address) => {
        const id = `addr-${Date.now()}`;
        const addresses = get().addresses;
        const isFirst = addresses.length === 0;
        set((state) => ({
          addresses: [
            ...state.addresses,
            { ...address, id, isDefault: isFirst },
          ],
        }));
      },

      updateAddress: (id, data) => {
        set((state) => ({
          addresses: state.addresses.map((a) =>
            a.id === id ? { ...a, ...data } : a
          ),
        }));
      },

      removeAddress: (id) => {
        set((state) => {
          const removed = state.addresses.find((a) => a.id === id);
          const next = state.addresses.filter((a) => a.id !== id);
          if (removed?.isDefault && next.length > 0) {
            next[0].isDefault = true;
          }
          return { addresses: next };
        });
      },

      setDefaultAddress: (id) => {
        set((state) => ({
          addresses: state.addresses.map((a) => ({
            ...a,
            isDefault: a.id === id,
          })),
        }));
      },
    }),
    { name: "shop-profile", partialize: (s) => ({ user: s.user, addresses: s.addresses }) }
  )
);
