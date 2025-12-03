import { BASE_API_URL } from "../config";
type FetchFn = typeof $fetch;

export class Api {
  private client: FetchFn;
  constructor(baseURL = BASE_API_URL, isAuth = true) {
    this.client = $fetch.create({
      baseURL,
      onRequest: ({ options }) => {
        if (isAuth && options.headers instanceof Headers) {
          options.headers = options.headers || {};
          options.headers.set(
            "Authorization",
            `Bearer ${localStorage.getItem("token")}`
          );
        }
      },
    });
  }

  public get<T>(path: string) {
    return this.client<T>(path);
  }

  public put<TResponse, TBody extends object = object>(
    path: string,
    body?: TBody
  ) {
    return this.client<TResponse>(path, { method: "PUT", body });
  }
}
