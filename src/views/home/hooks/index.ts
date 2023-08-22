import { CommonParams } from "@/utils/http/types";
import http from "@/utils/http";
import md5 from "blueimp-md5";

const MD5Key = "duiaNiuBi)JN#ERFGBN";

interface LiveParams extends CommonParams {
  skuId: string | number;
  userId: string | number;
}

const params: LiveParams = {
  skuId: 8,
  userId: 0
};

function setSecriteParam(params: CommonParams) {
  params.AppID = "787053744";
  params.AppVersion = "5.3.7";
  params.appType = 2;
  params.platform = 2;
  params.signtoken = "1b35b629f466ffb8ae099f6d2de87b81da625091";

  const keys = Object.keys(params).sort((a: string, b: string) => {
    return a > b ? 1 : -1;
  });

  let signature = "";
  keys.forEach((key: string) => {
    if (key !== "signature") {
      signature += `&${key}=${params[key]}`;
    }
  });
  signature = signature.substring(1) + MD5Key;
  const md5Str = md5(signature);

  params.signature = md5Str;
}

export function requestLiveData() {
  setSecriteParam(params);
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
