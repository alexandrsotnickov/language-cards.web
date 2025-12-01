<template>
  <TheHeader />
  <main class="page-content">
    <section class="edit-theme">
      <h2 class="edit-theme__title">Управление карточкой</h2>
      <form novalidate class="theme-name-form" method="post">
        <label class="theme-name-form__label"></label>
        <input type="text" class="theme-name-form__input">{{  }}</input>
        <TheButton class="theme-name-form__button">Изменить</TheButton>
      </form>
    <h3>Карточки:</h3>
    <div class="deck-list" v-for="theme" in ></div>
    </section>
  </main>
</template>

<script setup>
import TheHeader from "@/widgets/header/ui/TheHeader.vue";
import TheButton from "@/shared/ui/button/TheButton.vue";
</script>

<style lang="css">
@import "styles/edit-theme";
@import "styles/theme-name-form";
@import "styles/deck-list";
</style>
