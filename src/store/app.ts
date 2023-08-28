import { defineStore } from "pinia";
import { store } from "./index";

export const useAppStore = defineStore({
  id: "app",
  state: () => {
    return {
      currentSku: 0
    };
  },
  getters: {
    getCurrentSku(state) {
      return state.currentSku;
    }
  },
  actions: {
    changeCurrentSku(sku: number): void {
      this.currentSku = sku;
    }
  }
});

export function useAppStoreHook() {
  return useAppStore(store);
}
