import { defineStore } from "pinia";
import type { ITheme } from "~/src/entities/Theme/ITheme";
import { apiUrl } from "~/src/shared/lib/apiUrl";
import { useAuthStore } from "@/shared/api/stores/useAuthStore";
import type { FetchError } from "ofetch";
import { Api } from "~/src/shared/lib/api";
import { ApiErrorHandler } from "~/src/shared/lib/apiErrorHandler";
import { goToLoginPage } from "../../../../shared/lib/useGoToLoginPage";

export const useThemesStore = defineStore("themesStore", {
  state: () => ({
    themes: [] as ITheme[],
    subscribedThemes: [] as ITheme[],
    currentTheme: null as ITheme | null,
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

        this.themes = res ?? [];
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

        this.subscribedThemes = res ?? [];
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
        const res = await api.get<ITheme>(`themes/${Number(route.params.id)}`);
        this.currentTheme = res as ITheme;
        console.log(this.currentTheme);
      } catch (err: unknown) {
        const errorStatus = ApiErrorHandler.handle(err);
        if (errorStatus === 401) {
          goToLoginPage();
        }
      }
    },
    setCurrentThemeName(name: string) {
      if (!this.currentTheme) return;
      this.currentTheme.name = name;
    },
  },
});
