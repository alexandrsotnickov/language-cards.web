<template>
  <TheHeader />
  <main class="page-content">
    <section class="edit-theme">
      <h2 class="edit-theme__title">Управление карточкой</h2>
      <form
        novalidate
        class="theme-name-form"
        method="post"
        @submit.prevent="onSubmit"
      >
        <label class="theme-name-form__label"></label>
        <input
          type="text"
          class="theme-name-form__input"
          :value="themesStore.items[0].name"
        />
        <TheButton class="theme-name-form__button" type="submit"
          >Изменить</TheButton
        >
      </form>
      <h3>Карточки:</h3>
      <div class="deck-list" v-for="card in cardsStore.items" :key="card.id">
        {{ card.word }}/{{ card.translation }}
      </div>
    </section>
  </main>
</template>

<script setup>
import { onMounted } from "vue";
import TheHeader from "@/widgets/header/ui/TheHeader.vue";
import TheButton from "@/shared/ui/button/TheButton.vue";
import { useCardsStore } from "~/src/entities/Card/model/stores/card";
import { useThemesStore } from "~/src/entities/Theme/model/stores/theme";

const cardsStore = useCardsStore();
const themesStore = useThemesStore();

onMounted(() => {
  cardsStore.getThemeCards();
  themesStore.getThemeById();
});

const form = ref({
  name: "",
});

async function onSubmit() {
  await submit(form.value);

  if (response.value != null && response.value.success) {
    form.value = {
      name: "",
    };
  }
}
</script>

<style lang="css">
@import "styles/edit-theme";
@import "styles/theme-name-form";
@import "styles/deck-list";
</style>
