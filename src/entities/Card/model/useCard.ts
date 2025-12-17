import { ref } from "vue";
import type { ICard } from "../ICard";
import type { ApiResponse } from "@/dto/apiResponse";
import { Api } from "~/src/shared/lib/api";
import { goToLoginPage } from "~/src/shared/lib/useGoToLoginPage";
import { ApiErrorHandler } from "~/src/shared/lib/apiErrorHandler";

export function useCard() {
  const responseAddCard = ref<ApiResponse<object> | null>(null);
  const responseUpdateThemeName = ref<ApiResponse<object> | null>(null);

  const submitAddCard = async (form: ICard) => {
    try {
      const api = new Api();
      responseUpdateThemeName.value = await api.post<ICard, ApiResponse<ICard>>(
        `cards/create`,
        form
      );
    } catch (err: unknown) {
      const errorStatus = ApiErrorHandler.handle(err);
      if (errorStatus === 401) {
        goToLoginPage();
      }
    }
  };

  return {
    responseAddCard,
    submitAddCard,
  };
}
