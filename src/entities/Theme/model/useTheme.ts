import { ref } from "vue";
import type { ITheme } from "../ITheme";
import { apiUrl } from "~/src/shared/lib/apiUrl";
import type { FetchError } from "ofetch";
import type { ApiResponse } from "@/dto/apiResponse";
import { useAuthStore } from "@/shared/api/stores/useAuthStore";

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
      console.log("Я тут");
    } catch (err: unknown) {
      const error = err as FetchError;

      if (error.status === 401) {
        const auth = useAuthStore();
        auth.logout();

        navigateTo("/login");
      }

      if (error.status == 400) {
        console.log(error.data);
        response.value = error.data as ApiResponse<object>;
      }
    }
  };
  return {
    response,
    submit,
  };
}
