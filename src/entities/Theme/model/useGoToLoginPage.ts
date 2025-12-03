import { useAuthStore } from "~/src/shared/api/stores/useAuthStore";

export function goToLoginPage() {
  const auth = useAuthStore();
  auth.logout();

  navigateTo("/login");
}
