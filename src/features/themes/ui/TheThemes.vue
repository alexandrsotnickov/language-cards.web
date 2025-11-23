<template>
  <div class="themes">
    <div
      class="themes__item"
      v-for="theme of themesStore.items"
      :key="theme.id"
    >
      {{ theme.name }}
    </div>
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import { useThemesStore } from "../api/stores/useThemesStore";

const themesStore = useThemesStore();

onMounted(() => {
  themesStore.getThemes();
});
</script>

<style lang="scss">
@import "styles/themes";
</style>
