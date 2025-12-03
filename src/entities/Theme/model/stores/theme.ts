import { defineStore } from "pinia";
import type { ITheme } from "~/src/entities/Theme/ITheme";
import { apiUrl } from "~/src/shared/lib/apiUrl";
import { useAuthStore } from "@/shared/api/stores/useAuthStore";
import type { FetchError } from "ofetch";
import { Api } from "~/src/shared/lib/api";
import { ApiErrorHandler } from "~/src/shared/lib/apiErrorHandler";
import { goToLoginPage } from "../useGoToLoginPage";

export const useThemesStore = defineStore("themesStore", {
  state: () => ({
    items: [] as ITheme[],
  }),

  actions: {
    async getAllThemes() {
      const token = localStorage.getItem("accessToken");

      try {
        const res = await $fetch<ITheme[]>(`${apiUrl}/themes`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        this.items = res ?? [];
      } catch (err: unknown) {
        const error = err as FetchError;

        if (error.status === 401) {
          const auth = useAuthStore();
          auth.logout();

          navigateTo("/login");
        }
      }
    },

    async getSubscribedThemes() {
      const token = localStorage.getItem("accessToken");

      try {
        const res = await $fetch<ITheme[]>(`${apiUrl}/users/themes`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        this.items = res ?? [];
      } catch (err: unknown) {
        const error = err as FetchError;

        if (error.status === 401) {
          const auth = useAuthStore();
          auth.logout();

          navigateTo("/login");
        }
      }
    },

    async getThemeById() {
      const route = useRoute();
      const api = new Api();
      try {
        const res = await api.get<ITheme[]>(
          `themes/${Number(route.params.id)}`
        );
        this.items = res ?? [];
      } catch (err: unknown) {
        const errorStatus = ApiErrorHandler.handle(err);
        if (errorStatus === 401) {
          goToLoginPage();
        }
      }
    },
  },
});
