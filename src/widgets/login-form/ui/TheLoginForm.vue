<template>
  <article>
    <div class="login-form">
      <h2 class="login-form__title">Войти</h2>
      <form novalidate class="form" method="post">
        <div class="login-form__group">
          <label class="login-form__label">Введите ваш никнейм:*</label>
          <input
            class="login-form__input"
            type="text"
            v-model="user.username"
            username="username"
            required
          />
          <label class="login-form__label">Введите пароль*</label>
          <input
            class="login-form__input"
            type="password"
            v-model="user.password"
            password="password"
            required
          />
          <button
            class="login-form__button"
            type="button"
            @click="handleLogin()"
          >
            Войти
          </button>
        </div>
      </form>
      <p v-if="message && !isError">
        {{ message }}
      </p>
      <p v-if="message && isError" class="login-form__error">
        {{ message }}
      </p>
    </div>
  </article>
</template>
<script setup lang="ts">
import { useAuthStore } from "~/src/shared/api/stores/useAuthStore";
import { ref } from "vue";
import { navigateTo } from "#app";
const user = ref({
  username: "",
  password: "",
});
const message = ref("");
const isError = ref(false);

const authStore = useAuthStore();

const handleLogin = async () => {
  try {
    await authStore.login(user.value);
    message.value = "Вы успешно вошли!";
    isError.value = false;
    await navigateTo("/");
  } catch (err: string | unknown) {
    message.value = err as string;
    isError.value = true;
  }
};
</script>
<style lang="scss">
@import "styles/login-form";
</style>
