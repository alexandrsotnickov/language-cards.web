import { FetchError } from "ofetch";
import type { ApiResponse } from "~/src/dto/apiResponse";
import { goToLoginPage } from "./useGoToLoginPage";

export class ApiErrorHandler {
  static handle(err: unknown) {
    const error = err as FetchError;
    return error?.status;
  }

  static handleV2(err: unknown): ApiResponse<object> {
    const error = err as FetchError;

    if (error.status === 401) {
      goToLoginPage();
    }
    const response = error.data as ApiResponse<object>;
    return response;
  }
}
