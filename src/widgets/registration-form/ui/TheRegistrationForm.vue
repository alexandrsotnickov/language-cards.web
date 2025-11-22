<template>
  <article>
    <div class="registration-form">
      <h2 class="registration-form__title">Регистрация</h2>
      <form novalidate class="form" method="post" @submit.prevent="onSubmit">
        <div class="registration-form__group">
          <label class="registration-form__label">Придумайте никнейм:*</label>
          <input
            class="registration-form__input"
            type="text"
            v-model="form.username"
            username="username"
            required
          />
          <label class="registration-form__label">Придумайте пароль*</label>
          <input
            class="registration-form__input"
            type="text"
            v-model="form.password"
            password="password"
            required
          />
          <button class="registration-form__button" type="submit">
            Зарегистрироваться
          </button>
        </div>
      </form>
      <p v-if="!response?.success" class="registration-form__error">
        {{ response?.validationError }}
      </p>
      <p v-if="response?.success">
        {{ response?.message }}
      </p>
    </div>
  </article>
</template>

<script setup lang="ts">
import { useRegistration } from "~/src/shared/api/useRegistration";
import { ref } from "vue";

const form = ref({
  username: "",
  password: "",
});

const { response, submit } = useRegistration();
async function onSubmit() {
  await submit(form.value);

  if (response.value != null && response.value.success) {
    form.value = {
      username: "",
      password: "",
    };
  }
}
</script>

<style lang="scss">
@import "styles/registration-form";
</style>
