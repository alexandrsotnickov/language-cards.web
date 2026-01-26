import { defineStore } from "pinia";
import type { ITheme } from "~/src/entities/Theme/ITheme";
import { apiUrl } from "~/src/shared/lib/apiUrl";
import { useAuthStore } from "@/shared/api/stores/useAuthStore";
import type { FetchError } from "ofetch";
import { Api } from "~/src/shared/lib/api";
import { ApiErrorHandler } from "~/src/shared/lib/apiErrorHandler";
import { goToLoginPage } from "../../../../shared/lib/useGoToLoginPage";
import type { ApiResponse } from "~/src/dto/apiResponse";

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
        console.log(res);

        this.themes = res.filter((t) => t.name !== "Мои карточки") ?? [];
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
        console.log(res);
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
      } catch (err: unknown) {
        const errorStatus = ApiErrorHandler.handle(err);
        if (errorStatus === 401) {
          goToLoginPage();
        }
      }
    },

    async unsubscribeTheme(theme: ITheme) {
      try {
        const api = new Api();
        console.log(theme);
        await api.put<ITheme, ApiResponse<ITheme>>(`users/unsubscribe`, theme);

        this.themes = this.themes.filter((theme) => theme.id !== theme.id);
        if (theme.id) {
          this.deleteTheme(theme.id);
        }
      } catch (err: unknown) {
        console.log(ApiErrorHandler.handleV2(err));
      }
    },

    async deleteTheme(themeId: number) {
      try {
        const api = new Api();
        await api.delete<ApiResponse<object>>(`themes/${themeId}`);
      } catch (err: unknown) {
        ApiErrorHandler.handleV2(err);
      }
    },
    setCurrentThemeName(name: string) {
      if (!this.currentTheme) return;
      this.currentTheme.name = name;
    },
  },
});
