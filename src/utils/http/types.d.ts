import { Axios, AxiosRequestConfig, Method } from "axios";

export type RequestMethods = Extract<
  Method,
  "get" | "post" | "put" | "delete" | "patch" | "option" | "head"
>;

export interface CommonParams extends AxiosRequestConfig {
  AppID?: string;
  AppVersion?: string;
  appType?: string | number;
  platform?: string | number;
  signature?: string;
  signtoken?: string;
}
