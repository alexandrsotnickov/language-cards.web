import { defineNuxtPlugin } from "#app";
import { useAuthStore } from "@/shared/api/stores/useAuthStore";

export default defineNuxtPlugin(() => {
  const authStore = useAuthStore();
  authStore.restore();
});
