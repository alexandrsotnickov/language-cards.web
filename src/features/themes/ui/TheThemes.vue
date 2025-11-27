<template>
  <div class="themes">
    <div class="theme" v-for="theme of themesStore.items" :key="theme.id">
      <div class="theme__info">
        <div class="theme__name">
          {{ theme.name }}
        </div>
        <div class="theme__owner">{{ theme.ownerName }}</div>
      </div>
      <TheButton>Добавить в свои темы</TheButton>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import { useThemesStore } from "../../../entities/theme/useThemesStore";
import { TheButton } from "@/shared/ui/button";

const themesStore = useThemesStore();

onMounted(() => {
  themesStore.getThemes();
});
</script>

<style lang="scss">
@import "styles/themes";
@import "styles/theme";
</style>
