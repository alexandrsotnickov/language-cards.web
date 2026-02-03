<template>
  <TheHeader />
  <main class="page-content">
    <div class="themes__container">
      <section class="my-themes__container">
        <h2 class="my-themes__title">Мои темы</h2>
        <h3 class="my-themes__action">
          Нажми на название темы для её изучения
        </h3>
        <div v-if="!themesStore.isEmptySubscribedThemes" class="my-themes__box">
          <div
            class="my-themes__item"
            v-for="theme in themesStore.subscribedThemes"
            :key="theme.id"
          >
            <div class="my-themes__item-name">
              <NuxtLink :to="`/study/${theme.id}`">{{ theme.name }}</NuxtLink>
              <div class="my-themes__item-name-owner">
                {{ theme.ownerName }}
              </div>
            </div>
            <div class="actions-select__box">
              <button
                class="actions-select__btn"
                @click.stop="toggle(theme.id)"
              >
                Действия
              </button>

              <div v-if="openId === theme.id" class="actions-select__dropdown">
                <button
                  v-if="isOwnerTheme(theme)"
                  class="actions-select__dropdown-item"
                  @click="edit"
                >
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
        <div v-else class="my-themes__box my-themes__box--empty">
          Здесь пока ещё нет тем
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
import { useAuthStore } from "~/src/shared/api/stores/useAuthStore";

const themesStore = useThemesStore();
const auth = useAuthStore();
const isOwnerTheme = (theme: ITheme) => {
  return auth.userName === theme.ownerName;
};

onMounted(() => {
  themesStore.getSubscribedThemes();
  document.addEventListener("click", close);
});

onBeforeUnmount(() => {
  document.removeEventListener("click", close);
});

const openId: Ref<number | null> = ref(null);

const form = ref<{ name: string }>({ name: "" });

function toggle(id: number) {
  openId.value = openId.value === id ? null : id;
}

const close = (e: MouseEvent) => {
  const dropdowns = document.querySelectorAll(".actions-select__dropdown");

  let clickedInside = false;
  dropdowns.forEach((dropdown) => {
    if (dropdown.contains(e.target as Node)) clickedInside = true;
  });

  if (!clickedInside) {
    openId.value = null;
  }
};
const { response, createTheme } = useTheme();
async function onSubmit(): Promise<void> {
  await createTheme(form.value.name);

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
