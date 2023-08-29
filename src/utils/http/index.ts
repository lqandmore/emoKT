import Axios, {
  AxiosRequestConfig,
  CustomParamsSerializer,
  Method
} from "axios";
import { CommonParams } from "@/utils/http/types";
import md5 from "blueimp-md5";
const MD5Key = "duiaNiuBi)JN#ERFGBN";

const defineConfig: AxiosRequestConfig = {
  timeout: 10000,
  headers: {
    Accept: "application/json, text/plain, */*",
    "Content-Type": "application/json",
    "X-Requested-With": "XMLHttpRequest"
  }
};

class Http {
  private static axiosInstance = Axios.create(defineConfig);

  setSecriteParam(params: CommonParams) {
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

  public request<T>(
    method: Method,
    url: string,
    needSecrite?: boolean,
    params?: any,

    axiosConfig?: AxiosRequestConfig
  ): Promise<T> {
    if (needSecrite) {
      this.setSecriteParam(params);
    }
    const config = {
      method,
      url,
      params,
      ...axiosConfig
    } as AxiosRequestConfig;
    return new Promise((resolve, reject) => {
      Http.axiosInstance
        .request<T>(config)
        .then(response => {
          resolve(response);
        })
        .catch((error: any) => {
          reject(error);
        });
    });
  }

  public get<T>(
    url: string,
    params?: any,
    needSecrite: boolean = true,
    axiosConfig?: AxiosRequestConfig
  ): Promise<T> {
    return this.request<T>("get", url,needSecrite, params, axiosConfig);
  }

  public post<T>(
    url: string,
    params?: any,
    needSecrite: boolean = true,
    axiosConfig?: AxiosRequestConfig
  ): Promise<T> {
    return this.request<T>("post", url, needSecrite, params, axiosConfig);
  }

  public delete<T>(
    url: string,
    param?: any,
    needSecrite: boolean = true,
    axiosConfig?: AxiosRequestConfig
  ): Promise<T> {
    return this.request<T>("delete", url, needSecrite, param, axiosConfig);
  }
}

export default new Http();
