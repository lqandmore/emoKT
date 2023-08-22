import Axios, {
  AxiosRequestConfig,
  CustomParamsSerializer,
  Method
} from "axios";

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

  public request<T>(
    method: Method,
    url: string,
    params?: any,
    axiosConfig?: AxiosRequestConfig
  ): Promise<T> {
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
    axiosConfig?: AxiosRequestConfig
  ): Promise<T> {
    return this.request<T>("get", url, params, axiosConfig);
  }

  public post<T>(
    url: string,
    params?: any,
    axiosConfig?: AxiosRequestConfig
  ): Promise<T> {
    return this.request<T>("post", url, params, axiosConfig);
  }

  public delete<T>(
    url: string,
    param?: any,
    axiosConfig?: AxiosRequestConfig
  ): Promise<T> {
    return this.request<T>("delete", url, param, axiosConfig);
  }
}

export default new Http();
