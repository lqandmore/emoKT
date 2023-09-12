import http from "@/utils/http";
import { CommonParams } from "@/utils/http/types";
import { useAppStoreHook } from "@/store/app";
import { type Banner, Live, ConfigModel } from "./types";

export const configData: ConfigModel[] = [
  {
    name: "系统班",
    image: "/src/assets/home/live.png",
    tag: "",
    sort: 0,
    sortKey: "live"
  },
  {
    name: "视频课",
    image: "/src/assets/home/video.png",
    tag: "",
    sort: 0,
    sortKey: "video"
  },
  {
    name: "题库",
    image: "/src/assets/home/questions.png",
    tag: "",
    sort: 0,
    sortKey: "questions"
  },
  {
    name: "答疑",
    image: "/src/assets/home/forum.png",
    tag: "",
    sort: 0,
    sortKey: "forum"
  },
  {
    name: "公开课",
    image: "/src/assets/home/openLive.png",
    tag: "",
    sort: 0,
    sortKey: "openLive"
  },
  {
    name: "万人模考",
    image: "/src/assets/home/mock.png",
    tag: "",
    sort: 0,
    sortKey: "mock"
  },
  {
    name: "提问",
    image: "/src/assets/home/quiz.png",
    tag: "",
    sort: 0,
    sortKey: "quiz"
  },
  {
    name: "就业",
    image: "/src/assets/home/employ.png",
    tag: "",
    sort: 0,
    sortKey: "employ"
  }
];

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
  return http.get<T>(APIName.Live, null, false);
}

export function requestCourses<T>() {
  return http.get<T>(APIName.Courses, null, false);
}

export function requestCarousel<T>() {
  return http.get<T>(APIName.Carousel, null, false);
}

export function requestCommodity<T>() {
  return http.post<T>(APIName.Commodity, {appType: 998}, false);
}

export function requestSkuConfig<T>() {
  return http.post<T>(
    APIName.Config,
    { skuId: useAppStoreHook().currentSkuId },
    false
  );
}

