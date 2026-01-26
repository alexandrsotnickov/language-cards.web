import type { ApiResponse } from "~/src/dto/apiResponse";
import type { ITheme } from "../../Theme/ITheme";
import { Api } from "~/src/shared/lib/api";
import { ApiErrorHandler } from "~/src/shared/lib/apiErrorHandler";

export function useUser() {
  const responseSubscribeToTheme = ref<ApiResponse<object> | null>(null);
  const subscribeToTheme = async (theme: ITheme) => {
    try {
      const api = new Api();
      console.log(theme);
      await api.put<ITheme, ApiResponse<ITheme>>(`users/subscribe`, theme);
    } catch (err: unknown) {
      console.log(ApiErrorHandler.handleV2(err));
    }
  };
  return {
    responseSubscribeToTheme,
    subscribeToTheme,
  };
}
