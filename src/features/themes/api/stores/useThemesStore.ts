import { defineStore } from "pinia";
import type { Theme } from "@/entities/theme/theme";
import { apiUrl } from "@/app/apiUrl";

export const useThemesStore = defineStore("themesStore", {
  state: () => ({
    items: [] as Theme[],
  }),

  actions: {
    async getThemes() {
      const token = localStorage.getItem("accessToken");

      const res = await fetch(`${apiUrl}/themes`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      this.items = data.items;
      console.log(this.items);
    },
  },
});
