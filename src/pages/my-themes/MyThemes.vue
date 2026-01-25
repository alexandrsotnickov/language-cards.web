<template>
  <TheHeader />
  <main class="page-content">
    <div class="themes__container">
      <section class="my-themes__container">
        <h2 class="my-themes__title">Мои темы</h2>
        <h3>Нажми на название темы для её изучения</h3>
        <div class="my-themes__box">
          <div
            class="my-themes__item"
            v-for="theme in themesStore.subscribedThemes"
            :key="theme.id"
          >
            <NuxtLink :to="`/study/${theme.id}`">{{ theme.name }}</NuxtLink>
            <div class="actions-select__box" ref="menuRef">
              <button class="actions-select__btn" @click="toggle(theme.id)">
                Действия
              </button>

              <div v-if="openId === theme.id" class="actions-select__dropdown">
                <button class="actions-select__dropdown-item" @click="edit">
                  Работа с содержимым
                </button>
                <button
                  class="actions-select__dropdown-item"
                  @click="remove(theme)"
                >
                  Удалить
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="theme-creation">
        <h2 class="theme-creation__title">Создать тему</h2>
        <form novalidate class="form" method="post" @submit.prevent="onSubmit">
          <div class="theme-creation__form">
            <label class="theme-creation__label">Название темы:</label>
            <input
              type="text"
              v-model="form.name"
              class="theme-creation__input"
              required
            />
            <TheButton class="theme-creation__button" type="submit"
              >Создать тему</TheButton
            >
          </div>
        </form>
        <p v-if="!response?.success" class="form-error theme-creation__error">
          {{ response?.validationError }}
        </p>
        <p v-if="response?.success">
          {{ response?.message }}
        </p>
      </section>
    </div>
  </main>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, type Ref } from "vue";
import { definePageMeta } from "#imports";
import TheHeader from "@/widgets/header/ui/TheHeader.vue";
import TheButton from "~/src/shared/ui/button/TheButton.vue";
import { useThemesStore } from "~/src/entities/Theme/model/stores/theme";
import { useTheme } from "@/entities/Theme/model/useTheme";
import { navigateTo } from "#app";
import type { ITheme } from "~/src/entities/Theme/ITheme";

const themesStore = useThemesStore();

onMounted(() => {
  themesStore.getSubscribedThemes();
  document.addEventListener("click", close);
});

onBeforeUnmount(() => {
  document.removeEventListener("click", close);
});

const openId: Ref<number | null> = ref(null);
const menuRef: Ref<HTMLElement | null> = ref(null);

const form = ref<{ name: string }>({ name: "" });

function toggle(id: number) {
  openId.value = openId.value === id ? null : id;
}

const close = (e: MouseEvent) => {
  if (menuRef.value && !menuRef.value.contains(e.target as Node)) {
    openId.value = null;
  }
};
const { response, submitCreate } = useTheme();
async function onSubmit(): Promise<void> {
  await submitCreate(form.value);

  if (response.value && response.value.success) {
    form.value = { name: "" };
  }
}
const edit = () => navigateTo(`/themes/${openId.value}`);
const remove = (theme: ITheme) => themesStore.unsubscribeTheme(theme);
definePageMeta({
  alias: ["/my-themes"],
});
</script>

<style lang="scss">
@import "styles/theme-creation";
@import "styles/my-themes";
@import "styles/themes";
@import "styles/actions-select";
</style>
