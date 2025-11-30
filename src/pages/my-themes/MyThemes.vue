<template>
  <TheHeader />
  <main class="page-content">
    <div class="themes__container">
      <section class="my-themes__container">
        <h2 class="my-themes__title">Мои темы</h2>
        <div class="my-themes__box">
          <div
            class="my-themes__item"
            v-for="theme in themesStore.items"
            :key="theme.id"
          >
            {{ theme.name }}
            <div class="actions-select__box" ref="menuRef">
              <button class="actions-select__btn" @click="toggle(theme.id)">
                Действия
              </button>

              <div v-if="openId === theme.id" class="actions-select__dropdown">
                <button class="actions-select__dropdown-item" @click="rename">
                  Переименовать
                </button>
                <button class="actions-select__dropdown-item" @click="share">
                  Изменить
                </button>
                <button class="actions-select__dropdown-item" @click="remove">
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
            <TheButton class="theme-creation__button" @click="createTheme"
              >Создать тему</TheButton
            >
          </div>
        </form>
      </section>
    </div>
  </main>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";
import { definePageMeta } from "#imports";
import TheHeader from "@/widgets/header/ui/TheHeader.vue";
import TheButton from "~/src/shared/ui/button/TheButton.vue";
import { useThemesStore } from "@/entities/theme/useThemesStore";

const themesStore = useThemesStore();

onMounted(() => {
  themesStore.getSubscribedThemes();
  document.addEventListener("click", close);
});

onBeforeUnmount(() => {
  document.removeEventListener("click", close);
});

const openId = ref(null);
const menuRef = ref(null);
const form = ref({
  name: "",
});

const createTheme = () => {
  themesStore.createTheme(form);
};
function toggle(id) {
  openId.value = openId.value === id ? null : id;
}

const close = (e) => {
  if (!menuRef.value.contains(e.target)) {
    open.value = false;
  }
};

const rename = () => console.log("Rename clicked");
const share = () => console.log("Share clicked");
const remove = () => console.log("Delete clicked");
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
