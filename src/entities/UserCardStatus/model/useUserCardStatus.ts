import type { ApiResponse } from "~/src/dto/apiResponse";
import type { IUserCardStatus } from "../IUserCardStatus";
import { Api } from "~/src/shared/lib/api";
import { ApiErrorHandler } from "~/src/shared/lib/apiErrorHandler";
import { goToLoginPage } from "~/src/shared/lib/useGoToLoginPage";

export function useUserCardStatus() {
  const responseUserCardStatus = ref<ApiResponse<IUserCardStatus> | null>(null);
  const updateUserCardStatus = async (dto: IUserCardStatus) => {
    try {
      const api = new Api();
      responseUserCardStatus.value = await api.post<
        IUserCardStatus,
        ApiResponse<IUserCardStatus>
      >(`usercardstatus/`, dto);

      console.log(responseUserCardStatus.value);
    } catch (err: unknown) {
      const error = ApiErrorHandler.handle(err);
      if (error === 401) {
        goToLoginPage();
      }
    }
  };

  return {
    responseUserCardStatus,
    updateUserCardStatus,
  };
}
