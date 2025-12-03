import { FetchError } from "ofetch";

export class ApiErrorHandler {
  static handle(err: unknown) {
    const error = err as FetchError;
    return error?.status;
  }
}
