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
  const responseRandomCard = ref<ApiResponse<ICard> | null>(null);
  const submitCreate = async (form: ITheme) => {
    const token = localStorage.getItem("accessToken");

    try {
      const data = await $fetch(`${apiUrl}/themes/create`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: form,
      });

      const response = data as ApiResponse<ITheme>;

      navigateTo(`/themes/theme-${response.data?.id}`);
    } catch (err: unknown) {
      const error = err as FetchError;

      if (error.status === 401) {
        const auth = useAuthStore();
        auth.logout();

        navigateTo("/login");
      }

      if (error.status == 400) {
        response.value = error.data as ApiResponse<object>;
      }
    }
  };

  const submitUpdateThemeName = async (form: ITheme) => {
    const route = useRoute();
    try {
      const api = new Api();
      responseUpdateThemeName.value = await api.put<
        ITheme,
        ApiResponse<ITheme>
      >(`themes/${Number(route.params.id)}`, form);
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
        `themes/${Number(route.params.id)}/random-card`
      );
    } catch (err: unknown) {
      const errorStatus = ApiErrorHandler.handle(err);
      if (errorStatus === 401) {
        goToLoginPage();
      }
    }
  };

  return {
    response,
    responseUpdateThemeName,
    responseRandomCard,
    submitCreate,
    submitUpdateThemeName,
    getRandomCard,
  };
}
