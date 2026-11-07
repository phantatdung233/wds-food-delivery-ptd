"use client";

import { useSyncExternalStore } from "react";

import { useCartStore } from "@/lib/cart-store";

const noop = () => {};

/**
 * True once the persisted cart has been read from LocalStorage. Reading
 * persisted state any earlier would make the server HTML and the first client
 * render disagree, so components gate their output on this.
 */
export function useCartHydrated() {
  return useSyncExternalStore(
    (onStoreChange) => {
      const persist = useCartStore.persist;
      if (!persist) return noop;
      return persist.onFinishHydration(onStoreChange);
    },
    () => useCartStore.persist?.hasHydrated() ?? true,
    () => false,
  );
}
