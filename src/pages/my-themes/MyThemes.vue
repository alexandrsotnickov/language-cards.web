<template>
  <TheHeader />
  <main class="page-content">
    <section>
      <div class="themes__container">
        <div class="my-themes__container">
          <div class="theme" v-for="value in source"></div>
        </div>
        <div class="theme-creation">
          <h2 class="theme-creation__title">Создать тему</h2>
          <form
            novalidate
            class="form"
            method="post"
            @submit.prevent="onSubmit"
          >
            <div class="theme-creation__form">
              <label class="theme-creation__label">Название темы:</label>
              <input type="text" class="theme-creation__input" required />
              <TheButton class="theme-creation__button">Создать тему</TheButton>
            </div>
          </form>
        </div>
      </div>
    </section>
  </main>
</template>

<script setup>
import { definePageMeta } from "#imports";
import TheHeader from "@/widgets/header/ui/TheHeader.vue";
import TheButton from "~/src/shared/ui/button/TheButton.vue";
definePageMeta({
  alias: ["/my-themes"],
});
</script>

<style lang="scss">
@import "styles/theme-create";
@import "styles/my-themes";
@import "styles/themes";
</style>
