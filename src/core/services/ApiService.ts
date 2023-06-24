import type { App } from "vue";
import type { AxiosResponse, AxiosRequestConfig } from "axios";
import axios from "axios";
import VueAxios from "vue-axios";

const headers: Readonly<Record<string, string | boolean>> = {
  Accept: "application/json",
  "Content-Type": "application/json; charset=utf-8",
};

/**
 * @description service to call HTTP request via Axios
 */
class ApiService {
  /**
   * @description property to share vue instance
   */
  public static vueInstance: App;
  public static axiosInstance = axios.create({
    baseURL: '',
    headers
  });

  /**
   * @description initialize vue axios
   */
  public static init(app: App<Element>) {
    ApiService.vueInstance = app;
    ApiService.vueInstance.use(VueAxios, axios);
  }

  /**
   * @description set the default HTTP interceptor request headers
   */
  public static setRequestInterceptor(): void {
    ApiService.axiosInstance.interceptors.request.use(
      (config) => {
        console.log(config);
        config.headers.Authorization = `Bearer ${import.meta.env.VITE_TMDB_API_KEY_AUTH}`;
        return config;
      },
      (error) =>  Promise.reject(error)
    );
  }

  /**
   * @description set the default HTTP interceptor response header
   */
   public static setResponseInterceptor(): void {
    ApiService.axiosInstance.interceptors.response.use(
      (response) => response,
      (error) => Promise.reject(error)
    );
  }  

  /**
   * @description send the HTTP request
   * @param config: AxiosRequestConfig
   * @returns Promise<AxiosResponse>
   */
  public static request<T = any, R = AxiosResponse<T>>(
    config: AxiosRequestConfig
  ): Promise<R> {
    return this.axiosInstance.request(config);
  }

  /**
   * @description send the GET request
   * @param url: string
   * @param config: AxiosRequestConfig
   * @returns Promise<AxiosResponse>
   */
  public static get<T = any, R = AxiosResponse<T>>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<R> {
    return this.axiosInstance.get<T, R>(url, config);
  }

  /**
   * @description set the POST request
   * @param url: url
   * @param data: data
   * @param config: AxiosRequestConfig
   * @returns Promise<AxiosResponse>
   */
  public static post<T = any, R = AxiosResponse<T>>(
    url: string,
    data?: T,
    config?: AxiosRequestConfig
  ): Promise<R> {
    return this.axiosInstance.post<T, R>(url, data, config);
  }

  /**
   * @description Send the PUT HTTP request
   * @param url: string
   * @param params: AxiosRequestConfig
   * @returns Promise<AxiosResponse>
   */
  public static put<T = any, R = AxiosResponse<T>>(
    url: string,
    data?: T,
    config?: AxiosRequestConfig
  ): Promise<R> {
    return this.axiosInstance.put<T, R>(url, data, config);
  }

  /**
   * @description Send the DELETE request
   * @param url: string
   * @returns Promise<AxiosResponse>
   */
  public static delete<T = any, R = AxiosResponse<T>>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<R> {
    return this.axiosInstance.delete<T, R>(url, config);
  }
}

export default ApiService;
