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

  public get<T>(path: string) {
    return this.client<T>(path);
  }

  put<T>(url: string, body?: Record<string, unknown>) {
    return this.client<T>(url, { method: "PUT", body });
  }
}
