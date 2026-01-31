import { defineStore } from "pinia";
import type { ICard } from "../../ICard";
import { ApiErrorHandler } from "~/src/shared/lib/apiErrorHandler";
import { useAuthStore } from "~/src/shared/api/stores/useAuthStore";
import { Api } from "~/src/shared/lib/api";
import type { ApiResponse } from "~/src/dto/apiResponse";
import { goToLoginPage } from "~/src/shared/lib/useGoToLoginPage";

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
          `themes/${Number(route.params.id)}/cards`,
        );

        this.items = res ?? [];
        console.log(this.items);
      } catch (err: unknown) {
        console.log(err);
        const errorStatus = ApiErrorHandler.handle(err);
        if (errorStatus === 401) {
          this.goToLoginPage();
        }
      }
    },

    async createCard(cardDto: ICard) {
      try {
        const api = new Api();
        const response = await api.post<ICard, ApiResponse<ICard>>(
          `cards/create`,
          cardDto,
        );
        const card = response.data as ICard;
        this.items.push(card);
      } catch (err: unknown) {
        const errorStatus = ApiErrorHandler.handle(err);
        if (errorStatus === 401) {
          goToLoginPage();
        }
      }
    },
    goToLoginPage() {
      const auth = useAuthStore();
      auth.logout();

      navigateTo("/");
    },
  },
});
