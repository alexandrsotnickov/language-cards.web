<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <TheHeader />
  <main class="page-content">
    <div class="theme__container">
      <section class="edit-name">
        <form
          novalidate
          class="theme-name-form"
          method="post"
          @submit.prevent="onSubmit"
        >
          <label class="theme-name-form__label">Название темы:</label>
          <div class="theme-name-form__editor">
            <input
              type="text"
              class="theme-name-form__input"
              :value="themesStore.currentTheme?.name"
            />
            <TheButton class="theme-name-form__button" type="submit"
              >Изменить</TheButton
            >
          </div>
        </form>
      </section>
      <section class="theme-cards">
        <div class="theme-cards__box">
          <h1>Карточки:</h1>
          <div
            class="theme-cards__list"
            v-for="card in cardsStore.items"
            :key="card.id"
          >
            {{ card.word }}/{{ card.translation }}
          </div>
        </div>
        <form novalidate class="add-card" method="post">
          <div class="add-card__item">
            <label class="add-card__label">Название карты:</label>
            <input type="text" class="add-card__input" />
          </div>
          <div class="add-card__item">
            <label class="add-card__label">Перевод карты:</label>
            <input type="text" class="add-card__input" />
          </div>
          <div class="add-card__item">
            <label class="add-card__label">Транскрипция:</label>
            <input type="text" class="add-card__input" />
          </div>
          <TheButton class="add-card__button" type="submit"
            >Создать карточку</TheButton
          >
        </form>
      </section>
    </div>
  </main>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import TheHeader from "@/widgets/header/ui/TheHeader.vue";
import TheButton from "@/shared/ui/button/TheButton.vue";
import { useCardsStore } from "~/src/entities/Card/model/stores/card";
import { useThemesStore } from "~/src/entities/Theme/model/stores/theme";
import { useTheme } from "@/entities/Theme/model/useTheme";

const cardsStore = useCardsStore();
const themesStore = useThemesStore();

onMounted(() => {
  cardsStore.getThemeCards();
  themesStore.getThemeById();
});

const { response } = useTheme();

const form = ref({
  name: "",
});

async function onSubmit() {
  // await updateThemeName(form.value);

  if (response.value != null && response.value.success) {
    form.value = {
      name: "",
    };
  }
}
</script>

<style lang="scss">
@import "styles/theme";
@import "styles/edit-name";
@import "styles/theme-name-form";
@import "styles/theme-cards";
@import "styles/add-card";
</style>
