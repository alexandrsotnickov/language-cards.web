<template>
  <TheHeader />
  <main class="page-content">
    <section>
      <h1 class="themes-search__title">Темы карточек от пользователей:</h1>
      <div class="themes-search__box"><TheThemes /></div>
    </section>
  </main>
</template>

<script setup>
import { TheHeader } from "@/widgets/header";
import { TheThemes } from "@/features/themes";
import { definePageMeta } from "#imports";
definePageMeta({
  alias: ["/themes-search"],
});
</script>
<style lang="scss">
@import "styles/themes-search";
</style>
