import { ref } from "vue";
import type { User } from "@/entities/user/user";
import { apiUrl } from "~/src/shared/lib/apiUrl";
import type { FetchError } from "ofetch";
import type { ApiResponse } from "@/dto/apiResponse";

export function useRegistration() {
  const response = ref<ApiResponse<object> | null>(null);

  const submit = async (form: User) => {
    try {
      const data = await $fetch(`${apiUrl}/auth/register`, {
        method: "POST",
        body: form,
      });

      response.value = data as ApiResponse<object>;
      console.log(response.value);
    } catch (err) {
      const fetchError = err as FetchError;

      if (fetchError.status == 400) {
        response.value = fetchError.data as ApiResponse<object>;
        console.log(fetchError.data);
      }
    }
  };

  return {
    response,
    submit,
  };
}
