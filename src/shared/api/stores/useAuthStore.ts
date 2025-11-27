import { defineStore } from "pinia";
import type { User } from "@/entities/user/user";
import { apiUrl } from "~/src/shared/lib/apiUrl";
import type { LoginResponse } from "@/dto/loginResponse";
import type { FetchError } from "ofetch";
import type { ApiResponse } from "@/dto/apiResponse";
import { ref } from "vue";
export const useAuthStore = defineStore("auth", {
  state: () => ({
    accessToken: null as string | null,
    userName: null as string | null,
  }),

  actions: {
    async login(user: User) {
      const response = ref<ApiResponse<object> | null>(null);

      try {
        const data = await $fetch<LoginResponse>(`${apiUrl}/auth/login`, {
          method: "POST",
          body: user,
        });

        this.accessToken = data.accessToken;
        this.userName = data.userName;

        if (import.meta.client) {
          localStorage.setItem("accessToken", this.accessToken!);
          localStorage.setItem("userName", JSON.stringify(this.userName));
        }

        return true;
      } catch (err) {
        const fetchError = err as FetchError;
        console.log(fetchError);
        if (fetchError.status == 401) {
          response.value = fetchError.data as ApiResponse<object>;
          console.log(fetchError.data);
        }
        throw response.value?.validationError;
      }
    },

    logout() {
      this.accessToken = null;
      this.userName = null;
      if (import.meta.client) {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("userName");
      }
    },

    restore() {
      if (import.meta.client) {
        const token = localStorage.getItem("accessToken");
        const user = localStorage.getItem("userName");

        if (token) this.accessToken = token;
        if (user) this.userName = JSON.parse(user);
      }
    },
  },
});
