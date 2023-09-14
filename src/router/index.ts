import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import { useAppStoreHook } from "@/store/app";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    redirect: "/:skuId"
  },
  {
    path: "/:skuId",
    name: "home",
    component: () => import("../views/home/Home.vue")
  },
  {
    path: "/class",
    name: "class",
    component: () => import("../views/class/class.vue")
  },
  {
    path: "/exerciseLib",
    name: "exerciseLib",
    component: () => import("../views/exerciseLib/exerciseLib.vue")
  },
  {
    path: "/mine",
    name: "mine",
    component: () => import("../views/mine/mine.vue")
  },

  {
    path: "/selectSku",
    name: "selectSku",
    component: () => import("../views/selectSku/selectSku.vue")
  },
  {
    path: "/goodsList",
    name: "goods-list",
    component: () => import("../views/goods/goodsList.vue")
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

router.beforeEach((to, from) => {
  if (
    to.path === "/mine" ||
    to.path === "/class" ||
    to.path === "/exerciseLib" ||
    to.path === "/:skuId"
  ) {
    useAppStoreHook().showTabbar = true;
  } else {
    useAppStoreHook().showTabbar = false;
  }
  if (
    to.path !== "/selectSku" &&
    useAppStoreHook().currentSkuId === undefined
  ) {
    return "/selectSku";
  }
  if (to.path === "/:skuId") {
    return "/" + useAppStoreHook().currentSkuId;
  }
});

export default router;
