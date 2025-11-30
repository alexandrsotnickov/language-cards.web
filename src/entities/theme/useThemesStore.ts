import { defineStore } from "pinia";
import type { Theme } from "@/entities/theme/theme";
import { apiUrl } from "~/src/shared/lib/apiUrl";
import { useAuthStore } from "@/shared/api/stores/useAuthStore";
import type { FetchError } from "ofetch";

export const useThemesStore = defineStore("themesStore", {
  state: () => ({
    items: [] as Theme[],
  }),

  actions: {
    async getAllThemes() {
      const token = localStorage.getItem("accessToken");

      try {
        const res = await $fetch<Theme[]>(`${apiUrl}/themes`, {
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
        const res = await $fetch<Theme[]>(`${apiUrl}/users/themes`, {
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
    async createTheme(form: Theme) {
      const token = localStorage.getItem("accessToken");

      try {
        const res = await $fetch<Theme>(`${apiUrl}/users/themes`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: form,
        });
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
