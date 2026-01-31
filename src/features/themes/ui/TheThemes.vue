<template>
  <div class="themes">
    <div class="theme" v-for="theme of themesStore.themes" :key="theme.id">
      <div class="theme__info">
        <div class="theme__name">
          {{ theme.name }}
        </div>
        <div class="theme__owner">{{ theme.ownerName }}</div>
      </div>
      <TheButton
        class="theme__button"
        v-if="!hasSubscribedTheme(theme).value"
        @click="addToMyThemes(theme)"
        >Добавить в свои темы</TheButton
      >
      <TheButton class="theme__button theme__button--disabled" v-else
        >Добавлено</TheButton
      >
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, computed } from "vue";
import { useThemesStore } from "../../../entities/Theme/model/stores/theme";
import { TheButton } from "@/shared/ui/button";
import type { ITheme } from "~/src/entities/Theme/ITheme";

const themesStore = useThemesStore();

async function addToMyThemes(theme: ITheme) {
  await themesStore.subscribeTheme(theme);
}

function hasSubscribedTheme(theme: ITheme) {
  return computed(() => themesStore.isSubscribed(theme));
}
onMounted(() => {
  themesStore.getAllThemes();
  themesStore.getSubscribedThemes();
});
</script>

<style lang="scss">
@import "styles/themes";
@import "styles/theme";
</style>
