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
  getters: {
    isEmpty: (state) => state.items.length === 0,
  },
  actions: {
    async getThemeCards(themeId: number) {
      const api = new Api();
      try {
        const res = await api.get<ICard[]>(`themes/${themeId}/cards`);

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

    async createCard(cardDto: object) {
      try {
        console.log(cardDto);
        const api = new Api();
        const response = await api.post<object, ApiResponse<ICard>>(
          `cards/create`,
          cardDto,
        );
        const card = response.data as ICard;
        this.items.push(card);
      } catch (err: unknown) {
        console.log(err);
        const errorStatus = ApiErrorHandler.handle(err);
        if (errorStatus === 401) {
          goToLoginPage();
        }
      }
    },
    goToLoginPage() {
      const auth = useAuthStore();
      auth.restore();

      //navigateTo("/");
    },

    async deleteCard(cardId: number) {
      try {
        const api = new Api();
        await api.delete<ApiResponse<object>>(`cards/${cardId}`);
        this.items = this.items.filter((t) => t.id !== cardId);
      } catch (err: unknown) {
        ApiErrorHandler.handleV2(err);
      }
    },
  },
});
