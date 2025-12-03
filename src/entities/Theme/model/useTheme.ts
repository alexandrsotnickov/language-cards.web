import { ref } from "vue";
import type { ITheme } from "../ITheme";
import { apiUrl } from "~/src/shared/lib/apiUrl";
import type { FetchError } from "ofetch";
import type { ApiResponse } from "@/dto/apiResponse";
import { useAuthStore } from "@/shared/api/stores/useAuthStore";
import { Api } from "~/src/shared/lib/api";
import { goToLoginPage } from "./useGoToLoginPage";
import { ApiErrorHandler } from "~/src/shared/lib/apiErrorHandler";

export function useTheme() {
  const response = ref<ApiResponse<object> | null>(null);

  const submit = async (form: ITheme) => {
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

      navigateTo(`/themes/${response.data?.id}`);
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

  const updateThemeName = async (form: ITheme) => {
    const route = useRoute();
    try {
      const api = new Api();
      await api.put<ITheme, ITheme>(`themes/${Number(route.params.id)}`, form);
    } catch (err: unknown) {
      const errorStatus = ApiErrorHandler.handle(err);
      if (errorStatus === 401) {
        goToLoginPage();
      }
    }
  };
  return {
    response,
    submit,
    updateThemeName,
  };
}
