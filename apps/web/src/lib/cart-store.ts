import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import type { MenuItem } from "@/data";

export type CartItem = {
  item: MenuItem;
  quantity: number;
};

export type CartState = {
  items: CartItem[];
};

type CartActions = {
  addItem: (item: MenuItem, quantity?: number) => void;
  removeItem: (itemId: string) => void;
  increaseQuantity: (itemId: string) => void;
  decreaseQuantity: (itemId: string) => void;
  clearCart: () => void;
};

const MAX_QUANTITY = 99;

export const useCartStore = create<CartState & CartActions>()(
  persist(
    (set) => ({
      items: [],

      addItem: (item, quantity = 1) =>
        set((state) => {
          const existing = state.items.find((entry) => entry.item.id === item.id);

          if (!existing) {
            return {
              items: [...state.items, { item, quantity: Math.min(quantity, MAX_QUANTITY) }],
            };
          }

          return {
            items: state.items.map((entry) =>
              entry.item.id === item.id
                ? { ...entry, quantity: Math.min(entry.quantity + quantity, MAX_QUANTITY) }
                : entry,
            ),
          };
        }),

      removeItem: (itemId) =>
        set((state) => ({
          items: state.items.filter((entry) => entry.item.id !== itemId),
        })),

      increaseQuantity: (itemId) =>
        set((state) => ({
          items: state.items.map((entry) =>
            entry.item.id === itemId
              ? { ...entry, quantity: Math.min(entry.quantity + 1, MAX_QUANTITY) }
              : entry,
          ),
        })),

      decreaseQuantity: (itemId) =>
        set((state) => ({
          items: state.items.flatMap((entry) => {
            if (entry.item.id !== itemId) {
              return [entry];
            }

            if (entry.quantity <= 1) {
              return [];
            }

            return [{ ...entry, quantity: entry.quantity - 1 }];
          }),
        })),

      clearCart: () => set({ items: [] }),
    }),
    {
      name: "wds-food-delivery-cart",
      version: 1,
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ items: state.items }),
    },
  ),
);

// Selectors. Kept outside the store so a component can subscribe to just one value.
export const selectCartItems = (state: CartState) => state.items;

export const selectTotalQuantity = (state: CartState) =>
  state.items.reduce((total, entry) => total + entry.quantity, 0);

export const selectTotalPrice = (state: CartState) =>
  state.items.reduce((total, entry) => total + entry.item.price * entry.quantity, 0);

export const selectQuantityOf = (itemId: string) => (state: CartState) =>
  state.items.find((entry) => entry.item.id === itemId)?.quantity ?? 0;
