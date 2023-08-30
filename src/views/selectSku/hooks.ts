import http from "@/utils/http";

export type Sku = {
  checked_sku_img_url: string;
  id: number;
  isCommodity: number;
  name: number;
  orderNum: number;
  skuId: number;
  unchecked_sku_img_url: string;
};

export type Colleges = {
  id: number;
  name: string;
  orderNum: number;
  skus: Sku[];
};

export type SkuData = {
  banner: string;
  colleges: Colleges[];
  link: string;
  mode: number;
};

export function requestSkuData() {
  return http.get<SkuData>("/sku/wap/direction", null, false);
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
