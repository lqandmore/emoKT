import http from "@/utils/http";
import { CommonParams } from "@/utils/http/types";
import { useAppStoreHook } from "@/store/app";


const APIName = {
  Live: `/sku/wap/openLives/${useAppStoreHook().currentSkuId}`,
  Courses: `/sku/wap/courses/${useAppStoreHook().currentSkuId}`,
  Commodity: `/sku/wap/commodity/${useAppStoreHook().currentSkuId}`,
  Carousel: `/sku/wap/carousel/${useAppStoreHook().currentSkuId}`
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

export function requestOpenLives() {
  return http.get(APIName.Live, null, false);
}

export function requestCourses() {
  return http.get(`/sku/wap/courses/${useAppStoreHook().currentSkuId}`, null, false);
}

