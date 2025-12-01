import { defineStore } from "pinia";
import type { ITheme } from "~/src/entities/Theme/ITheme";
import { apiUrl } from "~/src/shared/lib/apiUrl";
import { useAuthStore } from "@/shared/api/stores/useAuthStore";
import type { FetchError } from "ofetch";

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
  },
});
