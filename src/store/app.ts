import { defineStore } from "pinia";
import { store } from "./index";

export const useAppStore = defineStore({
  id: "app",
  state: () => {
    return {
      currentSku: 0,
      collageIndex: 0,
      skuIndex: 0
    };
  },
  getters: {

  },
  actions: {
    changeCurrentSku(sku: number): void {
      this.currentSku = sku;
    },
    savePosition(x: number, y: number): void {
      this.collageIndex = x;
      this.skuIndex = y;
    }
  }
});

export function useAppStoreHook() {
  return useAppStore(store);
}
