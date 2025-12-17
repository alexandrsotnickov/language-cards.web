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
          @submit.prevent="onSubmitUpdateThemeName"
        >
          <label class="theme-name-form__label">Название темы:</label>
          <div class="theme-name-form__editor">
            <input
              type="text"
              class="theme-name-form__input"
              v-model="form.name"
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
        <form
          novalidate
          class="add-card"
          method="post"
          @submit.prevent="onSubmitAddCard"
        >
          <div class="add-card__item">
            <label class="add-card__label">Название карты:</label>
            <input
              type="text"
              class="add-card__input"
              v-model="addCardForm.word"
            />
          </div>
          <div class="add-card__item">
            <label class="add-card__label">Перевод карты:</label>
            <input
              type="text"
              class="add-card__input"
              v-model="addCardForm.translation"
            />
          </div>
          <div class="add-card__item">
            <label class="add-card__label">Транскрипция:</label>
            <input
              type="text"
              class="add-card__input"
              v-model="addCardForm.transcription"
            />
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
import { onMounted, watch, ref } from "vue";
import TheHeader from "@/widgets/header/ui/TheHeader.vue";
import TheButton from "@/shared/ui/button/TheButton.vue";
import { useCardsStore } from "~/src/entities/Card/model/stores/card";
import { useThemesStore } from "~/src/entities/Theme/model/stores/theme";
import { useTheme } from "@/entities/Theme/model/useTheme";
import { useCard } from "~/src/entities/Card/model/useCard";
import { useRoute } from "vue-router";
const cardsStore = useCardsStore();
const themesStore = useThemesStore();

onMounted(() => {
  cardsStore.getThemeCards();
  themesStore.getThemeById();
});

const form = ref({
  name: "",
});
const route = useRoute();
const addCardForm = ref({
  word: "",
  transcription: "",
  translation: "",
  themeId: route.params.id,
});

watch(
  () => themesStore.currentTheme,
  (theme) => {
    if (theme) {
      form.value.name = theme.name;
    }
  },
  { immediate: true }
);

const { submitUpdateThemeName } = useTheme();
const { submitAddCard } = useCard();

async function onSubmitUpdateThemeName() {
  await submitUpdateThemeName(form.value);
}

async function onSubmitAddCard() {
  await submitAddCard(addCardForm.value);
}
</script>

<style lang="scss">
@import "styles/theme";
@import "styles/edit-name";
@import "styles/theme-name-form";
@import "styles/theme-cards";
@import "styles/add-card";
</style>
