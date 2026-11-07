import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import type { MenuItem } from "@/data";

export type CartItem = {
  menuItem: MenuItem;
  quantity: number;
};

export type CartState = {
  items: CartItem[];
};

export type CartActions = {
  addItem: (item: MenuItem) => void;
  removeItem: (menuItemId: string) => void;
  increaseQuantity: (menuItemId: string) => void;
  decreaseQuantity: (menuItemId: string) => void;
  clearCart: () => void;
};

export const MAX_QUANTITY = 99;

export const useCartStore = create<CartState & CartActions>()(
  persist(
    (set) => ({
      items: [],

      addItem: (item) =>
        set((state) => {
          const existing = state.items.find((entry) => entry.menuItem.id === item.id);

          if (!existing) {
            return { items: [...state.items, { menuItem: item, quantity: 1 }] };
          }

          return {
            items: state.items.map((entry) =>
              entry.menuItem.id === item.id
                ? { ...entry, quantity: Math.min(entry.quantity + 1, MAX_QUANTITY) }
                : entry,
            ),
          };
        }),

      removeItem: (menuItemId) =>
        set((state) => ({
          items: state.items.filter((entry) => entry.menuItem.id !== menuItemId),
        })),

      increaseQuantity: (menuItemId) =>
        set((state) => ({
          items: state.items.map((entry) =>
            entry.menuItem.id === menuItemId
              ? { ...entry, quantity: Math.min(entry.quantity + 1, MAX_QUANTITY) }
              : entry,
          ),
        })),

      decreaseQuantity: (menuItemId) =>
        set((state) => ({
          items: state.items.flatMap((entry) => {
            if (entry.menuItem.id !== menuItemId) {
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

// Selectors live beside the store so no component re-derives a total inline.
export const selectCartItems = (state: CartState) => state.items;

export const selectTotalQuantity = (state: CartState) =>
  state.items.reduce((total, entry) => total + entry.quantity, 0);

export const selectTotalPrice = (state: CartState) =>
  state.items.reduce((total, entry) => total + entry.menuItem.price * entry.quantity, 0);

export const selectDistinctRestaurantCount = (state: CartState) =>
  new Set(state.items.map((entry) => entry.menuItem.restaurantId)).size;

export const selectQuantityOf = (menuItemId: string) => (state: CartState) =>
  state.items.find((entry) => entry.menuItem.id === menuItemId)?.quantity ?? 0;
