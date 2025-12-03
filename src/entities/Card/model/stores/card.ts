import { defineStore } from "pinia";
import type { ICard } from "../../ICard";
import { ApiErrorHandler } from "~/src/shared/lib/apiErrorHandler";
import { useAuthStore } from "~/src/shared/api/stores/useAuthStore";
import { Api } from "~/src/shared/lib/api";

export const useCardsStore = defineStore("cardsStore", {
  state: () => ({
    items: [] as ICard[],
  }),
  actions: {
    async getThemeCards() {
      const route = useRoute();

      const api = new Api();
      try {
        const res = await api.get<ICard[]>(
          `themes/${Number(route.params.id)}/cards`
        );
        this.items = res ?? [];
      } catch (err: unknown) {
        const errorStatus = ApiErrorHandler.handle(err);
        if (errorStatus === 401) {
          this.goToLoginPage();
        }
      }
    },
    goToLoginPage() {
      const auth = useAuthStore();
      auth.logout();

      navigateTo("/login");
    },
  },
});
