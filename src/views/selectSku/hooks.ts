import http from "@/utils/http";
import { CommonParams } from "@/utils/http/types";
interface LiveParams extends CommonParams {
  skuId: string | number;
  userId: string | number;
}

const params: LiveParams = {
  skuId: 8,
  userId: 0
};
//sku.test.duia.com/wap/direction

export function requestSkuData() {
  http
    .post("/sku/wap/direction", false)
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
