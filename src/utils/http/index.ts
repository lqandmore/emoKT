import Axios, {
  AxiosRequestConfig,
  AxiosResponse,
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

export interface HttpResponse extends AxiosResponse {
  config: HttpRequestConfig;
}

export interface codeHttpResponse {
  code: number;
  message: string;
  data: object;
}
export interface stateHttpResponse {
  state: number;
  stateInfo: string;
  resInfo: object;
}

export interface HttpRequestConfig extends AxiosRequestConfig {
  beforeRequestCallback?: (request: HttpRequestConfig) => void;
  beforeResponseCallback?: (response: HttpResponse) => void;
}

class Http {
  constructor() {
    this.httpInterceptorsResponse();
  }
  private static axiosInstance = Axios.create(defineConfig);

  private setSecriteParam(params: CommonParams) {
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

  /** 响应拦截 */
  private httpInterceptorsResponse(): void {
    const instance = Http.axiosInstance;
    instance.interceptors.response.use(
      (response: HttpResponse) => {
        const $config = response.config;

        if (typeof $config.beforeResponseCallback === "function") {
          // 优先判断post/get等方法是否传入回调，否则执行初始化设置等回调
          $config.beforeResponseCallback(response);
          return response.data;
        }
        if (response.data["code"] !== undefined) {

          const dataInfo = response.data as codeHttpResponse;
          if (dataInfo.code === 200) {
            return dataInfo.data;
          } else {
            return Promise.reject(dataInfo.message);
          }
        } else if (response.data["state"] !== undefined) {
          const dataInfo = response.data as stateHttpResponse;
          if (dataInfo.state === 0) {
            return dataInfo.resInfo;
          } else {
            return Promise.reject(dataInfo.stateInfo);
          }
        }
        // if (Http.initConfig.beforeResponseCallback) {
        //   Http.initConfig.beforeResponseCallback(response);
        //   return response.data;
        // }
        return response.data;
      },
      (error: any) => {
        const $error = error;
        $error.isCancelRequest = Axios.isCancel($error);
        // 所有的响应异常 区分来源为取消请求/非取消请求
        return Promise.reject($error);
      }
    );
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
    return this.request<T>("get", url, needSecrite, params, axiosConfig);
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
