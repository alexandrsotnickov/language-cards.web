import { ref } from "vue";
import type { ITheme } from "../ITheme";
import { apiUrl } from "~/src/shared/lib/apiUrl";
import type { FetchError } from "ofetch";
import type { ApiResponse } from "@/dto/apiResponse";
import { useAuthStore } from "@/shared/api/stores/useAuthStore";
import { Api } from "~/src/shared/lib/api";
import { goToLoginPage } from "../../../shared/lib/useGoToLoginPage";
import { ApiErrorHandler } from "~/src/shared/lib/apiErrorHandler";
import type { ICard } from "../../Card/ICard";

export function useTheme() {
  const response = ref<ApiResponse<object> | null>(null);
  const responseUpdateThemeName = ref<ApiResponse<object> | null>(null);
  const responseResetUserCardStatuses = ref<ApiResponse<object> | null>(null);
  const responseRandomCard = ref<ApiResponse<ICard> | null>(null);

  const createTheme = async (themeName: string) => {
    const token = localStorage.getItem("accessToken");

    try {
      const data = await $fetch(`${apiUrl}/themes/create`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: { name: themeName },
      });

      const response = data as ApiResponse<ITheme>;

      navigateTo(`/themes/theme-${response.data?.id}`);
    } catch (err: unknown) {
      const error = err as FetchError;

      if (error.status === 401) {
        const auth = useAuthStore();
        auth.logout();

        navigateTo("/");
      }

      if (error.status == 400) {
        response.value = error.data as ApiResponse<object>;
      }
    }
  };

  const submitUpdateThemeName = async (themeName: string) => {
    const route = useRoute();
    try {
      const api = new Api();
      responseUpdateThemeName.value = await api.put<
        object,
        ApiResponse<ITheme>
      >(`themes/${Number(route.params.id)}`, { name: themeName });
    } catch (err: unknown) {
      const errorStatus = ApiErrorHandler.handle(err);
      if (errorStatus === 401) {
        goToLoginPage();
      }
    }
  };

  const getRandomCard = async () => {
    const route = useRoute();

    try {
      const api = new Api();
      responseRandomCard.value = await api.get<ApiResponse<ICard>>(
        `themes/${Number(route.params.id)}/random-card`,
      );
    } catch (err: unknown) {
      const response = ApiErrorHandler.handleV2(err);
      responseRandomCard.value = response as ApiResponse<ICard>;
    }
  };

  const resetCardStatusesInSubscribedTheme = async (themeId: string) => {
    try {
      const api = new Api();
      responseResetUserCardStatuses.value = await api.post<
        ITheme,
        ApiResponse<object>
      >(`themes/${themeId}/reset-card-statuses`, null);
    } catch (err: unknown) {
      ApiErrorHandler.handleV2(err);
    }
  };

  return {
    response,
    responseUpdateThemeName,
    responseRandomCard,
    createTheme,
    submitUpdateThemeName,
    getRandomCard,
    resetCardStatusesInSubscribedTheme,
    responseResetUserCardStatuses,
  };
}
