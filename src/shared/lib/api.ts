import { BASE_API_URL } from "../config";

export class Api {
  private client;
  constructor(baseURL = BASE_API_URL, isAuth = true) {
    this.client = $fetch.create({
      baseURL,
      onRequest({ options }) {
        if (isAuth) {
          options.headers.set(
            "Authorization",
            "Bearer " + localStorage.getItem("accessToken")
          );
        }
      },
    });
  }

  get<T>(path: string) {
    return this.client<T>(path);
  }

  put<TBody extends object, TResponse>(url: string, body: TBody) {
    return this.client<TResponse>(url, { method: "PUT", body });
  }

  post<TBody extends object, TResponse>(url: string, body: TBody) {
    return this.client<TResponse>(url, { method: "POST", body });
  }
}
