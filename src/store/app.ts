import { defineStore } from "pinia";
import { store } from "./index";
import { Sku } from "@/views/selectSku/hooks";
import cache from "@/utils/cache";

export const useAppStore = defineStore({
  id: "app",
  state: () => {
    return {
      collageIndex: 0,
      skuIndex: 0,
      sku: {} as Sku
    };
  },
  getters: {
    currentSkuId(state) {
      return state.sku.skuId;
    },
    currentSkuName(state) {
      return state.sku.name;
    }
  },
  actions: {
    savePosition(x: number, y: number): void {
      this.collageIndex = x;
      this.skuIndex = y;
    },
    setSku(obj: Sku) {
      cache.setCache("selectSku", obj);
      this.sku = obj;
    },
    readCache() {
      const obj: Sku = cache.getCache("selectSku");
      if (obj) {
        this.sku = obj;
      }
    }
  }
});

export function useAppStoreHook() {
  return useAppStore(store);
}
