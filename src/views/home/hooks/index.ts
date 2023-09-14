import http from "@/utils/http";
import { CommonParams } from "@/utils/http/types";
import { useAppStoreHook } from "@/store/app";

const APIName = {
  Live: `/sku/wap/openLives/${useAppStoreHook().currentSkuId}`,
  Courses: `/sku/wap/courses/${useAppStoreHook().currentSkuId}`,
  Commodity: `/sku/feeLive/${useAppStoreHook().currentSkuId}`,
  Carousel: `/sku/wap/carousel/${useAppStoreHook().currentSkuId}`,
  Config: "/sku/index/config/sku"
};

interface LiveParams extends CommonParams {
  skuId: string | number;
  userId: string | number;
}

const params: LiveParams = {
  skuId: useAppStoreHook().currentSkuId,
  userId: 0
};

export function requestLiveData() {
  http
    .post("/api/live/findToday", params)
    .then((res: any) => {
      const { data } = res;
      console.log(data);
    })
    .catch((err: any) => {
      console.log(err);
    });
}

export function requestSkuList() {
  http
    .post("/api/appSkuConfig/getAppMainPageForSku", params)
    .then((res: any) => {
      const { data } = res;
      console.log(data);
    })
    .catch((err: any) => {
      console.log(err);
    });
}

export function requestOpenLives<T>() {
  return http.get<T>(
    `/sku/wap/openLives/${useAppStoreHook().currentSkuId}`,
    null,
    false
  );
}

export function requestCourses<T>() {
  return http.get<T>(
    `/sku/wap/courses/${useAppStoreHook().currentSkuId}`,
    null,
    false
  );
}

export function requestCarousel<T>() {
  return http.get<T>(
    `/sku/wap/carousel/${useAppStoreHook().currentSkuId}`,
    null,
    false
  );
}

export function requestCommodity<T>() {
  return http.post<T>(
    `/sku/feeLive/${useAppStoreHook().currentSkuId}`,
    { appType: 998 },
    false
  );
}

export function requestSkuConfig<T>() {
  return http.post<T>(
    APIName.Config,
    { skuId: useAppStoreHook().currentSkuId },
    false
  );
}
